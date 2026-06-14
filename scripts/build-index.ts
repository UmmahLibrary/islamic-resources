import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const resourcesDir = join(__dirname, '../registry/resources');
const outputPath = join(__dirname, '../registry/index.json');

const files = readdirSync(resourcesDir).filter(f => f.endsWith('.json') && !f.startsWith('_'));

const resources = files.map(file => {
  const raw = readFileSync(join(resourcesDir, file), 'utf-8');
  const { $schema, ...resource } = JSON.parse(raw);
  return resource;
});

resources.sort((a, b) => a.name.localeCompare(b.name));

writeFileSync(outputPath, JSON.stringify({ resources }, null, 2) + '\n');
console.log(`Built index with ${resources.length} resources → registry/index.json`);
