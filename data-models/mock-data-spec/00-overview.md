# Mock Data Spec — Overview

Input contract for the data-authoring agent. Defines entities, taxonomies, relationships, derivations, and invariants the six Stage POC compositions depend on.

This file series sits alongside the per-component reference docs in `data-models/`. Where the two overlap, the per-component doc is authoritative for *what a component renders*; this spec is authoritative for *what shape the data takes*. Cross-references use `<doc-name>.md §N` or `<file>.md`.

**Anchor date.** `TODAY = 2026-05-11`. Every relative computation in the spec anchors here.

---

## How to use this spec

You are authoring CSV (or TSV) tables that feed six React compositions. The spec is the rulebook; the components are the consumers.

1. **§ Fiscal calendar** (below) anchors every quarter label. Don't invent your own.
2. **§ Entity map** (below) shows what tables exist and how they connect. Build the FK graph before you populate rows.
3. **`01-taxonomies.md`** holds the closed enums. Do not add values. If you think one is missing, surface it in `05-open-items.md` and stop.
4. **`02-entities.md`** defines every column. Required columns must be populated for every row; optional columns may be blank. Worked examples show non-obvious field interactions.
5. **`03-derivations-and-invariants.md`** holds the rules. If you author `lastActivityDaysAgo = 15`, the components render that account as `caution`. Use the rules to *intentionally* place rows in the bucket you want. Hard invariants in the same file are non-negotiable.
6. **`04-scale-and-reference.md`** is row counts + verbatim reference lists. Copy from these rather than inventing.
7. **`05-open-items.md`** is where to flag anything that didn't fit. Don't paper over a gap — surface it.

---

## Glossary

Industry and PANW-internal terms. One sentence each.

| Term | Definition |
|---|---|
| **TCV** | Total Contract Value. Summed value of all active contracts on an account or (account, product). |
| **ACV** | Annual Contract Value. The value of one year of a subscription contract. |
| **IACV** | Incremental ACV. The year-over-year change in ACV (positive = growth, negative = downsell). |
| **RPO** | Remaining Performance Obligation. Contracted revenue that has not yet been recognized; sits on the balance sheet. |
| **EBC** | Executive Briefing Center event. On-site or virtual exec engagement (briefing, business review, roadmap session). |
| **ASR** | Account Strategic Review. The AE's strategic plan document for the account, refreshed periodically. |
| **PS** | Professional Services. Implementation / integration engagements PANW sells alongside product. |
| **POV** | Proof of Value (also "Proof of Concept" / PoC). A scoped trial deployment to validate the solution before purchase. |
| **AE** | Account Executive. The PANW seller assigned to the account. |
| **Apex** | The top-level parent account in PANW's account hierarchy. Multiple child accounts can roll up to one apex. |
| **QBR** | Quarterly Business Review. A formal quarterly sync between the AE/PANW team and the customer. |

---

## Fiscal calendar & quarters

PANW fiscal year runs **August → July**. FY26 = Aug 2025 – Jul 2026. FY27 = Aug 2026 – Jul 2027.

Anchored to `TODAY = 2026-05-11`:

| Quarter label | Calendar window      | Relative tag       |
|---------------|----------------------|--------------------|
| Q3FY26        | Feb 2026 – Apr 2026  | PQ (previous)      |
| **Q4FY26**    | May 2026 – Jul 2026  | **CQ (current)**   |
| Q1FY27        | Aug 2026 – Oct 2026  | NQ (next)          |
| Q2FY27        | Nov 2026 – Jan 2027  | NQ+1               |
| Q3FY27        | Feb 2027 – Apr 2027  | NQ+2               |
| Q4FY27        | May 2027 – Jul 2027  | NQ+3               |

The **4-quarter renewal window** referenced by Account Panel and Account Table is `CQ` through `Q3FY27` inclusive — i.e. May 2026 through Apr 2027.

The **Plan Summary sparkline** spans 7 quarters centered roughly on CQ: `Q1FY26, Q2FY26, Q3FY26, Q4FY26, Q1FY27, Q2FY27, Q3FY27`. The current quarter is rendered with emphasis; past quarters are historical; future quarters are projected.

Quarter labels are written exactly as `Q4FY26` (no spaces, FY uppercase, two-digit year). The relative tags (`CQ`, `PQ`, `NQ`, `NQ+1`) are derived in code from the anchor — do not author them on rows.

---

## Entity map

```
Account ────┬──── Opportunity (FK: accountId)
            ├──── Contact (FK: accountId)
            ├──── EBC (FK: accountId)
            ├──── InstallBaseRecord (FK: accountId × productId)
            ├──── HealthTrendPoint (FK: accountId × monthOffset)
            └──── SalesPlayInstance (FK: accountId × playId)
                                         │
SalesPlay (catalog) ─────────────────────┘

ForecastHistoryPoint (FK: quarter × scopeKey)   ← Plan Summary sparklines, no FK to Account
Product (catalog) ──────────────────────────────  referenced by InstallBaseRecord, Opportunity.productAllocations
```

There is no separate "AE" or "user" table. The Apex relationship is denormalized as a string on each Account row for now — see `05-open-items.md`.
