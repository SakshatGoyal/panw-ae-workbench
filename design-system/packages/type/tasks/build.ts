import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toSass, writeGenerated } from '../../../scripts/token-utils.mjs';
import { styles } from '../src/styles.ts';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scriptPath = 'packages/type/tasks/build.ts';

const breakpointWidthsRem: Record<string, number> = {
  sm: 20, // 320px / 16
  md: 42, // 672px / 16
  lg: 66, // 1056px / 16
  xlg: 82, // 1312px / 16
  max: 99, // 1584px / 16
};

function subtract(a: string, b: string): number {
  const av = parseFloat(a);
  const bv = parseFloat(b);
  return av - bv;
}

function nextBreakpoint(name: string, ordered: string[]): string | null {
  const idx = ordered.indexOf(name);
  if (idx === -1) return null;
  return ordered[idx + 1] ?? null;
}

function fluidFontSize(
  baseFontSize: string,
  currentBreakpointName: string,
  breakpointOverrides: Record<string, { fontSize?: unknown }>,
) {
  const ordered = Object.keys(breakpointWidthsRem);

  const minViewportWidth = breakpointWidthsRem[currentBreakpointName];
  if (minViewportWidth == null) return baseFontSize;

  const currentFontSize =
    currentBreakpointName === 'sm'
      ? baseFontSize
      : (typeof breakpointOverrides[currentBreakpointName]?.fontSize === 'string'
          ? (breakpointOverrides[currentBreakpointName].fontSize as string)
          : baseFontSize);

  let nextName = nextBreakpoint(currentBreakpointName, ordered);
  while (nextName) {
    const nextOverride = breakpointOverrides[nextName];
    if (nextOverride && typeof nextOverride.fontSize === 'string') {
      const maxViewportWidth = breakpointWidthsRem[nextName];
      const maxFontSize = nextOverride.fontSize as string;
      return `calc(${currentFontSize} + ${subtract(maxFontSize, currentFontSize)} * ((100vw - ${minViewportWidth}rem) / ${subtract(
        `${maxViewportWidth}`,
        `${minViewportWidth}`,
      )}))`;
    }
    nextName = nextBreakpoint(nextName, ordered);
  }

  return currentFontSize;
}

function toSassStyleMap() {
  const entries: Record<string, Record<string, unknown>> = {};

  for (const [name, style] of Object.entries(styles)) {
    const breakpointOverrides = style.breakpoints ?? {};
    const computedBreakpoints: Record<string, Record<string, unknown>> = {};

    const baseFontSize = style.fontSize;
    const baseFontSizeScalar = typeof baseFontSize === 'string' ? baseFontSize : null;

    // For breakpoint-stepped fluid styles, compute the same linear interpolation
    // expressions that the upstream reference emits.
    const computedBaseFontSize =
      baseFontSizeScalar && Object.keys(breakpointOverrides).length > 0
        ? fluidFontSize(baseFontSizeScalar, 'sm', breakpointOverrides as Record<string, { fontSize?: unknown }>)
        : style.fontSize;

    for (const [bpName, overrides] of Object.entries(breakpointOverrides)) {
      const o = overrides ?? {};
      const out: Record<string, unknown> = {
        'font-size':
          baseFontSizeScalar && typeof o.fontSize === 'string'
            ? fluidFontSize(baseFontSizeScalar, bpName, breakpointOverrides as Record<string, { fontSize?: unknown }>)
            : o.fontSize ?? null,
        'line-height': o.lineHeight ?? null,
        'font-weight': o.fontWeight ?? null,
        'letter-spacing': o.letterSpacing ?? null,
        'font-family': o.fontFamily ?? null,
      };
      computedBreakpoints[bpName] = out;
    }

    entries[name] = {
      'font-size': computedBaseFontSize,
      'line-height': style.lineHeight,
      'font-weight': style.fontWeight,
      'letter-spacing': style.letterSpacing,
      'font-family': style.fontFamily ?? null,
      breakpoints: Object.keys(computedBreakpoints).length > 0 ? computedBreakpoints : null,
    };
  }

  return entries;
}

const sassContent = `$type-styles: ${toSass(toSassStyleMap())} !default;\n`;

writeGenerated(
  path.join(packageRoot, 'scss/generated/_styles.scss'),
  sassContent,
  scriptPath,
);
