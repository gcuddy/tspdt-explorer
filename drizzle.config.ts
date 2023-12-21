import type { Config } from "drizzle-kit";

export default {
  schema: "./src/**/*.sql.ts",
  out: "./migrations",
  driver: "better-sqlite", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: "./db.db",
  },
  verbose: true,
  strict: true,
} satisfies Config;
