import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TMDB_TOKEN: z.string().min(1),
    DISCORD_ID: z.string().min(1),
    DISCORD_SECRET: z.string().min(1),
    APP_URL: z.string().min(1)
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().min(1),
  },
  runtimeEnv: {
    TMDB_TOKEN: process.env.TMDB_TOKEN,
    DISCORD_ID: process.env.DISCORD_ID,
    DISCORD_SECRET: process.env.DISCORD_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    APP_URL: process.env.APP_URL
  },
});
