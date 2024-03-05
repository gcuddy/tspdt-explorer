// app/api/logout/route.ts
import { client } from "@/lib/hono";
import { getAuthHeaders } from "@/server/data-layer";


export const POST = async () => {
    const res = await client.auth.logout.$post({}, { headers: await getAuthHeaders() });
    if (res.ok) {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/", // redirect to login page
            },
        });
    }
};
