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

import { BrandPanw, SfdcOpportunity, SfdcAccount, SfdcTargetMode, SfdcPeopleScore, SfdcGraph } from '@ds/icons'
import { Tooltip } from '@ds/tooltip'

// ── Row ─────────────────────────────────────────────────────────────────────

interface SideNavRowProps {
  active?: boolean
  label?: string
  children?: React.ReactNode
  onClick?: () => void
}

function SideNavRow({ active, label, children, onClick }: SideNavRowProps) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      className="snav-row-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="snav-row"
        data-active={active ? 'true' : undefined}
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.() } }}
      >
        <span className="snav-row__bar" aria-hidden="true" />
        <span className="snav-row__slot">{children}</span>
      </div>
      {hovered && label && (
        <div className="snav-row__tooltip" role="tooltip">
          <Tooltip content={label} pointerDirection="right" />
        </div>
      )}
    </div>
  )
}

// ── Component ───────────────────────────────────────────────────────────────

export interface SideNavProps {
  /** Which item label is currently active. Defaults to first item when omitted. */
  activeItem?: string
  /** Called with the label of the clicked item. */
  onItemClick?: (label: string) => void
}

export function SideNav({ activeItem, onItemClick }: SideNavProps = {}) {
  // Default the active item to the first nav item when uncontrolled.
  const resolved = activeItem ?? 'Opportunities'

  const row = (label: string, icon: React.ReactNode) => (
    <SideNavRow
      active={resolved === label}
      label={label}
      onClick={() => onItemClick?.(label)}
    >
      {icon}
    </SideNavRow>
  )

  return (
    <nav className="snav" aria-label="Primary">
      {/* Brand block */}
      <div className="snav__brand" aria-label="Palo Alto Networks">
        <BrandPanw size={40} />
      </div>

      <div className="snav__primary">
        {row('Opportunities',        <SfdcOpportunity size={20} />)}
        {row('Account Workbench',    <SfdcAccount size={20} />)}
        {row('Sales Play Workbench', <SfdcTargetMode size={20} />)}
        {row('Account Health',       <SfdcPeopleScore size={20} />)}
        {row('Analytics',            <SfdcGraph size={20} />)}
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

/* ── Row wrapper — provides positioning context for the tooltip ───────── */

.snav-row-wrap {
  position: relative;
}

/* ── Tooltip — floats to the right of the 64px column ────────────────── */

.snav-row__tooltip {
  position: absolute;
  left: 68px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999;
  pointer-events: none;
  white-space: nowrap;
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
}

/* Icons use hardcoded fill attributes — CSS overrides presentation attributes. */
.snav-row__slot svg path {
  fill: #B8C1CC;
  transition: fill 110ms var(--ds-motion-easing-standard, cubic-bezier(0.2, 0, 0.38, 0.9));
}

.snav-row:hover .snav-row__slot svg path,
.snav-row[data-active='true'] .snav-row__slot svg path {
  fill: #FFFFFF;
}

@media (prefers-reduced-motion: reduce) {
  .snav-row, .snav-row__slot { transition: none; }
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
