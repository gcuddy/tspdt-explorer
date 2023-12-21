import { db } from "@/db/client";
import { directors, movies } from "@/db/schema";
import { NextResponse } from "next/server";
import { PatchOperation, PullResponseOKV1 } from "replicache";
export async function POST(request: Request) {
  // TODO: transaction or something here
  const dirs = await db.select().from(directors);
  const ms = await db.select().from(movies);

  // initially, let's create dummy data

  const patches: PatchOperation[] = [];

  for (const dir of dirs) {
    patches.push({
      op: "put",
      key: `director/${dir.id}`,
      value: dir,
    });
  }

  for (const { tmdbData, ...m } of ms) {
    patches.push({
      op: "put",
      key: `movie/${m.id}`,
      value: m,
    });
  }

  return NextResponse.json<PullResponseOKV1>({
    cookie: 42,
    lastMutationIDChanges: {},
    patch: [{ op: "clear" }, ...patches],
  });

  // initially, statically provide directors
}
