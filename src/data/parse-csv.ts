import { csvParse, csvFormat } from "d3";

async function main() {
  const text = await Bun.file("./tspdt.csv").text();

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

    return { title, director: directors, ...rest };
  });

  Bun.write("./fixed-tspdt.json", JSON.stringify(parsed));
  Bun.write("./fixed-tspdt.csv", csvFormat(parsed));
}

main();
