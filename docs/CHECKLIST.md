# Live site vs redesign checklist

Comparison of [https://pizza-caravento.at/](https://pizza-caravento.at/) against this demo (`pizza-caravanto` Vite app).

Legend: **Done** = present in demo · **Partial** = present with noted gap · **TODO** = needs client content / later work

| Live section / element | Redesign status | Notes |
| --- | --- | --- |
| Brand / logo | **Done** | CDN logo light/dark |
| Hero / welcome slides | **Partial** | 3 slides; live `slider/2.jpg` missing → uses 1, 3, 4 |
| CTA Bestellen | **Done** | Env-configurable App Store / Play URLs |
| CTA Reservieren | **Done** | Scrolls/links to Kontakt forms |
| Delivery announcement | **Done** | First-visit popup card |
| Ice cream announcement + quote | **Done** | Second popup card |
| Über Uns copy | **Done** | Spec copy, Hagenberg context |
| Über Uns 4-image collage | **Done** | about-1..4 |
| Entdecken copy | **Partial** | Hagenberg (not “Bistro in Linz”); flagged in TODO_CONTENT |
| Entdecken gallery | **Done** | 7 images + horizontal scroll + lightbox |
| Gallery caption | **Done** | |
| Our Services intro | **Done** | |
| 4 service cards | **Done** | Not linked (old site had dead template links) |
| Speisen intro | **Done** | |
| 3 mittag dishes | **Done** | Real mock data |
| Broader Speisenkarte | **Partial** | Placeholder items per category, clearly marked |
| Kontakt intro | **Done** | |
| Phone / reservation numbers | **Done** | Click-to-call |
| Email | **Done** | From env/config |
| Address Hagenberg | **Done** | |
| Map | **Partial** | OSM embed behind consent; pin approximate |
| Öffnungszeiten | **Done** | Today highlighted + live open/closed |
| Warme Küche | **Done** | |
| Contact form | **Done** | Demo mode only |
| Reservation form | **Done** | Demo mode only |
| Footer address / phone | **Done** | |
| App Store / Google Play | **Done** | Text CTAs (badge assets may 404) |
| Instagram | **Done** | |
| Impressum / AGB / Datenschutz / Cookies | **Partial** | Routes exist; legal text TODO |
| Cookie consent UI | **Done** | Necessary / analytics / marketing |
| DE / EN | **Done** | DE default |
| Mobile call / reserve / order bar | **Done** | |
| Smooth motion / premium interactions | **Done** | Intro, Lenis, hero, gallery, filters, etc. |
| `prefers-reduced-motion` | **Done** | Disables Lenis / parallax / large motion |
| SEO JSON-LD Restaurant | **Done** | Address, hours, phone |
| OG tags | **Done** | |
| Real form delivery / backend | **TODO** | Console demo only |
| Analytics scripts | **TODO** | Consent toggles ready; no vendors wired |

## Content still required from client

See [`TODO_CONTENT.md`](./TODO_CONTENT.md) — especially legal texts, full menu, map GPS, and Linz→Hagenberg sign-off.
