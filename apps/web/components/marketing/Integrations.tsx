const INTEGRATIONS = [
  { name: "CDK Global", category: "DMS" },
  { name: "Reynolds & Reynolds", category: "DMS" },
  { name: "VinSolutions", category: "CRM" },
  { name: "DealerSocket", category: "CRM" },
  { name: "Elead CRM", category: "CRM" },
  { name: "Google Calendar", category: "Scheduling" },
  { name: "Outlook 365", category: "Scheduling" },
  { name: "Twilio", category: "Telephony" },
  { name: "Salesforce Automotive", category: "CRM" },
  { name: "AutoTrader", category: "Inventory" },
  { name: "Cars.com", category: "Inventory" },
  { name: "Slack", category: "Notifications" },
];

export function Integrations() {
  return (
    <section id="integrations" className="py-20 sm:py-24">
      <div className="ad-section">
        <div className="mx-auto max-w-3xl text-center">
          <p className="ad-eyebrow">Integrations</p>
          <h2 className="ad-h2 mt-3">Works with the tools you already use.</h2>
          <p className="ad-subtle mt-4">
            Drop AgentDynamics in front of your existing stack. No rip-and-replace.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {INTEGRATIONS.map((item) => (
            <li
              key={item.name}
              className="group flex items-center gap-3 rounded-lg border border-navy-100 bg-white p-4 transition-colors hover:border-cyan-200"
            >
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cyan-50 text-cyan-700 transition-colors group-hover:bg-cyan-100"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-navy-900">
                  {item.name}
                </div>
                <div className="text-xs text-slate">{item.category}</div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-slate">
          Don't see yours?{" "}
          <a
            href="#demo"
            className="font-semibold text-cyan-700 underline-offset-4 hover:underline"
          >
            We'll build the integration during onboarding.
          </a>
        </p>
      </div>
    </section>
  );
}
