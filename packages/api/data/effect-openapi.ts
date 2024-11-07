import type * as HttpClient from "@effect/platform/HttpClient";
import * as HttpClientError from "@effect/platform/HttpClientError";
import * as HttpClientRequest from "@effect/platform/HttpClientRequest";
import * as HttpClientResponse from "@effect/platform/HttpClientResponse";
import * as Effect from "effect/Effect";
import type { ParseError } from "effect/ParseResult";
import * as S from "effect/Schema";

export class SearchMovieParams extends S.Struct({
  query: S.String,
  include_adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => false as const,
  }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  primary_release_year: S.optionalWith(S.String, { nullable: true }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  region: S.optionalWith(S.String, { nullable: true }),
  year: S.optionalWith(S.String, { nullable: true }),
}) {}

export class SearchMovie200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class DiscoverMovieParams extends S.Struct({
  certification: S.optionalWith(S.String, { nullable: true }),
  "certification.gte": S.optionalWith(S.String, { nullable: true }),
  "certification.lte": S.optionalWith(S.String, { nullable: true }),
  certification_country: S.optionalWith(S.String, { nullable: true }),
  include_adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => false as const,
  }),
  include_video: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => false as const,
  }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  primary_release_year: S.optionalWith(S.Int, { nullable: true }),
  "primary_release_date.gte": S.optionalWith(S.String, { nullable: true }),
  "primary_release_date.lte": S.optionalWith(S.String, { nullable: true }),
  region: S.optionalWith(S.String, { nullable: true }),
  "release_date.gte": S.optionalWith(S.String, { nullable: true }),
  "release_date.lte": S.optionalWith(S.String, { nullable: true }),
  sort_by: S.optionalWith(
    S.Literal(
      "original_title.asc",
      "original_title.desc",
      "popularity.asc",
      "popularity.desc",
      "revenue.asc",
      "revenue.desc",
      "primary_release_date.asc",
      "title.asc",
      "title.desc",
      "primary_release_date.desc",
      "vote_average.asc",
      "vote_average.desc",
      "vote_count.asc",
      "vote_count.desc"
    ),
    { nullable: true, default: () => "popularity.desc" as const }
  ),
  "vote_average.gte": S.optionalWith(S.Number, { nullable: true }),
  "vote_average.lte": S.optionalWith(S.Number, { nullable: true }),
  "vote_count.gte": S.optionalWith(S.Number, { nullable: true }),
  "vote_count.lte": S.optionalWith(S.Number, { nullable: true }),
  watch_region: S.optionalWith(S.String, { nullable: true }),
  with_cast: S.optionalWith(S.String, { nullable: true }),
  with_companies: S.optionalWith(S.String, { nullable: true }),
  with_crew: S.optionalWith(S.String, { nullable: true }),
  with_genres: S.optionalWith(S.String, { nullable: true }),
  with_keywords: S.optionalWith(S.String, { nullable: true }),
  with_origin_country: S.optionalWith(S.String, { nullable: true }),
  with_original_language: S.optionalWith(S.String, { nullable: true }),
  with_people: S.optionalWith(S.String, { nullable: true }),
  with_release_type: S.optionalWith(S.Int, { nullable: true }),
  "with_runtime.gte": S.optionalWith(S.Int, { nullable: true }),
  "with_runtime.lte": S.optionalWith(S.Int, { nullable: true }),
  with_watch_monetization_types: S.optionalWith(S.String, { nullable: true }),
  with_watch_providers: S.optionalWith(S.String, { nullable: true }),
  without_companies: S.optionalWith(S.String, { nullable: true }),
  without_genres: S.optionalWith(S.String, { nullable: true }),
  without_keywords: S.optionalWith(S.String, { nullable: true }),
  without_watch_providers: S.optionalWith(S.String, { nullable: true }),
  year: S.optionalWith(S.Int, { nullable: true }),
}) {}

export class DiscoverMovie200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieDetailsParams extends S.Struct({
  append_to_response: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class MovieDetails200 extends S.Struct({
  adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  backdrop_path: S.optionalWith(S.String, { nullable: true }),
  budget: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  genres: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  homepage: S.optionalWith(S.String, { nullable: true }),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  imdb_id: S.optionalWith(S.String, { nullable: true }),
  original_language: S.optionalWith(S.String, { nullable: true }),
  original_title: S.optionalWith(S.String, { nullable: true }),
  overview: S.optionalWith(S.String, { nullable: true }),
  popularity: S.optionalWith(S.Number, {
    nullable: true,
    default: () => 0 as const,
  }),
  poster_path: S.optionalWith(S.String, { nullable: true }),
  production_companies: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        logo_path: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        origin_country: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  production_countries: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  release_date: S.optionalWith(S.String, { nullable: true }),
  revenue: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  runtime: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  spoken_languages: S.optionalWith(
    S.Array(
      S.Struct({
        english_name: S.optionalWith(S.String, { nullable: true }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  status: S.optionalWith(S.String, { nullable: true }),
  tagline: S.optionalWith(S.String, { nullable: true }),
  title: S.optionalWith(S.String, { nullable: true }),
  video: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  vote_average: S.optionalWith(S.Number, {
    nullable: true,
    default: () => 0 as const,
  }),
  vote_count: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvSeriesDetailsParams extends S.Struct({
  append_to_response: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvSeriesDetails200 extends S.Struct({
  adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  backdrop_path: S.optionalWith(S.String, { nullable: true }),
  created_by: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  episode_run_time: S.optionalWith(S.Array(S.Int), { nullable: true }),
  first_air_date: S.optionalWith(S.String, { nullable: true }),
  genres: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  homepage: S.optionalWith(S.String, { nullable: true }),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  in_production: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  languages: S.optionalWith(S.Array(S.String), { nullable: true }),
  last_air_date: S.optionalWith(S.String, { nullable: true }),
  last_episode_to_air: S.optionalWith(
    S.Struct({
      id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
      name: S.optionalWith(S.String, { nullable: true }),
      overview: S.optionalWith(S.String, { nullable: true }),
      vote_average: S.optionalWith(S.Number, {
        nullable: true,
        default: () => 0 as const,
      }),
      vote_count: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      air_date: S.optionalWith(S.String, { nullable: true }),
      episode_number: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      production_code: S.optionalWith(S.String, { nullable: true }),
      runtime: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      season_number: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      show_id: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      still_path: S.optionalWith(S.String, { nullable: true }),
    }),
    { nullable: true }
  ),
  name: S.optionalWith(S.String, { nullable: true }),
  networks: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        logo_path: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        origin_country: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  number_of_episodes: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  number_of_seasons: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
  original_language: S.optionalWith(S.String, { nullable: true }),
  original_name: S.optionalWith(S.String, { nullable: true }),
  overview: S.optionalWith(S.String, { nullable: true }),
  popularity: S.optionalWith(S.Number, {
    nullable: true,
    default: () => 0 as const,
  }),
  poster_path: S.optionalWith(S.String, { nullable: true }),
  production_companies: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        logo_path: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        origin_country: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  production_countries: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  seasons: S.optionalWith(
    S.Array(
      S.Struct({
        air_date: S.optionalWith(S.String, { nullable: true }),
        episode_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        season_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_average: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  spoken_languages: S.optionalWith(
    S.Array(
      S.Struct({
        english_name: S.optionalWith(S.String, { nullable: true }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  status: S.optionalWith(S.String, { nullable: true }),
  tagline: S.optionalWith(S.String, { nullable: true }),
  type: S.optionalWith(S.String, { nullable: true }),
  vote_average: S.optionalWith(S.Number, {
    nullable: true,
    default: () => 0 as const,
  }),
  vote_count: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class SearchTvParams extends S.Struct({
  query: S.String,
  first_air_date_year: S.optionalWith(S.Int, { nullable: true }),
  include_adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => false as const,
  }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  year: S.optionalWith(S.Int, { nullable: true }),
}) {}

export class SearchTv200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class SearchMultiParams extends S.Struct({
  query: S.String,
  include_adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => false as const,
  }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class SearchMulti200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        title: S.optionalWith(S.String, { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        media_type: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class SearchPersonParams extends S.Struct({
  query: S.String,
  include_adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => false as const,
  }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class SearchPerson200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        known_for: S.optionalWith(
          S.Array(
            S.Struct({
              adult: S.optionalWith(S.Boolean, {
                nullable: true,
                default: () => true as const,
              }),
              backdrop_path: S.optionalWith(S.String, { nullable: true }),
              id: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              title: S.optionalWith(S.String, { nullable: true }),
              original_language: S.optionalWith(S.String, { nullable: true }),
              original_title: S.optionalWith(S.String, { nullable: true }),
              overview: S.optionalWith(S.String, { nullable: true }),
              poster_path: S.optionalWith(S.String, { nullable: true }),
              media_type: S.optionalWith(S.String, { nullable: true }),
              genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
              popularity: S.optionalWith(S.Number, {
                nullable: true,
                default: () => 0 as const,
              }),
              release_date: S.optionalWith(S.String, { nullable: true }),
              video: S.optionalWith(S.Boolean, {
                nullable: true,
                default: () => true as const,
              }),
              vote_average: S.optionalWith(S.Number, {
                nullable: true,
                default: () => 0 as const,
              }),
              vote_count: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
            })
          ),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class ConfigurationDetails200 extends S.Struct({
  images: S.optionalWith(
    S.Struct({
      base_url: S.optionalWith(S.String, { nullable: true }),
      secure_base_url: S.optionalWith(S.String, { nullable: true }),
      backdrop_sizes: S.optionalWith(S.Array(S.String), { nullable: true }),
      logo_sizes: S.optionalWith(S.Array(S.String), { nullable: true }),
      poster_sizes: S.optionalWith(S.Array(S.String), { nullable: true }),
      profile_sizes: S.optionalWith(S.Array(S.String), { nullable: true }),
      still_sizes: S.optionalWith(S.Array(S.String), { nullable: true }),
    }),
    { nullable: true }
  ),
  change_keys: S.optionalWith(S.Array(S.String), { nullable: true }),
}) {}

export class TvSeasonDetailsParams extends S.Struct({
  append_to_response: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvSeasonDetails200 extends S.Struct({
  _id: S.optionalWith(S.String, { nullable: true }),
  air_date: S.optionalWith(S.String, { nullable: true }),
  episodes: S.optionalWith(
    S.Array(
      S.Struct({
        air_date: S.optionalWith(S.String, { nullable: true }),
        episode_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        production_code: S.optionalWith(S.String, { nullable: true }),
        runtime: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        season_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        show_id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        still_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        crew: S.optionalWith(
          S.Array(
            S.Struct({
              department: S.optionalWith(S.String, { nullable: true }),
              job: S.optionalWith(S.String, { nullable: true }),
              credit_id: S.optionalWith(S.String, { nullable: true }),
              adult: S.optionalWith(S.Boolean, {
                nullable: true,
                default: () => true as const,
              }),
              gender: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              id: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              known_for_department: S.optionalWith(S.String, {
                nullable: true,
              }),
              name: S.optionalWith(S.String, { nullable: true }),
              original_name: S.optionalWith(S.String, { nullable: true }),
              popularity: S.optionalWith(S.Number, {
                nullable: true,
                default: () => 0 as const,
              }),
              profile_path: S.optionalWith(S.String, { nullable: true }),
            })
          ),
          { nullable: true }
        ),
        guest_stars: S.optionalWith(
          S.Array(
            S.Struct({
              character: S.optionalWith(S.String, { nullable: true }),
              credit_id: S.optionalWith(S.String, { nullable: true }),
              order: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              adult: S.optionalWith(S.Boolean, {
                nullable: true,
                default: () => true as const,
              }),
              gender: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              id: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              known_for_department: S.optionalWith(S.String, {
                nullable: true,
              }),
              name: S.optionalWith(S.String, { nullable: true }),
              original_name: S.optionalWith(S.String, { nullable: true }),
              popularity: S.optionalWith(S.Number, {
                nullable: true,
                default: () => 0 as const,
              }),
              profile_path: S.optionalWith(S.String, { nullable: true }),
            })
          ),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
  name: S.optionalWith(S.String, { nullable: true }),
  overview: S.optionalWith(S.String, { nullable: true }),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  poster_path: S.optionalWith(S.String, { nullable: true }),
  season_number: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  vote_average: S.optionalWith(S.Number, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvEpisodeDetailsParams extends S.Struct({
  append_to_response: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvEpisodeDetails200 extends S.Struct({
  air_date: S.optionalWith(S.String, { nullable: true }),
  crew: S.optionalWith(
    S.Array(
      S.Struct({
        department: S.optionalWith(S.String, { nullable: true }),
        job: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  episode_number: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  guest_stars: S.optionalWith(
    S.Array(
      S.Struct({
        character: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  name: S.optionalWith(S.String, { nullable: true }),
  overview: S.optionalWith(S.String, { nullable: true }),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  production_code: S.optionalWith(S.String, { nullable: true }),
  runtime: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  season_number: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  still_path: S.optionalWith(S.String, { nullable: true }),
  vote_average: S.optionalWith(S.Number, {
    nullable: true,
    default: () => 0 as const,
  }),
  vote_count: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class DiscoverTvParams extends S.Struct({
  "air_date.gte": S.optionalWith(S.String, { nullable: true }),
  "air_date.lte": S.optionalWith(S.String, { nullable: true }),
  first_air_date_year: S.optionalWith(S.Int, { nullable: true }),
  "first_air_date.gte": S.optionalWith(S.String, { nullable: true }),
  "first_air_date.lte": S.optionalWith(S.String, { nullable: true }),
  include_adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => false as const,
  }),
  include_null_first_air_dates: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => false as const,
  }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  screened_theatrically: S.optionalWith(S.Boolean, { nullable: true }),
  sort_by: S.optionalWith(
    S.Literal(
      "first_air_date.asc",
      "first_air_date.desc",
      "name.asc",
      "name.desc",
      "original_name.asc",
      "original_name.desc",
      "popularity.asc",
      "popularity.desc",
      "vote_average.asc",
      "vote_average.desc",
      "vote_count.asc",
      "vote_count.desc"
    ),
    { nullable: true, default: () => "popularity.desc" as const }
  ),
  timezone: S.optionalWith(S.String, { nullable: true }),
  "vote_average.gte": S.optionalWith(S.Number, { nullable: true }),
  "vote_average.lte": S.optionalWith(S.Number, { nullable: true }),
  "vote_count.gte": S.optionalWith(S.Number, { nullable: true }),
  "vote_count.lte": S.optionalWith(S.Number, { nullable: true }),
  watch_region: S.optionalWith(S.String, { nullable: true }),
  with_companies: S.optionalWith(S.String, { nullable: true }),
  with_genres: S.optionalWith(S.String, { nullable: true }),
  with_keywords: S.optionalWith(S.String, { nullable: true }),
  with_networks: S.optionalWith(S.Int, { nullable: true }),
  with_origin_country: S.optionalWith(S.String, { nullable: true }),
  with_original_language: S.optionalWith(S.String, { nullable: true }),
  "with_runtime.gte": S.optionalWith(S.Int, { nullable: true }),
  "with_runtime.lte": S.optionalWith(S.Int, { nullable: true }),
  with_status: S.optionalWith(S.String, { nullable: true }),
  with_watch_monetization_types: S.optionalWith(S.String, { nullable: true }),
  with_watch_providers: S.optionalWith(S.String, { nullable: true }),
  without_companies: S.optionalWith(S.String, { nullable: true }),
  without_genres: S.optionalWith(S.String, { nullable: true }),
  without_keywords: S.optionalWith(S.String, { nullable: true }),
  without_watch_providers: S.optionalWith(S.String, { nullable: true }),
  with_type: S.optionalWith(S.String, { nullable: true }),
}) {}

export class DiscoverTv200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieImagesParams extends S.Struct({
  include_image_language: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MovieImages200 extends S.Struct({
  backdrops: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  logos: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  posters: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeriesImagesParams extends S.Struct({
  include_image_language: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeriesImages200 extends S.Struct({
  backdrops: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  logos: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  posters: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeasonImagesParams extends S.Struct({
  include_image_language: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeasonImages200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  posters: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvEpisodeImagesParams extends S.Struct({
  include_image_language: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvEpisodeImages200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  stills: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TrendingAllParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TrendingAll200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        title: S.optionalWith(S.String, { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        media_type: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TrendingMoviesParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TrendingMovies200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        title: S.optionalWith(S.String, { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        media_type: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TrendingTvParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TrendingTv200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        media_type: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieAccountStatesParams extends S.Struct({
  session_id: S.optionalWith(S.String, { nullable: true }),
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MovieAccountStates200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  favorite: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  rated: S.optionalWith(
    S.Struct({
      value: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
    }),
    { nullable: true }
  ),
  watchlist: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
}) {}

export class TvSeriesAccountStatesParams extends S.Struct({
  session_id: S.optionalWith(S.String, { nullable: true }),
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeriesAccountStates200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  favorite: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  rated: S.optionalWith(
    S.Struct({
      value: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
    }),
    { nullable: true }
  ),
  watchlist: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
}) {}

export class TvEpisodeAccountStatesParams extends S.Struct({
  session_id: S.optionalWith(S.String, { nullable: true }),
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvEpisodeAccountStates200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  favorite: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  rated: S.optionalWith(
    S.Struct({
      value: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
    }),
    { nullable: true }
  ),
  watchlist: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
}) {}

export class TrendingPeopleParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TrendingPeople200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        media_type: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        known_for: S.optionalWith(
          S.Array(
            S.Struct({
              adult: S.optionalWith(S.Boolean, {
                nullable: true,
                default: () => true as const,
              }),
              backdrop_path: S.optionalWith(S.String, { nullable: true }),
              id: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              title: S.optionalWith(S.String, { nullable: true }),
              original_language: S.optionalWith(S.String, { nullable: true }),
              original_title: S.optionalWith(S.String, { nullable: true }),
              overview: S.optionalWith(S.String, { nullable: true }),
              poster_path: S.optionalWith(S.String, { nullable: true }),
              media_type: S.optionalWith(S.String, { nullable: true }),
              genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
              popularity: S.optionalWith(S.Number, {
                nullable: true,
                default: () => 0 as const,
              }),
              release_date: S.optionalWith(S.String, { nullable: true }),
              video: S.optionalWith(S.Boolean, {
                nullable: true,
                default: () => true as const,
              }),
              vote_average: S.optionalWith(S.Number, {
                nullable: true,
                default: () => 0 as const,
              }),
              vote_count: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
            })
          ),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieAlternativeTitlesParams extends S.Struct({
  country: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MovieAlternativeTitles200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  titles: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        type: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class MovieChangesParams extends S.Struct({
  end_date: S.optionalWith(S.String, { nullable: true }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  start_date: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MovieChanges200 extends S.Struct({
  changes: S.optionalWith(
    S.Array(
      S.Struct({
        key: S.optionalWith(S.String, { nullable: true }),
        items: S.optionalWith(
          S.Array(
            S.Struct({
              id: S.optionalWith(S.String, { nullable: true }),
              action: S.optionalWith(S.String, { nullable: true }),
              time: S.optionalWith(S.String, { nullable: true }),
              iso_639_1: S.optionalWith(S.String, { nullable: true }),
              iso_3166_1: S.optionalWith(S.String, { nullable: true }),
              value: S.optionalWith(
                S.Struct({
                  poster: S.optionalWith(
                    S.Struct({
                      file_path: S.optionalWith(S.String, { nullable: true }),
                    }),
                    { nullable: true }
                  ),
                }),
                { nullable: true }
              ),
            })
          ),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class MovieCreditsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class MovieCredits200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  cast: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        cast_id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        character: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  crew: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        department: S.optionalWith(S.String, { nullable: true }),
        job: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class MovieExternalIds200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  imdb_id: S.optionalWith(S.String, { nullable: true }),
  facebook_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MovieKeywords200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  keywords: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class MovieListsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class MovieLists200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        description: S.optionalWith(S.String, { nullable: true }),
        favorite_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        item_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        list_type: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieRecommendationsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class MovieRecommendations200 extends S.Struct({}) {}

export class MovieReleaseDates200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        release_dates: S.optionalWith(
          S.Array(
            S.Struct({
              certification: S.optionalWith(S.String, { nullable: true }),
              iso_639_1: S.optionalWith(S.String, { nullable: true }),
              note: S.optionalWith(S.String, { nullable: true }),
              release_date: S.optionalWith(S.String, { nullable: true }),
              type: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
            })
          ),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class MovieReviewsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class MovieReviews200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        author: S.optionalWith(S.String, { nullable: true }),
        author_details: S.optionalWith(
          S.Struct({
            name: S.optionalWith(S.String, { nullable: true }),
            username: S.optionalWith(S.String, { nullable: true }),
            avatar_path: S.optionalWith(S.String, { nullable: true }),
          }),
          { nullable: true }
        ),
        content: S.optionalWith(S.String, { nullable: true }),
        created_at: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.String, { nullable: true }),
        updated_at: S.optionalWith(S.String, { nullable: true }),
        url: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieSimilarParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class MovieSimilar200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieTranslations200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  translations: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        english_name: S.optionalWith(S.String, { nullable: true }),
        data: S.optionalWith(
          S.Struct({
            homepage: S.optionalWith(S.String, { nullable: true }),
            overview: S.optionalWith(S.String, { nullable: true }),
            runtime: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            tagline: S.optionalWith(S.String, { nullable: true }),
            title: S.optionalWith(S.String, { nullable: true }),
          }),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class MovieVideosParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class MovieVideos200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        key: S.optionalWith(S.String, { nullable: true }),
        site: S.optionalWith(S.String, { nullable: true }),
        size: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        type: S.optionalWith(S.String, { nullable: true }),
        official: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        published_at: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class MovieWatchProviders200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Struct({
      AE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      AL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      AR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      AT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      AU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BB: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BS: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CV: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      EC: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      EE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      EG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ES: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          ads: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      FI: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      FJ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      FR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GB: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GF: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GI: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HN: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          ads: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ID: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IN: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IQ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IS: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      JM: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      JO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      JP: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      KR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      KW: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      LB: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      LI: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      LT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      LV: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MD: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MX: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      OM: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PS: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      QA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      RO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      RS: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      RU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SI: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SM: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SV: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TW: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      UG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      US: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      UY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      VE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      YE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ZA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
    }),
    { nullable: true }
  ),
}) {}

export class MovieAddRatingParams extends S.Struct({
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
  session_id: S.optionalWith(S.String, { nullable: true }),
  "Content-Type": S.String.pipe(
    S.propertySignature,
    S.withConstructorDefault(() => "application/json;charset=utf-8" as const)
  ),
}) {}

export class MovieAddRatingRequest extends S.Class<MovieAddRatingRequest>(
  "MovieAddRatingRequest"
)({
  RAW_BODY: S.String,
}) {}

export class MovieAddRating200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MovieDeleteRatingParams extends S.Struct({
  "Content-Type": S.optionalWith(S.String, {
    nullable: true,
    default: () => "application/json;charset=utf-8" as const,
  }),
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
  session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MovieDeleteRating200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AuthenticationCreateGuestSession200 extends S.Struct({
  success: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
  expires_at: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AuthenticationCreateRequestToken200 extends S.Struct({
  success: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  expires_at: S.optionalWith(S.String, { nullable: true }),
  request_token: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AuthenticationCreateSessionRequest extends S.Class<AuthenticationCreateSessionRequest>(
  "AuthenticationCreateSessionRequest"
)({
  RAW_BODY: S.String,
}) {}

export class AuthenticationCreateSession200 extends S.Struct({
  success: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AuthenticationCreateSessionFromV4TokenRequest extends S.Class<AuthenticationCreateSessionFromV4TokenRequest>(
  "AuthenticationCreateSessionFromV4TokenRequest"
)({
  RAW_BODY: S.String,
}) {}

export class AuthenticationCreateSessionFromV4Token200 extends S.Struct({
  success: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AuthenticationDeleteSessionRequest extends S.Class<AuthenticationDeleteSessionRequest>(
  "AuthenticationDeleteSessionRequest"
)({
  RAW_BODY: S.String,
}) {}

export class AuthenticationDeleteSession200 extends S.Struct({
  success: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
}) {}

export class FindByIdParams extends S.Struct({
  external_source: S.Literal(
    "",
    "imdb_id",
    "facebook_id",
    "instagram_id",
    "tvdb_id",
    "tiktok_id",
    "twitter_id",
    "wikidata_id",
    "youtube_id"
  ),
  language: S.optionalWith(S.String, { nullable: true }),
}) {}

export class FindById200 extends S.Struct({
  movie_results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        title: S.optionalWith(S.String, { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        media_type: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class PersonDetailsParams extends S.Struct({
  append_to_response: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class PersonDetails200 extends S.Struct({
  adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  also_known_as: S.optionalWith(S.Array(S.String), { nullable: true }),
  biography: S.optionalWith(S.String, { nullable: true }),
  birthday: S.optionalWith(S.String, { nullable: true }),
  gender: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  imdb_id: S.optionalWith(S.String, { nullable: true }),
  known_for_department: S.optionalWith(S.String, { nullable: true }),
  name: S.optionalWith(S.String, { nullable: true }),
  place_of_birth: S.optionalWith(S.String, { nullable: true }),
  popularity: S.optionalWith(S.Number, {
    nullable: true,
    default: () => 0 as const,
  }),
  profile_path: S.optionalWith(S.String, { nullable: true }),
}) {}

export class PersonChangesParams extends S.Struct({
  end_date: S.optionalWith(S.String, { nullable: true }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  start_date: S.optionalWith(S.String, { nullable: true }),
}) {}

export class PersonChanges200 extends S.Struct({
  changes: S.optionalWith(
    S.Array(
      S.Struct({
        key: S.optionalWith(S.String, { nullable: true }),
        items: S.optionalWith(
          S.Array(
            S.Struct({
              id: S.optionalWith(S.String, { nullable: true }),
              action: S.optionalWith(S.String, { nullable: true }),
              time: S.optionalWith(S.String, { nullable: true }),
              iso_639_1: S.optionalWith(S.String, { nullable: true }),
              iso_3166_1: S.optionalWith(S.String, { nullable: true }),
              value: S.optionalWith(S.String, { nullable: true }),
            })
          ),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeriesChangesParams extends S.Struct({
  end_date: S.optionalWith(S.String, { nullable: true }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  start_date: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeriesChanges200 extends S.Struct({
  changes: S.optionalWith(
    S.Array(
      S.Struct({
        key: S.optionalWith(S.String, { nullable: true }),
        items: S.optionalWith(
          S.Array(
            S.Struct({
              id: S.optionalWith(S.String, { nullable: true }),
              action: S.optionalWith(S.String, { nullable: true }),
              time: S.optionalWith(S.String, { nullable: true }),
              iso_639_1: S.optionalWith(S.String, { nullable: true }),
              iso_3166_1: S.optionalWith(S.String, { nullable: true }),
              value: S.optionalWith(
                S.Struct({
                  poster: S.optionalWith(
                    S.Struct({
                      file_path: S.optionalWith(S.String, { nullable: true }),
                      iso_639_1: S.optionalWith(S.String, { nullable: true }),
                    }),
                    { nullable: true }
                  ),
                }),
                { nullable: true }
              ),
              original_value: S.optionalWith(
                S.Struct({
                  poster: S.optionalWith(
                    S.Struct({
                      file_path: S.optionalWith(S.String, { nullable: true }),
                      iso_639_1: S.optionalWith(S.String, { nullable: true }),
                    }),
                    { nullable: true }
                  ),
                }),
                { nullable: true }
              ),
            })
          ),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class PersonImages200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  profiles: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class PersonMovieCreditsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class PersonMovieCredits200 extends S.Struct({
  cast: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        character: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  crew: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        department: S.optionalWith(S.String, { nullable: true }),
        job: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class PersonTvCreditsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class PersonTvCredits200 extends S.Struct({
  cast: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        character: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        episode_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  crew: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        department: S.optionalWith(S.String, { nullable: true }),
        episode_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        job: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class PersonCombinedCreditsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class PersonCombinedCredits200 extends S.Struct({
  cast: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        character: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        media_type: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  crew: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        department: S.optionalWith(S.String, { nullable: true }),
        job: S.optionalWith(S.String, { nullable: true }),
        media_type: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class PersonExternalIds200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  freebase_mid: S.optionalWith(S.String, { nullable: true }),
  freebase_id: S.optionalWith(S.String, { nullable: true }),
  imdb_id: S.optionalWith(S.String, { nullable: true }),
  tvrage_id: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  wikidata_id: S.optionalWith(S.String, { nullable: true }),
  facebook_id: S.optionalWith(S.String, { nullable: true }),
  instagram_id: S.optionalWith(S.String, { nullable: true }),
  tiktok_id: S.optionalWith(S.String, { nullable: true }),
  twitter_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class PersonTaggedImagesParams extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class PersonTaggedImages200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.String, { nullable: true }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        image_type: S.optionalWith(S.String, { nullable: true }),
        media: S.optionalWith(
          S.Struct({
            adult: S.optionalWith(S.Boolean, {
              nullable: true,
              default: () => true as const,
            }),
            backdrop_path: S.optionalWith(S.String, { nullable: true }),
            id: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            title: S.optionalWith(S.String, { nullable: true }),
            original_language: S.optionalWith(S.String, { nullable: true }),
            original_title: S.optionalWith(S.String, { nullable: true }),
            overview: S.optionalWith(S.String, { nullable: true }),
            poster_path: S.optionalWith(S.String, { nullable: true }),
            media_type: S.optionalWith(S.String, { nullable: true }),
            genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
            popularity: S.optionalWith(S.Number, {
              nullable: true,
              default: () => 0 as const,
            }),
            release_date: S.optionalWith(S.String, { nullable: true }),
            video: S.optionalWith(S.Boolean, {
              nullable: true,
              default: () => true as const,
            }),
            vote_average: S.optionalWith(S.Number, {
              nullable: true,
              default: () => 0 as const,
            }),
            vote_count: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          }),
          { nullable: true }
        ),
        media_type: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class Translations200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  translations: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        english_name: S.optionalWith(S.String, { nullable: true }),
        data: S.optionalWith(
          S.Struct({
            biography: S.optionalWith(S.String, { nullable: true }),
            name: S.optionalWith(S.String, { nullable: true }),
          }),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class PersonPopularListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class PersonPopularList200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for: S.optionalWith(
          S.Array(
            S.Struct({
              adult: S.optionalWith(S.Boolean, {
                nullable: true,
                default: () => true as const,
              }),
              backdrop_path: S.optionalWith(S.String, { nullable: true }),
              genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
              id: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              media_type: S.optionalWith(S.String, { nullable: true }),
              original_language: S.optionalWith(S.String, { nullable: true }),
              original_title: S.optionalWith(S.String, { nullable: true }),
              overview: S.optionalWith(S.String, { nullable: true }),
              poster_path: S.optionalWith(S.String, { nullable: true }),
              release_date: S.optionalWith(S.String, { nullable: true }),
              title: S.optionalWith(S.String, { nullable: true }),
              video: S.optionalWith(S.Boolean, {
                nullable: true,
                default: () => true as const,
              }),
              vote_average: S.optionalWith(S.Number, {
                nullable: true,
                default: () => 0 as const,
              }),
              vote_count: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
            })
          ),
          { nullable: true }
        ),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MoviePopularListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  region: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MoviePopularList200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieTopRatedListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  region: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MovieTopRatedList200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieUpcomingListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  region: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MovieUpcomingList200 extends S.Struct({
  dates: S.optionalWith(
    S.Struct({
      maximum: S.optionalWith(S.String, { nullable: true }),
      minimum: S.optionalWith(S.String, { nullable: true }),
    }),
    { nullable: true }
  ),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieNowPlayingListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  region: S.optionalWith(S.String, { nullable: true }),
}) {}

export class MovieNowPlayingList200 extends S.Struct({
  dates: S.optionalWith(
    S.Struct({
      maximum: S.optionalWith(S.String, { nullable: true }),
      minimum: S.optionalWith(S.String, { nullable: true }),
    }),
    { nullable: true }
  ),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvSeriesAiringTodayListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  timezone: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeriesAiringTodayList200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvSeriesOnTheAirListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  timezone: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeriesOnTheAirList200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvSeriesPopularListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class TvSeriesPopularList200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvSeriesTopRatedListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class TvSeriesTopRatedList200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class MovieLatestId200 extends S.Struct({
  adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  budget: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  homepage: S.optionalWith(S.String, { nullable: true }),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  original_language: S.optionalWith(S.String, { nullable: true }),
  original_title: S.optionalWith(S.String, { nullable: true }),
  overview: S.optionalWith(S.String, { nullable: true }),
  popularity: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  release_date: S.optionalWith(S.String, { nullable: true }),
  revenue: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  runtime: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  status: S.optionalWith(S.String, { nullable: true }),
  tagline: S.optionalWith(S.String, { nullable: true }),
  title: S.optionalWith(S.String, { nullable: true }),
  video: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  vote_average: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  vote_count: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvSeriesLatestId200 extends S.Struct({
  adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  first_air_date: S.optionalWith(S.String, { nullable: true }),
  homepage: S.optionalWith(S.String, { nullable: true }),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  in_production: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  last_air_date: S.optionalWith(S.String, { nullable: true }),
  last_episode_to_air: S.optionalWith(
    S.Struct({
      id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
      name: S.optionalWith(S.String, { nullable: true }),
      overview: S.optionalWith(S.String, { nullable: true }),
      vote_average: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      vote_count: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      air_date: S.optionalWith(S.String, { nullable: true }),
      episode_number: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      production_code: S.optionalWith(S.String, { nullable: true }),
      season_number: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      show_id: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
    }),
    { nullable: true }
  ),
  name: S.optionalWith(S.String, { nullable: true }),
  number_of_episodes: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  number_of_seasons: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
  original_language: S.optionalWith(S.String, { nullable: true }),
  original_name: S.optionalWith(S.String, { nullable: true }),
  overview: S.optionalWith(S.String, { nullable: true }),
  popularity: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  seasons: S.optionalWith(
    S.Array(
      S.Struct({
        episode_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        season_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  status: S.optionalWith(S.String, { nullable: true }),
  tagline: S.optionalWith(S.String, { nullable: true }),
  type: S.optionalWith(S.String, { nullable: true }),
  vote_average: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  vote_count: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvSeriesAggregateCreditsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvSeriesAggregateCredits200 extends S.Struct({
  cast: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        roles: S.optionalWith(
          S.Array(
            S.Struct({
              credit_id: S.optionalWith(S.String, { nullable: true }),
              character: S.optionalWith(S.String, { nullable: true }),
              episode_count: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
            })
          ),
          { nullable: true }
        ),
        total_episode_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  crew: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        jobs: S.optionalWith(
          S.Array(
            S.Struct({
              credit_id: S.optionalWith(S.String, { nullable: true }),
              job: S.optionalWith(S.String, { nullable: true }),
              episode_count: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
            })
          ),
          { nullable: true }
        ),
        department: S.optionalWith(S.String, { nullable: true }),
        total_episode_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class TvSeriesAlternativeTitles200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        type: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeriesContentRatings200 extends S.Struct({
  results: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        rating: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class TvSeriesCreditsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvSeriesCredits200 extends S.Struct({
  cast: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        character: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  crew: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        department: S.optionalWith(S.String, { nullable: true }),
        job: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class TvSeriesEpisodeGroups200 extends S.Struct({
  results: S.optionalWith(
    S.Array(
      S.Struct({
        description: S.optionalWith(S.String, { nullable: true }),
        episode_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        group_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        network: S.optionalWith(
          S.Struct({
            id: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            logo_path: S.optionalWith(S.String, { nullable: true }),
            name: S.optionalWith(S.String, { nullable: true }),
            origin_country: S.optionalWith(S.String, { nullable: true }),
          }),
          { nullable: true }
        ),
        type: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class TvSeriesExternalIds200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  imdb_id: S.optionalWith(S.String, { nullable: true }),
  freebase_mid: S.optionalWith(S.String, { nullable: true }),
  freebase_id: S.optionalWith(S.String, { nullable: true }),
  tvdb_id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  tvrage_id: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  wikidata_id: S.optionalWith(S.String, { nullable: true }),
  facebook_id: S.optionalWith(S.String, { nullable: true }),
  instagram_id: S.optionalWith(S.String, { nullable: true }),
  twitter_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeriesKeywords200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        name: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeriesRecommendationsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class TvSeriesRecommendations200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        media_type: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvSeriesReviewsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class TvSeriesReviews200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        author: S.optionalWith(S.String, { nullable: true }),
        author_details: S.optionalWith(
          S.Struct({
            name: S.optionalWith(S.String, { nullable: true }),
            username: S.optionalWith(S.String, { nullable: true }),
            avatar_path: S.optionalWith(S.String, { nullable: true }),
            rating: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          }),
          { nullable: true }
        ),
        content: S.optionalWith(S.String, { nullable: true }),
        created_at: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.String, { nullable: true }),
        updated_at: S.optionalWith(S.String, { nullable: true }),
        url: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvSeriesScreenedTheatrically200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        episode_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        season_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeriesSimilarParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class TvSeriesSimilar200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvSeriesTranslations200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  translations: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        english_name: S.optionalWith(S.String, { nullable: true }),
        data: S.optionalWith(
          S.Struct({
            name: S.optionalWith(S.String, { nullable: true }),
            overview: S.optionalWith(S.String, { nullable: true }),
            homepage: S.optionalWith(S.String, { nullable: true }),
            tagline: S.optionalWith(S.String, { nullable: true }),
          }),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeriesVideosParams extends S.Struct({
  include_video_language: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvSeriesVideos200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        key: S.optionalWith(S.String, { nullable: true }),
        site: S.optionalWith(S.String, { nullable: true }),
        size: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        type: S.optionalWith(S.String, { nullable: true }),
        official: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        published_at: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeriesWatchProviders200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Struct({
      AE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      AR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      AT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      AU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BB: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BS: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CI: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      EC: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      EG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ES: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      FI: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      FR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GB: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GF: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GQ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HN: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ID: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IQ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      JM: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      JP: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      KE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      KR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      LB: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      LT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      LY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MD: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MX: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PS: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      RO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      RS: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      RU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          ads: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SC: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SI: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SN: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SV: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TW: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      UG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      US: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          free: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      UY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      VE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ZA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ZM: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
    }),
    { nullable: true }
  ),
}) {}

export class TvSeriesAddRatingParams extends S.Struct({
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
  session_id: S.optionalWith(S.String, { nullable: true }),
  "Content-Type": S.String.pipe(
    S.propertySignature,
    S.withConstructorDefault(() => "application/json;charset=utf-8" as const)
  ),
}) {}

export class TvSeriesAddRatingRequest extends S.Class<TvSeriesAddRatingRequest>(
  "TvSeriesAddRatingRequest"
)({
  RAW_BODY: S.String,
}) {}

export class TvSeriesAddRating200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeriesDeleteRatingParams extends S.Struct({
  "Content-Type": S.optionalWith(S.String, {
    nullable: true,
    default: () => "application/json;charset=utf-8" as const,
  }),
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
  session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeriesDeleteRating200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeasonAccountStatesParams extends S.Struct({
  session_id: S.optionalWith(S.String, { nullable: true }),
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeasonAccountStates200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        episode_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        rated: S.optionalWith(
          S.Struct({
            value: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          }),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeasonAggregateCreditsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvSeasonAggregateCredits200 extends S.Struct({
  cast: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        roles: S.optionalWith(
          S.Array(
            S.Struct({
              credit_id: S.optionalWith(S.String, { nullable: true }),
              character: S.optionalWith(S.String, { nullable: true }),
              episode_count: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
            })
          ),
          { nullable: true }
        ),
        total_episode_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  crew: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        jobs: S.optionalWith(
          S.Array(
            S.Struct({
              credit_id: S.optionalWith(S.String, { nullable: true }),
              job: S.optionalWith(S.String, { nullable: true }),
              episode_count: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
            })
          ),
          { nullable: true }
        ),
        department: S.optionalWith(S.String, { nullable: true }),
        total_episode_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class TvSeasonChangesByIdParams extends S.Struct({
  end_date: S.optionalWith(S.String, { nullable: true }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  start_date: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeasonChangesById200 extends S.Struct({
  changes: S.optionalWith(
    S.Array(
      S.Struct({
        key: S.optionalWith(S.String, { nullable: true }),
        items: S.optionalWith(
          S.Array(
            S.Struct({
              id: S.optionalWith(S.String, { nullable: true }),
              action: S.optionalWith(S.String, { nullable: true }),
              time: S.optionalWith(S.String, { nullable: true }),
              value: S.optionalWith(
                S.Struct({
                  episode_id: S.optionalWith(S.Int, {
                    nullable: true,
                    default: () => 0 as const,
                  }),
                  episode_number: S.optionalWith(S.Int, {
                    nullable: true,
                    default: () => 0 as const,
                  }),
                }),
                { nullable: true }
              ),
            })
          ),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeasonCreditsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvSeasonCredits200 extends S.Struct({
  cast: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        character: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  crew: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        department: S.optionalWith(S.String, { nullable: true }),
        job: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class TvSeasonExternalIds200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  freebase_mid: S.optionalWith(S.String, { nullable: true }),
  freebase_id: S.optionalWith(S.String, { nullable: true }),
  tvdb_id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  wikidata_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvSeasonTranslations200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  translations: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        english_name: S.optionalWith(S.String, { nullable: true }),
        data: S.optionalWith(
          S.Struct({
            name: S.optionalWith(S.String, { nullable: true }),
            overview: S.optionalWith(S.String, { nullable: true }),
          }),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvSeasonVideosParams extends S.Struct({
  include_video_language: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvSeasonVideos200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        key: S.optionalWith(S.String, { nullable: true }),
        site: S.optionalWith(S.String, { nullable: true }),
        size: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        type: S.optionalWith(S.String, { nullable: true }),
        official: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        published_at: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvEpisodeCreditsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvEpisodeCredits200 extends S.Struct({
  cast: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
        character: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  crew: S.optionalWith(
    S.Array(
      S.Struct({
        department: S.optionalWith(S.String, { nullable: true }),
        job: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  guest_stars: S.optionalWith(
    S.Array(
      S.Struct({
        character: S.optionalWith(S.String, { nullable: true }),
        credit_id: S.optionalWith(S.String, { nullable: true }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        gender: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        known_for_department: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        profile_path: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class TvEpisodeExternalIds200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  imdb_id: S.optionalWith(S.String, { nullable: true }),
  freebase_mid: S.optionalWith(S.String, { nullable: true }),
  freebase_id: S.optionalWith(S.String, { nullable: true }),
  tvdb_id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  tvrage_id: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  wikidata_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvEpisodeTranslations200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  translations: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        english_name: S.optionalWith(S.String, { nullable: true }),
        data: S.optionalWith(
          S.Struct({
            name: S.optionalWith(S.String, { nullable: true }),
            overview: S.optionalWith(S.String, { nullable: true }),
          }),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvEpisodeVideosParams extends S.Struct({
  include_video_language: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvEpisodeVideos200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        key: S.optionalWith(S.String, { nullable: true }),
        site: S.optionalWith(S.String, { nullable: true }),
        size: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        type: S.optionalWith(S.String, { nullable: true }),
        official: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        published_at: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvEpisodeAddRatingParams extends S.Struct({
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
  session_id: S.optionalWith(S.String, { nullable: true }),
  "Content-Type": S.String.pipe(
    S.propertySignature,
    S.withConstructorDefault(() => "application/json;charset=utf-8" as const)
  ),
}) {}

export class TvEpisodeAddRatingRequest extends S.Class<TvEpisodeAddRatingRequest>(
  "TvEpisodeAddRatingRequest"
)({
  RAW_BODY: S.String,
}) {}

export class TvEpisodeAddRating200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvEpisodeDeleteRatingParams extends S.Struct({
  "Content-Type": S.optionalWith(S.String, {
    nullable: true,
    default: () => "application/json;charset=utf-8" as const,
  }),
  guest_session_id: S.optionalWith(S.String, { nullable: true }),
  session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class TvEpisodeDeleteRating200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AccountDetailsParams extends S.Struct({
  session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AccountDetails200 extends S.Struct({
  avatar: S.optionalWith(
    S.Struct({
      gravatar: S.optionalWith(
        S.Struct({
          hash: S.optionalWith(S.String, { nullable: true }),
        }),
        { nullable: true }
      ),
      tmdb: S.optionalWith(
        S.Struct({
          avatar_path: S.optionalWith(S.String, { nullable: true }),
        }),
        { nullable: true }
      ),
    }),
    { nullable: true }
  ),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  iso_639_1: S.optionalWith(S.String, { nullable: true }),
  iso_3166_1: S.optionalWith(S.String, { nullable: true }),
  name: S.optionalWith(S.String, { nullable: true }),
  include_adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  username: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AccountListsParams extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AccountLists200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        description: S.optionalWith(S.String, { nullable: true }),
        favorite_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        item_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        list_type: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class AccountGetFavoritesParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  session_id: S.optionalWith(S.String, { nullable: true }),
  sort_by: S.optionalWith(S.Literal("created_at.asc", "created_at.desc"), {
    nullable: true,
    default: () => "created_at.asc" as const,
  }),
}) {}

export class AccountGetFavorites200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class AccountFavoriteTvParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  session_id: S.optionalWith(S.String, { nullable: true }),
  sort_by: S.optionalWith(S.Literal("created_at.asc", "created_at.desc"), {
    nullable: true,
    default: () => "created_at.asc" as const,
  }),
}) {}

export class AccountFavoriteTv200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class AccountRatedMoviesParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  session_id: S.optionalWith(S.String, { nullable: true }),
  sort_by: S.optionalWith(S.Literal("created_at.asc", "created_at.desc"), {
    nullable: true,
    default: () => "created_at.asc" as const,
  }),
}) {}

export class AccountRatedMovies200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        rating: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class AccountRatedTvParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  session_id: S.optionalWith(S.String, { nullable: true }),
  sort_by: S.optionalWith(S.Literal("created_at.asc", "created_at.desc"), {
    nullable: true,
    default: () => "created_at.asc" as const,
  }),
}) {}

export class AccountRatedTv200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        rating: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class AccountRatedTvEpisodesParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  session_id: S.optionalWith(S.String, { nullable: true }),
  sort_by: S.optionalWith(S.Literal("created_at.asc", "created_at.desc"), {
    nullable: true,
    default: () => "created_at.asc" as const,
  }),
}) {}

export class AccountRatedTvEpisodes200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        air_date: S.optionalWith(S.String, { nullable: true }),
        episode_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        production_code: S.optionalWith(S.String, { nullable: true }),
        runtime: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        season_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        show_id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        still_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        rating: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class AccountWatchlistMoviesParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  session_id: S.optionalWith(S.String, { nullable: true }),
  sort_by: S.optionalWith(S.Literal("created_at.asc", "created_at.desc"), {
    nullable: true,
    default: () => "created_at.asc" as const,
  }),
}) {}

export class AccountWatchlistMovies200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class AccountWatchlistTvParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  session_id: S.optionalWith(S.String, { nullable: true }),
  sort_by: S.optionalWith(S.Literal("created_at.asc", "created_at.desc"), {
    nullable: true,
    default: () => "created_at.asc" as const,
  }),
}) {}

export class AccountWatchlistTv200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class AccountAddFavoriteParams extends S.Struct({
  session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AccountAddFavoriteRequest extends S.Class<AccountAddFavoriteRequest>(
  "AccountAddFavoriteRequest"
)({
  RAW_BODY: S.String,
}) {}

export class AccountAddFavorite200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AccountAddToWatchlistParams extends S.Struct({
  session_id: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AccountAddToWatchlistRequest extends S.Class<AccountAddToWatchlistRequest>(
  "AccountAddToWatchlistRequest"
)({
  RAW_BODY: S.String,
}) {}

export class AccountAddToWatchlist200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class CertificationMovieList200 extends S.Struct({
  certifications: S.optionalWith(
    S.Struct({
      AU: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      BG: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      BR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      CA: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      "CA-QC": S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      DE: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      DK: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      ES: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      FI: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      FR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      GB: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      HU: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      IN: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      IT: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      LT: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      MY: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      NL: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      NO: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      NZ: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      PH: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      PT: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      RU: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      SE: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      US: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      KR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      SK: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      TH: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      MX: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      ID: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      TR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      AR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      GR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      TW: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      ZA: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      SG: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      IE: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      PR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      JP: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      VI: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      CH: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      IL: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      HK: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      MO: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      LV: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      LU: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
    }),
    { nullable: true }
  ),
}) {}

export class CertificationsTvList200 extends S.Struct({
  certifications: S.optionalWith(
    S.Struct({
      AU: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      BR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      CA: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      "CA-QC": S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      DE: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      ES: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      FR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      GB: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      HU: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      KR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      LT: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      NL: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      PH: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      PT: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      RU: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      SK: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      TH: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      US: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      IT: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      FI: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      MY: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      NZ: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      NO: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      BG: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      MX: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      IN: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      DK: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      SE: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      ID: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      TR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      AR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      PL: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      MA: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      GR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      IL: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      TW: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      ZA: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      SG: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      PR: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
      VI: S.optionalWith(
        S.Array(
          S.Struct({
            certification: S.optionalWith(S.String, { nullable: true }),
            meaning: S.optionalWith(S.String, { nullable: true }),
            order: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
    }),
    { nullable: true }
  ),
}) {}

export class ChangesMovieListParams extends S.Struct({
  end_date: S.optionalWith(S.String, { nullable: true }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  start_date: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ChangesMovieList200 extends S.Struct({
  results: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
      })
    ),
    { nullable: true }
  ),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class ChangesTvListParams extends S.Struct({
  end_date: S.optionalWith(S.String, { nullable: true }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  start_date: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ChangesTvList200 extends S.Struct({
  results: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
      })
    ),
    { nullable: true }
  ),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class ChangesPeopleListParams extends S.Struct({
  end_date: S.optionalWith(S.String, { nullable: true }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  start_date: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ChangesPeopleList200 extends S.Struct({
  results: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
      })
    ),
    { nullable: true }
  ),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class CollectionDetailsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class CollectionDetails200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  name: S.optionalWith(S.String, { nullable: true }),
  overview: S.optionalWith(S.String, { nullable: true }),
  poster_path: S.optionalWith(S.String, { nullable: true }),
  backdrop_path: S.optionalWith(S.String, { nullable: true }),
  parts: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        title: S.optionalWith(S.String, { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        media_type: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class CollectionImagesParams extends S.Struct({
  include_image_language: S.optionalWith(S.String, { nullable: true }),
  language: S.optionalWith(S.String, { nullable: true }),
}) {}

export class CollectionImages200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  backdrops: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  posters: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class CollectionTranslations200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  translations: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        english_name: S.optionalWith(S.String, { nullable: true }),
        data: S.optionalWith(
          S.Struct({
            title: S.optionalWith(S.String, { nullable: true }),
            overview: S.optionalWith(S.String, { nullable: true }),
            homepage: S.optionalWith(S.String, { nullable: true }),
          }),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class CompanyDetails200 extends S.Struct({
  description: S.optionalWith(S.String, { nullable: true }),
  headquarters: S.optionalWith(S.String, { nullable: true }),
  homepage: S.optionalWith(S.String, { nullable: true }),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  logo_path: S.optionalWith(S.String, { nullable: true }),
  name: S.optionalWith(S.String, { nullable: true }),
  origin_country: S.optionalWith(S.String, { nullable: true }),
}) {}

export class CompanyAlternativeNames200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        name: S.optionalWith(S.String, { nullable: true }),
        type: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class CompanyImages200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  logos: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.String, { nullable: true }),
        file_type: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class CreditDetails200 extends S.Struct({
  credit_type: S.optionalWith(S.String, { nullable: true }),
  department: S.optionalWith(S.String, { nullable: true }),
  job: S.optionalWith(S.String, { nullable: true }),
  media: S.optionalWith(
    S.Struct({
      adult: S.optionalWith(S.Boolean, {
        nullable: true,
        default: () => true as const,
      }),
      backdrop_path: S.optionalWith(S.String, { nullable: true }),
      id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
      name: S.optionalWith(S.String, { nullable: true }),
      original_language: S.optionalWith(S.String, { nullable: true }),
      original_name: S.optionalWith(S.String, { nullable: true }),
      overview: S.optionalWith(S.String, { nullable: true }),
      poster_path: S.optionalWith(S.String, { nullable: true }),
      media_type: S.optionalWith(S.String, { nullable: true }),
      genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
      popularity: S.optionalWith(S.Number, {
        nullable: true,
        default: () => 0 as const,
      }),
      first_air_date: S.optionalWith(S.String, { nullable: true }),
      vote_average: S.optionalWith(S.Number, {
        nullable: true,
        default: () => 0 as const,
      }),
      vote_count: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
      character: S.optionalWith(S.String, { nullable: true }),
      seasons: S.optionalWith(
        S.Array(
          S.Struct({
            air_date: S.optionalWith(S.String, { nullable: true }),
            episode_count: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            id: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            name: S.optionalWith(S.String, { nullable: true }),
            overview: S.optionalWith(S.String, { nullable: true }),
            poster_path: S.optionalWith(S.String, { nullable: true }),
            season_number: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            show_id: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          })
        ),
        { nullable: true }
      ),
    }),
    { nullable: true }
  ),
  media_type: S.optionalWith(S.String, { nullable: true }),
  id: S.optionalWith(S.String, { nullable: true }),
  person: S.optionalWith(
    S.Struct({
      adult: S.optionalWith(S.Boolean, {
        nullable: true,
        default: () => true as const,
      }),
      id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
      name: S.optionalWith(S.String, { nullable: true }),
      original_name: S.optionalWith(S.String, { nullable: true }),
      media_type: S.optionalWith(S.String, { nullable: true }),
      popularity: S.optionalWith(S.Number, {
        nullable: true,
        default: () => 0 as const,
      }),
      gender: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
      known_for_department: S.optionalWith(S.String, { nullable: true }),
      profile_path: S.optionalWith(S.String, { nullable: true }),
    }),
    { nullable: true }
  ),
}) {}

export class GenreMovieListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en" as const,
  }),
}) {}

export class GenreMovieList200 extends S.Struct({
  genres: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class GenreTvListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en" as const,
  }),
}) {}

export class GenreTvList200 extends S.Struct({
  genres: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class GuestSessionRatedMoviesParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  sort_by: S.optionalWith(S.Literal("created_at.asc", "created_at.desc"), {
    nullable: true,
    default: () => "created_at.asc" as const,
  }),
}) {}

export class GuestSessionRatedMovies200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        rating: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class GuestSessionRatedTvParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  sort_by: S.optionalWith(S.Literal("created_at.asc", "created_at.desc"), {
    nullable: true,
    default: () => "created_at.asc" as const,
  }),
}) {}

export class GuestSessionRatedTv200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        origin_country: S.optionalWith(S.Array(S.String), { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        first_air_date: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        rating: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class GuestSessionRatedTvEpisodesParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  sort_by: S.optionalWith(S.Literal("created_at.asc", "created_at.desc"), {
    nullable: true,
    default: () => "created_at.asc" as const,
  }),
}) {}

export class GuestSessionRatedTvEpisodes200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        air_date: S.optionalWith(S.String, { nullable: true }),
        episode_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        production_code: S.optionalWith(S.String, { nullable: true }),
        runtime: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        season_number: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        show_id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        still_path: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        rating: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class WatchProvidersAvailableRegionsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class WatchProvidersAvailableRegions200 extends S.Struct({
  results: S.optionalWith(
    S.Array(
      S.Struct({
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        english_name: S.optionalWith(S.String, { nullable: true }),
        native_name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class WatchProvidersMovieListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  watch_region: S.optionalWith(S.String, { nullable: true }),
}) {}

export class WatchProvidersMovieList200 extends S.Struct({
  results: S.optionalWith(
    S.Array(
      S.Struct({
        display_priorities: S.optionalWith(
          S.Struct({
            CA: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            AE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            AR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            AT: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            AU: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            BE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            BO: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            BR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            BG: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CH: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CL: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CO: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CZ: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            DE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            DK: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            EC: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            EE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            EG: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            ES: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            FI: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            FR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            GB: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            GR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            GT: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            HK: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            HN: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            HU: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            ID: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            IE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            IN: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            IT: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            JP: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            LT: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            LV: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            MX: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            MY: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            NL: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            NO: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            NZ: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            PE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            PH: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            PL: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            PT: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            PY: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            RU: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            SA: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            SE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            SG: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            SK: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            TH: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            TR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            TW: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            US: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            VE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            ZA: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            SI: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CV: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            GH: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            MU: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            MZ: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            UG: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            IL: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          }),
          { nullable: true }
        ),
        display_priority: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        logo_path: S.optionalWith(S.String, { nullable: true }),
        provider_name: S.optionalWith(S.String, { nullable: true }),
        provider_id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class WatchProviderTvListParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  watch_region: S.optionalWith(S.String, { nullable: true }),
}) {}

export class WatchProviderTvList200 extends S.Struct({
  results: S.optionalWith(
    S.Array(
      S.Struct({
        display_priorities: S.optionalWith(
          S.Struct({
            CA: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            AE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            AR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            AT: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            AU: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            BE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            BO: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            BR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            BG: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CH: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CL: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CO: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CZ: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            DE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            DK: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            EC: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            EE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            EG: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            ES: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            FI: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            FR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            GB: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            GR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            GT: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            HK: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            HN: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            HU: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            ID: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            IE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            IN: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            IT: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            JP: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            LT: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            LV: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            MX: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            MY: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            NL: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            NO: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            NZ: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            PE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            PH: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            PL: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            PT: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            PY: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            RU: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            SA: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            SE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            SG: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            SK: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            TH: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            TR: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            TW: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            US: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            VE: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            ZA: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            SI: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            CV: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            GH: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            MU: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            MZ: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            UG: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
            IL: S.optionalWith(S.Int, {
              nullable: true,
              default: () => 0 as const,
            }),
          }),
          { nullable: true }
        ),
        display_priority: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        logo_path: S.optionalWith(S.String, { nullable: true }),
        provider_name: S.optionalWith(S.String, { nullable: true }),
        provider_id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class KeywordDetails200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  name: S.optionalWith(S.String, { nullable: true }),
}) {}

export class KeywordMoviesParams extends S.Struct({
  include_adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => false as const,
  }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class KeywordMovies200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class ListDetailsParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class ListDetails200 extends S.Struct({
  created_by: S.optionalWith(S.String, { nullable: true }),
  description: S.optionalWith(S.String, { nullable: true }),
  favorite_count: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  id: S.optionalWith(S.String, { nullable: true }),
  items: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        genre_ids: S.optionalWith(S.Array(S.Int), { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        media_type: S.optionalWith(S.String, { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_title: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        popularity: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
        release_date: S.optionalWith(S.String, { nullable: true }),
        title: S.optionalWith(S.String, { nullable: true }),
        video: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        vote_average: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
  item_count: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  iso_639_1: S.optionalWith(S.String, { nullable: true }),
  name: S.optionalWith(S.String, { nullable: true }),
  poster_path: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ListDeleteParams extends S.Struct({
  session_id: S.String,
}) {}

export class ListDelete200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ListCheckItemStatusParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  movie_id: S.optionalWith(S.Int, { nullable: true }),
}) {}

export class ListCheckItemStatus200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  item_present: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
}) {}

export class ListCreateParams extends S.Struct({
  session_id: S.String,
}) {}

export class ListCreateRequest extends S.Class<ListCreateRequest>(
  "ListCreateRequest"
)({
  RAW_BODY: S.String,
}) {}

export class ListCreate200 extends S.Struct({
  status_message: S.optionalWith(S.String, { nullable: true }),
  success: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  list_id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class ListAddMovieParams extends S.Struct({
  session_id: S.String,
}) {}

export class ListAddMovieRequest extends S.Class<ListAddMovieRequest>(
  "ListAddMovieRequest"
)({
  RAW_BODY: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ListAddMovie200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ListRemoveMovieParams extends S.Struct({
  session_id: S.String,
}) {}

export class ListRemoveMovieRequest extends S.Class<ListRemoveMovieRequest>(
  "ListRemoveMovieRequest"
)({
  RAW_BODY: S.String,
}) {}

export class ListRemoveMovie200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class ListClearParams extends S.Struct({
  session_id: S.String,
  confirm: S.Boolean.pipe(
    S.propertySignature,
    S.withConstructorDefault(() => false as const)
  ),
}) {}

export class ListClear200 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class NetworkDetails200 extends S.Struct({
  headquarters: S.optionalWith(S.String, { nullable: true }),
  homepage: S.optionalWith(S.String, { nullable: true }),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  logo_path: S.optionalWith(S.String, { nullable: true }),
  name: S.optionalWith(S.String, { nullable: true }),
  origin_country: S.optionalWith(S.String, { nullable: true }),
}) {}

export class DetailsCopy200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        name: S.optionalWith(S.String, { nullable: true }),
        type: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class AlternativeNamesCopy200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  logos: S.optionalWith(
    S.Array(
      S.Struct({
        aspect_ratio: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        file_path: S.optionalWith(S.String, { nullable: true }),
        height: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.String, { nullable: true }),
        file_type: S.optionalWith(S.String, { nullable: true }),
        vote_average: S.optionalWith(S.Number, {
          nullable: true,
          default: () => 0 as const,
        }),
        vote_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        width: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
      })
    ),
    { nullable: true }
  ),
}) {}

export class ReviewDetails200 extends S.Struct({
  id: S.optionalWith(S.String, { nullable: true }),
  author: S.optionalWith(S.String, { nullable: true }),
  author_details: S.optionalWith(
    S.Struct({
      name: S.optionalWith(S.String, { nullable: true }),
      username: S.optionalWith(S.String, { nullable: true }),
      avatar_path: S.optionalWith(S.String, { nullable: true }),
      rating: S.optionalWith(S.Int, {
        nullable: true,
        default: () => 0 as const,
      }),
    }),
    { nullable: true }
  ),
  content: S.optionalWith(S.String, { nullable: true }),
  created_at: S.optionalWith(S.String, { nullable: true }),
  iso_639_1: S.optionalWith(S.String, { nullable: true }),
  media_id: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  media_title: S.optionalWith(S.String, { nullable: true }),
  media_type: S.optionalWith(S.String, { nullable: true }),
  updated_at: S.optionalWith(S.String, { nullable: true }),
  url: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AuthenticationValidateKey200 extends S.Struct({
  success: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
}) {}

export class AuthenticationValidateKey401 extends S.Struct({
  status_code: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  status_message: S.optionalWith(S.String, { nullable: true }),
  success: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
}) {}

export class TvSeasonWatchProvidersParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class TvSeasonWatchProviders200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Struct({
      AE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      AR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      AT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      AU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BB: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      BS: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CI: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      CZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      DZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      EC: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      EG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ES: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      FI: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      FR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GB: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GF: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GQ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      GT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HN: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      HU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ID: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IQ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      IT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      JM: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      JP: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      KE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      KR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      LB: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      LY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MD: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MX: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      MZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      NZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PL: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          rent: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PS: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      PY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      RO: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      RS: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      RU: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SC: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SI: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SK: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SN: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      SV: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TH: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TR: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TT: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TW: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      TZ: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      UG: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      US: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          buy: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          free: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      UY: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      VE: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ZA: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
      ZM: S.optionalWith(
        S.Struct({
          link: S.optionalWith(S.String, { nullable: true }),
          flatrate: S.optionalWith(
            S.Array(
              S.Struct({
                logo_path: S.optionalWith(S.String, { nullable: true }),
                provider_id: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
                provider_name: S.optionalWith(S.String, { nullable: true }),
                display_priority: S.optionalWith(S.Int, {
                  nullable: true,
                  default: () => 0 as const,
                }),
              })
            ),
            { nullable: true }
          ),
        }),
        { nullable: true }
      ),
    }),
    { nullable: true }
  ),
}) {}

export class ConfigurationCountriesParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
}) {}

export class ConfigurationCountries200 extends S.Array(
  S.Struct({
    iso_3166_1: S.optionalWith(S.String, { nullable: true }),
    english_name: S.optionalWith(S.String, { nullable: true }),
    native_name: S.optionalWith(S.String, { nullable: true }),
  })
) {}

export class ConfigurationJobs200 extends S.Array(
  S.Struct({
    department: S.optionalWith(S.String, { nullable: true }),
    jobs: S.optionalWith(S.Array(S.String), { nullable: true }),
  })
) {}

export class ConfigurationLanguages200 extends S.Array(
  S.Struct({
    iso_639_1: S.optionalWith(S.String, { nullable: true }),
    english_name: S.optionalWith(S.String, { nullable: true }),
    name: S.optionalWith(S.String, { nullable: true }),
  })
) {}

export class ConfigurationPrimaryTranslations200 extends S.Array(S.String) {}

export class ConfigurationTimezones200 extends S.Array(
  S.Struct({
    iso_3166_1: S.optionalWith(S.String, { nullable: true }),
    zones: S.optionalWith(S.Array(S.String), { nullable: true }),
  })
) {}

export class AuthenticationCreateSessionFromLoginRequest extends S.Class<AuthenticationCreateSessionFromLoginRequest>(
  "AuthenticationCreateSessionFromLoginRequest"
)({
  RAW_BODY: S.String,
}) {}

export class AuthenticationCreateSessionFromLogin200 extends S.Struct({
  success: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  expires_at: S.optionalWith(S.String, { nullable: true }),
  request_token: S.optionalWith(S.String, { nullable: true }),
}) {}

export class PersonLatestId200 extends S.Struct({
  adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => true as const,
  }),
  biography: S.optionalWith(S.String, { nullable: true }),
  gender: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  name: S.optionalWith(S.String, { nullable: true }),
  popularity: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class TvEpisodeChangesById200 extends S.Struct({
  changes: S.optionalWith(
    S.Array(
      S.Struct({
        key: S.optionalWith(S.String, { nullable: true }),
        items: S.optionalWith(
          S.Array(
            S.Struct({
              id: S.optionalWith(S.String, { nullable: true }),
              action: S.optionalWith(S.String, { nullable: true }),
              time: S.optionalWith(S.String, { nullable: true }),
              value: S.optionalWith(S.String, { nullable: true }),
            })
          ),
          { nullable: true }
        ),
      })
    ),
    { nullable: true }
  ),
}) {}

export class TvEpisodeGroupDetails200 extends S.Struct({
  description: S.optionalWith(S.String, { nullable: true }),
  episode_count: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  group_count: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  groups: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        order: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        episodes: S.optionalWith(
          S.Array(
            S.Struct({
              air_date: S.optionalWith(S.String, { nullable: true }),
              episode_number: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              id: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              name: S.optionalWith(S.String, { nullable: true }),
              overview: S.optionalWith(S.String, { nullable: true }),
              production_code: S.optionalWith(S.String, { nullable: true }),
              season_number: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              show_id: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              still_path: S.optionalWith(S.String, { nullable: true }),
              vote_average: S.optionalWith(S.Number, {
                nullable: true,
                default: () => 0 as const,
              }),
              vote_count: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
              order: S.optionalWith(S.Int, {
                nullable: true,
                default: () => 0 as const,
              }),
            })
          ),
          { nullable: true }
        ),
        locked: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
      })
    ),
    { nullable: true }
  ),
  id: S.optionalWith(S.String, { nullable: true }),
  name: S.optionalWith(S.String, { nullable: true }),
  network: S.optionalWith(
    S.Struct({
      id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
      logo_path: S.optionalWith(S.String, { nullable: true }),
      name: S.optionalWith(S.String, { nullable: true }),
      origin_country: S.optionalWith(S.String, { nullable: true }),
    }),
    { nullable: true }
  ),
  type: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
}) {}

export class SearchCompanyParams extends S.Struct({
  query: S.String,
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class SearchCompany200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        logo_path: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
        origin_country: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class SearchCollectionParams extends S.Struct({
  query: S.String,
  include_adult: S.optionalWith(S.Boolean, {
    nullable: true,
    default: () => false as const,
  }),
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
  region: S.optionalWith(S.String, { nullable: true }),
}) {}

export class SearchCollection200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        adult: S.optionalWith(S.Boolean, {
          nullable: true,
          default: () => true as const,
        }),
        backdrop_path: S.optionalWith(S.String, { nullable: true }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
        original_language: S.optionalWith(S.String, { nullable: true }),
        original_name: S.optionalWith(S.String, { nullable: true }),
        overview: S.optionalWith(S.String, { nullable: true }),
        poster_path: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class SearchKeywordParams extends S.Struct({
  query: S.String,
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class SearchKeyword200 extends S.Struct({
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export class ListsCopyParams extends S.Struct({
  language: S.optionalWith(S.String, {
    nullable: true,
    default: () => "en-US" as const,
  }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 1 as const }),
}) {}

export class ListsCopy200 extends S.Struct({
  id: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  page: S.optionalWith(S.Int, { nullable: true, default: () => 0 as const }),
  results: S.optionalWith(
    S.Array(
      S.Struct({
        description: S.optionalWith(S.String, { nullable: true }),
        favorite_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        id: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        item_count: S.optionalWith(S.Int, {
          nullable: true,
          default: () => 0 as const,
        }),
        iso_639_1: S.optionalWith(S.String, { nullable: true }),
        iso_3166_1: S.optionalWith(S.String, { nullable: true }),
        name: S.optionalWith(S.String, { nullable: true }),
      })
    ),
    { nullable: true }
  ),
  total_pages: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
  total_results: S.optionalWith(S.Int, {
    nullable: true,
    default: () => 0 as const,
  }),
}) {}

export const make = (httpClient: HttpClient.HttpClient): Client => {
  const unexpectedStatus = (
    request: HttpClientRequest.HttpClientRequest,
    response: HttpClientResponse.HttpClientResponse
  ) =>
    Effect.flatMap(
      Effect.orElseSucceed(response.text, () => "Unexpected status code"),
      (description) =>
        Effect.fail(
          new HttpClientError.ResponseError({
            request,
            response,
            reason: "StatusCode",
            description,
          })
        )
    );
  const decodeError = <A, I, R>(
    response: HttpClientResponse.HttpClientResponse,
    schema: S.Schema<A, I, R>
  ) =>
    Effect.flatMap(
      HttpClientResponse.schemaBodyJson(schema)(response),
      Effect.fail
    );
  return {
    searchMovie: (options) =>
      HttpClientRequest.make("GET")(`/3/search/movie`).pipe(
        HttpClientRequest.setUrlParams({
          query: options["query"],
          include_adult: options["include_adult"],
          language: options["language"],
          primary_release_year: options["primary_release_year"],
          page: options["page"],
          region: options["region"],
          year: options["year"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(SearchMovie200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    discoverMovie: (options) =>
      HttpClientRequest.make("GET")(`/3/discover/movie`).pipe(
        HttpClientRequest.setUrlParams({
          certification: options["certification"],
          "certification.gte": options["certification.gte"],
          "certification.lte": options["certification.lte"],
          certification_country: options["certification_country"],
          include_adult: options["include_adult"],
          include_video: options["include_video"],
          language: options["language"],
          page: options["page"],
          primary_release_year: options["primary_release_year"],
          "primary_release_date.gte": options["primary_release_date.gte"],
          "primary_release_date.lte": options["primary_release_date.lte"],
          region: options["region"],
          "release_date.gte": options["release_date.gte"],
          "release_date.lte": options["release_date.lte"],
          sort_by: options["sort_by"],
          "vote_average.gte": options["vote_average.gte"],
          "vote_average.lte": options["vote_average.lte"],
          "vote_count.gte": options["vote_count.gte"],
          "vote_count.lte": options["vote_count.lte"],
          watch_region: options["watch_region"],
          with_cast: options["with_cast"],
          with_companies: options["with_companies"],
          with_crew: options["with_crew"],
          with_genres: options["with_genres"],
          with_keywords: options["with_keywords"],
          with_origin_country: options["with_origin_country"],
          with_original_language: options["with_original_language"],
          with_people: options["with_people"],
          with_release_type: options["with_release_type"],
          "with_runtime.gte": options["with_runtime.gte"],
          "with_runtime.lte": options["with_runtime.lte"],
          with_watch_monetization_types:
            options["with_watch_monetization_types"],
          with_watch_providers: options["with_watch_providers"],
          without_companies: options["without_companies"],
          without_genres: options["without_genres"],
          without_keywords: options["without_keywords"],
          without_watch_providers: options["without_watch_providers"],
          year: options["year"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(DiscoverMovie200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieDetails: (movieId, options) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}`).pipe(
        HttpClientRequest.setUrlParams({
          append_to_response: options["append_to_response"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesDetails: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}`).pipe(
        HttpClientRequest.setUrlParams({
          append_to_response: options["append_to_response"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    searchTv: (options) =>
      HttpClientRequest.make("GET")(`/3/search/tv`).pipe(
        HttpClientRequest.setUrlParams({
          query: options["query"],
          first_air_date_year: options["first_air_date_year"],
          include_adult: options["include_adult"],
          language: options["language"],
          page: options["page"],
          year: options["year"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) => HttpClientResponse.schemaBodyJson(SearchTv200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    searchMulti: (options) =>
      HttpClientRequest.make("GET")(`/3/search/multi`).pipe(
        HttpClientRequest.setUrlParams({
          query: options["query"],
          include_adult: options["include_adult"],
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(SearchMulti200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    searchPerson: (options) =>
      HttpClientRequest.make("GET")(`/3/search/person`).pipe(
        HttpClientRequest.setUrlParams({
          query: options["query"],
          include_adult: options["include_adult"],
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(SearchPerson200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    configurationDetails: () =>
      HttpClientRequest.make("GET")(`/3/configuration`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ConfigurationDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeasonDetails: (seriesId, seasonNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}`
      ).pipe(
        HttpClientRequest.setUrlParams({
          append_to_response: options["append_to_response"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeasonDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeDetails: (seriesId, seasonNumber, episodeNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`
      ).pipe(
        HttpClientRequest.setUrlParams({
          append_to_response: options["append_to_response"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    discoverTv: (options) =>
      HttpClientRequest.make("GET")(`/3/discover/tv`).pipe(
        HttpClientRequest.setUrlParams({
          "air_date.gte": options["air_date.gte"],
          "air_date.lte": options["air_date.lte"],
          first_air_date_year: options["first_air_date_year"],
          "first_air_date.gte": options["first_air_date.gte"],
          "first_air_date.lte": options["first_air_date.lte"],
          include_adult: options["include_adult"],
          include_null_first_air_dates: options["include_null_first_air_dates"],
          language: options["language"],
          page: options["page"],
          screened_theatrically: options["screened_theatrically"],
          sort_by: options["sort_by"],
          timezone: options["timezone"],
          "vote_average.gte": options["vote_average.gte"],
          "vote_average.lte": options["vote_average.lte"],
          "vote_count.gte": options["vote_count.gte"],
          "vote_count.lte": options["vote_count.lte"],
          watch_region: options["watch_region"],
          with_companies: options["with_companies"],
          with_genres: options["with_genres"],
          with_keywords: options["with_keywords"],
          with_networks: options["with_networks"],
          with_origin_country: options["with_origin_country"],
          with_original_language: options["with_original_language"],
          "with_runtime.gte": options["with_runtime.gte"],
          "with_runtime.lte": options["with_runtime.lte"],
          with_status: options["with_status"],
          with_watch_monetization_types:
            options["with_watch_monetization_types"],
          with_watch_providers: options["with_watch_providers"],
          without_companies: options["without_companies"],
          without_genres: options["without_genres"],
          without_keywords: options["without_keywords"],
          without_watch_providers: options["without_watch_providers"],
          with_type: options["with_type"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) => HttpClientResponse.schemaBodyJson(DiscoverTv200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieImages: (movieId, options) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/images`).pipe(
        HttpClientRequest.setUrlParams({
          include_image_language: options["include_image_language"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieImages200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesImages: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/images`).pipe(
        HttpClientRequest.setUrlParams({
          include_image_language: options["include_image_language"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesImages200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeasonImages: (seriesId, seasonNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/images`
      ).pipe(
        HttpClientRequest.setUrlParams({
          include_image_language: options["include_image_language"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeasonImages200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeImages: (seriesId, seasonNumber, episodeNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/images`
      ).pipe(
        HttpClientRequest.setUrlParams({
          include_image_language: options["include_image_language"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeImages200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    trendingAll: (timeWindow, options) =>
      HttpClientRequest.make("GET")(`/3/trending/all/${timeWindow}`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TrendingAll200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    trendingMovies: (timeWindow, options) =>
      HttpClientRequest.make("GET")(`/3/trending/movie/${timeWindow}`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TrendingMovies200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    trendingTv: (timeWindow, options) =>
      HttpClientRequest.make("GET")(`/3/trending/tv/${timeWindow}`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) => HttpClientResponse.schemaBodyJson(TrendingTv200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieAccountStates: (movieId, options) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/account_states`).pipe(
        HttpClientRequest.setUrlParams({
          session_id: options["session_id"],
          guest_session_id: options["guest_session_id"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieAccountStates200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesAccountStates: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/account_states`).pipe(
        HttpClientRequest.setUrlParams({
          session_id: options["session_id"],
          guest_session_id: options["guest_session_id"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesAccountStates200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeAccountStates: (seriesId, seasonNumber, episodeNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/account_states`
      ).pipe(
        HttpClientRequest.setUrlParams({
          session_id: options["session_id"],
          guest_session_id: options["guest_session_id"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeAccountStates200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    trendingPeople: (timeWindow, options) =>
      HttpClientRequest.make("GET")(`/3/trending/person/${timeWindow}`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TrendingPeople200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieAlternativeTitles: (movieId, options) =>
      HttpClientRequest.make("GET")(
        `/3/movie/${movieId}/alternative_titles`
      ).pipe(
        HttpClientRequest.setUrlParams({ country: options["country"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieAlternativeTitles200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieChanges: (movieId, options) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/changes`).pipe(
        HttpClientRequest.setUrlParams({
          end_date: options["end_date"],
          page: options["page"],
          start_date: options["start_date"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieChanges200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieCredits: (movieId, options) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/credits`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieCredits200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieExternalIds: (movieId) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/external_ids`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieExternalIds200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieKeywords: (movieId) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/keywords`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieKeywords200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieLists: (movieId, options) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/lists`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) => HttpClientResponse.schemaBodyJson(MovieLists200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieRecommendations: (movieId, options) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/recommendations`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieRecommendations200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieReleaseDates: (movieId) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/release_dates`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieReleaseDates200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieReviews: (movieId, options) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/reviews`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieReviews200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieSimilar: (movieId, options) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/similar`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieSimilar200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieTranslations: (movieId) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/translations`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieTranslations200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieVideos: (movieId, options) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/videos`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieVideos200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieWatchProviders: (movieId) =>
      HttpClientRequest.make("GET")(`/3/movie/${movieId}/watch/providers`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieWatchProviders200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieAddRating: (movieId, options) =>
      HttpClientRequest.make("POST")(`/3/movie/${movieId}/rating`).pipe(
        HttpClientRequest.setUrlParams({
          guest_session_id: options.params["guest_session_id"],
          session_id: options.params["session_id"],
        }),
        HttpClientRequest.setHeaders({
          "Content-Type": options.params["Content-Type"],
        }),
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options.payload)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieAddRating200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieDeleteRating: (movieId, options) =>
      HttpClientRequest.make("DELETE")(`/3/movie/${movieId}/rating`).pipe(
        HttpClientRequest.setUrlParams({
          guest_session_id: options["guest_session_id"],
          session_id: options["session_id"],
        }),
        HttpClientRequest.setHeaders({
          "Content-Type": options["Content-Type"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieDeleteRating200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    authenticationCreateGuestSession: () =>
      HttpClientRequest.make("GET")(`/3/authentication/guest_session/new`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(
                  AuthenticationCreateGuestSession200
                )(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    authenticationCreateRequestToken: () =>
      HttpClientRequest.make("GET")(`/3/authentication/token/new`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(
                  AuthenticationCreateRequestToken200
                )(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    authenticationCreateSession: (options) =>
      HttpClientRequest.make("POST")(`/3/authentication/session/new`).pipe(
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(
                  AuthenticationCreateSession200
                )(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    authenticationCreateSessionFromV4Token: (options) =>
      HttpClientRequest.make("POST")(
        `/3/authentication/session/convert/4`
      ).pipe(
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(
                  AuthenticationCreateSessionFromV4Token200
                )(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    authenticationDeleteSession: (options) =>
      HttpClientRequest.make("DELETE")(`/3/authentication/session`).pipe(
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(
                  AuthenticationDeleteSession200
                )(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    findById: (externalId, options) =>
      HttpClientRequest.make("GET")(`/3/find/${externalId}`).pipe(
        HttpClientRequest.setUrlParams({
          external_source: options["external_source"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) => HttpClientResponse.schemaBodyJson(FindById200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    personDetails: (personId, options) =>
      HttpClientRequest.make("GET")(`/3/person/${personId}`).pipe(
        HttpClientRequest.setUrlParams({
          append_to_response: options["append_to_response"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(PersonDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    personChanges: (personId, options) =>
      HttpClientRequest.make("GET")(`/3/person/${personId}/changes`).pipe(
        HttpClientRequest.setUrlParams({
          end_date: options["end_date"],
          page: options["page"],
          start_date: options["start_date"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(PersonChanges200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesChanges: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/changes`).pipe(
        HttpClientRequest.setUrlParams({
          end_date: options["end_date"],
          page: options["page"],
          start_date: options["start_date"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesChanges200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    personImages: (personId) =>
      HttpClientRequest.make("GET")(`/3/person/${personId}/images`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(PersonImages200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    personMovieCredits: (personId, options) =>
      HttpClientRequest.make("GET")(`/3/person/${personId}/movie_credits`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(PersonMovieCredits200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    personTvCredits: (personId, options) =>
      HttpClientRequest.make("GET")(`/3/person/${personId}/tv_credits`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(PersonTvCredits200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    personCombinedCredits: (personId, options) =>
      HttpClientRequest.make("GET")(
        `/3/person/${personId}/combined_credits`
      ).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(PersonCombinedCredits200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    personExternalIds: (personId) =>
      HttpClientRequest.make("GET")(`/3/person/${personId}/external_ids`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(PersonExternalIds200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    personTaggedImages: (personId, options) =>
      HttpClientRequest.make("GET")(`/3/person/${personId}/tagged_images`).pipe(
        HttpClientRequest.setUrlParams({ page: options["page"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(PersonTaggedImages200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    translations: (personId) =>
      HttpClientRequest.make("GET")(`/3/person/${personId}/translations`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(Translations200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    personPopularList: (options) =>
      HttpClientRequest.make("GET")(`/3/person/popular`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(PersonPopularList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    moviePopularList: (options) =>
      HttpClientRequest.make("GET")(`/3/movie/popular`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          region: options["region"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MoviePopularList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieTopRatedList: (options) =>
      HttpClientRequest.make("GET")(`/3/movie/top_rated`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          region: options["region"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieTopRatedList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieUpcomingList: (options) =>
      HttpClientRequest.make("GET")(`/3/movie/upcoming`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          region: options["region"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieUpcomingList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieNowPlayingList: (options) =>
      HttpClientRequest.make("GET")(`/3/movie/now_playing`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          region: options["region"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieNowPlayingList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesAiringTodayList: (options) =>
      HttpClientRequest.make("GET")(`/3/tv/airing_today`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          timezone: options["timezone"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesAiringTodayList200)(
                  r
                ),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesOnTheAirList: (options) =>
      HttpClientRequest.make("GET")(`/3/tv/on_the_air`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          timezone: options["timezone"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesOnTheAirList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesPopularList: (options) =>
      HttpClientRequest.make("GET")(`/3/tv/popular`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesPopularList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesTopRatedList: (options) =>
      HttpClientRequest.make("GET")(`/3/tv/top_rated`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesTopRatedList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    movieLatestId: () =>
      HttpClientRequest.make("GET")(`/3/movie/latest`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(MovieLatestId200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesLatestId: () =>
      HttpClientRequest.make("GET")(`/3/tv/latest`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesLatestId200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesAggregateCredits: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/aggregate_credits`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesAggregateCredits200)(
                  r
                ),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesAlternativeTitles: (seriesId) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/alternative_titles`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesAlternativeTitles200)(
                  r
                ),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesContentRatings: (seriesId) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/content_ratings`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesContentRatings200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesCredits: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/credits`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesCredits200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesEpisodeGroups: (seriesId) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/episode_groups`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesEpisodeGroups200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesExternalIds: (seriesId) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/external_ids`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesExternalIds200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesKeywords: (seriesId) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/keywords`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesKeywords200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesRecommendations: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/recommendations`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesRecommendations200)(
                  r
                ),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesReviews: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/reviews`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesReviews200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesScreenedTheatrically: (seriesId) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/screened_theatrically`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(
                  TvSeriesScreenedTheatrically200
                )(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesSimilar: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/similar`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesSimilar200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesTranslations: (seriesId) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/translations`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesTranslations200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesVideos: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/videos`).pipe(
        HttpClientRequest.setUrlParams({
          include_video_language: options["include_video_language"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesVideos200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesWatchProviders: (seriesId) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/watch/providers`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesWatchProviders200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesAddRating: (seriesId, options) =>
      HttpClientRequest.make("POST")(`/3/tv/${seriesId}/rating`).pipe(
        HttpClientRequest.setUrlParams({
          guest_session_id: options.params["guest_session_id"],
          session_id: options.params["session_id"],
        }),
        HttpClientRequest.setHeaders({
          "Content-Type": options.params["Content-Type"],
        }),
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options.payload)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesAddRating200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeriesDeleteRating: (seriesId, options) =>
      HttpClientRequest.make("DELETE")(`/3/tv/${seriesId}/rating`).pipe(
        HttpClientRequest.setUrlParams({
          guest_session_id: options["guest_session_id"],
          session_id: options["session_id"],
        }),
        HttpClientRequest.setHeaders({
          "Content-Type": options["Content-Type"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeriesDeleteRating200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeasonAccountStates: (seriesId, seasonNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/account_states`
      ).pipe(
        HttpClientRequest.setUrlParams({
          session_id: options["session_id"],
          guest_session_id: options["guest_session_id"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeasonAccountStates200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeasonAggregateCredits: (seriesId, seasonNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/aggregate_credits`
      ).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeasonAggregateCredits200)(
                  r
                ),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeasonChangesById: (seasonId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/season/${seasonId}/changes`).pipe(
        HttpClientRequest.setUrlParams({
          end_date: options["end_date"],
          page: options["page"],
          start_date: options["start_date"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeasonChangesById200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeasonCredits: (seriesId, seasonNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/credits`
      ).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeasonCredits200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeasonExternalIds: (seriesId, seasonNumber) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/external_ids`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeasonExternalIds200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeasonTranslations: (seriesId, seasonNumber) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/translations`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeasonTranslations200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeasonVideos: (seriesId, seasonNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/videos`
      ).pipe(
        HttpClientRequest.setUrlParams({
          include_video_language: options["include_video_language"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeasonVideos200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeCredits: (seriesId, seasonNumber, episodeNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits`
      ).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeCredits200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeExternalIds: (seriesId, seasonNumber, episodeNumber) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/external_ids`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeExternalIds200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeTranslations: (seriesId, seasonNumber, episodeNumber) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/translations`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeTranslations200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeVideos: (seriesId, seasonNumber, episodeNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/videos`
      ).pipe(
        HttpClientRequest.setUrlParams({
          include_video_language: options["include_video_language"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeVideos200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeAddRating: (seriesId, seasonNumber, episodeNumber, options) =>
      HttpClientRequest.make("POST")(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/rating`
      ).pipe(
        HttpClientRequest.setUrlParams({
          guest_session_id: options.params["guest_session_id"],
          session_id: options.params["session_id"],
        }),
        HttpClientRequest.setHeaders({
          "Content-Type": options.params["Content-Type"],
        }),
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options.payload)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeAddRating200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeDeleteRating: (seriesId, seasonNumber, episodeNumber, options) =>
      HttpClientRequest.make("DELETE")(
        `/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/rating`
      ).pipe(
        HttpClientRequest.setUrlParams({
          guest_session_id: options["guest_session_id"],
          session_id: options["session_id"],
        }),
        HttpClientRequest.setHeaders({
          "Content-Type": options["Content-Type"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeDeleteRating200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountDetails: (accountId, options) =>
      HttpClientRequest.make("GET")(`/3/account/${accountId}`).pipe(
        HttpClientRequest.setUrlParams({ session_id: options["session_id"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountLists: (accountId, options) =>
      HttpClientRequest.make("GET")(`/3/account/${accountId}/lists`).pipe(
        HttpClientRequest.setUrlParams({
          page: options["page"],
          session_id: options["session_id"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountLists200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountGetFavorites: (accountId, options) =>
      HttpClientRequest.make("GET")(
        `/3/account/${accountId}/favorite/movies`
      ).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          session_id: options["session_id"],
          sort_by: options["sort_by"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountGetFavorites200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountFavoriteTv: (accountId, options) =>
      HttpClientRequest.make("GET")(`/3/account/${accountId}/favorite/tv`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          session_id: options["session_id"],
          sort_by: options["sort_by"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountFavoriteTv200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountRatedMovies: (accountId, options) =>
      HttpClientRequest.make("GET")(
        `/3/account/${accountId}/rated/movies`
      ).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          session_id: options["session_id"],
          sort_by: options["sort_by"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountRatedMovies200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountRatedTv: (accountId, options) =>
      HttpClientRequest.make("GET")(`/3/account/${accountId}/rated/tv`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          session_id: options["session_id"],
          sort_by: options["sort_by"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountRatedTv200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountRatedTvEpisodes: (accountId, options) =>
      HttpClientRequest.make("GET")(
        `/3/account/${accountId}/rated/tv/episodes`
      ).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          session_id: options["session_id"],
          sort_by: options["sort_by"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountRatedTvEpisodes200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountWatchlistMovies: (accountId, options) =>
      HttpClientRequest.make("GET")(
        `/3/account/${accountId}/watchlist/movies`
      ).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          session_id: options["session_id"],
          sort_by: options["sort_by"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountWatchlistMovies200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountWatchlistTv: (accountId, options) =>
      HttpClientRequest.make("GET")(
        `/3/account/${accountId}/watchlist/tv`
      ).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          session_id: options["session_id"],
          sort_by: options["sort_by"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountWatchlistTv200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountAddFavorite: (accountId, options) =>
      HttpClientRequest.make("POST")(`/3/account/${accountId}/favorite`).pipe(
        HttpClientRequest.setUrlParams({
          session_id: options.params["session_id"],
        }),
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options.payload)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountAddFavorite200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    accountAddToWatchlist: (accountId, options) =>
      HttpClientRequest.make("POST")(`/3/account/${accountId}/watchlist`).pipe(
        HttpClientRequest.setUrlParams({
          session_id: options.params["session_id"],
        }),
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options.payload)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AccountAddToWatchlist200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    certificationMovieList: () =>
      HttpClientRequest.make("GET")(`/3/certification/movie/list`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(CertificationMovieList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    certificationsTvList: () =>
      HttpClientRequest.make("GET")(`/3/certification/tv/list`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(CertificationsTvList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    changesMovieList: (options) =>
      HttpClientRequest.make("GET")(`/3/movie/changes`).pipe(
        HttpClientRequest.setUrlParams({
          end_date: options["end_date"],
          page: options["page"],
          start_date: options["start_date"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ChangesMovieList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    changesTvList: (options) =>
      HttpClientRequest.make("GET")(`/3/tv/changes`).pipe(
        HttpClientRequest.setUrlParams({
          end_date: options["end_date"],
          page: options["page"],
          start_date: options["start_date"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ChangesTvList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    changesPeopleList: (options) =>
      HttpClientRequest.make("GET")(`/3/person/changes`).pipe(
        HttpClientRequest.setUrlParams({
          end_date: options["end_date"],
          page: options["page"],
          start_date: options["start_date"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ChangesPeopleList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    collectionDetails: (collectionId, options) =>
      HttpClientRequest.make("GET")(`/3/collection/${collectionId}`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(CollectionDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    collectionImages: (collectionId, options) =>
      HttpClientRequest.make("GET")(
        `/3/collection/${collectionId}/images`
      ).pipe(
        HttpClientRequest.setUrlParams({
          include_image_language: options["include_image_language"],
          language: options["language"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(CollectionImages200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    collectionTranslations: (collectionId) =>
      HttpClientRequest.make("GET")(
        `/3/collection/${collectionId}/translations`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(CollectionTranslations200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    companyDetails: (companyId) =>
      HttpClientRequest.make("GET")(`/3/company/${companyId}`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(CompanyDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    companyAlternativeNames: (companyId) =>
      HttpClientRequest.make("GET")(
        `/3/company/${companyId}/alternative_names`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(CompanyAlternativeNames200)(
                  r
                ),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    companyImages: (companyId) =>
      HttpClientRequest.make("GET")(`/3/company/${companyId}/images`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(CompanyImages200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    creditDetails: (creditId) =>
      HttpClientRequest.make("GET")(`/3/credit/${creditId}`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(CreditDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    genreMovieList: (options) =>
      HttpClientRequest.make("GET")(`/3/genre/movie/list`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(GenreMovieList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    genreTvList: (options) =>
      HttpClientRequest.make("GET")(`/3/genre/tv/list`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(GenreTvList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    guestSessionRatedMovies: (guestSessionId, options) =>
      HttpClientRequest.make("GET")(
        `/3/guest_session/${guestSessionId}/rated/movies`
      ).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          sort_by: options["sort_by"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(GuestSessionRatedMovies200)(
                  r
                ),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    guestSessionRatedTv: (guestSessionId, options) =>
      HttpClientRequest.make("GET")(
        `/3/guest_session/${guestSessionId}/rated/tv`
      ).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          sort_by: options["sort_by"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(GuestSessionRatedTv200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    guestSessionRatedTvEpisodes: (guestSessionId, options) =>
      HttpClientRequest.make("GET")(
        `/3/guest_session/${guestSessionId}/rated/tv/episodes`
      ).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
          sort_by: options["sort_by"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(
                  GuestSessionRatedTvEpisodes200
                )(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    watchProvidersAvailableRegions: (options) =>
      HttpClientRequest.make("GET")(`/3/watch/providers/regions`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(
                  WatchProvidersAvailableRegions200
                )(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    watchProvidersMovieList: (options) =>
      HttpClientRequest.make("GET")(`/3/watch/providers/movie`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          watch_region: options["watch_region"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(WatchProvidersMovieList200)(
                  r
                ),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    watchProviderTvList: (options) =>
      HttpClientRequest.make("GET")(`/3/watch/providers/tv`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          watch_region: options["watch_region"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(WatchProviderTvList200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    keywordDetails: (keywordId) =>
      HttpClientRequest.make("GET")(`/3/keyword/${keywordId}`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(KeywordDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    keywordMovies: (keywordId, options) =>
      HttpClientRequest.make("GET")(`/3/keyword/${keywordId}/movies`).pipe(
        HttpClientRequest.setUrlParams({
          include_adult: options["include_adult"],
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(KeywordMovies200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    listDetails: (listId, options) =>
      HttpClientRequest.make("GET")(`/3/list/${listId}`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ListDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    listDelete: (listId, options) =>
      HttpClientRequest.make("DELETE")(`/3/list/${listId}`).pipe(
        HttpClientRequest.setUrlParams({ session_id: options["session_id"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) => HttpClientResponse.schemaBodyJson(ListDelete200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    listCheckItemStatus: (listId, options) =>
      HttpClientRequest.make("GET")(`/3/list/${listId}/item_status`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          movie_id: options["movie_id"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ListCheckItemStatus200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    listCreate: (options) =>
      HttpClientRequest.make("POST")(`/3/list`).pipe(
        HttpClientRequest.setUrlParams({
          session_id: options.params["session_id"],
        }),
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options.payload)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) => HttpClientResponse.schemaBodyJson(ListCreate200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    listAddMovie: (listId, options) =>
      HttpClientRequest.make("POST")(`/3/list/${listId}/add_item`).pipe(
        HttpClientRequest.setUrlParams({
          session_id: options.params["session_id"],
        }),
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options.payload)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ListAddMovie200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    listRemoveMovie: (listId, options) =>
      HttpClientRequest.make("POST")(`/3/list/${listId}/remove_item`).pipe(
        HttpClientRequest.setUrlParams({
          session_id: options.params["session_id"],
        }),
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options.payload)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ListRemoveMovie200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    listClear: (listId, options) =>
      HttpClientRequest.make("POST")(`/3/list/${listId}/clear`).pipe(
        HttpClientRequest.setUrlParams({
          session_id: options["session_id"],
          confirm: options["confirm"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) => HttpClientResponse.schemaBodyJson(ListClear200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    networkDetails: (networkId) =>
      HttpClientRequest.make("GET")(`/3/network/${networkId}`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(NetworkDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    detailsCopy: (networkId) =>
      HttpClientRequest.make("GET")(
        `/3/network/${networkId}/alternative_names`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(DetailsCopy200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    alternativeNamesCopy: (networkId) =>
      HttpClientRequest.make("GET")(`/3/network/${networkId}/images`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AlternativeNamesCopy200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    reviewDetails: (reviewId) =>
      HttpClientRequest.make("GET")(`/3/review/${reviewId}`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ReviewDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    authenticationValidateKey: () =>
      HttpClientRequest.make("GET")(`/3/authentication`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(AuthenticationValidateKey200)(
                  r
                ),
              "401": (r) => decodeError(r, AuthenticationValidateKey401),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvSeasonWatchProviders: (seriesId, seasonNumber, options) =>
      HttpClientRequest.make("GET")(
        `/3/tv/${seriesId}/season/${seasonNumber}/watch/providers`
      ).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvSeasonWatchProviders200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    configurationCountries: (options) =>
      HttpClientRequest.make("GET")(`/3/configuration/countries`).pipe(
        HttpClientRequest.setUrlParams({ language: options["language"] }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ConfigurationCountries200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    configurationJobs: () =>
      HttpClientRequest.make("GET")(`/3/configuration/jobs`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ConfigurationJobs200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    configurationLanguages: () =>
      HttpClientRequest.make("GET")(`/3/configuration/languages`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ConfigurationLanguages200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    configurationPrimaryTranslations: () =>
      HttpClientRequest.make("GET")(
        `/3/configuration/primary_translations`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(
                  ConfigurationPrimaryTranslations200
                )(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    configurationTimezones: () =>
      HttpClientRequest.make("GET")(`/3/configuration/timezones`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(ConfigurationTimezones200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    authenticationCreateSessionFromLogin: (options) =>
      HttpClientRequest.make("POST")(
        `/3/authentication/token/validate_with_login`
      ).pipe(
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(
                  AuthenticationCreateSessionFromLogin200
                )(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    personLatestId: () =>
      HttpClientRequest.make("GET")(`/3/person/latest`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(PersonLatestId200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeChangesById: (episodeId) =>
      HttpClientRequest.make("GET")(`/3/tv/episode/${episodeId}/changes`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeChangesById200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    tvEpisodeGroupDetails: (tvEpisodeGroupId) =>
      HttpClientRequest.make("GET")(
        `/3/tv/episode_group/${tvEpisodeGroupId}`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(TvEpisodeGroupDetails200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    searchCompany: (options) =>
      HttpClientRequest.make("GET")(`/3/search/company`).pipe(
        HttpClientRequest.setUrlParams({
          query: options["query"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(SearchCompany200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    searchCollection: (options) =>
      HttpClientRequest.make("GET")(`/3/search/collection`).pipe(
        HttpClientRequest.setUrlParams({
          query: options["query"],
          include_adult: options["include_adult"],
          language: options["language"],
          page: options["page"],
          region: options["region"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(SearchCollection200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    searchKeyword: (options) =>
      HttpClientRequest.make("GET")(`/3/search/keyword`).pipe(
        HttpClientRequest.setUrlParams({
          query: options["query"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) =>
                HttpClientResponse.schemaBodyJson(SearchKeyword200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
    listsCopy: (seriesId, options) =>
      HttpClientRequest.make("GET")(`/3/tv/${seriesId}/lists`).pipe(
        HttpClientRequest.setUrlParams({
          language: options["language"],
          page: options["page"],
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            httpClient.execute(request),
            HttpClientResponse.matchStatus({
              "200": (r) => HttpClientResponse.schemaBodyJson(ListsCopy200)(r),
              orElse: (response) => unexpectedStatus(request, response),
            })
          )
        ),
        Effect.scoped
      ),
  };
};

export interface Client {
  readonly searchMovie: (
    options: typeof SearchMovieParams.Encoded
  ) => Effect.Effect<
    typeof SearchMovie200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly discoverMovie: (
    options: typeof DiscoverMovieParams.Encoded
  ) => Effect.Effect<
    typeof DiscoverMovie200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieDetails: (
    movieId: string,
    options: typeof MovieDetailsParams.Encoded
  ) => Effect.Effect<
    typeof MovieDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesDetails: (
    seriesId: string,
    options: typeof TvSeriesDetailsParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly searchTv: (
    options: typeof SearchTvParams.Encoded
  ) => Effect.Effect<
    typeof SearchTv200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly searchMulti: (
    options: typeof SearchMultiParams.Encoded
  ) => Effect.Effect<
    typeof SearchMulti200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly searchPerson: (
    options: typeof SearchPersonParams.Encoded
  ) => Effect.Effect<
    typeof SearchPerson200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly configurationDetails: () => Effect.Effect<
    typeof ConfigurationDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeasonDetails: (
    seriesId: string,
    seasonNumber: string,
    options: typeof TvSeasonDetailsParams.Encoded
  ) => Effect.Effect<
    typeof TvSeasonDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeDetails: (
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string,
    options: typeof TvEpisodeDetailsParams.Encoded
  ) => Effect.Effect<
    typeof TvEpisodeDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly discoverTv: (
    options: typeof DiscoverTvParams.Encoded
  ) => Effect.Effect<
    typeof DiscoverTv200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieImages: (
    movieId: string,
    options: typeof MovieImagesParams.Encoded
  ) => Effect.Effect<
    typeof MovieImages200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesImages: (
    seriesId: string,
    options: typeof TvSeriesImagesParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesImages200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeasonImages: (
    seriesId: string,
    seasonNumber: string,
    options: typeof TvSeasonImagesParams.Encoded
  ) => Effect.Effect<
    typeof TvSeasonImages200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeImages: (
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string,
    options: typeof TvEpisodeImagesParams.Encoded
  ) => Effect.Effect<
    typeof TvEpisodeImages200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly trendingAll: (
    timeWindow: string,
    options: typeof TrendingAllParams.Encoded
  ) => Effect.Effect<
    typeof TrendingAll200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly trendingMovies: (
    timeWindow: string,
    options: typeof TrendingMoviesParams.Encoded
  ) => Effect.Effect<
    typeof TrendingMovies200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly trendingTv: (
    timeWindow: string,
    options: typeof TrendingTvParams.Encoded
  ) => Effect.Effect<
    typeof TrendingTv200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieAccountStates: (
    movieId: string,
    options: typeof MovieAccountStatesParams.Encoded
  ) => Effect.Effect<
    typeof MovieAccountStates200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesAccountStates: (
    seriesId: string,
    options: typeof TvSeriesAccountStatesParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesAccountStates200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeAccountStates: (
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string,
    options: typeof TvEpisodeAccountStatesParams.Encoded
  ) => Effect.Effect<
    typeof TvEpisodeAccountStates200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly trendingPeople: (
    timeWindow: string,
    options: typeof TrendingPeopleParams.Encoded
  ) => Effect.Effect<
    typeof TrendingPeople200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieAlternativeTitles: (
    movieId: string,
    options: typeof MovieAlternativeTitlesParams.Encoded
  ) => Effect.Effect<
    typeof MovieAlternativeTitles200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieChanges: (
    movieId: string,
    options: typeof MovieChangesParams.Encoded
  ) => Effect.Effect<
    typeof MovieChanges200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieCredits: (
    movieId: string,
    options: typeof MovieCreditsParams.Encoded
  ) => Effect.Effect<
    typeof MovieCredits200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieExternalIds: (
    movieId: string
  ) => Effect.Effect<
    typeof MovieExternalIds200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieKeywords: (
    movieId: string
  ) => Effect.Effect<
    typeof MovieKeywords200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieLists: (
    movieId: string,
    options: typeof MovieListsParams.Encoded
  ) => Effect.Effect<
    typeof MovieLists200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieRecommendations: (
    movieId: string,
    options: typeof MovieRecommendationsParams.Encoded
  ) => Effect.Effect<
    typeof MovieRecommendations200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieReleaseDates: (
    movieId: string
  ) => Effect.Effect<
    typeof MovieReleaseDates200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieReviews: (
    movieId: string,
    options: typeof MovieReviewsParams.Encoded
  ) => Effect.Effect<
    typeof MovieReviews200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieSimilar: (
    movieId: string,
    options: typeof MovieSimilarParams.Encoded
  ) => Effect.Effect<
    typeof MovieSimilar200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieTranslations: (
    movieId: string
  ) => Effect.Effect<
    typeof MovieTranslations200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieVideos: (
    movieId: string,
    options: typeof MovieVideosParams.Encoded
  ) => Effect.Effect<
    typeof MovieVideos200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieWatchProviders: (
    movieId: string
  ) => Effect.Effect<
    typeof MovieWatchProviders200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieAddRating: (
    movieId: string,
    options: {
      readonly params: typeof MovieAddRatingParams.Encoded;
      readonly payload: typeof MovieAddRatingRequest.Encoded;
    }
  ) => Effect.Effect<
    typeof MovieAddRating200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieDeleteRating: (
    movieId: string,
    options: typeof MovieDeleteRatingParams.Encoded
  ) => Effect.Effect<
    typeof MovieDeleteRating200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly authenticationCreateGuestSession: () => Effect.Effect<
    typeof AuthenticationCreateGuestSession200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly authenticationCreateRequestToken: () => Effect.Effect<
    typeof AuthenticationCreateRequestToken200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly authenticationCreateSession: (
    options: typeof AuthenticationCreateSessionRequest.Encoded
  ) => Effect.Effect<
    typeof AuthenticationCreateSession200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly authenticationCreateSessionFromV4Token: (
    options: typeof AuthenticationCreateSessionFromV4TokenRequest.Encoded
  ) => Effect.Effect<
    typeof AuthenticationCreateSessionFromV4Token200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly authenticationDeleteSession: (
    options: typeof AuthenticationDeleteSessionRequest.Encoded
  ) => Effect.Effect<
    typeof AuthenticationDeleteSession200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly findById: (
    externalId: string,
    options: typeof FindByIdParams.Encoded
  ) => Effect.Effect<
    typeof FindById200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly personDetails: (
    personId: string,
    options: typeof PersonDetailsParams.Encoded
  ) => Effect.Effect<
    typeof PersonDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly personChanges: (
    personId: string,
    options: typeof PersonChangesParams.Encoded
  ) => Effect.Effect<
    typeof PersonChanges200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesChanges: (
    seriesId: string,
    options: typeof TvSeriesChangesParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesChanges200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly personImages: (
    personId: string
  ) => Effect.Effect<
    typeof PersonImages200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly personMovieCredits: (
    personId: string,
    options: typeof PersonMovieCreditsParams.Encoded
  ) => Effect.Effect<
    typeof PersonMovieCredits200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly personTvCredits: (
    personId: string,
    options: typeof PersonTvCreditsParams.Encoded
  ) => Effect.Effect<
    typeof PersonTvCredits200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly personCombinedCredits: (
    personId: string,
    options: typeof PersonCombinedCreditsParams.Encoded
  ) => Effect.Effect<
    typeof PersonCombinedCredits200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly personExternalIds: (
    personId: string
  ) => Effect.Effect<
    typeof PersonExternalIds200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly personTaggedImages: (
    personId: string,
    options: typeof PersonTaggedImagesParams.Encoded
  ) => Effect.Effect<
    typeof PersonTaggedImages200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly translations: (
    personId: string
  ) => Effect.Effect<
    typeof Translations200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly personPopularList: (
    options: typeof PersonPopularListParams.Encoded
  ) => Effect.Effect<
    typeof PersonPopularList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly moviePopularList: (
    options: typeof MoviePopularListParams.Encoded
  ) => Effect.Effect<
    typeof MoviePopularList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieTopRatedList: (
    options: typeof MovieTopRatedListParams.Encoded
  ) => Effect.Effect<
    typeof MovieTopRatedList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieUpcomingList: (
    options: typeof MovieUpcomingListParams.Encoded
  ) => Effect.Effect<
    typeof MovieUpcomingList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieNowPlayingList: (
    options: typeof MovieNowPlayingListParams.Encoded
  ) => Effect.Effect<
    typeof MovieNowPlayingList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesAiringTodayList: (
    options: typeof TvSeriesAiringTodayListParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesAiringTodayList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesOnTheAirList: (
    options: typeof TvSeriesOnTheAirListParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesOnTheAirList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesPopularList: (
    options: typeof TvSeriesPopularListParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesPopularList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesTopRatedList: (
    options: typeof TvSeriesTopRatedListParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesTopRatedList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly movieLatestId: () => Effect.Effect<
    typeof MovieLatestId200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesLatestId: () => Effect.Effect<
    typeof TvSeriesLatestId200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesAggregateCredits: (
    seriesId: string,
    options: typeof TvSeriesAggregateCreditsParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesAggregateCredits200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesAlternativeTitles: (
    seriesId: string
  ) => Effect.Effect<
    typeof TvSeriesAlternativeTitles200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesContentRatings: (
    seriesId: string
  ) => Effect.Effect<
    typeof TvSeriesContentRatings200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesCredits: (
    seriesId: string,
    options: typeof TvSeriesCreditsParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesCredits200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesEpisodeGroups: (
    seriesId: string
  ) => Effect.Effect<
    typeof TvSeriesEpisodeGroups200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesExternalIds: (
    seriesId: string
  ) => Effect.Effect<
    typeof TvSeriesExternalIds200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesKeywords: (
    seriesId: string
  ) => Effect.Effect<
    typeof TvSeriesKeywords200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesRecommendations: (
    seriesId: string,
    options: typeof TvSeriesRecommendationsParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesRecommendations200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesReviews: (
    seriesId: string,
    options: typeof TvSeriesReviewsParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesReviews200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesScreenedTheatrically: (
    seriesId: string
  ) => Effect.Effect<
    typeof TvSeriesScreenedTheatrically200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesSimilar: (
    seriesId: string,
    options: typeof TvSeriesSimilarParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesSimilar200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesTranslations: (
    seriesId: string
  ) => Effect.Effect<
    typeof TvSeriesTranslations200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesVideos: (
    seriesId: string,
    options: typeof TvSeriesVideosParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesVideos200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesWatchProviders: (
    seriesId: string
  ) => Effect.Effect<
    typeof TvSeriesWatchProviders200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesAddRating: (
    seriesId: string,
    options: {
      readonly params: typeof TvSeriesAddRatingParams.Encoded;
      readonly payload: typeof TvSeriesAddRatingRequest.Encoded;
    }
  ) => Effect.Effect<
    typeof TvSeriesAddRating200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeriesDeleteRating: (
    seriesId: string,
    options: typeof TvSeriesDeleteRatingParams.Encoded
  ) => Effect.Effect<
    typeof TvSeriesDeleteRating200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeasonAccountStates: (
    seriesId: string,
    seasonNumber: string,
    options: typeof TvSeasonAccountStatesParams.Encoded
  ) => Effect.Effect<
    typeof TvSeasonAccountStates200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeasonAggregateCredits: (
    seriesId: string,
    seasonNumber: string,
    options: typeof TvSeasonAggregateCreditsParams.Encoded
  ) => Effect.Effect<
    typeof TvSeasonAggregateCredits200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeasonChangesById: (
    seasonId: string,
    options: typeof TvSeasonChangesByIdParams.Encoded
  ) => Effect.Effect<
    typeof TvSeasonChangesById200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeasonCredits: (
    seriesId: string,
    seasonNumber: string,
    options: typeof TvSeasonCreditsParams.Encoded
  ) => Effect.Effect<
    typeof TvSeasonCredits200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeasonExternalIds: (
    seriesId: string,
    seasonNumber: string
  ) => Effect.Effect<
    typeof TvSeasonExternalIds200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeasonTranslations: (
    seriesId: string,
    seasonNumber: string
  ) => Effect.Effect<
    typeof TvSeasonTranslations200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvSeasonVideos: (
    seriesId: string,
    seasonNumber: string,
    options: typeof TvSeasonVideosParams.Encoded
  ) => Effect.Effect<
    typeof TvSeasonVideos200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeCredits: (
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string,
    options: typeof TvEpisodeCreditsParams.Encoded
  ) => Effect.Effect<
    typeof TvEpisodeCredits200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeExternalIds: (
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string
  ) => Effect.Effect<
    typeof TvEpisodeExternalIds200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeTranslations: (
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string
  ) => Effect.Effect<
    typeof TvEpisodeTranslations200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeVideos: (
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string,
    options: typeof TvEpisodeVideosParams.Encoded
  ) => Effect.Effect<
    typeof TvEpisodeVideos200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeAddRating: (
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string,
    options: {
      readonly params: typeof TvEpisodeAddRatingParams.Encoded;
      readonly payload: typeof TvEpisodeAddRatingRequest.Encoded;
    }
  ) => Effect.Effect<
    typeof TvEpisodeAddRating200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeDeleteRating: (
    seriesId: string,
    seasonNumber: string,
    episodeNumber: string,
    options: typeof TvEpisodeDeleteRatingParams.Encoded
  ) => Effect.Effect<
    typeof TvEpisodeDeleteRating200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountDetails: (
    accountId: string,
    options: typeof AccountDetailsParams.Encoded
  ) => Effect.Effect<
    typeof AccountDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountLists: (
    accountId: string,
    options: typeof AccountListsParams.Encoded
  ) => Effect.Effect<
    typeof AccountLists200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountGetFavorites: (
    accountId: string,
    options: typeof AccountGetFavoritesParams.Encoded
  ) => Effect.Effect<
    typeof AccountGetFavorites200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountFavoriteTv: (
    accountId: string,
    options: typeof AccountFavoriteTvParams.Encoded
  ) => Effect.Effect<
    typeof AccountFavoriteTv200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountRatedMovies: (
    accountId: string,
    options: typeof AccountRatedMoviesParams.Encoded
  ) => Effect.Effect<
    typeof AccountRatedMovies200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountRatedTv: (
    accountId: string,
    options: typeof AccountRatedTvParams.Encoded
  ) => Effect.Effect<
    typeof AccountRatedTv200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountRatedTvEpisodes: (
    accountId: string,
    options: typeof AccountRatedTvEpisodesParams.Encoded
  ) => Effect.Effect<
    typeof AccountRatedTvEpisodes200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountWatchlistMovies: (
    accountId: string,
    options: typeof AccountWatchlistMoviesParams.Encoded
  ) => Effect.Effect<
    typeof AccountWatchlistMovies200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountWatchlistTv: (
    accountId: string,
    options: typeof AccountWatchlistTvParams.Encoded
  ) => Effect.Effect<
    typeof AccountWatchlistTv200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountAddFavorite: (
    accountId: string,
    options: {
      readonly params: typeof AccountAddFavoriteParams.Encoded;
      readonly payload: typeof AccountAddFavoriteRequest.Encoded;
    }
  ) => Effect.Effect<
    typeof AccountAddFavorite200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly accountAddToWatchlist: (
    accountId: string,
    options: {
      readonly params: typeof AccountAddToWatchlistParams.Encoded;
      readonly payload: typeof AccountAddToWatchlistRequest.Encoded;
    }
  ) => Effect.Effect<
    typeof AccountAddToWatchlist200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly certificationMovieList: () => Effect.Effect<
    typeof CertificationMovieList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly certificationsTvList: () => Effect.Effect<
    typeof CertificationsTvList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly changesMovieList: (
    options: typeof ChangesMovieListParams.Encoded
  ) => Effect.Effect<
    typeof ChangesMovieList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly changesTvList: (
    options: typeof ChangesTvListParams.Encoded
  ) => Effect.Effect<
    typeof ChangesTvList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly changesPeopleList: (
    options: typeof ChangesPeopleListParams.Encoded
  ) => Effect.Effect<
    typeof ChangesPeopleList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly collectionDetails: (
    collectionId: string,
    options: typeof CollectionDetailsParams.Encoded
  ) => Effect.Effect<
    typeof CollectionDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly collectionImages: (
    collectionId: string,
    options: typeof CollectionImagesParams.Encoded
  ) => Effect.Effect<
    typeof CollectionImages200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly collectionTranslations: (
    collectionId: string
  ) => Effect.Effect<
    typeof CollectionTranslations200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly companyDetails: (
    companyId: string
  ) => Effect.Effect<
    typeof CompanyDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly companyAlternativeNames: (
    companyId: string
  ) => Effect.Effect<
    typeof CompanyAlternativeNames200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly companyImages: (
    companyId: string
  ) => Effect.Effect<
    typeof CompanyImages200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly creditDetails: (
    creditId: string
  ) => Effect.Effect<
    typeof CreditDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly genreMovieList: (
    options: typeof GenreMovieListParams.Encoded
  ) => Effect.Effect<
    typeof GenreMovieList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly genreTvList: (
    options: typeof GenreTvListParams.Encoded
  ) => Effect.Effect<
    typeof GenreTvList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly guestSessionRatedMovies: (
    guestSessionId: string,
    options: typeof GuestSessionRatedMoviesParams.Encoded
  ) => Effect.Effect<
    typeof GuestSessionRatedMovies200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly guestSessionRatedTv: (
    guestSessionId: string,
    options: typeof GuestSessionRatedTvParams.Encoded
  ) => Effect.Effect<
    typeof GuestSessionRatedTv200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly guestSessionRatedTvEpisodes: (
    guestSessionId: string,
    options: typeof GuestSessionRatedTvEpisodesParams.Encoded
  ) => Effect.Effect<
    typeof GuestSessionRatedTvEpisodes200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly watchProvidersAvailableRegions: (
    options: typeof WatchProvidersAvailableRegionsParams.Encoded
  ) => Effect.Effect<
    typeof WatchProvidersAvailableRegions200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly watchProvidersMovieList: (
    options: typeof WatchProvidersMovieListParams.Encoded
  ) => Effect.Effect<
    typeof WatchProvidersMovieList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly watchProviderTvList: (
    options: typeof WatchProviderTvListParams.Encoded
  ) => Effect.Effect<
    typeof WatchProviderTvList200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly keywordDetails: (
    keywordId: string
  ) => Effect.Effect<
    typeof KeywordDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly keywordMovies: (
    keywordId: string,
    options: typeof KeywordMoviesParams.Encoded
  ) => Effect.Effect<
    typeof KeywordMovies200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly listDetails: (
    listId: string,
    options: typeof ListDetailsParams.Encoded
  ) => Effect.Effect<
    typeof ListDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly listDelete: (
    listId: string,
    options: typeof ListDeleteParams.Encoded
  ) => Effect.Effect<
    typeof ListDelete200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly listCheckItemStatus: (
    listId: string,
    options: typeof ListCheckItemStatusParams.Encoded
  ) => Effect.Effect<
    typeof ListCheckItemStatus200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly listCreate: (options: {
    readonly params: typeof ListCreateParams.Encoded;
    readonly payload: typeof ListCreateRequest.Encoded;
  }) => Effect.Effect<
    typeof ListCreate200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly listAddMovie: (
    listId: string,
    options: {
      readonly params: typeof ListAddMovieParams.Encoded;
      readonly payload: typeof ListAddMovieRequest.Encoded;
    }
  ) => Effect.Effect<
    typeof ListAddMovie200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly listRemoveMovie: (
    listId: string,
    options: {
      readonly params: typeof ListRemoveMovieParams.Encoded;
      readonly payload: typeof ListRemoveMovieRequest.Encoded;
    }
  ) => Effect.Effect<
    typeof ListRemoveMovie200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly listClear: (
    listId: string,
    options: typeof ListClearParams.Encoded
  ) => Effect.Effect<
    typeof ListClear200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly networkDetails: (
    networkId: string
  ) => Effect.Effect<
    typeof NetworkDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly detailsCopy: (
    networkId: string
  ) => Effect.Effect<
    typeof DetailsCopy200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly alternativeNamesCopy: (
    networkId: string
  ) => Effect.Effect<
    typeof AlternativeNamesCopy200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly reviewDetails: (
    reviewId: string
  ) => Effect.Effect<
    typeof ReviewDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly authenticationValidateKey: () => Effect.Effect<
    typeof AuthenticationValidateKey200.Type,
    | HttpClientError.HttpClientError
    | ParseError
    | typeof AuthenticationValidateKey401.Type
  >;
  readonly tvSeasonWatchProviders: (
    seriesId: string,
    seasonNumber: string,
    options: typeof TvSeasonWatchProvidersParams.Encoded
  ) => Effect.Effect<
    typeof TvSeasonWatchProviders200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly configurationCountries: (
    options: typeof ConfigurationCountriesParams.Encoded
  ) => Effect.Effect<
    typeof ConfigurationCountries200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly configurationJobs: () => Effect.Effect<
    typeof ConfigurationJobs200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly configurationLanguages: () => Effect.Effect<
    typeof ConfigurationLanguages200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly configurationPrimaryTranslations: () => Effect.Effect<
    typeof ConfigurationPrimaryTranslations200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly configurationTimezones: () => Effect.Effect<
    typeof ConfigurationTimezones200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly authenticationCreateSessionFromLogin: (
    options: typeof AuthenticationCreateSessionFromLoginRequest.Encoded
  ) => Effect.Effect<
    typeof AuthenticationCreateSessionFromLogin200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly personLatestId: () => Effect.Effect<
    typeof PersonLatestId200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeChangesById: (
    episodeId: string
  ) => Effect.Effect<
    typeof TvEpisodeChangesById200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly tvEpisodeGroupDetails: (
    tvEpisodeGroupId: string
  ) => Effect.Effect<
    typeof TvEpisodeGroupDetails200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly searchCompany: (
    options: typeof SearchCompanyParams.Encoded
  ) => Effect.Effect<
    typeof SearchCompany200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly searchCollection: (
    options: typeof SearchCollectionParams.Encoded
  ) => Effect.Effect<
    typeof SearchCollection200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly searchKeyword: (
    options: typeof SearchKeywordParams.Encoded
  ) => Effect.Effect<
    typeof SearchKeyword200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
  readonly listsCopy: (
    seriesId: string,
    options: typeof ListsCopyParams.Encoded
  ) => Effect.Effect<
    typeof ListsCopy200.Type,
    HttpClientError.HttpClientError | ParseError
  >;
}
