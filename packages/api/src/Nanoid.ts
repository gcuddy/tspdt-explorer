import { Effect } from "effect";
import * as N from "nanoid";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = N.customAlphabet(alphabet, 9);

export class Nanoid extends Effect.Service<Nanoid>()("Nanoid", {
  succeed: {
    generate: Effect.sync(() => nanoid()),
  },
}) {}
