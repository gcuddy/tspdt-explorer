import { List } from "@/app/list-items";
import { client } from "@/lib/hono";


async function getCountry(country: string) {
    return client.movies.country[":country"].$get({
        param: {
            country,
        },
    }).then(res => res.json());
}

export default async function Page({ params }: { params: { code: string } }) {

    const movies = await getCountry(params.code);
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl leading-none text-white">Movies from {params.code}</h1>
            <List movies={movies} />
        </div>
    )
}
