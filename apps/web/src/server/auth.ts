import { client } from "@/lib/hono";
import { cookies } from "next/headers";
import { cache } from "react";

export const getPageSession = cache(async () => {
    const auth_session = cookies().get("auth_session");
    // lol, there's gotta be a better way...
    const authData = await client.auth.validate.$get({}, {
        headers: {
            Cookie: auth_session ? `auth_session=${auth_session.value}` : "",
        }
    }).then(res => res.json())
    if (authData) {
        const { session } = authData
        try {
            if (session) cookies().set("auth_session", session.id)
            else cookies().delete("auth_session")
        } catch (e) {
            console.error(e);
        }
    }
    return authData
})
