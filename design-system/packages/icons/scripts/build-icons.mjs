#!/usr/bin/env node
// Codegen: turn every SVG in ../svg/*.svg into a typed React component
// at ../src/generated/components/<PascalName>.tsx, and emit a manifest +
// barrel re-export. Run via `npm run build:icons` from the package root.
//
// Conventions:
// - Default size = root svg's width attr (20 for /l icons, 32 for brand-*).
// - Paths keep whatever fill they were authored with — currentColor for
//   functional glyphs (normalized in icons-imported/l), literal hex for
//   brand-* and the sales-play set. The codegen does NOT touch fills.
// - aria-hidden is set on the root unless the consumer passes aria-label.
// - Each component is a forwardRef accepting IconProps.
//
// Output is committed so consumers don't need to run codegen on install.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = path.resolve(__dirname, '..');
const SVG_DIR = path.join(PKG_ROOT, 'svg');
const OUT_DIR = path.join(PKG_ROOT, 'src', 'generated', 'components');
const MANIFEST = path.join(PKG_ROOT, 'src', 'generated', 'manifest.ts');
const NAMES_FILE = path.join(PKG_ROOT, 'src', 'generated', 'names.ts');

// kebab → PascalCase. e.g. "arrow-down" → "ArrowDown", "brand-panw" → "BrandPanw"
function toPascal(kebab) {
  return kebab
    .split(/[-_]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');
}

// Pull width/height/viewBox from the source SVG and the inner markup
// (everything between <svg ...> and </svg>).
function parseSvg(src) {
  const openMatch = src.match(/<svg\b([^>]*)>/);
  if (!openMatch) throw new Error('no <svg> open tag');
  const attrs = openMatch[1];
  const widthAttr = attrs.match(/width="([^"]+)"/);
  const heightAttr = attrs.match(/height="([^"]+)"/);
  const viewBox = attrs.match(/viewBox="([^"]+)"/);
  const inner = src.slice(openMatch.index + openMatch[0].length, src.lastIndexOf('</svg>')).trim();
  return {
    width: widthAttr ? widthAttr[1] : '20',
    height: heightAttr ? heightAttr[1] : '20',
    viewBox: viewBox ? viewBox[1] : '0 0 20 20',
    inner,
  };
}

// Convert SVG attribute names to JSX. Most match, but kebabs like
// stroke-width / clip-path / fill-rule become camelCase.
function svgAttrsToJsx(inner) {
  return inner
    .replace(/\b([a-z]+)-([a-z]+)=/g, (_, a, b) => `${a}${b.charAt(0).toUpperCase()}${b.slice(1)}=`)
    .replace(/<\/?\w+/g, (m) => m); // tags stay lowercase — React lowercases SVG tags
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function clean(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function emitComponent({ kebab, pascal, viewBox, defaultSize, inner }) {
  const jsxInner = svgAttrsToJsx(inner);
  return `// AUTO-GENERATED — do not edit. Regenerate via \`npm run build:icons\`.
// Source: svg/${kebab}.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ${pascal} = React.forwardRef<SVGSVGElement, IconProps>(
  function ${pascal}({ size = ${defaultSize}, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="${viewBox}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        role={ariaLabel ? 'img' : undefined}
        {...rest}>
        {title ? <title>{title}</title> : null}
        ${jsxInner}
      </svg>
    );
  }
);

${pascal}.displayName = '${pascal}';
`;
}

function main() {
  const files = fs.readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg')).sort();
  if (!files.length) {
    console.error('no SVGs found in', SVG_DIR);
    process.exit(1);
  }

  clean(OUT_DIR);
  ensureDir(path.dirname(MANIFEST));

  const entries = [];
  for (const file of files) {
    const kebab = file.replace(/\.svg$/, '');
    const pascal = toPascal(kebab);
    const src = fs.readFileSync(path.join(SVG_DIR, file), 'utf8');
    const { width, viewBox, inner } = parseSvg(src);
    const defaultSize = parseInt(width, 10) || 20;
    const code = emitComponent({ kebab, pascal, viewBox, defaultSize, inner });
    fs.writeFileSync(path.join(OUT_DIR, `${pascal}.tsx`), code);
    entries.push({ kebab, pascal });
  }

  // Re-export every component from a single barrel
  const barrel =
    `// AUTO-GENERATED — do not edit. Regenerate via \`npm run build:icons\`.\n` +
    entries.map((e) => `export { ${e.pascal} } from './components/${e.pascal}';`).join('\n') +
    '\n';
  fs.writeFileSync(path.join(path.dirname(MANIFEST), 'index.ts'), barrel);

  // Names + dynamic-lookup manifest for `<Icon name="..." />`
  const names =
    `// AUTO-GENERATED — do not edit. Regenerate via \`npm run build:icons\`.\n` +
    `export const ICON_NAMES = [\n` +
    entries.map((e) => `  '${e.kebab}',`).join('\n') +
    `\n] as const;\n` +
    `export type IconName = (typeof ICON_NAMES)[number];\n`;
  fs.writeFileSync(NAMES_FILE, names);

  const manifest =
    `// AUTO-GENERATED — do not edit. Regenerate via \`npm run build:icons\`.\n` +
    `import type { IconComponent } from '../types';\n` +
    entries.map((e) => `import { ${e.pascal} } from './components/${e.pascal}';`).join('\n') +
    `\n\nexport const ICON_MANIFEST: Record<string, IconComponent> = {\n` +
    entries.map((e) => `  '${e.kebab}': ${e.pascal} as IconComponent,`).join('\n') +
    `\n};\n`;
  fs.writeFileSync(MANIFEST, manifest);

  console.log(`generated ${entries.length} icon components → ${OUT_DIR}`);
}

main();
