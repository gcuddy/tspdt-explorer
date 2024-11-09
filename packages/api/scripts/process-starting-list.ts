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
  String as Str,
} from "effect";
import { BunContext, BunRuntime, BunHttpPlatform } from "@effect/platform-bun";
import { Args, Command, Options } from "@effect/cli";
import { FetchHttpClient, FileSystem, HttpClient } from "@effect/platform";
import { imdbToTmdb } from "./imdb-to-tmdb";
import { layerFileSystem } from "@effect/platform-bun/BunKeyValueStore";
import { PersistedCache } from "@effect/experimental";
import { TMDB, TMDBLive } from "../src/services/tmdb";
import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import * as DS from "../src/db/schema";

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

const StringCoerce = S.transform(
  S.Union(S.String, S.Number, S.Boolean, S.Undefined),
  S.String,
  {
    decode: (v) => String(v),
    encode: (v) => v,
  }
);

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
  Title: StringCoerce,
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
      Option.flatMap((sheetName) => Record.get(workbook.Sheets, sheetName)),
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
      Array.filter(keys, Str.startsWith(imdbKey)),
      Array.tail,
      Option.getOrElse(() => [] as string[])
    );

    yield* Effect.forEach(
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

    const rows = yield* Effect.try(() => XLSX.utils.sheet_to_json(sheet)).pipe(
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
    const rows = yield * parseRows(filePath);
    const fs = yield * FileSystem.FileSystem;

    // TODO: do stuff with these parsed rows now, like update the database lol
    const str = yield * Effect.try(() => JSON.stringify(rows));
    yield * fs.writeFileString("./starting-list-2024.json", str);
    yield *
      Console.log(`Wrote ${rows.length} rows to ./starting-list-2024.json`);

    // TODO: decide where this should happen.
    // chunk into 1000s and process them.
    const rowsToLookAt = rows.slice(1000, 1050).filter((r) => r.imdbId);
    yield * Console.log(`Processing ${rowsToLookAt.length} rows`);

    // const results = pipe(
    //   yield *
    //     Effect.forEach(rowsToLookAt, (row) => imdbToTmdb(row.imdbId!), {
    //       concurrency: 25,
    //     }),
    //   Array.filterMap((e) => e),
    //   Record.fromEntries
    // );

    // yield * Console.log({ results });

    // yield *
    //   fs.writeFileString(
    //     "./tmdb-to-imdb-2024.json",
    //     yield * Effect.try(() => JSON.stringify(results))
    //   );

    // yield * Console.log(`Wrote ${results.length} rows to ./imdb-to-tmdb.json`);

    yield *
      Effect.forEach(
        rowsToLookAt,
        (row) =>
          Effect.gen(function* () {
            const tmdb = yield* TMDB;
            const { movie_results } = yield* tmdb.findById(row.imdbId!, {
              external_source: "imdb_id",
            });
            const movie = yield* Option.fromNullable(movie_results)
              .pipe(Option.flatMap(Array.head))
              .pipe(
                Option.match({
                  onSome: (movie) =>
                    Effect.gen(function* () {
                      const genres = row.Genre.split("-").map((g) => g.trim());
                      const color =
                        row.Colour === "BW"
                          ? "bw"
                          : row.Colour === "Col" || row.Colour === "Colour"
                          ? "col"
                          : "col-bw";
                      const country = row.Country.split("-").map((c) =>
                        c.trim()
                      );

                      const tmdbMovie = yield* tmdb.movieDetails(
                        movie.id.toString(),
                        { append_to_response: "credits" }
                      );

                      const db = yield* SqliteDrizzle.SqliteDrizzle;

                      // TODO: acutally instead of this let's just post stuff to local server
                      const x = db.insert(DS.movies).values({
                        id: movie.id.toString(),
                        title: tmdbMovie.title ?? "",
                        year: +row.Year,
                        imdbId: row.imdbId ?? "",
                      });
                      console.log({ x });

                      return tmdbMovie;
                    }),
                  onNone: () => Effect.succeed(undefined),
                })
              );
            yield* Console.log({ movie });
          }),
        {
          concurrency: 25,
        }
      );

    yield * Effect.log("got everything");
  }).pipe(
    Effect.provide(TMDBLive),
    Effect.scoped,
    Effect.provide(FetchHttpClient.layer)
  );

const DrizzleLive = SqliteDrizzle.layer.pipe();

const path = Args.path();
const command = Command.make("process", { path }, ({ path }) => main(path));

const cli = Command.run(command, {
  name: "TSPDT Starting List Processor",
  version: "0.0.1",
});

cli(Bun.argv).pipe(
  Effect.provide(layerFileSystem("./data")),
  Effect.provide(BunContext.layer),
  BunRuntime.runMain
);
