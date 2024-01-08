import { DefaultTableView } from "@/components/table";
import { SimplifiedMovie } from "@/core/movie/movie.sql";
import { db } from "@/db/client";
import { movies } from "@/db/schema";
import { tmdb } from "@/lib/tmdb";
import { asc, desc, inArray } from "drizzle-orm";

async function getData(id: number) {
  console.log({ id });
  const p = await tmdb.people.details(id, ["movie_credits"]);

  const tmdbMovies = await db.query.movies.findMany({
    where: inArray(
      movies.tmdbId,
      p.movie_credits.cast.map((movie) => movie.id)
    ),
    with: {
      rankings: {
        orderBy: desc(movies.year),
        limit: 1,
      },
    },
  });

  const computedMovies: Array<
    SimplifiedMovie & {
      ranking?: number;
      director?: Array<{ id: number; name: string }>;
    }
  > = [];

  for (const movie of p.movie_credits.cast) {
    const tmdbMovie = tmdbMovies.find((m) => m.tmdbId === movie.id);

    computedMovies.push({
      id: tmdbMovie?.id?.toString() ?? "",
      title: movie.title,
      year:
        tmdbMovie?.year ??
        (movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : null),
      tmdbId: movie.id,
      tspdtId: tmdbMovie?.tspdtId ?? null,
      posterPath: movie.poster_path,
      runtime: tmdbMovie?.runtime ?? ((movie as any).runtime as number) ?? null,
      ranking: tmdbMovie?.rankings[0].ranking ?? undefined,
    });
  }

  return {
    person: p,
    movies: computedMovies,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { person, movies } = await getData(parseInt(params.id));

  //   TODO: use memo to go through and get rankings

  return (
    <div className="flex flex-col">
      <DefaultTableView movies={movies} />
      {/* <DefaultTableView
        movies={person.movie_credits.cast.map((movie) => ({
          // id:
        }))}
      /> */}
      {/* <ul>
        {person.movie_credits.cast.map((movie) => (
          <li>
            {movie.title} ({movie.release_date}) - ranking:{" "}
            {movies.find((m) => m.tmdbId === movie.id)?.rankings[0].ranking}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
