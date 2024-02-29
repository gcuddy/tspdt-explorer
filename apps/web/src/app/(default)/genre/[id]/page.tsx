import { List } from "@/app/list-items";
import { tmdbGenres } from "@/data/tmdb-data";
import { client } from "@/lib/hono";

async function getMoviesForGenre(genre: string) {
    return client.movies.genre[":genre"].$get({
        param: {
            genre,
        },
    }).then((res) => res.json());
}

export default async function Page({
    params: { id },
}: {
    params: { id: string };
}) {
    const movies = await getMoviesForGenre(id);
    console.log("got movies", movies);
    const genre = tmdbGenres[id as unknown as keyof typeof tmdbGenres];
    return (
        <div>
            <h1>{genre}</h1>
            <List movies={movies} />
        </div>
    );
}
