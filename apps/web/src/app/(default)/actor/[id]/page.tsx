import { DefaultTableView } from "@/components/table";
import { SimplifiedMovie } from "@/core/movie/movie.sql";
import { movies } from "@/db/schema";
import { tmdb } from "@/lib/tmdb";
import { client } from "@/lib/hono";
import type { Movie } from "tspdt-api/src/db/schema"
import { Person } from "@/components/person";

async function getData(id: number) {
    const p = await tmdb.people.details(id, ["movie_credits"]);
    const res = await client.movies[':ids'].$get({ param: { ids: p.movie_credits.cast.map((m) => m.id).join(',') } });

    const tmdbMovies = await res.json();
    const computedMovies: Array<
        {
            id: string;
            title: string;
            year: number;
            tmdbId: number;
            tspdtId: string | null;
            posterPath: string | null;
            runtime: number | null;
            currentRanking: number | null;
            director?: Array<{ id: number; name: string }>;
        }
    > = [];

    console.log({credits: p.movie_credits.cast})

    for (const movie of p.movie_credits.cast) {
        const tmdbMovie = tmdbMovies.find((m) => m.tmdbId === movie.id);

        computedMovies.push({
            id: tmdbMovie?.id.toString() ?? movie.id.toString(),
            title: movie.title,
            year:
                tmdbMovie?.year ??
                (movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : 0),
            tmdbId: movie.id,
            tspdtId: tmdbMovie?.id ?? null,
            posterPath: movie.poster_path,
            runtime: tmdbMovie?.runtime ?? ((movie as any).runtime as number) ?? null,
            currentRanking: tmdbMovie?.currentRanking ?? null,
        });
    }

    return {
        person: p,
        movies: computedMovies,
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const { person, movies } = await getData(parseInt(params.id));

    //   TODO: use memo to go through and get rankings

    return (
        <div className="flex flex-col">
            <Person person={person} />
            <DefaultTableView movies={movies} />
        </div>
    );
}
