import Link from "next/link";
import { getData } from "@/app/(default)/page";
import { MovieListItem } from "./movie";
import { Instrument_Serif } from "next/font/google";

const instrument = Instrument_Serif({
  weight: "400",
  fallback: ["Georgia"],
  subsets: ["latin"],
});

type Movie = Awaited<ReturnType<typeof getData>>[0];

export default function ListItem({ movie }: { movie: Movie }) {
  return (
    <li className="flex items-center gap-1 relative">
      <span className="text-gray-500 text-sm absolute tabular-nums -left-2 -translate-x-full">
        {movie.ranking}
      </span>
      <MovieListItem
        movie={movie}
        director={movie.director}
        posterSrc={
          movie.posterPath
            ? `https://image.tmdb.org/t/p/w154${movie.posterPath}`
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
