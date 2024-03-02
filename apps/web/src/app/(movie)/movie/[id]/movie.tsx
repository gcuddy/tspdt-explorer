"use client";

import { useCommandBar } from "@/components/command";
import { Card } from "@/components/ui/card";
import { Stack } from "@/components/ui/layout";
import * as Tabs from "@radix-ui/react-tabs";
import { MovieHeader } from "./movie-header";
import { getMovie } from "./page";
import { RankingChart } from "./ranking-chart";

import { Button } from "@/components/ui/button";
import * as Dialog from "@/components/ui/dialog";
import { cn } from "@/utils/tailwind";
import { objectEntries } from "@antfu/utils";
import {
    ArrowFatLineDown,
    ArrowFatLineUp,
    Play,
    PlusCircle,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useMemo } from "react";
import { groupBy } from "remeda";
import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "@/server/data-layer";
import { Poster } from "@/components/poster";
// import * as Dialog from "@radix-ui/react-dialog";

export function Movie({
    movie,
    actionSlot
}: {
    movie: Awaited<ReturnType<typeof getMovie>>;
    actionSlot: React.ReactNode;
}) {
    const bar = useCommandBar();

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

    const trailer = useMemo(() => {
        return movie.tmdb?.videos.results.find((v) => v.type === "Trailer");
    }, [movie.tmdb?.videos.results]);


    bar.register("movie", async () => {
        return [
            {
                title: "Add to Watchlist",
                icon: PlusCircle,
                disabled: false,
                category: "Selection",
                run: () => { },
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
            {
                title: "Fix Metadata",
                icon: PlusCircle,
                disabled: false,
                category: "Selection",
                run: () => {
                    // TODO
                },
            },
        ];
    });

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
                    {!!trailer ? (
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button variant="ghost">
                                    <Play className="mr-1.5" size={12} weight="fill" />
                                    Trailer
                                </Button>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay />
                                <Dialog.Content>
                                    <Dialog.Title>Trailer</Dialog.Title>
                                    <div className="flex justify-center">
                                        {/* TODO: make this bigger */}
                                        <iframe
                                            width="560"
                                            height="315"
                                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&controls=1&showinfo=0&modestbranding=1`}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            style={{ border: "0px" }}
                                        />
                                    </div>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    ) : null}
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
                        <Card className="h-72 flex flex-row gap-16">
                            <div className="pl-6 py-6 gap-4 h-full flex flex-col justify-center">
                                <span className=" text-xl leading-tight drop-shadow  tracking-tight text-balance text-zinc-50 font-semibold">
                                    {movie.tmdb?.tagline}
                                </span>
                                <p className="text-sm text-zinc-400">{movie.tmdb?.overview}</p>
                            </div>
                            <div className="pr-6 shrink-0">
                                {(movie.tmdb?.images.posters?.length ?? 0) > 1 ? (
                                    <Dialog.Root>
                                        <Dialog.Trigger className="contents">
                                            {/* this makes distance 32, outer radius is 8 so 8 - 32 is negative - no radius needed */}
                                            <Poster
                                                poster_path={
                                                    movie.tmdb?.poster_path ?? ""
                                                    //   userMovie?.posterPath ?? movie.tmdb?.poster_path ?? ""
                                                }
                                            />
                                        </Dialog.Trigger>
                                        <Dialog.Portal>
                                            <Dialog.Overlay />
                                            <Dialog.Content>
                                                <Dialog.Title>Change Poster</Dialog.Title>
                                                <div className="flex flex-wrap max-h-96 overflow-y-auto">
                                                    {movie.tmdb?.images.posters.map((p) => (
                                                        <div key={p.file_path} className="w-1/4 p-2">
                                                            {/* {JSON.stringify(p)} */}
                                                            <button
                                                                onClick={() => {
                                                                    //   replicache.mutate.movie_poster_path({
                                                                    //     id: movie.id,
                                                                    //     posterPath: p.file_path,
                                                                    //   });
                                                                }}
                                                            >
                                                                <Poster
                                                                    width={p.width}
                                                                    poster_path={p.file_path}
                                                                />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Dialog.Content>
                                        </Dialog.Portal>
                                    </Dialog.Root>
                                ) : (
                                    <Poster poster_path={movie.tmdb?.poster_path ?? ""} />
                                )}
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
                            <MovieCreditsCard movie={movie} />
                            {/* TODO: these two cards aren't really thematically related */}
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
                                    <Reccomendations movie={movie} />
                                </div>
                            </Card>
                        </div>
                    </div>
                </Stack>
            </main>
        </>
    );
}

function Reccomendations({
    movie,
}: {
    movie: Awaited<ReturnType<typeof getMovie>>;
}) {
    const { data, isLoading, isError, failureReason } = useQuery({
        queryKey: ["recommendations", movie.id],
        queryFn: () => getRecommendations(movie),
    });

    if (isError) return <div>Error: {failureReason?.message}</div>;
    if (!data || isLoading)
        return (
            <div className="grid grid-cols-4 w-full gap-4 mt-4">
                <div className="flex flex-col gap-2 items-center min-w-0 truncate">
                    <div className="rounded overflow-hidden w-fit">
                        <div className="bg-zinc-400 w-36 h-52 animate-pulse" />
                    </div>
                    <span className="text-sm text-zinc-400 whitespace-normal">
                        Loading...
                    </span>
                </div>
                <div className="flex flex-col gap-2 items-center min-w-0 truncate">
                    <div className="rounded overflow-hidden w-fit">
                        <div className="bg-zinc-400 w-36 h-52 animate-pulse" />
                    </div>
                    <span className="text-sm text-zinc-400 whitespace-normal">
                        Loading...
                    </span>
                </div>
                <div className="flex flex-col gap-2 items-center min-w-0 truncate">
                    <div className="rounded overflow-hidden w-fit">
                        <div className="bg-zinc-400 w-36 h-52 animate-pulse" />
                    </div>
                    <span className="text-sm text-zinc-400 whitespace-normal">
                        Loading...
                    </span>
                </div>
                <div className="flex flex-col gap-2 items-center min-w-0 truncate">
                    <div className="rounded overflow-hidden w-fit">
                        <div className="bg-zinc-400 w-36 h-52 animate-pulse" />
                    </div>
                    <span className="text-sm text-zinc-400 whitespace-normal">
                        Loading...
                    </span>
                </div>
            </div>
        );

    return (
        <div className="grid grid-cols-4 gap-4 w-full mt-4">
            {data?.vectorQuery?.map((movie) => {
                return (
                    <Link
                        href={`/movie/${movie.id}`}
                        className="flex flex-col gap-2 items-center min-w-0 truncate"
                        key={movie.id}
                    >
                        <div className="rounded overflow-hidden w-fit">
                            <Poster poster_path={movie.metadata.posterPath} />
                        </div>
                        <span className="text-xs text-zinc-400 whitespace-normal line-clamp-2 px-4 text-center">
                            {movie.metadata.title} ({movie.metadata.year})
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}

const JOBS_TO_SHOW = [
    "Screenplay",
    "Producer",
    "Cinematography",
    "Director of Photography",
    "Editor",
    "Original Music Composer",
    "Music",
];

function MovieCreditsCard({
    movie,
    className,
}: {
    movie: Awaited<ReturnType<typeof getMovie>>;
    className?: string;
}) {
    const groupedCrew = useMemo(() => {
        return objectEntries(groupBy(movie.tmdb?.credits.crew ?? [], (c) => c.job));
    }, [movie]);

    console.log({ groupedCrew });

    return (
        <Card className={cn("col-span-8 p-6", className)}>
            {/* TODO Here: TABS for cast, crew, genre (although might want to find another place for genre) */}
            <Dialog.Root>
                <Tabs.Root
                    className="flex flex-col justify-between grow h-full w-full"
                    defaultValue="cast"
                >
                    <Tabs.Content value="cast">
                        <div className="flex flex-wrap text-balance gap-x-3 gap-y-1">
                            {movie.tmdb?.credits.cast.slice(0, 10).map((c) => (
                                <div
                                    className="text-sm rounded-md  text-zinc-400 font-semibold hover:text-zinc-50 transition"
                                    key={c.id}
                                >
                                    <Link href={`/actor/${c.id}`}>
                                        <span>{c.name}</span>
                                    </Link>
                                    {/* <span>{c.character}</span> */}
                                </div>
                            ))}
                            {(movie.tmdb?.credits.cast?.length ?? 0) > 10 && (
                                <>
                                    <Dialog.Trigger className="text-sm rounded-md  text-zinc-200 font-medium hover:text-zinc-50 transition">
                                        Show more
                                        {/* {expandedTabsState.cast ? "Show Less" : "Show More"} */}
                                    </Dialog.Trigger>
                                    <Dialog.Portal>
                                        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                                        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl animate-in fade-in ring-1 ring-black/10 translate-x-[-50%] translate-y-[-50%] gap-4 bg-black/90 backdrop-blur-md p-6 shadow-lg rounded-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
                                            <Dialog.Title>The Cast</Dialog.Title>
                                            <div className="flex flex-col gap-x-4 gap-y-1 text-lg font-normal leading-tight text-white max-h-80 overflow-y-auto">
                                                {movie.tmdb?.credits.cast.map((c) => (
                                                    <div className=" transition" key={c.id}>
                                                        <Link
                                                            href={`/actor/${c.id}`}
                                                            className="text-white font-medium"
                                                        >
                                                            {c.name}
                                                        </Link>{" "}
                                                        <span className="text-zinc-400">
                                                            as {c.character}
                                                        </span>
                                                        {/* <span>{c.character}</span> */}
                                                    </div>
                                                ))}
                                            </div>
                                        </Dialog.Content>
                                    </Dialog.Portal>
                                </>
                            )}
                        </div>
                    </Tabs.Content>
                    <Tabs.Content
                        className="min-w-0 w-full flex flex-col grow gap-y-1"
                        value="crew"
                    >
                        {groupedCrew
                            .filter(([job, _crew]) => JOBS_TO_SHOW.includes(job as string))
                            //   display in same order
                            .sort(([jobA, _crewA], [jobB, _crewB]) => {
                                return (
                                    JOBS_TO_SHOW.indexOf(jobA as string) -
                                    JOBS_TO_SHOW.indexOf(jobB as string)
                                );
                            })
                            .map(([job, crew]) => (
                                <div
                                    className="flex w-full justify-between min-w-0 gap-1 truncate"
                                    key={job as string}
                                >
                                    <span className="text-sm font-semibold text-zinc-400">
                                        {job as string}
                                    </span>
                                    <div className="flex flex-wrap shrink-0 grow-0 basis-auto min-w-0 text-sm gap-1 truncate">
                                        {crew.map((c) => (
                                            <div
                                                className="min-w-0 truncate no-wrap shrink-0 text-zinc-400"
                                                key={c.id}
                                            >
                                                {c.name}{crew.indexOf(c) !== crew.length - 1 ? ", " : ""}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        <Dialog.Trigger className="text-sm rounded-md  text-zinc-200 font-medium hover:text-zinc-50 transition ml-auto">Show more</Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay />
                            <Dialog.Content>
                                <Dialog.Title>The Crew</Dialog.Title>
                                <div className="flex flex-col gap-x-4 gap-y-1 text-lg font-normal leading-tight text-white max-h-80 overflow-y-auto">
                                    {groupedCrew.map(([job, crew]) => (
                                        <div
                                            key={job as string}
                                            className="flex w-full justify-between min-w-0"
                                        >
                                            <span className="font-semibold text-zinc-400">
                                                {job as string}
                                            </span>
                                            <div className="flex shrink-0 grow-0 basis-auto min-w-0 gap-1 truncate">
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
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Tabs.Content>
                    {/* <Tabs.Content value="genre">
            <div className="flex items-center w-full h-full justify-center">
              {movie.tmdb?.genres.map((g) => (
                <div className="flex w-full items-center" key={g.id}>
                  <span className="text-lg tracking-tight font-semibold tex-twhite">
                    {g.name}
                  </span>
                </div>
              ))}
            </div>
          </Tabs.Content> */}
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
                        {/* <Tabs.Trigger
              className="p-2.5 rounded-md font-semibold text-zinc-500 data-[state=active]:text-zinc-50 transition hover:bg-zinc-500/10"
              value="genre"
            >
              Genre
            </Tabs.Trigger> */}
                    </Tabs.List>
                </Tabs.Root>
            </Dialog.Root>
        </Card>
    );
}
