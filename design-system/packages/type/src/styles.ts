export const styleNames = [
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

export type TypeStyleName = (typeof styleNames)[number];

export type ClampTuple<T> = {
  min: T;
  preferred: T;
  max: T;
};

export type ScalarOrClampTuple<T> = T | ClampTuple<T>;

export type BreakpointName = 'md' | 'lg' | 'xlg' | 'max';

export type TypeStyleBreakpointOverrides = Partial<{
  fontSize: ScalarOrClampTuple<string> | null;
  lineHeight: ScalarOrClampTuple<string> | null;
  fontWeight: string | null;
  letterSpacing: ScalarOrClampTuple<string> | null;
  fontFamily: string | null;
}>;

export type TypeStyle = {
  fontSize: null | ScalarOrClampTuple<string>;
  lineHeight: null | ScalarOrClampTuple<string>;
  fontWeight: null | string;
  letterSpacing: null | ScalarOrClampTuple<string>;
  fontFamily?: null | string;
  breakpoints?: Partial<Record<BreakpointName, TypeStyleBreakpointOverrides>>;
};

const baseStyle: TypeStyle = {
  fontSize: null,
  lineHeight: null,
  fontWeight: null,
  letterSpacing: null,
  fontFamily: null,
};

const sansFamily = 'var(--ds-type-font-family-sans)';
const monoFamily = 'var(--ds-type-font-family-mono)';

const lightWeight = 'var(--ds-type-font-weight-light)';
const regularWeight = 'var(--ds-type-font-weight-regular)';
const semiboldWeight = 'var(--ds-type-font-weight-semibold)';

export const styles: Record<TypeStyleName, TypeStyle> = {
  'code-01': {
    fontFamily: monoFamily,
    fontSize: '0.75rem',
    lineHeight: '1.33333',
    fontWeight: regularWeight,
    letterSpacing: '0.32px',
  },
  'code-02': {
    fontFamily: monoFamily,
    fontSize: '0.875rem',
    lineHeight: '1.42857',
    fontWeight: regularWeight,
    letterSpacing: '0.32px',
  },
  'label-01': {
    fontFamily: sansFamily,
    fontSize: '0.75rem',
    lineHeight: '1.33333',
    fontWeight: regularWeight,
    letterSpacing: '0.32px',
  },
  'label-02': {
    fontFamily: sansFamily,
    fontSize: '0.875rem',
    lineHeight: '1.28572',
    fontWeight: regularWeight,
    letterSpacing: '0.16px',
  },
  'helper-text-01': {
    fontFamily: sansFamily,
    fontSize: '0.75rem',
    lineHeight: '1.33333',
    fontWeight: regularWeight,
    letterSpacing: '0.32px',
  },
  'helper-text-02': {
    fontFamily: sansFamily,
    fontSize: '0.875rem',
    lineHeight: '1.28572',
    fontWeight: regularWeight,
    letterSpacing: '0.16px',
  },
  'legal-01': {
    fontFamily: sansFamily,
    fontSize: '0.75rem',
    lineHeight: '1.33333',
    fontWeight: regularWeight,
    letterSpacing: '0.32px',
  },
  'legal-02': {
    fontFamily: sansFamily,
    fontSize: '0.875rem',
    lineHeight: '1.28572',
    fontWeight: regularWeight,
    letterSpacing: '0.16px',
  },
  'body-compact-01': {
    fontFamily: sansFamily,
    fontSize: '0.875rem',
    lineHeight: '1.28572',
    fontWeight: regularWeight,
    letterSpacing: '0.16px',
  },
  'body-compact-02': {
    fontFamily: sansFamily,
    fontSize: '1rem',
    lineHeight: '1.375',
    fontWeight: regularWeight,
    letterSpacing: '0',
  },
  'body-01': {
    fontFamily: sansFamily,
    fontSize: '0.875rem',
    lineHeight: '1.42857',
    fontWeight: regularWeight,
    letterSpacing: '0.16px',
  },
  'body-02': {
    fontFamily: sansFamily,
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: regularWeight,
    letterSpacing: '0',
  },
  'heading-compact-01': {
    fontFamily: sansFamily,
    fontSize: '0.875rem',
    lineHeight: '1.28572',
    fontWeight: semiboldWeight,
    letterSpacing: '0.16px',
  },
  'heading-compact-02': {
    fontFamily: sansFamily,
    fontSize: '1rem',
    lineHeight: '1.375',
    fontWeight: semiboldWeight,
    letterSpacing: '0',
  },
  'heading-01': {
    fontFamily: sansFamily,
    fontSize: '0.875rem',
    lineHeight: '1.42857',
    fontWeight: semiboldWeight,
    letterSpacing: '0.16px',
  },
  'heading-02': {
    fontFamily: sansFamily,
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: semiboldWeight,
    letterSpacing: '0',
  },
  'heading-03': {
    fontFamily: sansFamily,
    fontSize: '1.25rem',
    lineHeight: '1.4',
    fontWeight: regularWeight,
    letterSpacing: '0',
  },
  'heading-04': {
    fontFamily: sansFamily,
    fontSize: '1.75rem',
    lineHeight: '1.28572',
    fontWeight: regularWeight,
    letterSpacing: '0',
  },
  'heading-05': {
    fontFamily: sansFamily,
    fontSize: '2rem',
    lineHeight: '1.25',
    fontWeight: regularWeight,
    letterSpacing: '0',
  },
  'heading-06': {
    fontFamily: sansFamily,
    fontSize: '2.625rem',
    lineHeight: '1.199',
    fontWeight: lightWeight,
    letterSpacing: '0',
  },
  'heading-07': {
    fontFamily: sansFamily,
    fontSize: '3.375rem',
    lineHeight: '1.199',
    fontWeight: lightWeight,
    letterSpacing: '0',
  },

  // Fluid styles are defined as breakpoint-stepped rules in the upstream reference.
  // This package currently keeps the original breakpoint shapes in the TypeScript
  // source, but emits only the base styles (breakpoint stepping is implemented in Sass).
  //
  // Values below match the base (small viewport) step.
  'fluid-heading-03': {
    fontFamily: sansFamily,
    fontSize: '1.25rem',
    lineHeight: '1.4',
    fontWeight: regularWeight,
    letterSpacing: '0',
    breakpoints: {
      xlg: {
        fontSize: '1.25rem',
        lineHeight: '1.4',
      },
      max: {
        fontSize: '1.5rem',
        lineHeight: '1.334',
      },
    },
  },
  'fluid-heading-04': {
    fontFamily: sansFamily,
    fontSize: '1.75rem',
    lineHeight: '1.28572',
    fontWeight: regularWeight,
    letterSpacing: '0',
    breakpoints: {
      xlg: {
        fontSize: '2rem',
        fontWeight: regularWeight,
        lineHeight: '1.25',
      },
      max: {
        fontSize: '2rem',
        fontWeight: regularWeight,
      },
    },
  },
  'fluid-heading-05': {
    fontFamily: sansFamily,
    fontSize: '2rem',
    lineHeight: '1.25',
    fontWeight: regularWeight,
    letterSpacing: '0',
    breakpoints: {
      md: {
        fontSize: '2.25rem',
        fontWeight: lightWeight,
        lineHeight: '1.22',
        letterSpacing: '0',
      },
      lg: {
        fontSize: '2.625rem',
        lineHeight: '1.19',
        letterSpacing: '0',
      },
      xlg: {
        fontSize: '3rem',
        lineHeight: '1.17',
        letterSpacing: '0',
      },
      max: {
        fontSize: '3.75rem',
        letterSpacing: '0',
      },
    },
  },
  'fluid-heading-06': {
    fontFamily: sansFamily,
    fontSize: '2rem',
    lineHeight: '1.25',
    fontWeight: semiboldWeight,
    letterSpacing: '0',
    breakpoints: {
      md: {
        fontSize: '2.25rem',
        fontWeight: semiboldWeight,
        lineHeight: '1.22',
        letterSpacing: '0',
      },
      lg: {
        fontSize: '2.625rem',
        fontWeight: semiboldWeight,
        lineHeight: '1.19',
        letterSpacing: '0',
      },
      xlg: {
        fontSize: '3rem',
        fontWeight: semiboldWeight,
        lineHeight: '1.17',
        letterSpacing: '0',
      },
      max: {
        fontSize: '3.75rem',
        fontWeight: semiboldWeight,
        letterSpacing: '0',
      },
    },
  },
  'fluid-paragraph-01': {
    fontFamily: sansFamily,
    fontSize: '1.5rem',
    lineHeight: '1.334',
    fontWeight: lightWeight,
    letterSpacing: '0',
    breakpoints: {
      lg: {
        fontSize: '1.75rem',
        lineHeight: '1.28572',
      },
      max: {
        fontSize: '2rem',
        lineHeight: '1.25',
      },
    },
  },
  'fluid-quotation-01': {
    fontFamily: sansFamily,
    fontSize: '1.25rem',
    lineHeight: '1.3',
    fontWeight: regularWeight,
    letterSpacing: '0',
    breakpoints: {
      md: {
        fontSize: '1.25rem',
        fontWeight: regularWeight,
        letterSpacing: '0',
      },
      lg: {
        fontSize: '1.5rem',
        fontWeight: regularWeight,
        lineHeight: '1.334',
        letterSpacing: '0',
      },
      xlg: {
        fontSize: '1.75rem',
        fontWeight: regularWeight,
        lineHeight: '1.28572',
        letterSpacing: '0',
      },
      max: {
        fontSize: '2rem',
        fontWeight: regularWeight,
        lineHeight: '1.25',
        letterSpacing: '0',
      },
    },
  },
  'fluid-quotation-02': {
    fontFamily: sansFamily,
    fontSize: '2rem',
    lineHeight: '1.25',
    fontWeight: lightWeight,
    letterSpacing: '0',
    breakpoints: {
      md: {
        fontSize: '2.25rem',
        lineHeight: '1.22',
      },
      lg: {
        fontSize: '2.625rem',
        lineHeight: '1.19',
      },
      xlg: {
        fontSize: '3rem',
        lineHeight: '1.17',
      },
      max: {
        fontSize: '3.75rem',
      },
    },
  },
  'fluid-display-01': {
    fontFamily: sansFamily,
    fontSize: '2.625rem',
    lineHeight: '1.19',
    fontWeight: lightWeight,
    letterSpacing: '0',
    breakpoints: {
      md: {
        fontSize: '2.625rem',
      },
      lg: {
        fontSize: '3.375rem',
      },
      xlg: {
        fontSize: '3.75rem',
        lineHeight: '1.17',
      },
      max: {
        fontSize: '4.75rem',
        lineHeight: '1.13',
      },
    },
  },
  'fluid-display-02': {
    fontFamily: sansFamily,
    fontSize: '2.625rem',
    lineHeight: '1.19',
    fontWeight: semiboldWeight,
    letterSpacing: '0',
    breakpoints: {
      md: {
        fontSize: '2.625rem',
      },
      lg: {
        fontSize: '3.375rem',
      },
      xlg: {
        fontSize: '3.75rem',
        lineHeight: '1.16',
      },
      max: {
        fontSize: '4.75rem',
        lineHeight: '1.13',
      },
    },
  },
  'fluid-display-03': {
    fontFamily: sansFamily,
    fontSize: '2.625rem',
    lineHeight: '1.19',
    fontWeight: lightWeight,
    letterSpacing: '0',
    breakpoints: {
      md: {
        fontSize: '3.375rem',
        lineHeight: '1.18',
      },
      lg: {
        fontSize: '3.75rem',
        lineHeight: '1.16',
        letterSpacing: '-0.64px',
      },
      xlg: {
        fontSize: '4.75rem',
        lineHeight: '1.13',
      },
      max: {
        fontSize: '5.25rem',
        lineHeight: '1.11',
        letterSpacing: '-0.96px',
      },
    },
  },
  'fluid-display-04': {
    fontFamily: sansFamily,
    fontSize: '2.625rem',
    lineHeight: '1.19',
    fontWeight: lightWeight,
    letterSpacing: '0',
    breakpoints: {
      md: {
        fontSize: '4.25rem',
        lineHeight: '1.15',
      },
      lg: {
        fontSize: '5.75rem',
        lineHeight: '1.11',
        letterSpacing: '-0.64px',
      },
      xlg: {
        fontSize: '7rem',
        lineHeight: '1.07',
        letterSpacing: '-0.64px',
      },
      max: {
        fontSize: '9.75rem',
        lineHeight: '1.05',
        letterSpacing: '-0.96px',
      },
    },
  },
};

for (const name of styleNames) {
  if (!styles[name]) {
    styles[name] = { ...baseStyle };
  }
}
