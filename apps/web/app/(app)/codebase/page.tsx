const REPO = "https://github.com/adighe0605/agentdynamics-ai";
const BRANCH = "main";

function gh(path: string): string {
  return `${REPO}/blob/${BRANCH}/${path}`;
}

const STACK: Array<{ layer: string; tech: string }> = [
  { layer: "Web",       tech: "Next.js 15 · App Router · TypeScript · Tailwind · Recharts · Framer Motion" },
  { layer: "Mobile",    tech: "Expo Router · React Native · NativeWind · Reanimated" },
  { layer: "Backend",   tech: "Next.js Route Handlers · Edge SSE for AI streaming · Prisma (Postgres)" },
  { layer: "Database",  tech: "Supabase Postgres · Prisma migrations" },
  { layer: "AI",        tech: "Gemini 1.5 Flash (free tier) via SSE · provider-agnostic SSE contract" },
  { layer: "Hosting",   tech: "Vercel (web + APIs) · Expo EAS (mobile) · Supabase (DB)" },
  { layer: "Shared",    tech: "pnpm + turborepo · @agentdynamics/ui (tokens) · @agentdynamics/types" },
];

const KEY_FILES: Array<{ path: string; label: string; note: string }> = [
  { path: "apps/web/components/DashboardView.tsx", label: "Dashboard view", note: "KPIs + Recharts line/pie charts + period selector" },
  { path: "apps/web/components/Sidebar.tsx",        label: "Desktop sidebar", note: "lg+ navigation" },
  { path: "apps/web/components/MobileNav.tsx",      label: "Mobile nav",      note: "Bottom tab bar + more sheet (sub-lg)" },
  { path: "apps/web/components/Footer.tsx",         label: "Brand footer",    note: "Fixed navy strip with credit (desktop)" },
  { path: "apps/web/app/api/ai/chat/route.ts",      label: "AI chat route",   note: "Gemini streaming SSE; template fallback" },
  { path: "apps/web/app/(app)/live/page.tsx",       label: "Live calls page", note: "Live timer + transcript + barge-in" },
  { path: "apps/web/app/(app)/leads/[id]/page.tsx", label: "Lead detail",     note: "Full timeline view" },
  { path: "apps/web/app/(app)/appointments/page.tsx", label: "Appointments calendar", note: "Week view, color-coded" },
  { path: "apps/web/app/(app)/inventory/page.tsx",  label: "Inventory",       note: "Lot vehicles, status badges" },
  { path: "packages/ui/src/tokens.ts",              label: "Design tokens",   note: "Brand-aligned colors / typography / shadows" },
  { path: "packages/types/src/index.ts",            label: "Domain types",    note: "Lead / Call / Appointment / Vehicle / etc." },
  { path: "packages/types/src/mock.ts",             label: "Mock fixtures",   note: "Deterministic fixtures for web + mobile" },
  { path: "apps/backend/prisma/schema.prisma",      label: "Prisma schema",   note: "Dealerships, leads, calls, AI usage" },
  { path: "apps/mobile/app/_layout.tsx",            label: "Mobile root layout", note: "Expo Router stack + safe-area footer" },
];

const STATUS = [
  { area: "Monorepo + workspaces (pnpm + turbo)", state: "done" },
  { area: "Brand tokens, Tailwind preset (shared web ↔ mobile)", state: "done" },
  { area: "Dashboard (KPIs, line + pie charts, period selector)", state: "done" },
  { area: "Mobile-friendly nav (bottom tabs + more sheet, sticky top brand bar)", state: "done" },
  { area: "Leads list + clickable lead detail timeline", state: "done" },
  { area: "Live calls panel (ticking timer, transcript, barge-in)", state: "done" },
  { area: "Call history + AI handoff summaries", state: "done" },
  { area: "Appointments week calendar", state: "done" },
  { area: "Inventory list (lot vehicles, status badges)", state: "done" },
  { area: "AI Assistant — Gemini streaming with template fallback", state: "done (free Gemini key activates real LLM)" },
  { area: "Prisma schema + seed", state: "done" },
  { area: "Mobile shell: sign-in + Overview / Leads / Calls tabs", state: "done" },
  { area: "Real auth (Google / Microsoft / Apple / magic link)", state: "stub — UI only" },
  { area: "AgentDynamics core telephony integration", state: "not wired" },
  { area: "Push notifications", state: "not wired" },
] as const;

function stateBadge(state: string): string {
  if (state.startsWith("done")) return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  if (state.startsWith("stub")) return "bg-amber-50 text-amber-700 ring-amber-100";
  return "bg-slate-100 text-slate-600 ring-slate-200";
}

export default function CodebasePage() {
  return (
    <main className="p-4 pb-24 sm:p-6 lg:pb-20">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
            Codebase
          </h1>
          <p className="mt-1 text-xs text-slate sm:text-sm">
            Full source on GitHub. Developed by{" "}
            <span className="font-semibold text-navy-800">Akshay Dighe</span>.
          </p>
        </div>
        <a
          href={REPO}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-navy-800"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.97-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.2.67.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          View on GitHub
        </a>
      </header>

      <section className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-navy-900">Stack</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {STACK.map((s) => (
              <li key={s.layer} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
                <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-cyan-600">
                  {s.layer}
                </span>
                <span className="text-navy-800">{s.tech}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-navy-900">Key files</h2>
          <p className="mt-1 text-xs text-slate">Click any row to open the file on GitHub.</p>
          <ul className="mt-3 divide-y divide-navy-100">
            {KEY_FILES.map((f) => (
              <li key={f.path}>
                <a
                  href={gh(f.path)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start justify-between gap-3 py-2.5 transition hover:bg-cloud"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-navy-900">{f.label}</p>
                    <p className="truncate font-mono text-[11px] text-slate">{f.path}</p>
                  </div>
                  <span className="shrink-0 text-xs text-cyan-600">{f.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-5 rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
        <h2 className="text-base font-semibold text-navy-900">Status</h2>
        <ul className="mt-3 divide-y divide-navy-100">
          {STATUS.map((row) => (
            <li key={row.area} className="flex items-start justify-between gap-3 py-2.5">
              <span className="text-sm text-navy-800">{row.area}</span>
              <span className={`shrink-0 rounded-pill px-2.5 py-1 text-[11px] font-medium ring-1 ${stateBadge(row.state)}`}>
                {row.state}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-navy-900">Local development</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-cloud p-3 text-xs leading-relaxed text-navy-800 font-mono">
{`git clone ${REPO}
cd agentdynamics-ai
pnpm install
cp .env.example .env.local

# Web (http://localhost:3000)
pnpm dev:web

# Mobile (Expo Go / iOS / Android)
pnpm dev:mobile`}
          </pre>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-navy-900">Docs</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={gh("README.md")} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline">
                README.md — overview + what&apos;s done vs. stubbed
              </a>
            </li>
            <li>
              <a href={gh("docs/ARCHITECTURE.md")} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline">
                docs/ARCHITECTURE.md — system design
              </a>
            </li>
            <li>
              <a href={gh("docs/DEPLOYMENT.md")} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline">
                docs/DEPLOYMENT.md — Vercel + Supabase + EAS
              </a>
            </li>
            <li>
              <a href={gh("docs/OWNER_HANDOFF.md")} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline">
                docs/OWNER_HANDOFF.md — owner setup + bus-factor
              </a>
            </li>
            <li>
              <a href={gh("docs/MOBILE_SETUP.md")} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline">
                docs/MOBILE_SETUP.md — Expo + EAS setup
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
