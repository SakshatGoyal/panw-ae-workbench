import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

for (const target of [
  'dist',
  'packages/colors/generated',
  'packages/colors/lib',
  'packages/colors/scss/generated',
  'packages/themes/generated',
  'packages/themes/lib',
  'packages/themes/scss/generated',
  'packages/type/lib',
  'packages/type/scss/generated',
  'packages/styles/css',
]) {
  fs.rmSync(path.join(root, target), { recursive: true, force: true });
}
