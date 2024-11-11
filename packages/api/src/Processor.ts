import {
  Array,
  Effect,
  Option,
  MutableHashMap as HashMap,
  Predicate,
  Record,
  pipe,
  Schema as S,
  String as Str,
  Data,
} from "effect";
import * as XLSX from 'xlsx';

export class Processor extends Effect.Service<Processor>()("Processor", {
  effect: Effect.gen(function* () {

    const parseRows = (file: Buffer | Uint8Array) =>
      Effect.gen(function* () {
        const tsptIdToImdbId = HashMap.empty<number, string>();
        const workbook = yield* Effect.try({
          try: () => XLSX.read(file),
          catch: () => new ProcessorError({ message: `Failed to read file ${file}` }),
        });

        const sheet = Array.head(workbook.SheetNames).pipe(
          Option.flatMap((sheetName) => Record.get(workbook.Sheets, sheetName)),
          Option.getOrThrowWith(
            () => new ProcessorError({ message: `No sheets found in ${file}` })
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
              () => new ProcessorError({ message: "No IMDB key found" })
            )
          )
          .replace(/1$/, "");

        const tspdtId = Array.findFirst(
          Array.filter(keys, (key) => /[A-z]1$/.test(key)),
          (key) => String((sheet[key] as XLSX.CellObject).v) === "idTSPDT"
        )
          .pipe(
            Option.getOrThrowWith(
              () => new ProcessorError({ message: "No TSPDT ID key found" })
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
            Array.map((rows) =>
              TSPDTRowWithImdbId.make({
                ...rows,
                imdbId: HashMap.get(tsptIdToImdbId, rows.idTSPDT).pipe(
                  Option.getOrNull
                ),
              }))
          )
        );

        return rows;
      });
    return {
      parseRows
    } as const;
  })
}) { }

// domain 
export class ProcessorError extends Data.TaggedError("ProcessorError")<{
  message: string;
}> { }

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

export class TSPDTRowWithImdbId extends TSPDTRow.extend<TSPDTRowWithImdbId>("TSPDTRowWithImdbId")({
  imdbId: S.NullOr(S.String),
}) {

}

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


const decodeLinkCell = S.decodeUnknown(LinkCellSchema);
const decodeTSPDTIdCell = S.decodeUnknown(TSPDTIdCell);
const decodeRows = S.decodeUnknown(TSPDTRow.array);

