"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Turn = {
  side: "caller" | "agent";
  name: string;
  text: string;
};

const TURNS: Turn[] = [
  { side: "caller", name: "Caller · 8:42pm", text: "Hi, is the 2024 Highlander still available?" },
  { side: "agent", name: "AgentDynamics", text: "It is — Pacific Blue hybrid, 12 miles. May I get your name?" },
  { side: "caller", name: "Maria", text: "Maria Reyes. I'm coming from a 2018 RAV4." },
  { side: "agent", name: "AgentDynamics", text: "Got it. Mileage on the RAV4?" },
  { side: "caller", name: "Maria", text: "Around 64,000. Pretty clean." },
  { side: "agent", name: "AgentDynamics", text: "Based on KBB, your trade is around $14,800–$16,200. Want to schedule a drive this weekend?" },
  { side: "caller", name: "Maria", text: "Yes, Saturday morning works." },
  { side: "agent", name: "AgentDynamics", text: "Saturday at 11am with Jordan. I'll text the confirmation and route to your phone." },
];

export function AgentDemo() {
  const [visible, setVisible] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (visible >= TURNS.length) {
      const t = setTimeout(() => setVisible(1), 2400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible((v) => v + 1), 1400);
    return () => clearTimeout(t);
  }, [visible, paused]);

  return (
    <section id="demo" className="relative overflow-hidden bg-gradient-to-b from-cloud to-white py-20 sm:py-24">
      <div className="ad-section">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="ad-eyebrow">See it in action</p>
            <h2 className="ad-h2 mt-3">
              Every after-hours call, qualified and booked.
            </h2>
            <p className="ad-subtle mt-4">
              No scripts. No clunky IVR menus. The agent listens, checks
              inventory in real time, valuates trades, and books on your
              team's actual calendar.
            </p>

            <ul className="mt-8 space-y-3">
              {DEMO_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-100"
                    aria-hidden
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="#006E8C"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed text-navy-800">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#pricing" className="ad-btn-primary">See pricing</a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(1);
                  setPaused(false);
                }}
                className="ad-btn-ghost"
              >
                Replay demo
              </a>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="absolute -inset-6 -z-10 rounded-[32px] bg-cyan-100/50 blur-3xl" aria-hidden />
            <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
              <div className="flex items-center justify-between border-b border-navy-100 bg-navy-900 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
                  <span className="text-xs font-medium uppercase tracking-wider text-white">
                    Inbound call · Westgate Toyota
                  </span>
                </div>
                <span className="font-mono text-xs text-cyan-200">
                  {String(Math.min(visible * 6, 47)).padStart(2, "0")}:
                  {String((visible * 13) % 60).padStart(2, "0")}
                </span>
              </div>

              <div className="min-h-[360px] space-y-3 p-5">
                <AnimatePresence initial={false}>
                  {TURNS.slice(0, visible).map((turn, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`flex gap-3 ${
                        turn.side === "agent" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          turn.side === "agent"
                            ? "bg-navy-900 text-white"
                            : "bg-mist text-navy-700"
                        }`}
                        aria-hidden
                      >
                        {turn.side === "agent" ? "AD" : "MR"}
                      </div>
                      <div
                        className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm ${
                          turn.side === "agent"
                            ? "bg-cyan-50 text-navy-900"
                            : "bg-mist text-navy-900"
                        }`}
                      >
                        <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate">
                          {turn.name}
                        </div>
                        {turn.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="border-t border-navy-100 bg-cloud px-5 py-3 text-xs text-slate">
                Live transcript · Synced to CRM as it happens
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const DEMO_POINTS = [
  "Pulls real-time inventory by VIN, color, trim, and availability.",
  "Handles trade-in valuation using KBB / Black Book data.",
  "Books appointments directly on each salesperson's calendar.",
  "Hands off with a written summary so closers walk in informed.",
  "TCPA-compliant call recording and consent capture.",
];
