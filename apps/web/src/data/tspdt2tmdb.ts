// explicitly map a tspdt id to tmdb id

import minimist from "minimist";
import { Credits, MovieDetails } from "tmdb-ts";

import Database from "bun:sqlite";

const db = new Database("db.db");
const args = minimist(Bun.argv.slice(2));

const { tspdt, tmdb } = args;

if (!tspdt || !tmdb) {
  throw new Error("must provide tspdt and tmdb ids");
}

// get tmdb details

const movie = (await fetch(
  `https://api.themoviedb.org/3/movie/${tmdb}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
).then((res) => res.json())) as MovieDetails & { credits: Credits };
db
  .query(
    "update movies set tmdb_data = ?, tmdb_id = ?, poster_path = ? where tspdt_id = ?"
  )
  .all(JSON.stringify(movie), movie.id, movie.poster_path, tspdt);

console.log("updated movie", tspdt);
