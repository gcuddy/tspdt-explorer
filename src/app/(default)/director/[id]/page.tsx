import { db } from "@/db/client";
import { tmdb } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import { Director } from "./director";
import { MovieList } from "./movie-list";
import { cache } from "react";
import { RankingChart } from "@/app/(movie)/movie/[id]/ranking-chart";
import { asc, sql } from "drizzle-orm";
import { Card } from "@/components/ui/card";
import { DefaultTableView } from "@/components/table";

const prepared = db.query.directors
  .findFirst({
    with: {
      directorsToMovies: {
        with: {
          movie: {
            with: {
              rankings: {
                orderBy(fields, { asc }) {
                  return asc(fields.year);
                },
                // limit: 1,
              },
            },
          },
        },
      },
    },
    where: (director, { eq }) => eq(director.id, sql.placeholder("id")),
  })
  .prepare();

const getDirector = cache(async (id: string) => {
  const director = prepared.get({ id });

  if (!director) {
    notFound();
  }

  director.directorsToMovies.sort((a, b) => {
    return (a.movie.year ?? 0) - (b.movie.year ?? 0);
  });

  return director;
});

async function lookupDirector(
  name: string,
  movies: { title: string; year?: number | null }[],
  tmdbId?: number
) {
  if (tmdbId) {
    // then handle that
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

export default async function Page({ params }: { params: { id: string } }) {
  console.time("getDirector");
  const director = await getDirector(params.id);
  console.timeEnd("getDirector");

  if (!director.name) {
    notFound();
  }
  //   const data = await lookupDirector(
  //     director.name,
  //     director.directorsToMovies.map((directorToMovie) => directorToMovie.movie),
  //     director.tmdbId ?? undefined
  //   );

  const movies = director.directorsToMovies.map(({ movie }) => movie);

  // TODO
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl tracking-tighter font-bold">{director.name}</h1>
      {/* {data ? (
        <Director director={data} />
      ) : (
      )} */}
      {/* <MovieList list={movies} /> */}

      <DefaultTableView
        movies={movies.map((m) => ({
          ...m,
          ranking: m.rankings.at(-1)?.ranking ?? undefined,
        }))}
      />
      {/* <Card>
        <span className="text-lg tracking-tight font-semibold text-center">
          Movie Ranking History
        </span>
        <div className="h-72">
          <RankingChart
            enablePoints={true}
            data={director.directorsToMovies
              .map(({ movie }) => movie)
              .filter((m) => m.rankings.length > 0)}
          />
        </div>
      </Card> */}
    </div>
  );
}
