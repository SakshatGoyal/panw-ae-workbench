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

// StoryErrorBoundary — catches render/effect errors so one broken story
// doesn't crash the entire Storybook session. Especially important for
// AI-interaction components that may throw during async state transitions.
class StoryErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[StoryErrorBoundary]', error, info.componentStack)
  }

  override render() {
    if (this.state.error) {
      return React.createElement(
        'div',
        {
          style: {
            padding: '24px',
            fontFamily: 'monospace',
            fontSize: '13px',
            color: '#e54646',
            background: '#1a1a1a',
            borderRadius: '6px',
            margin: '16px',
            whiteSpace: 'pre-wrap',
          }
        },
        `Story threw:\n\n${this.state.error.message}\n\n${this.state.error.stack ?? ''}`
      )
    }
    return this.props.children
  }
}

// SafeStoryDecorator wraps every story in:
//   1. Suspense — needed for React 19 use() and any async/streaming patterns
//   2. StoryErrorBoundary — isolates render failures to the story, not Storybook
const SafeStoryDecorator: NonNullable<Preview['decorators']>[number] = (Story) => {
  return React.createElement(
    StoryErrorBoundary,
    null,
    React.createElement(
      React.Suspense,
      {
        fallback: React.createElement(
          'div',
          { style: { padding: '24px', color: 'var(--ds-text-secondary, #888)', fontSize: '13px' } },
          'Loading…'
        )
      },
      React.createElement(Story)
    )
  )
}

const preview: Preview = {
  parameters: { layout: 'fullscreen' },
  decorators: [StageDecorator, SafeStoryDecorator]
}

export default preview
