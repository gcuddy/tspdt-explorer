import type { AppendToResponse, AppendToResponseMovieKey, AppendToResponsePersonKey, MovieDetails, Movie, Person, Search, PersonDetails } from "tmdb-ts";
import { env } from "@/env.mjs";


export class TMDB {
  private readonly accessToken: string;

  private request = async <T>(path: `/${string}`, params?: Record<string, string | number>): Promise<T> => {
    const url = new URL(`https://api.themoviedb.org/3${path}`);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, String(value));
      }
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })

    if (!response.ok) {
      return Promise.reject((await response.json()) as {
        status_code: number;
        status_message: string;
        success: boolean;
      });
    }

    return await response.json<T>()
  }

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }


  // TODO: define search, movie/details, people

  search = {
    movies: (params: {
      query: string;
      year?: number;
    }) => {
      return this.request<Search<Movie>>("/search/movie", params);
    },

    people: (params: {
      query: string;
    }) => {
      return this.request<Search<Person>>("/search/person", params);
    },
  }

  movies = {
    details: <T extends AppendToResponseMovieKey[]>(id: number, append_to_response: T) => {
      return this.request<AppendToResponse<MovieDetails, T, 'movie'>>(`/movie/${id}`, { append_to_response: append_to_response.join(",") });
    }
  }

  people = {
    details: <T extends AppendToResponsePersonKey[]>(id: number, append_to_response: T) => {
      return this.request<AppendToResponse<PersonDetails, T, 'person'>>(`/person/${id}`, { append_to_response: append_to_response.join(",") });
    }
  }
}

export const tmdb = new TMDB(env.TMDB_TOKEN);
