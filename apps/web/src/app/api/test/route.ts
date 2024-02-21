import { cookies } from "next/headers";
import { AsyncLocalStorage } from "async_hooks";
import { db } from "@/db/client";
import { movies } from "@/db/schema";
import { sql } from "drizzle-orm";
export const storage = new AsyncLocalStorage();

export async function GET(request: Request) {
  const c = cookies();
  const userID = c.get("userID");

  storage.run({ userID: userID?.value }, () => {
    push();
  });

  const value = await db
    .select({
      id: sql`'userMovie/' || ${movies.id}`,
    })
    .from(movies)
    .limit(5);

  return new Response(JSON.stringify(value));
}

async function push() {
  // simulate push

  const store = storage.getStore();

  console.log({ store });
}
