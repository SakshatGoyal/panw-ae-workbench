import path from 'node:path';
import { describe, expect, it } from 'vitest';
import * as sass from 'sass';

const root = process.cwd();
const loadPaths = [path.join(root, 'node_modules')];

describe('radius token smoke', () => {
  it('radius() returns the correct var() for each valid key', () => {
    const cases: Array<[string, string]> = [
      ['square',   '--ds-radius-square'],
      ['tight',    '--ds-radius-tight'],
      ['standard', '--ds-radius-standard'],
      ['generous', '--ds-radius-generous'],
      ['pill',     '--ds-radius-pill'],
    ];
    for (const [key, expectedVar] of cases) {
      const result = sass.compileString(
        `
          @use '@ds/styles/scss/radius' as *;
          .probe { border-radius: radius('${key}'); }
        `,
        { loadPaths, style: 'expanded' },
      );
      expect(result.css).toContain(`var(${expectedVar})`);
    }
  });

  it('radius(unknown) throws a Sass @error', () => {
    expect(() =>
      sass.compileString(
        `
          @use '@ds/styles/scss/radius' as *;
          .probe { border-radius: radius(unknown); }
        `,
        { loadPaths },
      ),
    ).toThrow();
  });

  it('emits all five --ds-radius-* declarations under :root in styles.css', () => {
    const result = sass.compile(path.join(root, 'packages/styles/index.scss'), {
      loadPaths,
      style: 'expanded',
    });

    for (const name of ['square', 'tight', 'standard', 'generous', 'pill']) {
      expect(result.css).toContain(`--ds-radius-${name}:`);
    }
  });
});
