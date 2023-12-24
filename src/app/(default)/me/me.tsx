"use client";

import { useReplicache } from "@/app/replicache";
import { Card } from "@/components/ui/card";
import { Movie } from "@/core/movie";
import { SimplifiedMovie } from "@/core/movie/movie.sql";
import { Ranking } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useSubscribe } from "replicache-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";

export default function Me() {
  const rep = useReplicache();

  const userMovies = useSubscribe(rep, async (tx) => {
    const userMovies = await tx
      .scan({ prefix: "userMovie/" })
      .entries()
      .toArray();

    return await Promise.all(
      userMovies.map(async ([key, userMovie]) => {
        const [, id] = key.split("/");
        const movie = await tx.get<SimplifiedMovie>(`movie/${id}`);
        const ranking = await tx.get<Ranking>(`movie/${id}/ranking`);
        return { ...(userMovie as Movie.InfoWithNumber), movie, ranking };
      })
    );
  });

  const moviesSeen = useMemo(() => {
    return userMovies?.filter((m) => m.timeSeen) ?? [];
  }, [userMovies]);

  const watchListMovies = useMemo(() => {
    return userMovies?.filter((m) => m.timeAdded) ?? [];
  }, [userMovies]);

  const lastTenMoviesSeen = useMemo(() => {
    return moviesSeen
      .filter((m) => m.timeSeen)
      .sort((a, b) => (a.timeSeen ?? 0) - (b.timeSeen ?? 0))
      .reverse()
      .slice(0, 10);
  }, [moviesSeen]);

  const lastTenMoviesAdded = useMemo(() => {
    return watchListMovies
      .filter((m) => m.timeAdded)
      .sort((a, b) => (a.timeAdded ?? 0) - (b.timeAdded ?? 0))
      .reverse()
      .slice(0, 10);
  }, [watchListMovies]);

  const amountOfMoviesInTop1000 = useMemo(() => {
    return moviesSeen.filter(
      (m) => m.ranking?.ranking && m.ranking?.ranking <= 10000
    ).length;
  }, [moviesSeen]);

  const tspdtWatchedPercent = useMemo(() => {
    return (amountOfMoviesInTop1000 / 1000) * 100;
  }, [amountOfMoviesInTop1000]);

  console.log({ userMovies });

  return (
    <div className="flex flex-col min-h-screen py-2">
      <h1 className="text-2xl font-bold">Hey, (USER)</h1>
      <span>
        You've watched {tspdtWatchedPercent}% percent of the TSPDT Top 1000
        movies.
      </span>
      <div className="flex flex-col gap-4 pt-8">
        <Card className="items-start p-8 gap-5">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <span className="text-lg leading-tight text-white tracking-tight font-semibold">
                Seen
              </span>
              <span className="text-sm font-normal leading-tight text-zinc-400">
                You've watched{" "}
                {userMovies?.filter((m) => m.timeSeen).length ?? 0} movies
              </span>
            </div>
            <div>
              <Button squishy={true} variant="ghost">
                View All <ArrowRight className="ml-1.5" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            {lastTenMoviesSeen.map((userMovie) => (
              <div key={userMovie.id} className="rounded ring-1 ring-white/5">
                <Image
                  src={`https://image.tmdb.org/t/p/w342${userMovie.movie?.posterPath}`}
                  alt=""
                  className="rounded-[inherit]"
                  width={150}
                  height={225}
                />
                {/* <div>{userMovie.movie?.title}</div> */}
              </div>
            ))}
          </div>
        </Card>
        <span>
          You have {watchListMovies.length ?? 0} movies on your watch list
        </span>
        <Card>
          {lastTenMoviesAdded.map((userMovie) => (
            <Link
              href={`/movie/${userMovie.movie?.id}`}
              key={userMovie.movie?.id}
            >
              <div>{userMovie.movie?.title}</div>
            </Link>
          ))}
        </Card>
      </div>
    </div>
  );
}
