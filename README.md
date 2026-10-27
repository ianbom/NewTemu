# LiniWeb

Next.js App Router frontend for LiniWeb, a Surabaya software house focused on website development, e-commerce, supporting web applications, and integrations. Professional Indonesian and English content, dark editorial styling, original interface concepts, local imagery, and accessible Radix/shadcn-style interactions.

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

All pages use `/id` or `/en`: the home page, `/about-us`, `/our-process`, `/pricing`, `/portfolio`, and `/our-approach`.

Pricing shows six services with Starter, Pro, and Business packages, starting at Rp1.000.000 for a company profile website. Prices and feature limits live in `src/lib/data.ts`. Project packages are one-time work; maintenance is priced per month. Every website tier includes first-year domain/hosting, SSL while hosting is active, an admin dashboard, and WhatsApp integration. Mobile packages cover Android and iOS with first-year backend domain/hosting. Renewals, upgrades, developer accounts, app-store publication, premium licenses, and third-party fees are separate. Short benefit lists explain inclusions; native Delivery scope disclosures retain the work limits. Pricing is text-only. Each package prepares a localized WhatsApp message containing its service, tier, starting price, and billing period.

Each package has a benefit-led `description` and `features`, with numerical delivery limits in `scopeDetails`. Native Delivery scope disclosures keep those limits accessible without making them the main sales copy. Both languages retain the same prices and deliverables; no additional services are implied.

The former `/services`, `/id/services`, and `/en/services` URLs permanently redirect directly to the corresponding pricing page. `/pricing` redirects to `/id/pricing`.

Portfolio displays all eleven supplied website screenshots without filters or a result counter. A localized introduction sits above the grid: two columns below 1024px, three columns on desktop. Gallery tiles and homepage cards open the corresponding websites in a new tab, without preview dialogs or detail pages. The unused interactive showcase is removed rather than reintroduced on the homepage. Careers, Selected Work, project categories, and project detail URLs return 404. Former `/showcase` URLs permanently redirect to `/portfolio` in the corresponding language; the unprefixed gallery redirects to `/id/portfolio`.

Run `node scripts/prepare-portfolio.mjs` to prepare the screenshots from `web-ss`. It preserves the originals and writes WebP previews to `public/images/portfolio`, cropped from the top to 1920 by 4180 pixels, matching Northform. Both languages use these same screenshots. Supporting industry and service illustrations remain separate from portfolio data.

`/` and the remaining unprefixed page routes permanently redirect to Indonesian. The former `/contact`, `/id/contact`, and `/en/contact` URLs permanently redirect directly to WhatsApp. The ID / EN controls preserve the current page, query parameters, and hash. Browser language does not override the selected URL. Service-type values stay language-independent; their visible labels and inquiry messages follow the active language.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin for canonical and alternate-language metadata. Vercel's deployment origin is used when available; local development falls back to `http://localhost:3017`.

Regenerate both artwork languages with `node scripts/generate-projects.mjs`. English artwork remains in `public/images/projects`; Indonesian artwork is generated under `public/images/projects/id`. Regenerate the LiniWeb social cover with `node scripts/generate-brand.mjs`.

All contact actions open WhatsApp at `https://wa.me/6285151994724` in a new tab, with a professional message in the active language. Service actions include the service type. There is no contact page or form; visitors review and send messages themselves in WhatsApp. No messages are sent, stored, or submitted to a server. Portfolio screenshots and website destinations are supplied by the user; their presentation does not assert commissioned-client relationships, technology stacks, or business results.

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
