import { replicache_client, replicache_client_group } from "./replicache.sql";

export * as Replicache from ".";

export type Client = typeof replicache_client.$inferSelect;
export type ClientGroup = typeof replicache_client_group.$inferSelect;

export async function poke() {
  // TODO: implement
}
