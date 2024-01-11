"use client";

import { getCookie, setCookie } from "cookies-next";
import { Director, Movie } from "@/core/movie/movie.sql";
import { env } from "@/env.mjs";
import { Client } from "@/functions/replicache/framework";
import { ServerType } from "@/functions/replicache/server";
import React, { createContext, useEffect } from "react";
import {
  DeepReadonlyObject,
  Replicache,
  ScanResult,
  TEST_LICENSE_KEY,
  WriteTransaction,
} from "replicache";
import { useSubscribe } from "replicache-react";
import { Movie as M } from "@/core/movie";
import { nanoid } from "@/utils/nanoid";

const mutators = new Client<ServerType>()
  .mutation("movie_seen", async (tx, input) => {
    // TODO: update
    // probably could optimize this
    console.log("seen", tx, input);
    for (const id of input) {
      const movie = await tx.get<M.InfoWithNumber>(`userMovie/${id}`);
      if (!movie) {
        // throw new Error(`Movie ${id} not found`);
        // TODO: create one
      }
      await tx.set(`userMovie/${id}`, {
        ...movie,
        movieID: id,
        // also remove from watchlist
        timeAdded: null,
        timeSeen: Date.now(),
      } satisfies M.InfoWithNumber);
    }
  })
  .mutation("movie_unseen", async (tx, input) => {
    for (const id of input) {
      const movie = await tx.get(`userMovie/${id}`);
      const newData = {
        ...movie,
        movieID: id,
        timeSeen: null,
      };
      await tx.set(`userMovie/${id}`, newData);
    }
  })
  .mutation("movie_favorite", async (tx, input) => {
    console.log("fav", tx, input);
    for (const id of input) {
      const movie = await tx.get(`userMovie/${id}`);
      const newData = {
        movieID: id,
        ...movie,
        timeFavorited: Date.now(),
      };
      await tx.set(`userMovie/${id}`, newData);
    }
  })
  .mutation("movie_unfavorite", async (tx, input) => {
    console.log("unfav", tx, input);
    for (const id of input) {
      const movie = await tx.get(`userMovie/${id}`);
      const newData = {
        movieID: id,
        ...movie,
        timeFavorited: null,
      };
      await tx.set(`userMovie/${id}`, newData);
    }
  })
  .mutation("movie_marktowatch", async (tx, input) => {
    console.log("mark", tx, input);
    for (const id of input) {
      const movie = await tx.get(`userMovie/${id}`);
      const newData = {
        movieID: id,
        ...movie,
        timeAdded: Date.now(),
      };
      await tx.set(`userMovie/${id}`, newData);
    }
  })
  .mutation("movie_unmarktowatch", async (tx, input) => {
    console.log("unmark", tx, input);
    for (const id of input) {
      const movie = await tx.get(`userMovie/${id}`);
      const newData = {
        movieID: id,
        ...movie,
        timeAdded: null,
      };
      await tx.set(`userMovie/${id}`, newData);
    }
  })
  .mutation("movie_poster_path", async (tx, { id, posterPath }) => {
    const movie = await tx.get<M.InfoWithNumber>(`userMovie/${id}`);
    if (!movie) {
      // throw new Error(`Movie ${id} not found`);
      // make new one
    }
    await tx.set(`userMovie/${id}`, {
      ...movie,
      posterPath,
    });
  })
  .build();

const rep = process.browser
  ? new Replicache({
      licenseKey: env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY,
      name: "tspdt-user-id",
      pushURL: "/api/replicache-push",
      pullURL: "/api/replicache-pull",
      // TODO: a much better system for this
      //   TODO: user id
      mutators,
    })
  : null;

const ReplicacheContext = createContext<typeof rep | null>(null);

export const DirectorsContext = createContext<
  (readonly [string, DeepReadonlyObject<Director>])[]
>([]);

export const MoviesContext = createContext<
  (readonly [string, DeepReadonlyObject<SimplifiedMovie>])[]
>([]);

type SimplifiedMovie = Omit<Movie, "tmdbData">;

export function R({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let userID = getCookie("userID");

    if (!userID) {
      userID = nanoid();
      setCookie("userID", userID);
    }
  });

  const directors = useSubscribe(
    rep,
    async (tx) => {
      const directors = await tx
        .scan<Director>({ prefix: "director/" })
        .entries()
        .toArray();
      return directors;
    },
    {
      default: [] as (readonly [string, DeepReadonlyObject<Director>])[],
    }
  );

  const movies = useSubscribe(
    rep,
    async (tx) => {
      const movies = await tx
        .scan<SimplifiedMovie>({ prefix: "movie/" })
        .entries()
        .toArray();
      return movies;
    },
    {
      default: [] as (readonly [string, DeepReadonlyObject<SimplifiedMovie>])[],
    }
  );

  return (
    <ReplicacheContext.Provider value={rep}>
      <MoviesContext.Provider value={movies}>
        <DirectorsContext.Provider value={directors}>
          {children}
        </DirectorsContext.Provider>
      </MoviesContext.Provider>
    </ReplicacheContext.Provider>
  );
}

export function useDirectors() {
  const ctx = React.useContext(DirectorsContext);
  if (ctx === undefined) {
    throw new Error("useDirectors must be used within a R");
  }
  return ctx;
}

export function useMovies() {
  const ctx = React.useContext(MoviesContext);
  if (ctx === undefined) {
    throw new Error("useMovies must be used within a R");
  }
  return ctx;
}

function listen() {
  // TODO: Listen for changes on server
}
export function useReplicache() {
  const result = React.useContext(ReplicacheContext);
  if (!result) {
    throw new Error("useReplicache must be used within a ReplicacheProvider");
  }

  return result;
}
