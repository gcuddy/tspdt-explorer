import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "turso", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: "libsql://perfect-snake-eyes-gcuddy.turso.io",
    authToken: process.env.AUTH_TOKEN,
  },
  verbose: false,
  strict: true,
} satisfies Config;
