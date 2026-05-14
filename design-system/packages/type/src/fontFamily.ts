export type FontFamilyName = 'sans' | 'mono' | 'serif';

export const fontFamilies = {
  sans: `"TT Hoves", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  mono: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  serif: null,
} as const satisfies Record<FontFamilyName, string | null>;
