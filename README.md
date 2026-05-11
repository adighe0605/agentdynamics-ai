# AgentDynamics — Web + Mobile

Official mobile and web extension of [AgentDynamics.ai](https://agentdynamics.ai) — the AI Employee for automotive dealerships.

> **Honest status:** this is a **foundation slice**, not a finished product. The monorepo, design system, screens, schema, and API contracts are real and functional. Auth, real telephony integration, AI provider wiring, and production hardening are scaffolded but not implemented. See [What's done vs. stubbed](#whats-done-vs-stubbed) below.

Developed by **Akshay Dighe**.

---

## What this app is

A mobile-first companion for dealership staff:

- **Overview** — live counters for calls handled, leads created, appointments booked, handoffs requested.
- **Leads** — sorted inbox with vehicle interest, AI lead score, status pills.
- **Calls** — call timeline with AI-generated handoff summaries and transcripts.

The product mirrors the actual AgentDynamics positioning: a 24/7 AI employee that answers calls, qualifies leads, books appointments, and hands off to humans with summaries.

## What this app is *not*

Not a generic multi-agent workflow / AI workspace platform. The original prompt asked for that, but it conflicts with what AgentDynamics actually sells. Built to match the real product.

---

## Monorepo layout

```
agentdynamics-app/
├── apps/
│   ├── web/          Next.js 15 dashboard (App Router, Tailwind, Framer Motion)
│   ├── mobile/       Expo Router + NativeWind, iOS + Android + web
│   └── backend/      Prisma schema + client, seed script
├── packages/
│   ├── ui/           Design tokens + shared Tailwind preset (brand source of truth)
│   └── types/        Shared domain types + mock data fixtures
├── .github/workflows/  CI (typecheck + lint + build)
└── docs/             ARCHITECTURE, OWNER_HANDOFF, DEPLOYMENT, MOBILE_SETUP
```

## Brand

Colors, gradients, typography, radii, shadows extracted from agentdynamics.ai and centralized in [packages/ui/src/tokens.ts](packages/ui/src/tokens.ts). Both Tailwind (web) and NativeWind (mobile) consume the same preset, so visual drift is structurally prevented.

- Primary text / surfaces: `navy-900` (#061428)
- Accent: `cyan-500` (#00B5E2)
- Background: `cloud` (#F8FAFC) / `white`
- Light mode dominant, matching the parent brand

## Local development

Requires Node 20+ and pnpm 9+.

```bash
pnpm install
cp .env.example .env.local

# Web dashboard (http://localhost:3000)
pnpm dev:web

# Mobile (Expo Go / iOS sim / Android emulator)
pnpm dev:mobile

# Database (once DATABASE_URL is set)
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## What's done vs stubbed

| Area | Status |
|------|--------|
| Monorepo + workspace wiring (pnpm + turbo) | ✅ done |
| Shared design tokens + Tailwind preset | ✅ done |
| Shared domain types + mock fixtures | ✅ done |
| Web: Overview, Leads, Calls pages | ✅ done, render real components |
| Mobile: Sign-in + tabs (Overview, Leads, Calls) | ✅ done, render real components |
| Fixed-bottom developer credit footer | ✅ done on web + mobile |
| Prisma schema (dealerships, leads, calls, appointments, campaigns, notifications, AI usage) | ✅ done |
| Web API routes (`/api/leads`, `/api/calls`) | ⚠️ return mock data — swap to Prisma when DB connected |
| Streaming AI route (`/api/ai/handoff-summary`) | ⚠️ correct SSE shape, placeholder generator. Swap for Anthropic/OpenAI |
| Auth (Google / Microsoft / Apple / magic link) | ❌ UI buttons only — Supabase Auth wiring required |
| Real telephony integration | ❌ requires AgentDynamics core API access |
| Push notifications | ❌ Expo notification config + APNs/FCM tokens required |
| Voice input / playback | ❌ not started |
| File upload / OCR | ❌ not started |
| Vercel deploy | ⚠️ vercel.json configured; first deploy requires you to link the project |
| App Store / Play Store builds | ⚠️ app.json configured; EAS submit requires owner credentials |

## See also

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- [docs/OWNER_HANDOFF.md](docs/OWNER_HANDOFF.md)
- [docs/MOBILE_SETUP.md](docs/MOBILE_SETUP.md)
