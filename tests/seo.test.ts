import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import manifest from '../src/app/manifest.ts';
import robots from '../src/app/robots.ts';
import sitemap from '../src/app/sitemap.ts';
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getOrganizationSchema,
  getServicesSchema,
  getWebSiteSchema,
} from '../src/lib/structured-data.ts';

test('robots route outputs allow all rules and points to production sitemap', () => {
  const result = robots();
  assert.equal(result.sitemap, 'https://www.liniweb.site/sitemap.xml');
  assert.equal(result.host, 'https://www.liniweb.site');
  assert.deepEqual(result.rules, {
    userAgent: '*',
    allow: '/',
  });
});

test('sitemap route exposes all localized routes with bilingual alternates', () => {
  const entries = sitemap();
  assert.equal(entries.length, 12);
  const expectedPaths = [
    '',
    '/about-us',
    '/pricing',
    '/our-process',
    '/portfolio',
    '/our-approach',
  ];
  for (const path of expectedPaths) {
    const idEntry = entries.find((e) => e.url === `https://www.liniweb.site/id${path}`);
    const enEntry = entries.find((e) => e.url === `https://www.liniweb.site/en${path}`);
    assert.ok(idEntry, `Missing id entry for ${path}`);
    assert.ok(enEntry, `Missing en entry for ${path}`);
    assert.equal(idEntry?.alternates?.languages?.id, `https://www.liniweb.site/id${path}`);
    assert.equal(idEntry?.alternates?.languages?.en, `https://www.liniweb.site/en${path}`);
    assert.equal(idEntry?.alternates?.languages?.['x-default'], `https://www.liniweb.site/id${path}`);
  }
});

test('structured data generators emit valid Schema.org types matching visible content', () => {
  const org = getOrganizationSchema();
  assert.equal(org['@context'], 'https://schema.org');
  assert.equal(org['@type'], 'ProfessionalService');
  assert.equal(org.name, 'LiniWeb');
  assert.equal(org.telephone, '+62-851-5199-4724');
  assert.equal(org.address.addressLocality, 'Surabaya');

  const site = getWebSiteSchema();
  assert.equal(site['@type'], 'WebSite');
  assert.equal(site.name, 'LiniWeb');

  const services = getServicesSchema('id');
  assert.equal(services['@graph'].length, 4);
  assert.equal(services['@graph'][0]['@type'], 'Service');

  const breadcrumbs = getBreadcrumbSchema('id', 'Tentang Kami', '/about-us');
  assert.equal(breadcrumbs['@type'], 'BreadcrumbList');
  assert.equal(breadcrumbs.itemListElement.length, 2);
  assert.equal(breadcrumbs.itemListElement[0].name, 'Beranda');
  assert.equal(breadcrumbs.itemListElement[1].name, 'Tentang Kami');

  const faq = getFaqSchema('id');
  assert.equal(faq['@type'], 'FAQPage');
  assert.equal(faq.mainEntity.length, 5);
  assert.ok(faq.mainEntity[0].name.includes('Bagaimana cara memilih paket?'));
});

test('llms.txt file exists and provides clear agentic discovery index', () => {
  assert.equal(existsSync('public/llms.txt'), true);
  const content = readFileSync('public/llms.txt', 'utf8');
  assert.match(content, /^# LiniWeb/);
  assert.match(content, /https:\/\/www\.liniweb\.site\/id\/pricing/);
  assert.match(content, /https:\/\/wa\.me\/6285151994724/);
});

test('global 404 page instructs crawlers not to index missing pages', () => {
  const source = readFileSync('src/app/global-not-found.tsx', 'utf8');
  assert.match(source, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false,?\s*\}/);
});

test('layout metadataBase defaults to production domain without preview hijacking', () => {
  const source = readFileSync('src/app/[locale]/layout.tsx', 'utf8');
  assert.doesNotMatch(source, /process\.env\.VERCEL_URL/);
  assert.match(source, /process\.env\.NEXT_PUBLIC_SITE_URL\s*\|\|\s*['"]https:\/\/www\.liniweb\.site['"]/);
});

test('manifest route exports valid progressive web app metadata', () => {
  const meta = manifest();
  assert.equal(meta.name, 'LiniWeb - Jasa Pembuatan Website & Software House');
  assert.equal(meta.short_name, 'LiniWeb');
  assert.equal(meta.start_url, '/id');
  assert.equal(meta.display, 'standalone');
});
