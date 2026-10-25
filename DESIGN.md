# KIVORA STUDIO Design Reference

## Authority

Reference: https://equa-2.vercel.app/

Preserve composition and interaction patterns, not the original identity, photographs, or business claims. The requested agency copy, dark palette, and original studio concepts replace those elements.

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

- Professional Indonesian and English; Indonesian is the default. KIVORA STUDIO; Surabaya, East Java, Indonesia; mail@agency.site; +62 851-5199-4724.
- Twelve original studio concepts. No commissioned-client claims, testimonials, fabricated team, invented history, or agency performance metrics.
- Six service categories, four project disciplines, three portfolio filter options, four process phases, four approach principles.
- Portfolio category filters, image lightboxes, the featured-project carousel, and industry controls are functional. Homepage project links lead to Portfolio.
- Contact actions open WhatsApp in a new tab with a localized inquiry message. Service actions retain the service context. The former contact URLs permanently redirect to WhatsApp. The informational email link remains available; no backend submission or automatic message sending is implied.

## Evidence

`artifacts/reference/measurements.json` records forty reference page/viewport inspections. `artifacts/browser-qa-id.json` and `artifacts/browser-qa-en.json` record local route, responsive, geometry, accessibility, and interaction checks. `artifacts/whatsapp-http.json` records active pages, removed routes, WhatsApp destinations, legacy redirects, and internal-link checks. Reference screenshots and local screenshots are kept separately under `artifacts/`; they are not production assets.

Visual comparison prioritizes geometry and rhythm. Different copy lengths and original interface imagery necessarily produce different text wraps and image compositions; color and content identity are intentionally not matched.
