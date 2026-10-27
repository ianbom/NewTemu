import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import ts from 'typescript';
import { whatsappHref } from '../src/lib/behavior.ts';
import {
  expertise,
  navigation,
  projects,
  services,
} from '../src/lib/data.ts';
import { editorial } from '../src/lib/editorial.ts';
import {
  getTranslator,
  isLocale,
  localeHref,
  localizedImage,
  stripLocale,
} from '../src/lib/i18n.ts';
import { indonesian } from '../src/lib/messages/id.ts';

test('locale paths preserve page, query, hash, and external destinations', () => {
  assert.equal(isLocale('id'), true);
  assert.equal(isLocale('en'), true);
  assert.equal(isLocale('fr'), false);
  assert.equal(isLocale('constructor'), false);
  assert.equal(localeHref('/', 'id'), '/id');
  assert.equal(localeHref('/en/portfolio?view=2#gallery', 'id'), '/id/portfolio?view=2#gallery');
  assert.equal(
    localeHref('/id/pricing?type=Web%20Application#main', 'en'),
    '/en/pricing?type=Web%20Application#main',
  );
  assert.equal(stripLocale('/id/portfolio'), '/portfolio');
  assert.equal(stripLocale('/identity'), '/identity');
  for (const href of [
    'https://wa.me/6285151994724',
    'mailto:hello@example.com',
    '#main',
    '//example.com',
  ]) {
    assert.equal(localeHref(href, 'id'), href);
  }
});

test('translations preserve inline spaces and interpolation', () => {
  const t = getTranslator('id');
  assert.equal(t('Contact Us'), 'Hubungi Kami');
  assert.equal(t(' Contact Us '), ' Hubungi Kami ');
  assert.equal(t('View {0}', 'AUREN'), 'Lihat AUREN');
  assert.equal(t(undefined), '');
  assert.equal(getTranslator('en')('Contact Us'), 'Contact Us');
});

test('WhatsApp URLs remain external when the active language changes', () => {
  for (const locale of ['id', 'en'] as const) {
    const href = whatsappHref(locale, 'Web Application');
    assert.equal(localeHref(href, locale), href);
    assert.equal(localeHref(href, locale === 'id' ? 'en' : 'id'), href);
  }
});

test('all catalog copy and literal UI messages have reviewed Indonesian translations', () => {
  const preserved = new Set([
    'Indonesia',
    'Surabaya, Indonesia',
    'you@company.com',
    "07\u00b015' S \u00a0 112\u00b045' E",
    'Figma',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
  ]);
  const check = (message: string) => {
    const key = message.trim();
    if (!/[A-Za-z]/.test(key) || preserved.has(key)) return;
    assert.ok(Object.hasOwn(indonesian, key), `Missing translation: ${key}`);
  };
  function catalog(value: unknown, field = '') {
    if (['slug', 'name', 'href', 'url', 'image', 'heroImage', 'closingImage'].includes(field))
      return;
    if (typeof value === 'string') check(value);
    else if (Array.isArray(value)) value.forEach((item) => catalog(item));
    else if (value && typeof value === 'object')
      Object.entries(value).forEach(([key, item]) => catalog(item, key));
  }
  [navigation, projects, services, expertise, editorial].forEach(
    (value) => catalog(value),
  );
  for (const file of readdirSync('src', { recursive: true, encoding: 'utf8' }).filter((file) =>
    file.endsWith('.tsx'),
  )) {
    const source = ts.createSourceFile(
      file,
      readFileSync(`src/${file}`, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
    );
    function visit(node: ts.Node) {
      if (
        file.replaceAll('\\', '/') === 'components/pricing.tsx' &&
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.name.text === 'questions' &&
        node.initializer
      ) {
        function reviewQuestion(child: ts.Node) {
          if (ts.isStringLiteral(child)) check(child.text);
          ts.forEachChild(child, reviewQuestion);
        }
        reviewQuestion(node.initializer);
      }
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === 't' &&
        node.arguments[0] &&
        ts.isStringLiteral(node.arguments[0])
      )
        check(node.arguments[0].text);
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
});

test('portfolio screenshots are shared across languages without SVG locale prefixes', () => {
  for (const project of projects) {
    for (const locale of ['id', 'en'] as const) {
      assert.equal(localizedImage(project.image, locale), project.image);
      assert.ok(readFileSync(`public${project.image}`).length > 1000);
      assert.equal(localeHref(project.url, locale), project.url);
    }
  }
});
