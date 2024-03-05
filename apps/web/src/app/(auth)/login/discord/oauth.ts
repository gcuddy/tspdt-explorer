import { Discord } from "arctic";

export const discord = new Discord(process.env.DISCORD_ID as string, process.env.DISCORD_SECRET as string, "http://localhost:3000/login/discord/callback");
