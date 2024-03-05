import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema2.ts",
  out: "./migrations2",
  driver: "d1", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    // url: "./2024.db",
    dbName: "tspdt",
    wranglerConfigPath: "./wrangler.toml",
  },
  verbose: true,
  strict: true,
} satisfies Config;
