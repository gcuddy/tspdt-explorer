import { discord } from "@/core/auth/oauth";
import { generateState } from "arctic";
import * as context from "next/headers";


export const GET = async () => {
    const state = generateState();
    const url = await discord.createAuthorizationURL(state, {
        scopes: ["identify", "email"],
    });

    // store state
    context.cookies().set("discord_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
    });

    return Response.redirect(url);
};
