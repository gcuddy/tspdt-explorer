import { MoviesSchema } from "tspdt/src/db/schema2";
import { z } from "zod";

export const MovieEmbeddingSchema = MoviesSchema.extend({
  director: z.string(),
  cast: z.string(),
});

export type MovieEmbedding = z.infer<typeof MovieEmbeddingSchema>;
