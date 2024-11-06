// import { SqliteClient } from "@effect/sql-sqlite-bun";

// const SqlLive = SqliteClient.layer({
//   filename: "./db.sqlite",
//   create: true,
// });

import * as D from "drizzle-orm/sqlite-core";
import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
