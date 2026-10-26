import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { projects } from '../src/lib/data.ts';

const root = new URL('../', import.meta.url);
const width = 1920;
const height = 4180;
await mkdir(new URL('public/images/portfolio/', root), { recursive: true });

for (const project of projects) {
  const input = fileURLToPath(new URL(`web-ss/${project.slug}.png`, root));
  const output = fileURLToPath(new URL(`public${project.image}`, root));
  const metadata = await sharp(input).metadata();
  if (metadata.width !== width || !metadata.height || metadata.height < height) {
    throw new Error(`Unexpected screenshot dimensions: ${project.slug}`);
  }
  await sharp(input)
    .extract({ left: 0, top: 0, width, height })
    .webp({ quality: 90, effort: 5 })
    .toFile(output);
  console.log(`${project.slug}: ${width} x ${height}`);
}
