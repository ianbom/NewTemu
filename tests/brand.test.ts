import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { whatsappHref } from '../src/lib/behavior.ts';
import { expertise } from '../src/lib/data.ts';
import { getTranslator } from '../src/lib/i18n.ts';

test('LiniWeb replaces legacy identity in source and generated artwork', () => {
  for (const root of ['src', 'public/images/projects', 'scripts']) {
    for (const file of readdirSync(root, { recursive: true, encoding: 'utf8' })) {
      if (!/\.(tsx?|svg|mjs|py)$/.test(file)) continue;
      assert.doesNotMatch(readFileSync(`${root}/${file}`, 'utf8'), /kivora|temuweb/i, file);
    }
  }
  const header = readFileSync('src/components/header.tsx', 'utf8');
  assert.match(header, /LiniWeb/);
  assert.doesNotMatch(header, /wordmark-studio/);
  assert.equal(JSON.parse(readFileSync('package.json', 'utf8')).name, 'liniweb');
});

test('website-first copy supports both languages and web capabilities', () => {
  assert.equal(getTranslator('id')('Website Development'), 'Jasa Pembuatan Website');
  assert.equal(expertise.length, 3);
  assert.equal(expertise[1].title, 'Web Applications & Integrations');
  assert.ok(expertise.every((item) => !/mobile/i.test(JSON.stringify(item))));
  for (const locale of ['id', 'en'] as const) {
    const message = new URL(whatsappHref(locale)).searchParams.get('text')!;
    assert.match(message, /LiniWeb/);
    assert.match(message, /website/);
  }
});
