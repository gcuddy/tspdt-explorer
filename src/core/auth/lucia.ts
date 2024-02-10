// lucia.ts
import { lucia } from "lucia";
import { nextjs_future, web } from "lucia/middleware";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import { sqlite } from "@/db/client";
import { discord } from "@lucia-auth/oauth/providers";
import { env } from "@/env.mjs";

// expect error (see next section)
export const auth = lucia({
  env: "DEV", // "PROD" if deployed to HTTPS,
  //   middleware: web(),
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: betterSqlite3(sqlite, {
    key: "user_key",
    session: "user_session",
    user: "user",
  }),

  getUserAttributes(databaseUser) {
    return {
      discordUsername: databaseUser.username,
      email: databaseUser.email,
    };
  },
});

export const discordAuth = discord(auth, {
  clientId: env.DISCORD_ID,
  clientSecret: env.DISCORD_SECRET,
  redirectUri: "http://localhost:3000/login/discord/callback",
  scope: ["identify", "email"],
});

export type Auth = typeof auth;
