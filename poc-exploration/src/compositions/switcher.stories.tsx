/**
 * Switcher — two-tile single-select composition
 *
 * A pair of tiles the AE toggles between to scope the page below.
 * Each tile uses the internal layout of the Plan & Forecast Summary's
 * Commit tile, with the QoQ trend line replaced by a flat footnote
 * ("in pipeline" / "in ARR").
 *
 * Tile geometry:
 *   width:           160px
 *   padding:         12 vertical / 16 horizontal
 *   radius:          radius.tight (4)
 *   gap-between:     4
 *
 * State colors mirror the unselected default tab + highlight button:
 *   rest      → surface.accent.rest   (panw-tabs-bg-unselected)
 *   hover     → ghost.hover           (panw-tabs-bg-hover)
 *   pressed   → ghost.pressed         (panw-tabs-bg-pressed)
 *   selected  → highlight.rest        (panw-button-highlight-bg)
 *
 * Selected ground is alpha-brand — per stage-text-and-icons, text and
 * icons on this ground route through the matching family (text.brand).
 */

import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

interface SwitcherTileDatum {
  /** Heading row */
  label: string
  /** Smaller metric line above the headline value */
  supporting: string
  /** The big number */
  value: string
  /** Footnote line beneath the value (replaces QoQ slot) */
  footnote: string
}

const TILES: SwitcherTileDatum[] = [
  {
    label:      'Opportunities',
    supporting: '274 opportunities',
    value:      '$24,717,100',
    footnote:   'in pipeline',
  },
  {
    label:      'Accounts',
    supporting: '70 accounts',
    value:      '$57,198,000',
    footnote:   'in ARR',
  },
]

function Switcher() {
  const [selected, setSelected] = useState<number>(0)

  return (
    <div className="swcr-page">
      <style>{COMPOSITION_CSS}</style>
      <div className="swcr-strip" role="tablist" aria-label="Page scope">
        {TILES.map((t, i) => {
          const isSelected = i === selected
          return (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`swcr-tile${isSelected ? ' swcr-tile--selected' : ''}`}
              onClick={() => setSelected(i)}
            >
              <span className="swcr-tile__label">{t.label}</span>
              <span className="swcr-tile__content">
                <span className="swcr-tile__supporting">{t.supporting}</span>
                <span className="swcr-tile__value">{t.value}</span>
                <span className="swcr-tile__footnote">{t.footnote}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── CSS (IACVT) ─────────────────────────────────────────────────────────────

const COMPOSITION_CSS = `
.swcr-page {
  min-height: 100vh;
  padding: var(--ds-spacing-07);
  background-color: var(--ds-stage-base);
  font-family: var(--ds-type-font-family-sans);
}

.swcr-strip {
  display: inline-flex;
  align-items: stretch;
  gap: var(--ds-spacing-02);             /* 4 */
}

/* ── Tile ────────────────────────────────────────────────────────────────
 *   160px wide · 12 vertical / 16 horizontal padding · 4px radius.
 *   State chrome:
 *     rest      surface.accent.rest    (unselected tab rest)
 *     hover     ghost.hover            (unselected tab hover)
 *     pressed   ghost.pressed          (unselected tab pressed)
 *     selected  highlight.rest         (highlight button rest)
 *
 *   Internal vertical structure mirrors the Plan & Forecast Summary
 *   Commit tile: label → (supporting · value · footnote) with the same
 *   8px gap between the header and the content stack, and 4px gaps
 *   inside the content stack. */
.swcr-tile {
  width: 160px;
  padding: var(--ds-spacing-04) var(--ds-spacing-05); /* 12 16 */
  border: 0;
  border-radius: var(--ds-radius-tight); /* 4 */
  background-color: var(--ds-surface-accent-rest);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03);             /* 8 — label → content */
  text-align: left;
  font-family: inherit;
  color: var(--ds-text-secondary-rest);
  transition: background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
}

.swcr-tile:hover {
  background-color: var(--ds-ghost-hover);
}

.swcr-tile:active {
  background-color: var(--ds-ghost-pressed);
}

/* Selected — alpha-brand ground.
 * Per Sakshat: heading and main metric stay at text.primary (override
 * of the matching-family rule on those two specifically). Supporting
 * and footnote follow the matching-family rule into text.brand. */
.swcr-tile--selected,
.swcr-tile--selected:hover,
.swcr-tile--selected:active {
  background-color: var(--ds-highlight-rest);
}
.swcr-tile--selected .swcr-tile__label {
  color: var(--ds-text-primary);
}
.swcr-tile--selected .swcr-tile__supporting,
.swcr-tile--selected .swcr-tile__footnote {
  color: var(--ds-text-brand-rest);
  opacity: 0.85; /* tertiary feel within the brand family */
}

/* Header — label only. Matches Commit tile's __header / __label. */
.swcr-tile__label {
  color: var(--ds-text-secondary-rest);
  font-size: 14px;
  line-height: 1.42857;
  font-weight: var(--ds-type-font-weight-semibold);
  white-space: nowrap;
}

/* Content stack — supporting · value · footnote, gap 4. */
.swcr-tile__content {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-02);             /* 4 */
  width: 100%;
}
.swcr-tile__supporting {
  color: var(--ds-text-tertiary-rest);
  font-size: 12px;
  line-height: 1.33333;
}
.swcr-tile__value {
  color: var(--ds-text-primary);
  font-size: 20px;
  line-height: 1.4;
  font-weight: var(--ds-type-font-weight-semibold);
  font-variant-numeric: tabular-nums;
}
.swcr-tile__footnote {
  color: var(--ds-text-tertiary-rest);
  font-size: 12px;
  line-height: 1.33333;
}
`

// ── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta<typeof Switcher> = {
  title: 'compositions/Switcher',
  component: Switcher,
}
export default meta

type Story = StoryObj<typeof Switcher>

export const Default: Story = {
  render: () => <Switcher />,
}
