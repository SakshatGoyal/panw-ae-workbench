/**
 * AE Account Table — book-of-business composition
 *
 * Sister to AE Opportunity Table (`opportunity-table.stories.tsx`).
 * Spec: `data-models/accounts-table-reference.md`.
 *
 * ── Scope (one unified build) ───────────────────────────────────────────
 *   Seven columns: Account · Opportunities (4-Q pipeline) · Activities &
 *   Risks (4 sub-cells: Last Activity / Account Health / Risk Factors /
 *   EBC) · Products · Sales Plays (status-bucket rollup) · Value
 *   (ARR + LTV) · Actions.
 *
 *   Three filter rows: search + sort + key metrics; tag-density chip;
 *   data filters (Close Date · Account Health (grouped) · Last Activity
 *   · EBC · Upsell · Account Risk Factors · Products).
 *
 *   Filtering wiring is left for a later pass — chips render and hold
 *   state, but the table renders the full row set, mirroring the
 *   opp-table demo posture.
 *
 * ── Intentional semantic differences from opp-table ────────────────────
 *   1. Risk factors are ACCOUNT-LEVEL — six-value taxonomy distinct
 *      from opp-table's nine deal-level risks. `AccountRiskId` is a
 *      DELIBERATELY DIFFERENT TYPE from opp-table's `RiskId` to bug-
 *      proof a future "share the union" refactor (spec §2 + §4.3).
 *   2. Column 4 product hover shows PER-PRODUCT ARR (absolute dollars).
 *      Opp-table shows "share of deal value" (a percentage). The
 *      ProductPanel here is a fresh implementation; do not port the
 *      opp-table's percentage formula (spec §4.4).
 *   3. Column 2 is FOUR quarter-pipeline tags, not deal-state tags.
 *      Current quarter labeled `CQ` (not its named fiscal name); the
 *      next three quarters are named. Empty quarters render as
 *      placeholder tags with `$—` — absence is data, not a missing tag
 *      (spec §4.2).
 *   4. EBC sub-cell carries a discriminated-union date shape: either
 *      `{ date: string }` or `{ absent: true }`. "No EBC on record"
 *      falls into the >365d filter bucket but the tag copy reads "No
 *      EBC on record" instead of a date (spec §3.8 + §4.3).
 *   5. Default sort is "Risk Factor Count, descending" (spec §5).
 *   6. Default Account Health filter is "Overall = At Risk + Critical,
 *      sub-axes OFF" — opp-table defaults the sub-axes ON, this one
 *      OFF (spec §5 explicit).
 *   7. Search excludes opportunity names and quote IDs (those are
 *      deal-level concerns; this is the account table) (spec §3.1).
 *   8. The single "Upsell" single-select filter replaces opp-table's
 *      three-value Opportunity Type filter (spec §3.9).
 *
 * ── Demo-time constants ────────────────────────────────────────────────
 *   `DEMO_TODAY` pins the fiscal calendar at a single instant so the
 *   fixture, the CQ label, and the named quarters never drift. The
 *   spec doc was authored against May 2026; the constant matches.
 *
 * ── Conventions inherited from opp-table ───────────────────────────────
 *   • Tag presets: shape="rounded" size="large" color="neutral"
 *     contrast="low".
 *   • Hover popovers: 700ms open delay, portal positioning, auto-flip,
 *     scroll/resize auto-close (HoverShell pattern).
 *   • No zebra. Hairline dividers between body rows.
 *   • Counts label is body-02 bold, tabular nums.
 *   • IACVT workaround at the bottom of LAYOUT_CSS.
 *
 * ── Forked primitives (drift debt acknowledged) ────────────────────────
 *   For lane discipline I am NOT importing from opp-table; the
 *   primitives below are forked. When a bug is found in opp-table's
 *   copy, it almost certainly applies here too:
 *     - `HoverShell`               (opp-table ~L1237)
 *     - `SortFlyout`               (opp-table ~L686)
 *     - `SingleSelectFilter`       (opp-table ~L743)
 *     - `ProductFilter` + tree     (opp-table ~L805)
 *     - `TagDensityFilter`         (opp-table ~L1031)
 *     - `GroupedHealthFilter`      (opp-table ~L1109)
 *     - `AppliedListPanel`         (opp-table ~L1000)
 *     - `HealthTrendBars` + panel  (opp-table ~L1424 / L1466)
 *
 * ── System gaps surfaced (same list as opp-table) ──────────────────────
 *   No grouped multi-select Filter primitive · no tree variant of
 *   Filter · no single-select Filter · no measure-and-truncate primitive
 *   (built locally as ProductCluster / SalesPlayCluster).
 */

import type { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Calendar, Clock, Stars, ChevronDown, ChevronUp, ChevronRight, Folder,
  ExclamationTriangle, ExclamationCircle,
  BrandStrata, BrandPrisma, BrandCortex,
} from '@ds/icons'
import { Search } from '@ds/search'
import { Filter, type FilterOption } from '@ds/filter'
import { Header } from '@ds/header'
import { Pagination } from '@ds/pagination'
import { Button, IconButton } from '@ds/button'
import { Tags, type TagColor } from '@ds/tags'
import { Tooltip } from '@ds/tooltip'
import { Checkbox } from '@ds/checkbox'
import {
  Flyout,
  FlyoutList,
  FlyoutItem,
  FlyoutGroup,
  FlyoutSelectAll,
  FlyoutFooter,
} from '@ds/flyout'

// ─── Types ────────────────────────────────────────────────────────────────

type Health = 'healthy' | 'at-risk' | 'critical'
type Brand = 'strata' | 'prisma' | 'cortex' | 'unit-42'
type LastActivityBucket = 'lt-7' | '7-21' | 'gt-21'

/** Account-level risk taxonomy (spec §2). NOT the same as opp-table's
 *  deal-level `RiskId` — the literal union is intentionally narrower
 *  here so a careless union-merge in a future refactor fails to compile
 *  rather than silently widening. */
type AccountRiskId =
  | 'no-pipeline'
  | 'no-ebc'
  | 'not-platformized'
  | 'derailed-povs'
  | 'no-asr'
  | 'no-csp'

type SalesPlayStatus =
  | 'not-touched' | 'pitched' | 'deferred' | 'declined'
  | 'pursuing' | 'closed-won' | 'closed-lost'

/** Lifecycle order (spec §4.5). Single source of truth for column 5
 *  ordering AND tag-density status-key naming. */
const SALES_PLAY_LIFECYCLE: readonly SalesPlayStatus[] = [
  'not-touched', 'pitched', 'deferred', 'declined',
  'pursuing',    'closed-won', 'closed-lost',
] as const

interface Product { name: string; brand: Brand; arrUsd: number }
interface AccountRiskFactor { id: AccountRiskId; emoji: string; label: string }
interface AccountHealth {
  overall: Health
  technical: Health
  adoption: Health
  trend12mo: number[] // 12 monthly readings oldest → newest; 0/1/2 = healthy/at-risk/critical
}
interface Activity { daysAgo: number; description: string }

/** EBC discriminated union — explicitly not a nullable date. The "no
 *  EBC" branch is data, not a sentinel (spec §4.3). */
type EBC =
  | { absent: true }
  | { absent: false; date: string; topic: string; attendees: string[] }

/** Per-quarter pipeline. `usd` is the *sum* of opportunity values
 *  closing in this quarter; opps[] feeds the hover popover (type +
 *  dollar, no name — spec §4.2). */
interface QuarterPipeline {
  label: string       // "CQ" | "Q1FY27" | ...
  usd: number         // 0 = empty quarter (placeholder tag rendered as $—)
  opps: { type: 'net-new' | 'upsell' | 'renewal'; usd: number }[]
}

/** Per-status sum of plays in this bucket. `plays[]` feeds the hover
 *  popover. */
interface SalesPlayBucket {
  status: SalesPlayStatus
  usd: number
  plays: { name: string; usd: number }[]
}

interface AccountRow {
  id: string
  name: string
  apex: string | null
  /** 4 entries — CQ + next three named quarters, always in order. */
  pipeline: [QuarterPipeline, QuarterPipeline, QuarterPipeline, QuarterPipeline]
  /** Sum of pipeline[*].usd across all four. Cached for sort + the
   *  Upsell single-select filter ("any upsell in 4Q?"). */
  totalPipelineUsd: number
  hasUpsellPipeline: boolean
  activity: Activity
  health: AccountHealth
  ebc: EBC
  /** Risk factors are AUTHORED on the row; in a real impl they'd be
   *  derived from signals (no-ebc derived from `ebc.absent || daysSince
   *  > 365`, etc.). For the demo, we author them but the fixture
   *  loader runs a consistency check that warns to the console when
   *  the authored risk and the derived state diverge. */
  risks: AccountRiskFactor[]
  /** Products owned (under contract), with their ARR contribution.
   *  Rendered descending by `arrUsd` in column 4. */
  products: Product[]
  /** Status-bucket rollup. Empty buckets are omitted from the array;
   *  the renderer is responsible for lifecycle ordering. */
  salesPlays: SalesPlayBucket[]
  arrUsd: number
  ltvUsd: number
}

type SortKey =
  | 'name' | 'totalPipeline' | 'ltv'
  | 'riskCount' | 'daysSinceEbc' | 'daysSinceActivity'
type SortDir = 'asc' | 'desc'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'name',              label: 'account name' },
  { key: 'totalPipeline',     label: 'total pipeline' },
  { key: 'ltv',               label: 'LTV' },
  { key: 'riskCount',         label: 'risk factor count' },
  { key: 'daysSinceEbc',      label: 'days since EBC' },
  { key: 'daysSinceActivity', label: 'days since last activity' },
]

// ─── Demo clock (spec was authored 2026-05-11) ───────────────────────────
// All fiscal labels and "days since" math route through this constant so
// the fixture renders identically regardless of session date. The PANW
// fiscal year runs Aug → Jul; May 2026 sits in Q4FY26 → current quarter
// label is "CQ" with the next three being Q1FY27 / Q2FY27 / Q3FY27.
const DEMO_TODAY = new Date('2026-05-11T00:00:00Z')
const QUARTER_LABELS: [string, string, string, string] =
  ['CQ', 'Q1FY27', 'Q2FY27', 'Q3FY27']

// ─── Display label maps ──────────────────────────────────────────────────

const HEALTH_LABEL: Record<Health, string> = {
  'healthy':  'healthy',
  'at-risk':  'at risk',
  'critical': 'critical',
}

type SeverityTagColor = 'green' | 'yellow' | 'orange' | 'red' | 'neutral'
const HEALTH_COLOR: Record<Health, SeverityTagColor> = {
  'healthy':  'green',
  'at-risk':  'yellow',
  'critical': 'red',
}

interface ActivityBucketStyle {
  color: SeverityTagColor
  icon?: React.ElementType
}
function activityStyleForDays(daysAgo: number): ActivityBucketStyle {
  if (daysAgo < 7)   return { color: 'neutral' }
  if (daysAgo <= 21) return { color: 'orange', icon: ExclamationTriangle }
  return { color: 'red', icon: ExclamationCircle }
}

// EBC severity (spec §2):
//   0–180   → neutral
//   180–365 → caution (orange)
//   >365 OR absent → danger (red)
type EBCSeverity = 'neutral' | 'caution' | 'danger'
function ebcSeverity(ebc: EBC, today: Date = DEMO_TODAY): EBCSeverity {
  if (ebc.absent) return 'danger'
  const d = new Date(ebc.date + 'T00:00:00Z')
  const days = Math.floor((today.getTime() - d.getTime()) / 86_400_000)
  if (days <= 180) return 'neutral'
  if (days <= 365) return 'caution'
  return 'danger'
}
const EBC_SEVERITY_COLOR: Record<EBCSeverity, SeverityTagColor> = {
  'neutral': 'neutral',
  'caution': 'orange',
  'danger':  'red',
}

// Sales Play emphasis hierarchy (spec §4.5).
//   Not Touched → strongest emphasis (action items). Not red — red reads
//     as "error". Use brand-accent purple (low-contrast) so the eye is
//     pulled without misreading the chip as a danger signal.
//   Pursuing    → softer brand-positive (green low).
//   Pitched, Deferred → neutral.
//   Declined, Closed Won, Closed Lost → deemphasized (slate/olive low).
type SalesPlayTagPalette = { color: TagColor; contrast: 'low' | 'high' }
const SALES_PLAY_PALETTE: Record<SalesPlayStatus, SalesPlayTagPalette> = {
  'not-touched': { color: 'purple', contrast: 'high' },
  'pursuing':    { color: 'green',  contrast: 'low'  },
  'pitched':     { color: 'neutral', contrast: 'low' },
  'deferred':    { color: 'neutral', contrast: 'low' },
  'declined':    { color: 'slate',   contrast: 'low' },
  'closed-won':  { color: 'olive',   contrast: 'low' },
  'closed-lost': { color: 'slate',   contrast: 'low' },
}
const SALES_PLAY_LABEL: Record<SalesPlayStatus, string> = {
  'not-touched': 'Not Touched',
  'pitched':     'Pitched',
  'deferred':    'Deferred',
  'declined':    'Declined',
  'pursuing':    'Pursuing',
  'closed-won':  'Closed Won',
  'closed-lost': 'Closed Lost',
}
/** Collapse-priority order: which buckets to hide FIRST when column 5
 *  overflows. Deemphasized statuses go first; lifecycle ordering on
 *  display is independent (spec §4.5). */
const SALES_PLAY_COLLAPSE_ORDER: readonly SalesPlayStatus[] = [
  'closed-lost', 'closed-won', 'declined',
  'deferred', 'pitched', 'pursuing', 'not-touched',
] as const

// Brand icons (forked from opp-table; BrandUnit42 still not exported).
const BRAND_ICON: Record<Brand, React.ElementType | undefined> = {
  'strata':  BrandStrata,
  'prisma':  BrandPrisma,
  'cortex':  BrandCortex,
  'unit-42': undefined,
}

// ─── Account risk library (spec §2) ──────────────────────────────────────
const ACCOUNT_RISK_LIBRARY: Record<AccountRiskId, { emoji: string; label: string }> = {
  'no-pipeline':       { emoji: '📭', label: 'No pipeline in CQ + next 4Q' },
  'no-ebc':            { emoji: '🏛️', label: 'No EBCs in last year' },
  'not-platformized':  { emoji: '🔌', label: 'Not platformized' },
  'derailed-povs':     { emoji: '🧪', label: 'Derailed POVs' },
  'no-asr':            { emoji: '🌀', label: 'No ASR / stale ASR' },
  'no-csp':            { emoji: '🚧', label: 'No customer success plan' },
}
const mkRisk = (id: AccountRiskId): AccountRiskFactor => ({ id, ...ACCOUNT_RISK_LIBRARY[id] })

// ─── Product brand map (mirrors opp-table) ───────────────────────────────
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
const mkProduct = (name: string, arrUsd: number): Product => ({
  name, brand: PRODUCT_BRAND[name] ?? 'strata', arrUsd,
})

// ─── Fixture (10 accounts) ───────────────────────────────────────────────
//
// Variety budget:
//   • Row 1   — strategic, healthy, no risks. Establishes the "good"
//               state. High ARR, high LTV (long-tenured).
//   • Row 2   — high-risk HEALTHY account (cr-failure §10 negative-test
//               case). Defaults Health filter must NOT hide this row,
//               but Health filter default = Overall:At Risk+Critical,
//               so it *will* hide. Verifies the spec's known
//               interaction is intentional.
//   • Row 3   — standalone (no Apex Account) — spec §2 explicit case.
//   • Row 4   — pipeline-in-every-quarter; all four tags populated.
//   • Row 5   — pipeline ONLY in CQ; the other three quarters render
//               $— placeholders.
//   • Row 6   — NO EBC on record. Carries 🏛️ risk derived from this.
//   • Row 7   — all 7 Sales Play statuses simultaneously (the
//               overflow stress case from cr-failure §1 / cr-scale §1).
//   • Row 8   — long account name + long apex name (cr-scale §2).
//   • Row 9   — newcomer: high ARR / low LTV.
//   • Row 10  — shrinking: low ARR / high LTV.

function mkPipeline(
  cqUsd: number, q1Usd: number, q2Usd: number, q3Usd: number,
  opps: { q: 0|1|2|3; type: 'net-new'|'upsell'|'renewal'; usd: number }[],
): AccountRow['pipeline'] {
  const byQ: { type: 'net-new'|'upsell'|'renewal'; usd: number }[][] = [[], [], [], []]
  for (const o of opps) byQ[o.q].push({ type: o.type, usd: o.usd })
  return [
    { label: QUARTER_LABELS[0], usd: cqUsd, opps: byQ[0] },
    { label: QUARTER_LABELS[1], usd: q1Usd, opps: byQ[1] },
    { label: QUARTER_LABELS[2], usd: q2Usd, opps: byQ[2] },
    { label: QUARTER_LABELS[3], usd: q3Usd, opps: byQ[3] },
  ] as AccountRow['pipeline']
}

const ROWS: AccountRow[] = (() => {
  const rows: Omit<AccountRow, 'totalPipelineUsd' | 'hasUpsellPipeline'>[] = [
    {
      id: '1',
      name: 'Titan Energy Solutions',
      apex: 'Titan Industrial Holdings',
      pipeline: mkPipeline(1_200_000, 800_000, 0, 450_000, [
        { q: 0, type: 'renewal', usd: 900_000 },
        { q: 0, type: 'upsell',  usd: 300_000 },
        { q: 1, type: 'net-new', usd: 800_000 },
        { q: 3, type: 'upsell',  usd: 450_000 },
      ]),
      activity: { daysAgo: 2, description: 'EBC follow-up with CIO' },
      health: { overall: 'healthy', technical: 'healthy', adoption: 'healthy',
        trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
      ebc: { absent: false, date: '2026-02-04', topic: 'SASE roadmap + cloud-first program',
        attendees: ['Anuj Khanna (CISO)', 'Marlena Cruz (VP Architecture)'] },
      risks: [],
      products: [
        mkProduct('Prisma Access',  3_600_000),
        mkProduct('Prisma SD-WAN',  1_200_000),
        mkProduct('PA Series',      900_000),
        mkProduct('Cortex XDR+',    450_000),
      ],
      salesPlays: [
        { status: 'pursuing', usd: 1_200_000, plays: [
          { name: 'SASE Acceleration', usd: 800_000 },
          { name: 'Hardware Refresh',  usd: 400_000 },
        ]},
        { status: 'closed-won', usd: 600_000, plays: [
          { name: 'Cortex Cloud Pilot', usd: 600_000 },
        ]},
      ],
      arrUsd: 6_150_000,
      ltvUsd: 28_400_000,
    },
    {
      id: '2',
      name: 'Meridian Capital Group',
      apex: 'Meridian Financial Partners',
      pipeline: mkPipeline(450_000, 1_200_000, 700_000, 0, [
        { q: 0, type: 'upsell',  usd: 450_000 },
        { q: 1, type: 'net-new', usd: 1_200_000 },
        { q: 2, type: 'renewal', usd: 700_000 },
      ]),
      activity: { daysAgo: 18, description: 'Pricing thread with procurement' },
      // High-risk HEALTHY — cr-failure §10 negative-test case.
      health: { overall: 'healthy', technical: 'healthy', adoption: 'healthy',
        trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
      ebc: { absent: true },
      risks: [
        mkRisk('no-ebc'), mkRisk('not-platformized'),
        mkRisk('derailed-povs'), mkRisk('no-csp'),
      ],
      products: [
        mkProduct('Cortex XDR+', 1_400_000),
        mkProduct('XSIAM',         700_000),
      ],
      salesPlays: [
        { status: 'not-touched', usd: 950_000, plays: [
          { name: 'XSIAM Splunk Takeout', usd: 600_000 },
          { name: 'EBC Reset',            usd: 350_000 },
        ]},
        { status: 'pursuing', usd: 800_000, plays: [
          { name: 'Cortex Expansion', usd: 800_000 },
        ]},
      ],
      arrUsd: 2_100_000,
      ltvUsd: 8_400_000,
    },
    {
      id: '3',
      name: 'Aperture Robotics',
      apex: null, // standalone (spec §2) — no parent
      pipeline: mkPipeline(0, 250_000, 0, 0, [
        { q: 1, type: 'net-new', usd: 250_000 },
      ]),
      activity: { daysAgo: 5, description: 'Discovery with security lead' },
      health: { overall: 'at-risk', technical: 'at-risk', adoption: 'healthy',
        trend12mo: [0,0,0,0,0,0,0,1,1,1,1,1] },
      ebc: { absent: false, date: '2025-11-20', topic: 'Initial platform overview',
        attendees: ['Karim Yates (CTO)'] },
      risks: [mkRisk('not-platformized')],
      products: [
        mkProduct('PA Series', 220_000),
      ],
      salesPlays: [
        { status: 'pitched', usd: 250_000, plays: [
          { name: 'Hardware Refresh', usd: 250_000 },
        ]},
      ],
      arrUsd: 220_000,
      ltvUsd: 440_000,
    },
    {
      id: '4',
      name: 'Vertex Manufacturing Co.',
      apex: 'Vertex Industrial Group',
      pipeline: mkPipeline(3_100_000, 1_400_000, 900_000, 600_000, [
        { q: 0, type: 'renewal', usd: 2_500_000 },
        { q: 0, type: 'upsell',  usd: 600_000 },
        { q: 1, type: 'upsell',  usd: 1_400_000 },
        { q: 2, type: 'net-new', usd: 900_000 },
        { q: 3, type: 'net-new', usd: 600_000 },
      ]),
      activity: { daysAgo: 9, description: 'Executive escalation call' },
      health: { overall: 'critical', technical: 'critical', adoption: 'at-risk',
        trend12mo: [0,0,1,1,1,1,2,2,2,2,2,2] },
      ebc: { absent: false, date: '2025-08-12', topic: 'Renewal strategy + ZT roadmap',
        attendees: ['Selene Wu (CTO)', 'Dario Lang (CIO)', 'Priya Mehta (CFO)'] },
      risks: [mkRisk('derailed-povs'), mkRisk('no-asr'), mkRisk('no-csp')],
      products: [
        mkProduct('Prisma Access',  2_200_000),
        mkProduct('Prisma SD-WAN',  1_500_000),
        mkProduct('PA Series',      900_000),
        mkProduct('Cortex XDR+',    600_000),
        mkProduct('FW Data Lake',   400_000),
      ],
      salesPlays: [
        { status: 'pursuing', usd: 3_100_000, plays: [
          { name: 'SASE Acceleration', usd: 2_500_000 },
          { name: 'Hardware Refresh',  usd: 600_000 },
        ]},
      ],
      arrUsd: 5_600_000,
      ltvUsd: 31_200_000,
    },
    {
      id: '5',
      // CQ-only pipeline — three placeholder ($—) quarters.
      name: 'Pacific Commerce Bank',
      apex: 'Pacific Commerce Holdings',
      pipeline: mkPipeline(670_000, 0, 0, 0, [
        { q: 0, type: 'upsell', usd: 470_000 },
        { q: 0, type: 'upsell', usd: 200_000 },
      ]),
      activity: { daysAgo: 12, description: 'Pricing options shared via email' },
      health: { overall: 'critical', technical: 'at-risk', adoption: 'critical',
        trend12mo: [0,0,0,1,1,1,1,2,2,2,2,2] },
      ebc: { absent: false, date: '2025-04-30', topic: 'Architecture deep-dive',
        attendees: ['Tomás Berry (Head of SecOps)'] },
      risks: [mkRisk('derailed-povs'), mkRisk('no-csp'), mkRisk('no-asr')],
      products: [
        mkProduct('Cortex XDR+', 900_000),
        mkProduct('Xpanse',      200_000),
      ],
      salesPlays: [
        { status: 'declined', usd: 470_000, plays: [
          { name: 'XSIAM Splunk Takeout', usd: 470_000 },
        ]},
        { status: 'not-touched', usd: 200_000, plays: [
          { name: 'Cortex Expansion', usd: 200_000 },
        ]},
      ],
      arrUsd: 1_100_000,
      ltvUsd: 6_700_000,
    },
    {
      id: '6',
      // No EBC on record — carries 🏛️ derived risk.
      name: 'Axiom Technology Partners',
      apex: 'Axiom Group',
      pipeline: mkPipeline(0, 0, 1_200_000, 500_000, [
        { q: 2, type: 'net-new', usd: 1_200_000 },
        { q: 3, type: 'upsell',  usd: 500_000 },
      ]),
      activity: { daysAgo: 30, description: 'Discovery call with security team' },
      health: { overall: 'at-risk', technical: 'healthy', adoption: 'at-risk',
        trend12mo: [0,0,0,0,0,0,0,0,0,1,1,1] },
      ebc: { absent: true },
      risks: [mkRisk('no-ebc'), mkRisk('no-asr'), mkRisk('no-csp')],
      products: [
        mkProduct('Cortex XSOAR', 600_000),
        mkProduct('Xpanse',       250_000),
      ],
      salesPlays: [
        { status: 'pitched', usd: 1_700_000, plays: [
          { name: 'XSIAM Splunk Takeout', usd: 1_200_000 },
          { name: 'Cortex Expansion',     usd: 500_000 },
        ]},
      ],
      arrUsd: 850_000,
      ltvUsd: 4_200_000,
    },
    {
      id: '7',
      // All 7 sales-play statuses — overflow stress case.
      name: 'Summit Healthcare Systems',
      apex: 'Summit Health Holdings',
      pipeline: mkPipeline(445_000, 280_000, 0, 165_000, [
        { q: 0, type: 'upsell',  usd: 280_000 },
        { q: 0, type: 'renewal', usd: 165_000 },
        { q: 1, type: 'net-new', usd: 280_000 },
        { q: 3, type: 'upsell',  usd: 165_000 },
      ]),
      activity: { daysAgo: 5, description: 'POC kickoff meeting' },
      health: { overall: 'at-risk', technical: 'healthy', adoption: 'at-risk',
        trend12mo: [0,0,0,0,0,0,0,1,1,1,1,1] },
      ebc: { absent: false, date: '2025-09-14', topic: 'Compliance + healthcare-specific controls',
        attendees: ['Hana Liu (CISO)', 'Marco Reyes (VP Security)'] },
      risks: [mkRisk('not-platformized'), mkRisk('no-csp')],
      products: [
        mkProduct('Cortex XDR+',        280_000),
        mkProduct('PA Series Attached', 165_000),
        mkProduct('Prisma Access',      600_000),
      ],
      salesPlays: [
        { status: 'not-touched', usd: 250_000, plays: [{ name: 'EBC Reset', usd: 250_000 }] },
        { status: 'pitched',     usd: 320_000, plays: [{ name: 'Hardware Refresh', usd: 320_000 }] },
        { status: 'deferred',    usd: 180_000, plays: [{ name: 'Cortex Expansion', usd: 180_000 }] },
        { status: 'declined',    usd: 90_000,  plays: [{ name: 'WildFire Add-on', usd: 90_000 }] },
        { status: 'pursuing',    usd: 445_000, plays: [{ name: 'SASE Acceleration', usd: 445_000 }] },
        { status: 'closed-won',  usd: 120_000, plays: [{ name: 'Initial Pilot', usd: 120_000 }] },
        { status: 'closed-lost', usd: 60_000,  plays: [{ name: 'XSIAM Splunk Takeout', usd: 60_000 }] },
      ],
      arrUsd: 1_045_000,
      ltvUsd: 5_800_000,
    },
    {
      id: '8',
      // Long name stress case.
      name: 'Koninklijke Philips Electronics N.V. (Healthcare Division)',
      apex: 'Royal Philips Holdings International',
      pipeline: mkPipeline(1_800_000, 0, 2_400_000, 0, [
        { q: 0, type: 'renewal', usd: 1_800_000 },
        { q: 2, type: 'upsell',  usd: 2_400_000 },
      ]),
      activity: { daysAgo: 22, description: 'Procurement review scheduled' },
      health: { overall: 'at-risk', technical: 'at-risk', adoption: 'healthy',
        trend12mo: [0,0,0,0,0,0,1,1,1,1,1,1] },
      ebc: { absent: false, date: '2026-04-01', topic: 'Pan-EU platform consolidation',
        attendees: ['Sven de Vries (CIO)', 'Aiko Tanaka (VP Infra)'] },
      risks: [mkRisk('no-asr')],
      products: [
        mkProduct('Prisma Access', 1_500_000),
        mkProduct('PA Series',       800_000),
        mkProduct('Cortex XDR+',     400_000),
      ],
      salesPlays: [
        { status: 'pursuing', usd: 2_400_000, plays: [{ name: 'SASE Acceleration', usd: 2_400_000 }] },
        { status: 'pitched',  usd: 1_800_000, plays: [{ name: 'EU Renewal',        usd: 1_800_000 }] },
      ],
      arrUsd: 2_700_000,
      ltvUsd: 11_500_000,
    },
    {
      id: '9',
      // Newcomer: high ARR, low LTV.
      name: 'Helix Bio Therapeutics',
      apex: 'Helix Holdings',
      pipeline: mkPipeline(400_000, 600_000, 0, 0, [
        { q: 0, type: 'net-new', usd: 400_000 },
        { q: 1, type: 'upsell',  usd: 600_000 },
      ]),
      activity: { daysAgo: 1, description: 'Roadmap call with Head of IT' },
      health: { overall: 'healthy', technical: 'healthy', adoption: 'healthy',
        trend12mo: [0,0,0,0,0,0,0,0,0,0,0,0] },
      ebc: { absent: false, date: '2026-03-22', topic: 'Greenfield SASE deployment',
        attendees: ['Inés Calderón (CIO)'] },
      risks: [],
      products: [
        mkProduct('Prisma Access', 1_100_000),
        mkProduct('Cortex XDR+',     400_000),
      ],
      salesPlays: [
        { status: 'pursuing', usd: 1_000_000, plays: [{ name: 'SASE Acceleration', usd: 1_000_000 }] },
      ],
      arrUsd: 1_500_000,
      ltvUsd: 1_500_000,
    },
    {
      id: '10',
      // Shrinking: low ARR, high LTV.
      name: 'Harbor Logistics Group',
      apex: 'Harbor Maritime Holdings',
      pipeline: mkPipeline(0, 150_000, 0, 0, [
        { q: 1, type: 'net-new', usd: 150_000 },
      ]),
      activity: { daysAgo: 45, description: 'No replies to outreach' },
      health: { overall: 'critical', technical: 'at-risk', adoption: 'critical',
        trend12mo: [0,0,0,0,0,1,1,1,1,2,2,2] },
      ebc: { absent: false, date: '2024-09-04', topic: 'Renewal expansion (historical)',
        attendees: ['Renata Costa (former CISO)'] },
      risks: [
        mkRisk('no-ebc'), mkRisk('derailed-povs'),
        mkRisk('no-asr'),  mkRisk('no-csp'),
      ],
      products: [
        mkProduct('PA Series',       380_000),
        mkProduct('Prisma Access',   220_000),
      ],
      salesPlays: [
        { status: 'closed-lost', usd: 800_000, plays: [
          { name: 'SASE Acceleration', usd: 500_000 },
          { name: 'Cortex Expansion',  usd: 300_000 },
        ]},
        { status: 'not-touched', usd: 150_000, plays: [
          { name: 'Hardware Refresh', usd: 150_000 },
        ]},
      ],
      arrUsd: 600_000,
      ltvUsd: 18_900_000,
    },
  ]
  return rows.map(r => {
    const total = r.pipeline.reduce((s, q) => s + q.usd, 0)
    const hasUpsell = r.pipeline.some(q =>
      q.opps.some(o => o.type === 'upsell'))
    return { ...r, totalPipelineUsd: total, hasUpsellPipeline: hasUpsell }
  })
})()

// Self-consistency check on EBC vs `no-ebc` risk (cr-failure §14).
;(() => {
  for (const r of ROWS) {
    const sev = ebcSeverity(r.ebc)
    const hasNoEbcRisk = r.risks.some(x => x.id === 'no-ebc')
    if (sev === 'danger' && !hasNoEbcRisk) {
      // eslint-disable-next-line no-console
      console.warn(`[account-table] row ${r.id} (${r.name}) has danger-bucket EBC but no 🏛️ risk authored.`)
    }
    if (sev !== 'danger' && hasNoEbcRisk) {
      // eslint-disable-next-line no-console
      console.warn(`[account-table] row ${r.id} (${r.name}) carries 🏛️ risk but EBC is not in danger bucket.`)
    }
  }
})()

// ─── Helpers ──────────────────────────────────────────────────────────────

function formatUsdCompact(n: number): string {
  if (n === 0) return '$—'
  const abs = Math.abs(n)
  // Million-scale always shows one decimal so $1,045,000 reads as
  // "$1.0M" (not "$1M") — the precision is meaningful at the boundary.
  // K-scale drops decimals — "$220K" reads cleaner than "$220.0K".
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000)     return `$${Math.round(n / 1_000)}K`
  return `$${Math.round(n)}`
}
function formatUsdFull(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(n)
}
function daysBetween(iso: string, today: Date = DEMO_TODAY): number {
  const d = new Date(iso + 'T00:00:00Z')
  return Math.floor((today.getTime() - d.getTime()) / 86_400_000)
}
function formatEbcDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
}

// ─── Tag presets ─────────────────────────────────────────────────────────
const TAG_BASE = {
  color: 'neutral' as const,
  contrast: 'low' as const,
  shape: 'rounded' as const,
  size: 'large' as const,
}

// ─── Sort flyout (forked from opp-table) ─────────────────────────────────

interface SortFlyoutProps {
  sortKey: SortKey
  sortDir: SortDir
  onChange: (key: SortKey) => void
}

function SortFlyout({ sortKey, sortDir, onChange }: SortFlyoutProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const currentLabel = SORT_OPTIONS.find(o => o.key === sortKey)?.label ?? 'risk factor count'
  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="acc-sort-trigger"
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

// ─── PHASE 1 — controls + sort ────────────────────────────────────────────
// Search input (with documented exclusions per spec §3.1), sort flyout
// with default = Risk Factor Count desc (spec §5), and a key-metrics
// label "10 accounts · $XX ARR · $XX pipeline next 4Q" rolled up from
// the current filter slice.

function AEAccountTable() {
  const [search, setSearch] = useState('')
  // Default sort per spec §5: most-broken accounts at top of triage queue.
  const [sortKey, setSortKey] = useState<SortKey>('riskCount')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  // Filtering wiring lands later. For now, sort renders against the full
  // fixture so the default-sort behavior is visibly verifiable.
  const sortedRows = useMemo(() => {
    const arr = [...ROWS]
    arr.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'name':              cmp = a.name.localeCompare(b.name); break
        case 'totalPipeline':     cmp = a.totalPipelineUsd - b.totalPipelineUsd; break
        case 'ltv':               cmp = a.ltvUsd - b.ltvUsd; break
        case 'riskCount':         cmp = a.risks.length - b.risks.length; break
        case 'daysSinceEbc':      {
          const ad = a.ebc.absent ? Number.POSITIVE_INFINITY : daysBetween(a.ebc.date)
          const bd = b.ebc.absent ? Number.POSITIVE_INFINITY : daysBetween(b.ebc.date)
          cmp = ad - bd; break
        }
        case 'daysSinceActivity': cmp = a.activity.daysAgo - b.activity.daysAgo; break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return arr
  }, [sortKey, sortDir])

  // Key metrics — three numbers rolled up from the current view (spec §3.3).
  // Filtering isn't wired so this is currently the full fixture.
  const totalArr = sortedRows.reduce((s, r) => s + r.arrUsd, 0)
  const totalPipeline4q = sortedRows.reduce((s, r) => s + r.totalPipelineUsd, 0)
  const accountCount = sortedRows.length

  return (
    <>
      <style>{LAYOUT_CSS}</style>
      <div className="acc-page">
        <div className="acc-page__shell">
          {/* Search row: counts left · search center · sort right.
              Search excludes opportunity names and quote IDs by spec
              §3.1 — placeholder reflects what IS searched. */}
          <div className="acc-search-row">
            <span className="acc-counts" aria-live="polite">
              {accountCount} accounts · {formatUsdCompact(totalArr)} ARR · {formatUsdCompact(totalPipeline4q)} pipeline next 4Q
            </span>
            <div className="acc-search-row__search">
              <Search
                size="md"
                placeholder="account, apex, product, sales play…"
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
                // 'name' defaults asc; all numeric axes default desc
                // (largest / most-broken / most-overdue at top).
                setSortDir(k === 'name' ? 'asc' : 'desc')
              }}
            />
          </div>

          {/* Filter row lands in Phase 2. */}

          <div className="acc-table-shell">
            <table className="acc-table">
              <thead>
                <tr>
                  <th className="acc-c-account"><Header size="md" type="basic">Account</Header></th>
                  <th className="acc-c-equal"><Header size="md" type="basic">Opportunities</Header></th>
                  <th className="acc-c-equal"><Header size="md" type="basic">Activities &amp; Risks</Header></th>
                  <th className="acc-c-equal"><Header size="md" type="basic">Products</Header></th>
                  <th className="acc-c-equal"><Header size="md" type="basic">Sales Plays</Header></th>
                  <th className="acc-c-value"><Header size="md" type="basic" alignment="right">Value</Header></th>
                  <th className="acc-c-actions" />
                </tr>
              </thead>
              <tbody>
                {sortedRows.map(row => (
                  <tr key={row.id} className="acc-row">
                    <td className="acc-c-account">
                      <div className="acc-multiline">
                        <span className="acc-multiline__name">{row.name}</span>
                        {row.apex && (
                          <span className="acc-multiline__sub">{row.apex}</span>
                        )}
                      </div>
                    </td>
                    <td className="acc-c-equal" />
                    <td className="acc-c-equal" />
                    <td className="acc-c-equal" />
                    <td className="acc-c-equal" />
                    <td className="acc-c-value">
                      <div className="acc-value">
                        <div><span className="acc-value__num">{formatUsdCompact(row.arrUsd)}</span> <span className="acc-value__unit">ARR</span></div>
                        <div><span className="acc-value__num">{formatUsdCompact(row.ltvUsd)}</span> <span className="acc-value__unit">LTV</span></div>
                      </div>
                    </td>
                    <td className="acc-c-actions" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Layout CSS (additive over later phases) ─────────────────────────────

const LAYOUT_CSS = `
/* IACVT workaround — same surface lineage as opp-table. */
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

.acc-page {
  min-height: 100vh;
  background-color: var(--ds-surface-alt-rest);
  font-family: var(--ds-type-font-family-sans);
  padding: var(--ds-spacing-07) var(--ds-spacing-07) var(--ds-spacing-10);
}
.acc-page__shell {
  background-color: transparent;
  border: 0;
}

/* ── Search row ─────────────────────────────────────────────────────────
 * Counts left · search center (flex:1) · sort right. Same vertical
 * rhythm as opp-table's search row. */
.acc-search-row {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-04);
  padding: var(--ds-spacing-04) var(--ds-spacing-04) var(--ds-spacing-02);
}
.acc-counts {
  /* body-02 bold (DS type scale: 16px / 24px / semibold), tabular nums. */
  color: var(--ds-text-primary);
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: var(--ds-type-font-weight-semibold);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
}
.acc-search-row__search {
  flex: 1;
  min-width: 0;
}
.acc-search-row__search .panw--search {
  width: 100%;
}

/* Sort trigger — ghost-button shape, opens single-select Flyout.
 * Stretches to match the search input's height. */
.acc-sort-trigger {
  display: inline-flex;
  align-items: center;
  align-self: stretch;
  gap: var(--ds-spacing-02);
  padding: 0 var(--ds-spacing-05);
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  color: var(--ds-text-secondary-rest);
  border-radius: var(--ds-radius-tight);
  white-space: nowrap;
  transition: background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.acc-sort-trigger:hover {
  background-color: var(--ds-ghost-hover);
  color: var(--ds-text-primary);
}
.acc-sort-trigger[aria-expanded="true"] {
  background-color: var(--ds-ghost-pressed);
  color: var(--ds-text-primary);
}

/* Table shell — no own border. */
.acc-table-shell { overflow-x: auto; }
.acc-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}
.acc-table th,
.acc-table td {
  padding: var(--ds-spacing-04);
  vertical-align: top;
  text-align: left;
}
.acc-table thead th {
  background: transparent;
  border-bottom: 1px solid var(--ds-lines-neutral-rest);
}

/* Column widths.
 * Account column gets a fixed 240px to absorb long names without
 * crowding the four equal columns. Value is 140 (compact tabular
 * pair); Actions is 80. The remaining width splits evenly across the
 * four equal columns. */
.acc-table th.acc-c-account,
.acc-table td.acc-c-account { width: 240px; }
.acc-table th.acc-c-equal,
.acc-table td.acc-c-equal { width: calc((100% - 240px - 140px - 80px) / 4); }
.acc-table th.acc-c-value,
.acc-table td.acc-c-value { width: 140px; text-align: right; }
.acc-table th.acc-c-actions,
.acc-table td.acc-c-actions { width: 80px; }

/* Body row treatment — no zebra, hairline dividers between rows. */
.acc-table tbody tr { background-color: var(--ds-surface-rest); }
.acc-table tbody tr + tr { border-top: 1px solid var(--ds-lines-neutral-rest); }
.acc-table tbody tr:hover { background-color: var(--ds-ghost-hover); }
.acc-table tbody tr td:first-child {
  /* Restore the hairline by painting it on the cell, since border-collapse
   * is separate. */
  border-top: 1px solid transparent;
}
.acc-table tbody tr + tr td {
  border-top: 1px solid var(--ds-lines-neutral-rest);
}
.acc-table tbody tr:first-child td {
  border-top: 0;
}

/* ── Column 1 — Account ─────────────────────────────────────────────────
 * Two-line stack. Name is body-compact-02 bold, secondary text.
 * Apex is label-02, tertiary text. Both clamp to two lines max and
 * ellipsize beyond. */
.acc-multiline {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-01);
  min-width: 0;
  /* Reserve 2-line height even when Apex is absent, so the row rhythm
   * doesn't jitter between standalone and parented accounts. */
  min-height: 36px;
  justify-content: center;
}
.acc-multiline__name {
  font-size: 14px;
  line-height: 18px;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-secondary-rest);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.acc-multiline__sub {
  font-size: 12px;
  line-height: 16px;
  color: var(--ds-text-tertiary-rest);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Column 6 — Value (ARR / LTV stack) ─────────────────────────────── */
.acc-value {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--ds-spacing-01);
  font-size: 16px;
  line-height: 24px;
  color: var(--ds-text-secondary-rest);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
}
.acc-value__num {
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
}
.acc-value__unit {
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ds-text-tertiary-rest);
}
`

// ─── Storybook meta ──────────────────────────────────────────────────────
const meta: Meta = { title: 'compositions/AE Account Table' }
export default meta

export const Default: StoryObj = {
  render: () => <AEAccountTable />
}
