import { MoviesSchema } from "tspdt/src/db/schema2";
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
