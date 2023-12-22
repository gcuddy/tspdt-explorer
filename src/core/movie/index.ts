export * as Movie from "./index";

import { zod } from "@/utils/zod";
import { createSelectSchema } from "drizzle-zod";
import { userMovie } from "./movie.sql";
import { db } from "@/db/client";
import { and, eq, inArray, sql } from "drizzle-orm";
import { useActor, useUser } from "../actor";

export const Info = createSelectSchema(userMovie, {});
export type Info = typeof userMovie.$inferSelect;

// map keys with type Date to type number
export type InfoWithNumber = {
  [K in keyof Info]: Info[K] extends Date
    ? number
    : Info[K] extends Date | null
    ? number | null
    : Info[K];
};

export const seen = zod(Info.shape.id.array(), async (input) => {
  db.transaction(async (tx) =>
    tx
      .update(userMovie)
      .set({
        timeSeen: sql`now()`,
        timeUpdated: sql`now()`,
      })
      .where(
        and(
          eq(
            userMovie.userID,
            // TODO: get userId
            useUser()
          ),
          inArray(userMovie.id, input)
        )
      )
  );
});
