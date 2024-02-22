// import { db } from "@/db/client";
// import { asc, eq, sql } from "drizzle-orm";
// import {
//   rankings,
//   movies,
//   directors,
//   moviesToDirectors,
// } from "@/core/movie/movie.sql";
// import { cache } from "react";
import { List } from "../list-items";
import { client } from "@/lib/hono";

// const prepared = db
//   .select({
//     id: movies.id,
//     title: movies.title,
//     year: movies.year,
//     tmdbId: movies.tmdbId,
//     tspdtId: movies.tspdtId,
//     ranking: rankings.ranking,
//     posterPath: movies.posterPath,
//     _director: sql<string>`json_group_array(json_object('id', directors.id, 'name', directors.name))`, // Group directors into a JSON array
//     // director: sql`GROUP_CONCAT(directors.name, ", ")')`, // Concatenate director names
//     // directorId: sql`GROUP_CONCAT(directors.id, ", ")')`, // Concatenate director ids
//   })
//   .from(movies)
//   .innerJoin(rankings, eq(movies.id, rankings.movieId))
//   .leftJoin(moviesToDirectors, eq(movies.id, moviesToDirectors.movieId))
//   .leftJoin(directors, eq(moviesToDirectors.directorId, directors.id))
//   .where(eq(rankings.year, 2023))
//   .orderBy(asc(rankings.ranking))
//   .groupBy(movies.id)
//   .limit(1000)
//   .prepare();

async function getData() {
  // todo: cache? or can get url and fetch
  console.time("getData");
  const res = await client.movies.list.$get();
  const movies = await res.json();
  console.timeEnd("getData");
  return movies;
}

// export const runtime = "edge";
// TODO: streaming or loading state

export default async function Home() {
  const movies = await getData();

  //   console.log("movies", movies);
  return (
    <div className="flex flex-col">
      <List movies={movies} />
    </div>
  );
}
