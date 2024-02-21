import { z } from "zod";

// This isn't everything, just what we need
export const MovieResultSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  id: z.number(),
  title: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  media_type: z.string(),
  genre_ids: z.array(z.number()),
  release_date: z.string(),
});
