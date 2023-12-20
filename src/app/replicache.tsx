"use client";

import { Director } from "@/db/schema";
import React, { createContext } from "react";
import {
  DeepReadonlyObject,
  Replicache,
  ScanResult,
  TEST_LICENSE_KEY,
} from "replicache";
import { useSubscribe } from "replicache-react";

const rep = process.browser
  ? new Replicache({
      licenseKey: TEST_LICENSE_KEY,
      name: "tspdt-user-id",
      pushURL: "/api/replicache-push",
      pullURL: "/api/replicache-pull",
    })
  : null;

export const DirectorsContext = createContext<
  (readonly [string, DeepReadonlyObject<Director>])[]
>([]);

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

  return (
    <DirectorsContext.Provider value={directors}>
      {children}
    </DirectorsContext.Provider>
  );
}

export function useDirectors() {
  const ctx = React.useContext(DirectorsContext);
  if (ctx === undefined) {
    throw new Error("useDirectors must be used within a R");
  }
  return ctx;
}

function listen() {
  // TODO: Listen for changes on server
}
