// import { drizzle } from "drizzle-orm/bun-sqlite";
// import { Database } from "bun:sqlite";
import * as schema from "./schema";

// const sqlite = new Database("../../db.db");
// export const db = drizzle(sqlite, { schema });

// import { drizzle } from "drizzle-orm/d1";

// export interface Env {
//   tspdt: D1Database;
// }

// export const db = drizzle(process.env.db, { schema });
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
const client = createClient({
  url: "libsql://tspdt-gcuddy.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEyLTE4VDA4OjA3OjUwLjEzNjA4OTQ5N1oiLCJpZCI6Ijc2Mzc3MzI5LTlkN2MtMTFlZS1iNTk2LTEyYWIwZGY3MGIxZiJ9.mkfpcBBMO9OD0mHzx_SFi20pD7NRij-Lp7cjbL1SKrfu_JbHiC14nZLwHDnzzFiMrQPnEiCbALVwBSHt8hmhBg",
});
export const db = drizzle(client, { schema, logger: true });
