import { Ai } from "@cloudflare/ai";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { transformMovieIntoTextEmbedding } from "./utils";
import { MovieEmbeddingSchema } from "./schemas";
import { createDb } from "./db/client";
import { asc, eq } from "drizzle-orm";
import { movies, rankings } from "./db/schema";

type Bindings = {
  AI: any;
  VECTORIZE_INDEX: VectorizeIndex;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// TODO: for ingesting, get keywords

const routes = app
  .get("/movies/list", async (c) => {
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
  .post(
    "/recommendations",
    zValidator(
      "json",
      z.object({
        overview: z.string(),
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const ai = new Ai(c.env.AI);

      const { overview, id } = c.req.valid("json");

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
        vectorQuery: vecIds,
      });
    }
  );

export default app;

export type AppType = typeof routes;
