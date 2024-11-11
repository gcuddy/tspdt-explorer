import {
  Console,
  Effect,
} from "effect";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Args, Command, Options } from "@effect/cli";
import { layerFileSystem } from "@effect/platform-bun/BunKeyValueStore";
import { Processor } from "../../src/Processor";
import { FileSystem } from "@effect/platform";


const path = Args.path();
const output = Options.text('output').pipe(
  Options.withAlias('o'),
  Options.optional
)

const command = Command.make(
  "process",
  { path, output },
  ({ path, output }) => Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const processor = yield* Processor;
    const file = yield* fs.readFile(path);
    const rows = yield* processor.parseRows(file);

    if (output._tag === 'Some') {
      const json = yield* Effect.try(() => JSON.stringify(rows))
      yield* fs.writeFileString(output.value, json);
      return yield* Console.log(`Wrote file to ${output}`)
    }

    return yield* Console.log(rows)

  }).pipe(
    Effect.provide(Processor.Default)
  )
);

const cli = Command.run(command, {
  name: "TSPDT Starting List Processor",
  version: "0.0.1",
});

cli(Bun.argv).pipe(
  Effect.provide(layerFileSystem("./data")),
  Effect.provide(BunContext.layer),
  BunRuntime.runMain
);
