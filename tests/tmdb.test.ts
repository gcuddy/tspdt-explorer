import { test, expect, describe } from "bun:test";
const KEY = process.env.TMDB_API_KEY;
const getMovie = async ({
  title,
  year,
  tmdbId,
}: {
  title: string;
  year: number;
  tmdbId?: number;
}) => {
  if (!tmdbId) {
    const u = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${encodeURIComponent(
      title
    )}&include_adult=false`;
    const t = await fetch(u);

    const tmovie = await t.json().then((res) => {
      // get the result with matching title + year, or the first result
      console.log({ title });
      console.log("url", u);
      console.log("got tmdb results", res);
      return (
        (res as any).results.find(
          (r) =>
            r.title === title &&
            (!year || r.release_date?.startsWith(year.toString()))
        ) ?? res.results[0]
      );
    });

    console.log("got tmovie", tmovie);

    tmdbId = tmovie?.id;
  }

  if (!tmdbId) {
    return;
  }

  //   const tmovie = await tmdb.movies.details(tmdbId, ["credits"]);

  const tmovie = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${KEY}&append_to_response=credits`
  ).then((res) => res.json());

  console.log("got tmovie", tmovie);

  return tmovie;
};

test("stalker", async () => {
  expect(
    await getMovie({
      title: "Stalker",
      year: 1979,
    })
  ).toMatchObject({
    id: 1398,
  });
});
