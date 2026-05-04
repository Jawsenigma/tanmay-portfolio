"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { setFaviconState } from "@/lib/favicon-events";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "Walk me through Directly's voice coaching loop",
  "How do you control LLM inference cost in production?",
  "What's your CV pipeline for sub-150ms feedback?",
  "How does Shorten's 6-stage LLM pipeline work?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || streaming) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setStreaming(true);
    setFaviconState("chat", "thinking");
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `HTTP ${res.status}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: `⚠ ${msg}\n\n(If this is a fresh deploy, the GROQ_API_KEY env var may not be set.)`,
        };
        return copy;
      });
    } finally {
      setStreaming(false);
      setFaviconState("chat", "idle");
    }
  }

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40">
        {!open && (
          <>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border-2 border-accent attention-ring pointer-events-none"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border-2 border-accent attention-ring-delayed pointer-events-none"
            />
          </>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat"}
          className={`relative inline-flex items-center gap-2 rounded-full bg-accent text-accent-fg px-4 py-3 shadow-2xl hover:opacity-90 transition-opacity font-medium text-sm ${open ? "" : "attention-glow"}`}
        >
          {open ? (
            <X className="w-4 h-4" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Ask my portfolio
            </>
          )}
        </button>
      </div>

      {open && (
        <div className="fixed bottom-20 right-5 z-40 w-[min(380px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-7rem))] rounded-xl border border-border bg-bg-elev shadow-2xl flex flex-col overflow-hidden fade-up">
          <div className="px-4 py-3 border-b border-border bg-bg-elev-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-accent" />
            <div>
              <div className="text-sm font-medium">Ask Tanmay&apos;s portfolio</div>
              <div className="text-[11px] text-fg-muted font-mono">
                Trained on my work
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-fg-muted">
                  Ask anything about my work - projects, stack, decisions, latency targets.
                </p>
                <div className="space-y-1.5">
                  {SUGGESTED.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-sm rounded-md border border-border bg-bg px-3 py-2 hover:border-accent hover:text-accent transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-8 rounded-lg bg-bg-elev-2 border border-border px-3 py-2 text-sm whitespace-pre-wrap"
                    : "mr-8 rounded-lg bg-bg border border-border px-3 py-2 text-sm whitespace-pre-wrap"
                }
              >
                {m.content || (
                  <span className="inline-flex gap-1">
                    <span className="w-1 h-1 rounded-full bg-fg-muted animate-pulse" />
                    <span className="w-1 h-1 rounded-full bg-fg-muted animate-pulse" style={{ animationDelay: "0.15s" }} />
                    <span className="w-1 h-1 rounded-full bg-fg-muted animate-pulse" style={{ animationDelay: "0.3s" }} />
                  </span>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-border bg-bg-elev-2 p-2 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              disabled={streaming}
              className="flex-1 bg-bg border border-border rounded-md px-3 py-2 text-sm focus:border-accent outline-none"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="rounded-md bg-accent text-accent-fg px-3 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
