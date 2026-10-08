# ROLE

You are a senior front-end engineer and motion designer. Build a FRONT-END-ONLY demo of a redesigned website for "Caravento Pizza & Restaurant" (Hagenberg, Austria). It will be shown to the client as a design pitch, so it must feel premium, fast, and highly interactive. No backend, no database, no real form submission. Work in PHASES and stop after each for my "continue". Never invent content: use the copy given here; mark missing things as placeholders and list them in /docs/TODO_[CONTENT.md](http://CONTENT.md).

# STACK (fixed)

React 18 + Vite + TypeScript, React Router, Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis (smooth scroll), react-i18next (DE default, EN secondary), React Hook Form + Zod, react-helmet-async, Lucide icons, @fontsource fonts. Ask before adding any other library.

# DATA LAYER (important)

All content comes from /src/data/*.ts (menu, announcements, hours, gallery, services) via small async functions in /src/api/*.ts that return the mock data after a short delay. Shape them like future REST responses so a real backend can replace them later without touching components. No hardcoded text in components; all strings via i18n files.

# DESIGN SYSTEM

- Mood: warm Austrian-Italian bistro, appetizing, friendly, modern; food photography is the hero.

- Colors (CSS variables + Tailwind theme): tomato red #C8372D, basil green #2F5D3A, cream #FAF3E6, espresso #2B1D14, gold #E0A526.

- Fonts: Fraunces (headings), Inter (body).

- Rounded-2xl cards, soft shadows, generous whitespace, mobile-first.

- Images: use [https://pizza-caravento.at/img/](https://pizza-caravento.at/img/)... paths as demo placeholders, centralized in one config file so they are easy to swap. Logo: /img/logo-light.png.

# ANIMATION & INTERACTION (the selling point, but performance-safe)

- Animate only transform and opacity. Lazy-load below-the-fold media. Target Lighthouse mobile performance ≥ 85.

- Respect prefers-reduced-motion (disable parallax/smooth scroll/large movements, keep simple fades).

- Page-load intro (logo reveal), route transitions, scroll-progress bar, Lenis smooth scroll.

- Hero: slider with staggered text reveal, parallax food layers, floating ingredients (basil, tomato, pizza slice) reacting subtly to mouse movement (desktop) and scroll.

- Scroll-triggered reveals (stagger, mask/clip reveals on headings and images), animated counters if useful.

- Magnetic buttons, hover tilt on cards, image zoom/reveal on hover, custom cursor on desktop (hidden on touch).

- Navbar: transparent → blurred sticky, shrinks on scroll, animated full-screen mobile menu, active-section highlighting.

- Gallery with horizontal scroll section + fullscreen lightbox (keyboard, swipe, animated transitions).

- Menu section with animated category filter tabs (layout animations).

- Live "Jetzt geöffnet / Geschlossen" badge based on opening hours in Europe/Vienna time; today's row highlighted in the hours card.

- Micro-interactions: button ripples, form field focus animations, success animations, skeleton loaders, animated back-to-top.

# GLOBAL ELEMENTS

1. Navbar: logo, Home, Über Uns, Entdecken, Services, Speisen, Kontakt, DE/EN switch, CTA "Jetzt Bestellen!" (opens an env-configured URL; default the App Store/Google Play links below).

2. Announcement popup on first visit (dismissible ×, remembered in localStorage), stacked/carousel cards:

   - "✨ NEU – 🚚 Lieferung ab sofort! Freitag bis Montag – genießen Sie zu Hause. Ab sofort liefern wir jeden Freitag bis Montag unsere köstlichen Gerichte direkt zu Ihnen nach Hause. Bestellen Sie jetzt bequem online und genießen Sie österreichisch-italienische Spezialitäten – ganz ohne Stress! Lieferzeiten: 11:00 – 21:00 Uhr"

   - "🍦 NEU IM MENÜ – Italienische Kühle: Hausgemachtes Eis – cremig, fruchtig, unwiderstehlich! Genießen Sie unsere neue Eiskreation mit Blick auf die malerische Hagenberger Schlosskulisse – ein Hauch von Italien mitten in Oberösterreich. Perfekt für eine süße Auszeit!" Quote: „Wenn die Sonne über Hagenberg scheint, schmeckt unser Eis gleich doppelt so gut.“

3. Mobile sticky action bar: Call (0664 198 1965), Reserve, Order.

4. Footer: logo, tagline, Tel. 0043 664 198 19 65, Kirchenplatz 6, AT-4232 Hagenberg; links Impressum, AGB, Datenschutzerklärung, Cookie-Richtlinie; "App herunterladen & genießen" with App Store ([https://apps.apple.com/de/app/pizza-caravento-restaurant/id6788725934](https://apps.apple.com/de/app/pizza-caravento-restaurant/id6788725934)) and Google Play ([https://play.google.com/store/apps/details?id=com.restajet.caravento](https://play.google.com/store/apps/details?id=com.restajet.caravento)) badges; Instagram [https://www.instagram.com/pizza.caravento/](https://www.instagram.com/pizza.caravento/); "© Caravento Pizza & Restaurant. All rights reserved."

5. Cookie banner UI (necessary/analytics/marketing toggles, consent stored locally; no third-party embeds before consent).

# SECTIONS (copy must be kept as written)

HERO (3 rotating slides, progress indicators, CTAs "Jetzt Bestellen" + "Tisch reservieren"):

 1. "Willkommen bei Caravento Pizza & Restaurant!" / "Genießen Sie österreichisch-italienische Spezialitäten!"

 2. "Kein Stress, kein Warten – einfach online bestellen und genießen!" / "Take-Away Service" / "Paketservice: Freitag, Samstag & Sonntag von 11:00 – 21:00 Uhr"

 3. "Erleben Sie genussvolle Momente im Caravento Pizza & Restaurant" / "Lust auf eine Auszeit?" / "mit liebevoll zubereiteten Gerichten!"

ÜBER UNS ("Welcome to"): "Ein Ort zum Genießen – Momente zum Verweilen. Herzlich willkommen!" / "Ob für den kleinen Hunger zwischendurch, einen duftenden Kaffee oder ein gemütliches Treffen mit Freunden – bei uns sind Sie genau richtig." / "Genießen Sie frische Snacks, hausgemachte Köstlichkeiten und liebevoll zubereitete Getränke in entspannter Atmosphäre." / "Besuchen Sie uns und erleben Sie, wie einfach Genuss sein kann – unkompliziert, herzlich und immer lecker." Text left, 4-image collage (about-1..4.jpg) right.

ENTDECKEN: "Wie wäre es mit einer kleinen Auszeit?" / "In unserem Bistro erwarten Sie frische, mit Liebe zubereitete Gerichte. Lassen Sie den Stress des Tages hinter sich – ob für eine kurze Pause oder einen gemütlichen Abend mit Familie und Freunden, bei uns sind Sie genau richtig. Genießen Sie unsere leckeren Speisen in einer entspannten und herzlichen Atmosphäre. Wir freuen uns darauf, Sie bald in unserem Bistro begrüßen zu dürfen!" (Original says "Bistro in Linz" but the address is Hagenberg: use Hagenberg and flag in TODO.) 7-image gallery (entdecken/1,2,3,5,6,8,7.jpg) + lightbox. Caption: "Caravento Pizza & Restaurant – Mit Freude heißen wir Sie herzlich willkommen – genießen Sie gute Küche und entspannte Momente bei uns."

SERVICES ("Our Services"): "Abholung, Zustellung, Reservierung, Eat-In oder Tischservice. Wir sind bereit, Sie auf all diese Arten zu bedienen." Four animated cards (restaurant/1,3,2,4.jpg):

 - "Österreichische und italienische Küche im Herzen von Hagenberg": "Das Restaurant heißt Sie herzlich willkommen und verwöhnt Sie mit sorgfältig zubereiteten Köstlichkeiten der österreichischen und italienischen Küche. Genießen Sie in einer warmen und einladenden Atmosphäre eine Vielfalt an leckeren Speisen und Getränken und erleben Sie unvergessliche Momente."

 - "Pause & Zeit": "Vielfältige Salatvariationen, köstliche Pasta, Pizzen, Fleischgerichte und leckere Burger. In unserem Caravento Pizza Restaurant erwarten Sie zahlreiche schmackhafte Optionen für Ihr Mittagessen – frisch zubereitet, vielseitig und zu attraktiven Preisen. Genießen Sie eine abwechslungsreiche Mittagsauswahl, die für jeden Geschmack etwas bereithält."

 - "Kaffeepause oder Treffpunkt für lange vermisste Freunde": "Genießen Sie eine entspannte Pause bei einer Tasse Kaffee oder treffen Sie Freunde, die Sie lange nicht gesehen haben, in unserem gemütlichen Bistro."

 - "Zu Hause genießen!": "Alle unsere Gerichte können Sie bequem bei Caravento Pizza & Restaurant bestellen und abholen. Unsere hausgemachten Saucen und frisch zubereiteten Speisen werden sorgfältig verpackt, sodass Sie sie zuhause oder im Büro in Ruhe genießen können." + "Paketservice: Freitag, Samstag & Sonntag von 11:00 – 21:00 Uhr"

 Do not link these cards anywhere (old site links to a leftover template page).

SPEISEN ("Neu im Menü"): "Kulinarische Vielfalt im Caravento – Hagenberg" / "Freuen Sie sich auf täglich wechselnde Mittagsgerichte – eine köstliche Kombination aus österreichischer Hausmannskost und italienischen Klassikern. Ideal für alle, die in der Pause gut essen und genießen möchten!" Real dishes (mock data):

 a) Tag "Klassiker": "Saftiger Köfte-Teller & knusprige Hühnerstreifen" – "Serviert mit duftendem Basmatireis und einem knackig-frischen Salat – ein Genuss für jeden Tag"

 b) Tag "Köfte Spezial": "Afghanischer Genuss" – "Handgeformte Köfte in einer reichhaltigen, hausgemachten Tomatensauce – begleitet von duftendem Basmatireis und einem frischen Salat. Ein Geschmackserlebnis!"

 c) Tag "Chicken": "Gebratene Hühnerstreifen" – "Saftige Hähnchenstreifen mit Basmatireis, Karotten, Rosinen und frischem Salat – leicht, aromatisch und sättigend"

 Add category filter tabs (Pizza, Pasta, Salate, Burger, Fleisch, Eis, Getränke) with allergen icon slots and vegetarian badges. Only the 3 dishes above are real; every other item must be visibly marked as placeholder in the data file, and I will delete them before the demo if needed.

KONTAKT ("Wo wir sind? / Wie können wir Ihnen helfen?"): "Wir stehen Ihnen gerne zur Verfügung, um Ihre Fragen zu beantworten, Ihre Bedürfnisse zu erfüllen oder Sie bei jeglichen Anliegen zu unterstützen. Zögern Sie nicht, uns zu kontaktieren, damit wir Ihnen helfen können."

 - Cards: Reservation (0664 198 1965 / 07236 / 879 24, click-to-call), Email ([zaher756@hotmail.com](mailto:zaher756@hotmail.com), from config), Address (Kirchenplatz 6, AT-4232 Hagenberg) with OpenStreetMap/Leaflet map behind a consent gate, Öffnungszeiten (Dienstag bis Sonntag 11:00–22:00, Montag Ruhetag), Warme Küche (Dienstag bis Sonntag 11:00–22:00, Montag Ruhetag).

 - Contact form and reservation form (date, time within opening hours, guests, name, phone, email) with full Zod validation and animated states. They must NOT pretend to send: on submit, show a clear "Demo-Modus: Nachricht wird noch nicht gesendet" notice with a success animation, and log the payload to the console. Submit handler lives in /src/api so the backend can plug in later.

LEGAL PAGES: routes for Impressum, AGB, Datenschutzerklärung, Cookie-Richtlinie with placeholder "TODO: Rechtstext vom Kunden" (never invent legal text).

# NON-FUNCTIONAL

Semantic HTML, WCAG AA contrast, keyboard navigation, visible focus, alt texts, responsive from 360px to 1920px, per-route title/meta, OG tags, JSON-LD Restaurant schema (address, hours, phone), clean folder structure, typed props, no `any`.

# PHASES (stop after each and wait for "continue")

1. Scaffold, design tokens, fonts, i18n, routing, layout shell (navbar, footer, mobile bar), mock data layer, docs/TODO_[CONTENT.md](http://CONTENT.md).

2. Page-load intro, hero slider, announcement popup, open/closed badge, smooth scroll, cursor, scroll-progress.

3. Über Uns + Entdecken (gallery + lightbox).

4. Services + Speisen (animated filters).

5. Kontakt, forms (demo mode), map consent, cookie banner, legal pages.

6. Polish: performance pass, reduced-motion, accessibility, SEO, mobile QA, deploy instructions for Vercel/Netlify so I can send the client a link. End with a checklist comparing every section of [https://pizza-caravento.at/](https://pizza-caravento.at/) against the new site.

# RULES

End each phase with: what's done, what's placeholder, what you need from me.
