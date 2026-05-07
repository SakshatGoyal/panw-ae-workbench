import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  flattenLeaves,
  pathToCssName,
  toSass,
  writeGenerated,
} from '../../../scripts/token-utils.mjs';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scriptPath = 'packages/colors/tasks/build.js';
const sourcePath = path.join(packageRoot, 'src/colors.ts');
const source = fs.readFileSync(sourcePath, 'utf8');
const match = source.match(/export const colors = ([\s\S]*?) as const;/);

if (!match) {
  throw new Error('Unable to read primitive color source.');
}

const colors = JSON.parse(match[1]);
const leaves = flattenLeaves(colors);

function toExportName(pathSegments) {
  const scalarName = toScalarName(pathSegments);
  const candidate = scalarName.replace(/[^a-zA-Z0-9]+([a-zA-Z0-9])/g, (_, value) => value.toUpperCase());
  return /^[0-9]/.test(candidate) ? `color${candidate}` : candidate;
}

function toScalarName(pathSegments) {
  const [, category, ...rest] = pathSegments;

  if (category === 'core' || category === 'decorative') {
    return pathToCssName(rest);
  }

  return pathToCssName([category, ...rest]);
}

const scalars = leaves
  .map(({ path: colorPath, value }) => ({
    name: toScalarName(colorPath),
    exportName: toExportName(colorPath),
    path: colorPath.join('.'),
    value,
  }))
  .sort((left, right) => left.name.localeCompare(right.name));

const scalarExports = scalars
  .map(({ exportName, value }) => `export const ${exportName} = '${value}' as const;`)
  .join('\n');

writeGenerated(
  path.join(packageRoot, 'generated/scalars.ts'),
  `${scalarExports}\n\nexport const colorScalars = ${JSON.stringify(scalars, null, 2)} as const;\n\nexport type ColorScalarName = typeof colorScalars[number]['name'];\nexport type ColorScalarExportName = typeof colorScalars[number]['exportName'];\n`,
  scriptPath,
);

const sassVariables = scalars
  .map(({ name, value }) => `$${name}: ${value} !default;`)
  .join('\n');

const sassScalarMap = scalars
  .map(({ name }) => `  "${name}": $${name}`)
  .join(',\n');

writeGenerated(
  path.join(packageRoot, 'scss/index.scss'),
  `${sassVariables}\n\n$primitive-colors: ${toSass(colors)} !default;\n\n$primitive-color-scalars: (\n${sassScalarMap}\n) !default;\n`,
  scriptPath,
);
