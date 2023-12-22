import {
  text,
  integer,
  primaryKey,
  sqliteTable,
} from "drizzle-orm/sqlite-core";
import { timestamps, id } from "@/utils/sql";
import { Actor } from "../actor";

export const replicache_client_group = sqliteTable(
  "replicache_client_group",
  {
    ...timestamps,
    id: text("id", { length: 36 }).notNull(),
    actor: text("actor", { mode: "json" }).$type<Actor>(),
    cvrVersion: integer("cvr_version").notNull(),
    clientVersion: integer("client_version").notNull(),
  },
  (table) => ({
    primary: primaryKey({ columns: [table.id] }),
  })
);

export const replicache_client = sqliteTable("replicache_client", {
  id: text("id", { length: 36 }).notNull().primaryKey(),
  mutationID: integer("mutation_id").default(0).notNull(),
  ...timestamps,
  clientGroupID: text("client_group_id", { length: 36 }).notNull(),
  clientVersion: integer("client_version").notNull(),
});

export const replicache_cvr = sqliteTable(
  "replicache_cvr",
  {
    ...id,
    ...timestamps,
    data: text("data", {
      mode: "json",
    })
      .$type<Record<string, number>>()
      .notNull(),
    id: integer("id").notNull(),
    clientGroupID: text("client_group_id", { length: 36 }).notNull(),
    clientVersion: integer("client_version").notNull(),
  },
  (table) => ({
    primary: primaryKey({ columns: [table.clientGroupID, table.id] }),
  })
);
