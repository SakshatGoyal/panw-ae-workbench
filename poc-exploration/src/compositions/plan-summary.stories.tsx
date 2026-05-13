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

import { IconButton } from '@ds/button'
import { Sort, type SortOption } from '@ds/filter'
import { Tags, type TagColor } from '@ds/tags'
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

const ATTAINMENT_TAG_COLOR: Record<AttainmentLevel, TagColor> = {
  red:    'red',
  yellow: 'yellow',
  green:  'green',
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
  planPercent: 88,
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
  const [quarter, setQuarter] = useState<string>('cq')
  const [product, setProduct] = useState<string>('all')

  const { planPercent } = data
  const level = attainmentLevel(planPercent)

  return (
    <div className="psum-page">
      <style>{COMPOSITION_CSS}</style>
      <section className="psum-card" aria-label="Plan and Forecast Summary">
        {/* ── Filter bar (h=48) ───────────────────────────────────── */}
        <div className="psum-filterbar">
          <h2 className="psum-title">Plan &amp; Forecast Summary</h2>
          <div className="psum-controls">
            <Sort
              className="psum-pill"
              label="Quarter"
              options={data.quarterOptions}
              value={quarter}
              onChange={setQuarter}
            />
            <Sort
              className="psum-pill"
              label="Product"
              options={data.productOptions}
              value={product}
              onChange={setProduct}
            />
            <IconButton
              renderIcon={open ? ChevronUp : ChevronDown}
              aria-label={open ? 'Collapse summary' : 'Expand summary'}
              kind="ghost"
              size="sm"
              onClick={() => setOpen((o) => !o)}
            />
          </div>
        </div>

        {/* ── Plan row (h=48) ──────────────────────────────────────── */}
        <div className="psum-planrow">
          <div className="psum-planrow__title">
            <span className="psum-planrow__label">{data.plan.label}</span>
            <span className="psum-planrow__value">{data.plan.value}</span>
          </div>
          <PlanProgress percent={planPercent} />
          <Tags
            color={ATTAINMENT_TAG_COLOR[level]}
            contrast="low"
            shape="rounded"
            size="large"
            label={`${planPercent}% on track`}
          />
        </div>

        {/* ── Cells strip (expanded only) ──────────────────────────── */}
        {open && (
          <div className="psum-cells" role="list">
            {data.categories.map((c) => (
              <div role="listitem" key={c.label} className="psum-cell-wrap">
                <Cell datum={c} />
              </div>
            ))}
          </div>
        )}
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

/* ── Card — no shadow, no border, neutral-10 ground.
 * Separation from the page (stage.base) is carried by the surface
 * delta alone — no elevation, no outline. */
.psum-card {
  background-color: var(--ds-color-core-neutral-10);
  border-radius: var(--ds-radius-standard);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ── Filter bar (h=48) ──────────────────────────────────────────────────
 * Divider below the filter bar is inset 16px from each side — does not
 * run edge to edge. Drawn as a ::after pseudo so the inset is intrinsic
 * to the strip, not a separate JSX node. */
.psum-filterbar {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-03);             /* 8 */
  padding: 0 var(--ds-spacing-05);       /* 0 16 */
  min-height: 48px;
}
.psum-filterbar::after {
  content: '';
  position: absolute;
  left: var(--ds-spacing-05);            /* 16 from left */
  right: var(--ds-spacing-05);           /* 16 from right */
  bottom: 0;
  height: 1px;
  background-color: var(--ds-lines-neutral-rest);
}
.psum-title {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--ds-text-primary);
  font-size: 16px;
  line-height: 1.5;
  font-weight: var(--ds-type-font-weight-semibold);
  letter-spacing: 0;
}
.psum-controls {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-02);             /* 4 */
}

/* Sort with direction glyph hidden — the Plan Summary's Quarter and
 * Product selectors are pure single-selects (no asc/desc dimension).
 * We CSS-suppress the direction slot without touching the DS package. */
.psum-pill .panw--sort__direction {
  display: none !important;
}

/* ── Plan row (h=48) ──────────────────────────────────────────────────────
 * No border-bottom: in the collapsed state this is the last child and
 * its bottom border would stack on top of the card's outer border,
 * producing a visible 2px double-line on the straight bottom edge.
 * The divider between plan row and cells (expanded) is carried by
 * .psum-cells border-top instead. */
.psum-planrow {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-03);             /* 8 */
  padding: 0 var(--ds-spacing-05);       /* 0 16 */
  min-height: 48px;
}
.psum-planrow__title {
  display: inline-flex;
  align-items: baseline;
  gap: var(--ds-spacing-02);             /* 4 */
  flex-shrink: 0;
}
.psum-planrow__label {
  color: var(--ds-text-secondary-rest);
  font-size: 14px;
  line-height: 1.42857;
}
.psum-planrow__value {
  color: var(--ds-text-primary);
  font-size: 14px;
  line-height: 1.42857;
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
