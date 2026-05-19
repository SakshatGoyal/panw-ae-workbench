/**
 * ai-interactions/Chat Window Header
 *
 * Fixed 48px header bar for the AI chat panel. Two variants:
 *
 *   NoActiveChat  — zero state. Placeholder text, no controls.
 *   ActiveChat    — session live. Back ← | session name (truncating) | ⋮ + icon.
 *
 * Layout (Active):
 *   [ArrowLeft ghost sm]  12px  [session name flex:1 truncate]  [Overflow ghost sm][4px][Plus ghost sm]
 *   8px padding left/right.
 *
 * Options flyout:
 *   Rename (Edit icon) — neutral
 *   Delete (Delete icon) — danger treatment via ghost.danger
 *
 * Token contract:
 *   border-bottom    var(--ds-lines-neutral-tile-rest)
 *   session name     var(--ds-text-primary)            14px/600 heading-01
 *   placeholder      var(--ds-text-tertiary-rest)      same scale, dimmed
 *   icon buttons     kind="ghost" size="sm"
 */
import type { Meta, StoryObj } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { IconButton } from '@ds/button'
import { Flyout, FlyoutList, FlyoutItem } from '@ds/flyout'
import { ArrowLeft, Delete, Edit, More, Plus } from '@ds/icons'
import './chat-window-header.css'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatWindowHeaderProps {
  /** Active session name. Omit (or pass undefined) for the zero/empty state. */
  sessionName?: string
  onBack?: () => void
  onNewChat?: () => void
  onRename?: () => void
  onDelete?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

function ChatWindowHeader({
  sessionName,
  onBack,
  onNewChat,
  onRename,
  onDelete,
}: ChatWindowHeaderProps) {
  const optionsAnchorRef = useRef<HTMLButtonElement>(null)
  const [optionsOpen, setOptionsOpen] = useState(false)

  const isActive = sessionName !== undefined

  const handleSelection = (value: string | string[]) => {
    const selected = Array.isArray(value) ? value[0] : value
    setOptionsOpen(false)
    if (selected === 'rename') onRename?.()
    if (selected === 'delete') onDelete?.()
  }

  // ─ Empty state ─────────────────────────────────────────────────────────────
  if (!isActive) {
    return (
      <div className="cwh">
        <span className="cwh__placeholder">Hello Again</span>
      </div>
    )
  }

  // ─ Active state ────────────────────────────────────────────────────────────
  return (
    <div className="cwh">
      {/* Back */}
      <div className="cwh__back">
        <IconButton
          kind="ghost"
          size="sm"
          iconSize={16}
          renderIcon={ArrowLeft}
          aria-label="Back"
          onClick={onBack}
        />
      </div>

      {/* Session name */}
      <span className="cwh__title" title={sessionName}>
        {sessionName}
      </span>

      {/* Right cluster: Options + New Chat */}
      <div className="cwh__actions">
        {/* Options (vertical overflow) */}
        <IconButton
          ref={optionsAnchorRef}
          kind="ghost"
          size="sm"
          iconSize={16}
          renderIcon={More}
          aria-label="Session options"
          aria-expanded={optionsOpen}
          onClick={() => setOptionsOpen((v) => !v)}
        />

        <Flyout
          open={optionsOpen}
          onOpenChange={setOptionsOpen}
          anchorRef={optionsAnchorRef}
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
              className="cwh-flyout-item--danger"
            >
              Delete
            </FlyoutItem>
          </FlyoutList>
        </Flyout>

        {/* New Chat */}
        <IconButton
          kind="ghost"
          size="sm"
          iconSize={16}
          renderIcon={Plus}
          aria-label="New chat"
          onClick={onNewChat}
        />
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ChatWindowHeader> = {
  title: 'ai-interactions/Chat Window Header',
  component: ChatWindowHeader,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof ChatWindowHeader>

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * No active session — zero state.
 * Placeholder text at heading-01 scale, tertiary weight.
 */
export const NoActiveChat: Story = {
  render: () => (
    <div className="cwh-canvas">
      <div className="cwh-demo">
        <div className="cwh-demo__group">
          <div className="cwh-demo__label">No active chat</div>
          <div className="cwh-panel">
            <ChatWindowHeader />
            <div className="cwh-panel__body">Chat body area</div>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Active session — interactive. Back, Options (flyout), and New Chat fire
 * events into the log strip below the panel.
 */
export const ActiveChat: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [events, setEvents] = useState<string[]>([])
    const log = (msg: string) => setEvents((prev) => [msg, ...prev].slice(0, 6))

    return (
      <div className="cwh-canvas">
        <div className="cwh-demo">
          <div className="cwh-demo__group">
            <div className="cwh-demo__label">Active chat</div>
            <div className="cwh-panel">
              <ChatWindowHeader
                sessionName="How does Strata Cloud Manager reduce operational overhead?"
                onBack={() => log('Back — return to session list')}
                onNewChat={() => log('New Chat — session started')}
                onRename={() => log('Rename — editing session name')}
                onDelete={() => log('Delete — session removed')}
              />
              <div className="cwh-panel__body">Chat body area</div>
            </div>
          </div>

          {events.length > 0 && (
            <div className="cwh-demo__group">
              <div className="cwh-demo__label">Event log</div>
              <div className="cwh-event-log">
                {events.map((e, i) => (
                  <div key={i} className="cwh-event-log__entry">
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
 * Truncation test — a very long session name that must clip to a single line
 * without wrapping or overflowing the header bounds.
 */
export const LongSessionName: Story = {
  render: () => (
    <div className="cwh-canvas">
      <div className="cwh-demo">
        <div className="cwh-demo__group">
          <div className="cwh-demo__label">Long session name</div>
          <div className="cwh-panel">
            <ChatWindowHeader
              sessionName="What is the complete end-to-end architecture for deploying Prisma Access across a globally distributed enterprise with over 50,000 endpoints and multiple cloud regions?"
            />
            <div className="cwh-panel__body">Chat body area</div>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * Both states side by side — quick reference for visual comparison.
 */
export const BothStates: Story = {
  render: () => (
    <div className="cwh-canvas">
      <div className="cwh-demo">
        <div className="cwh-demo__group">
          <div className="cwh-demo__label">No active chat</div>
          <div className="cwh-panel">
            <ChatWindowHeader />
            <div className="cwh-panel__body">Chat body area</div>
          </div>
        </div>
        <div className="cwh-demo__group">
          <div className="cwh-demo__label">Active chat</div>
          <div className="cwh-panel">
            <ChatWindowHeader sessionName="Compare Prisma Cloud to our current CSPM solution" />
            <div className="cwh-panel__body">Chat body area</div>
          </div>
        </div>
      </div>
    </div>
  ),
}
