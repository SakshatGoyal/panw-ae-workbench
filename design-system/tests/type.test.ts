import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import * as sass from 'sass';

const root = process.cwd();

const fixedStyleNames = [
  'code-01',
  'code-02',
  'label-01',
  'label-02',
  'helper-text-01',
  'helper-text-02',
  'legal-01',
  'legal-02',
  'body-compact-01',
  'body-compact-02',
  'body-01',
  'body-02',
  'heading-compact-01',
  'heading-compact-02',
  'heading-01',
  'heading-02',
  'heading-03',
  'heading-04',
  'heading-05',
  'heading-06',
  'heading-07',
  'fluid-heading-03',
  'fluid-heading-04',
  'fluid-heading-05',
  'fluid-heading-06',
  'fluid-paragraph-01',
  'fluid-quotation-01',
  'fluid-quotation-02',
  'fluid-display-01',
  'fluid-display-02',
  'fluid-display-03',
  'fluid-display-04',
] as const;

describe('type package smoke', () => {
  it('emits every fixed style name in the generated Sass map', () => {
    const generated = fs.readFileSync(
      path.join(root, 'packages/type/scss/generated/_styles.scss'),
      'utf8',
    );

    for (const name of fixedStyleNames) {
      expect(generated).toContain(`"${name}":`);
    }
  });

  it('emits mapped style declarations for a known style', () => {
    const result = sass.compileString(
      `
        @use '@ds/type/scss' as type;

        .probe {
          @include type.type-style('heading-04');
        }
      `,
      { loadPaths: [path.join(root, 'node_modules')], style: 'expanded' },
    );

    expect(result.css).not.toContain('[unmapped-type: heading-04]');
    expect(result.css).toContain('font-size: 1.75rem');
    expect(result.css).toContain('line-height: 1.28572');
    expect(result.css).toContain('font-weight: var(--ds-type-font-weight-regular)');
  });

  it('emits family and weight custom properties under :root in styles.css', () => {
    const result = sass.compile(path.join(root, 'packages/styles/index.scss'), {
      loadPaths: [path.join(root, 'node_modules')],
      style: 'expanded',
    });

    expect(result.css).toContain('--ds-type-font-family-sans:');
    expect(result.css).toContain('--ds-type-font-family-mono:');
    expect(result.css).toContain('--ds-type-font-weight-light:');
    expect(result.css).toContain('--ds-type-font-weight-regular:');
    expect(result.css).toContain('--ds-type-font-weight-semibold:');
  });
});
