import { Console, Effect, Option, Schema } from "effect";
import { TMDB, TMDBLive } from "../src/services/tmdb";
import { KeyValueStore, layerFileSystem } from "@effect/platform/KeyValueStore";
import { FetchHttpClient } from "@effect/platform";

const TMDBID = Schema.NumberFromString.pipe(Schema.brand("TMDBID"));

export const imdbToTmdb = (imdbId: string) =>
  Effect.gen(function* () {
    const tmdbClient = yield * TMDB;
    const { movie_results } = yield* tmdbClient.findById(imdbId, {
      external_source: "imdb_id",
    });
    return Option.fromNullable(movie_results).pipe(
      Option.flatMap(([movie]) => Option.fromNullable(movie?.id)),
      Option.map((id) => TMDBID.make(id)),
      Option.map((id) => [imdbId, id] as const)
    );
  }).pipe(
    // Effect.tapErrorCause(Effect.logError),
    Effect.provide(TMDBLive),
    Effect.scoped,
    Effect.provide(FetchHttpClient.layer)
  );
