import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import config from '../next.config.ts';
import { navigation } from '../src/lib/data.ts';
import { getTranslator } from '../src/lib/i18n.ts';

test('navigation exposes one bilingual portfolio without removed pages', () => {
  assert.deepEqual(
    navigation.map((item) => item.href),
    ['/about-us', '/our-process', '/services', '/portfolio', '/our-approach'],
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
  assert.match(interactive, /onCloseAutoFocus/);
  assert.match(interactive, /Previous project/);
  assert.match(interactive, /Next project/);
  assert.doesNotMatch(interactive, /export function (Portfolio|ProjectGallery)\(/);
});
