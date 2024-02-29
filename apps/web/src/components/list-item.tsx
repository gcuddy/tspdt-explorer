import { MovieListItem } from "./movie";
import { Movie, Director } from "tspdt-api/src/db/schema";

export default function ListItem({
    movie,
}: {
    movie: Movie & {
        moviesToDirectors?: {
            director?: Director | null;
        }[];
    };
}) {
    console.log("movie", movie);
    return (
        <li className="flex items-center gap-1 relative">
            <span className="text-gray-500 text-sm absolute tabular-nums -left-2 -translate-x-full">
                {movie.currentRanking}
            </span>
            <MovieListItem
                movie={movie}
                director={
                    (movie.moviesToDirectors ?? []).map((mtd) => mtd.director)
                        .filter(Boolean) as Director[]
                }
                posterSrc={
                    movie.tmdbPosterPath
                        ? `https://image.tmdb.org/t/p/w154${movie.tmdbPosterPath}`
                        : undefined
                }
            />
            {/* <span
        className={`font-bold tracking-tight text-xl truncate ${instrument.className}`}
      >
        {movie.title}
      </span>
      <span>{movie.year}</span>
      <div className="flex truncate flex-1">
        {movie.director.map((director) => (
          <Link href={`/director/${director.id}`} key={director.id}>
            <span>{director.name}</span>
          </Link>
        ))}
      </div> */}
        </li>
    );
}
