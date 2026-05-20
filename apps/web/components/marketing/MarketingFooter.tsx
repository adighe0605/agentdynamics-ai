import Link from "next/link";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "AgentDynamics.ai", href: "https://agentdynamics.ai" },
      { label: "Contact sales", href: "#demo" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "ROI calculator", href: "#" },
      { label: "Security", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="bg-navy-900 text-navy-200">
      <div className="ad-section py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
              aria-label="AgentDynamics home"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3 L21 20 L15 20 L12 14 L9 20 L3 20 Z" fill="#FFFFFF" />
              </svg>
              <span className="text-base font-semibold tracking-tight">
                AgentDynamics
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-navy-300">
              The 24/7 AI employee for automotive dealerships. Built so no lead
              ever goes unanswered.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Badge>SOC 2 Type II</Badge>
              <Badge>TCPA Compliant</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-navy-200 transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-navy-700 pt-6 text-xs text-navy-300 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} AgentDynamics. Built for automotive dealerships.
          </span>
          <span>
            Developed by{" "}
            <span className="font-semibold text-white">Akshay Dighe</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-navy-700 bg-navy-800 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy-200">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"
          stroke="#67E8F9"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </span>
  );
}
