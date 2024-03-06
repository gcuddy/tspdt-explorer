import { uncached_getMovie } from "@/utils/tmdb";
import { cache } from "react";

export const getMovie = cache(uncached_getMovie);
