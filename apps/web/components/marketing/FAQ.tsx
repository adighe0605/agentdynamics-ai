"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Will callers know they're speaking to AI?",
    a: "Yes — disclosure is part of the greeting and configurable to match your state's regulations. In our research, fewer than 4% of callers ask to speak to a human once the agent is helping them. Hand-off is always one word away.",
  },
  {
    q: "Is this TCPA, FTC, and state-law compliant?",
    a: "Yes. AgentDynamics captures consent on every recorded call, honors do-not-call lists, supports two-party-consent states, and produces an audit log per call. We have signed DPAs with all major dealer groups we serve.",
  },
  {
    q: "How long does onboarding take?",
    a: "Most dealers are live in 8–14 days. We forward your existing number, mirror your inventory and CRM, train on your real call recordings, and pilot quietly before any caller hears the agent.",
  },
  {
    q: "What if the agent doesn't know the answer?",
    a: "It hands off immediately — to a live BDC rep during business hours, or back to your voicemail tree after hours with a written summary so the next rep can call back informed. We instrument every escalation so the agent improves weekly.",
  },
  {
    q: "Does this replace my BDC?",
    a: "No. AgentDynamics handles after-hours and overflow volume that your BDC physically can't reach. During the day, it handles overflow and lets reps focus on hot, high-intent leads — typically a 40% productivity gain on the existing team.",
  },
  {
    q: "Which CRMs and DMS systems do you integrate with?",
    a: "Out of the box: CDK, Reynolds & Reynolds, VinSolutions, DealerSocket, Elead, Salesforce Automotive, plus Google Calendar and Outlook. Anything else, we build during onboarding at no charge.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="ad-section">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="ad-eyebrow">FAQ</p>
            <h2 className="ad-h2 mt-3">Answers to the GM questions.</h2>
            <p className="ad-subtle mt-4">
              Still not sure? We'll walk through your last 30 days of after-hours call logs on the demo.
            </p>
            <a href="#demo" className="ad-btn-primary mt-6">
              Talk to a human
            </a>
          </div>

          <ul className="divide-y divide-navy-100 border-y border-navy-100">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left transition-colors hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
                  >
                    <span className="text-base font-semibold text-navy-900">
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy-200 transition-transform ${
                        isOpen ? "rotate-45 bg-cyan-500 text-white border-cyan-500" : "text-navy-700"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                      isOpen ? "max-h-64" : "max-h-0"
                    }`}
                  >
                    <p className="pb-5 pr-10 text-sm leading-relaxed text-slate">
                      {item.a}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
