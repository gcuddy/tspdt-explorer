import { sql } from "drizzle-orm";
import { integer } from "drizzle-orm/sqlite-core";

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
};
