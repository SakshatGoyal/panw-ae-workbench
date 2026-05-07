import path from 'node:path';
import { describe, expect, it } from 'vitest';
import * as sass from 'sass';

const root = process.cwd();
const loadPaths = [path.join(root, 'node_modules')];

describe('elevation shadow smoke', () => {
  it('shadow() returns the correct var() for each valid key', () => {
    const cases: Array<[string, string]> = [
      ['tile-on-tile', '--ds-shadow-tile-on-tile'],
      ['tiles',        '--ds-shadow-tiles'],
      ['shell',        '--ds-shadow-shell'],
      ['flyout',       '--ds-shadow-flyout'],
      ['persistent',   '--ds-shadow-persistent'],
      ['modals',       '--ds-shadow-modals'],
    ];
    for (const [key, expectedVar] of cases) {
      const result = sass.compileString(
        `
          @use '@ds/styles/scss/elevation' as *;
          .probe { box-shadow: shadow('${key}'); }
        `,
        { loadPaths, style: 'expanded' },
      );
      expect(result.css).toContain(`var(${expectedVar})`);
    }
  });

  it('throws on unknown key', () => {
    expect(() =>
      sass.compileString(
        `
          @use '@ds/styles/scss/elevation' as *;
          .probe { box-shadow: shadow('unknown'); }
        `,
        { loadPaths },
      ),
    ).toThrow();
  });

  it('emits all six --ds-shadow-* declarations under :root in styles.css', () => {
    const result = sass.compile(path.join(root, 'packages/styles/index.scss'), {
      loadPaths,
      style: 'expanded',
    });

    for (const name of ['tile-on-tile', 'tiles', 'shell', 'flyout', 'persistent', 'modals']) {
      expect(result.css).toContain(`--ds-shadow-${name}:`);
    }

    expect(result.css).not.toMatch(/\.shell\s*\{[^}]*--ds-shadow/s);
    expect(result.css).not.toMatch(/\.stage\s*\{[^}]*--ds-shadow/s);
    expect(result.css).not.toMatch(/\.emphasis\s*\{[^}]*--ds-shadow/s);
  });
});
