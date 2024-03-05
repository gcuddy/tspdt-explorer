import { MoviesSchema } from "./db/schema";
import { z } from "zod";

export const MovieEmbeddingSchema = MoviesSchema.extend({
  director: z.string(),
  cast: z.string(),
  budget: z.number().nullable(),
}).omit({
  //   id: true,
  tmdbBackdropPath: true,
  tmdbId: true,
  //   tmdbPosterPath: true,
  imdbId: true,
});

export type MovieEmbedding = z.infer<typeof MovieEmbeddingSchema>;
