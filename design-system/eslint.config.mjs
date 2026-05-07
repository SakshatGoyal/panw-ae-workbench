import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const vitestGlobals = {
  describe: 'readonly',
  it: 'readonly',
  test: 'readonly',
  expect: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  beforeAll: 'readonly',
  afterAll: 'readonly',
  vi: 'readonly',
};

export default [
  {
    ignores: [
      'dist/**',
      '.venv/**',
      'node_modules/**',
      'packages/*/lib/**',
      'packages/*/generated/**',
      'packages/themes/scss/generated/**',
      'packages/styles/css/**',
      'storybook-static/**',
      '.tmp/**',
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/__tests__/**/*.{js,jsx,ts,tsx}', '**/*.test.{js,jsx,ts,tsx}', '**/*-test.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: vitestGlobals,
    },
  },
];
