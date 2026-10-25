# TemuWeb

Next.js App Router frontend for TemuWeb, a Surabaya software house focused on website development, e-commerce, supporting web applications, and integrations. Professional Indonesian and English content, dark editorial styling, original interface concepts, local imagery, and accessible Radix/shadcn-style interactions.

## Run

Use Node.js 22.18 or newer, including native TypeScript support for the test runner. Tested with Node.js 24.

```powershell
npm ci
npm run dev
```

```powershell
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

## Content

- `src/lib/data.ts`: navigation, projects, categories, and services.
- `src/lib/behavior.ts`: shared WhatsApp destination and localized inquiry messages.
- `src/lib/editorial.ts`: about, process, and approach copy.
- `src/lib/messages/id.ts`: reviewed Indonesian copy, keyed by the English source message.
- `src/lib/i18n.ts`: locale types, translation, localized paths, and artwork selection.
- `src/app/globals.css`: design tokens, reference-derived geometry, responsive rules.
- `scripts/generate-projects.mjs`: regenerate the original local SVG interface studies.
- `ASSETS.md`: photography sources and asset provenance.

All pages use `/id` or `/en`: the home page, `/about-us`, `/our-process`, `/services`, `/portfolio`, and `/our-approach`.

Portfolio retains the mixed-image gallery, category filters, and keyboard-accessible image previews. There are no separate project detail pages. Careers, Selected Work, project categories, and project detail URLs return 404. Former `/showcase` URLs permanently redirect to `/portfolio` in the corresponding language; the unprefixed gallery redirects to `/id/portfolio`.

`/` and the remaining unprefixed page routes permanently redirect to Indonesian. The former `/contact`, `/id/contact`, and `/en/contact` URLs permanently redirect directly to WhatsApp. The ID / EN controls preserve the current page, query parameters, and hash. Browser language does not override the selected URL. Service-type values stay language-independent; their visible labels and inquiry messages follow the active language.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin for canonical and alternate-language metadata. Vercel's deployment origin is used when available; local development falls back to `http://localhost:3017`.

Regenerate both artwork languages with `node scripts/generate-projects.mjs`. English artwork remains in `public/images/projects`; Indonesian artwork is generated under `public/images/projects/id`. Regenerate the TemuWeb social cover with `node scripts/generate-brand.mjs`.

All contact actions open WhatsApp at `https://wa.me/6285151994724` in a new tab, with a professional message in the active language. Service actions include the service type. There is no contact page or form; visitors review and send messages themselves in WhatsApp. The informational email link remains available. No messages are sent, stored, or submitted to a server. Projects are original interface concepts, not commissioned client work. Project technologies describe the intended implementation direction; the portfolio previews are original interface illustrations.

No analytics, database, external account configuration, or deployment is required. The first build downloads Geist through `next/font`; runtime photography is served locally.

## Browser Checks

With browser-harness connected to an isolated Chrome CDP session and the production server running on port 3017:

```powershell
$env:BU_CDP_URL='http://127.0.0.1:9333'
$env:QA_LOCALE='id'
Get-Content -Raw scripts/browser-qa.py | browser-harness
$env:QA_LOCALE='en'
Get-Content -Raw scripts/browser-qa.py | browser-harness
```

Screenshots and per-language JSON evidence are written to the ignored `artifacts/` directory. Reference screenshots are evidence only, not website assets. Set `QA_INTERACTIONS_ONLY=1` to skip the viewport sweep.

Set `QA_ORIGIN` to test a different local port. Start a production server on the checked port with `node node_modules/next/dist/bin/next start -p 3017`.
