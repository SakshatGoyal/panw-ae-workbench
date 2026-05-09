// Lookup helpers. Stories should use these instead of indexing into the data
// arrays / taxonomy objects directly — that way internal layout can change
// without touching consumers.

import { ACCOUNTS } from './data/accounts';
import { OPPORTUNITIES } from './data/opportunities';
import { CONTACTS } from './data/contacts';
import { SALES_PLAYS } from './data/sales-plays';
import {
  ACCOUNT_RISKS, ACTIVITY_TYPES, BRANDS, FORECAST_CATEGORY_LABELS,
  HEALTH_LABELS, OPP_RISKS, OPPORTUNITY_TYPE_LABELS, PRODUCTS,
  PRODUCT_FAMILIES, RENEWAL_OUTCOME_LABELS, SALES_PLAY_FAMILIES,
  SALES_PLAY_STATUSES, STAGES,
} from './taxonomies';
import type {
  Account, AccountRiskId, ActivityType, BrandId, Contact,
  ForecastCategory, HealthStatus, Opportunity, OppRiskId,
  OpportunityType, ProductFamilyMeta, ProductId, ProductMeta,
  RenewalOutcome, SalesPlay, SalesPlayFamilyId, SalesPlayFamilyMeta,
  SalesPlayStatusId, StageId, StageMeta,
} from './types';

// ─── Record lookups ─────────────────────────────────────────────────────────

export const accountById = (id: string): Account | undefined =>
  ACCOUNTS.find(a => a.id === id);

export const opportunityById = (id: string): Opportunity | undefined =>
  OPPORTUNITIES.find(o => o.id === id);

export const opportunitiesByAccount = (accountId: string): Opportunity[] =>
  OPPORTUNITIES.filter(o => o.accountId === accountId);

export const contactsByAccount = (accountId: string): Contact[] =>
  CONTACTS.filter(c => c.accountId === accountId);

export const salesPlayById = (id: string): SalesPlay | undefined =>
  SALES_PLAYS.find(sp => sp.id === id);

export const salesPlaysByFamily = (familyId: SalesPlayFamilyId): SalesPlay[] =>
  SALES_PLAYS.filter(sp => sp.familyId === familyId);

// ─── Taxonomy lookups ───────────────────────────────────────────────────────

export const productById = (id: ProductId): ProductMeta => PRODUCTS[id];

export const productFamilyOf = (id: ProductId): ProductFamilyMeta =>
  PRODUCT_FAMILIES[PRODUCTS[id].familyId];

export const brandOf = (id: ProductId): BrandId =>
  PRODUCT_FAMILIES[PRODUCTS[id].familyId].brand;

export const stageOrdinal = (id: StageId): number => STAGES[id].ordinal;

export const stageOf = (id: StageId): StageMeta => STAGES[id];

export const salesPlayFamilyOf = (id: SalesPlayFamilyId): SalesPlayFamilyMeta =>
  SALES_PLAY_FAMILIES[id];

// ─── Label resolvers (use sparingly — prefer typed taxonomy meta) ───────────

export const labelForOpportunityType = (t: OpportunityType): string =>
  OPPORTUNITY_TYPE_LABELS[t];

export const labelForForecast = (f: ForecastCategory): string =>
  FORECAST_CATEGORY_LABELS[f];

export const labelForHealth = (h: HealthStatus): string => HEALTH_LABELS[h];

export const labelForRenewalOutcome = (r: RenewalOutcome): string =>
  RENEWAL_OUTCOME_LABELS[r];

export const labelForSalesPlayStatus = (s: SalesPlayStatusId): string =>
  SALES_PLAY_STATUSES[s].label;

export const labelForActivity = (a: ActivityType): string =>
  ACTIVITY_TYPES[a].label;

export const oppRiskMeta = (id: OppRiskId) => OPP_RISKS[id];
export const accountRiskMeta = (id: AccountRiskId) => ACCOUNT_RISKS[id];
export const brandMeta = (id: BrandId) => BRANDS[id];

// ─── Scenario filtering ─────────────────────────────────────────────────────

export const accountsInScenario = (scenario: string): Account[] =>
  ACCOUNTS.filter(a => a.scenarios.includes(scenario));

export const opportunitiesInScenario = (scenario: string): Opportunity[] =>
  OPPORTUNITIES.filter(o => o.scenarios.includes(scenario));

// All known scenarios across both account and opportunity records.
export const KNOWN_SCENARIOS = (): string[] =>
  Array.from(new Set([
    ...ACCOUNTS.flatMap(a => a.scenarios),
    ...OPPORTUNITIES.flatMap(o => o.scenarios),
  ])).sort();
