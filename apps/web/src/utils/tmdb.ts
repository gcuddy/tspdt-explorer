import { tmdb } from "@/lib/tmdb";

export const uncached_getMovie = async ({
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

  const tmovie = await tmdb.movies.details(tmdbId, [
    "credits",
    "images",
    "videos",
  ]);
  //   TODO: edit response so that it only returns the data we need (i.e. trimming it)

  return tmovie;
};

export type TMDBMovie = Awaited<ReturnType<typeof uncached_getMovie>>
