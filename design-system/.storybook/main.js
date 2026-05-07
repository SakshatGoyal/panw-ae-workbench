import { transformWithEsbuild } from 'vite';

/**
 * Allows `.js` story files that contain JSX to be processed by Vite.
 * Carbon's convention is Component.stories.js (not .jsx), so we extend Vite
 * to treat package source `.js` files as JSX.
 */
const jsxInJsPlugin = {
  name: 'jsx-in-stories-js',
  async transform(code, id) {
    if (
      id.includes('/packages/') &&
      id.endsWith('.js') &&
      !id.includes('node_modules')
    ) {
      return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' });
    }
  },
};

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: [
    '../packages/*/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/*/src/**/*.mdx',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(viteConfig) {
    return {
      ...viteConfig,
      plugins: [jsxInJsPlugin, ...(viteConfig.plugins ?? [])],
      optimizeDeps: {
        ...viteConfig.optimizeDeps,
        esbuildOptions: {
          ...viteConfig.optimizeDeps?.esbuildOptions,
          loader: {
            ...viteConfig.optimizeDeps?.esbuildOptions?.loader,
            '.js': 'jsx',
          },
        },
      },
    };
  },
};

export default config;
