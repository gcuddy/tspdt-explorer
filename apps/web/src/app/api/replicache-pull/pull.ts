import { Actor } from "@/core/actor";
import { userMovie } from "@/core/movie/movie.sql";
import {
  replicache_client_group,
  replicache_cvr,
} from "@/core/replicache/replicache.sql";
import { user } from "@/core/user/user.sql";
import { db } from "@/db/client";
import { SQL, and, eq, sql } from "drizzle-orm";
import { SQLiteColumn } from "drizzle-orm/sqlite-core";
import { equals } from "remeda";
import { PatchOperation, PullRequestV1 } from "replicache";

// we're not making modifications to movies, etc.
const TABLES = {
  user: user,
  userMovie: userMovie,
};

type TableName = keyof typeof TABLES;

const TABLE_KEY = {} as {
  [key in TableName]?: SQLiteColumn[];
};

export async function pull(actor: Actor, pull: PullRequestV1) {
  await db
    .insert(replicache_client_group)
    .values({
      id: pull.clientGroupID,
      cvrVersion: 0,
      actor,
      clientVersion: 0,
    })
    .onConflictDoNothing();

  db.transaction(async (tx) => {
    const patch: PatchOperation[] = [];

    const group = await tx
      .select()
      .from(replicache_client_group)
      .where(and(eq(replicache_client_group.id, pull.clientGroupID)))
      .execute()
      .then((res) => res.at(0));

    if (!group || !equals(group?.actor, actor)) {
      throw new Error("actor mismatch");
    }

    const oldCvr = await tx
      .select({
        data: replicache_cvr.data,
        clientVersion: replicache_cvr.clientVersion,
      })
      .from(replicache_cvr)
      .where(
        and(
          eq(replicache_cvr.clientGroupID, pull.clientGroupID),
          eq(replicache_cvr.id, pull.cookie as number)
        )
      )
      .then((rows) => rows.at(0));

    const cvr = oldCvr ?? {
      data: {},
      clientVersion: 0,
    };

    const toPut: Record<string, { id: string; key: string }[]> = {};
    const nextCvr = {
      data: {} as Record<string, number>,
      version: Math.max(pull.cookie as number, group.cvrVersion) + 1,
    };

    if (!oldCvr) {
      patch.push({
        op: "clear",
      });
      patch.push({
        op: "put",
        key: "/init",
        value: true,
      });
    }
    const results: [string, { id: string; version: string; key: string }[]][] =
      [];

    if (actor.type === "user") {
      console.log("syncing user");

      //   const tableFilters = {
      //     log_search: eq(log_search.userID, actor.properties.userID),
      //     usage: gte(
      //       usage.day,
      //       DateTime.now().toUTC().startOf("month").toSQLDate()!
      //     ),
      //     issueCount: gte(
      //       issueCount.hour,
      //       DateTime.now()
      //         .toUTC()
      //         .startOf("hour")
      //         .minus({ day: 1 })
      //         .toSQL({ includeOffset: false })!
      //     ),
      //     issue: isNull(issue.timeDeleted),
      //   } satisfies {
      //     [key in keyof typeof TABLES]?: SQLWrapper;
      //   };

      //   const workspaceID = useWorkspace();

      let combined: any = undefined;
      let now = Date.now();
      for (const [name, table] of Object.entries(TABLES)) {
        const key = TABLE_KEY[name as TableName] ?? [table.id];
        const query = tx
          .select({
            name: sql`${name}`,
            id: table.id,
            version: table.timeUpdated,
            key: sql.join([
              sql`concat_ws(`,
              sql.join([sql`'/'`, sql`''`, sql`${name}`, ...key], sql`, `),
              sql.raw(`)`),
            ]) as SQL<string>,
          })
          .from(table)
          .where(
            and(
              eq(
                "workspaceID" in table ? table.workspaceID : table.id,
                workspaceID
              )
              //   ...(name in tableFilters
              //     ? [tableFilters[name as keyof typeof tableFilters]]
              //     : [])
            )
          );
        if (!combined) combined = query;
        else combined = combined.unionAll(query);
        // const rows = await query.execute();
        // results.push([name, rows]);
      }
      console.log("seperate", Date.now() - now);
      now = Date.now();
      const rows = await combined.execute();
      results.push(
        ...pipe(
          rows,
          groupBy((row: any) => row.name),
          toPairs
        )
      );
      console.log("combined", Date.now() - now);
    }
  });
}
