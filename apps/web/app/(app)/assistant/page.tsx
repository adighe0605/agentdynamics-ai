"use client";

import { useRef, useState } from "react";
import { mockCalls } from "@agentdynamics/types/mock";

type ChatMsg = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "Summarize my hottest lead this week",
  "Draft a follow-up SMS to Marcus Hill",
  "Which test drives are still unconfirmed?",
  "How did Spring Service Reminders perform?",
];

/**
 * Reads the SSE stream emitted by /api/ai/handoff-summary. The route is
 * provider-agnostic — currently a placeholder generator, drop-in replaceable
 * with the Anthropic or OpenAI streaming SDK once an API key is set.
 */
async function streamSummary(
  transcript: Array<{ speaker: string; text: string }>,
  onDelta: (chunk: string) => void
): Promise<void> {
  const res = await fetch("/api/ai/handoff-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
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
        "Hi! I'm your AgentDynamics assistant. Ask me about leads, calls, or appointments — I can also draft follow-ups for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function send(text?: string) {
    const prompt = (text ?? input).trim();
    if (!prompt || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: prompt }]);
    setBusy(true);

    // Compose a fake transcript so the existing SSE route has something to chew on.
    const transcript = [
      { speaker: "customer", text: prompt },
      ...(mockCalls[0]?.transcript ?? []),
    ];

    let assistantText = "";
    setMessages((m) => [...m, { role: "assistant", text: "" }]);

    try {
      await streamSummary(transcript, (chunk) => {
        assistantText += chunk;
        setMessages((m) => {
          const next = [...m];
          next[next.length - 1] = { role: "assistant", text: assistantText };
          return next;
        });
      });
    } catch {
      setMessages((m) => {
        const next = [...m];
        next[next.length - 1] = {
          role: "assistant",
          text: "Sorry — the assistant stream failed. Check the /api/ai/handoff-summary route.",
        };
        return next;
      });
    } finally {
      setBusy(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  return (
    <main className="flex h-screen flex-col p-6 pb-20">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-navy-900">AI Assistant</h1>
        <p className="mt-1 text-sm text-slate">
          Streams from <code className="rounded bg-mist px-1 text-xs">/api/ai/handoff-summary</code>.
          Swap the placeholder generator for Anthropic / OpenAI to make it real.
        </p>
      </header>

      <section className="mt-6 flex min-h-0 flex-1 flex-col gap-3 rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
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
