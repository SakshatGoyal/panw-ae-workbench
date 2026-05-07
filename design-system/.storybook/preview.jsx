/**
 * Storybook global preview configuration.
 *
 * styles.css supplies the --ds-* semantic token layer. Those tokens are defined
 * inside .stage {} (and .shell, .emphasis), NOT in :root. The component-level
 * --panw-* tokens live in :root and reference var(--ds-*). CSS custom properties
 * compute at the element level: if var(--ds-highlight-hover) is evaluated on
 * <html> (= :root) and --ds-highlight-hover isn't defined there, the resolved
 * value is the guaranteed-invalid value — which then propagates to ALL
 * descendants, bypassing any .stage ancestor div. The fix is to add .stage
 * directly to <html> so that :root and .stage are on the same element.
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
import '../packages/styles/scss/components/text-entry/index.scss';
import '../packages/styles/scss/components/tooltip/index.scss';
import '../packages/styles/scss/components/popover/index.scss';
import '../packages/styles/scss/components/pagination/index.scss';
import '../packages/styles/scss/components/cells-standard/index.scss';

// Apply .stage to <html> so --ds-* tokens (defined in .stage{}) are available
// on :root, which is where the --panw-* component tokens compute their var()
// references. A descendant .stage div would not work because :root computes
// var(--ds-*) before that element exists in the cascade direction.
document.documentElement.classList.add('stage');

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
