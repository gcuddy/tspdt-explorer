"use client";

import { Director, Movie } from "@/core/movie/movie.sql";
import { env } from "@/env.mjs";
import { Client } from "@/functions/replicache/framework";
import { ServerType } from "@/functions/replicache/server";
import React, { createContext } from "react";
import {
  DeepReadonlyObject,
  Replicache,
  ScanResult,
  TEST_LICENSE_KEY,
  WriteTransaction,
} from "replicache";
import { useSubscribe } from "replicache-react";
import { Movie as M } from "@/core/movie";

const mutators = new Client<ServerType>()
  .mutation("movie_seen", async (tx, input) => {
    // TODO: update
    // probably could optimize this
    for (const id of input) {
      const movie = await tx.get<M.InfoWithNumber>(`userMovie/${id}`);
      if (!movie) {
        // throw new Error(`Movie ${id} not found`);
        // TODO: create one
      }
      await tx.set(`userMovie/${id}`, {
        ...movie,
        timeSeen: Date.now(),
      } satisfies M.InfoWithNumber);
    }
  })
  .build();

const rep = process.browser
  ? new Replicache({
      licenseKey: env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY,
      name: "tspdt-user-id",
      //   pushURL: "/api/replicache-push",
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
