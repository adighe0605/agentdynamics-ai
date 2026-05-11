# Owner Handoff

This document covers everything the AgentDynamics.ai owner needs to fully own the codebase and infrastructure — independently of the original developer.

## Accounts the owner must own (not the developer)

| Service | Owner action |
|---------|--------------|
| GitHub Organization | Create `agentdynamics` org. Move repo here. Grant developer "Maintain" — not "Owner". |
| Vercel | Create team on owner's email. Invite developer as Member. |
| Supabase | Create project on owner's email. Add developer as Developer role. |
| Expo / EAS | `eas.json` should point at owner's Expo account. Developer added as collaborator. |
| Apple Developer Program | Owner pays for account ($99/yr) and owns the bundle ID `ai.agentdynamics.app`. |
| Google Play Console | Owner pays one-time fee and owns the package `ai.agentdynamics.app`. |
| Domain registrar | Owner controls DNS for `agentdynamics.ai`. |
| Cloudflare / Route53 | Owner owns the zone. |
| API keys (OpenAI, Anthropic, etc.) | Owner creates the org account. Developer gets a scoped key. |

## Environment variable ownership

All production env vars live in Vercel's project settings and Supabase. **Do not commit production values to the repo.** The `.env.example` lists every variable; values are filled in by the owner via the Vercel/Supabase dashboards.

## Granting / revoking developer access

To onboard a new developer:

1. GitHub org → Invite → "Write" or "Maintain".
2. Vercel team → Invite → "Member".
3. Supabase → Invite → "Developer".
4. Share `.env.example` (already in repo) and let them populate `.env.local` from any test API keys *they* own.

To offboard a developer: revoke in those four places. No environment secret needs rotation as long as the developer never had production secrets in their possession.

## Cost ownership

| Service | Typical monthly cost at low traffic |
|---------|-------------------------------------|
| Vercel Pro | $20 per member |
| Supabase Pro | $25 (free tier works for <500MB) |
| Expo EAS | $0 free tier, $19 for production builds |
| Apple Developer | $99 / year |
| Google Play | $25 one-time |
| OpenAI / Anthropic | usage-based |

## Common owner operations

```bash
# Deploy a fix without involving the developer
git pull && pnpm install && pnpm build && git push   # triggers Vercel auto-deploy

# Roll back the web app
# Vercel → Deployments → previous green deploy → "Promote to Production"

# Update environment variables
# Vercel → Project → Settings → Environment Variables (no code change needed)

# Scale the database
# Supabase → Project → Settings → Compute → upgrade instance
```

## Bus-factor checklist

- [ ] Repo is in the org, not a personal account.
- [ ] All production env vars are in the Vercel/Supabase dashboards — never only in the developer's machine.
- [ ] Apple bundle ID and Google package are registered under the owner's accounts.
- [ ] EAS project is on the owner's Expo account.
- [ ] Domain DNS is in the owner's registrar.
- [ ] At least two human owners exist on the GitHub org and the Vercel team.
