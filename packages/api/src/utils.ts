import { MovieEmbedding } from "./schemas";

export function transformMovieIntoTextEmbedding(movie: MovieEmbedding): string {
  return `Title:
${movie.title}

Director:
${movie.director}

Overview:
${movie.overview}

Cast:
${movie.cast}

Year:
${movie.year}

Genres:
${movie.genre}

Country:
${movie.country}

Color:
${movie.color}

Budget:
${movie.budget}
`;
}
