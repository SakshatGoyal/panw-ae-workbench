// Mock taxonomies — closed enums + their display assets (icons, brand colors,
// parent relationships). One source of truth for "what does this id mean and
// what does it look like?" Components ask via helpers.ts; never hardcode.

import type {
  ActivityType, ActivityTypeMeta,
  AccountRiskId,
  BrandId, BrandMeta,
  ForecastCategory, HealthStatus,
  OppRiskId,
  OpportunityType,
  ProductFamilyId, ProductFamilyMeta,
  ProductId, ProductMeta,
  RenewalOutcome,
  RiskMeta,
  SalesPlayFamilyId, SalesPlayFamilyMeta,
  SalesPlayStatusId,
  StageId, StageMeta,
} from './types';

// ─── Brands (Platformizations) ──────────────────────────────────────────────
// Marketing-level rollup. Matches the CSV's `Platformizations` column.

export const BRANDS: Record<BrandId, BrandMeta> = {
  STRATA: { id: 'STRATA', name: 'Strata', iconName: 'strata', brandColor: '#FA582D' }, // PANW Orange
  PRISMA: { id: 'PRISMA', name: 'Prisma', iconName: 'prisma', brandColor: '#00C0E8' }, // Prisma Blue
  CORTEX: { id: 'CORTEX', name: 'Cortex', iconName: 'cortex', brandColor: '#00CC66' }, // Cortex Green
  UNIT42: { id: 'UNIT42', name: 'Unit 42', iconName: 'unit-42', brandColor: '#FFCB06' }, // Unit 42 Yellow
};

// ─── Product taxonomy (5 families × 17 leaf products) ───────────────────────

export const PRODUCT_FAMILIES: Record<ProductFamilyId, ProductFamilyMeta> = {
  'firewall':     { id: 'firewall',     name: 'Firewall',       brand: 'STRATA', iconName: 'strata-firewall', brandColor: '#FA582D', salesPlayFamilyId: 'fw-cdss' },
  'cdss':         { id: 'cdss',         name: 'CDSS',           brand: 'STRATA', iconName: 'strata-cdss',     brandColor: '#FA582D', salesPlayFamilyId: 'fw-cdss' },
  'sase':         { id: 'sase',         name: 'SASE',           brand: 'PRISMA', iconName: 'prisma',          brandColor: '#00C0E8', salesPlayFamilyId: 'sase' },
  'cortex-cloud': { id: 'cortex-cloud', name: 'Cortex & Cloud', brand: 'CORTEX', iconName: 'cortex',          brandColor: '#00CC66', salesPlayFamilyId: 'cortex-cloud' },
  'unit-42':      { id: 'unit-42',      name: 'Unit 42',        brand: 'UNIT42', iconName: 'unit-42',         brandColor: '#FFCB06', salesPlayFamilyId: 'unit-42' },
};

export const PRODUCTS: Record<ProductId, ProductMeta> = {
  'pa-series':           { id: 'pa-series',           name: 'PA Series',           familyId: 'firewall' },
  'vm-series':           { id: 'vm-series',           name: 'VM Series',           familyId: 'firewall' },
  'pa-series-attached':  { id: 'pa-series-attached',  name: 'PA Series Attached',  familyId: 'cdss' },
  'pa-series-support':   { id: 'pa-series-support',   name: 'PA Series Support',   familyId: 'cdss' },
  'fw-data-lake':        { id: 'fw-data-lake',        name: 'FW Data Lake',        familyId: 'cdss' },
  'prisma-access':       { id: 'prisma-access',       name: 'Prisma Access',       familyId: 'sase' },
  'prisma-sd-wan':       { id: 'prisma-sd-wan',       name: 'Prisma SD-WAN',       familyId: 'sase' },
  'cortex-xdr':          { id: 'cortex-xdr',          name: 'Cortex XDR+',         familyId: 'cortex-cloud' },
  'cortex-xsoar':        { id: 'cortex-xsoar',        name: 'Cortex XSOAR',        familyId: 'cortex-cloud' },
  'xpanse':              { id: 'xpanse',              name: 'Xpanse',              familyId: 'cortex-cloud' },
  'xsiam':               { id: 'xsiam',               name: 'XSIAM',               familyId: 'cortex-cloud' },
  'qradar':              { id: 'qradar',              name: 'QRadar',              familyId: 'cortex-cloud' },
  'cortex-cloud-leaf':   { id: 'cortex-cloud-leaf',   name: 'Cortex & Cloud',      familyId: 'cortex-cloud' },
  'unit-42-reactive':    { id: 'unit-42-reactive',    name: 'Reactive',            familyId: 'unit-42' },
  'unit-42-proactive':   { id: 'unit-42-proactive',   name: 'Proactive',           familyId: 'unit-42' },
};

// ─── Sales Play Family taxonomy (4 GTM groupings — distinct from Product) ───

export const SALES_PLAY_FAMILIES: Record<SalesPlayFamilyId, SalesPlayFamilyMeta> = {
  'fw-cdss':      { id: 'fw-cdss',      name: 'FW & CDSS',                                       brandColor: '#FA582D' },
  'sase':         { id: 'sase',         name: 'SASE (Prisma ACCESS, SD-WAN, ZTNA)',              brandColor: '#FFCB06' },
  'cortex-cloud': { id: 'cortex-cloud', name: 'Cortex Cloud (Specialist-led advanced security GTM)', brandColor: '#00C0E8' },
  'unit-42':      { id: 'unit-42',      name: 'Unit 42',                                         brandColor: '#00CC66' },
};

// ─── Opportunity stages (5 named stages, SME-confirmed anchors) ─────────────
// `solutioning` is provisional pending SME confirmation of stage 2's real name.

export const STAGES: Record<StageId, StageMeta> = {
  'discovery':            { id: 'discovery',            ordinal: 1, name: 'Discovery',            longName: 'Stage 1 — Discovery' },
  'solutioning':          { id: 'solutioning',          ordinal: 2, name: 'Solutioning',          longName: 'Stage 2 — Solutioning' },
  'technical-validation': { id: 'technical-validation', ordinal: 3, name: 'Technical Validation', longName: 'Stage 3 — Technical Validation' },
  'active-pov':           { id: 'active-pov',           ordinal: 4, name: 'Active POV',           longName: 'Stage 4 — Active POV' },
  'negotiate':            { id: 'negotiate',            ordinal: 5, name: 'Negotiate',            longName: 'Stage 5 — Negotiate' },
};

// ─── Forecast Category, Opportunity Type, Renewal Outcome ───────────────────

export const FORECAST_CATEGORY_LABELS: Record<ForecastCategory, string> = {
  'pipeline':  'Pipeline',
  'best-case': 'Best Case',
  'commit':    'Commit',
  'closed':    'Closed',
};

export const OPPORTUNITY_TYPE_LABELS: Record<OpportunityType, string> = {
  'net-new':             'Net New',
  'upsell':              'Upsell',
  'renewal':             'Renewal',
  'renewal-and-upsell':  'Renewal and Upsell',
};

export const RENEWAL_OUTCOME_LABELS: Record<RenewalOutcome, string> = {
  'unknown':      'Unknown',
  'full':         'Full Renewal',
  'upsell':       'Upsell',
  'downsell':     'Downsell',
  'churn':        'Churn',
  'displacement': 'Displacement',
  'duplicate':    'Duplicate',
};

// ─── Health (3-value enum, applies across 5 axes) ───────────────────────────

export const HEALTH_LABELS: Record<HealthStatus, string> = {
  'healthy':  'Healthy',
  'at-risk':  'At-Risk',
  'critical': 'Critical',
};

// ─── Sales Play Status pill (7 categories) ──────────────────────────────────

export const SALES_PLAY_STATUSES: Record<SalesPlayStatusId, { label: string; iconName: string }> = {
  'not-touched':  { label: 'Not Touched',  iconName: 'alert-circle' },
  'pitched':      { label: 'Pitched',      iconName: 'headphones' },
  'deferred':     { label: 'Deferred',     iconName: 'calendar' },
  'declined':     { label: 'Declined',     iconName: 'minus-circle' },
  'pursuing':     { label: 'Pursuing',     iconName: 'chess-knight' },
  'closed-won':   { label: 'Closed Won',   iconName: 'check-circle' },
  'closed-lost':  { label: 'Closed Lost',  iconName: 'x-circle' },
};

// ─── Risk taxonomies (deal-level + account-level) ───────────────────────────
// Emoji prefixes preserved from your CSV — they're effective visual signifiers.

export const OPP_RISKS: Record<OppRiskId, RiskMeta<OppRiskId>> = {
  'no-risks':                { id: 'no-risks',                emoji: '✅', label: 'No Risks' },
  'lacking-exec-engagement': { id: 'lacking-exec-engagement', emoji: '🎙️', label: 'Lacking exec engagement or support' },
  'no-design-of-record':     { id: 'no-design-of-record',     emoji: '📐', label: 'No design-of-record' },
  'no-secured-tech-win':     { id: 'no-secured-tech-win',     emoji: '🏅', label: 'No Secured technical win' },
  'no-partner-selected':     { id: 'no-partner-selected',     emoji: '🤝', label: 'No Partner selected or finalized' },
  'mandatory-ps-removed':    { id: 'mandatory-ps-removed',    emoji: '🧑‍💻', label: 'Mandatory PS was removed' },
  'quotes-pending-approval': { id: 'quotes-pending-approval', emoji: '⌛', label: 'Quotes pending approval' },
  'budget-not-scheduled':    { id: 'budget-not-scheduled',    emoji: '💲', label: 'Budget conversation not scheduled or complete' },
  'term-length-issue':       { id: 'term-length-issue',       emoji: '🔁', label: 'Term length issue or non-standard financing' },
  'no-activity-30-days':     { id: 'no-activity-30-days',     emoji: '💤', label: 'No activity for last 30 days' },
};

export const ACCOUNT_RISKS: Record<AccountRiskId, RiskMeta<AccountRiskId>> = {
  'no-risks':         { id: 'no-risks',         emoji: '✅', label: 'No Risks' },
  'no-pipeline':      { id: 'no-pipeline',      emoji: '📭', label: 'No Pipeline in CQ + Next 4Q' },
  'no-ebc':           { id: 'no-ebc',           emoji: '🏛️', label: 'No EBCs in last year' },
  'not-platformized': { id: 'not-platformized', emoji: '🏗️', label: 'Not Platformized' },
  'derailed-povs':    { id: 'derailed-povs',    emoji: '🧪', label: 'POVs without progression' },
  'no-asr':           { id: 'no-asr',           emoji: '🌀', label: 'No ASR / Stale ASR' },
  'no-csp':           { id: 'no-csp',           emoji: '🚧', label: 'No customer success plan' },
};

// ─── Activity types (drives lastActivity.type in opportunities) ─────────────

export const ACTIVITY_TYPES: Record<ActivityType, ActivityTypeMeta> = {
  'technical-deep-dive':      { id: 'technical-deep-dive',      label: 'Technical Deep-Dive' },
  'architecture-review':      { id: 'architecture-review',      label: 'Architecture Review' },
  'deployment-health-check':  { id: 'deployment-health-check',  label: 'Deployment Health Check' },
  'renewal-prep-call':        { id: 'renewal-prep-call',        label: 'Renewal Prep Call' },
  'contract-review':          { id: 'contract-review',          label: 'Contract Review' },
  'partner-strategy-call':    { id: 'partner-strategy-call',    label: 'Partner Strategy Call' },
  'budget-alignment-meeting': { id: 'budget-alignment-meeting', label: 'Budget Alignment Meeting' },
  'poc-scoping-session':      { id: 'poc-scoping-session',      label: 'POC Scoping Session' },
  'solution-workshop':        { id: 'solution-workshop',        label: 'Solution Workshop' },
  'executive-briefing':       { id: 'executive-briefing',       label: 'Executive Briefing' },
  'customer-engagement':      { id: 'customer-engagement',      label: 'Customer Engagement' },
};
