import { csvParse, csvFormat } from "d3";
import { nanoid } from "@/utils/nanoid";

async function main(csvPath: string) {
  const text = await Bun.file(csvPath).text();

  const directorToMovieIds = new Map<string, string[]>();

  const rankings: { movieId: string; year: number; ranking: number }[] = [];

  const ARTICLES = [
    "A",
    "The",
    "L'",
    "La",
    "The [TV]",
    "Der",
    "Der [TV]",
    "Les",
    "El",
    "O",
    "Os",
    "Il",
    "Un",
  ];

  function reverseName(name: string) {
    return name
      .split(",")
      .map((n) => n.trim())
      .reverse()
      .join(" ");
  }

  const parsed = csvParse(text).map((line) => {
    let { title, director, ...rest } = line;

    const splitByComma = title.split(",");

    const movieId = nanoid();

    if (splitByComma.length === 1) {
    } else {
      // check for final item being dumb article
      const final = splitByComma.at(-1)?.trim();
      if (final && ARTICLES.includes(final)) {
        // console.log("got article");
        // then reconstruct
        const newTitle = `${final} ${splitByComma
          .slice(0, splitByComma.length - 1)
          .join(",")}`;
        title = newTitle;
      }
    }

    // fix director
    const directors: string[] = [];

    // check for & situation
    const twoDirectors = director.split("&");
    const manyDirectors = director.split("/");
    if (twoDirectors.length > 1) {
      for (const director of twoDirectors) {
        directors.push(reverseName(director.trim()));
      }
    } else if (manyDirectors.length > 1) {
      for (const director of manyDirectors) {
        directors.push(reverseName(director.trim()));
      }
    } else {
      directors.push(reverseName(director.trim()));
    }

    // now we have parsed list of directors - going to do side effects here, sue me
    for (const director of directors) {
      const s = new Set(directorToMovieIds.get(director) ?? []);
      s.add(movieId);
      directorToMovieIds.set(director, Array.from(s));
    }

    // find keys that are year - those are years
    const yearKeys = Object.keys(rest).filter((key) => /\d{4}/.test(key));

    for (const yk of yearKeys) {
      const ranking = Number(rest[yk] || "0");
      if (ranking > 0) {
        rankings.push({
          movieId,
          ranking,
          year: +yk,
        });
      }
    }

    return { id: movieId, title, director: directors, ...rest };
  });

  const directors = Array.from(directorToMovieIds.entries()).map(
    ([director, movieIds]) => {
      return {
        director,
        movieIds,
        id: nanoid(),
      };
    },
  );

  // connect movie id to director id
  //
  const movie_to_director = directors.flatMap((d) => {
    return d.movieIds.map((movieId) => ({ directorId: d.id, movieId }));
  });

  Bun.write("./movies.json", JSON.stringify(parsed));
  Bun.write("./movies.csv", csvFormat(parsed));
  Bun.write("./rankings.json", JSON.stringify(rankings));
  Bun.write("./rankings.csv", csvFormat(rankings));
  Bun.write("./directors.csv", csvFormat(directors));
  Bun.write("./directors.json", JSON.stringify(directors));
  Bun.write("./movie-to-director.csv", csvFormat(movie_to_director));
  Bun.write("./movie-to-director.json", JSON.stringify(movie_to_director));
}

const [path] = Bun.argv.slice(2);

if (!path) {
  throw new Error("Path to csv must be provided.");
}

main(path);
