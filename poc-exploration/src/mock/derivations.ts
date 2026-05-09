// Pure derivations: severity ladders, bands, formatting. No record-typed
// arguments — keep these composable and trivially testable. All thresholds
// in THRESHOLDS so tuning is one-edit.

import type { HealthStatus, OppRiskId, Severity } from './types';

export const THRESHOLDS = {
  // last-activity recency, in days. Bigger = worse.
  lastActivity: { caution: 7, error: 21 },
  // days remaining until close. Smaller = more urgent.
  daysToClose:  { caution: 30, error: 14 },
  // count of risk flags on a single record.
  riskCount:    { caution: 1, error: 4 },
  // deal size bands, in dollars.
  dealSize:     { medium: 100_000, large: 500_000, mega: 1_000_000 },
};

// ─── Severity ladders ───────────────────────────────────────────────────────

export const lastActivitySeverity = (daysAgo: number): Severity =>
  daysAgo <= THRESHOLDS.lastActivity.caution ? 'ok' :
  daysAgo <= THRESHOLDS.lastActivity.error    ? 'caution' : 'error';

export const daysToCloseSeverity = (daysToClose: number): Severity =>
  daysToClose >= THRESHOLDS.daysToClose.caution ? 'ok' :
  daysToClose >= THRESHOLDS.daysToClose.error    ? 'caution' : 'error';

export const riskCountSeverity = (count: number): Severity =>
  count <= THRESHOLDS.riskCount.caution ? 'ok' :
  count <  THRESHOLDS.riskCount.error    ? 'caution' : 'error';

// Health is already an enum; this is the cross-system mapping when something
// needs a Severity-shaped value (e.g. a unified "is this row a problem?" flag).
export const healthSeverity = (h: HealthStatus): Severity =>
  h === 'healthy'  ? 'ok' :
  h === 'at-risk'  ? 'caution' : 'error';

// ─── Bands (categorical bucketing of continuous values) ─────────────────────

export type DealSizeBand = 'small' | 'medium' | 'large' | 'mega';

export const dealSizeBand = (amount: number): DealSizeBand =>
  amount < THRESHOLDS.dealSize.medium ? 'small'  :
  amount < THRESHOLDS.dealSize.large  ? 'medium' :
  amount < THRESHOLDS.dealSize.mega   ? 'large'  : 'mega';

export const DEAL_SIZE_BAND_LABELS: Record<DealSizeBand, string> = {
  small:  'under $100K',
  medium: '$100K – $500K',
  large:  '$500K – $1M',
  mega:   'over $1M',
};

// ─── Formatting ─────────────────────────────────────────────────────────────

export const formatCurrency = (n: number, opts: { compact?: boolean } = {}): string => {
  if (opts.compact) {
    if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1_000)     return '$' + (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return '$' + n.toString();
  }
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

export const relativeTimeLabel = (daysAgo: number): string =>
  daysAgo === 0 ? 'today' :
  daysAgo === 1 ? '1 day ago' :
  daysAgo < 30  ? `${daysAgo} days ago` :
  daysAgo < 60  ? '1 month ago' :
                  `${Math.floor(daysAgo / 30)} months ago`;

export const closesInLabel = (daysToClose: number): string =>
  daysToClose === 0 ? 'closing today' :
  daysToClose === 1 ? 'closing tomorrow' :
  daysToClose < 0   ? `${Math.abs(daysToClose)} days overdue` :
                      `closing in ${daysToClose} days`;

// ─── Quick rollups (useful in summaries; pure & cheap) ──────────────────────

export const totalRiskCount = (riskIds: OppRiskId[]): number =>
  riskIds.filter(r => r !== 'no-risks').length;

export const sumAmounts = (amounts: number[]): number =>
  amounts.reduce((a, b) => a + b, 0);
