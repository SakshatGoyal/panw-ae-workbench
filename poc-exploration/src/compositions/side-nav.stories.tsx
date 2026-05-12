/**
 * Side Nav — collapsed-width vertical app shell navigation.
 *
 * Built to match the reference code exactly. Per the instruction:
 * "Use icons where there is an icon font" — DS icons are placed only
 * where the reference uses the `Palo-Icons` font:
 *
 *   - Primary item 1 (active): `dashboard` + `caret-right`
 *   - Primary item 4:           `dashboard`
 *
 * Every other slot in the reference is either an empty placeholder
 * (the brand block, the 4 global items) or a generic SVG rectangle that
 * the Figma export couldn't resolve to a specific glyph (primary items
 * 2, 3, 5). Those slots are left empty here — I'm not inventing icons
 * for them.
 *
 * The bottom collapse control's SVG is a 6.71×11 chevron shape — I'm
 * mapping it to `chevron-right` since the geometry is unambiguous.
 *
 * Cosmos → Stage token mapping:
 *   Steel-Blue-90 (#19222E)   → surface.inverse.rest
 *   Steel-Blue-70 (#475566)   → surface.inverse.hover  (selected row bg)
 *   Steel-Blue-80 (#354252)   → surface.inverse.hover  (divider)
 *   Steel-Blue-30 (#B8C1CC)   → icons.inverse.rest @ 0.65 opacity
 *   Blue-40       (#38A5FF)   → brand.rest             (selection bar)
 *   Basic-White               → icons.inverse.rest @ 1.0 opacity
 *
 * Geometry mirrors the reference exactly:
 *   - 64px column width
 *   - 4px selection bar reserved on every row (active fills, others blank)
 *   - 60px row content slot, padding-left 18, padding-right 2
 *   - 40px row height, 0 gap between rows
 *   - Brand block 64×66
 *   - Primary menu padding-top 8px
 */

import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { BrandPanw, Dashboard, ChevronRight } from '@ds/icons'

// ── Row ─────────────────────────────────────────────────────────────────────

interface SideNavRowProps {
  active?: boolean
  ariaLabel?: string
  children?: React.ReactNode
}

function SideNavRow({ active, ariaLabel, children }: SideNavRowProps) {
  return (
    <div
      className="snav-row"
      data-active={active ? 'true' : undefined}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
    >
      <span className="snav-row__bar" aria-hidden="true" />
      <span className="snav-row__slot">{children}</span>
    </div>
  )
}

// ── Component ───────────────────────────────────────────────────────────────

export function SideNav() {
  return (
    <nav className="snav" aria-label="Primary">
      {/* Brand block — product logo slot. StyledBrandIcon is 40×40 in
          the reference; matching that size here. */}
      <div className="snav__brand" aria-label="Palo Alto Networks">
        <BrandPanw size={40} />
      </div>

      {/* Primary menu — matches reference: rows 1, 2, 3, 5 carry the
          dashboard glyph plus a right-chevron expansion indicator. Row 4
          carries the dashboard glyph only (no chevron). Row 1 is the
          active selection. */}
      <div className="snav__primary">
        <SideNavRow active ariaLabel="Dashboard">
          <Dashboard size={20} />
          <span className="snav-row__caret" aria-hidden="true">
            <ChevronRight size={12} />
          </span>
        </SideNavRow>
        <SideNavRow>
          <Dashboard size={20} />
          <span className="snav-row__caret" aria-hidden="true">
            <ChevronRight size={12} />
          </span>
        </SideNavRow>
        <SideNavRow>
          <Dashboard size={20} />
          <span className="snav-row__caret" aria-hidden="true">
            <ChevronRight size={12} />
          </span>
        </SideNavRow>
        <SideNavRow>
          <Dashboard size={20} />
        </SideNavRow>
        <SideNavRow>
          <Dashboard size={20} />
          <span className="snav-row__caret" aria-hidden="true">
            <ChevronRight size={12} />
          </span>
        </SideNavRow>
      </div>

      {/* Global common area — rows 1-4 are empty in the reference
          (`<StyledIcon11/12/13/14 />` are content-less divs). Leaving
          them as empty rows here. */}
      <div className="snav__global">
        <div className="snav__divider" role="separator" />
        <SideNavRow />
        <SideNavRow />
        <SideNavRow />
        <SideNavRow />
        <div className="snav__expand">
          <div className="snav__divider" role="separator" />
          <SideNavRow ariaLabel="Expand navigation">
            <ChevronRight size={20} />
          </SideNavRow>
        </div>
      </div>
    </nav>
  )
}

// ── Story wrapper ───────────────────────────────────────────────────────────

export function SideNavComposition() {
  return (
    <div className="snav-page">
      <style>{COMPOSITION_CSS}</style>
      <SideNav />
      <main className="snav-page__body" />
    </div>
  )
}

// ── Styles ──────────────────────────────────────────────────────────────────

const COMPOSITION_CSS = `
.snav-page {
  display: flex;
  min-height: 100vh;
  background: var(--ds-stage-base, #fff);
}

.snav-page__body {
  flex: 1 1 auto;
  min-height: 100vh;
  background: var(--ds-stage-base, #fff);
}

/* ── Shell column ─────────────────────────────────────────────────────── */

.snav {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 64px;
  flex-shrink: 0;
  background: var(--ds-surface-inverse-rest);
  color: var(--ds-icons-inverse-rest);
}

/* ── Brand block — empty placeholder per reference ────────────────────── */

.snav__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 66px;
  flex-shrink: 0;
}

/* ── Sections ─────────────────────────────────────────────────────────── */

.snav__primary {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-top: var(--ds-spacing-03); /* 8 */
  min-height: 0;
}

.snav__global {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
}

.snav__expand {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

/* ── Divider ──────────────────────────────────────────────────────────── */

.snav__divider {
  height: 1px;
  background: var(--ds-surface-inverse-hover);
}

/* ── Row ──────────────────────────────────────────────────────────────── */

.snav-row {
  width: 64px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  cursor: pointer;
  transition: background 110ms var(--ds-motion-easing-standard, cubic-bezier(0.2, 0, 0.38, 0.9));
}

.snav-row:hover {
  background: var(--ds-surface-inverse-hover);
}

.snav-row[data-active='true'] {
  background: var(--ds-surface-inverse-hover);
}

.snav-row:focus-visible {
  outline: 2px solid var(--ds-brand-rest);
  outline-offset: -2px;
}

/* 4px selection bar — reserved on every row, brand-tinted only on active. */
.snav-row__bar {
  width: 4px;
  flex-shrink: 0;
  background: transparent;
}

.snav-row[data-active='true'] .snav-row__bar {
  background: var(--ds-brand-rest);
}

/* 60px slot — padding-left 18, padding-right 2; icon (20×20) anchored
   left so its center lands at x=32 from the column edge. */
.snav-row__slot {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  padding-left: 18px;
  padding-right: 2px;
  opacity: 0.65;
  transition: opacity 110ms var(--ds-motion-easing-standard, cubic-bezier(0.2, 0, 0.38, 0.9));
}

.snav-row:hover .snav-row__slot,
.snav-row[data-active='true'] .snav-row__slot {
  opacity: 1;
}

/* Active-row caret indicator (chevron-right). The reference places it
   to the right of the primary glyph inside the same 40px content area. */
.snav-row__caret {
  display: inline-flex;
  align-items: center;
  margin-left: var(--ds-spacing-02); /* 4 */
}

@media (prefers-reduced-motion: reduce) {
  .snav-row,
  .snav-row__slot {
    transition: none;
  }
}
`

// ── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta<typeof SideNavComposition> = {
  title: 'compositions/Side Nav',
  component: SideNavComposition,
  excludeStories: ['SideNav', 'SideNavComposition'],
}
export default meta

type Story = StoryObj<typeof SideNavComposition>

export const Default: Story = {
  render: () => <SideNavComposition />,
}
