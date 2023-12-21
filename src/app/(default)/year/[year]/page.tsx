"use server";

import { Stack } from "@/components/ui/layout";
import { Tag } from "@/components/ui/tag";
import { PeopleList } from "@/components/utility";
import { db } from "@/db/client";
import { movies, rankings } from "@/core/movie/movie.sql";
import { and, asc, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

const getMoviesFromYear = cache(async (year: number) => {
  const moviesForYear = await db.query.movies.findMany({
    where: and(eq(movies.year, year)),
    with: {
      moviesToDirectors: {
        with: { director: true },
      },
      rankings: {
        orderBy: desc(rankings.year),
        limit: 1,
      },
    },
  });

  return moviesForYear.sort((a, b) => {
    const aRanking = a.rankings[0].ranking;
    const bRanking = b.rankings[0].ranking;

    if (!aRanking) {
      return 1;
    }

    if (!bRanking) {
      return -1;
    }

    if (aRanking < bRanking) {
      return -1;
    }

    if (aRanking > bRanking) {
      return 1;
    }

    return 0;
  });
});

export default async function Page({ params }: { params: { year: string } }) {
  const year = Number(params.year);
  if (Number.isNaN(year)) {
    notFound();
  }

  const movies = await getMoviesFromYear(year);

  console.dir({ movies }, { depth: null });

  return (
    <Stack className="gap-4">
      <h2 className="text-5xl font-bold tracking-tighter">{year}</h2>
      <ul className="flex flex-col gap-1">
        {movies.map((movie) => (
          <li key={movie.id} className="">
            <Tag className="mr-2 tabular-nums">{movie.rankings[0].ranking}</Tag>
            <Link className="font-medium text-lg" href={`/movie/${movie.id}`}>
              {movie.title}
            </Link>{" "}
            <span className="italic">
              (
              <PeopleList
                items={movie.moviesToDirectors.map((md) => md.director)}
                prefix=""
                render={(director) => (
                  <Link href={`/director/${director.id}`}>{director.name}</Link>
                )}
              />
              )
            </span>
          </li>
        ))}
      </ul>
    </Stack>
  );
}
