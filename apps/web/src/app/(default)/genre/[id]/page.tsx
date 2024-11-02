import { List } from "@/app/list-items";
import { client } from "@/lib/hono";

async function getMoviesForGenre(genre: string) {
    return client.movies.genre[":genre"].$get({
        param: {
            genre,
        },
    }).then((res) => res.json());
}

export default async function Page(
    props: {
        params: Promise<{ id: string }>;
    }
) {
    const params = await props.params;

    const {
        id
    } = params;

    const movies = await getMoviesForGenre(id);
    console.log("got movies", movies);
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl leading-none text-white">{decodeURIComponent(id)} Movies</h1>
            <List movies={movies} />
        </div>
    );
}
