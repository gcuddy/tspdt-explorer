import { tmdb } from "@/lib/tmdb";
import { cache } from "react";
import { MovieDetails } from "tmdb-ts";
import "server-only";

export const getMovie = cache(
  async ({
    title,
    year,
    tmdbId,
  }:
    | {
        title: string;
        year?: number | null;
        tmdbId?: number | null;
      }
    | {
        tmdbId: number;
        title?: string | null;
        year?: number | null;
      }) => {
    if (!tmdbId) {
      const tmovie = await tmdb.search
        .movies({
          query: title as string,
          year: year ?? undefined,
        })
        .then((res) => {
          // get the result with matching title + year, or the first result
          return (
            res.results.find(
              (r) =>
                r.title === title &&
                (!year || r.release_date?.startsWith(year.toString()))
            ) ?? res.results[0]
          );
        });

      if (!tmovie) return;

      tmdbId = tmovie.id;
    }

    const tmovie = await tmdb.movies.details(tmdbId, ["credits"]);

    return tmovie;
  }
);
