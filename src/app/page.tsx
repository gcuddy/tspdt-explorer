import { db } from "@/db/client";
import { asc, eq, sql } from "drizzle-orm";
import { rankings, movies, directors, moviesToDirectors } from "@/db/schema";
import { cache } from "react";
import { List } from "./list-items";

export const getData = cache(async () => {
  const directors_sq = db.select().from(moviesToDirectors);

  const m = await db
    .select({
      id: movies.id,
      title: movies.title,
      year: movies.year,
      tmdbId: movies.tmdbId,
      tspdtId: movies.tspdtId,
      ranking: rankings.ranking,
      _director: sql<string>`json_group_array(json_object('id', directors.id, 'name', directors.name))`, // Group directors into a JSON array
      // director: sql`GROUP_CONCAT(directors.name, ", ")')`, // Concatenate director names
      // directorId: sql`GROUP_CONCAT(directors.id, ", ")')`, // Concatenate director ids
    })
    .from(movies)
    .innerJoin(rankings, eq(movies.id, rankings.movieId))
    .leftJoin(moviesToDirectors, eq(movies.id, moviesToDirectors.movieId))
    .leftJoin(directors, eq(moviesToDirectors.directorId, directors.id))
    .where(eq(rankings.year, 2023))
    .orderBy(asc(rankings.ranking))
    .groupBy(movies.id) // You need to uncomment this line when using aggregate functions like GROUP_CONCAT
    .limit(1000);

  return m.map(({ _director, ...movie }) => ({
    ...movie,
    director: JSON.parse(_director) as { id: string; name: string }[],
  }));
});

// export const runtime = "edge";

export default async function Home() {
  const movies = await getData();

  return (
    <div className="flex flex-col">
      <List movies={movies} />
    </div>
  );
}
