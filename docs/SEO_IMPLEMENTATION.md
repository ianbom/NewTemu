# LiniWeb — SEO Implementation Changelog & Deployment Guide

**Target Domain:** `https://www.liniweb.site/`  
**Execution Date:** 2026-10-27  
**Build System:** Next.js 16.4.3 App Router (Turbopack, TypeScript)  
**Test Suite Status:** 38 / 38 Tests Passing (100% Green)  

---

## 1. Summary of Implemented Changes

All highest-impact P0 and P1 technical SEO deficiencies identified during the audit were directly addressed in the repository. The changes preserve 100% of the existing visual styling, brand identity, user interactions, routing structure, and copy.

1. **Fixed Production Canonical Domain Hijacking:** Updated `metadataBase` in root layout to default to `https://www.liniweb.site`, eliminating Vercel preview domain (`new-temu-*.vercel.app`) canonicalization.
2. **Created Native `robots.txt` Route:** Implemented dynamic Next.js metadata route allowing standard search engine crawl access and declaring the sitemap URL.
3. **Created Native `sitemap.xml` Route:** Implemented dynamic Next.js sitemap route registering all 12 localized URLs with bi-directional `hreflang` alternates and update frequencies.
4. **Added Schema.org Structured Data (JSON-LD):** Built a type-safe schema library generating `ProfessionalService`, `WebSite`, `Service` catalog, `BreadcrumbList`, and `FAQPage` schemas aligned with visible on-page copy.
5. **Hardened 404 Pages Against Soft-404 Indexation:** Added explicit `robots: { index: false, follow: false }` to `global-not-found.tsx`.
6. **Enhanced OpenGraph and Twitter Metadata:** Added explicit `siteName`, `type: 'website'`, and descriptive social image metadata in `src/lib/metadata.ts`.
7. **Created `public/llms.txt`:** Added a structured AI search manifest adhering to the llmstxt.org specification for LLM discoverability (ChatGPT, Perplexity, Claude, Gemini).
8. **Added Regression Test Suite:** Created `tests/seo.test.ts` covering robots, sitemaps, structured data, canonical defaults, and 404 indexing flags.

---

## 2. Detailed File-by-File Changelog

### `src/app/[locale]/layout.tsx`
* **Change:**
  * Replaced fallback `process.env.VERCEL_URL` with hardcoded production URL:
    `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.liniweb.site')`
  * Added root `robots` configuration enabling indexing, following, large image previews, and text snippets.
  * Injected `ProfessionalService` and `WebSite` JSON-LD schemas into `<head>`.

### `src/app/robots.ts` *(New File)*
* **Change:**
  * Implemented Next.js `MetadataRoute.Robots` returning `userAgent: '*'`, `allow: '/'`, `sitemap: 'https://www.liniweb.site/sitemap.xml'`, and `host: 'https://www.liniweb.site'`.

### `src/app/sitemap.ts` *(New File)*
* **Change:**
  * Implemented Next.js `MetadataRoute.Sitemap` generating 12 bilingual URLs:
    * `/id` & `/en` (Homepage, priority 1.0 / 0.9, weekly frequency)
    * `/id/pricing` & `/en/pricing` (Pricing, priority 0.9 / 0.8, weekly frequency)
    * `/id/portfolio` & `/en/portfolio` (Portfolio, priority 0.8 / 0.7, monthly frequency)
    * `/id/about-us` & `/en/about-us` (About, priority 0.8 / 0.7, monthly frequency)
    * `/id/our-process` & `/en/our-process` (Process, priority 0.8 / 0.7, monthly frequency)
    * `/id/our-approach` & `/en/our-approach` (Approach, priority 0.8 / 0.7, monthly frequency)
  * Each sitemap entry includes full `alternates.languages` mappings (`id`, `en`, and `x-default`).

### `src/lib/structured-data.ts` *(New File)*
* **Change:**
  * Implemented generator functions:
    * `getOrganizationSchema()`: Schema.org `ProfessionalService` with verified Surabaya address, contact point (+62 851-5199-4724), and WhatsApp sameAs.
    * `getWebSiteSchema()`: Schema.org `WebSite` entity.
    * `getServicesSchema(locale)`: Schema.org `Service` catalog for core web development offerings.
    * `getBreadcrumbSchema(locale, pageName, path)`: Schema.org `BreadcrumbList` for secondary routes.
    * `getFaqSchema(locale)`: Schema.org `FAQPage` matching the 5 visible FAQ questions and answers from the pricing page.

### `src/app/[locale]/page.tsx`
* **Change:**
  * Injected `getServicesSchema(locale)` JSON-LD schema into the homepage markup.

### `src/app/[locale]/[page]/page.tsx`
* **Change:**
  * Injected `getBreadcrumbSchema()` into all inner pages (`about-us`, `our-process`, `our-approach`, `portfolio`, `pricing`).
  * Injected `getFaqSchema()` into the `/pricing` page.

### `src/lib/metadata.ts`
* **Change:**
  * Enhanced `openGraph` with `siteName: 'LiniWeb'`, `type: 'website'`, and descriptive image alt text.
  * Added Twitter card metadata (`card: 'summary_large_image'`).

### `src/app/global-not-found.tsx`
* **Change:**
  * Added `robots: { index: false, follow: false }` to prevent crawl budget leakage and soft-404 indexation.

### `public/llms.txt` *(New File)*
* **Change:**
  * Markdown knowledge file summarizing business profile, services, route links, and contact channels for AI crawlers.

### `tests/seo.test.ts` *(New File)*
* **Change:**
  * Automated regression tests asserting robots directives, sitemap entries, schema payloads, 404 indexing headers, and canonical defaults.

---

## 3. Technical Architecture Decisions

1. **Native Next.js Metadata Route Handlers (`robots.ts`, `sitemap.ts`):**  
   Rather than maintaining static XML and TXT files in `public/`, native App Router metadata handlers ensure URLs, timestamps, and localized alternate tags update synchronously with application routing without manual sync debt.

2. **Decoupled Schema Library (`src/lib/structured-data.ts`):**  
   Centralized structured data generation avoids schema duplication across templates and guarantees strict conformity with Google Search Central Rich Result guidelines.

3. **No-Client-Overhead JSON-LD Injection:**  
   Schemas are embedded directly into server-rendered HTML payloads using `<script type="application/ld+json">`, zeroing runtime client bundle impact.

---

## 4. Verification and Testing Results

* **TypeScript Compilation (`npm run typecheck`):** Passed with zero errors (`tsc --noEmit`).
* **ESLint Validation (`npm run lint`):** Passed with zero warnings or errors.
* **Full Test Suite (`npm test`):** 38 / 38 unit and integration tests passing.
* **Production Build (`npm run build`):** 17 static HTML routes compiled and prerendered via Turbopack:
  * Prerendered `robots.txt` and `sitemap.xml`.
  * Prerendered localized routes for `/id` and `/en`.

---

## 5. Post-Deployment Checklist for the Site Owner

Immediately following Git deployment to Vercel/production:

- [ ] **1. Canonical Tag Verification:**  
  Visit `https://www.liniweb.site/id` in a browser, view page source, and confirm:  
  `<link rel="canonical" href="https://www.liniweb.site/id"/>`  
  *(Ensure no `*.vercel.app` domains appear in canonical or hreflang tags).*

- [ ] **2. Live Robots.txt Fetch:**  
  Open `https://www.liniweb.site/robots.txt` and verify HTTP 200 with:  
  `Sitemap: https://www.liniweb.site/sitemap.xml`

- [ ] **3. Live Sitemap.xml Fetch:**  
  Open `https://www.liniweb.site/sitemap.xml` and verify valid XML containing all 12 page URLs.

- [ ] **4. Google Rich Results Test:**  
  Submit `https://www.liniweb.site/id` and `https://www.liniweb.site/id/pricing` to the [Google Rich Results Test](https://search.google.com/test/rich-results) to confirm detection of `ProfessionalService`, `BreadcrumbList`, and `FAQPage`.

- [ ] **5. OpenGraph & Social Preview Test:**  
  Test URLs using Facebook Sharing Debugger and Twitter Card Validator to verify preview image and title cards.

---

## 6. Manual Setup Guide (External Accounts)

Because AI engineers do not possess access to external proprietary portals, the domain owner must complete the following 3 manual steps:

### A. Google Search Console (GSC) Setup
1. Log in to [Google Search Console](https://search.google.com/search-console).
2. Add Property: Choose **Domain** property and enter `liniweb.site` (requires DNS TXT verification via domain registrar), OR choose **URL prefix** and enter `https://www.liniweb.site/`.
3. In the left sidebar, navigate to **Sitemaps** (`/sitemaps`).
4. Enter `sitemap.xml` under *Add a new sitemap* and click **Submit**.
5. Navigate to **URL Inspection**, enter `https://www.liniweb.site/id`, and click **Request Indexing**.

### B. Bing Webmaster Tools Setup
1. Log in to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Click **Import from Google Search Console** (quickest method; synchronizes verification, domains, and sitemaps automatically).
3. Confirm `https://www.liniweb.site/sitemap.xml` is listed under Sitemaps.

### C. Google Business Profile (Local SEO Surabaya)
1. Go to [Google Business Profile](https://www.google.com/business/).
2. Register business name as `LiniWeb`.
3. Category: **Software Company** or **Website Designer**.
4. Service Area: Surabaya, Sidoarjo, Gresik, and nationwide Indonesia.
5. Link Website to `https://www.liniweb.site/id`.
6. Add phone/WhatsApp: `+62 851-5199-4724`.

---

## 7. Remaining Backlog & Future Roadmap

* **Backlog Item 1 (Medium Impact): Semantic FAQ Expanders in Schema:**  
  Add route-specific FAQ items to `about-us` and `our-process` as additional studio FAQs are published.
* **Backlog Item 2 (Medium Impact): Knowledge Hub / Insights Pillar:**  
  Introduce an editorial insights/blog section (`/id/insights`) covering common business website challenges in Indonesia to capture long-tail organic search traffic.
* **Backlog Item 3 (Low Impact): Automated IndexNow Integration:**  
  Configure IndexNow API hook upon deployment to instantly alert Bing and Yandex of content changes.
