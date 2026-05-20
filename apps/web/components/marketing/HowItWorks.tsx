const STEPS = [
  {
    n: "01",
    title: "Connect your CRM",
    body: "One-click integration with CDK, Reynolds, VinSolutions, DealerSocket, or Elead. We forward your existing line — no number changes, no porting.",
    icon: (
      <path
        d="M9 7H5a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L9 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    n: "02",
    title: "Agent answers + qualifies",
    body: "Within one ring, AgentDynamics greets the caller, listens, asks the right questions, checks your live inventory, and handles trade-in valuation.",
    icon: (
      <path
        d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.7 2.8a2 2 0 01-.45 1.95L7.91 11a16 16 0 006.09 6.09l1.735-1.56a2 2 0 011.95-.45l2.8.7A2 2 0 0122 17.72V20a2 2 0 01-2 2A18 18 0 013 5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    n: "03",
    title: "Appointment hits your calendar",
    body: "Booked test drives sync to your CRM and your team's calendar. The next morning, salespeople get a summary with VIN, trade, and budget — ready to close.",
    icon: (
      <path
        d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm4 9h6m-6 4h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-white py-20 sm:py-24">
      <div className="ad-section">
        <div className="mx-auto max-w-3xl text-center">
          <p className="ad-eyebrow">How it works</p>
          <h2 className="ad-h2 mt-3">Live in your store in three steps.</h2>
          <p className="ad-subtle mt-4">
            No new phone systems. No new app for your team to learn. Most
            dealers are taking real calls within 14 days.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="relative ad-card p-7 transition-shadow hover:shadow-card"
            >
              <span
                aria-hidden
                className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-900 text-cyan-300"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {step.icon}
                </svg>
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-cyan-600">
                  {step.n}
                </span>
                <h3 className="text-lg font-semibold text-navy-900">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate">{step.body}</p>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 translate-x-3 bg-navy-100 md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
