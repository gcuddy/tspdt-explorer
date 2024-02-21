import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema2.ts",
  out: "./migrations2",
  driver: "better-sqlite", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: "./2024.db",
  },
  verbose: true,
  strict: true,
} satisfies Config;
