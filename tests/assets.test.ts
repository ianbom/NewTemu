import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import sharp from 'sharp';
import { projects } from '../src/lib/data.ts';
test('eleven screenshots use a uniform top crop matching Northform', async () => {
  assert.equal(projects.length, 11);
  assert.equal(new Set(projects.map((project) => project.slug)).size, 11);
  assert.equal(projects.filter((project) => project.category === 'Websites').length, 9);
  assert.equal(projects.filter((project) => project.category === 'E-Commerce').length, 2);
  for (const project of projects) {
    const output = `public${project.image}`;
    const metadata = await sharp(output).metadata();
    assert.equal(metadata.width, 1920, project.slug);
    assert.equal(metadata.height, 4180, project.slug);
    assert.equal(metadata.format, 'webp', project.slug);
    const source = await sharp(`web-ss/${project.slug}.png`)
      .extract({ left: 0, top: 0, width: 1920, height: 4180 })
      .resize(96, 209)
      .removeAlpha()
      .raw()
      .toBuffer();
    const cropped = await sharp(output)
      .resize(96, 209)
      .removeAlpha()
      .raw()
      .toBuffer();
    assert.equal(cropped.length, source.length);
    const difference = source.reduce(
      (sum, channel, index) => sum + Math.abs(channel - cropped[index]),
      0,
    ) / source.length;
    assert.ok(difference < 8, `${project.slug}: incorrect crop or distorted screenshot`);
  }
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
