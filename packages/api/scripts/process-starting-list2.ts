import * as XLSX from "xlsx";
import * as fs from "node:fs";
import {
  Array,
  Console,
  Data,
  Effect,
  Option,
  Predicate,
  Record,
  Schema,
} from "effect";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Args, Command } from "@effect/cli";

XLSX.set_fs(fs);

const LinkCellSchema = Schema.Struct({
  l: Schema.UndefinedOr(
    Schema.Struct({
      Target: Schema.UndefinedOr(Schema.String),
    })
  ),
});

const decodeLinkCell = Schema.decode(LinkCellSchema);

class AppError extends Data.TaggedError("AppError")<{ message: string }> {}

const main = (filePath: string) =>
  Effect.gen(function* () {
    const workbook = yield* Effect.try({
      try: () => XLSX.readFile(filePath),
      catch: () => new AppError({ message: `Failed to read file ${filePath}` }),
    });

    const sheet = Array.head(workbook.SheetNames).pipe(
      Option.flatMap((sheetName) =>
        Option.fromNullable(workbook.Sheets[sheetName])
      ),
      Option.getOrThrowWith(
        () => new AppError({ message: `No sheets found in ${filePath}` })
      )
    );

    const keys = Record.keys(sheet);

    const imdbKey = Array.findFirst(
      Array.filter(keys, (key) => /[A-z]1$/.test(key)),
      (key) =>
        String((sheet[key] as XLSX.CellObject).v).toLowerCase() === "imdb"
    )
      .pipe(
        Option.getOrThrowWith(
          () => new AppError({ message: "No IMDB key found" })
        )
      )
      .replace(/1$/, "");

    // AB corresponds to Imdb column
    yield* Effect.forEach(
      Array.filter(Record.keys(sheet), (key) => key.startsWith(imdbKey)).slice(
        0,
        50
      ),
      (key) =>
        Effect.gen(function* () {
          const cell = yield* decodeLinkCell(sheet[key]);
          if (cell.l) {
            // CONTINUE HERE!!!!
            // TODO: this gets the URL, now process it
            yield* Console.log(cell.l.Target);
          }
        })
    );

    // XLSX.utils.sheet_add_aoa(sheet, [["Hello", "World"]], { origin: "A1" });

    // yield* Console.log(XLSX.utils.sheet_to_json(sheet));
    // // yield* Console.log(`Successfully read file ${filePath}`);
  });

const path = Args.path();
const command = Command.make("process", { path }, ({ path }) => main(path));

const cli = Command.run(command, {
  name: "TSPDT Starting List Processor",
  version: "0.0.1",
});

cli(Bun.argv).pipe(Effect.provide(BunContext.layer), BunRuntime.runMain);
