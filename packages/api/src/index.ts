import { Ai } from "@cloudflare/ai";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

type Bindings = {
  AI: any;
  VECTORIZE_INDEX: VectorizeIndex;
};

const app = new Hono<{ Bindings: Bindings }>();

const postMovieRoute = app.post(
  "/movie",
  zValidator(
    "json",
    z.object({
      tspdtId: z.string(),
      tmdbId: z.number().optional(),
      title: z.string(),
      year: z.number(),
      overview: z.string(),
    })
  ),
  async (c) => {
    const ai = new Ai(c.env.AI);

    const data = c.req.valid("json");

    const { overview, tspdtId, ...rest } = data;

    const vectorData = await ai.run("@cf/baai/bge-base-en-v1.5", {
      text: data.overview,
    });

    const values = vectorData[0];

    const inserted = await c.env.VECTORIZE_INDEX.upsert([
      {
        id: data.tspdtId,
        values,
        metadata: {
          ...rest,
        },
      },
    ]);

    return c.json({
      id: tspdtId,
      text: overview,
      inserted,
    });
  }
);

export default app;

export type PostMovie = typeof postMovieRoute;
