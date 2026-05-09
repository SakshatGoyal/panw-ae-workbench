import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/system.scss'

// The .stage class is what activates Stage's semantic CSS variables
// (--ds-text-primary, --ds-surface-rest, --ds-tag-grey-low-bg, …).
// Without it, every var(--ds-*) reference resolves to empty and components
// render as un-themed fallbacks.
//
// We apply .stage to document.body, not to a React wrapper — Flyout, Popover,
// and Tooltip portal to document.body and would escape any in-tree wrapper,
// rendering with broken backgrounds. Putting the class on body itself ensures
// every descendant (in-tree and portaled) inherits the mode.
const StageDecorator: NonNullable<Preview['decorators']>[number] = (Story) => {
  React.useEffect(() => {
    document.body.classList.add('stage')
    return () => { document.body.classList.remove('stage') }
  }, [])
  return React.createElement(Story)
}

const preview: Preview = {
  parameters: { layout: 'fullscreen' },
  decorators: [StageDecorator]
}

export default preview
