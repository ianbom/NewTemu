import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import config from '../next.config.ts';
import * as behavior from '../src/lib/behavior.ts';

test('WhatsApp messages use the active language and preserve service context', () => {
  assert.equal(typeof behavior.whatsappHref, 'function');
  for (const locale of ['id', 'en'] as const) {
    const general = new URL(behavior.whatsappHref(locale));
    assert.equal(general.origin, 'https://wa.me');
    assert.equal(general.pathname, '/6285151994724');
    assert.match(
      general.searchParams.get('text')!,
      locale === 'id' ? /Halo TemuWeb/ : /Hello TemuWeb/,
    );
    const service = new URL(behavior.whatsappHref(locale, 'Web Application'));
    assert.ok(
      service.searchParams.get('text')!.includes(
        locale === 'id' ? 'Aplikasi Web' : 'Web Application',
      ),
    );
    const special = 'API & Integrations / UI? #1\nPhase 2';
    const encoded = new URL(behavior.whatsappHref(locale, special));
    assert.ok(encoded.searchParams.get('text')!.includes(special));
    assert.deepEqual([...encoded.searchParams.keys()], ['text']);
  }
});

test('all former contact routes permanently redirect straight to WhatsApp', async () => {
  const redirects = await config.redirects!();
  for (const source of ['/contact', '/id/contact', '/en/contact']) {
    const rule = redirects.find((item) => item.source === source);
    assert.ok(rule?.permanent, source);
    assert.equal(rule.destination, 'https://wa.me/6285151994724');
  }
  assert.equal(existsSync('src/app/[locale]/contact/page.tsx'), false);
});

test('contact forms and internal contact destinations are absent from rendered source', () => {
  for (const file of readdirSync('src', { recursive: true, encoding: 'utf8' })) {
    if (!file.endsWith('.tsx')) continue;
    const source = readFileSync(`src/${file}`, 'utf8');
    assert.doesNotMatch(source, /href=[^\n]*\/contact(?:[?"'`/]|$)/, file);
    assert.doesNotMatch(source, /ContactForm|tel:\+6285151994724/, file);
  }
});
