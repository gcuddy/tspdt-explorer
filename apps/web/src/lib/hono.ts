import { env } from "@/env.mjs";
import { hc } from "hono/client";
import type { AppType } from "tspdt-api/src/index";

export const client = hc<AppType>(env.API_URL, { fetch });
