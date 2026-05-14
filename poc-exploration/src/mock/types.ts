// Mock data types — canonical schema for poc-exploration mockups.
// See .claude/ds-aesthetic-guide/mock-data-architecture.md.

// ─── Closed enums (string-literal unions, used as IDs) ───────────────────────

export type BrandId = 'STRATA' | 'PRISMA' | 'CORTEX' | 'UNIT42';

export type ProductFamilyId =
  | 'firewall' | 'cdss' | 'sase' | 'cortex-cloud' | 'unit-42';

export type ProductId =
  // Firewall
  | 'pa-series' | 'vm-series'
  // CDSS
  | 'pa-series-attached' | 'pa-series-support' | 'fw-data-lake'
  // SASE
  | 'prisma-access' | 'prisma-sd-wan'
  // Cortex & Cloud
  | 'cortex-xdr' | 'cortex-xsoar' | 'xpanse' | 'xsiam' | 'qradar' | 'cortex-cloud-leaf'
  // Unit 42
  | 'unit-42-reactive' | 'unit-42-proactive';

export type SalesPlayFamilyId = 'fw-cdss' | 'sase' | 'cortex-cloud' | 'unit-42';

export type StageId =
  | 'discovery' | 'solutioning' | 'technical-validation' | 'active-pov' | 'negotiate';

export type OpportunityType = 'net-new' | 'upsell' | 'renewal' | 'renewal-and-upsell';

export type ForecastCategory = 'pipeline' | 'best-case' | 'commit' | 'closed';

export type HealthStatus = 'healthy' | 'at-risk' | 'critical';

export type RenewalOutcome =
  | 'unknown' | 'full' | 'upsell' | 'downsell'
  | 'churn' | 'displacement' | 'duplicate';

export type SalesPlayStatusId =
  | 'not-touched' | 'pitched' | 'deferred' | 'declined'
  | 'pursuing' | 'closed-won' | 'closed-lost';

export type OppRiskId =
  | 'no-risks'
  | 'lacking-exec-engagement'
  | 'no-design-of-record'
  | 'no-secured-tech-win'
  | 'no-partner-selected'
  | 'mandatory-ps-removed'
  | 'quotes-pending-approval'
  | 'budget-not-scheduled'
  | 'term-length-issue'
  | 'no-activity-30-days';

export type AccountRiskId =
  | 'no-risks'
  | 'no-pipeline'
  | 'no-ebc'
  | 'not-platformized'
  | 'derailed-povs'
  | 'no-asr'
  | 'no-csp';

export type ActivityType =
  | 'technical-deep-dive'
  | 'architecture-review'
  | 'deployment-health-check'
  | 'renewal-prep-call'
  | 'contract-review'
  | 'partner-strategy-call'
  | 'budget-alignment-meeting'
  | 'poc-scoping-session'
  | 'solution-workshop'
  | 'executive-briefing'
  | 'customer-engagement';

export type Severity = 'ok' | 'caution' | 'error';

// ─── Records ────────────────────────────────────────────────────────────────

export interface InstallBase {
  tcv: number;
  incrementalAcv: number;
  margin: number;
  rpo: number;
}

export interface Account {
  id: string;
  name: string;
  lifetimeValue: number;
  valueLast3Years?: number;
  pipelineCQ: number;
  pipelineByQuarter?: Record<string, number>;
  activePOVs: number;
  ebcsLastYear: number;
  health: {
    overall: HealthStatus;
    technical: HealthStatus;
    deploymentAdoption: HealthStatus;
    valueRealization?: HealthStatus;
    customerEngagement?: HealthStatus;
    /** 12 monthly readings oldest → newest; 0 = healthy, 1 = at-risk, 2 = critical */
    trend12mo?: number[];
  };
  /** Parent account name, or null for standalone accounts. */
  apex?: string | null;
  /** Install-base financials. Absent until Anna's CSV data is ingested. */
  installBase?: InstallBase;
  riskIds: AccountRiskId[];
  platformizations: BrandId[];
  region?: string;
  scenarios: string[];
}

export interface Opportunity {
  id: string;
  accountId: string;
  name: string;
  quoteId: string;
  isPrimaryQuote?: boolean;
  type: OpportunityType;
  amount: number;
  daysToClose: number;
  forecastCategory: ForecastCategory;
  stageId: StageId;
  productIds: ProductId[];
  riskIds: OppRiskId[];
  lastActivity: { type: ActivityType; daysAgo: number };
  salesPlayIds?: string[];
  scenarios: string[];
}

export interface Contact {
  id: string;
  accountId: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  avatarUrl?: string;
}

export interface SalesPlay {
  id: string;
  name: string;
  familyId: SalesPlayFamilyId;
  description?: string;
}

// ─── Taxonomy metadata interfaces ───────────────────────────────────────────

export interface BrandMeta {
  id: BrandId;
  name: string;
  iconName: string;
  brandColor: string;
}

export interface ProductFamilyMeta {
  id: ProductFamilyId;
  name: string;
  brand: BrandId;
  iconName: string;
  brandColor: string;
  salesPlayFamilyId: SalesPlayFamilyId;
}

export interface ProductMeta {
  id: ProductId;
  name: string;
  familyId: ProductFamilyId;
}

export interface SalesPlayFamilyMeta {
  id: SalesPlayFamilyId;
  name: string;
  brandColor: string;
}

export interface StageMeta {
  id: StageId;
  ordinal: 1 | 2 | 3 | 4 | 5;
  name: string;
  longName: string;
}

export interface RiskMeta<TId extends string = string> {
  id: TId;
  emoji: string;
  label: string;
}

export interface ActivityTypeMeta {
  id: ActivityType;
  label: string;
}
