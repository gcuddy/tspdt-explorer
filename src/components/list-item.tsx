import Link from "next/link";
import { Suspense } from "react";
import { FancyMovieListItem } from "./tmovie";
import { getData } from "@/app/page";

type Movie = Awaited<ReturnType<typeof getData>>[0];

export default function ListItem({ movie }: { movie: Movie }) {
  return (
    <li className="flex items-center gap-1">
      <span className="text-gray-500 text-sm">{movie.ranking}</span>
      <Suspense>
        <FancyMovieListItem movie={movie} />
      </Suspense>
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
