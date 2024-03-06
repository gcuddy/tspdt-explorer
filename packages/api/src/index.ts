import { Ai } from "@cloudflare/ai";
import { chunk } from "remeda";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { capitalizeFirstLetter, transformCamelToSnake, transformMovieIntoTextEmbedding } from "./utils";
import { MovieEmbeddingSchema } from "./schemas";
import { createDb } from "./db/client";
import { and, asc, desc, eq, getTableColumns, inArray, like, sql } from "drizzle-orm";
import { Movie, directors, movies, oauthAccount, oauthAccountSchema, rankings, userMovie, users } from "./db/schema";
import { cache } from "hono/cache";
import { initializeLucia } from "./lucia";
import { setCookie, getCookie } from "hono/cookie";
import { Session, generateId, User as LuciaUser } from "lucia";
import { HTTPException } from 'hono/http-exception'

type Bindings = {
    AI: any;
    VECTORIZE_INDEX: VectorizeIndex;
    DB: D1Database;
    APP_URL: string;
};

type Variables = {
    session: Session | null;
    user: LuciaUser & {
        email: string;
    } | null;
}

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>();

app.use("*", async (c, next) => {
    const lucia = initializeLucia(c.env.DB, c.env.APP_URL);
    const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;

    if (!sessionId) {
        c.set("user", null);
        c.set("session", null);
        return next();
    }
    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
        // use `header()` instead of `setCookie()` to avoid TS errors
        c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
            append: true
        });
    }
    if (!session) {
        c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
            append: true
        });
    }
    // @ts-expect-error - types all screwy
    c.set("user", user);
    c.set("session", session);
    return next();
});


// TODO: for ingesting, get keywords
app.get(
    "/director*",
    cache({
        cacheName: "movies",
        cacheControl: "max-age=3600",
    })
);

app.get(
    "/movie*",
    cache({
        cacheName: "movies",
        cacheControl: "max-age=3600",
    })
);

app.get(
    "/recommendations*",
    cache({
        cacheName: "movies",
        cacheControl: "max-age=3600",
    })
);

const routes = app
    .get("/movies/list", async (c) => {
        // TODO: add cursor pagination
        const db = createDb(c.env.DB);
        return c.json(
            await db.query.movies.findMany({
                limit: 1000,
                orderBy: asc(movies.currentRanking),
                with: {
                    moviesToDirectors: {
                        with: {
                            director: true,
                        },
                    },
                },
            })
        );
    })
    .get("/movie/interactions", async (c) => {
        // TODO: add cursor pagination
        // TODO: break into watched, favorited, added endpoints

        const user = c.get("user");
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const db = createDb(c.env.DB);
        const interactions = await db.query.userMovie.findMany({
            where: eq(userMovie.userId, user.id),
            with: {
                movie: true,
            },
        });
        return c.json(interactions);
    })
    .get("/movie/:id/interaction", async (c) => {
        const user = c.get("user");
        console.log('user', user);
        if (!user) {
            return c.json({ authorized: false });
        }
        const db = createDb(c.env.DB);
        const interaction = await db.query.userMovie.findFirst({
            where: and(
                eq(userMovie.userId, user.id),
                eq(userMovie.movieId, c.req.param("id"))
            ),
        });
        console.log('interaction', interaction);
        return c.json(interaction ?? null);
    })
    .post("/movie/:id/interaction", zValidator("json", z.object({
        timeAdded: z.date().or(z.string().transform(d => new Date(d))).or(z.null()).optional(),
        timeFavorited: z.date().or(z.string().transform(d => new Date(d))).or(z.null()).optional(),
        timeSeen: z.date().or(z.string().transform(d => new Date(d))).or(z.null()).optional(),
    }), (result, c) => {
        console.log("posting interaction", result, c);
        if (!result.success) {
            console.log('result.error', result.error);
            return c.json({ error: result.error });
        } else {
            console.log("result.timeSeen", result.data.timeSeen);
        }

    }), async (c) => {
        console.log('posting interaction');
        const user = c.get("user");
        if (!user) {
            return c.text("Unauthorized", 401);
        }
        const db = createDb(c.env.DB);
        const data = c.req.valid("json");
        console.log('got data', data);

        console.log({ data })

        const updated = await db.insert(userMovie).values({
            userId: user.id,
            movieId: c.req.param("id"),
            ...data
        }).onConflictDoUpdate({
            target: [userMovie.userId, userMovie.movieId],
            set: {
                ...data,
                // If we are are marking a movie as seen, we should then remove it from the watchlist
                timeAdded: data.timeAdded ? data.timeAdded : data.timeSeen ? null : undefined
            }
        }).returning();

        return c.json(updated);

    })
    .get("/movie/:id", async (c) => {
        const db = createDb(c.env.DB);
        console.log("getting movie with id", c.req.param("id"));
        const movie = await db.query.movies.findFirst({
            where: eq(movies.id, c.req.param("id")),
            with: {
                moviesToDirectors: {
                    with: {
                        director: true,
                    },
                },
                rankings: {
                    orderBy: asc(rankings.year),
                },
            },
        });
        console.log("movie", movie);
        return c.json(movie);
    })
    .get("/director/search", zValidator("query", z.object({ name: z.string() })), async (c) => {
        const db = createDb(c.env.DB);
        const { name } = c.req.valid("query");
        // TODO: add search to drizzle-orm

        const dirs = await db.select().from(directors).where(like(directors.name, `%${name}%`));
        return c.json(dirs);
    })
    .get("/director/:id", async (c) => {
        const db = createDb(c.env.DB, { logger: true });
        const director = await db.query.directors.findFirst({
            where: eq(movies.id, c.req.param("id")),
            with: {
                moviesToDirectors: {
                    with: {
                        movie: {
                            with: {
                                rankings: {
                                    orderBy: asc(rankings.year),
                                }
                            }
                        }
                    },
                },
            },
        });
        return c.json(director);
    })
    .get("/movies/:ids", zValidator("param", z.object({ ids: z.string() })), async (c) => {
        const db = createDb(c.env.DB);


        const { ids } = c.req.valid("param");
        console.log('id count', ids.split(",").length);

        const chunks = chunk(ids.split(","), 100);

        const chunked = await Promise.all(
            chunks.map(async (chunk) => {
                return await db.query.movies.findMany({
                    where: inArray(
                        movies.tmdbId,
                        chunk.map((id) => parseInt(id))
                    ),
                });

            })
        );

        const tmdbMovies = chunked.flat();

        return c.json(tmdbMovies);
    })
    .get("/movies/year/:year", zValidator("param", z.object({ year: z.string().regex(/\d{4}/) })), async (c) => {
        const db = createDb(c.env.DB);
        const year = parseInt(c.req.valid("param").year);
        console.time("getMovies")
        const moviesForYear = await db.query.movies.findMany({
            where: and(eq(movies.year, year)),
            with: {
                moviesToDirectors: {
                    with: { director: true },
                },
                rankings: {
                    orderBy: desc(rankings.year),
                    limit: 1,
                },
            },
        });
        console.timeEnd("getMovies");

        const sorted = moviesForYear.sort((a, b) => {
            const aRanking = a.rankings[0].ranking;
            const bRanking = b.rankings[0].ranking;

            if (!aRanking) {
                return 1;
            }

            if (!bRanking) {
                return -1;
            }

            if (aRanking < bRanking) {
                return -1;
            }

            if (aRanking > bRanking) {
                return 1;
            }

            return 0;
        });

        return c.json(sorted);
    })
    .get("/movies/genre/:genre", zValidator("param", z.object({ genre: z.string() })), async (c) => {
        const db = createDb(c.env.DB, { logger: true });
        const genre = c.req.valid("param").genre;

        const cols = getTableColumns(movies);
        // lol this feels silly

        let from: string[] = [];

        for (const col in cols) {
            from.push(`m.${transformCamelToSnake(col)} as ${col}`);
        }

        const statement = sql`select ${sql.raw(from.join(", "))} from tspdt_movies m, json_each(m.genre) g where g.value = ${genre}`
        const { results } = await db.run(statement);

        console.log('results', results);

        // const rw = await db.select().from<typeof movies>(sql`${movies} m, json_each(m.genre) g` as any).where(sql`g.value = ${genre}`);
        // const rw = await db.select().from<typeof movies>(sql`${movies} m, json_each(m.genre) g` as any).innerJoin(moviesToDirectors, eq(movies.id, moviesToDirectors.movieId)).innerJoin(directors, eq(directors.id, moviesToDirectors.directorId)).where(sql`g.value = ${genre}`);

        return c.json(results as Movie[]);
    })
    .get("/movies/country/:country", zValidator("param", z.object({ country: z.string() })), async (c) => {
        const db = createDb(c.env.DB, { logger: true });
        const country = c.req.valid("param").country;

        const cols = getTableColumns(movies);
        // lol this feels silly
        let from: string[] = [];
        for (const col in cols) {
            from.push(`m.${transformCamelToSnake(col)} as ${col}`);
        }

        const statement = sql`select ${sql.raw(from.join(", "))} from tspdt_movies m, json_each(m.country) c where c.value = ${country}`
        const { results } = await db.run(statement);

        return c.json(results as Movie[]);
    })
    .post(
        "/movie",
        zValidator(
            "json",
            MovieEmbeddingSchema
            //   z.object({
            //     tspdtId: z.string(),
            //     tmdbId: z.number().optional(),
            //     title: z.string(),
            //     year: z.number(),
            //     overview: z.string(),
            //     genres: z.array(z.string()),
            //   })
        ),
        async (c) => {
            const ai = new Ai(c.env.AI);

            const data = c.req.valid("json");

            const { overview, id: tspdtId, ...rest } = data;

            const text = transformMovieIntoTextEmbedding(data);

            //   const text = `Overview:
            //   ${overview}

            //   Title:
            //   ${data.title}

            //   Year:
            //   ${data.year}

            //   Genres:
            //   ${data.genres.join(", ")}`;

            const { data: vectorData } = (await ai.run("@cf/baai/bge-base-en-v1.5", {
                text,
            })) as { shape: number[]; data: number[][] };

            console.log("vectorData", JSON.stringify(vectorData, null, 2));

            const values = vectorData[0];

            const inserted = await c.env.VECTORIZE_INDEX.upsert([
                {
                    id: tspdtId,
                    values,
                    metadata: {
                        title: rest.title,
                        year: rest.year,
                        posterPath: rest.tmdbPosterPath ?? "",
                    },
                },
            ]);

            return c.json({
                id: tspdtId,
                text: overview,
                inserted,
            });
        }
    )
    .get(
        "/recommendations",
        zValidator(
            "query",
            z.object({
                overview: z.string(),
                id: z.string(),
            })
        ),
        async (c) => {
            const ai = new Ai(c.env.AI);

            const { overview, id } = c.req.valid("query");

            const embeddings = (await ai.run("@cf/baai/bge-base-en-v1.5", {
                text: overview,
            })) as { shape: number[]; data: number[][] };

            const vectors = embeddings.data[0];

            const SIMILARITY_CUTOFF = 0.5;

            const vectorQuery = await c.env.VECTORIZE_INDEX.query(vectors, {
                topK: 5,
                returnMetadata: true,
            });

            console.log(JSON.stringify(vectorQuery, null, 2));

            const vecIds = vectorQuery.matches.filter(
                (vec) => vec.score > SIMILARITY_CUTOFF && vec.id !== id
            );
            // .map((vec) => vec.id);

            return c.json({
                vectorQuery: vecIds as {
                    id: string;
                    score: number;
                    metadata: {
                        title: string;
                        year: number;
                        posterPath: string;
                    };
                }[],
            });
        }
    )
    .get("/auth/validate", async (c) => {
        const session = c.get("session");
        const user = c.get("user");
        return c.json({ session, user });
    })
    .post("/auth/logout", async (c) => {
        const lucia = initializeLucia(c.env.DB);
        const session = c.get("session");
        if (!session) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }
        await lucia.invalidateSession(session.id);
        c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
            append: true,
        });
        return c.json({ success: true });
    })
    .post("/auth/oauth", zValidator("json", oauthAccountSchema.omit({ userId: true }).extend({
        email: z.string().email(),
        username: z.string(),
    })
    ), async (c) => {
        const db = createDb(c.env.DB);
        // should we only create one of these?
        const lucia = initializeLucia(c.env.DB);

        const data = c.req.valid("json");

        const existingUser = await db.query.users.findFirst({ where: eq(users.email, data.email) });

        if (existingUser) {
            // const existing = await db.query.oauthAccount.findFirst({
            //     where: and(
            //         eq(oauthAccount.providerId, data.providerId),
            //         eq(oauthAccount.providerUserId, data.userId)
            //     )
            // })
            await db.insert(oauthAccount).values({
                providerId: data.providerId,
                providerUserId: data.providerUserId,
                userId: existingUser.id
            }).onConflictDoNothing();
            const session = await lucia.createSession(existingUser.id, {})
            const sessionCookie = lucia.createSessionCookie(session.id);
            setCookie(c, sessionCookie.name, sessionCookie.value, {
                ...sessionCookie.attributes,
                sameSite: sessionCookie.attributes.sameSite ? capitalizeFirstLetter(sessionCookie.attributes.sameSite) : undefined
            });
            return c.json({ userId: existingUser.id });
        }

        const userId = generateId(15);


        // TODO: transactions not supported yet by d1
        // await db.transaction(async () => {
        // })
        await db.insert(users).values({
            id: userId,
            email: data.email,
            username: data.username
        })

        await db.insert(oauthAccount).values({
            providerId: data.providerId,
            providerUserId: data.providerUserId,
            userId: userId
        })

        const session = await lucia.createSession(userId, {})
        const sessionCookie = lucia.createSessionCookie(session.id);
        console.log('sessionCookie', sessionCookie);
        setCookie(c, sessionCookie.name, sessionCookie.value, {
            ...sessionCookie.attributes,
            sameSite: sessionCookie.attributes.sameSite ? capitalizeFirstLetter(sessionCookie.attributes.sameSite) : undefined
        });
        return c.json({ userId });
    })

app.onError((err, c) => {
    console.error(err);
    return c.text("Internal Server Error", 500);
});

export default app;

export type AppType = typeof routes;
