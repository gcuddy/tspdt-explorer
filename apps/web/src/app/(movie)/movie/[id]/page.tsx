import { notFound } from "next/navigation";
import { cache } from "react";
import { Movie } from "./movie";
import { client } from "@/lib/hono";
import { Metadata } from "next";
import { ActionBar } from "./action-bar";

const getMovie = cache(async (id: string) => {
    console.time("getMovie");
    console.time("getMovie:db");
    const res = await client.movie[":id"].$get({ param: { id } });

    console.log("movie", res);

    const movie = await res.json().catch(() => {
        return notFound();
    });
    console.timeEnd("getMovie:db");

    if (!movie) {
        notFound();
    }

    console.time("getMovie:tmdb");

    // const tmovie = await tmdb.getMovie(movie);
    //
    // //   save tmdbId
    // if (tmovie?.id && movie.tmdbId !== tmovie.id) {
    //     // await db.update(movies).set({
    //     //   tmdbId: tmovie.id,
    //     // });
    // }

    console.timeEnd("getMovie:tmdb");

    console.timeEnd("getMovie");

    return movie;

    // return {
    //     ...movie,
    //     tmdb: tmovie,
    // };
});
export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const movie = await getMovie(params.id);
    return {
        title: `${movie.title} (${movie.year}) - TSPDT`,
    };
}

export default async function MoviePage(
    props: {
        params: Promise<{ id: string }>;
    }
) {
    const params = await props.params;
    const movie = await getMovie(params.id);
    return <Movie movie={movie} actionSlot={
        <ActionBar movie={movie} />}
    />;
}
