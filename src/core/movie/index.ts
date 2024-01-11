export * as Movie from "./index";

import { zod } from "@/utils/zod";
import { createSelectSchema } from "drizzle-zod";
import { movies, userMovie } from "./movie.sql";
import { db } from "@/db/client";
import { and, eq, inArray, sql } from "drizzle-orm";
import { useActor, useUser } from "../actor";
import { z } from "zod";

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
        timeSeen: sql`current_timestamp`,
        timeUpdated: sql`current_timestamp`,
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

export const unseen = zod(Info.shape.id.array(), async (input) => {
  db.transaction(async (tx) =>
    tx
      .update(userMovie)
      .set({
        timeSeen: null,
        timeUpdated: sql`current_timestamp`,
      })
      .where(and(eq(userMovie.userID, useUser()), inArray(userMovie.id, input)))
  );
});

export const marktowatch = zod(Info.shape.id.array(), async (input) => {
  db.transaction(async (tx) =>
    tx
      .update(userMovie)
      .set({
        timeAdded: sql`current_timestamp`,
        timeUpdated: sql`current_timestamp`,
      })
      .where(and(eq(userMovie.userID, useUser()), inArray(userMovie.id, input)))
  );
});

export const unmarktowatch = zod(Info.shape.id.array(), async (input) => {
  db.transaction(async (tx) =>
    tx
      .update(userMovie)
      .set({
        timeAdded: null,
        timeUpdated: sql`current_timestamp`,
      })
      .where(and(eq(userMovie.userID, useUser()), inArray(userMovie.id, input)))
  );
});

export const favorite = zod(Info.shape.id.array(), async (input) => {
  db.transaction(async (tx) =>
    tx
      .update(userMovie)
      .set({
        timeFavorited: sql`current_timestamp`,
        timeUpdated: sql`current_timestamp`,
      })
      .where(and(eq(userMovie.userID, useUser()), inArray(userMovie.id, input)))
  );
});

export const unfavorite = zod(Info.shape.id.array(), async (input) => {
  db.transaction(async (tx) =>
    tx
      .update(userMovie)
      .set({
        timeFavorited: null,
        timeUpdated: sql`current_timestamp`,
      })
      .where(and(eq(userMovie.userID, useUser()), inArray(userMovie.id, input)))
  );
});

export const setPosterPath = zod(
  Info.pick({
    id: true,
    posterPath: true,
  }),
  async (input) => {
    // TODO
  }
);
