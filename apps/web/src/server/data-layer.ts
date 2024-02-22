"use server";

import { client } from "@/lib/hono";
import { MovieEmbedding } from "tspdt-api/src/schemas";
import { transformMovieIntoTextEmbedding } from "tspdt-api/src/utils";

export async function getRecommendations(movie: MovieEmbedding) {
  const data = await client.recommendations
    .$post({
      json: {
        overview: transformMovieIntoTextEmbedding(movie),
        id: movie.id,
      },
    })
    .then((res) => res.json());

  return data;
}
