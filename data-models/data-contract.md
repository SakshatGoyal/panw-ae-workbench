# AE Workbench — Data Contract

> **Scope**: Consumption surface for `poc-exploration` only.  
> **Sources read**: `mock/types.ts`, `mock/data/*.ts`, `mock/taxonomies.ts`, `mock/derivations.ts`, `mock/sales-play-modal.ts`, and the four composition stories (`opportunity-table.stories.tsx`, `account-table.stories.tsx`, `AE Account Panel.stories.tsx`, `sales-play-modal.stories.tsx`).  
> **Reference docs skipped**: `data-models/*.md` (stale per brief).  
> **Status**: Read-only discovery — no mock data changed.

---

## A. Entities

### A.1 Account

**Source**: `mock/types.ts` interface `Account`; records in `mock/data/accounts.ts` (13 records).

| Field | TS type | Required | Populated in mock |
|---|---|---|---|
| `id` | `string` | ✅ | All 13 |
| `name` | `string` | ✅ | All 13 |
| `lifetimeValue` | `number` | ✅ | All 13 |
| `valueLast3Years` | `number` | optional | 10 of 13 — missing on `acc-acme`, `acc-prime-dynamics`, `acc-beacon-corp` |
| `pipelineCQ` | `number` | ✅ | All 13 |
| `pipelineByQuarter` | `Record<string, number>` | optional | **0 of 13** — field exists in type, never populated |
| `activePOVs` | `number` | ✅ | All 13 |
| `ebcsLastYear` | `number` | ✅ | All 13 |
| `health.overall` | `HealthStatus` | ✅ | All 13 |
| `health.technical` | `HealthStatus` | ✅ | All 13 |
| `health.deploymentAdoption` | `HealthStatus` | ✅ | All 13 |
| `health.valueRealization` | `HealthStatus` | optional | 3 of 13 — `acc-tyrell`, `acc-cyberdyne`, `acc-orion-shipping` |
| `health.customerEngagement` | `HealthStatus` | optional | 2 of 13 — `acc-tyrell`, `acc-orion-shipping` |
| `riskIds` | `AccountRiskId[]` | ✅ | All 13 |
| `platformizations` | `BrandId[]` | ✅ | All 13 |
| `region` | `string` | optional | All 13 |
| `scenarios` | `string[]` | ✅ | All 13 |

**Fields consumed by compositions but absent from the Account type** (see Section F — Gaps):

| Needed field | Where consumed | Current stub |
|---|---|---|
| `apex: string \| null` | Account Panel header; account-table `AccountRow.apex` | Panel: hardcoded `const APEX_NAME = 'Cyberdyne Industries'`; acc-table: authored per-row string |
| `installBase.tcv` | Panel → Install Base section | Panel: `const INSTALL_BASE` array stub |
| `installBase.incrementalAcv` | Panel → Install Base section | Panel: `const INSTALL_BASE` |
| `installBase.margin` | Panel → Install Base section | Panel: `const INSTALL_BASE` |
| `installBase.rpo` | Panel → Install Base section | Panel: `const INSTALL_BASE` |
| `salesPlayInstances[]` (per-account, with status + amountUsd) | Panel → Sales Play section | Panel: `const ACC_SALES_PLAYS` authored per-account |
| `health.trend12mo: number[]` | acc-table `AccountRow.health.trend12mo`, opp-table `AccountHealth.trend12mo` | Authored per-row in story fixtures; not on mock Account |
| `products[].arrUsd` | acc-table column 4 | Authored per-row in `AccountRow.products[]` |
| `ebc` (discriminated union) | acc-table column 3 | Authored per-row in `AccountRow.ebc` |

---

### A.2 Opportunity

**Source**: `mock/types.ts` interface `Opportunity`; records in `mock/data/opportunities.ts` (15 records).

| Field | TS type | Required | Populated in mock |
|---|---|---|---|
| `id` | `string` | ✅ | All 15 |
| `accountId` | `string` → `Account.id` | ✅ | All 15 |
| `name` | `string` | ✅ | All 15 |
| `quoteId` | `string` | ✅ | All 15 |
| `isPrimaryQuote` | `boolean` | optional | 4 of 15 |
| `type` | `OpportunityType` | ✅ | All 15 |
| `amount` | `number` | ✅ | All 15 |
| `daysToClose` | `number` | ✅ | All 15 |
| `forecastCategory` | `ForecastCategory` | ✅ | All 15 |
| `stageId` | `StageId` | ✅ | All 15 |
| `productIds` | `ProductId[]` | ✅ | All 15 |
| `riskIds` | `OppRiskId[]` | ✅ | All 15 |
| `lastActivity.type` | `ActivityType` | ✅ | All 15 |
| `lastActivity.daysAgo` | `number` | ✅ | All 15 |
| `salesPlayIds` | `string[]` | optional | **0 of 15** — field in type, never populated |
| `scenarios` | `string[]` | ✅ | All 15 |

**Fields consumed by compositions but absent from the Opportunity type**:

| Needed field | Where consumed | Current stub |
|---|---|---|
| `lastActivity.description: string` | opp-table `Activity.description`, acc-table `Activity.description` | Authored per-row as story-local `activity.description`; not derivable from `lastActivity.type` |
| `daysInStage: number` | Panel `OpportunitySnapshot` — "Stage" row (days alongside stage chip) | Panel: `daysInStage: 21` stub on all real opps |
| `daysInForecast: number` | Panel `OpportunitySnapshot` — "Forecast" row | Panel: `daysInForecast: 42` stub on all real opps |
| `renewalOutcome: RenewalOutcome` | Panel Renewal Outcome editor | Panel: `renewalOutcome: 'unknown'` stub on all opps |
| `renewal.subEnd: string` | opp-table RenewalData hover popover | Authored per-row in opp-table story fixture |
| `renewal.renewableTcvUsd: number` | opp-table RenewalData hover popover | Authored per-row in opp-table story fixture |
| `renewal.arrUsd: number` | opp-table RenewalData hover popover | Authored per-row in opp-table story fixture |
| Per-product USD allocation | Panel Products hover popover; opp-table product tag percentage | Panel: evenly splits `amount` / `productIds.length` rounded to $1k; opp-table: authored per-product `valueUsd` |

---

### A.3 Contact

**Source**: `mock/types.ts` interface `Contact`; records in `mock/data/contacts.ts` (8 records).

| Field | TS type | Required | Populated in mock |
|---|---|---|---|
| `id` | `string` | ✅ | All 8 |
| `accountId` | `string` → `Account.id` | ✅ | All 8 |
| `name` | `string` | ✅ | All 8 |
| `title` | `string` | ✅ | All 8 |
| `phone` | `string` | ✅ | All 8 |
| `email` | `string` | ✅ | All 8 |
| `avatarUrl` | `string` | optional | **0 of 8** |

Coverage: contacts exist for `acc-acme` (2), `acc-prime-dynamics` (2), `acc-cyberdyne` (1), `acc-tyrell` (1), `acc-hooli` (1), `acc-frontier` (1). Nine accounts have no contacts in the canonical fixture.

---

### A.4 SalesPlay (catalog entry)

**Source**: `mock/types.ts` interface `SalesPlay`; records in `mock/data/sales-plays.ts` (16 records).

| Field | TS type | Required | Populated in mock |
|---|---|---|---|
| `id` | `string` | ✅ | All 16 |
| `name` | `string` | ✅ | All 16 |
| `familyId` | `SalesPlayFamilyId` | ✅ | All 16 |
| `description` | `string` | optional | **0 of 16** |

This entity is a **catalog** — it defines available plays, not per-account instances. There is no first-class entity that binds a SalesPlay catalog entry to an Account with a status and dollar value. That binding is composition-local (see `AccSalesPlayInstance` in the panel story and `SalesPlayBucket` in acc-table).

---

### A.5 SalesPlayInstance (composition-local, not in mock layer)

This entity is defined per-composition and is currently NOT authored in the mock data layer. It represents one account's relationship to one play.

**Panel story** (`AccSalesPlayInstance`):
```typescript
interface AccSalesPlayInstance {
  name: string           // play name string — not a foreign key to SalesPlay.id
  status: AccSalesPlayStatus
  amountUsd: number
}
```
Grouped into families via `AccSalesPlayFamily { id, name, plays[] }`.

**Account-table story** (`SalesPlayBucket`):
```typescript
interface SalesPlayBucket {
  status: SalesPlayStatus
  usd: number
  plays: { name: string; usd: number }[]
}
```
Groups plays by status bucket rather than by family.

These two representations are structurally different and must be reconciled in the mock layer.

---

### A.6 PlayContact (modal fixture)

**Source**: `mock/sales-play-modal.ts` interface `PlayContact`; 6 records in same file.

This is a **separate, non-overlapping fixture** from `mock/data/contacts.ts`. It lacks `accountId` and `avatarUrl`, and its `id` values (`c-tom`, `c-alice`, etc.) do not share a namespace with canonical contact IDs (`con-1`, `con-2`, etc.).

| Field | TS type | Required | Populated |
|---|---|---|---|
| `id` | `string` | ✅ | All 6 |
| `name` | `string` | ✅ | All 6 |
| `title` | `string` | ✅ | All 6 |
| `phone` | `string` | ✅ | All 6 |
| `email` | `string` | ✅ | All 6 |

---

### A.7 PlayOpportunity (modal fixture)

**Source**: `mock/sales-play-modal.ts` interface `PlayOpportunity`; 5 records in same file.

This is a **modal-specific subset** of opportunity display fields. Its `stage` field is an arbitrary SFDC label string (`'1 - Qualify'`), not the canonical `StageId` enum. Its `id` values (`op-aurora`, etc.) do not overlap with canonical opportunity IDs (`opp-*`).

| Field | TS type | Required | Populated |
|---|---|---|---|
| `id` | `string` | ✅ | All 5 |
| `name` | `string` | ✅ | All 5 |
| `stage` | `string` (free text, not `StageId`) | ✅ | All 5 |
| `amount` | `number` | ✅ | All 5 |
| `closeDate` | `string` (ISO `yyyy-mm-dd`) | ✅ | All 5 |

---

### A.8 SalesPlayEdits (modal edit state)

**Source**: `mock/sales-play-modal.ts` interface `SalesPlayEdits`.

This is the modal's mutable edit state, not a persisted entity. Included because it defines the data the modal writes back on Update.

| Field | TS type | Notes |
|---|---|---|
| `status` | `SalesPlayStatus` (modal's space-delimited union) | Selected status tab |
| `contactIds` | `string[]` | References `PlayContact.id` |
| `opportunityIds` | `string[]` | References `PlayOpportunity.id` |
| `primaryOpportunityId` | `string \| null` | Must be a member of `opportunityIds` |
| `note` | `string` | Free text |
| `methodology` | `string` | Free text; not yet surfaced in UI |

---

## B. Closed Enums

Every value is the literal string ID used in code. Labels live in taxonomies and are NOT the canonical key.

### B.1 BrandId
```
'STRATA' | 'PRISMA' | 'CORTEX' | 'UNIT42'
```
Source: `mock/types.ts`. Used on `Account.platformizations[]`.

### B.2 ProductFamilyId
```
'firewall' | 'cdss' | 'sase' | 'cortex-cloud' | 'unit-42'
```
Source: `mock/types.ts`. Used as grouping in product filter trees and `ProductFamilyMeta.salesPlayFamilyId`.

### B.3 ProductId (17 values)
```
'pa-series' | 'vm-series'                                      // Firewall
'pa-series-attached' | 'pa-series-support' | 'fw-data-lake'   // CDSS
'prisma-access' | 'prisma-sd-wan'                              // SASE
'cortex-xdr' | 'cortex-xsoar' | 'xpanse' | 'xsiam'
  | 'qradar' | 'cortex-cloud-leaf'                            // Cortex & Cloud
'unit-42-reactive' | 'unit-42-proactive'                       // Unit 42
```
Source: `mock/types.ts`. Used on `Opportunity.productIds[]`.

Display names in `mock/taxonomies.ts` PRODUCTS record — e.g. `'cortex-xdr'` → `'Cortex XDR+'`.

### B.4 SalesPlayFamilyId
```
'fw-cdss' | 'sase' | 'cortex-cloud' | 'unit-42'
```
Source: `mock/types.ts`. Used on `SalesPlay.familyId`.

### B.5 StageId
```
'discovery' | 'solutioning' | 'technical-validation' | 'active-pov' | 'negotiate'
```
Source: `mock/types.ts`. Used on `Opportunity.stageId`. Ordinals 1–5 in `STAGES` taxonomy.

⚠️ **Inconsistency**: The modal `PlayOpportunity.stage` is a free-text SFDC label (`'1 - Qualify'`), not a `StageId`. These are different data shapes.

### B.6 OpportunityType
```
'net-new' | 'upsell' | 'renewal' | 'renewal-and-upsell'
```
Source: `mock/types.ts`. Used on `Opportunity.type`. Note: compositions treat `'renewal-and-upsell'` as `'renewal'` for purposes of the Renewal Outcome editor (see `isRenewal = type === 'renewal' || type === 'renewal-and-upsell'`).

### B.7 ForecastCategory
```
'pipeline' | 'best-case' | 'commit' | 'closed'
```
Source: `mock/types.ts`. The story-local filter union in opp-table and acc-table only exposes `'pipeline' | 'best-case' | 'commit'` (3-value); `'closed'` is in the canonical type but never appears in mock data.

### B.8 HealthStatus
```
'healthy' | 'at-risk' | 'critical'
```
Source: `mock/types.ts`. Applies across all 5 account health axes and opp-table's per-row AccountHealth shape.

### B.9 RenewalOutcome (7 values)
```
'unknown' | 'full' | 'upsell' | 'downsell' | 'churn' | 'displacement' | 'duplicate'
```
Source: `mock/types.ts`. Used on story-local `RenewalData.outcome` (opp-table) and `AccOppExtras.renewalOutcome` (panel). Not yet on the canonical `Opportunity` type.

### B.10 SalesPlayStatusId — CANONICAL mock layer (7 values)
```
'not-touched' | 'pitched' | 'interested' | 'open-pipeline'
  | 'closed-won' | 'deferred' | 'closed-lost'
```
Source: `mock/types.ts`. Used only in `mock/taxonomies.ts` SALES_PLAY_STATUSES display map. **Not used by any composition** in production.

### B.11 SalesPlayStatus — story-local (7 values, hyphen-delimited)
```
'not-touched' | 'pitched' | 'deferred' | 'declined'
  | 'pursuing' | 'closed-won' | 'closed-lost'
```
Source: local `type SalesPlayStatus` in `account-table.stories.tsx`, `opportunity-table.stories.tsx`, and `AE Account Panel.stories.tsx`. This is the **enum actually driving UI** in all three compositions. Differs from B.10 — 'interested' and 'open-pipeline' are replaced by 'declined' and 'pursuing'.

### B.12 SalesPlayStatus — modal fixture (7 values, space-delimited)
```
'not touched' | 'pitched' | 'deferred' | 'declined'
  | 'pursuing' | 'closed won' | 'closed lost'
```
Source: `mock/sales-play-modal.ts` exported `SalesPlayStatuses` const array. Same semantic as B.11 but uses spaces instead of hyphens for multi-word values.

⚠️ **Three-way inconsistency** across B.10, B.11, B.12: the canonical mock type (B.10) is out of sync with what the UI renders (B.11/B.12). Phase B must resolve to one enum.

### B.13 OppRiskId (10 values)
```
'no-risks'
'lacking-exec-engagement' | 'no-design-of-record' | 'no-secured-tech-win'
'no-partner-selected' | 'mandatory-ps-removed' | 'quotes-pending-approval'
'budget-not-scheduled' | 'term-length-issue' | 'no-activity-30-days'
```
Source: `mock/types.ts`. Used on `Opportunity.riskIds[]`. `'no-risks'` is a sentinel value and filtered out before risk-count display.

### B.14 AccountRiskId — canonical mock type (9 values)
```
'no-risks'
'no-pipeline-cq-next-4q' | 'no-ebcs-last-year' | 'not-platformized'
'povs-without-progression' | 'no-or-stale-asr' | 'no-customer-success-plan'
'low-adoption-deployment' | 'critical-technical-health'
```
Source: `mock/types.ts`. Comment notes `'low-adoption-deployment'` and `'critical-technical-health'` are "CSV legacy values — reachable via your earlier CSV; kept until SME consolidates."

### B.15 AccountRiskId — acc-table story-local (6 values)
```
'no-pipeline' | 'no-ebc' | 'not-platformized'
  | 'derailed-povs' | 'no-asr' | 'no-csp'
```
Source: local `type AccountRiskId` in `account-table.stories.tsx`. Shorter aliases for 6 of the 9 canonical values. Does NOT include `'low-adoption-deployment'` or `'critical-technical-health'`.

⚠️ **Inconsistency** with B.14: story-local IDs diverge from canonical IDs. Canonical `Account.riskIds` uses the B.14 values; acc-table renders B.15 values in its risk library. The canonical account fixture uses both ('povs-without-progression' appears in all accounts, while acc-table's 'derailed-povs' maps to the same concept).

### B.16 ActivityType (11 values)
```
'technical-deep-dive' | 'architecture-review' | 'deployment-health-check'
'renewal-prep-call' | 'contract-review' | 'partner-strategy-call'
'budget-alignment-meeting' | 'poc-scoping-session' | 'solution-workshop'
'executive-briefing' | 'customer-engagement'
```
Source: `mock/types.ts`. Used on `Opportunity.lastActivity.type`.

### B.17 Severity
```
'ok' | 'caution' | 'error'
```
Source: `mock/types.ts`. Used by `mock/derivations.ts` severity ladders.

---

## C. Foreign Key Relationships

### C.1 Record-to-record FKs

| FK field | Source entity | References | Resolution in code |
|---|---|---|---|
| `Opportunity.accountId` | Opportunity | `Account.id` | `helpers.ts`: `opportunitiesByAccount(accountId)` / `OPPORTUNITIES.filter(o => o.accountId === id)` |
| `Contact.accountId` | Contact | `Account.id` | `helpers.ts`: `contactsByAccount(accountId)` |

### C.2 Record-to-taxonomy FKs

| FK field | Source entity | References |
|---|---|---|
| `Account.riskIds[]` | Account | `AccountRiskId` (taxonomy enum B.14) |
| `Account.platformizations[]` | Account | `BrandId` (taxonomy enum B.1) |
| `Opportunity.stageId` | Opportunity | `StageId` (taxonomy enum B.5); resolve via `STAGES[id]` |
| `Opportunity.forecastCategory` | Opportunity | `ForecastCategory` (taxonomy enum B.7) |
| `Opportunity.productIds[]` | Opportunity | `ProductId` (taxonomy enum B.3); resolve via `PRODUCTS[id]` |
| `Opportunity.riskIds[]` | Opportunity | `OppRiskId` (taxonomy enum B.13) |
| `Opportunity.lastActivity.type` | Opportunity | `ActivityType` (taxonomy enum B.16) |
| `SalesPlay.familyId` | SalesPlay | `SalesPlayFamilyId` (taxonomy enum B.4); resolve via `SALES_PLAY_FAMILIES[id]` |
| `Opportunity.salesPlayIds[]` | Opportunity | `SalesPlay.id` — field exists, never populated |

### C.3 Composition-local identity FKs (not resolved via helper functions)

| Field | Carried by | Purpose |
|---|---|---|
| `OpportunityRow.accountId` | opp-table story row | Identity pointer for routing `ExpandIntent` to the panel; not resolved to Account in the story |
| `OpportunityRow.oppId` | opp-table story row | Identity pointer for routing `ExpandIntent.oppId` to the panel |
| `AccountRow.accountId` | acc-table story row | Identity pointer for panel routing |
| `SalesPlayEdits.contactIds[]` | modal edit state | References `PlayContact.id` (modal-local fixture) |
| `SalesPlayEdits.opportunityIds[]` | modal edit state | References `PlayOpportunity.id` (modal-local fixture) |
| `SalesPlayEdits.primaryOpportunityId` | modal edit state | Subset of `opportunityIds`; must be a member |

---

## D. Derivation Rules

All derivations are implemented in the compositions or `mock/derivations.ts`. None modify mock data.

### D.1 Last-activity severity (opp-table, acc-table)
```
daysAgo < 7   → neutral (no icon)
daysAgo ≤ 21  → orange/caution + ExclamationTriangle icon
daysAgo > 21  → red/error + ExclamationCircle icon
```
Implemented: `activityStyleForDays(daysAgo)` in both stories. Thresholds also in `mock/derivations.ts` `THRESHOLDS.lastActivity = { caution: 7, error: 21 }`.

### D.2 EBC severity (acc-table)
```
ebc.absent === true        → 'danger' (red tag, maps to >365 filter bucket)
days since EBC ≤ 180      → 'neutral'
days since EBC 181–365    → 'caution' (orange)
days since EBC > 365      → 'danger' (red)
```
Implemented: `ebcSeverity(ebc, today)` in acc-table story. Demo clock anchored to `DEMO_TODAY = new Date('2026-05-11T00:00:00Z')`.

### D.3 Risk count severity (derivations.ts)
```
count ≤ 1  → ok
count < 4  → caution
count ≥ 4  → error
```
Source: `mock/derivations.ts` `riskCountSeverity`. Threshold: `THRESHOLDS.riskCount = { caution: 1, error: 4 }`.

### D.4 Days-to-close severity (derivations.ts)
```
daysToClose ≥ 30  → ok
daysToClose ≥ 14  → caution
daysToClose < 14  → error
```
Source: `mock/derivations.ts`. Threshold: `THRESHOLDS.daysToClose = { caution: 30, error: 14 }`.

### D.5 Sales play Not-Touched rollup (panel)
```
Section-level tag = SUM(amountUsd) WHERE status = 'not-touched' ACROSS all families
Family-level tag  = SUM(amountUsd) WHERE status = 'not-touched' WITHIN family
```
Family row tag is OMITTED when the family's Not-Touched total is zero (e.g. Unit 42 row in the Cyberdyne stub has no Not-Touched plays → no rollup tag rendered).

### D.6 Quarter pipeline total (acc-table)
```
totalPipelineUsd = SUM(pipeline[0..3].usd)
hasUpsellPipeline = pipeline.some(q => q.opps.some(o => o.type === 'upsell'))
```
Both fields computed by the fixture IIFE in acc-table; they are derived, not authored.

### D.7 Per-product USD allocation (panel)
When `Opportunity.productIds` carries no per-product dollar breakdown:
```
each = FLOOR(totalAmount / productCount)
rounded = ROUND(each / 1000) * 1000
last_product_value = totalAmount - rounded * (productCount - 1)
```
This is a stub computation — amounts do not reflect actual contract allocations.

### D.8 Closing-quarter label (panel, acc-table)
Anchored to `TODAY = new Date('2026-05-11T12:00:00Z')`. PANW fiscal year = Aug → Jul; May 2026 = Q4FY26 ("CQ").
```
daysToClose ≤ 90   → 'CQ'
daysToClose ≤ 180  → 'Q1FY27'
daysToClose ≤ 270  → 'Q2FY27'
daysToClose > 270  → 'Q3FY27'
```

### D.9 EBC / no-ebc risk consistency (acc-table self-check)
At story initialization, a self-check loops all rows and logs a console warning if:
- `ebcSeverity === 'danger'` and the row lacks `no-ebc` risk, or
- `ebcSeverity !== 'danger'` and the row carries `no-ebc` risk.

This is a validation guard, not a derivation that generates data.

### D.10 Forecast tag color mapping
```
'pipeline'  → 'bronze'  (warm, low saturation — raw/early)
'best-case' → 'teal'    (cool, hopeful)
'commit'    → 'olive'   (settled, earthy)
```
Consistent across opp-table and panel. Same mapping in both `FORECAST_COLOR` and `FORECAST_TAG_COLOR`.

### D.11 Health / Renewal Outcome tag color mapping

Health:
```
'healthy'  → 'green'
'at-risk'  → 'yellow'
'critical' → 'red'
```

Renewal Outcome:
```
'unknown'      → 'grey'
'full'         → 'jade'
'upsell'       → 'jade'
'downsell'     → 'orange'
'churn'        → 'red'
'displacement' → 'grey'
'duplicate'    → 'grey'
```

### D.12 4Q renewal invariant (panel)
Spec §6 requires at least one Renewal-type opportunity within the 4-quarter window to demonstrate the Renewal Outcome editor. When the account's real opps contain no renewals, the panel adds `STUB_CYBERDYNE_RENEWAL` at the composition layer. This is not a derivation from data — it is an authoring invariant the data agent must satisfy per account.

---

## E. Per-Entity Scale Targets

### E.1 Current fixture sizes

| Entity | File | Count | Notes |
|---|---|---|---|
| Account | `mock/data/accounts.ts` | 13 | Variety: 3 healthy, 5 at-risk, 3 critical, 2 healthy-with-high-risks |
| Opportunity | `mock/data/opportunities.ts` | 15 | Variety: all 4 opp types, all 5 stages, all 3 forecast categories |
| Contact | `mock/data/contacts.ts` | 8 | Sparse: covers only 6 of 13 accounts |
| SalesPlay catalog | `mock/data/sales-plays.ts` | 16 | 3 FW/CDSS, 5 SASE, 6 Cortex Cloud, 2 Unit 42 |
| PlayContact (modal) | `mock/sales-play-modal.ts` | 6 | Modal-local, no account binding |
| PlayOpportunity (modal) | `mock/sales-play-modal.ts` | 5 | Modal-local, SFDC stage strings |

### E.2 Story fixture sizes (rendered rows)

| Story | Fixture | Rows | Implied total (summary label) |
|---|---|---|---|
| opp-table | `DEFAULT_ROWS` | 8 | 47 deals, $12.4M ARR (static summary label — not derived from rows) |
| acc-table | `DEFAULT_ROWS` | 10 | 10 accounts shown (no implied larger set) |
| Panel | `acc-cyberdyne` + `ACC_OPPS` | 1 account, 3 opps (2 real + 1 stub renewal) | 1 panel at a time |

### E.3 Required records per account for the demo to land

For each account surfaced in the demo, the following coverage is needed:

- **At least 1 Opportunity** within the 4-quarter window (required to populate the panel Opportunities section and opp-table rows)
- **At least 1 Renewal-type Opportunity** within the 4-quarter window (required for the Renewal Outcome editor in the panel)
- **Per-family SalesPlayInstance data** (4 families × N plays each) with status + amountUsd
- **Install Base financials** (TCV, Incremental ACV, Margin, RPO)
- **apex** name (string or null for standalone accounts; acc-table fixture shows `null` is valid)
- **12-month health trend** array (12 entries, 0/1/2)
- **Per-product ARR breakdown** for the Products column

---

## F. Gaps

The items below are consumed by UI but not present per-record in the mock data. Ordered by surface area.

### F.1 Account apex name *(critical — panel header + acc-table)*

**Gap**: No `apex` field on `Account`. Panel and acc-table both need a string or null.  
**Current stub**: Panel hardcodes `const APEX_NAME = 'Cyberdyne Industries'`. Acc-table authors `apex` as a string/null per row in the story fixture.  
**Required addition**: `apex: string | null` on `Account`. Null = standalone (no parent). All 13 accounts need this. The acc-table fixture uses 9 non-null apex values across its 10 rows.

### F.2 Install Base financials *(critical — panel Install Base section)*

**Gap**: No `installBase` sub-object on `Account`.  
**Current stub**: `const INSTALL_BASE` in panel story: `[{ label: 'TCV', value: '$25.8M' }, { label: 'Incremental ACV', value: '$1.0M', tone: 'success' }, { label: 'Margin', value: '12.50%', tone: 'success' }, { label: 'RPO', value: '$3.0M' }]`.  
**Required addition**: An `installBase: { tcv: number, incrementalAcv: number, margin: number, rpo: number }` sub-object on `Account`. The `tone: 'success'` signal for `incrementalAcv` (positive growth) and `margin` (healthy) is a rendering decision — the field values are plain numbers.

### F.3 Per-account SalesPlayInstance data *(critical — panel Sales Play section + acc-table column 5)*

**Gap**: No per-account SalesPlayInstance entity in the mock layer. `SalesPlay` catalog entries have no `status` or `amountUsd`.  
**Current stub**: Panel: `const ACC_SALES_PLAYS` (4-family struct with `plays[{ name, status, amountUsd }]`). Acc-table: `AccountRow.salesPlays` authored per-row as `SalesPlayBucket[]`.  
**Required addition**: A new `SalesPlayInstance` record type binding `Account.id` × `SalesPlay.id` × `status` × `amountUsd`. The two composition shapes (family-grouped for panel, status-bucketed for acc-table) are both derivable from a flat `[{ accountId, playId, status, amountUsd }]` table.

### F.4 12-month health trend *(critical — acc-table health popover + opp-table health popover)*

**Gap**: No `health.trend12mo` on `Account`.  
**Current stub**: Authored per-row in story-local `AccountRow.health.trend12mo` and `OpportunityRow.health.trend12mo`. Each is a 12-element array (oldest → newest), values 0/1/2 = healthy/at-risk/critical.  
**Required addition**: `health.trend12mo: number[]` (length 12) on `Account`.

### F.5 Opportunity time-in-stage and time-in-forecast *(panel Stage and Forecast rows)*

**Gap**: No `daysInStage` or `daysInForecast` on `Opportunity`.  
**Current stub**: Panel stubs `daysInStage: 21, daysInForecast: 42` on every real opp via `AccOppExtras`.  
**Required addition**: `daysInStage: number` and `daysInForecast: number` on `Opportunity`.

### F.6 Opportunity renewal outcome *(panel Renewal Outcome editor)*

**Gap**: No `renewalOutcome` on `Opportunity`.  
**Current stub**: Panel stubs `renewalOutcome: 'unknown'` via `AccOppExtras` on all opps.  
**Required addition**: `renewalOutcome: RenewalOutcome` on `Opportunity`. Only meaningful when `type === 'renewal' || type === 'renewal-and-upsell'`; safe to default to `'unknown'` for non-renewal types.

### F.7 Opportunity renewal financials *(opp-table Renewal hover popover)*

**Gap**: No `subEnd`, `renewableTcvUsd`, or `arrUsd` on `Opportunity`.  
**Current stub**: opp-table fixture authors `renewal?: { subEnd: string, renewableTcvUsd: number, arrUsd: number, outcome: RenewalOutcome }` per row. Only present on renewal-type rows.  
**Required addition**: Same sub-object on `Opportunity`. Only populated when `type === 'renewal'`.

### F.8 Opportunity last-activity description *(opp-table + acc-table activity sub-cell)*

**Gap**: `Opportunity.lastActivity` has `{ type: ActivityType; daysAgo: number }` but no `description` string.  
**Current stub**: Both stories author `activity.description` per row independently (e.g. `'Pricing review with procurement'`). The description is NOT derivable from `lastActivity.type` — it is free text.  
**Required addition**: `lastActivity.description: string` on `Opportunity`.

### F.9 Per-product USD allocation on Opportunity *(panel Products hover + opp-table product percentage)*

**Gap**: `Opportunity.productIds` is an array with no per-product dollar breakdown.  
**Current stub**: Panel evenly splits `amount` across `productIds.length` (rounded to $1k). Opp-table authors per-product `valueUsd` inline.  
**Required addition**: Either `productAllocations: { productId: ProductId, amountUsd: number }[]` on `Opportunity`, or per-product ARR keyed by `ProductId`. Even split is acceptable for the demo but must be explicit.

### F.10 Account.pipelineByQuarter unpopulated *(structural dead weight)*

**Gap**: `Account.pipelineByQuarter?: Record<string, number>` exists in the `Account` type but is populated on 0 of 13 records. Acc-table derives quarterly pipeline from story-local authored data instead.  
**Note**: This field should either be populated per record (replacing or supplementing the story-local `AccountRow.pipeline` construction) or removed from the type.

### F.11 Opportunity.salesPlayIds never populated

**Gap**: `Opportunity.salesPlayIds?: string[]` exists in the `Opportunity` type but is populated on 0 of 15 records. No composition reads it.  
**Note**: The link between opportunities and sales plays is currently unmodeled. The modal's `SalesPlayEdits.opportunityIds` goes in the other direction (play → opps) and uses a separate fixture.

### F.12 SalesPlayStatus enum three-way inconsistency

**Gap**: Three divergent enums exist for sales-play status (see B.10, B.11, B.12):
- `SalesPlayStatusId` (canonical mock type, `types.ts`): includes `'interested'` and `'open-pipeline'`; does NOT include `'declined'` or `'pursuing'`.
- Story-local `SalesPlayStatus` (all three compositions): includes `'declined'` and `'pursuing'`; does NOT include `'interested'` or `'open-pipeline'`. Hyphen-delimited.
- Modal `SalesPlayStatus` (`sales-play-modal.ts`): same semantic as story-local but space-delimited for multi-word values (`'not touched'`, `'closed won'`, `'closed lost'`).

The UI renders the story-local 7-value set. The canonical mock type is effectively unused by components. The modal's space-delimited variant is incompatible with the hyphen convention used elsewhere.

### F.13 AccountRiskId story-local alias divergence

**Gap**: Acc-table uses a 6-value local `AccountRiskId` with shorter IDs that don't match the 9-value canonical `AccountRiskId` in `types.ts` (see B.14 vs B.15). Two legacy IDs (`'low-adoption-deployment'`, `'critical-technical-health'`) present in canonical Account records are absent from the acc-table risk library, meaning affected accounts would silently render no tag for those risks.

### F.14 Contact coverage sparse

**Gap**: Only 6 of 13 accounts have contacts in `mock/data/contacts.ts`. Specifically: `acc-aurora`, `acc-frontier` (1 contact), `acc-atlas-bank`, `acc-orion-shipping`, `acc-summit`, `acc-northstar`, `acc-aperture`, `acc-beacon-corp` have zero contacts.

The modal's `PlayContact` fixture is a separate 6-record set with no `accountId` binding — it cannot be used to fill contact coverage in the account-scoped surfaces.

### F.15 Contact.avatarUrl never populated

**Gap**: `Contact.avatarUrl?: string` on all 8 records is undefined. No composition currently renders avatars, but the type signals intent.

### F.16 SalesPlay.description never populated

**Gap**: `SalesPlay.description?: string` on all 16 catalog records is undefined.

### F.17 Churn reason and competitor catalogs not in mock layer

**Gap**: The Renewal Outcome churn flow in the panel requires a `CHURN_REASONS` dropdown and a `COMPETITORS` dropdown. These are authored POC-local in the panel story and not in `mock/taxonomies.ts`:

```
CHURN_REASONS: 'dissatisfied' | 'budget' | 'competitive' | 'eol' | 'other'
COMPETITORS: 'crowdstrike' | 'fortinet' | 'sentinelone' | 'cisco' | 'other'
```

### F.18 PlayOpportunity.stage uses free-text SFDC labels, not StageId

**Gap**: `PlayOpportunity.stage` is typed as `string` and populated with `'1 - Qualify'` for all 5 modal fixture records. This is a different representation than the canonical `StageId` enum used on `Opportunity.stageId`. The modal renders the string directly without looking up a display label.

### F.19 Modal PlayContact fixture is disconnected from canonical Contact

**Gap**: `mock/sales-play-modal.ts` defines its own `PlayContact[]` fixture (`c-tom`, `c-alice`, etc.) with no `accountId` binding and IDs in a different namespace from `mock/data/contacts.ts` (`con-1`, `con-2`, etc.). The two cannot be joined. When the modal is wired to real account data, the contact source must be unified.

---

## Appendix: Fixture account coverage matrix

Accounts appearing in each story fixture (used to assess what records Phase B must populate):

| Account | mock/data | opp-table rows | acc-table rows | Panel |
|---|---|---|---|---|
| acc-tyrell | ✅ | row 1 | row 1 | — |
| acc-atlas-bank | ✅ | row 2 | row 2 | — |
| acc-frontier | ✅ | row 3 | — | — |
| acc-orion-shipping | ✅ | row 4 | row 4 | — |
| acc-cyberdyne | ✅ | row 5 | row 5 | **primary** |
| acc-hooli | ✅ | row 6 | row 6 | — |
| acc-summit | ✅ | row 7 | row 7 | — |
| acc-prime-dynamics | ✅ | row 8 | row 10 | — |
| acc-aperture | ✅ | — | row 3 | — |
| acc-northstar | ✅ | — | row 8 | — |
| acc-beacon-corp | ✅ | — | row 9 | — |
| acc-aurora | ✅ | — | — | — |
| acc-acme | ✅ | — | — | — |

Accounts in `mock/data/accounts.ts` but not appearing in any story fixture: `acc-aurora`, `acc-acme`.
