
// lucia.ts
import { Lucia } from "lucia";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";

export function initializeLucia(D1: D1Database) {
    const adapter = new D1Adapter(D1, {
        user: "tspdt_user",
        session: "tspdt_session"
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
                // discordId: attributes.discord_id,
                username: attributes.username,
                email: attributes.email
            };
        }
    });
}

interface DatabaseUserAttributes {
    // discord_id: number;
    email: string;
    username: string;
}

declare module "lucia" {
    interface Register {
        Auth: ReturnType<typeof initializeLucia>;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}


