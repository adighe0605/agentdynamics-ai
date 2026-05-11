# Deployment

## Vercel (web)

The web app is the only thing Vercel deploys. The mobile app builds via EAS, the database lives on Supabase.

### One-time setup

1. `npm i -g vercel` and `vercel login` (or use the dashboard).
2. From repo root: `vercel link` — choose the team that owns AgentDynamics, name the project (suggested slug: `agentdynamics-app`). The default Vercel URL will be `<project-slug>-<team>.vercel.app`.
3. Set environment variables in the Vercel dashboard → Project → Settings → Environment Variables. Copy from `.env.example`. Minimum to deploy successfully without auth or AI:
   - `NEXT_PUBLIC_APP_URL`
   - `DATABASE_URL` *(optional — API routes return mock data if absent)*
4. Vercel auto-detects the monorepo. Confirm in Project Settings:
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm install --frozen-lockfile && pnpm --filter @agentdynamics/web build`
   - **Output Directory**: `.next`
   - **Install Command**: leave blank (handled by build command)
5. Push to `main` for the production deploy. Any other branch / PR gets a preview URL.

### Custom domain

Once the project is live on its default `*.vercel.app` URL, add `app.agentdynamics.ai` (or whatever subdomain the owner prefers) in Vercel → Domains. Point a `CNAME` from Cloudflare/Route53 → `cname.vercel-dns.com`.

> Note: `agentdynamics-ai-vercel.app` isn't a real domain shape. Vercel issues subdomains under `*.vercel.app` (e.g. `agentdynamics-app.vercel.app`). If you want a vanity URL on the `*.vercel.app` namespace, you control it by naming the Vercel project — the project name becomes the subdomain.

## Supabase (database)

1. Create a new Supabase project.
2. Copy the connection strings into Vercel env vars: `DATABASE_URL` (pooled) and `DIRECT_URL` (direct, used by Prisma migrations).
3. Locally: `pnpm db:migrate` to push the schema, then `pnpm db:seed` for demo data.
4. Enable Row Level Security per-table in the Supabase dashboard once auth is wired.

## Expo / EAS (mobile)

1. `npm i -g eas-cli` and `eas login` with the owner's Expo account.
2. From `apps/mobile`: `eas init` — creates the project ID. Paste the returned ID into `apps/mobile/app.json` under `extra.eas.projectId`.
3. Configure builds: `eas build:configure`. Choose iOS + Android.
4. Owner uploads Apple Developer credentials + Google Play service account when prompted.
5. `eas build --platform ios --profile production` and `--platform android --profile production`.
6. `eas submit` to push to App Store Connect / Play Console.

## CI

`.github/workflows/ci.yml` runs typecheck, lint, and build on every push and PR. Failing CI blocks merge if branch protection is enabled (recommended on `main`).

## Rollback

- **Web**: Vercel → Deployments → click an older deploy → "Promote to Production". Atomic, no rebuild.
- **Mobile**: previous EAS build → `eas submit` again, or use EAS Update for OTA hotfixes that don't require a store rebuild.
- **Database**: keep `prisma/migrations/` in git. Roll forward, never back — generate a new migration that reverses the change.
