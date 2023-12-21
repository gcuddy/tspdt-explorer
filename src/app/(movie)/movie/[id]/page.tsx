import { db } from "@/db/client";
import { Ranking, movies, rankings } from "@/core/movie/movie.sql";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { RankingChart } from "./ranking-chart";
import { Card } from "@/components/ui/card";
import { MovieHeader } from "./movie-header";
import { Stack } from "@/components/ui/layout";
import { cache } from "react";
import { Movie } from "./movie";
import * as tmdb from "@/app/api/tmdb";

export const getMovie = cache(async (id: string) => {
  const movie = await db.query.movies.findFirst({
    where: eq(movies.id, id),
    with: {
      moviesToDirectors: {
        with: {
          director: true,
        },
      },
      rankings: {
        orderBy: asc(rankings.year),
      },
    },
  });

  if (!movie) {
    notFound();
  }

  const tmovie = await tmdb.getMovie(movie);

  //   save tmdbId
  if (tmovie?.id && movie.tmdbId !== tmovie.id) {
    await db.update(movies).set({
      tmdbId: tmovie.id,
    });
  }

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
