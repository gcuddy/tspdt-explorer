"use client";

import { getMovie } from "./page";
import { RankingChart } from "./ranking-chart";
import { Card } from "@/components/ui/card";
import { MovieHeader } from "./movie-header";
import { Stack } from "@/components/ui/layout";
import { useCommandBar } from "@/components/command";
import { PlusCircle } from "@phosphor-icons/react";

export function Movie({
  movie,
}: {
  movie: Awaited<ReturnType<typeof getMovie>>;
}) {
  const bar = useCommandBar();

  bar.register("movie", async () => {
    return [
      {
        title: "Add to Watchlist",
        icon: PlusCircle,
        disabled: false,
        category: "Selection",
        run: () => {},
      },
      {
        title: "Compare to...",
        icon: PlusCircle,
        disabled: false,
        category: "Selection",
        run: () => {
          // TODO: Filter just movies
        },
      },
    ];
  });

  return (
    <Stack
      style={
        {
          // couldn't get the tailwind ones to look right, so just hardcoding this (from Fey)
          // boxShadow: "rgba(0, 0, 0, 0.33) 0px 20px 20px",
        }
      }
      className="gap-8 max-w-5xl ring-1 ring-zinc-950/50 shadow-[rgba(0,0,0,0.33)_0px_20px_20px] rounded overflow-hidden bg-zinc-900"
    >
      <MovieHeader movie={movie} />
      <div className="grid">
        <div>
          <span className="text-lg tracking-tight font-semibold text-center">
            Ranking History
          </span>
          <div className="h-72">
            {/* line chart */}
            <RankingChart data={[movie]} />
          </div>
        </div>
      </div>
    </Stack>
  );
}
