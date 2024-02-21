import * as movie from "@/core/movie/movie.sql";
import * as user from "@/core/user/user.sql";

// import { drizzle } from "drizzle-orm/libsql";
// import { createClient } from "@libsql/client";
// const client = createClient({
//   url: "file:../../db.db",
//   //   url: "libsql://tspdt-gcuddy.turso.io",
//   //   authToken:
//   //     "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEyLTE4VDA4OjA3OjUwLjEzNjA4OTQ5N1oiLCJpZCI6Ijc2Mzc3MzI5LTlkN2MtMTFlZS1iNTk2LTEyYWIwZGY3MGIxZiJ9.mkfpcBBMO9OD0mHzx_SFi20pD7NRij-Lp7cjbL1SKrfu_JbHiC14nZLwHDnzzFiMrQPnEiCbALVwBSHt8hmhBg",
// });
// export const db = drizzle(client, { schema, logger: true });

import Database from "better-sqlite3";
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

export const serverID = 1;
export const sqlite = new Database("2024.db");
export const db = drizzle(sqlite, {
  logger: true,
  schema: {
    ...movie,
    ...user,
  },
});
