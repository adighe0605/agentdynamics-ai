# Architecture

## Overview

```
┌─────────────────────────┐      ┌─────────────────────────┐
│  apps/web (Next.js 15)  │      │  apps/mobile (Expo)     │
│  - App Router           │      │  - Expo Router          │
│  - Tailwind             │      │  - NativeWind           │
│  - Framer Motion        │      │  - Reanimated           │
└──────────┬──────────────┘      └────────────┬────────────┘
           │                                  │
           │       packages/ui (tokens, Tailwind preset)
           │       packages/types (domain + mocks)
           │                                  │
           └────────────┬─────────────────────┘
                        ▼
               apps/web/app/api/*  (Next.js Route Handlers)
                        │
                        ▼
              apps/backend (Prisma + Postgres)
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
        Supabase Postgres   AgentDynamics core
                            telephony API (TBD)
```

## Why this shape

- **Monorepo (pnpm + turbo)** keeps web and mobile honest. The same design tokens, the same types, the same mock fixtures. Visual or schema drift requires deliberate, visible edits.
- **packages/ui as a Tailwind preset** means both surfaces consume the brand through one source. There is no parallel CSS file to drift.
- **API routes live inside apps/web** (Vercel runs them at the edge or as serverless functions for free) instead of a separate Node service. Lower ops surface for a small team. If the AI streaming workload grows beyond Vercel's function limits, the AI route can be extracted to Railway/Render with zero contract changes (the SSE shape is provider-agnostic).
- **Prisma client lives in apps/backend** and is consumed by the API routes. Mobile never talks to Prisma directly — only via `/api/*` — so we can swap Postgres for anything later.

## Data flow

1. AgentDynamics core (existing telephony / AI employee infrastructure) writes call events to the AgentDynamics primary system.
2. A scheduled job (TBD) pulls call + lead deltas into our Postgres, or webhooks push them in real-time.
3. Web + mobile read via `/api/*` endpoints.
4. Push notifications fan out via Expo's notification service when high-value events land (`hot_lead`, `handoff_requested`).

## Authentication

Planned: Supabase Auth with Google / Microsoft / Apple providers + magic links. The mobile app stores the JWT via `expo-secure-store`; the web app uses an HTTP-only cookie. **Currently unimplemented** — the sign-in screen shows the button UI but does not authenticate.

## State management

- **Server state**: TanStack Query (web). The mobile app currently reads mock fixtures directly; the same TanStack Query setup will mirror once `/api/*` is wired.
- **Client state**: Zustand for ephemeral UI state (sidebar collapsed, filters, etc.).

## Streaming AI

`apps/web/app/api/ai/handoff-summary/route.ts` exposes the streaming contract (`text/event-stream`). The current implementation is a placeholder generator; swapping in `@anthropic-ai/sdk` or `openai` is a 10-line change. Keep this route in the edge runtime — it's much cheaper and faster for streaming.

## Future-safe extension points

- New screen → drop a file in `apps/web/app/<route>/page.tsx` and `apps/mobile/app/(tabs)/<route>.tsx`. Both inherit the design system automatically.
- New domain entity → add to `packages/types/src/index.ts`, then `apps/backend/prisma/schema.prisma`.
- New AI provider → implement the SSE generator in `apps/web/app/api/ai/<feature>/route.ts`. Frontend remains unchanged.
