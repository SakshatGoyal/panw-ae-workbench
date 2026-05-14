import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/compositions/**/*.stories.tsx'],
  staticDirs: ['../../design-system/packages/type/fonts'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
  typescript: { reactDocgen: false }
}

export default config
