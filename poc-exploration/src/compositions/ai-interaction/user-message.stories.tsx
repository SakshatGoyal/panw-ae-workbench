/**
 * ai-interactions/User Message
 *
 * The user's own chat bubble in the AI conversation panel. Full container
 * width (420px story canvas). Three additive variants:
 *
 *   Plain          — body text only.
 *
 *   WithAttachments — file tags (large, Paperclip icon) float above the
 *                    bubble as a separate cluster. Each tag capped at 160px
 *                    with label truncation; hover reveals a Tooltip with the
 *                    full filename. Tags wrap at 4px gap.
 *
 *   WithTableRef   — a selected table row or column floats above the bubble
 *                    as a standalone block. surface.alt-rest bg + 1px border,
 *                    a small cobalt-low rounded tag (Row / Column label), and
 *                    the cell values in CSV style with the first value bold.
 *
 * Token contract:
 *   bubble bg          var(--ds-highlight-rest)      brand-tinted
 *   bubble radius      var(--ds-radius-standard)     8px
 *   bubble padding     12px (v) × 16px (h)
 *   table ref bg       var(--ds-surface-alt-rest)
 *   table ref radius   var(--ds-radius-tight)        4px — inner ≤ outer
 *   body text          var(--ds-text-primary)        14px / 400 / 20px
 *   first CSV value    font-weight 600
 */
import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Tags } from '@ds/tags'
import { Tooltip } from '@ds/tooltip'
import { Columns, GridHorizontal, Paperclip } from '@ds/icons'
import './user-message.css'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Attachment {
  name: string
}

interface TableRef {
  /** Whether this reference is a table row or column selection. */
  type: 'row' | 'column'
  /** Cell values. First entry is the anchor (bold); rest are comma-separated. */
  values: string[]
}

interface UserMessageProps {
  text: string
  attachments?: Attachment[]
  tableRef?: TableRef
}

// ─── AttachmentTag ────────────────────────────────────────────────────────────

function AttachmentTag({ name }: Attachment) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span
      className="um__attachment-wrap"
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
      />
      {showTooltip && (
        <span className="um__attachment-tooltip">
          <Tooltip pointerDirection="bottom" content={name} />
        </span>
      )}
    </span>
  )
}

// ─── TableRefBlock ────────────────────────────────────────────────────────────

function TableRefBlock({ type, values }: TableRef) {
  const Icon = type === 'column' ? Columns : GridHorizontal
  const [first, ...rest] = values

  return (
    <div className="um__table-ref">
      <div className="um__table-ref-header">
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
      <p className="um__table-ref-values">
        <span className="um__table-ref-first">{first}</span>
        {rest.length > 0 && (
          <span className="um__table-ref-rest">, {rest.join(', ')}</span>
        )}
      </p>
    </div>
  )
}

// ─── UserMessage ──────────────────────────────────────────────────────────────

function UserMessage({ text, attachments, tableRef }: UserMessageProps) {
  return (
    <div className="um-message-group">
      {attachments && attachments.length > 0 && (
        <div className="um__attachments">
          {attachments.map((a, i) => (
            <AttachmentTag key={i} name={a.name} />
          ))}
        </div>
      )}
      {tableRef && <TableRefBlock {...tableRef} />}
      <div className="um">
        <p className="um__text">{text}</p>
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'ai-interactions/User Message',
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Plain — body text only. No attachments, no reference.
 */
export const Plain: Story = {
  render: () => (
    <div className="um-canvas">
      <div className="um-demo">
        <div className="um-demo__group">
          <div className="um-demo__label">Plain message</div>
          <UserMessage text="Which of my Prisma Cloud deals in AMER are stalled at technical evaluation?" />
        </div>
      </div>
    </div>
  ),
}

/**
 * WithAttachments — one or more file tags sit above the message text.
 * Hover any tag to see the full filename in a tooltip.
 * The third attachment has a long filename to verify truncation + tooltip.
 */
export const WithAttachments: Story = {
  render: () => (
    <div className="um-canvas">
      <div className="um-demo">
        <div className="um-demo__group">
          <div className="um-demo__label">With attachments</div>
          <UserMessage
            attachments={[
              { name: 'Zeta Corp — Executive Briefing.pdf' },
              { name: 'Q2 Deal Review Slides.pptx' },
              { name: 'Meridian Health Technical Architecture Overview v3 Final.docx' },
            ]}
            text="Based on these documents, summarize the open technical blockers for each account and suggest next steps."
          />
        </div>

        <div className="um-demo__group">
          <div className="um-demo__label">Single attachment</div>
          <UserMessage
            attachments={[{ name: 'Apex Logistics POC Scope.pdf' }]}
            text="Does this POC scope align with standard Prisma Cloud deployment requirements?"
          />
        </div>

        <div className="um-demo__group">
          <div className="um-demo__label">Many attachments — wrapping test</div>
          <UserMessage
            attachments={[
              { name: 'Zeta Corp Brief.pdf' },
              { name: 'Meridian Health Call Notes.docx' },
              { name: 'Apex Logistics Scope.pdf' },
              { name: 'Q2 Pipeline Review.xlsx' },
              { name: 'AMER Technical Eval Tracker.xlsx' },
            ]}
            text="Cross-reference these and flag any deal where the POC deadline is within 30 days."
          />
        </div>
      </div>
    </div>
  ),
}

/**
 * WithTableRef — a row or column selection from a table is attached as
 * a reference block. The first cell value is bold; the rest are comma-separated.
 */
export const WithTableRef: Story = {
  render: () => (
    <div className="um-canvas">
      <div className="um-demo">
        <div className="um-demo__group">
          <div className="um-demo__label">Row reference</div>
          <UserMessage
            tableRef={{
              type: 'row',
              values: ['Zeta Corp', '$1.2M', 'Technical Eval', 'Q2 2025', 'John Smith'],
            }}
            text="This deal has been stuck for 6 weeks. What should my next outreach look like?"
          />
        </div>

        <div className="um-demo__group">
          <div className="um-demo__label">Column reference</div>
          <UserMessage
            tableRef={{
              type: 'column',
              values: ['Close Date', 'Mar 31', 'Apr 15', 'Jun 30', 'Jun 30', 'May 1'],
            }}
            text="Which of these close dates are realistic given current deal velocity?"
          />
        </div>
      </div>
    </div>
  ),
}

/**
 * AllVariants — all three states side by side for visual comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="um-canvas">
      <div className="um-demo">
        <div className="um-demo__group">
          <div className="um-demo__label">Plain</div>
          <UserMessage text="Which of my Prisma Cloud deals in AMER are stalled at technical evaluation?" />
        </div>

        <div className="um-demo__group">
          <div className="um-demo__label">With attachments</div>
          <UserMessage
            attachments={[
              { name: 'Zeta Corp — Executive Briefing.pdf' },
              { name: 'Q2 Deal Review Slides.pptx' },
            ]}
            text="Based on these documents, summarize the open technical blockers for each account."
          />
        </div>

        <div className="um-demo__group">
          <div className="um-demo__label">With table row reference</div>
          <UserMessage
            tableRef={{
              type: 'row',
              values: ['Zeta Corp', '$1.2M', 'Technical Eval', 'Q2 2025', 'John Smith'],
            }}
            text="This deal has been stuck for 6 weeks. What should my next outreach look like?"
          />
        </div>
      </div>
    </div>
  ),
}
