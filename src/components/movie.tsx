import { Directors } from "@/app/movie/[id]/movie-header";
import { Director, Movie } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

export const MovieListItem = ({
  movie,
  posterSrc,
  director,
}: {
  movie: Pick<Movie, "id" | "title" | "year">;
  director?: Array<Pick<Director, "id" | "name">>;
  posterSrc?: string;
}) => {
  return (
    <div className="flex gap-4">
      <MoviePoster src={posterSrc} />
      <div className="flex flex-col">
        <div className="flex">
          <div className="text-xl">{movie.title}</div>
          <div className="text-lg">{movie.year}</div>
        </div>
        {!!director && (
          <div className="flex truncate flex-1">
            <Directors directors={director} />
          </div>
        )}
      </div>
    </div>
  );
};

export const MoviePoster = ({ src }: { src?: string }) => {
  return (
    <div className="w-[70px] h-[105px] rounded ring-1 ring-zinc-400">
      {src ? (
        <Image src={src} width={70} height={105} className="" alt="" />
      ) : (
        <div className="bg-zinc-400 w-full h-full">no poster</div>
      )}
    </div>
  );
};
