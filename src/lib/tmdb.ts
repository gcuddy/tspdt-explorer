import { TMDB } from "tmdb-ts";
import { env } from "@/env.mjs";

export const tmdb = new TMDB(env.TMDB_TOKEN);
