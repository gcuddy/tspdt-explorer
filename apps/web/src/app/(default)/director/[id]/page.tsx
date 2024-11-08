import { tmdb } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import { Person } from "@/components/person";
import { Suspense, cache } from "react";
import { RankingChart } from "@/app/(movie)/movie/[id]/ranking-chart";
import { Card } from "@/components/ui/card";
import { DefaultTableView } from "@/components/table";
import { client } from "@/lib/hono";

const getDirector = cache(async (id: string) => {
    const res = await client.director[":id"].$get({ param: { id } });
    const director = await res.json();

    if (!director) {
        notFound();
    }

    director.moviesToDirectors.sort((a, b) => {
        return (a.movie?.year ?? 0) - (b.movie?.year ?? 0);
    });

    return director;
});

async function lookupDirector(
    name: string,
    movies: { title: string; year?: number | null }[],
    tmdbId?: number
) {
    if (tmdbId) {
        return await tmdb.people.details(tmdbId, ["combined_credits"]);
    }

    const { results } = await tmdb.search.people({
        query: name,
    });

    // find best match - looking for director, preferably whose known for includes the movies  we have

    const directorSearchResult = results.find((person) => {
        if (person.known_for_department !== "Directing") {
            return false;
        }

        const knownFor = person.known_for
            .map((movie) => movie.media_type === "movie" && movie.title)
            .filter(Boolean);

        return movies.some((movie) => knownFor.includes(movie.title));
    });

    if (!directorSearchResult) {
        return;
    }

    const director = await tmdb.people.details(directorSearchResult.id, [
        "combined_credits",
    ]);

    return director;
}

async function PersonWrapper({ director }: { director: Awaited<ReturnType<typeof getDirector>> }) {
    const data = await lookupDirector(
        director.name,
        director.moviesToDirectors.map((directorToMovie) => directorToMovie.movie).filter(Boolean),
        director.tmdbId ?? undefined
    );
    return (
        data ? <Person person={data} /> : null
    )
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    console.time("getDirector");
    const director = await getDirector(params.id);
    console.timeEnd("getDirector");

    if (!director.name) {
        notFound();
    }

    const movies = director.moviesToDirectors.map(({ movie }) => movie).filter(Boolean);

    // TODO
    return (
        <div className="flex flex-col gap-4">
            <Suspense fallback={
                <div className="flex gap-4">
                    <div className="shrink w-36">
                        <div className="bg-zinc-400 animate-pulse h-[216px] rounded  w-[144px]"></div>
                    </div>
                    <h2 className="text-2xl tracking-tighter font-bold">{director.name}</h2>
                </div>
            }>
                <PersonWrapper director={director} />
            </Suspense>

            <DefaultTableView
                movies={movies}
            />
            <Card>
                <span className="text-lg tracking-tight font-semibold text-center">
                    Movie Ranking History
                </span>
                <div className="h-[600px] w-full">
                    <RankingChart
                        enablePoints={true}
                        data={director.moviesToDirectors
                            .map(({ movie }) => movie)
                            .filter(Boolean)}
                    />
                </div>
            </Card>
        </div>
    );
}
