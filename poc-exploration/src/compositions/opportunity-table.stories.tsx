/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CANONICAL — promoted from explorations on 2026-05-13.
 * This IS the source of truth for the AE Opportunity Table.
 * Do NOT edit to "match" any other variant; do not fork a *-exp version.
 * Prior canonical archived at .tmp/opportunity-table.stories.archived-2026-05-13.tsx.
 * ─────────────────────────────────────────────────────────────────────────────
 *
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
  Calendar, Clock, ChevronDown, ChevronUp, ChevronRight, Folder,
  ExclamationTriangle, ExclamationCircle,
  BrandStrata, BrandPrisma, BrandCortex,
  Close,
  CommentAdd, Maximize,
  // Sales-play status icons (same set as acc-table)
  NotTouched, Pitched, HourglassEnd, MinusCircleStroke,
  ChessKnight, ClosedWon, DoNotEnter,
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
import { PRODUCT_SKUS } from '../mock/data/skus'

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
interface SalesPlay { name: string; status: SalesPlayStatus; valueUsd: number }
interface RenewalData {
  subEnd: string
  renewableTcvUsd: number
  arrUsd: number
  outcome: RenewalOutcome
}

// Quote terms sourced from Opportunity.quoteTerms in mock data.
interface QuoteTerms {
  termLength: '12 months' | '36 months' | '60 months'
  routeToMarket: 'Direct' | '1-tier' | '2-tier' | 'Marketplace'
  paymentOption: 'Upfront, no financing' | 'Upfront, PANW financing' | 'Annual'
}

export interface OpportunityRow {
  id: string
  /** Canonical Account.id from poc-exploration/src/mock/data/accounts.ts */
  accountId: string
  /** Canonical Opportunity.id from poc-exploration/src/mock/data/opportunities.ts */
  oppId: string
  oppName: string
  account: string
  type: OppType
  forecast: Forecast
  stage: DealStage
  closeDate: string // "mar 7" — short display form
  quoteId: string
  quoteTerms?: QuoteTerms
  products: Product[]
  valueUsd: number
  activity: Activity
  health: AccountHealth
  risks: RiskFactor[]
  salesPlay: SalesPlay
  renewal?: RenewalData
}

export interface ExpandIntent {
  accountId: string
  section: 'installBase' | 'salesPlay' | 'opportunities' | 'accountHealth'
  oppId?: string
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
  /** Fired when a row's expand button or Account Health CTA is clicked. */
  onExpand?: (intent: ExpandIntent) => void
  /** Fired when Update (sales-play popover) or Modify (upsell popover) is clicked. */
  onOpenSalesPlay?: (playId: string, sourceOppId?: string) => void
}

type SortKey = 'accountName' | 'oppName' | 'closeDate' | 'value' | 'riskCount'
type SortDir = 'asc' | 'desc'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'accountName', label: 'Account name' },
  { key: 'oppName',     label: 'Opportunity name' },
  { key: 'closeDate',   label: 'Close date' },
  { key: 'value',       label: 'Value' },
  { key: 'riskCount',   label: 'Risk factor count' },
]

// ─── Display label maps ──────────────────────────────────────────────────────

const STAGE_LABEL: Record<DealStage, string> = {
  'discovery':       'Discovery',
  'solutioning':     'Solutioning',
  'tech-validation': 'Tech validation',
  'active-pov':      'Active POV',
  'negotiation':     'Negotiation',
}
const FORECAST_LABEL: Record<Forecast, string> = {
  'pipeline':  'Pipeline',
  'best-case': 'Best case',
  'commit':    'Commit',
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
  'net-new': 'Net new',
  'upsell':  'Upsell',
  'renewal': 'Renewal',
}
const HEALTH_LABEL: Record<Health, string> = {
  'healthy':  'Healthy',
  'at-risk':  'At risk',
  'critical': 'Critical',
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
  'tech-win':       { emoji: '🏅', label: 'No secured technical win' },
  'partner':        { emoji: '🤝', label: 'No partner selected or finalized' },
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
  // scenario-1: Stripe Treasury XSOAR Renewal Landmine
  // Critical health, 96d stale, downsell outcome, stuck at active-pov
  {
    id: '1',
    accountId: 'acc-stripe-treasury',
    oppId: 'opp-stripe-treasury-xsoar-renewal',
    oppName: 'Stripe Treasury XSOAR Renewal',
    account: 'Stripe Treasury Operations',
    type: 'renewal', forecast: 'best-case', stage: 'active-pov',
    closeDate: 'jul 12', quoteId: 'Q-2026-04412',
    quoteTerms: { termLength: '36 months', routeToMarket: 'Direct', paymentOption: 'Annual' },
    products: [
      mkProduct('Cortex XSOAR', 640_000),
    ],
    valueUsd: 640_000,
    activity: { daysAgo: 27, description: 'Last exec briefing before POV stalled awaiting playbook conversion sign-off' },
    health: { overall: 'critical', technical: 'healthy', adoption: 'critical',
      trend12mo: [2,2,2,1,1,1,0,0,0,0,0,0] },
    risks: [mkRisk('no-activity'), mkRisk('tech-win')],
    salesPlay: { name: 'Cortex Cloud Land and Expand', status: 'pursuing', valueUsd: 640_000 },
    renewal: { subEnd: 'Jul 12, 2026', renewableTcvUsd: 640_000, arrUsd: 640_000, outcome: 'downsell' },
  },
  // scenario-10: Asana SASE Land — 9 days to negotiate close
  // Clean commit, no risks, imminent close
  {
    id: '2',
    accountId: 'acc-asana-work',
    oppId: 'opp-asana-sase-negotiate',
    oppName: 'Asana SASE Land',
    account: 'Asana Work Graph',
    type: 'net-new', forecast: 'commit', stage: 'negotiation',
    closeDate: 'may 23', quoteId: 'Q-2026-04201',
    quoteTerms: { termLength: '36 months', routeToMarket: '1-tier', paymentOption: 'Upfront, no financing' },
    products: [
      mkProduct('Prisma Access', 380_000),
      mkProduct('Prisma SD-WAN', 260_000),
    ],
    valueUsd: 640_000,
    activity: { daysAgo: 7, description: 'Legal redline returned to procurement' },
    health: { overall: 'healthy', technical: 'healthy', adoption: 'healthy',
      trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
    risks: [],
    salesPlay: { name: 'Prisma Access Land', status: 'pursuing', valueUsd: 640_000 },
  },
  // scenario-4: Lyft Boring Healthy Renewal Full
  // Commit renewal with full outcome, 18 days to close, no risks
  {
    id: '3',
    accountId: 'acc-lyft-rideshare',
    oppId: 'opp-lyft-rideshare-renewal-full',
    oppName: 'Lyft Multi-product Renewal',
    account: 'Lyft Rideshare Operations',
    type: 'renewal', forecast: 'commit', stage: 'negotiation',
    closeDate: 'jun 1', quoteId: 'Q-2026-04412',
    quoteTerms: { termLength: '60 months', routeToMarket: 'Direct', paymentOption: 'Upfront, PANW financing' },
    products: [
      mkProduct('PA Series', 180_000),
      mkProduct('PA Series Support', 100_000),
      mkProduct('Prisma SD-WAN', 140_000),
    ],
    valueUsd: 420_000,
    activity: { daysAgo: 5, description: 'Awaiting countersignature from procurement' },
    health: { overall: 'healthy', technical: 'healthy', adoption: 'healthy',
      trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
    risks: [],
    salesPlay: { name: 'FW Refresh and VM-Series Migration', status: 'pursuing', valueUsd: 420_000 },
    renewal: { subEnd: 'May 31, 2026', renewableTcvUsd: 1_100_000, arrUsd: 420_000, outcome: 'full' },
  },
  // scenario-6: Databricks Displacement Win
  // Multi-product commit, displacement outcome, at-risk health
  {
    id: '4',
    accountId: 'acc-databricks-lakehouse',
    oppId: 'opp-databricks-xdr-displace',
    oppName: 'Databricks XDR Displacement',
    account: 'Databricks Lakehouse Security',
    type: 'renewal', forecast: 'commit', stage: 'negotiation',
    closeDate: 'jun 21', quoteId: 'Q-2026-04401',
    quoteTerms: { termLength: '12 months', routeToMarket: 'Marketplace', paymentOption: 'Upfront, no financing' },
    products: [
      mkProduct('Cortex XDR+', 420_000),
      mkProduct('XSIAM', 310_000),
      mkProduct('FW Data Lake', 160_000),
    ],
    valueUsd: 890_000,
    activity: { daysAgo: 11, description: 'Closing-call follow-up with CISO' },
    health: { overall: 'at-risk', technical: 'healthy', adoption: 'at-risk',
      trend12mo: [1,1,0,0,0,0,0,0,0,0,0,0] },
    risks: [],
    salesPlay: { name: 'Cortex Cloud Land and Expand', status: 'pursuing', valueUsd: 890_000 },
    renewal: { subEnd: 'Jun 21, 2026', renewableTcvUsd: 890_000, arrUsd: 890_000, outcome: 'displacement' },
  },
  // scenario-3: Reddit Five-Risk Pile-up
  // Critical health, 42d stale, no-activity risk, unknown renewal outcome
  {
    id: '5',
    accountId: 'acc-reddit-platform',
    oppId: 'opp-reddit-platform-fwrenewal',
    oppName: 'Reddit PA-Series Renewal',
    account: 'Reddit Platform Engineering',
    type: 'renewal', forecast: 'best-case', stage: 'negotiation',
    closeDate: 'jul 31', quoteId: 'Q-2026-04201',
    quoteTerms: { termLength: '36 months', routeToMarket: '2-tier', paymentOption: 'Annual' },
    products: [
      mkProduct('PA Series', 220_000),
      mkProduct('PA Series Support', 90_000),
    ],
    valueUsd: 310_000,
    activity: { daysAgo: 23, description: 'No response from buyer since last renewal-prep call' },
    health: { overall: 'critical', technical: 'at-risk', adoption: 'critical',
      trend12mo: [2,2,2,2,2,2,2,2,2,2,2,2] },
    risks: [mkRisk('no-activity')],
    salesPlay: { name: 'FW Refresh and VM-Series Migration', status: 'not-touched', valueUsd: 310_000 },
    renewal: { subEnd: 'Jul 30, 2026', renewableTcvUsd: 310_000, arrUsd: 310_000, outcome: 'unknown' },
  },
  // scenario-8: Linear Churn Budget Cuts
  // Critical health, churn renewal outcome, budget freeze
  {
    id: '6',
    accountId: 'acc-linear-issues',
    oppId: 'opp-linear-issues-xsoar-churn',
    oppName: 'Linear XSOAR Renewal',
    account: 'Linear Issue Tracking',
    type: 'renewal', forecast: 'best-case', stage: 'active-pov',
    closeDate: 'jul 17', quoteId: 'Q-2026-04318',
    quoteTerms: { termLength: '12 months', routeToMarket: 'Direct', paymentOption: 'Upfront, no financing' },
    products: [
      mkProduct('Cortex XSOAR', 180_000),
    ],
    valueUsd: 180_000,
    activity: { daysAgo: 18, description: 'Customer notified budget freeze through FY27' },
    health: { overall: 'critical', technical: 'at-risk', adoption: 'critical',
      trend12mo: [2,2,2,1,1,1,0,0,0,0,0,0] },
    risks: [],
    salesPlay: { name: 'XSOAR SOAR Modernization', status: 'pursuing', valueUsd: 180_000 },
    renewal: { subEnd: 'Jul 18, 2026', renewableTcvUsd: 180_000, arrUsd: 180_000, outcome: 'churn' },
  },
  // scenario-7: Notion Duplicate Renewal Quote
  // Clean commit, healthy, full renewal outcome
  {
    id: '7',
    accountId: 'acc-notion-workspace',
    oppId: 'opp-notion-renewal-primary',
    oppName: 'Notion XDR Renewal',
    account: 'Notion Workspace Trust',
    type: 'renewal', forecast: 'commit', stage: 'negotiation',
    closeDate: 'jun 15', quoteId: 'Q-2026-04612',
    quoteTerms: { termLength: '36 months', routeToMarket: '1-tier', paymentOption: 'Annual' },
    products: [
      mkProduct('Cortex XDR+', 310_000),
    ],
    valueUsd: 310_000,
    activity: { daysAgo: 8, description: 'Renewal contract sent to procurement' },
    health: { overall: 'healthy', technical: 'healthy', adoption: 'healthy',
      trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
    risks: [],
    salesPlay: { name: 'Cortex XDR Land', status: 'pursuing', valueUsd: 310_000 },
    renewal: { subEnd: 'Jun 15, 2026', renewableTcvUsd: 310_000, arrUsd: 310_000, outcome: 'full' },
  },
  // scenario-2: DoorDash Quiet Cortex XDR Land
  // Fresh discovery, pipeline, no risks — the easy confirmation opp
  {
    id: '8',
    accountId: 'acc-doordash-platform',
    oppId: 'opp-doordash-platform-xdr-land',
    oppName: 'DoorDash Cortex XDR Land',
    account: 'DoorDash Platform Security',
    type: 'net-new', forecast: 'pipeline', stage: 'discovery',
    closeDate: 'dec 20', quoteId: 'Q-2026-05201',
    quoteTerms: { termLength: '60 months', routeToMarket: 'Direct', paymentOption: 'Annual' },
    products: [
      mkProduct('Cortex XDR+', 180_000),
    ],
    valueUsd: 180_000,
    activity: { daysAgo: 6, description: 'Initial scoping with SecOps Director' },
    health: { overall: 'healthy', technical: 'healthy', adoption: 'healthy',
      trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
    risks: [],
    salesPlay: { name: 'Cortex XDR Land', status: 'pursuing', valueUsd: 180_000 },
  },
  // ── SKU-coverage rows (#11 follow-on) ────────────────────────────────────────
  // These three fixtures exist solely to exercise product popover SKU tables
  // for the 7 products not present in scenarios 1-8. Not editorial scenarios.

  // scenario-sku-A: Okta VM-Series CDSS refresh — covers VM Series + PA Series Attached
  // Close in Q4FY26 (jul 16), at-risk health → passes default filter.
  {
    id: '9',
    accountId: 'acc-okta-iam',
    oppId: 'opp-okta-vmseries-cdss',
    oppName: 'Okta VM-Series CDSS Refresh',
    account: 'Okta Identity Platform',
    type: 'upsell', forecast: 'best-case', stage: 'solutioning',
    closeDate: 'jul 16', quoteId: 'Q-2026-05801',
    quoteTerms: { termLength: '36 months', routeToMarket: '1-tier', paymentOption: 'Annual' },
    products: [
      mkProduct('VM Series', 140_000),
      mkProduct('PA Series Attached', 60_000),
    ],
    valueUsd: 200_000,
    activity: { daysAgo: 9, description: 'Architecture review with network team' },
    health: { overall: 'at-risk', technical: 'healthy', adoption: 'at-risk',
      trend12mo: [0,0,0,0,0,0,0,1,1,0,0,0] },
    risks: [],
    salesPlay: { name: 'FW & CDSS Expansion', status: 'pitched', valueUsd: 200_000 },
  },
  // scenario-sku-B: Snowflake cloud-security trifecta — covers Xpanse + QRadar + Cortex & Cloud
  // Close in Q4FY26 (jul 22), at-risk health → passes default filter.
  {
    id: '10',
    accountId: 'acc-snowflake-cloud',
    oppId: 'opp-snowflake-cloud-sec',
    oppName: 'Snowflake Cloud Security Platform',
    account: 'Snowflake Data Cloud',
    type: 'net-new', forecast: 'best-case', stage: 'tech-validation',
    closeDate: 'jul 22', quoteId: 'Q-2026-05902',
    quoteTerms: { termLength: '12 months', routeToMarket: 'Direct', paymentOption: 'Upfront, no financing' },
    products: [
      mkProduct('Xpanse', 229_000),
      mkProduct('QRadar', 365_000),
      mkProduct('Cortex & Cloud', 286_000),
    ],
    valueUsd: 880_000,
    activity: { daysAgo: 5, description: 'POC readout with CISO and cloud security team' },
    health: { overall: 'at-risk', technical: 'healthy', adoption: 'healthy',
      trend12mo: [0,0,0,0,0,1,1,1,0,0,0,0] },
    risks: [mkRisk('budget')],
    salesPlay: { name: 'Cortex Cloud Land and Expand', status: 'pursuing', valueUsd: 880_000 },
  },
  // scenario-sku-C: Cloudflare Unit 42 retainer — covers Reactive + Proactive
  // Close in Q4FY26 (jun 27), at-risk health → passes default filter.
  {
    id: '11',
    accountId: 'acc-cloudflare-network',
    oppId: 'opp-cloudflare-u42-retainer',
    oppName: 'Cloudflare Unit 42 Services',
    account: 'Cloudflare Network Security',
    type: 'net-new', forecast: 'pipeline', stage: 'discovery',
    closeDate: 'jun 27', quoteId: 'Q-2026-06001',
    quoteTerms: { termLength: '12 months', routeToMarket: 'Direct', paymentOption: 'Upfront, no financing' },
    products: [
      mkProduct('Reactive', 180_000),
      mkProduct('Proactive', 65_000),
    ],
    valueUsd: 245_000,
    activity: { daysAgo: 11, description: 'Introductory call with CISO on IR readiness' },
    health: { overall: 'at-risk', technical: 'healthy', adoption: 'healthy',
      trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
    risks: [],
    salesPlay: { name: 'Unit 42 Proactive + Reactive Bundle', status: 'pitched', valueUsd: 245_000 },
  },
]

// ─── Filter option sets ──────────────────────────────────────────────────────

const FORECAST_OPTIONS: { value: string; label: string }[] = [
  { value: 'pipeline',  label: 'Pipeline' },
  { value: 'best-case', label: 'Best case' },
  { value: 'commit',    label: 'Commit' },
]

const STAGE_OPTIONS: { value: string; label: string }[] = [
  { value: 'discovery',       label: 'Discovery' },
  { value: 'solutioning',     label: 'Solutioning' },
  { value: 'tech-validation', label: 'Tech validation' },
  { value: 'active-pov',      label: 'Active POV' },
  { value: 'negotiation',     label: 'Negotiation' },
]

const TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'net-new', label: 'Net new' },
  { value: 'upsell',  label: 'Upsell' },
  { value: 'renewal', label: 'Renewal' },
]

const LAST_ACTIVITY_OPTIONS: { value: string; label: string }[] = [
  { value: 'lt-7',  label: 'Last 7 days' },
  { value: '7-21',  label: '7–21 days' },
  { value: 'gt-21', label: 'Over 21 days' },
]

const CLOSE_DATE_OPTIONS: FilterOption[] = [
  { value: 'this-q', label: 'This quarter' },
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
  { key: 'overall',   label: 'Overall health' },
  { key: 'technical', label: 'Technical health' },
  { key: 'adoption',  label: 'Adoption & deployment health' },
]
const HEALTH_LEVELS: { value: Health; label: string }[] = [
  { value: 'healthy',  label: 'Healthy' },
  { value: 'at-risk',  label: 'At risk' },
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
  { value: 'quoteId',       label: 'Quote number' },
  { value: 'oppType',       label: 'Opportunity type' },
  { value: 'stage',         label: 'Stage' },
  { value: 'forecast',      label: 'Forecast' },
  { value: 'closeDate',     label: 'Close date' },
  { value: 'lastActivity',  label: 'Last activity' },
  { value: 'accountHealth', label: 'Account health' },
  { value: 'riskCount',     label: 'Risk factors' },
  { value: 'salesPlay',     label: 'Sales play' },
  { value: 'products',      label: 'Products' },
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

// value→label lookup for product leaves — used by the Filters-toggle
// applied-filters popover to render readable labels per leaf.
const PRODUCT_LEAF_LABEL = new Map<string, string>(
  PRODUCT_TREE.flatMap(g => (g.children ?? []).map(c => [c.value, c.label]))
)
// Reverse: product display name → leaf value. Used by the filtering
// pipeline to check whether a row's products intersect the selected leaves.
const PRODUCT_NAME_TO_LEAF = new Map<string, string>(
  PRODUCT_TREE.flatMap(g => (g.children ?? []).map(c => [c.label, c.value]))
)

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

// Map a close-date display string ("jul 12", "may 23") to a quarter
// token matching CLOSE_DATE_OPTIONS values. Demo clock = May 2026 = Q4FY26.
//   may/jun/jul → 'this-q' (same quarter = Q4FY26; also matches 'q4fy26')
//   aug/sep/oct → 'q1fy27'
//   nov/dec     → 'q2fy27'
//   jan/feb/mar → 'q3fy27'
//   apr         → 'q4fy27'
function closeDateToQuarterToken(s: string): string {
  const month = s.toLowerCase().split(/\s+/)[0] ?? ''
  switch (month) {
    case 'may': case 'jun': case 'jul': return 'this-q'
    case 'aug': case 'sep': case 'oct': return 'q1fy27'
    case 'nov': case 'dec':             return 'q2fy27'
    case 'jan': case 'feb': case 'mar': return 'q3fy27'
    case 'apr':                         return 'q4fy27'
    default:                            return 'this-q'
  }
}

// Map a lastActivity bucket option value to a daysAgo predicate.
function matchesLastActivity(daysAgo: number, bucket: string): boolean {
  switch (bucket) {
    case 'lt-7':  return daysAgo < 7
    case '7-21':  return daysAgo >= 7 && daysAgo <= 21
    case 'gt-21': return daysAgo > 21
    default:      return true
  }
}

// ─── Sort flyout (single-select) ─────────────────────────────────────────────

interface SortFlyoutProps {
  sortKey: SortKey
  sortDir: SortDir
  onChange: (key: SortKey) => void
}

function SortFlyout({ sortKey, sortDir: _sortDir, onChange }: SortFlyoutProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const currentLabel = SORT_OPTIONS.find(o => o.key === sortKey)?.label ?? 'close date'

  // The trigger is a DS secondary button at size=small (32px). The old
  // up/down direction arrow next to the label is gone — the asc/desc
  // toggle has no surface today (interaction not wired), so showing the
  // glyph wrote a check the row couldn't cash. The dropdown chevron
  // remains as the popover-state indicator.
  return (
    <>
      <Button
        ref={triggerRef}
        kind="secondary"
        size="default"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        renderIcon={open ? ChevronUp : ChevronDown}
        iconPosition="right">
        Sort: {currentLabel}
      </Button>

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

// ─── Filters toggle button + applied-filters hover popover ─────────────────
// Sits in the search row to the right of the Tags filter. Two jobs:
//   1. Show/hide the expanded filter row below the search row.
//   2. Carry a trailing high-contrast neutral Tag with the total count
//      of applied filters; on hover, the tag opens a popover listing
//      every applied filter across every dimension, with a per-item
//      remove control. Same DS chip-popover pattern + 180ms close grace
//      as the existing per-filter chip hovers.
//
// The popover anchors off .panw--filter__wrapper (position:relative).
// The button itself is a DS secondary button at size=small (32px).

interface AppliedFilterItem {
  value: string
  label: string
  onRemove: () => void
}

interface FiltersToggleProps {
  open: boolean
  onToggle: () => void
  applied: AppliedFilterItem[]
}

function FiltersToggle({ open, onToggle, applied }: FiltersToggleProps) {
  const chipHover = useChipPopoverHover()
  // Index by value for FilterChipPopover's onRemove(value) signature.
  const removeByValue = (v: string) => {
    const it = applied.find(a => a.value === v)
    if (it) it.onRemove()
    if (applied.length - 1 === 0) chipHover.setChipPopoverOpen(false)
  }

  return (
    <span className="panw--filter__wrapper opp-filters-toggle">
      <Button
        kind="secondary"
        size="default"
        aria-expanded={open}
        aria-controls="opp-filter-row"
        onClick={onToggle}
        renderIcon={open ? ChevronUp : ChevronDown}
        iconPosition="right">
        <span className="opp-filters-toggle__inner">
          Filters
          {applied.length > 0 && (
            <span
              className="panw--filter__chip-target opp-filters-toggle__count"
              onMouseEnter={chipHover.openOnEnter}
              onMouseLeave={chipHover.scheduleClose}>
              {/* size="default" matches every other in-system filter
               *  chip-target tag (account health, close date,
               *  products…). The earlier size="small" picked up a
               *  stretched-glyph treatment that didn't sit cleanly
               *  inside a 32px button. */}
              <Tags
                label={String(applied.length)}
                color="neutral"
                contrast="high"
                size="default"
                shape="rounded"
              />
            </span>
          )}
        </span>
      </Button>
      {applied.length > 0 && chipHover.chipPopoverOpen && (
        <FilterChipPopover
          items={applied.map(({ value, label }) => ({ value, label }))}
          onRemove={removeByValue}
          onMouseEnter={chipHover.cancelClose}
          onMouseLeave={chipHover.scheduleClose}
        />
      )}
    </span>
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
                shape="rounded"
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
                shape="rounded"
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
  const panelRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  // Compute panel position after it mounts — same pattern as HoverShell.
  // Using createPortal + useLayoutEffect here (rather than the DS Flyout)
  // because the Flyout's useLayoutEffect/setRef ordering produced an
  // invisible panel for this particular trigger (Bug #5). The portal
  // approach guarantees flyoutRef.current is set before position is read.
  useLayoutEffect(() => {
    if (!open) { setPos(null); return }
    const trigger = triggerRef.current
    const panel = panelRef.current
    if (!trigger || !panel) return
    const a = trigger.getBoundingClientRect()
    const panelW = panel.offsetWidth
    const panelH = panel.scrollHeight
    const vw = window.innerWidth
    const vh = window.innerHeight
    const GAP = 4
    const spaceBelow = vh - a.bottom - GAP - 8
    const spaceAbove = a.top - GAP - 8
    const top = spaceBelow >= panelH || spaceBelow >= spaceAbove
      ? a.bottom + GAP
      : Math.max(8, a.top - GAP - panelH)
    const left = Math.max(8, Math.min(a.left, vw - panelW - 8))
    setPos({ top, left })
  }, [open])

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return
      if (triggerRef.current?.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Close on scroll/resize — position would drift otherwise.
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

  // Tri-state for the select-all row.
  const total = DENSITY_OPTIONS.length
  const chosenCount = DENSITY_OPTIONS.filter(o => selected.includes(o.value)).length
  const selectAllStatus: 'checked' | 'unchecked' | 'indeterminate' =
    chosenCount === 0 ? 'unchecked' : chosenCount === total ? 'checked' : 'indeterminate'

  const toggleAll = () => {
    if (selectAllStatus === 'unchecked') onChange([...DENSITY_OPTIONS.map(o => o.value)] as DensityKey[])
    else onChange([])
  }

  const toggleItem = (value: DensityKey) => {
    if (selected.includes(value)) onChange(selected.filter(v => v !== value))
    else onChange([...selected, value])
  }

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

      {/* Multi-select panel — instant commit (no Apply step).
          Uses createPortal so the panel isn't clipped by any positioned
          ancestor and position: fixed resolves against the viewport. */}
      {open && createPortal(
        <div
          ref={panelRef}
          className="panw--flyout"
          role="listbox"
          aria-multiselectable="true"
          style={{
            position: 'fixed',
            top: pos?.top ?? -9999,
            left: pos?.left ?? -9999,
            visibility: pos ? 'visible' : 'hidden',
            zIndex: 9999,
          }}>
          {/* Select-all header (tri-state) */}
          <div
            className="panw--flyout__select-all"
            role="option"
            aria-selected={selectAllStatus === 'checked'}
            tabIndex={0}
            onClick={toggleAll}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAll() } }}>
            <span className="panw--flyout__select-all-glyph" aria-hidden="true" style={{ pointerEvents: 'none', display: 'inline-flex' }}>
              <Checkbox status={selectAllStatus} label="" tabIndex={-1} />
            </span>
          </div>
          <div className="panw--flyout__divider" role="separator" aria-hidden="true" />
          <div className="panw--flyout__list">
            {DENSITY_OPTIONS.map(opt => {
              const isSelected = selected.includes(opt.value)
              return (
                <div
                  key={opt.value}
                  className={`panw--flyout__item${isSelected ? ' panw--flyout__item--selected' : ''}`}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onClick={() => toggleItem(opt.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(opt.value) } }}>
                  <span className="panw--flyout__item-checkbox" aria-hidden="true" style={{ pointerEvents: 'none', display: 'inline-flex' }}>
                    <Checkbox status={isSelected ? 'checked' : 'unchecked'} label="" tabIndex={-1} />
                  </span>
                  <span className="panw--flyout__item-label">{opt.label}</span>
                </div>
              )
            })}
          </div>
        </div>,
        document.body
      )}
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
              <Tags label={chipLabel} color="neutral" contrast="high" size="default" shape="rounded" />
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
        data-popover-open={open ? 'true' : 'false'}
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

// Bar palette mirrors the acc-table sparkline so the two health popovers
// share one chart. Raw hex (green-40 / yellow-30 / red-50) rather than
// semantic tokens — the semantic status tokens resolve to text-tier dark
// greens / oranges / reds that make the strip read as a warning glyph
// instead of a vitality readout. The healthy bar should feel buoyant,
// not severe.
const HEALTH_BAR_FILL: Record<Health, string> = {
  'healthy':  '#3cc29a', // green-40
  'at-risk':  '#ffbe4f', // yellow-30
  'critical': '#f55868', // red-50
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

function AccountHealthPanel({ row, onViewHealth }: { row: OpportunityRow; onViewHealth?: () => void }) {
  const h = row.health
  return (
    <div className="opp-pop opp-pop--health">
      <div className="opp-pop__heading">{row.account}</div>
      <div className="opp-pop__sub">12-month health trend</div>
      <div className="opp-pop__chart"><HealthTrendBars trend={h.trend12mo} latest={h.overall} /></div>
      <div className="opp-pop__rows">
        <div className="opp-pop__kv">
          <span className="opp-pop__kv-label">Technical health</span>
          <Tags
            shape="rounded" size="large" contrast="low"
            color={HEALTH_COLOR[h.technical]}
            label={HEALTH_LABEL[h.technical]}
            className="opp-tag--static" />
        </div>
        <div className="opp-pop__kv">
          <span className="opp-pop__kv-label">Adoption &amp; deployment</span>
          <Tags
            shape="rounded" size="large" contrast="low"
            color={HEALTH_COLOR[h.adoption]}
            label={HEALTH_LABEL[h.adoption]}
            className="opp-tag--static" />
        </div>
      </div>
      <div className="opp-pop__cta">
        <Button kind="ghost-brand" size="small" onClick={onViewHealth}>View account health</Button>
      </div>
    </div>
  )
}

function RiskFactorsPanel({ risks }: { risks: RiskFactor[] }) {
  if (risks.length === 0) {
    // Empty branch carries the --empty modifier so the heading↔sub
    // gap relaxes to 2px (default is 0). Width still pins to the
    // 320 tier so the empty card lines up with the populated ones.
    return (
      <div className="opp-pop opp-pop--risks opp-pop--empty">
        <div className="opp-pop__heading">No risk factors</div>
        <div className="opp-pop__sub">This deal isn't flagged with any risks.</div>
      </div>
    )
  }
  // Tabular row list — hairline dividers between rows, 14px throughout.
  // Mirrors the acc-table risk panel so the two tables share one popover
  // grammar.
  return (
    <div className="opp-pop opp-pop--risks">
      <div className="opp-pop__heading">
        {risks.length === 1 ? '1 risk factor' : `${risks.length} risk factors`}
      </div>
      <ul className="opp-pop__risk-list">
        {risks.map(r => (
          <li key={r.id}>
            <span className="opp-pop__risk-emoji" aria-hidden="true">{r.emoji}</span>
            {/* title carries the full string so the truncated row
             * can be re-read on hover via the browser-native tooltip. */}
            <span className="opp-pop__risk-label" title={r.label}>{r.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Sales-play status display labels (spec §3.4 of sales-play-reference)
const SALES_PLAY_STATUS_LABEL: Record<SalesPlayStatus, string> = {
  'not-touched': 'Not touched',
  'pitched':     'Pitched',
  'deferred':    'Deferred',
  'declined':    'Declined',
  'pursuing':    'Pursuing',
  'closed-won':  'Closed won',
  'closed-lost': 'Closed lost',
}

// Sales-play status → icon component. Mirrors acc-table's map exactly —
// both tables use the same 7 DS icons to represent the same 7 statuses.
// Icon color per status is handled in CSS (.opp-sp-tag--*) so the icon
// slot carries semantic signal without touching @ds/icons internals.
const SALES_PLAY_ICON: Record<SalesPlayStatus, React.ElementType> = {
  'not-touched': NotTouched,
  'pitched':     Pitched,
  'deferred':    HourglassEnd,
  'declined':    MinusCircleStroke,
  'pursuing':    ChessKnight,
  'closed-won':  ClosedWon,
  'closed-lost': DoNotEnter,
}

// Sales-play popover — status name left · value right · Update CTA bottom.
// Follows the opp-pop grammar: 240px tier, kv-list for the data row,
// opp-pop__cta for the full-width ghost-brand action.
function SalesPlayPanel({ salesPlay, onUpdate }: { salesPlay: SalesPlay; onUpdate?: () => void }) {
  return (
    <div className="opp-pop opp-pop--salesplay">
      <ul className="opp-pop__kv-list">
        <li>
          <span className="opp-pop__kv-label">{SALES_PLAY_STATUS_LABEL[salesPlay.status]}</span>
          <span className="opp-pop__kv-value">{formatUsdCompact(salesPlay.valueUsd)}</span>
        </li>
      </ul>
      <div className="opp-pop__cta">
        <Button kind="ghost-brand" size="small" onClick={onUpdate}>Update</Button>
      </div>
    </div>
  )
}

// Single-product popover (issue #11). Heading row (icon · name · deal value)
// is unchanged. A SKU table follows below when PRODUCT_SKUS has entries for
// this product name — showing list-price line items so the AE can see which
// SKUs are in play without opening the full quote. Uses .opp-pop__kv-list for
// the tabular divider pattern (space-between, 32px rows, hairlines) consistent
// with the Renewal and Quote popovers. Width bumped to 280px so longer SKU
// strings (e.g. PAN-XSOAR-CLD-ENT) don't clip at the 208px content rail.
function ProductPanel({ product }: { product: Product; totalUsd?: number }) {
  const Icon = BRAND_ICON[product.brand]
  const skus = PRODUCT_SKUS[product.name] ?? []
  return (
    <div className="opp-pop opp-pop--product">
      {/* Heading row — unchanged from pre-#11 design */}
      <div className="opp-pop-row">
        <span className="opp-pop-row__icon" aria-hidden="true">
          {Icon ? <Icon size={20} /> : null}
        </span>
        <span className="opp-pop-row__name">{product.name}</span>
        <span className="opp-pop-row__value">{formatUsdCompact(product.valueUsd)}</span>
      </div>
      {/* SKU table — list unit prices per line item */}
      {skus.length > 0 && (
        <ul className="opp-pop__kv-list opp-pop__sku-list" aria-label="SKU line items">
          {skus.map(line => (
            <li key={line.sku}>
              <span className="opp-pop__sku-code">{line.sku}</span>
              <span className="opp-pop__sku-price">{formatUsdCompact(line.unitPriceUsd)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Renewal Outcome (spec §4.2) ─────────────────────────────────────────────
// Six outcomes; each carries a Tag color. Spec calls "purple" for
// Displacement and "slate" for Duplicate, both of which exist in TagColors.

const RENEWAL_OUTCOMES: { value: RenewalOutcome; label: string; color: TagColor }[] = [
  { value: 'unknown',      label: 'Unknown',      color: 'neutral' },
  { value: 'full',         label: 'Full renewal', color: 'green'   },
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

function UpsellModifyPanel({ row, onClose, onModify }: { row: OpportunityRow; onClose: () => void; onModify?: () => void }) {
  return <ActionButtonPanel label="Modify" onClick={() => { onModify?.(); onClose() }} />
}

// ─── Quote popover (issue #13) ────────────────────────────────────────────────
// 320px-wide popover showing three structured quote terms below the quote ID
// tag on the opp row (and mirrored in the account panel). Layout: tabular KV
// rows (Term Length / Route to Market / Payment Option) using the same
// .opp-pop__rows / .opp-pop__row pattern as the Renewal and Health popovers,
// followed by the "View quote" action button. Falls back to a button-only
// surface if quoteTerms is absent.

function QuotePanel({ row, onClose }: { row: OpportunityRow; onClose: () => void }) {
  const qt = row.quoteTerms
  return (
    <div className="opp-pop opp-pop--quote">
      {qt && (
        <div className="opp-pop__rows opp-pop__rows--quote">
          <div className="opp-pop__row">
            <span className="opp-pop__row-label">Term Length</span>
            <span className="opp-pop__row-value">{qt.termLength}</span>
          </div>
          <div className="opp-pop__row">
            <span className="opp-pop__row-label">Route to Market</span>
            <span className="opp-pop__row-value">{qt.routeToMarket}</span>
          </div>
          <div className="opp-pop__row">
            <span className="opp-pop__row-label">Payment Option</span>
            <span className="opp-pop__row-value">{qt.paymentOption}</span>
          </div>
        </div>
      )}
      <div className="opp-pop__cta">
        <Button kind="ghost-brand" size="small" onClick={onClose}>View quote</Button>
      </div>
    </div>
  )
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
      <div className="opp-renewal-outcome">
        <span className="opp-renewal-outcome__label">Renewal outcome</span>
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
                title="Churn / dismissal reason"
                placeholder="Select"
                showDescription={false}
                background="grey10"
                selectedValue={reason}
                onChange={(v) => setReason(v)}
                options={CHURN_REASONS}
              />
              <Dropdown
                title="Competitor replacement"
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
      <ul className="opp-pop__kv-list">
        <li>
          <span className="opp-pop__kv-label">Subscription end</span>
          <span className="opp-pop__kv-value">{r.subEnd}</span>
        </li>
        <li>
          <span className="opp-pop__kv-label">Renewable TCV</span>
          <span className="opp-pop__kv-value">{formatUsdCompact(r.renewableTcvUsd)}</span>
        </li>
        <li>
          <span className="opp-pop__kv-label">ARR</span>
          <span className="opp-pop__kv-value">{formatUsdCompact(r.arrUsd)}</span>
        </li>
      </ul>
      <RenewalOutcomeEditor
        value={outcome}
        onChange={onOutcomeChange}
        onConfirm={onClose}
        onCancel={onClose}
      />
    </div>
  )
}

// ─── Product cluster — full wrapping, no +N collapse ─────────────────────
// Earlier iteration measured-and-truncated to +N. Per design call, every
// product is now visible: the column has enough vertical budget for the
// cluster to wrap, and hiding products behind a +N collapses information
// the AE actually needs to size the deal. Mirrors the account-table
// cluster — products pass in already sorted descending by value, the
// flex-wrap reflows that order left-to-right then top-to-bottom.

interface ProductClusterProps { products: Product[]; totalUsd?: number }

function ProductCluster({ products }: ProductClusterProps) {
  return (
    <div className="opp-product-cluster">
      {products.map((p, i) => {
        const Icon = BRAND_ICON[p.brand]
        const tag = Icon
          ? <Tags {...TAG_BASE} icon renderIcon={Icon} label={p.name} />
          : <Tags {...TAG_BASE} label={p.name} />
        return (
          <HoverShell
            key={`${p.name}-${i}`}
            render={() => <ProductPanel product={p} />}>
            {tag}
          </HoverShell>
        )
      })}
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
  onModify?: () => void
}

function TypeTagCell({ row, renewalOutcome, onOutcomeChange, onModify }: TypeTagCellProps) {
  // net-new has no popover; upsell/renewal each anchor their own
  // HoverShell. Static class is only applied in the no-popover case
  // so the tag doesn't pick up a hover state it doesn't deliver on.
  if (row.type === 'net-new') {
    return <Tags {...TAG_BASE} label={TYPE_LABEL[row.type]} className="opp-tag--static" />
  }
  // For renewal opps, surface the chosen disposition inline on the
  // tag itself (e.g. "Renewal: Churn", "Renewal: Upsell"). The
  // disposition's full label is stripped of a trailing " Renewal"
  // word so 'full' ("Full Renewal") renders as "Renewal: Full"
  // rather than the redundant "Renewal: Full Renewal". When the
  // disposition is still 'unknown' the tag falls back to the plain
  // "Renewal" label — no suffix until the AE has made a call.
  const tagLabel =
    row.type === 'renewal' && renewalOutcome !== 'unknown'
      ? `Renewal: ${outcomeMeta(renewalOutcome).label.replace(/\s*Renewal\s*$/i, '')}`
      : TYPE_LABEL[row.type]
  const plain = <Tags {...TAG_BASE} label={tagLabel} />

  if (row.type === 'upsell') {
    return (
      <HoverShell
        interactive
        openDelayMs={1000}
        panelClassName="opp-hover-panel--upsell"
        render={({ close }) => <UpsellModifyPanel row={row} onClose={close} onModify={onModify} />}>
        {plain}
      </HoverShell>
    )
  }

  // renewal — same close-on-cursor-leave behavior as the health
  // popover. The interactive flag keeps content fully usable while
  // the cursor is over the panel (180ms grace to bridge the trigger
  // → panel gap). The persist flag is gone: the popover dismisses
  // when the cursor moves elsewhere, matching every other hover
  // popover in the table.
  return (
    <HoverShell
      interactive
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
  onExpand,
  onOpenSalesPlay,
}: {
  row: OpportunityRow
  renewalOutcome: RenewalOutcome
  onOutcomeChange: (v: RenewalOutcome) => void
  density: DensityKey[]
  onExpand?: (intent: ExpandIntent) => void
  onOpenSalesPlay?: (playId: string, sourceOppId?: string) => void
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
      <td className="opp-c-name">
        {/* Column 1 — opp name · account · value stacked. Value moves
            here from the removed standalone column so the primary
            numeric always reads in context of its deal. */}
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
          <span className="opp-multiline__value">{formatUsdFull(row.valueUsd)}</span>
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
              panelClassName="opp-hover-panel--quote"
              render={({ close }) => (
                <QuotePanel row={row} onClose={close} />
              )}>
              <Tags {...TAG_BASE} label={row.quoteId} />
            </HoverShell>
          )}
          {showTag('oppType')  && (
            <TypeTagCell
              row={row}
              renewalOutcome={renewalOutcome}
              onOutcomeChange={onOutcomeChange}
              onModify={() => onOpenSalesPlay?.(row.salesPlay.name, row.oppId)}
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
                <div className="opp-pop opp-pop--simple opp-pop--two-line">
                  <div className="opp-pop__heading">{row.activity.description}</div>
                  <div className="opp-pop__sub">{dayLabel}</div>
                </div>
              )}>
              <Tags
                shape={TAG_BASE.shape}
                size={TAG_BASE.size}
                contrast={TAG_BASE.contrast}
                color="neutral"
                className={`opp-tag--icon-quiet opp-act--${actStyle.color}`}
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
              render={() => <AccountHealthPanel row={row} onViewHealth={() => onExpand?.({ accountId: row.accountId, section: 'accountHealth' })} />}>
              <Tags
                shape={TAG_BASE.shape}
                size={TAG_BASE.size}
                contrast={TAG_BASE.contrast}
                color={healthColor}
                label={HEALTH_LABEL[row.health.overall]}
              />
            </HoverShell>
          )}

          {/* Risk Factors — interactive popover listing applied risks.
              `interactive` lets the user hover off the trigger and onto
              the panel without dismiss; matches the acc-table behavior. */}
          {showTag('riskCount') && (
            <HoverShell
              interactive
              render={() => <RiskFactorsPanel risks={row.risks} />}>
              <Tags {...TAG_BASE} label={riskLabel} />
            </HoverShell>
          )}

          {/* Sales Play — icon tag + KV popover with status name, value, Update CTA.
              Interactive so the cursor can move into the panel and click Update. */}
          {showTag('salesPlay') && (
            <HoverShell
              interactive
              render={() => (
                <SalesPlayPanel salesPlay={row.salesPlay} onUpdate={() => onOpenSalesPlay?.(row.salesPlay.name, row.oppId)} />
              )}>
              <Tags
                {...TAG_BASE}
                icon
                renderIcon={SALES_PLAY_ICON[row.salesPlay.status]}
                label={row.salesPlay.name}
                className={`opp-sp-tag opp-sp-tag--${row.salesPlay.status}`}
              />
            </HoverShell>
          )}
        </div>
      </td>
      <td>
        {/* Column 4 — products. Brand icon per product (BrandUnit42 absent
            from @ds/icons exports; unit-42 products render iconless until
            the index lands). Full wrapping cluster — every product is
            visible, no +N collapse. Each product tag carries its own
            hover popover with absolute per-product value.
            Density toggle hides the entire cluster, not individual items. */}
        {showTag('products') && (
          <ProductCluster products={row.products} />
        )}
      </td>
      {/* Column 5 — 0-width sticky-right cell that anchors the action buttons
          to the visible right edge of the scroll container regardless of how
          far the table has been scrolled. position:sticky on this <td>
          creates the containing block for the absolutely-positioned pill
          inside; right:6px on the pill is therefore 6px from the viewport's
          right edge, not from the full row bounding box. */}
      <td className="opp-actions-col" aria-hidden="true">
        <div className="opp-row-actions">
          <div className="opp-row-actions__pill">
            <HoverShell side="top" align="center" openDelayMs={400} panelClassName="opp-btn-tooltip" render={() => 'Ask question'}>
              <IconButton kind="ghost" size="sm" iconSize={16} renderIcon={CommentAdd} aria-label="Ask question" />
            </HoverShell>
            <HoverShell side="top" align="center" openDelayMs={400} panelClassName="opp-btn-tooltip" render={() => 'Open on right'}>
              <IconButton kind="ghost" size="sm" iconSize={16} renderIcon={Maximize} aria-label="Open on right" onClick={() => onExpand?.({ accountId: row.accountId, section: 'opportunities', oppId: row.oppId })} />
            </HoverShell>
          </div>
        </div>
      </td>
    </tr>
  )
}

// ─── Column resize hook ──────────────────────────────────────────────────────
// Pointer-driven column resize for table-layout:fixed tables. Mount-time
// useLayoutEffect measures the rendered <th> widths and seeds them into
// state; subsequent drags adjust widths in pixels. Each drag shifts space
// between the dragged column and the IMMEDIATE NEXT column so the table's
// total width never changes — last column gets no handle. Min width
// guard (240px, enforced in both JS and CSS) prevents either side of the
// drag from collapsing, and is the floor for ResizeObserver-driven scaling.
// ResizeObserver on the table shell re-scales column widths proportionally
// as the container changes width (e.g. right-rail expand). When the
// scaled widths hit the 240px floor the table overflows and the shell's
// overflow-x: auto triggers horizontal scroll.
function useColumnResize(columnCount: number, minPx: number | number[] = 240) {
  const tableRef = useRef<HTMLTableElement | null>(null)
  const [widths, setWidths] = useState<number[] | null>(null)
  const prevContainerWidthRef = useRef<number>(0)
  const dragRef = useRef<{ i: number; startX: number; a: number; b: number } | null>(null)
  // Per-column minimums, stable for the component's lifetime. A scalar
  // minPx is expanded to a uniform array; an array is used as-is.
  // Stored in a ref so the useEffect/useLayoutEffect closures always
  // read the initial value without re-running on every render.
  const minsRef = useRef<number[]>(
    Array.isArray(minPx) ? [...minPx] : Array(columnCount).fill(minPx) as number[]
  )

  useLayoutEffect(() => {
    if (widths !== null) return
    const t = tableRef.current
    if (!t) return
    // Select only the resizable data columns (.opp-c-equal) — the 5th
    // sticky-right actions column has no resize handle and must be excluded.
    const ths = t.querySelectorAll<HTMLElement>('thead > tr > th.opp-c-equal')
    if (ths.length !== columnCount) return
    const measured: number[] = []
    ths.forEach((el, i) => measured.push(Math.max(el.getBoundingClientRect().width, minsRef.current[i])))
    setWidths(measured)
    const shell = t.parentElement
    if (shell) prevContainerWidthRef.current = shell.getBoundingClientRect().width
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnCount])

  // Scale column widths proportionally when the table shell is resized.
  // Each width is clamped to its per-column minimum; once all columns
  // hit their floor the table overflows and the shell's overflow-x kicks in.
  useEffect(() => {
    const shell = tableRef.current?.parentElement
    if (!shell) return
    const ro = new ResizeObserver((entries) => {
      if (dragRef.current) return // don't interfere with an active column-drag
      const newWidth = entries[0].contentRect.width
      const prevWidth = prevContainerWidthRef.current
      if (prevWidth <= 0 || Math.abs(newWidth - prevWidth) < 1) return
      const scale = newWidth / prevWidth
      setWidths(prev =>
        prev ? prev.map((w, j) => Math.max(Math.round(w * scale), minsRef.current[j])) : prev
      )
      prevContainerWidthRef.current = newWidth
    })
    ro.observe(shell)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handle = (i: number) => ({
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
      if (!widths || i >= columnCount - 1) return
      e.preventDefault()
      e.stopPropagation()
      try { (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId) } catch {}
      dragRef.current = { i, startX: e.clientX, a: widths[i], b: widths[i + 1] }
      document.body.style.cursor = 'col-resize'
    },
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      const d = dragRef.current
      if (!d || !widths) return
      const raw = e.clientX - d.startX
      const maxRight = d.b - minsRef.current[d.i + 1]
      const maxLeft  = -(d.a - minsRef.current[d.i])
      const delta = Math.max(maxLeft, Math.min(maxRight, raw))
      const next = widths.slice()
      next[d.i] = d.a + delta
      next[d.i + 1] = d.b - delta
      setWidths(next)
    },
    onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => {
      dragRef.current = null
      document.body.style.cursor = ''
      try { (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId) } catch {}
    },
    onPointerCancel: () => {
      dragRef.current = null
      document.body.style.cursor = ''
    },
  })

  return { tableRef, widths, handle }
}

// ─── Main composition ────────────────────────────────────────────────────────

export function AEOpportunityTable({
  rows = DEFAULT_ROWS,
  totalItems = 47,
  summaryLabel = '47 deals · $12.4M',
  onExpand,
  onOpenSalesPlay,
}: OpportunityTableProps = {}) {
  const [search, setSearch] = useState('')
  const [single, setSingle] = useState<Record<string, string | null>>(INITIAL_SINGLE)
  const [multi, setMulti] = useState<Record<string, string[]>>(INITIAL_MULTI)
  // 4 columns: Opportunity · Deal State · Activity & Blockers · Products.
  // Last column has no resize handle (it absorbs no extra space — every
  // drag rebalances between two adjacent columns, total width fixed).
  // Per-column minimums reflect content density: Opportunity carries name +
  // account + value (260px); Activity & Blockers has multi-tag rows (220px);
  // Deal State has 2–3 narrow chips (200px); Products has 1–2 brand chips (160px).
  const colResize = useColumnResize(4, [260, 200, 220, 160])

  // Shell ref for the scroll-shadow listener below.
  const shellRef = useRef<HTMLDivElement | null>(null)

  // Scroll shadow listener — toggles .has-scroll-left / .has-scroll-right on
  // the table shell. CSS uses these to show/hide the sticky-column right-edge
  // shadow and the right-edge scroll affordance shadow respectively. Runs on
  // mount (initial state), scroll (passive), and shell resize (column drag or
  // container resize can change scrollWidth without a scroll event).
  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return
    function sync() {
      const { scrollLeft, scrollWidth, clientWidth } = shell!
      shell!.classList.toggle('has-scroll-left',  scrollLeft > 0)
      shell!.classList.toggle('has-scroll-right', scrollLeft + clientWidth < scrollWidth - 1)
    }
    sync()
    shell.addEventListener('scroll', sync, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(shell)
    return () => {
      shell.removeEventListener('scroll', sync)
      ro.disconnect()
    }
  }, [])
  // Default: every leaf selected (all 15). Spec §3.12 says "All
  // (default)"; we encode that as the explicit full list so the trigger
  // chip reports the count and the SelectAll header shows checked.
  const [products, setProducts] = useState<string[]>([...ALL_PRODUCT_LEAVES])
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortKey, setSortKey] = useState<SortKey>('closeDate') // spec §5 default
  const [sortDir, setSortDir] = useState<SortDir>('asc')        // spec §5 default

  // Filter row is collapsed by default — search + sort + tags +
  // Filters-toggle in the search row are enough to recognize the
  // current slice; the expanded chip-row only opens when the AE wants
  // to change something. Applied filters stay visible as a count tag
  // on the Filters button + a hover popover listing each one.
  const [filtersOpen, setFiltersOpen] = useState(false)

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

  // ── Applied filters aggregator (Filters-toggle button + popover) ──
  // Flattens every dimension's current selection into one list keyed by
  // a stable `${dim}:${value}` token. Each item carries an idempotent
  // onRemove that clears that one value from the right state slice.
  // Products are only counted when partially selected — the default
  // "all 15" state is treated as no narrowing.
  const appliedFilters = useMemo<AppliedFilterItem[]>(() => {
    const out: AppliedFilterItem[] = []
    const singleDims: { key: string; dim: string; opts: { value: string; label: string }[] }[] = [
      { key: 'forecast',     dim: 'Forecast',         opts: FORECAST_OPTIONS },
      { key: 'stage',        dim: 'Stage',            opts: STAGE_OPTIONS },
      { key: 'oppType',      dim: 'Opportunity type', opts: TYPE_OPTIONS },
      { key: 'lastActivity', dim: 'Last activity',    opts: LAST_ACTIVITY_OPTIONS },
    ]
    for (const { key, dim, opts } of singleDims) {
      const v = single[key]
      if (v) {
        const lbl = opts.find(o => o.value === v)?.label ?? v
        out.push({
          value: `single:${key}:${v}`,
          label: `${dim}: ${lbl}`,
          onRemove: () => setSingleFacet(key, null),
        })
      }
    }
    for (const v of multi.closeDate ?? []) {
      const lbl = CLOSE_DATE_OPTIONS.find(o => o.value === v)?.label ?? v
      out.push({
        value: `closeDate:${v}`,
        label: `Close date: ${lbl}`,
        onRemove: () => setMultiFacet('closeDate', (multi.closeDate ?? []).filter(x => x !== v)),
      })
    }
    for (const v of multi.risk ?? []) {
      const lbl = RISK_FILTER_OPTIONS.find(o => o.value === v)?.label ?? v
      out.push({
        value: `risk:${v}`,
        label: `Risk: ${lbl}`,
        onRemove: () => setMultiFacet('risk', (multi.risk ?? []).filter(x => x !== v)),
      })
    }
    const ALL_HEALTH_LEVELS = HEALTH_LEVELS.map(l => l.value)
    for (const axis of ['overall', 'technical', 'adoption'] as const) {
      // Only count as an active filter when the axis is narrowed — i.e.
      // it does NOT have all 3 levels selected.
      const axisSelection = groupedHealth[axis]
      const allSelected = ALL_HEALTH_LEVELS.every(l => axisSelection.includes(l))
      if (!allSelected) {
        for (const lvl of axisSelection) {
          out.push({
            value: `health:${axis}:${lvl}`,
            label: `${axis === 'overall' ? 'Overall' : axis === 'technical' ? 'Technical' : 'Adoption'}: ${HEALTH_LABEL[lvl]}`,
            onRemove: () => setGroupedHealth({
              ...groupedHealth,
              [axis]: groupedHealth[axis].filter(x => x !== lvl),
            }),
          })
        }
      }
    }
    // Only count products when partially selected — "all 15 selected"
    // is no narrowing at all and should not appear as active filters.
    if (products.length < ALL_PRODUCT_LEAVES.length) {
      for (const v of products) {
        const lbl = PRODUCT_LEAF_LABEL.get(v) ?? v
        out.push({
          value: `product:${v}`,
          label: `Product: ${lbl}`,
          onRemove: () => setProducts(products.filter(x => x !== v)),
        })
      }
    }
    return out
  }, [single, multi, groupedHealth, products])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir(key === 'closeDate' ? 'asc' : 'desc')
    }
  }

  // Filter → sort pipeline. Filtering is AND across dimensions; within a
  // multi-value dimension the row must match ANY of the selected values
  // (OR), except for multi.risk which requires ALL selected risks (AND).
  const displayRows = useMemo(() => {
    const ALL_HEALTH_LEVELS_SET = new Set(HEALTH_LEVELS.map(l => l.value))

    let arr = [...rows]

    // 1. Search — case-insensitive substring on account or opp name.
    if (search.trim() !== '') {
      const q = search.toLowerCase()
      arr = arr.filter(r =>
        r.account.toLowerCase().includes(q) || r.oppName.toLowerCase().includes(q)
      )
    }

    // 2. Single filters — null = no filter, value = must match.
    if (single.forecast) {
      const v = single.forecast
      arr = arr.filter(r => r.forecast === v)
    }
    if (single.stage) {
      const v = single.stage
      arr = arr.filter(r => r.stage === v)
    }
    if (single.oppType) {
      const v = single.oppType
      arr = arr.filter(r => r.type === v)
    }
    if (single.lastActivity) {
      const bucket = single.lastActivity
      arr = arr.filter(r => matchesLastActivity(r.activity.daysAgo, bucket))
    }

    // 3. Close date — multi (OR). Empty = no filter.
    //    'this-q' and 'q4fy26' are treated as the same quarter (May–Jul 2026).
    if ((multi.closeDate ?? []).length > 0) {
      const sel = new Set(multi.closeDate ?? [])
      arr = arr.filter(r => {
        const token = closeDateToQuarterToken(r.closeDate)
        // May/Jun/Jul = 'this-q'. Since demo Q4FY26 = 'this-q', allow
        // 'q4fy26' in the filter to also match that same month range.
        return sel.has(token) || (token === 'this-q' && sel.has('q4fy26'))
      })
    }

    // 4. Risk factors — multi (AND). Empty = no filter.
    if ((multi.risk ?? []).length > 0) {
      const requiredRisks = multi.risk ?? []
      arr = arr.filter(r => {
        const rowRiskIds = new Set<string>(r.risks.map(rk => rk.id))
        return requiredRisks.every(id => rowRiskIds.has(id))
      })
    }

    // 5. Grouped health — per axis, filter only when narrowed (non-empty AND not all-3).
    for (const axis of ['overall', 'technical', 'adoption'] as const) {
      const sel = groupedHealth[axis]
      if (sel.length > 0 && sel.length < ALL_HEALTH_LEVELS_SET.size) {
        const selSet = new Set(sel)
        arr = arr.filter(r => selSet.has(r.health[axis]))
      }
    }

    // 6. Products — only filter when partially selected.
    if (products.length < ALL_PRODUCT_LEAVES.length) {
      const selLeaves = new Set(products)
      arr = arr.filter(r =>
        r.products.some(p => {
          const leaf = PRODUCT_NAME_TO_LEAF.get(p.name)
          return leaf !== undefined && selLeaves.has(leaf)
        })
      )
    }

    // Sort.
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
  }, [rows, search, single, multi, groupedHealth, products, sortKey, sortDir])

  // Clamp page to the last valid page when filters shrink the result set.
  // No useEffect needed — we derive effectivePage from displayRows every render.
  const maxPage = Math.max(1, Math.ceil(displayRows.length / rowsPerPage))
  const effectivePage = Math.min(page, maxPage)
  const pagedRows = useMemo(
    () => displayRows.slice((effectivePage - 1) * rowsPerPage, effectivePage * rowsPerPage),
    [displayRows, effectivePage, rowsPerPage],
  )

  type HeaderSortKey = Extract<SortKey, 'oppName' | 'value'>
  const headerType = (key: HeaderSortKey) =>
    sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'basic'

  return (
    <>
      <style>{LAYOUT_CSS}</style>
      <div className="opp-page">
        <div className="opp-page__shell">
          {/* ── Padded header — search row + collapsible filter row ───────
               opp-page__top restores the right padding that opp-page no
               longer provides. The table shell below is a full-bleed
               sibling; only the header content carries the 32px inset. */}
          <div className="opp-page__top">
          {/* ── Search row ──────────────────────────────────────────────
               Left-to-right: search · sort · tags · filters-toggle. All
               controls are 32px tall. The row carries 8px top/bottom
               padding (the row is its own band, not the filter row's
               cap). Filters-toggle on the right collapses/expands the
               wider filter row below; its trailing count tag carries
               an applied-filters popover on hover, so the AE knows
               what's narrowing the table even when the filter row is
               collapsed. */}
          <div className="opp-search-row">
            <div className="opp-search-row__search">
              <Search
                background="grey10"
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
            <TagDensityFilter selected={density} onChange={setDensity} />
            <FiltersToggle
              open={filtersOpen}
              onToggle={() => setFiltersOpen(v => !v)}
              applied={appliedFilters}
            />
          </div>

          {/* ── Filter row (collapsible) ───────────────────────────────
               Bordered band above and below; 12px top/bottom padding;
               every filter chip clamped to 32px height. Density moved
               out (it lives in the search row now), so no leading
               divider is needed. */}
          {filtersOpen && (
            <div className="opp-filter-row" id="opp-filter-row">
              <div className="opp-filter-group">
                <SingleSelectFilter
                  label="Forecast"
                  options={FORECAST_OPTIONS}
                  value={single.forecast}
                  onChange={(v) => setSingleFacet('forecast', v)}
                />
                <SingleSelectFilter
                  label="Stage"
                  options={STAGE_OPTIONS}
                  value={single.stage}
                  onChange={(v) => setSingleFacet('stage', v)}
                />
                <SingleSelectFilter
                  label="Opportunity type"
                  options={TYPE_OPTIONS}
                  value={single.oppType}
                  onChange={(v) => setSingleFacet('oppType', v)}
                />
                <SingleSelectFilter
                  label="Last activity"
                  options={LAST_ACTIVITY_OPTIONS}
                  value={single.lastActivity}
                  onChange={(v) => setSingleFacet('lastActivity', v)}
                />
                <Filter
                  label="Close date"
                  options={CLOSE_DATE_OPTIONS}
                  selected={multi.closeDate ?? []}
                  onApply={values => setMultiFacet('closeDate', values)}
                />
                <GroupedHealthFilter
                  value={groupedHealth}
                  onApply={setGroupedHealth}
                />
                <Filter
                  label="Risk factors"
                  options={RISK_FILTER_OPTIONS}
                  selected={multi.risk ?? []}
                  onApply={values => setMultiFacet('risk', values)}
                />
                <ProductFilter selected={products} onApply={setProducts} />
              </div>
            </div>
          )}
          </div>{/* /opp-page__top */}

          {/* ── Table — full bleed ──────────────────────────────────────
               Headers are Title Case. The four content columns
               (Opportunity, Deal State, Activity & Blockers, Products)
               share equal width; Value and Actions take only what they
               need. Header icons removed — the sort arrow on the two
               sortable headers is sufficient affordance. */}
          <div className="opp-table-shell" ref={shellRef}>
            <table className="opp-table" ref={colResize.tableRef}>
              {/* colgroup drives column widths once useLayoutEffect has
                * seeded them from the rendered 25% layout. Before seed
                * the cols carry no inline width, so the .opp-c-equal
                * 25% rule on each th governs the first paint. */}
              <colgroup>
                {[0, 1, 2, 3].map((i) => (
                  <col key={i} style={colResize.widths ? { width: colResize.widths[i] } : undefined} />
                ))}
                {/* 5th col: 0-width sticky-right actions column */}
                <col style={{ width: 0 }} />
              </colgroup>
              <thead>
                <tr>
                  <th className="opp-c-equal">
                    <Header size="md" type={headerType('oppName')} onHeaderClick={() => toggleSort('oppName')}>Opportunity</Header>
                    <div className="opp-th-resizer" aria-hidden="true" {...colResize.handle(0)} />
                  </th>
                  <th className="opp-c-equal opp-no-sort">
                    <Header size="md" type="basic">Deal state</Header>
                    <div className="opp-th-resizer" aria-hidden="true" {...colResize.handle(1)} />
                  </th>
                  <th className="opp-c-equal opp-no-sort">
                    <Header size="md" type="basic">Activity &amp; blockers</Header>
                    <div className="opp-th-resizer" aria-hidden="true" {...colResize.handle(2)} />
                  </th>
                  <th className="opp-c-equal opp-no-sort">
                    <Header size="md" type="basic">Products</Header>
                  </th>
                  {/* 5th column: 0-width sticky-right actions column — no header content */}
                  <th className="opp-actions-col" aria-hidden="true" />
                </tr>
              </thead>
              <tbody>
                {/* Header → first-row divider. Same element + class as
                 * the inter-row dividers below, so the entire table
                 * uses one line grammar (no thead border). */}
                <tr className="opp-divider-row" aria-hidden="true">
                  <td colSpan={5}><div className="opp-divider" /></td>
                </tr>
                {pagedRows.map((row, i) => (
                  <React.Fragment key={row.id}>
                    <OppRow
                      row={row}
                      renewalOutcome={renewalOutcomes[row.id] ?? 'unknown'}
                      onOutcomeChange={(v) => setRenewalOutcome(row.id, v)}
                      density={density}
                      onExpand={onExpand}
                      onOpenSalesPlay={onOpenSalesPlay}
                    />
                    {i < pagedRows.length - 1 && (
                      <tr className="opp-divider-row" aria-hidden="true">
                        <td colSpan={4}><div className="opp-divider" /></td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ──────────────────────────────────────────── */}
          <div className="opp-table-footer">
            <Pagination
              totalItems={displayRows.length}
              currentPage={effectivePage}
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
  /* Column headers ride the ghost surface — transparent at rest. Hover
   * and onclick deliberately match rest so the header band carries no
   * visible interaction state. Sort is still functional; the active
   * sort indicator is the only affordance needed. */
  --panw-header-bg:         var(--ds-ghost-rest);
  --panw-header-bg-hover:   var(--ds-ghost-rest);
  --panw-header-bg-onclick: var(--ds-ghost-rest);
}

.opp-page {
  min-height: 100vh;
  background-color: var(--ds-ghost-rest);
  font-family: var(--ds-type-font-family-sans);
  /* Right padding removed — the table shell is a full-bleed child that
   * reaches the viewport right edge. Non-table content (search row, filter
   * row) live inside .opp-page__top which carries its own padding-right. */
  padding: var(--ds-spacing-07) 0 var(--ds-spacing-10) var(--ds-spacing-07);
}

/* Shell sits inside a parent card/tile. No own border or background.
 * Vertical rhythm is asymmetric (8px search to filter, 20px filter
 * to table), so a single flex gap won't carry it — each row owns
 * the space below it via margin-bottom. Children should NOT add
 * their own vertical padding — one source per gap. */
.opp-page__shell {
  background-color: transparent;
  border: 0;
  display: flex;
  flex-direction: column;
}

/* Padded header section — restores the right inset for non-table content.
 * The table shell is a full-bleed sibling; this wrapper is not. */
.opp-page__top {
  padding-right: var(--ds-spacing-07);
}

/* ── Search row ─────────────────────────────────────────────────────────── *
 * Left-to-right: search (flex:1) · sort · tags · filters-toggle. All
 * controls are 32px tall, so the row reads as one even band. 8px top
 * and bottom padding gives the row its own breathing space; 16px
 * left/right padding pulls the row's outer edges inward to land
 * exactly where the data-row divider sits (the divider's inner
 * margin is 16px on each side of the table). Net effect: the search
 * row's left and right edges line up with the first/last data
 * cell's tag rail. */
.opp-search-row {
  display: flex;
  align-items: center;
  gap: 6px;
  /* 8 top/bottom · 16 right · 10 LEFT — left-inset matches the table's
   * first-cell padding-left so the search input, hairlines, divider,
   * header text, and cell content all share one vertical at x = 10px
   * from the shell's inner edge. */
  padding: var(--ds-spacing-03) var(--ds-spacing-05) var(--ds-spacing-03) 10px;
  margin-bottom: 0;
}
.opp-search-row__search {
  flex: 1;
  min-width: 0;
}
.opp-search-row__search .panw--search {
  width: 100%;
}

/* ── Search-row inline filters (tag-density + filters-toggle) ──────────
 * Filters in the search row match the DS Filter default height (40px)
 * and the Search input height so the row reads as one even band.
 *
 * The DS .panw--filter trigger ships without a border. In the search
 * row it has to read as a peer of the DS secondary button next to it
 * (Sort, Filters), so we paint the secondary-button chrome on it:
 * 1px border in the secondary border token at rest, drops to
 * transparent on hover / open — matching Button's own convention.
 * Text color routes through the secondary text token. */
.opp-search-row .panw--filter,
.opp-search-row .panw--filter__wrapper > .panw--filter {
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  padding: 0 var(--ds-spacing-04); /* 12 */
  border: 1px solid var(--panw-button-secondary-border);
  border-radius: var(--ds-radius-tight); /* 4 */
  background-color: var(--panw-button-secondary-bg);
  color: var(--panw-button-secondary-text);
  transition:
    background-color 110ms var(--ds-motion-easing-standard),
    border-color 110ms var(--ds-motion-easing-standard);
}
.opp-search-row .panw--filter:hover:not(.panw--filter--open),
.opp-search-row .panw--filter__wrapper > .panw--filter:hover:not(.panw--filter--open) {
  background-color: var(--ds-surface-hover);
  border-color: transparent;
}
.opp-search-row .panw--filter.panw--filter--open,
.opp-search-row .panw--filter__wrapper > .panw--filter.panw--filter--open {
  background-color: var(--ds-surface-selected);
  border-color: transparent;
}
/* Sort and Filters-toggle are DS Buttons — give them the same open-state
 * treatment as the filter triggers: surface-selected bg, border drops. */
.opp-search-row .panw--btn--secondary[aria-expanded="true"] {
  background-color: var(--ds-surface-selected);
  border-color: transparent;
}
.opp-search-row .panw--btn--secondary[aria-expanded="true"]:hover {
  background-color: var(--ds-surface-selected);
  border-color: transparent;
}

/* Right-align the applied-filters popover off the Filters-toggle.
 * The toggle is the rightmost element in the search row, so the
 * default left:0 anchoring runs the popover off-screen on narrow
 * viewports. Pinning right:0 (and overriding the DS default left:0)
 * keeps the popover within the row's bounds. Only scoped to the
 * filters-toggle wrapper — the per-filter chip-popovers inside the
 * expanded filter row keep their DS default left-aligned anchoring. */
.opp-filters-toggle .panw--filter__chip-popover {
  left: auto;
  right: 0;
}

/* Filters-toggle button — wraps the DS secondary button so the count
 * tag inside the button can host the applied-filters popover via the
 * DS .panw--filter__wrapper anchoring pattern (position:relative on
 * the wrapper; popover positions absolute below). */
.opp-filters-toggle {
  display: inline-flex;
}
.opp-filters-toggle__inner {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-spacing-02); /* 4 — label to count tag */
}
/* Count tag inside the button — sized small so it fits the 32px
 * button cleanly. The chip-target wrapper is what the hover handler
 * lives on, so the tag (visual) and the target (interaction) line
 * up exactly. */
.opp-filters-toggle__count {
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

/* ── Filter row ───────────────────────────────────────────────────────────
 * Tag-density filter sits at the leading edge, set off by a vertical
 * divider, followed by the data-row filters. The two control families
 * share a row but the divider keeps the mental model — density
 * controls how much each row shows; the others narrow the row set. */
/* ── Expanded filter row ─────────────────────────────────────────────
 * Collapsible band below the search row. 1px hairlines top + bottom
 * frame it as its own section; 12px top/bottom padding gives the
 * chips room without the band feeling heavy. Filter chips use the DS
 * default 40px height — consistent with the search row above.
 * The 6px chip-to-chip gap matches the in-row tag cluster's rhythm. */
.opp-filter-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  flex-wrap: wrap;
  /* 12 top/bottom · 16 right · 10 LEFT — left-inset matches the
   * table's first-cell padding-left so this row's chips, hairlines,
   * search input above, and divider below all land at the same x. */
  padding: var(--ds-spacing-04) var(--ds-spacing-05) var(--ds-spacing-04) 10px;
  margin: 0;
  position: relative;
}
/* Top + bottom hairlines drawn as pseudo-elements so they respect the
 * row's horizontal inset — using border-top/border-bottom would paint
 * the lines edge-to-edge and break alignment. Left = 10 (column-1
 * content anchor); right = 16 (matches the toolbar's right edge). */
.opp-filter-row::before,
.opp-filter-row::after {
  content: '';
  position: absolute;
  left: 10px;
  right: var(--ds-spacing-05); /* 16 */
  height: 1px;
  background-color: var(--ds-lines-neutral-rest);
  pointer-events: none;
}
.opp-filter-row::before { top: 0; }
.opp-filter-row::after  { bottom: 0; }
.opp-filter-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  row-gap: 6px;
  flex: 1;
  min-width: 0;
}
/* Filter triggers in the expanded row use the DS default 40px height.
 * Padding matches the search-row filter override above (12px h). */
.opp-filter-row .panw--filter {
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  padding: 0 var(--ds-spacing-04); /* 12 */
}
.opp-filter-row .panw--filter.panw--filter--open,
.opp-filter-row .panw--filter__wrapper > .panw--filter.panw--filter--open {
  background-color: var(--ds-surface-selected);
  border-color: transparent;
}
.opp-filter-row .panw--filter:hover:not(.panw--filter--open),
.opp-filter-row .panw--filter__wrapper > .panw--filter:hover:not(.panw--filter--open) {
  background-color: var(--ds-surface-hover);
  border-color: transparent;
}
.opp-filter-divider {
  width: 1px;
  align-self: stretch;
  background-color: var(--ds-lines-neutral-rest);
  margin: 0 var(--ds-spacing-02);
  min-height: 24px;
}

/* ── Table ──────────────────────────────────────────────────────────────── */
/* Scroll container — full bleed to the viewport right edge (opp-page has
 * no right padding). Two JS-toggled shadow surfaces signal overflow:
 *
 *   has-scroll-right: inset box-shadow at the visible right edge. Reads as
 *     the table surface's right boundary when content is clipped. Uses
 *     --ds-shadow-tiles opacity (8%) — the content-panel elevation tier.
 *
 *   has-scroll-left: sticky-column right-edge shadow via ::after on td/th
 *     first-child. Uses --ds-shadow-tile-on-tile opacity (6%) — tile-on-tile
 *     semantics: the sticky column is literally a tile sitting above the
 *     horizontally scrolling content tiles. Toggled by the scroll listener
 *     in the component's useEffect.
 *
 * Both are crisp box-shadow surfaces, not gradient fades. */
.opp-table-shell {
  position: relative;
  overflow-x: auto;
  transition: box-shadow 150ms ease;
}
.opp-table-shell.has-scroll-right {
  box-shadow: inset -8px 0 10px -6px rgb(0 0 0 / 8%);
}
/* border-separate + border-spacing:0 allows border-radius on <td> —
 * border-collapse:collapse silently ignores border-radius on cells. */
.opp-table { width: 100%; border-collapse: separate; border-spacing: 0; table-layout: fixed; }
/* No border on header cells — the separator between header and the
 * first data row is a standalone .opp-divider-row injected at the
 * top of <tbody>, identical to the inter-row dividers. One line
 * grammar across the entire table. */
.opp-table th {
  text-align: left;
  padding: 0; /* Header owns its own padding */
  vertical-align: middle;
  /* Anchor for the absolute-positioned resize handle below. */
  position: relative;
}

/* ── Column resize handle ──────────────────────────────────────────────
 * 6px-wide hot zone straddling the column boundary on the right edge of
 * each header (last column omits it). Transparent at rest, fades a 1px
 * vertical line in neutral-rest on hover, swaps to brand while dragging.
 * The handle sits above the Header content (z-index:1) and uses col-resize
 * cursor + touch-action:none so pointer drags don't trigger scroll. */
.opp-th-resizer {
  position: absolute;
  top: 8px;
  bottom: 8px;
  right: -3px;
  width: 6px;
  z-index: 1;
  cursor: col-resize;
  user-select: none;
  touch-action: none;
}
.opp-th-resizer::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  margin-left: -0.5px;
  background-color: transparent;
  transition: background-color 110ms var(--ds-motion-easing-standard);
}
.opp-th-resizer:hover::before {
  background-color: var(--ds-lines-neutral-rest);
}
.opp-th-resizer:active::before {
  background-color: var(--ds-lines-brand-rest);
}
/* Header icon removal — kill the resting up-down indicator on every
 * header. The active up/down arrow on the currently-sorted column
 * remains (it's the only sort affordance the user has). */
.opp-table .panw--header__sort-indicator:not(.panw--header__sort-indicator--active) {
  display: none;
}

/* Four equal columns split the full width at first paint. Per-column
 * minimums are enforced in JS (useColumnResize minsRef) rather than CSS —
 * a single CSS min-width can't be per-column without column-specific
 * selectors, and JS already seeds explicit widths before paint via
 * useLayoutEffect, making CSS min-width redundant after seed.
 * Minimums: Opportunity 260px · Deal state 200px · Activity 220px · Products 160px. */
.opp-table th.opp-c-equal,
.opp-table td.opp-c-equal { width: 25%; }

/* Row backgrounds — data rows only.
 * Hover lifts the band so row-level floating actions read as engaged;
 * no :active state — clicking a row does nothing, so a pressed
 * background would write a check the interaction can't cash.
 *
 * Rest is surface-rest (white) rather than ghost-rest (transparent).
 * Visually identical since the page background is also white, but
 * opaque rows are required for the unified-hover mechanism below:
 * td:first-child uses background-color:inherit so all cells change
 * the same property in the same frame — no sticky-layer stagger. */
.opp-table tbody tr {
  background-color: var(--ds-surface-rest);
  /* Hover easing — state change in place, not an entrance.
   * 100ms sits between fast-01 (70ms) and fast-02 (110ms), right at the
   * micro-interaction boundary for a row-sized surface area. */
  transition: background-color 100ms var(--ds-motion-easing-hover);
}
/* Row hover — precomputed opaque equivalent of neutral20 @40% over white.
 * Using rgba caused a sticky-layer stagger: the tr's alpha-tint and the
 * sticky td's inset box-shadow ran as separate compositing-layer paints.
 * Opaque #F4F6F7 = 0.4×rgb(228,232,235) + 0.6×rgb(255,255,255) makes all
 * cells paint a single background-color change on the same frame.
 * Alpha-40 rather than --ds-ghost-hover (alpha-70): at alpha-70 the hover
 * composited into a near-solid band that masked nested interactive affordances
 * (icon-button hovers, tag chip hovers, link hovers). */
.opp-table tbody tr:hover  { background-color: #F4F6F7; }

/* Standalone divider rows — an independent element between rows, not
 * a border that belongs to either adjacent row. The <div> is the line;
 * the <tr> is just a carrier with no own appearance. */
.opp-divider-row { background-color: transparent !important; pointer-events: none; }
/* Specificity must beat .opp-table td (0,1,1), .opp-table tbody td:first-child (0,2,2),
 * and .opp-table tbody td:last-child (0,2,2). Three-class chain = (0,3,1). */
.opp-table .opp-divider-row td,
.opp-table .opp-divider-row td:first-child,
.opp-table .opp-divider-row td:last-child {
  padding: 0;
  border: none;
  border-radius: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  /* Reset sticky positioning inherited from data-row first-child rule */
  position: static;
  background-color: transparent;
}
.opp-divider { height: 1px; background-color: var(--ds-lines-neutral-rest); transition: opacity 110ms ease; margin: 0 16px 0 10px; }
/* Hide the divider below the hovered row */
.opp-row:hover + .opp-divider-row .opp-divider { opacity: 0; }
/* Hide the divider above the hovered row — :has() (Chrome 105+, Safari 15.4+, FF 121+) */
.opp-divider-row:has(+ .opp-row:hover) .opp-divider { opacity: 0; }
/* Per-cell padding + top-left alignment.
 * First cell:  t:12  r:8   b:12  l:16
 * Last cell:   t:12  r:8   b:16  l:8
 * Other cells: t:12  r:8   b:12  l:8
 * Row corners: 12px radius clipped on first/last td. */
/* Per-cell padding — 8px top/bottom for a compact row. First cell
 * gets 10px left padding (tightens column-1 to the row's leading
 * rail); last cell keeps the uniform 8px. The header padding
 * overrides below mirror these values so header text and row
 * content line up vertically column by column. */
.opp-table td {
  padding: 8px;
  vertical-align: top;
  color: var(--ds-text-secondary-rest);
}
.opp-table tbody td:first-child {
  padding: 8px 8px 8px 10px;
  border-radius: 8px 0 0 8px;
  /* Sticky left — keeps column-1 identity visible as the user scrolls right.
   * z-index 2 sits above normal cells but below the sticky header (z:4)
   * and the sticky actions column (z:3).
   * background-color:inherit tracks the row's value (surface-rest at rest,
   * #F4F6F7 on hover) so all cells change the same property on the same
   * compositing frame — no sticky-layer stagger. will-change hints the
   * browser to promote this layer before the hover, keeping the transition
   * in lockstep with the tr. */
  position: sticky;
  left: 0;
  z-index: 2;
  background-color: inherit;
  will-change: background-color;
}
/* Sticky-column right-edge shadow — visible only when scrollLeft > 0.
 * Toggled via .has-scroll-left class on .opp-table-shell by scroll listener.
 * Token tier: --ds-shadow-tile-on-tile (6%) — the sticky column IS a tile
 * sitting on top of the horizontally scrolling content tiles. Geometry is
 * direction-matched (rightward) since the token's downward geometry doesn't
 * apply here. Pseudo-element sits at right:-1px so it overlaps the cell edge
 * by 1px to avoid a visual gap; box-shadow provides the actual shadow area. */
.opp-table tbody td:first-child::after,
.opp-table th:first-child::after {
  content: '';
  position: absolute;
  top: 0;
  right: -1px;
  bottom: 0;
  width: 8px;
  box-shadow: 4px 0 8px -2px rgb(0 0 0 / 6%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 150ms ease;
}
.opp-table-shell.has-scroll-left .opp-table tbody td:first-child::after,
.opp-table-shell.has-scroll-left .opp-table th:first-child::after {
  opacity: 1;
}
/* 4th td (Products) keeps its right-side border-radius now that the 5th
 * 0-width actions column is the last child. */
.opp-table tbody td:nth-last-child(2) {
  padding: 8px;
  border-radius: 0 8px 8px 0;
}
/* Header alignment with row content — neutralize the DS Header's
 * default 16px padding-left and replace with values that match each
 * column's cell padding-left, so header text starts at the same x
 * as the first tag (or text element) in the column below it.
 *   th:first-child → 10 (matches first cell)
 *   th:not(:first-child) → 8 (matches every other cell) */
.opp-table th .panw--header { padding-left: 8px; }
.opp-table th:first-child .panw--header { padding-left: 10px; }
/* Sticky header first cell — z-index 4 sits above sticky body cells (z:2)
 * and sticky actions column (z:3) so it paints over both when scrolling. */
.opp-table th:first-child {
  position: sticky;
  left: 0;
  z-index: 4;
  background-color: var(--ds-surface-rest);
}
/* 0-width sticky-right column that anchors row-level action buttons.
 * overflow:visible lets the absolutely-positioned pill bleed left into
 * the visible row area. No padding or background — the cell is invisible;
 * only its right edge (which sticks to the viewport edge) matters. */
.opp-actions-col {
  width: 0;
  max-width: 0;
  padding: 0 !important;
  border-radius: 0 !important;
  position: sticky;
  right: 0;
  overflow: visible;
  z-index: 3;
  background: transparent !important;
}

/* Column 1 — name · account · value stacked.
 * Gaps are explicit margins (not flex gap) so each inter-element
 * space can be tuned independently: 4px name→account, 6px account→value. */
.opp-multiline {
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: flex-start;
}
/* Opportunity name — body-01 (14/20), regular weight, text.primary.
 * Now that the sub (account name) reads at tertiary, the name climbs
 * back to primary so the column-1 hierarchy is unambiguous:
 *   primary  → opportunity name (the row's headline)
 *   tertiary → account name (the context)
 *   primary, heading-02 → value (the row's mass). */
.opp-multiline__name {
  font-weight: var(--ds-type-font-weight-regular);
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-primary);
  /* Truncate with ellipsis instead of wrapping when the name exceeds
   * the column width. The table runs table-layout:fixed, so the td
   * sets a hard width and the block-level link can clip inside it.
   * min-width:0 lets the link shrink below its intrinsic content
   * width (required for ellipsis to fire inside a flex column). */
  display: block;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* Account sub — label-02 (14/18, +0.01px tracking), text.tertiary.
 * One step down from the name in weight-of-presence; 13px was an
 * off-token size and is gone. */
.opp-multiline__sub {
  /* 2px under the opportunity name — tight pairing because the
   * account is the name's direct supporting context, not a separate
   * tier of information. */
  margin-top: 2px;
  font-weight: var(--ds-type-font-weight-regular);
  font-size: 14px;
  line-height: 1.28572;
  letter-spacing: 0.01px;
  color: var(--ds-text-tertiary-rest);
}
/* Value — heading-02 (16/24 semibold). Down from heading-03's
 * 20/28: the table is moving to a more compact, more precise
 * rhythm; the value still leads the column in mass, just at
 * 16px instead of 20px. */
.opp-multiline__value {
  /* 4px under the account name — keeps the column-1 stack tight so
   * the value reads as part of the same cluster (name · account ·
   * value), not a separate block. */
  margin-top: 4px;
  font-size: 16px;
  line-height: 24px;
  font-weight: var(--ds-type-font-weight-semibold);
  letter-spacing: -0.15px;
  color: var(--ds-text-primary);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
/* Anchor affordance for the multiline links. The rest color is
 * inherited from the paired role class (.opp-multiline__name →
 * text.secondary, .opp-multiline__sub → text.tertiary), so this
 * class only carries link-specific behavior: no underline at rest,
 * pointer cursor, and the brand hover state below. Setting an
 * explicit rest color here would mask the role's tier in the
 * column-1 hierarchy. */
.opp-multiline__link {
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
  /* 4px on both axes — tighter chip-to-chip rhythm so the cluster
   * reads as one cluster rather than a string of separate chips.
   * Single gap shorthand covers row-gap + column-gap together. */
  gap: 4px;
  align-items: center;
}

/* ── Product cluster — full wrapping, no +N collapse ─────────────────────
 * Earlier iteration kept this on a single line and measured-and-truncated
 * to +N. Per design call, the cluster now wraps and shows every product;
 * the column has the vertical budget for it and the AE needs the full
 * inventory, not a teaser. Tags pass through the standard DS chrome. */
.opp-product-cluster {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ds-spacing-02);
  min-width: 0;
  max-width: 100%;
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
  /* Surface chrome lives on the wrapper (mirrors acc-table). The
   * .opp-pop content layer carries padding + typography only. */
  background-color: var(--ds-surface-rest);
  border: 1px solid var(--ds-lines-neutral-rest);
  border-radius: var(--ds-radius-generous);
  box-shadow: var(--ds-shadow-flyout);
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
 *    Product, Renewal). Ported from the acc-table pattern — the two
 *    tables now share one popover grammar:
 *      • 14px floor on every text class (no 12/13px below)
 *      • tabular row lists with hairline dividers between rows AND
 *        top/bottom hairlines on the list itself, drawn as absolutely
 *        positioned pseudos so the row's border-radius doesn't bend
 *        the line at the corners.
 *      • rows extend to the popover's content edge (negative margin)
 *        so the hover band reads as a generous shape, then re-impose
 *        their own 8px text inset so labels land on a single rail.
 *
 *    Visual lineage: surface.rest + shadow-flyout + radius-generous,
 *    16px padding (structured per stage-spacing.md flyout/popover
 *    rules + the Figma "Active Quote" reference). */
/* Popover width tiers (system rule).
 * Every popover commits to one of three widths: 160 / 240 / 320.
 * Variants below opt into a tier by setting an explicit width on
 * the .opp-pop wrapper. The wrapper itself stays width-agnostic so
 * the tier choice is visible at the variant level, not buried in a
 * default. */
.opp-pop {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03); /* 8 between blocks */
  width: 240px; /* default tier — overridden by variant modifiers */
  padding: var(--ds-spacing-05); /* 16 all sides */
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-primary);
  box-sizing: border-box;
}
/* 320 — content-dense surfaces (health, risks, renewal). */
.opp-pop--health,
.opp-pop--risks,
.opp-pop--renewal { width: 320px; }
/* 240 — single-concept surfaces (activity-simple, sales-play). */
.opp-pop--simple,
.opp-pop--salesplay { width: 240px; }
/* Sales-play panel always has exactly one KV row — no dividers needed,
 * and no gap between the row and the CTA (the row and button sit flush). */
.opp-pop--salesplay { gap: 0; }
.opp-pop--salesplay .opp-pop__kv-list::before,
.opp-pop--salesplay .opp-pop__kv-list::after { display: none; }
/* Product popover (issue #11) — 280px tier. Default 240px is too narrow
 * for longer SKU strings (e.g. PAN-XSOAR-CLD-ENT + price); 280px gives
 * the SKU table a 248px content rail (280 − 2×16) which comfortably fits
 * the longest SKU (~20 chars) and a compact price without truncation. */
.opp-pop--product { width: 280px; }
/* SKU code cell — matches .opp-pop__sku-price at 13px so both cells
 * share the same baseline and the row reads as a single unit.
 * Inherits the sans-serif font family from .opp-hover-panel (same as
 * every other cell in the popover — no monospace). */
.opp-pop__sku-code {
  font-size: 13px;
  line-height: 20px;
  color: var(--ds-text-secondary-rest);
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* SKU price cell — tabular numerals, never shrinks. Medium weight (500)
 * so the heading row's semibold value reads as the dominant figure. */
.opp-pop__sku-price {
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  color: var(--ds-text-primary);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
/* Single-button popover — no tier width. The popover is a halo
 * around exactly one button, so it sizes to fit that button rather
 * than committing to one of the 160 / 240 / 320 tiers. The
 * action block further down sets the 8px halo padding. */
.opp-pop--action { width: fit-content; }
/* Two-line popovers — 4px between heading and sub. Default is 0
 * because the sub's negative top margin (-8px) cancels the parent
 * gap-8; here we restore +4 so the sub reads as a tight subtitle
 * directly under the heading. Shared by:
 *   • .opp-pop--empty       — no-risk empty state (heading + body)
 *   • .opp-pop--two-line    — activity hover (description + days-ago) */
.opp-pop--empty .opp-pop__sub,
.opp-pop--two-line .opp-pop__sub {
  margin-top: calc(-1 * var(--ds-spacing-03) + 4px);
}
.opp-pop__heading {
  font-size: 14px;
  line-height: 20px;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
}
.opp-pop__sub {
  /* Tertiary text + negative top margin = the "tight under heading"
   * treatment. Held at 14/20 per popover-text floor. */
  margin-top: calc(-1 * var(--ds-spacing-03));
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-tertiary-rest);
}
.opp-pop__chart {
  display: flex;
  margin: var(--ds-spacing-01) 0;
}
.opp-pop__cta {
  display: flex;
  /* Whitespace between the last row and the CTA is the parent
   * .opp-pop gap-8 alone — no padding-top here. Matches the acc-pop
   * CTA contract. */
}
.opp-pop__cta .panw--btn {
  /* Health CTA renders as a full-width centered button inside the
   * popover frame — the button is the popover's single commitment,
   * not a corner action. Mirrors the acc-pop CTA treatment. */
  width: 100%;
  justify-content: center;
}

/* ── Tabular row pattern ─────────────────────────────────────────────
 * See the matching block in acc-table for the architecture note.
 * Dividers are pseudos, not borders, so the row's border-radius
 * doesn't curve them at the corners. Rows extend 8px past the
 * popover content edge via negative margin, then re-impose an 8px
 * text inset internally, so labels land on the same 16px rail as
 * the popover's heading. */
.opp-pop__rows,
.opp-pop__kv-list,
.opp-pop__risk-list,
.opp-pop__product-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  margin: 0 calc(-1 * var(--ds-spacing-03));
  padding: 0;
}
/* List top hairline. */
.opp-pop__rows::before,
.opp-pop__kv-list::before,
.opp-pop__risk-list::before,
.opp-pop__product-list::before {
  content: '';
  display: block;
  height: 1px;
  margin: 0 var(--ds-spacing-03);
  background-color: var(--ds-lines-neutral-rest);
}
/* List bottom hairline. */
.opp-pop__rows::after,
.opp-pop__kv-list::after,
.opp-pop__risk-list::after,
.opp-pop__product-list::after {
  content: '';
  display: block;
  height: 1px;
  margin: 0 var(--ds-spacing-03);
  background-color: var(--ds-lines-neutral-rest);
}
/* Each row. The row extends 8px past the popover content edge (via
 * the list's negative horizontal margin) so its hover pill reads as
 * a generous shape; text sits inside the row with 8px horizontal
 * padding so it never touches the row's own edge and lands on the
 * same 16px rail as the popover heading. position:relative anchors
 * the inter-row line pseudo (::before below). Mirrors .acc-pop's
 * row contract exactly.
 *
 * Default justify: flex-start. Earlier this was space-between, which
 * left numeric values floating against the right edge of the row,
 * separated from their labels by a stretch of empty band. flex-start
 * keeps label and value adjacent so the pair reads as one unit.
 * Tag-bearing rows (.opp-pop__rows — health KV with chips on the
 * right) override back to space-between below. */
.opp-pop__rows > *,
.opp-pop__kv-list > *,
.opp-pop__risk-list > *,
.opp-pop__product-list > * {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--ds-spacing-04);
  margin: 0;
  padding: 0 var(--ds-spacing-03); /* 0 vertical / 8 horizontal — height comes from the fixed row-height tier alone */
  cursor: pointer;
  background-color: var(--ds-ghost-field-rest);
  border-radius: var(--ds-radius-tight);
  transition: background-color 110ms var(--ds-motion-easing-hover);
}
/* Label-left, value-right layout for every KV-style row: tag-bearing
 * health rows AND the numeric renewal rows (Subscription end /
 * Renewable TCV / ARR) both push the right column to the trailing
 * edge so dates and figures right-align in a clean column instead of
 * floating mid-row next to the label.
 *
 * NOTE — overflow risk to harden if labels or values ever grow:
 * these rows use space-between with no flex-shrink rules on either
 * side. With short labels (e.g. "ARR") and short values (e.g. "$1.2M")
 * everything fits inside the popover's content rail today. If a
 * future label/value pair would exceed the rail, content will bleed
 * past the popover's right edge (the panel defaults to overflow:
 * visible). Fix when needed: give the label flex:1 1 0, min-width:0,
 * overflow:hidden, text-overflow:ellipsis; and the value
 * flex-shrink:0 — same pattern used in .opp-pop-row__name /
 * .opp-pop-row__value where the same overflow bug was already
 * surfaced and fixed. */
.opp-pop__rows > *,
.opp-pop__kv-list > * { justify-content: space-between; }
/* Row-height convention (matches the live table cells):
 *   if the row carries a tag    → 40px fixed
 *   else (text-only / emoji)    → 32px fixed
 * Tag-bearing lists in opp-pop: .opp-pop__rows (health kv with the
 * adoption / technical Tag chips). Everything else is text-only. */
.opp-pop__rows > * { height: 40px; }
.opp-pop__kv-list > *,
.opp-pop__risk-list > *,
.opp-pop__product-list > * { height: 32px; }
/* Inter-row line. */
.opp-pop__rows > * + *::before,
.opp-pop__kv-list > * + *::before,
.opp-pop__risk-list > * + *::before,
.opp-pop__product-list > * + *::before {
  content: '';
  position: absolute;
  top: -1px;
  left: var(--ds-spacing-03);
  right: var(--ds-spacing-03);
  height: 1px;
  background-color: var(--ds-lines-neutral-rest);
}
/* Row hover/press states — ghost.field family, matching .acc-pop. */
.opp-pop__rows > *:hover,
.opp-pop__kv-list > *:hover,
.opp-pop__risk-list > *:hover,
.opp-pop__product-list > *:hover {
  background-color: var(--ds-ghost-field-hover);
}
.opp-pop__rows > *:active,
.opp-pop__kv-list > *:active,
.opp-pop__risk-list > *:active,
.opp-pop__product-list > *:active {
  background-color: var(--ds-ghost-field-pressed);
}
/* When a row is hovered, hide:
 *   (a) its own ::before (top inter-row divider)
 *   (b) the next sibling's ::before (which is THIS row's bottom
 *       inter-row divider when there's a row below)
 * so the pill reads as one clean rounded shape. */
.opp-pop__rows > *:hover::before,
.opp-pop__kv-list > *:hover::before,
.opp-pop__risk-list > *:hover::before,
.opp-pop__product-list > *:hover::before,
.opp-pop__rows > *:hover + *::before,
.opp-pop__kv-list > *:hover + *::before,
.opp-pop__risk-list > *:hover + *::before,
.opp-pop__product-list > *:hover + *::before {
  background-color: transparent;
}
/* And when the first / last row is hovered, hide the list's own
 * top / bottom hairline respectively. :has() is required because
 * we need to reach the list pseudo from the hovered row. */
.opp-pop__rows:has(> *:first-child:hover)::before,
.opp-pop__kv-list:has(> *:first-child:hover)::before,
.opp-pop__risk-list:has(> *:first-child:hover)::before,
.opp-pop__product-list:has(> *:first-child:hover)::before {
  background-color: transparent;
}
.opp-pop__rows:has(> *:last-child:hover)::after,
.opp-pop__kv-list:has(> *:last-child:hover)::after,
.opp-pop__risk-list:has(> *:last-child:hover)::after,
.opp-pop__product-list:has(> *:last-child:hover)::after {
  background-color: transparent;
}

/* KV row — label left, value right. */
.opp-pop__kv-label {
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-secondary-rest);
}
.opp-pop__kv-value {
  font-size: 14px;
  line-height: 20px;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* Risk row — leading emoji, then label. justify-content:flex-start
 * overrides the list default (space-between) so the emoji and label
 * stay snug. */
.opp-pop__risk-list > * {
  justify-content: flex-start;
  gap: var(--ds-spacing-03);
}
.opp-pop__risk-emoji {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 16px;
  line-height: 1;
}
.opp-pop__risk-label {
  flex: 1;
  /* Truncate to a single line — rows are fixed-height (32px), so a
   * second line would overflow and break the rhythm. min-width:0
   * unlocks the flex child so it can shrink below its content size
   * and the ellipsis takes effect. Full text is preserved on the
   * title attribute (browser tooltip on hover). */
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-primary);
}

/* Product popover (single-row, no list chrome). Mirrors
 * .acc-pop-row exactly: icon · name · value on a 40px CellStandard
 * row. 16px horizontal padding matches the popover's text rail.
 * Restored per design call — a product popover is a tag expanded,
 * not a row of a table. */
.opp-pop-row {
  display: flex;
  align-items: center;
  /* Text + icon row (no tag) → 32px per the popover row-height
   * convention. Tag-bearing rows use the 40px tier. */
  height: 32px;
  /* No horizontal padding: the wrapping .opp-pop already provides
   * 16px horizontal padding around the row. Compounding the two
   * would push content to 32px from the popover frame. */
  padding: 0;
  gap: var(--ds-spacing-03);       /* 8  */
  min-width: 0;
  white-space: nowrap;
}
.opp-pop-row__icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}
.opp-pop-row__name {
  font-size: 14px;
  line-height: 20px;
  font-weight: var(--ds-type-font-weight-regular);
  color: var(--ds-text-secondary-rest);
  /* Name yields width when the icon+name+value triplet would exceed
   * the popover's 208px content rail. flex:1 1 0 makes it the
   * flex item that absorbs/releases space; min-width:0 unlocks
   * shrink-below-content for text inside a flex item; overflow +
   * text-overflow render the ellipsis. Without these, longer
   * product names pushed the trailing value out past the popover's
   * right edge (the panel has overflow:visible by default). */
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
.opp-pop-row__value {
  font-size: 14px;
  line-height: 20px;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
  margin-left: var(--ds-spacing-06); /* 24 — clear separation from name */
  /* Never shrink the dollar value — when the row runs tight the
   * name truncates instead. The figure is the row's payload. */
  flex-shrink: 0;
}

/* ── Row-level floating actions ──────────────────────────────────────────
 * Absolutely positioned relative to the <tr> (position:relative).
 * Two ghost icon-buttons sit inside an inverse-surface pill. The pill
 * carries the dark ground; buttons are transparent at rest and shift
 * through surface.inverse hover/pressed so the dark pill reads as a
 * single interactive unit, not two disconnected chips. */
.opp-row { position: relative; }
/* Action pill is absolutely positioned inside .opp-actions-col, the 0-width
 * sticky-right <td>. right:6px / bottom:6px are relative to that cell's
 * bounding box — its right edge is pinned to the viewport right edge by
 * the sticky positioning, so the pill stays reachable regardless of scroll. */
.opp-row-actions {
  position: absolute;
  bottom: 6px;
  right: 6px;
  z-index: 1;
  pointer-events: none; /* invisible at rest — row hover enables them */
  opacity: 0;
  transition: opacity 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.opp-row:hover .opp-row-actions {
  opacity: 1;
  pointer-events: auto;
}
/* Pill wrapper — dark inverse ground with 2px padding and 2px inter-button
 * gap. Outer radius = inner button radius (4px) + padding (2px) = 6px,
 * keeping the compound-radius relationship exact. */
.opp-row-actions__pill {
  display: flex;
  gap: 2px;
  padding: 2px;
  background-color: var(--ds-surface-inverse-rest);
  border-radius: var(--ds-radius-tight);
}
/* Buttons on the inverse ground: transparent rest, surface.inverse shift
 * on hover/pressed, icons.inverse white family throughout. */
.opp-row-actions__pill .panw--btn-icon {
  background-color: transparent;
  color: var(--ds-icons-inverse-rest);
}
/* DS sm+16 = 32px; lock these action buttons to 24px */
.opp-row-actions__pill .panw--btn-icon--sm.panw--btn-icon--icon-16 {
  width: 1.5rem;
  height: 1.5rem;
}
.opp-row-actions__pill .panw--btn-icon:hover:not(:disabled) {
  background-color: var(--ds-surface-inverse-hover);
  color: var(--ds-icons-inverse-hover);
}
.opp-row-actions__pill .panw--btn-icon:active:not(:disabled) {
  background-color: var(--ds-surface-inverse-pressed);
  color: var(--ds-icons-inverse-pressed);
}

/* Button tooltip — overrides the popover chrome on the HoverShell panel
 * with tooltip chrome: inverse surface, label-01 text, no border, tight radius.
 * Tooltip slides up from the button; animation-name replaces the popover
 * slide-down (opp-hover-in). white-space:nowrap prevents the label from
 * wrapping inside the compact inverse pill. */
@keyframes opp-tooltip-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.opp-hover-panel.opp-btn-tooltip {
  background-color: var(--ds-surface-inverse-rest);
  border: none;
  border-radius: var(--ds-radius-tight);
  padding: 8px 12px;
  animation: opp-tooltip-up 70ms var(--ds-motion-easing-entrance);
  font-family: var(--ds-type-font-family-sans);
  font-size: 12px;
  line-height: 16px;
  color: var(--ds-text-inverse-rest);
  white-space: nowrap;
}

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
.opp-tree__row--leaf { padding-left: 28px; }

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
 * (View Quote).
 *
 * No tier width — the wrapper sizes to fit the button (set in the
 * tier block above as width: fit-content). Inner padding is 8px
 * all sides: the 16px system padding doubles up with the button's
 * own padding and reads as a button trapped in a frame, while 4px
 * is too tight to register as a halo. 8 is the comfortable middle. */
.opp-pop--action {
  padding: var(--ds-spacing-03); /* 8 — halo around the lone button */
  gap: 0;
}
.opp-pop--action .panw--btn { width: 100%; justify-content: center; }

/* ── Quote popover (issue #13) ────────────────────────────────────────────
 * 320px width (same tier as health / risks / renewal). Three tabular KV
 * rows (Term Length, Route to Market, Payment Option) followed by the
 * "View quote" CTA button. The table uses the same .opp-pop__rows
 * pattern as the Renewal popover so dividers and typography are
 * consistent across all 320-tier surfaces. */
.opp-pop--quote { width: 320px; }
/* Override gap between the table and the CTA — a single gap-8 already
 * separates them via the parent .opp-pop; no extra margin needed. */
.opp-pop__rows--quote { margin-bottom: 0; }
/* Quote rows carry text only (no chips) — use the 32px text-only height
 * instead of the 40px tag-bearing height inherited from .opp-pop__rows > *. */
.opp-pop__rows--quote > * { height: 32px; }
/* Right-side value column is bold to create label / value contrast. */
.opp-pop--quote .opp-pop__row-value { font-weight: 600; }
.opp-pop--quote .opp-pop__cta .panw--btn { width: 100%; justify-content: center; }

/* ── Renewal popover (spec §4.2) ──────────────────────────────────────────
 * Renewal rows ride the shared .opp-pop__kv-list pattern — hairline
 * dividers between rows, top/bottom hairlines on the list, 14px
 * typography. The outcome editor sits below as a separate form block
 * (not a list row — its content is interactive, not display).
 */
/* Renewal popover width is governed by the 320 tier (set on the
 * shared variant block at the top of this section). No bespoke
 * min/max here — the renewal surface must read at the same width
 * as the other 320-tier popovers (health, risks, EBC). */
/* Outcome row is the interactive control — break it out of the
 * tabular list as a dedicated row with a leading divider. Same
 * label/value rhythm as the list rows above. */
.opp-renewal-outcome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ds-spacing-04);
  /* Tag-bearing row (outcome chip with trailing chevron) → 40px,
   * matching the convention used by .opp-pop__rows. */
  height: 40px;
  /* Cancel the parent .opp-pop gap-8 above this row. The kv-list
   * directly above already paints its own bottom hairline (::after);
   * the parent gap-8 was stacking a second visual rest between the
   * ARR row and this outcome row that read as wasted whitespace.
   * Pulling -8px brings this row flush against the kv-list's bottom
   * hairline, so the hairline now reads as the "divider between
   * data rows and the interactive editor row" rather than as the
   * table's bottom border with an unmotivated gap below it. */
  margin-top: calc(-1 * var(--ds-spacing-03));
}
.opp-renewal-outcome__label {
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-secondary-rest);
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
  /* Negative margin cancels the parent .opp-pop gap-8 that would otherwise
   * stack above this element. The border-top hairline is the separator;
   * padding-top provides breathing room on the form side of it. No
   * double-gap between the outcome row and the first field. */
  margin-top: calc(-1 * var(--ds-spacing-03));
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
/* Last-activity severity icons — tag is forced neutral but the icon
 * keeps its semantic color. Specificity (0,5,1) beats icon-quiet (0,4,1). */
.panw--tag.opp-tag--icon-quiet.panw--tag--low.panw--tag--neutral.opp-act--orange .panw--tag__icon {
  color: var(--ds-icons-status-caution);
}
.panw--tag.opp-tag--icon-quiet.panw--tag--low.panw--tag--neutral.opp-act--red .panw--tag__icon {
  color: var(--ds-icons-status-danger);
}

/* ── Sales-play status icon colors (.opp-sp-tag--*) ─────────────────────────
 * Color is reserved for the icon; the chip ground stays neutral-low across
 * all statuses so the column reads as quiet at scan-distance and the icon
 * alone carries the state signal.
 *
 * Specificity reference: DS ships
 *   .panw--tag.panw--tag--low.panw--tag--neutral .panw--tag__icon { color: ... }
 * at (0,4,0). Our rules must beat that — each carries the full neutral chain
 * plus the status modifier: (0,5,0). SVG fill override ensures path-level
 * 'fill' attributes on the named DS icons are recolored cleanly.
 *
 * Color semantics (matches acc-table):
 *   not-touched → danger red   (action item — only urgent status)
 *   pursuing    → success green (in-flight)
 *   closed-won  → mint-50      (positive completion, distinct from pursuing)
 *   all others  → icons.secondary.rest (neutral / informational)
 */
.panw--tag.panw--tag--low.panw--tag--neutral.opp-sp-tag .panw--tag__icon svg,
.panw--tag.panw--tag--low.panw--tag--neutral.opp-sp-tag .panw--tag__icon svg path {
  fill: currentColor;
}
.panw--tag.panw--tag--low.panw--tag--neutral.opp-sp-tag--not-touched .panw--tag__icon { color: var(--ds-icons-status-danger); }
.panw--tag.panw--tag--low.panw--tag--neutral.opp-sp-tag--pursuing    .panw--tag__icon { color: var(--ds-icons-success); }
.panw--tag.panw--tag--low.panw--tag--neutral.opp-sp-tag--closed-won  .panw--tag__icon { color: var(--ds-color-core-mint-50); }
.panw--tag.panw--tag--low.panw--tag--neutral.opp-sp-tag--pitched     .panw--tag__icon,
.panw--tag.panw--tag--low.panw--tag--neutral.opp-sp-tag--deferred    .panw--tag__icon,
.panw--tag.panw--tag--low.panw--tag--neutral.opp-sp-tag--declined    .panw--tag__icon,
.panw--tag.panw--tag--low.panw--tag--neutral.opp-sp-tag--closed-lost .panw--tag__icon { color: var(--ds-icons-secondary-rest); }

/* Filter-chip hover popover lives entirely in the DS — see
 * @ds/styles/scss/components/filter/_filter.scss for the
 * .panw--filter__chip-popover ruleset. No local override needed. */

/* Tag padding + shape-rounded radius are now shipped natively by
 * @ds/tags (size-large: 5/10, shape-rounded+size-large: 4px radius).
 * Inline .stage overrides removed — let the DS rules take effect. */

/* Neutral-low tag styling is now shipped natively by @ds/tags:
 *   rest: surface.rest with a 1px inset border (--ds-base = neutral10)
 *   hover/active: field.hover / field.pressed, border drops
 * Local overrides removed — let the DS rules take effect. */

/* ── Tag-as-trigger forced hover state ────────────────────────────
 * When a tag opens a hover popover, the cursor moves off the tag
 * onto the panel — at which point the tag's :hover CSS releases
 * and the tag visually pops back to rest, even though the popover
 * it spawned is still on screen. That breaks the relationship: the
 * AE loses the visual link between "this tag" and "this popover".
 *
 * HoverShell sets data-popover-open="true" on its trigger span
 * while the panel is open; the rules below paint each tag color's
 * hover surface for the duration of the popover, matching the
 * tokens the DS uses on the native :hover state. Categorical
 * colors source from --ds-tag-{color}-low-bg-hover; neutral
 * follows the DS neutral path (field.hover + box-shadow:none). */
.opp-hover-trigger[data-popover-open="true"] .panw--tag.panw--tag--low.panw--tag--neutral {
  background-color: var(--ds-field-hover);
  box-shadow: none;
}
.opp-hover-trigger[data-popover-open="true"] .panw--tag.panw--tag--low.panw--tag--green {
  background-color: var(--ds-tag-green-low-bg-hover);
}
.opp-hover-trigger[data-popover-open="true"] .panw--tag.panw--tag--low.panw--tag--yellow {
  background-color: var(--ds-tag-yellow-low-bg-hover);
}
.opp-hover-trigger[data-popover-open="true"] .panw--tag.panw--tag--low.panw--tag--orange {
  background-color: var(--ds-tag-orange-low-bg-hover);
}
.opp-hover-trigger[data-popover-open="true"] .panw--tag.panw--tag--low.panw--tag--red {
  background-color: var(--ds-tag-red-low-bg-hover);
}
.opp-hover-trigger[data-popover-open="true"] .panw--tag.panw--tag--low.panw--tag--grey {
  background-color: var(--ds-tag-grey-low-bg-hover);
}
.opp-hover-trigger[data-popover-open="true"] .panw--tag.panw--tag--low.panw--tag--olive {
  background-color: var(--ds-tag-olive-low-bg-hover);
}
.opp-hover-trigger[data-popover-open="true"] .panw--tag.panw--tag--low.panw--tag--lime {
  background-color: var(--ds-tag-lime-low-bg-hover);
}
.opp-hover-trigger[data-popover-open="true"] .panw--tag.panw--tag--low.panw--tag--jade {
  background-color: var(--ds-tag-jade-low-bg-hover);
}

/* ── Static-tag override ─────────────────────────────────────────────────
 * Tags rendered without a hover surface should not pick up the DS
 * Tag's default :hover bg shift — they're labels, not affordances.
 * pointer-events: none routes hover/click through to the wrapping
 * element (a filter trigger button, a popover row, etc.) without
 * needing per-color :hover overrides for every categorical palette
 * the tag might use. The wrapper owns interaction; the tag is a
 * label. Mirrors the .acc-tag--static contract. */
.panw--tag.opp-tag--static {
  pointer-events: none;
  cursor: default;
}

/* ── Health-trend bar chart (account-health popover) ─────────────────────
 * No special styles — the SVG carries its own geometry. Reserved for
 * the wrapper so the chart anchors cleanly under the sub-heading. */
.opp-health-bars { display: block; }
`

// ─── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'compositions/AE Opportunity Table',
  excludeStories: ['AEOpportunityTable', 'DEFAULT_ROWS', '__oppPopoverParts'],
}
export default meta

export const Default: StoryObj = {
  render: () => <AEOpportunityTable />
}

// Internal handle used by the "explorations/Table Popovers" showcase.
// Exposed as a single object so Storybook's auto-story-detection ignores
// it (object exports aren't treated as story renderers). Do not import
// this from product code — it's a demo seam, not API.
export const __oppPopoverParts = {
  LAYOUT_CSS,
  AccountHealthPanel,
  RiskFactorsPanel,
  ProductPanel,
  ActionButtonPanel,
  RenewalPanel,
}
