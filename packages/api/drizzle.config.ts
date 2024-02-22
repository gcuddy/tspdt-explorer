import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "d1", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    // url: "./2024.db",
    dbName: "tspdt",
    wranglerConfigPath: "wrangler.toml",
  },
  verbose: true,
  strict: true,
  tablesFilter: ["tspdt_*"],
} satisfies Config;
