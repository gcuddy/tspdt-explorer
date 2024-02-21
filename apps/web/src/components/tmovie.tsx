import { getMovie } from "@/app/api/tmdb";
import { Director, Movie } from "@/core/movie/movie.sql";
import { MovieListItem } from "./movie";

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
