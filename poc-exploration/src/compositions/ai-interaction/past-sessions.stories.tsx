/**
 * ai-interactions/Past Sessions
 *
 * Sidebar list of prior AI chat sessions. Six elements total:
 *   [1–5]  past-session rows — 32px fixed height, ghost bg, truncating label,
 *          kebab overflow menu (Rename / Delete)
 *   [6]    "View more" ghost button — right-aligned, same 32px height
 *
 * Token contract:
 *   bg-rest     var(--ds-ghost-rest)      transparent
 *   bg-hover    var(--ds-ghost-hover)     neutral20@70% (spec: 40% — token used)
 *   bg-press    var(--ds-ghost-pressed)   neutral30@50%
 *   text        var(--ds-text-secondary-rest)
 *   radius      var(--ds-radius-tight)    4px
 *
 * Interaction:
 *   overflow kebab   → Flyout bottom-end with Rename + Delete items
 *   Delete item      → ghost.danger hover/pressed, danger text color
 *   nested hover     → row bg stays rest when kebab or flyout is hovered
 */
import type { Meta, StoryObj } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { Button, IconButton } from '@ds/button'
import { Flyout, FlyoutList, FlyoutItem } from '@ds/flyout'
import { ChevronDown, Delete, Edit, More } from '@ds/icons'
import './past-sessions.css'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SessionItem {
  id: string
  label: string
}

interface PastSessionRowProps {
  item: SessionItem
  onSessionClick: (id: string) => void
  onRename: (id: string) => void
  onDelete: (id: string) => void
}

// ─── Default session data ─────────────────────────────────────────────────────

const DEFAULT_SESSIONS: SessionItem[] = [
  {
    id: '1',
    label: 'How does Strata Cloud Manager reduce operational overhead?',
  },
  {
    id: '2',
    label: 'Cortex XSOAR playbook for phishing response automation',
  },
  {
    id: '3',
    label: 'Prisma Cloud compliance dashboard setup and configuration',
  },
  {
    id: '4',
    label: 'Zero trust network access architecture review',
  },
  {
    id: '5',
    label: 'SASE deployment checklist and enterprise rollout plan',
  },
]

// ─── Single session row ───────────────────────────────────────────────────────

function PastSessionRow({ item, onSessionClick, onRename, onDelete }: PastSessionRowProps) {
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const kebabRef = useRef<HTMLButtonElement>(null)

  // Single-mode Flyout fires onSelectionChange once per click then auto-closes.
  // We use the selected value as an action discriminator — no persistent
  // selection state; selected prop is intentionally omitted so items stay unlit.
  const handleSelection = (values: string[]) => {
    const action = values[0]
    if (action === 'rename') onRename(item.id)
    if (action === 'delete') onDelete(item.id)
  }

  return (
    <div
      className={[
        'ps-row',
        flyoutOpen ? 'ps-row--menu-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="button"
      tabIndex={0}
      aria-label={item.label}
      onClick={() => onSessionClick(item.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSessionClick(item.id)
        }
      }}
    >
      <span className="ps-row__label">{item.label}</span>

      {/* Stop propagation so row click doesn't fire when kebab is clicked */}
      <span className="ps-row__actions" onClick={(e) => e.stopPropagation()}>
        <IconButton
          ref={kebabRef}
          kind="ghost"
          size="sm"
          iconSize={16}
          renderIcon={More}
          aria-label={`Options for ${item.label}`}
          onClick={(e) => {
            e.stopPropagation()
            setFlyoutOpen((v) => !v)
          }}
        />
      </span>

      <Flyout
        open={flyoutOpen}
        onOpenChange={setFlyoutOpen}
        anchorRef={kebabRef}
        mode="single"
        placement="bottom-end"
        onSelectionChange={handleSelection}
      >
        <FlyoutList>
          <FlyoutItem value="rename" renderIcon={Edit}>
            Rename
          </FlyoutItem>
          <FlyoutItem
            value="delete"
            renderIcon={Delete}
            className="ps-flyout-item--danger"
          >
            Delete
          </FlyoutItem>
        </FlyoutList>
      </Flyout>
    </div>
  )
}

// ─── Composed list ────────────────────────────────────────────────────────────

interface PastSessionsProps {
  sessions?: SessionItem[]
  onSessionClick?: (id: string) => void
  onRename?: (id: string) => void
  onDelete?: (id: string) => void
  onViewMore?: () => void
}

function PastSessions({
  sessions = DEFAULT_SESSIONS,
  onSessionClick,
  onRename,
  onDelete,
  onViewMore,
}: PastSessionsProps) {
  return (
    <div>
      <div className="ps-list">
        {sessions.map((item) => (
          <PastSessionRow
            key={item.id}
            item={item}
            onSessionClick={(id) => onSessionClick?.(id)}
            onRename={(id) => onRename?.(id)}
            onDelete={(id) => onDelete?.(id)}
          />
        ))}
      </div>

      <div className="ps-view-more">
        <Button
          kind="ghost"
          size="small"
          renderIcon={ChevronDown}
          iconPosition="right"
          onClick={() => onViewMore?.()}
        >
          View more
        </Button>
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof PastSessions> = {
  title: 'ai-interactions/Past Sessions',
  component: PastSessions,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof PastSessions>

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Interactive — uncontrolled. Click a row to select, the kebab to open the
 * overflow menu. Actions are logged in the event strip below the list.
 */
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sessions, setSessions] = useState<SessionItem[]>(DEFAULT_SESSIONS)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [events, setEvents] = useState<string[]>([])

    const log = (msg: string) =>
      setEvents((prev) => [msg, ...prev].slice(0, 6))

    const handleRename = (id: string) => {
      const session = sessions.find((s) => s.id === id)
      log(`Rename → "${session?.label ?? id}"`)
    }

    const handleDelete = (id: string) => {
      const session = sessions.find((s) => s.id === id)
      log(`Delete → "${session?.label ?? id}"`)
      setSessions((prev) => prev.filter((s) => s.id !== id))
    }

    const handleClick = (id: string) => {
      const session = sessions.find((s) => s.id === id)
      log(`Open → "${session?.label ?? id}"`)
    }

    return (
      <div className="ps-canvas">
        <div className="ps-demo">
          <div className="ps-demo__group">
            <div className="ps-demo__label">Recent sessions</div>
            <PastSessions
              sessions={sessions}
              onSessionClick={handleClick}
              onRename={handleRename}
              onDelete={handleDelete}
              onViewMore={() => log('View more clicked')}
            />
          </div>

          {events.length > 0 && (
            <div className="ps-demo__group">
              <div className="ps-demo__label">Event log</div>
              <div className="ps-event-log">
                {events.map((e, i) => (
                  <div key={i} className="ps-event-log__entry">
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
 * Static snapshot — all 5 rows rendered at once for visual QA.
 * No interaction handlers wired; flyouts still work.
 */
export const AllRows: Story = {
  render: () => (
    <div className="ps-canvas">
      <div className="ps-demo">
        <div className="ps-demo__group">
          <div className="ps-demo__label">Recent sessions</div>
          <PastSessions />
        </div>
      </div>
    </div>
  ),
}

/**
 * Truncation stress-test — labels are all extreme lengths to verify
 * that ellipsis fires correctly and the kebab never shifts out of view.
 */
export const LongLabels: Story = {
  render: () => {
    const longSessions: SessionItem[] = [
      { id: 'a', label: 'This is an extremely long session title that should definitely truncate and never wrap to a second line under any circumstances whatsoever' },
      { id: 'b', label: 'Another very long session about Prisma Cloud configuration with CSPM and CWPP integration steps in a multi-cloud environment' },
      { id: 'c', label: 'Cortex XSOAR: building a comprehensive SOC automation playbook for enterprise incident response workflows' },
      { id: 'd', label: 'Short label' },
      { id: 'e', label: 'Exactly as long as it needs to be — no more, no less.' },
    ]
    return (
      <div className="ps-canvas">
        <div className="ps-demo">
          <div className="ps-demo__group">
            <div className="ps-demo__label">Truncation test</div>
            <PastSessions sessions={longSessions} />
          </div>
        </div>
      </div>
    )
  },
}
