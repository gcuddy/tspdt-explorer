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
        category: "Movie",
        run: () => {},
      },
    ];
  });

  return (
    <Stack className="gap-8">
      <MovieHeader movie={movie} />
      <div className="grid lg:grid-cols-2">
        <Card>
          <span className="text-lg tracking-tight font-semibold text-center">
            Ranking History
          </span>
          <div className="h-72">
            {/* line chart */}
            <RankingChart rankings={movie.rankings} />
          </div>
        </Card>
      </div>
    </Stack>
  );
}
