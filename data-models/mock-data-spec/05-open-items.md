# Mock Data Spec — Open items

Items genuinely needing human input or downstream reconciliation. The data agent should NOT silently work around any of these — flag instead.

Items resolved during this spec's split are listed in the report at the bottom for traceability.

---

## Still open

### Sales-play status enum has three forks in the codebase
The canonical author-against list (`01-taxonomies.md` § Sales play status) is the scaffold's `SalesPlayStatusId`: `not-touched | pitched | interested | open-pipeline | closed-won | deferred | closed-lost`. Two other forks ship in components today:
- **Sales Play Modal** uses space-case: `not touched | pitched | deferred | declined | pursuing | closed won | closed lost`.
- **Account Panel and Account Table** use kebab-case with `declined | pursuing` instead of `interested | open-pipeline`.

`declined` and `pursuing` exist only in the panel/modal forks; `interested` and `open-pipeline` exist only in the scaffold fork. Neither maps cleanly onto the other. Reconciliation is data-spec work the data agent does NOT do; author against the scaffold canonical and let the UI bridge.

### Won vs lost on closed opportunities
Scaffold has no field on `Opportunity` to distinguish `closed-won` from `closed-lost`. `forecastCategory = 'closed'` only says "closed." The `stage` enum has no terminal value either. Two possible bridges (decision needed):

1. Add a `closedOutcome: 'won' | 'lost' | null` column.
2. Treat `SalesPlayInstance.status = closed-won` / `closed-lost` as the source of truth and derive on the opp via primary-opp linkage.

Until decided, author closed opps with `forecastCategory = 'closed'` and leave the won/lost distinction implicit — note in `scenarios` if a scenario depends on it.

### Plan Summary `Total Forecast` judgment-slice formula
`Total Forecast = (Total - In) + judgment-slice`, where the judgment slice is "a fraction of Total Pipeline drawn by a finance rule." The exact rule is not specified anywhere in the design or scaffold layer. Author `totalForecast` as a value between `Total - In` and `Total - In + Total Pipeline`, biased toward the lower end, matching the published example (~95% of pipeline added). Finance-team confirmation required before this becomes deterministic.

### Plan Summary scope keys beyond `all`
For POC v1, only `ForecastHistoryPoint` rows with `scopeKey = all` are authored. Scoped rows (`segment:strategic`, `region:americas`, `product:cortex`, etc.) will be needed when Plan Summary filters get wired in a later pass.

### Apex relationship modeling
Currently denormalized as `Account.apexName` string. If multiple child accounts share an apex, the Account Table apex popover aggregates across them. Decision needed: add an `ApexAccount` entity with proper FK, or keep the denormalized string and aggregate by string-match.

### Sales Play Modal contact IDs
The modal's seed fixture uses local IDs like `c-tom` that do not match the global `Contact.id` scheme. Decision needed: align the modal's fixture with the global Contact table (preferred) or keep it independent.

### Additional churn reasons or competitors
The reference lists in `04-scale-and-reference.md` are closed. If a scenario requires a value outside those lists, extend the list and surface here — do not author free-text into the gated column.

### `competitor-active` popover vs canonical account-risk IDs
The plan-summary / account-panel ref docs mention a `competitor-active` popover, but the canonical account-risk enum (`01-taxonomies.md`) has no matching ID — closest is the absence of `not-platformized` plus an authored note. Decision needed: add `competitor-active` to the `AccountRiskId` enum, or render the popover from `displacementCompetitor` on the renewal opp.

### `last3YearsValue` vs scaffold's `valueLast3Years`
Spec keeps `last3YearsValue` (per the original spec's wording); scaffold types use `valueLast3Years`. Different camelCase order, same semantics. CSV authoring should use whichever name the wiring pass picks. No action required from the data agent — flagged for the wiring pass.

---

## Spec-vs-scaffold contradictions found during verification

Surfaced for the wiring pass; do not block CSV authoring against the spec's contract.

| Spec field/enum | Scaffold form | Effect |
|---|---|---|
| Stage enum: 7-value with `closed-won` / `closed-lost` | 5-value `StageId` only; closed state lives on `forecastCategory` | Spec was wrong — `01-taxonomies.md` § Opportunity stage now lists scaffold's 5. |
| `OpportunityType` 3-value | 4-value (`renewal-and-upsell` retained) | Spec was wrong — `01-taxonomies.md` § Opportunity type now lists scaffold's 4. |
| Account risks: 6 canonical | 8 canonical | Spec was wrong — `01-taxonomies.md` § Account risk factors now lists scaffold's 8. The Account Table renders a 6-id subset deliberately. |
| Opp risks: 9 with custom spellings | 9 with scaffold spellings (`lacking-exec-engagement`, `no-design-of-record`, …) | Spec spellings replaced with scaffold's. |
| Products: 15 with names like `cn-series`, `prisma-cloud`, `xdr` | 15 scaffold IDs (`pa-series-attached`, `cortex-xdr`, `cortex-cloud-leaf`, …) | Spec IDs replaced with scaffold's. |
| Activity types: 12 generic IDs | 11 specific scaffold IDs | Spec list replaced. |
| `Severity` worst bucket: `danger` | `error` | Renamed throughout. |
| `Account.last3YearsValue` | `Account.valueLast3Years` | Naming contradiction flagged above; not resolved. |
| `Opportunity.daysInStage`, `daysInForecast`, `productAllocations`, `closeDate`, `renewalOutcome` | Not on scaffold `Opportunity`; Account Panel uses a local `AccOpp` extension | Spec keeps these as the CSV contract; wiring pass will need to bridge to the scaffold model. |
| `Contact.accountId`, `EBC`, `InstallBaseRecord`, `HealthTrendPoint`, `ForecastHistoryPoint`, `SalesPlayInstance` | Not on scaffold | Same — the spec is the CSV contract; scaffold holds an interim hardcoded subset. |

These are **not** fields/entities the data agent invents — they were already in the spec, and stay there. The contradictions are flagged so the wiring pass can reconcile.

---

## Resolved during this split (for traceability)

The original spec carried items §9.1–§9.10. The split + verification resolved the following:

| Original | Status | Resolution |
|---|---|---|
| §9.1 Stage canonical | **Resolved** | Replaced spec's 7-value recommendation with scaffold's 5-value `StageId`. Closed state lives on `forecastCategory`, not on stage. See `01-taxonomies.md` § Opportunity stage. |
| §9.2 Sales-play status spelling | **Open** (above) | Verified the three forks exist. Canonical author-against list is the scaffold's `SalesPlayStatusId`; UI reconciliation is separate work. |
| §9.3 Account-risk IDs | **Resolved** | Replaced spec's 6-id recommendation with scaffold's 8 IDs. See `01-taxonomies.md` § Account risk factors. |
| §9.4 Opp-risk IDs | **Resolved** | Replaced spec's spellings with scaffold's. See `01-taxonomies.md` § Opportunity risk factors. |
| §9.5 Products | **Resolved** | Replaced spec's 15-product reconstruction with scaffold's 15 IDs, family memberships, and brand mapping. See `01-taxonomies.md` § Products. |
| §9.6 Plan Summary scope keys | **Open** (above) | POC v1 uses `scopeKey = all` only; scoped rows come with filter wiring. |
| §9.7 `totalForecast` formula | **Partially resolved** | Total - In is the simple sum. Total Forecast = Total - In + judgment-slice; judgment-slice formula remains unspecified (finance rule). See `03-derivations-and-invariants.md` § Plan Summary totals. |
| §9.8 Apex modeling | **Open** (above) | Decision needed. |
| §9.9 Modal contact IDs | **Open** (above) | Decision needed. |
| §9.10 Extra churn / competitors | **Open** (above) | Closed lists; extend via this file if a scenario needs more. |
