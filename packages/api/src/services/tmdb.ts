import {
  Config,
  Console,
  Context,
  Effect,
  flow,
  Layer,
  Redacted,
} from "effect";
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import * as T from "../../data/effect-openapi";

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
      )
    );
    return T.make(client);
  });

export class TMDB extends Context.Tag("TMDB")<
  TMDB,
  Effect.Effect.Success<ReturnType<typeof make>>
>() {}

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

export const layerConfig = (
  options: Config.Config.Wrap<{
    readonly token: Redacted.Redacted;
  }>
) => Config.unwrap(options).pipe(Effect.flatMap(make), Layer.effect(TMDB));

export const TMDBLive = layerConfig({
  token: Config.redacted("TMDB_TOKEN"),
});
