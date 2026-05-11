# Mobile setup

## Run locally

```bash
pnpm install
pnpm dev:mobile          # boots Expo dev server
# scan the QR code with Expo Go (iOS) or the Expo Go app (Android)
```

For iOS simulator: press `i` in the terminal. For Android emulator: press `a`. Web preview: press `w`.

## First-time build (EAS)

1. `npm i -g eas-cli`
2. `eas login` with the owner's Expo account.
3. From `apps/mobile`: `eas init` and copy the returned `projectId` into `app.json` → `extra.eas.projectId`.
4. `eas build:configure` — generates `eas.json` if missing.
5. Build:
   - iOS: `eas build --platform ios --profile preview` (preview = ad-hoc), `production` (App Store).
   - Android: `eas build --platform android --profile preview` (APK), `production` (AAB).

## Push notifications

Not wired yet. To enable:

1. iOS: upload the APNs key from Apple Developer → "Keys" to EAS (`eas credentials`).
2. Android: nothing needed beyond a Google services config — Firebase FCM is automatic via Expo.
3. Mobile: install `expo-notifications`, request permission on first launch, send the token to `/api/devices`.
4. Backend: emit a notification when a `Notification` row of kind `hot_lead` or `handoff_requested` is created.

## Common pitfalls in this monorepo

- **NativeWind types missing**: ensure `nativewind-env.d.ts` exists and is included in `tsconfig.json`.
- **Metro can't find workspace packages**: confirm `metro.config.js` sets `watchFolders` to the repo root and `disableHierarchicalLookup: true`.
- **Tailwind preset not applying styles**: NativeWind requires the preset to be `require()`'d, not `import`'d, in `tailwind.config.js`.
