// TODO: this should be converted to a server component

import { Card } from "@/components/ui/card";
import { Stack } from "@/components/ui/layout";
import { MovieHeader } from "./movie-header";
import { RankingChart } from "./ranking-chart";

import { Button } from "@/components/ui/button";
import {
  ArrowFatLineDown,
  ArrowFatLineUp,
} from "@phosphor-icons/react/dist/ssr";
import { Suspense, useMemo } from "react";
import { MovieCreditsCard, MovieCreditsCardSkeleton, MovieOverview, MovieOverviewSkeleton, TrailerWrapper } from "./movie-parts";
// import * as Dialog from "@radix-ui/react-dialog";
import { client } from "@/lib/hono";
import type { InferResponseType } from 'hono/client';
import { Recomendations } from "./recommendations";

const $get = client.movie[":id"].$get;

export function Movie({
  movie,
  actionSlot
}: {
  movie: NonNullable<InferResponseType<typeof $get>>
  actionSlot: React.ReactNode;
}) {
  // const bar = useCommandBar();

  const rawRankings = movie.rankings.map((r) => r.ranking).filter(Boolean);
  const currentRanking = rawRankings.at(-1);
  const lowestRanking = Math.max(...rawRankings);
  const highestRanking = Math.min(...rawRankings);

  const previousYearDelta = useMemo(() => {
    const current = movie.rankings.at(-1)?.ranking;
    const previous = movie.rankings.at(-2)?.ranking;
    if (!current || !previous) return undefined;
    return current - previous;
  }, [movie.rankings]);

  // TODO: if we want this, put it in wrapping client component
  // bar.register("movie", async () => {
  //     return [
  //         {
  //             title: "Add to Watchlist",
  //             icon: PlusCircle,
  //             disabled: false,
  //             category: "Selection",
  //             run: () => { },
  //         },
  //         {
  //             title: "Compare to...",
  //             icon: PlusCircle,
  //             disabled: false,
  //             category: "Selection",
  //             run: () => {
  //                 // TODO: Filter just movies
  //             },
  //         },
  //         {
  //             title: "Fix Metadata",
  //             icon: PlusCircle,
  //             disabled: false,
  //             category: "Selection",
  //             run: () => {
  //                 // TODO
  //             },
  //         },
  //     ];
  // });

  //   actions.setSlot(
  // <div className="flex sticky justify-end gap-3 top-0 bg-zinc-925 z-10 h-20 items-center">
  //   <Button>Seen</Button>
  //   <Button>To Watch</Button>
  //   <Button>Favorite</Button>
  // </div>
  //   );
  //
  return (
    <>
      <main className="mx-auto max-w-5xl">
        <div className="flex sticky justify-end gap-3 top-0 bg-zinc-925 z-10 h-16 items-center">
          <Suspense fallback={<Button> <div className="h-2 w-4 bg-zinc-400 animate-pulse"></div></Button>}>
            {!!movie.tmdbId && <TrailerWrapper tmdbId={movie.tmdbId} />}
          </Suspense>
          {actionSlot}
        </div>
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
            <Suspense fallback={<MovieOverviewSkeleton />}>
              {!!movie.tmdbId && <MovieOverview tmdbId={movie.tmdbId} />}
            </Suspense>
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-4 p-6">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between w-full gap-1">
                    <span className="text-sm text-zinc-400">
                      Current Ranking
                    </span>
                    <span className="tabular-nums">{currentRanking}</span>
                  </div>
                  {previousYearDelta !== undefined && (
                    <div className="flex items-center justify-between w-full gap-1">
                      <span className="text-sm text-zinc-400">
                        Previous Year Change
                      </span>
                      <span className="flex items-center gap-0.5 tabular-nums">
                        {previousYearDelta && previousYearDelta > 0 ? (
                          <ArrowFatLineDown className="text-zinc-400" />
                        ) : previousYearDelta ? (
                          <ArrowFatLineUp className="text-zinc-400" />
                        ) : null}
                        {Math.abs(previousYearDelta)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between w-full gap-1">
                    <span className="text-sm text-zinc-400">
                      Highest Ranking
                    </span>
                    <span className="tabular-nums">{highestRanking}</span>
                  </div>
                  <div className="flex items-center justify-between w-full gap-1">
                    <span className="text-sm text-zinc-400">
                      Lowest Ranking
                    </span>
                    <span className="tabular-nums">{lowestRanking}</span>
                  </div>
                </div>
              </Card>
              <Suspense fallback={<MovieCreditsCardSkeleton />}>
                {!!movie.tmdbId && <MovieCreditsCard tmdbId={movie.tmdbId} />}
              </Suspense>
            </div>
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
            <div className="pb-6">
              <Card>
                <span className="text-lg tracking-tight font-semibold text-center">
                  Recommendations
                </span>
                <div className="h-72">
                  {/* line chart */}
                  <Recomendations movie={movie} />
                </div>
              </Card>
            </div>
          </div>
        </Stack>
      </main>
    </>
  );
}



