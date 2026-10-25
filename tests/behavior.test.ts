import assert from 'node:assert/strict';
import { test } from 'node:test';
import { filterProjects, paginate, contactLinks } from '../src/lib/behavior.ts';
const samples = [
  { name: 'AUREN', category: 'E-Commerce', description: 'Editorial storefront' },
  { name: 'NORDEN', category: 'Web Applications', description: 'Business dashboard' },
];
test('search and category filters combine, ignoring case and whitespace', () => {
  assert.equal(filterProjects(samples, ' E-Commerce ', ' auren ').length, 1);
  assert.equal(filterProjects(samples, 'Websites', 'auren').length, 0);
  assert.equal(filterProjects(samples, 'All Projects', 'DASHBOARD')[0]?.name, 'NORDEN');
});
test('pagination clamps invalid pages and handles empty results', () => {
  assert.deepEqual(paginate([1, 2, 3], 99, 2), { items: [3], page: 2, totalPages: 2 });
  assert.deepEqual(paginate([], -1, 6), { items: [], page: 1, totalPages: 1 });
});
test('contact actions encode content without changing recipient', () => {
  const links = contactLinks({
    name: 'Alex & Co',
    email: 'alex@example.com',
    phone: '',
    type: 'Web Application',
    description: 'Build a dashboard\nWith reports & exports',
  });
  assert.equal(new URL(links.whatsapp).host, 'wa.me');
  assert.equal(new URL(links.whatsapp).pathname, '/6285151994724');
  assert.match(new URL(links.whatsapp).searchParams.get('text')!, /Alex & Co/);
  assert.match(links.email, /^mailto:mail@agency.site\?subject=/);
  assert.ok(!links.email.includes('\n'));
});
