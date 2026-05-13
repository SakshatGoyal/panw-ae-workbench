# Stage POC mock dataset (v1)

CSV fixtures for the six React compositions in `poc-exploration/`. Authored against `data-models/mock-data-spec/`. Generated deterministically by `_generate.py`; verified by `_verify.py`.

Anchor date: **TODAY = 2026-05-12** (the project's current date). Spec section 4 example references 2026-05-11; the 1-day delta is immaterial for `daysAgo` / `daysToClose` rounding and is recorded here so the discrepancy is traceable.

To regenerate:

```
python3 data-models/mock-data-csv/_generate.py
python3 data-models/mock-data-csv/_verify.py
```

The generator is deterministic (seeded). Re-running produces byte-identical output.

## Row counts

| File | Rows | Target |
|---|---|---|
| accounts.csv | 50 | 50 |
| opportunities.csv | 101 | ~100 |
| sales-plays.csv | 14 | 12-16 |
| sales-play-instances.csv | 356 | 300-500 |
| contacts.csv | 196 | 150-250 |
| ebcs.csv | 92 | ~75 (0-3 per account) |
| install-base.csv | 210 | 150-300 |
| health-trend.csv | 600 | 50 accounts x 12 months |
| forecast-history.csv | 7 | 7 quarters, scopeKey=all |

(Numbers above are row counts excluding the CSV header line.)

## Invariants verified

`_verify.py` enforces the §6 invariants from the spec. All checks pass.

1. **Row counts** within targets.
2. **Referential integrity** — every `accountId`, `playId`, `primaryOppId`, `linkedOppIds`, and product reference resolves to an existing row.
3. **Sum invariants** —
   - For each opportunity, `sum(productAllocations[].amount) == amount`.
   - For Q4FY26 in `forecast-history.csv`, `pipeline/bestCase/commit/closed` totals match grouped opportunity sums for opps with `closeDate` in May-Jul 2026.
4. **Health invariant** — `Account.overallHealth == max(rank(technicalHealth), rank(adoptionHealth))` for all 50 accounts.
5. **Health-trend cardinality** — exactly 12 points per account with `monthOffset` in `[-11..0]`.
6. **Renewal-window guarantee** — every account except the deliberate cold-account outlier (`acc-williamssonoma`) has at least one `type=renewal` or `renewal-and-upsell` opp with `closeDate` in `[2026-05-12, 2027-04-30]`.
7. **Conditional fields** — `renewalOutcome` is set only on renewal/renewal-and-upsell opps; `churnReason` only when outcome=churn; `displacementCompetitor` only when outcome=displacement.
8. **Stage/forecast coherence** — no Stage 1 opps in `commit`; no Stage 5 opps in `pipeline` outside outlier-tagged exceptions.
9. **Formatting** — no em dashes, en dashes, or smart quotes anywhere in the CSVs. ASCII only.
10. **Outlier coverage** — every tag in the outlier roster appears in at least one CSV.

Additional checks: all 7 canonical `SalesPlayStatusId` values appear in `sales-play-instances.csv`; `status=closed-won` instances always point `primaryOppId` at a `forecastCategory=closed` opportunity.

## Outlier roster (with scenarios tags)

| Account | Tag | What it demonstrates |
|---|---|---|
| NVIDIA | `outlier-over-attain` | 152% CQ attainment, multi-opp high performer |
| PG&E | `outlier-catastrophic-miss` | 10% attainment, 4 risks, critical health, zero EBCs |
| Ross Stores | `outlier-neglected` | Zero EBCs, last activity 72 days ago, mid-market critical |
| Oracle (opp-oracle-001) | `outlier-stalled-opp` | Stage 3 opp at 218 days in stage |
| Stripe (opp-stripe-001) | `outlier-velocity-deal` | $3.1M deal closing in 5 days |
| Williams-Sonoma | `outlier-cold-account` | Zero opportunities (empty state test). Sole exception to renewal-window guarantee — documented. |
| Reddit (opp-reddit-001) | `outlier-displacement` | Closed renewal, displaced by CrowdStrike |
| Pinterest (opp-pin-001) | `outlier-churn` | Renewal with `churn` outcome, `budget-cut` reason |
| Wells Fargo Bank | `outlier-multi-risk-critical` | 5 risks, critical health, stale activity |
| Adobe | `outlier-one-product-critical` | Cortex XSOAR Critical while other products Healthy |
| Lyft | `outlier-sparse-pipeline` | Pipeline only in CQ, nothing later |
| Salesforce | `outlier-full-coverage` | Pipeline distributed across CQ + 3 future quarters |

Closed opps additionally carry `scenarios=closed-won` (3 opps) or `closed-lost` (1 opp) to distinguish terminal disposition, since the stage taxonomy does not encode won/lost (spec §3 line 45).

## Apex sharing

Four apex groups exercise the apex popover (Account Table renders meaningfully only when 2+ siblings share):

- **Alphabet**: Google Cloud (strategic), YouTube (enterprise), Waymo (enterprise)
- **Wells Fargo & Company**: Wells Fargo Bank (strategic), Wells Fargo Securities (enterprise)
- **Salesforce Inc.**: Salesforce (strategic), Slack (enterprise), Tableau (enterprise), MuleSoft (enterprise)
- **Sutter Health System**: Sutter Health (enterprise), Sutter Bay Medical Foundation (mid-market), Palo Alto Medical Foundation (mid-market)

12 of 50 accounts sit under an apex; the remaining 38 are standalone (empty `apexName`).

## Spec ambiguities resolved

| Topic | Resolution | Source |
|---|---|---|
| Anchor date | 2026-05-12 (project today) | User decision; spec §4 example 2026-05-11 noted, delta 1 day. |
| `do-not-enter` outlier | Dropped; not in canonical `SalesPlayStatusId` enum. | User decision. |
| Stage closed-won / closed-lost | Kept stage table at 5 values per spec §3 line 45. Closed opps retain pre-close stage; won/lost surfaced via `scenarios` tag. | Spec + user decision. |
| Account risk canonical count | Kept full 8 per spec §3.8. Account Table's display narrowing to 6 is a component filter, not a taxonomy change. Authored rows use all 8 IDs. | User decision. |
| `competitor-active` popover risk | Deferred. Not in canonical 8-ID account risk list; rely on `displacementCompetitor` on the closed Reddit renewal to populate the competitor surface. | Spec §9 open item; user deferred. |
| `last3YearsValue` vs `valueLast3Years` naming | Used `last3YearsValue` per spec §2 entity schema. | Spec. |
| Won vs lost on closed opps | Tagged in `scenarios` (`closed-won` / `closed-lost`) since no enum field encodes the distinction. | Spec §9 open item. |

## Open items from spec §9 that affected authoring

- **Plan Summary judgment-slice formula** unspecified. Authored `totalForecast = (closed + commit + bestCase) + 0.30 * pipeline`, biased toward lower end of the §6 allowed band, per spec §9 guidance.
- **`scopeKey` beyond `all`** deferred per spec §9. `forecast-history.csv` carries only `scopeKey=all` rows.
- **Apex relationship** kept as denormalized `Account.apexName` string per current spec §2 entity schema. Migration to an `ApexAccount` entity is deferred.

## Multi-value cell formats

- `riskIds`, `scenarios`, `linkedOppIds`: semicolon-joined IDs, no spaces. Example: `lacking-exec-engagement;no-secured-tech-win`.
- `productAllocations`: semicolon-joined `productId:amount` pairs. Example: `pa-series:850000;pa-series-attached:250000`. Sums to `amount`.
- `targetProducts` (sales-plays.csv): same productId-semicolon format.
- `attendees` (ebcs.csv): semicolon-joined `Name (Role)` entries. Example: `Marcus Chen (CISO);Priya Patel (VP Security)`.

## Hard formatting rules applied

- ASCII hyphens only (no em or en dashes, no smart quotes anywhere). Verified by regex scan.
- Dates ISO-8601 (`YYYY-MM-DD`).
- USD amounts plain integers (no `$`, no commas).
- Booleans lowercase `true` / `false` (currently no boolean columns in v1, but the rule is enforced for future passes).

## Casing rule

Enum values across all CSVs are **sentence case**: first character uppercase, rest lowercase, hyphens preserved, acronyms in full caps. The generator (`_generate.py`) keeps internal literals lowercase (the canonical taxonomy form) and applies the transform at write time via the `SC` map. The verifier (`_verify.py`) sweeps for residual all-lowercase enum-shape strings; the scan passes.

Acronyms preserved per the user's spec: POV, ASR, EBC, TCV, IACV, RPO, PA, VM, CN, XDR, XSIAM, XSOAR, CDSS, NGFW, EMEA, APAC, AE, QBR, ACV.

**Judgment calls** (acronyms not in the user's list but preserved as obviously-acronymic):

| Token | Casing applied | Reasoning |
|---|---|---|
| POC | `POC-scoping-session` | Proof of Concept, conventional all-caps acronym. |
| CQ | `No-pipeline-CQ-next-4Q` | Current Quarter; the 4Q form is already capitalized in the spec's display label. |
| FW | `FW-CDSS`, `FW-data-lake` | Firewall abbreviation; appears in scaffold's family ID. |
| PS | `Mandatory-PS-removed` | Professional Services. |
| SD-WAN | `Prisma-SD-WAN` | Industry-standard all-caps spelling. |
| SASE | `SASE` | Secure Access Service Edge, conventional all-caps. |
| MnA | `Org-change-MnA` | Mergers and Acquisitions; preserved the camelCase MnA form found in the canonical churn-reason ID. |

**Excluded from the rule (stay lowercase):**

- Account, opportunity, contact, EBC, sales-play row identifiers (`acc-salesforce`, `opp-sf-001`, `c-0042`, `ebc-0007`, `play-xsiam-splunk`). These are per-row machine identifiers, not enum values.
- `linkedOppIds` and `primaryOppId` cells (FKs to opportunity rows).
- Booleans, ISO dates, numeric values.
- Free-text fields: contact names, EBC topics, opportunity names, sales-play descriptions.
- Column **header** names in `forecast-history.csv` (`commit`, `bestCase`, `pipeline`, `closed`, `totalForecast`, `plan`, `quarter`, `scopeKey`) — these are field identifiers from the §2 entity schema, not cell values. The cell values for `scopeKey` are themselves sentence-cased (`All`).

**Product IDs are sentence-cased** (e.g. `PA-series`, `Prisma-access`, `Cortex-XDR`) wherever they appear, including inside the `productAllocations` cells in `opportunities.csv` and `targetProducts` in `sales-plays.csv` and the `productId` column in `install-base.csv`. Product IDs are taxonomy enum values (a closed 15-value list), not arbitrary per-row identifiers — so the rule applies to them.
