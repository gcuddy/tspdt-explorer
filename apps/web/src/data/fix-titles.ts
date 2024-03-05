const f = Bun.file("./bare-tspdt.csv");

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
const r = /^"?(.*?)"?$/g;

const quoteTitle = (title: string) =>
  title.includes(",") ? `"${title}"` : title;

const makeLine = (title: string, year: string, newLine = true) =>
  `${newLine ? "\n" : ""}${quoteTitle(title)},${year}`;

async function main() {
  const t = await f.text();

  const split = t.split("\n");

  let str = `${split[0]}`;

  for (const line of split.slice(1)) {
    // get rid of opening and trailing quotes

    const split = line.split(",");

    const year = split.at(-1) as string;

    let title = split.slice(0, split.length - 1).join(",");

    title = title.replace(/^"/, "").replace(/"$/, "");
    // console.log({ title, year });

    const splitByComma = title.split(",");

    if (splitByComma.length === 1) {
      str += makeLine(title, year);
    } else {
      // check for final item being dumb article
      const final = splitByComma.at(-1)?.trim();
      if (final && ARTICLES.includes(final)) {
        // console.log("got article");
        // then reconstruct
        const newTitle = `${final} ${splitByComma
          .slice(0, splitByComma.length - 1)
          .join(",")}`;
        str += makeLine(newTitle, year);
      } else {
        str += makeLine(title, year);
      }
    }
  }

  // console.log({ str });

  const newFilePath = "./new-tspdt.csv";

  await Bun.write(newFilePath, str);
}

main();
