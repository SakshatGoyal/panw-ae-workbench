import path from 'node:path';
import { describe, expect, it } from 'vitest';
import * as sass from 'sass';

const root = process.cwd();
const loadPaths = [path.join(root, 'node_modules')];

describe('spacing token smoke', () => {
  it('spacing() returns the correct var() for each valid key', () => {
    const cases: Array<[string, string]> = [
      ['01', '--ds-spacing-01'],
      ['02', '--ds-spacing-02'],
      ['03', '--ds-spacing-03'],
      ['04', '--ds-spacing-04'],
      ['05', '--ds-spacing-05'],
      ['06', '--ds-spacing-06'],
      ['07', '--ds-spacing-07'],
      ['08', '--ds-spacing-08'],
      ['09', '--ds-spacing-09'],
      ['10', '--ds-spacing-10'],
      ['11', '--ds-spacing-11'],
      ['12', '--ds-spacing-12'],
      ['13', '--ds-spacing-13'],
    ];
    for (const [key, expectedVar] of cases) {
      const result = sass.compileString(
        `
          @use '@ds/styles/scss/spacing' as *;
          .probe { margin-top: spacing('${key}'); }
        `,
        { loadPaths, style: 'expanded' },
      );
      expect(result.css).toContain(`var(${expectedVar})`);
    }
  });

  it('spacing(unknown) throws a Sass @error', () => {
    expect(() =>
      sass.compileString(
        `
          @use '@ds/styles/scss/spacing' as *;
          .probe { margin-top: spacing('99'); }
        `,
        { loadPaths },
      ),
    ).toThrow();
  });

  it('emits all thirteen --ds-spacing-* declarations under :root in styles.css', () => {
    const result = sass.compile(path.join(root, 'packages/styles/index.scss'), {
      loadPaths,
      style: 'expanded',
    });

    for (let i = 1; i <= 13; i++) {
      const name = String(i).padStart(2, '0');
      expect(result.css).toContain(`--ds-spacing-${name}:`);
    }
  });
});
