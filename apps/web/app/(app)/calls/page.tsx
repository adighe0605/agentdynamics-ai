import { mockCalls } from "@agentdynamics/types/mock";

function fmtDuration(seconds?: number): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

const outcomeStyle: Record<string, string> = {
  appointment_booked: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  qualified: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100",
  handoff_requested: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  voicemail: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  spam: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
  no_answer: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

export default function CallsPage() {
  return (
    <main className="p-6 pb-20">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-navy-900">Call History</h1>
        <p className="mt-1 text-sm text-slate">Last 24 hours.</p>
      </header>

      <section className="mt-6 space-y-4">
        {mockCalls.map((call) => (
          <article key={call.id} className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
            <header className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate">
                  {call.channel} · {call.direction}
                </p>
                <p className="mt-0.5 text-sm font-medium text-navy-900">
                  {new Date(call.startedAt).toLocaleString()} · {fmtDuration(call.durationSeconds)}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-medium ${outcomeStyle[call.outcome] ?? ""}`}>
                {call.outcome.replace(/_/g, " ")}
              </span>
            </header>

            {call.summary ? (
              <p className="mt-3 text-sm text-navy-800">{call.summary}</p>
            ) : null}

            {call.transcript ? (
              <ol className="mt-4 space-y-2 border-l-2 border-cyan-100 pl-4">
                {call.transcript.map((turn, i) => (
                  <li key={i} className="text-sm">
                    <span
                      className={`mr-2 inline-block text-xs font-semibold uppercase ${
                        turn.speaker === "ai"
                          ? "text-cyan-600"
                          : turn.speaker === "human_agent"
                          ? "text-amber-700"
                          : "text-navy-700"
                      }`}
                    >
                      {turn.speaker === "ai" ? "AI" : turn.speaker === "human_agent" ? "Agent" : "Caller"}
                    </span>
                    <span className="text-navy-900">{turn.text}</span>
                  </li>
                ))}
              </ol>
            ) : null}
          </article>
        ))}
      </section>
    </main>
  );
}
