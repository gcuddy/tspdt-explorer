import { MovieEmbedding } from "./schemas";


export const transformCamelToSnake = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);


export function capitalizeFirstLetter<T extends string>(string: T) {
    return string.charAt(0).toUpperCase() + string.slice(1) as Capitalize<T>;
}

export function transformMovieIntoTextEmbedding(movie: MovieEmbedding): string {
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
