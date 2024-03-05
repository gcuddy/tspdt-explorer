import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, SignOut } from "@phosphor-icons/react/dist/ssr";
import Form from "@/components/form";
import { getMovieInteractions, getPageSession } from "@/server/data-layer";
import { DeepNonNullable } from "ts-essentials";
import { FilmReel, Bookmarks } from "@phosphor-icons/react/dist/ssr";

export default function Me({ user }: Pick<DeepNonNullable<Awaited<ReturnType<typeof getPageSession>>>, "user">) {
    return (
        <div className="flex flex-col min-h-screen py-2">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold">Me</h1>
                    <span className="text-xl text-white/50">{user?.email}</span>
                </div>
                <div>
                    <Form action="/api/logout">
                        <Button variant="ghost" className="text-white/90">
                            Sign Out
                            <SignOut className="ml-1.5" />
                        </Button>
                    </Form>
                </div>
            </div>
            <Suspense fallback={<CardSkeleton />}>
                <CardWrapper />
            </Suspense>
        </div>
    );
}

async function CardWrapper() {
    // This tests if suspense is working
    // await sleep(3000);
    const userMovies = await getMovieInteractions();

    console.log({ userMovies });

    const moviesSeen = userMovies?.filter((m) => m.timeSeen) ?? [];

    const watchListMovies = userMovies?.filter((m) => m.timeAdded) ?? [];

    const lastTenMoviesSeen = moviesSeen
        .filter((m) => m.timeSeen)
        .sort((a, b) => (a.timeSeen ?? 0) - (b.timeSeen ?? 0))
        .reverse()
        .slice(0, 10);

    const lastTenMoviesAdded = watchListMovies
        .filter((m) => m.timeAdded)
        .sort((a, b) => (a.timeAdded ?? 0) - (b.timeAdded ?? 0))
        .reverse()
        .slice(0, 10);

    const amountOfMoviesInTop1000 = moviesSeen.filter(
        (m) => m.movie.currentRanking && m.movie.currentRanking <= 10000
    ).length;

    const tspdtWatchedPercent = Math.floor((amountOfMoviesInTop1000 / 1000) * 100);


    return (<div> <span>
        You have watched {tspdtWatchedPercent}% percent of the TSPDT Top 1000
        movies.
    </span>
        <div className="flex flex-col gap-8 pt-8">
            <Card className="items-start p-8 gap-5 h-72 ">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                        <div className="flex gap-1.5 text-lg font-semibold items-center">
                            <FilmReel className="inline-flex text-zinc-200" weight="light" />
                            <span className="text-lg leading-tight text-white tracking-tight font-semibold">
                                Seen
                            </span>
                        </div>
                        <span className="text-sm font-normal leading-tight text-zinc-400">
                            You have watched{" "}
                            {moviesSeen.length} movie{moviesSeen.length > 1 ? 's' : ''}.
                        </span>
                    </div>
                    <div>
                        <Button squishy={true} variant="ghost">
                            View All <ArrowRight className="ml-1.5" />
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2 grow w-full">
                    {lastTenMoviesSeen.length ? lastTenMoviesSeen.map((userMovie) => (
                        <Poster id={userMovie.movieId} posterPath={userMovie.movie?.tmdbPosterPath ?? ''} favorited={!!userMovie.timeFavorited} key={userMovie.movieId} />
                    )) : (
                        <div className="grid place-content-center w-full h-full">
                            <span className="text-sm text-zinc-500">
                                Movies you mark as seen will appear here
                            </span></div>)}
                </div>
            </Card>
            <div className="flex flex-col gap-4">
                <Card className="items-start p-8 gap-5 h-72 ">
                    <div className="flex justify-between w-full">
                        <div className="flex flex-col">
                            <div className="flex gap-1.5 text-lg font-semibold items-center">
                                <Bookmarks className="inline-flex text-zinc-200" weight="light" />
                                <span className="text-lg leading-tight text-white tracking-tight font-semibold">
                                    Watchlist
                                </span>
                            </div>
                            <span className="text-sm font-normal leading-tight text-zinc-400">
                                You have {" "}
                                {watchListMovies.length ?? 0} movie{watchListMovies.length > 1 ? 's' : ''} on your watchlist.
                            </span>
                        </div>
                        <div>
                            <Button squishy={true} variant="ghost">
                                View All <ArrowRight className="ml-1.5" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-2 grow w-full">
                        {lastTenMoviesAdded.length ? lastTenMoviesAdded.map((userMovie) => (
                            <Poster id={userMovie.movieId} posterPath={userMovie.movie?.tmdbPosterPath ?? ''} favorited={!!userMovie.timeFavorited} key={userMovie.movieId} />
                        )) : (
                            <div className="grid place-content-center w-full h-full">
                                <span className="text-sm text-zinc-500">
                                    Movies you add to your watchlist will appear here
                                </span></div>)}
                    </div>
                </Card>
            </div>
        </div>
    </div>
    )
}


// TODO: Card Skeleton
//
function CardSkeleton() {

    return (

        <div>
            <Card className="h-72 animate-pulse">
                <div />
            </Card>
            <Card className="h-72 animate-pulse">
                <div />
            </Card>
        </div>
    );
}

function Poster({ id, posterPath, favorited }: { id: string, posterPath: string, favorited: boolean }) {

    return <Link href={`/movie/${id}`} className="rounded ring-1 ring-white/5 relative">
        <Image
            src={`https://image.tmdb.org/t/p/w342${posterPath}`}
            alt=""
            className="rounded-[inherit]"
            width={109.333}
            height={164}
        />
        {favorited && <div className="absolute -bottom-2 -right-1">
            <Heart
                weight="fill"
                className="text-red-500"
            />
        </div>}

    </Link>
}
