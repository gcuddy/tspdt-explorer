import * as tmdb from "@/app/api/tmdb";
// import { movies, rankings } from "@/core/movie/movie.sql";
// import { db } from "@/db/client";
// import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Movie } from "./movie";
import { client } from "@/lib/hono";

export const getMovie = cache(async (id: string) => {
  console.time("getMovie");
  console.time("getMovie:db");
  const res = await client.movie[":id"].$get({ param: { id } });

  console.log("movie", res);

  const movie = await res.json().catch(() => {
    return notFound();
  });
  console.timeEnd("getMovie:db");

  if (!movie) {
    notFound();
  }

  console.time("getMovie:tmdb");

  const tmovie = await tmdb.getMovie(movie);

  //   save tmdbId
  if (tmovie?.id && movie.tmdbId !== tmovie.id) {
    // await db.update(movies).set({
    //   tmdbId: tmovie.id,
    // });
  }

  console.timeEnd("getMovie:tmdb");

  console.timeEnd("getMovie");

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
