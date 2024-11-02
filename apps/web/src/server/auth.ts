import { client } from "@/lib/hono";
import { cookies } from "next/headers";
import { cache } from "react";

export const getPageSession = cache(async () => {
    const auth_session = (await cookies()).get("auth_session");
    try {
        const authData = await client.auth.validate.$get({}, {
            // lol, there's gotta be a better way...
            headers: {
                Cookie: auth_session ? `auth_session=${auth_session.value}` : "",
            }
        })
        if (authData.ok) {
            const { session, user } = await authData.json()
            try {
                if (session) (await cookies()).set("auth_session", session.id)
                else (await cookies()).delete("auth_session")
            } catch (e) {
                console.error(e);
            }
            return {
                session,
                user
            }
        }
    } catch {
    }
    return {
        session: null,
        user: null
    }
})
