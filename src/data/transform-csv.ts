import { MovieResultSchema } from "@/lib/schemas";
import Database from "bun:sqlite";
import { csvParse } from "d3";
import { customAlphabet } from "nanoid";
import { z } from "zod";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 9);

const text = await Bun.file(Bun.argv.slice(2)[0]).text();

const sqlite = new Database("2024.db");

const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "./migrations2" });

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

const imdb_regex = /tt\d{7,8}/;

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
for (const p of moviesWithTmdbId.slice(0, 0)) {
  if (!p.IMDB_ID) continue;
  i++;
  const movie = await imdbToTmdb(p.IMDB_ID);
  if (movie) {
    db.query(
      `insert into movies (id, title, year, imdb_id, tmdb_id, tmdb_poster_path, tmdb_backdrop_path) values (?, ?, ?, ?, ?, ?, ?)`
    ).all(
      p.idTSPDT,
      p.Title,
      p.Year,
      p.IMDB_ID,
      movie.id,
      movie.poster_path,
      movie.backdrop_path
    );
  }
  const rankingKeys = Object.keys(p).filter(isRankingKey);
  for (const key of rankingKeys) {
    db.query(
      `insert into rankings (movie_id, year, ranking) values (?, ?, ?)`
    ).all(p.idTSPDT, p.Year, p[key]);
  }
  // lookup director...? seems wasteful to not cache rest of data in some way. could also just parse director name from csv, but then we won't have tmdb id. could look this up just in time, and then cache it.
  const directors: string[] = [];
  const twoDirectors = p["Director(s)"].split("&");
  const manyDirectors = p["Director(s)"].split("/");
  if (twoDirectors.length > 1) {
    for (const director of twoDirectors) {
      directors.push(reverseName(director.trim()));
    }
  } else if (manyDirectors.length > 1) {
    for (const director of manyDirectors) {
      directors.push(reverseName(director.trim()));
    }
  } else {
    directors.push(reverseName(p["Director(s)"].trim()));
  }

  //   TODO: handle directors. either create a map for ids to director. or look up director in tmdb via movie.credits.crew.
  for (const director of directors) {
    let id = directorToIdLookup.get(director);
    if (!id) {
      id = nanoid();
      directorToIdLookup.set(director, id);
    }

    db.query(
      `insert or ignore into directors (id, name, tmdb_id) values (?, ?, ?)`
    ).run(
      id,
      director,
      //   for now
      null
    );

    db.query(
      `insert into movies_to_directors (movie_id, director_id) values (?, ?)`
    ).run(p.idTSPDT, id);
  }
  if (i % 40 === 0) {
    console.log("sleeping for 1 second");
    await delay(1000);
  }
}
