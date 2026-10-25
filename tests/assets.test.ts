import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { projects, categories } from '../src/lib/data.ts';
test('twelve distinct projects cover four categories with existing galleries', () => {
  assert.equal(projects.length, 12);
  assert.equal(new Set(projects.map((project) => project.slug)).size, 12);
  for (const category of categories.slice(1))
    assert.equal(projects.filter((project) => project.category === category).length, 3);
  for (const project of projects)
    for (const image of project.gallery) assert.ok(readFileSync(`public${image}`).length > 1000);
});
test('generated SVGs contain no duplicate attributes or unsafe external content', () => {
  const files = readdirSync('public/images/projects').filter((file) => file.endsWith('.svg'));
  assert.equal(files.length, 36);
  assert.equal(readdirSync('public/images/projects/id').length, 36);
  for (const file of files.flatMap((file) => [file, `id/${file}`])) {
    const svg = readFileSync(`public/images/projects/${file}`, 'utf8');
    assert.ok(svg.startsWith('<svg'));
    assert.ok(svg.endsWith('</svg>'));
    assert.ok(!/<script|<foreignObject|href=/i.test(svg), file);
    for (const tag of svg.matchAll(/<[a-z][^>]*>/gi)) {
      const attributes = [...tag[0].matchAll(/\s([a-z][\w-]*)="/gi)].map((match) => match[1]);
      assert.equal(new Set(attributes).size, attributes.length, file);
    }
  }
});
