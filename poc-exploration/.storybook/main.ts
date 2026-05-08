import type { StorybookConfig } from '@storybook/react-vite'
import { transformWithEsbuild } from 'vite'

/**
 * The design-system packages author stories as `.stories.js` files containing
 * JSX (Carbon convention). Storybook's inject-export-order plugin parses the
 * raw source before our @vitejs/plugin-react gets to it, so without this
 * pre-transform it chokes on the first `<JSX/>` it sees. Mirror the plugin
 * the design-system Storybook uses.
 */
const jsxInJsPlugin = {
  name: 'jsx-in-stories-js',
  async transform(code: string, id: string) {
    if (
      id.includes('/design-system/packages/') &&
      id.endsWith('.js') &&
      !id.includes('node_modules')
    ) {
      return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' })
    }
  },
}

const config: StorybookConfig = {
  stories: [
    '../src/compositions/*.stories.tsx',
    '../../design-system/packages/*/src/**/*.mdx',
    '../../design-system/packages/*/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
  typescript: { reactDocgen: false },
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
    }
  },
}

export default config
