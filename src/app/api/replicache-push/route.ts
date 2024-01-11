import {
  replicache_client,
  replicache_client_group,
  replicache_space,
} from "@/core/replicache/replicache.sql";
import { db } from "@/db/client";
import { InferSelectModel, eq } from "drizzle-orm";
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import { cookies } from "next/headers";
import { PushRequest, PushRequestV1 } from "replicache";
import { z } from "zod";

import { Replicache } from "@/core/replicache";
import { server } from "@/functions/replicache/server";
import { withUser } from "@/core/actor";

const mutationSchema = z.object({
  id: z.number(),
  clientID: z.string(),
  name: z.string(),
  args: z.any(),
  timestamp: z.number(),
});

const pushRequestSchema = z.object({
  clientGroupID: z.string(),
  mutations: z.array(mutationSchema.required({ args: true })),
  pushVersion: z.literal(1),
  profileID: z.string(),
  schemaVersion: z.string(),
});

const authError = {};
const clientStateNotFoundError = {};

export async function POST(request: Request) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  if (!userID) {
    throw authError;
  }

  withUser(
    {
      userID: userID.value,
    },
    async () => {
      const body = await request.json();
      const push = pushRequestSchema.parse(body);
      try {
        await processPush(push as PushRequestV1, userID.value);
      } catch (e) {}
    }
  );

  return new Response(`Cookie: ${JSON.stringify(userID)}`, {
    status: 200,
  });
}

async function processPush(push: PushRequestV1, userID: string) {
  const t0 = Date.now();

  db.transaction(async (tx) => {
    const clientGroup = await ensureClientGroup(tx, push.clientGroupID, userID);

    // Since all mutations within one transaction, we can just increment the
    // global version once.
    const prevVersion = await tx
      .select({ version: replicache_space.version })
      .from(replicache_space)
      //   .where(eq(replicache_space.version, 1))
      .then((rows) => rows.at(0)!.version);

    const nextVersion = prevVersion + 1;
    console.log("nextVersion: ", nextVersion);

    const clients = new Map<string, Replicache.Client>();

    for (let i = 0; i < push.mutations.length; i++) {
      const mutation = push.mutations[i];
      const { id, clientID } = mutation;

      let client = clients.get(clientID);

      if (client === undefined) {
        client = await ensureClient(
          tx,
          clientID,
          clientGroup.id,
          nextVersion,
          id
        );

        clients.set(clientID, client);
      }

      const expectedMutationID = client.lastMutationID + 1;

      if (id < expectedMutationID) {
        console.log(`Mutation ${id} has already been processed - skipping`);
        continue;
      }

      if (id > expectedMutationID) {
        throw new Error(
          `Mutation ${id} is from the future. Perhaps the server state was deleted? If so, clear application storage in browser and refresh.`
        );
      }

      console.log("Processing mutation:", JSON.stringify(mutation, null, ""));

      const t1 = Date.now();

      try {
        await server.execute(mutation.name, mutation.args);
      } catch (e) {
        console.error(
          `Error executing mutator: ${JSON.stringify(mutation)}: ${e}`
        );
      }

      client.lastModifiedVersion = nextVersion;
      client.lastMutationID = expectedMutationID;
      console.log("Processed mutation in", Date.now() - t1);
    }

    await Promise.all([
      ...[...clients.values()].map(({ clientGroupID, id, ...c }) =>
        tx.update(replicache_client).set(c).where(eq(replicache_client.id, id))
      ),
      async () => tx.update(replicache_space).set({ version: nextVersion }),
    ]);
  });
  // poke?
  Replicache.poke();

  console.log("Processed all mutations in", Date.now() - t0);
}

async function ensureClientGroup(
  tx: SQLiteTransaction<any, any, any, any>,
  id: string,
  userID: string
) {
  const clientGroup = await tx
    .select()
    .from(replicache_client_group)
    .where(eq(replicache_client_group.id, id))
    .then((rows) => rows.at(0));

  if (clientGroup) {
    if (clientGroup.userID !== userID) {
      throw authError;
    }

    return clientGroup;
  }

  // else create one

  await tx.insert(replicache_client_group).values({
    id,
    userID,
  });

  return {
    id,
    userID,
  };
}

async function ensureClient(
  tx: SQLiteTransaction<any, any, any, any>,
  id: string,
  clientGroupID: string,
  lastModifiedVersion: number,
  mutationID: number
): Promise<Replicache.Client> {
  const client = await tx
    .select()
    .from(replicache_client)
    .where(eq(replicache_client.id, id))
    .then((rows) => rows.at(0));

  if (client) {
    // If this client isn't from clientGroup we've auth'd, then user cannot
    // access it.

    if (client.clientGroupID !== clientGroupID) {
      throw authError;
    }

    return client;
  }

  // If mutationID isn't 1, then this isn't a new client. We should have found
  // the client record.

  if (mutationID !== 1) {
    throw clientStateNotFoundError;
  }

  // create client

  await tx.insert(replicache_client).values({
    id,
    clientGroupID,
    lastModifiedVersion,
  });

  return {
    id,
    clientGroupID,
    lastMutationID: 0,
    lastModifiedVersion,
  };
}
