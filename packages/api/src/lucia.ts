
// lucia.ts
import { Lucia, TimeSpan } from "lucia";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";

export function nitializeLucia(D1: D1Database, appUrl: string) {
    const adapter = new D1Adapter(D1, {
        user: "tspdt_user",
        session: "tspdt_session"
    });
    const env = !appUrl || appUrl.startsWith('http:') ? 'DEV' : 'PROD';
    return new Lucia(adapter, {
        getUserAttributes: (attributes) => {
            return {
                // attributes has the type of DatabaseUserAttributes
                // discordId: attributes.discord_id,
                username: attributes.username,
                email: attributes.email
            };
        },
        sessionExpiresIn: new TimeSpan(365, 'd'),
        sessionCookie: {
            name: 'auth_session',
            expires: false,
            attributes: {
                secure: env === 'PROD',
                sameSite: 'lax' as const,
            },
        },

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


