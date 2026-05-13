/**
 * AE Opportunity Table — sales pipeline composition
 *
 * ── Pass 3 scope (additive on top of Pass 2) ────────────────────────────────
 *   • Per-cell hover surfaces (Column 3):
 *       Last Activity → DS Tooltip (activity description + day label).
 *       Account Health → custom popover with 12-month SVG sparkline, sub-
 *         axis tags (Technical / Adoption & Deployment), and a ghost-brand
 *         "View Account Health" CTA. Interactive (hover-into permitted).
 *       Risk Factors → custom popover listing every applied risk with
 *         emoji + label (per spec §3.11).
 *       Sales Play → DS Tooltip with current status label.
 *   • Per-tag hover surfaces (Column 4):
 *       Product tag → custom popover with brand icon + name + per-product
 *         value as a share of total.
 *       +N tag → custom popover listing every overflowed product in the
 *         same format.
 *   • All hover surfaces share a 700ms open delay so a cursor moving
 *     across the table doesn't bombard the AE with cascading popovers.
 *     Interactive popovers (Account Health) carry a 160ms close grace
 *     period so the user can move their cursor into the popover to click
 *     the CTA. Non-interactive surfaces close immediately on mouseleave.
 *   • All hover surfaces are portaled to document.body so they aren't
 *     clipped by the table-shell's overflow-x:auto.
 *   • Open surfaces auto-close on scroll/resize (positions are sticky
 *     to the trigger and would drift otherwise).
 *
 * ── Pass 2 scope (additive on top of Pass 1) ────────────────────────────────
 *   • Last Activity severity bands: 0–7d neutral, 7–21d caution + caution
 *     icon, >21d error + error icon. Glyphs: ExclamationTriangle (caution),
 *     ExclamationCircle (error).
 *   • Account Health gets categorical color: healthy → green, at-risk →
 *     yellow, critical → red (low contrast pills).
 *   • Column 4 product tags carry a brand icon (BrandStrata / BrandPrisma /
 *     BrandCortex / BrandPanw). Brand icons carry authored fills and ignore
 *     the tag's color.
 *   • Column 4 has space-driven +N overflow — a hidden measurement layer
 *     measures natural tag widths against the container, and only the tags
 *     that fit are rendered visibly; the rest collapse into a +N tag.
 *     Re-flows on container resize via ResizeObserver.
 *
 * ── Pass 1 scope (this file): structure & data only ─────────────────────────
 *   • Data model regenerated to carry brand-per-product, sub-health axes,
 *     activity description, risk factors as discrete records, sales play,
 *     and renewal payload.
 *   • Defaults aligned with spec §5: Close Date asc sort; Close Date filter =
 *     This Quarter + Q4FY26; Account Health = At Risk + Critical.
 *   • Sort vocabulary reduced to the 5 spec axes (account name, opp name,
 *     close date, value, risk factor count).
 *   • Forecast, Stage, Opp Type, Last Activity are now single-select.
 *   • Stage uses canonical names (Discovery / Solutioning / Tech Validation /
 *     Active POV / Negotiation) — not "stage 1" etc.
 *   • Last Activity moved from Column 2 ("deal state") into Column 3
 *     ("activity & blockers"). Sales Play added to Column 3.
 *   • Risk Factors filter rebuilt around the 9 named risks (emoji-labeled).
 *   • Deal Size filter removed (not in spec).
 *   • v1 "tags" filter removed — its eventual job is density control,
 *     which is a different shape (Pass 5).
 *   • Column 1 quieted (opp name → secondary bold; account → tertiary).
 *   • Column 5 value emphasis dropped (no longer 18px semibold).
 *   • Column 6 buttons promoted to ghost-brand; Eye → ChevronRight (expand).
 *
 * ── Pass 4 scope (this file): Type-tag interactivity ───────────────────────
 *   • Upsell type tag → 1-second hover delay → tooltip-with-Modify
 *     (heading + sub + single ghost-brand action button). Interactive
 *     panel; closes on mouseleave with 160ms grace.
 *   • Renewal type tag → 700ms hover delay → popover with subscription
 *     end / Renewable TCV / ARR rows and the Renewal Outcome editor.
 *     Persistent panel — closes only on outside click or Confirm/Cancel.
 *   • Renewal Outcome editor: tag-as-button trigger opens a DS Flyout
 *     listing the 6 outcomes. Picking a non-Unknown value expands a
 *     Notes form below; Churn additionally surfaces structured Reason
 *     and Competitor dropdowns. Cancel reverts, Confirm commits to the
 *     row's outcome state (lifted into AEOpportunityTable so changes
 *     persist across hovers).
 *   • HoverShell extended: optional `openDelayMs` (Upsell uses 1000) and
 *     `persist` (Renewal — opens on hover, stays open until outside
 *     click, immune to scroll-close).
 *
 * ── Pass 5 scope (this file): density + grouped health ────────────────────
 *   • Tag-density filter (spec §3.4) — multi-select control that turns
 *     individual row tags on/off (Quote Number, Opportunity Type, Stage,
 *     Forecast, Close Date, Last Activity, Account Health, Risk Factors,
 *     Sales Play, Products). All on by default. Visually distinct from
 *     the data-filter row: sits on its own micro-row above the data
 *     filters, prefixed with a "display" label + Sliders icon, separated
 *     from the data filters by a hairline divider. Commits immediately
 *     on each toggle (no Apply step) — density is reversible and the AE
 *     wants instant feedback.
 *   • Grouped Account Health filter (spec §3.10) — three sections inside
 *     a single Flyout: Overall Health, Technical Health, Adoption &
 *     Deployment Health. Each section carries three checkboxes (Healthy
 *     / At Risk / Critical). Defaults match spec: Overall = At Risk +
 *     Critical (Healthy off); Technical and Adoption = all on. Apply /
 *     Cancel actions follow the DS Filter convention (the multi-select
 *     pattern the other data filters already use).
 *
 * ── Deferred to later passes ─────────────────────────────────────────────
 *   • Real filtering wiring for tag-density to ARR/deal totals copy
 *     ("47 deals · $12.4M ARR") — currently a static label. The density
 *     filter changes the row display, but the data-filter wiring still
 *     renders the full row set (deferred from Pass 1).
 *
 * ── Conventions ─────────────────────────────────────────────────────────
 * Tag presets: shape="rounded", size="large" (= 4px chip-tier radius),
 *              color="neutral", contrast="low".
 *
 * Row interaction matches @ds/cells-standard:
 *   rest      — alternate surface.rest / surface.alt.rest (zebra)
 *   hover     — ghost.hover (alpha-tint, composites over rest fill)
 *   pressed   — ghost.pressed
 *
 * Shell: no border, no background — composition lives inside a parent card.
 *
 * IACVT workaround for flyout tokens at the bottom of LAYOUT_CSS.
 *
 * ── System gaps surfaced (not patched in composition) ──────────────────
 *   • No tree variant of Filter — product filter built from primitives.
 *   • No single-select variant of Filter — SingleSelectFilter built from
 *     primitives in this file.
 *   • Pagination/Dropdown has no placement="top" prop — CSS workaround.
 *   • No Toolbar primitive for the search/filter rows.
 *   • No measure-and-truncate-with-+N primitive — built locally as
 *     ProductCluster with a hidden measurement layer + ResizeObserver.
 *   • BrandUnit42 is committed under design-system/packages/icons but is
 *     not yet exported from @ds/icons (index.ts ownership lives in the
 *     icons-package lane). Unit 42 products render without a brand icon
 *     for now — fallback handled in BRAND_ICON map below.
 */

import type { Meta, StoryObj } from '@storybook/react'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Calendar, Clock, Stars, ChevronDown, ChevronUp, ChevronRight, Folder,
  ExclamationTriangle, ExclamationCircle,
  BrandStrata, BrandPrisma, BrandCortex,
  Close,
} from '@ds/icons'
import { Search } from '@ds/search'
import { Filter, type FilterOption } from '@ds/filter'
import { Header } from '@ds/header'
import { CellContents } from '@ds/cell-contents'
import { Pagination } from '@ds/pagination'
import { Button, IconButton } from '@ds/button'
import { Tags, type TagColor } from '@ds/tags'
import { Tooltip } from '@ds/tooltip'
import { Checkbox } from '@ds/checkbox'
import { Dropdown } from '@ds/dropdown'
import { TextEntry } from '@ds/text-entry'
import {
  Flyout,
  FlyoutFilter,
  FlyoutList,
  FlyoutItem,
  FlyoutGroup,
  FlyoutSelectAll,
  FlyoutFooter,
} from '@ds/flyout'

// ─── Types ───────────────────────────────────────────────────────────────────

type DealStage =
  | 'discovery' | 'solutioning' | 'tech-validation' | 'active-pov' | 'negotiation'
type Forecast = 'pipeline' | 'best-case' | 'commit'
type OppType = 'net-new' | 'upsell' | 'renewal'
type Health = 'healthy' | 'at-risk' | 'critical'
type Brand = 'strata' | 'prisma' | 'cortex' | 'unit-42'
type LastActivityBucket = 'lt-7' | '7-21' | 'gt-21'

type RiskId =
  | 'exec' | 'design' | 'tech-win' | 'partner' | 'mandatory-ps'
  | 'quote-approval' | 'budget' | 'term-length' | 'no-activity'

type SalesPlayStatus =
  | 'not-touched' | 'pitched' | 'deferred' | 'declined'
  | 'pursuing' | 'closed-won' | 'closed-lost'

type RenewalOutcome =
  | 'unknown' | 'full' | 'upsell' | 'downsell' | 'churn' | 'displacement' | 'duplicate'

interface Product { name: string; brand: Brand; valueUsd: number }
interface RiskFactor { id: RiskId; emoji: string; label: string }
interface AccountHealth {
  overall: Health
  technical: Health
  adoption: Health
  // 12 monthly readings, oldest → newest. 0=healthy, 1=at-risk, 2=critical.
  trend12mo: number[]
}
interface Activity { daysAgo: number; description: string }
interface SalesPlay { name: string; status: SalesPlayStatus }
interface RenewalData {
  subEnd: string
  renewableTcvUsd: number
  arrUsd: number
  outcome: RenewalOutcome
}

export interface OpportunityRow {
  id: string
  oppName: string
  account: string
  type: OppType
  forecast: Forecast
  stage: DealStage
  closeDate: string // "mar 7" — short display form
  quoteId: string
  products: Product[]
  valueUsd: number
  activity: Activity
  health: AccountHealth
  risks: RiskFactor[]
  salesPlay: SalesPlay
  renewal?: RenewalData
}

/**
 * Plumbing props. Defaults preserve the current Storybook surface
 * verbatim — `summaryLabel` and `totalItems` are literal strings/numbers
 * (`"47 deals · $12.4M"` / `47`), not derived from `rows`, because the
 * 8-row fixture is a slice of an implied 47-deal set. When a consumer
 * wires real data, they compute both and pass them in.
 */
export interface OpportunityTableProps {
  rows?: OpportunityRow[]
  totalItems?: number
  summaryLabel?: string
}

type SortKey = 'accountName' | 'oppName' | 'closeDate' | 'value' | 'riskCount'
type SortDir = 'asc' | 'desc'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'accountName', label: 'account name' },
  { key: 'oppName',     label: 'opportunity name' },
  { key: 'closeDate',   label: 'close date' },
  { key: 'value',       label: 'value' },
  { key: 'riskCount',   label: 'risk factor count' },
]

// ─── Display label maps ──────────────────────────────────────────────────────

const STAGE_LABEL: Record<DealStage, string> = {
  'discovery':       'discovery',
  'solutioning':     'solutioning',
  'tech-validation': 'tech validation',
  'active-pov':      'active POV',
  'negotiation':     'negotiation',
}
const FORECAST_LABEL: Record<Forecast, string> = {
  'pipeline':  'pipeline',
  'best-case': 'best case',
  'commit':    'commit',
}
// Designer call: distinguish forecast confidence at a glance via
// categorical tag color. Earliest stage = bronze (warm, low-saturation,
// "raw"); best case = teal (cool, hopeful); commit = olive (earthy,
// settled). All on the low-contrast variant so the row stays calm.
const FORECAST_COLOR: Record<Forecast, TagColor> = {
  'pipeline':  'bronze',
  'best-case': 'teal',
  'commit':    'olive',
}
const TYPE_LABEL: Record<OppType, string> = {
  'net-new': 'net new',
  'upsell':  'upsell',
  'renewal': 'renewal',
}
const HEALTH_LABEL: Record<Health, string> = {
  'healthy':  'healthy',
  'at-risk':  'at risk',
  'critical': 'critical',
}

// Spec §4.3: healthy → green, at-risk → yellow, critical → red. Low-contrast
// pill (pastel ground + dark text) — readable inline without dominating the
// row. `yellow` and `red` are Tag color tokens (see TagColors in tags pkg).
type SeverityTagColor = 'green' | 'yellow' | 'orange' | 'red' | 'neutral'
const HEALTH_COLOR: Record<Health, SeverityTagColor> = {
  'healthy':  'green',
  'at-risk':  'yellow',
  'critical': 'red',
}

// Spec §4.3 Last Activity:
//   0–7d  → neutral, no icon         (deal being worked)
//   7–21d → caution color + caution icon (going quiet)
//   >21d  → error color + error icon (gone cold)
// Caution = orange in this DS (stage-text-and-icons.md status families).
// Error = red.
interface ActivityBucketStyle {
  color: SeverityTagColor
  icon?: React.ElementType
}
function activityStyleForDays(daysAgo: number): ActivityBucketStyle {
  if (daysAgo < 7)   return { color: 'neutral' }
  if (daysAgo <= 21) return { color: 'orange', icon: ExclamationTriangle }
  return { color: 'red', icon: ExclamationCircle }
}

// Brand icons live in @ds/icons and carry authored fills — `color` on the
// host tag does NOT recolor them (icon doc, "brand icons" paragraph).
// BrandUnit42 component is present in the icons package but not yet
// exported from the package index (lane ownership belongs to the icons
// package); fall back to no icon for unit-42 products.
const BRAND_ICON: Record<Brand, React.ElementType | undefined> = {
  'strata':  BrandStrata,
  'prisma':  BrandPrisma,
  'cortex':  BrandCortex,
  'unit-42': undefined,
}

// ─── Risk library (spec §3.11) ───────────────────────────────────────────────

const RISK_LIBRARY: Record<RiskId, { emoji: string; label: string }> = {
  'exec':           { emoji: '🧍', label: 'Lacking exec engagement or support' },
  'design':         { emoji: '📜', label: 'No design-of-record' },
  'tech-win':       { emoji: '🏅', label: 'No Secured technical win' },
  'partner':        { emoji: '🤝', label: 'No Partner selected or finalized' },
  'mandatory-ps':   { emoji: '🧑‍💻', label: 'Mandatory PS was removed' },
  'quote-approval': { emoji: '⌛', label: 'Quotes pending approval' },
  'budget':         { emoji: '💲', label: 'Budget conversation not scheduled or complete' },
  'term-length':    { emoji: '🔁', label: 'Term length greater than 3 years or without financing/billing plans' },
  'no-activity':    { emoji: '💤', label: 'No activity for last 30 days' },
}
const mkRisk = (id: RiskId): RiskFactor => ({ id, ...RISK_LIBRARY[id] })

// ─── Product brand map (spec §4.4) ───────────────────────────────────────────
// PA Series shows up as both Strata (Firewall) and Prisma (CDSS attachment) —
// disambiguated by name. "PA Series" = Firewall/Strata; the CDSS attachment is
// named "PA Series Attached" already.

const PRODUCT_BRAND: Record<string, Brand> = {
  'PA Series':           'strata',
  'VM Series':           'strata',
  'PA Series Attached':  'prisma',
  'PA Series Support':   'prisma',
  'FW Data Lake':        'strata',
  'Prisma Access':       'prisma',
  'Prisma SD-WAN':       'prisma',
  'Cortex XDR+':         'cortex',
  'Cortex XSOAR':        'cortex',
  'Xpanse':              'cortex',
  'XSIAM':               'cortex',
  'QRadar':              'cortex',
  'Cortex & Cloud':      'cortex',
  'Reactive':            'unit-42',
  'Proactive':           'unit-42',
}
const mkProduct = (name: string, valueUsd: number): Product => ({
  name,
  brand: PRODUCT_BRAND[name] ?? 'strata',
  valueUsd,
})

// ─── Data ────────────────────────────────────────────────────────────────────

export const DEFAULT_ROWS: OpportunityRow[] = [
  {
    id: '1',
    oppName: 'Prisma Access annual renewal with global bandwidth upgrade',
    account: 'Titan Energy Solutions',
    type: 'renewal', forecast: 'commit', stage: 'negotiation',
    closeDate: 'mar 7', quoteId: 'Q-00307',
    products: [
      mkProduct('Prisma Access', 900_000),
      mkProduct('Prisma SD-WAN', 300_000),
    ],
    valueUsd: 1_200_000,
    activity: { daysAgo: 2, description: 'Pricing review with procurement' },
    health: { overall: 'healthy', technical: 'healthy', adoption: 'healthy',
      trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
    risks: [],
    salesPlay: { name: 'SASE Acceleration', status: 'pursuing' },
    renewal: { subEnd: 'Sept 1, 2025', renewableTcvUsd: 1_200_000, arrUsd: 600_000, outcome: 'full' },
  },
  {
    id: '2',
    oppName: 'Cortex XDR enterprise deployment for distributed workforce',
    account: 'Meridian Capital Group',
    type: 'net-new', forecast: 'commit', stage: 'active-pov',
    closeDate: 'mar 14', quoteId: 'Q-00891',
    products: [
      mkProduct('Cortex XDR+', 1_400_000),
      mkProduct('Cortex XSOAR', 700_000),
      mkProduct('XSIAM', 300_000),
    ],
    valueUsd: 2_400_000,
    activity: { daysAgo: 1, description: 'Technical deep-dive with SecOps lead' },
    health: { overall: 'at-risk', technical: 'healthy', adoption: 'at-risk',
      trend12mo: [0,0,0,0,0,1,0,0,0,0,0,1] },
    risks: [mkRisk('budget'), mkRisk('partner')],
    salesPlay: { name: 'XSIAM Splunk Takeout', status: 'pursuing' },
  },
  {
    id: '3',
    oppName: 'Strata Cloud Manager upgrade with advanced threat prevention',
    account: 'Nexus Financial Holdings',
    type: 'upsell', forecast: 'best-case', stage: 'tech-validation',
    closeDate: 'mar 18', quoteId: 'Q-00734',
    products: [
      mkProduct('PA Series', 540_000),
      mkProduct('FW Data Lake', 350_000),
    ],
    valueUsd: 890_000,
    activity: { daysAgo: 3, description: 'Architecture review session' },
    health: { overall: 'healthy', technical: 'healthy', adoption: 'healthy',
      trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
    risks: [mkRisk('design')],
    salesPlay: { name: 'Hardware Refresh', status: 'pursuing' },
  },
  {
    id: '4',
    oppName: 'Annual Prisma Access license renewal — full global employee base',
    account: 'Vertex Manufacturing Co.',
    type: 'renewal', forecast: 'commit', stage: 'negotiation',
    closeDate: 'mar 21', quoteId: 'Q-00622',
    products: [
      mkProduct('Prisma Access', 1_700_000),
      mkProduct('Prisma SD-WAN', 800_000),
      mkProduct('PA Series', 400_000),
      mkProduct('FW Data Lake', 200_000),
    ],
    valueUsd: 3_100_000,
    activity: { daysAgo: 9, description: 'Executive escalation call' },
    health: { overall: 'critical', technical: 'critical', adoption: 'at-risk',
      trend12mo: [0,0,1,1,1,1,2,2,2,2,2,2] },
    risks: [mkRisk('exec'), mkRisk('partner'), mkRisk('budget'), mkRisk('quote-approval')],
    salesPlay: { name: 'SASE Acceleration', status: 'pursuing' },
    renewal: { subEnd: 'Apr 30, 2025', renewableTcvUsd: 3_100_000, arrUsd: 1_550_000, outcome: 'unknown' },
  },
  {
    id: '5',
    oppName: 'Cortex XDR additional endpoint coverage expansion',
    account: 'Pacific Commerce Bank',
    type: 'upsell', forecast: 'best-case', stage: 'solutioning',
    closeDate: 'mar 28', quoteId: 'Q-00855',
    products: [
      mkProduct('Cortex XDR+', 470_000),
      mkProduct('Xpanse', 200_000),
    ],
    valueUsd: 670_000,
    activity: { daysAgo: 12, description: 'Pricing options shared via email' },
    health: { overall: 'critical', technical: 'at-risk', adoption: 'critical',
      trend12mo: [0,0,0,1,1,1,1,2,2,2,2,2] },
    risks: [
      mkRisk('exec'), mkRisk('design'), mkRisk('tech-win'),
      mkRisk('mandatory-ps'), mkRisk('term-length'), mkRisk('no-activity'),
    ],
    salesPlay: { name: 'XSIAM Splunk Takeout', status: 'pursuing' },
  },
  {
    id: '6',
    oppName: 'Cortex XSOAR automation platform initial deployment',
    account: 'Axiom Technology Partners',
    type: 'net-new', forecast: 'pipeline', stage: 'solutioning',
    closeDate: 'apr 2', quoteId: 'Q-00956',
    products: [
      mkProduct('Cortex XSOAR', 1_200_000),
      mkProduct('Xpanse', 500_000),
    ],
    valueUsd: 1_700_000,
    activity: { daysAgo: 0, description: 'Discovery call with security team' },
    health: { overall: 'healthy', technical: 'healthy', adoption: 'healthy',
      trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
    risks: [],
    salesPlay: { name: 'XSIAM Splunk Takeout', status: 'pitched' },
  },
  {
    id: '7',
    oppName: 'WildFire advanced malware protection add-on for all endpoints',
    account: 'Summit Healthcare Systems',
    type: 'upsell', forecast: 'best-case', stage: 'tech-validation',
    closeDate: 'apr 8', quoteId: 'Q-00481',
    products: [
      mkProduct('Cortex XDR+', 280_000),
      mkProduct('PA Series Attached', 165_000),
    ],
    valueUsd: 445_000,
    activity: { daysAgo: 5, description: 'POC kickoff meeting' },
    health: { overall: 'at-risk', technical: 'healthy', adoption: 'at-risk',
      trend12mo: [0,0,0,0,0,0,0,1,1,1,1,1] },
    risks: [mkRisk('design'), mkRisk('partner'), mkRisk('quote-approval'),
            mkRisk('term-length'), mkRisk('budget')],
    salesPlay: { name: 'Hardware Refresh', status: 'pursuing' },
  },
  {
    id: '8',
    oppName: 'Prisma Cloud enterprise security platform for cloud migration program',
    account: 'Harbor Logistics Group',
    type: 'net-new', forecast: 'pipeline', stage: 'discovery',
    closeDate: 'apr 15', quoteId: 'Q-01012',
    products: [
      mkProduct('Prisma Access', 2_400_000),
      mkProduct('Prisma SD-WAN', 1_500_000),
      mkProduct('Cortex XDR+', 700_000),
      mkProduct('XSIAM', 400_000),
      mkProduct('Reactive', 200_000),
    ],
    valueUsd: 5_200_000,
    activity: { daysAgo: 7, description: 'Solution overview workshop' },
    health: { overall: 'at-risk', technical: 'at-risk', adoption: 'healthy',
      trend12mo: [0,0,0,0,0,0,1,1,1,1,1,1] },
    risks: [mkRisk('exec'), mkRisk('design'), mkRisk('tech-win')],
    salesPlay: { name: 'SASE Acceleration', status: 'pitched' },
  },
]

// ─── Filter option sets ──────────────────────────────────────────────────────

const FORECAST_OPTIONS: { value: string; label: string }[] = [
  { value: 'pipeline',  label: 'pipeline' },
  { value: 'best-case', label: 'best case' },
  { value: 'commit',    label: 'commit' },
]

const STAGE_OPTIONS: { value: string; label: string }[] = [
  { value: 'discovery',       label: 'discovery' },
  { value: 'solutioning',     label: 'solutioning' },
  { value: 'tech-validation', label: 'tech validation' },
  { value: 'active-pov',      label: 'active POV' },
  { value: 'negotiation',     label: 'negotiation' },
]

const TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'net-new', label: 'net new' },
  { value: 'upsell',  label: 'upsell' },
  { value: 'renewal', label: 'renewal' },
]

const LAST_ACTIVITY_OPTIONS: { value: string; label: string }[] = [
  { value: 'lt-7',  label: 'last 7 days' },
  { value: '7-21',  label: '7–21 days' },
  { value: 'gt-21', label: 'over 21 days' },
]

const CLOSE_DATE_OPTIONS: FilterOption[] = [
  { value: 'this-q', label: 'This Quarter' },
  { value: 'q4fy26', label: 'Q4FY26' },
  { value: 'q1fy27', label: 'Q1FY27' },
  { value: 'q2fy27', label: 'Q2FY27' },
  { value: 'q3fy27', label: 'Q3FY27' },
  { value: 'q4fy27', label: 'Q4FY27' },
]

// Spec §3.10 — three sections × three options. State shape lives as
// { overall, technical, adoption } each carrying a Health[] selection;
// the GroupedHealthFilter component below renders all three in one
// Flyout and commits on Apply.
type HealthAxis = 'overall' | 'technical' | 'adoption'
interface GroupedHealthSelection {
  overall: Health[]
  technical: Health[]
  adoption: Health[]
}
const HEALTH_AXES: { key: HealthAxis; label: string }[] = [
  { key: 'overall',   label: 'Overall Health' },
  { key: 'technical', label: 'Technical Health' },
  { key: 'adoption',  label: 'Adoption & Deployment Health' },
]
const HEALTH_LEVELS: { value: Health; label: string }[] = [
  { value: 'healthy',  label: 'Healthy' },
  { value: 'at-risk',  label: 'At Risk' },
  { value: 'critical', label: 'Critical' },
]
// Defaults per spec §3.10: Overall = At Risk + Critical (Healthy off);
// Technical and Adoption = all three on. The "skewed-toward-attention"
// default only applies to the Overall axis.
const INITIAL_GROUPED_HEALTH: GroupedHealthSelection = {
  overall:   ['at-risk', 'critical'],
  technical: ['healthy', 'at-risk', 'critical'],
  adoption:  ['healthy', 'at-risk', 'critical'],
}

// Spec §3.4 — tag-density filter. Each key maps to a renderable tag in
// the row. Toggling a key OFF hides that tag from every row. All on by
// default. Order in this array drives the order in the picker; row
// rendering already has its own visual order, so the picker is just a
// list.
type DensityKey =
  | 'quoteId' | 'oppType' | 'stage' | 'forecast' | 'closeDate'    // col 2
  | 'lastActivity' | 'accountHealth' | 'riskCount' | 'salesPlay'  // col 3
  | 'products'                                                     // col 4

const DENSITY_OPTIONS: { value: DensityKey; label: string }[] = [
  { value: 'quoteId',       label: 'quote number' },
  { value: 'oppType',       label: 'opportunity type' },
  { value: 'stage',         label: 'stage' },
  { value: 'forecast',      label: 'forecast' },
  { value: 'closeDate',     label: 'close date' },
  { value: 'lastActivity',  label: 'last activity' },
  { value: 'accountHealth', label: 'account health' },
  { value: 'riskCount',     label: 'risk factors' },
  { value: 'salesPlay',     label: 'sales play' },
  { value: 'products',      label: 'products' },
]
const ALL_DENSITY_KEYS: DensityKey[] = DENSITY_OPTIONS.map(o => o.value)

const RISK_FILTER_OPTIONS: FilterOption[] = (Object.keys(RISK_LIBRARY) as RiskId[]).map(id => ({
  value: id,
  label: `${RISK_LIBRARY[id].emoji} ${RISK_LIBRARY[id].label}`,
}))

// ─── Defaults (spec §5) ──────────────────────────────────────────────────────

const INITIAL_SINGLE: Record<string, string | null> = {
  forecast: null,
  stage: null,
  oppType: null,
  lastActivity: null,
}

const INITIAL_MULTI: Record<string, string[]> = {
  closeDate: ['this-q', 'q4fy26'],
  risk:      [],
}
// Account Health moved out of the flat-multi map into its own grouped
// shape (INITIAL_GROUPED_HEALTH) since Pass 5 — the axes can't be
// flattened into a single string[].

// ─── Product taxonomy (tree filter) ──────────────────────────────────────────

interface ProductNode {
  label: string
  value: string
  children?: ProductNode[]
}

const PRODUCT_TREE: ProductNode[] = [
  { label: 'Firewall', value: 'firewall', children: [
    { label: 'PA Series', value: 'pa-series' },
    { label: 'VM Series', value: 'vm-series' },
  ]},
  { label: 'CDSS', value: 'cdss', children: [
    { label: 'PA Series Attached', value: 'pa-series-attached' },
    { label: 'PA Series Support', value: 'pa-series-support' },
    { label: 'FW Data Lake', value: 'fw-data-lake' },
  ]},
  { label: 'SASE', value: 'sase', children: [
    { label: 'Prisma Access', value: 'prisma-access' },
    { label: 'Prisma SD-WAN', value: 'prisma-sd-wan' },
  ]},
  { label: 'Cortex & Cloud', value: 'cortex-cloud', children: [
    { label: 'Cortex XDR+', value: 'cortex-xdr' },
    { label: 'Cortex XSOAR', value: 'cortex-xsoar' },
    { label: 'Xpanse', value: 'xpanse' },
    { label: 'XSIAM', value: 'xsiam' },
    { label: 'QRadar', value: 'qradar' },
    { label: 'Cortex & Cloud', value: 'cortex-cloud-leaf' },
  ]},
  { label: 'Unit 42', value: 'unit-42', children: [
    { label: 'Reactive', value: 'unit-42-reactive' },
    { label: 'Proactive', value: 'unit-42-proactive' },
  ]},
]

const ALL_PRODUCT_LEAVES = PRODUCT_TREE.flatMap(g => g.children?.map(c => c.value) ?? [])

// ─── Tag presets ─────────────────────────────────────────────────────────────

const TAG_BASE = {
  color: 'neutral' as const,
  contrast: 'low' as const,
  shape: 'rounded' as const,
  size: 'large' as const, // large = 4px radius (per design call)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatUsdCompact(n: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact', style: 'currency', currency: 'USD', maximumFractionDigits: 1,
  }).format(n)
}
// Full-precision USD for the value column. Tabular nums + thousand
// separators; no decimals — opportunity values are whole-dollar.
function formatUsdFull(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(n)
}

// Parse "mar 7" → ordinal for sort. Sufficient for fixed demo data;
// real data would carry a Date and this helper goes away.
const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
function closeDateOrdinal(s: string): number {
  const [m, d] = s.toLowerCase().split(/\s+/)
  return (MONTHS.indexOf(m ?? '') * 31) + (parseInt(d ?? '1', 10) || 1)
}

// ─── Sort flyout (single-select) ─────────────────────────────────────────────

interface SortFlyoutProps {
  sortKey: SortKey
  sortDir: SortDir
  onChange: (key: SortKey) => void
}

function SortFlyout({ sortKey, sortDir, onChange }: SortFlyoutProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const currentLabel = SORT_OPTIONS.find(o => o.key === sortKey)?.label ?? 'close date'

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="opp-sort-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}>
        <span>sort: {currentLabel} {sortDir === 'asc' ? '↑' : '↓'}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={triggerRef}
        mode="single"
        selected={[sortKey]}
        onSelectionChange={(values) => {
          if (values[0]) onChange(values[0] as SortKey)
          setOpen(false)
        }}
        placement="bottom-end">
        <FlyoutList>
          {SORT_OPTIONS.map(opt => (
            <FlyoutItem key={opt.key} value={opt.key}>{opt.label}</FlyoutItem>
          ))}
        </FlyoutList>
      </Flyout>
    </>
  )
}

// ─── Single-select filter (built from primitives) ────────────────────────────
// DS Filter is multi-select with Apply/Cancel. Spec §3.5/3.6/3.8/3.9 want
// single-select with an "All" reset option. This trigger mirrors Filter's
// visual shape (label + selected chip + chevron) but commits immediately on
// item click, like SortFlyout. Built locally; flagged in file header as a
// system gap.

const ALL_SENTINEL = '__all__'

interface SingleSelectFilterProps {
  label: string
  options: { value: string; label: string }[]
  value: string | null
  onChange: (v: string | null) => void
  allLabel?: string
}

function SingleSelectFilter({ label, options, value, onChange, allLabel = 'All' }: SingleSelectFilterProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const selectedOption = value === null ? null : options.find(o => o.value === value) ?? null

  return (
    <span className="panw--filter__wrapper">
      <button
        ref={triggerRef}
        type="button"
        className={`panw--filter${open ? ' panw--filter--open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}>
        <span className="panw--filter__label">{label}</span>
        {selectedOption && (
          <span className="panw--filter__values">
            <span className="panw--filter__chip-target">
              <Tags
                label={selectedOption.label}
                color="neutral"
                contrast="high"
                size="default"
              />
            </span>
          </span>
        )}
        <span className="panw--filter__chevron" aria-hidden="true">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={triggerRef}
        mode="single"
        selected={[value ?? ALL_SENTINEL]}
        onSelectionChange={(values) => {
          const v = values[0]
          onChange(!v || v === ALL_SENTINEL ? null : v)
          setOpen(false)
        }}
        placement="bottom-start">
        <FlyoutList>
          <FlyoutItem value={ALL_SENTINEL}>{allLabel}</FlyoutItem>
          {options.map(o => (
            <FlyoutItem key={o.value} value={o.value}>{o.label}</FlyoutItem>
          ))}
        </FlyoutList>
      </Flyout>
    </span>
  )
}

// ─── Product filter (tree with checkboxes on every node) ─────────────────────

interface ProductFilterProps {
  selected: string[]
  onApply: (selected: string[]) => void
}

function ProductFilter({ selected, onApply }: ProductFilterProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<string[]>(selected)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) setDraft(selected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const groupLeaves = (g: ProductNode) => g.children?.map(c => c.value) ?? []

  const groupStatus = (g: ProductNode) => {
    const leaves = groupLeaves(g)
    const sel = leaves.filter(v => draft.includes(v)).length
    if (sel === 0) return 'unchecked'
    if (sel === leaves.length) return 'checked'
    return 'indeterminate'
  }

  const toggleGroup = (g: ProductNode) => {
    const leaves = groupLeaves(g)
    const allOn = leaves.every(v => draft.includes(v))
    setDraft(d =>
      allOn ? d.filter(v => !leaves.includes(v))
            : Array.from(new Set([...d, ...leaves]))
    )
  }

  const toggleLeaf = (val: string) =>
    setDraft(d => d.includes(val) ? d.filter(v => v !== val) : [...d, val])

  const apply = () => { onApply(draft); setOpen(false) }
  const cancel = () => setOpen(false)

  const allLeaves = ALL_PRODUCT_LEAVES
  const allOn = allLeaves.every(v => draft.includes(v))
  const noneOn = !draft.some(v => allLeaves.includes(v))
  const masterStatus: 'checked' | 'unchecked' | 'indeterminate' =
    allOn ? 'checked' : noneOn ? 'unchecked' : 'indeterminate'
  const toggleMaster = () => setDraft(allOn ? [] : [...allLeaves])

  // Applied items for the DS chip-popover: each leaf value + its label.
  const appliedItems = selected
    .map(v => {
      const leaf = PRODUCT_TREE.flatMap(g => g.children ?? []).find(c => c.value === v)
      return leaf ? { value: leaf.value, label: leaf.label } : null
    })
    .filter((x): x is { value: string; label: string } => !!x)

  const chipHover = useChipPopoverHover()
  const removeApplied = (val: string) => {
    const next = selected.filter(v => v !== val)
    onApply(next)
    if (next.length === 0) chipHover.setChipPopoverOpen(false)
  }

  return (
    <span className="panw--filter__wrapper">
      <button
        ref={triggerRef}
        type="button"
        className={`panw--filter${open ? ' panw--filter--open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}>
        <span className="panw--filter__label">products</span>
        {selected.length > 0 && (
          <span className="panw--filter__values">
            <span
              className="panw--filter__chip-target"
              onMouseEnter={chipHover.openOnEnter}
              onMouseLeave={chipHover.scheduleClose}>
              <Tags
                label={String(selected.length)}
                color="neutral"
                contrast="high"
                size="default"
              />
            </span>
          </span>
        )}
        <span className="panw--filter__chevron" aria-hidden="true">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {/* Chip-popover lives as a sibling of the trigger inside the
       *  .panw--filter__wrapper so the DS CSS positions it correctly
       *  (position:absolute, top:100%). Suppressed when the main
       *  flyout is open to avoid two stacked panels. */}
      {selected.length > 0 && chipHover.chipPopoverOpen && !open && (
        <FilterChipPopover
          items={appliedItems}
          onRemove={removeApplied}
          onMouseEnter={chipHover.cancelClose}
          onMouseLeave={chipHover.scheduleClose}
        />
      )}

      {/* Tree filter: each leaf is a FlyoutItem (DS default sizing).
          Group rows are custom (collapsible tree node with status
          checkbox + folder icon). Master select-all sits at the top as
          an icon-only FlyoutSelectAll-style row. The Flyout's
          multi-select machinery drives leaf state; group + master
          rows are local UI on top. */}
      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={triggerRef}
        mode="multiple"
        selected={draft}
        onSelectionChange={setDraft}
        placement="bottom-start">
        {/* Icon-only select-all header per DS pattern (mirrors the
            built-in FlyoutSelectAll: tri-state checkbox, no label,
            hairline beneath). We render it locally because we want a
            tree below — FlyoutSelectAll counts only registered
            FlyoutItems, not the group rows. */}
        <div
          className="opp-tree__select-all"
          role="checkbox"
          aria-checked={masterStatus === 'checked' ? 'true' : masterStatus === 'indeterminate' ? 'mixed' : 'false'}
          tabIndex={0}
          onClick={toggleMaster}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMaster() } }}>
          <Checkbox status={masterStatus} label="" tabIndex={-1} />
        </div>
        <div className="opp-tree__select-all-divider" role="separator" aria-hidden="true" />

        <div className="opp-tree" role="tree">
          {PRODUCT_TREE.map(group => (
            <ProductTreeGroup
              key={group.value}
              group={group}
              draft={draft}
              status={groupStatus(group)}
              onToggleGroup={() => toggleGroup(group)}
              onToggleLeaf={toggleLeaf}
            />
          ))}
        </div>
        <FlyoutFooter>
          <div className="panw--filter__footer-actions">
            <Button kind="ghost" size="small" onClick={cancel}>Cancel</Button>
            <Button kind="primary" size="small" onClick={apply}>Apply</Button>
          </div>
        </FlyoutFooter>
      </Flyout>
    </span>
  )
}

// ─── Product tree group — collapsible parent + leaves ───────────────────────

function ProductTreeGroup({
  group,
  draft,
  status,
  onToggleGroup,
  onToggleLeaf,
}: {
  group: ProductNode
  draft: string[]
  status: 'checked' | 'unchecked' | 'indeterminate'
  onToggleGroup: () => void
  onToggleLeaf: (val: string) => void
}) {
  const [isOpen, setOpen] = useState(true)
  const Chev = isOpen ? ChevronDown : ChevronRight
  return (
    <div className="opp-tree__group" role="group">
      <div className="opp-tree__row opp-tree__row--group" role="treeitem" aria-expanded={isOpen}>
        <button
          type="button"
          className="opp-tree__chev"
          aria-label={isOpen ? `Collapse ${group.label}` : `Expand ${group.label}`}
          onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}>
          <Chev size={20} />
        </button>
        <span className="opp-tree__row-action" onClick={onToggleGroup}>
          <Checkbox status={status} label="" tabIndex={-1} />
          <span className="opp-tree__icon" aria-hidden="true"><Folder size={16} /></span>
          <span className="opp-tree__label opp-tree__label--bold">{group.label}</span>
        </span>
      </div>
      {isOpen && (
        <div className="opp-tree__children">
          {(group.children ?? []).map(leaf => (
            <div
              key={leaf.value}
              className="opp-tree__row opp-tree__row--leaf"
              role="treeitem"
              aria-checked={draft.includes(leaf.value)}
              onClick={() => onToggleLeaf(leaf.value)}>
              <span className="opp-tree__chev-spacer" />
              <Checkbox
                status={draft.includes(leaf.value) ? 'checked' : 'unchecked'}
                label=""
                tabIndex={-1}
              />
              <span className="opp-tree__label">{leaf.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Filter-chip hover popover (DS-aligned) ──────────────────────────────
// The DS Filter component (design-system/packages/filter/src/Filter/Filter.tsx)
// ships a built-in chip-hover popover with:
//   .panw--filter__chip-popover        - panel chrome (surface, shadow, radius, position:absolute)
//   .panw--filter__chip-popover-row    - flex row with text + remove IconButton
//   .panw--filter__chip-popover-label  - flex-1 label with ellipsis truncation
// All styling lives in @ds/styles/scss/components/filter/_filter.scss.
//
// The custom ProductFilter in this composition follows the SAME JSX
// shape and class names so it picks up the DS styling without any local
// CSS. The state machine and 180ms close grace are extracted into
// useChipPopoverHover() to avoid duplication; the chip target and
// popover panel both wire its handlers.

function useChipPopoverHover() {
  const [chipPopoverOpen, setChipPopoverOpen] = useState(false)
  const closeTimerRef = useRef<number | null>(null)
  const cancelClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])
  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimerRef.current = window.setTimeout(() => setChipPopoverOpen(false), 180)
  }, [cancelClose])
  useEffect(() => () => cancelClose(), [cancelClose])
  const openOnEnter = useCallback(() => { cancelClose(); setChipPopoverOpen(true) }, [cancelClose])
  return { chipPopoverOpen, setChipPopoverOpen, cancelClose, scheduleClose, openOnEnter }
}

interface FilterChipPopoverProps {
  items: { value: string; label: string }[]
  onRemove: (value: string) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function FilterChipPopover({ items, onRemove, onMouseEnter, onMouseLeave }: FilterChipPopoverProps) {
  return (
    <div
      className="panw--filter__chip-popover"
      role="dialog"
      aria-label="Applied filters"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {items.map(({ value, label }) => (
        <div key={value} className="panw--filter__chip-popover-row">
          <span className="panw--filter__chip-popover-label">{label}</span>
          <IconButton
            kind="ghost"
            size="sm"
            iconSize={16}
            renderIcon={Close}
            aria-label={`Remove ${label}`}
            onClick={(e) => {
              e.stopPropagation()
              onRemove(value)
            }}
          />
        </div>
      ))}
    </div>
  )
}

// ─── Tag-density filter (spec §3.4) ──────────────────────────────────────────
// Multi-select Flyout with checkboxes. Toggling a row commits
// immediately (no Apply step). Trigger reuses panw--filter BEM so it
// inherits the host shell, but the visual density-control treatment
// (leading Sliders icon, "display:" prefix outside the trigger) sits in
// the layout, not in this component.
//
// Spec callout: "Make it visually distinct from the row-filtering
// controls below it. The two callouts ('controls how much information'
// vs 'controls how many opportunities') are the mental model to
// preserve." → handled by row separation + leading label, see render
// site.

interface TagDensityFilterProps {
  selected: DensityKey[]
  onChange: (next: DensityKey[]) => void
}

function TagDensityFilter({ selected, onChange }: TagDensityFilterProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Trigger is just label + chevron — density is a quiet control; the
  // explicit count chip and leading icon were over-stating its weight.
  return (
    <span className="panw--filter__wrapper">
      <button
        ref={triggerRef}
        type="button"
        className={`panw--filter${open ? ' panw--filter--open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}>
        <span className="panw--filter__label">tags</span>
        <span className="panw--filter__chevron" aria-hidden="true">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {/* Multi-select Flyout — instant commit (no Apply step). The DS
         FlyoutSelectAll header carries the tri-state "select all"
         control per system convention (icon-only checkbox above the
         list, with implicit hairline below — both rendered by the
         component itself). */}
      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={triggerRef}
        mode="multiple"
        selected={selected}
        onSelectionChange={(vals) => onChange(vals as DensityKey[])}
        placement="bottom-start">
        <FlyoutSelectAll />
        <FlyoutList>
          {DENSITY_OPTIONS.map(opt => (
            <FlyoutItem key={opt.value} value={opt.value}>{opt.label}</FlyoutItem>
          ))}
        </FlyoutList>
      </Flyout>
    </span>
  )
}

// ─── Grouped Account Health filter (spec §3.10) ─────────────────────────────
// Three axes × three levels, in one Flyout. Apply/Cancel pattern
// mirrors the DS Filter component. Internal "draft" copy so a Cancel
// doesn't leak partial edits.

interface GroupedHealthFilterProps {
  value: GroupedHealthSelection
  onApply: (next: GroupedHealthSelection) => void
}

// Encode (axis, level) as a single FlyoutItem value so we can ride the
// DS Flyout's multi-select machinery: "overall:healthy",
// "technical:at-risk", etc. The custom Health-token tag preview rides
// alongside each FlyoutItem's label.
function encodeAxisLevel(axis: HealthAxis, lvl: Health): string {
  return `${axis}:${lvl}`
}
function selectionToValues(sel: GroupedHealthSelection): string[] {
  return [
    ...sel.overall.map(l => encodeAxisLevel('overall', l)),
    ...sel.technical.map(l => encodeAxisLevel('technical', l)),
    ...sel.adoption.map(l => encodeAxisLevel('adoption', l)),
  ]
}
function valuesToSelection(values: string[]): GroupedHealthSelection {
  const out: GroupedHealthSelection = { overall: [], technical: [], adoption: [] }
  for (const v of values) {
    const [axis, lvl] = v.split(':') as [HealthAxis, Health]
    if (out[axis]) out[axis].push(lvl)
  }
  return out
}

function GroupedHealthFilter({ value, onApply }: GroupedHealthFilterProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<string[]>(selectionToValues(value))
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) setDraft(selectionToValues(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Trigger chip reflects the COMMITTED value, not the draft — a
  // Cancel mustn't visibly snap the trigger backwards.
  // Bare numeric count (consistent with the other multi-select filters
  // in this row). The trigger label ("account health") already supplies
  // the denominator's domain, so "/9" is redundant.
  const committedTotal =
    value.overall.length + value.technical.length + value.adoption.length
  const chipLabel = String(committedTotal)

  // Applied items for the DS chip-popover. Each is encoded as
  // `${axis}:${level}` so onRemove can decode and clear it from the
  // right group.
  const appliedItems = ([
    ['overall',   value.overall],
    ['technical', value.technical],
    ['adoption',  value.adoption],
  ] as const).flatMap(([axis, levels]) =>
    levels.map(lvl => ({
      value: encodeAxisLevel(axis, lvl),
      label: `${axis}: ${HEALTH_LABEL[lvl]}`,
    }))
  )

  const apply = () => { onApply(valuesToSelection(draft)); setOpen(false) }
  const cancel = () => setOpen(false)

  // Chip-popover hover state (DS pattern from @ds/filter).
  const chipHover = useChipPopoverHover()
  const removeApplied = (encoded: string) => {
    const [axis, lvl] = encoded.split(':') as [HealthAxis, Health]
    onApply({
      ...value,
      [axis]: value[axis].filter(v => v !== lvl),
    })
    if (committedTotal - 1 === 0) chipHover.setChipPopoverOpen(false)
  }

  return (
    <span className="panw--filter__wrapper">
      <button
        ref={triggerRef}
        type="button"
        className={`panw--filter${open ? ' panw--filter--open' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}>
        <span className="panw--filter__label">account health</span>
        {committedTotal > 0 && (
          <span className="panw--filter__values">
            <span
              className="panw--filter__chip-target"
              onMouseEnter={chipHover.openOnEnter}
              onMouseLeave={chipHover.scheduleClose}>
              <Tags label={chipLabel} color="neutral" contrast="high" size="default" />
            </span>
          </span>
        )}
        <span className="panw--filter__chevron" aria-hidden="true">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {/* Chip-popover lives as a sibling of the trigger inside the
       *  .panw--filter__wrapper so the DS CSS positions it correctly
       *  (position:absolute, top:100%). Suppressed when the main
       *  flyout is open to avoid two stacked panels. */}
      {committedTotal > 0 && chipHover.chipPopoverOpen && !open && (
        <FilterChipPopover
          items={appliedItems}
          onRemove={removeApplied}
          onMouseEnter={chipHover.cancelClose}
          onMouseLeave={chipHover.scheduleClose}
        />
      )}

      {/* DS Flyout in multi-select mode with FlyoutGroup sections per
          axis. Each axis groups three FlyoutItems whose labels carry
          the colored Health tag pill as a visual preview of what the
          option produces in the table. A top-level FlyoutSelectAll
          provides the system's tri-state select-all affordance. */}
      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={triggerRef}
        mode="multiple"
        selected={draft}
        onSelectionChange={setDraft}
        placement="bottom-start">
        <FlyoutSelectAll />
        <FlyoutList>
          {HEALTH_AXES.map(axis => (
            <FlyoutGroup key={axis.key} label={axis.label} defaultOpen>
              {HEALTH_LEVELS.map(lvl => (
                <FlyoutItem
                  key={encodeAxisLevel(axis.key, lvl.value)}
                  value={encodeAxisLevel(axis.key, lvl.value)}>
                  <Tags
                    shape="rounded"
                    size="default"
                    contrast="low"
                    color={HEALTH_COLOR[lvl.value]}
                    label={lvl.label}
                  />
                </FlyoutItem>
              ))}
            </FlyoutGroup>
          ))}
        </FlyoutList>
        <FlyoutFooter>
          <div className="panw--filter__footer-actions">
            <Button kind="ghost" size="small" onClick={cancel}>Cancel</Button>
            <Button kind="primary" size="small" onClick={apply}>Apply</Button>
          </div>
        </FlyoutFooter>
      </Flyout>
    </span>
  )
}

// ─── Hover shell — 700ms delayed popover/tooltip with portal positioning ────
//
// Wraps any trigger in a span. On mouseenter, starts a 700ms timer; on
// mouseleave (before fire) cancels it. When the timer fires, opens a
// portaled panel anchored to the trigger's bounding rect.
//
// Two modes:
//   `interactive: false` (default for tooltips) — closes IMMEDIATELY on
//      mouseleave of the trigger. The panel ignores pointer events so it
//      can't accidentally catch the cursor.
//   `interactive: true` — gives a 160ms close grace period after the
//      trigger leaves. Mouseenter on the panel inside that window cancels
//      the close. Lets the user move the cursor into a popover containing
//      a clickable action.
//
// Open surfaces auto-close on scroll/resize so a position-sticky-to-
// anchor surface doesn't drift visibly. The delay also means a quick
// cursor sweep across the table never opens any popover at all.

const HOVER_OPEN_DELAY_MS = 700
const HOVER_CLOSE_GRACE_MS = 160
const POPOVER_GAP_PX = 6 // distance between trigger and popover

type HoverShellAlign = 'start' | 'center' | 'end'
type HoverShellSide = 'bottom' | 'top'

interface HoverShellProps {
  children: React.ReactNode
  render: (api: { close: () => void }) => React.ReactNode
  interactive?: boolean
  side?: HoverShellSide
  align?: HoverShellAlign
  /** Optional class on the portaled wrapper. */
  panelClassName?: string
  /** Open delay in ms (default 700). Upsell uses 1000 per spec §4.2. */
  openDelayMs?: number
  /**
   * When true, the panel does NOT auto-close on mouseleave. It only
   * closes when (a) the panel calls the `close` API, (b) the user clicks
   * outside, or (c) the viewport scrolls/resizes. Used by the Renewal
   * popover, which contains a multi-step inline form the AE drives.
   */
  persist?: boolean
}

function HoverShell({
  children,
  render,
  interactive = false,
  side = 'bottom',
  align = 'center',
  panelClassName,
  openDelayMs = HOVER_OPEN_DELAY_MS,
  persist = false,
}: HoverShellProps) {
  const triggerRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = useState(false)
  // Position is computed AFTER the portal mounts the panel so we can read
  // its real height/width and avoid overflow off the viewport.
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  // Compute position whenever the panel becomes visible.
  useLayoutEffect(() => {
    if (!open) { setPos(null); return }
    const trigger = triggerRef.current
    const panel = panelRef.current
    if (!trigger || !panel) return

    const a = trigger.getBoundingClientRect()
    const panelW = panel.offsetWidth
    const panelH = panel.offsetHeight
    const vw = window.innerWidth
    const vh = window.innerHeight

    // Vertical placement — flip to top if not enough room below.
    const spaceBelow = vh - a.bottom
    const spaceAbove = a.top
    const preferTop = side === 'top'
    const fitsBelow = spaceBelow >= panelH + POPOVER_GAP_PX + 8
    const fitsAbove = spaceAbove >= panelH + POPOVER_GAP_PX + 8
    const placeAbove = (preferTop && fitsAbove) || (!preferTop && !fitsBelow && fitsAbove)
    const top = placeAbove
      ? a.top - panelH - POPOVER_GAP_PX
      : a.bottom + POPOVER_GAP_PX

    // Horizontal alignment.
    let left = a.left
    if (align === 'center') left = a.left + (a.width / 2) - (panelW / 2)
    else if (align === 'end') left = a.right - panelW
    left = Math.max(8, Math.min(vw - panelW - 8, left))

    setPos({ top, left })
  }, [open, side, align])

  // Close on scroll/resize — position would otherwise drift away from anchor.
  // Persist-mode popovers (Renewal editor) hold an unsaved form, so we
  // suppress this behavior; the user must explicitly Cancel or Confirm.
  useEffect(() => {
    if (!open || persist) return
    const fn = () => setOpen(false)
    window.addEventListener('scroll', fn, true)
    window.addEventListener('resize', fn)
    return () => {
      window.removeEventListener('scroll', fn, true)
      window.removeEventListener('resize', fn)
    }
  }, [open, persist])

  // Cleanup pending timers on unmount.
  useEffect(() => () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current)
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
  }, [])

  const clearOpenTimer = () => {
    if (openTimerRef.current) { clearTimeout(openTimerRef.current); openTimerRef.current = null }
  }
  const clearCloseTimer = () => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null }
  }

  const handleTriggerEnter = () => {
    clearCloseTimer()
    if (open) return
    clearOpenTimer()
    openTimerRef.current = setTimeout(() => setOpen(true), openDelayMs)
  }
  const handleTriggerLeave = () => {
    clearOpenTimer()
    if (!open) return
    // Persist mode: panel stays open until outside click / close API call.
    if (persist) return
    if (interactive) {
      clearCloseTimer()
      closeTimerRef.current = setTimeout(() => setOpen(false), HOVER_CLOSE_GRACE_MS)
    } else {
      setOpen(false)
    }
  }
  const handlePanelEnter = () => {
    if (!interactive && !persist) return
    clearCloseTimer()
  }
  const handlePanelLeave = () => {
    if (persist) return
    if (!interactive) return
    setOpen(false)
  }

  // Outside-click close (persist mode only). Hovers and tooltips don't
  // need this because they close on mouseleave already.
  useEffect(() => {
    if (!open || !persist) return
    const onDown = (ev: MouseEvent) => {
      const t = ev.target as Node
      if (panelRef.current?.contains(t)) return
      if (triggerRef.current?.contains(t)) return
      setOpen(false)
    }
    // mousedown not click — so the click that started inside a child
    // Flyout's portal doesn't bubble up and close us before the Flyout
    // can handle it.
    document.addEventListener('mousedown', onDown, true)
    return () => document.removeEventListener('mousedown', onDown, true)
  }, [open, persist])

  const close = () => setOpen(false)

  return (
    <>
      <span
        ref={triggerRef}
        className="opp-hover-trigger"
        onMouseEnter={handleTriggerEnter}
        onMouseLeave={handleTriggerLeave}>
        {children}
      </span>
      {open && createPortal(
        <div
          ref={panelRef}
          className={`opp-hover-panel${panelClassName ? ` ${panelClassName}` : ''}`}
          style={{
            position: 'fixed',
            top: pos?.top ?? -9999,
            left: pos?.left ?? -9999,
            visibility: pos ? 'visible' : 'hidden',
            pointerEvents: interactive || persist ? 'auto' : 'none',
            zIndex: 9999,
          }}
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handlePanelLeave}>
          {render({ close })}
        </div>,
        document.body
      )}
    </>
  )
}

// ─── Bar-chart 12-month health trend ─────────────────────────────────────────
// Vertical rounded-pill bars, one per monthly reading. Bar HEIGHT scales
// inversely with severity (healthy = tallest, critical = shortest) so a
// "falling skyline" reads as a deteriorating account — matches the AE's
// intuition. Bar COLOR is keyed to severity: green / yellow / red,
// using the status text tokens (matching family) so the chart shares
// language with the row's health pill and the picker tags.
//
// Pill geometry: bars are 6px wide with 4px gaps, rounded corners
// (radius = half-width for pill ends). The whole strip is anchored to
// a shared baseline so the eye reads "height = vitality".

const HEALTH_BAR_FILL: Record<Health, string> = {
  'healthy':  'var(--ds-text-status-success)',
  'at-risk':  'var(--ds-text-status-warning)',
  'critical': 'var(--ds-text-status-danger)',
}
const HEALTH_FROM_LEVEL: Record<number, Health> = {
  0: 'healthy', 1: 'at-risk', 2: 'critical',
}
// Severity → height fraction. Healthy is tallest (full height); at-risk
// dips to 70%; critical falls to 38%. The drop-off is steeper between
// at-risk and critical so a critical bar reads as visibly "smaller",
// not just "shorter than at-risk".
const HEALTH_HEIGHT_FRACTION: Record<Health, number> = {
  'healthy':  1.0,
  'at-risk':  0.72,
  'critical': 0.38,
}

function HealthTrendBars({ trend }: { trend: number[]; latest: Health }) {
  // Geometry: fixed bar width + gap; chart width derives from count.
  const barW = 6
  const gap = 4
  const padX = 6
  const padY = 4
  const innerH = 48
  const h = innerH + padY * 2
  const w = padX * 2 + trend.length * barW + Math.max(0, trend.length - 1) * gap

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="12-month account health trend"
      className="opp-health-bars">
      {trend.map((v, i) => {
        const sev = HEALTH_FROM_LEVEL[v] ?? 'critical'
        const fraction = HEALTH_HEIGHT_FRACTION[sev]
        const barH = Math.max(barW, innerH * fraction) // min height = barW so pill ends meet
        const x = padX + i * (barW + gap)
        const y = padY + (innerH - barH)
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx={barW / 2}
            ry={barW / 2}
            fill={HEALTH_BAR_FILL[sev]} />
        )
      })}
    </svg>
  )
}

// ─── Panel content components ────────────────────────────────────────────────

function AccountHealthPanel({ row }: { row: OpportunityRow }) {
  const h = row.health
  return (
    <div className="opp-pop opp-pop--health">
      <div className="opp-pop__heading">{row.account}</div>
      <div className="opp-pop__sub">12-month health trend</div>
      <div className="opp-pop__chart"><HealthTrendBars trend={h.trend12mo} latest={h.overall} /></div>
      <div className="opp-pop__rows">
        <div className="opp-pop__kv">
          <span className="opp-pop__kv-label">Technical Health</span>
          <Tags
            shape="rounded" size="default" contrast="low"
            color={HEALTH_COLOR[h.technical]}
            label={HEALTH_LABEL[h.technical]} />
        </div>
        <div className="opp-pop__kv">
          <span className="opp-pop__kv-label">Adoption &amp; Deployment</span>
          <Tags
            shape="rounded" size="default" contrast="low"
            color={HEALTH_COLOR[h.adoption]}
            label={HEALTH_LABEL[h.adoption]} />
        </div>
      </div>
      <div className="opp-pop__cta">
        <Button kind="ghost-brand" size="small">View Account Health</Button>
      </div>
    </div>
  )
}

function RiskFactorsPanel({ risks }: { risks: RiskFactor[] }) {
  if (risks.length === 0) {
    return (
      <div className="opp-pop opp-pop--risks">
        <div className="opp-pop__heading">No risk factors</div>
        <div className="opp-pop__sub">This deal isn't flagged with any risks.</div>
      </div>
    )
  }
  return (
    <div className="opp-pop opp-pop--risks">
      <div className="opp-pop__heading">
        {risks.length === 1 ? '1 risk factor' : `${risks.length} risk factors`}
      </div>
      <ul className="opp-pop__risk-list">
        {risks.map(r => (
          <li key={r.id} className="opp-pop__risk-item">
            <span className="opp-pop__risk-emoji" aria-hidden="true">{r.emoji}</span>
            <span className="opp-pop__risk-label">{r.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Sales-play status display labels (spec §3.4 of sales-play-reference)
const SALES_PLAY_STATUS_LABEL: Record<SalesPlayStatus, string> = {
  'not-touched': 'Not Touched',
  'pitched':     'Pitched',
  'deferred':    'Deferred',
  'declined':    'Declined',
  'pursuing':    'Pursuing',
  'closed-won':  'Closed Won',
  'closed-lost': 'Closed Lost',
}

function ProductPanel({ product, totalUsd }: { product: Product; totalUsd: number }) {
  const Icon = BRAND_ICON[product.brand]
  const pct = Math.round((product.valueUsd / Math.max(1, totalUsd)) * 100)
  return (
    <div className="opp-pop opp-pop--product">
      <div className="opp-pop__product-row">
        {Icon && <span className="opp-pop__product-icon" aria-hidden="true"><Icon /></span>}
        <span className="opp-pop__product-name">{product.name}</span>
      </div>
      <div className="opp-pop__product-meta">
        <span className="opp-pop__product-amount">{formatUsdCompact(product.valueUsd)}</span>
        <span className="opp-pop__product-share">of total opportunity value ({pct}%)</span>
      </div>
    </div>
  )
}

// ─── Renewal Outcome (spec §4.2) ─────────────────────────────────────────────
// Six outcomes; each carries a Tag color. Spec calls "purple" for
// Displacement and "slate" for Duplicate, both of which exist in TagColors.

const RENEWAL_OUTCOMES: { value: RenewalOutcome; label: string; color: TagColor }[] = [
  { value: 'unknown',      label: 'Unknown',      color: 'neutral' },
  { value: 'full',         label: 'Full Renewal', color: 'green'   },
  { value: 'upsell',       label: 'Upsell',       color: 'green'   },  // same positive family as `full`
  { value: 'downsell',     label: 'Downsell',     color: 'orange'  },
  { value: 'churn',        label: 'Churn',        color: 'red'     },
  { value: 'displacement', label: 'Displacement', color: 'purple'  },
  { value: 'duplicate',    label: 'Duplicate',    color: 'slate'   },
]
const outcomeMeta = (v: RenewalOutcome) =>
  RENEWAL_OUTCOMES.find(o => o.value === v) ?? RENEWAL_OUTCOMES[0]

const CHURN_REASONS = [
  { label: 'Customer dissatisfied',    value: 'dissatisfied' },
  { label: 'Budget cut',               value: 'budget' },
  { label: 'Competitive displacement', value: 'competitive' },
  { label: 'End of life',              value: 'eol' },
  { label: 'Other',                    value: 'other' },
]
const CHURN_COMPETITORS = [
  { label: 'CrowdStrike', value: 'crowdstrike' },
  { label: 'Fortinet',    value: 'fortinet' },
  { label: 'SentinelOne', value: 'sentinelone' },
  { label: 'Cisco',       value: 'cisco' },
  { label: 'Other',       value: 'other' },
  { label: 'N/A',         value: 'na' },
]

// ─── Button-only action popover (spec §4.2 + design call) ────────────────────
// Single-button surface that anchors to a tag. Used by the Upsell type
// tag (Modify) and the Quote ID tag (View Quote). No copy — the trigger
// already names the entity; this popover is purely the affordance to
// act on it.

function ActionButtonPanel({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="opp-pop opp-pop--action">
      <Button kind="ghost-brand" size="small" onClick={onClick}>{label}</Button>
    </div>
  )
}

function UpsellModifyPanel({ row, onClose }: { row: OpportunityRow; onClose: () => void }) {
  return <ActionButtonPanel label="Modify" onClick={() => { /* hook */ onClose() }} />
}

// ─── Renewal Outcome editor (spec §4.2) ──────────────────────────────────────
// Renders inside the renewal popover. Tag-as-button trigger with a
// trailing chevron opens a DS Flyout listing the 6 outcomes. Picking a
// non-Unknown value expands a form below the row; Churn additionally
// reveals the two structured dropdowns.

interface RenewalOutcomeEditorProps {
  value: RenewalOutcome
  onChange: (v: RenewalOutcome) => void
  /** Confirm/Cancel close the popover. */
  onConfirm: () => void
  onCancel: () => void
}

function RenewalOutcomeEditor({ value, onChange, onConfirm, onCancel }: RenewalOutcomeEditorProps) {
  // Working copy — edits don't commit until Confirm. Cancel reverts.
  const [draft, setDraft] = useState<RenewalOutcome>(value)
  const [reason, setReason] = useState<string | undefined>(undefined)
  const [competitor, setCompetitor] = useState<string | undefined>(undefined)
  const [notes, setNotes] = useState<string>('')

  const [pickerOpen, setPickerOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const current = outcomeMeta(draft)
  const formVisible = draft !== 'unknown' && draft !== value
  // The form is also revealed when draft === value but value !== unknown,
  // so the AE can keep editing notes / churn fields on a previously-set
  // outcome. Re-evaluate:
  const showForm = draft !== value || (draft !== 'unknown' && (notes.length > 0 || reason || competitor))
  const churnVisible = draft === 'churn'
  const dirty = draft !== value || notes.length > 0 || !!reason || !!competitor

  const handleConfirm = () => {
    if (draft !== value) onChange(draft)
    onConfirm()
  }
  const handleCancel = () => {
    setDraft(value); setReason(undefined); setCompetitor(undefined); setNotes('')
    onCancel()
  }

  return (
    <>
      <div className="opp-renewal-row opp-renewal-row--outcome">
        <span className="opp-renewal-row__label">Renewal Outcome</span>
        <div className="opp-outcome-wrapper">
          <button
            ref={triggerRef}
            type="button"
            className="opp-outcome-trigger"
            aria-haspopup="listbox"
            aria-expanded={pickerOpen}
            onClick={() => setPickerOpen(v => !v)}>
            <span
              className={`panw--tag panw--tag--size-large panw--tag--shape-rounded panw--tag--low panw--tag--${current.color}`}
              role="presentation">
              <span className="panw--tag__label">{current.label}</span>
              <span className="panw--tag__icon" aria-hidden="true"><ChevronDown size={14} /></span>
            </span>
          </button>
          <Flyout
            open={pickerOpen}
            onOpenChange={setPickerOpen}
            anchorRef={triggerRef}
            mode="single"
            selected={[draft]}
            onSelectionChange={(vals) => { if (vals[0]) setDraft(vals[0] as RenewalOutcome) }}
            placement="bottom-end">
            <FlyoutList>
              {RENEWAL_OUTCOMES.map(o => (
                <FlyoutItem key={o.value} value={o.value}>{o.label}</FlyoutItem>
              ))}
            </FlyoutList>
          </Flyout>
        </div>
      </div>

      {showForm && (
        <div className="opp-renewal-form" role="group" aria-label="Renewal details">
          {churnVisible && (
            <>
              <Dropdown
                title="Churn / Dismissal Reason"
                placeholder="Select"
                showDescription={false}
                background="grey10"
                selectedValue={reason}
                onChange={(v) => setReason(v)}
                options={CHURN_REASONS}
              />
              <Dropdown
                title="Competitor Replacement"
                placeholder="Select"
                showDescription={false}
                background="grey10"
                selectedValue={competitor}
                onChange={(v) => setCompetitor(v)}
                options={CHURN_COMPETITORS}
              />
            </>
          )}
          <TextEntry
            title="Notes"
            inputType="area"
            placeholder="Optional notes."
            showDescription={false}
            background="grey-10"
            value={notes}
            onChange={(v) => setNotes(v)}
          />
          <div className="opp-renewal-form__actions">
            <Button kind="secondary" size="small" onClick={handleCancel}>Cancel</Button>
            <Button kind="primary"   size="small" onClick={handleConfirm} disabled={!dirty}>Confirm</Button>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Renewal popover (spec §4.2) ─────────────────────────────────────────────
// No header. Two-column key/value table; last row is the Outcome editor.

interface RenewalPanelProps {
  row: OpportunityRow
  outcome: RenewalOutcome
  onOutcomeChange: (v: RenewalOutcome) => void
  onClose: () => void
}

function RenewalPanel({ row, outcome, onOutcomeChange, onClose }: RenewalPanelProps) {
  if (!row.renewal) return null
  const r = row.renewal
  return (
    <div className="opp-pop opp-pop--renewal">
      <div className="opp-renewal-rows">
        <div className="opp-renewal-row">
          <span className="opp-renewal-row__label">Subscription end</span>
          <span className="opp-renewal-row__value">{r.subEnd}</span>
        </div>
        <div className="opp-renewal-row">
          <span className="opp-renewal-row__label">Renewable TCV</span>
          <span className="opp-renewal-row__value">{formatUsdCompact(r.renewableTcvUsd)}</span>
        </div>
        <div className="opp-renewal-row">
          <span className="opp-renewal-row__label">ARR</span>
          <span className="opp-renewal-row__value">{formatUsdCompact(r.arrUsd)}</span>
        </div>
        <RenewalOutcomeEditor
          value={outcome}
          onChange={onOutcomeChange}
          onConfirm={onClose}
          onCancel={onClose}
        />
      </div>
    </div>
  )
}

function ProductOverflowPanel({ products, totalUsd }: { products: Product[]; totalUsd: number }) {
  return (
    <div className="opp-pop opp-pop--product-overflow">
      <div className="opp-pop__heading">
        {products.length} additional {products.length === 1 ? 'product' : 'products'}
      </div>
      <ul className="opp-pop__product-list">
        {products.map(p => {
          const Icon = BRAND_ICON[p.brand]
          return (
            <li key={p.name} className="opp-pop__product-list-item">
              <span className="opp-pop__product-icon" aria-hidden="true">
                {Icon ? <Icon /> : <span className="opp-pop__product-icon--missing" />}
              </span>
              <span className="opp-pop__product-name">{p.name}</span>
              <span className="opp-pop__product-amount">{formatUsdCompact(p.valueUsd)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ─── Product cluster (space-driven +N overflow) ──────────────────────────────
// Spec §4.4: "The cell shows as many tags as fit, then collapses the
// remainder into a +N tag at the end. The decision about how many tags
// fit is space-driven, not a fixed limit. Re-flow on resize."
//
// Implementation: a hidden measurement layer renders every tag (and a
// sample +N badge) at natural width. On mount and on container resize we
// walk those widths against the container's clientWidth, deciding how
// many fit. The visible layer then renders only that count + a +N tag if
// anything was hidden. The measurement layer sits absolutely-positioned
// inside the cluster and is clipped by the cluster's overflow:hidden so
// it never paints anywhere.

const PRODUCT_GAP = 4 // px — matches --ds-spacing-02

interface ProductClusterProps { products: Product[]; totalUsd: number }

function ProductCluster({ products, totalUsd }: ProductClusterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(products.length)

  useLayoutEffect(() => {
    const container = containerRef.current
    const measure = measureRef.current
    if (!container || !measure) return

    const recompute = () => {
      const parentWidth = container.clientWidth
      if (parentWidth <= 0) return

      const tagWidths: number[] = []
      let badgeWidth = 0
      for (const child of Array.from(measure.children) as HTMLElement[]) {
        if (child.dataset.role === 'badge') badgeWidth = child.offsetWidth
        else tagWidths.push(child.offsetWidth)
      }

      // First test: do all tags fit with no badge?
      const allWidth = tagWidths.reduce(
        (s, w, i) => s + w + (i > 0 ? PRODUCT_GAP : 0), 0)
      if (allWidth <= parentWidth) {
        setVisibleCount(prev => (prev === products.length ? prev : products.length))
        return
      }

      // Otherwise reserve room for the badge and count how many fit.
      const limit = parentWidth - badgeWidth - PRODUCT_GAP
      let used = 0
      let fit = 0
      for (let i = 0; i < tagWidths.length; i++) {
        const candidate = used + (i > 0 ? PRODUCT_GAP : 0) + tagWidths[i]
        if (candidate <= limit) {
          used = candidate
          fit++
        } else break
      }
      setVisibleCount(prev => (prev === fit ? prev : fit))
    }

    recompute()
    const ro = new ResizeObserver(recompute)
    ro.observe(container)
    return () => ro.disconnect()
  }, [products])

  const overflow = products.length - visibleCount
  const overflowedProducts = products.slice(visibleCount)

  const renderTagPlain = (p: Product, keyHint: string) => {
    const Icon = BRAND_ICON[p.brand]
    return Icon
      ? <Tags key={keyHint} {...TAG_BASE} icon renderIcon={Icon} label={p.name} />
      : <Tags key={keyHint} {...TAG_BASE} label={p.name} />
  }

  return (
    <div className="opp-product-cluster" ref={containerRef}>
      {products.slice(0, visibleCount).map((p, i) => (
        <HoverShell
          key={`v-${p.name}-${i}`}
          render={() => <ProductPanel product={p} totalUsd={totalUsd} />}>
          {renderTagPlain(p, `v-tag-${p.name}-${i}`)}
        </HoverShell>
      ))}
      {overflow > 0 && (
        <HoverShell
          render={() => <ProductOverflowPanel products={overflowedProducts} totalUsd={totalUsd} />}>
          <Tags {...TAG_BASE} label={`+${overflow}`} />
        </HoverShell>
      )}
      <div ref={measureRef} className="opp-product-cluster__measure" aria-hidden="true">
        {products.map((p, i) => (
          <span key={`m-${p.name}-${i}`}>
            {renderTagPlain(p, `m-inner-${p.name}-${i}`)}
          </span>
        ))}
        <span data-role="badge"><Tags {...TAG_BASE} label="+99" /></span>
      </div>
    </div>
  )
}

// ─── Row sub-component ───────────────────────────────────────────────────────

// ─── Type tag cell (spec §4.2) ──────────────────────────────────────────────
// Net New → plain tag.
// Upsell → 1-second hover → tooltip-with-Modify (interactive).
// Renewal → 700ms hover → key/value popover with the Outcome editor
//           (interactive + persist; closes on outside click / Confirm /
//           Cancel).

interface TypeTagCellProps {
  row: OpportunityRow
  renewalOutcome: RenewalOutcome
  onOutcomeChange: (v: RenewalOutcome) => void
}

function TypeTagCell({ row, renewalOutcome, onOutcomeChange }: TypeTagCellProps) {
  const plain = <Tags {...TAG_BASE} label={TYPE_LABEL[row.type]} />

  if (row.type === 'net-new') return plain

  if (row.type === 'upsell') {
    return (
      <HoverShell
        interactive
        openDelayMs={1000}
        panelClassName="opp-hover-panel--upsell"
        render={({ close }) => <UpsellModifyPanel row={row} onClose={close} />}>
        {plain}
      </HoverShell>
    )
  }

  // renewal
  return (
    <HoverShell
      interactive
      persist
      panelClassName="opp-hover-panel--renewal"
      render={({ close }) => (
        <RenewalPanel
          row={row}
          outcome={renewalOutcome}
          onOutcomeChange={onOutcomeChange}
          onClose={close}
        />
      )}>
      {plain}
    </HoverShell>
  )
}

function OppRow({
  row,
  renewalOutcome,
  onOutcomeChange,
  density,
}: {
  row: OpportunityRow
  renewalOutcome: RenewalOutcome
  onOutcomeChange: (v: RenewalOutcome) => void
  density: DensityKey[]
}) {
  const showTag = (k: DensityKey) => density.includes(k)
  const dayLabel =
    row.activity.daysAgo === 0 ? 'today'
    : row.activity.daysAgo === 1 ? '1 day ago'
    : `${row.activity.daysAgo} days ago`
  const riskLabel =
    row.risks.length === 1 ? '1 risk' : `${row.risks.length} risks`

  const actStyle = activityStyleForDays(row.activity.daysAgo)
  const healthColor = HEALTH_COLOR[row.health.overall]

  return (
    <tr className="opp-row">
      <td>
        {/* Column 1 — opportunity name + account name as neutral
            (gray) links. Both are clickable. The opp-name link is the
            primary affordance; the account link drops to the account
            page. Hover underline is the affordance. */}
        <div className="opp-multiline">
          <a
            href="#"
            className="opp-multiline__name opp-multiline__link"
            onClick={(e) => e.preventDefault()}>
            {row.oppName}
          </a>
          <a
            href="#"
            className="opp-multiline__sub opp-multiline__link"
            onClick={(e) => e.preventDefault()}>
            {row.account}
          </a>
        </div>
      </td>
      <td>
        {/* Column 2 — deal state. Last Activity is NOT here (moved to col 3).
            Each tag is gated on the tag-density filter (spec §3.4).
            Static tags (quote / stage / close date) carry the
            opp-tag--static class so they don't pick up hover states
            from the DS tag scss — they're labels, not affordances. */}
        <div className="opp-tag-cluster">
          {showTag('quoteId')  && (
            <HoverShell
              interactive
              openDelayMs={1000}
              panelClassName="opp-hover-panel--button"
              render={({ close }) => (
                <ActionButtonPanel
                  label="View Quote"
                  onClick={() => { /* hook */ close() }} />
              )}>
              <Tags {...TAG_BASE} label={row.quoteId} />
            </HoverShell>
          )}
          {showTag('oppType')  && (
            <TypeTagCell
              row={row}
              renewalOutcome={renewalOutcome}
              onOutcomeChange={onOutcomeChange}
            />
          )}
          {showTag('stage')    && <Tags {...TAG_BASE} className="opp-tag--static" label={STAGE_LABEL[row.stage]} />}
          {showTag('forecast') && (
            <Tags
              shape={TAG_BASE.shape}
              size={TAG_BASE.size}
              contrast={TAG_BASE.contrast}
              color={FORECAST_COLOR[row.forecast]}
              className="opp-tag--static"
              label={FORECAST_LABEL[row.forecast]}
            />
          )}
          {showTag('closeDate') && (
            <Tags {...TAG_BASE} className="opp-tag--static opp-tag--icon-quiet" icon renderIcon={Calendar} label={`closes ${row.closeDate}`} />
          )}
        </div>
      </td>
      <td>
        {/* Column 3 — activity & blockers. Each sub-cell has its own hover
            surface (spec §4.3) — independent triggers, 700ms delay. */}
        <div className="opp-tag-cluster">
          {/* Last Activity — Clock icon (intuitive for "X days ago").
              In the >7-day buckets the icon swaps to caution / danger
              glyphs and the tag color follows. */}
          {showTag('lastActivity') && (
            <HoverShell
              render={() => (
                <Tooltip
                  pointerDirection="bottom"
                  content={`${row.activity.description} — ${dayLabel}`}
                />
              )}>
              <Tags
                shape={TAG_BASE.shape}
                size={TAG_BASE.size}
                contrast={TAG_BASE.contrast}
                color={actStyle.color}
                className="opp-tag--icon-quiet"
                icon
                renderIcon={actStyle.icon ?? Clock}
                label={dayLabel}
              />
            </HoverShell>
          )}

          {/* Account Health — interactive popover with bar-chart trend + CTA */}
          {showTag('accountHealth') && (
            <HoverShell
              interactive
              render={() => <AccountHealthPanel row={row} />}>
              <Tags
                shape={TAG_BASE.shape}
                size={TAG_BASE.size}
                contrast={TAG_BASE.contrast}
                color={healthColor}
                label={HEALTH_LABEL[row.health.overall]}
              />
            </HoverShell>
          )}

          {/* Risk Factors — non-interactive popover listing applied risks */}
          {showTag('riskCount') && (
            <HoverShell
              render={() => <RiskFactorsPanel risks={row.risks} />}>
              <Tags {...TAG_BASE} label={riskLabel} />
            </HoverShell>
          )}

          {/* Sales Play — DS Tooltip with current status */}
          {showTag('salesPlay') && (
            <HoverShell
              render={() => (
                <Tooltip
                  pointerDirection="bottom"
                  content={SALES_PLAY_STATUS_LABEL[row.salesPlay.status]}
                />
              )}>
              <Tags {...TAG_BASE} label={row.salesPlay.name} />
            </HoverShell>
          )}
        </div>
      </td>
      <td>
        {/* Column 4 — products. Brand icon per product (BrandUnit42 absent
            from @ds/icons exports; unit-42 products render iconless until
            the index lands). Space-driven +N overflow via ProductCluster.
            Each visible product tag and the +N tag carry their own hover
            popover (per-product value of total, or full overflow list).
            Density toggle hides the entire cluster, not individual items. */}
        {showTag('products') && (
          <ProductCluster products={row.products} totalUsd={row.valueUsd} />
        )}
      </td>
      <td className="opp-c-value">
        {/* Value matches the opportunity-name text properties — bold,
            primary text, same scale — so the eye reads value + name as
            a paired primary surface. Full digits with thousand
            separators, tabular nums. */}
        <span className="opp-value">{formatUsdFull(row.valueUsd)}</span>
      </td>
      <td className="opp-c-actions">
        <div className="opp-actions">
          <IconButton kind="ghost-accent" size="sm" iconSize={16} renderIcon={Stars} aria-label="AI" />
          <IconButton kind="ghost-accent" size="sm" iconSize={16} renderIcon={ChevronRight} aria-label="Expand" />
        </div>
      </td>
    </tr>
  )
}

// ─── Main composition ────────────────────────────────────────────────────────

export function AEOpportunityTable({
  rows = DEFAULT_ROWS,
  totalItems = 47,
  summaryLabel = '47 deals · $12.4M',
}: OpportunityTableProps = {}) {
  const [search, setSearch] = useState('')
  const [single, setSingle] = useState<Record<string, string | null>>(INITIAL_SINGLE)
  const [multi, setMulti] = useState<Record<string, string[]>>(INITIAL_MULTI)
  // Default: every leaf selected (all 15). Spec §3.12 says "All
  // (default)"; we encode that as the explicit full list so the trigger
  // chip reports the count and the SelectAll header shows checked.
  const [products, setProducts] = useState<string[]>([...ALL_PRODUCT_LEAVES])
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortKey, setSortKey] = useState<SortKey>('closeDate') // spec §5 default
  const [sortDir, setSortDir] = useState<SortDir>('asc')        // spec §5 default

  // Spec §3.4 — all tags on by default.
  const [density, setDensity] = useState<DensityKey[]>([...ALL_DENSITY_KEYS])
  // Spec §3.10 — grouped account-health filter, three axes × three
  // levels. Defaults skew Overall toward attention; the other axes are
  // wide-open. Apply commits; Cancel discards the draft.
  const [groupedHealth, setGroupedHealth] =
    useState<GroupedHealthSelection>(INITIAL_GROUPED_HEALTH)

  // Renewal outcomes are AE-mutable per row. Seeded from data; commits
  // happen when the AE clicks Confirm in the outcome editor (handled
  // inside RenewalOutcomeEditor; this map is the only source of truth
  // outside it).
  const [renewalOutcomes, setRenewalOutcomes] = useState<Record<string, RenewalOutcome>>(() => {
    const seed: Record<string, RenewalOutcome> = {}
    for (const r of rows) if (r.renewal) seed[r.id] = r.renewal.outcome
    return seed
  })
  const setRenewalOutcome = (id: string, v: RenewalOutcome) =>
    setRenewalOutcomes(prev => ({ ...prev, [id]: v }))

  const setSingleFacet = (id: string, v: string | null) =>
    setSingle(prev => ({ ...prev, [id]: v }))
  const setMultiFacet = (id: string, values: string[]) =>
    setMulti(prev => ({ ...prev, [id]: values }))

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir(key === 'closeDate' ? 'asc' : 'desc')
    }
  }

  // Sort only — filtering wiring lands in a later pass alongside the
  // density / grouped-health filters. Pass 1 is structural; the controls
  // exist and hold state, but the table renders the full row set.
  const sortedRows = useMemo(() => {
    const arr = [...rows]
    arr.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'accountName': cmp = a.account.localeCompare(b.account); break
        case 'oppName':     cmp = a.oppName.localeCompare(b.oppName); break
        case 'closeDate':   cmp = closeDateOrdinal(a.closeDate) - closeDateOrdinal(b.closeDate); break
        case 'value':       cmp = a.valueUsd - b.valueUsd; break
        case 'riskCount':   cmp = a.risks.length - b.risks.length; break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return arr
  }, [rows, sortKey, sortDir])

  type HeaderSortKey = Extract<SortKey, 'oppName' | 'value'>
  const headerType = (key: HeaderSortKey) =>
    sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'basic'

  return (
    <>
      <style>{LAYOUT_CSS}</style>
      <div className="opp-page">
        <div className="opp-page__shell">
          {/* ── Search row: counts left, search centered, sort right ────
               Counts moved out of the filter row; they belong to the
               search context (the slice the AE is looking at), not the
               filter affordances. Search expands to fill the middle so
               the bar reads as a single line of search context. */}
          <div className="opp-search-row">
            <span className="opp-counts" aria-live="polite">{summaryLabel}</span>
            <div className="opp-search-row__search">
              <Search
                size="md"
                placeholder="account, quote id, opportunity name, product…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onClear={() => setSearch('')}
              />
            </div>
            <SortFlyout
              sortKey={sortKey}
              sortDir={sortDir}
              onChange={(k) => {
                setSortKey(k)
                setSortDir(k === 'closeDate' ? 'asc' : 'desc')
              }}
            />
          </div>

          {/* ── Filter row ─────────────────────────────────────────────
               Tag-density now sits inline with the data filters as
               "tags", set off by a vertical divider. The visual
               distinction between "density" and "row filter" is
               carried by the divider + the label "tags" rather than a
               separate row. */}
          <div className="opp-filter-row">
            <div className="opp-filter-group">
              <TagDensityFilter selected={density} onChange={setDensity} />
              <div className="opp-filter-divider" role="presentation" />
              <SingleSelectFilter
                label="forecast"
                options={FORECAST_OPTIONS}
                value={single.forecast}
                onChange={(v) => setSingleFacet('forecast', v)}
              />
              <SingleSelectFilter
                label="stage"
                options={STAGE_OPTIONS}
                value={single.stage}
                onChange={(v) => setSingleFacet('stage', v)}
              />
              <SingleSelectFilter
                label="opportunity type"
                options={TYPE_OPTIONS}
                value={single.oppType}
                onChange={(v) => setSingleFacet('oppType', v)}
              />
              <SingleSelectFilter
                label="last activity"
                options={LAST_ACTIVITY_OPTIONS}
                value={single.lastActivity}
                onChange={(v) => setSingleFacet('lastActivity', v)}
              />
              <Filter
                label="close date"
                options={CLOSE_DATE_OPTIONS}
                selected={multi.closeDate ?? []}
                onApply={values => setMultiFacet('closeDate', values)}
              />
              <GroupedHealthFilter
                value={groupedHealth}
                onApply={setGroupedHealth}
              />
              <Filter
                label="risk factors"
                options={RISK_FILTER_OPTIONS}
                selected={multi.risk ?? []}
                onApply={values => setMultiFacet('risk', values)}
              />
              <ProductFilter selected={products} onApply={setProducts} />
            </div>
          </div>

          {/* ── Table ───────────────────────────────────────────────────
               Headers are Title Case. The four content columns
               (Opportunity, Deal State, Activity & Blockers, Products)
               share equal width; Value and Actions take only what they
               need. Header icons removed — the sort arrow on the two
               sortable headers is sufficient affordance. */}
          <div className="opp-table-shell">
            <table className="opp-table">
              <thead>
                <tr>
                  <th className="opp-c-equal"><Header size="md" type={headerType('oppName')} onHeaderClick={() => toggleSort('oppName')}>Opportunity</Header></th>
                  <th className="opp-c-equal opp-no-sort"><Header size="md" type="basic">Deal State</Header></th>
                  <th className="opp-c-equal opp-no-sort"><Header size="md" type="basic">Activity &amp; Blockers</Header></th>
                  <th className="opp-c-equal opp-no-sort"><Header size="md" type="basic">Products</Header></th>
                  <th className="opp-c-value"><Header size="md" type={headerType('value')} alignment="right" onHeaderClick={() => toggleSort('value')}>Value</Header></th>
                  <th className="opp-c-actions opp-no-sort" />
                </tr>
              </thead>
              <tbody>
                {sortedRows.map(row => (
                  <OppRow
                    key={row.id}
                    row={row}
                    renewalOutcome={renewalOutcomes[row.id] ?? 'unknown'}
                    onOutcomeChange={(v) => setRenewalOutcome(row.id, v)}
                    density={density}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ──────────────────────────────────────────── */}
          <div className="opp-table-footer">
            <Pagination
              totalItems={totalItems}
              currentPage={page}
              rowsPerPage={rowsPerPage}
              recordLabel="deal"
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Layout-only CSS ─────────────────────────────────────────────────────────

const LAYOUT_CSS = `
/* ── IACVT workaround (system bug; fix-at-source needed in component _tokens.scss) */
.stage {
  --panw-flyout-bg: var(--ds-surface-rest);
  --panw-flyout-border: var(--ds-lines-neutral-rest);
  --panw-flyout-text: var(--ds-text-primary);
  --panw-flyout-text-disabled: var(--ds-text-secondary-disabled);
  --panw-flyout-icon: var(--ds-icons-secondary-rest);
  --panw-flyout-item-hover: var(--ds-ghost-hover);
  --panw-flyout-item-pressed: var(--ds-ghost-pressed);
  --panw-flyout-selected-bg: var(--ds-highlight-rest);
  --panw-flyout-selected-fg: var(--ds-text-brand-rest);
  --panw-flyout-divider: var(--ds-lines-neutral-rest);
  --panw-flyout-filter-bg: var(--ds-field-rest);
  --panw-flyout-filter-text: var(--ds-text-primary);
  --panw-flyout-filter-placeholder: var(--ds-text-placeholder-rest);
  --panw-flyout-filter-border: var(--ds-lines-neutral-rest);
}

.opp-page {
  min-height: 100vh;
  background-color: var(--ds-surface-alt-rest);
  font-family: var(--ds-type-font-family-sans);
  padding: var(--ds-spacing-07) var(--ds-spacing-07) var(--ds-spacing-10);
}

/* Shell sits inside a parent card/tile. No own border or background. */
.opp-page__shell {
  background-color: transparent;
  border: 0;
}

/* ── Search row ─────────────────────────────────────────────────────────── *
 * Counts left, search center (flex:1), sort right. The whole row is a
 * single line; the bar reads as the AE's search-context surface. */
.opp-search-row {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-04); /* 12 — proximity between distinct regions */
  padding: var(--ds-spacing-04) var(--ds-spacing-04) var(--ds-spacing-02);
}
.opp-counts {
  /* body-02 bold (DS type scale: 16px / 24px / semibold). Tabular
   * nums so the figures align cleanly. */
  color: var(--ds-text-primary);
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: var(--ds-type-font-weight-semibold);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
}
.opp-search-row__search {
  flex: 1;
  min-width: 0;
}
.opp-search-row__search .panw--search {
  width: 100%;
}

/* Sort trigger — ghost-button shape, opens a single-select Flyout.
 *
 * Padding follows the DS Button default (0.75rem 1rem = 12 16) for
 * horizontal padding so the trigger reads as a peer of the system's
 * default-size buttons. Vertical padding is removed because the
 * trigger stretches to fill the search row's height (the search bar
 * is the tallest child), keeping the button vertically aligned with
 * the search input regardless of which size DS Search renders at. */
.opp-sort-trigger {
  display: inline-flex;
  align-items: center;
  align-self: stretch;
  gap: var(--ds-spacing-02); /* 4 */
  padding: 0 var(--ds-spacing-05); /* 0 16 — matches DS Button default horizontal padding */
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  color: var(--ds-text-secondary-rest);
  border-radius: var(--ds-radius-tight);
  white-space: nowrap;
  transition: background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.opp-sort-trigger:hover {
  background-color: var(--ds-ghost-hover);
  color: var(--ds-text-primary);
}
.opp-sort-trigger[aria-expanded="true"] {
  background-color: var(--ds-ghost-pressed);
  color: var(--ds-text-primary);
}

/* ── Filter row ───────────────────────────────────────────────────────────
 * Tag-density filter sits at the leading edge, set off by a vertical
 * divider, followed by the data-row filters. The two control families
 * share a row but the divider keeps the mental model — density
 * controls how much each row shows; the others narrow the row set. */
.opp-filter-row {
  display: flex;
  align-items: flex-start;
  gap: var(--ds-spacing-03);
  padding: var(--ds-spacing-02) var(--ds-spacing-04) var(--ds-spacing-03);
  flex-wrap: wrap;
}
.opp-filter-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ds-spacing-02);
  row-gap: var(--ds-spacing-02);
  flex: 1;
  min-width: 0;
}
.opp-filter-divider {
  width: 1px;
  align-self: stretch;
  background-color: var(--ds-lines-neutral-rest);
  margin: 0 var(--ds-spacing-02);
  min-height: 24px;
}

/* ── Table ──────────────────────────────────────────────────────────────── */
.opp-table-shell { overflow-x: auto; }
.opp-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
.opp-table thead tr {
  border-bottom: 1px solid var(--ds-lines-neutral-rest);
}
.opp-table th {
  text-align: left;
  padding: 0; /* Header owns its own padding */
  vertical-align: middle;
}
/* Header icon removal — kill the resting up-down indicator on every
 * header. The active up/down arrow on the currently-sorted column
 * remains (it's the only sort affordance the user has). */
.opp-table .panw--header__sort-indicator:not(.panw--header__sort-indicator--active) {
  display: none;
}

/* Equal-width columns for the four content columns; Value reserves
 * 140px for full-precision USD, Actions 80px for two icon buttons.
 * The four equal columns split the remainder. table-layout: fixed
 * honors these widths literally — without it the value column
 * collapses to first-digit width. */
.opp-table th.opp-c-equal,
.opp-table td.opp-c-equal { width: calc((100% - 220px) / 4); }
.opp-table th.opp-c-value,
.opp-table td.opp-c-value {
  text-align: right;
  width: 140px;
  white-space: nowrap;
}
.opp-table th.opp-c-actions,
.opp-table td.opp-c-actions {
  text-align: right;
  width: 80px;
  white-space: nowrap;
}

/* Value column — matches opp-name text properties (semibold primary
 * text), full-precision USD with tabular nums. */
.opp-value {
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
  font-size: 14px;
  line-height: 20px;
}

/* Row dividers, no zebra. Rows are now uniform surface.rest with a
 * hairline divider; hover is the only ground that lights up. */
.opp-table tbody tr { background-color: var(--ds-surface-rest); }
.opp-table tbody tr + tr { border-top: 1px solid var(--ds-lines-neutral-rest); }
.opp-table tbody tr:hover  { background-color: var(--ds-ghost-hover); }
.opp-table tbody tr:active { background-color: var(--ds-ghost-pressed); }

.opp-table td {
  padding: var(--ds-spacing-04); /* 12 */
  vertical-align: middle;
  color: var(--ds-text-secondary-rest);
}

/* Column 1 — opportunity name + account name as gray (text-secondary)
 * clickable links. The opp name carries primary weight; account is
 * lighter. Underline on hover signals interactivity without the
 * "always underlined" link aesthetic that fights the table density. */
.opp-multiline {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03); /* 8 — more breathing room between name and account */
  align-items: flex-start;
}
.opp-multiline__name {
  font-weight: var(--ds-type-font-weight-semibold);
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-primary);
}
.opp-multiline__sub {
  font-weight: var(--ds-type-font-weight-regular);
  font-size: 13px;
  line-height: 18px;
  color: var(--ds-text-secondary-rest);
}
/* DS "black" Link palette — text.link-neutral family.
 * rest:  --ds-text-link-neutral-rest  (resolved by stage to neutral text)
 * hover: --ds-text-link-neutral-hover (shifts to brand on hover, with underline)
 * See @ds/styles/scss/components/link/_link.scss (.panw--link--black). */
.opp-multiline__link {
  color: var(--ds-text-link-neutral-rest);
  text-decoration: none;
  cursor: pointer;
  border-radius: var(--ds-radius-tight);
  transition: color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.opp-multiline__link:hover {
  color: var(--ds-text-link-neutral-hover);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.opp-multiline__link:focus-visible {
  outline: 2px solid var(--ds-lines-brand-rest);
  outline-offset: 2px;
}

.opp-tag-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-spacing-02);
  align-items: center;
}

/* ── Product cluster — single-row, space-driven +N overflow ──────────────
 * Visible layer = flex row, NO wrap, clipped horizontally.
 * Measurement layer = absolutely positioned (zero layout footprint),
 *   visually hidden, used only to read natural offsetWidths.
 * The visible-vs-measure layers share Tag styles, so widths match.
 */
.opp-product-cluster {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--ds-spacing-02);
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
}
.opp-product-cluster__measure {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--ds-spacing-02);
  white-space: nowrap;
  visibility: hidden;
  pointer-events: none;
}

/* ── Hover trigger + portaled panel ─────────────────────────────────────── *
 * The trigger is just an inline-flex span; its real job is to anchor the
 * popover via getBoundingClientRect. The panel itself lives in
 * document.body so it isn't clipped by the table-shell's overflow-x:auto.
 */
.opp-hover-trigger {
  display: inline-flex;
  align-items: center;
}

.opp-hover-panel {
  /* Reset against whatever the host page might inject. */
  font-family: var(--ds-type-font-family-sans);
  color: var(--ds-text-primary);
  /* Entrance: opacity fade + 4px slide from above DOWN into place. The
   * direction reads as "the popover descends out of the trigger" for
   * panels positioned below the trigger (the default placement). */
  animation: opp-hover-in 110ms cubic-bezier(0, 0, 0.38, 0.9);
}
@keyframes opp-hover-in {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .opp-hover-panel { animation: none; }
}

/* ── Hand-rolled popover panel (used for Account Health, Risk Factors,
 *    Product, +N overflow). DS Tooltip handles its own styling and
 *    renders directly inside the portal; this panel is for the rich
 *    surfaces. Visual lineage: surface.rest + shadow-flyout + radius-
 *    standard, 16px padding (structured per stage-spacing.md flyout/
 *    popover rules). */
.opp-pop {
  background-color: var(--ds-surface-rest);
  border: 1px solid var(--ds-lines-neutral-tile-rest);
  border-radius: var(--ds-radius-standard);
  box-shadow: var(--ds-shadow-flyout);
  padding: var(--ds-spacing-05); /* 16 */
  font-size: 13px;
  line-height: 20px;
  color: var(--ds-text-primary);
  min-width: 220px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-04); /* 12 */
}
.opp-pop__heading {
  font-weight: var(--ds-type-font-weight-semibold);
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-primary);
}
.opp-pop__sub {
  font-size: 12px;
  line-height: 16px;
  color: var(--ds-text-tertiary-rest);
  margin-top: calc(-1 * var(--ds-spacing-03)); /* tighten under heading */
}
.opp-pop__chart {
  display: flex;
  margin: var(--ds-spacing-01) 0;
}
.opp-pop__rows {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03); /* 8 */
}
.opp-pop__kv {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ds-spacing-04);
  min-height: 28px;
}
.opp-pop__kv-label {
  font-size: 12px;
  line-height: 16px;
  color: var(--ds-text-secondary-rest);
}
.opp-pop__cta {
  display: flex;
  justify-content: flex-end;
}

/* Risk factors list */
.opp-pop__risk-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03);
}
.opp-pop__risk-item {
  display: flex;
  align-items: flex-start;
  gap: var(--ds-spacing-03);
  font-size: 13px;
  line-height: 18px;
}
.opp-pop__risk-emoji {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 14px;
  line-height: 1;
}
.opp-pop__risk-label {
  flex: 1;
  color: var(--ds-text-primary);
}

/* Product popover (single product) */
.opp-pop--product {
  min-width: 240px;
  gap: var(--ds-spacing-02);
}
.opp-pop__product-row {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-03);
}
.opp-pop__product-icon {
  display: inline-flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
}
.opp-pop__product-icon--missing {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--ds-lines-neutral-rest);
}
.opp-pop__product-name {
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
}
.opp-pop__product-meta {
  display: flex;
  align-items: baseline;
  gap: var(--ds-spacing-02);
  padding-left: calc(18px + var(--ds-spacing-03)); /* align under name */
}
.opp-pop__product-amount {
  font-variant-numeric: tabular-nums;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
}
.opp-pop__product-share {
  font-size: 12px;
  color: var(--ds-text-tertiary-rest);
}

/* Product overflow popover (full list of overflowed products) */
.opp-pop--product-overflow { min-width: 280px; }
.opp-pop__product-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03);
}
.opp-pop__product-list-item {
  display: grid;
  grid-template-columns: 18px 1fr auto;
  align-items: center;
  gap: var(--ds-spacing-03);
  font-size: 13px;
  line-height: 20px;
}
.opp-pop__product-list-item .opp-pop__product-name {
  font-weight: var(--ds-type-font-weight-regular);
  color: var(--ds-text-secondary-rest);
}
.opp-pop__product-list-item .opp-pop__product-amount {
  color: var(--ds-text-primary);
}

/* Hover-only row actions */
.opp-actions {
  display: inline-flex;
  gap: var(--ds-spacing-02);
  opacity: 0;
  transition: opacity 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.opp-table tbody tr:hover .opp-actions,
.opp-table tbody tr:focus-within .opp-actions { opacity: 1; }

/* ── Pagination ─────────────────────────────────────────────────────────── */
.opp-table-footer {
  border-top: 1px solid var(--ds-lines-neutral-rest);
  position: relative;
}

/* Rows-per-page dropdown opens upward (system gap: no placement prop on
   Pagination/Dropdown). Targets internal class names — fragile. */
.opp-table-footer .panw--pagination__dropdown-wrapper .panw--dropdown__menu,
.opp-table-footer .panw--pagination__dropdown-wrapper .panw--flyout {
  bottom: 100%;
  top: auto !important;
  margin-bottom: var(--ds-spacing-02);
}

/* ── Product tree (custom — every node has a checkbox) ────────────────────
 * Row sizing mirrors .panw--flyout__item exactly (8/12 padding, 8 gap,
 * no forced min-height) so the tree reads as a peer of every other
 * flyout list. */
/* The tree replaces FlyoutList for this filter (DS FlyoutList is flat,
 * doesn't support group/leaf nesting). Mirror FlyoutList's flex
 * behavior so the tree takes remaining height inside the panel and
 * scrolls internally when content exceeds max-height — which is what
 * keeps the FlyoutFooter (Apply / Cancel) anchored at the bottom
 * instead of being pushed past the panel's overflow:hidden boundary. */
.opp-tree {
  display: flex;
  flex-direction: column;
  padding: var(--ds-spacing-02) 0;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}
.opp-tree__row {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-03);
  padding: var(--ds-spacing-03) var(--ds-spacing-04);
  cursor: pointer;
  border-radius: var(--ds-radius-tight);
}
.opp-tree__row:hover { background-color: var(--ds-ghost-hover); }
.opp-tree__row--root { font-weight: var(--ds-type-font-weight-semibold); }
.opp-tree__row--group { padding-left: var(--ds-spacing-04); }
.opp-tree__row--leaf { padding-left: var(--ds-spacing-08); /* 32 — child indent */ }

/* Icon-only SelectAll header — mirrors @ds/flyout's FlyoutSelectAll
 * markup: a single tri-state checkbox row above the list, with an
 * implicit hairline below. */
.opp-tree__select-all {
  display: flex;
  align-items: center;
  padding: var(--ds-spacing-03) var(--ds-spacing-04);
  cursor: pointer;
}
.opp-tree__select-all:hover { background-color: var(--ds-ghost-hover); }
.opp-tree__select-all-divider {
  height: 1px;
  background-color: var(--ds-lines-neutral-rest);
}
.opp-tree__row-action {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-spacing-02);
  flex: 1;
}
.opp-tree__chev {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: var(--ds-icons-secondary-rest);
  padding: 0;
  border-radius: var(--ds-radius-tight);
}
.opp-tree__chev:hover { background-color: var(--ds-ghost-hover); }
.opp-tree__chev-spacer { display: inline-block; width: 24px; height: 24px; }
.opp-tree__icon { color: var(--ds-icons-secondary-rest); display: inline-flex; }
.opp-tree__label { color: var(--ds-text-primary); }
.opp-tree__label--bold { font-weight: var(--ds-type-font-weight-semibold); }

/* ── Button-only action popover (spec §4.2 + design call) ─────────────────
 * Single ghost-brand button on a surface.rest ground. No copy, no
 * heading. Used for Upsell type tag (Modify) and Quote ID tag
 * (View Quote). Intrinsic width — sized to the button. */
.opp-pop--action {
  min-width: 0;
  max-width: none;
  padding: var(--ds-spacing-02); /* 4 — tight halo around the button */
  gap: 0;
}
.opp-pop--action .panw--btn { width: 100%; }

/* ── Renewal popover (spec §4.2) ──────────────────────────────────────────
 * No heading. Tight two-column key/value rows. The final row (Outcome)
 * is the interactive control; subsequent rows below are the expanded
 * edit form.
 */
.opp-pop--renewal {
  min-width: 360px;
  max-width: 420px;
  padding: var(--ds-spacing-05);
  gap: 0;
}
.opp-renewal-rows {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03); /* 8 */
}
.opp-renewal-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ds-spacing-04);
  min-height: 24px;
}
.opp-renewal-row__label {
  font-size: 13px;
  color: var(--ds-text-secondary-rest);
}
.opp-renewal-row__value {
  font-size: 13px;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
}
.opp-renewal-row--outcome {
  margin-top: var(--ds-spacing-02);
  padding-top: var(--ds-spacing-04);
  border-top: 1px solid var(--ds-lines-neutral-rest);
}

/* Outcome trigger — tag with trailing chevron. The DS Tags component
 * only renders icons in the leading slot, so we hand-author the BEM
 * markup to put the chevron at the end. Mirrors the pattern from
 * AE Opportunities Panel.
 */
.opp-outcome-wrapper { position: relative; }
.opp-outcome-trigger {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border-radius: var(--ds-radius-tight);
}
.opp-outcome-trigger:focus-visible {
  outline: 2px solid var(--ds-lines-brand-rest);
  outline-offset: 2px;
}
.opp-outcome-trigger .panw--tag { cursor: pointer; }
.opp-outcome-trigger .panw--tag__icon {
  margin-left: var(--ds-spacing-02);
}

/* Renewal edit form — revealed once the AE picks a non-Unknown outcome
 * (or starts editing notes on an already-set outcome). Fields stack at
 * full width; actions right-aligned. */
.opp-renewal-form {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-04);
  margin-top: var(--ds-spacing-04);
  padding-top: var(--ds-spacing-04);
  border-top: 1px solid var(--ds-lines-neutral-rest);
}
.opp-renewal-form .panw--dropdown,
.opp-renewal-form .panw--text-entry { width: 100%; }
.opp-renewal-form__actions {
  display: flex;
  gap: var(--ds-spacing-02);
  justify-content: flex-end;
}

/* ── Tag-density filter trigger ──────────────────────────────────────────
 * Sits inline with the data filters; the leading Sliders icon + the
 * label "tags" reads as a peer control with a different verb. The
 * trigger uses the standard panw--filter shell so it doesn't fight
 * the row's rhythm; the verbal/visual distinction does the work. */
.opp-density-filter__icon {
  display: inline-flex;
  align-items: center;
  color: var(--ds-icons-secondary-rest);
  margin-right: var(--ds-spacing-02);
}

/* ── Lighter-icon override for label tags ────────────────────────────────
 * The DS tag-neutral-low icon defaults to icons.primary (neutral90)
 * per the matching-family rule, but for label-style tags like close
 * date and last activity the icon should sit one stop lighter so it
 * reads as supporting, not equal-weight to the label text. Override
 * to icons.secondary.rest (≈ neutral70). State variants preserved. */
.panw--tag.opp-tag--icon-quiet.panw--tag--low.panw--tag--neutral .panw--tag__icon,
.panw--tag.opp-tag--icon-quiet.panw--tag--low.panw--tag--neutral .panw--tag__close-btn {
  color: var(--ds-icons-secondary-rest);
}

/* Filter-chip hover popover lives entirely in the DS — see
 * @ds/styles/scss/components/filter/_filter.scss for the
 * .panw--filter__chip-popover ruleset. No local override needed. */

/* ── Static-tag override ─────────────────────────────────────────────────
 * Tags rendered without a hover surface should not pick up the DS
 * Tag's default :hover bg shift — they're labels, not affordances.
 * Apply the .opp-tag--static class to lock the rest tokens across
 * states. */
.panw--tag.opp-tag--static:hover  {
  background-color: var(--ds-field-alt-rest);
}
.panw--tag.opp-tag--static.panw--tag--low.panw--tag--neutral:hover {
  background-color: var(--ds-field-alt-rest);
}
/* Re-apply the rest icon color on hover to prevent the DS Tag scss
 * from rolling the icon to hover when we've locked the bg to rest. */
.panw--tag.opp-tag--static .panw--tag__icon,
.panw--tag.opp-tag--static:hover .panw--tag__icon {
  color: var(--ds-icons-primary);
}
/* Categorical-color statics (forecast bronze/teal/olive) need the
 * same lock against the hover bg darkening from the matrix mixin. */
.panw--tag.opp-tag--static.panw--tag--low.panw--tag--bronze:hover  { background-color: var(--ds-tag-bronze-low-bg); }
.panw--tag.opp-tag--static.panw--tag--low.panw--tag--teal:hover    { background-color: var(--ds-tag-teal-low-bg); }
.panw--tag.opp-tag--static.panw--tag--low.panw--tag--olive:hover   { background-color: var(--ds-tag-olive-low-bg); }

/* Cursor stays default on static tags — they're not interactive. */
.panw--tag.opp-tag--static { cursor: default; }

/* ── Health-trend bar chart (account-health popover) ─────────────────────
 * No special styles — the SVG carries its own geometry. Reserved for
 * the wrapper so the chart anchors cleanly under the sub-heading. */
.opp-health-bars { display: block; }
`

// ─── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta = { title: 'compositions/AE Opportunity Table', excludeStories: ['AEOpportunityTable'] }
export default meta

export const Default: StoryObj = {
  render: () => <AEOpportunityTable />
}
