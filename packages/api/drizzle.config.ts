import type { Config } from "drizzle-kit";
import path from 'path';
const wranglerConfigPath = path.resolve(__dirname, 'wrangler.toml');

export default {
    schema: "./src/db/schema.ts",
    out: "./migrations",
    driver: "d1", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
    dbCredentials: {
        // url: "./2024.db",
        dbName: "tspdt",
        wranglerConfigPath
    },
    verbose: true,
    strict: true,
    tablesFilter: ["tspdt_*"],
} satisfies Config;
