import { db } from "@/db/client";
import { directors, movies, userMovie, rankings } from "@/core/movie/movie.sql";
import { NextResponse } from "next/server";
import { PatchOperation, PullResponse, PullResponseOKV1 } from "replicache";
import { and, eq, getTableColumns, gt, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  replicache_client,
  replicache_client_group,
  replicache_space,
} from "@/core/replicache/replicache.sql";

const authError = {};

const pullRequestSchema = z.object({
  clientGroupID: z.string(),
  cookie: z.union([z.number(), z.null()]),
});

type PullRequest = z.infer<typeof pullRequestSchema>;

const { tmdbData, ...movieColumns } = getTableColumns(movies);

const maxRanking = db
  .select({
    year: sql`max(${rankings.year})`,
  })
  .from(rankings);

export async function POST(request: Request) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  if (!userID) {
    throw authError;
  }

  const body = await request.json();

  console.log(`Processing pull`, JSON.stringify(body, null, ""));

  const pullRequest = pullRequestSchema.parse(body);

  let pullResponse: PullResponse;

  try {
    pullResponse = await processPull(pullRequest, userID.value);
  } catch (e) {
    if (e === authError) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    console.error("Error processing pull:", e);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }

  return NextResponse.json<PullResponseOKV1>(pullResponse);

  // TODO: transaction or something here
  const dirs = await db.select().from(directors);

  //   TODO: cache tspdt/tmdb data - i don't need to look it up every time! maybe redis is good here?
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

async function processPull(
  { cookie: requestCookie, clientGroupID }: PullRequest,
  userID: string
) {
  const t0 = Date.now();

  const [entries, lastMutationIDChanges, responseCookie, ms, dirs, rs] =
    await db.transaction(async (tx) => {
      const clientGroup = await db
        .select()
        .from(replicache_client_group)
        .where(eq(replicache_client_group.id, clientGroupID))
        .then((rows) => rows.at(0));

      if (clientGroup && clientGroup.userID !== userID) {
        throw authError;
      }

      // todo: look at sst key naming
      //   TODO: generalize (look at how SST uses Table and Table_Key Mapping)
      return Promise.all([
        tx
          .select()
          //   .select({
          //     // TODO: implementation of concat_ws somehow
          //     key: sql`'userMovie/' || ${userMovie.id}`,
          //     value: userMovie,
          //     deleted: sql`false`,
          //   })
          .from(userMovie)
          .where(gt(userMovie.lastModifiedVersion, requestCookie ?? 0)),
        tx
          .select({
            id: replicache_client.id,
            lastMutationID: replicache_client.lastMutationID,
          })
          .from(replicache_client)
          .where(
            and(
              eq(replicache_client.clientGroupID, clientGroupID),
              gt(replicache_client.lastModifiedVersion, requestCookie ?? 0)
            )
          )
          .then((rows) => {
            const result: Record<string, number> = {};

            for (const row of rows) {
              result[row.id] = row.lastMutationID;
            }

            return result;
          }),
        tx
          .select({ version: replicache_space.version })
          .from(replicache_space)
          .then((rows) => rows.at(0)!.version),
        tx
          .select(movieColumns)
          .from(movies)
          .where(gt(movies.lastModifiedVersion, requestCookie ?? 0)),
        tx
          .select()
          .from(directors)
          .where(gt(directors.lastModifiedVersion, requestCookie ?? 0)),
        tx
          .select()
          .from(rankings)
          .where(
            and(
              eq(rankings.year, maxRanking),
              gt(rankings.lastModifiedVersion, requestCookie ?? 0)
            )
          ),
      ]);
    });

  console.log("lastMutationIDChanges: ", lastMutationIDChanges);
  console.log("responseCookie: ", responseCookie);
  console.log("Read all objects in", Date.now() - t0);

  const res: PullResponse = {
    lastMutationIDChanges,
    cookie: responseCookie,
    patch: [],
  };

  for (const entry of entries) {
    // TODO: should this be in sql select query instead of being manipulated here?

    if (entry.timeDeleted) {
      res.patch.push({
        op: "del",
        key: `userMovie/${entry.id}`,
      });
    }

    res.patch.push({
      op: "put",
      key: `userMovie/${entry.id}`,
      //   @ts-expect-error - this is ok
      value: entry,
    });
  }

  for (const dir of dirs) {
    res.patch.push({
      op: "put",
      key: `director/${dir.id}`,
      value: dir,
    });
  }

  for (const m of ms) {
    res.patch.push({
      op: "put",
      key: `movie/${m.id}`,
      value: m,
    });
  }

  for (const r of rs) {
    res.patch.push({
      op: "put",
      key: `movie/${r.movieId}/ranking`,
      value: r,
    });
  }
  console.log(`Returning`, JSON.stringify(res, null, ""));
  return res;
}
