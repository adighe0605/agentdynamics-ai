"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const STAT_CARD_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.15 + i * 0.08, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section id="product" className="relative isolate overflow-hidden pb-20 pt-10 sm:pt-16">
      <div className="absolute inset-0 -z-10 bg-brand-glow" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] grid-bg" aria-hidden />

      <div className="ad-section">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="ad-pill bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              The AI Employee for automotive dealerships
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl lg:text-[56px]"
            >
              Book more test drives —{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-navy-700 bg-clip-text text-transparent">
                while your team sleeps.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
              className="mt-5 max-w-xl text-balance text-lg text-slate"
            >
              AgentDynamics answers every after-hours call, qualifies the lead,
              books the appointment on your service drive, and hands off to your
              team with a written summary. No scripts. No app downloads. No
              missed revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#demo" className="ad-btn-primary text-base">
                Book a 15-min demo
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <Link href="/dashboard" className="ad-btn-ghost text-base">
                See it work
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex items-center gap-2 text-sm text-slate"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Live in your store in under 14 days · TCPA compliant · Works with
              your existing CRM
            </motion.p>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[32px] bg-brand-card blur-2xl" aria-hidden />
            <HeroAgentCard />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={STAT_CARD_VARIANTS}
              custom={i}
              initial="hidden"
              animate="show"
              className="ad-card p-5"
            >
              <div className="text-3xl font-semibold tracking-tight text-navy-900">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-slate">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const HERO_STATS = [
  { value: "3.2×", label: "More appointments booked" },
  { value: "100%", label: "After-hours calls answered" },
  { value: "47s", label: "Average call qualification" },
  { value: "14 days", label: "From signup to live" },
];

function HeroAgentCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-navy-100 bg-navy-900 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 items-center justify-center">
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-success/70" aria-hidden />
            <span className="relative h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-white">
            Live call · After hours
          </span>
        </div>
        <span className="font-mono text-xs text-cyan-200">00:47</span>
      </div>

      <div className="space-y-3 p-5">
        <CallBubble side="caller" name="Maria · 2018 RAV4 buyer">
          Hi, I saw a 2024 Highlander on your site. Is it still available?
        </CallBubble>
        <CallBubble side="agent" name="AgentDynamics">
          It is — Pacific Blue, hybrid, 12 miles. I can hold it for you. Are
          you looking to trade in?
        </CallBubble>
        <CallBubble side="caller" name="Maria">
          Yes, a 2018 RAV4, around 64,000 miles.
        </CallBubble>
        <CallBubble side="agent" name="AgentDynamics" highlight>
          Got it. I have Saturday at 11am with Jordan, or Sunday at 2pm.
          Which works?
        </CallBubble>
      </div>

      <div className="border-t border-navy-100 bg-cloud px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 13l4 4L19 7"
                stroke="#006E8C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
              Appointment booked
            </div>
            <div className="mt-1 text-sm font-medium text-navy-900">
              Sat 11:00am · Jordan · 2024 Highlander Hybrid · Trade: 2018 RAV4
            </div>
            <div className="mt-1 text-xs text-slate">
              Synced to CRM · Notified Jordan via SMS · CSV summary attached
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CallBubble({
  side,
  name,
  highlight,
  children,
}: {
  side: "caller" | "agent";
  name: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  const isAgent = side === "agent";
  return (
    <div className={`flex gap-3 ${isAgent ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
          isAgent ? "bg-navy-900 text-white" : "bg-mist text-navy-700"
        }`}
        aria-hidden
      >
        {isAgent ? "AD" : "MA"}
      </div>
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm ${
          isAgent
            ? highlight
              ? "bg-cyan-500 text-white shadow-soft"
              : "bg-cyan-50 text-navy-900"
            : "bg-mist text-navy-900"
        }`}
      >
        <div
          className={`mb-0.5 text-[10px] font-semibold uppercase tracking-wider ${
            isAgent && highlight ? "text-cyan-50" : "text-slate"
          }`}
        >
          {name}
        </div>
        {children}
      </div>
    </div>
  );
}
