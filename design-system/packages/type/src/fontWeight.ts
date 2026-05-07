export type FontWeightName = 'light' | 'regular' | 'semibold';

export const fontWeights = {
  light: 300,
  regular: 400,
  semibold: 600,
} as const satisfies Record<FontWeightName, number>;
