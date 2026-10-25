import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import ts from 'typescript';
import { contactLinks, filterProjects } from '../src/lib/behavior.ts';
import {
  categories,
  categorySlug,
  expertise,
  navigation,
  projects,
  projectTypes,
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
  assert.equal(localeHref('/en/work/auren?view=2#gallery', 'id'), '/id/work/auren?view=2#gallery');
  assert.equal(
    localeHref('/id/contact?type=Web%20Application&project=NORDEN#main', 'en'),
    '/en/contact?type=Web%20Application&project=NORDEN#main',
  );
  assert.equal(stripLocale('/id/work'), '/work');
  assert.equal(stripLocale('/identity'), '/identity');
  for (const href of [
    'https://wa.me/6285151994724',
    'mailto:mail@agency.site',
    '#main',
    '//example.com',
  ]) {
    assert.equal(localeHref(href, 'id'), href);
  }
});

test('translations preserve inline spaces, interpolation, and stable filter values', () => {
  const t = getTranslator('id');
  assert.equal(t('Contact Us'), 'Hubungi Kami');
  assert.equal(t(' Full Name '), ' Nama Lengkap ');
  assert.equal(t('Show image {0}', 3), 'Tampilkan gambar 3');
  assert.equal(t(undefined), '');
  assert.equal(getTranslator('en')('Contact Us'), 'Contact Us');
  assert.equal(categorySlug('Web Applications'), 'web-applications');
  assert.equal(filterProjects(projects, 'Web Applications', 'aplikasi', 'id').length, 3);
  assert.equal(filterProjects(projects, 'All Projects', 'antarmuka', 'id').length, 2);
  assert.equal(projectTypes.includes('Web Application'), true);
});

test('both contact languages preserve recipient and user-written content', () => {
  const values = {
    name: 'Rina & Tim',
    email: 'rina@example.com',
    phone: '',
    type: 'Web Application',
    description: 'Kebutuhan khusus & laporan\nTahap kedua',
  };
  for (const locale of ['id', 'en'] as const) {
    const links = contactLinks(values, locale);
    const url = new URL(links.whatsapp);
    const body = url.searchParams.get('text')!;
    assert.equal(url.pathname, '/6285151994724');
    assert.ok(body.includes(values.description));
    assert.ok(body.includes(values.name));
    assert.ok(
      body.includes(
        locale === 'id' ? 'Jenis proyek: Aplikasi Web' : 'Project type: Web Application',
      ),
    );
    assert.ok(body.includes(locale === 'id' ? 'Tidak dicantumkan' : 'Not provided'));
    assert.ok(links.email.startsWith('mailto:mail@agency.site?subject='));
    assert.ok(!links.email.includes('\n'));
  }
});

test('all catalog copy and literal UI messages have reviewed Indonesian translations', () => {
  const preserved = new Set([
    'Indonesia',
    'Surabaya, Indonesia',
    'mail@agency.site',
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
    if (['slug', 'name', 'href', 'image', 'heroImage', 'closingImage', 'gallery'].includes(field))
      return;
    if (typeof value === 'string') check(value);
    else if (Array.isArray(value)) value.forEach((item) => catalog(item));
    else if (value && typeof value === 'object')
      Object.entries(value).forEach(([key, item]) => catalog(item, key));
  }
  [navigation, projects, services, expertise, projectTypes, categories, editorial].forEach(
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

test('project artwork resolves locally in both languages without double prefixes', () => {
  for (const project of projects) {
    for (const image of project.gallery) {
      assert.equal(localizedImage(image, 'en'), image);
      const localized = localizedImage(image, 'id');
      assert.ok(readFileSync(`public${localized}`).length > 1000);
      assert.equal(localizedImage(localized, 'id'), localized);
      assert.notEqual(
        readFileSync(`public${image}`, 'utf8'),
        readFileSync(`public${localized}`, 'utf8'),
      );
    }
  }
});
