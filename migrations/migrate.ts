import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const client = createClient({
  url: "libsql://perfect-snake-eyes-gcuddy.turso.io" as string,
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEyLTE3VDA3OjU5OjA0LjUyNDk0MjQxNVoiLCJpZCI6IjY5YmQyODk1LTljYjEtMTFlZS1iNTk2LTEyYWIwZGY3MGIxZiJ9.1CfD0GgsuAoWskfiOElfLV8QBzmMOFtwgZV-UP5KnqEuS_2Vdot45vIaI8i2ufmxXziK0zHpyvdiy4WTXHgqDw" as string,
});

export const db = drizzle(client);

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: "./",
    });
    console.log("Tables migrated!");
    process.exit(0);
  } catch (error) {
    console.error("Error performing migration: ", error);
    process.exit(1);
  }
}

main();
