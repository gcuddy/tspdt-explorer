// import "dotenv/config";
import { db } from "@/db/client";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
// import { migrate } from "drizzle-orm/libsql/migrator";
// // This will run migrations on the database, skipping the ones already applied
await migrate(db, {
  migrationsFolder: "./migrations",
});
