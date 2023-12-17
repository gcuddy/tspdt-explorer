import { relations, sql } from "drizzle-orm";
import {
  text,
  integer,
  sqliteTable,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const movies = sqliteTable("movies", {
  id: text("id").primaryKey(),
  title: text("title"),
  year: integer("year"),
  tmdbId: integer("tmdb_id"),
});

export const movieRelations = relations(movies, ({ many }) => ({
  moviesToDirectors: many(moviesToDirectors),
}));

export const directors = sqliteTable("directors", {
  id: text("id").primaryKey(),
  name: text("name"),
  tmdbId: integer("tmdb_id"),
});

export const directorRelations = relations(directors, ({ many }) => ({
  directorsToMovies: many(moviesToDirectors),
}));

export const moviesToDirectors = sqliteTable(
  "movies_to_directors",
  {
    movieId: integer("movie_id")
      .notNull()
      .references(() => movies.id),
    directorId: integer("director_id")
      .notNull()
      .references(() => directors.id),
  },
  (t) => ({
    pk: primaryKey(t.movieId, t.directorId),
  }),
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
  }),
);
