# Accounts Table — Reference

A spec and a guidebook in one document. Designed to be read end-to-end by
a PM, a designer, or an engineer without needing a separate domain doc
open.

Read this alongside `opportunities-table-reference.md`. The two tables
share most of their structural and interaction patterns; this doc focuses
on what's specific to accounts, and cross-references the opportunities
table where the behavior is identical.

---

## 1. Purpose

The accounts table is where an Account Executive (AE) scans their **book
of business at the customer level**, not the deal level. One row per
account, with enough information per row to answer two questions in a
single pass:

> *Which customers need a touchpoint? And where is my book of business
> heading?*

These two questions are deliberate. The first is operational — which
customers have I gone quiet on, which ones haven't had an EBC, which ones
are stacking up risks. The second is strategic — how is the pipeline
distributed across my customer base, which accounts are large and
healthy, which ones are large and slipping.

A row that doesn't help with either of those questions is wasting space.

---

## 2. The Data the Table Reads

### Account
The customer. Has a name, an optional Apex Account parent, products under
contract, opportunities in flight, a health rating, risk factors,
activity history, and Sales Play motions in various states. Full domain
spec: `account-opportunity-domain-model.md`.

### Apex Account
The parent account, when one exists. Most accounts have one — a parent
that aggregates child entities (subsidiaries, divisions, regional units).
A handful of standalone accounts don't. When present, Apex Account is
shown as quiet secondary information on the row; it's never a primary
identifier.

### Pipeline by Quarter
For the current quarter and the next three fiscal quarters, the sum of
opportunity values expected to close in that quarter. This is *forward-
looking* money — not booked, not earned, in flight. A quarter with zero
pipeline is still shown (as a placeholder) so the AE can see absence as
data.

### ARR (Annual Recurring Revenue)
The recurring annual revenue contributed by this account, summed across
all products under contract. This is *booked* money, not pipeline. ARR
is the cleanest single measure of how big a customer currently is to the
business.

### LTV (Lifetime Value)
The total contracted revenue this account has produced for PANW across
the lifetime of the relationship. Where ARR answers "how big are they
right now," LTV answers "how big have they been to us, all in." LTV is
useful for distinguishing newly-large customers (high ARR, low LTV) from
long-standing strategic accounts (high ARR, high LTV) — even though
they look similar on the current-year books, they get treated very
differently in escalations and renewals.

### Account Health
Same definition as the opportunities table. Three-step scale (Healthy /
At Risk / Critical), derived from the max-severity of Technical Health
and Adoption & Deployment Health. Full rule and truth table:
`opportunities-table-reference.md` section 2.

### Account Risk Factors
**Account-level** risks — distinct from the deal-level risks on the
opportunities table. Six named risks:

- 📭 No Pipeline in CQ + Next 4Q
- 🏛️ No EBCs in last year
- 🔌 Not Platformized
- 🧪 Derailed POVs
- 🌀 No ASR / Stale ASR
- 🚧 No customer success plan

An account can carry multiple risk factors. Each one is a discrete tag
with an emoji and a short label. The emoji is part of the label, not
decorative.

These risks are about the *account relationship* — coverage gaps,
platform adoption, advocacy. They're orthogonal to whether any
individual deal is going well.

### Last Activity
The most recent meaningful touchpoint with anyone at the account. Same
severity ladder as the opportunities table (0–7 days neutral, 7–21 days
caution, >21 days error).

### EBC (Executive Briefing Center)
The date of the account's most recent Executive Briefing Center visit.
EBCs are the marquee customer touchpoint — multi-hour, on-site, exec-
level engagements at PANW. The recency of the last EBC is a meaningful
proxy for strategic health.

Severity ladder:

- **0–180 days:** healthy, neutral treatment.
- **180–365 days:** caution. The account is overdue for re-engagement.
- **>365 days:** danger. Strategic touchpoint has lapsed.
- **No EBC on record:** treated as danger. The tag reads "No EBC on
  record" instead of a date. (Note: there is no "Never" option in the
  EBC filter — accounts with no EBC fall into the "Over 365 days"
  bucket for filtering.)

### Products + Per-Product ARR
Each product the account has under contract, and the ARR each one
contributes. Same product taxonomy and brand-icon mapping as the
opportunities table. Where the opportunities table shows *share of deal
value* on hover, the accounts table shows *ARR contribution* — same
visual pattern, different meaning of the dollar number.

### Sales Plays — Status Bucket Rollup
For each account, the AE can see how the active Sales Play motions are
distributed across statuses. Each status bucket is a single tag with the
total dollar value of plays in that status (e.g., `Pursuing: $1.2M`).
Up to 7 status tags can exist (Not Touched / Pitched / Deferred /
Declined / Pursuing / Closed Won / Closed Lost), but most accounts will
only have 1–3 in practice.

Full Sales Play and status definitions: `sales-play-reference.md`.

---

## 3. Controls

Same overall shape as the opportunities table: a search + sort + key
metrics row, a tag filter row, and a row of data filters. Most behaviors
carry over identically; this section focuses on what's different.

### 3.1 Search Bar
Searches across **Account Name, Apex Account, Products, and Sales Play
name**. Quote IDs and Opportunity Names are *not* searched — those are
deal-level concerns and live on the opportunities table.

### 3.2 Sort
Single-axis options:

- Account Name
- Total Pipeline (next 4Q sum)
- LTV
- Risk Factor Count
- Days Since EBC
- Days Since Last Activity

**Default: Risk Factor Count, descending.** EBC and Last Activity dates
are touchpoint formalities — useful, but not the strongest triage
signal. Risk Factor Count puts the most-broken accounts at the top
immediately on page load.

### 3.3 Key Metrics (top right)

> **47 accounts · $84M ARR · $12.4M pipeline next 4Q**

Three numbers. ARR tells the AE how big their book is *today*; pipeline
tells them where it's heading. Both reflect the current filtered view,
not the full territory.

### 3.4 The Tag Filter (density control)
Same pattern as the opportunities table. Toggles the visibility of: each
per-quarter pipeline tag, EBC, Last Activity, Account Health, Risk
Factors, Products. All on by default. Account Name and Apex Account are
never toggleable. Per-Account-Risk visibility lives inside the risk-
count popover; Sales Plays toggle as a single column.

### 3.5 Close Date / Pipeline Quarters (multi-select)
Same as the opportunities table. Defaults: **This Quarter + next three
quarters**. Filters accounts that have any pipeline in the selected
quarters.

### 3.6 Account Health (multi-select)
Same as the opportunities table, with the same Overall vs. sub-axis
caution. **Default: At Risk + Critical on Overall.**

### 3.7 Last Activity (single-select)
`All` · `Last 7 days` · `7–21 days` · `Over 21 days`. Maps directly to
the Last Activity severity ladder.

### 3.8 EBC (single-select)
`All` · `Within 180 days` · `180–365 days` · `Over 365 days`.

No "Never" option. Accounts with no EBC on record fall into the
**Over 365 days** bucket for filtering — treated the same as a stale
EBC.

### 3.9 Upsell (single-select)
`All` · `With upsell pipeline` · `No upsell pipeline`.

This filter replaces the Opportunity Type filter from the opportunities
table. At the account level, what matters isn't *every type* of deal in
flight; it's specifically whether the AE has an upsell motion working.
Accounts with no upsell pipeline are the ones the AE may want to
prospect into; accounts with active upsell pipeline are already in
motion.

### 3.10 Account Risk Factors (multi-select)
`All` (default), or any combination of the six risks listed in section 2.
Same pattern as the opportunities table's risk factor filter, but with
the account-level taxonomy.

### 3.11 Products (multi-select)
Same product tree as the opportunities table. `All` by default.

### Filters intentionally dropped vs. the opportunities table

- **Forecast** — accounts don't have a forecast category.
- **Stage** — accounts don't have a stage.
- **Opportunity Type** — replaced by the Upsell filter above.
- **Apex Account** — not worth a dedicated filter. Apex Account is shown
  on every row already, and most accounts have one. If the AE wants to
  see "everything under Lucid Motors," search handles it.

---

## 4. The Columns

Seven columns, narrated left-to-right: **who · where the money is going ·
what's wrong · what they own · what we're pitching them · what they're
worth.**

### 4.1 Column 1 — Account (the "who")

Two lines of text, same treatment as the opportunities table:

- **Account Name** — primary, `body-compact-02`, bold, secondary text
  color.
- **Apex Account** — smaller, `label-02`, tertiary text color. Only
  shown when an Apex Account exists.

**Interactions:** hovering the Apex Account text shows a small popover
with a roll-up of the parent: total sub-account count and combined ARR
under that apex. Useful for AEs working multi-entity customers (one
parent with many subsidiaries) who need to size the whole relationship
at a glance. The Account Name line itself has no hover — the row's
expand action (Column 6) is the way into deeper detail.

---

### 4.2 Column 2 — Opportunities (the "where the money is going")

**What it shows**

Four pipeline tags, one per fiscal quarter, covering the current quarter
and the next three:

> [CQ: $123K] [Q1FY27: $456K] [Q2FY27: $—] [Q3FY27: $98K]

The current quarter's tag is labeled **CQ** (not its fiscal name) — `CQ`
is the only label used; the named current quarter and `CQ` are not
shown as separate tags.

**Empty quarter behavior**

A quarter with no pipeline still appears as a placeholder tag with an
em-dash where the value would be (`Q2FY27: $—`). The AE should see the
*absence* of pipeline as data, not as a missing tag.

**Interactions**

On hover, a popover for that quarter, headed with the quarter label
(e.g., *Q1FY27 pipeline*), then a small table listing the opportunities
closing in that quarter. Each row shows opportunity type and dollar
value, no opportunity name.

> Net New &nbsp;&nbsp; $200K  
> Upsell &nbsp;&nbsp;&nbsp;&nbsp; $256K

This lets the AE quickly see whether a quarter's pipeline is one big
deal or several smaller ones, and what kind of motion is driving it.
Names are omitted intentionally — at this level the AE is sizing the
quarter, not picking a deal. To act on a specific deal, they jump to the
opportunities table.

---

### 4.3 Column 3 — Activities & Risks (the "what's wrong")

This column carries four sub-cells, similar to the opportunities table
but with EBC added as a fourth.

#### Last Activity
Same as the opportunities table: `## days ago` with the same severity
colors and icons (0–7 neutral, 7–21 caution, >21 error). Hover shows the
activity description.

#### Account Health
Same as the opportunities table — same three-color treatment, same
12-month-trend popover with Technical and Adoption sub-tags and the
"View Account Health" ghost brand button. The Overall = max(Technical,
Adoption) rule applies here unchanged.

#### Risk Factors
Count of *account-level* risk factors (the six-value taxonomy in section
2). Neutral color, no icon. Hover shows the full list, in the same
emoji + label format as the filter. When an account has zero account-
level risks, this sub-cell is omitted from the column rather than
rendered as a zero.

> **Important:** these are different from the risk factors on the
> opportunities table. Deal-level risks belong to a single opportunity;
> account-level risks belong to the customer relationship as a whole.
> Don't conflate them in the data model.

#### EBC
New sub-cell, unique to the accounts table. Tag format: `EBC on Apr 14
2026` for accounts with a recorded EBC, or `No EBC on record` for those
without.

Color treatment per the severity ladder in section 2:

- 0–180 days → neutral
- 180–365 days → caution
- >365 days OR no EBC on record → danger

**Hover:** a small popover showing the EBC date, the topic/agenda
summary (if recorded), the executive attendees from PANW's side, and a
ghost brand "View EBC details" button. For accounts with no EBC on
record, the hover instead shows an *EBC history* heading followed by
the line *"This account has not had an EBC on file."* No View details
button in that case.

---

### 4.4 Column 4 — Products (the "what they own")

**What it shows**

Same tag rendering and same brand-icon mapping as the opportunities
table, but products wrap vertically inside the cell rather than
collapsing into `+N`. The row is tall enough that hiding products
behind an overflow tag would trade legibility for no visual gain. Refer
to `opportunities-table-reference.md` section 4.4 for the full brand-
icon mapping table — it's identical here.

**Tag ordering within the cell**

Products are shown in **descending order by ARR**, so the biggest
revenue drivers appear first and lower-ARR products are the ones that
collapse into `+N`. This matches the AE's mental model: "what is this
customer mostly running?"

**Interactions**

Identical to the opportunities table, with one important difference: the
hover popover for each product shows **ARR contribution**, not share of
a deal value.

- Hovering an individual product tag → popover with `[brand icon]
  Product Name — $XXX,XXX ARR`.

The visual pattern is the same as the opportunities table; the meaning
of the dollar number is different. This is the difference between
"products you're trying to *sell* this customer" (opp table) and
"products this customer *already owns*" (account table).

---

### 4.5 Column 5 — Sales Plays (the "what we're pitching them")

**What it shows**

Up to seven status-bucketed tags, one per Sales Play status. Each tag
reads as the status name and the total dollar value of plays in that
status for this account, e.g.:

> [Not Touched: $850K] [Pitched: $1.2M] [Pursuing: $2.4M]

Most accounts will only have 1–3 tags — it's rare for a single account
to have plays simultaneously sitting in all seven statuses.

**Tag ordering**

Status tags appear in **lifecycle order**, always:

> Not Touched → Pitched → Deferred → Declined → Pursuing → Closed Won →
> Closed Lost

Predictable ordering beats per-row dollar sorting here. The AE wants to
scan the leftmost tag (Not Touched) for action items, and predictable
order means they know where to look without re-orienting on every row.
This also reflects the operational reality: the earliest-stage statuses
(Not Touched, Pitched) are where the AE has the most leverage to
intervene, and that's the information that benefits from being visually
"first."

**Color treatment**

Every status renders as a neutral chip; emphasis moves off the chip
ground onto the leading status **icon color**. The icon carries the
entire hierarchy:

- **Not Touched** — strongest icon emphasis. The action items the
  table exists to surface.
- **Pursuing** — softer icon emphasis. Real opportunities in motion.
- **Pitched** and **Deferred** — neutral icon. Informational.
- **Declined**, **Closed Won**, **Closed Lost** — de-emphasized icon.
  They document history, not action.

Keeping the chip neutral and routing emphasis through the icon keeps
the column quiet at scan distance — the AE's eye still lands on Not
Touched without the row becoming a wall of red tags.

**Interactions**

On hover, a popover listing the individual Sales Plays in that status
bucket. Each row shows the play name and its dollar value.

> Not Touched — $850K  
> Hardware Refresh &nbsp;&nbsp; $400K  
> Fortinet Displacement &nbsp;&nbsp; $450K

The popover heading format is `{Status label} — {bucket total}`.

This is how the AE goes from "I have $850K of Not Touched plays on Exxon"
to "the ones that haven't been touched are Hardware Refresh and Fortinet
Displacement" without leaving the table.

---

### 4.6 Column 6 — Value (the "what they're worth")

Two numbers, stacked. Same `body-02` size and secondary text-color
treatment as the opportunities table's value column.

> **$2.4M** ARR  
> **$18.6M** LTV

The two numbers answer different questions:

- **ARR** — how big this customer is *right now*. Recurring revenue
  this fiscal year.
- **LTV** — how big this customer has been to PANW *all in*. Total
  contracted lifetime value.

An account with high ARR and low LTV is a fast-growing newcomer. An
account with high ARR and high LTV is a strategic long-term customer. An
account with low ARR and high LTV is a customer that's shrinking — and
that's a signal the AE may want to act on. Showing both lets the AE
read those patterns at a glance.

No interactions. The value column is read-only; the per-product ARR
breakdown lives on Column 4's hover.

---

### 4.7 Column 7 — Actions

Same pattern as the opportunities table: two ghost brand icon buttons —
an **AI** action and an **expand** action. Both are visual hooks;
specific interactions to be defined. Expand opens an Account detail
panel, which is its own spec.

---

## 5. Defaults & First Impression

When an AE opens the page cold (no prior filter state), this is what
they should see:

- **All tags on** in the tag filter.
- **Pipeline Quarters:** This Quarter + next three.
- **Account Health:** At Risk + Critical on Overall (sub-axes off).
- **Last Activity:** All.
- **EBC:** All.
- **Upsell:** All.
- **Account Risk Factors:** All.
- **Products:** All.
- **Sort: Risk Factor Count, descending.**

The result: the AE lands on a screen biased toward the customers who
need them most. The top of the table is the *triage queue*; deeper in
the list is the strategic read.

---

## 6. What This Doc Doesn't Cover

- **The AI button behavior** (Column 7) — pending.
- **The expand action behavior** (Column 7) — pending. Probably opens
  an Account detail panel; that panel is its own spec.
- **Empty states** — zero accounts, zero matches after filtering,
  loading. These need design and are not in this doc.
- **Error states** — failed loads, stale data warnings. Same.
- **Bulk actions** — no selection model in this spec.
- **The exact LTV calculation methodology** — defined here as "total
  contracted lifetime value." If finance maintains a different
  definition (e.g., projected vs. historical), the data architect
  should reconcile before wiring this column to a real source.
- **EBC detail panel contents** — the "View EBC details" button leads
  somewhere; that surface is out of scope.

---

## 7. Cross-references

- `opportunities-table-reference.md` — the sister doc; many behaviors
  are defined there and referenced from here.
- `account-opportunity-domain-model.md` — full domain spec for
  accounts, opportunities, products, risks.
- `sales-play-reference.md` — what a sales play is, plain-English.
- `sales-play-domain-model.md` — schema-level sales play spec.
- `filters-and-opportunity-table-domain-model.md` — earlier reverse-
  engineered filter spec; some shared vocabulary.
