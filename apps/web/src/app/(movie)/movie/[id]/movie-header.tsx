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
    productionCountries: {
        iso_3166_1: string;
        name: string;
    }[];
}) {
    return productionCountries.map((c, i) => {
        return (
            <span className="" key={c.iso_3166_1}>
                <Link href={`/country/${c.iso_3166_1}`}>
                    {c.name === "United States of America" ? "United States" : c.name}
                    {(productionCountries?.length ?? 0) > 1 &&
                        i !== (productionCountries?.length ?? 0) - 1
                        ? ", "
                        : ", "}
                </Link>
            </span>
        );
    });
    // <div className="flex gap-2 items-center">
    //   {productionCountries.map((c, i) => {
    //     return (
    //       <span className="text-sm text-zinc-400" key={c.id}>
    //         <Link href={`/company/${c.id}`}>{c.name}</Link>
    //         {i !== productionCountries.length - 1 && <Dot />}
    //       </span>
    //     );
    //   })}
    // </div>
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
    return (
        <div className="flex gap-2 flex-col text-zinc-400 items-center">
            <div className="flex gap-2 items-center">
                <span>
                    <ProductionCountries
                        productionCountries={movie.tmdb?.production_countries ?? []}
                    />
                    <Link href={`/year/${movie.year}`}>{movie.year}</Link>
                </span>
                <span>·</span>
                <p className="text-zinc-400">
                    <Directors
                        directors={movie.moviesToDirectors
                            .map(({ director }) => director)
                            .filter(Boolean)}
                    />
                </p>
            </div>
            <div className="flex gap-2 items-center">
                <span className="text-zinc-400">{movie.tmdb?.runtime} min</span>
                <span>·</span>
                <div>
                    <Genres genres={movie.genre ?? []} />
                </div>
            </div>
        </div>
    );
}

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
                <Title title={movie.title} />
                <div className="col-span-6 col-start-4 gap-2 relative text-sm text-center flex flex-col items-center justify-center">
                    {movie.tmdb?.original_title !== movie.title && (
                        <h2 className="text-xl text-balance">
                            {movie.tmdb?.original_title}
                        </h2>
                    )}
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
            <span className="truncate">
                Directed by <DirectorLink director={directors[0]} />
            </span>
        );
    }

    return (
        <span className="truncate">
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
