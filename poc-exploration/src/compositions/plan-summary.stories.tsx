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
 *   └─ SegmentContainer      pad 0 — cells handle their own pad
 *       └─ 6 × Cell          pad 16, gap 8
 *           ├─ Header (label LEFT, QoQ RIGHT EDGE)
 *           └─ SegmentContent (width 100%)
 *               ├─ ContentLeft  flex 1 (KPI value + supporting metric)
 *               └─ Spark        56 × 46 box, 1px gaps, bars fill
 *
 * Vertical dividers between cells are 1px lines that span the FULL
 * cells-strip height — flush against the strip's top and bottom edges.
 *
 * Single-select pill trigger for both Quarter and Products uses the
 * DS `Sort` primitive (filter package). Sort is the system's
 * single-select sibling of Filter — same trigger chrome, no filter
 * text field, commits on click. Its direction glyph is suppressed in
 * the composition via a local className override (no edits to the DS
 * component itself).
 *
 * Threshold ladder for the plan-attainment readout:
 *     0–25%   red    (red-50 fill / Tags color="red")
 *    26–75%   yellow (yellow-30 fill / Tags color="yellow")
 *    76%+     green  (green-40 fill / Tags color="green")
 * Hex values for the bar fill match `HEALTH_BAR_FILL` in AE Account
 * Panel — keeping the primitive in lockstep across panels.
 *
 * Sparkline (per Sakshat): 7 bars per cell.
 *   pos 0, 1     past quarters     → neutral-30 (gray-30)
 *   pos 2        current quarter   → cobalt-60 (emphasized)
 *   pos 3–6      future quarters   → cobalt-30
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
  /**
   * 7 bar heights (0–1 fractional). pos 0,1 past · pos 2 current ·
   * pos 3–6 future.
   */
  spark: [number, number, number, number, number, number, number]
}

const CATEGORIES: CategoryDatum[] = [
  { label: 'Closed',          qoqPercent: -1, percentOfPlan: 26, value: '$268.0M', spark: [0.55, 0.62, 1.00, 0.40, 0.45, 0.42, 0.48] },
  { label: 'Commit',          qoqPercent:  2, percentOfPlan: 44, value: '$440.0M', spark: [0.70, 0.75, 1.00, 0.55, 0.60, 0.58, 0.62] },
  { label: 'Best Case - In',  qoqPercent: -1, percentOfPlan: 12, value: '$175.0M', spark: [0.45, 0.55, 1.00, 0.50, 0.48, 0.52, 0.50] },
  { label: 'Total Pipeline',  qoqPercent:  2, percentOfPlan: 12, value: '$120.0M', spark: [0.40, 0.50, 1.00, 0.45, 0.55, 0.50, 0.58] },
  { label: 'Total - In',      qoqPercent:  3, percentOfPlan: 88, value: '$880.0M', spark: [0.65, 0.70, 1.00, 0.55, 0.62, 0.60, 0.66] },
  { label: 'Total Forecast',  qoqPercent:  3, percentOfPlan: 88, value: '$995.0M', spark: [0.70, 0.75, 1.00, 0.62, 0.68, 0.65, 0.72] },
]

const QUARTER_OPTIONS: SortOption[] = [
  { label: 'PQ (Q3FY25)',   value: 'pq' },
  { label: 'CQ (Q4FY25)',   value: 'cq' },
  { label: 'NQ (Q1FY26)',   value: 'nq' },
  { label: 'NQ+1 (Q2FY26)', value: 'nq1' },
]

const PRODUCT_OPTIONS: SortOption[] = [
  { label: 'All Products',   value: 'all' },
  { label: 'Cortex',         value: 'cortex' },
  { label: 'Prisma',         value: 'prisma' },
  { label: 'Strata',         value: 'strata' },
  { label: 'Unit 42',        value: 'unit42' },
  { label: 'Enterprise DLP', value: 'edlp' },
]

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

/**
 * History sparkline — 56 × 46 box, 1px gaps, bars fill.
 *   pos 0,1   past     → neutral-30
 *   pos 2     current  → cobalt-60
 *   pos 3–6   future   → cobalt-30
 */
function HistorySparkline({ spark }: { spark: CategoryDatum['spark'] }) {
  const colors = [
    'var(--ds-color-core-neutral-30)',
    'var(--ds-color-core-neutral-30)',
    'var(--ds-color-decorative-cobalt-60)',
    'var(--ds-color-decorative-cobalt-30)',
    'var(--ds-color-decorative-cobalt-30)',
    'var(--ds-color-decorative-cobalt-30)',
    'var(--ds-color-decorative-cobalt-30)',
  ]
  return (
    <div className="psum-spark" aria-hidden>
      {spark.map((h, i) => (
        <span
          key={i}
          className="psum-spark__bar"
          style={{
            height: `${Math.max(0.08, h) * 100}%`,
            backgroundColor: colors[i],
          }}
        />
      ))}
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
        <SegmentQoQ percent={datum.qoqPercent} />
      </div>
      <div className="psum-cell__content">
        <div className="psum-cell__left">
          <span className="psum-cell__share">{datum.percentOfPlan}% of plan</span>
          <span className="psum-cell__value">{datum.value}</span>
        </div>
        <div className="psum-cell__right">
          <HistorySparkline spark={datum.spark} />
        </div>
      </div>
    </div>
  )
}

// ── Composition ─────────────────────────────────────────────────────────────

function PlanForecastSummary({ defaultOpen }: { defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const [quarter, setQuarter] = useState<string>('cq')
  const [product, setProduct] = useState<string>('all')

  const planPercent = 88
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
              options={QUARTER_OPTIONS}
              value={quarter}
              onChange={setQuarter}
            />
            <Sort
              className="psum-pill"
              label="Product"
              options={PRODUCT_OPTIONS}
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
            <span className="psum-planrow__label">Plan:</span>
            <span className="psum-planrow__value">$1.00B</span>
          </div>
          <PlanProgress percent={planPercent} />
          <Tags
            color={ATTAINMENT_TAG_COLOR[level]}
            contrast="low"
            shape="pill"
            size="default"
            label={`${planPercent}% on track`}
          />
        </div>

        {/* ── Cells strip (expanded only) ──────────────────────────── */}
        {open && (
          <div className="psum-cells" role="list">
            {CATEGORIES.map((c, i) => (
              <React.Fragment key={c.label}>
                {i > 0 && <span className="psum-cell-divider" aria-hidden />}
                <div role="listitem" className="psum-cell-wrap">
                  <Cell datum={c} />
                </div>
              </React.Fragment>
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

/* ── Card — tile-tier elevation per stage-shadows.md:
 *   "Cards, tiles, panels at default elevation on a page" → --ds-shadow-tiles. */
.psum-card {
  background-color: var(--ds-surface-rest);
  border: 1px solid var(--ds-lines-neutral-tile-rest);
  border-radius: var(--ds-radius-standard);
  box-shadow: var(--ds-shadow-tiles);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ── Filter bar (h=48) ────────────────────────────────────────────────── */
.psum-filterbar {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-03);             /* 8 */
  padding: 0 var(--ds-spacing-05);       /* 0 16 */
  min-height: 48px;
  border-bottom: 1px solid var(--ds-lines-neutral-rest);
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

/* ── Plan row (h=48) ──────────────────────────────────────────────────── */
.psum-planrow {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-03);             /* 8 */
  padding: 0 var(--ds-spacing-05);       /* 0 16 */
  min-height: 48px;
  border-bottom: 1px solid var(--ds-lines-neutral-rest);
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
  background-color: var(--ds-field-alt-rest);
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
 * Container has 0 padding; cells handle their own padding (16 all sides).
 * This lets the vertical dividers span the FULL strip height — flush
 * against the strip's top and bottom edges. */
.psum-cells {
  display: flex;
  align-items: stretch;
  padding: 0;
}
.psum-cell-wrap {
  flex: 1 1 0;
  min-width: 0;
  padding: var(--ds-spacing-05);         /* 16 all sides — per redline */
}
.psum-cell-divider {
  display: block;
  flex: 0 0 1px;
  align-self: stretch;
  background-color: var(--ds-lines-neutral-rest);
}

/* ── Cell ─────────────────────────────────────────────────────────────── */
.psum-cell {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03);             /* 8 — header → content */
  height: 100%;
}

/* SegmentHeader — label LEFT, QoQ RIGHT EDGE. */
.psum-cell__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ds-spacing-03);
}
.psum-cell__label {
  color: var(--ds-text-secondary-rest);
  font-size: 14px;
  line-height: 1.42857;
  font-weight: var(--ds-type-font-weight-semibold);
  white-space: nowrap;
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

/* SegmentContent — 100% width.
 * ContentLeft fills (KPI value + supporting metric), chart pinned right. */
.psum-cell__content {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--ds-spacing-03);
  width: 100%;
}
.psum-cell__left {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-02);             /* 4 */
  flex: 1 1 auto;
  min-width: 0;
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
.psum-cell__right {
  flex: 0 0 auto;
  display: flex;
  align-items: flex-end;
}

/* ── Sparkline — 56 × 46 box, 1px gaps, bars fill ────────────────────── */
.psum-spark {
  display: flex;
  align-items: flex-end;
  gap: 1px;
  width: 56px;
  height: 46px;
}
.psum-spark__bar {
  flex: 1 1 0;                           /* width = fill */
  min-width: 0;
  border-radius: 1px;
  min-height: 2px;
}
`

// ── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta<typeof PlanForecastSummary> = {
  title: 'compositions/Plan & Forecast Summary',
  component: PlanForecastSummary,
}
export default meta

type Story = StoryObj<typeof PlanForecastSummary>

export const Collapsed: Story = {
  render: () => <PlanForecastSummary defaultOpen={false} />,
}

export const Expanded: Story = {
  render: () => <PlanForecastSummary defaultOpen={true} />,
}
