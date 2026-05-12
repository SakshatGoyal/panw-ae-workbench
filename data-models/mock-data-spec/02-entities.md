# Mock Data Spec — Entity schemas

Columns marked **R** are required. Columns marked **O** are optional. Columns marked **C** are conditional — required only when the gating column has a specified value. Types are nominal.

Each entity ends with a worked example (YAML form). The example caption names the scenario the row represents; it is illustrative, not normative.

---

## Account

| Column                  | Type                                  | R/O | Notes |
|-------------------------|---------------------------------------|-----|-------|
| `id`                    | string (kebab, prefix `acc-`)         | R   | Primary key |
| `name`                  | string                                | R   | Fictional company name (see `04-scale-and-reference.md`) |
| `industry`              | string                                | R   | Free-form (e.g. "Financial Services") |
| `segment`               | `strategic` \| `enterprise` \| `mid-market` | R | |
| `region`                | `americas` \| `emea` \| `apac` \| `japan` | R | |
| `apexName`              | string                                | O   | Denormalized parent / apex relationship label |
| `lifetimeValue`         | number (USD)                          | R   | See *Field semantics* below |
| `last3YearsValue`       | number (USD)                          | R   | See *Field semantics* below |
| `cqPipeline`            | number (USD)                          | R   | Sum of open-pipeline opps closing in CQ. Must equal the derived sum (see Hard invariants) |
| `attainmentPct`         | number (0–150)                        | R   | CQ attainment to plan, percent. Severity per derivation rules. |
| `activePOVs`            | integer                               | R   | Count |
| `ebcsLastYear`          | integer                               | R   | Count over past 12 months. Must equal the count of EBC rows for this account with `date >= TODAY - 365` |
| `overallHealth`         | health enum (`01-taxonomies.md`)      | R   | Must equal `max(rank)` of technical + adoption per derivation rules |
| `technicalHealth`       | health enum                           | R   | |
| `adoptionHealth`        | health enum                           | R   | |
| `lastActivityType`      | activity enum                         | R   | |
| `lastActivityDaysAgo`   | integer (≥ 0)                         | R   | Days from TODAY |
| `riskIds`               | list<account-risk-id>                 | O   | Empty list allowed. Use IDs from `01-taxonomies.md` § Account risk factors |
| `scenarios`             | list<string>                          | O   | Free-form tags (e.g. `default`, `apex-demo`, `at-risk-renewal`) |

Account-level rollups (`cqPipeline`, `attainmentPct`, `ebcsLastYear`) MAY be authored on the row for fast component reads, but MUST be internally consistent with the rows that feed them. The data agent is responsible for keeping them aligned.

### Field semantics

- **`lifetimeValue` vs `last3YearsValue`** — Lifetime is the cumulative booked-revenue total since the account became a customer (years to decades). 3-year is the rolling 36-month-trailing booked total. Lifetime is the "how big has this customer ever been" number; 3-year is the "are they spending recently" number. Lifetime is monotone non-decreasing; 3-year can drop as old bookings age out. `last3YearsValue ≤ lifetimeValue` always. (Scaffold names this field `valueLast3Years`; the spec keeps `last3YearsValue` — see `05-open-items.md` for the naming contradiction.)

### Worked example — *strategic account, mixed health, active platformization play*

```yaml
id: acc-cyberdyne
name: Cyberdyne Systems
industry: Industrial & Robotics
segment: strategic
region: americas
apexName: Skynet Holdings
lifetimeValue: 203059523
last3YearsValue: 113358539
cqPipeline: 9420798
attainmentPct: 88
activePOVs: 4
ebcsLastYear: 5
overallHealth: critical     # derived: max(critical, at-risk) = critical
technicalHealth: critical
adoptionHealth: at-risk
lastActivityType: customer-engagement
lastActivityDaysAgo: 5
riskIds: [povs-without-progression, low-adoption-deployment, no-or-stale-asr, critical-technical-health]
scenarios: [default, scenario-1]
```

---

## Opportunity

| Column                   | Type                                  | R/O | Notes |
|--------------------------|---------------------------------------|-----|-------|
| `id`                     | string (prefix `opp-`)                | R   | |
| `accountId`              | FK → Account.id                       | R   | |
| `name`                   | string                                | R   | Suggested: `<Account> – <Product/Brand> – <Use case>` |
| `activeQuoteId`          | string (e.g. `Q-00123`)               | O   | |
| `amount`                 | number (USD)                          | R   | |
| `type`                   | opp-type enum                         | R   | `01-taxonomies.md` § Opportunity type |
| `stage`                  | stage enum                            | R   | `01-taxonomies.md` § Opportunity stage |
| `forecastCategory`       | forecast enum                         | R   | |
| `closeDate`              | ISO date                              | R   | Drives quarter bucketing |
| `daysToClose`            | integer                               | O   | If authored, must equal `closeDate − TODAY` in days |
| `daysInStage`            | integer (≥ 0)                         | R   | See *Field semantics* below |
| `daysInForecast`         | integer (≥ 0)                         | O   | See *Field semantics* below |
| `productAllocations`     | list<{productId, amount}>             | R   | Sum of amounts must equal `Opportunity.amount` |
| `riskIds`                | list<opp-risk-id>                     | O   | |
| `lastActivityType`       | activity enum                         | R   | |
| `lastActivityDaysAgo`    | integer                               | R   | |
| `renewalOutcome`         | renewal-outcome enum                  | C   | Required iff `type = renewal` (or `renewal-and-upsell`); null otherwise |
| `churnReason`            | string (from reference list)          | C   | Required iff `renewalOutcome = churn` |
| `displacementCompetitor` | string (from reference list)          | C   | Required iff `renewalOutcome = displacement` |
| `scenarios`              | list<string>                          | O   | |

`productAllocations` can be a flat side table (one row per (oppId × productId)) or a JSON-encoded column on the Opportunity row — author's call. The sum-equals-amount invariant must hold either way.

### Field semantics

- **`daysInStage`** — Calendar days since the opportunity entered its current `stage`. Resets to 0 when stage changes (forward or backward).
- **`daysInForecast`** — Calendar days since the opportunity entered its current `forecastCategory`. Resets to 0 when forecastCategory changes. **Independent of `daysInStage`** — a deal can be in stage 1 for 5 days but have been `commit` for 60 days if it was downgraded from `commit` to `best-case` and re-upgraded; or it can be a long-tenured `pipeline` deal sitting at stage 1 since inception. Severity from `daysInForecast` (slow-moving forecast) is a different signal from severity from `daysInStage` (slow-moving deal mechanics).

### Worked example — *mid-stage renewal at risk, multi-product allocation*

```yaml
id: opp-cyberdyne-sentinel-renewal
accountId: acc-cyberdyne
name: Cyberdyne Systems – Cortex XDR – SentinelOne Replacement Renewal
activeQuoteId: Q-100874
amount: 750000
type: renewal
stage: negotiate
forecastCategory: best-case
closeDate: 2026-06-18         # CQ (Q4FY26)
daysToClose: 38
daysInStage: 14               # entered Negotiate ~2 weeks ago
daysInForecast: 67            # has been Best Case for ~2 months
productAllocations:
  - { productId: cortex-xdr,  amount: 600000 }
  - { productId: xsiam,       amount: 150000 }
riskIds:
  - no-secured-tech-win
  - budget-not-scheduled
  - no-activity-30-days
  - quotes-pending-approval
lastActivityType: customer-engagement
lastActivityDaysAgo: 5
renewalOutcome: unknown        # AE has not yet disposition'd this renewal
scenarios: [default]
```

---

## SalesPlay (catalog)

| Column           | Type                       | R/O | Notes |
|------------------|----------------------------|-----|-------|
| `id`             | string (prefix `play-`)    | R   | |
| `name`           | string                     | R   | E.g. "Unit 42 SOC Modernization Takeout" |
| `familyId`       | sales-play-family enum     | R   | One of `fw-cdss`, `sase`, `cortex-cloud`, `unit-42` |
| `description`    | string                     | O   | |
| `targetProducts` | list<product-id>           | R   | Which leaf products this play moves |

Target ~12–16 plays in the catalog.

---

## SalesPlayInstance

Composite key on `(accountId, playId)`.

| Column            | Type                          | R/O | Notes |
|-------------------|-------------------------------|-----|-------|
| `accountId`       | FK → Account.id               | R   | |
| `playId`          | FK → SalesPlay.id             | R   | |
| `status`          | sales-play-status             | R   | `01-taxonomies.md` § Sales play status |
| `estimatedValue`  | number (USD)                  | R   | The `$` tag rendered next to the play; SUMs to the bucket totals in popovers |
| `primaryOppId`    | FK → Opportunity.id           | O   | "Primary opportunity" gold-star linkage; at most one per (account × play) |
| `linkedOppIds`    | list<FK Opportunity.id>       | O   | Other linked opps |
| `lastTouchDate`   | ISO date                      | O   | |
| `assignedAEName`  | string                        | O   | |

**Rules.**
- `status = open-pipeline` SHOULD have at least one linked opportunity (`primaryOppId` or `linkedOppIds` non-empty).
- `status = closed-won` requires `primaryOppId` set and that opp's `forecastCategory = closed`.
- An account does not need an instance of every play. Only create instances where the play is plausibly applicable.

### Worked example — *interested SOC takeout play with a primary opp linked*

```yaml
accountId: acc-cyberdyne
playId: play-u42-soc-modernization
status: interested
estimatedValue: 1250000
primaryOppId: opp-cyberdyne-xsiam-soc
linkedOppIds: [opp-cyberdyne-xpanse-asm]
lastTouchDate: 2026-04-22
assignedAEName: Maya Rodriguez
```

---

## Contact

| Column        | Type                  | R/O | Notes |
|---------------|-----------------------|-----|-------|
| `id`          | string (prefix `c-`)  | R   | |
| `accountId`   | FK → Account.id       | R   | |
| `name`        | string                | R   | |
| `title`       | string                | R   | |
| `role`        | `champion` \| `decision-maker` \| `economic-buyer` \| `influencer` \| `blocker` \| `user` | R | |
| `email`       | string                | O   | |
| `phone`       | string                | O   | |

Aim for 2–5 contacts per account.

---

## EBC

| Column        | Type                   | R/O | Notes |
|---------------|------------------------|-----|-------|
| `id`          | string (prefix `ebc-`) | R   | |
| `accountId`   | FK → Account.id        | R   | |
| `date`        | ISO date               | R   | |
| `type`        | EBC type               | R   | `01-taxonomies.md` § EBC types |
| `topic`       | string                 | R   | |
| `attendees`   | list<{name, role}>     | R   | Formatted as "Name (Role)" in popovers |

0..N rows per account. **Absence of EBC rows for an account is meaningful** — see EBC severity in `03-derivations-and-invariants.md`.

---

## InstallBaseRecord

Composite key on `(accountId, productId)`.

| Column              | Type                | R/O | Notes |
|---------------------|---------------------|-----|-------|
| `accountId`         | FK → Account.id     | R   | |
| `productId`         | FK → Product        | R   | `01-taxonomies.md` § Products |
| `tcv`               | number (USD)        | R   | See *Field semantics* below |
| `iacv`              | number (USD)        | R   | |
| `margin`            | number (USD)        | R   | |
| `rpo`               | number (USD)        | R   | |
| `technicalHealth`   | health enum         | R   | Per-product, distinct from account-level |
| `adoptionHealth`    | health enum         | R   | Per-product, distinct from account-level |
| `renewalDate`       | ISO date            | O   | If product has a discrete renewal date |

An account typically has 1–8 install base records.

### Field semantics

- **`tcv`** — Total Contract Value. The full multi-year value of all active contracts for this (account, product).
- **`iacv`** — Incremental ACV (year-over-year). Positive = growth (rendered green in the panel). Negative = downsell. Computed at the (account, product) granularity.
- **`margin`** — Gross margin **dollars** on this (account, product) install base. Not a percentage; a dollar value. The Account Panel renders it as a "Margin" row alongside TCV — color cue when healthy.
- **`rpo`** — Remaining Performance Obligation. The portion of TCV that's contracted but not yet recognized as revenue. Always `rpo ≤ tcv`.

---

## HealthTrendPoint

Composite key on `(accountId, monthOffset)`.

| Column        | Type                       | R/O | Notes |
|---------------|----------------------------|-----|-------|
| `accountId`   | FK → Account.id            | R   | |
| `monthOffset` | integer (-11 to 0)         | R   | 0 = current month, -11 = eleven months ago |
| `value`       | health enum                | R   | |

Every account has exactly **12 points** (monthOffset -11 through 0). Drives the 12-bar trend sparkline in Account Panel and the popover bars in Account Table.

The Account Panel's trend visualization also implies **10 future placeholder dots** and a **renewal marker** positioned near the renewal opp's `closeDate`. Those are derived in the component from the renewal opp; no separate authoring required.

---

## ForecastHistoryPoint

Composite key on `(quarter, scopeKey)`.

| Column           | Type                                          | R/O | Notes |
|------------------|-----------------------------------------------|-----|-------|
| `quarter`        | quarter label                                 | R   | One of the 7 sparkline quarters |
| `scopeKey`       | string                                        | R   | E.g. `all`, `segment:strategic`, `region:americas`, `product:cortex` |
| `plan`           | number (USD)                                  | R   | Plan/target for this (quarter, scope) |
| `totalForecast`  | number (USD)                                  | R   | See `03-derivations-and-invariants.md` § Plan Summary totals |
| `commit`         | number (USD)                                  | R   | Sum of commit-category opps in this (quarter, scope) |
| `bestCase`       | number (USD)                                  | R   | Sum of best-case opps |
| `pipeline`       | number (USD)                                  | R   | Sum of pipeline opps |
| `closed`         | number (USD)                                  | R   | Sum of closed opps |

For the **current quarter** (`Q4FY26`), these values must be derivable from the Opportunity table. For **past quarters**, author them directly — there is no requirement that past opportunity rows exist. For **future quarters**, derive `pipeline / bestCase / commit` from future-dated opportunities; `closed` is zero; `totalForecast` per the derivation rules.

Scope keys: start with `scopeKey = all` only for the POC. Adding scoped rows is a later pass — see `05-open-items.md`.
