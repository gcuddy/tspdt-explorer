"use server";

import { client } from "@/lib/hono";
import { cookies } from "next/headers";
import { MovieEmbedding } from "tspdt-api/src/schemas";

function transformMovieIntoTextEmbedding(movie: MovieEmbedding): string {
  let output = `Title:
${movie.title}`;

  if (movie.director) {
    output += `Director:
${movie.director}`;
  }

  if (movie.overview) {
    output += `Overview:
${movie.overview}`;
  }

  if (movie.cast) {
    output += `Cast:
${movie.cast}`;
  }

  if (movie.year) {
    output += `Year:
${movie.year}`;
  }

  if (movie.genre) {
    output += `Genres:
${movie.genre}`;
  }

  if (movie.country) {
    output += `Country:
${movie.country}`;
  }

  if (movie.color) {
    output += `Color:
${movie.color}`;
  }

  if (movie.budget) {
    output += `Budget:
${movie.budget}`;
  }

  return output;
}

export async function getAuthHeaders(): Promise<Record<string, string>> {
  const auth_session = (await cookies()).get("auth_session");
  return auth_session?.value
    ? {
      Cookie: `auth_session=${auth_session.value}`,
    }
    : {};
}

export async function getRecommendations(movie: MovieEmbedding) {
  console.log("getting recommendations for movie", movie);
  const e = {
    overview: transformMovieIntoTextEmbedding(movie),
    id: movie.id,
  };
  console.log("using embedding input", e);
  const data = await client.recommendations
    .$get({
      query: {
        ...e,
      },
    })
    .then((res) => res.json());

  return data;
}

export async function searchDirector(query: string) {
  const data = await client.director.search
    .$get({
      query: {
        name: query,
      },
    })
    .then((res) => res.json());

  return data;
}

export async function getMoviesFromYear(year: number) {
  const data = await client.movies.year[":year"]
    .$get({
      param: {
        year: year.toString(),
      },
    })
    .then((res) => res.json());

  return data;
}

export async function getMovies() {
  const res = await client.movies.list.$get();
  // TODO: this is where the app is breaking.
  try {
    const movies = await res.json();
    return movies;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const getUserMovie = async (id: string) =>
  await client.movie[":id"].interaction
    .$get({ param: { id } }, { headers: await getAuthHeaders() })
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
      return { authorized: false };
    });

export const getMovieInteractions = async () => {
  const res = await client.movie.interactions.$get(
    {},
    { headers: await getAuthHeaders() },
  );
  if (res.status === 401) {
    return [];
  }
  const interactions = await res.json();
  return interactions;
};
