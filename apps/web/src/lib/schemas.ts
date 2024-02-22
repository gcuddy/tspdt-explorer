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

export const MovieDetailSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  budget: z.number(),
  //   genres: z.array(z.object({ id: z.number(), name: z.string() })),
  //   homepage: z.string(),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  //   popularity: z.number(),
  poster_path: z.string(),
  //   production_companies: z.array(
  //     z.union([
  //       z.object({
  //         id: z.number(),
  //         logo_path: z.null(),
  //         name: z.string(),
  //         origin_country: z.string(),
  //       }),
  //       z.object({
  //         id: z.number(),
  //         logo_path: z.string(),
  //         name: z.string(),
  //         origin_country: z.string(),
  //       }),
  //     ])
  //   ),
  //   production_countries: z.array(
  //     z.object({ iso_3166_1: z.string(), name: z.string() })
  //   ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    })
  ),
  //   status: z.string(),
  tagline: z.string().nullish(),
  title: z.string(),
  //   video: z.boolean(),
  //   vote_average: z.number(),
  //   vote_count: z.number(),
  credits: z.object({
    cast: z.array(
      z.union([
        z.object({
          adult: z.boolean(),
          gender: z.number(),
          id: z.number(),
          known_for_department: z.string(),
          name: z.string(),
          original_name: z.string(),
          popularity: z.number(),
          profile_path: z.string(),
          cast_id: z.number(),
          character: z.string(),
          credit_id: z.string(),
          order: z.number(),
        }),
        z.object({
          adult: z.boolean(),
          gender: z.number(),
          id: z.number(),
          known_for_department: z.string(),
          name: z.string(),
          original_name: z.string(),
          popularity: z.number(),
          profile_path: z.null(),
          cast_id: z.number(),
          character: z.string(),
          credit_id: z.string(),
          order: z.number(),
        }),
      ])
    ),
    crew: z.array(
      z.union([
        z.object({
          adult: z.boolean(),
          gender: z.number(),
          id: z.number(),
          known_for_department: z.string(),
          name: z.string(),
          original_name: z.string(),
          popularity: z.number(),
          profile_path: z.string(),
          credit_id: z.string(),
          department: z.string(),
          job: z.string(),
        }),
        z.object({
          adult: z.boolean(),
          gender: z.number(),
          id: z.number(),
          known_for_department: z.string(),
          name: z.string(),
          original_name: z.string(),
          popularity: z.number(),
          profile_path: z.null(),
          credit_id: z.string(),
          department: z.string(),
          job: z.string(),
        }),
      ])
    ),
  }),
});
