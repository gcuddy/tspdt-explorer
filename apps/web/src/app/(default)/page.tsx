import { getMovies } from "@/server/data-layer";
import { List } from "../list-items";

export default async function Home() {
    const movies = await getMovies();

    return <div className="flex flex-col">

        <List movies={movies} />
    </div>
}
