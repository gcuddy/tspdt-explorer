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
    console.log("e", e);
    const data = await client.recommendations
      .$post({
        json: e,
      })
      .then((res) => res.json());

  return data;
}
