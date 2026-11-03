import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const out = resolve(root, '.site');
await rm(out, { recursive: true, force: true });
await mkdir(out);
for (const file of ['index.html', 'style.css', 'app.js', 'assets', 'data']) {
  await cp(resolve(root, file), resolve(out, file), { recursive: true });
}
await writeFile(resolve(out, '.nojekyll'), '');
console.log('Static site built in .site/ — compatible with /uhs/ project hosting');
