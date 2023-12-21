// let's loop through all our data and get the tmdb data for each movie, so that we can have it stored.
// a probably better means would be to connect tspdt id to tmdb id.
import { eq, isNull } from "drizzle-orm";
import { chunk } from "remeda";
import { TMDB } from "tmdb-ts";
import { Database } from "bun:sqlite";
import { Movie } from "@/db/schema";
export const serverID = 1;
const db = new Database("db.db");

export const tmdb = new TMDB(process.env.TMDB_TOKEN as string);

// taken from yootils
/**
 * @typedef {{
 *   fulfil: (value?: any) => void;
 *   reject: (error?: Error) => void;
 *   promise: Promise<any>;
 * }} Deferred
 *
 * @typedef {{
 *   fn: () => Promise<any>;
 *   fulfil: (value: any) => void;
 *   reject: (error: Error) => void;
 * }} Item
 */

/**
 * Create a queue for running promise-returning functions in sequence, with concurrency=`max`
 * @param {number} max
 */
export default function queue(max = 4) {
  /** @type {Item[]} */
  const items = []; // TODO

  let pending = 0;

  let closed = false;

  /** @type {(value: any) => void} */
  let fulfil_closed;

  function dequeue() {
    if (pending === 0 && items.length === 0) {
      if (fulfil_closed) fulfil_closed();
    }

    if (pending >= max) return;
    if (items.length === 0) return;

    pending += 1;

    const { fn, fulfil, reject } = items.shift();
    const promise = fn();

    try {
      promise.then(fulfil, reject).then(() => {
        pending -= 1;
        dequeue();
      });
    } catch (err) {
      reject(err);
      pending -= 1;
      dequeue();
    }

    dequeue();
  }

  return {
    /** @param {() => Promise<any>} fn */
    add(fn) {
      if (closed) {
        throw new Error(`Cannot add to a closed queue`);
      }

      return new Promise((fulfil, reject) => {
        items.push({ fn, fulfil, reject });
        dequeue();
      });
    },

    close() {
      closed = true;

      return new Promise((fulfil, reject) => {
        if (pending === 0) {
          fulfil();
        } else {
          fulfil_closed = fulfil;
        }
      });
    },
  };
}

const getMovie = async ({ title, year, tmdbId }) => {
  if (!tmdbId) {
    const tmovie = await tmdb.search
      .movies({
        query: title,
        year: year ?? undefined,
      })
      .catch((err) => {
        console.log("error searching tmdb", err);
        return null;
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
    console.log({ tmovie });

    if (!tmovie) return;

    tmdbId = tmovie.id;
  }

  const tmovie = await tmdb.movies.details(tmdbId, ["credits"]);

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

  const chunks = chunk(movies, 5);

  for (const chunk of chunks.slice(0, 1)) {
    // const data = await res.json();
    await Promise.all(
      chunk.map(async (movie) => {
        const tmovie = await getMovie(movie);
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
