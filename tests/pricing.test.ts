import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import config from '../next.config.ts';
import { whatsappHref } from '../src/lib/behavior.ts';
import { navigation, services } from '../src/lib/data.ts';
import { getTranslator } from '../src/lib/i18n.ts';

test('pricing uses the requested service names in both languages', () => {
  const titles = [
    'Website Company Profile',
    'Web Custom',
    'Website E-Commerce',
    'Aplikasi Mobile',
  ];
  for (const locale of ['id', 'en'] as const) {
    const t = getTranslator(locale);
    assert.deepEqual(services.slice(0, 4).map((service) => t(service.title)), titles);
  }
});

test('pricing copy preserves every price and delivery limit', () => {
  const expected = [
    [[1_000_000, 2_500_000, 4_500_000], [[3, 1], [6, 2], [10, 3]]],
    [[1_500_000, 3_500_000, 6_000_000], [[1, 1], [5, 2], [10, 1, 3]]],
    [[3_000_000, 6_000_000, 10_000_000], [[20, 1], [100, 2], [300, 3]]],
    [[5_000_000, 10_000_000, 18_000_000], [[1, 2], [3, 3], [5, 5, 1]]],
    [[1_000_000, 2_500_000, 5_000_000], [[3, 1], [6, 2], [12, 3]]],
    [[250_000, 500_000, 1_000_000], [[1], [3], [6]]],
  ];

  for (const [serviceIndex, service] of services.entries()) {
    const [prices, limits] = expected[serviceIndex];
    assert.deepEqual(service.packages.map((plan) => plan.price), prices);
    assert.equal(
      service.billing,
      service.slug === 'maintenance' ? 'Per month' : 'Per project',
    );
    for (const [planIndex, plan] of service.packages.entries()) {
      const numbers = [...plan.features, ...plan.scopeDetails]
        .flatMap((line) => [...line.matchAll(/\d+/g)])
        .map(([number]) => Number(number));
      assert.deepEqual(numbers, limits[planIndex], `${service.slug} ${plan.name}`);
    }
  }
});

test('packages explain benefits while keeping delivery limits in accessible details', () => {
  const descriptions = new Set<string>();
  for (const [serviceIndex, service] of services.entries()) {
    for (const plan of service.packages) {
      for (const locale of ['id', 'en'] as const) {
        const t = getTranslator(locale);
        const words = t(plan.description).trim().split(/\s+/).length;
        assert.ok(words >= 6 && words <= 10, `${locale}: ${plan.description}`);
        for (const feature of plan.features) {
          assert.ok(t(feature).trim().split(/\s+/).length <= 8, feature);
        }
      }
      descriptions.add(plan.description);
      assert.ok(plan.scopeDetails.length > 0);
      assert.doesNotMatch(
        plan.features.join(' '),
        /\d|user roles?|business modules?|API integration|initial products/i,
      );
      assert.doesNotMatch(
        JSON.stringify(plan),
        /unlimited|SEO|business email|free maintenance|guaranteed results/i,
      );
      for (const inclusion of [
        'Domain for the first year',
        'Hosting for the first year',
        'SSL while hosting is active',
        'WhatsApp integration',
      ]) {
        assert.equal(plan.features.includes(inclusion), serviceIndex < 3);
      }
      if (serviceIndex < 4) {
        assert.ok(plan.features.includes('Admin dashboard'));
      }
      if (serviceIndex === 3) {
        assert.ok(plan.features.includes('Android & iOS applications'));
        assert.ok(plan.features.includes('Backend domain for the first year'));
        assert.ok(plan.features.includes('Backend hosting for the first year'));
        assert.doesNotMatch(plan.features.join(' '), /web application/i);
      }
    }
  }
  assert.equal(descriptions.size, 18);
  const source = readFileSync('src/components/pricing.tsx', 'utf8');
  assert.match(source, /<details className="pricing-scope">/);
  assert.match(source, /plan\.scopeDetails\.map/);
  assert.match(source, /t\('Delivery scope'\)/);
  assert.match(source, /t\('Package prices can change based on agreement\.'\)/);
});

test('higher-tier capabilities do not leak into entry-level packages', () => {
  const capabilities = [
    [0, 'Quotation request form', [false, false, true]],
    [1, 'Customer inquiry form', [false, true, true]],
    [1, 'External service integration', [false, false, true]],
    [2, 'Orders through WhatsApp', [true, false, false]],
    [2, 'Product & order management', [false, true, true]],
    [2, 'Shopping cart & checkout', [false, true, true]],
    [2, 'Online payment integration', [false, true, true]],
    [2, 'Shipping service integration', [false, false, true]],
    [3, 'User login & access permissions', [true, true, true]],
    [3, 'Business data management', [true, true, true]],
    [3, 'Handover documentation', [true, true, true]],
    [3, 'Business activity reports', [false, true, true]],
    [3, 'Data export', [false, true, true]],
    [3, 'External service integration', [false, false, true]],
    [4, 'Responsive screen designs', [true, true, true]],
    [4, 'Editable Figma files', [true, true, true]],
    [4, 'Interactive prototype', [false, true, true]],
    [4, 'Reusable design components', [false, false, true]],
    [5, 'Website content updates', [true, true, true]],
    [5, 'Minor issue fixes', [true, true, true]],
    [5, 'Website health checks', [true, true, true]],
    [5, 'Monthly work report', [true, true, true]],
  ] as const;
  for (const [serviceIndex, feature, expected] of capabilities) {
    assert.deepEqual(
      services[serviceIndex].packages.map((plan) => plan.features.includes(feature)),
      expected,
      feature,
    );
  }
});

test('mobile inquiries and pricing terms disclose the new delivery scope', () => {
  for (const locale of ['id', 'en'] as const) {
    const href = whatsappHref(locale, services[3].type);
    const message = new URL(href).searchParams.get('text')!;
    assert.ok(message.includes(locale === 'id' ? 'Aplikasi Mobile' : 'Mobile Application'));
  }
  const source = readFileSync('src/components/pricing.tsx', 'utf8');
  assert.match(source, /Do mobile packages include Android and iOS\?/);
  assert.match(source, /Developer accounts, app store publication/);
  assert.doesNotMatch(source, /web application packages|For business applications/);
});

test('six services expose eighteen distinct, ascending Rupiah packages', () => {
  assert.equal(services.length, 6);
  assert.equal(new Set(services.map((service) => service.slug)).size, 6);
  for (const service of services) {
    assert.deepEqual(service.packages.map((plan) => plan.name), ['Starter', 'Pro', 'Business']);
    assert.equal(service.billing, service.slug === 'maintenance' ? 'Per month' : 'Per project');
    for (const [index, plan] of service.packages.entries()) {
      assert.ok(Number.isSafeInteger(plan.price) && plan.price > 0);
      assert.ok(plan.features.length >= 4);
      if (index) assert.ok(plan.price > service.packages[index - 1].price);
    }
  }
  assert.equal(services[0].packages[0].price, 1_000_000);
  assert.deepEqual(services[5].packages.map((plan) => plan.price), [250_000, 500_000, 1_000_000]);
});

test('pricing replaces services in navigation and all legacy URLs redirect directly', async () => {
  assert.ok(navigation.some((item) => item.href === '/pricing' && item.label === 'Pricing'));
  assert.ok(!navigation.some((item) => item.href === '/services'));
  const redirects = await config.redirects!();
  for (const [source, destination] of [
    ['/pricing', '/id/pricing'],
    ['/services', '/id/pricing'],
    ['/id/services', '/id/pricing'],
    ['/en/services', '/en/pricing'],
  ]) {
    const rule = redirects.find((item) => item.source === source);
    assert.ok(rule?.permanent, source);
    assert.equal(rule.destination, destination);
  }
  for (const file of readdirSync('src', { recursive: true, encoding: 'utf8' })) {
    if (!file.endsWith('.tsx')) continue;
    assert.doesNotMatch(readFileSync(`src/${file}`, 'utf8'), /href=[^\n]*["']\/services/, file);
  }
});

test('package inquiries preserve language, service, tier, price, and billing period', () => {
  for (const locale of ['id', 'en'] as const) {
    const t = getTranslator(locale);
    for (const service of services) {
      for (const plan of service.packages) {
        const context = `${t(service.title)} / ${plan.name} / Rp${plan.price.toLocaleString('id-ID')} / ${t(service.billing)}`;
        const url = new URL(whatsappHref(locale, context));
        assert.equal(url.pathname, '/6285151994724');
        assert.ok(url.searchParams.get('text')!.includes(context));
        assert.match(url.searchParams.get('text')!, locale === 'id' ? /^Halo TemuWeb/ : /^Hello TemuWeb/);
      }
    }
  }
});

test('pricing is text-only and uses native section navigation and FAQ controls', () => {
  const source = readFileSync('src/components/pricing.tsx', 'utf8');
  assert.doesNotMatch(source, /next\/image|<Image|<img\b|<Hero\b|<ContactCTA\b|backgroundImage/);
  assert.match(source, /<details/);
  assert.match(source, /href=\{`#\$\{service.slug\}`\}/);
  assert.match(source, /service\.packages\.map/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
});
