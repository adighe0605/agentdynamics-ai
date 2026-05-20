"use client";

import { useState } from "react";

type Cadence = "monthly" | "annual";

const PLANS = [
  {
    name: "Starter",
    blurb: "For single-rooftop dealers testing AI lead handling.",
    monthly: 499,
    annual: 399,
    cta: "Start with Starter",
    features: [
      "Up to 500 inbound calls / month",
      "After-hours + lunch coverage",
      "1 CRM integration",
      "Email + chat support",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    blurb: "Most chosen by single & two-store dealer groups.",
    monthly: 1299,
    annual: 999,
    cta: "Book a demo",
    features: [
      "Up to 2,500 inbound calls / month",
      "24/7 coverage incl. overflow",
      "Unlimited CRM + DMS integrations",
      "Trade-in valuation + service drive booking",
      "Dedicated success manager",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    blurb: "Dealer groups, OEM programs, and custom voice models.",
    monthly: null,
    annual: null,
    cta: "Contact sales",
    features: [
      "Unlimited calls + multi-rooftop routing",
      "Custom voice + brand persona",
      "SOC2 / SSO / DPA",
      "Pilot-to-rollout playbook",
      "Quarterly business review",
    ],
    highlight: false,
  },
];

export function Pricing() {
  const [cadence, setCadence] = useState<Cadence>("annual");

  return (
    <section id="pricing" className="bg-cloud py-20 sm:py-24">
      <div className="ad-section">
        <div className="mx-auto max-w-3xl text-center">
          <p className="ad-eyebrow">Pricing</p>
          <h2 className="ad-h2 mt-3">Pays for itself on the first booked appointment.</h2>
          <p className="ad-subtle mt-4">
            Simple per-rooftop pricing. No per-call fees. Annual saves 20–25%.
          </p>

          <div
            role="tablist"
            aria-label="Billing cadence"
            className="mx-auto mt-8 inline-flex rounded-pill border border-navy-200 bg-white p-1"
          >
            {(["monthly", "annual"] as Cadence[]).map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cadence === c}
                onClick={() => setCadence(c)}
                className={`cursor-pointer rounded-pill px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 ${
                  cadence === c
                    ? "bg-navy-900 text-white"
                    : "text-navy-700 hover:bg-mist"
                }`}
              >
                {c === "monthly" ? "Monthly" : "Annual"}
                {c === "annual" && (
                  <span className="ml-2 rounded-pill bg-cyan-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-700">
                    Save 25%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => {
            const price =
              plan.monthly == null
                ? null
                : cadence === "monthly"
                ? plan.monthly
                : plan.annual;

            return (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-7 transition-shadow ${
                  plan.highlight
                    ? "border-2 border-cyan-500 bg-white shadow-elevated"
                    : "border border-navy-100 bg-white shadow-soft hover:shadow-card"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-cyan-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-soft">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-navy-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate">{plan.blurb}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  {price != null ? (
                    <>
                      <span className="text-5xl font-semibold tracking-tight text-navy-900">
                        ${price.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate">
                        /rooftop/mo{cadence === "annual" ? ", billed annually" : ""}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-semibold tracking-tight text-navy-900">
                      Let's talk
                    </span>
                  )}
                </div>

                <a
                  href="#demo"
                  className={`mt-6 w-full ${
                    plan.highlight ? "ad-btn-primary" : "ad-btn-dark"
                  }`}
                >
                  {plan.cta}
                </a>

                <ul className="mt-7 space-y-3 border-t border-navy-100 pt-6 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-navy-800">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mt-0.5 shrink-0 text-cyan-600"
                        aria-hidden
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-slate">
          All plans include free onboarding · 30-day money-back guarantee · No long-term contracts on Growth & below
        </p>
      </div>
    </section>
  );
}
