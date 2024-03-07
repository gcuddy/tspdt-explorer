import { env } from "@/env.mjs";
import { getAuthHeaders } from "@/server/data-layer";
import { hc } from "hono/client";
import type { AppType } from "tspdt-api/src/index";

export const client = hc<AppType>(env.NEXT_PUBLIC_API_URL, { fetch });

export const createClient = async () => hc<AppType>(env.NEXT_PUBLIC_API_URL, { fetch, headers: await getAuthHeaders() });
