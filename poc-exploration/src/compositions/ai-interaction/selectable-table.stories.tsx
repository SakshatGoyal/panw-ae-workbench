/**
 * ai-interactions/Selectable Table
 *
 * A data table built with @ds/cell-contents and a custom grid layout.
 * Two interaction affordances, both triggered on hover:
 *
 *   Row selector     — A small inverse-bg IconButton floats to the RIGHT of
 *                      the hovered row, 4px outside the table edge, vertically
 *                      centred. A transparent ::after pseudo on the row bridges
 *                      the 4px gap so the button stays visible while the cursor
 *                      crosses it.
 *
 *   Column selector  — A small inverse-bg IconButton floats ABOVE the hovered
 *                      header cell, 4px above the cell top, horizontally
 *                      centred. A transparent ::before pseudo on the header
 *                      cell bridges upward.
 *
 * Row treatment:
 *   • border-radius: var(--ds-radius-standard) — 8px
 *   • Divider lines between rows are standalone 1px elements, NOT borders
 *   • On hover: divider above AND below the hovered row fades out
 *
 * Token contract:
 *   row hover bg        var(--ds-surface-hover)
 *   divider             var(--ds-lines-neutral-tile-rest)   1px horizontal rule
 *   select btn bg       var(--ds-surface-inverse-rest)      dark
 *   select btn icon     var(--ds-text-inverse)              white
 *   header label        var(--ds-text-tertiary-rest)        11px / 700 / uppercase
 *   cell text           var(--ds-text-primary)              14px / 400
 */
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { IconButton } from '@ds/button'
import { CellContents } from '@ds/cell-contents'
import { Header } from '@ds/header'
import { Tags, type TagColor } from '@ds/tags'
import { CommentAdd } from '@ds/icons'
import './selectable-table.css'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Column {
  id: string
  label: string
  align?: 'left' | 'right'
}

interface DealRow {
  id: string
  account: string
  value: string
  stage: string
  health: { label: string; color: TagColor }
  closeDate: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COLUMNS: Column[] = [
  { id: 'account',   label: 'Account',    align: 'left' },
  { id: 'value',     label: 'Value',      align: 'right' },
  { id: 'stage',     label: 'Stage',      align: 'left' },
  { id: 'health',    label: 'Health',     align: 'left' },
  { id: 'closeDate', label: 'Close Date', align: 'left' },
]

const ROWS: DealRow[] = [
  {
    id: '1',
    account: 'Titan Energy Solutions',
    value: '$1.2M',
    stage: 'Stage 5',
    health: { label: 'Healthy', color: 'green' },
    closeDate: 'Mar 7',
  },
  {
    id: '2',
    account: 'Meridian Capital Group',
    value: '$2.4M',
    stage: 'Stage 4',
    health: { label: 'Healthy', color: 'green' },
    closeDate: 'Mar 14',
  },
  {
    id: '3',
    account: 'Nexus Financial Holdings',
    value: '$890K',
    stage: 'Stage 3',
    health: { label: 'At Risk', color: 'orange' },
    closeDate: 'Mar 18',
  },
  {
    id: '4',
    account: 'Vertex Manufacturing Co.',
    value: '$3.1M',
    stage: 'Stage 5',
    health: { label: 'Critical', color: 'red' },
    closeDate: 'Mar 21',
  },
  {
    id: '5',
    account: 'Pacific Commerce Bank',
    value: '$670K',
    stage: 'Stage 2',
    health: { label: 'Critical', color: 'red' },
    closeDate: 'Mar 28',
  },
  {
    id: '6',
    account: 'Axiom Technology Partners',
    value: '$1.7M',
    stage: 'Stage 2',
    health: { label: 'Healthy', color: 'green' },
    closeDate: 'Apr 2',
  },
  {
    id: '7',
    account: 'Summit Healthcare Systems',
    value: '$445K',
    stage: 'Stage 3',
    health: { label: 'At Risk', color: 'orange' },
    closeDate: 'Apr 8',
  },
  {
    id: '8',
    account: 'Harbor Logistics Group',
    value: '$5.2M',
    stage: 'Stage 1',
    health: { label: 'At Risk', color: 'orange' },
    closeDate: 'Apr 15',
  },
]

// ─── SelectButton ─────────────────────────────────────────────────────────────

/**
 * Tiny inverse-background IconButton used for both row and column selection.
 * Rendered via kind="ghost" with CSS overrides to force the dark inverse palette.
 */
function SelectButton({
  ariaLabel,
  icon,
}: {
  ariaLabel: string
  icon: React.ElementType
}) {
  return (
    <IconButton
      kind="ghost"
      size="sm"
      iconSize={16}
      renderIcon={icon}
      aria-label={ariaLabel}
      className="dt__select-btn"
    />
  )
}

// ─── HeaderCell ───────────────────────────────────────────────────────────────

/**
 * A single header cell using @ds/header's Header component.
 * On hover, reveals the column-selector button above it.
 * The ::before pseudo (in CSS) bridges the 4px gap to keep :hover alive.
 */
function HeaderCell({
  column,
  showColSelector,
}: {
  column: Column
  showColSelector: boolean
}) {
  return (
    <div className="dt__header-cell">
      <Header size="sm" alignment={column.align ?? 'left'}>
        {column.label}
      </Header>
      {showColSelector && (
        <div className="dt__col-btn">
          <SelectButton
            ariaLabel={`Select ${column.label} column`}
            icon={CommentAdd}
          />
        </div>
      )}
    </div>
  )
}

// ─── DataRow ──────────────────────────────────────────────────────────────────

/**
 * A single data row. On hover:
 *   - Row background transitions to surface-hover
 *   - Row-selector button appears to the right (4px offset)
 *   - The ::after pseudo bridges the gap so the button stays visible
 * The component reports its hover state upward so the parent can hide adjacent dividers.
 */
function DataRow({
  row,
  showRowSelector,
}: {
  row: DealRow
  showRowSelector: boolean
}) {
  return (
    <div className="dt__row">
      {/* Account */}
      <div className="dt__cell">
        <CellContents content="text" text={row.account} alignment="left" />
      </div>

      {/* Value */}
      <div className="dt__cell">
        <CellContents content="numbers" text={row.value} alignment="right" />
      </div>

      {/* Stage */}
      <div className="dt__cell">
        <CellContents content="text" text={row.stage} alignment="left" />
      </div>

      {/* Health */}
      <div className="dt__cell">
        <Tags
          label={row.health.label}
          color={row.health.color}
          contrast="low"
        />
      </div>

      {/* Close Date */}
      <div className="dt__cell">
        <CellContents content="text" text={row.closeDate} alignment="left" />
      </div>

      {/* Row select button — floats right, outside table */}
      {showRowSelector && (
        <div className="dt__row-btn">
          <SelectButton
            ariaLabel={`Select row: ${row.account}`}
            icon={CommentAdd}
          />
        </div>
      )}
    </div>
  )
}

// ─── SelectableTable ──────────────────────────────────────────────────────────

interface SelectableTableProps {
  showRowSelector?: boolean
  showColSelector?: boolean
}

function SelectableTable({
  showRowSelector = false,
  showColSelector = false,
}: SelectableTableProps) {
  return (
    <div className="dt">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="dt__head">
        {COLUMNS.map(col => (
          <HeaderCell key={col.id} column={col} showColSelector={showColSelector} />
        ))}
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="dt__body">
        {ROWS.map((row, i) => (
          <React.Fragment key={row.id}>
            {/*
              Divider before each row (except the first).
              Hiding on adjacent-row hover is handled entirely in CSS:
                .dt__row:hover + .dt__divider          (hides divider below)
                .dt__divider:has(+ .dt__row:hover)     (hides divider above)
            */}
            {i > 0 && <div className="dt__divider" />}
            <DataRow
              row={row}
              showRowSelector={showRowSelector}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'ai-interactions/Selectable Table',
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Default — plain table, no selector buttons. Hover still animates row bg and
 * hides the adjacent dividers, showing the full row treatment.
 */
export const Default: Story = {
  render: () => (
    <div className="dt-canvas">
      <div className="dt-demo">
        <div className="dt-demo__group">
          <div className="dt-demo__label">Default table</div>
          <SelectableTable />
        </div>
      </div>
    </div>
  ),
}

/**
 * WithRowSelector — hover any row to reveal the row-select button on the right.
 * The button is 4px outside the table edge, vertically centred on the row.
 * Move the cursor from the row toward the button — it stays visible.
 */
export const WithRowSelector: Story = {
  render: () => (
    <div className="dt-canvas">
      <div className="dt-demo">
        <div className="dt-demo__group">
          <div className="dt-demo__label">Row selector (hover any row)</div>
          <SelectableTable showRowSelector />
        </div>
      </div>
    </div>
  ),
}

/**
 * WithColumnSelector — hover any header to reveal the column-select button above it.
 * The button is 4px above the header top, centred horizontally on the column.
 * Move the cursor from the header upward — the button stays visible.
 */
export const WithColumnSelector: Story = {
  render: () => (
    <div className="dt-canvas">
      <div className="dt-demo">
        <div className="dt-demo__group">
          <div className="dt-demo__label">Column selector (hover any header)</div>
          <SelectableTable showColSelector />
        </div>
      </div>
    </div>
  ),
}

/**
 * WithBoth — both row and column selectors active simultaneously.
 * Hover a row → row button appears right.
 * Hover a header → column button appears above.
 */
export const WithBoth: Story = {
  render: () => (
    <div className="dt-canvas">
      <div className="dt-demo">
        <div className="dt-demo__group">
          <div className="dt-demo__label">Row + column selectors</div>
          <SelectableTable showRowSelector showColSelector />
        </div>
      </div>
    </div>
  ),
}
