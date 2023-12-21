import { Director } from "@/db/schema";
import { getMovie } from "./page";

import { Instrument_Serif } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
type Movie = Awaited<ReturnType<typeof getMovie>>;

type Props = {
  movie: Movie;
};

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"] });

export function MovieHeader({ movie }: Props) {
  return (
    <div className="grid grid-cols-12 w-full gap-4">
      {!!movie.tmdb && (
        <div className="col-span-12 flex justify-center">
          <Image
            width={500}
            height={500 * (9 / 16)}
            alt=""
            src={`https://image.tmdb.org/t/p/w500${movie.tmdb?.backdrop_path}`}
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
        <div className="col-span-6 col-start-4 gap-2 relative text-center flex flex-col items-center justify-center">
          <h1 className={`text-6xl text-balance ${serif.className}`}>
            {movie.title}
          </h1>
          <div className="flex gap-2 text-zinc-400">
            <Link href={`/year/${movie.year}`}>{movie.year}</Link>
            <span>·</span>
            <p className="text-zinc-400">
              <Directors
                directors={movie.moviesToDirectors.map(
                  ({ director }) => director
                )}
              />
            </p>
          </div>
          {/* backdrop */}
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
