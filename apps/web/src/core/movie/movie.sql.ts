import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  primaryKey,
  index,
} from "drizzle-orm/sqlite-core";
import { Credits, MovieDetails } from "tmdb-ts";
import { userID, timestamps, cuid, timestamp } from "@/utils/sql";

export const userMovie = sqliteTable(
  "user_movie",
  {
    ...userID,
    ...timestamps,
    movieID: cuid("movie_id").notNull(),
    posterPath: text("poster_path"),
    //   could get more complex with activity, but we'll keep it like this for now
    timeSeen: timestamp("time_seen"),
    timeFavorited: timestamp("time_favorited"),
    //   to watchlist...
    timeAdded: timestamp("time_added"),

    // should these go here?
    lastModifiedVersion: integer("last_modified_version").notNull(),
  },
  (table) => ({
    primary: primaryKey({
      columns: [table.userID, table.movieID],
    }),
  })
);

export const movies = sqliteTable(
  "movies",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    year: integer("year"),
    tmdbId: integer("tmdb_id"),
    tspdtId: integer("tspdt_id"),
    //   just taken from tmdb, for easy access
    posterPath: text("poster_path"),
    runtime: integer("runtime"),
    lastModifiedVersion: integer("last_modified_version").notNull(),
    tmdbData: text("tmdb_data", {
      mode: "json",
    }).$type<
      MovieDetails & {
        credits: Omit<Credits, "id">;
      }
    >(),
  },
  (table) => {
    return {
      runtimeIdx: index("runtime_idx").on(table.runtime),
      year: index("year_idx").on(table.year),
    };
  }
);

export type Movie = InferSelectModel<typeof movies>;
export type SimplifiedMovie = Omit<Movie, "tmdbData">;

export const movieRelations = relations(movies, ({ many }) => ({
  moviesToDirectors: many(moviesToDirectors),
  rankings: many(rankings),
}));

export const directors = sqliteTable("directors", {
  id: text("id").primaryKey(),
  name: text("name"),
  tmdbId: integer("tmdb_id"),
  lastModifiedVersion: integer("last_modified_version").notNull(),
});

export type Director = InferSelectModel<typeof directors>;

export const rankings = sqliteTable(
  "rankings",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    movieId: integer("movie_id"),
    // refers to tspdt year (probably want to make this more generic)
    year: integer("year"),
    ranking: integer("ranking"),
    lastModifiedVersion: integer("last_modified_version").notNull(),
  },
  (table) => ({
    movieIdx: index("movie_idx").on(table.movieId),
    movieIdxYear: index("movie_idx_year").on(table.movieId, table.year),
    yearIdx: index("year_idx").on(table.year),
  })
);

export type Ranking = InferSelectModel<typeof rankings>;

export const rankingsRelations = relations(rankings, ({ one }) => ({
  movie: one(movies, {
    fields: [rankings.movieId],
    references: [movies.id],
  }),
}));

export const directorRelations = relations(directors, ({ many }) => ({
  directorsToMovies: many(moviesToDirectors),
}));

export const moviesToDirectors = sqliteTable(
  "movies_to_directors",
  {
    movieId: text("movie_id")
      .notNull()
      .references(() => movies.id),
    directorId: text("director_id")
      .notNull()
      .references(() => directors.id),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.movieId, t.directorId],
    }),
  })
);

export const usersToGroupsRelations = relations(
  moviesToDirectors,
  ({ one }) => ({
    movie: one(movies, {
      fields: [moviesToDirectors.movieId],
      references: [movies.id],
    }),
    director: one(directors, {
      fields: [moviesToDirectors.directorId],
      references: [directors.id],
    }),
  })
);
