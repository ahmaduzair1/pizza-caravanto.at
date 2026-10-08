# Deploy — Caravento demo

Front-end-only Vite + React app. No backend required.

## Prerequisites

- Node.js 20+ recommended
- npm

## Local

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` → `.env` (local) or set in the host dashboard:

| Variable | Purpose |
| --- | --- |
| `VITE_ORDER_URL` | Default “Jetzt Bestellen!” target |
| `VITE_ORDER_URL_IOS` | App Store link |
| `VITE_ORDER_URL_ANDROID` | Google Play link |
| `VITE_CONTACT_EMAIL` | Public contact email |
| `VITE_CONTACT_PHONE` | `tel:` href (E.164) |
| `VITE_CONTACT_PHONE_DISPLAY` | Primary display number |
| `VITE_CONTACT_PHONE_SECONDARY` | Secondary display number |

## Vercel

1. Import the Git repo (or `vercel` CLI from this folder).
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add env vars from the table above.
6. Deploy — SPA rewrites are in `vercel.json`.

CLI:

```bash
npx vercel
```

## Netlify

1. New site from Git (or drag-and-drop the `dist` folder after `npm run build`).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add the same env vars.
5. SPA fallback is provided by `public/_redirects` (`/* → /index.html` 200).

CLI:

```bash
npx netlify deploy --prod --dir=dist
```

## Client share tip

After deploy, send the production URL. For a clean first-visit demo, open in a private window (intro + announcements + cookie banner show once).

## Notes

- Images are loaded from `https://pizza-caravento.at/img/...` (see `src/config/images.ts`).
- Forms are demo-only (console log; no real send).
- Legal pages are placeholders until client text arrives.
