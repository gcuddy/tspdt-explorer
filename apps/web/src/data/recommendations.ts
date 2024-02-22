import { movies } from "@/db/schema2";
import Database from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { hc } from "hono/client";
import { AppType } from "tspdt-api/src/index";

const client = hc<AppType>("http://localhost:8787");

const sqlite = new Database("2024.db");

const db = drizzle(sqlite);

const m = db.select().from(movies).get();

if (m) {
  const res = await client.recommendations.$post({
    json: {
      overview: "action",
    },
  });

  if (res.ok) {
    const data = await res.json();
    console.dir({ data }, { depth: null });
  }
}
