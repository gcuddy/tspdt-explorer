import Link from "next/link";
import { getData } from "@/app/page";
import { MovieListItem } from "./movie";

type Movie = Awaited<ReturnType<typeof getData>>[0];

export default function ListItem({ movie }: { movie: Movie }) {
  return (
    <li className="flex items-center gap-1">
      <span className="text-gray-500 text-sm">{movie.ranking}</span>
      <MovieListItem
        movie={movie}
        director={movie.director}
        posterSrc={
          movie.posterPath
            ? `https://image.tmdb.org/t/p/w154${movie.posterPath}`
            : undefined
        }
      />
      <span className="font-bold tracking-tight text-xl truncate">
        {movie.title}
      </span>
      <span>{movie.year}</span>
      <div className="flex truncate flex-1">
        {movie.director.map((director) => (
          <Link href={`/director/${director.id}`} key={director.id}>
            <span>{director.name}</span>
          </Link>
        ))}
      </div>
    </li>
  );
}
