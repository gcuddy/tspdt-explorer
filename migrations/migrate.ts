import { db } from "@/db/client";
import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
// This will run migrations on the database, skipping the ones already applied
await migrate(db, {
  migrationsFolder: "./migrations",
});
