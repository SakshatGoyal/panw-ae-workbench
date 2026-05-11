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
 * ── Deferred to later passes ─────────────────────────────────────────────
 *   • Tag filter as density control + Account Health grouped filter (Pass 5)
 *   • Per-cell and per-tag hover popovers (Pass 3)
 *   • Renewal Outcome editor + Upsell Modify tooltip (Pass 4)
 *   • Account Health 12-month trend chart (Pass 3)
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
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Calendar, Stars, ChevronDown, ChevronUp, ChevronRight, Folder,
  ExclamationTriangle, ExclamationCircle,
  BrandStrata, BrandPrisma, BrandCortex,
} from '@ds/icons'
import { Search } from '@ds/search'
import { Filter, type FilterOption } from '@ds/filter'
import { Header } from '@ds/header'
import { CellContents } from '@ds/cell-contents'
import { Pagination } from '@ds/pagination'
import { Button, IconButton } from '@ds/button'
import { Tags } from '@ds/tags'
import { Tooltip } from '@ds/tooltip'
import { Checkbox } from '@ds/checkbox'
import {
  Flyout,
  FlyoutFilter,
  FlyoutList,
  FlyoutItem,
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
  | 'unknown' | 'full' | 'downsell' | 'churn' | 'displacement' | 'duplicate'

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

interface OpportunityRow {
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

const ROWS: OpportunityRow[] = [
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

// Flat 3-option health filter. The grouped (Overall / Technical / Adoption)
// shape per spec §3.10 lands in Pass 5 — keep the v1 widget here so the
// default (At Risk + Critical on Overall) still expresses the spec intent.
const HEALTH_OPTIONS: FilterOption[] = [
  { value: 'healthy',  label: 'healthy' },
  { value: 'at-risk',  label: 'at risk' },
  { value: 'critical', label: 'critical' },
]

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
  health:    ['at-risk', 'critical'],
  risk:      [],
}

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
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(PRODUCT_TREE.map(g => g.value))
  )
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      setDraft(selected)
      setSearch('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const allSelected = ALL_PRODUCT_LEAVES.every(v => draft.includes(v))
  const someSelected = draft.length > 0 && !allSelected
  const allStatus =
    allSelected ? 'checked' : someSelected ? 'indeterminate' : 'unchecked'

  const toggleAll = () => setDraft(allSelected ? [] : [...ALL_PRODUCT_LEAVES])

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

  const toggleExpand = (val: string) =>
    setExpanded(s => {
      const n = new Set(s)
      if (n.has(val)) n.delete(val); else n.add(val)
      return n
    })

  const matches = (label: string) =>
    !search.trim() || label.toLowerCase().includes(search.trim().toLowerCase())

  const apply = () => { onApply(draft); setOpen(false) }
  const cancel = () => setOpen(false)

  const triggerLabel = 'products'

  return (
    <span className="panw--filter__wrapper">
      <button
        ref={triggerRef}
        type="button"
        className={`panw--filter${open ? ' panw--filter--open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}>
        <span className="panw--filter__label">{triggerLabel}</span>
        {selected.length > 0 && (
          <span className="panw--filter__values">
            <span className="panw--filter__chip-target">
              <Tags
                label={
                  selected.length === 1
                    ? PRODUCT_TREE.flatMap(g => g.children ?? []).find(c => c.value === selected[0])?.label ?? '1'
                    : String(selected.length)
                }
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
        placement="bottom-start">
        <FlyoutFilter
          placeholder="Filter"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
        <div className="opp-tree" role="tree">
          <div className="opp-tree__row opp-tree__row--root" onClick={toggleAll} role="treeitem" aria-checked={allStatus === 'checked'}>
            <span className="opp-tree__chev-spacer" />
            <Checkbox status={allStatus} label="" tabIndex={-1} />
            <span className="opp-tree__label opp-tree__label--bold">All Products</span>
          </div>
          {PRODUCT_TREE.map(group => {
            const visibleChildren = (group.children ?? []).filter(c => matches(c.label))
            const groupVisible = matches(group.label) || visibleChildren.length > 0
            if (!groupVisible) return null
            const isOpen = expanded.has(group.value)
            return (
              <div key={group.value} className="opp-tree__group" role="group">
                <div className="opp-tree__row opp-tree__row--group" role="treeitem" aria-expanded={isOpen}>
                  <button
                    type="button"
                    className="opp-tree__chev"
                    aria-label={isOpen ? `Collapse ${group.label}` : `Expand ${group.label}`}
                    onClick={(e) => { e.stopPropagation(); toggleExpand(group.value) }}>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <span
                    className="opp-tree__row-action"
                    onClick={() => toggleGroup(group)}>
                    <Checkbox
                      status={groupStatus(group)}
                      label=""
                      tabIndex={-1}
                    />
                    <span className="opp-tree__icon" aria-hidden="true"><Folder size={16} /></span>
                    <span className="opp-tree__label opp-tree__label--bold">{group.label}</span>
                  </span>
                </div>
                {isOpen && (
                  <div className="opp-tree__children">
                    {visibleChildren.map(leaf => (
                      <div
                        key={leaf.value}
                        className="opp-tree__row opp-tree__row--leaf"
                        role="treeitem"
                        aria-checked={draft.includes(leaf.value)}
                        onClick={() => toggleLeaf(leaf.value)}>
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
          })}
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
  render: () => React.ReactNode
  interactive?: boolean
  side?: HoverShellSide
  align?: HoverShellAlign
  /** Optional class on the portaled wrapper. */
  panelClassName?: string
}

function HoverShell({
  children,
  render,
  interactive = false,
  side = 'bottom',
  align = 'start',
  panelClassName,
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
    openTimerRef.current = setTimeout(() => setOpen(true), HOVER_OPEN_DELAY_MS)
  }
  const handleTriggerLeave = () => {
    clearOpenTimer()
    if (!open) return
    if (interactive) {
      clearCloseTimer()
      closeTimerRef.current = setTimeout(() => setOpen(false), HOVER_CLOSE_GRACE_MS)
    } else {
      setOpen(false)
    }
  }
  const handlePanelEnter = () => {
    if (!interactive) return
    clearCloseTimer()
  }
  const handlePanelLeave = () => {
    if (!interactive) return
    setOpen(false)
  }

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
            pointerEvents: interactive ? 'auto' : 'none',
            zIndex: 9999,
          }}
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handlePanelLeave}>
          {render()}
        </div>,
        document.body
      )}
    </>
  )
}

// ─── Sparkline — 12-month health trend ───────────────────────────────────────
// 12 values, 0=healthy → 2=critical. Plotted so HEALTHY sits at the TOP
// and CRITICAL at the BOTTOM — a "falling line" reads as a deteriorating
// account, which matches the AE's intuition.
//
// Three dashed horizontal guides mark the healthy / at-risk / critical
// rows. Line color matches the LATEST value's tag color so the chart's
// terminal feeling agrees with the row's overall-health pill.

// `text.success-rest` / `text.warning-rest` are not defined in this DS build;
// the status-text family ships only the static tokens (no `rest` variants).
// Using `text.status.<x>` here mirrors the matching-family rule (status pills
// on subtle grounds use status text tokens) and the colors read as the
// same severity language as the Tag pills next to the chart.
const HEALTH_LINE_STROKE: Record<Health, string> = {
  'healthy':  'var(--ds-text-status-success)',
  'at-risk':  'var(--ds-text-status-warning)',
  'critical': 'var(--ds-text-status-danger)',
}

function Sparkline({ trend, latest }: { trend: number[]; latest: Health }) {
  // 12 monthly readings, oldest → newest. 0=healthy, 1=at-risk, 2=critical.
  // Plotted with HEALTHY at the TOP, CRITICAL at the BOTTOM — a "falling
  // line" matches the AE's intuition for a deteriorating account.
  //
  // Visual: three quiet dashed guides mark healthy / at-risk / critical
  // levels (no text labels — the popover sub-heading "12-month health
  // trend" plus the colored end-dot carries the meaning). A faint area
  // fill beneath the line adds visual weight without dominating.
  const w = 264
  const h = 68
  const padX = 6
  const padY = 6
  const usableW = w - padX * 2
  const usableH = h - padY * 2
  // Inner inset for the DATA plot — the dashed guides sit at the chart
  // edges (healthy at top, critical at bottom), but the data line is
  // plotted slightly inside those guides so a flat-healthy line is
  // visibly distinct from the top guide (and a flat-critical line is
  // distinct from the bottom guide). Without this inset a perfect-health
  // trend renders invisibly on top of the guide and reads as "no data".
  const innerInset = 5
  const innerH = Math.max(1, usableH - innerInset * 2)
  const maxV = 2

  const pts = trend.map((v, i) => {
    const x = padX + (i / Math.max(1, trend.length - 1)) * usableW
    const y = padY + innerInset + (v / maxV) * innerH
    return { x, y }
  })

  const lineD = pts.length
    ? 'M ' + pts.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')
    : ''
  // Area fill closes the line down to the critical guide (chart floor).
  const floorY = padY + usableH
  const areaD = pts.length
    ? `${lineD} L ${(padX + usableW).toFixed(1)} ${floorY.toFixed(1)} L ${padX.toFixed(1)} ${floorY.toFixed(1)} Z`
    : ''
  const stroke = HEALTH_LINE_STROKE[latest]
  const last = pts[pts.length - 1]

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label="12-month account health trend"
      className="opp-sparkline">
      {/* Quiet level guides — healthy / at-risk / critical (no labels) */}
      {[0, 1, 2].map(v => {
        const y = padY + (v / maxV) * usableH
        return (
          <line
            key={v}
            x1={padX} x2={padX + usableW}
            y1={y} y2={y}
            stroke="var(--ds-lines-neutral-tile-rest)"
            strokeWidth="1"
            strokeDasharray="2 3" />
        )
      })}
      {areaD && (
        <path d={areaD} fill={stroke} opacity="0.08" />
      )}
      {lineD && (
        <path
          d={lineD}
          fill="none"
          stroke={stroke}
          strokeWidth="1.75"
          strokeLinejoin="round"
          strokeLinecap="round" />
      )}
      {last && (
        <>
          <circle cx={last.x} cy={last.y} r="3.5" fill="var(--ds-surface-rest)" />
          <circle cx={last.x} cy={last.y} r="2.5" fill={stroke} />
        </>
      )}
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
      <div className="opp-pop__chart"><Sparkline trend={h.trend12mo} latest={h.overall} /></div>
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
          render={() => <ProductOverflowPanel products={overflowedProducts} totalUsd={totalUsd} />}
          align="end">
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

function OppRow({ row }: { row: OpportunityRow }) {
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
        <div className="opp-multiline">
          <span className="opp-multiline__name">{row.oppName}</span>
          <span className="opp-multiline__sub">{row.account}</span>
        </div>
      </td>
      <td>
        {/* Column 2 — deal state. Last Activity is NOT here (moved to col 3). */}
        <div className="opp-tag-cluster">
          <Tags {...TAG_BASE} label={row.quoteId} />
          <Tags {...TAG_BASE} label={TYPE_LABEL[row.type]} />
          <Tags {...TAG_BASE} label={STAGE_LABEL[row.stage]} />
          <Tags {...TAG_BASE} label={FORECAST_LABEL[row.forecast]} />
          <Tags {...TAG_BASE} icon renderIcon={Calendar} label={`closes ${row.closeDate}`} />
        </div>
      </td>
      <td>
        {/* Column 3 — activity & blockers. Each sub-cell has its own hover
            surface (spec §4.3) — independent triggers, 700ms delay. */}
        <div className="opp-tag-cluster">
          {/* Last Activity — DS Tooltip (non-interactive label) */}
          <HoverShell
            render={() => (
              <Tooltip
                pointerDirection="top"
                content={`${row.activity.description} — ${dayLabel}`}
              />
            )}
            align="start">
            {actStyle.icon ? (
              <Tags
                shape={TAG_BASE.shape}
                size={TAG_BASE.size}
                contrast={TAG_BASE.contrast}
                color={actStyle.color}
                icon
                renderIcon={actStyle.icon}
                label={dayLabel}
              />
            ) : (
              <Tags {...TAG_BASE} label={dayLabel} />
            )}
          </HoverShell>

          {/* Account Health — interactive popover with sparkline + CTA */}
          <HoverShell
            interactive
            align="start"
            render={() => <AccountHealthPanel row={row} />}>
            <Tags
              shape={TAG_BASE.shape}
              size={TAG_BASE.size}
              contrast={TAG_BASE.contrast}
              color={healthColor}
              label={HEALTH_LABEL[row.health.overall]}
            />
          </HoverShell>

          {/* Risk Factors — non-interactive popover listing applied risks */}
          <HoverShell
            align="start"
            render={() => <RiskFactorsPanel risks={row.risks} />}>
            <Tags {...TAG_BASE} label={riskLabel} />
          </HoverShell>

          {/* Sales Play — DS Tooltip with current status */}
          <HoverShell
            align="start"
            render={() => (
              <Tooltip
                pointerDirection="top"
                content={SALES_PLAY_STATUS_LABEL[row.salesPlay.status]}
              />
            )}>
            <Tags {...TAG_BASE} label={row.salesPlay.name} />
          </HoverShell>
        </div>
      </td>
      <td>
        {/* Column 4 — products. Brand icon per product (BrandUnit42 absent
            from @ds/icons exports; unit-42 products render iconless until
            the index lands). Space-driven +N overflow via ProductCluster.
            Each visible product tag and the +N tag carry their own hover
            popover (per-product value of total, or full overflow list). */}
        <ProductCluster products={row.products} totalUsd={row.valueUsd} />
      </td>
      <td className="opp-c-value">
        <CellContents content="numbers" text={formatUsdCompact(row.valueUsd)} />
      </td>
      <td className="opp-c-actions">
        <div className="opp-actions">
          <IconButton kind="ghost-brand" size="sm" iconSize={16} renderIcon={Stars} aria-label="AI" />
          <IconButton kind="ghost-brand" size="sm" iconSize={16} renderIcon={ChevronRight} aria-label="Expand" />
        </div>
      </td>
    </tr>
  )
}

// ─── Main composition ────────────────────────────────────────────────────────

function AEOpportunityTable() {
  const [search, setSearch] = useState('')
  const [single, setSingle] = useState<Record<string, string | null>>(INITIAL_SINGLE)
  const [multi, setMulti] = useState<Record<string, string[]>>(INITIAL_MULTI)
  const [products, setProducts] = useState<string[]>([]) // empty = All
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortKey, setSortKey] = useState<SortKey>('closeDate') // spec §5 default
  const [sortDir, setSortDir] = useState<SortDir>('asc')        // spec §5 default

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
    const arr = [...ROWS]
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
  }, [sortKey, sortDir])

  type HeaderSortKey = Extract<SortKey, 'oppName' | 'value'>
  const headerType = (key: HeaderSortKey) =>
    sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'basic'

  return (
    <>
      <style>{LAYOUT_CSS}</style>
      <div className="opp-page">
        <div className="opp-page__shell">
          {/* ── Search row: search grows full width, sort right-aligned ── */}
          <div className="opp-search-row">
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

          {/* ── Filter row ─────────────────────────────────────────────── */}
          <div className="opp-filter-row">
            <div className="opp-filter-group">
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
              <Filter
                label="account health"
                options={HEALTH_OPTIONS}
                selected={multi.health ?? []}
                onApply={values => setMultiFacet('health', values)}
              />
              <Filter
                label="risk factors"
                options={RISK_FILTER_OPTIONS}
                selected={multi.risk ?? []}
                onApply={values => setMultiFacet('risk', values)}
              />
              <ProductFilter selected={products} onApply={setProducts} />
            </div>
            <span className="opp-counts">47 deals · $12.4M ARR</span>
          </div>

          {/* ── Table ─────────────────────────────────────────────────── */}
          <div className="opp-table-shell">
            <table className="opp-table">
              <thead>
                <tr>
                  <th><Header size="md" type={headerType('oppName')} onHeaderClick={() => toggleSort('oppName')}>opportunity</Header></th>
                  <th className="opp-no-sort"><Header size="md" type="basic">deal state</Header></th>
                  <th className="opp-no-sort"><Header size="md" type="basic">activity &amp; blockers</Header></th>
                  <th className="opp-no-sort"><Header size="md" type="basic">products</Header></th>
                  <th className="opp-c-value"><Header size="md" type={headerType('value')} alignment="right" onHeaderClick={() => toggleSort('value')}>value</Header></th>
                  <th className="opp-c-actions opp-no-sort" />
                </tr>
              </thead>
              <tbody>
                {sortedRows.map(row => <OppRow key={row.id} row={row} />)}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ──────────────────────────────────────────── */}
          <div className="opp-table-footer">
            <Pagination
              totalItems={47}
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
 * Search grows to fill 100% of available space; sort sits to the right.
 * Override @ds/search's hardcoded width: 240px so it actually fills. */
.opp-search-row {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-03); /* 8 — proximity between distinct controls */
  padding: var(--ds-spacing-04) var(--ds-spacing-04) var(--ds-spacing-02); /* 12 12 4 — tighter bottom to reduce gap to filter row */
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
 * Height tracking: align-self: stretch makes the trigger fill the search
 * row's cross-axis (vertical) height. The row's height is set by its
 * tallest child — the Search input — so the sort button always matches
 * the current search-bar height, no matter what size/padding the DS
 * Search component evolves to. Robust by construction; no magic number,
 * no fixed height to drift. Vertical padding is removed because the
 * stretch handles outer height, and content stays centered via the
 * inline-flex align-items: center on the button itself. */
.opp-sort-trigger {
  display: inline-flex;
  align-items: center;
  align-self: stretch;
  gap: var(--ds-spacing-02); /* 4 */
  padding: 0 var(--ds-spacing-03); /* 0 8 — horizontal only; vertical comes from stretch */
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

/* ── Filter row ─────────────────────────────────────────────────────────── *
 * Counts top-aligned with 8px from row top per design call.
 * Filters wrap (no horizontal scroll — that pushed triggers off-screen). */
.opp-filter-row {
  display: flex;
  align-items: flex-start;
  gap: var(--ds-spacing-03);
  padding: var(--ds-spacing-02) var(--ds-spacing-04) var(--ds-spacing-03); /* 4 12 8 — tight to search row */
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
.opp-counts {
  margin-left: auto;
  padding-top: var(--ds-spacing-03); /* 8 — top-aligned with first row of filter chips */
  color: var(--ds-text-secondary-rest);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Table ──────────────────────────────────────────────────────────────── */
.opp-table-shell { overflow-x: auto; }
.opp-table { width: 100%; border-collapse: collapse; }
.opp-table thead tr {
  border-bottom: 1px solid var(--ds-lines-neutral-rest);
}
.opp-table th {
  text-align: left;
  padding: 0; /* Header owns its own padding */
}
.opp-table th.opp-no-sort .panw--header__sort-indicator { display: none; }

/* Numeric column right-alignment */
.opp-table th.opp-c-value,
.opp-table td.opp-c-value { text-align: right; }

/* Pass 1 — value cell is quiet per spec §4.5 (body-02, text.secondary).
   Inherits Tags/CellContents defaults; no special weight or size override. */
.opp-table td.opp-c-value .panw--cell-contents__text {
  color: var(--ds-text-secondary-rest);
  font-variant-numeric: tabular-nums;
}

.opp-table th.opp-c-actions,
.opp-table td.opp-c-actions {
  text-align: right;
  width: 1%;
  white-space: nowrap;
}

/* Row interaction (matches @ds/cells-standard) */
.opp-table tbody tr:nth-child(odd)  { background-color: var(--ds-surface-rest); }
.opp-table tbody tr:nth-child(even) { background-color: var(--ds-surface-alt-rest); }
.opp-table tbody tr:hover           { background-color: var(--ds-ghost-hover); }
.opp-table tbody tr:active          { background-color: var(--ds-ghost-pressed); }

.opp-table td {
  padding: var(--ds-spacing-04); /* 12 */
  vertical-align: middle;
  color: var(--ds-text-secondary-rest);
}

/* Column 1 — quieted per spec §4.1: opp name = secondary bold,
   account = tertiary label-02. */
.opp-multiline {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-01); /* 2 */
  align-items: flex-start;
}
.opp-multiline__name {
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-secondary-rest);
}
.opp-multiline__sub {
  font-weight: var(--ds-type-font-weight-regular);
  font-size: 12px;
  line-height: 16px;
  color: var(--ds-text-tertiary-rest);
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
  /* Entrance: matches the DS Flyout 8px directional slide + opacity fade. */
  animation: opp-hover-in 110ms cubic-bezier(0, 0, 0.38, 0.9);
}
@keyframes opp-hover-in {
  from { opacity: 0; transform: translateY(4px); }
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

/* Sparkline — sits in opp-pop__chart wrapper */
.opp-sparkline {
  display: block;
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

/* ── Product tree (custom — every node has a checkbox) ──────────────────── */
.opp-tree {
  display: flex;
  flex-direction: column;
  padding: var(--ds-spacing-02) 0;
}
.opp-tree__row {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-02); /* 4 */
  padding: var(--ds-spacing-02) var(--ds-spacing-03); /* 4 8 — flyout item rhythm */
  cursor: pointer;
  border-radius: var(--ds-radius-tight);
}
.opp-tree__row:hover { background-color: var(--ds-ghost-hover); }
.opp-tree__row--root { font-weight: var(--ds-type-font-weight-semibold); }
.opp-tree__row--group { padding-left: var(--ds-spacing-03); }
.opp-tree__row--leaf { padding-left: var(--ds-spacing-06); /* 24 — indent level */ }
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
  width: 16px;
  height: 16px;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: var(--ds-icons-secondary-rest);
  padding: 0;
  border-radius: var(--ds-radius-tight);
}
.opp-tree__chev:hover { background-color: var(--ds-ghost-hover); }
.opp-tree__chev-spacer { display: inline-block; width: 16px; height: 16px; }
.opp-tree__icon { color: var(--ds-icons-secondary-rest); display: inline-flex; }
.opp-tree__label { color: var(--ds-text-primary); }
.opp-tree__label--bold { font-weight: var(--ds-type-font-weight-semibold); }
`

// ─── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta = { title: 'compositions/AE Opportunity Table' }
export default meta

export const Default: StoryObj = {
  render: () => <AEOpportunityTable />
}
