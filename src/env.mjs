import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TMDB_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_REPLICACHE_LICENSE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    TMDB_TOKEN: process.env.TMDB_TOKEN,
    NEXT_PUBLIC_REPLICACHE_LICENSE_KEY:
      process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY,
  },
});
