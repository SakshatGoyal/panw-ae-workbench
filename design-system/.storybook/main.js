import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformWithEsbuild } from 'vite';

const here = path.dirname(fileURLToPath(import.meta.url));
const reactDir = path.resolve(here, '..', 'node_modules', 'react');
const reactDomDir = path.resolve(here, '..', 'node_modules', 'react-dom');

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
  staticDirs: ['../packages/type/fonts'],
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
      // Force a single React copy across the page, addon-docs, and
      // @mdx-js/react. Without dedupe + alias, Vite's prebundler splits
      // React across multiple chunks, leaving useMDXComponents calling
      // useContext against a null internals object on every Docs page.
      resolve: {
        ...viteConfig.resolve,
        dedupe: [
          ...(viteConfig.resolve?.dedupe ?? []),
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react/jsx-dev-runtime',
        ],
        alias: {
          ...viteConfig.resolve?.alias,
          react: reactDir,
          'react-dom': reactDomDir,
        },
      },
      optimizeDeps: {
        ...viteConfig.optimizeDeps,
        include: [
          ...(viteConfig.optimizeDeps?.include ?? []),
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react/jsx-dev-runtime',
          '@mdx-js/react',
        ],
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
