import { Director } from "@/core/movie/movie.sql";
import { getMovie } from "./page";

import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Dot, Star } from "@phosphor-icons/react";
import { Tag } from "@/components/ui/tag";
type Movie = Awaited<ReturnType<typeof getMovie>>;

type Props = {
  movie: Movie;
};

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"] });

export function MovieHeader({ movie }: Props) {
  const ranking = movie.rankings.at(-1)?.ranking;

  console.log({ movie });
  return (
    <div className="grid grid-cols-12 w-full gap-4">
      {!!movie.tmdb && (
        <div className="col-span-12 flex justify-center">
          <Image
            width={1024}
            height={1024 * (9 / 16)}
            className="aspect-video"
            alt=""
            // or w1280 or original
            src={`https://image.tmdb.org/t/p/original${movie.tmdb?.backdrop_path}`}
          />
        </div>
      )}
      <div className="col-span-12 grid grid-cols-12 gap-2">
        {/* <div className="col-span-3  ">
          <img
            alt=""
            className="self-end place-self-end ml-auto w-36"
            src={`https://image.tmdb.org/t/p/w500${movie.tmdb?.poster_path}`}
          />
        </div> */}
        <div className="col-span-6 col-start-4 relative text-center gap-2 flex flex-col items-center justify-center">
          <h1 className={`text-6xl text-balance ${serif.className}`}>
            {movie.title}
          </h1>
        </div>
        <div className="col-span-6 col-start-4 gap-2 relative text-sm text-center flex flex-col items-center justify-center">
          {movie.tmdbData?.original_title !== movie.title && (
            <h2 className="text-xl text-balance">
              {movie.tmdbData?.original_title}
            </h2>
          )}
          <div className="flex gap-2 flex-col text-zinc-400 items-center">
            <div className="flex gap-2 items-center">
              <span>
                {movie.tmdb?.production_countries.map((c, i) => {
                  return (
                    <span className="" key={c.iso_3166_1}>
                      <Link href={`/country/${c.iso_3166_1}`}>
                        {c.name === "United States of America"
                          ? "United States"
                          : c.name}
                        {(movie.tmdb?.production_countries?.length ?? 0) > 1 &&
                        i !==
                          (movie.tmdb?.production_countries?.length ?? 0) - 1
                          ? ", "
                          : ", "}
                      </Link>
                    </span>
                  );
                })}
                <Link href={`/year/${movie.year}`}>{movie.year}</Link>
              </span>
              <span>·</span>
              <p className="text-zinc-400">
                <Directors
                  directors={movie.moviesToDirectors.map(
                    ({ director }) => director
                  )}
                />
              </p>
            </div>
            {/* <span>·</span> */}
            <div className="flex gap-2 items-center">
              <span className="text-zinc-400">{movie.tmdb?.runtime} min</span>
              <span>·</span>
              <div>
                {movie.tmdb?.genres.map((g, i) => {
                  return (
                    <span className="text-sm text-zinc-400" key={g.id}>
                      <Link href={`/genre/${g.id}`}>
                        {g.name}
                        {(movie.tmdb?.genres?.length ?? 0) > 1 &&
                        i !== (movie.tmdb?.genres?.length ?? 0) - 1
                          ? ", "
                          : ""}
                      </Link>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <span className="flex gap-2">
            {ranking && ranking <= 2500 && (
              <>
                <Tag className={ranking <= 1000 ? "" : undefined}>
                  {/* <Star className="text-zinc-600 fill-zinc-600" /> */}
                  {ranking <= 1000 ? (
                    <span className="mr-1">★ </span>
                  ) : (
                    // <svg
                    //   xmlns="http://www.w3.org/2000/svg"
                    //   viewBox="0 0 20 20"
                    //   fill="currentColor"
                    //   className="w-4 h-4 text-zinc-400 relative -top-px"
                    // >
                    //   <path
                    //     fillRule="evenodd"
                    //     d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                    //     clipRule="evenodd"
                    //   />
                    // </svg>
                    <span className="mr-1">● </span>
                    // <Dot className="w-4 h-4 text-zinc-400 relative -top-px" />
                  )}{" "}
                  <span> {ranking}</span>
                </Tag>
                {/* <span className="text-zinc-400">·</span> */}
              </>
            )}
            {/* TODO: move genres, runtime etc into their own details box */}
            {/* <div>
              {movie.tmdb?.genres.map((g, i) => {
                return (
                  <span className="text-sm text-zinc-400" key={g.id}>
                    <Link href={`/genre/${g.id}`}>
                      {g.name}
                      {(movie.tmdb?.genres?.length ?? 0) > 1 &&
                      i !== (movie.tmdb?.genres?.length ?? 0) - 1
                        ? ", "
                        : ""}
                    </Link>
                  </span>
                );
              })}
            </div> */}
          </span>
        </div>
      </div>
    </div>
  );
}

function DirectorLink({
  director,
}: {
  director: Pick<Director, "id" | "name">;
}) {
  return (
    <Link href={`/director/${director.id}`} className="text-zinc-300">
      {director.name}
    </Link>
  );
}

export function Directors({
  directors,
}: {
  directors: Array<Pick<Director, "id" | "name">>;
}) {
  if (directors.length === 1) {
    return (
      <span>
        Directed by <DirectorLink director={directors[0]} />
      </span>
    );
  }

  return (
    <span>
      Directed by{" "}
      {directors.map((director, index) => {
        if (index === directors.length - 1) {
          return (
            <span key={director.id}>
              and <DirectorLink director={director} />
            </span>
          );
        }

        return (
          <>
            <DirectorLink key={director.id} director={director} />
            {", "}
          </>
        );
      })}
    </span>
  );
}