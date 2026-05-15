import type { Meta, StoryObj } from '@storybook/react'
import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@ds/button'
import { Link } from '@ds/link'
import { Accordion } from '@ds/accordion'
import { Tags } from '@ds/tags'
import { Tooltip } from '@ds/tooltip'
import { Flyout, FlyoutList, FlyoutItem } from '@ds/flyout'
import { Dropdown } from '@ds/dropdown'
import { TextEntry } from '@ds/text-entry'
import {
  Close,
  ExternalLink,
  ChevronDown,
  // Sales-play status icons. The named DS icons (NotTouched, Pitched,
  // ClosedWon, ClosedLost) carry authored fills; we recolor them via
  // currentColor + a CSS override per-status. The remaining four
  // (HourglassEnd, MinusCircleStroke, ChessKnight, DoNotEnter) are
  // functional icons that paint via currentColor by default.
  NotTouched,
  Pitched,
  HourglassEnd,
  MinusCircleStroke,
  ChessKnight,
  ClosedWon,
  DoNotEnter,
  // Product brand icons — Phase 3 Products row. Authored fills; we
  // render at the chip's intrinsic size without overriding color.
  BrandStrata,
  BrandPrisma,
  BrandCortex,
} from '@ds/icons'

import {
  ACCOUNTS,
  OPPORTUNITIES,
  SALES_PLAYS,
  SALES_PLAY_INSTANCES,
  SALES_PLAY_FAMILIES,
  STAGES,
  FORECAST_CATEGORY_LABELS,
  OPPORTUNITY_TYPE_LABELS,
  RENEWAL_OUTCOME_LABELS,
  ACTIVITY_TYPES,
  PRODUCTS,
  HEALTH_LABELS,
  type Account,
  type InstallBase,
  type Opportunity,
  type ProductId,
  type RenewalOutcome,
  type HealthStatus,
} from '../mock'

const meta: Meta = {
  title: 'compositions/AE Account Panel',
  parameters: { layout: 'fullscreen' },
  excludeStories: ['AccountPanel'],
}
export default meta

/*
 * AE Account Panel — Phase 0 (shell + header + section stubs).
 *
 * Reference doc: data-models/account-panel-reference.md.
 *
 * Phase 0 scope is intentionally narrow:
 *   - Right-anchored panel shell (Path-B local container; no @ds/sheet yet)
 *   - Header: title ("Account Preview"), Close, Account link, Apex link, LTV
 *   - Four section accordions (Install Base, Sales Play, Opportunities, Account
 *     Health) rendered closed so the shell + header rhythm can be critiqued
 *     in isolation. Per spec these default to OPEN — that wires up in Phase 1+
 *     as each section's contents land.
 *
 * The Account record does not yet model:
 *   - apexAccountId / apex name
 *   - Install Base figures (TCV, Incremental ACV, Margin, RPO)
 *   - per-account sales-play instances + dollar values
 *   - opportunity instances scoped to the 4-quarter window
 *   - 12-month health trend (HealthTrendBars reuses account-table's pattern)
 *
 * Phase 0 stubs the at-a-glance tag labels from the doc's worked example
 * (Ironic Arts and Crafts in section 9) so the shell can be aesthetically
 * evaluated; later phases derive everything from the mock data.
 */

// ─── PanelHover ──────────────────────────────────────────────────────────────
//
// Trim hover-popover helper for the panel. Wraps any chip/tag and shows a
// portaled panel anchored to the trigger after `openDelayMs`. When
// `interactive` is true the panel stays open while the cursor is over it (so
// the AE can click into it). For non-interactive popovers/tooltips it closes
// on mouseleave.
//
// Lifted in spirit from opp-table's HoverShell but kept minimal — we don't
// need persist mode (no inline forms inside any panel popover), arrow
// pointers (DS Tooltip already dropped its pointer triangle), or alignment
// presets beyond bottom-center.
const PANEL_HOVER_GAP_PX = 6
function PanelHover({
  children,
  panel,
  openDelayMs = 700,
  interactive = false,
  align = 'center',
}: {
  children: React.ReactNode
  panel: React.ReactNode
  openDelayMs?: number
  interactive?: boolean
  align?: 'center' | 'start' | 'end'
}) {
  const triggerRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  useLayoutEffect(() => {
    if (!open) { setPos(null); return }
    const a = triggerRef.current?.getBoundingClientRect()
    const p = panelRef.current
    if (!a || !p) return
    const panelW = p.offsetWidth
    const panelH = p.offsetHeight
    const vw = window.innerWidth, vh = window.innerHeight
    const fitsBelow = vh - a.bottom >= panelH + PANEL_HOVER_GAP_PX + 8
    const top = fitsBelow
      ? a.bottom + PANEL_HOVER_GAP_PX
      : a.top - panelH - PANEL_HOVER_GAP_PX
    let left = a.left
    if (align === 'center') left = a.left + a.width / 2 - panelW / 2
    else if (align === 'end') left = a.right - panelW
    left = Math.max(8, Math.min(vw - panelW - 8, left))
    setPos({ top, left })
  }, [open, align])

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [open])

  useEffect(() => () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const onEnter = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    if (open || openTimer.current) return
    openTimer.current = setTimeout(() => { setOpen(true); openTimer.current = null }, openDelayMs)
  }
  const onLeave = () => {
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null }
    if (!open) return
    closeTimer.current = setTimeout(() => { setOpen(false); closeTimer.current = null }, interactive ? 120 : 60)
  }
  const onPanelEnter = () => {
    if (!interactive) return
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
  }

  return (
    <>
      <span
        ref={triggerRef}
        className="acc-hover-trigger"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {children}
      </span>
      {open && createPortal(
        <div
          ref={panelRef}
          className="acc-hover-portal"
          style={pos ? { top: pos.top, left: pos.left, visibility: 'visible' } : { visibility: 'hidden' }}
          onMouseEnter={onPanelEnter}
          onMouseLeave={onLeave}
        >
          {panel}
        </div>,
        document.body
      )}
    </>
  )
}

const account = ACCOUNTS.find(a => a.id === 'acc-cyberdyne')!

// POC-local: the Account record has no apex field yet. Stubbed here so the
// Apex Account row demonstrates. Replace with `account.apexName` once the
// mock layer models it.
const APEX_NAME = 'Cyberdyne Industries'

// POC-local: the Account record has no install-base figures yet (TCV,
// Incremental ACV, Margin, RPO). Stubbed here from the doc's worked example.
// Replace with `account.installBase.*` (or a derivation) once the mock layer
// models the contract-financials slice.
//
// `tone: 'success'` flags content-led positive signals — Incremental ACV
// when growth is positive, Margin when healthy. Renders as `text.success`
// per the doc's "Color is a quality signal" rule. Not a tag.
const INSTALL_BASE: Array<{ label: string; value: string; tone?: 'success' }> = [
  { label: 'TCV',             value: '$25.8M' },
  { label: 'Incremental ACV', value: '$1.0M',  tone: 'success' },
  { label: 'Margin',          value: '12.50%', tone: 'success' },
  { label: 'RPO',             value: '$3.0M' },
]

function fmtMoneyShort(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 2)}M`
  if (v >= 1_000)     return `$${Math.round(v / 1_000)}K`
  return `$${v}`
}

// Derive the display array the Panel renders from canonical InstallBase numbers.
// margin is stored as a decimal (0.125 = 12.50%).
function fmtInstallBase(ib: InstallBase): Array<{ label: string; value: string; tone?: 'success' }> {
  return [
    { label: 'TCV',             value: fmtMoneyShort(ib.tcv) },
    { label: 'Incremental ACV', value: fmtMoneyShort(ib.incrementalAcv), ...(ib.incrementalAcv > 0 ? { tone: 'success' as const } : {}) },
    { label: 'Margin',          value: `${(ib.margin * 100).toFixed(2)}%`,  ...(ib.margin > 0 ? { tone: 'success' as const } : {}) },
    { label: 'RPO',             value: fmtMoneyShort(ib.rpo) },
  ]
}

// Convert Account.health.trend12mo (0/1/2 integers) to the HealthStatus[] the Panel renders.
const TREND_STATUS_MAP: HealthStatus[] = ['healthy', 'at-risk', 'critical']
function healthTrend12FromAccount(trend: number[]): HealthStatus[] {
  return trend.map(n => TREND_STATUS_MAP[n] ?? 'healthy')
}

// Derive AccSalesPlayFamily[] from the flat SALES_PLAY_INSTANCES table for one account.
// Falls back to DEFAULT_ACCOUNT_PANEL_DATA.salesPlays when no instances exist.
function buildSalesPlays(accountId: string): AccSalesPlayFamily[] {
  const instances = SALES_PLAY_INSTANCES.filter(i => i.accountId === accountId)
  if (instances.length === 0) {
    // eslint-disable-next-line no-console
    console.warn(`[AccountPanel] canonical fallback: no SALES_PLAY_INSTANCES for '${accountId}' — using DEFAULT salesPlays`)
    return DEFAULT_ACCOUNT_PANEL_DATA.salesPlays
  }
  return (Object.values(SALES_PLAY_FAMILIES) as typeof SALES_PLAY_FAMILIES[keyof typeof SALES_PLAY_FAMILIES][])
    .map(family => ({
      id: family.id as AccSalesPlayFamily['id'],
      name: family.name,
      plays: SALES_PLAYS
        .filter(p => p.familyId === family.id)
        .flatMap(p => {
          const inst = instances.find(i => i.playId === p.id)
          return inst ? [{ name: p.name, status: inst.status as AccSalesPlayStatus, amountUsd: inst.amountUsd }] : []
        }),
    }))
    .filter(f => f.plays.length > 0)
}

function DataRow({ label, value, tone }: { label: string; value: string; tone?: 'success' }) {
  return (
    <div className="acc-data-row">
      <span className="acc-data-row__label">{label}</span>
      <span
        className={`acc-data-row__value${tone === 'success' ? ' acc-data-row__value--success' : ''}`}
      >
        {value}
      </span>
    </div>
  )
}

// ─── Sales Play (Phase 2) ────────────────────────────────────────────────────
//
// Domain model (see data-models/sales-play-domain-model.md):
//   - A sales play has exactly ONE status from a 7-value enum.
//   - Top-level "Sales Play" section tag = $ of all Not-Touched plays across
//     families.
//   - Each family row tag = $ of Not-Touched plays in that family. Omitted
//     when the family's Not-Touched total is zero.
//   - Each leaf row carries a tag with the play's own status icon + that
//     play's $ value.
//
// All three tag tiers use the same cross-component panel-tag preset from
// opp-table:
//   color: 'neutral', contrast: 'low', shape: 'rounded', size: 'large'
// Tag ground stays neutral across the column; status semantic is carried
// by the leading icon (per account-table: "All sales-play tags share the
// same neutral chip — color is reserved for the leading status icon, not
// the chip ground.").
const ACC_TAG_BASE = {
  color: 'neutral' as const,
  contrast: 'low' as const,
  shape: 'rounded' as const,
  size: 'large' as const,
}

type AccSalesPlayStatus =
  | 'not-touched' | 'pitched' | 'deferred' | 'declined'
  | 'pursuing' | 'closed-won' | 'closed-lost'

// Status → icon mapping. Identical to account-table's convention so the
// glyph alphabet is consistent across surfaces.
const ACC_SP_ICON: Record<AccSalesPlayStatus, React.ElementType> = {
  'not-touched': NotTouched,
  'pitched':     Pitched,
  'deferred':    HourglassEnd,
  'declined':    MinusCircleStroke,
  'pursuing':    ChessKnight,
  'closed-won':  ClosedWon,
  'closed-lost': DoNotEnter,
}

interface AccSalesPlayInstance {
  name: string
  status: AccSalesPlayStatus
  amountUsd: number
}
interface AccSalesPlayFamily {
  id: 'fw-cdss' | 'sase' | 'cortex-cloud' | 'unit-42'
  name: string
  plays: AccSalesPlayInstance[]
}

// POC-local: the mock layer's `SalesPlay` records (mock/data/sales-plays.ts)
// define play catalog entries by family, but per-account instances with
// status + amount are not yet modeled. Stubbed here against the four
// families.  Section total of Not-Touched plays:
//   FW & CDSS ($2,500) + SASE ($38,500) + Cortex Cloud ($24,900) = $65,900
// Unit 42 has no Not-Touched plays in this mock, so its family row appears
// WITHOUT a rollup tag (spec rule §5).
const ACC_SALES_PLAYS: AccSalesPlayFamily[] = [
  { id: 'fw-cdss', name: 'FW & CDSS', plays: [
    { name: 'Hardware Refresh',     status: 'not-touched', amountUsd:   2_500 },
    { name: 'Fortinet Displacement', status: 'pursuing',    amountUsd: 123_000 },
    { name: 'SWFW Acceleration',     status: 'closed-won',  amountUsd:  85_000 },
  ]},
  { id: 'sase', name: 'SASE', plays: [
    { name: 'GP to Prisma Access',     status: 'not-touched', amountUsd: 38_500 },
    { name: 'PAB Existing PA Upgrade', status: 'pitched',     amountUsd: 95_000 },
    { name: 'PAB for Partners',        status: 'deferred',    amountUsd: 42_000 },
  ]},
  { id: 'cortex-cloud', name: 'Cortex Cloud', plays: [
    { name: 'XSIAM Splunk Takeout', status: 'not-touched', amountUsd:  24_900 },
    { name: 'DR Acceleration',      status: 'closed-won',  amountUsd: 185_000 },
  ]},
  { id: 'unit-42', name: 'Unit 42', plays: [
    { name: 'Unit 42', status: 'closed-lost', amountUsd: 50_000 },
  ]},
]

const notTouchedTotal = (family: AccSalesPlayFamily) =>
  family.plays.filter(p => p.status === 'not-touched')
              .reduce((s, p) => s + p.amountUsd, 0)

function fmtMoneyFull(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(n)
}

// Sales-play status tag — neutral chip with a leading status icon + $value
// as label. Used at both family-rollup (NotTouched only, $sum) and leaf
// (one of seven statuses, $play). The `acc-sp-tag--<status>` modifier on
// a parent element drives the per-status icon recolor in CSS (named DS
// status icons ship with authored fills; CSS `fill: currentColor` lets us
// re-tint them without touching @ds/icons).
function SalesPlayValueTag({
  status, amountUsd,
}: { status: AccSalesPlayStatus; amountUsd: number }) {
  const Icon = ACC_SP_ICON[status]
  return (
    <span className={`acc-sp-tag-wrap acc-sp-tag--${status}`}>
      <Tags
        {...ACC_TAG_BASE}
        icon
        renderIcon={Icon}
        label={fmtMoneyFull(amountUsd)}
        className="acc-sp-tag acc-tag--static"
      />
    </span>
  )
}

// Per-play leaf row. Layout: play name on the left as plain text, value
// tag (icon + $) on the right. On hover (100ms delay) a DS Tooltip
// surfaces the status label — the leading icon alone is glanceable but
// not self-labeled, so the tooltip earns its keep by naming the status
// in words. No chip wraps the row name — the row IS the play; the tag
// is the metric. Dividers between leaves render outside this component
// (leaves are table rows; per project rule lines as dividers are
// reserved for table rows within an accordion).
function PlayRow({ play, onClick }: { play: AccSalesPlayInstance; onClick?: () => void }) {
  return (
    <div className="acc-sp-play-row" onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      <span className="acc-sp-play-row__name">{play.name}</span>
      <PanelHover
        openDelayMs={100}
        panel={<Tooltip pointerDirection="top" content={ACC_SP_STATUS_LABEL[play.status]} />}
      >
        <SalesPlayValueTag status={play.status} amountUsd={play.amountUsd} />
      </PanelHover>
    </div>
  )
}

// Title node with a trailing icon-bearing tag. The DS Accordion's
// `tagLabel` only accepts a string and its embedded <Tags> doesn't
// expose an icon slot — so to carry the NotTouched glyph in the
// rollup chip we render the entire title as a JSX node and set
// `showTag={false}` on the Accordion. The Accordion's title-row
// flex layout positions our wrapper across the full title width;
// our wrapper then space-betweens the text and the tag.
function SectionTitleWithTag({
  text, status, amountUsd,
}: {
  text: string
  status: AccSalesPlayStatus | null
  amountUsd: number | null
}) {
  return (
    <span className="acc-sp-tag-title">
      <span className="acc-sp-tag-title__text">{text}</span>
      {status !== null && amountUsd !== null && (
        <PanelHover
          openDelayMs={100}
          panel={<Tooltip pointerDirection="top" content={ACC_SP_STATUS_LABEL[status]} />}
        >
          <SalesPlayValueTag status={status} amountUsd={amountUsd} />
        </PanelHover>
      )}
    </span>
  )
}

// ─── Opportunities in Next 4Q (Phase 3) ──────────────────────────────────────
//
// SCOPE: structural skeleton only. Per the doc, every interactive value in
// the expanded snapshot is a *tag-as-trigger → single-button popover*. The
// hover-popover behavior and the editable Renewal Outcome flyout both
// belong to Phase 4 — Phase 3 ships the static surface (every row visible,
// every tag rendered, plus the "Open in SFDC" footer button), with TODOs
// where the popover/flyout will hang.
//
// Tag grammar across the section:
//   - Section header rollup tag: neutral chip, $X.XM total pipeline.
//   - Per-row value tags: neutral chip by default (Active Quote, Closing in,
//     Stage, Forecast, Opportunity Type, Last Activity, Last Activity Date).
//   - Opportunity Risks: red danger tag (count) — only red-toned row, mirrors
//     the table's risk treatment.
//   - Renewal Outcome: color-mapped per outcome (Unknown=grey, Full=jade,
//     Downsell=orange, Churn=red, Displacement=grey, Duplicate=grey).
//   - Products: custom inline chip carrying stacked brand icons — DS Tags
//     only exposes a single leading-icon slot, and the spec calls for one
//     glyph per *unique brand* on the opportunity. Authored fills are kept.
//   - ARR: plain text value (not interactive on its own), so it falls back
//     to the .acc-data-row primitive already used in Install Base.

// Section-tag preset reuses the sales-play neutral chip base so the panel's
// chip ground stays consistent across sections. Color comes from icon /
// label semantics (per Products / Risks / Renewal Outcome below), not the
// chip surface.
const ACC_OPP_TAG_BASE = ACC_TAG_BASE

// Brand icon per ProductId — only the products that appear on the cyberdyne
// opportunities (real + stub renewal) plus the table's superset, so future
// opps with different products don't fall through to a default glyph.
const PRODUCT_BRAND_ICON: Partial<Record<ProductId, React.ElementType>> = {
  'pa-series':           BrandStrata,
  'vm-series':           BrandStrata,
  'pa-series-attached':  BrandStrata,
  'pa-series-support':   BrandStrata,
  'fw-data-lake':        BrandStrata,
  'prisma-access':       BrandPrisma,
  'prisma-sd-wan':       BrandPrisma,
  'cortex-xdr':          BrandCortex,
  'cortex-xsoar':        BrandCortex,
  'xpanse':              BrandCortex,
  'xsiam':               BrandCortex,
  'qradar':              BrandCortex,
  'cortex-cloud-leaf':   BrandCortex,
  // BrandUnit42 exists in @ds/icons source but isn't re-exported from
  // the package's generated barrel — falls through to undefined here and
  // the icon is skipped at render. Cyberdyne's opps don't include
  // unit-42 products, so this gap doesn't affect the Phase 3 surface.
  // Track for a DS-level icon-barrel regeneration.
}

// POC-local: the base Opportunity type doesn't yet model time-in-stage,
// time-in-forecast, or per-opp renewal outcome. Stubbed here as a wrap
// around the mock record so the Phase 3 surface can demonstrate every row.
interface AccOppExtras {
  daysInStage?: number
  daysInForecast?: number
  renewalOutcome?: RenewalOutcome
}
type AccOpp = Opportunity & AccOppExtras

// Local renewal stub. Spec §6 requires every account to have at least one
// Renewal-type opportunity inside the 4-quarter window so the Renewal
// Outcome control always has a place to demonstrate. The cyberdyne mock
// data only contains two upsell records — invariant added here at the
// composition layer, not the mock layer.
const STUB_CYBERDYNE_RENEWAL: AccOpp = {
  id: 'opp-cyberdyne-sentinel-renewal',
  accountId: account.id,
  name: 'SentinelOne XDR Renewal',
  quoteId: 'Q-100874',
  isPrimaryQuote: true,
  type: 'renewal',
  amount: 750_000,
  daysToClose: 38,
  forecastCategory: 'best-case',
  stageId: 'negotiate',
  productIds: ['cortex-xdr'],
  riskIds: [
    'no-secured-tech-win', 'budget-not-scheduled',
    'no-activity-30-days', 'quotes-pending-approval',
  ],
  lastActivity: { type: 'customer-engagement', daysAgo: 5 },
  scenarios: ['default'],
  daysInStage: 14,
  daysInForecast: 67,
  renewalOutcome: 'unknown',
}

const realCyberdyneOpps = OPPORTUNITIES.filter(o => o.accountId === account.id)
const ACC_OPPS: AccOpp[] = [
  STUB_CYBERDYNE_RENEWAL,
  // Apply the same daysInStage/daysInForecast stubs to real opps so every
  // row in the panel renders the same shape — defer cleanup to the mock
  // layer.
  ...realCyberdyneOpps.map<AccOpp>(o => ({
    ...o,
    daysInStage: o.daysInStage ?? 21,
    daysInForecast: o.daysInForecast ?? 42,
  })),
]

// Closing-quarter label. Anchored to today = May 2026 (Q4FY26 = "CQ");
// fiscal year runs Aug → Jul, so day-buckets approximate quarter ends:
//   ≤ 90 → CQ
//   91–180 → Q1FY27
//   181–270 → Q2FY27
//   ≥ 271 → Q3FY27
// Outside the 4Q window is out-of-scope for this section (caller filters).
function closingQuarterLabel(daysToClose: number): string {
  if (daysToClose <= 90)  return 'CQ'
  if (daysToClose <= 180) return 'Q1FY27'
  if (daysToClose <= 270) return 'Q2FY27'
  return 'Q3FY27'
}

// "X days ago" → calendar-date string anchored to today's date in CLAUDE.md
// (2026-05-11). Compact "DD MMM YYYY" matches the spec's worked example
// (e.g. "12 Mar 2026").
const TODAY = new Date('2026-05-11T12:00:00Z')
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
function fmtRelativeDate(daysAgo: number): string {
  const d = new Date(TODAY.getTime() - daysAgo * 86_400_000)
  return `${d.getUTCDate()} ${MONTH_ABBR[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

// Forecast category → categorical tag color. Mirrors opportunity-table's
// FORECAST_COLOR — bronze (raw early), teal (best case, cool/hopeful),
// olive (committed, settled). The table also maps 'closed-won' and
// 'omitted'; this panel scopes to live-window opportunities, so we only
// cover the three open buckets.
const FORECAST_TAG_COLOR: Record<string, 'bronze' | 'teal' | 'olive' | 'grey'> = {
  'pipeline':  'bronze',
  'best-case': 'teal',
  'commit':    'olive',
  // safety fallback so an unknown bucket (closed-won, omitted) renders
  // calmly rather than crashing the section
  'closed-won': 'grey',
  'omitted':    'grey',
}

// Per-product $-value stub for the Products hover popover. The mock
// Opportunity carries `productIds` (no per-product breakdown of the
// total). Spec calls for "products and their total value towards the
// opportunity total" on hover — until the mock layer models the
// allocation, we split evenly across unique products and round to the
// nearest $1k. Total reconciles exactly to the opp's amount.
function allocateProductValues(productIds: ProductId[], totalUsd: number): Array<{ id: ProductId; usd: number }> {
  if (productIds.length === 0) return []
  const each = Math.floor(totalUsd / productIds.length)
  const rounded = Math.round(each / 1_000) * 1_000
  const allocated = productIds.slice(0, -1).map(id => ({ id, usd: rounded }))
  const remainder = totalUsd - rounded * (productIds.length - 1)
  allocated.push({ id: productIds[productIds.length - 1], usd: remainder })
  return allocated
}

// Risk catalog labels — POC-local. Pulled by id for the Risks popover.
const RISK_LABELS: Record<string, string> = {
  'no-secured-tech-win':    'No secured tech win',
  'budget-not-scheduled':   'Budget not scheduled',
  'no-activity-30-days':    'No activity in 30 days',
  'quotes-pending-approval':'Quotes pending approval',
  'no-risks':               'No risks',
}

// Sales-play status label for the Sales Play tooltip.
const ACC_SP_STATUS_LABEL: Record<AccSalesPlayStatus, string> = {
  'not-touched': 'Not touched',
  'pitched':     'Pitched',
  'deferred':    'Deferred',
  'declined':    'Declined',
  'pursuing':    'Pursuing',
  'closed-won':  'Closed won',
  'closed-lost': 'Closed lost',
}

// Outcome → DS Tags color. Slate isn't a Tags color in the DS palette;
// "Duplicate" maps to grey alongside Unknown / Displacement per the
// outcomes preset already shipped on the sibling Opportunities Panel.
const OUTCOME_TAG_COLOR: Record<RenewalOutcome, 'grey' | 'jade' | 'orange' | 'red'> = {
  'unknown':      'grey',
  'full':         'jade',
  'upsell':       'jade',     // same positive-outcome family as `full`
  'downsell':     'orange',
  'churn':        'red',
  'displacement': 'grey',
  'duplicate':    'grey',
}

// Ordered outcomes for the Flyout list — Unknown first as the resting
// default, then the positive outcomes (Full Renewal, Upsell — flat vs
// renewal-plus-growth), then degrading outcomes (Downsell, Churn),
// then the two structural outcomes (Displacement, Duplicate). Matches
// the spec §6 enum order with `upsell` slotted in after `full` per the
// pass-2 renewal-outcome split.
const OUTCOME_ORDER: RenewalOutcome[] = [
  'unknown',
  'full',
  'upsell',
  'downsell',
  'churn',
  'displacement',
  'duplicate',
]

// Phase 4: Churn-flow taxonomies. Spec §6 calls these "required dropdowns"
// in the Churn branch. POC-local enum (mock layer doesn't yet model the
// Churn Reason / Competitor catalogs).
const CHURN_REASONS: Array<{ label: string; value: string }> = [
  { label: 'Customer dissatisfied',    value: 'dissatisfied' },
  { label: 'Budget cut',               value: 'budget' },
  { label: 'Competitive displacement', value: 'competitive' },
  { label: 'End of life',              value: 'eol' },
  { label: 'Other',                    value: 'other' },
]
const COMPETITORS: Array<{ label: string; value: string }> = [
  { label: 'CrowdStrike', value: 'crowdstrike' },
  { label: 'Fortinet',    value: 'fortinet' },
  { label: 'SentinelOne', value: 'sentinelone' },
  { label: 'Cisco',       value: 'cisco' },
  { label: 'Other',       value: 'other' },
]

// Single static tag row inside an expanded opportunity. Right-side renders
// either the DS <Tags /> or a passed-in custom node (Products, Renewal
// Outcome — both need bespoke chip markup).
function OppTagRow({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="acc-opp-row">
      <span className="acc-opp-row__label">{label}</span>
      <span className="acc-opp-row__value">{children}</span>
    </div>
  )
}

// Stacked unique-brand chip for the Products row. Custom markup, not the
// DS Tags component — the API exposes one leading-icon slot, and the spec
// calls for one glyph per unique brand. We use the DS chip class chain so
// the chip surface matches every neighboring tag; brand icons paint with
// their authored fills (no recolor).
function ProductsTag({ productIds }: { productIds: ProductId[] }) {
  const seen = new Set<React.ElementType>()
  const icons: React.ElementType[] = []
  for (const id of productIds) {
    const Icon = PRODUCT_BRAND_ICON[id]
    if (Icon && !seen.has(Icon)) { seen.add(Icon); icons.push(Icon) }
  }
  return (
    <span
      className="panw--tag panw--tag--size-large panw--tag--shape-rounded panw--tag--low panw--tag--neutral acc-opp-products-tag"
      role="presentation"
      aria-label={`${icons.length} product brand${icons.length === 1 ? '' : 's'}`}
    >
      {icons.map((Icon, i) => (
        <span key={i} className="acc-opp-products-tag__icon" aria-hidden="true">
          <Icon size={16} />
        </span>
      ))}
    </span>
  )
}

// ─── Renewal Outcome editor (Phase 4) ────────────────────────────────────
//
// Wires the tag-as-trigger + Flyout outcome picker + inline form pattern
// from the sibling AE Opportunities Panel into this section. State is
// per-instance (one editor per Renewal opportunity), so AccountPanel
// doesn't need to know anything about it.
//
// Behavior per spec §6:
//   1. Resting state: chip with the committed outcome label + trailing
//      chevron. Click opens the Flyout (single-select FlyoutList of the
//      six outcomes).
//   2. Selecting an outcome ≠ Unknown reveals an inline form below the
//      Renewal Outcome row:
//        • Non-Churn flow: a single optional Notes textarea. Save enabled.
//        • Churn flow: two REQUIRED dropdowns (Churn Reason, Competitor)
//          ABOVE Notes, plus Notes becomes required. Save disabled
//          until all three are filled.
//   3. Save: commits the draft outcome + form fields to the editor's
//      "committed" snapshot, collapses the form back to the chip.
//   4. Cancel: discards the draft, restores the committed outcome and
//      collapses the form.
//
// Cancel-on-Unknown is a no-op: spec defines Unknown as the resting
// default, so picking Unknown from the Flyout simply re-collapses the
// form without needing Save.
function RenewalOutcomeEditor({ initialOutcome }: { initialOutcome: RenewalOutcome }) {
  // Committed snapshot — what would be persisted server-side.
  const [committedOutcome, setCommittedOutcome] = useState<RenewalOutcome>(initialOutcome)
  const [committedNotes,   setCommittedNotes]   = useState<string>('')
  const [committedReason,  setCommittedReason]  = useState<string | undefined>(undefined)
  const [committedComp,    setCommittedComp]    = useState<string | undefined>(undefined)

  // Draft (in-progress) editor state.
  const [draftOutcome, setDraftOutcome] = useState<RenewalOutcome>(initialOutcome)
  const [draftNotes,   setDraftNotes]   = useState<string>('')
  const [draftReason,  setDraftReason]  = useState<string | undefined>(undefined)
  const [draftComp,    setDraftComp]    = useState<string | undefined>(undefined)

  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  // Form visibility: the inline form is shown only while the user is
  // editing a non-Unknown disposition. Committed Unknown + draft Unknown
  // ⇒ collapsed; any deviation (committed differs from draft, or either
  // is non-Unknown) ⇒ form open.
  const isChurn = draftOutcome === 'churn'
  const editing = draftOutcome !== 'unknown' || committedOutcome !== draftOutcome
  const churnReady = !isChurn || (!!draftReason && !!draftComp && draftNotes.trim() !== '')
  const dirtyOutcome = draftOutcome !== committedOutcome
  const dirtyNotes   = draftNotes   !== committedNotes
  const dirtyReason  = draftReason  !== committedReason
  const dirtyComp    = draftComp    !== committedComp
  // Save enables when (a) ANY field changed and (b) any required
  // churn-flow fields are filled. This covers notes-only edits and
  // reason/competitor updates on an already-saved churn disposition.
  const dirtyFields  = dirtyOutcome || dirtyNotes || dirtyReason || dirtyComp
  const saveEnabled  = dirtyFields && churnReady

  const handleSelect = useCallback((vals: string[]) => {
    const next = (vals[0] ?? 'unknown') as RenewalOutcome
    setDraftOutcome(next)
    // Clearing churn-only fields when switching out of churn keeps form
    // state coherent — otherwise stale reason/competitor would persist
    // invisibly under a non-churn disposition.
    if (next !== 'churn') {
      setDraftReason(undefined)
      setDraftComp(undefined)
    }
  }, [])

  const handleSave = useCallback(() => {
    if (!saveEnabled) return
    setCommittedOutcome(draftOutcome)
    setCommittedNotes(draftNotes)
    setCommittedReason(draftReason)
    setCommittedComp(draftComp)
    // Draft and committed are now in sync — `editing` flips to false
    // for non-Unknown saves the row collapses; the chip shows the
    // newly-committed outcome.
  }, [saveEnabled, draftOutcome, draftNotes, draftReason, draftComp])

  const handleCancel = useCallback(() => {
    setDraftOutcome(committedOutcome)
    setDraftNotes(committedNotes)
    setDraftReason(committedReason)
    setDraftComp(committedComp)
  }, [committedOutcome, committedNotes, committedReason, committedComp])

  // The chip shows the DRAFT outcome — what the user has actively
  // selected, not the persisted value. Without this, picking a new
  // outcome from the Flyout would leave the chip unchanged until
  // Save, which reads as "my click didn't register." Cancel restores
  // the chip back to the last-saved committedOutcome.
  const chipColor = OUTCOME_TAG_COLOR[draftOutcome]
  const chipLabel = RENEWAL_OUTCOME_LABELS[draftOutcome]
  // Keep the form open whenever the editor is in active edit mode OR the
  // committed outcome is something other than Unknown (so the AE can see
  // the rationale they captured without re-opening the picker).
  const formVisible = editing && draftOutcome !== 'unknown'

  return (
    <>
      <OppTagRow label="Renewal Outcome">
        <button
          ref={triggerRef}
          type="button"
          className="acc-opp-outcome-trigger"
          aria-haspopup="listbox"
          aria-expanded={flyoutOpen}
          onClick={() => setFlyoutOpen(v => !v)}
        >
          {/* DS Tags with trailing icon — `icon` slot is leading by
              default, but we lay the chevron OUT via a sibling span and
              flip its order in CSS so the chip itself stays canonical
              (correct radius, correct icon color from the tag's color
              tokens, no hand-rolled class chain). */}
          <span className="acc-opp-outcome-tag-wrap">
            <Tags
              color={chipColor}
              contrast="low"
              shape="rounded"
              size="large"
              label={chipLabel}
            />
            <span className="acc-opp-outcome-tag-wrap__chevron" aria-hidden="true">
              <ChevronDown size={14} />
            </span>
          </span>
        </button>
        <Flyout
          open={flyoutOpen}
          onOpenChange={setFlyoutOpen}
          anchorRef={triggerRef}
          mode="single"
          selected={[draftOutcome]}
          onSelectionChange={handleSelect}
          placement="bottom-end"
        >
          <FlyoutList>
            {OUTCOME_ORDER.map(o => (
              <FlyoutItem key={o} value={o}>
                {RENEWAL_OUTCOME_LABELS[o]}
              </FlyoutItem>
            ))}
          </FlyoutList>
        </Flyout>
      </OppTagRow>

      {formVisible && (
        <div className="acc-renewal-form" role="group" aria-label="Renewal outcome details">
          {isChurn && (
            <>
              <Dropdown
                title="Churn / Dismissal Reason"
                placeholder="Select"
                showDescription={false}
                background="grey00"
                selectedValue={draftReason}
                onChange={(v: string) => setDraftReason(v)}
                options={CHURN_REASONS}
              />
              <Dropdown
                title="Competitor Replacement"
                placeholder="Select"
                showDescription={false}
                background="grey00"
                selectedValue={draftComp}
                onChange={(v: string) => setDraftComp(v)}
                options={COMPETITORS}
              />
            </>
          )}
          <TextEntry
            title="Notes"
            inputType="area"
            placeholder={isChurn ? 'Required notes on the churn rationale.' : 'Optional notes.'}
            showDescription={false}
            background="grey00"
            value={draftNotes}
            onChange={(v: string) => setDraftNotes(v)}
          />
          <div className="acc-renewal-form__actions">
            <Button kind="secondary" size="small" onClick={handleCancel}>Cancel</Button>
            <Button
              kind="primary"
              size="small"
              onClick={handleSave}
              disabled={!saveEnabled}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

// Single-button popover surface — used by Active Quote on hover. One
// ghost-brand action, sized to fit the action label.
function PopoverActionButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <div className="acc-popover acc-popover--button">
      <Button kind="ghost-brand" size="default" onClick={onClick}>{label}</Button>
    </div>
  )
}

// Multi-row popover — shared body for Risks, Products, Last Activity.
function PopoverList({ title, rows }: { title: string; rows: Array<{ label: string; value?: string }> }) {
  return (
    <div className="acc-popover acc-popover--list">
      <div className="acc-popover__title">{title}</div>
      <div className="acc-popover__rows">
        {rows.map((r, i) => (
          <div key={i} className="acc-popover__row">
            <span className="acc-popover__row-label">{r.label}</span>
            {r.value && <span className="acc-popover__row-value">{r.value}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// Stage / Forecast row body — label tag (and color, for Forecast) + plain
// days text alongside the tag. Days are NOT inside the tag chip; the chip
// carries the categorical value and the duration sits next to it as
// supporting context.
function TagWithDays({
  label, color = 'neutral', days,
}: { label: string; color?: 'neutral' | 'bronze' | 'teal' | 'olive' | 'grey'; days: number | undefined }) {
  return (
    <span className="acc-opp-tag-with-days">
      <Tags color={color} contrast="low" shape="rounded" size="large" label={label} />
      {days !== undefined && (
        <span className="acc-opp-tag-with-days__suffix">{days} days</span>
      )}
    </span>
  )
}

// One expanded opportunity card. Order of rows is fixed by spec §6.
function OpportunitySnapshot({ opp }: { opp: AccOpp }) {
  const isRenewal = opp.type === 'renewal' || opp.type === 'renewal-and-upsell'
  const stage = STAGES[opp.stageId]
  const forecastLabel = FORECAST_CATEGORY_LABELS[opp.forecastCategory]
  const forecastColor = FORECAST_TAG_COLOR[opp.forecastCategory] ?? 'grey'
  const typeLabel = OPPORTUNITY_TYPE_LABELS[opp.type]
  const activeRisks = opp.riskIds.filter(r => r !== 'no-risks')
  const riskCount = activeRisks.length
  const activityLabel = ACTIVITY_TYPES[opp.lastActivity.type].label

  // Snapshot rows authored as an array so dividers can render between
  // them without scattering Fragment + divider markup through the JSX.
  const rows: Array<{ key: string; label: string; value: React.ReactNode }> = []

  if (opp.quoteId) {
    rows.push({
      key: 'quote',
      label: 'Active Quote',
      value: (
        <PanelHover
          interactive
          openDelayMs={300}
          align="end"
          panel={<PopoverActionButton label="View Quote" />}
        >
          <Tags {...ACC_OPP_TAG_BASE} label={opp.quoteId} />
        </PanelHover>
      ),
    })
  }

  rows.push({
    key: 'stage',
    label: 'Stage',
    value: <TagWithDays label={stage.name} days={opp.daysInStage} />,
  })

  // ARR — plain value, not a tag. Reuses the same row primitive so the
  // divider rhythm holds; the value just isn't chip-wrapped.
  rows.push({
    key: 'arr',
    label: 'ARR',
    value: <span className="acc-opp-row__plain-value">{fmtMoneyFull(opp.amount)}</span>,
  })

  rows.push({
    key: 'forecast',
    label: 'Forecast',
    value: <TagWithDays label={forecastLabel} color={forecastColor} days={opp.daysInForecast} />,
  })

  rows.push({
    key: 'type',
    label: 'Opportunity Type',
    value: <Tags {...ACC_OPP_TAG_BASE} label={typeLabel} />,
  })

  rows.push({
    key: 'risks',
    label: 'Opportunity Risks',
    // Risks tag is NOT color-coded per directive — neutral chip with
    // count; hover popover lists the applied risks. "0" renders when
    // there are no risks so the row is never visually empty.
    value: (
      <PanelHover
        openDelayMs={300}
        panel={
          riskCount === 0
            ? <PopoverList title="Risks" rows={[{ label: 'No risks' }]} />
            : <PopoverList title="Risks" rows={activeRisks.map(r => ({ label: RISK_LABELS[r] ?? r }))} />
        }
      >
        <Tags {...ACC_OPP_TAG_BASE} label={String(riskCount)} />
      </PanelHover>
    ),
  })

  rows.push({
    key: 'products',
    label: 'Products',
    value: (
      <PanelHover
        openDelayMs={300}
        panel={
          <PopoverList
            title="Products"
            rows={allocateProductValues(opp.productIds, opp.amount).map(p => ({
              label: PRODUCTS[p.id]?.name ?? p.id,
              value: fmtMoneyFull(p.usd),
            }))}
          />
        }
      >
        <ProductsTag productIds={opp.productIds} />
      </PanelHover>
    ),
  })

  rows.push({
    key: 'last-activity-date',
    label: 'Last Activity Date',
    value: (
      <PanelHover
        openDelayMs={300}
        panel={
          <PopoverList
            title="Last Activity"
            rows={[
              { label: 'Type', value: activityLabel },
              { label: 'When', value: `${opp.lastActivity.daysAgo} days ago` },
            ]}
          />
        }
      >
        <Tags {...ACC_OPP_TAG_BASE} label={fmtRelativeDate(opp.lastActivity.daysAgo)} />
      </PanelHover>
    ),
  })

  return (
    <div className="acc-opp-snapshot">
      {rows.map((r, i) => (
        <React.Fragment key={r.key}>
          {i > 0 && <div className="acc-divider" aria-hidden="true" />}
          <OppTagRow label={r.label}>{r.value}</OppTagRow>
        </React.Fragment>
      ))}

      {/* Renewal Outcome — only on renewal-typed opportunities. Editor
          carries its own row chrome (chip + flyout + form), so the
          divider above it lives on the editor row, not here. */}
      {isRenewal && (
        <>
          <div className="acc-divider" aria-hidden="true" />
          <RenewalOutcomeEditor initialOutcome={opp.renewalOutcome ?? 'unknown'} />
        </>
      )}

      {/* Footer — single ghost-brand CTA. Per directive, deep-link CTAs
          inside accordions go full-width center. */}
      <div className="acc-section-cta acc-section-cta--nested">
        <Button kind="ghost-brand" size="default" className="acc-cta-button">Open in SFDC</Button>
      </div>
    </div>
  )
}

// ─── Account Health (Phase 5) ────────────────────────────────────────────
//
// Per spec §7: a single-level accordion (no nesting). The section header
// carries the OVERALL health tag (= worst of Technical Health and
// Deployment-and-Adoption Health on the severity ladder). Inside the
// drawer: a 12-period sparkline, two sub-axis rows, and a flat
// per-product breakdown. No tables; the per-product layout trades
// horizontal compactness (the matrix from Figma) for legibility at
// panel width.
//
// All health values for this account are stubbed locally — the mock
// Account record carries an account-level health summary but doesn't
// yet model 12-period trend, sub-axis decomposition, or per-product
// health. Mock-layer TODO; the worked example in account-panel-
// reference.md §9 ("Critical overall because Cortex XSOAR is Critical
// on the Technical axis") drives the values chosen here.

// HealthStatus → DS Tags color. Mirrors the convention from the sibling
// AE Opportunities Panel and the account-table popover.
const HEALTH_TAG_COLOR: Record<HealthStatus, 'green' | 'orange' | 'red'> = {
  'healthy':  'green',
  'at-risk':  'orange',
  'critical': 'red',
}

// Bar-fill colors for past-month trend bars. Hex lifted verbatim from
// account-table.stories.tsx (≈L1551) — these primitives (green-40,
// yellow-30, red-50) live one stop lighter than `status.*.strong` and
// aren't exposed as semantic tokens, so the account-table popover
// declares them inline. Keeping the values in lockstep preserves
// table-↔-panel visual parity per the user's direction.
const HEALTH_BAR_FILL: Record<HealthStatus, string> = {
  'healthy':  '#3cc29a', // green-40
  'at-risk':  '#ffbe4f', // yellow-30
  'critical': '#f55868', // red-50
}
// Bar height is bound to severity, not magnitude (we don't have one):
// healthier periods read taller, critical reads short + red. Same
// fractions account-table uses for its 12-month trend.
const HEALTH_BAR_HEIGHT_FRACTION: Record<HealthStatus, number> = {
  'healthy':  1.0,
  'at-risk':  0.72,
  'critical': 0.38,
}

// 12-period (month-over-month) trend, oldest → newest. Cyberdyne
// degrades from Healthy → At-Risk → Critical over the back half of the
// year, matching the spec's "Critical overall" worked example. Period
// granularity (week vs month) is a question to resolve with the data
// team per spec §10; the panel renders 12 bars regardless.
const HEALTH_TREND_12: HealthStatus[] = [
  'healthy', 'healthy', 'healthy', 'at-risk', 'at-risk', 'at-risk',
  'at-risk', 'critical','at-risk', 'critical','critical','critical',
]

// Account-level sub-axes. Overall is *derived* (worst of these two) —
// never authored independently per the spec caution at §7 bottom. The
// overall computation now lives inside `AccountPanel` so it picks up
// whatever `data.techHealth` / `data.adoptHealth` are passed in.
const TECH_HEALTH: HealthStatus  = 'critical'
const ADOPT_HEALTH: HealthStatus = 'healthy'

interface ProductHealthRow {
  name: string
  brand: React.ElementType
  arrUsd: number
  technical: HealthStatus
  adoption:  HealthStatus
}

// Per-product breakdown. Anchored to the worked example: Cortex XSOAR
// is the critical-on-Technical one (the "one-product problem"); the
// rest are Healthy. ARR figures are stubbed and order is by ARR desc
// so the AE reads the biggest-dollar products first.
const PRODUCT_HEALTH: ProductHealthRow[] = [
  { name: 'Prisma Cloud', brand: BrandPrisma, arrUsd: 2_100_000, technical: 'healthy',  adoption: 'healthy' },
  { name: 'CDSS',         brand: BrandStrata, arrUsd: 1_800_000, technical: 'healthy',  adoption: 'healthy' },
  { name: 'Cortex XSOAR', brand: BrandCortex, arrUsd:   480_000, technical: 'critical', adoption: 'at-risk' },
]

// ─── Public data contract ────────────────────────────────────────────────────
//
// Everything the panel renders flows through `AccountPanelData`. The
// `DEFAULT_ACCOUNT_PANEL_DATA` constant assembled below resolves the
// `ACCOUNTS.find(...)` / `OPPORTUNITIES.filter(...)` lookups *once* at module
// load and packs the result alongside the file-local POC fixtures. Inside the
// panel function nothing reads `ACCOUNTS` / `OPPORTUNITIES` directly — the
// component is data-agnostic, and consumers can override by passing `data`.
//
// `renewalOpp` is a separate field from `opportunities` because the panel
// uses its id as the "open by default" marker; `opportunities` carries the
// full merged list the AE sees (renewal + real opps). When a CSV-backed
// consumer wires this up, they pick which opp opens by default and pass it
// here.
//
// Sub-axis values (`techHealth` / `adoptHealth`) are authored independently;
// `OVERALL_HEALTH` stays derived inside the component (worst-of-two per the
// spec's §7 caution).
export interface AccountPanelData {
  account: Account
  opportunities: AccOpp[]
  apexName: string
  renewalOpp: AccOpp
  installBase: Array<{ label: string; value: string; tone?: 'success' }>
  salesPlays: AccSalesPlayFamily[]
  healthTrend12: HealthStatus[]
  techHealth: HealthStatus
  adoptHealth: HealthStatus
  productHealth: ProductHealthRow[]
}

export const DEFAULT_ACCOUNT_PANEL_DATA: AccountPanelData = {
  account,
  opportunities: ACC_OPPS,
  apexName: APEX_NAME,
  renewalOpp: STUB_CYBERDYNE_RENEWAL,
  installBase: INSTALL_BASE,
  salesPlays: ACC_SALES_PLAYS,
  healthTrend12: HEALTH_TREND_12,
  techHealth: TECH_HEALTH,
  adoptHealth: ADOPT_HEALTH,
  productHealth: PRODUCT_HEALTH,
}

export interface AccountPanelProps {
  /** Override the panel's data. Defaults to the Cyberdyne fixture. */
  data?: AccountPanelData
  /**
   * Row id from AEOpportunityTable / AEAccountTable (e.g. `'1'`, `'3'`).
   * When provided, the panel looks up the corresponding Account from the
   * mock and renders that account's data. Takes precedence over `data`.
   * Fields not modeled per-account in the mock fall back to fixture defaults
   * (see complete-design/WIRING_INVENTORY.md §Mock data gaps).
   */
  accountId?: string
  /**
   * Open this opp's snapshot accordion by default. Falls back to
   * `data.renewalOpp.id`. Multiple opps can still toggle open via user
   * click; this prop only seeds the initial state. Unknown ids are
   * silent no-ops (no matching row renders, the panel's other state is
   * unaffected).
   *
   * Use case: the opportunity-table-row-click demo flow needs the panel
   * to open with the clicked opp's snapshot expanded, not the renewal's.
   */
  initialOpenOppId?: string
  /**
   * When provided, only the named section opens on mount and the panel
   * auto-scrolls to it. When omitted, all four sections open (default).
   *
   * If `initialOpenSection === 'opportunities'` and `initialOpenOppId` is
   * also set, the named opp's L2 accordion is expanded inside the section.
   * If only `initialOpenSection === 'opportunities'` (no `initialOpenOppId`),
   * the renewal opp opens as usual.
   */
  initialOpenSection?: 'installBase' | 'salesPlay' | 'opportunities' | 'accountHealth'
  /**
   * Fired when an L2 sales-play leaf row is clicked.
   * `playId` is the play name; `sourceOppId` is reserved for future
   * caller-side wiring and is always `undefined` from within this component.
   */
  onSalesPlayRowClick?: (playId: string, sourceOppId?: string) => void
}

// Build AccountPanelData from a canonical Account.id (e.g. 'acc-tyrell').
// Fields absent from the Account mock fall back to DEFAULT_ACCOUNT_PANEL_DATA.
// See complete-design/WIRING_INVENTORY.md §Mock data gaps for the full list.
function buildPanelDataForAccountId(id: string): AccountPanelData {
  const foundAccount = ACCOUNTS.find(a => a.id === id)
  if (!foundAccount) {
    // eslint-disable-next-line no-console
    console.warn(`[AccountPanel] canonical fallback: account '${id}' not found — using ACCOUNTS[0]`)
  }
  const acct = foundAccount ?? ACCOUNTS[0]
  const accountOpps: AccOpp[] = OPPORTUNITIES
    .filter(o => o.accountId === acct.id)
    .map(o => {
      const daysInStage    = o.daysInStage    ?? (console.warn(`[AccountPanel] opp '${o.id}' missing daysInStage — defaulting to 21`),    21)
      const daysInForecast = o.daysInForecast ?? (console.warn(`[AccountPanel] opp '${o.id}' missing daysInForecast — defaulting to 42`), 42)
      return { ...o, daysInStage, daysInForecast }
    })
  const renewalOpp: AccOpp =
    accountOpps.find(o => o.type === 'renewal' || o.type === 'renewal-and-upsell') ??
    (() => {
      // eslint-disable-next-line no-console
      console.warn(`[AccountPanel] canonical fallback: no renewal opp for '${acct.id}' — using STUB_CYBERDYNE_RENEWAL`)
      return { ...STUB_CYBERDYNE_RENEWAL, accountId: acct.id }
    })()
  if (accountOpps.length === 0) {
    // eslint-disable-next-line no-console
    console.warn(`[AccountPanel] canonical fallback: no opps for '${acct.id}' — using DEFAULT opportunities`)
  }
  if (!acct.installBase) {
    // eslint-disable-next-line no-console
    console.warn(`[AccountPanel] canonical fallback: account '${acct.id}' has no installBase — using DEFAULT`)
  }
  if (!acct.health.trend12mo) {
    // eslint-disable-next-line no-console
    console.warn(`[AccountPanel] canonical fallback: account '${acct.id}' has no health.trend12mo — using DEFAULT`)
  }
  return {
    account: acct,
    opportunities: accountOpps.length > 0 ? accountOpps : DEFAULT_ACCOUNT_PANEL_DATA.opportunities,
    apexName: acct.apex ?? '—',
    renewalOpp,
    installBase: acct.installBase
      ? fmtInstallBase(acct.installBase)
      : DEFAULT_ACCOUNT_PANEL_DATA.installBase,
    salesPlays:    buildSalesPlays(acct.id),
    healthTrend12: acct.health.trend12mo
      ? healthTrend12FromAccount([...acct.health.trend12mo].reverse())
      : DEFAULT_ACCOUNT_PANEL_DATA.healthTrend12,
    techHealth:    acct.health.technical,
    adoptHealth:   acct.health.deploymentAdoption,
    productHealth: DEFAULT_ACCOUNT_PANEL_DATA.productHealth,
  }
}

// Health-trend visualization. 12 past-month bars + 10 future-month
// circles, with the 3rd future circle marking the next renewal.
//
// Rendered in HTML (not SVG) so:
//   - Surface-accent fill is a direct CSS variable on the element,
//     resolving 1:1 to the same color the per-product tiles use —
//     no SVG antialiasing weirdness making the dots look paler than
//     the bars.
//   - The renewal dot is a real DOM node, so PanelHover can wrap it
//     and the DS Tooltip can hang off it the same way it does on
//     every other panel chip. (The earlier SVG <title> approach was
//     a browser-native tooltip; it's unreliable and not what the rest
//     of the panel uses.)
const PAST_MONTHS = 12
// Future months are generated generously so the row fills to the right
// edge of the (white) Aggregated Health tile at any panel width — the
// trend's overflow:hidden clips anything that overshoots. RENEWAL_FUTURE_INDEX
// stays at 2 so the renewal dot remains the third future month and is
// always within the visible range at this panel width.
const FUTURE_MONTHS = 24
const RENEWAL_FUTURE_INDEX = 2 // 3rd future month (0-indexed)
const TREND_INNER_H = 60
function HealthTrendSparkline({ trend }: { trend: HealthStatus[] }) {
  return (
    <div
      className="acc-health-trend-row"
      role="img"
      aria-label="Account health trend with upcoming renewal"
    >
      {trend.slice(0, PAST_MONTHS).map((sev, i) => {
        const frac = HEALTH_BAR_HEIGHT_FRACTION[sev]
        const barH = Math.max(8, TREND_INNER_H * frac)
        return (
          <span
            key={`p${i}`}
            className="acc-health-trend-bar"
            style={{ height: `${barH}px`, backgroundColor: HEALTH_BAR_FILL[sev] }}
          />
        )
      })}
      {Array.from({ length: FUTURE_MONTHS }, (_, i) => {
        const isRenewal = i === RENEWAL_FUTURE_INDEX
        if (isRenewal) {
          return (
            <PanelHover
              key={`f${i}`}
              openDelayMs={100}
              panel={<Tooltip pointerDirection="top" content="Renewal" />}
            >
              <span className="acc-health-trend-dot acc-health-trend-dot--renewal" />
            </PanelHover>
          )
        }
        return <span key={`f${i}`} className="acc-health-trend-dot" />
      })}
    </div>
  )
}

// One sub-axis row inside Account Health. Label on the left, health
// tag on the right. Spec calls these "account-level sub-axis rows"
// (§7) — flat under the section header, no indentation: the section
// heading already establishes the parent-child relationship visually.
function HealthAxisRow({ label, status }: { label: string; status: HealthStatus }) {
  const color = HEALTH_TAG_COLOR[status]
  return (
    <div className="acc-health-axis-row">
      <span className="acc-health-axis-row__label">{label}</span>
      <Tags
        color={color} contrast="low" shape="rounded" size="large"
        label={HEALTH_LABELS[status]}
      />
    </div>
  )
}

// One per-product block. Three rows stacked:
//   1. Heading: brand icon + product name (left) + product ARR (right)
//   2. Technical Health: label + tag
//   3. Deployment and Adoption Health: label + tag
// The heading row anchors the dollar weight of this product so the AE
// can tell whether a Critical product is a large or small slice of the
// account (the most common follow-up once they've seen the overall tag,
// per spec §7).
function ProductHealthBlock({ row }: { row: ProductHealthRow }) {
  const Icon = row.brand
  return (
    <div className="acc-product-health">
      <div className="acc-product-health__head">
        <span className="acc-product-health__brand" aria-hidden="true">
          <Icon size={16} />
        </span>
        <span className="acc-product-health__name">{row.name}</span>
        <span className="acc-product-health__arr">{fmtMoneyShort(row.arrUsd)} ARR</span>
      </div>
      <div className="acc-product-health__axes">
        <HealthAxisRow label="Technical Health"             status={row.technical} />
        <div className="acc-divider" aria-hidden="true" />
        <HealthAxisRow label="Deployment and Adoption Health" status={row.adoption} />
      </div>
    </div>
  )
}

export function AccountPanel({
  data: dataProp,
  accountId,
  initialOpenOppId,
  initialOpenSection,
  onSalesPlayRowClick,
}: AccountPanelProps = {}) {
  const data = accountId
    ? buildPanelDataForAccountId(accountId)
    : (dataProp ?? DEFAULT_ACCOUNT_PANEL_DATA)
  // Derived rollups — recomputed per render from whatever data was passed
  // in. These were module-scope constants before plumbing; pulling them
  // inside the component is what lets a caller pass a different `data`
  // and see different totals.
  const allNotTouchedTotal = data.salesPlays.reduce(
    (s, f) => s + notTouchedTotal(f), 0
  )
  const accOppsTotal = data.opportunities.reduce((s, o) => s + o.amount, 0)
  const overallHealth: HealthStatus =
    ([data.techHealth, data.adoptHealth] as HealthStatus[]).reduce<HealthStatus>(
      (worst, h) => {
        const rank: Record<HealthStatus, number> = { 'healthy': 0, 'at-risk': 1, 'critical': 2 }
        return rank[h] > rank[worst] ? h : worst
      },
      'healthy'
    )

  // When initialOpenSection is provided, only that section opens on mount.
  // Otherwise all four sections open (spec default).
  const [openSections, setOpenSections] = useState(() =>
    initialOpenSection
      ? {
          installBase:   initialOpenSection === 'installBase',
          salesPlay:     initialOpenSection === 'salesPlay',
          opportunities: initialOpenSection === 'opportunities',
          accountHealth: initialOpenSection === 'accountHealth',
        }
      : { installBase: true, salesPlay: true, opportunities: true, accountHealth: true }
  )
  const toggle = (id: keyof typeof openSections) =>
    setOpenSections(p => ({ ...p, [id]: !p[id] }))

  // Refs for the invisible anchor elements that precede each top-level
  // accordion — used for smooth-scrolling to the active section on mount.
  const installBaseAnchorRef  = useRef<HTMLDivElement>(null)
  const salesPlayAnchorRef    = useRef<HTMLDivElement>(null)
  const opportunitiesAnchorRef = useRef<HTMLDivElement>(null)
  const accountHealthAnchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!initialOpenSection) return
    const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      installBase:   installBaseAnchorRef,
      salesPlay:     salesPlayAnchorRef,
      opportunities: opportunitiesAnchorRef,
      accountHealth: accountHealthAnchorRef,
    }
    refMap[initialOpenSection]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps — mount-only

  // Family-row open state. Cortex Cloud opens by default in Phase 2 so
  // the leaf-row pattern (status icon + $value tag) is visible in the
  // initial render. Multiple families can be open at once.
  const [openFamilies, setOpenFamilies] = useState<Record<string, boolean>>({
    'cortex-cloud': true,
  })
  const toggleFamily = (id: string) =>
    setOpenFamilies(p => ({ ...p, [id]: !p[id] }))

  // Opportunity-row open state. By default the renewal opp opens so the
  // Renewal Outcome row (the unique-to-Phase-3 row in the snapshot) shows
  // in initial render. Callers can override via `initialOpenOppId` — used
  // by the opp-table-row-click demo flow so the panel opens with the
  // clicked opp expanded.
  const [openOpps, setOpenOpps] = useState<Record<string, boolean>>({
    [initialOpenOppId ?? data.renewalOpp.id]: true,
  })
  const toggleOpp = (id: string) =>
    setOpenOpps(p => ({ ...p, [id]: !p[id] }))

  return (
    <div className="stage acc-stage">
      <style>{PANEL_CSS}</style>

      <div className="acc-panel" role="complementary" aria-label="Account Preview">

        {/* ── Topbar (40px edge-to-edge strip) ──────────────────────────
            The panel's chrome rail. Title centered, Close on the right
            at 4px / 4px inset (square 32px button). */}
        <div className="acc-panel__topbar">
          <h2 className="acc-panel__title">Account Preview</h2>
          <Button
            kind="ghost"
            size="small"
            renderIcon={Close}
            iconDescription="Close panel"
            className="acc-panel__close"
          />
        </div>

        {/* ── Header (identity + LTV) ───────────────────────────────────
            Three rows with hairline dividers between them. Each row's
            label sits above; the value line is `[static text] [12px gap]
            [ghost-brand button]` — text is width:fit-content so the
            button hugs the value, not the row's right edge. The button
            is revealed on hover to keep the rest state quiet (per the
            prior directive on hover-only affordance for identity rows).
            LTV inherits the same shape — same label tier, same body-02
            value treatment — so the three rows read as one identity
            plate rather than two-plus-hero. */}
        <header className="acc-panel__header">
          <div className="acc-id-row">
            <span className="acc-id-row__label">Account</span>
            <div className="acc-id-row__value-row">
              <span className="acc-id-row__value">{data.account.name}</span>
              <Button
                kind="ghost-brand"
                size="small"
                renderIcon={ExternalLink}
                iconDescription={`Open ${data.account.name} in new tab`}
                className="acc-id-row__open-btn"
              />
            </div>
          </div>
          <div className="acc-header-divider" aria-hidden="true" />
          <div className="acc-id-row">
            <span className="acc-id-row__label">Apex Account</span>
            <div className="acc-id-row__value-row">
              <span className="acc-id-row__value">{data.apexName}</span>
              <Button
                kind="ghost-brand"
                size="small"
                renderIcon={ExternalLink}
                iconDescription={`Open ${data.apexName} in new tab`}
                className="acc-id-row__open-btn"
              />
            </div>
          </div>
          <div className="acc-header-divider" aria-hidden="true" />
          <div className="acc-id-row">
            <span className="acc-id-row__label">LTV</span>
            <div className="acc-id-row__value-row">
              <span className="acc-id-row__value acc-id-row__value--bold">{fmtMoneyShort(data.account.lifetimeValue)}</span>
            </div>
          </div>
          <div className="acc-header-divider" aria-hidden="true" />
          {/* ARR row — same identity-row grammar as LTV. Value derived from
              the per-product ARR breakdown (sum across owned products), so
              it stays in sync with the Account Health section's data. */}
          <div className="acc-id-row">
            <span className="acc-id-row__label">ARR</span>
            <div className="acc-id-row__value-row">
              <span className="acc-id-row__value acc-id-row__value--bold">
                {fmtMoneyShort(data.account.installBase?.tcv ?? 0)}
              </span>
            </div>
          </div>
        </header>

        {/* ── Section stack ─────────────────────────────────────────────
            Top-level sections are *not* tiles — they're section bands on
            the panel surface. Per direction: no border-radius on the
            top-level accordions (override DS's default 4px), and a 1px
            divider sits between each pair as its own element (never as
            a border on the accordion, never as a shadow).
              Install Base       → headline TCV
              Sales Play         → Not-Touched-total ($ in red)
              Opportunities/4Q   → total open-pipeline value
              Account Health     → overall health label (color-mapped)
            Sub-accordions nested inside Sales Play (Phase 2) keep the
            DS's tile radius — the no-radius rule applies only here. */}
        <div className="acc-section-stack">

        <div ref={installBaseAnchorRef} className="acc-section-anchor" aria-hidden="true" />
        <Accordion
          size="large" theme="gray10" orientation="right"
          title="Install Base" showIcon={false}
          showTag tagLabel={data.installBase.find(r => r.label === 'TCV')?.value ?? '—'} tagColor="cobalt" tagContrast="low" tagShape="rounded" tagSize="large"
          open={openSections.installBase}
          onToggle={() => toggle('installBase')}
        >
          {/*
            Install Base data sits inside a gray10 tile — same container
            grammar as the Account Health per-product tiles. The tile
            replaces the prior 16px inline inset; the tile's own padding
            handles the breathing room, and the tile shape signals
            "this is the data block" inside the accordion.

            Rows are 32px-tall (dense variant), still hairline-divided
            between siblings. Positive Incremental ACV and healthy
            Margin render in text.success; color is the quality signal,
            no tags.
          */}
          <div className="acc-data-tile">
            <div className="acc-data-table acc-data-table--dense">
              {data.installBase.map((row, i) => (
                <React.Fragment key={row.label}>
                  {i > 0 && <div className="acc-divider" aria-hidden="true" />}
                  <DataRow {...row} />
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* Deep link — full-width ghost-brand button, center-aligned label. */}
          <div className="acc-section-cta acc-section-cta--full">
            <Button kind="ghost-brand" size="default" className="acc-cta-button">Open Customer Estate</Button>
          </div>
        </Accordion>

        {/*
         * Sales Play section — three-tier $value tag grammar per the
         * sales-play domain model:
         *   - Section header tag: $ of all Not-Touched across families
         *   - Family row tag: $ of Not-Touched in that family (omitted
         *     when zero)
         *   - Per-play leaf tag: $ of that play + leading status icon
         *
         * CONSTRAINT (flagged): the DS Accordion's embedded Tags exposes
         * only label/color/contrast — no `icon` slot — so the section
         * header's rollup tag here cannot carry the NotTouched glyph.
         * Family rows and leaves DO carry it (custom-rendered tags).
         * Widening the DS Accordion public surface is out of scope for
         * the POC stage.
         */}
        <div ref={salesPlayAnchorRef} className="acc-section-anchor" aria-hidden="true" />
        <Accordion
          size="large" theme="gray10" orientation="right"
          /* Title renders as JSX so the rollup tag can carry the NotTouched
             icon (DS Accordion's `tagLabel` only accepts a string). The
             cast is at the prop-call boundary — runtime path is React's
             standard <span>{title}</span> which accepts ReactNode. */
          title={(
            <SectionTitleWithTag
              text="Sales Play"
              status={allNotTouchedTotal > 0 ? 'not-touched' : null}
              amountUsd={allNotTouchedTotal > 0 ? allNotTouchedTotal : null}
            />
          ) as unknown as string}
          showIcon={false}
          showTag={false}
          open={openSections.salesPlay}
          onToggle={() => toggle('salesPlay')}
        >
          {/*
            Family rows — DS Accordion sub-instances at `size="small"`,
            `theme="gray10"` so they render on surface.alt as alternating
            tiles inside the parent. Each family's rollup tag (NotTouched
            icon + $value) rides in a JSX title node, same trick as the
            section header above. Stack uses a 2px gap between siblings
            (per direction); no dividers — lines as dividers are reserved
            for table rows. */}
          <div className="acc-sp-family-list">
            {data.salesPlays.map(family => {
              const nt = notTouchedTotal(family)
              return (
                <Accordion
                  key={family.id}
                  size="small" theme="gray00" orientation="right"
                  title={(
                    <SectionTitleWithTag
                      text={family.name}
                      status={nt > 0 ? 'not-touched' : null}
                      amountUsd={nt > 0 ? nt : null}
                    />
                  ) as unknown as string}
                  showIcon={false}
                  showTag={false}
                  open={!!openFamilies[family.id]}
                  onToggle={() => toggleFamily(family.id)}
                >
                  <div className="acc-sp-play-list">
                    {family.plays.map(play => (
                      <PlayRow
                        key={play.name}
                        play={play}
                        onClick={onSalesPlayRowClick ? () => onSalesPlayRowClick(play.name) : undefined}
                      />
                    ))}
                  </div>
                </Accordion>
              )
            })}
          </div>
          {/* Deep link — full-width ghost-brand button per directive. */}
          <div className="acc-section-cta acc-section-cta--full">
            <Button kind="ghost-brand" size="default" className="acc-cta-button">Open in Sales Play Console</Button>
          </div>
        </Accordion>

        {/*
         * Opportunities in Next 4Q (Phase 3) — structural skeleton.
         * Section header tag is the section's TOTAL pipeline (not Not-Touched-
         * style; this section's framing is total open pipeline in the 4Q
         * window). Color is neutral — pipeline dollars are a sizing signal,
         * not a status signal.
         *
         * PHASE 4 deferred: each per-row tag is meant to be a popover trigger
         * (single ghost-brand button on hover); the Renewal Outcome row is
         * meant to open a DS Flyout (six-value enum, churn-only required
         * fields). Phase 3 ships static markup so the surface can be
         * critiqued in its at-rest shape before behavior layers on top.
         */}
        <div ref={opportunitiesAnchorRef} className="acc-section-anchor" aria-hidden="true" />
        <Accordion
          size="large" theme="gray10" orientation="right"
          title="Opportunities in Next 4Q" showIcon={false}
          showTag tagLabel={fmtMoneyShort(accOppsTotal)}
          tagColor="lime" tagContrast="low" tagShape="rounded" tagSize="large"
          /* Bold the section tag's label via CSS hook below — the DS Tag
             label is regular weight by default; the directive calls for
             bold inside this lime rollup specifically, not across the
             section's other tags. */
          className="acc-opp-section"
          open={openSections.opportunities}
          onToggle={() => toggle('opportunities')}
        >
          <div className="acc-opp-list">
            {data.opportunities.map(opp => {
              const typeLabel = OPPORTUNITY_TYPE_LABELS[opp.type].toLowerCase()
              // Description renders as a JSX fragment so the $value can
              // carry bold + primary tone while the rest of the line
              // remains regular + tertiary (the DS Accordion's
              // description default). The Accordion accepts a string
              // only — we trade type safety at the prop-call boundary
              // (same cast trick used elsewhere in this file) for the
              // mixed-weight description the directive specifies.
              const summary = (
                <span className="acc-opp-desc">
                  <span className="acc-opp-desc__amount">{fmtMoneyFull(opp.amount)}</span>
                  {' '}{typeLabel} closing in {closingQuarterLabel(opp.daysToClose)}
                </span>
              )
              return (
                <Accordion
                  key={opp.id}
                  size="small" theme="gray00" orientation="right"
                  title={opp.name}
                  description={summary as unknown as string}
                  showIcon={false}
                  showTag={false}
                  open={!!openOpps[opp.id]}
                  onToggle={() => toggleOpp(opp.id)}
                >
                  <OpportunitySnapshot opp={opp} />
                </Accordion>
              )
            })}
          </div>
          {/* No section-level deep link here. Unlike Install Base (→ Customer
              Estate) and Sales Play (→ Sales Play Console), the spec scopes
              this section's deep target to each individual opportunity — the
              per-opp "Open in SFDC" footer below already carries it. */}
        </Accordion>

        {/*
         * Account Health (Phase 5) — single-level accordion (no nested
         * accordions inside, per spec §7). Section header tag carries the
         * DERIVED overall status (worst of the two sub-axes). Drawer
         * contents, top-to-bottom:
         *   1. Health-trend sparkline (12 periods, color-coded)
         *   2. Two sub-axis rows: Technical, Deployment-and-Adoption
         *   3. Per-product breakdown — flat stack, one block per owned
         *      product (heading row + Technical + Adoption rows)
         *   4. "Open Account Health" deep link (CTA parity with other
         *      sections that hand off to a deeper surface)
         */}
        <div ref={accountHealthAnchorRef} className="acc-section-anchor" aria-hidden="true" />
        <Accordion
          size="large" theme="gray10" orientation="right"
          title="Account Health" showIcon={false}
          showTag
          tagLabel={HEALTH_LABELS[overallHealth]}
          tagColor={HEALTH_TAG_COLOR[overallHealth]}
          tagContrast="low" tagShape="rounded" tagSize="large"
          open={openSections.accountHealth}
          onToggle={() => toggle('accountHealth')}
        >
          <div className="acc-health-body">
            {/*
              Status-tinted container holding the trend graph + the two
              account-level sub-axis rows. Bg comes from the overall
              health (critical → status-error subtle, at-risk →
              caution subtle, healthy → success subtle). Within this
              tile, the trend sits inside its own WHITE sub-container
              (8px H / 4px V padding) so the bars read against neutral
              ground while the parent communicates status by color.
            */}
            <div className="acc-health-status-tile">
              <h3 className="acc-health-status-tile__heading">Aggregated Health</h3>
              <div className="acc-health-trend">
                <HealthTrendSparkline trend={data.healthTrend12} />
              </div>
              <div className="acc-health-axes">
                <HealthAxisRow label="Technical Health"               status={data.techHealth} />
                <div className="acc-divider" aria-hidden="true" />
                <HealthAxisRow label="Deployment and Adoption Health" status={data.adoptHealth} />
              </div>
            </div>

            {/* Per-product breakdown — each product is its own gray10
                tile with a 2px gap separating siblings, mirroring the
                Sales Play family list grammar. */}
            <div className="acc-product-health-list">
              {data.productHealth.map(p => (
                <ProductHealthBlock key={p.name} row={p} />
              ))}
            </div>
          </div>
          <div className="acc-section-cta acc-section-cta--full">
            <Button kind="ghost-brand" size="default" className="acc-cta-button">Open Account Health</Button>
          </div>
        </Accordion>

        </div>
      </div>
    </div>
  )
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
// Inline panel CSS, mirroring the sibling AE Opportunities Panel convention.
// The IACVT-bug workaround (re-declaring --panw-* component tokens inside
// .stage so they resolve to the semantic --ds-* layer rather than IACVT) is
// lifted verbatim from that file. Tracked for DS-level fix.
//
// NOTE: typography values are raw px — matches the sibling panel's precedent.
// When the type-token layer publishes display/body scales, migrate.

const PANEL_CSS = `
  .stage {
    /* Button — primary / ghost (only kinds used in Phase 0) */
    --panw-button-primary-bg:            var(--ds-brand-rest);
    --panw-button-primary-bg-hover:      var(--ds-brand-hover);
    --panw-button-primary-bg-active:     var(--ds-brand-pressed);
    --panw-button-primary-bg-disabled:   var(--ds-brand-disabled);
    --panw-button-primary-text:          var(--ds-text-inverse-rest);
    --panw-button-primary-text-disabled: var(--ds-text-inverse-disabled);
    --panw-button-ghost-bg-hover:        var(--ds-ghost-hover);
    --panw-button-ghost-bg-active:       var(--ds-ghost-pressed);
    --panw-button-ghost-text:            var(--ds-text-primary);
    --panw-button-ghost-text-disabled:   var(--ds-text-secondary-disabled);
    --panw-button-ghost-icon:            var(--ds-icons-secondary-rest);
    --panw-button-ghost-icon-hover:      var(--ds-icons-secondary-hover);
    --panw-button-ghost-icon-pressed:    var(--ds-icons-secondary-pressed);
    --panw-button-ghost-icon-disabled:   var(--ds-icons-disabled);
    --panw-button-ghost-brand-bg:           var(--ds-ghost-rest);
    --panw-button-ghost-brand-bg-hover:     var(--ds-ghost-highlight-hover);
    --panw-button-ghost-brand-bg-active:    var(--ds-ghost-highlight-pressed);
    --panw-button-ghost-brand-text:         var(--ds-text-brand-rest);
    --panw-button-ghost-brand-text-hover:   var(--ds-text-brand-hover);
    --panw-button-ghost-brand-text-pressed: var(--ds-text-brand-pressed);
    --panw-button-ghost-brand-text-disabled:var(--ds-text-brand-disabled);

    /* Button — secondary (Phase 4 — renewal form Cancel) */
    --panw-button-secondary-bg:             var(--ds-surface-rest);
    --panw-button-secondary-bg-hover:       var(--ds-surface-hover);
    --panw-button-secondary-bg-active:      var(--ds-surface-pressed);
    --panw-button-secondary-border:         var(--ds-lines-neutral-rest);
    --panw-button-secondary-border-hover:   var(--ds-lines-neutral-hover);
    --panw-button-secondary-border-pressed: var(--ds-lines-neutral-pressed);
    --panw-button-secondary-text:           var(--ds-text-primary);
    --panw-button-secondary-text-disabled:  var(--ds-text-secondary-disabled);
    --panw-button-secondary-border-disabled:var(--ds-lines-neutral-disabled);

    /* Dropdown (Phase 4 — renewal form Churn flow) */
    --panw-dropdown-bg:                var(--ds-field-rest);
    --panw-dropdown-bg-hover:          var(--ds-field-hover);
    --panw-dropdown-bg-pressed:        var(--ds-field-pressed);
    --panw-dropdown-bg-active:         var(--ds-field-selected);
    --panw-dropdown-bg-disabled:       var(--ds-field-disabled);
    --panw-dropdown-bg-alt:            var(--ds-field-alt-rest);
    --panw-dropdown-bg-alt-hover:      var(--ds-field-alt-hover);
    --panw-dropdown-bg-alt-pressed:    var(--ds-field-alt-pressed);
    --panw-dropdown-border:            var(--ds-lines-neutral-rest);
    --panw-dropdown-border-hover:      var(--ds-lines-neutral-hover);
    --panw-dropdown-border-focus:      var(--ds-lines-brand-rest);
    --panw-dropdown-border-error:      var(--ds-lines-danger-rest);
    --panw-dropdown-border-disabled:   var(--ds-lines-neutral-disabled);
    --panw-dropdown-title:             var(--ds-text-secondary-rest);
    --panw-dropdown-title-disabled:    var(--ds-text-secondary-disabled);
    --panw-dropdown-text:              var(--ds-text-primary);
    --panw-dropdown-text-disabled:     var(--ds-text-secondary-disabled);
    --panw-dropdown-placeholder:       var(--ds-text-placeholder-rest);
    --panw-dropdown-description:       var(--ds-text-tertiary-rest);
    --panw-dropdown-description-disabled: var(--ds-text-tertiary-disabled);
    --panw-dropdown-chevron:           var(--ds-icons-secondary-rest);
    --panw-dropdown-chevron-disabled:  var(--ds-icons-secondary-disabled);
    --panw-dropdown-icon:              var(--ds-icons-secondary-rest);
    --panw-dropdown-icon-hover:        var(--ds-icons-secondary-hover);
    --panw-dropdown-icon-disabled:     var(--ds-icons-disabled);
    --panw-dropdown-menu-bg:           var(--ds-surface-rest);
    --panw-dropdown-menu-item-hover:   var(--ds-ghost-hover);
    --panw-dropdown-menu-item-pressed: var(--ds-ghost-pressed);
    --panw-dropdown-menu-selected-bg:  var(--ds-highlight-rest);
    --panw-dropdown-menu-selected-fg:  var(--ds-text-brand-rest);
    --panw-dropdown-helper:            var(--ds-text-tertiary-rest);
    --panw-dropdown-helper-error:      var(--ds-text-danger-rest);
    --panw-dropdown-helper-success:    var(--ds-text-success);
    --panw-dropdown-helper-disabled:   var(--ds-text-tertiary-disabled);

    /* Text entry (Phase 4 — renewal form Notes) */
    --panw-te-bg:               var(--ds-field-rest);
    --panw-te-bg-hover:         var(--ds-field-hover);
    --panw-te-bg-pressed:       var(--ds-field-pressed);
    --panw-te-bg-active:        var(--ds-field-selected);
    --panw-te-bg-disabled:      var(--ds-field-disabled);
    --panw-te-bg-alt:           var(--ds-field-alt-rest);
    --panw-te-bg-alt-hover:     var(--ds-field-alt-hover);
    --panw-te-bg-alt-pressed:   var(--ds-field-alt-pressed);
    --panw-te-border:           var(--ds-lines-neutral-rest);
    --panw-te-border-focus:     var(--ds-lines-brand-rest);
    --panw-te-border-error:     var(--ds-lines-danger-rest);
    --panw-te-border-disabled:  var(--ds-lines-neutral-disabled);
    --panw-te-title:            var(--ds-text-secondary-rest);
    --panw-te-title-disabled:   var(--ds-text-secondary-disabled);
    --panw-te-text:             var(--ds-text-primary);
    --panw-te-text-disabled:    var(--ds-text-secondary-disabled);
    --panw-te-placeholder:      var(--ds-text-placeholder-rest);
    --panw-te-description:      var(--ds-text-tertiary-rest);
    --panw-te-description-disabled: var(--ds-text-tertiary-disabled);
    --panw-te-counter:          var(--ds-text-tertiary-rest);
    --panw-te-counter-disabled: var(--ds-text-tertiary-disabled);
    --panw-te-icon:             var(--ds-icons-secondary-rest);
    --panw-te-icon-hover:       var(--ds-icons-secondary-hover);
    --panw-te-icon-disabled:    var(--ds-icons-disabled);

    /* Link */
    --panw-link-blue-default:  var(--ds-text-link-rest);
    --panw-link-blue-hover:    var(--ds-text-link-hover);
    --panw-link-blue-pressed:  var(--ds-text-link-pressed);
    --panw-link-blue-disabled: var(--ds-text-link-disabled);

    /* Accordion */
    --panw-accordion-bg-gray00:            var(--ds-surface-rest);
    --panw-accordion-bg-gray10:            var(--ds-surface-alt-rest);
    --panw-accordion-bg-hover-gray00:      var(--ds-ghost-hover);
    --panw-accordion-bg-hover-gray10:      var(--ds-ghost-hover);
    --panw-accordion-bg-pressing-gray00:   var(--ds-ghost-pressed);
    --panw-accordion-bg-pressing-gray10:   var(--ds-ghost-pressed);
    --panw-accordion-icon-color:           var(--ds-icons-tertiary-rest);
    --panw-accordion-icon-color-hover:     var(--ds-icons-tertiary-hover);
    --panw-accordion-icon-color-pressed:   var(--ds-icons-tertiary-pressed);
    --panw-accordion-title-color:          var(--ds-text-primary);
    --panw-accordion-title-color-hover:    var(--ds-text-primary);
    --panw-accordion-title-color-pressed:  var(--ds-text-primary);
    --panw-accordion-description-color:    var(--ds-text-tertiary-rest);
    --panw-accordion-icon-disabled:        var(--ds-icons-disabled);
    --panw-accordion-title-disabled:       var(--ds-text-secondary-disabled);
    --panw-accordion-description-disabled: var(--ds-text-tertiary-disabled);
  }

  /* ── Page scaffold ───────────────────────────────────────────────────── */
  .acc-stage {
    background-color: var(--ds-surface-alt-rest);
    min-height: 100vh;
    overflow: hidden;
    font-family: var(--ds-type-font-family-sans);
  }

  /* ── Panel shell — Path-B local container ──────────────────────────────
     Right-anchored, fixed width, scrolls within. Width sits in the spec
     range (~336–400px); we hold the upper bound to honor the density target
     for Opportunities/4Q rows. Local box-shadow matches the sibling AE
     Opportunities Panel until a real Sheet/Drawer primitive exists. */
  .acc-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 348px;
    height: 100vh;
    background-color: var(--ds-surface-rest);
    /* Panel-shell elevation. --ds-shadow-flyout is the system's "panel
       floating above the page" token; the panel is exactly that. */
    box-shadow: var(--ds-shadow-flyout);
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-bottom: var(--ds-spacing-07);
    font-family: var(--ds-type-font-family-sans);
    overflow-y: auto;
    box-sizing: border-box;
  }
  .acc-panel > * { flex-shrink: 0; }

  /* ── Topbar (40px edge-to-edge) ────────────────────────────────────────
     Edge-to-edge strip at the top of the panel. Close sits in the top-
     left at exactly 4px / 4px offset (square 32px hit target — DS
     ghost-small button is a 32×32 square, so the icon optical center
     lands at 16,16 relative to the panel corner). Title is centered
     horizontally as a panel-meta label.

     The DS Button's small height (32px) is taller than the 40px
     strip can take cleanly with 4px insets — but the strip is 40px,
     the button is 32px, so the button still has 4px of breathing
     room top and bottom. */
  .acc-panel__topbar {
    position: relative;
    height: 48px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    /* Title left-aligned; spacing-05 (16px) of left padding so it sits
       on the same vertical rail as the section accordions' headers
       below. Close button is absolute-positioned to top-right and
       doesn't participate in this flex axis. */
    justify-content: flex-start;
    padding-left: var(--ds-spacing-05);
    background-color: var(--ds-surface-rest);
  }
  .acc-panel__close {
    position: absolute;
    /* (topbar 48 − button 32) / 2 = 8 — vertically centers the close
       button inside the topbar. */
    top: 8px;
    right: 8px;
    /* Square the small ghost button — DS small button defaults to a
       rectangle with horizontal padding. Override to a fixed 32×32. */
    width: 32px;
    min-width: 32px;
    height: 32px;
    padding: 0;
  }
  .acc-panel__title {
    /* heading-02 (16px / 1.5 / semibold) — panel-meta title weight. */
    font-size: 1rem;
    line-height: 1.5;
    font-weight: var(--ds-type-font-weight-semibold);
    color: var(--ds-text-primary);
    margin: 0;
  }

  /* ── Header (identity + LTV) ──────────────────────────────────────────
     Two blocks stacked: identity rows, LTV. spacing-04 (12px) outer gap
     between identity table and LTV — same gap the previous header used
     between its sub-blocks. spacing-05 (16px) horizontal padding aligns
     with the Accordion's chevron gutter so every block on the panel
     sits on one vertical rail. */
  .acc-panel__header {
    display: flex;
    flex-direction: column;
    /* spacing-03 (8px) between row + divider + row reads as a tight
       three-row plate; the divider itself is the visual separator,
       not the gap. */
    gap: var(--ds-spacing-03);
    padding:
      var(--ds-spacing-04)
      var(--ds-spacing-05)
      var(--ds-spacing-05);
  }

  /* ── Identity rows (Account / Apex Account / LTV) ──────────────────────
     Label-on-top, value-row below. All three rows share the SAME
     treatment per directive — LTV is no longer a hero metric; it sits
     as one row in the identity plate.

     Label: label-01 (12px / regular / 1.333 / 0.32 tracking),
            text.tertiary.
     Value-row: 32px-tall, items left-aligned. Value text is body-02
            (16px / regular / 1.5), text.secondary, width:fit-content
            so the ghost-brand button can sit 12px to its right rather
            than at the row's far edge. Button reveals on hover.

     Divider element renders between rows in JSX (not via :not(:last-child)
     borders) — lines as their own elements, per the project rule. */
  .acc-id-row {
    display: flex;
    flex-direction: column;
    gap: var(--ds-spacing-01);
  }
  .acc-id-row__label {
    /* label-01 token (12px / regular / 1.333 / 0.32 tracking). */
    font-size: 0.75rem;
    line-height: 1.33333;
    font-weight: var(--ds-type-font-weight-regular);
    letter-spacing: 0.32px;
    color: var(--ds-text-tertiary-rest);
  }
  .acc-id-row__value-row {
    display: flex;
    align-items: center;
    /* No space-between — the value text and its button hug each other
       at the row's left, with empty space trailing to the right. */
    justify-content: flex-start;
    gap: var(--ds-spacing-04);  /* spacing-04 = 12px between text + button */
    height: 32px;
  }
  /* Static value text: body-02 (16px / regular / 1.5), text.secondary.
     width:fit-content so the row gap calculation operates on the text's
     own width, not the row's full width — this is what makes the
     button sit exactly 12px to the right of the text. */
  .acc-id-row__value {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: var(--ds-type-font-weight-regular);
    color: var(--ds-text-secondary-rest);
  }
  /* Monetary value rows (LTV, ARR) carry semibold weight per directive
     so the dollar magnitudes read as headline values rather than the
     flat metadata-style treatment used for Account / Apex names. */
  .acc-id-row__value--bold {
    font-weight: var(--ds-type-font-weight-semibold);
    color: var(--ds-text-primary);
    width: fit-content;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
  }
  /* Ghost-brand open-in-new button — invisible at rest, fades in on
     hover of the row. Hidden via opacity (not display:none) so the
     row reserves its space and there's no layout shift on hover.
     LTV row has no button — the :hover rule is harmless there. */
  .acc-id-row__open-btn {
    width: 32px;
    min-width: 32px;
    height: 32px;
    padding: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
  }
  .acc-id-row:hover .acc-id-row__open-btn,
  .acc-id-row:focus-within .acc-id-row__open-btn {
    opacity: 1;
    pointer-events: auto;
  }

  /* Header divider — 1px hairline between identity rows. */
  .acc-header-divider {
    height: 1px;
    background-color: var(--ds-lines-neutral-tile-rest);
    flex-shrink: 0;
  }

  /* LTV is now an .acc-id-row — no separate CSS block. */

  /* ── Header → sections terminus ────────────────────────────────────────
     A full-bleed 1px divider closes the header before the section stack
     begins. Without it, the gap between LTV and the first accordion
     reads as accidental space; with it, the LTV has a clean visual end.
     Uses lines.neutral-tile (the family for static tile boundaries).
     spacing-03 (8px) above the line lets it breathe off the LTV so it
     reads as a section-stack opener rather than attaching to the LTV's
     footprint. */
  .acc-panel__header-divider {
    height: 1px;
    margin-top: var(--ds-spacing-03);
    background-color: var(--ds-lines-neutral-tile-rest);
    flex-shrink: 0;
  }

  /* ── Phase-0 stub body (still in use for sections not yet built) ───── */
  .acc-stub {
    padding: var(--ds-spacing-05) var(--ds-spacing-06);
    /* body-01 token (14px / regular / 1.42857). */
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: var(--ds-type-font-weight-regular);
    color: var(--ds-text-tertiary-rest);
  }

  /* ── Label/value data rows ────────────────────────────────────────────
     Hierarchy carried by tone + weight, sized from system tokens:
       label  → body-01 (14 / regular / 1.42857), text.secondary
       value  → heading-compact-01 (14 / semibold / 1.28572), text.primary
     Tabular numerals so the value column aligns by digit. Min-height of
     40px gives the row vertical room to breathe — the prior 32px was an
     invented density that crowded the row contents. */
  .acc-data-table {
    display: flex;
    flex-direction: column;
  }
  .acc-data-row {
    display: flex;
    align-items: center;
    min-height: 40px;
  }
  /* Dense variant — Install Base rows per directive (32px not 40px). */
  .acc-data-table--dense .acc-data-row {
    min-height: 32px;
  }
  .acc-data-row__label {
    flex: 1;
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: var(--ds-type-font-weight-regular);
    color: var(--ds-text-secondary-rest);
  }
  .acc-data-row__value {
    font-size: 0.875rem;
    line-height: 1.28572;
    font-weight: var(--ds-type-font-weight-semibold);
    color: var(--ds-text-primary);
    text-align: right;
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
  }
  /* Content-led quality signal — green when the underlying value is
     positive/healthy (e.g. Incremental ACV growth, healthy Margin). Color
     does the work; no tag, no icon. */
  .acc-data-row__value--success {
    color: var(--ds-text-success);
  }

  /* ── Standalone row divider — 1px hairline between rows ───────────────
     Always rendered as its own element, never as a border on a row. */
  .acc-divider {
    height: 1px;
    background-color: var(--ds-lines-neutral-tile-rest);
    flex-shrink: 0;
  }

  /* ── Section CTA — ghost-brand button at the foot of an accordion's
     open content. Default variant right-aligned (nested-opp footer).
     Full variant (per directive) stretches the button to the full width
     of the accordion's content area with the label centered — used for
     the four section-level deep links (Install Base, Sales Play,
     Opportunities, Account Health). */
  .acc-section-cta {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* spacing-03 (8px) above the ghost-brand CTA — separates it from
       the last row without making it feel detached. */
    padding-top: var(--ds-spacing-03);
  }
  .acc-section-cta--full {
    /* Stretch the inner flex item to fill the row. Stretch isn't a
       legal justify-content value, so we use align-items: stretch on
       the outer (single-column) flex axis and pin the button's own
       width to 100%. Belt + suspenders so the button reaches edge-to-
       edge of the accordion content area regardless of DS Button
       flex defaults. */
    justify-content: center;
    align-items: stretch;
  }
  .acc-section-cta--full .acc-cta-button {
    width: 100%;
    flex: 1 1 100%;
    justify-content: center;
  }
  /* Full-width CTA button: override the DS Button's default
     justify-content: flex-start so the label sits centered when the
     button stretches edge-to-edge. */
  .acc-cta-button {
    justify-content: center;
  }

  /* Level-1 and level-2 accordion drawers share the same content-inner
     padding: 0 top / 8 sides + bottom. Level-1 is scoped via
     .acc-section-stack > direct child; level-2 is scoped via the two
     nested lists (.acc-sp-family-list, .acc-opp-list). */
  .acc-section-stack > .panw--accordion > .panw--accordion__content-area > .panw--accordion__content-inner,
  .acc-sp-family-list > .panw--accordion > .panw--accordion__content-area > .panw--accordion__content-inner,
  .acc-opp-list > .panw--accordion > .panw--accordion__content-area > .panw--accordion__content-inner {
    padding: 0 16px 8px !important;
  }

  /* ── Data tile (Install Base body) ───────────────────────────────────
     Gray10 ground with a softer 12px radius — matches the panel-wide
     gray-container family (per-product tiles, status tile, nested
     sales-play family accordions). Internal padding handles the
     breathing room that was previously a horizontal section-inset. */
  .acc-data-tile {
    /* Inner tile lives on a gray10 section ground — flip to surface.rest
       (white) with the smaller --ds-radius-tight (4px) per directive. */
    background-color: var(--ds-surface-rest);
    border-radius: var(--ds-radius-tight);
    padding: var(--ds-spacing-03) var(--ds-spacing-04);
  }

  /* ── Account Health status tile ──────────────────────────────────────
     "Aggregated Health" inner tile — white ground on the gray10 section
     so it reads as a discrete inner block (matches the data-tile and
     per-product tile grammar). Heading label sits at the top edge of
     the tile, followed by the trend row and the two axis rows. */
  .acc-health-status-tile {
    background-color: var(--ds-surface-rest);
    border-radius: var(--ds-radius-tight);
    padding: var(--ds-spacing-03) var(--ds-spacing-04);
    display: flex;
    flex-direction: column;
    gap: var(--ds-spacing-03);
  }
  /* Heading sits in a 32px-tall band at the top of the Aggregated
     Health tile, matching the row rhythm used elsewhere in the panel.
     Flex centers the label vertically inside the band. */
  .acc-health-status-tile__heading {
    /* heading-compact-01 (14px / semibold / 1.28572), text.primary. */
    font-size: 0.875rem;
    line-height: 1.28572;
    font-weight: var(--ds-type-font-weight-semibold);
    color: var(--ds-text-primary);
    margin: 0;
    height: 32px;
    display: flex;
    align-items: center;
  }

  /* ── Trend bar row (HTML, not SVG) ───────────────────────────────────
     Bars hang from a 60px baseline; alignment-flex-end keeps the row
     bottom-anchored so tall bars rise up. Gap 4px between bars.
     Past-month bar: 8px wide, height set inline. Future-month dot:
     8×8 circle. Renewal dot: surface.inverse. All share the same
     CSS variable for surface.accent so they render identical color. */
  .acc-health-trend-row {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 60px;
    /* Don't let the parent flex shrink the row — future months should
       run past the visible edge and be clipped by acc-health-trend's
       overflow:hidden, not collapsed by flex shrinking. */
    flex-shrink: 0;
  }
  .acc-health-trend-bar {
    display: inline-block;
    width: 8px;
    /* Past-month bars carry the health-status color (see HEALTH_STATUS_VAR
       in TSX). Per-bar bg lands via inline style with the resolved
       --ds-status-* token, so each past month reads its own signal. */
    border-radius: var(--ds-radius-tight);
    flex-shrink: 0;
  }
  .acc-health-trend-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: var(--ds-surface-accent-rest);
    border-radius: var(--ds-radius-pill);
    flex-shrink: 0;
  }
  .acc-health-trend-dot--renewal {
    background-color: var(--ds-surface-inverse-rest);
  }

  /* ── Opportunities section header tag — bold label ──────────────────────
     Per directive: the section-rollup lime tag carries bold text. Scoped
     to the section-level accordion's header tag via the className hook
     so other lime chips on the panel (none today, but future-proof)
     don't pick it up. */
  .acc-opp-section > .panw--accordion__item .panw--tag__label {
    font-weight: var(--ds-type-font-weight-semibold);
  }

  /* ── Opportunity description: mixed-weight $value + remainder ───────────
     The DS Accordion's description slot accepts a ReactNode at runtime
     (we cast at the prop-call boundary to satisfy the string-only type).
     The amount renders semibold + text.primary; the surrounding text
     stays at the description default (regular + tertiary). */
  .acc-opp-desc {
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: var(--ds-type-font-weight-regular);
    color: var(--ds-text-tertiary-rest);
  }
  .acc-opp-desc__amount {
    font-weight: var(--ds-type-font-weight-semibold);
    color: var(--ds-text-primary);
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
  }

  /* ── Top-level section stack ──────────────────────────────────────────
     Four top-level sections are now inset 12px from the panel edges and
     sit as gray10 (surface.alt) tiles. 8px radius (--ds-radius-standard)
     on each, 4px gap between, no dividers (visual separation is the gap
     itself, not a line). The DS open-state lift (margin + tile-on-tile
     shadow) is suppressed — the gap-based rhythm carries elevation. */
  .acc-section-stack {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 var(--ds-spacing-04);
  }
  .acc-section-stack > .panw--accordion {
    border-radius: var(--ds-radius-standard);
    overflow: hidden;
  }
  .acc-section-stack > .panw--accordion.panw--accordion--open {
    margin: 0;
    box-shadow: none;
  }
  .acc-section-divider { display: none; }

  /* ── Sales Play family list ───────────────────────────────────────────
     Stack of DS sub-accordions at size="small", theme="gray10". 2px gap
     between siblings — no dividers (lines as dividers are reserved for
     table rows). The DS open-state lift (margin: 4px 0 + tile-on-tile
     shadow) layers on top of the gap when an accordion opens; that
     reads as additional elevation against the gap baseline.

     DS-cascade fix: the DS rule
       .panw--accordion--open .panw--accordion__content-area { max-height: 2000px }
     uses a descendant selector, not direct-child. When the Sales Play
     section (open) contains nested family accordions (some closed),
     the closed families inherit max-height: 2000px from the parent's
     --open state, so their content renders even when their own class
     says --closed. Local override below pins closed-family content-
     areas back to 0. Scoped to .acc-sp-family-list so we don't fight
     the DS rule outside this stack. */
  .acc-sp-family-list {
    display: flex;
    flex-direction: column;
    /* 4px gap between family tiles per directive. */
    gap: 4px;
  }
  /* Level-2 accordions (Sales Play families, Opportunity rows) use
     --ds-radius-tight (4px) — smaller inner-tile radius per directive,
     matches the data-tile / status-tile / per-product-tile family.

     DS-cascade fix: the DS SCSS authors
       .panw--accordion--theme-gray10 .panw--accordion__item { bg: gray10 }
     as a descendant selector, so a NESTED theme-gray00 accordion's __item
     still matches the gray10 ancestor rule. Both rules have equal
     specificity (2 classes); gray10 is authored later in the DS file, so
     it wins the cascade. Force the inner __item back to surface.rest with
     a higher-specificity selector scoped to our two nested lists. */
  .acc-sp-family-list > .panw--accordion,
  .acc-opp-list > .panw--accordion {
    border-radius: var(--ds-radius-tight);
    overflow: hidden;
  }
  /* DS only emits panw--accordion--theme-gray10 for non-default themes —
     theme="gray00" emits no class, so the parent gray10 descendant rule
     wins for nested items. Force nested items back to surface.rest with a
     selector specific to our two nested lists (no theme-class gate). */
  .acc-sp-family-list > .panw--accordion > .panw--accordion__item,
  .acc-opp-list > .panw--accordion > .panw--accordion__item {
    background-color: var(--ds-surface-rest) !important;
  }
  /* Hover/pressed use the accordion package's canonical tokens
     (--ds-ghost-hover / --ds-ghost-pressed = alpha overlays), not the
     solid --ds-surface-hover/pressed. Matches @design-system/packages/
     accordion behavior 1:1. */
  .acc-sp-family-list > .panw--accordion > .panw--accordion__item:hover,
  .acc-opp-list > .panw--accordion > .panw--accordion__item:hover {
    background-color: var(--ds-ghost-hover) !important;
  }
  .acc-sp-family-list > .panw--accordion > .panw--accordion__item:active,
  .acc-opp-list > .panw--accordion > .panw--accordion__item:active {
    background-color: var(--ds-ghost-pressed) !important;
  }
  .acc-sp-family-list .panw--accordion--closed .panw--accordion__content-area {
    max-height: 0;
  }
  /* Companion DS-cascade fix: the chevron rotation rule
       .panw--accordion--open .panw--accordion__expansion-icon { transform: rotate(180deg) }
     is a descendant selector too, so nested family chevrons inherit the
     parent section's open-state rotation. Pin closed-family chevrons
     back to the rest transform. Scoped to .acc-sp-family-list. */
  .acc-sp-family-list .panw--accordion--closed .panw--accordion__expansion-icon {
    transform: none;
  }

  /* ── Section / family title with embedded rollup tag ──────────────────
     The DS Accordion's title-row places its children inside a flex
     container; the title span carries flex:1. By rendering a JSX node
     as the title prop, we get a child that needs to span that full
     width and internally split into "text on left, tag on right".
     This class does both. White-space:nowrap on the parent forces the
     text to ellipsize before the tag, never the other way around.
     Note: avoid backticks anywhere inside this template literal — they
     terminate the JS template and break the file parse. */
  .acc-sp-tag-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: var(--ds-spacing-03);
    min-width: 0;
  }
  .acc-sp-tag-title__text {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Invisible section-scroll anchor ────────────────────────────────────
     Zero-height element preceding each top-level accordion so that the
     auto-scroll on mount lands the section header at the panel's top
     edge rather than scrolling past it. scroll-margin-top adds a small
     visual gap so the accordion header doesn't hard-kiss the topbar. */
  .acc-section-anchor {
    height: 0;
    overflow: hidden;
    pointer-events: none;
    scroll-margin-top: 4px;
  }

  /* ── Per-play leaf row ────────────────────────────────────────────────
     Mirrors the acc-pop__rows hover pattern from account-table exactly:
       - List has negative horizontal margin that pulls it 8px wider on
         each side of the drawer's 16px padding, so row backgrounds can
         extend to 8px from the accordion edge.
       - List ::before / ::after are the top / bottom hairlines.
       - Inter-row hairlines are ::before pseudo-elements on non-first
         rows (position: absolute, top: -1px).
       - On hover: row background lifts to ghost.field-hover; the row's
         own top hairline and the next row's top hairline fade to
         transparent; first-row hover hides the list ::before; last-row
         hover hides the list ::after.
     Standalone <div class="acc-divider"> elements are NOT rendered
     inside this list — they are replaced by the ::before approach. */
  .acc-sp-play-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    /* Pull rows 8px out on each side — the row padding re-imposes the
       text at the same column the rest of the drawer uses. */
    margin: 0 calc(-1 * var(--ds-spacing-03));
    padding: 0;
  }
  /* List top hairline — inset 8px each side to align with text rail. */
  .acc-sp-play-list::before {
    content: '';
    display: block;
    height: 1px;
    margin: 0 var(--ds-spacing-03);
    background-color: var(--ds-lines-neutral-tile-rest);
    transition: background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
  }
  /* List bottom hairline. */
  .acc-sp-play-list::after {
    content: '';
    display: block;
    height: 1px;
    margin: 0 var(--ds-spacing-03);
    background-color: var(--ds-lines-neutral-tile-rest);
    transition: background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
  }
  .acc-sp-play-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--ds-spacing-03);
    min-height: 40px;
    /* 8px L/R padding re-imposes the text column after the negative margin. */
    padding: 0 var(--ds-spacing-03);
    background-color: transparent;
    border-radius: var(--ds-radius-tight);
    transition: background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
    cursor: pointer;
  }
  /* Inter-row hairlines as ::before pseudo on non-first rows.
     Positioned absolute at top: -1px so they sit between rows. */
  .acc-sp-play-list > .acc-sp-play-row + .acc-sp-play-row::before {
    content: '';
    position: absolute;
    top: -1px;
    left: var(--ds-spacing-03);
    right: var(--ds-spacing-03);
    height: 1px;
    background-color: var(--ds-lines-neutral-tile-rest);
    transition: background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
  }
  /* Row hover / pressed — ghost.field tokens (alpha overlay, not solid). */
  .acc-sp-play-row:hover {
    background-color: var(--ds-ghost-field-hover);
  }
  .acc-sp-play-row:active {
    background-color: var(--ds-ghost-field-pressed);
  }
  /* Hide hovered row's own top hairline and the next row's top hairline
     so the hover pill reads as a single uninterrupted rounded shape. */
  .acc-sp-play-list > .acc-sp-play-row:hover::before,
  .acc-sp-play-list > .acc-sp-play-row:hover + .acc-sp-play-row::before {
    background-color: transparent;
  }
  /* Hide list's top hairline when the first row is hovered. */
  .acc-sp-play-list:has(> .acc-sp-play-row:first-child:hover)::before {
    background-color: transparent;
  }
  /* Hide list's bottom hairline when the last row is hovered. */
  .acc-sp-play-list:has(> .acc-sp-play-row:last-child:hover)::after {
    background-color: transparent;
  }
  .acc-sp-play-row__name {
    flex: 1;
    min-width: 0;
    /* body-01 token (14 / regular / 1.42857). */
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: var(--ds-type-font-weight-regular);
    color: var(--ds-text-secondary-rest);
  }

  /* ── Value tag wrapper — neutral chip housing a leading status icon
     and a $value label. Used at family-rollup and leaf tiers. */
  .acc-sp-tag-wrap {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }

  /* Static tag — lock the rest tokens so hover doesn't pick up.
     Mirrors opp-table's .opp-tag--static. */
  .panw--tag.acc-tag--static { cursor: default; }
  .panw--tag.acc-tag--static:hover { background-color: var(--ds-tag-neutral-low-bg); }
  /* Tabular numerals on the $value label so digits column-align. */
  .panw--tag.acc-sp-tag .panw--tag__label {
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
  }

  /* ── Sales-play tag — per-status leading-icon color override.
     The named DS sales-play icons (NotTouched, Pitched, ClosedWon)
     ship with authored fills; CSS fill is a presentation property that
     overrides the SVG attribute. Scope rules to .acc-sp-tag only. The
     specificity chain (.panw--tag.panw--tag--low.panw--tag--neutral)
     matches the DS-shipped rule at (0,4,0), so each override needs
     (0,5,0) to win — lifted verbatim from account-table. */
  /* Scope fill:currentColor to ONLY the statuses we recolor — leaves
     closed-won with its DS-authored fill (no need for a hand-rolled
     teal hex override). The selector chain on each rule sets the
     color the icon will paint with via currentColor. */
  .acc-sp-tag--not-touched .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg,
  .acc-sp-tag--not-touched .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg path,
  .acc-sp-tag--pursuing    .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg,
  .acc-sp-tag--pursuing    .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg path,
  .acc-sp-tag--pitched     .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg,
  .acc-sp-tag--pitched     .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg path,
  .acc-sp-tag--deferred    .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg,
  .acc-sp-tag--deferred    .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg path,
  .acc-sp-tag--declined    .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg,
  .acc-sp-tag--declined    .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg path,
  .acc-sp-tag--closed-lost .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg,
  .acc-sp-tag--closed-lost .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon svg path {
    fill: currentColor;
  }
  .acc-sp-tag--not-touched .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon { color: var(--ds-icons-status-danger); }
  .acc-sp-tag--pursuing    .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon { color: var(--ds-icons-success); }
  .acc-sp-tag--pitched     .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon,
  .acc-sp-tag--deferred    .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon,
  .acc-sp-tag--declined    .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon,
  .acc-sp-tag--closed-lost .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon { color: var(--ds-icons-secondary-rest); }

  /* ── Opportunities in Next 4Q (Phase 3) ──────────────────────────────────
     Per-opportunity nested-accordion stack. Same grammar as the Sales-Play
     family list: gap: 2px between siblings (DS open-state lift layers on
     top of the gap as additional elevation), no dividers between rows —
     dividers are reserved for table rows within an accordion. Inherits the
     same DS-cascade workarounds applied to .acc-sp-family-list so closed
     nested opportunities don't pick up the parent section's --open state
     for content-area max-height and chevron rotation. */
  .acc-opp-list {
    display: flex;
    flex-direction: column;
    /* 4px gap between opp tiles per directive. */
    gap: 4px;
  }
  .acc-opp-list .panw--accordion--closed .panw--accordion__content-area {
    max-height: 0;
  }
  .acc-opp-list .panw--accordion--closed .panw--accordion__expansion-icon {
    transform: none;
  }

  /* ── Opportunity expanded snapshot ───────────────────────────────────────
     A vertical stack of label/value rows. Each row is 40px min-height so
     the tag has the same breathing room as the install-base data rows
     and the sales-play leaf rows — every row in the panel sits on the
     same vertical rhythm.

     No dividers between rows: per project rule, lines as dividers are
     reserved for table rows within an accordion. The snapshot is a
     label/value record (field list), not a table. Hierarchy reads
     through tone + weight, not lines. */
  .acc-opp-snapshot {
    display: flex;
    flex-direction: column;
  }
  .acc-opp-row {
    display: flex;
    align-items: center;
    gap: var(--ds-spacing-03);
    min-height: 40px;
  }
  .acc-opp-row__label {
    flex: 1;
    min-width: 0;
    /* body-01 token (14 / regular / 1.42857). text.secondary for field
       labels — same rule as the Install Base / identity rows. */
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: var(--ds-type-font-weight-regular);
    color: var(--ds-text-secondary-rest);
  }
  .acc-opp-row__value {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }
  /* ARR-style plain-value row that lives inside the snapshot — reuses
     .acc-data-row primitive but trims the 40px gap below to match the
     tag rows around it (the standalone data-table sets its own rhythm). */
  .acc-opp-row--plain {
    min-height: 40px;
  }

  /* ── Products tag — custom inline chip with stacked brand icons ─────────
     Uses the DS Tags class chain so the chip ground / radius / padding
     match the surrounding rounded-large neutral chips, but the *content*
     is our own: one glyph per unique brand on the opportunity, no label.
     Brand icons carry authored fills, so no color override here. */
  .panw--tag.acc-opp-products-tag {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-spacing-02);
    cursor: default;
  }
  .acc-opp-products-tag__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
  .acc-opp-products-tag__icon svg {
    width: 16px;
    height: 16px;
  }

  /* ── Renewal Outcome trigger surface ─────────────────────────────────────
     Uses the real DS <Tags /> component (no hand-rolled class chain) so
     the chip inherits the canonical rounded radius + icon-color tokens
     from the tag's color family. The trailing chevron sits as a sibling
     inside a wrap span so the tag's own surface is unmodified —
     positions to the right of the chip with a 4px gap. */
  .acc-opp-outcome-tag-wrap {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-spacing-02);
  }
  .acc-opp-outcome-tag-wrap__chevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--ds-icons-secondary-rest);
  }
  .acc-opp-outcome-tag-wrap__chevron svg {
    width: 14px;
    height: 14px;
  }

  /* ── Tabular numerals on every opportunity tag label ─────────────────────
     Days counts, $ values, date strings, count badges — all carry numerals
     that should column-align by digit across the stack. Scoped to chips
     inside an .acc-opp-snapshot to avoid leaking onto the sales-play
     tags above (which already pin tabular-nums in their own rule). */
  .acc-opp-snapshot .panw--tag .panw--tag__label {
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
  }

  /* ── Nested section CTA — Open in SFDC at the footer of an expanded
     opportunity. Slightly tighter top-pad than the section-level CTA so
     the button doesn't feel like it's floating off the last row. */
  .acc-section-cta--nested {
    padding-top: var(--ds-spacing-04);
  }

  /* ── Renewal Outcome trigger (Phase 4) ───────────────────────────────────
     Resets the button to a chip-shaped click target so the underlying tag
     paints its own surface. The chip's own focus ring is invisible inside
     a button, so the trigger receives a focus-visible ring scoped to its
     full rounded outline. */
  .acc-opp-outcome-trigger {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    /* Match the wrapped Tags(shape=rounded, size=large) radius (4px =
       --ds-radius-tight) so the focus outline traces the chip outline. */
    border-radius: var(--ds-radius-tight);
  }
  .acc-opp-outcome-trigger:focus-visible {
    outline: 2px solid var(--ds-lines-brand-rest);
    outline-offset: 2px;
  }
  .acc-opp-outcome-trigger .panw--tag { cursor: pointer; }

  /* ── Renewal form (Phase 4) ──────────────────────────────────────────────
     Inline editor revealed beneath the Renewal Outcome row when the draft
     disposition is anything other than Unknown. Field stack uses spacing-05
     (16px) between Dropdown / TextEntry blocks — the DS form fields each
     carry their own title + helper space, so a tighter gap reads as cramped
     against the existing internal padding. Action row uses spacing-02 (4px)
     between buttons (DS small-button convention).

     padding-top breaks the form off the row above so the chevron-tag at the
     row's right edge doesn't appear to belong to the first form field. */
  .acc-renewal-form {
    display: flex;
    flex-direction: column;
    gap: var(--ds-spacing-05);
    padding-top: var(--ds-spacing-04);
  }
  .acc-renewal-form .panw--dropdown,
  .acc-renewal-form .panw--text-entry { width: 100%; }
  .acc-renewal-form__actions {
    display: flex;
    gap: var(--ds-spacing-02);
    justify-content: flex-end;
  }

  /* ── Account Health (Phase 5) ────────────────────────────────────────────
     Section body is a vertical stack: sparkline → sub-axis rows → per-
     product breakdown. Gaps grow as the content tier grows in scope —
     spacing-04 (12px) between sparkline and the axis-row block, spacing-05
     (16px) between the axis-row block and the per-product breakdown — so
     the eye reads the section as three distinct tiers rather than a flat
     stack. */
  .acc-health-body {
    display: flex;
    flex-direction: column;
    /* 4px between status tile and per-product list per directive —
       all gray containers in this section sit 4px apart. */
    gap: 4px;
  }

  /* Trend row sits flush inside the (now white) Aggregated Health tile —
     no inner background or padding. overflow:hidden clips any future-
     month dots that exceed the tile's content width. */
  .acc-health-trend {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    padding-left: 6px;
    padding-right: 6px;
  }

  /* ── Sub-axis rows ───────────────────────────────────────────────────────
     40px min-height matches the Install Base and opp-snapshot data rows
     so the entire panel sits on one row rhythm. Label is body-01 secondary;
     tag is the value carrier (color = status semantic). */
  .acc-health-axes {
    display: flex;
    flex-direction: column;
  }
  .acc-health-axis-row {
    display: flex;
    align-items: center;
    gap: var(--ds-spacing-03);
    min-height: 40px;
  }
  .acc-health-axis-row__label {
    flex: 1;
    min-width: 0;
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: var(--ds-type-font-weight-regular);
    color: var(--ds-text-secondary-rest);
  }

  /* ── Per-product breakdown ───────────────────────────────────────────────
     Flat list of per-product blocks. spacing-05 between blocks visually
     separates each product as its own unit. No dividers between blocks
     (lines as dividers are reserved for table rows within an accordion;
     these are not table rows — they're stacked label/value records).

     Per-block:
       Heading row: brand icon (16) + product name + ARR (right-aligned)
       Axis rows: indented under the heading via padding-left so the parent-
       child reading is preserved without adding an explicit tree glyph. */
  /* Per-product list: each product is its own gray10-grounded tile
     separated by a 2px gap from siblings (parallel to the Sales Play
     family list rhythm). The tile shape is what makes each product
     read as a discrete unit; the gap is the divider stand-in (no
     hairline lines — these aren't table rows). */
  .acc-product-health-list {
    display: flex;
    flex-direction: column;
    /* 4px gap between product tiles per directive. */
    gap: 4px;
  }
  .acc-product-health {
    display: flex;
    flex-direction: column;
    /* Inner tile on a gray10 section → flip to surface.rest (white). */
    background-color: var(--ds-surface-rest);
    border-radius: var(--ds-radius-tight);
    padding: var(--ds-spacing-03) var(--ds-spacing-04);
  }
  .acc-product-health__head {
    display: flex;
    align-items: center;
    gap: var(--ds-spacing-03);
    min-height: 32px;
  }
  .acc-product-health__brand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
  .acc-product-health__brand svg {
    width: 16px;
    height: 16px;
  }
  /* Product name carries the unit's headline weight — semibold + primary
     tone, matching the Install Base row values (heading-compact-01). */
  .acc-product-health__name {
    flex: 1;
    min-width: 0;
    font-size: 0.875rem;
    line-height: 1.28572;
    font-weight: var(--ds-type-font-weight-semibold);
    color: var(--ds-text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* ARR cell — bold + primary tone per directive. The product name
     and ARR now share visual weight: name (left) + ARR (right) both
     semibold + primary, so the heading row reads as "product N
     contributes $X ARR" rather than "product N (with $X as small
     metadata)." */
  .acc-product-health__arr {
    font-size: 0.875rem;
    line-height: 1.28572;
    font-weight: var(--ds-type-font-weight-semibold);
    color: var(--ds-text-primary);
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
  }
  /* Axis rows inside a product tile — the tile shape itself establishes
     the parent-of-product reading, so the axes don't need an additional
     indent. Flat to the tile's content edge keeps the label column
     wide enough to fit "Deployment and Adoption Health" without wrap
     at panel width. */
  .acc-product-health__axes {
    padding-left: 0;
  }

  /* ── Stage / Forecast tag-with-days composition ─────────────────────────
     The categorical chip (Stage name, Forecast label) sits to the left
     and the duration ("14 days") rides next to it as plain text — same
     row, supporting the chip. The duration is NOT inside the chip so
     the chip stays focused on the categorical value (which is what
     drives color in Forecast's case). */
  .acc-opp-tag-with-days {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-spacing-03);
  }
  .acc-opp-tag-with-days__suffix {
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: var(--ds-type-font-weight-regular);
    color: var(--ds-text-secondary-rest);
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
  }

  /* ARR-style plain value inside the snapshot — keeps the row right-
     aligned and weight-matched to the tag rows around it. */
  .acc-opp-row__plain-value {
    font-size: 0.875rem;
    line-height: 1.28572;
    font-weight: var(--ds-type-font-weight-semibold);
    color: var(--ds-text-primary);
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
  }

  /* ── Hover popover portal ───────────────────────────────────────────────
     Portaled to document.body so the popover escapes the panel's
     overflow:hidden clipping. Its position is set inline by JS after
     a layout pass; the CSS only handles z-index, surface, and the
     elevated shadow. */
  .acc-hover-trigger {
    display: inline-flex;
    align-items: center;
  }
  .acc-hover-portal {
    position: fixed;
    z-index: 1000;
    /* No background here — popover bodies (.acc-popover.*) own their
       own surface so the portal can host either a DS Tooltip (with
       its own background) or our action / list panel. */
  }

  /* ── Popover bodies ─────────────────────────────────────────────────────
     DS Popover canonical: surface.rest ground, --ds-radius-standard,
     --ds-shadow-flyout, plus a 1px neutral-tile border (matches the
     tooltip-style boundary the directive calls for). max-width caps
     the popover at panel-friendly width; min-width is unset so the
     popover sizes to its content — no forced whitespace around small
     contents like a single action button. */
  .acc-popover {
    background-color: var(--ds-surface-rest);
    border-radius: var(--ds-radius-standard);
    box-shadow: var(--ds-shadow-flyout);
    border: 1px solid var(--ds-lines-neutral-tile-rest);
    max-width: 320px;
    box-sizing: border-box;
  }
  .acc-popover--button {
    padding: var(--ds-spacing-03);
  }
  .acc-popover--button .panw--button {
    justify-content: center;
  }
  .acc-popover--list {
    padding: var(--ds-spacing-04);
    display: flex;
    flex-direction: column;
    gap: var(--ds-spacing-03);
  }
  .acc-popover__title {
    font-size: 0.875rem;
    line-height: 1.28572;
    font-weight: var(--ds-type-font-weight-semibold);
    color: var(--ds-text-primary);
  }
  .acc-popover__rows {
    display: flex;
    flex-direction: column;
  }
  .acc-popover__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--ds-spacing-04);
    min-height: 28px;
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: var(--ds-type-font-weight-regular);
  }
  .acc-popover__row + .acc-popover__row {
    border-top: 1px solid var(--ds-lines-neutral-tile-rest);
  }
  .acc-popover__row-label {
    color: var(--ds-text-secondary-rest);
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .acc-popover__row-value {
    color: var(--ds-text-primary);
    font-weight: var(--ds-type-font-weight-semibold);
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }
`

export const Default: StoryObj = {
  render: () => <AccountPanel accountId="acc-cyberdyne" />,
}

// Scenario click-through stories for canonical data verification
export const Scenario1StripeXSOARLandmine: StoryObj = {
  render: () => <AccountPanel accountId="acc-stripe-treasury" />,
}

export const Scenario4LyftHealthyRenewal: StoryObj = {
  render: () => <AccountPanel accountId="acc-lyft-rideshare" />,
}

export const Scenario20CoinbaseCortexPursuit: StoryObj = {
  render: () => <AccountPanel accountId="acc-coinbase-exchange" />,
}
