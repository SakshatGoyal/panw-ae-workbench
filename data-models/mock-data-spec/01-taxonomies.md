# Mock Data Spec — Taxonomies

All enums are closed. Use the value exactly as written; do not introduce variants. If a value seems missing, flag in `05-open-items.md`.

Verified (where noted) against `poc-exploration/src/mock/types.ts` and `poc-exploration/src/mock/taxonomies.ts`. Per-component tag colors and icons are informational — components resolve those from DS tokens.

---

## Severity (3-value)

| Value     | Semantic       |
|-----------|----------------|
| `ok`      | healthy / on-track / no concern |
| `caution` | watch / yellow / amber          |
| `error`   | at-risk / critical / red        |

Rank order for `max`-style derivations: `error > caution > ok`. Scaffold names this `Severity` and uses `error` (not `danger`) for the worst bucket — match that spelling.

---

## Health (3-value, account- and product-level)

| Value      | Semantic | Severity equivalent |
|------------|----------|---------------------|
| `healthy`  | green    | `ok`                |
| `at-risk`  | amber    | `caution`           |
| `critical` | red      | `error`             |

Used in: `Account.overallHealth`, `Account.technicalHealth`, `Account.adoptionHealth`, `InstallBaseRecord.technicalHealth`, `InstallBaseRecord.adoptionHealth`, `HealthTrendPoint.value`.

---

## Opportunity stage (5-value)

Verified canonical (scaffold `StageId`):

| Value                   | Ordinal | Display name             | Long name                              |
|-------------------------|---------|--------------------------|----------------------------------------|
| `discovery`             | 1       | Discovery                | Stage 1 — Discovery                    |
| `solutioning`           | 2       | Solutioning              | Stage 2 — Solutioning                  |
| `technical-validation`  | 3       | Technical Validation     | Stage 3 — Technical Validation         |
| `active-pov`            | 4       | Active POV               | Stage 4 — Active POV                   |
| `negotiate`             | 5       | Negotiate                | Stage 5 — Negotiate                    |

**Closed state is not a stage.** A closed opportunity carries `forecastCategory = 'closed'` and keeps its last pre-close stage value. The scaffold does not currently model a `won` / `lost` distinction on closed opps — see `05-open-items.md`.

(Scaffold note: `solutioning` is marked provisional in `taxonomies.ts` pending SME confirmation of stage 2's real name. Use it as canonical until told otherwise.)

---

## Opportunity type (4-value)

Verified (scaffold `OpportunityType`):

| Value                | Semantic |
|----------------------|----------|
| `net-new`            | Brand new logo or net-new product to an existing account |
| `upsell`             | Expansion of existing footprint |
| `renewal`            | Renewing an existing contract |
| `renewal-and-upsell` | Renewing plus expanding in one record |

Scaffold retains `renewal-and-upsell` as a row-level type even after `renewalOutcome.upsell` was added — they describe different things: `type = renewal-and-upsell` is a single opportunity with both motions, whereas `renewalOutcome = upsell` is the AE's disposition on a `type = renewal` row.

---

## Forecast category (4-value)

Verified (scaffold `ForecastCategory`):

| Value        | Semantic |
|--------------|----------|
| `pipeline`   | Sourced but uncommitted |
| `best-case`  | Stretch; AE believes the deal can land |
| `commit`     | AE is committing to the deal landing this quarter |
| `closed`     | Booked (won or lost — scaffold does not currently distinguish) |

`closed` is excluded from row-level Opp Table displays but rolls into Plan Summary aggregates.

Informational tag colors:
- `pipeline` → bronze
- `best-case` → teal
- `commit` → olive
- `closed` → neutral / not tag-rendered

---

## Renewal outcome (7-value)

Verified (scaffold `RenewalOutcome` post pass-2 split):

| Value           | Semantic |
|-----------------|----------|
| `unknown`       | Not yet determined |
| `full`          | Flat renewal — same ACV as prior term |
| `upsell`        | Flat renewal plus additional growth |
| `downsell`      | Renewed at lower ACV |
| `churn`         | Customer did not renew |
| `displacement`  | Customer chose a competitor (or in-house build) |
| `duplicate`     | Duplicate / superseded opportunity record |

Only meaningful when `Opportunity.type = renewal` (or `renewal-and-upsell`). Otherwise omit / null.

Informational tag colors:
- `full`, `upsell` → jade / green (positive family — same color per pass-2 designer note; differentiation deferred)
- `downsell` → orange
- `churn` → red
- `displacement`, `duplicate`, `unknown` → neutral / grey

---

## Sales play status (7-value — three forks unresolved)

The scaffold's canonical type `SalesPlayStatusId` is:

| Value           | Display label (scaffold) | Icon name (scaffold) |
|-----------------|--------------------------|----------------------|
| `not-touched`   | Not Touched              | alert-circle |
| `pitched`       | Pitched                  | headphones |
| `interested`    | Interested               | thumbs-up |
| `open-pipeline` | Open Pipeline            | lightbulb |
| `closed-won`    | Closed Won               | check-circle |
| `deferred`      | Deferred                 | calendar |
| `closed-lost`   | Closed Lost              | x-circle |

> **Author against this list.** It's what `SalesPlayInstance.status` should hold.

Three forks of this enum exist across the codebase (`05-open-items.md` lists them); they will be reconciled separately. The data agent should not try to satisfy all three — the canonical list above is what to author.

Color overrides applied by components (informational; do not author colors):
- `not-touched` → error (red)
- `pursuing` / `open-pipeline` → success (green)
- `closed-won` → teal
- All others → neutral

---

## Account risk factors (8 canonical IDs)

Verified canonical (scaffold `AccountRiskId`, excluding the `no-risks` sentinel which the data agent does not author):

| ID                            | Emoji | Display label |
|-------------------------------|-------|---------------|
| `no-pipeline-cq-next-4q`      | 📭    | No Pipeline in CQ + Next 4Q |
| `no-ebcs-last-year`           | 🏛️    | No EBCs in last year |
| `not-platformized`            | 🏗️    | Not Platformized |
| `povs-without-progression`    | 🧪    | POVs without progression |
| `no-or-stale-asr`             | 🌀    | No ASR / Stale ASR |
| `no-customer-success-plan`    | 🚧    | No customer success plan |
| `low-adoption-deployment`     | 🛑    | Customer adoption/deployment rate is low |
| `critical-technical-health`   | 🩺    | Customer technical health is critical |

The Account Table currently renders a 6-id subset (deliberate per the table's header doc-comment). All 8 are author-allowed; the table will filter to its subset.

`no-risks` is a sentinel meaning "no risks authored" — represent this as an empty `riskIds` list, do not write the sentinel.

---

## Opportunity risk factors (9 canonical IDs)

Verified canonical (scaffold `OppRiskId`, excluding `no-risks` sentinel):

| ID                          | Emoji | Display label |
|-----------------------------|-------|---------------|
| `lacking-exec-engagement`   | 🎙️    | Lacking exec engagement or support |
| `no-design-of-record`       | 📐    | No design-of-record |
| `no-secured-tech-win`       | 🏅    | No Secured technical win |
| `no-partner-selected`       | 🤝    | No Partner selected or finalized |
| `mandatory-ps-removed`      | 🧑‍💻    | Mandatory PS was removed |
| `quotes-pending-approval`   | ⌛    | Quotes pending approval |
| `budget-not-scheduled`      | 💲    | Budget conversation not scheduled or complete |
| `term-length-issue`         | 🔁    | Term length issue or non-standard financing |
| `no-activity-30-days`       | 💤    | No activity for last 30 days |

A row's risk count is `riskIds.length` (excluding `no-risks`). Severity from count → see `03-derivations-and-invariants.md`.

---

## Products, brands, brand icons (15 leaves, 5 families, 4 brands)

Verified canonical (scaffold `BRANDS` / `PRODUCT_FAMILIES` / `PRODUCTS`).

### Brands

| Brand ID | Display | Hex |
|----------|---------|-----|
| `STRATA` | Strata  | `#FA582D` (PANW Orange) |
| `PRISMA` | Prisma  | `#00C0E8` (Prisma Blue) |
| `CORTEX` | Cortex  | `#00CC66` (Cortex Green) |
| `UNIT42` | Unit 42 | `#FFCB06` (Unit 42 Yellow) |

### Product families and leaves

| Family ID      | Family display     | Brand   | Leaf product IDs |
|----------------|--------------------|---------|----------------------------------------------------------------------------------|
| `firewall`     | Firewall           | STRATA  | `pa-series`, `vm-series` |
| `cdss`         | CDSS               | STRATA  | `pa-series-attached`, `pa-series-support`, `fw-data-lake` |
| `sase`         | SASE               | PRISMA  | `prisma-access`, `prisma-sd-wan` |
| `cortex-cloud` | Cortex & Cloud     | CORTEX  | `cortex-xdr`, `cortex-xsoar`, `xpanse`, `xsiam`, `qradar`, `cortex-cloud-leaf` |
| `unit-42`      | Unit 42            | UNIT42  | `unit-42-reactive`, `unit-42-proactive` |

Leaf display names follow scaffold's `PRODUCTS[id].name` exactly (e.g. `cortex-xdr` → "Cortex XDR+", `cortex-cloud-leaf` → "Cortex & Cloud").

The `Sales Play Family` taxonomy is a sibling of product family — same four buckets (`fw-cdss`, `sase`, `cortex-cloud`, `unit-42`) but used to group plays, not products. See `02-entities.md` for `SalesPlay.familyId`.

---

## Activity types (11 canonical)

Verified canonical (scaffold `ActivityType`):

`technical-deep-dive`, `architecture-review`, `deployment-health-check`, `renewal-prep-call`, `contract-review`, `partner-strategy-call`, `budget-alignment-meeting`, `poc-scoping-session`, `solution-workshop`, `executive-briefing`, `customer-engagement`.

Display labels are in scaffold `ACTIVITY_TYPES[id].label`. Author the ID; components render the label.

---

## EBC types (3-value)

`executive-briefing`, `business-review`, `roadmap-session`.

EBC may also be **absent** for an account — modeled as no EBC rows existing for that `accountId`. See the EBC-severity rule in `03-derivations-and-invariants.md`.

---

## Closed reference lists

Two more closed taxonomies are listed verbatim in `04-scale-and-reference.md`:

- **Churn reasons** — required when `renewalOutcome = churn`.
- **Competitor reference list** — required when `renewalOutcome = displacement`; also referenced by the `competitor-active` account-risk popover (note: the canonical `no-customer-success-plan` / `no-or-stale-asr` etc. set in §Account risks above does not include `competitor-active` — the popover surface name and the risk ID don't perfectly align; flagged in `05-open-items.md`).
