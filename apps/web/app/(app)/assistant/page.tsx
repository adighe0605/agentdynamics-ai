"use client";

import { useEffect, useRef, useState } from "react";

type ChatMsg = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "Show my hottest leads",
  "Draft a follow-up SMS to Marcus Hill",
  "Which appointments are still unconfirmed?",
  "Do we have any RAV4 Hybrid in stock?",
];

async function streamChat(
  messages: ChatMsg[],
  onDelta: (chunk: string) => void
): Promise<void> {
  const res = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";
    for (const ev of events) {
      const data = ev.replace(/^data: /, "").trim();
      if (data === "[DONE]") return;
      if (!data) continue;
      try {
        const parsed = JSON.parse(data);
        if (typeof parsed.delta === "string") onDelta(parsed.delta);
      } catch {
        // ignore malformed chunk
      }
    }
  }
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      text:
        "Hi! I'm your AgentDynamics assistant. I can look at your leads, calls, appointments, and inventory — and draft follow-ups for you. What do you need?",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text?: string) {
    const prompt = (text ?? input).trim();
    if (!prompt || busy) return;
    setInput("");
    const next: ChatMsg[] = [...messages, { role: "user", text: prompt }];
    setMessages(next);
    setBusy(true);

    let assistantText = "";
    setMessages((m) => [...m, { role: "assistant", text: "" }]);

    try {
      await streamChat(next, (chunk) => {
        assistantText += chunk;
        setMessages((m) => {
          const arr = [...m];
          arr[arr.length - 1] = { role: "assistant", text: assistantText };
          return arr;
        });
      });
    } catch {
      setMessages((m) => {
        const arr = [...m];
        arr[arr.length - 1] = {
          role: "assistant",
          text: "Sorry — the assistant stream failed. Check the /api/ai/chat route.",
        };
        return arr;
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex h-[calc(100vh-3.5rem)] flex-col p-4 sm:p-6 lg:h-screen lg:pb-20">
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
          AI Assistant
        </h1>
        <p className="mt-1 text-xs text-slate sm:text-sm">
          Powered by Gemini when <code className="rounded bg-mist px-1 text-[11px]">GEMINI_API_KEY</code> is set on Vercel.
          Falls back to a smart template otherwise.
        </p>
      </header>

      <section className="mt-4 flex min-h-0 flex-1 flex-col gap-3 rounded-xl border border-navy-100 bg-white p-3 shadow-soft sm:p-5">
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[88%] whitespace-pre-wrap rounded-xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[80%] ${
                m.role === "user"
                  ? "ml-auto bg-navy-900 text-white"
                  : "bg-mist text-navy-900"
              }`}
            >
              {m.text || (
                <span className="inline-flex items-center gap-1 text-slate">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" /> thinking…
                </span>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={busy}
              className="rounded-pill border border-navy-100 bg-white px-3 py-1.5 text-xs text-navy-700 hover:bg-mist disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a lead, draft a follow-up, or summarize today…"
            className="flex-1 rounded-md border border-navy-100 bg-cloud px-3 py-2 text-sm text-navy-900 outline-none placeholder:text-slate focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
            disabled={busy}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-cyan-600 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
}
