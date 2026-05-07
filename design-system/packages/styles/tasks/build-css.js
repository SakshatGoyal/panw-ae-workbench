import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'postcss';
import * as sass from 'sass';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cssDirectory = path.join(packageRoot, 'css');
const result = sass.compile(path.join(packageRoot, 'index.scss'), {
  loadPaths: [path.resolve(packageRoot, '../../node_modules')],
  style: 'expanded',
  sourceMap: false,
});

fs.mkdirSync(cssDirectory, { recursive: true });

const expanded = await postcss([autoprefixer]).process(result.css, {
  from: undefined,
});

fs.writeFileSync(path.join(cssDirectory, 'styles.css'), expanded.css, 'utf8');

const minified = await postcss([autoprefixer, cssnano]).process(result.css, {
  from: undefined,
});

fs.writeFileSync(path.join(cssDirectory, 'styles.min.css'), minified.css, 'utf8');
