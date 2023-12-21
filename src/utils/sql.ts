import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

export const cuid = (name: string) => text(name, { length: 21 });
export const id = {
  get id() {
    return cuid("id").primaryKey().notNull();
  },
};

export const timestamp = (name: string) => integer(name, { mode: "timestamp" });

export const userID = {
  get id() {
    return cuid("id").notNull();
  },
  get userID() {
    return cuid("user_id").notNull();
  },
};

export const timestamps = {
  timeCreated: integer("time_created", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  timeUpdated: integer("time_updated", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  // .onUpdateNow(),
  timeDeleted: integer("time_deleted", {
    mode: "timestamp",
  }),
};
