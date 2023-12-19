import { db } from "@/db/client";
import { Ranking, movies, rankings } from "@/db/schema";
import { tmdb } from "@/lib/tmdb";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { RankingChart } from "./ranking-chart";
import { Card } from "@/components/ui/card";
import { MovieHeader } from "./movie-header";
import { Stack } from "@/components/ui/layout";

export async function getMovie(id: string) {
  const movie = await db.query.movies.findFirst({
    where: eq(movies.id, id),
    with: {
      moviesToDirectors: {
        with: {
          director: true,
        },
      },
      rankings: true,
    },
  });

  if (!movie) {
    notFound();
  }

  const tmovie = await tmdb.search
    .movies({
      query: movie.title,
      year: movie.year ?? undefined,
    })
    .then((res) => res.results.at(0));

  return {
    ...movie,
    tmdb: tmovie,
  };
}

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);
  return (
    <Stack className="gap-8">
      <MovieHeader movie={movie} />
      <div className="grid lg:grid-cols-2">
        <Card>
          <span className="text-lg tracking-tight font-semibold text-center">
            Ranking History
          </span>
          <div className="h-72">
            {/* line chart */}
            <RankingChart rankings={movie.rankings} />
          </div>
        </Card>
      </div>
    </Stack>
  );
}
