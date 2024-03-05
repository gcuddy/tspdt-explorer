import { discord } from "../oauth";
import { client } from "@/lib/hono";
import { cookies } from "next/headers";
import { parseCookies } from "oslo/cookie";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("discord_oauth_state")?.value ?? null;

    if (!storedState || !state || storedState !== state || !code) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await discord.validateAuthorizationCode(code);

        const discordUserResponse = await fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });

        const discordUser = await discordUserResponse.json<DiscordUser>();

        const res = await client.auth.oauth.$post({
            json: {
                providerId: "discord",
                providerUserId: discordUser.id,
                email: discordUser.email,
                username: discordUser.username
            }
        });

        // do i need to do something here? idk...
        // set cookies?

        const authCookie = res.headers.get("set-cookie");
        if (!authCookie) {
            return new Response(null, {
                status: 500,
            });
        }
        const parsed = parseCookies(authCookie);
        console.log({ parsed });

        for (const [name, value] of parsed) {
            cookies().set(name, value, {
                path: "/",
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                httpOnly: true,
                maxAge: 60 * 10
            });
        }

        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });


    } catch (e) {
        console.log('error!');
        console.error(e);
        // if (e instanceof OAuthRequestError) {
        //     // invalid code
        //     return new Response(null, {
        //         status: 400,
        //     });
        // }
        return new Response(null, {
            status: 500,
        });
    }
};

type DiscordUser = {
    id: string;
    username: string;
    email: string;
};
