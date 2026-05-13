# Mock Data Spec — Taxonomies

All enums are closed. Use the value exactly as written; do not introduce variants. If a value seems missing, flag in `05-open-items.md`.

Verified (where noted) against `poc-exploration/src/mock/types.ts` and `poc-exploration/src/mock/taxonomies.ts`. Per-component tag colors and icons are informational — components resolve those from DS tokens.

## Casing rule

All enum values are written in **sentence case**: first character uppercase, rest lowercase, hyphens preserved. Acronyms and proper nouns stay in full caps wherever they appear (e.g. `POVs-without-progression`, `Active-POV`, `No-EBCs-last-year`, `Cortex-XDR`, `Prisma-SD-WAN`).

Preserved acronyms: POV, ASR, EBC, TCV, IACV, RPO, PA, VM, CN, XDR, XSIAM, XSOAR, CDSS, NGFW, EMEA, APAC, AE, QBR, ACV. Project-extension acronyms (also preserved): POC, CQ, FW, MnA, PS, SD-WAN, SASE.

Proper nouns (Cortex, Prisma, Salesforce, NVIDIA, QRadar, Xpanse, etc.) keep their canonical casing.

**Excluded from the rule:**
- Primary keys and FK identifier strings — `acc-salesforce`, `opp-100101`, `c-0042`, `play-xsiam-splunk`, etc. — stay lowercase. They are machine identifiers, not display values.
- Booleans (`true` / `false`) stay lowercase.
- Free-text fields (contact names, EBC topics, opportunity names, descriptions) follow normal English casing, not enum casing.
- Column header names in CSVs follow the §2 entity schema (camelCase / lowercase identifiers), not the enum casing rule.

---

## Severity (3-value)

| Value     | Semantic       |
|-----------|----------------|
| `Ok`      | healthy / on-track / no concern |
| `Caution` | watch / yellow / amber          |
| `Error`   | at-risk / critical / red        |

Rank order for `max`-style derivations: `Error > Caution > Ok`. Scaffold names this `Severity` and uses `Error` (not `Danger`) for the worst bucket — match that spelling.

---

## Health (3-value, account- and product-level)

| Value      | Semantic | Severity equivalent |
|------------|----------|---------------------|
| `Healthy`  | green    | `Ok`                |
| `At-risk`  | amber    | `Caution`           |
| `Critical` | red      | `Error`             |

Used in: `Account.overallHealth`, `Account.technicalHealth`, `Account.adoptionHealth`, `InstallBaseRecord.technicalHealth`, `InstallBaseRecord.adoptionHealth`, `HealthTrendPoint.value`.

---

## Opportunity stage (5-value)

Verified canonical (scaffold `StageId`):

| Value                   | Ordinal | Display name             | Long name                              |
|-------------------------|---------|--------------------------|----------------------------------------|
| `Discovery`             | 1       | Discovery                | Stage 1 — Discovery                    |
| `Solutioning`           | 2       | Solutioning              | Stage 2 — Solutioning                  |
| `Technical-validation`  | 3       | Technical Validation     | Stage 3 — Technical Validation         |
| `Active-POV`            | 4       | Active POV               | Stage 4 — Active POV                   |
| `Negotiate`             | 5       | Negotiate                | Stage 5 — Negotiate                    |

**Closed state is not a stage.** A closed opportunity carries `forecastCategory = 'Closed'` and keeps its last pre-close stage value. The scaffold does not currently model a `Won` / `Lost` distinction on closed opps — see `05-open-items.md`.

(Scaffold note: `Solutioning` is marked provisional in `taxonomies.ts` pending SME confirmation of stage 2's real name. Use it as canonical until told otherwise.)

---

## Opportunity type (4-value)

Verified (scaffold `OpportunityType`):

| Value                | Semantic |
|----------------------|----------|
| `Net-new`            | Brand new logo or net-new product to an existing account |
| `Upsell`             | Expansion of existing footprint |
| `Renewal`            | Renewing an existing contract |
| `Renewal-and-upsell` | Renewing plus expanding in one record |

Scaffold retains `Renewal-and-upsell` as a row-level type even after `renewalOutcome.Upsell` was added — they describe different things: `type = renewal-and-upsell` is a single opportunity with both motions, whereas `renewalOutcome = upsell` is the AE's disposition on a `type = renewal` row.

---

## Forecast category (4-value)

Verified (scaffold `ForecastCategory`):

| Value        | Semantic |
|--------------|----------|
| `Pipeline`   | Sourced but uncommitted |
| `Best-case`  | Stretch; AE believes the deal can land |
| `Commit`     | AE is committing to the deal landing this quarter |
| `Closed`     | Booked (won or lost — scaffold does not currently distinguish) |

`Closed` is excluded from row-level Opp Table displays but rolls into Plan Summary aggregates.

Informational tag colors:
- `Pipeline` → bronze
- `Best-case` → teal
- `Commit` → olive
- `Closed` → neutral / not tag-rendered

---

## Renewal outcome (7-value)

Verified (scaffold `RenewalOutcome` post pass-2 split):

| Value           | Semantic |
|-----------------|----------|
| `Unknown`       | Not yet determined |
| `Full`          | Flat renewal — same ACV as prior term |
| `Upsell`        | Flat renewal plus additional growth |
| `Downsell`      | Renewed at lower ACV |
| `Churn`         | Customer did not renew |
| `Displacement`  | Customer chose a competitor (or in-house build) |
| `Duplicate`     | Duplicate / superseded opportunity record |

Only meaningful when `Opportunity.type = renewal` (or `Renewal-and-upsell`). Otherwise omit / null.

Informational tag colors:
- `Full`, `Upsell` → jade / green (positive family — same color per pass-2 designer note; differentiation deferred)
- `Downsell` → orange
- `Churn` → red
- `Displacement`, `Duplicate`, `Unknown` → neutral / grey

---

## Sales play status (7-value — three forks unresolved)

The scaffold's canonical type `SalesPlayStatusId` is:

| Value           | Display label (scaffold) | Icon name (scaffold) |
|-----------------|--------------------------|----------------------|
| `Not-touched`   | Not Touched              | alert-circle |
| `Pitched`       | Pitched                  | headphones |
| `Interested`    | Interested               | thumbs-up |
| `Open-pipeline` | Open Pipeline            | lightbulb |
| `Closed-won`    | Closed Won               | check-circle |
| `Deferred`      | Deferred                 | calendar |
| `Closed-lost`   | Closed Lost              | x-circle |

> **Author against this list.** It's what `SalesPlayInstance.status` should hold.

Three forks of this enum exist across the codebase (`05-open-items.md` lists them); they will be reconciled separately. The data agent should not try to satisfy all three — the canonical list above is what to author.

Color overrides applied by components (informational; do not author colors):
- `Not-touched` → error (red)
- `Pursuing` / `Open-pipeline` → success (green)
- `Closed-won` → teal
- All others → neutral

---

## Account risk factors (8 canonical IDs)

Verified canonical (scaffold `AccountRiskId`, excluding the `No-risks` sentinel which the data agent does not author):

| ID                            | Emoji | Display label |
|-------------------------------|-------|---------------|
| `No-pipeline-CQ-next-4Q`      | 📭    | No Pipeline in CQ + Next 4Q |
| `No-EBCs-last-year`           | 🏛️    | No EBCs in last year |
| `Not-platformized`            | 🏗️    | Not Platformized |
| `POVs-without-progression`    | 🧪    | POVs without progression |
| `No-or-stale-ASR`             | 🌀    | No ASR / Stale ASR |
| `No-customer-success-plan`    | 🚧    | No customer success plan |
| `Low-adoption-deployment`     | 🛑    | Customer adoption/deployment rate is low |
| `Critical-technical-health`   | 🩺    | Customer technical health is critical |

The Account Table currently renders a 6-id subset (deliberate per the table's header doc-comment). All 8 are author-allowed; the table will filter to its subset.

`No-risks` is a sentinel meaning "no risks authored" — represent this as an empty `riskIds` list, do not write the sentinel.

---

## Opportunity risk factors (9 canonical IDs)

Verified canonical (scaffold `OppRiskId`, excluding `No-risks` sentinel):

| ID                          | Emoji | Display label |
|-----------------------------|-------|---------------|
| `Lacking-exec-engagement`   | 🎙️    | Lacking exec engagement or support |
| `No-design-of-record`       | 📐    | No design-of-record |
| `No-secured-tech-win`       | 🏅    | No Secured technical win |
| `No-partner-selected`       | 🤝    | No Partner selected or finalized |
| `Mandatory-PS-removed`      | 🧑‍💻    | Mandatory PS was removed |
| `Quotes-pending-approval`   | ⌛    | Quotes pending approval |
| `Budget-not-scheduled`      | 💲    | Budget conversation not scheduled or complete |
| `Term-length-issue`         | 🔁    | Term length issue or non-standard financing |
| `No-activity-30-days`       | 💤    | No activity for last 30 days |

A row's risk count is `riskIds.length` (excluding `No-risks`). Severity from count → see `03-derivations-and-invariants.md`.

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
| `Firewall`     | Firewall           | STRATA  | `PA-series`, `VM-series` |
| `CDSS`         | CDSS               | STRATA  | `PA-series-attached`, `PA-series-support`, `FW-data-lake` |
| `SASE`         | SASE               | PRISMA  | `Prisma-access`, `Prisma-SD-WAN` |
| `Cortex-cloud` | Cortex & Cloud     | CORTEX  | `Cortex-XDR`, `Cortex-XSOAR`, `Xpanse`, `XSIAM`, `QRadar`, `Cortex-cloud-leaf` |
| `Unit-42`      | Unit 42            | UNIT42  | `Unit-42-reactive`, `Unit-42-proactive` |

Leaf display names follow scaffold's `PRODUCTS[id].name` exactly (e.g. `Cortex-XDR` → "Cortex XDR+", `Cortex-cloud-leaf` → "Cortex & Cloud").

The `Sales Play Family` taxonomy is a sibling of product family — same four buckets (`FW-CDSS`, `SASE`, `Cortex-cloud`, `Unit-42`) but used to group plays, not products. See `02-entities.md` for `SalesPlay.familyId`.

---

## Activity types (11 canonical)

Verified canonical (scaffold `ActivityType`):

`Technical-deep-dive`, `Architecture-review`, `Deployment-health-check`, `Renewal-prep-call`, `Contract-review`, `Partner-strategy-call`, `Budget-alignment-meeting`, `POC-scoping-session`, `Solution-workshop`, `Executive-briefing`, `Customer-engagement`.

Display labels are in scaffold `ACTIVITY_TYPES[id].label`. Author the ID; components render the label.

---

## EBC types (3-value)

`Executive-briefing`, `Business-review`, `Roadmap-session`.

EBC may also be **absent** for an account — modeled as no EBC rows existing for that `accountId`. See the EBC-severity rule in `03-derivations-and-invariants.md`.

---

## Closed reference lists

Two more closed taxonomies are listed verbatim in `04-scale-and-reference.md`:

- **Churn reasons** — required when `renewalOutcome = churn`.
- **Competitor reference list** — required when `renewalOutcome = displacement`; also referenced by the `Competitor-active` account-risk popover (note: the canonical `No-customer-success-plan` / `No-or-stale-ASR` etc. set in §Account risks above does not include `Competitor-active` — the popover surface name and the risk ID don't perfectly align; flagged in `05-open-items.md`).
