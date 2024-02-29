"use server";

import { client } from "@/lib/hono";
import { MovieEmbedding } from "tspdt-api/src/schemas";
import { transformMovieIntoTextEmbedding } from "tspdt-api/src/utils";

export async function getRecommendations(movie: MovieEmbedding) {
    console.log("getting recommendations for movie", movie);
    const e = {
        overview: transformMovieIntoTextEmbedding(movie),
        id: movie.id,
    };
    console.log("using embedding input", e);
    const data = await client.recommendations
        .$get({
            query: {
                ...e,
            },
        })
        .then((res) => res.json());

    return data;
}

export async function searchDirector(query: string) {
    const data = await client.director.search.$get({
        query: {
            name: query,
        },
    })
        .then((res) => res.json());

    return data;
}

export async function getMoviesFromYear(year: number) {
    const data = await client.movies.year[":year"].$get({
        param: {
            year: year.toString(),
        },
    })
        .then((res) => res.json());

    return data;
}


export async function getMovies() {
    const res = await client.movies.list.$get();
    const movies = await res.json();
    return movies;
}
