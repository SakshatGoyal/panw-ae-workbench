/**
 * ai-interactions/Suggestions
 *
 * Sidebar list of AI-generated prompt suggestions.
 * Rendered as Button kind="secondary" with four inline overrides:
 *
 *   height: auto          removes the size-class fixed height
 *   white-space: normal   overrides button-reset nowrap → text wraps
 *   align-items: flex-start  icon tracks first line on multi-line text
 *   width: 100%           fills the list container
 *
 * Everything else — surface.rest bg, lines.neutral border, text.primary,
 * hover/active states, radius.tight, icon slot — is owned by the Button.
 *
 * Token contract (inherited from Button kind="secondary"):
 *   bg-rest     var(--ds-surface-rest)
 *   bg-hover    var(--ds-surface-hover)         border drops to transparent
 *   bg-pressed  var(--ds-surface-pressed)       border drops to transparent
 *   border      var(--ds-lines-neutral-rest)     neutral20 at rest
 *   text        var(--ds-text-primary)
 *   radius      var(--ds-radius-tight)           4px
 */
import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Button } from '@ds/button'
import { Comment } from '@ds/icons'
import './suggestions.css'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SuggestionItem {
  id: string
  label: string
}

interface SuggestionsProps {
  suggestions?: SuggestionItem[]
  onSelect?: (id: string) => void
}

// ─── Default suggestion data ──────────────────────────────────────────────────

const DEFAULT_SUGGESTIONS: SuggestionItem[] = [
  {
    id: '1',
    label: 'How does Strata Cloud Manager reduce operational overhead?',
  },
  {
    id: '2',
    label: 'Walk me through a Cortex XSOAR phishing playbook',
  },
  {
    id: '3',
    label: "What's the ROI of SASE for enterprise deployments?",
  },
  {
    id: '4',
    label: 'Compare Prisma Cloud to our current CSPM solution',
  },
  {
    id: '5',
    label: 'How does zero trust improve our compliance posture?',
  },
]

// ─── Inline override style ────────────────────────────────────────────────────

// Applied to every suggestion Button to unlock height and wrapping.
// These four properties are the only divergence from Button's default contract.
const wrapStyle: React.CSSProperties = {
  height: 'auto',
  whiteSpace: 'normal',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  textAlign: 'left',
  width: '100%',
  gap: '8px',              // doubles the Button's default 4px icon-to-text gap
}

// ─── Composed list ────────────────────────────────────────────────────────────

function Suggestions({
  suggestions = DEFAULT_SUGGESTIONS,
  onSelect,
}: SuggestionsProps) {
  return (
    <div className="sg-list">
      {suggestions.map((item) => (
        <Button
          key={item.id}
          kind="secondary"
          size="small"
          renderIcon={Comment}
          style={wrapStyle}
          onClick={() => onSelect?.(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Suggestions> = {
  title: 'ai-interactions/Suggestions',
  component: Suggestions,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof Suggestions>

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Interactive — click a suggestion to fire onSelect. Logged in the event strip.
 */
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [events, setEvents] = useState<string[]>([])
    const log = (msg: string) =>
      setEvents((prev) => [msg, ...prev].slice(0, 6))

    return (
      <div className="sg-canvas">
        <div className="sg-demo">
          <div className="sg-demo__group">
            <div className="sg-demo__label">Suggested prompts</div>
            <Suggestions
              onSelect={(id) => {
                const item = DEFAULT_SUGGESTIONS.find((s) => s.id === id)
                log(`Selected → "${item?.label ?? id}"`)
              }}
            />
          </div>

          {events.length > 0 && (
            <div className="sg-demo__group">
              <div className="sg-demo__label">Event log</div>
              <div className="sg-event-log">
                {events.map((e, i) => (
                  <div key={i} className="sg-event-log__entry">
                    {e}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  },
}

/**
 * Static snapshot — all rows at once for visual token and spacing QA.
 */
export const AllRows: Story = {
  render: () => (
    <div className="sg-canvas">
      <div className="sg-demo">
        <div className="sg-demo__group">
          <div className="sg-demo__label">Suggested prompts</div>
          <Suggestions />
        </div>
      </div>
    </div>
  ),
}

/**
 * Truncation stress-test — long labels confirm wrapping fires before
 * the container grows unbounded.
 */
export const LongLabels: Story = {
  render: () => {
    const longSuggestions: SuggestionItem[] = [
      {
        id: 'a',
        label:
          'What is the complete end-to-end architecture for deploying Prisma Access across a globally distributed enterprise with over 50,000 endpoints?',
      },
      {
        id: 'b',
        label:
          'Explain how Cortex XDR correlates alerts from endpoint, network, and cloud telemetry to produce a unified incident timeline',
      },
      {
        id: 'c',
        label:
          'How does Panorama centralise policy management for NGFWs deployed across hybrid environments without introducing configuration drift?',
      },
      { id: 'd', label: 'Short suggestion' },
      {
        id: 'e',
        label: 'Walk me through a zero trust segmentation model for OT networks',
      },
    ]
    return (
      <div className="sg-canvas">
        <div className="sg-demo">
          <div className="sg-demo__group">
            <div className="sg-demo__label">Long labels</div>
            <Suggestions suggestions={longSuggestions} />
          </div>
        </div>
      </div>
    )
  },
}
