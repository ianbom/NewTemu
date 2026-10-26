import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import config from '../next.config.ts';
import { whatsappHref } from '../src/lib/behavior.ts';
import { navigation, services } from '../src/lib/data.ts';
import { getTranslator } from '../src/lib/i18n.ts';

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
      assert.ok(plan.description.length > 40);
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
        'Standard domain for the first year',
        'Basic hosting for the first year',
      ]) {
        assert.equal(plan.features.includes(inclusion), serviceIndex < 4);
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
    [0, 'Update website information through a management area', [false, true, true]],
    [0, 'An inquiry form for prospective customers', [false, false, true]],
    [1, 'Update website information through a management area', [false, true, true]],
    [1, 'An inquiry form for prospective customers', [false, true, true]],
    [1, 'Connect your website with an agreed external service', [false, false, true]],
    [2, 'Customers continue their order through WhatsApp', [true, false, false]],
    [2, 'Manage products and incoming orders in one place', [false, true, true]],
    [2, 'Customers can add items to a cart and complete checkout', [false, true, true]],
    [2, 'Connect checkout to an online payment provider', [false, true, true]],
    [2, 'Connect your store to an agreed delivery service', [false, false, true]],
    [3, 'A sign-in area for your team', [true, true, true]],
    [3, 'Access permissions matched to agreed responsibilities', [true, true, true]],
    [3, 'Manage business records through a web application', [true, true, true]],
    [3, 'Written documentation at handover', [true, true, true]],
    [3, 'Review business activity through reports', [false, true, true]],
    [3, 'Download data for your reporting needs', [false, true, true]],
    [3, 'Connect your application with an agreed external service', [false, false, true]],
    [4, 'Design variants for different screen sizes', [true, true, true]],
    [4, 'Editable design files in Figma', [true, true, true]],
    [4, 'A clickable prototype to review the user flow', [false, true, true]],
    [4, 'Reusable design elements for a consistent interface', [false, false, true]],
    [5, 'Update existing website content', [true, true, true]],
    [5, 'Address minor website issues', [true, true, true]],
    [5, 'Check technical aspects of the website', [true, true, true]],
    [5, 'A monthly summary of the work carried out', [true, true, true]],
  ] as const;
  for (const [serviceIndex, feature, expected] of capabilities) {
    assert.deepEqual(
      services[serviceIndex].packages.map((plan) => plan.features.includes(feature)),
      expected,
      feature,
    );
  }
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
