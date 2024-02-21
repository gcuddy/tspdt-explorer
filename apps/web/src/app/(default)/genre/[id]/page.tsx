import { List } from "@/app/list-items";
import { movies } from "@/core/movie/movie.sql";
import { tmdbGenres } from "@/data/tmdb-data";
import { db } from "@/db/client";
import { asc, sql } from "drizzle-orm";

export async function getMoviesforGenre(id: string | number) {
  // TODO: this obviously has awful performance, so could be improved a lot!
  const m = db.all(
    sql`select movies.title, movies.id, movies.year, movies.tspdt_id, movies.tmdb_id, movies.poster_path as posterPath, json_group_array(json_object('id', d.id, 'name', d.name)) as _director, r.ranking as ranking from movies join movies_to_directors md on md.movie_id = movies.id inner join directors d on d.id = md.director_id join rankings r on r.movie_id = movies.id join json_each(json_extract(movies.tmdb_data, '$.genres')) where json_each.value like '%"id"%:${sql.raw(
      id.toString()
    )},%' and r."year" = 2023 group by movies.id order by ranking;`
  );
  return m.map(({ _director, ...rest }: { _director: string }) => {
    return {
      ...rest,
      director: JSON.parse(_director) as { id: string; name: string }[],
    };
  }) as {
    title: string;
    id: string;
    year: number;
    posterPath: string;
    director: { id: string; name: string }[];
    ranking: number;
    tspdtId: number;
    tmdbId: number | null;
  }[];
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const movies = await getMoviesforGenre(id);
  const genre = tmdbGenres[id as unknown as keyof typeof tmdbGenres];
  return (
    <div>
      <h1>{genre}</h1>
      <List movies={movies} />
      {/* {movies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))} */}
    </div>
  );
}
