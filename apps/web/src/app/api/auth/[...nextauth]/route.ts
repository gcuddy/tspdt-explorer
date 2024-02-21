import { env } from "@/env.mjs";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_ID,
      clientSecret: env.DISCORD_SECRET,
      authorization: {
        params: {
          scope: "identify",
        },
      },
    }),
    // ...add more providers here
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
