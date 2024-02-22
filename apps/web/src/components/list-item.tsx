import Link from "next/link";
import { getData } from "@/app/(default)/page";
import { MovieListItem } from "./movie";
import { Instrument_Serif } from "next/font/google";
import { Movie, Director } from "tspdt-api/src/db/schema";

const instrument = Instrument_Serif({
  weight: "400",
  fallback: ["Georgia"],
  subsets: ["latin"],
});

export default function ListItem({
  movie,
}: {
  movie: Movie & {
    moviesToDirectors: {
      director: Director;
    }[];
  };
}) {
  return (
    <li className="flex items-center gap-1 relative">
      <span className="text-gray-500 text-sm absolute tabular-nums -left-2 -translate-x-full">
        {movie.currentRanking}
      </span>
      {/* {JSON.stringify(movie.moviesToDirectors)} */}

      {movie.moviesToDirectors.map(({ director }) => {
        return (
          <Link href={`/director/${director.id}`} key={director.id}>
            <span>{director.name}</span>
          </Link>
        );
      })}
      <MovieListItem
        movie={movie}
        director={movie.director}
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
