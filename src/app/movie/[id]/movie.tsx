"use client";

import { getMovie } from "./page";
import { RankingChart } from "./ranking-chart";
import { Card } from "@/components/ui/card";
import { MovieHeader } from "./movie-header";
import { Stack } from "@/components/ui/layout";
import { useCommandBar } from "@/components/command";
import { PlusCircle } from "@phosphor-icons/react";
import Image from "next/image";

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
      className=" gap-16 max-w-5xl ring-1 ring-zinc-950/50 shadow-[rgba(0,0,0,0.33)_0px_20px_20px] rounded overflow-hidden bg-zinc-900"
    >
      <MovieHeader movie={movie} />
      <div className="w-full max-w-3xl mx-auto space-y-14">
        <Card className="h-72 flex flex-row gap-16">
          <div className="pl-6 py-6 gap-4 h-full flex flex-col justify-center">
            <span className=" text-xl leading-tight drop-shadow  tracking-tight text-balance text-zinc-50 font-semibold">
              {movie.tmdb?.tagline}
            </span>
            <p className="text-sm text-zinc-400">{movie.tmdb?.overview}</p>
          </div>
          <div className="pr-6 shrink-0">
            {/* this makes distance 32, outer radius is 8 so 8 - 32 is negative - no radius needed */}
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.tmdb?.poster_path}`}
              alt=""
              className="ring-1 ring-zinc-900"
              width={150}
              height={150 * 1.5}
              //   height={288}
              //   width={288 / (16 / 9)}
            />
          </div>
        </Card>
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
      </div>
    </Stack>
  );
}
