# TemuWeb Design Reference

## Authority

Reference: https://equa-2.vercel.app/

Preserve the existing dark palette, composition, typography, photographs, animations, routes, and interaction patterns. TemuWeb replaces the former identity and copy only, with website development as the primary offering and web applications, integrations, UI/UX, and maintenance as supporting services.

## Observed Geometry

- Centered 1200px outer container, 24px horizontal padding, 80px fixed navigation.
- Full-viewport photographic heroes, centered headings and copy. The standalone Contact page is removed.
- Geist, normal-weight hero headings, light-weight editorial headings. Hero heading breakpoints: 36px mobile, 48px small tablet, 60px tablet, 72px desktop.
- Homepage sections use 96px vertical padding. Editorial splits use 112px desktop / 80px mobile. Principle panels use 80px.
- Homepage image/text splits use equal columns; numbered services use a 7:5 split. Editorial closing images use 4:3; introductory About imagery uses 4:5.
- Three-column portrait expertise and service grids. Four-column featured projects. Portfolio preserves the mixed landscape and portrait gallery tiles with category filtering and image previews.
- Approach uses two-column principles. Careers, the separate Selected Work listing, category pages, and project detail pages are removed.
- Square-edged uppercase CTAs, thin separators, restrained image zoom, desktop links, mobile overlay navigation, and a multi-column footer.

## Transformation

| Token | Value |
| --- | --- |
| Background | `#08090B` |
| Secondary | `#111317` |
| Surface | `#1B1E22` |
| Foreground | `#F5F3EF` |
| Muted text | `#A5A7AB` |
| Accent | `#C7B59A` |
| Border | `#2C2F33` |

Darkness is an explicit brand requirement. Champagne replaces the reference's orange emphasis. Photographic overlays retain readable text; no decorative glow or new SaaS-style layout is introduced. Geist preserves the source's typographic character. Motion is limited to hero arrival, interactive states, and image hover; reduced-motion users receive near-instant transitions.

The original geographical export map becomes an interactive industry/interface panel with the same prominent landscape footprint. Project concepts are presented through the Portfolio gallery, without detail pages. Catalog actions become relevant service inquiries. No original asset is served by the application.

## Content And Interaction Boundaries

- Pricing replaces Services at `/id/pricing` and `/en/pricing`. It is intentionally image-free: a text introduction, six service anchors, and six open three-column package comparisons separated by fine rules. Tablet packages use a two-part text layout; mobile packages stack. Native FAQ disclosures and a text-only WhatsApp CTA complete the page. Existing palette, Geist typography, header, footer, and other pages remain unchanged.
- Every service has Starter, Pro, and Business pricing in IDR. Company profile Starter begins at Rp1.000.000. Maintenance uses monthly work-hour limits; other services are priced per project. Domain/basic hosting inclusion and separate renewal/third-party costs are stated explicitly. No popularity badges, artificial discounts, checkout, or automatic message submission.
- Package descriptions use 6-10 words and short benefit lists. All website tiers include first-year domain/hosting, SSL while hosting is active, an admin dashboard, and WhatsApp integration. Mobile tiers cover Android and iOS with first-year backend domain/hosting; developer accounts and app-store publication costs are separate. Native Delivery scope disclosures retain the existing work limits. Prices, the pricing introduction, and layout remain unchanged.

- Professional Indonesian and English; Indonesian is the default. TemuWeb; Surabaya, East Java, Indonesia; mail@agency.site; +62 851-5199-4724.
- Eleven supplied website previews. No commissioned-client claims, testimonials, fabricated team, invented history, or software house performance metrics.
- Six service categories, two portfolio disciplines, four process phases, four approach principles.
- Portfolio shows all eleven websites, nine Websites and two E-Commerce entries, without filters or a result counter. A centered bilingual introduction replaces the controls. All project previews link directly to their supplied websites in a new tab, without lightboxes or detail pages. The homepage carousel uses the same data; industry illustrations are independent. The unused interactive showcase is removed, not reintroduced as a new homepage section.
- Portfolio images use a uniform 1920 by 4180 top crop, matching Northform, with three columns from 1024px and two columns on mobile/tablet. Mobile gutters are 12px, with smaller captions and icons. The final odd item stays in the left column. Captions sit below images rather than covering them. Homepage project cards retain the same portrait ratio.
- Homepage featured projects show four cards in a two-by-two mobile grid; desktop retains four columns. The portfolio introduction has a large white bilingual heading, and every gallery caption includes the existing project description.
- The industry preview shows only its screenshot, without a panel border, padding, topline, or text overlay. Two accessible arrow buttons below the image cycle through all five supplied screenshots. Existing image ratios and section heading remain unchanged.
- Contact actions open WhatsApp in a new tab with a localized inquiry message. Service actions retain the service context. The former contact URLs permanently redirect to WhatsApp. The informational email link remains available; no backend submission or automatic message sending is implied.

## Evidence

`artifacts/reference/measurements.json` records forty reference page/viewport inspections. `artifacts/browser-qa-id.json` and `artifacts/browser-qa-en.json` record local route, responsive, geometry, accessibility, and interaction checks. `artifacts/whatsapp-http.json` records active pages, removed routes, WhatsApp destinations, legacy redirects, and internal-link checks. Reference screenshots and local screenshots are kept separately under `artifacts/`; they are not production assets.

The TemuWeb rebrand is verified in `artifacts/temuweb-visual-qa.json` (48 bilingual route/viewports), `artifacts/temuweb-http.json` (active pages, links, redirects, and removed pages), and `artifacts/temuweb-preservation.json` (unchanged CSS, photographs, and mockup compositions). Updated desktop and mobile screenshots use the `temuweb-` prefix.

Visual comparison prioritizes geometry and rhythm. Different copy lengths and original interface imagery necessarily produce different text wraps and image compositions; color and content identity are intentionally not matched.
