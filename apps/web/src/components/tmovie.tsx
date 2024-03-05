import { getMovie } from "@/app/api/tmdb";
import { MovieListItem } from "./movie";
import { Director, Movie } from "tspdt-api/src/db/schema";

export async function FancyMovieListItem({
  movie,
}: {
  movie: Movie & { director?: Array<Pick<Director, "id" | "name">> };
}) {
  const tmovie = await getMovie(movie);
  return tmovie ? (
    <>
      <MovieListItem
        movie={movie}
        director={movie.director}
        posterSrc={
          tmovie.poster_path
            ? `https://image.tmdb.org/t/p/w154${tmovie.poster_path}`
            : undefined
        }
      />{" "}
    </>
  ) : (
    <MovieListItem movie={movie} />
  );
}
