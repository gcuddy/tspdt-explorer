import { uncached_getMovie } from "@/utils/tmdb";
import { cache } from "react";
import "server-only";

export const getMovie = cache(uncached_getMovie);
