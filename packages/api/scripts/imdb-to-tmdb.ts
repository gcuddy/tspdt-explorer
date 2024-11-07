import { Effect, Option } from "effect";
import { TMDB } from "../src/services/tmdb";

export const imdbToTmdb = (imdbId: string) =>
  Effect.gen(function* () {
    const tmdbClient = yield* TMDB;
    const { movie_results } = yield* tmdbClient.findById(imdbId, {
      external_source: "imdb_id",
    });
    return Option.fromNullable(movie_results).pipe(
      Option.flatMap(([movie]) => Option.fromNullable(movie?.id))
    );
  });
