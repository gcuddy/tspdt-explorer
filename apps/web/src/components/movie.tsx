"use client";
import { Directors } from "@/app/(movie)/movie/[id]/movie-header";
import { Director, Movie } from "@/core/movie/movie.sql";
import Image from "next/image";
import Link from "next/link";

import { Instrument_Serif } from "next/font/google";
import { Button } from "./ui/button";

const instrument = Instrument_Serif({
    weight: "400",
    fallback: ["Georgia"],
    subsets: ["latin"],
});

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
            <div className="flex flex-col group">
                <div className="leading-tight">
                    <Link
                        href={`/movie/${movie.id}`}
                        className={`${instrument.className} text-3xl drop-shadow-md leading-tight mr-1.5`}
                    >
                        {movie.title}
                    </Link>
                    <span className="text-base font-light text-zinc-400">
                        {movie.year}
                    </span>
                </div>
                {!!director && (
                    <div className="flex truncate flex-1">
                        <Directors directors={director} />
                    </div>
                )}
                <div className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition">
                    <Button>Add</Button>
                </div>
            </div>
        </div>
    );
};

export const MoviePoster = ({ src }: { src?: string }) => {
    return (
        <div className="w-[70px] h-[105px] shrink-0 rounded ring-1 ring-white/5 transition">
            {src ? (
                <Image
                    src={src}
                    width={70}
                    height={105}
                    className="rounded-[inherit]"
                    alt=""
                />
            ) : (
                <div className="bg-zinc-400 w-full h-full">no poster</div>
            )}
        </div>
    );
};
