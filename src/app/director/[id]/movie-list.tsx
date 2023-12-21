import { Movie, Ranking } from "@/db/schema";
import Link from "next/link";

export function MovieList({
  list,
}: {
  list: Array<Movie & { rankings: Ranking[] }>;
}) {
  return (
    <ul>
      {list.map((movie) => (
        <li className="text-sm" key={movie.id}>
          <span className="tabular-nums">{movie.year}</span>
          {" - "}
          {(movie.rankings.at(-1)?.ranking ?? 99999) <= 1000
            ? "★ "
            : (movie.rankings.at(-1)?.ranking ?? 99999) <= 2500
            ? "● "
            : ""}
          <Link href={`/movie/${movie.id}`}>{movie.title}</Link> (
          {movie.rankings.at(-1)?.ranking})
        </li>
      ))}
    </ul>
  );
}
