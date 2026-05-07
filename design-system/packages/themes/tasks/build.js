import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  flattenLeaves,
  pathToCssName,
  toSass,
  writeGenerated,
} from '../../../scripts/token-utils.mjs';
import { ShellTokens as shell } from '../src/shell.ts';
import { StageTokens as stage } from '../src/stage.ts';
import { EmphasisTokens as emphasis } from '../src/emphasis.ts';
import { GlobalTokens as global } from '../src/global.ts';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scriptPath = 'packages/themes/tasks/build.js';
const semanticTokens = { shell, stage, emphasis, global };
const modes = Object.keys(semanticTokens);
const fallback = '#ff00ff';

const modeTypeNames = {
  shell: 'ShellTokens',
  stage: 'StageTokens',
  emphasis: 'EmphasisTokens',
  global: 'GlobalTokens',
};

const typeContent = [
  `import type { ShellTokens as ShellTokensValue } from '../src/shell.js';`,
  `import type { StageTokens as StageTokensValue } from '../src/stage.js';`,
  `import type { EmphasisTokens as EmphasisTokensValue } from '../src/emphasis.js';`,
  `import type { GlobalTokens as GlobalTokensValue } from '../src/global.js';`,
  '',
  'export type TokenValue = string | null;',
  'export type ShellTokens = typeof ShellTokensValue;',
  'export type StageTokens = typeof StageTokensValue;',
  'export type EmphasisTokens = typeof EmphasisTokensValue;',
  'export type GlobalTokens = typeof GlobalTokensValue;',
  `export type ModeName = ${modes.map((mode) => JSON.stringify(mode)).join(' | ')};`,
  `export type SemanticTokens = {\n${modes
    .map((mode) => `  ${mode}: ${modeTypeNames[mode] ?? `${mode[0].toUpperCase()}${mode.slice(1)}Tokens`};`)
    .join('\n')}\n};`,
].join('\n\n');

writeGenerated(path.join(packageRoot, 'generated/types.ts'), `${typeContent}\n`, scriptPath);

const modeExports = modes
  .map((mode) => {
    const typeName = modeTypeNames[mode] ?? `${mode[0].toUpperCase()}${mode.slice(1)}Tokens`;
    return `export const ${mode}: ${typeName} = ${JSON.stringify(semanticTokens[mode], null, 2)};`;
  })
  .join('\n\n');

const tokenPaths = flattenLeaves(semanticTokens).map(({ path: tokenPath }) => tokenPath.join('.'));

writeGenerated(
  path.join(packageRoot, 'generated/tokens.ts'),
  `import type { ${Object.values(modeTypeNames).join(', ')}, SemanticTokens } from './types.js';\n\n${modeExports}\n\nexport const tokens: SemanticTokens = {\n${modes.map((mode) => `  ${mode},`).join('\n')}\n};\n\nexport const tokenPaths = ${JSON.stringify(tokenPaths, null, 2)} as const;\n`,
  scriptPath,
);

const semanticSassMap = `$semantic-tokens: ${toSass(semanticTokens)} !default;`;
const variableLines = flattenLeaves(semanticTokens)
  .map(({ path: tokenPath, value }) => {
    const name = pathToCssName(tokenPath);
    const fallbackValue = value ?? fallback;
    return `$${name}: custom-property.get-var('${name}', ${fallbackValue}) !default;`;
  })
  .join('\n');

writeGenerated(
  path.join(packageRoot, 'scss/generated/_tokens.scss'),
  `@use '../custom-property';\n\n${semanticSassMap}\n\n${variableLines}\n`,
  scriptPath,
);

const themeVars = modes
  .map((mode) => `$${mode}: map.get(tokens.$semantic-tokens, "${mode}") !default;`)
  .join('\n');

writeGenerated(
  path.join(packageRoot, 'scss/generated/_themes.scss'),
  `@use 'sass:map';\n@use './tokens';\n\n${themeVars}\n`,
  scriptPath,
);
