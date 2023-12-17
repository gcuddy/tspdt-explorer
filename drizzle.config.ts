import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./migrations",
  driver: "d1", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "tspdt",
  },
  verbose: false,
  strict: true,
} satisfies Config;
