import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const movies = sqliteTable("movies", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  year: integer("year"),
  tmdbId: integer("tmdb_id"),
  tspdtId: integer("tspdt_id"),
});

export type Movie = InferSelectModel<typeof movies>;

export const movieRelations = relations(movies, ({ many }) => ({
  moviesToDirectors: many(moviesToDirectors),
  rankings: many(rankings),
}));

export const directors = sqliteTable("directors", {
  id: text("id").primaryKey(),
  name: text("name"),
  tmdbId: integer("tmdb_id"),
});

export const rankings = sqliteTable("rankings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  movieId: integer("movie_id"),
  // refers to tspdt year (probably want to make this more generic)
  year: integer("year"),
  ranking: integer("ranking"),
});

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
    pk: primaryKey(t.movieId, t.directorId),
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
