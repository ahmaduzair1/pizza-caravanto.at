# Content TODO — Caravento Pizza & Restaurant

Items that are missing, unclear, or must come from the client. Never invent legal copy or unverified dish data.

## Location / copy corrections

- [ ] Original site copy refers to a **“Bistro in Linz”**; address is **Kirchenplatz 6, AT-4232 Hagenberg**. Demo uses Hagenberg. Confirm final wording with client.
- [ ] Confirm map coordinates for Kirchenplatz 6, Hagenberg (currently approximate in `src/data/site.ts`).
- [ ] Map uses OpenStreetMap **embed iframe** behind consent (no Leaflet package, to stay within the fixed stack). Say if you want full Leaflet interactivity instead.

## Images

- [ ] Confirm all demo image paths under `https://pizza-caravento.at/img/` still exist (slider, about-1..4, entdecken/*, restaurant/*).
- [ ] Provide final logo variants if light/dark differ from live CDN.
- [ ] App Store / Google Play badge assets (currently text links in footer; badge image paths in `src/config/images.ts` may 404).
- [ ] Dish photos for real mittag items and future menu categories.
- [x] Hero: 3D drag/wheel orbit carousel (`HERO_VARIANT = 'orbit'`). Set `'legacy'` to revert. Not Three.js (Agrumea uses Three.js); CSS 3D + GSAP.
- [ ] Optional: photographic floating ingredient assets (basil / tomato / pizza slice) — currently SVG accents.

## Menu

- [ ] Full Speisenkarte: Pizza, Pasta, Salate, Burger, Fleisch, Eis, Getränke (names, descriptions, prices, allergens, vegetarian flags).
- [ ] Only 3 mittag dishes are real in `src/data/menu.ts`; all other items are marked `isPlaceholder: true` — replace or delete before client demo.
- [ ] Allergen icon set / legend from client (EU allergen codes).
- [ ] Confirm ice-cream flavors for “NEU IM MENÜ” announcement.

## Hours & delivery

- [ ] Confirm Öffnungszeiten / Warme Küche: Di–So 11:00–22:00, Mo Ruhetag.
- [ ] Confirm delivery window Freitag–Montag 11:00–21:00 vs Paketservice Fr–So 11:00–21:00 (both appear in source copy).
- [ ] Confirm secondary phone `07236 879 24` formatting and whether both numbers should be click-to-call.

## Contact & forms

- [ ] Confirm public email `zaher756@hotmail.com` for website display.
- [ ] Backend endpoint for contact + reservation (demo currently logs to console only).
- [ ] Reservation rules (max guests, lead time, blocked dates).

## Legal (do not invent)

- [ ] Impressum — full text from client / lawyer
- [ ] AGB — full text from client / lawyer
- [ ] Datenschutzerklärung — full text from client / lawyer
- [ ] Cookie-Richtlinie — full text from client / lawyer
- [ ] Cookie categories / analytics / marketing vendor list if used later

## Brand / apps

- [ ] Preferred default “Jetzt Bestellen!” URL (iOS vs Android vs web ordering) — currently env-configurable.
- [ ] Confirm Instagram handle `https://www.instagram.com/pizza.caravento/`
- [ ] Optional: English translations review (DE is source of truth; EN is secondary).

## SEO / social

- [ ] Final OG image (currently hero slide 1)
- [ ] Preferred meta descriptions per route
- [ ] JSON-LD fields sign-off (address, hours, phone)
- [x] Deploy instructions: see [`DEPLOY.md`](./DEPLOY.md)
- [x] Live-vs-demo checklist: see [`CHECKLIST.md`](./CHECKLIST.md)
