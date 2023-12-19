import { db } from "@/db/client";
import {
  Director,
  directors,
  movies,
  moviesToDirectors,
  rankings,
} from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

async function listTopDirectors() {
  //   const dirs = await db.query.directors.findMany({
  //     // with: {},
  //   });

  const dirs = await db
    .select({
      id: directors.id,
      name: directors.name,
      top1000count: sql`count(case when ${rankings.ranking} <= 1000 then 1 end)`,
      top2500count: sql`count(case when ${rankings.ranking} <= 2500 then 1 end)`,
      citedcount: sql`count(${rankings.ranking})`,
      director_score:
        sql<number>`sum(case when ${rankings.ranking} <= 1000 then (1.0 / rankings.ranking) when rankings.ranking <= 2500 then (0.5 / rankings.ranking) else 0 end)`.as(
          "director_score"
        ),
    })
    .from(directors)
    .innerJoin(
      moviesToDirectors,
      eq(directors.id, moviesToDirectors.directorId)
    )
    .innerJoin(movies, eq(moviesToDirectors.movieId, movies.id))
    .innerJoin(rankings, eq(movies.id, rankings.movieId))
    .groupBy(directors.id, directors.name)
    .orderBy(desc(sql`director_score`))
    .limit(250);

  console.log(dirs);

  return dirs;

  //   const directors: Array<
  //     Director & {
  //       top1000count: number;
  //       top2500count: number;
  //       citedcount: number;
  //     }
  //   > = [];

  //   for (let i = 0; i < dirs.length; ++i) {
  //     const dir = dirs[i];

  //     const top1000count = dir.directorsToMovies.filter(
  //       (dtm) => (dtm.movie.rankings[0].ranking ?? 9999) <= 1000
  //     ).length;

  //     const top2500count = dir.directorsToMovies.filter(
  //       (dtm) => (dtm.movie.rankings[0].ranking ?? 9999) <= 2500
  //     ).length;

  //     const citedcount = dir.directorsToMovies.filter(
  //       (dtm) => dtm.movie.rankings[0].ranking !== null
  //     ).length;

  //     directors.push({
  //       ...dir,
  //       top1000count,
  //       top2500count,
  //       citedcount,
  //     });
  //   }

  //   return directors.sort(({ top1000count: a }, { top1000count: b }) => a - b);
}

export default async function Page() {
  const directors = await listTopDirectors();

  return (
    <div>
      <div>test</div>
      <ul>
        {directors.map((director) => (
          <li key={director.id}>
            <h2>{director.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
