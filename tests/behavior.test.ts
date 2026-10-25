import assert from 'node:assert/strict';
import { test } from 'node:test';
import { whatsappHref } from '../src/lib/behavior.ts';

test('service inquiries never alter the WhatsApp recipient', () => {
  for (const service of ['', 'Custom Software', 'https://example.com?phone=123&text=other']) {
    const url = new URL(whatsappHref('id', service));
    assert.equal(url.origin, 'https://wa.me');
    assert.equal(url.pathname, '/6285151994724');
    assert.equal(url.searchParams.size, 1);
    assert.ok(url.searchParams.has('text'));
  }
});
