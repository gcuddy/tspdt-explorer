import { Effect } from "effect";
import { TMDB } from "../src/services/tmdb";

const main = () =>
  Effect.gen(function* () {
    const tmdbClient = yield* TMDB;
    // TODO: openapi types!
  });
