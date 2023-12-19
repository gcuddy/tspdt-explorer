import { db } from "@/db/client";
import { tmdb } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import { Director } from "./director";
import { MovieList } from "./movie-list";

async function getDirector(id: string) {
  const director = await db.query.directors.findFirst({
    with: {
      directorsToMovies: {
        with: {
          movie: {
            with: {
              rankings: {
                orderBy(fields, { desc }) {
                  return desc(fields.year);
                },
                limit: 1,
              },
            },
          },
        },
      },
    },
    where: (director, { eq }) => eq(director.id, id),
  });

  if (!director) {
    notFound();
  }

  director.directorsToMovies.sort((a, b) => {
    return (a.movie.year ?? 0) - (b.movie.year ?? 0);
  });

  return director;
}

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
  const director = await getDirector(params.id);

  if (!director.name) {
    notFound();
  }
  const data = await lookupDirector(
    director.name,
    director.directorsToMovies.map((directorToMovie) => directorToMovie.movie),
    director.tmdbId ?? undefined
  );

  // TODO
  return (
    <div className="flex flex-col gap-4">
      {data ? (
        <Director director={data} />
      ) : (
        <h1 className="text-4xl tracking-tighter font-bold">{director.name}</h1>
      )}
      <MovieList list={director.directorsToMovies.map(({ movie }) => movie)} />
    </div>
  );
}
