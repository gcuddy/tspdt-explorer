import { Console, Effect, Option, Schema } from "effect";
import { TMDB } from "../src/services/tmdb";
import { KeyValueStore, layerFileSystem } from "@effect/platform/KeyValueStore";
import { FetchHttpClient } from "@effect/platform";

const TMDBID = Schema.NumberFromString.pipe(Schema.brand("TMDBID"));

export const imdbToTmdb = (imdbId: string) =>
  Effect.gen(function* () {
    const tmdbClient = yield* TMDB;
    const keyValue = (yield* KeyValueStore).forSchema(TMDBID);
    yield* Console.log("getting cached", { keyValue, tmdbClient });
    const cached = yield* keyValue.get(imdbId);
    yield* Console.log("cached", cached);
    if (Option.isSome(cached)) return cached.value;

    const { movie_results } = yield* tmdbClient.findById(imdbId, {
      external_source: "imdb_id",
    });
    yield * Console.log(movie_results);
    const id = Option.fromNullable(movie_results).pipe(
      Option.flatMap(([movie]) => Option.fromNullable(movie?.id)),
      Option.map((id) => TMDBID.make(id))
    );
    id.pipe(Option.map((id) => keyValue.set(imdbId, id)));
    return id;
  }).pipe(
    Effect.provide(TMDB.Default),
    Effect.scoped,
    Effect.provide(FetchHttpClient.layer)
  );