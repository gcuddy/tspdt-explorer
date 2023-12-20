import { db } from "@/db/client";
import { directors, movies } from "@/db/schema";
import { NextResponse } from "next/server";
import { PatchOperation, PullResponseOKV1 } from "replicache";
export async function POST(request: Request) {
  const dirs = await db.select().from(directors);

  // initially, let's create dummy data

  const patches: PatchOperation[] = [];

  for (const dir of dirs) {
    patches.push({
      op: "put",
      key: `director/${dir.id}`,
      value: dir,
    });
  }

  return NextResponse.json<PullResponseOKV1>({
    cookie: 42,
    lastMutationIDChanges: {},
    patch: [{ op: "clear" }, ...patches],
  });

  // initially, statically provide directors
}
