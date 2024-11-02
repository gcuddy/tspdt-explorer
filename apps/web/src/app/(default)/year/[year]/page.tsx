"use server";

import { PeopleList } from "@/components/people-list";
import { Stack } from "@/components/ui/layout";
import { Tag } from "@/components/ui/tag";
import { getMoviesFromYear } from "@/server/data-layer";
import Link from "next/link";
import { notFound } from "next/navigation";


export default async function Page(props: { params: Promise<{ year: string }> }) {
    const params = await props.params;
    const year = Number(params.year);
    if (Number.isNaN(year)) {
        notFound();
    }

    const movies = await getMoviesFromYear(year);

    console.dir(movies, { depth: null });
    return (
        <Stack className="gap-4">
            <h1 className="text-2xl leading-none text-white">Movies from {year}</h1>
            <ul className="flex flex-col gap-1">
                {movies.map((movie) => (
                    <li key={movie.id} className="">
                        <Tag className="mr-2 tabular-nums">{movie.rankings[0].ranking}</Tag>
                        <Link className="font-medium text-lg" href={`/movie/${movie.id}`}>
                            {movie.title}
                        </Link>{" "}
                        <span className="italic">
                            (
                            <PeopleList
                                people={movie.moviesToDirectors.map((md) => md.director).filter(Boolean)}
                                prefix=""
                            />
                            )
                        </span>
                    </li>
                ))}
            </ul>
        </Stack>
    );
}
