"use client";

import { getMovie } from "./page";
import { RankingChart } from "./ranking-chart";
import { Card } from "@/components/ui/card";
import { MovieHeader } from "./movie-header";
import { Stack } from "@/components/ui/layout";
import { useCommandBar } from "@/components/command";
import * as Tabs from "@radix-ui/react-tabs";
import { produce } from "immer";

import {
  ArrowFatLineDown,
  ArrowFatLineUp,
  CheckCircle,
  FilmReel,
  Heart,
  ListPlus,
  PlusCircle,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { groupBy } from "remeda";
import { objectEntries } from "@antfu/utils";
import { Button } from "@/components/ui/button";
import { useActions } from "@/app/action-provider";
import Header from "@/app/header";
import { useReplicache } from "@/app/replicache";
import { useSubscribe } from "replicache-react";
import { Movie as M } from "@/core/movie";

export function Movie({
  movie,
}: {
  movie: Awaited<ReturnType<typeof getMovie>>;
}) {
  const bar = useCommandBar();
  console.log({ movie });

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

  const [expandedTabsState, setexpandedTabsState] = useState<{
    cast: boolean;
    crew: boolean;
    genre: boolean;
  }>({
    cast: false,
    crew: false,
    genre: false,
  });

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

  const actions = useActions();

  const replicache = useReplicache();

  const userMovie = useSubscribe(replicache, async (tx) => {
    return tx.get<M.InfoWithNumber>(`userMovie/${movie.id}`);
  });

  console.log({ userMovie });

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
      {/* after doing all this, i'm not sure i want to do this header thing... lol */}
      <Header />
      <main className="mx-auto max-w-5xl">
        <div className="flex sticky justify-end gap-3 top-0 bg-zinc-925 z-10 h-16 items-center">
          <Button
            className={userMovie?.timeSeen ? "opacity-50" : ""}
            onClick={() => {
              replicache.mutate.movie_seen([movie.id]);
            }}
          >
            {userMovie?.timeSeen ? (
              <CheckCircle className="mr-1.5" />
            ) : (
              <FilmReel className="mr-1.5" />
            )}
            {userMovie?.timeSeen ? "Seen" : "Mark Seen"}
          </Button>
          <Button>
            <ListPlus className="mr-1.5" />
            To Watch
          </Button>
          <Button>
            <Heart />
            <span className="sr-only">Favorite</span>
          </Button>
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
                {/* <span className="text-lg tracking-tight font-semibold text-center">
              Ranking
            </span> */}
                {/* <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Lowest</span>
                <span className="text-sm text-zinc-400">Highest</span>
              </div>
              <div className="flex justify-between">
                <span className="text-2xl font-semibold text-zinc-50">
                  {lowestRanking}
                </span>
                <span className="text-2xl font-semibold text-zinc-50">
                  {highestRanking}
                </span>
              </div>
            </div> */}
              </Card>
              {/* TODO: these two cards aren't really thematically related */}
              <Card className="col-span-8 p-6">
                {/* TODO Here: TABS for cast, crew, genre (although might want to find another place for genre) */}
                <Tabs.Root
                  className="flex flex-col justify-between grow h-full"
                  defaultValue="cast"
                >
                  <Tabs.Content value="cast">
                    <div className="flex flex-wrap text-balance gap-x-3 gap-y-1">
                      {movie.tmdb?.credits.cast
                        .slice(0, expandedTabsState.cast ? undefined : 10)
                        .map((c) => (
                          <div
                            className="text-sm rounded-md  text-zinc-400 font-semibold hover:text-zinc-50 transition"
                            key={c.id}
                          >
                            <span>{c.name}</span>
                            {/* <span>{c.character}</span> */}
                          </div>
                        ))}
                      {(movie.tmdb?.credits.cast?.length ?? 0) > 10 && (
                        <button
                          className="text-sm rounded-md  text-zinc-200 font-medium hover:text-zinc-50 transition"
                          onClick={() => {
                            setexpandedTabsState(
                              produce(expandedTabsState, (draft) => {
                                draft.cast = !draft.cast;
                              })
                            );
                          }}
                        >
                          {expandedTabsState.cast ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  </Tabs.Content>
                  <Tabs.Content className="min-w-0" value="crew">
                    {objectEntries(
                      groupBy(movie.tmdb?.credits.crew ?? [], (c) => c.job)
                    )
                      .slice(0, 3)
                      .map(([job, crew]) => (
                        <div
                          className="flex w-full justify-between min-w-0"
                          key={job as string}
                        >
                          <span className="text-sm font-semibold text-zinc-400">
                            {job as string}
                          </span>
                          <div className="flex shrink-0 grow-0 basis-auto min-w-0 text-sm gap-1 truncate">
                            {crew.map((c) => (
                              <div
                                className="min-w-0 truncate no-wrap shrink-0"
                                key={c.id}
                              >
                                {c.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </Tabs.Content>
                  <Tabs.Content value="genre">
                    <div className="flex items-center w-full h-full justify-center">
                      {movie.tmdb?.genres.map((g) => (
                        <div className="flex w-full items-center" key={g.id}>
                          <span className="text-lg tracking-tight font-semibold tex-twhite">
                            {g.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Tabs.Content>
                  <Tabs.List className="flex gap-2 text-sm">
                    <Tabs.Trigger
                      className="p-2.5 rounded-md font-semibold text-zinc-500 data-[state=active]:text-zinc-50 transition  hover:bg-zinc-500/10"
                      value="cast"
                    >
                      Cast
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className="p-2.5 rounded-md font-semibold text-zinc-500 data-[state=active]:text-zinc-50 transition hover:bg-zinc-500/10"
                      value="crew"
                    >
                      Crew
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className="p-2.5 rounded-md font-semibold text-zinc-500 data-[state=active]:text-zinc-50 transition hover:bg-zinc-500/10"
                      value="genre"
                    >
                      Genre
                    </Tabs.Trigger>
                  </Tabs.List>
                </Tabs.Root>
              </Card>
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
          </div>
        </Stack>
      </main>
    </>
  );
}
