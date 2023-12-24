import { db } from "@/db/client";
import { directors, movies } from "@/core/movie/movie.sql";
import { NextResponse } from "next/server";
import { PatchOperation, PullResponseOKV1 } from "replicache";
import { rankings } from "@/db/schema";
import { eq, getTableColumns, sql } from "drizzle-orm";
export async function POST(request: Request) {
  // TODO: transaction or something here
  const dirs = await db.select().from(directors);

  const { tmdbData, ...movieColumns } = getTableColumns(movies);
  const ms = await db.select(movieColumns).from(movies);
  const sq = db
    .select({
      year: sql`max(${rankings.year})`,
    })
    .from(rankings);
  const rs = await db.select().from(rankings).where(eq(rankings.year, sq));

  // initially, let's create dummy data

  const patches: PatchOperation[] = [];

  for (const dir of dirs) {
    patches.push({
      op: "put",
      key: `director/${dir.id}`,
      value: dir,
    });
  }

  for (const m of ms) {
    patches.push({
      op: "put",
      key: `movie/${m.id}`,
      value: m,
    });
  }

  for (const r of rs) {
    patches.push({
      op: "put",
      key: `movie/${r.movieId}/ranking`,
      value: r,
    });
  }

  //   console.log("patches", patches);
  console.log("returning patch of length: ", patches.length);

  return NextResponse.json<PullResponseOKV1>({
    cookie: 42,
    lastMutationIDChanges: {},
    patch: [{ op: "clear" }, ...patches],
  });

  // initially, statically provide directors
}
