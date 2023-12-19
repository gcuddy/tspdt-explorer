import { Movie, Ranking } from "@/db/schema";

export function MovieList({
  list,
}: {
  list: Array<Movie & { rankings: Ranking[] }>;
}) {
  return (
    <ul>
      {list.map((movie) => (
        <li className="text-sm" key={movie.id}>
          {movie.year}
          {" - "}
          {(movie.rankings[0].ranking ?? 99999) <= 1000
            ? "★ "
            : (movie.rankings[0].ranking ?? 99999) <= 2500
              ? "● "
              : ""}
          {movie.title} ({movie.rankings[0].ranking})
        </li>
      ))}
    </ul>
  );
}
