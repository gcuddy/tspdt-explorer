"use server";

import { client } from "@/lib/hono";
import { MovieEmbedding } from "tspdt-api/src/schemas";
import { transformMovieIntoTextEmbedding } from "tspdt-api/src/utils";

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
