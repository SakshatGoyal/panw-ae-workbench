# Mock Data Spec — Derivations and Invariants

Two parts. **Derivations** are the rules components apply to raw authored values — author raw values *intentionally* to land the row in the severity bucket you want. **Invariants** are the integrity rules across rows — components misrender or crash when they're violated.

Severity thresholds verified against `poc-exploration/src/mock/derivations.ts`. Plan Summary derivations verified against `data-models/plan-summary-reference.md`.

---

## Derivations

### Severity from rank

`rank(ok) = 0, rank(caution) = 1, rank(error) = 2`. `max(severityA, severityB)` returns whichever has the higher rank.

### Last-activity severity

```
lastActivityDaysAgo  ≤ 7   → ok
                      8–21 → caution
                     > 21  → error
```

Applies to `Account.lastActivityDaysAgo` and `Opportunity.lastActivityDaysAgo`. Thresholds match scaffold `THRESHOLDS.lastActivity`.

### EBC severity (account-level)

Compute `daysSinceLatestEBC` from the most-recent `EBC.date` for the account.

```
EBC rows = 0                 → error    # absence triggers danger
daysSinceLatestEBC > 365     → error
                  181–365    → caution
                    0–180    → ok
```

### Overall account health

```
Account.overallHealth = healthFromRank( max( rank(technicalHealth), rank(adoptionHealth) ) )
```

Where `healthFromRank(0) = healthy`, `healthFromRank(1) = at-risk`, `healthFromRank(2) = critical`.

Author rows must satisfy this — don't author `overallHealth = healthy` if either sub-axis is `critical`.

### Attainment severity

```
attainmentPct  < 25   → error
              25–75   → caution
              > 75    → ok
```

### Closing-quarter label by daysToClose

The Account Panel buckets opps into the 4Q window using `daysToClose`:

```
daysToClose ≤ 90        → CQ
            91–180      → CQ+1 (Q1FY27 at TODAY)
            181–270     → CQ+2 (Q2FY27)
            271–360     → CQ+3 (Q3FY27)
            > 360       → outside window (Account Panel does not display)
```

The Account Table's per-quarter pipeline rollup uses the same bucketing.

If both `closeDate` and `daysToClose` are authored, the two MUST agree.

### Days-to-close severity (opp-level urgency)

Scaffold separately ladders opp urgency by *remaining* time:

```
daysToClose  ≥ 30   → ok
            14–29   → caution
            < 14    → error
```

Smaller `daysToClose` = more urgent. Thresholds match scaffold `THRESHOLDS.daysToClose`.

### Risk-count severity

```
riskIds.length  ≤ 1    → ok
              = 2–3    → caution
              ≥ 4      → error
```

Applies to both account and opp risk counts. Thresholds match scaffold `THRESHOLDS.riskCount`. (The `no-risks` sentinel, if present, is filtered out before counting.)

### Days-in-forecast severity (recommended)

```
daysInForecast  ≤ 14   → ok
              15–30    → caution
              > 30     → error
```

Not codified in scaffold's `THRESHOLDS`; using the last-activity ladder shape as the recommendation. Components currently read this via the same severity mapping.

### Plan Summary totals

The Plan & Forecast Summary expanded view shows six cells. Building blocks are authored on `ForecastHistoryPoint`; rollups are derived:

```
Total - In       = closed + commit + bestCase    # the attainment number
Total Pipeline   = pipeline                       # the broadest pipeline figure
Total Forecast   = (Total - In) + judgment-slice  # see below
```

- **Closed, Commit, Best Case - In, Total Pipeline** are *primary* values — author them directly on each `ForecastHistoryPoint`.
- **Total - In** is the simple sum of the three primary in-quarter signals.
- **Total Forecast** is `Total - In` + a *forecast judgment slice* drawn from `Total Pipeline`. The exact judgment-slice formula is a finance rule and is **not specified** by the design layer — see `05-open-items.md`. Until specified, author `totalForecast` as a value between `Total - In` and `Total - In + pipeline`, biased toward the lower end. The plan-summary-reference example uses `Total - In = $880M`, `Total Pipeline = $120M`, `Total Forecast = $995M` (≈ 95% of pipeline added to in-quarter).

**Plan attainment** is computed in the Plan Summary as `(Total - In) / plan`. Severity uses the same thresholds as the account-level attainment ladder (above).

---

## Hard invariants

The components will misrender or crash if these are violated. The data agent is responsible for verifying these hold across the authored fixture.

**Referential integrity**
- Every `Opportunity.accountId`, `SalesPlayInstance.accountId`, `Contact.accountId`, `EBC.accountId`, `InstallBaseRecord.accountId`, `HealthTrendPoint.accountId` resolves to an existing `Account.id`.
- Every `SalesPlayInstance.playId` resolves to an existing `SalesPlay.id`.
- Every `Opportunity.productAllocations[].productId` and `InstallBaseRecord.productId` resolves to a Product.
- Every `SalesPlayInstance.primaryOppId` (and entries in `linkedOppIds`) resolves to an existing Opportunity.

**Sum invariants**
- For every Opportunity row, `sum(productAllocations[].amount) === amount`. No silent rounding gaps.
- For each `(account, sales play status bucket)` rendered in popovers, the bucket's USD total equals `sum(SalesPlayInstance.estimatedValue WHERE accountId = X AND status = bucket)`.

**Renewal-window guarantee**
- Every Account that appears in the Account Table or Account Panel has **at least one Renewal-type opportunity** with `closeDate` in the 4-quarter window (`CQ` through `Q3FY27`, i.e. May 2026 – Apr 2027 inclusive). This is why Account Panel currently injects a stub renewal in code — the data must guarantee it instead.

**Plan Summary aggregates**
- Current-quarter Plan Summary aggregates (the `ForecastHistoryPoint` row for `quarter = Q4FY26, scopeKey = all`) must equal the sum of `Q4FY26` opportunities by forecast category.
- Past-quarter aggregates are authored directly; future-quarter aggregates derive from future-dated opportunities.

**Health consistency**
- `Account.overallHealth` must satisfy the worst-of-two derivation against its `technicalHealth` and `adoptionHealth`.
- Every Account has exactly **12** HealthTrendPoint rows (`monthOffset` -11 through 0).

**Date / day consistency**
- If `closeDate` and `daysToClose` are both authored on an opportunity, they must agree: `daysToClose = (closeDate − TODAY).days`.

**Forecast-stage gating**
- Closed opportunities (`forecastCategory = closed`) keep their last pre-close stage value. There is no `won` / `lost` stage value — see `05-open-items.md` for the gap on distinguishing won-vs-lost on closed rows.
- Non-closed opportunities do not have `forecastCategory = closed`.

**Conditional fields**
- `renewalOutcome` is populated only when `Opportunity.type = renewal` (or `renewal-and-upsell`); null/empty otherwise.
- `churnReason` is populated only when `renewalOutcome = churn`.
- `displacementCompetitor` is populated only when `renewalOutcome = displacement`.

**Sales Play status linkage**
- `SalesPlayInstance.status = closed-won` requires `primaryOppId` set and that opp's `forecastCategory = closed`.
- `status = open-pipeline` should have at least one linked opportunity.

**Plausibility floor for the Opp Table**
- The Opportunity Table currently displays a label like `47 deals · $12.4M` summarizing the visible rows. The fixture should contain enough opportunities that the count and total are plausible at the demo's display density. See scale targets in `04-scale-and-reference.md`.
