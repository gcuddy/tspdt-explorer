import {
  Config,
  Console,
  Context,
  Data,
  Effect,
  flow,
  Layer,
  PrimaryKey,
  Redacted,
  Schedule,
  Schema,
} from "effect";
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import * as T from "../../data/effect-openapi";
import { PersistedCache } from "@effect/experimental";
import { configProviderNested } from "../utils";
import { abs } from "effect/BigDecimal";
import { PersistenceLive } from "../Persistence";

export const make = (options: { readonly token: Redacted.Redacted }) =>
  Effect.gen(function* () {
    const client = (yield * HttpClient.HttpClient).pipe(
      HttpClient.filterStatusOk,
      HttpClient.mapRequest(
        flow(
          HttpClientRequest.prependUrl("https://api.themoviedb.org"),
          HttpClientRequest.bearerToken(options.token),
          HttpClientRequest.acceptJson
        )
      ),
      HttpClient.retryTransient({
        times: 5,
        schedule: Schedule.exponential(100),
      })
    );

    const tmdbClient = T.make(client);

    class ImdbToTmdb extends Data.Class<{ imdbID: string }> {
      [PrimaryKey.symbol]() {
        return this.imdbID;
      }
      get [Schema.symbolWithResult]() {
        return {
          success: T.FindById200,
          failure: Schema.Never,
        };
      }
    }

    const imdbToTmdbCache = yield* PersistedCache.make({
      storeId: "Tmdb.imdbToTmdb",
      lookup: (req: ImdbToTmdb) =>
        tmdbClient
          .findById(req.imdbID, {
            external_source: "imdb_id",
          })
          .pipe(Effect.scoped, Effect.orDie),
      timeToLive: (_, exit) =>
        exit._tag === "Success" ? "12 hours" : "5 minutes",
      inMemoryCapacity: 8,
    });

    const lookupImdb = (imdbId: string) =>
      imdbToTmdbCache.get(new ImdbToTmdb({ imdbID: imdbId }));

    return { tmdbClient, lookupImdb };
  });

export class Tmdb extends Effect.Service<Tmdb>()("Tmdb", {
  scoped: Effect.gen(function* () {
    const token = yield* Config.redacted("token");
    const client = (yield* HttpClient.HttpClient).pipe(
      HttpClient.filterStatusOk,
      HttpClient.mapRequest(
        flow(
          HttpClientRequest.prependUrl("https://api.themoviedb.org"),
          HttpClientRequest.bearerToken(token),
          HttpClientRequest.acceptJson
        )
      ),
      HttpClient.retryTransient({
        times: 5,
        schedule: Schedule.exponential(100),
      })
    );

    const tmdbClient = T.make(client);

    class ImdbToTmdb extends Data.Class<{ imdbID: string }> {
      [PrimaryKey.symbol]() {
        return this.imdbID;
      }
      get [Schema.symbolWithResult]() {
        return {
          success: T.FindById200,
          failure: Schema.Never,
        };
      }
    }

    class Movie extends T.MovieDetails200.pipe(
      Schema.extend(
        Schema.Struct({
          credits: T.MovieCredits200,
        })
      )
    ) {
      static decodeResponse = HttpClientResponse.schemaBodyJson(this);
    }

    class LookupMovie extends Data.Class<{ tmdbId: string }> {
      [PrimaryKey.symbol]() {
        return this.tmdbId;
      }
      get [Schema.symbolWithResult]() {
        return {
          success: Movie,
          failure: Schema.Never,
        };
      }
    }
    const imdbToTmdbCache = yield* PersistedCache.make({
      storeId: "Tmdb.imdbToTmdb",
      lookup: (req: ImdbToTmdb) =>
        tmdbClient
          .findById(req.imdbID, {
            external_source: "imdb_id",
          })
          .pipe(Effect.scoped, Effect.orDie),
      timeToLive: (_, exit) =>
        exit._tag === "Success" ? "12 hours" : "5 minutes",
      inMemoryCapacity: 8,
    });

    const lookupMovieEffect = (id: string) =>
      client
        .pipe(
          HttpClient.mapRequest(
            HttpClientRequest.setUrlParams({
              append_to_response: "credits",
            })
          )
        )
        .get(`/3/movie/${id}`)
        .pipe(
          Effect.flatMap(Movie.decodeResponse),
          Effect.scoped,
          Effect.orDie
        );

    const lookupCache =
      yield *
      PersistedCache.make({
        storeId: "Tmdb.lookupMovie",
        lookup: (req: LookupMovie) => lookupMovieEffect(req.tmdbId),
        timeToLive: (_, exit) =>
          exit._tag === "Success" ? "12 hours" : "5 minutes",
        inMemoryCapacity: 8,
      });

    const lookupImdb = (imdbId: string) =>
      imdbToTmdbCache.get(new ImdbToTmdb({ imdbID: imdbId }));

    const lookupMovie = (tmdbId: string) =>
      lookupCache.get(new LookupMovie({ tmdbId }));

    return { ...tmdbClient, lookupImdb, lookupMovie } as const;
  }).pipe(Effect.withConfigProvider(configProviderNested("tmdb"))),
  dependencies: [PersistenceLive],
}) {}

// export class TMDB extends Context.Tag("TMDB")<
//   TMDB,
//   Effect.Effect.Success<ReturnType<typeof make>>
// >() {}

// export class TMDB extends Effect.Service<TMDB>()("TMDB", {
//   effect: Effect.gen(function* () {
//     const TMDB_TOKEN = yield* Config.redacted("TMDB_TOKEN");

//     const client = (yield* HttpClient.HttpClient).pipe(
//       HttpClient.filterStatusOk,
//       HttpClient.mapRequest(
//         flow(
//           HttpClientRequest.prependUrl("https://api.themoviedb.org"),
//           HttpClientRequest.setHeader("Authorization", `Bearer ${TMDB_TOKEN}`),
//           HttpClientRequest.acceptJson
//         )
//       )
//     );
//     return T.make(client);
//   }),
// }) {}

// export const layerConfig = (
//   options: Config.Config.Wrap<{
//     readonly token: Redacted.Redacted;
//   }>
// ) => Config.unwrap(options).pipe(Effect.flatMap(make), Layer.effect(TMDB));

// export const TMDBLive = layerConfig({
//   token: Config.redacted("TMDB_TOKEN"),
// });
