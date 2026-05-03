import OpenAI from "openai";
import { SYSTEM_INSTRUCTIONS, PORTFOLIO_CONTEXT } from "@/lib/agent-context";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

type ClientMessage = { role: "user" | "assistant"; content: string };

const MAX_TURN_TOKENS = 700;
const MAX_HISTORY = 20;
const MODEL = "llama-3.3-70b-versatile";

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      "Chat is not configured. GROQ_API_KEY is missing on the server.",
      { status: 503 },
    );
  }

  let body: { messages?: ClientMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter(
      (m): m is ClientMessage =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY);

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response("Last message must be from the user", { status: 400 });
  }

  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const upstream = await client.chat.completions.create({
    model: MODEL,
    max_tokens: MAX_TURN_TOKENS,
    stream: true,
    messages: [
      {
        role: "system",
        content: `${SYSTEM_INSTRUCTIONS}\n\n${PORTFOLIO_CONTEXT}`,
      },
      ...messages,
    ],
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of upstream) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "stream error";
        controller.enqueue(encoder.encode(`\n\n⚠ ${msg}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
