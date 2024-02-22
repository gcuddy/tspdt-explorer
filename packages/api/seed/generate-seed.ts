import { MovieDetailSchema, MovieResultSchema } from "../src/zod";
import Database from "bun:sqlite";
import { csvParse } from "d3";
import { customAlphabet } from "nanoid";
import { z } from "zod";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import {
  movies as MoviesTable,
  directors as DirectorsTable,
  rankings as RankingsTable,
  moviesToDirectors,
} from "../src/db/schema";

import { hc } from "hono/client";
import { AppType } from "tspdt-api/src/index";

// const client = hc<AppType>("http://localhost:8787");

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 9);

const text = await Bun.file("./tspdt-starting-list.csv").text();

const sqlite = new Database("./tspdt.db");

const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "./migrations" });

const FindByIdResultSchema = z.object({
  movie_results: z.array(MovieResultSchema),
});

type MovieData = {
  "2007": string;
  "2008": string;
  "2010": string;
  "2011": string;
  "2012": string;
  "2013": string;
  "2014": string;
  "2015": string;
  "2016": string;
  "2017": string;
  "2018": string;
  "2019": string;
  "2020": string;
  "2021": string;
  "2022": string;
  "2023": string;
  "2024": string;
  New: string;
  "Director(s)": string;
  Title: string;
  Year: string;
  Country: string;
  Length: string;
  Colour: string;
  Genre: string;
  "Dec-06": string;
  "Mar-06": string;
  IMDb: string;
  IMDB_ID: string;
  idTSPDT: string;
};

type MovieColumn = keyof MovieData;

const parsed = csvParse<MovieColumn>(text);

type RankingKey = {
  [k in keyof MovieData]: k extends `${number}` | "Dec-06" | "Mar-06"
    ? k
    : never;
}[keyof MovieData];

function isRankingKey(key: string): key is RankingKey {
  return /\d{4}/.test(key) || key === "Dec-06" || key === "Mar-06";
}

async function imdbToTmdb(imdbId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`,
    {
      headers: {
        Authorization: `Bearer ${Bun.env.TMDB_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  const json = await res.json();

  console.dir({ json }, { depth: null });
  try {
    const parsed = FindByIdResultSchema.parse(json);
    return parsed.movie_results[0];
  } catch (e) {
    console.error(e);
  }
}

async function tmdbMovieDetails(tmdbId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}?append_to_response=credits`,
    {
      headers: {
        Authorization: `Bearer ${Bun.env.TMDB_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  try {
    const json = await res.json();
    const parsed = MovieDetailSchema.parse(json);
    return parsed;
  } catch (e) {
    console.error(e);
  }
}

// TODO: set currentRanking

const reverseName = (name: string) =>
  name
    .split(",")
    .map((n) => n.trim())
    .reverse()
    .join(" ");

// first let's deal with everything that has tmdb id... then we'll deal with everything else
const moviesWithTmdbId = parsed
  .filter((p) => p.IMDB_ID && p.IMDB_ID !== "#N/A" && +p["2024"])
  //   sort by rankings
  .sort((a, b) => parseInt(a["2024"]) - parseInt(b["2024"]));

const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// TODO: tmdb has rough api limit of 50 requests per second. we should respect that and aim for no more than 25 requests per second.

const directorToIdLookup = new Map<string, string>();

// TODO: amidst all this is to ingest data into vector database.

let i = 0;
// let's get first 1000
for (const p of moviesWithTmdbId.slice(0, 1000)) {
  if (!p.IMDB_ID) continue;
  i++;
  const movie = await imdbToTmdb(p.IMDB_ID);

  const genres = p.Genre.split("-").map((g) => g.trim());
  const color =
    p.Colour === "BW"
      ? "bw"
      : p.Colour === "Col" || p.Colour === "Colour"
      ? "col"
      : "col-bw";
  const country = p.Country.split("-").map((c) => c.trim());

  //   TODO: fix title if not in tmdb

  let directors: string[] = [];
  const directorToTmdbId = new Map<string, number>();
  const twoDirectors = p["Director(s)"].split("&");
  const manyDirectors = p["Director(s)"].split("/");

  if (twoDirectors.length > 1) {
    for (const director of twoDirectors) {
      const name = reverseName(director.trim());
      if (!directors.includes(name)) {
        directors.push(name);
      }
    }
  } else if (manyDirectors.length > 1) {
    for (const director of manyDirectors) {
      const name = reverseName(director.trim());
      if (!directors.includes(name)) {
        directors.push(name);
      }
    }
  } else {
    const name = reverseName(p["Director(s)"].trim());
    if (!directors.includes(name)) {
      directors.push(name);
    }
    directors.push(reverseName(p["Director(s)"].trim()));
  }

  if (movie) {
    // https://tspdt-api.floral-violet-deef.workers.dev

    // const vector = await run("@cf/baai/bge-base-en-v1.5", {
    //   text: movie.overview,
    // });
    // console.log({ vector });
    // const movieDetails =

    const tmovie = await tmdbMovieDetails(movie.id);
    console.log({ tmovie });

    console.log({ genres });
    const tdirectors = tmovie?.credits.crew.filter((c) => c.job === "Director");

    if (tdirectors) {
      directors = tdirectors.map((d) => d.name);
      for (const director of tdirectors) {
        directorToTmdbId.set(director.name, director.id);
      }
    }

    // const res = await client.movie.$post({
    //   json: {
    //     overview: movie.overview,
    //     title: movie.title,
    //     year: +p.Year,
    //     budget: tmovie?.budget ?? null,
    //     cast: (tmovie?.credits.cast.map((c) => c.name) ?? []).join(", "),
    //     color,
    //     country: country.join(", "),
    //     director: (
    //       tmovie?.credits.crew
    //         .filter((c) => c.job === "Director")
    //         .map((c) => c.name) ?? directors
    //     ).join(", "),
    //     genre: genres.join(", "),
    //     runtime: p.Length ? +p.Length : null,
    //     id: p.idTSPDT,
    //     tmdbPosterPath: movie.poster_path,
    //   },
    // });

    // console.log({ res });

    db.insert(MoviesTable)
      .values({
        id: p.idTSPDT,
        title: movie.title ?? p.Title,
        year: +p.Year,
        imdbId: p.IMDB_ID,
        tmdbId: movie.id,
        tmdbPosterPath: movie.poster_path,
        tmdbBackdropPath: movie.backdrop_path,
        color,
        country,
        genre: genres,
        overview: movie.overview,
        runtime: p.Length ? +p.Length : null,
        currentRanking: +p["2024"] ?? null,
      })
      .onConflictDoNothing()
      .run();
  }
  const rankingKeys = Object.keys(p).filter(isRankingKey);
  for (const key of rankingKeys) {
    // for clarity, we'll just use 2006 for Dec-06 and 2005 for Mar-06
    const year = key === "Dec-06" ? 2006 : key === "Mar-06" ? 2005 : +key;
    db.insert(RankingsTable)
      .values({
        movieId: p.idTSPDT,
        year,
        ranking: +p[key],
      })
      .run();
  }
  // lookup director...? seems wasteful to not cache rest of data in some way. could also just parse director name from csv, but then we won't have tmdb id. could look this up just in time, and then cache it.

  for (const director of directors) {
    let id = directorToIdLookup.get(director);
    let tmdbId = directorToTmdbId.get(director);
    if (!id) {
      id = nanoid();
      directorToIdLookup.set(director, id);
    }

    db.insert(DirectorsTable)
      .values({
        id,
        name: director,
        tmdbId,
      })
      .onConflictDoNothing()
      .run();

    db.insert(moviesToDirectors)
      .values({
        movieId: p.idTSPDT,
        directorId: id,
      })
      .onConflictDoNothing()
      .run();
  }
  if (i % 40 === 0) {
    console.log("sleeping for 1 second");
    await delay(1000);
  }
}
