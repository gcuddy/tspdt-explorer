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
  Layer,
} from "effect";
import { BunContext, BunRuntime, BunHttpPlatform } from "@effect/platform-bun";
import { Args, Command, Options } from "@effect/cli";
import { FetchHttpClient, FileSystem, HttpClient } from "@effect/platform";
import { imdbToTmdb } from "./imdb-to-tmdb";
import { layerFileSystem } from "@effect/platform-bun/BunKeyValueStore";
import { PersistedCache } from "@effect/experimental";
import { Tmdb, TMDB, TMDBLive } from "../src/services/tmdb";
import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import * as D from "drizzle-orm";
import * as DS from "../src/db/schema";
import { SqliteClient } from "@effect/sql-sqlite-bun";
import * as T from "../data/effect-openapi";
import { Nanoid } from "../src/Nanoid";

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

  static isRankingKey(key: keyof TSPDTRow | string) {
    return /\d{4}/.test(key) || key === "Dec-06" || key === "Mar-06";
  }
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

const main = ({
  path: filePath,
  start,
  end,
}: {
  path: string;
  start: number;
  end: number;
}) =>
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
    const rowsToLookAt = rows
      .sort((a, b) => a["2024"] - b["2024"])
      .slice(start, end)
      .filter((r) => r.imdbId);
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

    const a =
      yield *
      Effect.forEach(
        rowsToLookAt,
        (row) =>
          Effect.gen(function* () {
            const tmdb = yield* Tmdb;
            const nanoid = yield* Nanoid;
            const { movie_results } = yield* tmdb.lookupImdb(row.imdbId!);
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

                      const tmdbMovie = yield* tmdb.lookupMovie(
                        movie.id.toString()
                      );

                      const db = yield* SqliteDrizzle.SqliteDrizzle;

                      yield* db
                        .insert(DS.movies)
                        .values({
                          id: row.idTSPDT.toString(),
                          title: tmdbMovie.title ?? "",
                          year: Number(row.Year),
                          tmdbId: tmdbMovie.id,
                          color,
                          country,
                          genre: genres,
                          overview: tmdbMovie.overview ?? "",
                          currentRanking: row["2024"],
                          imdbId: row.imdbId,
                          runtime: tmdbMovie.runtime,
                          tmdbBackdropPath: tmdbMovie.backdrop_path ?? "",
                          tmdbPosterPath: tmdbMovie.poster_path ?? "",
                        })
                        .onConflictDoUpdate({
                          target: [DS.movies.id],
                          set: {
                            title: tmdbMovie.title ?? "",
                            year: Number(row.Year),
                            tmdbId: tmdbMovie.id,
                            color,
                            country,
                            genre: genres,
                            overview: tmdbMovie.overview ?? "",
                            currentRanking: row["2024"],
                            imdbId: row.imdbId,
                            runtime: tmdbMovie.runtime,
                            tmdbBackdropPath: tmdbMovie.backdrop_path ?? "",
                            tmdbPosterPath: tmdbMovie.poster_path ?? "",
                          },
                        });

                      const rankingKeys = Record.keys(row).filter(
                        TSPDTRow.isRankingKey
                      );
                      for (const key of rankingKeys) {
                        // for clarity, we'll just use 2006 for Dec-06 and 2005 for Mar-06
                        const year =
                          key === "Dec-06"
                            ? 2006
                            : key === "Mar-06"
                            ? 2005
                            : +key;
                        yield* db.insert(DS.rankings).values({
                          movieId: row.idTSPDT.toString(),
                          year,
                          ranking: Number(row[key]),
                        });
                      }
                      const directors =
                        tmdbMovie.credits.crew?.filter(
                          (c) => c.job === "Director"
                        ) ?? [];

                      for (const director of directors) {
                        const [existing] = yield* db
                          .select()
                          .from(DS.directors)
                          .where(D.eq(DS.directors.tmdbId, director.id));

                        const id = existing
                          ? existing.id
                          : yield* nanoid.generate;

                        yield* db
                          .insert(DS.directors)
                          .values({
                            id,
                            name: director.name ?? "",
                            tmdbId: director.id,
                          })
                          .onConflictDoNothing();

                        yield* db.insert(DS.moviesToDirectors).values({
                          directorId: id,
                          movieId: row.idTSPDT.toString(),
                        });
                      }

                      return tmdbMovie;
                    }),
                  onNone: () => Effect.succeed(undefined),
                })
              );
          }).pipe(Effect.catchTag("SqlError", (e) => Effect.logError(e))),
        {
          concurrency: 25,
        }
      );

    yield * Effect.log("got everything");
  }).pipe(
    Effect.provide(Tmdb.Default),
    Effect.provide(Nanoid.Default),
    Effect.scoped,
    Effect.provide(FetchHttpClient.layer)
  );

const SqlLive = SqliteClient.layer({
  filename: "./tspdt.db",
});

const DrizzleLive = SqliteDrizzle.layer.pipe(Layer.provide(SqlLive));

const path = Args.path();
const start = Args.integer({ name: "start" });
const end = Args.integer({ name: "end" });
const command = Command.make(
  "process",
  { path, start, end },
  ({ path, start, end }) => main({ path, start, end })
);

const cli = Command.run(command, {
  name: "TSPDT Starting List Processor",
  version: "0.0.1",
});

cli(Bun.argv).pipe(
  Effect.provide(layerFileSystem("./data")),
  Effect.provide(BunContext.layer),
  Effect.provide(DrizzleLive),
  BunRuntime.runMain
);
