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

// ─── Filter option sets ──────────────────────────────────────────────────

const CLOSE_DATE_OPTIONS: FilterOption[] = [
  { value: 'this-q', label: 'This Quarter' },
  { value: 'q1fy27', label: 'Q1FY27' },
  { value: 'q2fy27', label: 'Q2FY27' },
  { value: 'q3fy27', label: 'Q3FY27' },
  { value: 'q4fy27', label: 'Q4FY27' },
]

const LAST_ACTIVITY_OPTIONS: { value: string; label: string }[] = [
  { value: 'lt-7',  label: 'Last 7 days' },
  { value: '7-21',  label: '7–21 days' },
  { value: 'gt-21', label: 'Over 21 days' },
]

const EBC_OPTIONS: { value: string; label: string }[] = [
  { value: 'lt-180',  label: 'Within 180 days' },
  { value: '180-365', label: '180–365 days' },
  { value: 'gt-365',  label: 'Over 365 days' },
]
// Spec §3.8: no "Never" option — accounts with no EBC fall into the
// Over 365 days bucket for filtering. (Tag copy stays "No EBC on
// record" in the row — see Phase 5 EBC sub-cell.)

const UPSELL_OPTIONS: { value: string; label: string }[] = [
  { value: 'with',    label: 'With upsell pipeline' },
  { value: 'without', label: 'No upsell pipeline' },
]

const ACCOUNT_RISK_FILTER_OPTIONS: FilterOption[] =
  (Object.keys(ACCOUNT_RISK_LIBRARY) as AccountRiskId[]).map(id => ({
    value: id,
    label: `${ACCOUNT_RISK_LIBRARY[id].emoji} ${ACCOUNT_RISK_LIBRARY[id].label}`,
  }))

// Grouped Account Health (spec §3.10). Same shape as opp-table's
// implementation — three axes × three levels. Defaults differ from
// opp-table per spec §5: sub-axes default OFF on this table.
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
// Per spec §5: Overall = At Risk + Critical (Healthy off);
// Technical and Adoption = ALL OFF. This is the major spec divergence
// from opp-table, which defaults sub-axes ON. See cr-intent-validator
// §"silently dropped spec items".
const INITIAL_GROUPED_HEALTH: GroupedHealthSelection = {
  overall:   ['at-risk', 'critical'],
  technical: [],
  adoption:  [],
}

// ─── Tag-density key SoT (spec §3.4) ─────────────────────────────────────
// Per cr-failure §9: single source of truth for tag-density keys, used
// by the filter option list, the default selection, AND the row
// renderer. Per-quarter pipeline keys and per-status sales-play keys
// are enumerated explicitly so a typo can't silently hide a tag.

const QUARTER_DENSITY_KEYS = ['q0', 'q1', 'q2', 'q3'] as const
type QuarterDensityKey = typeof QUARTER_DENSITY_KEYS[number]

const STATUS_DENSITY_KEYS: readonly `status-${SalesPlayStatus}`[] =
  SALES_PLAY_LIFECYCLE.map(s => `status-${s}` as const)
type StatusDensityKey = typeof STATUS_DENSITY_KEYS[number]

const ACCOUNT_RISK_DENSITY_KEYS: readonly `risk-${AccountRiskId}`[] =
  (Object.keys(ACCOUNT_RISK_LIBRARY) as AccountRiskId[])
    .map(id => `risk-${id}` as const)
type AccountRiskDensityKey = typeof ACCOUNT_RISK_DENSITY_KEYS[number]

type DensityKey =
  | QuarterDensityKey                                        // col 2
  | 'lastActivity' | 'accountHealth' | 'riskCount' | 'ebc'   // col 3 cells
  | AccountRiskDensityKey                                    // col 3 risk-popover items
  | 'products'                                               // col 4
  | StatusDensityKey                                         // col 5

const DENSITY_OPTIONS: { value: DensityKey; label: string }[] = [
  // Pipeline (per-quarter)
  { value: 'q0', label: 'CQ pipeline' },
  { value: 'q1', label: `${QUARTER_LABELS[1]} pipeline` },
  { value: 'q2', label: `${QUARTER_LABELS[2]} pipeline` },
  { value: 'q3', label: `${QUARTER_LABELS[3]} pipeline` },
  // Activities & risks (col 3)
  { value: 'lastActivity',  label: 'last activity' },
  { value: 'accountHealth', label: 'account health' },
  { value: 'riskCount',     label: 'risk factor count' },
  { value: 'ebc',           label: 'EBC' },
  // Account-level risk per-item toggles
  ...(Object.entries(ACCOUNT_RISK_LIBRARY) as [AccountRiskId, { emoji: string; label: string }][])
    .map(([id, def]) => ({
      value: `risk-${id}` as DensityKey,
      label: `risk: ${def.emoji} ${def.label}`,
    })),
  // Products (col 4)
  { value: 'products', label: 'products' },
  // Sales Play status per-status toggles
  ...SALES_PLAY_LIFECYCLE.map(s => ({
    value: `status-${s}` as DensityKey,
    label: `sales play: ${SALES_PLAY_LABEL[s]}`,
  })),
]
const ALL_DENSITY_KEYS: DensityKey[] = DENSITY_OPTIONS.map(o => o.value)

// ─── Product taxonomy (forked from opp-table) ────────────────────────────

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

// ─── Tag presets ─────────────────────────────────────────────────────────
const TAG_BASE = {
  color: 'neutral' as const,
  contrast: 'low' as const,
  shape: 'rounded' as const,
  size: 'large' as const,
}

// ─── HoverShell (forked from opp-table) ──────────────────────────────────
// 700ms-delayed portaled hover surface, anchored to a trigger. Used for
// chip-hover popovers in the filter row (Phase 2) and per-cell hovers
// in Phases 4–7. See opp-table ~L1237 for the canonical impl + the
// "interactive" / "persist" mode contract.

const HOVER_OPEN_DELAY_MS = 700
const HOVER_CLOSE_GRACE_MS = 160
const POPOVER_GAP_PX = 6

type HoverShellAlign = 'start' | 'center' | 'end'
type HoverShellSide = 'bottom' | 'top'

interface HoverShellProps {
  children: React.ReactNode
  render: (api: { close: () => void }) => React.ReactNode
  interactive?: boolean
  side?: HoverShellSide
  align?: HoverShellAlign
  panelClassName?: string
  openDelayMs?: number
  persist?: boolean
}

function HoverShell({
  children, render, interactive = false, side = 'bottom', align = 'center',
  panelClassName, openDelayMs = HOVER_OPEN_DELAY_MS, persist = false,
}: HoverShellProps) {
  const triggerRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

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
    const spaceBelow = vh - a.bottom
    const spaceAbove = a.top
    const preferTop = side === 'top'
    const fitsBelow = spaceBelow >= panelH + POPOVER_GAP_PX + 8
    const fitsAbove = spaceAbove >= panelH + POPOVER_GAP_PX + 8
    const placeAbove = (preferTop && fitsAbove) || (!preferTop && !fitsBelow && fitsAbove)
    const top = placeAbove
      ? a.top - panelH - POPOVER_GAP_PX
      : a.bottom + POPOVER_GAP_PX
    let left = a.left
    if (align === 'center') left = a.left + (a.width / 2) - (panelW / 2)
    else if (align === 'end') left = a.right - panelW
    left = Math.max(8, Math.min(vw - panelW - 8, left))
    setPos({ top, left })
  }, [open, side, align])

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

  useEffect(() => () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current)
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
  }, [])

  const clearOpenTimer = () => { if (openTimerRef.current) { clearTimeout(openTimerRef.current); openTimerRef.current = null } }
  const clearCloseTimer = () => { if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null } }

  const handleTriggerEnter = () => {
    clearCloseTimer()
    if (open) return
    clearOpenTimer()
    openTimerRef.current = setTimeout(() => setOpen(true), openDelayMs)
  }
  const handleTriggerLeave = () => {
    clearOpenTimer()
    if (!open) return
    if (persist) return
    if (interactive) {
      clearCloseTimer()
      closeTimerRef.current = setTimeout(() => setOpen(false), HOVER_CLOSE_GRACE_MS)
    } else setOpen(false)
  }
  const handlePanelEnter = () => { if (!interactive && !persist) return; clearCloseTimer() }
  const handlePanelLeave = () => {
    if (persist) return
    if (!interactive) return
    setOpen(false)
  }

  useEffect(() => {
    if (!open || !persist) return
    const onDown = (ev: MouseEvent) => {
      const t = ev.target as Node
      if (panelRef.current?.contains(t)) return
      if (triggerRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDown, true)
    return () => document.removeEventListener('mousedown', onDown, true)
  }, [open, persist])

  const close = () => setOpen(false)

  return (
    <>
      <span
        ref={triggerRef}
        className="acc-hover-trigger"
        onMouseEnter={handleTriggerEnter}
        onMouseLeave={handleTriggerLeave}>
        {children}
      </span>
      {open && createPortal(
        <div
          ref={panelRef}
          className={`acc-hover-panel${panelClassName ? ` ${panelClassName}` : ''}`}
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

// ─── Applied-list popover (chip hover on filter triggers) ────────────────

function AppliedListPanel({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="acc-pop acc-pop--applied">
      <div className="acc-pop__heading">{heading} ({items.length})</div>
      <ul className="acc-pop__applied-list">
        {items.map(name => (
          <li key={name} className="acc-pop__applied-item">{name}</li>
        ))}
      </ul>
    </div>
  )
}

// ─── Single-select filter (forked from opp-table) ────────────────────────

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
              <Tags label={selectedOption.label} color="neutral" contrast="high" size="default" className="acc-tag--static" />
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

// ─── Tag-density filter (forked from opp-table) ──────────────────────────

interface TagDensityFilterProps {
  selected: DensityKey[]
  onChange: (next: DensityKey[]) => void
}

function TagDensityFilter({ selected, onChange }: TagDensityFilterProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
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

// ─── Grouped Account Health filter (forked from opp-table) ───────────────

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

interface GroupedHealthFilterProps {
  value: GroupedHealthSelection
  onApply: (next: GroupedHealthSelection) => void
}

function GroupedHealthFilter({ value, onApply }: GroupedHealthFilterProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<string[]>(selectionToValues(value))
  const triggerRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (open) setDraft(selectionToValues(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  // Chip reflects committed value, not draft.
  // Bare numeric count (consistent with the other multi-select
  // filters in this row — "close date 4", "products 15"). The "/9"
  // fraction was a known-redundant pattern; the trigger label
  // ("account health") already supplies the denominator's domain.
  const committedTotal =
    value.overall.length + value.technical.length + value.adoption.length
  const chipLabel = String(committedTotal)
  const apply = () => { onApply(valuesToSelection(draft)); setOpen(false) }
  const cancel = () => setOpen(false)
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
        <span className="panw--filter__values">
          <span className="panw--filter__chip-target">
            <Tags label={chipLabel} color="neutral" contrast="high" size="default" className="acc-tag--static" />
          </span>
        </span>
        <span className="panw--filter__chevron" aria-hidden="true">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
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
                    className="acc-tag--static"
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

// ─── Product tree group (forked from opp-table) ──────────────────────────

function ProductTreeGroup({
  group, draft, status, onToggleGroup, onToggleLeaf,
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
    <div className="acc-tree__group" role="group">
      <div className="acc-tree__row acc-tree__row--group" role="treeitem" aria-expanded={isOpen}>
        <button
          type="button"
          className="acc-tree__chev"
          aria-label={isOpen ? `Collapse ${group.label}` : `Expand ${group.label}`}
          onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}>
          <Chev size={16} />
        </button>
        <span className="acc-tree__row-action" onClick={onToggleGroup}>
          <Checkbox status={status} label="" tabIndex={-1} />
          <span className="acc-tree__icon" aria-hidden="true"><Folder size={16} /></span>
          <span className="acc-tree__label acc-tree__label--bold">{group.label}</span>
        </span>
      </div>
      {isOpen && (
        <div className="acc-tree__children">
          {(group.children ?? []).map(leaf => (
            <div
              key={leaf.value}
              className="acc-tree__row acc-tree__row--leaf"
              role="treeitem"
              aria-checked={draft.includes(leaf.value)}
              onClick={() => onToggleLeaf(leaf.value)}>
              <span className="acc-tree__chev-spacer" />
              <Checkbox
                status={draft.includes(leaf.value) ? 'checked' : 'unchecked'}
                label=""
                tabIndex={-1}
              />
              <span className="acc-tree__label">{leaf.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Product filter (tree with chip-hover popover) ───────────────────────

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
    setDraft(d => allOn ? d.filter(v => !leaves.includes(v))
                        : Array.from(new Set([...d, ...leaves])))
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
  const selectedLabels = selected
    .map(v => PRODUCT_TREE.flatMap(g => g.children ?? [])
      .find(c => c.value === v)?.label)
    .filter((s): s is string => !!s)

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
          <HoverShell
            interactive
            openDelayMs={300}
            render={() => <AppliedListPanel heading="products" items={selectedLabels} />}>
            <span className="panw--filter__values">
              <span className="panw--filter__chip-target">
                <Tags label={String(selected.length)} color="neutral" contrast="high" size="default" className="acc-tag--static" />
              </span>
            </span>
          </HoverShell>
        )}
        <span className="panw--filter__chevron" aria-hidden="true">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={triggerRef}
        mode="multiple"
        selected={draft}
        onSelectionChange={setDraft}
        placement="bottom-start">
        <div
          className="acc-tree__select-all"
          role="checkbox"
          aria-checked={masterStatus === 'checked' ? 'true' : masterStatus === 'indeterminate' ? 'mixed' : 'false'}
          tabIndex={0}
          onClick={toggleMaster}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMaster() } }}>
          <Checkbox status={masterStatus} label="" tabIndex={-1} />
        </div>
        <div className="acc-tree__select-all-divider" role="separator" aria-hidden="true" />
        <div className="acc-tree" role="tree">
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

// ─── Health-trend bar chart (forked from opp-table) ──────────────────────

// Bars are glyphs (SVG rect fills), not text — use the icons-status
// family. text-status-* is one stop darker per the aesthetic guide
// and reads as label text, which these aren't.
const HEALTH_BAR_FILL: Record<Health, string> = {
  'healthy':  'var(--ds-icons-status-success)',
  'at-risk':  'var(--ds-icons-status-warning)',
  'critical': 'var(--ds-icons-status-danger)',
}
const HEALTH_FROM_LEVEL: Record<number, Health> = {
  0: 'healthy', 1: 'at-risk', 2: 'critical',
}
const HEALTH_HEIGHT_FRACTION: Record<Health, number> = {
  'healthy': 1.0, 'at-risk': 0.72, 'critical': 0.38,
}

function HealthTrendBars({ trend }: { trend: number[] }) {
  const barW = 6, gap = 4, padX = 6, padY = 4, innerH = 48
  const h = innerH + padY * 2
  const w = padX * 2 + trend.length * barW + Math.max(0, trend.length - 1) * gap
  return (
    <svg
      width={w} height={h} viewBox={`0 0 ${w} ${h}`}
      role="img" aria-label="12-month account health trend"
      className="acc-health-bars">
      {trend.map((v, i) => {
        const sev = HEALTH_FROM_LEVEL[v] ?? 'critical'
        const fraction = HEALTH_HEIGHT_FRACTION[sev]
        const barH = Math.max(barW, innerH * fraction)
        const x = padX + i * (barW + gap)
        const y = padY + (innerH - barH)
        return (
          <rect key={i} x={x} y={y} width={barW} height={barH}
            rx={barW / 2} ry={barW / 2} fill={HEALTH_BAR_FILL[sev]} />
        )
      })}
    </svg>
  )
}

// ─── Account Health hover popover ────────────────────────────────────────

function AccountHealthPanel({ row }: { row: AccountRow }) {
  const h = row.health
  return (
    <div className="acc-pop acc-pop--health">
      <div className="acc-pop__heading">{row.name}</div>
      <div className="acc-pop__sub">12-month health trend</div>
      <div className="acc-pop__chart"><HealthTrendBars trend={h.trend12mo} /></div>
      <div className="acc-pop__rows">
        <div className="acc-pop__kv">
          <span className="acc-pop__kv-label">Technical Health</span>
          <Tags
            shape="rounded" size="default" contrast="low"
            color={HEALTH_COLOR[h.technical]}
            label={HEALTH_LABEL[h.technical]} />
        </div>
        <div className="acc-pop__kv">
          <span className="acc-pop__kv-label">Adoption &amp; Deployment</span>
          <Tags
            shape="rounded" size="default" contrast="low"
            color={HEALTH_COLOR[h.adoption]}
            label={HEALTH_LABEL[h.adoption]} />
        </div>
      </div>
      <div className="acc-pop__cta">
        <Button kind="ghost-brand" size="small">View Account Health</Button>
      </div>
    </div>
  )
}

// ─── Account-level Risk Factors hover popover (spec §4.3) ────────────────
// IMPORTANT: these are ACCOUNT-LEVEL risks (six-value taxonomy from
// `ACCOUNT_RISK_LIBRARY`), DELIBERATELY DISTINCT from opp-table's
// deal-level risks. The popover heading reads "Account-level risk
// factors" so it's unambiguous to a reader (cr-intent §"Risk Factors
// sub-cell mirror filter format" + cr-failure §14).

function AccountRiskFactorsPanel({ risks, density }: { risks: AccountRiskFactor[]; density: DensityKey[] }) {
  const visible = risks.filter(r => density.includes(`risk-${r.id}` as DensityKey))
  if (visible.length === 0) {
    return (
      <div className="acc-pop acc-pop--risks">
        <div className="acc-pop__heading">Account-level risk factors</div>
        <div className="acc-pop__sub">No risk factors flagged on this account.</div>
      </div>
    )
  }
  return (
    <div className="acc-pop acc-pop--risks">
      <div className="acc-pop__heading">Account-level risk factors</div>
      <ul className="acc-pop__risk-list">
        {visible.map(r => (
          <li key={r.id} className="acc-pop__risk-row">
            <span className="acc-pop__risk-emoji" aria-hidden="true">{r.emoji}</span>
            <span className="acc-pop__risk-label">{r.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── EBC hover popover (spec §4.3) ───────────────────────────────────────
function EBCPanel({ ebc }: { ebc: EBC }) {
  if (ebc.absent) {
    return (
      <div className="acc-pop acc-pop--ebc">
        <div className="acc-pop__heading">EBC history</div>
        <div className="acc-pop__sub">This account has not had an EBC on file.</div>
      </div>
    )
  }
  return (
    <div className="acc-pop acc-pop--ebc">
      <div className="acc-pop__heading">EBC — {formatEbcDate(ebc.date)}</div>
      <div className="acc-pop__sub">{ebc.topic}</div>
      <div className="acc-pop__rows">
        <div className="acc-pop__kv">
          <span className="acc-pop__kv-label">PANW attendees</span>
        </div>
        <ul className="acc-pop__applied-list">
          {ebc.attendees.map(a => (
            <li key={a} className="acc-pop__applied-item">{a}</li>
          ))}
        </ul>
      </div>
      <div className="acc-pop__cta">
        <Button kind="ghost-brand" size="small">View EBC details</Button>
      </div>
    </div>
  )
}

// ─── Sales Play hover popover + cluster (spec §4.5) ─────────────────────
// Per spec §4.5: render tags in LIFECYCLE order (Not Touched →
// Pitched → Deferred → Declined → Pursuing → Closed Won → Closed
// Lost), regardless of how many are present. Emphasis hierarchy pulls
// the eye to Not Touched first via a brand-accent color (purple), NOT
// red (red would read as "error" instead of "action item").
// All buckets render — no +N collapse. The cell wraps vertically and
// uses the row height that column 3's 4-sub-cell stack already
// reserves, so truncation hides information for no visual gain.

function SalesPlayBucketPanel({ bucket }: { bucket: SalesPlayBucket }) {
  return (
    <div className="acc-pop acc-pop--play-bucket">
      <div className="acc-pop__heading">
        {SALES_PLAY_LABEL[bucket.status]} — {formatUsdCompact(bucket.usd)}
      </div>
      <ul className="acc-pop__kv-list">
        {bucket.plays.map(p => (
          <li key={p.name} className="acc-pop__kv">
            <span className="acc-pop__kv-label">{p.name}</span>
            <span className="acc-pop__kv-value">{formatUsdCompact(p.usd)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SalesPlayTag({ bucket }: { bucket: SalesPlayBucket }) {
  const palette = SALES_PLAY_PALETTE[bucket.status]
  // Drop the colon-space to save ~6–8px per tag — at account-column
  // widths the colon push makes single-bucket rows collapse to +N
  // even when they have room for the bucket itself. Status label +
  // dollar reads cleanly without it.
  const label = `${SALES_PLAY_LABEL[bucket.status]} ${formatUsdCompact(bucket.usd)}`
  return (
    <HoverShell render={() => <SalesPlayBucketPanel bucket={bucket} />}>
      <Tags
        shape="rounded"
        size="large"
        contrast={palette.contrast}
        color={palette.color}
        label={label}
      />
    </HoverShell>
  )
}

interface SalesPlayClusterProps {
  buckets: SalesPlayBucket[]   // may be in any order; cluster handles ordering
  density: DensityKey[]
}

// Account-table sales plays wrap vertically rather than collapsing to
// +N. With column-3's 4-sub-cell stack the row already carries 4 lines
// of height; column 5 simply uses that same vertical budget. Lifecycle
// order is preserved across the wrap (Not Touched → ... → Closed Lost).

function SalesPlayCluster({ buckets, density }: SalesPlayClusterProps) {
  const visible = buckets.filter(b =>
    density.includes(`status-${b.status}` as DensityKey))
  if (visible.length === 0) return null
  const lifecycleOrdered = [...visible].sort(
    (a, b) => SALES_PLAY_LIFECYCLE.indexOf(a.status) - SALES_PLAY_LIFECYCLE.indexOf(b.status)
  )
  return (
    <div className="acc-tag-cluster">
      {lifecycleOrdered.map(b => (
        <SalesPlayTag key={b.status} bucket={b} />
      ))}
    </div>
  )
}

// ─── Product hover panel (spec §4.4) ─────────────────────────────────────
// IMPORTANT — distinct from opp-table's `ProductPanel`. The opp-table
// version renders share-of-deal-value as a percentage:
//     (product.usd / totalUsd * 100).toFixed(1) + '%'
// This panel renders ABSOLUTE per-product ARR contribution. Do NOT
// merge the two implementations — cr-failure §7 specifically calls out
// the trap of porting the % formula with a relabeled JSX field.

function ProductARRPanel({ product }: { product: Product }) {
  const Icon = BRAND_ICON[product.brand]
  return (
    <div className="acc-pop-row">
      <span className="acc-pop-row__icon" aria-hidden="true">
        {Icon ? <Icon size={20} /> : null}
      </span>
      <span className="acc-pop-row__name">{product.name}</span>
      <span className="acc-pop-row__value">
        {formatUsdCompact(product.arrUsd)} ARR
      </span>
    </div>
  )
}

// ─── Product cluster — wrapping (no +N collapse) ─────────────────────────
// Account cells are vertically tall (Col 3 already stacks 4 sub-cells),
// so there's ample vertical space to render all products as a wrapping
// cluster. Truncating to +N when the row has plenty of unused height
// hides information for no visual gain. Products are passed in already
// sorted descending by ARR; the wrap reflows that order top-to-bottom.

function ProductCluster({ products }: { products: Product[] }) {
  return (
    <div className="acc-tag-cluster">
      {products.map((p, i) => {
        const Icon = BRAND_ICON[p.brand]
        return (
          <HoverShell
            key={`${p.name}-${i}`}
            render={() => <ProductARRPanel product={p} />}>
            {Icon
              ? <Tags {...TAG_BASE} icon renderIcon={Icon} label={p.name} />
              : <Tags {...TAG_BASE} label={p.name} />}
          </HoverShell>
        )
      })}
    </div>
  )
}

// ─── Quarter pipeline popover (spec §4.2) ────────────────────────────────
// Hover a quarter chip → small no-header table of {opp type, $value}.
// No opp names — at the account level the AE is sizing the quarter,
// not picking a deal.

const OPP_TYPE_LABEL: Record<'net-new'|'upsell'|'renewal', string> = {
  'net-new': 'Net New',
  'upsell':  'Upsell',
  'renewal': 'Renewal',
}

function QuarterPipelinePanel({ quarter }: { quarter: QuarterPipeline }) {
  if (quarter.opps.length === 0) {
    return (
      <div className="acc-pop acc-pop--quarter">
        <div className="acc-pop__heading">{quarter.label}</div>
        <div className="acc-pop__sub">No pipeline in this quarter.</div>
      </div>
    )
  }
  return (
    <div className="acc-pop acc-pop--quarter">
      <div className="acc-pop__heading">{quarter.label} pipeline</div>
      <ul className="acc-pop__kv-list">
        {quarter.opps.map((o, i) => (
          <li key={i} className="acc-pop__kv">
            <span className="acc-pop__kv-label">{OPP_TYPE_LABEL[o.type]}</span>
            <span className="acc-pop__kv-value">{formatUsdCompact(o.usd)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Apex roll-up popover (spec §4.1) ────────────────────────────────────
// Derived at render time from the dataset so the numbers can't drift
// from the visible siblings (cr-failure §8). Memoized via useMemo at
// the call site.

function ApexHoverPanel({ apex, rows }: { apex: string; rows: AccountRow[] }) {
  const siblings = rows.filter(r => r.apex === apex)
  const combinedArr = siblings.reduce((s, r) => s + r.arrUsd, 0)
  const count = siblings.length
  return (
    <div className="acc-pop acc-pop--apex">
      <div className="acc-pop__heading">{apex}</div>
      <div className="acc-pop__rows">
        <div className="acc-pop__kv">
          <span className="acc-pop__kv-label">Sub-accounts</span>
          <span className="acc-pop__kv-value">{count}</span>
        </div>
        <div className="acc-pop__kv">
          <span className="acc-pop__kv-label">Combined ARR</span>
          <span className="acc-pop__kv-value">{formatUsdCompact(combinedArr)}</span>
        </div>
      </div>
    </div>
  )
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

  // Filter row state. Defaults pinned to spec §5.
  const [density, setDensity] = useState<DensityKey[]>([...ALL_DENSITY_KEYS])
  const [groupedHealth, setGroupedHealth] =
    useState<GroupedHealthSelection>(INITIAL_GROUPED_HEALTH)
  const [closeDateMulti, setCloseDateMulti] =
    useState<string[]>(['this-q', 'q1fy27', 'q2fy27', 'q3fy27'])
  const [lastActivitySingle, setLastActivitySingle] = useState<string | null>(null)
  const [ebcSingle, setEbcSingle] = useState<string | null>(null)
  const [upsellSingle, setUpsellSingle] = useState<string | null>(null)
  const [accountRiskMulti, setAccountRiskMulti] = useState<string[]>([])
  const [products, setProducts] = useState<string[]>([...ALL_PRODUCT_LEAVES])

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

          {/* Filter row — tag-density at the leading edge, divider,
              then the seven data filters per spec §3.5–§3.11. */}
          <div className="acc-filter-row">
            <div className="acc-filter-group">
              <TagDensityFilter selected={density} onChange={setDensity} />
              <div className="acc-filter-divider" role="presentation" />
              <Filter
                label="close date"
                options={CLOSE_DATE_OPTIONS}
                selected={closeDateMulti}
                onApply={setCloseDateMulti}
              />
              <GroupedHealthFilter
                value={groupedHealth}
                onApply={setGroupedHealth}
              />
              <SingleSelectFilter
                label="last activity"
                options={LAST_ACTIVITY_OPTIONS}
                value={lastActivitySingle}
                onChange={setLastActivitySingle}
              />
              <SingleSelectFilter
                label="EBC"
                options={EBC_OPTIONS}
                value={ebcSingle}
                onChange={setEbcSingle}
              />
              <SingleSelectFilter
                label="upsell"
                options={UPSELL_OPTIONS}
                value={upsellSingle}
                onChange={setUpsellSingle}
              />
              <Filter
                label="account risk factors"
                options={ACCOUNT_RISK_FILTER_OPTIONS}
                selected={accountRiskMulti}
                onApply={setAccountRiskMulti}
              />
              <ProductFilter selected={products} onApply={setProducts} />
            </div>
          </div>

          <div className="acc-table-shell">
            <table className="acc-table">
              <thead>
                <tr>
                  <th className="acc-c-account acc-no-sort"><Header size="md" type="basic">Account</Header></th>
                  <th className="acc-c-equal acc-no-sort"><Header size="md" type="basic">Opportunities</Header></th>
                  <th className="acc-c-equal acc-no-sort"><Header size="md" type="basic">Activities &amp; Risks</Header></th>
                  <th className="acc-c-equal acc-no-sort"><Header size="md" type="basic">Products</Header></th>
                  <th className="acc-c-equal acc-no-sort"><Header size="md" type="basic">Sales Plays</Header></th>
                  <th className="acc-c-value acc-no-sort"><Header size="md" type="basic" alignment="right">Value</Header></th>
                  <th className="acc-c-actions acc-no-sort" />
                </tr>
              </thead>
              <tbody>
                {sortedRows.map(row => (
                  <tr key={row.id} className="acc-row">
                    <td className="acc-c-account">
                      {/* Column 1 — Account Name (link, body-compact-02
                          bold) + Apex Account (smaller, tertiary,
                          hover → roll-up popover). Apex line omitted
                          when account is standalone (spec §2 / §4.1). */}
                      <div className="acc-multiline">
                        <a
                          href="#"
                          className="acc-multiline__name acc-multiline__link"
                          onClick={(e) => e.preventDefault()}>
                          {row.name}
                        </a>
                        {row.apex && (
                          <HoverShell
                            interactive
                            openDelayMs={400}
                            render={() => <ApexHoverPanel apex={row.apex!} rows={ROWS} />}>
                            <span className="acc-multiline__sub">{row.apex}</span>
                          </HoverShell>
                        )}
                      </div>
                    </td>
                    <td className="acc-c-equal">
                      {/* Column 2 — four per-quarter pipeline tags
                          in a wrapping flex cluster (matches the
                          opp-table cluster pattern). Empty quarter
                          renders as "$—" placeholder per spec §4.2 —
                          absence is data, not a missing tag.
                          Tag-density toggles per-quarter visibility. */}
                      <div className="acc-tag-cluster">
                        {row.pipeline.map((q, i) => {
                          const key = QUARTER_DENSITY_KEYS[i]
                          if (!density.includes(key)) return null
                          const label = `${q.label}: ${formatUsdCompact(q.usd)}`
                          return (
                            <HoverShell
                              key={key}
                              render={() => <QuarterPipelinePanel quarter={q} />}>
                              <Tags {...TAG_BASE} label={label} />
                            </HoverShell>
                          )
                        })}
                      </div>
                    </td>
                    <td className="acc-c-equal">
                      {/* Column 3 — Activities & Risks (4 sub-cells).
                          Last Activity / Account Health / Risk count /
                          EBC. Each is independently gated by tag-
                          density. Hover surfaces are per-sub-cell (spec
                          §4.3). */}
                      {(() => {
                        const dayLabel =
                          row.activity.daysAgo === 0 ? 'today'
                          : row.activity.daysAgo === 1 ? '1 day ago'
                          : `${row.activity.daysAgo} days ago`
                        const actStyle = activityStyleForDays(row.activity.daysAgo)
                        const healthColor = HEALTH_COLOR[row.health.overall]
                        const riskCount = row.risks.length
                        const riskLabel =
                          riskCount === 1 ? '1 risk' : `${riskCount} risks`
                        const ebcSev = ebcSeverity(row.ebc)
                        const ebcLabel = row.ebc.absent
                          ? 'No EBC on record'
                          : `EBC on ${formatEbcDate(row.ebc.date)}`
                        return (
                          <div className="acc-tag-cluster acc-tag-cluster--stack">
                            {density.includes('lastActivity') && (
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
                                  className="acc-tag--icon-quiet"
                                  icon
                                  renderIcon={actStyle.icon ?? Clock}
                                  label={dayLabel}
                                />
                              </HoverShell>
                            )}
                            {density.includes('accountHealth') && (
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
                            {density.includes('riskCount') && riskCount > 0 && (
                              <HoverShell
                                interactive
                                render={() => <AccountRiskFactorsPanel risks={row.risks} density={density} />}>
                                <Tags {...TAG_BASE} label={riskLabel} />
                              </HoverShell>
                            )}
                            {density.includes('ebc') && (
                              <HoverShell
                                interactive
                                render={() => <EBCPanel ebc={row.ebc} />}>
                                <Tags
                                  shape={TAG_BASE.shape}
                                  size={TAG_BASE.size}
                                  contrast={TAG_BASE.contrast}
                                  color={EBC_SEVERITY_COLOR[ebcSev]}
                                  className="acc-tag--icon-quiet"
                                  icon
                                  renderIcon={Calendar}
                                  label={ebcLabel}
                                />
                              </HoverShell>
                            )}
                          </div>
                        )
                      })()}
                    </td>
                    <td className="acc-c-equal">
                      {/* Column 4 — Products owned, sorted descending by
                          ARR. Hover shows ABSOLUTE ARR contribution
                          (not share-of-deal — distinct from opp-table
                          on purpose per spec §4.4). */}
                      {density.includes('products') && (() => {
                        const sorted = [...row.products].sort((a, b) => b.arrUsd - a.arrUsd)
                        return <ProductCluster products={sorted} />
                      })()}
                    </td>
                    <td className="acc-c-equal">
                      {/* Column 5 — Sales Play status buckets in
                          lifecycle order (Not Touched → ... →
                          Closed Lost). Overflow collapses by
                          deemphasized priority, NOT rightmost
                          (spec §4.5 + cr-failure §2). */}
                      <SalesPlayCluster buckets={row.salesPlays} density={density} />
                    </td>
                    <td className="acc-c-value">
                      <div className="acc-value">
                        <div><span className="acc-value__num">{formatUsdCompact(row.arrUsd)}</span> <span className="acc-value__unit">ARR</span></div>
                        <div><span className="acc-value__num">{formatUsdCompact(row.ltvUsd)}</span> <span className="acc-value__unit">LTV</span></div>
                      </div>
                    </td>
                    <td className="acc-c-actions">
                      {/* Column 7 — Actions. Two ghost-accent
                          IconButtons: AI (Stars) and Expand
                          (ChevronRight). Behavior placeholder, mirrors
                          opp-table. */}
                      <div className="acc-actions">
                        <IconButton
                          kind="ghost-accent"
                          size="sm"
                          iconSize={16}
                          renderIcon={Stars}
                          aria-label="AI actions for this account"
                        />
                        <IconButton
                          kind="ghost-accent"
                          size="sm"
                          iconSize={16}
                          renderIcon={ChevronRight}
                          aria-label="Open account detail"
                        />
                      </div>
                    </td>
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

/* ── Filter row ─────────────────────────────────────────────────────────
 * Tag-density filter at the leading edge, vertical divider, then the
 * data-row filters. Mirrors opp-table mental model: density controls
 * how much each row shows; the others narrow the row set. */
.acc-filter-row {
  display: flex;
  align-items: flex-start;
  gap: var(--ds-spacing-03);
  padding: var(--ds-spacing-02) var(--ds-spacing-04) var(--ds-spacing-03);
  flex-wrap: wrap;
}
.acc-filter-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ds-spacing-02);
  row-gap: var(--ds-spacing-02);
  flex: 1;
  min-width: 0;
}
.acc-filter-divider {
  display: inline-block;
  width: 1px;
  align-self: stretch;
  background-color: var(--ds-lines-neutral-rest);
  margin: 0 var(--ds-spacing-02);
}

/* ── Tree (product filter) ──────────────────────────────────────────── */
.acc-tree { padding: var(--ds-spacing-02) 0; }
.acc-tree__select-all {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: var(--ds-spacing-02) var(--ds-spacing-04);
  cursor: pointer;
}
.acc-tree__select-all-divider {
  height: 1px;
  background: var(--ds-lines-neutral-rest);
  margin: 0;
}
.acc-tree__group { padding: 0; }
.acc-tree__row {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-02);
  padding: var(--ds-spacing-02) var(--ds-spacing-04);
  min-height: 32px;
  cursor: pointer;
}
.acc-tree__row:hover { background-color: var(--ds-ghost-hover); }
.acc-tree__row--leaf { padding-left: var(--ds-spacing-08); }
.acc-tree__chev {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: var(--ds-icons-secondary-rest);
  border-radius: var(--ds-radius-tight);
}
.acc-tree__chev:hover { background-color: var(--ds-ghost-hover); color: var(--ds-text-primary); }
.acc-tree__chev-spacer { display: inline-block; width: 20px; height: 1px; }
.acc-tree__row-action {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-spacing-02);
  flex: 1;
}
.acc-tree__icon { color: var(--ds-icons-secondary-rest); display: inline-flex; }
.acc-tree__label { font-size: 14px; color: var(--ds-text-primary); }
.acc-tree__label--bold { font-weight: var(--ds-type-font-weight-semibold); }

/* ── Hover-panel surface (portaled) ─────────────────────────────────── */
.acc-hover-trigger { display: inline-flex; }
.acc-hover-panel {
  background: var(--ds-surface-rest);
  border: 1px solid var(--ds-lines-neutral-rest);
  border-radius: var(--ds-radius-generous);
  box-shadow: var(--ds-shadow-flyout);
  animation: acc-hover-pop 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
@keyframes acc-hover-pop {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.acc-pop {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03);
  min-width: 220px;
  max-width: 320px;
  padding: var(--ds-spacing-04);
}
.acc-pop__heading {
  font-size: 14px;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
}
.acc-pop__sub {
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-secondary-rest);
}
.acc-pop--applied .acc-pop__applied-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-02);
}
.acc-pop--applied .acc-pop__applied-item {
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-secondary-rest);
}

/* Filter footer actions */
.panw--filter__footer-actions {
  display: flex;
  gap: var(--ds-spacing-02);
  justify-content: flex-end;
  padding: var(--ds-spacing-02) var(--ds-spacing-04);
}

/* Table shell — no own border. */
.acc-table-shell { overflow-x: auto; }
.acc-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
/* th owns no padding; the DS Header component renders its own
 * internal padding so the row reads as a single horizontal band
 * rather than a strip of chip-pills. Body cells carry their own
 * padding via .acc-table td below. */
.acc-table th {
  text-align: left;
  padding: 0;
  vertical-align: middle;
}
.acc-table thead tr {
  border-bottom: 1px solid var(--ds-lines-neutral-rest);
}
/* Kill the resting "up-down" indicator on every header — only the
 * active sort arrow on the currently-sorted column remains. Mirrors
 * the opp-table override; without it every column reads as
 * sortable when most aren't. */
.acc-table .panw--header__sort-indicator:not(.panw--header__sort-indicator--active) {
  display: none;
}
.acc-table td {
  padding: var(--ds-spacing-04);
  vertical-align: middle;
  color: var(--ds-text-secondary-rest);
}

/* Column widths.
 * Account column gets a fixed 240px to absorb long names without
 * crowding the four equal columns. Value is 140 (compact tabular
 * pair); Actions is 80. The remaining width splits evenly across the
 * four equal columns. */
.acc-table th.acc-c-account,
.acc-table td.acc-c-account { width: 200px; }
.acc-table th.acc-c-equal,
.acc-table td.acc-c-equal { width: calc((100% - 200px - 130px - 72px) / 4); }
.acc-table th.acc-c-value,
.acc-table td.acc-c-value { width: 130px; text-align: right; }
.acc-table th.acc-c-actions,
.acc-table td.acc-c-actions { width: 72px; }
.acc-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--ds-spacing-02); /* 4 — button-group spacing per Stage guide */
}

/* Body row treatment — no zebra, hairline dividers between rows. */
.acc-table tbody tr { background-color: var(--ds-surface-rest); }
.acc-table tbody tr + tr { border-top: 1px solid var(--ds-lines-neutral-rest); }
.acc-table tbody tr:hover  { background-color: var(--ds-ghost-hover); }
.acc-table tbody tr:active { background-color: var(--ds-ghost-pressed); }

/* ── Column 1 — Account ─────────────────────────────────────────────────
 * Two-line stack. Name is body-compact-02 bold, secondary text.
 * Apex is label-02, tertiary text. Both clamp to two lines max and
 * ellipsize beyond. */
.acc-multiline {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03); /* 8 — matches opp-table rhythm so the
                                two lines read as a connected pair,
                                not two collapsed-tight strings. */
  align-items: flex-start;
  min-width: 0;
}
.acc-multiline__name {
  font-size: 14px;
  line-height: 20px;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.acc-multiline__sub {
  font-size: 12px;
  line-height: 16px;
  color: var(--ds-text-secondary-rest);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
}
.acc-multiline__link {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
.acc-multiline__link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
  color: var(--ds-text-primary);
}

/* Tag cluster inside a cell. Wraps; gap-04 between tags. */
.acc-tag-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-spacing-02);
  align-items: center;
}

/* Column 3 stacks sub-cells vertically (each row in the cell is a
 * distinct concept — activity / health / risks / EBC). */
.acc-tag-cluster--stack {
  flex-direction: column;
  align-items: flex-start;
}

/* Icon-quiet tag — see opp-table convention. The DS tag-neutral-low
 * icon defaults to icons.primary; for label-style tags (close date,
 * last activity, EBC) the icon sits one stop lighter. */
.panw--tag.acc-tag--icon-quiet.panw--tag--low.panw--tag--neutral .panw--tag__icon,
.panw--tag.acc-tag--icon-quiet.panw--tag--low.panw--tag--neutral .panw--tag__close-btn {
  color: var(--ds-icons-secondary-rest);
}

/* Risk-list inside RiskFactorsPanel popover */
.acc-pop--risks { max-width: 360px; }
.acc-pop__risk-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-02);
}
.acc-pop__risk-row {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: var(--ds-spacing-02);
  align-items: start;
}
.acc-pop__risk-emoji { font-size: 14px; line-height: 20px; }
.acc-pop__risk-label {
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-secondary-rest);
}

/* Account-health popover layout */
.acc-pop--health { min-width: 280px; }
.acc-pop__chart { display: block; }
.acc-pop__cta {
  display: flex;
  justify-content: flex-end;
  padding-top: var(--ds-spacing-02);
  border-top: 1px solid var(--ds-lines-neutral-rest);
}
.acc-pop--ebc { min-width: 280px; }
.acc-health-bars { display: block; }

/* Product popover — single horizontal row at large CellStandard
 * height (48px). Three cells: [20px logo] [bold name] [value], the
 * value pushed to the trailing edge with margin-left:auto so longer
 * names breathe naturally and the dollar reads as a row-end summary.
 * Cell padding (16px) and content sizes (16px / 24px) match the
 * scan rhythm of a CellStandard row, not the squint-y label scale. */
.acc-pop-row {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 var(--ds-spacing-05); /* 16 — CellStandard horizontal padding */
  gap: var(--ds-spacing-03);       /* 8  — gap between logo and name */
  min-width: 0;
  white-space: nowrap;
}
.acc-pop-row__icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
}
.acc-pop-row__name {
  font-size: 16px;
  line-height: 24px;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
}
.acc-pop-row__value {
  font-size: 16px;
  line-height: 24px;
  color: var(--ds-text-secondary-rest);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
  margin-left: var(--ds-spacing-06); /* 24 — clear separation from name */
}

.acc-pop--play-bucket { min-width: 240px; }


/* Static tag — display-only label inside an interactive wrapper
 * (e.g. a filter trigger button, or a FlyoutItem row). The wrapper
 * element owns the hover; the tag should never pick up its own
 * :hover state. pointer-events:none routes hover through to the
 * wrapper without overriding bg per categorical color. */
.panw--tag.acc-tag--static {
  pointer-events: none;
  cursor: default;
}

/* KV rows used inside hover popovers. */
.acc-pop__rows,
.acc-pop__kv-list {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-02);
  list-style: none;
  padding: 0;
  margin: 0;
}
.acc-pop__kv {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ds-spacing-04);
}
.acc-pop__kv-label {
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-secondary-rest);
}
.acc-pop__kv-value {
  font-size: 14px;
  line-height: 20px;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
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
