import * as XLSX from "xlsx";
import * as fs from "node:fs";
import {
  Array,
  Console,
  Data,
  Effect,
  Option,
  MutableHashMap as HashMap,
  Predicate,
  Record,
  Schema as S,
  pipe,
} from "effect";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { Args, Command } from "@effect/cli";

XLSX.set_fs(fs);

const LinkCellSchema = S.Struct({
  l: S.UndefinedOr(
    S.Struct({
      Target: S.UndefinedOr(S.String),
    })
  ),
});

const TSPDTIdCell = S.Struct({
  v: S.Number,
});

// TODO: propertySignature to rename keys?
export class TSPDTRow extends S.Class<TSPDTRow>("TSPDTRow")({
  "2007": S.Number,
  "2008": S.Number,
  "2010": S.Number,
  "2011": S.Number,
  "2012": S.Number,
  "2013": S.Number,
  "2014": S.Number,
  "2015": S.Number,
  "2016": S.Number,
  "2017": S.Number,
  "2018": S.Number,
  "2019": S.Number,
  "2020": S.Number,
  "2021": S.Number,
  "2022": S.Number,
  "2023": S.Number,
  "2024": S.Number,
  "Director(s)": S.String,
  Title: S.String,
  Year: S.Union(S.Number, S.String),
  Country: S.String,
  Length: S.Union(S.Number, S.Literal("---")),
  Colour: S.Union(S.String, S.Literal("---")),
  Genre: S.Union(S.String, S.Literal("---")),
  "Dec-06": S.Number,
  "Mar-06": S.Number,
  idTSPDT: S.Number,
}) {
  static array = S.Array(TSPDTRow);
}

const decodeLinkCell = S.decodeUnknown(LinkCellSchema);
const decodeTSPDTIdCell = S.decodeUnknown(TSPDTIdCell);
const decodeRows = S.decodeUnknown(TSPDTRow.array);

class AppError extends Data.TaggedError("AppError")<{ message: string }> {}

const parseRows = (filePath: string) =>
  Effect.gen(function* () {
    const tsptIdToImdbId = HashMap.empty<number, string>();
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

    const tspdtId = Array.findFirst(
      Array.filter(keys, (key) => /[A-z]1$/.test(key)),
      (key) => String((sheet[key] as XLSX.CellObject).v) === "idTSPDT"
    )
      .pipe(
        Option.getOrThrowWith(
          () => new AppError({ message: "No TSPDT ID key found" })
        )
      )
      .replace(/1$/, "");

    const keysToProcess = pipe(
      Array.filter(keys, (key) => key.startsWith(imdbKey)),
      Array.tail,
      Option.getOrElse(() => [] as string[])
    );

    yield *
      Effect.forEach(
        keysToProcess,
        (key) =>
          Effect.gen(function* () {
            const rowNum = key.replace(imdbKey, "");
            const cell = yield* decodeLinkCell(sheet[key]);
            const id = Option.fromNullable(cell.l?.Target).pipe(
              Option.flatMap((link) =>
                Array.last(Array.filter(link.split("/"), Predicate.isTruthy))
              ),
              Option.filter((id) => id.startsWith("tt")),
              Option.getOrElse(() => "")
            );
            const tspdtCell = yield* decodeTSPDTIdCell(
              sheet[`${tspdtId}${rowNum}`]
            );
            HashMap.set(tsptIdToImdbId, tspdtCell.v, id);
          }),
        {
          concurrency: "unbounded",
        }
      );

    const rows =
      yield *
      Effect.try(() => XLSX.utils.sheet_to_json(sheet).slice(0, 1000)).pipe(
        Effect.andThen(decodeRows),
        Effect.map(
          Array.map((rows) => ({
            ...rows,
            imdbId: HashMap.get(tsptIdToImdbId, rows.idTSPDT).pipe(
              Option.getOrNull
            ),
          }))
        )
      );

    return rows;
  });

const main = (filePath: string) =>
  Effect.gen(function* () {
    const rows = yield* parseRows(filePath);
  });

const path = Args.path();
const command = Command.make("process", { path }, ({ path }) => main(path));

const cli = Command.run(command, {
  name: "TSPDT Starting List Processor",
  version: "0.0.1",
});

cli(Bun.argv).pipe(Effect.provide(BunContext.layer), BunRuntime.runMain);
