import { db } from "@/db/client";
import { Ranking, movies, rankings } from "@/db/schema";
import { tmdb } from "@/lib/tmdb";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { RankingChart } from "./ranking-chart";
import { Card } from "@/components/ui/card";
import { MovieHeader } from "./movie-header";
import { Stack } from "@/components/ui/layout";
import { cache } from "react";
import { Movie } from "./movie";

export const getMovie = cache(async (id: string) => {
  const movie = await db.query.movies.findFirst({
    where: eq(movies.id, id),
    with: {
      moviesToDirectors: {
        with: {
          director: true,
        },
      },
      rankings: true,
    },
  });

  if (!movie) {
    notFound();
  }

  const tmovie = await tmdb.search
    .movies({
      query: movie.title,
      year: movie.year ?? undefined,
    })
    .then((res) => {
      // get the result with matching title + year, or the first result
      return (
        res.results.find(
          (r) =>
            r.title === movie.title &&
            (!movie.year || r.release_date?.startsWith(movie.year.toString()))
        ) ?? res.results[0]
      );
    });

  return {
    ...movie,
    tmdb: tmovie,
  };
});

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);
  return <Movie movie={movie} />;
}
