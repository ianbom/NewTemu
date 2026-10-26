import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import config from '../next.config.ts';
import { navigation, projects } from '../src/lib/data.ts';
import { getTranslator } from '../src/lib/i18n.ts';

test('navigation exposes one bilingual portfolio without removed pages', () => {
  assert.deepEqual(
    navigation.map((item) => item.href),
    ['/about-us', '/pricing', '/our-process', '/portfolio', '/our-approach'],
  );
  assert.equal(getTranslator('id')('Portfolio'), 'Portofolio');
  assert.equal(getTranslator('en')('Portfolio'), 'Portfolio');
});

test('legacy galleries redirect while removed pages have no route or redirect', async () => {
  const redirects = await config.redirects!();
  for (const [source, destination] of [
    ['/portfolio', '/id/portfolio'],
    ['/showcase', '/id/portfolio'],
    ['/id/showcase', '/id/portfolio'],
    ['/en/showcase', '/en/portfolio'],
  ]) {
    assert.ok(
      redirects.some(
        (rule) => rule.source === source && rule.destination === destination && rule.permanent,
      ),
      `${source} must redirect permanently to ${destination}`,
    );
  }
  assert.ok(!redirects.some((rule) => /\/(work|careers)(\/|$)/.test(rule.source)));
  assert.equal(existsSync('src/app/[locale]/work/page.tsx'), false);
  assert.equal(existsSync('src/app/[locale]/work/[slug]/page.tsx'), false);
  assert.equal(existsSync('src/app/[locale]/work/category/[category]/page.tsx'), false);
  const content = readFileSync('src/app/[locale]/[page]/page.tsx', 'utf8');
  assert.match(content, /portfolio:\s*\{/);
  assert.doesNotMatch(content, /\b(careers|showcase):\s*\{|CareersContent/);
});

test('rendered components contain no removed links or project detail actions', () => {
  for (const file of readdirSync('src', { recursive: true, encoding: 'utf8' })) {
    if (!file.endsWith('.tsx')) continue;
    const source = readFileSync(`src/${file}`, 'utf8');
    assert.doesNotMatch(source, /\/(work|careers|showcase)(?:[\/"'`?}]|$)/, file);
    assert.doesNotMatch(
      source,
      /t\(['"](?:Selected Work|Digital Showcase|Careers|View Project)['"]\)/,
      file,
    );
  }
  const interactive = readFileSync('src/components/interactive.tsx', 'utf8');
  assert.match(interactive, /export function PortfolioGallery\(/);
  assert.doesNotMatch(interactive, /Dialog|onCloseAutoFocus|setSelected\(project\)|lightbox/);
  assert.doesNotMatch(interactive, /export function (Portfolio|ProjectGallery)\(/);
});

test('all portfolio destinations match the supplied websites exactly', () => {
  const expected = {
    'vyren-ecom': 'https://vyren-ecom.vercel.app/',
    atelier: 'https://arvena.vercel.app/',
    galerya: 'https://galerya-living.vercel.app/',
    noirel: 'https://noirel-studio.vercel.app/',
    noirva: 'https://studio-noirva.vercel.app/',
    'noirva-2': 'https://noirva-studio.vercel.app/',
    vantra: 'https://studio-vantra.vercel.app/',
    'northform-ecom': 'https://northform-shoes.vercel.app/',
    lifetime: 'https://life-livin.vercel.app/',
    liftco: 'https://vinch.vercel.app/',
    spil: 'https://spill-ship.vercel.app/',
  };
  assert.deepEqual(Object.fromEntries(projects.map((project) => [project.slug, project.url])), expected);
  for (const project of projects) {
    assert.equal(project.image, `/images/portfolio/${project.slug}.webp`);
    assert.equal('gallery' in project, false);
    assert.equal('overview' in project, false);
  }
});

test('portfolio cards use safe direct links, retaining mobile navigation dialogs', () => {
  for (const file of ['src/components/interactive.tsx', 'src/components/shared.tsx']) {
    const source = readFileSync(file, 'utf8');
    assert.match(source, /href=\{project\.url\}/);
    assert.match(source, /target="_blank"/);
    assert.match(source, /rel="noopener noreferrer"/);
  }
  const header = readFileSync('src/components/header.tsx', 'utf8');
  assert.match(header, /<Dialog/);
  const interactive = readFileSync('src/components/interactive.tsx', 'utf8');
  const industry = interactive.split('export function IndustryExplorer()')[1]
    .split('export function PortfolioGallery()')[0];
  assert.doesNotMatch(industry, /industry\.project|projects\[/);
});

test('portfolio renders all projects with bilingual introduction and no filters', () => {
  const source = readFileSync('src/components/interactive.tsx', 'utf8');
  const gallery = source.split('export function PortfolioGallery()')[1];
  assert.match(gallery, /projects\.map/);
  assert.doesNotMatch(gallery, /setCategory|projects\.filter|gallery-filters|gallery-count/);
  assert.match(gallery, /className="portfolio-introduction"/);
  assert.match(gallery, /sizes="\(max-width: 1023px\) 50vw, 33vw"/);
  const message = 'Websites for a range of business needs.';
  assert.equal(getTranslator('id')(message), 'Ragam website untuk kebutuhan bisnis Anda.');
  assert.equal(getTranslator('en')(message), message);
  const css = readFileSync('src/app/globals.css', 'utf8');
  assert.doesNotMatch(css, /gallery-filters|gallery-count/);
});

test('homepage keeps four featured projects in two mobile columns', () => {
  const source = readFileSync('src/components/interactive.tsx', 'utf8');
  const featured = source.split('export function FeaturedProjects()')[1]
    .split('export function IndustryExplorer()')[0];
  assert.match(featured, /length: 4/);
  const css = readFileSync('src/app/globals.css', 'utf8');
  const mobile = css.split('@media (max-width: 479px)')[1];
  assert.match(
    mobile,
    /\.featured-grid\s*\{\s*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/,
  );
  const cards = readFileSync('src/components/shared.tsx', 'utf8');
  assert.match(cards, /sizes="\(max-width: 1023px\) 50vw, 25vw"/);
});

test('industry previews have only images and accessible cycling arrows', () => {
  const source = readFileSync('src/components/interactive.tsx', 'utf8');
  const industry = source.split('export function IndustryExplorer()')[1]
    .split('export function PortfolioGallery()')[0];
  assert.doesNotMatch(industry, /industry-topline|industry-label|industry-controls/);
  assert.doesNotMatch(industry, /description:|aria-pressed/);
  assert.match(industry, /aria-label=\{t\('Previous image'\)\}/);
  assert.match(industry, /aria-label=\{t\('Next image'\)\}/);
  assert.match(industry, /selected \+ industries\.length - 1/);
  assert.match(industry, /\(selected \+ 1\) % industries\.length/);
});

test('portfolio adds a bilingual heading and translated project descriptions', () => {
  const source = readFileSync('src/components/interactive.tsx', 'utf8');
  const gallery = source.split('export function PortfolioGallery()')[1];
  assert.match(gallery, /<h2[^>]*>\s*\{t\('Websites Built Around Your Business\.'\)\}/);
  assert.match(gallery, /className="tile-description"/);
  assert.match(gallery, /\{t\(project\.description\)\}/);
  const heading = 'Websites Built Around Your Business.';
  assert.equal(getTranslator('id')(heading), 'Pilihan Website untuk Bisnis Anda.');
  assert.equal(getTranslator('en')(heading), heading);
  for (const project of projects) {
    assert.notEqual(getTranslator('id')(project.description), project.description);
    assert.ok(project.description.length > 20);
  }
});
