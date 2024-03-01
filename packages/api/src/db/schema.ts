import { InferSelectModel, relations } from "drizzle-orm";
import {
    text,
    integer,
    sqliteTableCreator,
    primaryKey,
    index,
} from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { timestamps } from "./sql-utils";

const sqliteTable = sqliteTableCreator((name) => `tspdt_${name}`);

export const movies = sqliteTable(
    "movies",
    {
        id: text("id").primaryKey(),
        title: text("title").notNull(),
        year: integer("year").notNull(),
        country: text("country", { mode: "json" }).$type<string[]>(),
        genre: text("genre", { mode: "json" }).$type<string[]>(),
        runtime: integer("runtime"),
        overview: text("overview"),
        color: text("color", { enum: ["col", "bw", "col-bw"] }),
        currentRanking: integer("current_ranking"), // this could be a generated field?
        // rankings: text("rankings", { mode: "json" }).$type<
        //   { year: number; ranking: number }[]
        // >(),
        tmdbId: integer("tmdb_id").unique(),
        imdbId: text("imdb_id").unique(),
        //   just taken from tmdb, for easy access (TODO: store in r2)
        //   Limits https://www.themoviedb.org/talk/6408a57103f0b6007db8cfe4
        tmdbPosterPath: text("tmdb_poster_path"),
        tmdbBackdropPath: text("tmdb_backdrop_path"),
    },
    (m) => ({
        yearIdx: index("year_idx").on(m.year),
        tmdbIdIdx: index("tmdb_id_idx").on(m.tmdbId),
        countryIdx: index("country_idx").on(m.country),
        genreIdx: index("genre_idx").on(m.genre)
    })
);

export const MoviesSchema = createSelectSchema(movies);

export type Movie = InferSelectModel<typeof movies>;

export const movieRelations = relations(movies, ({ many }) => ({
    rankings: many(rankings),
    moviesToDirectors: many(moviesToDirectors),
}));

export const directors = sqliteTable("directors", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    tmdbId: integer("tmdb_id").unique(),
});

export type Director = InferSelectModel<typeof directors>;

export const directorRelations = relations(directors, ({ many }) => ({
    moviesToDirectors: many(moviesToDirectors),
}));

export const moviesToDirectors = sqliteTable(
    "movies_to_directors",
    {
        movieId: text("movie_id"),
        directorId: text("director_id"),
    },
    (m) => ({
        pk: primaryKey({
            columns: [m.movieId, m.directorId],
        }),
        // movieIdIdx: index("movie_id_idx").on(m.movieId),
        // directorIdIdx: index("director_id_idx").on(m.directorId),
    })
);

export const moviesToDirectorsRelations = relations(
    moviesToDirectors,
    ({ one }) => ({
        movie: one(movies, {
            fields: [moviesToDirectors.movieId],
            references: [movies.id],
        }),
        director: one(directors, {
            fields: [moviesToDirectors.directorId],
            references: [directors.id],
        }),
    })
);

export const rankings = sqliteTable(
    "rankings",
    {
        id: integer("id").primaryKey(),
        movieId: text("movie_id"),
        year: integer("year").notNull(),
        ranking: integer("ranking").notNull(),
    },
    (r) => ({
        movieIdIdx: index("movie_id_idx").on(r.movieId),
    })
);

export type Ranking = InferSelectModel<typeof rankings>;

export const rankingsRelations = relations(rankings, ({ one }) => ({
    movie: one(movies, {
        fields: [rankings.movieId],
        references: [movies.id],
    }),
}));


export const users = sqliteTable("user", {
    ...timestamps,
    id: text("id").notNull().primaryKey(),
    username: text("username"),
    email: text("email").unique(),
    emailVerified: integer("email_verified", {
        mode: "boolean",
    }),
});

export type User = InferSelectModel<typeof users>;

export const sessions = sqliteTable("session", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    expiresAt: integer("expires_at").notNull()
});


export const userMovie = sqliteTable(
    "user_movie",
    {
        ...timestamps,
        userId: text("user_id").notNull().references(() => users.id),
        movieId: text("movie_id").notNull().references(() => movies.id),
        posterPath: text("poster_path"),
        //   could get more complex with activity, but we'll keep it like this for now
        timeSeen: integer("time_seen", { mode: "timestamp" }),
        timeFavorited: integer("time_favorited", { mode: "timestamp" }),
        //   to watchlist...
        timeAdded: integer("time_added", { mode: "timestamp" }),
    },
    (table) => ({
        primary: primaryKey({
            columns: [table.userId, table.movieId],
        }),
    })
);


export const oauthAccount = sqliteTable(
    "oauth_account",
    {
        providerId: text("provider_id").notNull(),
        providerUserId: text("provider_user_id").notNull(),
        userId: text("user_id").notNull().references(() => users.id),
    }, (table) => ({
        pk: primaryKey({
            columns: [table.providerId, table.providerUserId]
        })
    }))

export const oauthAccountSchema = createSelectSchema(oauthAccount);
