// Maps canonical Account records to the AccountRow shape consumed by AEAccountTable.
// See poc-exploration/src/compositions/account-table.stories.tsx for the target interface.
//
// Field-mapping notes (gaps from canonical data):
//
//   ebc.attendees — EBCS canonical data carries panwAttendees (PANW-side names).
//     The authored DEFAULT_ROWS fixture uses customer-side attendees instead.
//     This mapper uses panwAttendees; the field name `attendees` is intentionally
//     non-prescriptive so both are valid data.
//
//   products[].arrUsd — canonical Account has no per-product ARR breakdown.
//     Derived by weighting installBase.rpo across products proportionally to
//     their share of the account's total opportunity pipeline. If no opps exist,
//     rpo is split evenly across one representative product per platformization
//     brand. Raw pipeline amounts are used when rpo is absent. This is a
//     pipeline-weighted ARR estimate, not actual contract data; relative ordering
//     and brand allocation are meaningful, exact values are approximations.
//
//   activity — derived from the lowest daysAgo across all opportunities for this
//     account. Canonical Account has no standalone activity record.

import { PRODUCTS, PRODUCT_FAMILIES, ACCOUNT_RISKS, ACTIVITY_TYPES } from './taxonomies'
import { EBCS } from './data/ebcs'
import type { Account, Opportunity, SalesPlayInstance, SalesPlay, ProductId } from './types'
import type { AccountRow } from '../compositions/account-table.stories'

// ─── Local type aliases (mirror story-local types without importing them) ─────

type Brand = 'strata' | 'prisma' | 'cortex' | 'unit-42'
type Health = 'healthy' | 'at-risk' | 'critical'
type AccountRiskId = 'no-pipeline' | 'no-ebc' | 'not-platformized' | 'derailed-povs' | 'no-asr' | 'no-csp'
type SalesPlayStatus = 'not-touched' | 'pitched' | 'deferred' | 'declined' | 'pursuing' | 'closed-won' | 'closed-lost'
type OppType = 'net-new' | 'upsell' | 'renewal'

// ─── Quarter assignment ───────────────────────────────────────────────────────
//
// PANW fiscal calendar (Aug→Jul). Demo clock anchored to 2026-05-14 to match
// opportunity-row-mapper.ts. May 2026 = Q4FY26 (current quarter).
//
// Fiscal quarter end dates from DEMO_DATE:
//   CQ  (Q4FY26): close by Jul 31, 2026  → daysToClose ≤ 78
//   Q1FY27:       Aug 1 – Oct 31, 2026   → 79 ≤ daysToClose ≤ 170
//   Q2FY27:       Nov 1, 2026 – Jan 31   → 171 ≤ daysToClose ≤ 262
//   Q3FY27:       Feb 1 – Apr 30, 2027   → 263 ≤ daysToClose ≤ 351
//
// Opps beyond Q3FY27 or already overdue (daysToClose < 0) are excluded.

const QUARTER_LABELS: [string, string, string, string] = ['CQ', 'Q1FY27', 'Q2FY27', 'Q3FY27']
const QUARTER_BOUNDS = [78, 170, 262, 351]

const TYPE_MAP: Record<string, OppType> = {
  'net-new':            'net-new',
  'upsell':             'upsell',
  'renewal':            'renewal',
  'renewal-and-upsell': 'renewal',
}

// ─── Brand mapping ────────────────────────────────────────────────────────────

// BrandId (uppercase, from canonical data) → story-local Brand (lowercase)
const BRAND_ID_TO_STORY: Record<string, Brand> = {
  'STRATA': 'strata',
  'PRISMA': 'prisma',
  'CORTEX': 'cortex',
  'UNIT42': 'unit-42',
}

// One representative product per brand for the no-opportunities fallback
const BRAND_FALLBACK_PRODUCT: Record<string, ProductId> = {
  'STRATA': 'pa-series',
  'PRISMA': 'prisma-access',
  'CORTEX': 'cortex-xdr',
  'UNIT42': 'unit-42-reactive',
}

// ─── Account risk library (mirrors account-table.stories.tsx §ACCOUNT_RISK_LIBRARY) ──

const ACCOUNT_RISK_LIBRARY: Record<AccountRiskId, { emoji: string; label: string }> = {
  'no-pipeline':       { emoji: '📭', label: 'No Pipeline in CQ + Next 4Q' },
  'no-ebc':            { emoji: '🏛️', label: 'No EBCs in last year' },
  'not-platformized':  { emoji: '🏗️', label: 'Not Platformized' },
  'derailed-povs':     { emoji: '🧪', label: 'POVs without progression' },
  'no-asr':            { emoji: '🌀', label: 'No ASR / Stale ASR' },
  'no-csp':            { emoji: '🚧', label: 'No customer success plan' },
}

// ─── Mapper ───────────────────────────────────────────────────────────────────

export function mapAccountToRow(
  account: Account,
  allOpportunities: Opportunity[],
  salesPlayInstances: SalesPlayInstance[],
  salesPlays: SalesPlay[],
): AccountRow {
  const accountOpps = allOpportunities.filter(o => o.accountId === account.id)
  const accountInstances = salesPlayInstances.filter(i => i.accountId === account.id)

  // ── Health ───────────────────────────────────────────────────────────────
  // trend12mo: canonical order is newest→oldest (index 0 = current month),
  // confirmed by comparing acc-stripe-treasury canonical [2,2,2,1,1,1,0…]
  // against overall:'critical'. AccountRow expects oldest→newest so the
  // current month renders on the right — mirror opp-table mapper:134.
  const health = {
    overall:   account.health.overall as Health,
    technical: account.health.technical as Health,
    adoption:  account.health.deploymentAdoption as Health,
    trend12mo: account.health.trend12mo
      ? [...account.health.trend12mo].reverse()
      : [0,0,0,0,0,0,0,0,0,0,0,0],
  }

  // ── Activity ─────────────────────────────────────────────────────────────
  // Most recent activity across all opportunities: the opp with the lowest
  // daysAgo. Falls back to a placeholder when the account has no open opps.
  let activity: AccountRow['activity']
  if (accountOpps.length === 0) {
    // eslint-disable-next-line no-console
    console.warn(`[account-row-mapper] ${account.id} (${account.name}) has no opportunities — activity placeholder used`)
    activity = { daysAgo: 0, description: 'No activity on record' }
  } else {
    const mostRecent = accountOpps.reduce((best, o) =>
      o.lastActivity.daysAgo < best.lastActivity.daysAgo ? o : best
    )
    const activityLabel =
      mostRecent.lastActivity.description ??
      ACTIVITY_TYPES[mostRecent.lastActivity.type]?.label ??
      mostRecent.lastActivity.type
    activity = { daysAgo: mostRecent.lastActivity.daysAgo, description: activityLabel }
  }

  // ── EBC ──────────────────────────────────────────────────────────────────
  // Most recent EBC for this account by ISO date string comparison.
  // attendees carries PANW-side names from canonical data; see file header note.
  const accountEbcs = EBCS.filter(e => e.accountId === account.id)
  let ebc: { absent: true } | { absent: false; date: string; topic: string; attendees: string[] }
  if (accountEbcs.length === 0) {
    ebc = { absent: true }
  } else {
    const mostRecentEbc = accountEbcs.reduce((best, e) => e.date > best.date ? e : best)
    ebc = {
      absent:    false,
      date:      mostRecentEbc.date,
      topic:     mostRecentEbc.topic,
      attendees: mostRecentEbc.panwAttendees,
    }
  }

  // ── Pipeline ─────────────────────────────────────────────────────────────
  // Group opps by fiscal quarter. Overdue and beyond-Q3FY27 opps are excluded.
  const byQuarter: { type: OppType; usd: number }[][] = [[], [], [], []]

  for (const opp of accountOpps) {
    if (opp.daysToClose < 0) continue
    let qi = -1
    for (let i = 0; i < QUARTER_BOUNDS.length; i++) {
      if (opp.daysToClose <= QUARTER_BOUNDS[i]) { qi = i; break }
    }
    if (qi === -1) continue
    byQuarter[qi].push({ type: TYPE_MAP[opp.type] ?? 'net-new', usd: opp.amount })
  }

  const pipeline: AccountRow['pipeline'] = [0, 1, 2, 3].map(i => ({
    label: QUARTER_LABELS[i],
    usd:   byQuarter[i].reduce((s, o) => s + o.usd, 0),
    opps:  byQuarter[i],
  })) as AccountRow['pipeline']

  const totalPipelineUsd   = pipeline.reduce((s, q) => s + q.usd, 0)
  const hasUpsellPipeline  = pipeline.some(q => q.opps.some(o => o.type === 'upsell'))

  // ── Products ─────────────────────────────────────────────────────────────
  // See file header for derivation strategy.
  const rpo = account.installBase?.rpo ?? 0

  let products: AccountRow['products']

  if (accountOpps.length > 0) {
    const productAmounts = new Map<string, number>()
    for (const opp of accountOpps) {
      for (const productId of opp.productIds) {
        const allocation = opp.productAllocations?.find(a => a.productId === productId)
        const amount = allocation?.amountUsd ?? (opp.amount / opp.productIds.length)
        productAmounts.set(productId, (productAmounts.get(productId) ?? 0) + amount)
      }
    }
    const totalProductAmount = Array.from(productAmounts.values()).reduce((s, v) => s + v, 0)

    products = Array.from(productAmounts.entries())
      .map(([rawId, pipelineAmount]) => {
        const meta   = PRODUCTS[rawId as ProductId]
        const name   = meta?.name ?? rawId
        const family = meta?.familyId ? PRODUCT_FAMILIES[meta.familyId] : undefined
        const brand: Brand = BRAND_ID_TO_STORY[family?.brand ?? 'STRATA'] ?? 'strata'
        const arrUsd = totalProductAmount > 0 && rpo > 0
          ? Math.round(pipelineAmount / totalProductAmount * rpo)
          : Math.round(pipelineAmount)
        return { name, brand, arrUsd }
      })
      .sort((a, b) => b.arrUsd - a.arrUsd)
  } else {
    // No opportunities: one product per platformization brand, rpo split evenly
    const share = account.platformizations.length > 0 ? Math.round(rpo / account.platformizations.length) : 0
    products = account.platformizations.map(brandId => {
      const fallbackId = BRAND_FALLBACK_PRODUCT[brandId] ?? 'pa-series'
      const meta       = PRODUCTS[fallbackId]
      return {
        name:   meta?.name ?? fallbackId,
        brand:  BRAND_ID_TO_STORY[brandId] ?? 'strata' as Brand,
        arrUsd: share,
      }
    })
  }

  // ── Risks ─────────────────────────────────────────────────────────────────
  const risks = account.riskIds
    .filter(rid => rid !== 'no-risks')
    .map(rid => {
      const lib = ACCOUNT_RISK_LIBRARY[rid as AccountRiskId]
      if (!lib) {
        // eslint-disable-next-line no-console
        console.warn(`[account-row-mapper] unknown account risk id '${rid}' on ${account.id}`)
        return null
      }
      return { id: rid as AccountRiskId, emoji: lib.emoji, label: lib.label }
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)

  // ── Sales Plays ───────────────────────────────────────────────────────────
  // Group instances by status into buckets, each bucket carrying play names.
  const statusBuckets = new Map<SalesPlayStatus, { name: string; usd: number }[]>()

  for (const instance of accountInstances) {
    const play   = salesPlays.find(p => p.id === instance.playId)
    const status = instance.status as SalesPlayStatus
    if (!statusBuckets.has(status)) statusBuckets.set(status, [])
    statusBuckets.get(status)!.push({
      name: play?.name ?? instance.playId,
      usd:  instance.amountUsd,
    })
  }

  const salesPlaysRows: AccountRow['salesPlays'] = Array.from(statusBuckets.entries()).map(
    ([status, plays]) => ({ status, usd: plays.reduce((s, p) => s + p.usd, 0), plays }),
  )

  // ── ARR + LTV ─────────────────────────────────────────────────────────────
  // installBase.rpo is the recurring pipeline opportunity value — the ARR
  // proxy used across all canonical account data. lifetimeValue is authoritative.

  return {
    id:               account.id,
    accountId:        account.id,
    name:             account.name,
    apex:             account.apex ?? null,
    pipeline,
    totalPipelineUsd,
    hasUpsellPipeline,
    activity,
    health,
    ebc,
    risks,
    products,
    salesPlays:       salesPlaysRows,
    arrUsd:           rpo,
    ltvUsd:           account.lifetimeValue,
  }
}
