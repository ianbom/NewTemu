# KIVORA STUDIO

Next.js App Router frontend for a digital agency based in Surabaya. Professional Indonesian and English content, dark editorial styling, original interface concepts, local imagery, and accessible Radix/shadcn-style interactions.

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

- `src/lib/data.ts`: navigation, projects, categories, services, contact project types.
- `src/lib/editorial.ts`: about, process, and approach copy.
- `src/lib/messages/id.ts`: reviewed Indonesian copy, keyed by the English source message.
- `src/lib/i18n.ts`: locale types, translation, localized paths, and artwork selection.
- `src/app/globals.css`: design tokens, reference-derived geometry, responsive rules.
- `scripts/generate-projects.mjs`: regenerate the original local SVG interface studies.
- `ASSETS.md`: photography sources and asset provenance.

All pages use `/id` or `/en`: the home page, `/about-us`, `/our-process`, `/work`, `/work/[slug]`, `/work/category/[category]`, `/services`, `/showcase`, `/our-approach`, `/careers`, and `/contact`.

`/` and the original unprefixed routes permanently redirect to Indonesian. The ID / EN controls preserve the current page, query parameters, and hash. Browser language does not override the selected URL. Category and project-type values stay language-independent; only their visible labels change.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin for canonical and alternate-language metadata. Vercel's deployment origin is used when available; local development falls back to `http://localhost:3017`.

Regenerate both artwork languages with `node scripts/generate-projects.mjs`. English artwork remains in `public/images/projects`; Indonesian artwork is generated under `public/images/projects/id`.

Contact forms generate WhatsApp messages or email drafts. No messages are sent, stored, or submitted to a server. Projects are original studio concepts, not commissioned client work. Project technologies describe the intended implementation direction; the portfolio previews are original interface illustrations.

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
