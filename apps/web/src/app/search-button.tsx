"use client";

import { useCommandBar } from "@/components/command";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React, { useContext } from "react";
import { useActions } from "./action-provider";

export function SearchButton({ mini }: { mini?: boolean }) {
  //   const bar = useCommandBar();

  return <div>search</div>;

  //   return mini ? (
  //     <button
  //       onClick={() => {
  //         bar.show();
  //       }}
  //       className="w-fit bg-zinc-800 text-sm text-zinc-400 rounded-full border border-white/5 transition py-2 px-3 flex items-center justify-between"
  //     >
  //       <MagnifyingGlass className="w-4 h-4" />
  //     </button>
  //   ) : (
  //     <button
  //       onClick={() => {
  //         bar.show();
  //       }}
  //       className="w-60 bg-zinc-800 text-sm text-zinc-400 rounded-full border border-white/5 transition py-2 px-3 flex items-center justify-between"
  //     >
  //       <span>Search...</span>
  //       <MagnifyingGlass className="w-4 h-4" />
  //     </button>
  //   );
}
