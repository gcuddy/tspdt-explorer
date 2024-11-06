import { SqliteClient } from "@effect/sql-sqlite-bun";

const SqlLive = SqliteClient.layer({
  filename: "./db.sqlite",
  create: true,
});
