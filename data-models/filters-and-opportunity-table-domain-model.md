# Filters & Opportunity Table — Domain Model

Reverse-engineered from Figma section **"Filter Components"**
File: `JMt3PaSmjGV4fZqMKjbh4p` · Section node: `22007:100716`
([Figma link](https://www.figma.com/design/JMt3PaSmjGV4fZqMKjbh4p/Unified-Experience--Sep-Sprint-?node-id=22007-100716))

> **Why this section matters most for the data model:** every filter chip is a *materialized enum*. The list of filters IS the list of fields the Opportunity Table treats as queryable, and each chip's options are the canonical value-set for that field. This is the cleanest source of truth in the whole file for what "an opportunity" is in PANW's GTM model.

> **Cross-reference:** the local composition [poc-exploration/src/compositions/opportunity-table.stories.tsx](poc-exploration/src/compositions/opportunity-table.stories.tsx) is the enhanced engineering build of the same surface. Where the Figma filters and the local code disagree, the Figma is the spec. Differences are flagged inline.

Tagging: **[C]** confirmed by variant or visible enum; **[I]** inferred; **[?]** unclear.

---

## Section 1 — The Opportunity Table as a query surface

The Opportunity Table is the rep's primary "list of all my deals" view. It composes:

- **Search** (free text) — placeholder `account, quote id, contact, product…` (per local code) — implies the search index spans Account name, quote IDs, Contact names, Product names.
- **Sort flyout** — single-select sort by one of ~9 fields (see §3).
- **A horizontal stack of Filter Chips**, one per queryable dimension. Each chip opens a flyout list of checkboxes (or a custom widget for tree / range / matrix cases).
- **Counts on the right** ("47 deals · $12.4M ARR") — recompute as filters apply. **[C]**
- **Result table** with a tag-heavy row layout (multi-line opp name + product cluster + logistics tags + risk/health tags + value).
- **Pagination** at the bottom.

The filter set is **the schema the rep can pivot on**. Most of these dimensions are also fields on the entity itself.

---

## Section 2 — Filter Chips, by category

### A. Time / temporal filters

#### Time Period (`Chip Filters/Time Period`)
- Values **[C]**: `Q4FY25`, `Q1FY26`, `Q2FY26` (sample). Inferred to be a rolling list of fiscal quarters. **[I]**
- Local code calls this `quarter` with `Q1 FY26 … Q4 FY26`. **[C]** alignment.
- Multi-select via checkbox.
- Mapped domain field: `Opportunity.closeDate` bucketed into fiscal quarters. **[I]**

#### Last Activity (visible in Filter Sort and one variant of Time Period chip)
- Values **[C]**: `0–7 days`, `8–14 days`, `15–30 days`, plus `All`.
- Mapped domain field: `Opportunity.lastActivity` (relative-time field).

#### Close Date
- Surfaced as a sort key and a Filter Sort entry. **[C]**
- Mapped to `Opportunity.closeDate` (absolute date).

> **Observation:** Time Period, Last Activity, Close Date are three separate *temporal lenses* on the same opp. Time Period asks *"when will it close?"*, Last Activity asks *"when did we last touch it?"*, Close Date is the precise field underlying Time Period.

---

### B. Product taxonomy

#### Product (`Chip Filters/Product`)
This is a **two-level tree filter** — the only filter that's not a flat checkbox list. Local code (`opportunity-table.stories.tsx:231-257`) hand-rolls a tree-with-checkboxes widget because the design system's `Filter` is flat-only.

**Confirmed product hierarchy [C]:**

| Family (level 1) | Products (level 2) |
|---|---|
| **Firewall** | PA Series · VM Series |
| **CDSS** | PA Series Attached · PA Series Support · FW Data Lake |
| **SASE** | Prisma Access · Prisma SD-WAN |
| **Cortex & Cloud** | Cortex XDR+ · Cortex XSOAR · Xpanse · XSIAM · Qradar · Cortex & Cloud (leaf) |
| **Unit 42** | Reactive · Proactive |

> **Family naming reconciliation:** the Sales Play section names families `FW & CDSS / SASE / Cortex Cloud / Unit 42` (4 families). The Product filter splits FW & CDSS into **Firewall** and **CDSS** as separate families (5 families). **[C]** This is an important model-level distinction:
> - **Sales Play Family** is a *go-to-market grouping* (4 families).
> - **Product Family** is a *product taxonomy* (5 families).
> They are **not the same entity**. Sales plays span products; products span sales plays. *(Worth being explicit about in code.)*

> **Unit 42 nuance:** at the Sales Play level, plays are named `Unit 42` and `Unit 42 No Cost Retainer`. At the Product level, the children are `Reactive` and `Proactive` — the two service-engagement modes for the Unit 42 incident-response practice. **[I]** based on standard PANW packaging.

---

### C. Opportunity attributes

#### R/U/NN (`Chip Filters/R/U/NN`) — **Opportunity Type**
- Values **[C]**: `All`, `Renewals`, `Upsell`, `Net New`.
- **R/U/NN** = **R**enewal / **U**psell / **N**et **N**ew. **[C — SME]**
- Same field as `Opportunity.type` in local code. **[C]**
- This is also what `RUNN breakdown` referred to in the AI prompt suggestion ("Give me a RUNN breakdown for deal") — it's asking the LLM to break the deal down by the three opportunity-type buckets. **[C — SME]**

#### Forecast Category (`Chip Filters/Forecast Category`)
- Values visible in chip **[C]**: `All`, `Commit`, `Best Case`, `Pipeline`.
- Canonical full enum **[C — SME]**: `Pipeline | Best Case | Commit | Closed`.
- The chip omits `Closed` — likely intentional (you don't filter the active pipeline view by closed deals). *(Design intent, not a bug.)*
- Local code adds `closed` and `closed lost` as filter values. *(Alignment question.)*

#### Sales Stage (`Chip Filters/Sales Stage`)
- Chip currently shows **[C]**: `All, Discovery, Solution, Negotiate, Purchase`.
- **Canonical 5-stage named enum [SME-confirmed anchors + provisional names, 2026-05-08]:**
  | # | Name | Status |
  |---|---|---|
  | 1 | **Discovery** | SME-confirmed anchor |
  | 2 | **Solutioning** | provisional (chip shows `Solution`) **[?]** |
  | 3 | **Technical Validation** | SME-named |
  | 4 | **Active POV** | SME-named |
  | 5 | **Negotiate** | SME-confirmed anchor |
- After stage 5, the opportunity transitions to `Closed` or `Lost` (not stages themselves).
- The chip's `Purchase` label appears to be a stray and should be dropped. The chip is also missing `Technical Validation` and `Active POV`. *(Designer fix to expand the chip to all 5 names.)*

#### Deal Size (`Chip Filters/Deal Size`)
- Custom widget: **range slider** with `Min` / `Max` numeric inputs. Sample range `$0 – $20,000,000`. **[C]**
- Local code substitutes a banded checkbox list (`under $100K / $100K–$500K / $500K–$1M / over $1M`). The Figma range slider is the more flexible spec. *(Alignment question.)*
- Mapped domain field: `Opportunity.amount`.

---

### D. Health filters (3-axis)

PANW's health model has **three axes**, all using the same `Healthy / At-Risk / Critical` enum. The filter section confirms this.

| Health axis | Values (chip) | Notes |
|---|---|---|
| **Account Health** (rolled-up) | `All / Critical / At-Risk / Healthy` | composite |
| **Technical Health** | `All / Healthy / At-Risk / Critical` | "is the product working?" |
| **Adoption and Deployment** | `All / Healthy / At-Risk / Critical` | "are they using it?" |
| **Value Realization** | `All / Healthy / At-Risk / Critical` | **NEW** — "are they getting business value?" **[C]** |
| **Customer Engagement** | `All / Healthy / At-Risk / Critical` | **NEW** — "is the customer responsive?" **[C]** |

> **Important update to the Account Health entity:** the Account Health Snapshot in the prior section showed only 3 of these axes (Overall, Technical, Deployment & Adoption). The Filter section reveals **two additional health dimensions**: **Value Realization** and **Customer Engagement**. These should be added to the `AccountHealthAssessment` entity. **[C]**

There is also a **combined Account Health chip** (`Chip Filters/Account Health`, node `16098:73017`) that exposes a 3-row × 4-cell matrix-style picker (Account Health / Technical Health / Deployment and Adoption) — for filtering on multiple axes at once. **[C]**

---

### E. Risk taxonomies — *the most domain-rich finding*

There are **two** risk-category filter chips, both labeled "Other Risks" in the UI but distinct entities behind the scenes:

#### E1. Opp Risk Category (`Chip Filters/Opp Risk Category`)
Risks attached to a specific **Opportunity**. These are essentially deal-execution flags — *"what's threatening this specific deal from closing?"*

**Full enum [C]:**
| Flag | Meaning (inferred from name) |
|---|---|
| `No Risks` | the green/clean state |
| `Lacking exec engagement or support` | no executive sponsor on the customer side |
| `No design-of-record` | technical solution not formally agreed |
| `No Secured technical win` | tech evaluation not closed |
| `No Partner selected or finalized` | channel partner gap |
| `Mandatory PS was removed` | Professional Services scope cut — risk to delivery |
| `Quotes pending approval` | discount / non-standard terms still in approval flow |
| `Budget conversation not scheduled or complete` | no confirmed buying budget |
| `Term length greater than 3 years or without financing/billing plans being proposed` | non-standard contract terms |
| `No activity for last 30 days` | gone silent |

#### E2. Account Risk Category (`Chip Filters/Account Risk Category`)
Risks attached to the **Account itself** — broader-than-deal flags about the customer relationship.

**Full enum [C]:**
| Flag | Meaning (inferred) |
|---|---|
| `No Risks` | clean |
| `No Pipeline in CQ + Next 4Q` | no opportunities forecast in current + next 4 quarters |
| `No EBCs in last year` | no Executive Briefing Center engagements |
| `Not Platformized` | customer hasn't adopted the PANW platform play (cross-product consolidation) |
| `POVs without progression` | account has Proof of Value engagements running but they aren't advancing toward a closed deal — POV stalled. *(Renamed from `Active POVs` per SME 2026-05-08; the bare "Active POVs" label was misleading because POVs themselves are positive — it's the lack of progression that's a risk.)* **[C — SME]** |
| `No ASR / Stale ASR` | no Account Strategy Review, or it's outdated **[I]** |
| `No customer success plan` | no formalized success plan |

> **Modeling implication:** the `Other Risks: ▲ N` badge on Deal Tile and Account Tile is a **count of triggered risk flags** drawn from these enums. It's not a single field — it's a derived count over `Opportunity.risks[] ⊆ OppRiskCategory` (for Deal Tile) and `Account.risks[] ⊆ AccountRiskCategory` (for Account Tile).

> **The risks are checkbox-multi-selectable.** That confirms each Opportunity / Account can carry multiple risk flags simultaneously, not a single risk state. The UI count rolls them up.

---

## Section 3 — Sort vocabulary

**Canonical sort vocabulary [SME-confirmed 2026-05-08, local code is the spec]:**
1. value
2. opportunity name
3. close date
4. last active
5. deal stage
6. opportunity type
7. stage
8. account health
9. risk factor count

Local code (`opportunity-table.stories.tsx:96-106`) implements all 9 as a single-select flyout. **[C]**

The Figma `Filter Sort` chip (node `22006:58850`) currently shows only 3 (`Deal Size, Last Activity, Close Date`) — this is **not** the spec, it's an earlier-iteration miniaturization. The Figma chip should be expanded to match the 9-option set. *(Designer follow-up.)*

---

## Section 4 — Search behaviour

The `Opportunity Filters` composite (node `13203:88841`) has two states: `Search Open=No` (filter chips visible, search collapsed to icon) and `Search Open=Yes` (full-width search input replaces the chip row). **[C]**

This is a space-saving pattern: the filter row and the search row share horizontal space; the rep toggles between filtering and searching.

---

## Section 5 — Domain entities surfaced or refined here

The filter section doesn't introduce many *new* entities, but it **confirms and enriches** several existing ones:

### Update to `Opportunity` (refining prior section)
Add fields based on what's filterable:
- `risks: OppRiskCategory[]` (multi-select)
- `productLines: ProductFamily[]` and `products: Product[]` (multi-select; tied to the Product tree)
- All five `health` axes when scoped to opp (Technical, Deployment & Adoption, Value Realization, Customer Engagement, plus the Account-level rollup that bleeds through).

### Update to `Account` (refining prior section)
- `risks: AccountRiskCategory[]` (multi-select)
- `region`, `territory`, `assignedRep` — confirmed by SME as analytical pivots (not in any filter chip seen here, but they're real fields used by leadership views).

### New entity: `OppRiskCategory` (enum, 10 values)
See §E1 above. Each value is a named risk flag with an icon. Treat as a closed enum.

### New entity: `AccountRiskCategory` (enum, 7 values)
See §E2 above. Closed enum.

### New entity: `ProductFamily` and `Product`
The product tree (5 families × 2–6 products each) is a stable taxonomy. Should be modeled as two related tables — `ProductFamily` (Firewall / CDSS / SASE / Cortex & Cloud / Unit 42) and `Product` (the 17 leaves). **[C]**

> Distinct from `SalesPlayFamily` — see Product taxonomy section above.

### Refinement to `AccountHealthAssessment` (5 axes, not 3)
- Overall (rollup)
- Technical Health
- Adoption and Deployment
- **Value Realization** (new)
- **Customer Engagement** (new)

---

## Section 6 — Resolved + remaining questions

**Resolved 2026-05-08**
1. ~~**Sales Stage chip vs canonical 5-stage enum**~~ — confirmed: 5 named stages (`Discovery → Solutioning → Technical Validation → Active POV → Negotiate`). Stage 2's name (`Solutioning`) is provisional. Chip should be expanded to all 5 names; `Purchase` chip label is stray. *(Designer fix.)* **[Resolved]**
3. ~~**Account Risk: `Active POVs`**~~ — renamed to `POVs without progression`. The risk is stalled POVs, not the existence of POVs. **[Resolved — SME]**
7. ~~**Sort vocabulary**~~ — local code's 9-option flyout is the spec. Figma 3-chip is too narrow. **[Resolved — SME]**

**Still open**
2. **Forecast Category chip omits `Closed`** — intentional (active-pipeline view) or oversight?
4. **`No ASR / Stale ASR`** — confirm ASR expansion (Account Strategy Review?).
5. **`Not Platformized`** — does this mean the customer is single-product / hasn't adopted PANW's multi-product platform pitch?
6. **Risk taxonomies — open for extension?** — are these closed enums or will more flags be added over time?
8. **Deal Size widget** — Figma uses a min/max range; local code uses banded checkboxes. Spec?
9. **Product filter: `Cortex & Cloud` leaf inside `Cortex & Cloud` family** — "unspecified" catch-all leaf? Confirm.
10. **Product family count: 4 vs 5** — Sales Play uses 4 families; Product filter uses 5 (splits FW & CDSS into separate Firewall + CDSS families). *(Already documented; flagging for the team.)*
11. **Stage 2 canonical name** — `Solutioning` is my working name based on the chip's `Solution` label. SME to confirm or replace with the real Salesforce-canonical name when known.

---

## Section 7 — Component reference

### `Opportunity Filters` — `13203:88841`
- Composite: search input + filter chip row.
- Variant prop **[C]**: `Search Open` = `Yes | No`.
- When closed: chip row visible. When open: full-width search input replaces the chips.

### `Filter Sort` — `22006:58850`
- Sort picker. 3 chip options visible: Deal Size, Last Activity, Close Date. **[C]**
- No variant props in metadata.

### `Chip Filters/*` (12 chips)
Each follows the same flyout-with-checkboxes pattern (or a custom widget for tree / range / matrix cases). Variant props per chip: typically `Open=Yes/No` (closed chip vs open flyout). Some have additional variant props captured in their layouts:
- `Time Period` — 3 layout variants (different option counts seen)
- `Product` — tree variant (custom widget, no DS primitive)
- `Deal Size` — range-slider variant
- `Account Health` (matrix) — 3-row × 4-cell selector
