# Translator Phase — Translation Report

**Date:** 2026-05-14  
**Demo clock anchor:** 2026-05-14 (Q4 FY26 = "CQ")  
**Commits:** Unit 1 (data gen), Unit 2 (fixture FK update), Unit 3 (Panel canonical wiring)

---

## 1. Files Generated — Record Counts

| File | Source CSV(s) | Records | Notes |
|------|--------------|---------|-------|
| `poc-exploration/src/mock/data/accounts.ts` | `accounts.csv` + `health-trend.csv` | 54 accounts | health.trend12mo embedded inline (648 health-trend rows → 12-element array per account) |
| `poc-exploration/src/mock/data/opportunities.ts` | `opportunities.csv` + `opportunity-product-allocations.csv` | 235 opps | productAllocations embedded inline (272 allocation rows merged) |
| `poc-exploration/src/mock/data/contacts.ts` | `contacts.csv` | 151 contacts | avatarUrl empty on all per spec |
| `poc-exploration/src/mock/data/sales-plays.ts` | `sales-plays.csv` | 17 plays | ID prefix changed from `sp-*` to `play-*` |
| `poc-exploration/src/mock/data/sales-play-instances.ts` | `sales-play-instances.csv` | 246 instances | 7 non-canonical columns dropped (see §3) |
| `poc-exploration/src/mock/data/ebcs.ts` | `ebcs.csv` | 71 EBCs | Local `EBC` interface (no canonical type); not yet consumed by any composition |

Generator script: `data-models/gen-mock-data.mjs` (run from repo root: `node data-models/gen-mock-data.mjs`)

---

## 2. FK Mapping Decisions

### health-trend.csv → Account.health.trend12mo
The canonical `Account` type has `health.trend12mo?: number[]`. The CSV contains one row per account per month (12 rows per account, `monthOffset` 0–11). Decision: aggregate into a 12-element array and embed directly in each account record. **No separate export.** The `healthTrend12FromAccount` derivation function in the Panel story reads this embedded array.

### opportunity-product-allocations.csv → Opportunity.productAllocations
The canonical `Opportunity` type has `productAllocations?: ProductAllocation[]`. Decision: aggregate per-opp allocations and embed inline. **No separate export.** The 272 allocation rows collapse into per-opp arrays.

### EBC entity
`types.ts` has no `EBC` type — only `Account.ebcsLastYear: number`. The `ebcs.csv` contains full EBC records (date, topic, attendees). Decision: define a local `EBC` interface in `ebcs.ts` with a flag comment. **Not exported from `mock/index.ts`** since no composition yet consumes it. Add to canonical `types.ts` when the EBC detail surface is built.

### Sales play ID prefix
Old `sales-plays.ts` used `sp-*` IDs. The CSV uses `play-*`. This is a clean break — all mock data was replaced wholesale so no dangling FK references exist.

### DealStage aliases (story-local)
The opportunity-table story uses local type `DealStage` which maps:
- `'negotiation'` → canonical `'negotiate'`
- `'tech-validation'` → canonical `'technical-validation'`

These are story-local string literals; the composition renders them as display labels. No runtime break, but canonical stageId values from `opportunities.ts` use the canonical spelling. The fixture rows in `opportunity-table.stories.tsx` use the story-local spelling.

### RiskId aliases (story-local)
The account-table and opportunity-table stories use short local aliases:
- `'no-activity'` → canonical `'no-activity-30-days'`
- `'tech-win'` → canonical `'no-secured-tech-win'`

Story-local type; no runtime break. Flagged for alignment when RiskId is made canonical in compositions.

---

## 3. CSV Columns That Didn't Map Cleanly

### SalesPlayInstance — 7 columns dropped
| Column | Decision | Reason |
|--------|----------|--------|
| `instanceId` | Dropped | No canonical field |
| `contactIds` | Dropped | No canonical field; contact linkage not surfaced in Panel |
| `opportunityIds` | Dropped | No canonical field |
| `primaryOpportunityId` | Dropped | No canonical field |
| `note` | Dropped | No canonical field |
| `competitor` | **FLAGGED** | High demo value (landmine/displacement narratives) — add to `SalesPlayInstance` type |
| `reason` | **FLAGGED** | High demo value (why play was declined/deferred) — add to `SalesPlayInstance` type |

### forecast-history.csv
File deleted in a parallel session before Unit 1 ran. No canonical type exists for forecast history. Not translated.

### install-base.csv
File deleted in a parallel session before Unit 1 ran. Install base data was already present in `accounts.csv` columns (`installBase_tcv`, `installBase_incrementalAcv`, `installBase_margin`, `installBase_rpo`). No separate translation needed.

### Account.pipelineByQuarter
Field exists in `types.ts` (`pipelineByQuarter?: Record<string, number>`) but no CSV column supplies it. Not populated in generated `accounts.ts`. The panel composition derives pipeline display from opportunity `daysToClose` bucketing instead.

---

## 4. Composition Assumptions That Required Non-Trivial Decisions

### Reddit pipelineCQ discrepancy (account-table Unit 2)
Canonical `acc-reddit-platform` has `pipelineCQ: 0`. However `opp-reddit-platform-fwrenewal` has `daysToClose: 78` (within CQ range) with `best-case` forecast. Decision: **honor canonical account record** — `pipelineCQ=0` is authoritative; the opp's best-case forecast is excluded from committed CQ pipeline per AE judgment. The renewal was placed in Q1 for pipeline display in the fixture row.

### EBC self-consistency for Reddit (account-table Unit 2)
The `ebcSeverity` function in the account-table story marks a row 'danger' when EBC is absent or >365 days old, and requires the `no-ebc` risk to be present for self-consistency. Reddit (`acc-reddit-platform`) has `ebc: { absent: true }` in the fixture, so `mkRisk('no-ebc')` was included in its risk list.

### No SALES_PLAY_INSTANCES for Stripe Treasury or Coinbase (Panel Unit 3)
`acc-stripe-treasury` and `acc-coinbase-exchange` have no rows in `sales-play-instances.csv`. The `buildSalesPlays` fallback fires, logs a console.warn, and returns `DEFAULT_ACCOUNT_PANEL_DATA.salesPlays`. Both scenario 1 and scenario 20 Panel stories show the Sales Play accordion collapsed with no amount badge — expected fallback behavior.

### DealStage 'renewal-and-upsell' missing from story-local OppType
The story-local `OppType` union in `opportunity-table.stories.tsx` does not include `'renewal-and-upsell'`. One canonical opp type uses this value. The fixture rows avoid it; any opp of this type would require a story-local alias or a type extension.

---

## 5. Per-Scenario Playthrough Notes

All three panels verified via Playwright screenshot (2026-05-14).

### Scenario 1 — Stripe Treasury XSOAR Renewal Landmine (`acc-stripe-treasury`)
- Account/Apex renders correctly: "Stripe Treasury Operations" / "Stripe Inc"
- LTV $14M correct (lifetimeValue: 14,200,000)
- Install Base line items canonical: TCV $8.90M, Incremental ACV $180K, Margin 9.40%, RPO $2.20M
- Sales Play: fallback fired (no SALES_PLAY_INSTANCES) — accordion shows FW & CDSS with no amount
- Opportunity table row: XSOAR Renewal, 96 days stale activity, POV-stalled description renders correctly

### Scenario 4 — Lyft Healthy Renewal (`acc-lyft-rideshare`)
- Account/Apex: "Lyft Rideshare Operations" / "Lyft Inc" ✓
- LTV $7.80M ✓
- Install Base canonical: $5.80M TCV, $420K ACV, 14.10% Margin, $1.18M RPO ✓
- Sales Play: canonical instances rendering with $90,000 amount and alert icon ✓
- Only account across the three where SALES_PLAY_INSTANCES exist and render

### Scenario 20 — Coinbase Cortex Cloud Pursuit (`acc-coinbase-exchange`)
- Account/Apex: "Coinbase Exchange Trust" / "Coinbase Inc" ✓
- LTV $5.10M ✓
- Install Base canonical: $3.40M TCV, $320K ACV, 13.80% Margin, $920K RPO ✓
- Sales Play: fallback fired (no SALES_PLAY_INSTANCES) — same as scenario 1

---

## 6. Top 5 Missing / Broken Items (Ranked by Demo Impact)

### P1 — ARR field shows wrong value for all accounts
**Location:** [`AE Account Panel.stories.tsx:1569`](../poc-exploration/src/compositions/AE%20Account%20Panel.stories.tsx)  
**What:** ARR is computed as `data.productHealth.reduce((acc, p) => acc + p.arrUsd, 0)`. Since `productHealth` always falls back to `DEFAULT_ACCOUNT_PANEL_DATA.productHealth` (three hardcoded products summing to $4.38M), every account shows ARR $4.38M regardless of actual ARR.  
**Fix:** The canonical `Account` type has no `arr` field. Either (a) add `arr: number` to `Account` type and CSV, or (b) compute ARR as the sum of `renewal` opp amounts per account from `OPPORTUNITIES`.

### P2 — Install Base header badge is hardcoded ($25.8M for all accounts)
**Location:** [`AE Account Panel.stories.tsx:1593`](../poc-exploration/src/compositions/AE%20Account%20Panel.stories.tsx)  
**What:** `tagLabel="$25.8M"` is hardcoded in the Install Base accordion header. The line items inside are canonical, but the summary badge is not.  
**Fix:** Thread `fmtMoneyShort(panelData.installBase.find(r => r.label === 'TCV')?.value ...)` into the tagLabel prop — or more cleanly, pass the TCV value through `buildPanelDataForAccountId`.

### P3 — Product Health section is not wired to canonical data
**Location:** [`AE Account Panel.stories.tsx`](../poc-exploration/src/compositions/AE%20Account%20Panel.stories.tsx) — `productHealth: DEFAULT_ACCOUNT_PANEL_DATA.productHealth`  
**What:** The Product Health accordion (Prisma Cloud, CDSS, Cortex XSOAR) always shows the same three products with hardcoded ARR, health statuses, and adoption. The canonical `Account` type has `platformizations: string[]` which lists which platform pillars are deployed, but no per-product health breakdown.  
**Fix:** Requires a `productHealth` CSV or a derivation rule mapping `platformizations` to product health status.

### P4 — Sales Play data absent for most canonical accounts
**Location:** [`sales-play-instances.csv`](./mock-data-csv/sales-play-instances.csv)  
**What:** Of the three scenario accounts verified, only Lyft (scenario 4) has SALES_PLAY_INSTANCES. Stripe Treasury (scenario 1) and Coinbase (scenario 20) both fire the fallback warn. The CSV has 246 instance rows across 54 accounts, but coverage is uneven — some key demo accounts have zero instances.  
**Fix:** Audit which hero demo accounts need instances; add rows to CSV and regenerate.

### P5 — Competitor and Reason dropped from SalesPlayInstance
**Location:** [`sales-play-instances.csv`](./mock-data-csv/sales-play-instances.csv), [`sales-play-instances.ts`](../poc-exploration/src/mock/data/sales-play-instances.ts)  
**What:** `competitor` (e.g., "Crowdstrike", "Palo Alto legacy") and `reason` (why a play was declined/deferred) were present in the CSV but have no canonical fields in `SalesPlayInstance`. They carry high demo value for displacement and landmine narratives.  
**Fix:** Add `competitor?: string` and `reason?: string` to the `SalesPlayInstance` type, re-run `gen-mock-data.mjs`, and surface them in the Sales Play modal story.

---

## 7. Verification Checklist

| Check | Result |
|-------|--------|
| `pnpm tsc --noEmit` (poc-exploration) | ✓ Clean — only 5 pre-existing DS package errors |
| opportunity-table Storybook story | ✓ Renders 8 canonical scenario rows |
| account-table Storybook story | ✓ Renders 10 canonical scenario rows |
| AE Account Panel Default story | ✓ Renders Cyberdyne canonical data |
| Panel scenario 1 (Stripe Treasury) | ✓ All canonical fields correct; Sales Play fallback fires |
| Panel scenario 4 (Lyft) | ✓ All canonical fields correct; Sales Play canonical |
| Panel scenario 20 (Coinbase) | ✓ All canonical fields correct; Sales Play fallback fires |
| sales-play-modal story | ✓ Renders (own fixtures, not yet wired to canonical) |
