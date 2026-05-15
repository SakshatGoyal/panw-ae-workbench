// Maps canonical Opportunity records to the OpportunityRow shape consumed by AEOpportunityTable.
// See poc-exploration/src/compositions/opportunity-table.stories.tsx for the target interface.

import { PRODUCTS, ACTIVITY_TYPES } from './taxonomies'
import type { Opportunity, Account, SalesPlayInstance, SalesPlay } from './types'
import type { OpportunityRow } from '../compositions/opportunity-table.stories'

// ─── Local type aliases (mirror story-local types without importing them) ────

type Brand = 'strata' | 'prisma' | 'cortex' | 'unit-42'
type DealStage = 'discovery' | 'solutioning' | 'tech-validation' | 'active-pov' | 'negotiation'
type OppType = 'net-new' | 'upsell' | 'renewal'
type Forecast = 'pipeline' | 'best-case' | 'commit'
type RenewalOutcome = 'unknown' | 'full' | 'upsell' | 'downsell' | 'churn' | 'displacement' | 'duplicate'
type SalesPlayStatus = 'not-touched' | 'pitched' | 'deferred' | 'declined' | 'pursuing' | 'closed-won' | 'closed-lost'
type RiskId = 'exec' | 'design' | 'tech-win' | 'partner' | 'mandatory-ps' | 'quote-approval' | 'budget' | 'term-length' | 'no-activity'

// ─── Lookup maps ─────────────────────────────────────────────────────────────

const STAGE_MAP: Record<string, DealStage> = {
  'discovery':            'discovery',
  'solutioning':          'solutioning',
  'technical-validation': 'tech-validation',
  'active-pov':           'active-pov',
  'negotiate':            'negotiation',
}

const TYPE_MAP: Record<string, OppType> = {
  'net-new':            'net-new',
  'upsell':             'upsell',
  'renewal':            'renewal',
  'renewal-and-upsell': 'renewal',
}

const FORECAST_MAP: Record<string, Forecast> = {
  'pipeline':  'pipeline',
  'best-case': 'best-case',
  'commit':    'commit',
  'closed':    'commit',
}

const RISK_ID_MAP: Record<string, RiskId> = {
  'lacking-exec-engagement':  'exec',
  'no-design-of-record':      'design',
  'no-secured-tech-win':      'tech-win',
  'no-partner-selected':      'partner',
  'mandatory-ps-removed':     'mandatory-ps',
  'quotes-pending-approval':  'quote-approval',
  'budget-not-scheduled':     'budget',
  'term-length-issue':        'term-length',
  'no-activity-30-days':      'no-activity',
}

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

// Maps ProductId → story-local Brand value
const PRODUCT_BRAND: Record<string, Brand> = {
  'pa-series':           'strata',
  'vm-series':           'strata',
  'pa-series-attached':  'prisma',
  'pa-series-support':   'prisma',
  'fw-data-lake':        'strata',
  'prisma-access':       'prisma',
  'prisma-sd-wan':       'prisma',
  'cortex-xdr':          'cortex',
  'cortex-xsoar':        'cortex',
  'xpanse':              'cortex',
  'xsiam':               'cortex',
  'qradar':              'cortex',
  'cortex-cloud-leaf':   'cortex',
  'unit-42-reactive':    'unit-42',
  'unit-42-proactive':   'unit-42',
}

// Demo clock anchor
const DEMO_DATE = new Date('2026-05-14')
const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

// ─── Mapper ──────────────────────────────────────────────────────────────────

export function mapOpportunityToRow(
  opp: Opportunity,
  accounts: Account[],
  salesPlayInstances: SalesPlayInstance[],
  salesPlays: SalesPlay[],
): OpportunityRow {
  // Account lookup
  const account = accounts.find(a => a.id === opp.accountId)

  // Close date
  const closeMs = DEMO_DATE.getTime() + opp.daysToClose * 86_400_000
  const d = new Date(closeMs)
  const closeDate = `${MONTHS[d.getMonth()]} ${d.getDate()}`

  // Products
  const products = opp.productIds.map(productId => {
    const meta = PRODUCTS[productId]
    const name = meta?.name ?? productId
    const brand: Brand = PRODUCT_BRAND[productId] ?? 'strata'
    // Use per-product allocation if available, otherwise split evenly
    const allocation = opp.productAllocations?.find(a => a.productId === productId)
    const valueUsd = allocation?.amountUsd ?? (opp.amount / opp.productIds.length)
    return { name, brand, valueUsd }
  })

  // Activity
  const activityLabel =
    opp.lastActivity.description ??
    ACTIVITY_TYPES[opp.lastActivity.type]?.label ??
    opp.lastActivity.type
  const activity = {
    daysAgo: opp.lastActivity.daysAgo,
    description: activityLabel,
  }

  // Account health
  const health = {
    overall:   (account?.health.overall ?? 'healthy') as 'healthy' | 'at-risk' | 'critical',
    technical: (account?.health.technical ?? 'healthy') as 'healthy' | 'at-risk' | 'critical',
    adoption:  (account?.health.deploymentAdoption ?? 'healthy') as 'healthy' | 'at-risk' | 'critical',
    trend12mo: account?.health.trend12mo ?? [0,0,0,0,0,0,0,0,0,0,0,0],
  }

  // Risks
  const risks = opp.riskIds
    .filter(rid => rid !== 'no-risks')
    .map(rid => {
      const storyId = RISK_ID_MAP[rid]
      if (!storyId) return null
      const lib = RISK_LIBRARY[storyId]
      return { id: storyId, emoji: lib.emoji, label: lib.label }
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)

  // Sales play — find the primary instance for this account
  const instance = salesPlayInstances.find(i => i.accountId === opp.accountId)
  const play = instance ? salesPlays.find(p => p.id === instance.playId) : undefined
  const salesPlay = {
    name:     play?.name ?? 'None',
    status:   (instance?.status ?? 'not-touched') as SalesPlayStatus,
    valueUsd: instance?.amountUsd ?? 0,
  }

  // Renewal
  const renewal = opp.renewal
    ? {
        subEnd:          opp.renewal.subEnd,
        renewableTcvUsd: opp.renewal.renewableTcvUsd,
        arrUsd:          opp.renewal.arrUsd,
        outcome:         (opp.renewalOutcome ?? 'unknown') as RenewalOutcome,
      }
    : undefined

  return {
    id:        opp.id,
    accountId: opp.accountId,
    oppId:     opp.id,
    oppName:   opp.name,
    account:   account?.name ?? opp.accountId,
    type:      (TYPE_MAP[opp.type] ?? 'net-new') as OppType,
    forecast:  (FORECAST_MAP[opp.forecastCategory] ?? 'pipeline') as Forecast,
    stage:     (STAGE_MAP[opp.stageId] ?? 'discovery') as DealStage,
    closeDate,
    quoteId:   opp.quoteId,
    products,
    valueUsd:  opp.amount,
    activity,
    health,
    risks,
    salesPlay,
    renewal,
  }
}
