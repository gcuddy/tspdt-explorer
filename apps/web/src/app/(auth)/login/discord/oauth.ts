import { env } from "@/env.mjs";
import { Discord } from "arctic";

export const discord = new Discord(process.env.DISCORD_ID as string, process.env.DISCORD_SECRET as string,
    `${env.APP_URL}/login/discord/callback`);
