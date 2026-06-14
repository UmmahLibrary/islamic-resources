import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schema = JSON.parse(readFileSync(join(__dirname, '../schemas/resource.schema.json'), 'utf-8'));
const resourcesDir = join(__dirname, '../registry/resources');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

const files = readdirSync(resourcesDir).filter(f => f.endsWith('.json') && !f.startsWith('_'));
let errors = 0;

for (const file of files) {
  const raw = readFileSync(join(resourcesDir, file), 'utf-8');
  const data = JSON.parse(raw);

  if (data.id !== file.replace('.json', '')) {
    console.error(`❌ ${file}: "id" must match the filename (expected "${file.replace('.json', '')}")`);
    errors++;
    continue;
  }

  if (!validate(data)) {
    console.error(`❌ ${file}:`);
    validate.errors?.forEach(e => console.error(`   ${e.instancePath} ${e.message}`));
    errors++;
  } else {
    console.log(`✓  ${file}`);
  }
}

if (errors > 0) {
  console.error(`\n${errors} file(s) failed validation.`);
  process.exit(1);
} else {
  console.log(`\nAll ${files.length} resources valid.`);
}
