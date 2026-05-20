"use client";

import { useEffect, useState } from "react";
import { mockLiveCalls } from "@agentdynamics/types/mock";
import type { LiveCall } from "@agentdynamics/types";

function fmtElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function LiveCallCard({ call }: { call: LiveCall }) {
  const [elapsed, setElapsed] = useState(
    Math.floor((Date.now() - new Date(call.startedAt).getTime()) / 1000)
  );

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <article className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-rose-600">
              Live
            </span>
            <span className="font-mono text-xs text-slate">{fmtElapsed(elapsed)}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-navy-900">{call.leadName}</h3>
          <p className="text-xs text-slate">{call.phone}</p>
          {call.vehicleInterest ? (
            <p className="mt-1 text-sm text-navy-800">{call.vehicleInterest}</p>
          ) : null}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-pill bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
            AI confidence {Math.round(call.aiConfidence * 100)}%
          </span>
          <button
            type="button"
            className="cursor-pointer rounded-md bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          >
            Barge in
          </button>
        </div>
      </header>

      <div className="mt-4 max-h-64 overflow-y-auto rounded-lg border border-navy-100 bg-cloud p-3">
        <ol className="space-y-2">
          {call.liveTranscript.map((turn, i) => (
            <li key={i} className="text-sm">
              <span
                className={`mr-2 inline-block text-[10px] font-semibold uppercase ${
                  turn.speaker === "ai" ? "text-cyan-600" : "text-navy-700"
                }`}
              >
                {turn.speaker === "ai" ? "AI" : "Caller"}
              </span>
              <span className="text-navy-900">{turn.text}</span>
            </li>
          ))}
          <li className="flex items-center gap-1.5 pt-1 text-xs text-slate">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" aria-hidden />
            <span>typing…</span>
          </li>
        </ol>
      </div>
    </article>
  );
}

export function LiveView() {
  return (
    <main className="p-6 pb-20">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-navy-900">Live Calls</h1>
        <p className="mt-1 text-sm text-slate">
          {mockLiveCalls.length} call{mockLiveCalls.length === 1 ? "" : "s"} in progress right now.
        </p>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {mockLiveCalls.map((c) => (
          <LiveCallCard key={c.id} call={c} />
        ))}
      </section>
    </main>
  );
}
