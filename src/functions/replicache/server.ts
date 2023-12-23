import { Movie } from "@/core/movie";
import { Server } from "./framework";

export const server = new Server()
  .expose("movie_seen", Movie.seen)
  .expose("movie_unseen", Movie.unseen)
  .expose("movie_marktowatch", Movie.marktowatch)
  .expose("movie_unmarktowatch", Movie.unmarktowatch)
  .expose("movie_favorite", Movie.favorite)
  .expose("movie_unfavorite", Movie.unfavorite)
  .expose("movie_poster_path", Movie.setPosterPath);

export type ServerType = typeof server;
