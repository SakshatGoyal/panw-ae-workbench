/**
 * ai-interactions/Prompt Entry Field
 *
 * The AI prompt input surface. Three states:
 *   static     — resting, unfocused, placeholder text dim,  tile shadow
 *   active     — user is typing, text primary,              persistent shadow + brand border
 *   generating — AI responding, stop button, shimmer,       persistent shadow + brand border
 *
 * Contextual additions (sit inside the card, above the textarea):
 *   WithAttachments — file tags (large, Paperclip + close) in a flex-wrap cluster.
 *                     Each tag capped at 160px with label truncation + hover tooltip.
 *                     The ✕ on the tag removes that individual attachment.
 *   WithTableRef    — selected row/column reference block. surface.alt-rest bg +
 *                     1px border. Cobalt-low rounded tag (Row / Column), CSV values
 *                     with first value bold, ghost ✕ icon button dismisses the block.
 *
 * Token contract:
 *   background   var(--ds-surface-rest)
 *   border       var(--ds-lines-neutral-tile-rest)  → var(--ds-lines-brand-rest) on focus/generating
 *   radius       var(--ds-radius-standard)  8px
 *   shadow-rest  var(--ds-shadow-tiles)
 *   shadow-live  var(--ds-shadow-persistent)
 *   text         var(--ds-text-primary)     (user input)
 *   placeholder  var(--ds-text-placeholder-rest)
 *   table ref bg var(--ds-surface-alt-rest)
 *   table ref    var(--ds-lines-neutral-tile-rest)  1px border
 */
import type { Meta, StoryObj } from '@storybook/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IconButton } from '@ds/button'
import { Tags } from '@ds/tags'
import { Tooltip } from '@ds/tooltip'
import { ArrowUp, Close, Columns, GridHorizontal, Paperclip, Plus, Stop } from '@ds/icons'
import './prompt-entry-field.css'

// ─── Types ──────────────────────────────────────────────────────────────────

type PromptState = 'static' | 'active' | 'generating'

interface Attachment {
  name: string
}

interface TableRef {
  /** Whether the reference is a table row or column selection. */
  type: 'row' | 'column'
  /** Cell values. First entry is the anchor (bold); rest are comma-separated. */
  values: string[]
}

interface PromptEntryFieldProps {
  /** Controlled visual state — omit for uncontrolled interactive use */
  state?: PromptState
  placeholder?: string
  /** Controlled value — omit to let the field manage its own text */
  value?: string
  onSubmit?: (value: string) => void
  onStop?: () => void
  onChange?: (value: string) => void
  /** File attachments shown above the textarea as closeable tags */
  attachments?: Attachment[]
  /** Called with the removed attachment's index */
  onRemoveAttachment?: (index: number) => void
  /** Table row/column reference shown above the textarea */
  tableRef?: TableRef
  /** Called when the user dismisses the table reference */
  onRemoveTableRef?: () => void
}

// ─── PEFAttachmentTag ────────────────────────────────────────────────────────

function PEFAttachmentTag({ name, onRemove }: Attachment & { onRemove: () => void }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span
      className="pef__attachment-wrap"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Tags
        size="large"
        icon
        renderIcon={Paperclip}
        label={name}
        color="grey"
        contrast="low"
        close
        onClose={(e) => { e.stopPropagation(); onRemove() }}
      />
      {showTooltip && (
        <span className="pef__attachment-tooltip">
          <Tooltip pointerDirection="bottom" content={name} />
        </span>
      )}
    </span>
  )
}

// ─── PEFTableRefBlock ─────────────────────────────────────────────────────────

function PEFTableRefBlock({ type, values, onRemove }: TableRef & { onRemove: () => void }) {
  const Icon = type === 'column' ? Columns : GridHorizontal
  const [first, ...rest] = values

  return (
    <div className="pef__table-ref">
      <div className="pef__table-ref-body">
        <div className="pef__table-ref-header">
          <Tags
            size="default"
            color="cobalt"
            contrast="low"
            shape="rounded"
            icon
            renderIcon={Icon}
            label={type === 'row' ? 'Row' : 'Column'}
          />
        </div>
        <p className="pef__table-ref-values">
          <span className="pef__table-ref-first">{first}</span>
          {rest.length > 0 && <span>, {rest.join(', ')}</span>}
        </p>
      </div>
      <div className="pef__table-ref-close">
        <IconButton
          kind="ghost"
          size="sm"
          iconSize={16}
          renderIcon={Close}
          aria-label="Remove table reference"
          onClick={onRemove}
        />
      </div>
    </div>
  )
}

// ─── Component ──────────────────────────────────────────────────────────────

function PromptEntryField({
  state,
  placeholder = 'Ready when you are…',
  value: controlledValue,
  onSubmit,
  onStop,
  onChange,
  attachments,
  onRemoveAttachment,
  tableRef,
  onRemoveTableRef,
}: PromptEntryFieldProps) {
  const [internalValue, setInternalValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const value = controlledValue !== undefined ? controlledValue : internalValue

  // Derive state when not controlled externally
  const resolvedState: PromptState =
    state ??
    (isFocused || value.trim().length > 0 ? 'active' : 'static')

  const isGenerating = resolvedState === 'generating'
  const isElevated = resolvedState === 'active' || resolvedState === 'generating'
  const hasText = value.trim().length > 0

  // Auto-grow textarea with content
  const syncHeight = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [])

  useEffect(() => {
    syncHeight()
  }, [value, syncHeight])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value
    if (controlledValue === undefined) setInternalValue(next)
    onChange?.(next)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter submits; Shift+Enter inserts newline
    if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
      e.preventDefault()
      if (hasText) {
        onSubmit?.(value)
        if (controlledValue === undefined) setInternalValue('')
      }
    }
  }

  const handleSubmit = () => {
    if (isGenerating) return
    onSubmit?.(value)
    if (controlledValue === undefined) setInternalValue('')
  }

  return (
    <div
      className={[
        'pef',
        isElevated ? 'pef--elevated' : '',
        resolvedState === 'active' ? 'pef--active' : '',
        isGenerating ? 'pef--generating' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="group"
      aria-label="AI prompt input"
    >
      {/* Attachment tags — sit above the textarea, each removable */}
      {attachments && attachments.length > 0 && (
        <div className="pef__attachments">
          {attachments.map((a, i) => (
            <PEFAttachmentTag
              key={i}
              name={a.name}
              onRemove={() => onRemoveAttachment?.(i)}
            />
          ))}
        </div>
      )}

      {/* Table reference block — sits above the textarea, dismissable */}
      {tableRef && (
        <PEFTableRefBlock
          {...tableRef}
          onRemove={() => onRemoveTableRef?.()}
        />
      )}

      <textarea
        ref={textareaRef}
        className="pef__textarea"
        placeholder={placeholder}
        value={value}
        rows={1}
        disabled={isGenerating}
        aria-label="Prompt"
        aria-multiline="true"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <div className="pef__actions">
        {/* Attach / add action — left anchor */}
        <IconButton
          kind="ghost"
          size="sm"
          iconSize={16}
          renderIcon={Plus}
          aria-label="Attach"
          disabled={isGenerating}
        />

        {/* Submit / stop — right anchor */}
        <IconButton
          kind={isGenerating ? 'secondary' : 'primary'}
          size="sm"
          iconSize={16}
          renderIcon={isGenerating ? Stop : ArrowUp}
          aria-label={isGenerating ? 'Stop generation' : 'Submit prompt'}
          onClick={isGenerating ? onStop : handleSubmit}
        />
      </div>
    </div>
  )
}

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<typeof PromptEntryField> = {
  title: 'ai-interactions/Prompt Entry Field',
  component: PromptEntryField,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof PromptEntryField>

// ─── Stories ─────────────────────────────────────────────────────────────────

/**
 * Interactive — uncontrolled. Type to switch to active state, submit to clear.
 * Shift+Enter for newline. Demonstrates auto-grow.
 */
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [submitted, setSubmitted] = useState<string[]>([])
    return (
      <div className="pef-canvas">
        <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <PromptEntryField
            onSubmit={(v) => setSubmitted((prev) => [v, ...prev].slice(0, 4))}
          />
          {submitted.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {submitted.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: 'var(--ds-type-font-family-sans)',
                    fontSize: 13,
                    lineHeight: '18px',
                    color: 'var(--ds-text-secondary-rest)',
                    padding: '8px 12px',
                    background: 'var(--ds-surface-rest)',
                    border: '1px solid var(--ds-lines-neutral-tile-rest)',
                    borderRadius: 'var(--ds-radius-standard)',
                  }}
                >
                  {msg}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
}

/**
 * All three states shown simultaneously — use this for visual QA.
 */
export const AllStates: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isGenerating, setIsGenerating] = useState(false)
    return (
      <div className="pef-canvas">
        <div className="pef-demo">
          {/* Static */}
          <div className="pef-demo__group">
            <div className="pef-demo__label">Static</div>
            <PromptEntryField state="static" />
          </div>

          {/* Active */}
          <div className="pef-demo__group">
            <div className="pef-demo__label">Active</div>
            <PromptEntryField
              state="active"
              value="How does Strata Cloud Manager help reduce operational overhead?"
            />
          </div>

          {/* Generating */}
          <div className="pef-demo__group">
            <div className="pef-demo__label">Generation in progress</div>
            <PromptEntryField
              state="generating"
              onStop={() => setIsGenerating(false)}
            />
          </div>
        </div>
      </div>
    )
  },
}

/**
 * WithAttachments — one or more file tags sit inside the card above the textarea.
 * Each tag has a close button to remove that file. Hover to see the full filename tooltip.
 * The third attachment has a long name to verify truncation + tooltip.
 */
export const WithAttachments: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [attachments, setAttachments] = useState<Attachment[]>([
      { name: 'Zeta Corp — Executive Briefing.pdf' },
      { name: 'Q2 Deal Review Slides.pptx' },
      { name: 'Meridian Health Technical Architecture Overview v3 Final.docx' },
    ])

    return (
      <div className="pef-canvas">
        <div className="pef-demo">
          <div className="pef-demo__group">
            <div className="pef-demo__label">With attachments — click ✕ to remove</div>
            <PromptEntryField
              attachments={attachments}
              onRemoveAttachment={(i) =>
                setAttachments((prev) => prev.filter((_, idx) => idx !== i))
              }
              placeholder="Ask about these documents…"
            />
          </div>

          <div className="pef-demo__group">
            <div className="pef-demo__label">Single attachment</div>
            <PromptEntryField
              attachments={[{ name: 'Apex Logistics POC Scope.pdf' }]}
              onRemoveAttachment={() => {}}
              placeholder="Ask about this document…"
            />
          </div>
        </div>
      </div>
    )
  },
}

/**
 * WithTableRef — a row or column selection from a table sits inside the card
 * above the textarea. The ghost ✕ button on the right dismisses it.
 */
export const WithTableRef: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rowRef, setRowRef] = useState<TableRef | undefined>({
      type: 'row',
      values: ['Zeta Corp', '$1.2M', 'Technical Eval', 'Q2 2025', 'John Smith'],
    })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [colRef, setColRef] = useState<TableRef | undefined>({
      type: 'column',
      values: ['Close Date', 'Mar 31', 'Apr 15', 'Jun 30', 'Jun 30', 'May 1'],
    })

    return (
      <div className="pef-canvas">
        <div className="pef-demo">
          <div className="pef-demo__group">
            <div className="pef-demo__label">Row reference — click ✕ to dismiss</div>
            <PromptEntryField
              tableRef={rowRef}
              onRemoveTableRef={() => setRowRef(undefined)}
              placeholder="Ask about this row…"
            />
          </div>

          <div className="pef-demo__group">
            <div className="pef-demo__label">Column reference — click ✕ to dismiss</div>
            <PromptEntryField
              tableRef={colRef}
              onRemoveTableRef={() => setColRef(undefined)}
              placeholder="Ask about this column…"
            />
          </div>
        </div>
      </div>
    )
  },
}

/**
 * WithBoth — attachments and a table reference shown together.
 */
export const WithBoth: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [attachments, setAttachments] = useState<Attachment[]>([
      { name: 'Zeta Corp — Executive Briefing.pdf' },
      { name: 'Q2 Deal Review Slides.pptx' },
    ])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [tableRef, setTableRef] = useState<TableRef | undefined>({
      type: 'row',
      values: ['Zeta Corp', '$1.2M', 'Technical Eval', 'Q2 2025', 'John Smith'],
    })

    return (
      <div className="pef-canvas">
        <div style={{ width: '100%', maxWidth: 480 }}>
          <PromptEntryField
            attachments={attachments}
            onRemoveAttachment={(i) =>
              setAttachments((prev) => prev.filter((_, idx) => idx !== i))
            }
            tableRef={tableRef}
            onRemoveTableRef={() => setTableRef(undefined)}
            placeholder="Combine all of this context to…"
          />
        </div>
      </div>
    )
  },
}

/**
 * Simulated generation flow — Submit triggers a fake 3-second generation
 * cycle, then resets. Shows the full state machine in one component.
 */
export const GenerationFlow: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [promptState, setPromptState] = useState<PromptState>('static')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleSubmit = (v: string) => {
      setValue('')
      setPromptState('generating')
      timerRef.current = setTimeout(() => setPromptState('static'), 3000)
    }

    const handleStop = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      setPromptState('static')
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

    return (
      <div className="pef-canvas">
        <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontFamily: 'var(--ds-type-font-family-sans)',
              fontSize: 12,
              color: 'var(--ds-text-tertiary-rest)',
              letterSpacing: '0.01em',
            }}
          >
            {promptState === 'static' && 'Type a prompt and press Enter or ↑ to submit.'}
            {promptState === 'active' && 'Press Enter or ↑ to submit.'}
            {promptState === 'generating' && 'Generating… press ■ to stop.'}
          </div>
          <PromptEntryField
            state={promptState}
            value={value}
            onChange={(v) => {
              setValue(v)
              if (promptState !== 'generating') {
                setPromptState(v.trim().length > 0 ? 'active' : 'static')
              }
            }}
            onSubmit={handleSubmit}
            onStop={handleStop}
          />
        </div>
      </div>
    )
  },
}
