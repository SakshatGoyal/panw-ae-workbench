import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import * as sass from 'sass';
import { colorScalars } from '../packages/colors/lib/generated/scalars.js';
import { colors } from '../packages/colors/lib/src/colors.js';
import {
  tokenPaths as generatedTokenPaths,
  tokens as generatedTokens,
} from '../packages/themes/lib/generated/tokens.js';
import { tokenPaths, tokens } from '../packages/themes/lib/src/index.js';
import { flattenLeaves } from '../scripts/token-utils.mjs';

const root = process.cwd();

describe('foundation token build', () => {
  it('keeps generated semantic modes aligned with source mode objects', () => {
    const sourcePaths = flattenLeaves(tokens)
      .map(({ path: tokenPath }) => tokenPath.join('.'))
      .sort();
    const generatedPaths = flattenLeaves(generatedTokens)
      .map(({ path: tokenPath }) => tokenPath.join('.'))
      .sort();

    expect(generatedPaths).toEqual(sourcePaths);
    expect([...tokenPaths].sort()).toEqual(sourcePaths);
    expect([...generatedTokenPaths].sort()).toEqual(sourcePaths);
  });

  it('keeps primitive scalar exports aligned with Sass variables', () => {
    const sourcePaths = flattenLeaves(colors).map(({ path: colorPath }) =>
      colorPath.join('.'),
    );
    const sassSource = fs.readFileSync(
      path.join(root, 'packages/colors/scss/index.scss'),
      'utf8',
    );

    for (const scalar of colorScalars) {
      expect(sourcePaths).toContain(scalar.path);
      expect(sassSource).toContain(`$${scalar.name}: ${scalar.value}`);
    }
  });

  it('compiles the CSS bundle and preserves the unmapped-token fallback', () => {
    const result = sass.compile(path.join(root, 'packages/styles/index.scss'), {
      loadPaths: [path.join(root, 'node_modules')],
      style: 'expanded',
    });

    expect(result.css).toContain('--ds-stage-surface-ai-rest: #ff00ff');
    expect(result.css).toContain(
      '--ds-surface-ai-rest: var(--ds-stage-surface-ai-rest, #ff00ff)',
    );
  });
});
