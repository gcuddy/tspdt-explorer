import { Config, Effect, flow, Redacted } from "effect";
import {
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";

export class TMDB extends Effect.Service<TMDB>()("TMDB", {
  effect: Effect.gen(function* () {
    const TMDB_TOKEN = yield* Config.redacted("TMDB_TOKEN");

    const client = (yield* HttpClient.HttpClient).pipe(
      HttpClient.filterStatusOk,
      HttpClient.mapRequest(
        flow(
          HttpClientRequest.prependUrl("https://api.themoviedb.org/3"),
          HttpClientRequest.setHeader("Authorization", `Bearer ${TMDB_TOKEN}`),
          HttpClientRequest.acceptJson
        )
      )
    );
    return client;
  }),
}) {}
