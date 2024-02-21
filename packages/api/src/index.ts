import { Ai } from "@cloudflare/ai";
import { Hono } from "hono";

type Bindings = {
  AI: any;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
  const ai = new Ai(c.env.AI);
  const answer = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
    messages: [{ role: "user", content: `What is the square root of 9?` }],
  });

  return c.json(answer);
});

export default app;
