# KIVORA STUDIO

Next.js App Router frontend for a digital agency based in Surabaya. English content, dark editorial styling, original interface concepts, local imagery, and accessible Radix/shadcn-style interactions.

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
- `src/app/globals.css`: design tokens, reference-derived geometry, responsive rules.
- `scripts/generate-projects.mjs`: regenerate the original local SVG interface studies.
- `ASSETS.md`: photography sources and asset provenance.

Routes: `/`, `/about-us`, `/our-process`, `/work`, `/work/[slug]`, `/work/category/[category]`, `/services`, `/showcase`, `/our-approach`, `/careers`, `/contact`.

Contact forms generate WhatsApp messages or email drafts. No messages are sent, stored, or submitted to a server. Projects are original studio concepts, not commissioned client work. Project technologies describe the intended implementation direction; the portfolio previews are original interface illustrations.

No analytics, database, external account configuration, or deployment is required. The first build downloads Geist through `next/font`; runtime photography is served locally.

## Browser Checks

With browser-harness connected to an isolated Chrome CDP session and the production server running on port 3017:

```powershell
$env:BU_CDP_URL='http://127.0.0.1:9333'
Get-Content -Raw scripts/browser-qa.py | browser-harness
```

Screenshots and JSON evidence are written to the ignored `artifacts/` directory. Reference screenshots are evidence only, not website assets.

Set `QA_ORIGIN` to test a different local port. Start a production server on the checked port with `node node_modules/next/dist/bin/next start -p 3017`.
