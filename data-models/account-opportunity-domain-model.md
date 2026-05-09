# Account & Opportunity — Domain Model

Reverse-engineered from Figma section **"Account and Opportunity Components"**
File: `JMt3PaSmjGV4fZqMKjbh4p` · Section node: `21950:53087`
([Figma link](https://www.figma.com/design/JMt3PaSmjGV4fZqMKjbh4p/Unified-Experience--Sep-Sprint-?node-id=21950-53087))

Companion to the Sales Play domain model. Where this section reuses Sales Play entities, the original definition is referenced rather than re-expanded.

Tagging: **[C]** = confirmed by variant property, code, or directly visible text. **[I]** = inferred. **[?]** = unclear / SME input needed.

---

## Section 1 — Entity Catalog

### 1. Account

The customer/prospect company. Top-level record — most other entities belong to an Account. (Was inferred-only in the prior section; here it has its own tile.)

**Fields**
| Field | Type | Source | Sample |
|---|---|---|---|
| `name` | string | tile header | "Account Name" placeholder; "Dade Paper Co.", "Prime Dynamics" elsewhere **[C]** |
| `lifetimeValue` | currency | tile header subtitle "$4.7M in lifetime value" | **[C]** |
| `pipelineCQ` | currency | "$1,765,487 pipeline in CQ" — **C**urrent **Q**uarter pipeline | **[C]** label, **[I]** "CQ" expansion |
| `pipelineQ2FY26` / `pipelineQ3FY26` | currency (per-future-quarter) | shown when tile is expanded ("$100,108 pipeline in Q2FY26", "$75,982 pipeline in Q3FY26") | **[C]** |
| `activePOVs` | int | "Active POVs: 4" — **P**roof **o**f **V**alue engagements | **[C]** label, **[I]** expansion |
| `ebcsInLastYear` | int | "EBCs in the last year: 12" — **E**xecutive **B**riefing **C**enter visits | **[C]** label, **[I]** expansion |
| `accountHealth` | enum `Healthy \| At-Risk \| Critical` | sample "Critical" pill in red, "At-Risk" in yellow | **[C]** 2 of 3 visible; `Healthy` inferred from peer enum (see §6) |
| `technicalHealth` | enum (same scale) | only visible in expanded tile | **[C]** label |
| `deploymentAndAdoption` | enum (same scale) | only visible in expanded tile | **[C]** label |
| `otherRisks` | int | "Other Risks: ▲ 7" red badge | **[C]** label, **[I]** semantics — likely a count of warning items elsewhere in the system |
| `aiInsightAvailable` | boolean | sparkle/AI icon in top-right of tile | **[I]** |

**Actions**
- Expand / collapse tile (chevron icon) — variant `Open=Yes/No` **[C]**
- "Account Health" link → opens Account Health detail **[C]**
- Tile name is a link → likely Account profile **[C]**

**Where it appears**
- `Account Tile` (`13203:89441`) — list/card view
- Header of every snapshot/modal in this section ("[Account Name]")
- Customer Estate page header (`16902:45621` shows "Prime Dynamics")

---

### 2. Opportunity (extended from prior section)

Already defined in the [Sales Play domain model](./sales-play-domain-model.md) (entity #8). New fields surfaced here:

| Field | Type | Source | Sample |
|---|---|---|---|
| `account` | Account (FK) | Deal Tile shows "Dade Paper Co." | **[C]** |
| `opportunityNumber` | string (`Q-######`) | Deal Tile: "Q-100874" | **[C]** |
| `quoteNumber` | string (6-digit) | Deal Tile: "001239" | **[C]** |
| `isPrimaryQuote` | boolean | star icon next to quote number; tooltip "Primary Quote" **[C]** (was inferred in prior section, now confirmed) |
| `amount` | currency | Deal Tile: "$750,000" | **[C]** |
| `closesIn` | duration string | "closing in 38 days" | **[C]** |
| `forecastCategory` | enum | green pill "Commit" — see new enum below | **[C]** |
| `stage` | enum | "Stage 5 – Negotiation/Review" — full stage list now partly visible | **[C]** |
| `productLines` | string[] | "CDSS, Cortex, and 2 more" with info icon | **[C]** label, **[I]** the info icon expands to a tooltip listing all |
| `accountHealth` | derived from Account | Deal Tile shows "At-Risk" | **[C]** |
| `otherRisks` | int | Deal Tile: "▲ 4" | **[C]** |
| `lastActivity` | string + relative date | "Last Activity: Customer Engagement (12 days ago)" | **[C]** |
| `aiInsightAvailable` | boolean | sparkle icon top-right | **[I]** |

**Enum: `ForecastCategory`** **[C — SME-confirmed]**
- `Pipeline` · `Best Case` · `Commit` · `Closed`
- Rep-assigned tag based on AE judgment (not auto-derived). `Various` (seen in Sales Play modal) is an aggregate label across multiple linked opps, not a value.

**Enum: `Opportunity.type` — R/U/NN** **[C — SME-confirmed]**
- `Renewal` · `Upsell` · `Net New` (acronym **R**enewal / **U**psell / **N**et **N**ew)
- This is the same field that local code (`opportunity-table.stories.tsx:69-83`) calls `OpportunityRow.type` with values `'renewal' | 'net new' | 'upsell'`. Confirmed cross-reference. The Figma filter chip labels it `R/U/NN`. **[C]**

**Enum: `Opportunity.stage`** **[SME-confirmed; canonical names provisional 2026-05-08]**

Five **named** stages (no numbers), then the opp is `Closed` or `Lost`. The numbered "stage 1 – stage 5" form (in Deal Tile and local code) is being deprecated in favor of names per SME direction.

| Stage | Name | Source |
|---|---|---|
| 1 | **Discovery** | SME-confirmed anchor; matches Sales Stage filter chip |
| 2 | **Solutioning** | Provisional. SME knows there's a 2nd stage but not the name. Chip showed `Solution` — using this as the working name. **[?]** confirm |
| 3 | **Technical Validation** | SME-named, position inferred (between Solutioning and Active POV) |
| 4 | **Active POV** | SME-named, position inferred (between Tech Validation and Negotiate) |
| 5 | **Negotiate** | SME-confirmed anchor; matches Sales Stage filter chip |

> **Implication for code:** the local table's `'stage 1' … 'stage 5'` strings should migrate to these names. Tile copy "Stage 5 – Negotiation/Review" should likely become "Negotiate" (or keep the long form as a sub-label). The Sales Stage filter chip should expose all 5 names; the chip's `Purchase` label is likely a stray and should be dropped. *(Coordinated change with designer.)*

**Actions**
- "Snapshot" button → opens the Opportunity Snapshot rail (#7) **[I]**
- Click Q-number / quote-number → likely deep-link to CRM **[I]**
- Hover info icon → product line list tooltip **[I]**

**Where it appears**
- `Deal Tile` (`13036:40141`) — list view of opportunities tied to an Account
- `Opportunity Snapshot` rail (`21727:53758`) — header `[Opportunity Name]` link
- Sales Play modal /01 and /03 (prior section)

---

### 3. Renewal

A subscription renewal record tied to an Account/Opportunity. Has its own workflow: outcome selection + reason capture.

**Fields**
| Field | Type | Source | Sample |
|---|---|---|---|
| `subscriptionEnd` | date | Renewal Snapshot row | "Sept 1, 2025" **[C]** |
| `renewableTCV` | currency | Renewal Snapshot row | "$22.7M" — **T**otal **C**ontract **V**alue eligible to renew **[C]** label, **[I]** TCV expansion |
| `arr` | currency | Renewal Snapshot row | "$7.9M" — **A**nnual **R**ecurring **R**evenue **[C]** label, **[I]** expansion |
| `renewalOutcome` (a.k.a. `disposition`) | enum (see below) | dropdown "Renewal Outcome" / Renewal Disposition Chip | **[C]** |
| `churnDismissalReason` | enum | Required (`*`) field shown only when outcome = Churn | **[C]** required-marker, **[?]** enum values (dropdown shows `Select` + sample `[Reason Entered]`) |
| `competitorReplacement` | enum / FK | Required (`*`) field shown only when outcome = Churn | **[C]** required-marker, **[?]** enum |
| `notes` | long string | textarea | **[C]** |
| `state` | workflow enum (see Renewal Snapshot below) | | **[C]** |

**Enum: `RenewalOutcome` — flagged inconsistency**

The system has at least two parallel naming sets for renewal outcome — **flag for designer**:

| Source | Values |
|---|---|
| `Renewal Disposition Chip` variant prop `disposition` | `Unknown`, `Full Renewal`, `Partial Renewal`, `Churn` **[C]** |
| Disposition Chip's open dropdown menu (screenshot) | `Unknown`, `Full Renewal/Upsell`, `Downsell`, `Churn`, `Displacement (HW Refresh)`, `Duplicate` **[C]** |
| `Renewal Snapshot` variant prop `Outcome Selection` | `Unknown`, `Full`, `Churn` **[C]** |
| `Opportunity Snapshot` rail dropdown | `Full Renewal/Upsell`, `Downsell`, `Churn`, `Unknown` **[C]** (matches the "fly-out" set, no `Partial Renewal`) |

> Best guess at the canonical enum: `Unknown`, `Full Renewal/Upsell`, `Downsell`, `Churn`, `Displacement (HW Refresh)`, `Duplicate`. The chip variants and the snapshot variants are abbreviated/stale subsets. **[I]**

**Workflow states (`Renewal Snapshot.Property 1`)**

The Renewal Snapshot is a **state machine** with these states **[C]**:

| State | Renders | Triggers |
|---|---|---|
| `first step` | Read-only renewal facts + outcome dropdown (Unknown selected) | Default for unstarted renewal |
| `initial value entry` | Form: Churn/Dismissal Reason*, Competitor Replacement*, Notes — only seen for `Outcome=Churn` | Triggered when user picks Churn |
| `final confirmation` | Form with all fields populated; Cancel + Save buttons (Save disabled until required fields filled — observed for Unknown variant where Save is grey) | Just before persistence |
| `final step` | Saved/read-only display of submitted outcome | After save |

`Property 1 × Outcome Selection` = 10 named variants (not all combinations exist). **[C]**

**Implied transitions [I]:**
`first step` →(pick outcome)→ `initial value entry` (only for Churn) → `final confirmation` →(Save)→ `final step`. For non-Churn outcomes, `first step` → `final confirmation` → `final step` (no separate value-entry step required).

**Actions [C]**
- Pick `renewalOutcome` from dropdown
- Fill required reasons (Churn path)
- Save / Cancel
- "Open in Renewal Workspace ↗" — deep-link to a fuller workspace

**Where it appears**
- `Renewal Snapshot` (`21729:55802`) — the multi-state component
- `Renewal Disposition Chip` (`16890:151581`) — compact tag form, e.g. in tables
- Inside `Opportunity Snapshot` rail under `RENEWALS` heading

---

### 4. Install Base

Customer's currently-installed PANW footprint, summarized financially.

**Fields**
| Field | Type | Source | Sample |
|---|---|---|---|
| `tcv` | currency | "TCV: $25.8M" | **[C]** |
| `incrementalACV` | currency | "Incremental ACV: $1.0M" (green when positive) — **A**nnual **C**ontract **V**alue delta | **[C]** label, **[I]** expansion |
| `margin` | percent | "Margin: 12.50%" (green when positive) | **[C]** |
| `rpo` | currency | "RPO: $3.0M" — **R**emaining **P**erformance **O**bligation | **[C]** label, **[I]** expansion |

**Actions**
- "Open Customer Estate" link → opens Customer Estate page (#9) **[C]**

**Where it appears**
- `Install Base Snapshot` (`22012:107418`)
- Inside `Opportunity Snapshot` rail under `INSTALL BASE` heading

---

### 5. Customer Estate Product Line / Product

Product-level breakdown of the customer's purchases.

**Two levels:**

#### 5a. Product Line (also called "product family" elsewhere — **[?]**)
| Field | Type | Source | Sample |
|---|---|---|---|
| `name` | string | tab label in Customer Estate (`16902:45621`) | "Prisma Access", "PA Series", "CDSS" **[C]** |
| `health` | enum `Healthy \| At-Risk \| Critical` | colored pill on tab | **[C]** all 3 values seen |
| `icon` | brand icon | tab leading element | **[C]** |

#### 5b. Product (line item / SKU)
| Field | Type | Source | Sample |
|---|---|---|---|
| `productCode` | string (SKU) | "Product Code" column | "PAN-PRISMA-ACCESS-MU-LCL-ENTERPRISE", "PAN-PRISMA-ACCESS-PREM-SUCCESS", "PAN-PRISMA-ACCESS-PRIV-APPS-SC-QTY", "PAN-PRISMA-ACCESS-MU-DEM", "PAN-PRISMA-ACCESS-SET" **[C]** |
| `productName` | string | "Product Name" column | "Prisma Access Mobile User Lo…", "Prisma Access Premium Succ…", "Prisma Access Private App Ac…", "Prisma Access Mobile User Di…", "Prisma Access Set" **[C]** |
| `purchaseDate` | date (`mm/dd/yyyy`) | "Purchase Date" column | "06/30/2024" **[C]** |
| `quantity` | int | "Quantity" column | 20,000; 6; 200 **[C]** |
| `termStartDate` | date | "Term Start Date" | "07/01/2024" **[C]** |
| `termEndDate` | date | "Term End Date" | "06/28/2027" **[C]** |
| `termMonths` | int | "Term (mos)" column | 36 **[C]** |

**Actions**
- Tab between Product Lines (Prisma Access / PA Series / CDSS) **[C]**
- "View Health ↗" → drill into Product Line health **[C]**
- "Open in Renewal Workspace ↗" **[C]**
- "View More ↓" — paginate / expand the product list **[C]**
- "Open in Salesforce ↗" — top-of-page deep link **[C]**

**Where it appears**
- `Customer Estate Content` (`16902:42777`) inside Prime Dynamics page (`16902:45621`)

---

### 6. Account Health Assessment

Composite health view across (Account × Product) — surfacing where deployment risk lives.

**Fields**
| Field | Type | Source | Sample |
|---|---|---|---|
| `overallHealth` | enum `Healthy \| At-Risk \| Critical` | "Overall Health: Critical" | **[C]** |
| `technicalHealth` | enum (same) | "Technical Health: Critical" | **[C]** |
| `deploymentAndAdoption` | enum (same) | "Deployment and Adoption: At-Risk" | **[C]** |
| `productHealth` | (Product × {technicalHealth, deploymentAdoption})[] | "Health of products in this deal:" table | **[C]** |

**Sample product-health rows [C]:**
| Product | Technical Health | Deployment & Adoption |
|---|---|---|
| CDSS | Healthy | Healthy |
| Cortex XSOAR | Critical | At-Risk |
| Prisma Cloud | Healthy | Healthy |

**Enum: `HealthStatus`** = `Healthy` (green) `\|` `At-Risk` (yellow) `\|` `Critical` (red). **[C]** all 3 values directly visible.

**Actions**
- "Open Account Health ↗" — link to a dedicated Account Health workspace **[C]**

**Where it appears**
- `Account Health Snapshot` (`22012:107417`)
- Inside `Opportunity Snapshot` rail under `ACCOUNT HEALTH` heading
- Surface-level pills on `Account Tile` and `Deal Tile`
- Health badge on Customer Estate Product Line tabs

---

### 7. Opportunity Snapshot (rail / panel)

A composed right-rail panel attached to an Opportunity. Aggregates everything the rep needs to act on the deal in one view. **No own data fields** — it's a layout entity composing the others.

**Composition (top → bottom) [C]:**
1. Header: `[Account Name]` (display) + `[Opportunity Name]` (link) + close `×`
2. Opportunity selector dropdown (rounded) — switch between deals on the same account
3. AI prompt input ("Learn more about this deal…") with send button
4. `RENEWALS` section — Renewal Snapshot
5. `INSTALL BASE` section — Install Base Snapshot
6. `SALES PLAY` section — Sales Play Snapshot
7. `ACCOUNT HEALTH` section — Account Health Snapshot
8. `SUGGESTIONS` section — Deal-Specific AI Prompts (#8)

---

### 8. Deal-Specific AI Prompt (Suggestion)

A prebuilt AI prompt the rep can invoke against the deal context.

**Fields**
| Field | Type | Source | Sample |
|---|---|---|---|
| `prompt` | string | suggestion card text | "Show me the next steps documented for this deal.", "Give me a RUNN breakdown for deal.", "Create relevant sales documents for this deal.", "Show me the product breakdown for this deal." **[C]** |
| `icon` | static "AI sparkle" | yellow sparkle prefix | **[C]** |

> "RUNN breakdown" — domain term, **[?]** likely a SFDC opportunity-qualification methodology (Reasons to buy / Urgency / Need / Notes? — speculative). **[?]**

**Actions**
- Click card → run the prompt against the deal context **[I]**

**Where it appears**
- `Deal Specific AI Prompts` (`22012:107415`)
- Inside `Opportunity Snapshot` rail under `SUGGESTIONS` heading

---

### 9. Sales Play Family — small-rail variant

Reuses **Sales Play Family** entity from the [Sales Play domain model](./sales-play-domain-model.md). Same 4 families: FW & CDSS, Cortex Cloud, SASE, Unit 42. **[C]**

In this section, the family is shown as a vertical accordion list rather than a horizontal matrix. Each row shows:
- `family.name` + chevron (`Open=Yes/No`) **[C]**
- A small alert badge (e.g. "▲ 1") indicating the count of attention-needed Sales Plays inside the family **[I]**

**When opened**, the body lists `Sales Play` rows with the same status pills as the prior section (Sales Play Status pill — entity #4 of prior model). Confirmed contents of the open accordions:

| Family | Open content sample | Status pill icon | Value |
|---|---|---|---|
| FW & CDSS | Hardware Refresh | Not Touched (red !) | $2,500 |
| | Fortinet Displacement | Deferred (calendar) | $123,456 |
| | SWFW Acceleration | Closed Won (green ✓) | $123,456 |
| Cortex Cloud | XSIAM Splunk Takeout | Not Touched | $24,900 |
| SASE | GP to Prisma Access | Not Touched | $38,500 |
| | PAB Existing PA Upgrade | Pitched (headphones) | $15,780 |
| | PAB for Partners | Interested (thumbs-up) | $95,800 |
| Unit 42 | Unit 42 | Closed Lost (gray ⨯) | $123,456 |

This **confirms** the icon→category mapping inferred in the prior section. **[C]**

**Where it appears**
- `SalesPlay Accordions` (`21764:59629`)
- Inside `Sales Play Snapshot` (`22012:107416`) → which is inside `Opportunity Snapshot` rail under `SALES PLAY` heading

---

## Section 2 — Component Reference

### `Account Tile` — `13203:89441`
- Represents **Account** (entity #1) in card form.
- Variant props **[C]**: `Open` = `Yes | No`; `State` = `Static | Hover` (only `Open=No, State=Hover` and the two static variants are present — possibly missing `Open=Yes, State=Hover`, **flag**)
- Composes: title link, lifetime-value subtitle, pipeline values, KPIs, health pill(s), Other Risks badge, AI sparkle, "Account Health" link.
- Expanded variant additionally shows future-quarter pipeline rows and `Technical Health` + `Deployment and Adoption` pill rows.
- Appears in: account list views (assumed; this section only shows the component itself).

### `Base/KPI` — `21177:52170`
- Tiny atom: a labeled stat. Sample seen: `Total Opportunities = 200`. **[C]**
- No variant props in the metadata.
- Used as a building block elsewhere in the product **[I]**.

### `Deal Tile` — `13036:40141`
- Represents **Opportunity** (entity #2) in card form.
- Variant prop **[C]**: `Property 1` = `Static | Hover`
- On hover, surfaces a "Snapshot" CTA pill that opens `Opportunity Snapshot`. **[C]**
- Composes: account name link, Q-number link, primary-quote star, quote-number link, amount, time-to-close, ForecastCategory pill, stage label, product-line summary with info tooltip, AI sparkle, Account Health pill, Other Risks badge, Last Activity label.

### `Tooltip` (instance `13036:43574`)
- Standalone DS tooltip. Sample copy here: **"Primary Quote"** — clarifying the star icon on the Deal Tile.

### `Renewal Disposition Chip` — `16890:151581`
- Represents `Renewal.renewalOutcome` in compact tag form.
- Variant props **[C]**: `Disposition` = `Unknown | Full Renewal | Partial Renewal | Churn`; `Open` = `Yes | No`
- When `Open=Yes`, exposes a dropdown with options `Unknown | Full Renewal/Upsell | Downsell | Churn | Displacement (HW Refresh) | Duplicate` — **note enum mismatch with the variant prop**, see Renewal entity above.

### `Renewal Snapshot` — `21729:55802`
- Represents the **Renewal workflow** (entity #3) state machine.
- Variant props **[C]**:
  - `Property 1` = `first step | initial value entry | final confirmation | final step`
  - `Outcome Selection` = `Unknown | Full | Churn`
- Only 10 of 12 combinations exist (no `(initial value entry, Unknown)` or `(initial value entry, Full)` — the value-entry stage is exclusive to Churn). **[C]**
- Each variant shows: section title `RENEWALS`, the 4 facts (Subscription End, Renewable TCV, ARR, Renewal Outcome), and stage-appropriate fields (read-only / dropdown / form / saved).

### `SalesPlay Accordions` — `21764:59629`
- Vertical-rail variant of the **Sales Play Family / Sales Play / Sales Play Status** trio (entities defined in prior model).
- Variant props **[C]**: `Family` = `FW & CDSS | Cortex Cloud | SASE | Unit 42`; `Open` = `yes | no`
- Open variant body holds rows of (Sales Play name + Sales Play Status pill).
- Compact rail equivalent of the matrix in the Sales Play section.

### `Install Base Snapshot` — `22012:107418`
- Represents **Install Base** (#4). No variant props.
- Composition: section title `INSTALL BASE`, 4 metric rows (TCV, Incremental ACV, Margin, RPO), `Open Customer Estate ↗` link.

### `Sales Play Snapshot` — `22012:107416`
- Composition wrapper around `SalesPlay Accordions` with section title `SALES PLAY` and `Open in Sales Play Console ↗` link.

### `Account Health Snapshot` — `22012:107417`
- Represents **Account Health Assessment** (#6). No variant props.
- Composition: section title `ACCOUNT HEALTH`, 3 health pill rows (Overall / Technical / Deployment and Adoption), product-health 3-column table, `Open Account Health ↗` link.

### `Deal Specific AI Prompts` — `22012:107415`
- Represents collection of **Deal-Specific AI Prompt** cards (#8).
- Composition: `SUGGESTIONS` title + 4 sample prompt cards.

### `Opportunity Snapshot` — `21727:53758`
- Top-level rail panel (#7). Composes Renewal Snapshot, Install Base Snapshot, Sales Play Snapshot, Account Health Snapshot, Deal Specific AI Prompts.

### `Customer Estate Content` (page) — `16902:45621`
- Account-level page. Header `Prime Dynamics` (= Account name) + `Open in Salesforce ↗` link + close `×`.
- Tabs: Product Lines (each with health pill).
- Body: `Customer Estate Content` instance (`16902:42777`) — `Purchase Data Information` table of Products (entity #5b) + `View More ↓`.
- Per-tab actions: `View Health ↗`, `Open in Renewal Workspace ↗`.

---

## Section 3 — Resolved by SME (2026-05-08) + remaining gaps

**Resolved**
1. ~~**Renewal outcome canonical enum**~~ — confirmed: the 6-value dropdown is canonical: `Unknown | Full Renewal/Upsell | Downsell | Churn | Displacement (HW Refresh) | Duplicate`. Chip variant prop and Renewal Snapshot variant prop are both stale. *(Designer fix.)* **[Resolved — SME]**
2. ~~**`Partial Renewal`**~~ — not part of the canonical enum; chip variant is stale. **[Resolved — SME]**
4. ~~**`RUNN`**~~ — stands for **R**enewal / **U**psell / **N**et **N**ew. It's the `Opportunity.type` enum, not a separate concept. **[Resolved — SME]**
9. ~~**`forecastCategory` enum**~~ — `Pipeline | Best Case | Commit | Closed`. Rep-assigned. **[Resolved — SME]**
10. ~~**`Opportunity.stage` enum**~~ — 5 numbered stages, then Closed or Lost. **[Resolved — SME]**

**Still open**
3. **`CQ` / `Q2FY26` / `Q3FY26` notation** — assumed `CQ` = current quarter; quarterly pipeline view rolls forward. Confirm.
4. **Acronym expansions** — POV (Proof of Value? Plan of Value?), EBC (Executive Briefing Center?), TCV, ACV, ARR, RPO. Most are SaaS-standard but worth pinning down PANW's exact definitions.
5. **`Other Risks: ▲ N`** — confirmed by Filter doc as a count drawn from two risk taxonomies (Opp Risk Category + Account Risk Category). Each risk is a named flag (e.g. `No design-of-record`, `No EBCs in last year`). See Filter doc for full list.
6. **AI sparkle icon** on tiles — semantics? Always-on or "AI insights available"?
7. **`Account Tile` missing variant** — `Open=Yes, State=Hover` not in Figma. *(Designer fix.)*
8. **`Snapshot` button on Deal Tile** — confirm opens the Opportunity Snapshot rail.
11. **Renewal Snapshot Save-disabled gate** — confirm the rule.
13. **Account Health 3rd state** (`Healthy` at account scope) — never visualized at top-level in screenshots, only inferred from peer enums.
14. **Customer Estate vs Install Base** — same data, two views? Confirm.
15. **Product Line `health`** — derived from Product-level rows or independently tracked?

---

## Section 4 — Cross-reference to local code

The composition at [poc-exploration/src/compositions/opportunity-table.stories.tsx](poc-exploration/src/compositions/opportunity-table.stories.tsx) is an **enhanced flat-table view** of the same Opportunity entity captured here in `Deal Tile` form. Field alignment:

| Domain field | Deal Tile | `OpportunityRow` (local) | Notes |
|---|---|---|---|
| `name` | top line | `oppName` | local has full long-form names (e.g. "Prisma Access annual renewal with global bandwidth upgrade") |
| `account.name` | top line link | `account` | secondary line under `oppName` |
| `quoteNumber` | star + 6-digit | `quoteId` (e.g. `Q-0307`) | local merges Q-number and quote-number — **flag** for code/Figma alignment |
| `type` (R/U/NN) | not shown on tile | `type: 'renewal' \| 'net new' \| 'upsell'` | new column in local |
| `products[]` | "CDSS, Cortex, +2" summary | `products[]` (full list) | local exposes raw list as tag cluster |
| `amount` | bold $ | `value` | |
| `forecastCategory` | green pill | `forecast` | values match (`commit / best case / pipeline`) |
| `stage` | "Stage 5 – Negotiation/Review" | `stage` (`stage 1 … stage 5`) | **migrate to named form**: `Discovery, Solutioning, Technical Validation, Active POV, Negotiate` per SME |
| `closeDate` | "closing in 38 days" | `closeDate` (`mar 7`) | local shows absolute, tile shows relative |
| `accountHealth` | pill | `health` (`healthy / at risk / critical`) | |
| `risks` count | "▲ 4" badge | `risks` (`'2 risks'`) | local stringifies count |
| `lastActivity` | "12 days ago" | `lastActivity` | |
| AI sparkle | static icon | `IconButton renderIcon={Stars}` | local makes it an action |

**Sort vocabulary — local code is the spec [SME-confirmed 2026-05-08]:** `value, opportunity name, close date, last active, deal stage, opportunity type, stage, account health, risk factor count`. The Figma 3-chip set (`Deal Size, Last Activity, Close Date`) is a too-narrow earlier iteration and should be expanded to match the local code. *(Designer follow-up.)*

**The local table is missing two real fields** that Deal Tile has and the Opportunity Table almost certainly should expose: **Renewal posture** (subscription end / outcome) and the **Sales Plays linked to the opp**. Worth a follow-up.
