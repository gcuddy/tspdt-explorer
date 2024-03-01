
// lucia.ts
import { Lucia } from "lucia";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";
import { Discord } from "arctic";

export function initializeLucia(D1: D1Database) {
    const adapter = new D1Adapter(D1, {
        user: "user",
        session: "session"
    });
    return new Lucia(adapter, {
        sessionCookie: {
            expires: false,
            attributes: {
                secure: process.env.NODE_ENV === "production"
            }
        },
        getUserAttributes: (attributes) => {
            return {
                // attributes has the type of DatabaseUserAttributes
                discordId: attributes.discord_id,
                username: attributes.username,
                email: attributes.email
            };
        }
    });
}

interface DatabaseUserAttributes {
    discord_id: number;
    email: string;
    username: string;
}

declare module "lucia" {
    interface Register {
        Auth: ReturnType<typeof initializeLucia>;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

export const discord = new Discord(process.env.DISCORD_ID as string, process.env.DISCORD_SECRET as string, "http://localhost:3000/login/discord/callback");

