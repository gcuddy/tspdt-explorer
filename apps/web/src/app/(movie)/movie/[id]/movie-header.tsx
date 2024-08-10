import * as tmdb from "@/app/api/tmdb";
import { PeopleList } from "@/components/people-list";
import { Tag } from "@/components/ui/tag";
import { client } from "@/lib/hono";
import type { InferResponseType } from "hono/client";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const $get = client.movie[":id"].$get;
type Movie = InferResponseType<typeof $get>;

type Props = {
  movie: Movie;
};

async function getMovieData({ tmdbId }: { tmdbId: number }) {
  const tmovie = await tmdb.getMovie({ tmdbId });
  return tmovie;
}

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"] });

function Title({ title }: { title: string }) {
  return (
    <div className="col-span-6 col-start-4 relative text-center gap-2 flex flex-col items-center justify-center">
      <h1 className={`text-6xl text-balance ${serif.className}`}>{title}</h1>
    </div>
  );
}

function ProductionCountries({
  productionCountries,
}: {
  productionCountries: string[];
  //  productionCountries: {
  //      iso_3166_1: string;
  //      name: string;
  //  }[];
}) {
  return productionCountries.map((c, i) => {
    return (
      <span className="" key={i}>
        <Link href={`/country/${c}`}>
          {c}
          {(productionCountries?.length ?? 0) > 1 &&
          i !== (productionCountries?.length ?? 0) - 1
            ? ", "
            : ", "}
        </Link>
      </span>
    );
  });
}

function Genres({ genres }: { genres: string[] }) {
  return genres.map((g, i) => {
    return (
      <span className="text-sm text-zinc-400" key={g}>
        <Link href={`/genre/${g}`}>
          {g}
          {(genres?.length ?? 0) > 1 && i !== (genres?.length ?? 0) - 1
            ? ", "
            : ""}
        </Link>
      </span>
    );
  });
}

// million-ignore
function MovieHeaderDetails({ movie }: { movie: Movie }) {
  if (!movie) return null;

  return (
    <div className="flex gap-2 flex-col text-zinc-400 items-center ">
      <div className="flex gap-2 items-center flex-wrap justify-center">
        <span>
          <ProductionCountries productionCountries={movie.country ?? []} />
          <Link href={`/year/${movie.year}`}>{movie.year}</Link>
        </span>
        <span>·</span>
        <p className="text-zinc-400">
          <PeopleList
            people={movie.moviesToDirectors
              .map(({ director }) => director)
              .filter(Boolean)}
            prefix="Directed by"
          />
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-zinc-400">{movie.runtime} min</span>
        <span>·</span>
        <div>
          <Genres genres={movie.genre ?? []} />
        </div>
        <span>·</span>
        <div>
          {movie.color === "col"
            ? "Color"
            : movie.color === "col-bw"
              ? "Color and Black & White"
              : "Black & White"}
        </div>
      </div>
    </div>
  );
}

export function MovieHeader({ movie }: Props) {
  if (!movie) return null;

  const { currentRanking: ranking } = movie;

  return (
    <div className="grid grid-cols-12 w-full gap-4">
      <div className="col-span-12 flex justify-center relative">
        <Image
          width={1024}
          height={1024 * (9 / 16)}
          className="aspect-video z-0 absolute blur-3xl scale-x-75"
          alt=""
          // or w1280 or original
          src={`https://image.tmdb.org/t/p/original${movie.tmdbBackdropPath}`}
        />
        <Image
          width={1024}
          height={1024 * (9 / 16)}
          className="aspect-video z-10"
          alt=""
          // or w1280 or original
          src={`https://image.tmdb.org/t/p/original${movie.tmdbBackdropPath}`}
        />
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-2">
        <Title title={movie.title} />
        <div className="col-span-6 col-start-4 gap-2 relative text-sm text-center flex flex-col items-center justify-center">
          <Suspense>
            {movie.tmdbId && (
              <OriginalTitle title={movie.title} tmdbId={movie.tmdbId} />
            )}
          </Suspense>
          <MovieHeaderDetails movie={movie} />
          <span className="flex gap-2">
            {ranking && ranking <= 2500 && (
              <>
                <Tag className={ranking <= 1000 ? "" : undefined}>
                  {ranking <= 1000 ? (
                    <span className="mr-1">★ </span>
                  ) : (
                    <span className="mr-1">● </span>
                  )}{" "}
                  <span> {ranking}</span>
                </Tag>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

async function OriginalTitle({
  title,
  tmdbId,
}: {
  title: string;
  tmdbId: number;
}) {
  const movie = await getMovieData({ tmdbId });

  return (
    movie?.original_title !== title && (
      <h2 className="text-xl text-balance">{movie?.original_title}</h2>
    )
  );
}
