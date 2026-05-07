/**
 * Storybook global preview configuration.
 *
 * styles.css supplies the --ds-* semantic token layer (defined inside .shell,
 * .stage, and .emphasis class blocks — not :root). Without it every var(--ds-*)
 * resolves to undefined, making hover/pressed/selected states invisible.
 * The stageDecorator below applies class="stage" so those token definitions
 * become active for every story.
 */
import '../packages/styles/css/styles.css';
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
import '../packages/styles/scss/components/popover/index.scss';
import '../packages/styles/scss/components/pagination/index.scss';
import '../packages/styles/scss/components/cells-standard/index.scss';
import React from 'react';

const stageDecorator = (Story) => React.createElement('div', { className: 'stage', style: { padding: '0' } }, React.createElement(Story));

/** @type {import('@storybook/react').Preview} */
const preview = {
  decorators: [stageDecorator],
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
