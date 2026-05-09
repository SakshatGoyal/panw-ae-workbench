# Sales Play — Domain Model

Reverse-engineered from Figma section **"Sales Play Components"**
File: `JMt3PaSmjGV4fZqMKjbh4p` · Section node: `22006:58848`
([Figma link](https://www.figma.com/design/JMt3PaSmjGV4fZqMKjbh4p/Unified-Experience--Sep-Sprint-?node-id=22006-58848))

Each claim is tagged **[C]** = confirmed by variant property, code, or directly visible text in screenshot, **[I]** = inferred from naming/context, or **[?]** = unclear / needs SME input.

---

## Section 1 — Entity Catalog

### 1. Sales Play Family

A top-level grouping/portfolio of Sales Plays — appears to align to PANW product platform brands.

**Fields**
| Field | Type | Source | Notes |
|---|---|---|---|
| `name` | string | screenshot of `13036:41385` | **[C]** |
| `brandColor` | enum | variant `Family` 01–04 + ribbon color matches `Brand/*` token in design context | **[C]** |
| `salesPlays` | Sales Play[] | family row expansion | **[C]** |
| `cumulative` (per-account summary) | aggregated cell when collapsed | "Summary" column appears when family is collapsed | **[C]** |

**Enum: `Family` (closed, 4 known)**
| Variant | Family name | Brand / token |
|---|---|---|
| `01` | **FW & CDSS** | PANW Orange `#FA582D` **[C]** |
| `02` | **SASE (Prisma ACCESS, SD-WAN, ZTNA)** | NetSec Yellow `#FFCB06` **[C]** |
| `03` | **Cortex Cloud (Specialist-led advanced security GTM)** | Prisma Blue `#00C0E8` **[C]** |
| `04` | **Unit 42** | Cortex Green `#00CC66` **[C]** |

> The variant property is `Family = 01..04` plus `Open = Yes/No`, so the enum is *positional* in the component. Brand color is what semantically distinguishes them. **[I]**

**Actions / states**
- `expand / collapse` (variant `Open=Yes/No`) — collapsed shows a single "Summary" cell; expanded fans out into one column per Sales Play. **[C]**

**Where it appears**
- Header & rows table (`13036:41385`)
- Header cells (`13036:41322`)
- Sales Play modal headers (title format: `[Sales Play Family] | [Sales Play Name]`) **[C]**

---

### 2. Sales Play

A named go-to-market motion belonging to a Sales Play Family. The columns of the matrix.

**Fields**
| Field | Type | Source | Notes |
|---|---|---|---|
| `name` | string | column header text | **[C]** |
| `family` | Sales Play Family (FK) | parent row | **[C]** |
| `description` | string | not surfaced in this section | **[?]** |

**Sample names by family** (all **[C]** from `13036:41385` screenshot):
- **FW & CDSS:** Hardware Refresh; Fortinet Displacement; SWFW Acceleration (appears 3× as separate columns — possibly variants/sub-plays, possibly a Figma copy-paste; **flag**)
- **SASE:** GP to Prisma Access; PAB Existing PA Upgrade; PAB Standalone; Upsell SD-WAN Customers; PAB for Partners; Cortex (EDR, SIEM, …); XDR Acceleration *(note: the last two are Cortex plays sitting under SASE — possibly mis-grouped in design; **flag** — `Cortex (EDR, SIEM, …)` and `XDR Acceleration` may belong under family 03)*
- **Cortex Cloud:** XSIAM Splunk Takeout; DR Acceleration; Cortex Cloud Land & …; Radar to Cortex Upg…; XSIAM Splunk Takeout (duplicate column, **flag**)
- **Unit 42:** Unit 42; Unit 42 No Cost Reta… (likely "No Cost Retainer") **[I]**

**Where it appears**
- Header cell (`13036:41322`)
- Family rows (`13036:41385`)
- Modal title (`[Sales Play Family] | [Sales Play Name]`)

---

### 3. Account

A customer/prospect — the rows of the matrix; the entity each Sales Play is being executed against. **[C — confirmed by SME]**

**Domain meaning (per SME):** Sales Plays act as *playbooks*. Marketing/GTM authors a library of plays, and a rep matches plays to an account based on what that customer is facing. *"Customer X has problems A, B, C → run plays 1, 2, 3 against them."* The matrix is the operationalization of that mapping. The same matrix can also be sliced by **region**, **territory**, or **rep** for leadership-level analysis (*"in APAC, plays D and F are the highest-converting"*) — those are additional analytical axes layered on top of the same Account × Sales Play core. **[C — SME]**

**Fields**
| Field | Type | Source | Notes |
|---|---|---|---|
| `name` | string | sample: "Beacon Corp", "Aurora Enterprises", "Beacon Solutions", "Blue Horizon", "BlueSun Corp" (from Modal /03 opportunity names) **[C]** | derived |
| `region` | string | not surfaced in this section but used as analytical pivot **[C — SME]** | |
| `territory` | string | analytical pivot **[C — SME]** | |
| `assignedRep` | User (FK) | analytical pivot **[C — SME]** | |

**Actions**
- Click cell → opens Sales Play detail modal scoped to (Account × Sales Play) **[I]**
- Account name is a link in the modal header — likely opens an Account profile page **[I]**

**Where it appears**
- Modal /01, /02, /03 sub-header link `[Account Name]`
- (Implicitly) the Y-axis of the family-rows matrix

---

### 4. Sales Play Status (per Account × Sales Play × Status bucket)

This is the most-reused entity. A status pill represents *one bucket of opportunities* of a given category against one (Account × Sales Play) cell. The pill displays an **icon (= category) + a count or $ amount**.

**Fields**
| Field | Type | Source | Notes |
|---|---|---|---|
| `category` | enum (see below) | variant `Category` on `13036:41266` | **[C]** |
| `value` | number / currency | text content (`123,456` placeholder; real screenshots show `$22,500`, `$25,300`, etc.) | **[C]** displayed value |
| `valueKind` | "count" \| "amount" | unclear — "123,456" is ambiguous, but family-rows show `$` prefix → likely $ amount. **[I]** |
| `state` | enum `static \| Hover \| Pressed` | variant `State` | **[C]** interactive |

**Enum: `Category` — 7 values [C]**
| Category | Icon (visual) | Semantic guess | Confidence |
|---|---|---|---|
| `Not Touched` | red exclamation circle | account hasn't been worked yet | **[I]** |
| `Pitched` | headphones | rep has pitched it | **[I]** |
| `Interested` | thumbs-up | customer signaled interest | **[I]** |
| `Open Pipeline` | lightbulb | active opportunity in pipe | **[I]** |
| `Closed Won` | green check | sold | **[I]** |
| `Deferred` | calendar/clipboard | rep has chosen to run this play *at a different time* (not now, not declined) | **[C — SME]** |
| `Closed Lost` | gray X circle | customer declined / lost | **[I]** |

> **Inconsistency to flag:** The sibling component `Sales play icons` (`13036:43002`) declares only 6 categories and renames `Open Pipeline` → `Open Opportunities` and omits `Deferred`. The status pill component is the source of truth (7 categories, `Open Pipeline`); the icon library appears stale. **[C]** on the discrepancy.

**Where it appears**
- Standalone status pill (`13036:41266`) — used for legend/inventory
- Sales Play Row Cell (`13036:41294`) — up to 7 pills clustered per (Account × Sales Play)
- (Implicitly) the modal's "decision" stages (Pitched / Interested / Defer-Decline-Pursue) are *generators* of these statuses **[I]**

---

### 5. Sales Play Row Cell — (Account × Sales Play) intersection

The body cell. Renders the bag of Sales Play Statuses for one (Account, Sales Play) pair.

**Fields**
| Field | Type | Source |
|---|---|---|
| `notTouched` / `pitched` / `interested` / `openPipeline` / `closedWon` / `deferred` / `lost` | boolean (per status visibility) | variant booleans on `13036:41294` **[C]** |
| `state` (= `Property 1`) | `Static \| Hover \| Pressed` | **[C]** interactive |
| each visible status carries its own `value` | currency | **[C]** |

> Note the duplication: the variant exposes 7 booleans for which categories are present, *and* the underlying pills carry the data. This is a Figma rendering shortcut, not a domain field. The real model is "list of statuses, each with an amount". **[I]**

**Actions**
- Click cell → opens Sales Play detail modal (Modal /01) **[I]** (signaled by Hover/Pressed states)

**Where it appears**
- Inside `Family=NN, Open=Yes` rows (`13036:41385`)

---

### 6. Sales Play Engagement (the modal's record)

The state object backing **Sales Play Modal /01**. Tracks rep-driven progress for one (Account × Sales Play) pair.

**Fields**
| Field | Type | Source | Notes |
|---|---|---|---|
| `salesPlay` | Sales Play (FK) | header title | **[C]** |
| `account` | Account (FK) | header sub-link | **[C]** |
| `pitched` | enum `Yes \| No` | content switcher row 1 | **[C]** |
| `pitchedTo` | Contact[] | chip list + "Add Contact" | **[C]** multiple contacts can be added |
| `customerInterested` | enum `Yes \| No \| Unknown` | content switcher row 3 | **[C]** |
| `decision` | enum `Defer \| Decline \| Pursue` | content switcher row 4, label "Defer / Decline / Pursue" | **[C]** |
| `opportunities` | Opportunity[] | list of links + "Add Opportunity" | **[C]** |
| `cumulativeOpportunitySize` | currency | label "Cumulative Opportunity Size (excl. Omitted)" | **[C]** label; *value cell in screenshot reads `Customer Interested?` — likely Figma authoring slip; **flag*** |
| `forecastCategory` | string / enum | label "Forecast Category" — sample "Various" | **[C]** label; the value `Various` suggests aggregation across the linked opportunities. **[I]** Underlying enum likely SFDC standard (`Pipeline`, `Best Case`, `Commit`, `Closed`) but **not confirmed in this design**. |
| `closeDate` | date | label "Close Date" — sample value in screenshot is `$4,567,890.00` (currency, not a date — **misalignment to flag**) | **[C]** label, **[?]** value |
| `note` | long string | "Note" text-entry field | **[C]** |
| `accountSelectionAndSizingMethodology` | long string | text-entry field | **[C]** |

**Implied state machine**
1. Rep marks `pitched=Yes` and adds `pitchedTo` contacts.
2. Rep records `customerInterested`.
3. Rep takes a `decision` (Defer / Decline / Pursue).
4. If Pursue → links one or more `opportunities`; cumulative size + forecast category + close date roll up. **[I]**

**The starred opportunity** — three opportunities in the modal list show a yellow star prefix. **[I]** Likely "primary opportunity for this Sales Play" or "auto-suggested by system". Needs confirmation.

**Omitted opportunities** — the label says "Cumulative Opportunity Size (**excl. Omitted**)" and the link list label says "Opportunity (**incl. Omitted**)" — suggests opportunities can be flagged "omitted" so they appear in the link list but don't count toward the cumulative. **[I]** No explicit "omit" UI is visible in this section — needs confirmation.

**Where it appears**
- `Sales Play Modal Window /01` (`21028:48764`)

---

### 7. Contact

A person at the Account who can be associated as the recipient of the pitch.

**Fields**
| Field | Type | Source | Sample |
|---|---|---|---|
| `name` | string | Modal /02 table | "Alice Johnson", "Bob Smith", "Catherine Lee", "David Brown", "Eva White", "Tom Sturridge" **[C]** |
| `title` | string | Modal /02 table | "Cybersecurity Analyst", "Compliance Officer", "Security Architect", "Incident Response Specialist", "Risk Management Consultant" **[C]** |
| `phone` | tel string (formatted) | Modal /02 table | "(202) 555-0173", etc. **[C]** |
| `email` | email | Modal /02 table | "alice.johnson@example.com", etc. **[C]** |
| `avatar` | image | chip avatar | **[C]** |

**Actions**
- Multi-select via row checkbox **[C]**
- "New Contact" — create a new Contact **[C]**
- Search contacts (text) **[C]**
- Copy email to clipboard (copy icon next to email) **[I]**
- Tap phone → call (link styling) **[I]**

**Where it appears**
- `Sales Play Modal Window /02` (`21028:48762`) — contact picker
- Modal /01 — selected contacts shown as removable chips next to "Pitched to whom?" (sample: `Tom Sturridge` with × button)

---

### 8. Opportunity

A revenue opportunity in the CRM that can be linked to a Sales Play Engagement.

**Fields**
| Field | Type | Source | Sample |
|---|---|---|---|
| `name` | string (formatted `<Account> – <Product line> – <Initiative>`) | Modal /03 table | "Aurora Enterprises – Firewall – Compliance Hard…", "Beacon Corp – Unit 42 – SOC Modernization", "Beacon Solutions – Cortex & Cloud – Secure Access Reva…", "Blue Horizon – Firewall – Edge Protection Program", "BlueSun Corp – Firewall – Edge Protection Pr…" **[C]** |
| `stage` | enum (likely numbered SFDC stages) | Modal /03 column | All visible rows show `1 - Qualify`. Implies enum values like `1 - Qualify`, `2 - Discover`, `3 - …`, etc. — **only `1 - Qualify` confirmed**, full enum **[?]** |
| `amount` | currency (USD, 2 decimals) | Modal /03 column | "$5,678,901.00", "$4,567,890.00", "$3,456,789.00", "$2,345,678.00", "$1,567,890.00" **[C]** |
| `closeDate` | date (`Mmm dd, yyyy`) | Modal /03 column | "Jul 30, 2027", "Jun 20, 2027", "Aug 10, 2027", "Sep 25, 2027", "May 15, 2027" **[C]** |
| `starred` | boolean | yellow star prefix on some rows | **[C]** visible flag, **[?]** semantics |
| `selected` | boolean | row checkbox state | **[C]** UI state, persisted as Engagement linkage |
| `omitted` | boolean | implied from "incl. Omitted / excl. Omitted" labels in Modal /01 | **[I]** |

**Actions**
- Multi-select via checkbox; selected opportunities flow back as links in Modal /01 **[C]**
- "New Opportunity" (Modal /03) — create new Opportunity **[C]**
- Click opportunity name in Modal /01 → likely deep-links to CRM Opportunity record (link styling) **[I]**
- Search opportunities (text) **[C]**

**Where it appears**
- `Sales Play Modal Window /03` (`21028:48763`) — opportunity picker
- Modal /01 "Opportunity (incl. Omitted)" list

---

## Section 2 — Component Reference

### `Sales Play Status` — `13036:41266`

- Represents **Sales Play Status** (entity #4)
- Variant props **[C]**:
  - `Category`: `Not Touched | Pitched | Interested | Open Pipeline | Closed Won | Deferred | Closed Lost`
  - `State`: `static | Hover | Pressed`
- 21 variant combinations (7 × 3)
- Body content: icon + numeric value (placeholder `123,456`)
- Appears in: Sales Play Row Cell (`13036:41294`); standalone legend at `13036:41266`

### `Sales play icons` — `13036:43002`

- Sub-component used by status pills; bare icon, no chrome.
- Variant prop **[C]**: `Property 1`: `Closed Won | Not Touched | Closed Lost | Pitched | Interested | Open Opportunities`
- **Inconsistency:** 6 values vs 7 in `Sales Play Status`. Renames `Open Pipeline` → `Open Opportunities`; omits `Deferred`. **Flag for designer.**
- Appears inside: every `Sales Play Status` variant.

### `Sales Play Row Cell` — `13036:41294`

- Represents **Sales Play Row Cell** (entity #5) — body cell of the matrix.
- Variant props **[C]**:
  - `Property 1`: `Static | Hover | Pressed` (visual interactivity)
  - 7 booleans: `notTouched`, `pitched`, `interested`, `openPipeline`, `closedWon`, `deferred`, `lost` (which pills to render)
- Each rendered pill is an instance of `Sales Play Status` with `state="static"`. **[C]**
- Appears in: `Family=NN, Open=Yes` symbols inside `13036:41385`.

### `Sales Play table header cells` — `13036:41322`

- Represents the column header of the matrix — one cell = one `Sales Play` label, grouped by `Sales Play Family` ribbon.
- Variant props **[C]**:
  - `Property 1`: `01 | 02 | 03 | 04` (= Family index)
  - `Property 2`: `collapsed | expanded`
- Collapsed: shows family name + `+`/`Summary` only
- Expanded: shows family name + `−`, then a row of Sales Play column labels underneath
- Brand color ribbon under family name encodes Family identity. **[C]**
- Appears in: `13036:41385` (`Family=NN, Open=No/Yes` symbols).

### `Sales Play header and rows` — `13036:41385`

- Composite frame: the full matrix surface for the section.
- Sub-symbols **[C]**: `Family=01..04, Open=Yes|No` (8 total)
- A `Family=NN, Open=No` symbol = collapsed family stripe (just the Summary column).
- A `Family=NN, Open=Yes` symbol = expanded family stripe (one column per Sales Play in that family).
- Composes: `Sales Play table header cells` + several `Sales Play Row Cell` instances.
- Confirmed Sales Play names per family — see entity #2.

### `Sales Play Modal Window /01` — `21028:48764`

- Represents **Sales Play Engagement** (entity #6) — detail/edit view.
- No variant props **[C]** (single composition)
- Composes:
  - Header: `Title` text, `Link` (Account name), `Button (icon)` close
  - Field rows for `Pitched / Engaged?`, `Pitched to whom?`, `Customer Interested?`, `Defer / Decline / Pursue`, `Opportunity (incl. Omitted)`, `Cumulative Opportunity Size (excl. Omitted)`, `Forecast Category`, `Close Date`, `Note`, `Account Selection & Sizing Methodology`
  - Stage/decision rows use a `Content Switcher` primitive (Yes/No or 3-segment)
  - Selected contacts as `Chips` with × removal
  - Opportunities as `Link` rows + `Button (Standard)` "Add Opportunity"
  - Free-text rows use `Text Entry - Rounded`
- **Bug to flag:** in the screenshot, the value cell next to `Cumulative Opportunity Size (excl. Omitted)` shows the string `Customer Interested?`, and the value next to `Close Date` shows `$4,567,890.00`. Looks like rows in this part of the modal are misaligned in the Figma. **[C]** discrepancy.

### `Sales Play Modal Window /02` — `21028:48762`

- Represents **Contact picker** for `pitchedTo`.
- Composes: same header as /01; `Search`, `Button (Standard)` "New Contact", `Chips` (already-selected contacts), table of `Header` × 4 + `Cells - Standard` × 6 rows × 4 cols, `Pagination`.
- Columns: `Name`, `Title`, `Phone`, `Email` (with copy-icon affordance on Email).
- Item per page selector defaults to `5`. **[C]**
- Linked to entity: **Contact** (#7).

### `Sales Play Modal Window /03` — `21028:48763`

- Represents **Opportunity picker** for `opportunities`.
- Composes: same header as /01; `Search`, `Button (Standard)` "New Opportunity", table with 4 columns (`Opportunity Name`, `Stage`, `Amount`, `Close Date`), `Pagination`.
- Row prefix: checkbox + optional star.
- Linked to entity: **Opportunity** (#8).

---

## Section 3 — Resolved by SME (2026-05-08)

1. ~~**`Deferred` icon definition**~~ — `Deferred` = rep has decided to run the play at a different time. **[Resolved]**
2. **`Open Pipeline` vs `Open Opportunities`** — Figma authoring drift; `Open Pipeline` is the canonical name on the status pill. The icon library is stale. *(Designer fix.)*
3. **`Sales Play Status.value` units** — confirmed as currency ($ amount of opportunities sitting in that status, against that play, against that account).
4. ~~**`Forecast Category` enum**~~ — `Pipeline | Best Case | Commit | Closed`. Rep-assigned, judgment call. **[Resolved — SME]**
5. ~~**`Opportunity.stage` enum**~~ — 5 named stages (no numbers), then `Closed` or `Lost`. **Canonical names [SME-confirmed anchors + provisional fill-ins, 2026-05-08]:** `Discovery → Solutioning → Technical Validation → Active POV → Negotiate`. Stages 1 (Discovery) and 5 (Negotiate) are SME-confirmed; Technical Validation and Active POV are SME-named without position; Solutioning is the working name for the missing 2nd stage (matches the `Solution` label seen on the Sales Stage filter chip). The earlier "stage 1 – stage 5" numeric form should be deprecated in favor of names. **[Provisional — SME-led]**
6. **`Omitted` opportunities** — still open. Labels reference "incl. Omitted / excl. Omitted" but no omit-action UI surfaces in any section seen so far. **[?]**
7. ~~**Starred opportunity**~~ — `star = Primary Quote` (tooltip text on Deal Tile in the Account & Opportunity section confirms). **[Resolved]**
8. **Modal /01 row misalignment** — Figma authoring slip. *(Designer fix.)*
9. **`SWFW Acceleration` × 3 / `XSIAM Splunk Takeout` × 2 duplicate columns** — likely Figma copy-paste, treat as a single play in code. *(Designer fix.)*
10. **`Cortex (EDR, SIEM, …)` and `XDR Acceleration`** placed under SASE family — likely Figma authoring slip. Should sit under Cortex Cloud. *(Designer fix.)*
11. ~~**Account entity / row axis of matrix**~~ — confirmed: rows = Accounts. Plays attach to an account; opportunities attach to a play. Region / Territory / Rep are additional analytical pivots (leadership view), not the row axis. **[Resolved — SME]**
12. **Sales Play Row Cell `Hover/Pressed`** — confirm opens Modal /01. *(Low-priority verification.)*
