// let's loop through all our data and get the tmdb data for each movie, so that we can have it stored.
// a probably better means would be to connect tspdt id to tmdb id.
import { eq, isNull } from "drizzle-orm";
import { chunk } from "remeda";
import { TMDB } from "tmdb-ts";
import { Database } from "bun:sqlite";
import { Movie } from "@/core/movie/movie.sql";
export const serverID = 1;
const db = new Database("db.db");

export const getMovie = async ({ title, year, tmdbId }) => {
  if (!tmdbId) {
    const u = `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.TMDB_API_KEY
    }&query=${encodeURIComponent(title)}&include_adult=false`;
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
    `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
  ).then((res) => res.json());

  console.log("got tmovie", tmovie);

  return tmovie;
};

// we'll do this 100 items at a time, so that we don't get throttled by tmdb
// we'll need to make a request to tmdb for each movie, and then store the data in the movie object

async function main() {
  const movies = db
    .query("select * from movies where tmdb_id is null")
    .all() as Movie[];

  console.log("got movies", movies.length);
  //   return;

  const chunks = chunk(movies, 10);

  console.log("got chunks", chunks.length);
  for (const chunk of chunks) {
    // const data = await res.json();
    await Promise.all(
      chunk.map(async (movie) => {
        const tmovie = await getMovie(movie);
        if (!tmovie) {
          console.log("no tmovie for", movie.id);
          return;
        }
        console.log("got movie", { tmovie });
        const q = db.query(
          "update movies set tmdb_data = ?, tmdb_id = ?, poster_path = ? where id = ?"
        );
        q.all(
          JSON.stringify(tmovie),
          tmovie?.id as number,
          tmovie?.poster_path as string,
          movie.id as string
        );
        console.log("updated movie", movie.id);
      })
    );
    setTimeout(() => {
      console.log("waited 2.5 seconds, on to the next batch");
    }, 2500);
  }
}

main();
