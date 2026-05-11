# Account Panel — Reference

A companion doc, in the same spirit as `accounts-table-reference.md` and
`opportunities-table-reference.md`. Written so a designer, a PM, or a data
architect can read it end-to-end without having to translate from a Figma
file first.

If something here contradicts the Figma file, the Figma is the source of
truth for *visual shape*; this doc is the source of truth for *what the
panel is and why each section exists*.

Companion to:
- `accounts-table-reference.md` — the rows that open this panel.
- `opportunities-table-reference.md` — the opportunity rows that open this
  panel in its "highlight an opportunity" mode.
- `sales-play-reference.md` — the only section in this panel whose data
  model lives outside this doc.

---

## 1. Purpose

The account panel is the **expanded view** that slides in from the right
whenever an AE opens a row from either the Accounts table or the
Opportunities table. It exists so an AE can stop scanning rows and start
*reading* a single customer: their install base, their motion (sales
plays), their open deals, and their health — all without leaving the
workbench.

It answers a different question than the tables do.

- The **tables** answer *"which rows deserve my attention right now?"*
- The **panel** answers *"now that I'm looking at this one — what do I
  need to know before I act?"*

It is the closest thing the workbench has to a one-page customer brief.

---

## 2. Panel Anatomy

Top to bottom, the panel has six blocks. The first is the header; the
rest are independently collapsible accordions.

1. **Header** — title, account identity, close
2. **Install Base** — what the customer already owns
3. **Sales Play** — which motions are live on this account
4. **Opportunities in Next 4Q** — open pipeline within a 4-quarter window
5. **Account Health** — overall, sub-axis, and per-product
6. *(Future)* anything else a section owner decides belongs here

Width is fixed (~336–400 px). Height is whatever the content needs;
sections scroll inside the panel, not the page.

---

## 3. Header

The non-accordion top block. Always visible.

Fields, in order:

- **Account Preview** — the panel title.
- **Account** — the account name (e.g., *Ironic Arts and Crafts*) with
  an open-in-new-tab affordance that links to the full account detail
  surface.
- **Apex Account** — the parent/roll-up account (e.g., *Ironic Inc.*),
  also with an open-in-new-tab. Omitted when the account *is* its own
  apex.
- **LTV** — Lifetime Value, shown large (e.g., *$7.35M*). This is the
  same LTV definition used in `accounts-table-reference.md` (total
  contracted revenue across the lifetime of the relationship). It lives
  in the header because it's the single number AEs use to *size* a
  customer at a glance.

The header has no actions beyond close and the two link-outs.

---

## 4. Install Base

> What the customer *already owns* and what that's worth to PANW today.

Defaults to **expanded**. Four label/value rows plus a deep link.

- **TCV** — Total Contract Value across all active contracts on the
  account.
- **Incremental ACV** — the year-over-year change in Annual Contract
  Value. Shown in green when positive; this is the AE's "are we growing
  this customer?" signal.
- **Margin** — gross margin percentage on the install base. Also green
  when healthy. Color is a quality signal, not just a sign signal.
- **RPO** — Remaining Performance Obligation, i.e., contracted revenue
  that hasn't yet been recognized.

Below the four rows: **Open Customer Estate** — a deep link to the
Customer Estate surface, where the install base can be inspected by
product, by contract, and by site. The estate surface is the source of
truth; this section is its *executive summary inside the panel*.

---

## 5. Sales Play

> Where the AE *hasn't acted yet*. The section is a Not-Touched-first
> view of the account's qualified plays.

Defaults to **expanded**. The section is a two-level accordion: section
→ family → individual play.

The core idea is inverted from "what's live." Live work is already on the
AE's calendar; what they *miss* is the qualified play they haven't
opened yet. So at every level of this accordion, the surfaced dollar
value is the **sum of Not Touched plays** — not the sum of all plays.

**Section level (collapsed)**
- Title: *Sales Play*.
- A single **Not Touched total** tag (e.g., a red Not-Touched indicator
  + *$55,900*). This is the dollar value of plays the AE has not yet
  acted on across all families. If the number is high, the AE is
  leaving qualified motion on the table.
- If there are no Not Touched plays on the account, the tag is omitted
  rather than shown as $0.

**Family level (one accordion row per family present on the account)**
- *FW & CDSS*, *SASE*, *Cortex Cloud*, *Unit 42* — the four families
  defined in `sales-play-reference.md`.
- Only families with at least one qualified play on this account
  appear. Not every account qualifies for every family.
- Each row shows the family name and the **family-level Not Touched
  total** (e.g., *Cortex Cloud — $24,900*). Same rule as the section
  total: this is *only* the Not Touched portion of the family, not all
  plays in the family.
- Expanding the row reveals every individual play in that family that
  applies to this account.

**Per-play sub-rows (inside an expanded family)**
- Examples: *XSIAM Splunk Takeout — $24,900*, *Hardware Refresh —
  $2,500*, *GP to Prisma Access — $38,500*.
- Each sub-row shows the play name, a **status indicator** for that
  play's individual status (drawn from the 7-status enum in
  `sales-play-reference.md` — Not Touched, Pitched, Deferred, Declined,
  Pursuing, Closed Won, Closed Lost), and the play's dollar value.
- The dollar value here is the **play's own value**, regardless of
  status. The rollup at the family and section levels filters to Not
  Touched; the leaf row shows the underlying number for every play.
- The dollar-value rule from `sales-play-reference.md` still applies:
  estimate pre-pursuit, opportunity-derived post-pursuit.

**Deep link** — *Open in Sales Play Console*. Same pattern as Install
Base: the panel is a summary; the console is the manage surface.

> **Why Not Touched, not "live":** an AE doesn't need the panel to
> remind them about deals already in flight — those are on their
> calendar. The panel's job is to surface motion they've forgotten or
> never opened. The visual hierarchy follows that intent: collapsed
> rollups answer *"how much haven't I touched?"*, expanded leaves
> answer *"what's the state of each one?"*.

---

## 6. Opportunities in Next 4Q

> Every open opportunity on this account whose close date falls inside
> the current quarter or the next three.

Defaults to **expanded**. This section is the panel's tightest parity
surface with the opportunities table — the same tag tokens, popover
patterns, and interaction grammar are reused here.

> **Terminology note:** throughout this section, "**tag**" means the
> DS `<Tags />` component (the same one used in
> `opportunity-table.stories.tsx`). On hover, certain tags open a
> **popover** — a small surface with a single ghost-brand action
> button. This is the same pattern the table uses (e.g., the Quote ID
> tag opens a *View Quote* popover).

**Section header**
- Title: *Opportunities in Next 4Q*.
- A **total value tag** (e.g., *$3.8M*) — the sum of all opportunity
  amounts in the window. This is *pipeline*, not booked revenue.

**Opportunity rows** (one per open opportunity)
- Collapsed-row content: opportunity name, then a summary line showing
  *amount + type + closing quarter* (e.g., *"$750,000 renewal closing in
  CQ"*).
- Three opportunity types appear here as plain-text qualifiers:
  *renewal*, *upsell*, *net-new* — same enum as the opportunities
  table.
- The closing quarter resolves to *CQ* for the current quarter and to
  the named quarter (*Q4FY26*, *Q2FY27*, etc.) for future quarters,
  matching the convention from `accounts-table-reference.md`.

**Expanded opportunity (the snapshot)**

A label/value block where the right-hand value is, in most rows, a tag
that opens a popover on hover. Every interactive value uses the same
*tag-as-trigger → popover-with-single-button* pattern as the table —
no inline link-outs, no raw text URLs.

Rows, in order:

1. **Active Quote** — a tag showing the quote ID (e.g., *Q-100874*).
   On hover, a popover with a single *View Quote* ghost-brand button.
   Omitted when no quote exists.
2. **Closing in** — a tag showing days to close (e.g., *38 days*). On
   hover, a popover with a single *View in SFDC* ghost-brand button.
3. **Stage** — a tag using the canonical stage name (*Discovery*,
   *Solutioning*, *Tech Validation*, *Active POV*, *Negotiation*) plus
   days-in-stage. On hover, a popover with *View in SFDC*.
4. **ARR** — the ARR figure, displayed as a value. (Not interactive on
   its own.)
5. **Forecast** — a tag with the forecast category (*Pipeline*, *Best
   Case*, *Commit*, *Closed*) and days-in-forecast. On hover, a
   popover with *View in SFDC*. Added for parity with the table; the
   earlier draft did not include this row.
6. **Opportunity Type** — a tag with the type (*Net-New*, *Upsell*,
   *Renewal*). On hover, a popover with *View in SFDC*. (The table's
   Upsell-specific *Modify* tooltip and Renewal-specific subscription
   popover live on the table only; the panel keeps a single pattern
   for simplicity.)
7. **Opportunity Risks** — a danger-toned count tag (e.g., *4*) using
   the same red-tag treatment as the table. On hover, a popover
   listing every applied risk, identical to the table's risk popover.
   Risk taxonomy is the 9-value opportunity-level set in
   `opportunities-table-reference.md`.
8. **Products** — a single tag carrying the **unique brand icons** for
   the products on the opportunity (e.g., one Strata + one Prisma +
   one Cortex icon, even if there are multiple Prisma products).
   Brand icons are not recolored by the tag. On hover, a popover
   listing each product on the opportunity and its **contribution to
   the opportunity's total value** (same per-product-contribution
   pattern as the table's product popover).
9. **Last Activity** — a tag showing the activity *type* (e.g.,
   *Customer Engagement*). On hover, a popover with *View in SFDC*.
10. **Last Activity Date** — a tag showing the formatted date (e.g.,
    *12 Mar 2026*). On hover, a popover showing the **actual activity
    record** (subject + short description) — not just a link.
11. **Renewal Outcome** — present **only when Opportunity Type is
    Renewal**. See below.

Every account should have at least one Renewal-type opportunity inside
the 4-quarter window — this is a mock-data invariant, not a UI rule,
so the Renewal Outcome control always has a place to demonstrate
itself.

**Footer (per expanded opportunity)**
A single ghost-accent **Open in SFDC** button, sitting at the bottom
of the expanded snapshot. This is the one *explicit* deep link inside
the opportunity; the per-row popovers all point at the same SFDC
record, but the footer button is what the AE reaches for when they
want to leave the panel entirely.

**Renewal Outcome — the editable disposition control**

Renders **only when Opportunity Type = Renewal**. For all other types
the row is omitted.

Same six-value enum as in the opportunities table:
- **Unknown** — gray
- **Full Renewal / Upsell** — green
- **Downsell** — orange
- **Churn** — red
- **Displacement (HW Refresh)** — purple
- **Duplicate** — slate

The trigger is a tag-as-button. Clicking opens a DS Flyout
(equivalent to the table's Renewal Outcome editor) with two flows:

- **Non-Churn flow** *(Unknown, Full Renewal/Upsell, Downsell,
  Displacement, Duplicate)* — a single optional *Notes* field. *Save*
  is enabled the moment the disposition is chosen.
- **Churn flow** — adds two required dropdowns *before* notes:
  - **Churn / Dismissal Reason** *(required)*
  - **Competitor Replacement** *(required)*
  - **Notes** *(required in the Churn flow)*

The Figma "Renewal Snapshot" component models this as a stepper
(*Step=00 → Confirmed*, across Full Renewal and Churn flows). The
panel renders one step at a time; *Save* commits the chosen
disposition and collapses the form back to a tag.

> **Architect note:** Churn requires structured reason + competitor
> because Churn is the only disposition with downstream reporting
> obligations. All other dispositions are commentary; Churn is data.

---

## 7. Account Health

> A health summary derived from two sub-axes, with a per-product
> breakdown listed underneath.

Defaults to **expanded**. **Single-level accordion** — there are no
nested accordions inside this section.

**Section header**
- Title: *Account Health*.
- An **overall health tag** (e.g., *Critical*). This is the same
  derived field as in the accounts and opportunities tables: it equals
  the **worst** of *Technical Health* and *Adoption Health* on the
  severity ladder.

**Health trend**
A small bar sparkline showing health over time. Each bar is one period
(week or month — to confirm with the data team). Bars are color-coded
to the same Healthy / At-Risk / Critical scheme used everywhere else.
This is the *only* time-series visualization in the panel; everywhere
else, signals are point-in-time.

**Account-level sub-axis rows**
Two rows, one per sub-axis, each with its own health tag:

- **Technical Health** — *Healthy / At-Risk / Critical*. Signals: POV
  outcomes, integration completeness, support escalation pattern.
- **Deployment and Adoption Health** — *Healthy / At-Risk / Critical*.
  Signals: feature activation, MAU/DAU, time-to-value.

The two sub-axis tags together are the **source** of the overall tag
in the header. One of them will always match the overall tag; the
other may be healthier.

**Per-product breakdown**
A flat list — one block per product the account owns, no nested
expansion, no table. Each product block has three lines:

- **Heading row** — the product's **brand icon** on the left, the
  product name next to it, and the **product's ARR** on the right
  (e.g., *Cortex XSOAR · $480K*). This anchors the per-product health
  to a dollar size, so the AE can tell whether a Critical product is a
  large or small slice of the account.
- **Technical Health row** — label on the left, a health tag
  (*Healthy / At-Risk / Critical*) on the right.
- **Deployment and Adoption Health row** — label on the left, a
  health tag on the right.

The Figma's two-column matrix was tighter on horizontal space but
felt crammed at panel width; this per-product stacked layout trades
vertical space for legibility.

This breakdown is what an AE uses to answer *"is the account critical
because of one bad product, or because of the whole portfolio?"* —
the most common follow-up once they've seen the overall tag.

> **Caution, repeated from the table docs:** the overall tag is
> derived. If a UI affordance ever lets a user filter or edit Overall
> Health independently of the sub-axes, that's a logic bug; the only
> way to change Overall is to change one of the sub-axes.

---

## 8. Behaviors That Repeat Across Sections

- **Accordion** — every block from Install Base downward is an
  independent accordion. Collapsing one does not collapse the others.
  Open/closed state is *per-session*, not persisted to the account.
- **Tag + popover grammar** — interactive values inside the
  Opportunities section follow the same *tag-as-trigger →
  single-button popover* pattern as the opportunities table. Reusing
  the same primitive across the two surfaces is intentional; an AE
  who learned the table already knows the panel.
- **Deep links** — each section that has a fuller surface elsewhere
  (Install Base → Customer Estate, Sales Play → Sales Play Console,
  Opportunities → SFDC) exposes a single deep link. The panel never
  tries to *replace* the deep surface; it summarizes and hands off.
- **No editing in the panel except Renewal Outcome.** Everything else
  is read-only. The one exception is Renewal Outcome because it's a
  disposition the AE is uniquely qualified to set, and forcing a
  context switch to do that would kill the workflow.

---

## 9. How an AE Talks About the Panel

> "Open Ironic Arts and Crafts — they're a $7.35M customer."

Maps to: header — account name + LTV.

> "Their Sales Play tag says $55.9K untouched. SASE alone is $38.5K I
> haven't opened. That's where I should spend the morning."

Maps to: Sales Play section header tag (Not Touched total), family
row Not Touched total, individual play status.

> "Pull up the SentinelOne renewal. $750K closing this quarter, Best
> Case-In, 67 days in forecast, 4 risks — three guesses what's wrong."

Maps to: opportunity expanded snapshot — ARR, Forecast tag,
days-in-forecast, Opportunity Risks tag.

> "They're Critical overall because Cortex XSOAR is Critical on the
> Technical axis. Everything else is Healthy. That's a one-product
> problem."

Maps to: Account Health overall tag, sub-axis tags, per-product
breakdown.

These four sentences are the acceptance test. If the panel can't
answer one of them in a single glance, the layout has a gap.

---

## 10. What This Document Deliberately Doesn't Cover

- **The full sales-play data model.** See `sales-play-reference.md`.
- **The opportunity column semantics.** See
  `opportunities-table-reference.md`.
- **The account-level risk taxonomy.** That lives on the table row, not
  in the panel — the panel uses opportunity-level risks inside the
  Opportunity Snapshot and overall/sub-axis health at the section
  level. See `accounts-table-reference.md` for the account-level risks
  list.
- **The Customer Estate, Sales Play Console, and Opportunity Detail
  surfaces.** Those are the deep targets of this panel's link-outs and
  have their own specs.
- **Time-in-status aging on Sales Plays.** Not yet modeled (called out
  in `sales-play-reference.md` as a future addition).
- **The shape of the health-trend sparkline data.** Period granularity
  and lookback window need confirmation with the data team.

---

## 11. Cross-references

- `accounts-table-reference.md` — the table whose rows open this
  panel.
- `opportunities-table-reference.md` — the table whose rows also open
  this panel, and the source of truth for the Opportunity Snapshot's
  fields, tag tokens, and popover patterns.
- `sales-play-reference.md` — families, statuses, value rules, and the
  matrix view that mirrors the Sales Play section.
- `sales-play-domain-model.md` — the technical/shape companion to the
  sales-play reference doc.
