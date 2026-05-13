/**
 * Plan & Forecast Summary — top-of-page banner composition
 *
 * Spec: `data-models/plan-summary-reference.md`
 * Reference assets: data-models/assets/plan-summary-collapsed.png,
 *                   data-models/assets/plan-summary-expanded.png
 *
 * Structure (vertical):
 *   ┌─ SummaryFilterBar      h=48, pad 0/16
 *   ├─ PlanRow               h=48, pad 0/16
 *   └─ SegmentContainer      cells handle their own pad
 *       └─ 6 × Cell          pad 16, gap 8
 *           ├─ Header              label
 *           └─ SegmentContent      vertical stack, gap 4:
 *                                    "26% of plan" (supporting metric)
 *                                    "$268.0M"     (KPI value)
 *                                    "↓1% QoQ"     (trend)
 *
 * Vertical dividers between cells are 1px lines that span the FULL
 * cells-strip height — flush against the strip's top and bottom edges.
 *
 * Card chrome: no shadow, hairline neutral-tile border, neutral-10
 * background. The plan-progress strip carries surface.alt as the
 * unfilled-track ground so the threshold-colored fill reads against
 * the total proportion.
 *
 * Single-select pill trigger for both Quarter and Products uses the
 * DS `Sort` primitive (filter package). Direction glyph suppressed
 * via a local className override (no edits to the DS component).
 *
 * Threshold ladder for the plan-attainment readout (bar + tag):
 *     0–25%   red    (red-50 fill / Tags color="red")
 *    26–75%   yellow (yellow-30 fill / Tags color="yellow")
 *    76%+     green  (green-40 fill / Tags color="green")
 * Hex values for the bar fill match `HEALTH_BAR_FILL` in AE Account
 * Panel — keeping the primitive in lockstep across panels.
 *
 * The on-track tag uses Tags shape="rounded" size="large" — large
 * rounded variant per spec.
 */

import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { type SortOption } from '@ds/filter'
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
} from '@ds/icons'

// ── Threshold ladder ────────────────────────────────────────────────────────

type AttainmentLevel = 'red' | 'yellow' | 'green'

const ATTAINMENT_BAR_FILL: Record<AttainmentLevel, string> = {
  red:    '#f55868', // red-50    — HEALTH_BAR_FILL.critical
  yellow: '#ffbe4f', // yellow-30 — HEALTH_BAR_FILL.at-risk
  green:  '#3cc29a', // green-40  — HEALTH_BAR_FILL.healthy
}

function attainmentLevel(pct: number): AttainmentLevel {
  if (pct <= 25) return 'red'
  if (pct <= 75) return 'yellow'
  return 'green'
}

// ── Data model ──────────────────────────────────────────────────────────────

interface CategoryDatum {
  label: string
  qoqPercent: number
  percentOfPlan: number
  value: string
}

const CATEGORIES: CategoryDatum[] = [
  { label: 'Closed',          qoqPercent: -1, percentOfPlan: 26, value: '$268.0M' },
  { label: 'Commit',          qoqPercent:  2, percentOfPlan: 44, value: '$440.0M' },
  { label: 'Best Case - In',  qoqPercent: -1, percentOfPlan: 12, value: '$175.0M' },
  { label: 'Total Pipeline',  qoqPercent:  2, percentOfPlan: 12, value: '$120.0M' },
  { label: 'Total - In',      qoqPercent:  3, percentOfPlan: 88, value: '$880.0M' },
  { label: 'Total Forecast',  qoqPercent:  3, percentOfPlan: 88, value: '$995.0M' },
]

// Anchored to TODAY = 2026-05-11 in PANW's Aug→Jul fiscal calendar:
// May 2026 sits in Q4FY26 (CQ). PQ is the quarter just ended (Q3FY26 =
// Feb–Apr 2026); NQ and NQ+1 step into FY27. `value` keys are stable
// identifiers; only the labels move when the anchoring date rolls.
const QUARTER_OPTIONS: SortOption[] = [
  { label: 'PQ (Q3FY26)',   value: 'pq' },
  { label: 'CQ (Q4FY26)',   value: 'cq' },
  { label: 'NQ (Q1FY27)',   value: 'nq' },
  { label: 'NQ+1 (Q2FY27)', value: 'nq1' },
]

const PRODUCT_OPTIONS: SortOption[] = [
  { label: 'All Products',   value: 'all' },
  { label: 'Cortex',         value: 'cortex' },
  { label: 'Prisma',         value: 'prisma' },
  { label: 'Strata',         value: 'strata' },
  { label: 'Unit 42',        value: 'unit42' },
  { label: 'Enterprise DLP', value: 'edlp' },
]

// ── Public data contract ────────────────────────────────────────────────────
//
// Everything the summary renders flows through `PlanSummaryData`. The
// `DEFAULT_PLAN_SUMMARY_DATA` constant packs the existing module-scope POC
// fixtures so the existing Collapsed/Expanded stories render unchanged.

export interface PlanSummaryData {
  /** "Plan:" label + "$1.00B" headline value. */
  plan: { label: string; value: string }
  /** Attainment percentage that drives the bar fill, the tag, and the on-track ladder. */
  planPercent: number
  /** Six forecast-category cells, rendered left-to-right in the order given. */
  categories: CategoryDatum[]
  quarterOptions: SortOption[]
  productOptions: SortOption[]
}

export const DEFAULT_PLAN_SUMMARY_DATA: PlanSummaryData = {
  plan: { label: 'Plan:', value: '$1.00B' },
  planPercent: 78,
  categories: CATEGORIES,
  quarterOptions: QUARTER_OPTIONS,
  productOptions: PRODUCT_OPTIONS,
}

export interface PlanSummaryProps {
  data?: PlanSummaryData
  defaultOpen?: boolean
}

// ── Subcomponents ───────────────────────────────────────────────────────────

/**
 * Plan progress bar — Plan row.
 * Fill hex routes through the attainment threshold ladder.
 */
function PlanProgress({ percent }: { percent: number }) {
  const level = attainmentLevel(percent)
  return (
    <div
      className="psum-progress"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="psum-progress__track" />
      <div
        className="psum-progress__fill"
        style={{
          width: `${Math.max(0, Math.min(100, percent))}%`,
          backgroundColor: ATTAINMENT_BAR_FILL[level],
        }}
      />
    </div>
  )
}

/** Segment QoQ — arrow + percentage + literal "QoQ". */
function SegmentQoQ({ percent }: { percent: number }) {
  const up = percent >= 0
  const Arrow = up ? ArrowUp : ArrowDown
  return (
    <span className={`psum-qoq${up ? ' psum-qoq--up' : ' psum-qoq--down'}`}>
      <Arrow size={16} />
      <span className="psum-qoq__pct">{Math.abs(percent)}%</span>
      <span className="psum-qoq__suffix">QoQ</span>
    </span>
  )
}

/** Forecast-category cell. */
function Cell({ datum }: { datum: CategoryDatum }) {
  return (
    <div className="psum-cell">
      <div className="psum-cell__header">
        <span className="psum-cell__label">{datum.label}</span>
      </div>
      <div className="psum-cell__content">
        <span className="psum-cell__share">{datum.percentOfPlan}% of plan</span>
        <span className="psum-cell__value">{datum.value}</span>
        <SegmentQoQ percent={datum.qoqPercent} />
      </div>
    </div>
  )
}

// ── Composition ─────────────────────────────────────────────────────────────

export function PlanForecastSummary({
  data = DEFAULT_PLAN_SUMMARY_DATA,
  defaultOpen = false,
}: PlanSummaryProps = {}) {
  const [open, setOpen] = useState(defaultOpen)

  const { planPercent } = data

  const toggle = () => setOpen((o) => !o)
  // Keyboard: Enter / Space on the card toggles. Space's default page-scroll
  // is suppressed via preventDefault.
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }
  return (
    <div className="psum-page">
      <style>{COMPOSITION_CSS}</style>
      <section
        className="psum-card"
        role="button"
        tabIndex={0}
        aria-label="Plan and Forecast Summary — click to toggle details"
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onKey}
      >
        {/* ── Plan row (h=48) ──────────────────────────────────────────
            Single horizontal row: text · bar · chevron, 16px gaps.
            Text format: "FY26: 78% of $14.00 attained" — body-02 with
            the middle phrase ("78% of $14.00") bold. Bar fill width
            tracks the attainment percent so visual length matches the
            numeric readout. Chevron is decorative; clicks bubble up to
            the card's toggle handler. */}
        <div className="psum-planrow">
          <span className="psum-planrow__title">
            FY26:{' '}
            <strong className="psum-planrow__emph">
              {planPercent}% of $14.00
            </strong>
            {' '}attained
          </span>
          <PlanProgress percent={planPercent} />
          <span className="psum-chevron" aria-hidden="true">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>

        {/* ── Cells drawer ───────────────────────────────────────────
            Always rendered so the open/close transition animates
            height via the grid-template-rows 0fr → 1fr trick. The
            inner wrapper carries overflow:hidden so collapsed content
            doesn't paint outside the row. */}
        <div
          className={`psum-drawer${open ? ' psum-drawer--open' : ''}`}
          aria-hidden={!open}
        >
          <div className="psum-drawer__inner">
            <div className="psum-cells" role="list">
              {data.categories.map((c) => (
                <div role="listitem" key={c.label} className="psum-cell-wrap">
                  <Cell datum={c} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ── CSS (IACVT) ─────────────────────────────────────────────────────────────

const COMPOSITION_CSS = `
.psum-page {
  min-height: 100vh;
  padding: var(--ds-spacing-07);
  background-color: var(--ds-stage-base);
  font-family: var(--ds-type-font-family-sans);
}

/* ── Card — interactive ghost surface.
 * The whole card is the click target — anywhere outside a nested
 * interactive (Sort triggers, chevron) toggles the cells drawer.
 * State chrome follows the ghost family:
 *   rest      ghost.rest    (transparent)
 *   hover     ghost.hover   (alpha neutral, only when no child is hovered)
 *   pressed   ghost.pressed
 * :hover:not(:has(:hover)) per stage-background-colors.md "Nested
 * interactive scopes never both hover at once." */
.psum-card {
  background-color: var(--ds-ghost-rest);
  border-radius: var(--ds-radius-standard);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
/* The card no longer has any interactive descendants — the chevron is
 * decorative and the filters are gone — so plain :hover is correct.
 * Hover lifts the filter-bar divider to lines.bold for stronger
 * affordance signal that the whole card is the click target. */
.psum-card:hover {
  background-color: var(--ds-ghost-hover);
}
.psum-card:active {
  background-color: var(--ds-ghost-pressed);
}
.psum-card:focus-visible {
  outline: 2px solid var(--ds-text-brand-rest);
  outline-offset: -2px;
}

/* Chevron — decorative affordance, not a button. Sits at the right
 * edge of the plan row, inherits the card's color and reads through
 * currentColor on the icon. No pointer-events override needed: with no
 * onClick of its own, clicks pass through to the card's toggle handler. */
.psum-chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ds-icons-secondary-rest);
}

/* ── Plan row — single horizontal row: text · bar · chevron, gap 16.
 * Text is body-02 (16/24 regular); the middle phrase carries the
 * semibold weight via inline <strong>. */
.psum-planrow {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-05);             /* 16 */
  padding: 0 var(--ds-spacing-05);       /* 0 16 */
  min-height: 48px;
}
.psum-planrow__title {
  flex-shrink: 0;
  color: var(--ds-text-primary);
  font-size: 16px;                       /* body-02 */
  line-height: 1.5;
  letter-spacing: 0;
}
.psum-planrow__emph {
  font-weight: var(--ds-type-font-weight-semibold);
  font-variant-numeric: tabular-nums;
}

/* Progress bar — pill-radius, ladder-colored fill. */
.psum-progress {
  position: relative;
  flex: 1;
  height: 8px;
  display: flex;
  align-items: center;
}
.psum-progress__track {
  position: absolute;
  inset: 0;
  background-color: var(--ds-color-core-neutral-30);
  border-radius: var(--ds-radius-pill);
}
.psum-progress__fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: var(--ds-radius-pill);
}

/* ── Drawer — animated open/close ────────────────────────────────────────
 * Per stage-motion.md: the drawer is transitioning in place inside the
 * card (not entering/leaving view from elsewhere) — productive STANDARD
 * easing on both axes. 120ms duration sits between fast-02 (110ms) and
 * moderate-01 (150ms); off-scale but tuned per "When no named scale
 * fits — calculate from the same logic" in the doc.
 *
 * Height animates via the grid-template-rows 0fr → 1fr pattern so the
 * row resolves to its content height without a fixed max-height. A
 * parallel opacity fade carries the content arrival so the height
 * change doesn't read as an empty pop.
 *
 * prefers-reduced-motion: drop both transitions, render in final state. */
.psum-drawer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 120ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.psum-drawer--open {
  grid-template-rows: 1fr;
}
.psum-drawer__inner {
  overflow: hidden;
  opacity: 0;
  transition: opacity 120ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.psum-drawer--open .psum-drawer__inner {
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
  .psum-drawer,
  .psum-drawer__inner {
    transition: none;
  }
}

/* ── Cells strip (Segment Container) ─────────────────────────────────────
 * Six cells render as independent tiles on the surface.alt card ground.
 * No vertical dividers — the tile-on-tile elevation carries separation.
 *   strip padding:  8 all sides
 *   gap:            4
 *   tile radius:    radius.tight (4)
 *   tile ground:    surface.rest (one stop up from the card's surface.alt) */
.psum-cells {
  display: flex;
  align-items: stretch;
  gap: var(--ds-spacing-02);             /* 4 */
  /* No top padding — the cells drawer hugs the bottom of the plan row. */
  padding: 0 var(--ds-spacing-03) var(--ds-spacing-03); /* 0 8 8 */
}
.psum-cell-wrap {
  flex: 1 1 0;
  min-width: 0;
  padding: var(--ds-spacing-03);         /* 8 all sides */
  background-color: var(--ds-surface-rest);
  border-radius: var(--ds-radius-tight); /* 4 */
}

/* ── Cell ─────────────────────────────────────────────────────────────── */
.psum-cell {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03);             /* 8 — header → content */
  height: 100%;
}

/* SegmentHeader — just the cell label now (QoQ moved below value). */
.psum-cell__header {
  display: flex;
  align-items: center;
}
.psum-cell__label {
  color: var(--ds-text-secondary-rest);
  font-size: 14px;
  line-height: 1.42857;
  font-weight: var(--ds-type-font-weight-semibold);
  white-space: nowrap;
}

/* SegmentContent — vertical stack: share → value → QoQ.
 * QoQ sits 4px below the KPI value per Sakshat. The share line keeps
 * the 4px proximity it had with the value before. */
.psum-cell__content {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-02);             /* 4 */
  width: 100%;
}
.psum-cell__share {
  color: var(--ds-text-tertiary-rest);
  font-size: 12px;
  line-height: 1.33333;
}
.psum-cell__value {
  color: var(--ds-text-primary);
  font-size: 20px;
  line-height: 1.4;
  font-weight: var(--ds-type-font-weight-semibold);
  font-variant-numeric: tabular-nums;
}

/* Segment QoQ — arrow + % + "QoQ", gap 4. */
.psum-qoq {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-spacing-02);             /* 4 */
  font-size: 12px;
  line-height: 1.33333;
  font-variant-numeric: tabular-nums;
}
.psum-qoq--up   { color: var(--ds-text-status-success); }
.psum-qoq--up svg   { color: var(--ds-icons-status-success); }
.psum-qoq--down { color: var(--ds-text-status-danger); }
.psum-qoq--down svg { color: var(--ds-icons-status-danger); }
.psum-qoq__suffix { color: var(--ds-text-tertiary-rest); }
`

// ── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta<typeof PlanForecastSummary> = {
  title: 'compositions/Plan & Forecast Summary',
  component: PlanForecastSummary,
  excludeStories: ['PlanForecastSummary'],
}
export default meta

type Story = StoryObj<typeof PlanForecastSummary>

export const Collapsed: Story = {
  render: () => <PlanForecastSummary defaultOpen={false} />,
}

export const Expanded: Story = {
  render: () => <PlanForecastSummary defaultOpen={true} />,
}
