/**
 * Storybook global preview configuration.
 * Imports button component styles and baseline CSS custom property tokens.
 *
 * The button SCSS references var(--ds-type-font-family-sans) with a fallback
 * to 'Inter', so typography renders correctly even without the full token sheet.
 */
import '../packages/styles/scss/components/button/index.scss';
import '../packages/styles/scss/components/tags/index.scss';
import '../packages/styles/scss/components/link/index.scss';
import '../packages/styles/scss/components/radio-button/index.scss';
import '../packages/styles/scss/components/toggle/index.scss';
import '../packages/styles/scss/components/checkbox/index.scss';
import '../packages/styles/scss/components/chips/index.scss';
import '../packages/styles/scss/components/content-switcher/index.scss';
import '../packages/styles/scss/components/breadcrumbs/index.scss';
import '../packages/styles/scss/components/progress-step/index.scss';
import '../packages/styles/scss/components/accordion/index.scss';
import '../packages/styles/scss/components/cell-contents/index.scss';
import '../packages/styles/scss/components/dropdown/index.scss';
import '../packages/styles/scss/components/multi-select/index.scss';
import '../packages/styles/scss/components/header/index.scss';
import '../packages/styles/scss/components/inline-notification/index.scss';
import '../packages/styles/scss/components/number-input/index.scss';
import '../packages/styles/scss/components/search/index.scss';
import '../packages/styles/scss/components/tabs/index.scss';
import '../packages/styles/scss/components/text-entry-rounded/index.scss';
import '../packages/styles/scss/components/tooltip/index.scss';
import '../packages/styles/scss/components/pagination/index.scss';
import '../packages/styles/scss/components/cells-standard/index.scss';

/** @type {import('@storybook/react').Preview} */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
