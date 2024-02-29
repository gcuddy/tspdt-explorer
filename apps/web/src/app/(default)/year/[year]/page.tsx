"use server";

import { Stack } from "@/components/ui/layout";
import { Tag } from "@/components/ui/tag";
import { PeopleList } from "@/components/utility";
import { getMoviesFromYear } from "@/server/data-layer";
import Link from "next/link";
import { notFound } from "next/navigation";


export default async function Page({ params }: { params: { year: string } }) {
    const year = Number(params.year);
    if (Number.isNaN(year)) {
        notFound();
    }

    const movies = await getMoviesFromYear(year);

    return (
        <Stack className="gap-4">
            <h2 className="text-5xl font-bold tracking-tighter">{year}</h2>
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
                                items={movie.moviesToDirectors.map((md) => md.director).filter(Boolean)}
                                prefix=""
                                render={(director) => (
                                    <Link href={`/director/${director.id}`}>{director.name}</Link>
                                )}
                            />
                            )
                        </span>
                    </li>
                ))}
            </ul>
        </Stack>
    );
}
