// import { SqliteClient } from "@effect/sql-sqlite-bun";

// const SqlLive = SqliteClient.layer({
//   filename: "./db.sqlite",
//   create: true,
// });

import * as D from "drizzle-orm/sqlite-core";
import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import * as DS from "../src/db/schema";
import { Effect } from "effect";

const main = () =>
  Effect.gen(function* () {
    const db = yield* SqliteDrizzle.SqliteDrizzle;

    yield* db.insert(DS.movies).values({
      id: "1",
      title: "test",
      year: 2024,
    });
  });
