import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { transformWithEsbuild } from 'vite';

/**
 * Allows `.js` files containing JSX to be parsed by Vitest.
 * This is needed because Carbon's test convention names test files `Component-test.js`
 * (not `.jsx`), which Vite does not transform as JSX by default.
 */
const jsxInJsPlugin = {
  name: 'jsx-in-test-js',
  async transform(code: string, id: string) {
    if (
      id.includes('/packages/') &&
      id.endsWith('.js') &&
      !id.includes('node_modules')
    ) {
      return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' });
    }
  },
};

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          name: 'scripts',
          environment: 'node',
          include: ['tests/**/*.test.ts'],
        },
      },
      {
        plugins: [jsxInJsPlugin, react()],
        test: {
          name: 'components',
          environment: 'jsdom',
          include: [
            'packages/*/src/**/__tests__/*-test.{js,jsx,ts,tsx}',
            'packages/*/src/**/__tests__/*.{test,spec}.{js,jsx,ts,tsx}',
          ],
          setupFiles: ['./vitest.setup.ts'],
          globals: true,
        },
      },
    ],
  },
});
