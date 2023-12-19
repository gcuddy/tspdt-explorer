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
          <h1 className={`text-6xl ${serif.className}`}>{movie.title}</h1>
          <div className="flex gap-2 text-slate-400">
            <Link href={`/year/${movie.year}`}>{movie.year}</Link>
            <span>·</span>
            <p className="text-slate-400">
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

function DirectorLink({ director }: { director: Director }) {
  return (
    <Link href={`/director/${director.id}`} className="text-slate-300">
      {director.name}
    </Link>
  );
}

function Directors({ directors }: { directors: Array<Director> }) {
  if (directors.length === 1) {
    return (
      <p>
        Directed by <DirectorLink director={directors[0]} />
      </p>
    );
  }

  return (
    <p>
      Directed by{" "}
      {directors
        .map((director, index) => {
          if (index === directors.length - 1) {
            return (
              <span>
                and <DirectorLink director={director} />
              </span>
            );
          }

          return <DirectorLink director={director} />;
        })
        .join(", ")}
    </p>
  );
}
