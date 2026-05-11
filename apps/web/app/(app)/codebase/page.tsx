const STACK = [
  { layer: "Web", tech: "Next.js 15 · App Router · TypeScript · Tailwind · Recharts · Framer Motion" },
  { layer: "Mobile", tech: "Expo Router · React Native · NativeWind · Reanimated" },
  { layer: "Backend", tech: "Next.js Route Handlers · Edge SSE for AI streaming · Prisma (Postgres)" },
  { layer: "Database", tech: "Supabase Postgres · Prisma migrations" },
  { layer: "Hosting", tech: "Vercel (web + APIs) · Expo EAS (mobile builds) · Supabase (DB)" },
  { layer: "Shared", tech: "pnpm + turborepo · @agentdynamics/ui (tokens) · @agentdynamics/types" },
];

const TREE = `agentdynamics-app/
├── apps/
│   ├── web/           Next.js dashboard (this app)
│   ├── mobile/        Expo Router + NativeWind
│   └── backend/       Prisma schema + seed script
├── packages/
│   ├── ui/            Brand tokens + Tailwind preset
│   └── types/         Domain types + mock fixtures
├── .github/workflows/ CI: typecheck + lint + build
└── docs/              ARCHITECTURE, DEPLOYMENT, OWNER_HANDOFF, MOBILE_SETUP`;

const STATUS = [
  { area: "Monorepo + workspaces (pnpm + turbo)", state: "done" },
  { area: "Brand tokens, Tailwind preset (shared web ↔ mobile)", state: "done" },
  { area: "Dashboard (KPIs, line chart, pie chart, period selector)", state: "done" },
  { area: "Leads list + clickable lead detail timeline", state: "done" },
  { area: "Live calls panel (ticking timer, transcript, barge-in)", state: "done" },
  { area: "Call history + AI handoff summaries", state: "done" },
  { area: "Appointments week calendar", state: "done" },
  { area: "Inventory list (lot vehicles, status badges)", state: "done" },
  { area: "AI Assistant (streams /api/ai/handoff-summary)", state: "done (placeholder generator)" },
  { area: "Prisma schema (dealerships, leads, calls, appointments, campaigns, AI usage)", state: "done" },
  { area: "Mobile shell: sign-in + Overview / Leads / Calls tabs", state: "done" },
  { area: "Real auth (Google / Microsoft / Apple / magic link)", state: "stub — UI only" },
  { area: "AgentDynamics core telephony integration", state: "not wired" },
  { area: "Push notifications", state: "not wired" },
  { area: "OCR / file upload", state: "not started" },
] as const;

function stateBadge(state: string): string {
  if (state.startsWith("done")) return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  if (state.startsWith("stub")) return "bg-amber-50 text-amber-700 ring-amber-100";
  return "bg-slate-100 text-slate-600 ring-slate-200";
}

export default function CodebasePage() {
  return (
    <main className="p-6 pb-20">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-navy-900">Codebase</h1>
        <p className="mt-1 text-sm text-slate">
          What this app is built on, what&apos;s implemented, what&apos;s stubbed. Developed by{" "}
          <span className="font-semibold text-navy-800">Akshay Dighe</span>.
        </p>
      </header>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-navy-900">Stack</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {STACK.map((s) => (
              <li key={s.layer} className="flex items-start gap-3">
                <span className="mt-0.5 w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-cyan-600">
                  {s.layer}
                </span>
                <span className="text-navy-800">{s.tech}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-navy-900">Repo layout</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-cloud p-3 text-xs leading-relaxed text-navy-800 font-mono">
{TREE}
          </pre>
          <p className="mt-3 text-xs text-slate">
            Web + mobile share one source of truth for tokens, types, and mock fixtures — visual or
            schema drift requires deliberate edits.
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
        <h2 className="text-base font-semibold text-navy-900">Status</h2>
        <ul className="mt-3 divide-y divide-navy-100">
          {STATUS.map((row) => (
            <li key={row.area} className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-sm text-navy-800">{row.area}</span>
              <span className={`shrink-0 rounded-pill px-2.5 py-1 text-[11px] font-medium ring-1 ${stateBadge(row.state)}`}>
                {row.state}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-navy-900">Local development</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-cloud p-3 text-xs leading-relaxed text-navy-800 font-mono">
{`pnpm install
cp .env.example .env.local

# Web (http://localhost:3000)
pnpm dev:web

# Mobile (Expo Go / iOS sim / Android)
pnpm dev:mobile

# Database (once DATABASE_URL is set)
pnpm db:generate
pnpm db:migrate
pnpm db:seed`}
          </pre>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-soft">
          <h2 className="text-base font-semibold text-navy-900">Deployment</h2>
          <ul className="mt-3 space-y-2 text-sm text-navy-800">
            <li><span className="font-semibold">Web:</span> Vercel auto-deploys on push to <code className="rounded bg-mist px-1 text-xs">main</code>. Preview URLs for every PR.</li>
            <li><span className="font-semibold">Mobile:</span> Expo EAS builds for iOS + Android. Submit via <code className="rounded bg-mist px-1 text-xs">eas submit</code>.</li>
            <li><span className="font-semibold">Database:</span> Supabase. Migrations live in <code className="rounded bg-mist px-1 text-xs">apps/backend/prisma/migrations/</code>.</li>
            <li><span className="font-semibold">Rollback:</span> Vercel → Deployments → previous deploy → "Promote to Production".</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
