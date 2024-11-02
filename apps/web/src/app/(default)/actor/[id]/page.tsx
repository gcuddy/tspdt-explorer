import { DefaultTableView } from "@/components/table";
import { tmdb } from "@/lib/tmdb";
import { client } from "@/lib/hono";
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

    for (const movie of p.movie_credits.cast) {
        const tmdbMovie = tmdbMovies.find((m) => m.tmdbId === movie.id);

        // TODO: decided to not push movies that aren't featured in the 24k films.
        // We could change this later, but this is how we do it with directors as well.
        // Maybe should look at later, we probably don't need to do the tmdb fetch then).
        // (Though I do think displaying all the movies is probably a good idea... though tmdb doesn't provide the runtime!)
        if (!tmdbMovie) {
            continue;
        }
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

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { person, movies } = await getData(parseInt(params.id));

    //   TODO: use memo to go through and get rankings

    return (
        <div className="flex flex-col gap-4">
            <Person person={person} />
            <DefaultTableView movies={movies} heading={<span>
                Films in the TSPDT starting list of 24,000 films that have {person.name} in them
            </span>} />
        </div>
    );
}
