import { Movie } from "@/core/movie";
import { Server } from "./framework";

export const server = new Server().expose("movie_seen", Movie.seen);

export type ServerType = typeof server;
