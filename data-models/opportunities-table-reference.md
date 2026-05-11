# Opportunities Table — Reference

A spec and a guidebook in one document. Designed to be read end-to-end by a
PM, a designer, or an engineer without needing a separate domain doc open.

When this doc says something is a *domain concept* (forecast category,
stage, sales play, etc.), it's because that concept is also used by other
surfaces, and the full definition lives in one of the domain docs in this
folder. We give a short, working definition here and link out for the full
story.

The table already exists in `poc-exploration` as
`opportunity-table.stories.tsx`. Treat this document as the v2 — the v1
table is the visual and structural starting point, but the behaviors,
controls, and tag-level interactions described here are more nuanced.

---

## 1. Purpose

The opportunities table is where an Account Executive (AE) scans their
**active pipeline.** Not a single account, not a single deal — the whole
list of opportunities they're currently working, with enough information
per row to know which deals need attention *today*.

Every design choice in the table should be evaluated against this
question:

> Can the AE, in one pass down the table, decide which three or four
> deals to do something about this morning?

If the answer requires the AE to click into a row, the table failed. If
the answer requires the AE to remember context that isn't on the row, the
table failed. Each row is meant to carry its own justification for being
looked at.

---

## 2. The Data the Table Reads

This is the working glossary. Everything in the table is built from these
concepts. Read this section once and the rest of the doc reads quickly.

### Opportunity
A single potential deal. Has a name, an owning account, a dollar value, a
close date, a stage, a forecast category, a type, products attached, and
risks. Full domain spec: `account-opportunity-domain-model.md`.

### Account
The customer the opportunity belongs to. Carries its own health rating
(see below) which the opportunity *inherits* on the row.

### Forecast Category
The AE's confidence that this deal will close *this period*.
Three values that matter for the table:

- **Pipeline** — in the funnel, not yet committed.
- **Best Case** — likely to land if things go well.
- **Commit** — the AE is staking their forecast on this closing.

(There's also a `Closed` category internally, but the table is for
*active* opportunities, so Closed deals don't appear here.)

### Stage
Where the deal is in the sales process. Five named stages, in order:

1. **Discovery**
2. **Solutioning**
3. **Tech Validation**
4. **Active POV**
5. **Negotiation**

These are the canonical Salesforce stages. They tell you *how far along*
the deal is; forecast category tells you *how confident* the AE is.

### Opportunity Type
Three values: **Net New**, **Upsell**, **Renewal**. Net New means a brand
new customer relationship; Upsell means more product into an existing
customer; Renewal means an existing contract coming up for re-signing.

### Account Health
A rating of how the customer relationship is doing overall, on a
three-step scale: **Healthy**, **At Risk**, **Critical**. The row shows
the **Overall Health** value. Overall Health is *not entered directly* —
it's derived from two sub-dimensions:

- **Technical Health**
- **Adoption & Deployment Health**

The rule: **Overall Health takes the worst of the two.** Think of the
three values as a severity ladder (Healthy → At Risk → Critical), and
Overall is whichever sub-dimension is further down the ladder.

| Technical | Adoption & Deployment | Overall |
| --- | --- | --- |
| Healthy | Healthy | Healthy |
| Healthy | At Risk | At Risk |
| At Risk | Healthy | At Risk |
| Healthy | Critical | Critical |
| At Risk | Critical | Critical |
| Critical | Critical | Critical |

So a customer with healthy technicals but critical adoption is a
**Critical** account, full stop. There is no averaging. The worst signal
wins.

Both sub-dimensions surface in the Account Health popover (section 4.3).

### Risk Factors
Specific, named reasons a deal might not close. Examples: "No Secured
Technical Win," "Mandatory PS Removed," "Budget conversation not
scheduled." A single opportunity can have multiple risk factors at once.
Each one is a discrete tag with an emoji and a short label. The full
list is in section 3.7.

### Last Activity
The most recent meaningful touchpoint on the deal — a meeting, a call, a
contract review, a workshop. The table cares about the *date* (how long
ago) more than the type, because aging activity is the lead indicator
that a deal is going cold.

### Sales Play
The Go-To-Market motion this opportunity came from. See
`sales-play-reference.md` for what a sales play is. On the table, it
appears as a single name (e.g. "Hardware Refresh") with a status that
shows on hover.

### Products
The specific product SKUs attached to the deal. Each one belongs to a
*product family* (Firewall, CDSS, SASE, Cortex & Cloud, Unit 42) and
carries a *brand* (Strata, Prisma, Cortex, Unit 42). The brand drives the
icon color.

### Value
The total dollar amount of the opportunity. When a single opportunity has
multiple products, the value is the sum across them — and that breakdown
is something the table exposes on hover (Column 4).

### Quote Number
The Salesforce-side ID for the quote that backs the opportunity. Useful
for search and cross-referencing in other systems. Otherwise low-content.

---

## 3. Controls

Everything that sits *above* the table — search, sort, tags, filters —
exists so the AE can shape the view. The first two rows of UI are dense
on purpose. AEs come to this page with a question in mind, and the
controls are how they ask it.

### 3.1 Search Bar (Row 1)

A single text input that searches across **Quote ID, Opportunity Name,
Product, and Account Name** simultaneously. It does not search across
risk factors, sales play names, or activity descriptions — those are
filtered, not searched.

The AE uses search when they already know what they're looking for ("the
Lucid SASE renewal"). They use filters when they're exploring ("which
deals are slipping").

### 3.2 Sort (Row 1)

Sort options, all single-axis (no multi-key sort):

- Account Name
- Opportunity Name
- Close Date
- Value
- Risk Factor Count

Close Date and Risk Factor Count are the most operationally useful — they
let the AE put the urgent-or-broken deals at the top. The other three are
for organization, not triage.

### 3.3 Key Metrics (Row 1, right side)

A small, always-visible summary of what the AE is currently looking at:

> **47 deals · $12.4M ARR**

These numbers reflect the *filtered* view, not the AE's entire pipeline.
When filters change, these change with them. That's deliberate — the AE
uses this to gauge "how big is the slice I'm looking at."

### 3.4 The Tag Filter (Row 2, multi-select)

This filter is unusual: it doesn't reduce the number of rows. It controls
**how much information each row shows.** A row in the table has many tags
(Forecast, Stage, Close Date, Opportunity Type, Quote Number, Last
Activity, Account Health, Risk Factors, Sales Play, Products). The tag
filter lets the AE turn any of those off.

All are on by default. An AE running a quick pipeline review might turn
off Quote Number and Products to compress the view; an AE doing a risk
review might turn off everything except Last Activity, Account Health,
and Risk Factors.

> **Designer note:** the tag filter is a *density control*, not a data
> filter. Make it visually distinct from the row-filtering controls
> below it. The two callouts in the spec ("controls how much
> information…" vs. "controls how many opportunities…") are the
> mental model to preserve.

### 3.5 Forecast Filter (single-select)

`All` (default), or one of `Pipeline`, `Best Case`, `Commit`. Single-
select because AEs typically want to look at *one* forecast bucket at a
time — "show me my Commits."

### 3.6 Stage Filter (single-select)

`All` (default), or one of the five named stages. Same reasoning as
forecast: AEs ask "show me Tech Validation," not "show me Discovery and
Negotiation."

### 3.7 Close Date Filter (multi-select)

Fiscal quarters. **This Quarter** and **Q4FY26** are selected by default
(the current quarter and the next, which is the usual planning window).
Other quarters available: Q1FY27 through Q4FY27.

Multi-select because the AE often wants "this quarter plus next" as one
slice.

### 3.8 Opportunity Type Filter (single-select)

`All`, `Renewal`, `Upsell`, `Net New`. Single-select; these three motions
behave so differently that AEs typically focus on one at a time.

### 3.9 Last Activity Filter (single-select)

`All`, `Last 7 days`, `7–21 days`, `Over 21 days`. Maps directly to the
severity thresholds in the Last Activity column (section 4.3). Use this
to surface deals that have gone cold.

### 3.10 Account Health Filter (multi-select)

Three groups, each with three options:

- **Overall Health** — Healthy, At Risk, Critical. *At Risk and Critical
  are on by default*; Healthy is off. The default view assumes the AE
  wants to see deals that need attention, not green ones.
- **Technical Health** — Healthy, At Risk, Critical.
- **Adoption and Deployment Health** — Healthy, At Risk, Critical.

The default behavior (At Risk + Critical only, on Overall) is important
for the table's first-impression: when an AE opens the page, the rows
they see should already be skewed toward the ones that need them.

### 3.11 Risk Factors Filter (multi-select)

`All` (default), or any combination of these nine specific risks:

- 🧍 Lacking exec engagement or support
- 📜 No design-of-record
- 🏅 No Secured technical win
- 🤝 No Partner selected or finalized
- 🧑‍💻 Mandatory PS was removed
- ⌛ Quotes pending approval
- 💲 Budget conversation not scheduled or complete
- 🔁 Term length greater than 3 years or without financing/billing plans
- 💤 No activity for last 30 days

Each risk factor is a real thing the deal team flagged. The emoji is part
of the label; it's not decorative.

### 3.12 Products Filter (multi-select)

Tree-structured. `All` (default), or pick at the family or SKU level. The
full tree:

- **Firewall** — PA Series, VM Series
- **CDSS** — PA Series Attached, PA Series Support, FW Data Lake
- **SASE** — Prisma Access, Prisma SD-WAN
- **Cortex & Cloud** — Cortex XDR+, Cortex XSOAR, Xpanse, XSIAM, QRadar,
  Cortex & Cloud
- **Unit 42** — Reactive, Proactive

Selecting a family is shorthand for selecting all its SKUs.

---

## 4. The Columns

The table has **six columns**. Each one has a job. Read them as a
narrative left-to-right: *who's the deal* → *where's the deal* →
*what's wrong with the deal* → *what's in the deal* → *what's it worth*
→ *what can I do.*

---

### 4.1 Column 1 — Opportunity (the "who")

**What it shows**

Two lines of text:

- **Opportunity Name** — the deal's name, in `body-compact-02` size,
  bold, secondary text color.
- **Account Name** — the customer, in `label-02`, tertiary text color.

This is the row's identity. Everything else is qualifying information.
Visually quiet enough that the AE can scan down the column and read it as
a list of deal names.

**No interactions** — the row itself is clickable (via the expand action
in Column 6), so the name doesn't need its own behavior.

---

### 4.2 Column 2 — Current Deal State (the "where")

**What it shows**

A row of tags describing where the deal is in the lifecycle. Each piece
of information is its own tag:

- **Forecast** (Pipeline / Best Case / Commit)
- **Stage** (Discovery / Solutioning / Tech Validation / Active POV /
  Negotiation)
- **Close Date** (with an appropriate calendar/date icon)
- **Opportunity Type** (Renewal / Upsell / Net New)
- **Quote Number** (e.g., `Q-00140`)

Any of these tags can be hidden via the tag filter (section 3.4).

**Interactions**

Most tags are read-only. Forecast, Stage, Close Date, and Quote Number do
nothing on hover. **Opportunity Type is the exception**, and it behaves
differently depending on its value:

#### Net New
No interaction. It's a label.

#### Upsell
After a **1-second hover delay**, a small tooltip appears with a single
button labeled **Modify**. (Think of the tooltip-with-action pattern
that appears when you select text in Claude's chat — quiet, contextual,
single action.) The interaction behind Modify is out of scope here;
treat it as a hook.

#### Renewal
On hover, a **popover** appears. No header. A simple two-column key/value
table:

| | |
| --- | --- |
| Subscription end | *[date]* |
| Renewable TCV | *[$ value]* |
| ARR | *[$ value]* |
| Renewal Outcome | *[small tag with chevron]* |

The first three rows are read-only. The fourth — **Renewal Outcome** —
is the interactive bit, and it's the most intricate behavior in the
table. The next subsection covers it in detail.

#### Renewal Outcome — what it is and how it behaves

A **Renewal Outcome** is the AE's current best guess at how this renewal
is going to land. It's a forward-looking call, not a result. It can take
one of six values, each with its own color treatment:

- **Unknown** (gray) — AE hasn't decided yet.
- **Full Renewal / Upsell** (green) — the customer is staying, possibly
  buying more.
- **Downsell** (orange) — the customer is renewing but for less.
- **Churn** (red) — the customer is leaving.
- **Displacement (HW Refresh)** (purple) — the contract is ending
  because the hardware is being refreshed; the relationship continues
  but the renewal record itself goes away.
- **Duplicate** (slate) — this renewal record shouldn't exist; it's a
  data artifact.

The AE can change the outcome inline. The tag carries a chevron to
signal it's interactive. Clicking it reveals a dropdown of the six
values.

**What happens when the AE picks a new outcome:**

As soon as a new value is selected, the popover expands to show a set of
**entry fields** appropriate to that outcome, followed by two CTAs at the
bottom: **Cancel** and **Confirm**.

The fields differ by outcome:

| Outcome | Required field(s) | Optional |
| --- | --- | --- |
| Unknown | — | Notes (text area) |
| Full Renewal / Upsell | — | Notes (text area) |
| Downsell | Notes (text area) | — |
| Displacement | Notes (text area) | — |
| Duplicate | Notes (text area) | — |
| **Churn** | **Reason** (dropdown) and **Competitor replacement**  (dropdown) | Notes (text area) |

**Why Churn is different:** when an AE marks a deal as Churn, the
organization needs to know *why* and *to whom*. That information feeds
loss analysis and competitive intel. It's the only outcome where we
require structured data, not just prose.

The **Reason** dropdown options:
- Customer dissatisfied
- Budget cut
- Competitive displacement
- End of life
- Other

The **Competitor replacement** dropdown options:
- CrowdStrike
- Fortinet
- SentinelOne
- Cisco
- Other
- N/A *(when the customer isn't replacing PANW with anything)*

Confirm commits the change. Cancel reverts to the prior outcome and
collapses the fields. The popover only closes when the AE clicks Confirm,
Cancel, or outside the popover after no edits.

> **PM note:** the Renewal Outcome editor is a real piece of workflow,
> not just a tag color picker. Treat it as a mini-form. If we later
> reuse it on the opportunity detail page, it lifts out to the domain
> doc.

---

### 4.3 Column 3 — Activity & Blockers (the "what's wrong")

**What it shows**

Four pieces of information, stacked or laid out tightly:

- **Last Activity Day** — formatted as `## days ago`.
- **Account Health** — Critical / At-Risk / Healthy.
- **Risk Factors** — a *count* of how many risk factors apply.
- **Sales Play** — the name of the sales play that produced this deal
  (e.g., "Hardware Refresh").

This is the column the AE's eye should land on when triaging. It's the
"is this deal in trouble?" column.

**Color and icon rules**

- **Last Activity:**
  - 0–7 days: neutral, no icon — the deal is being worked.
  - 7–21 days: **caution** color with a **caution icon** — the deal is
    going quiet.
  - >21 days: **error** color with an **error icon** — the deal has
    gone cold.

  These thresholds match the Last Activity filter (section 3.9) on
  purpose; filtering by "Over 21 days" should produce a screen of red
  icons.

- **Account Health:** three colors mapped to the three values.
  - Healthy → green
  - At Risk → yellow
  - Critical → red

- **Risk Factors:** neutral color, no icon. The count is the signal; the
  table doesn't try to grade severity by count. (The Risk Factor Count
  sort, section 3.2, is what surfaces deals stacked with risks.)

- **Sales Play:** neutral, no icon.

**Interactions**

Each of the four sub-cells has its own popover-on-hover behavior. They
are independent — hovering one does not affect the others.

#### Last Activity Day — hover tooltip
On hover, a small tooltip showing the **activity description** — what
the activity actually was. e.g., "Technical deep-dive — 22 days ago."
This lets the AE distinguish a cold deal from a deal that just had its
last touchpoint be a low-stakes email.

#### Account Health — hover popover
On hover, a richer popover containing:

1. A **12-month trend** chart at the top — the account's overall health
   rating over the past year. The shape of the curve is the signal: is
   this account getting worse, holding steady, or recovering?
2. **Technical Health** as a tag (Critical / At-Risk / Healthy).
3. **Adoption & Deployment Health** as a tag (Critical / At-Risk /
   Healthy).
4. A single **ghost brand button** at the bottom: **View Account
   Health.** This is the escape hatch into the full account-health view.

Three pieces of information, three rows. The two sub-health tags use the
same color coding as the main health.

The two sub-health tags are the *source* of the Overall Health value
shown on the row (per the rule in section 2: Overall = worst of the
two). One of them will always match the row's color; the other may be
healthier. If the AE is looking at a Critical row and the popover shows
*Technical: Healthy, Adoption: Critical*, they instantly know where the
problem is.

#### Risk Factors — hover popover
On hover, a popover listing all the risk factors that apply to the
opportunity. Same emoji + label format as the Risk Factors filter
(section 3.11). No interactions in the popover — this is informational.

The list lets the AE go from "this deal has 3 risks" to "this deal has
no exec engagement, no partner, and a pending quote" without leaving the
table.

#### Sales Play — hover popover (or tooltip)
On hover, the play's **current status** for this account: Not Touched,
Pitched, Deferred, Declined, Pursuing, Closed Won, Closed Lost. (Full
status spec: `sales-play-reference.md`.) If the play is linked to this
opportunity, it's almost certainly in **Pursuing** — but showing the
status makes the relationship explicit.

---

### 4.4 Column 4 — Products (the "what's in it")

**What it shows**

The products attached to the opportunity, each as a **rounded neutral
tag** with the product name and a **brand icon** on the left of the
text.

The brand icon's color matches the brand. The brand for each product:

| Product | Brand |
| --- | --- |
| PA Series | Strata |
| VM Series | Strata |
| PA Series Attached | Prisma |
| PA Series Support | Prisma |
| FW Data Lake | Strata |
| Prisma Access | Prisma |
| Prisma SD-WAN | Prisma |
| Cortex XDR+ | Cortex |
| Cortex XSOAR | Cortex |
| Xpanse | Cortex |
| XSIAM | Cortex |
| QRadar | Cortex |
| Cortex & Cloud | Cortex |
| Reactive | Unit 42 |
| Proactive | Unit 42 |

(Note that the PA Series shows up in two places — as a Firewall SKU
under Strata, and as a CDSS attachment under Prisma. That's intentional;
they're different products despite the shared name.)

**Overflow behavior**

A row can have any number of products. The cell shows as many tags as
fit, then collapses the remainder into a **`+N` tag** at the end.

Example: an opportunity with PA Series, VM Series, Prisma Access, and
Cortex XDR+ might render as:

> [PA Series] [VM Series] [+2]

The decision about how many tags fit is space-driven, not a fixed limit.
Re-flow on resize.

**Interactions**

Two popover behaviors, depending on which tag is hovered:

#### Hovering an individual product tag
A small popover showing a **single row**:

> [brand icon] **Product Name** *— $XXX,XXX of total opportunity value*

This is how the AE gets to per-product value attribution without leaving
the table. It answers "of this $2M deal, how much is the SASE piece?"

#### Hovering the `+N` tag
A larger popover listing **every product collapsed into the +N** (not
just the overflowed ones — though the spec can go either way; current
spec is the overflowed list). One row per product in the same format as
the single-tag popover:

> [brand icon] **Product Name** *— $XXX,XXX*

This is the AE's way of seeing the full product breakdown when the row
is product-heavy.

---

### 4.5 Column 5 — Value (the "what's it worth")

**What it shows**

The total opportunity value, in `body-02` size, secondary text color.
Formatted as compact currency — e.g., `$2.4M`, `$642K`.

No interactions. The per-product breakdown lives on Column 4's hover; the
value cell itself is just the number.

This column is intentionally quiet. Dollar values are easy to over-emphasize,
and an AE scanning the table benefits more from understanding *risk* than
*size* — the table sorts deals by their problems, not their wealth.

---

### 4.6 Column 6 — Actions (the "what can I do")

**What it shows**

Two ghost brand icon buttons, side by side:

- An **AI** action (icon TBD — the brand AI icon).
- An **expand** action (chevron / arrow icon).

Both are visual; the specific interactions are not yet defined. Treat
them as committed UI hooks: the icons land, the surfaces they open are
forthcoming.

The column is narrow and visually quiet — the AE shouldn't be drawn here
unless they've already decided to act on a row.

---

## 5. Defaults & First Impression

When an AE opens the page cold (no prior filter state), this is what they
should see:

- **All tags on** in the tag filter — the row is fully informative.
- **Forecast: All** — every confidence bucket.
- **Stage: All** — every stage.
- **Close Date: This Quarter + Q4FY26** — the current planning window.
- **Opportunity Type: All.**
- **Last Activity: All.**
- **Account Health: At Risk + Critical** (Overall axis only; sub-axes
  off). This is the most opinionated default — the table biases toward
  showing the AE deals that need them, not deals that are fine.
- **Risk Factors: All.**
- **Products: All.**
- **Sort:** Close Date ascending. *(The closest-to-close, most urgent
  deals at the top.)*

The result: the AE lands on a screen that's already a triage queue, not
a database dump.

---

## 6. What This Doc Doesn't Cover

- **The AI button behavior** (Column 6) — pending.
- **The expand action behavior** (Column 6) — pending. Probably opens
  an opportunity detail panel; that detail panel is its own spec.
- **Empty states** — zero opportunities, zero matches after filtering,
  loading. These need design and are not in this doc.
- **Error states** — failed loads, stale data warnings. Same.
- **Bulk actions** — there is no selection model in the v2 spec. If the
  AE needs to act on multiple rows at once, that's a future addition.
- **The Renewal entity itself** — the renewal popover surfaces a few
  renewal fields (subscription end, renewable TCV, ARR, outcome), but
  the full renewal record lives in `account-opportunity-domain-model.md`.

---

## 7. Cross-references

- `account-opportunity-domain-model.md` — full domain spec for accounts,
  opportunities, stages, forecast categories, products, risks.
- `filters-and-opportunity-table-domain-model.md` — the earlier
  reverse-engineered filter and sort spec; this document supersedes it
  for v2 behavior.
- `sales-play-reference.md` — what a sales play is, plain-English.
- `sales-play-domain-model.md` — the schema-level sales play spec.
- `opportunity-table.stories.tsx` (in `poc-exploration/src/compositions/`)
  — the v1 implementation; visual and structural starting point.
