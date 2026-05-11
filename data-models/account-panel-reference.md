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

## 2. Two Open Modes — Account vs Opportunity

The panel is **the same component** in both cases. Only the initial state
differs.

**Account mode** *(opened from a row in the Accounts table)*
- All sections render in their **default collapsed/summary state**.
- The Opportunities section shows the list of opportunities in the next 4
  quarters, all collapsed.
- This is the "read the customer" view.

**Opportunity mode** *(opened from a row in the Opportunities table)*
- Same panel, same account context, but the panel scrolls/opens with the
  **selected opportunity expanded** inside the Opportunities section.
- Sibling opportunities on the same account remain visible but collapsed,
  so the AE can still see the bigger picture around the deal they
  clicked.
- This is the "read a specific deal in the context of its account" view.

> **Designer takeaway:** treat opportunity mode as a *deep link into a
> section*, not a different layout. There is no separate "opportunity
> panel."

---

## 3. Panel Anatomy

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

## 4. Header

The non-accordion top block. Always visible.

Fields, in order:

- **Account Preview** — the panel title. The same string regardless of
  which mode opened it.
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
- **Regional Manager** / **Account Owner** — the two people responsible
  for the account. Stacked, with a small connecting indicator showing
  the reporting relationship (manager above owner).

The header has no actions beyond close and the two link-outs.

---

## 5. Install Base

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

> **Note for data architects:** none of these four numbers are derived
> inside the workbench. They roll up from finance / contracts systems.
> The panel reads them; it does not compute them.

---

## 6. Sales Play

> Which Palo Alto sales motions are currently live on this account, what
> they're worth, and what state each is in.

Defaults to **expanded**. The section is a small two-level accordion.

**Section header**
- Title: *Sales Play*.
- A single **total value** chip with a status icon (e.g., a red urgency
  badge + *$55,900*). This is the sum of all play values on the account,
  not just the urgent ones. The icon reflects the *most urgent* status
  across the plays — typically Not Touched.

**Per-family rows** (one row per sales play family present)
- *FW & CDSS*, *SASE*, *Cortex Cloud*, *Unit 42* — the four families
  defined in `sales-play-reference.md`.
- Each row shows the family name, a **status icon** representing the
  most urgent play in that family, and the **family-level total dollar
  value** (sum of all plays in that family for this account).
- A row is expandable; expanding it reveals each individual play in
  that family with its own status icon and dollar value.

**Per-play sub-rows** (inside an expanded family)
- Examples: *XSIAM Splunk Takeout — $24,900*, *Hardware Refresh —
  $2,500*, *GP to Prisma Access — $38,500*.
- The icon column carries the play's **status**, drawn from the 7-status
  enum in `sales-play-reference.md`. The intended visual mapping (to
  confirm with the design system):
  - 🔴 Not Touched — red urgency badge (highest visual emphasis)
  - 📅 Pitched — calendar/in-flight glyph
  - 🎧 Deferred — listening/parked glyph
  - 👍 Pursuing — affirmative glyph
  - ✅ Closed Won — green check
  - ⊗ Closed Lost / Declined — gray or black X
  - *(empty cell on the table = play does not apply; here, plays that
    don't apply are simply not listed)*
- The dollar value follows the play-value rule from
  `sales-play-reference.md`: estimate pre-pursuit, opportunity-derived
  post-pursuit.

**Deep link** — *Open in Sales Play Console*. Same pattern as Install
Base: the panel is a summary; the console is the manage surface.

> **Designer note:** the section deliberately keeps families *and* plays
> on the same panel. Collapsed-family rollup gives the territory-level
> read; expanded plays give the actionable read. This mirrors the
> collapse/expand behavior of family columns in the sales-play matrix.

---

## 7. Opportunities in Next 4Q

> Every open opportunity on this account whose close date falls inside
> the current quarter or the next three.

Defaults to **expanded**. This is the section that is most affected by
which mode opened the panel (see Section 2).

**Section header**
- A status dot (color reflects the worst forecast/risk signal among the
  opportunities — to confirm).
- Title: *Opportunities in Next 4Q*.
- A **total value chip** (e.g., *$3.8M*) — the sum of all opportunity
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

**Expanded opportunity** (the snapshot)
A 9-row label/value block — the *Opportunity Snapshot* component in
Figma. Rows, in order:

1. **Active Quote** — a link-out to the live quote document (e.g.,
   *Q-100874*). Empty when no quote exists yet.
2. **Closing in** — days to close (e.g., *38 days*).
3. **Stage** — the stage tag (one of the 5 named stages) plus
   **days-in-stage** (e.g., *Stage 4 · 35 days*). Days-in-stage is the
   aging signal the opportunities table also surfaces.
4. **ARR** — the ARR figure plus the **forecast category** tag (e.g.,
   *Best Case-In*) and the days the opp has spent in that forecast
   category.
5. **Opportunity Type** — *Expand Business*, *Renewal*, *Net-New*, etc.
6. **Opportunity Risks** — a red count badge (e.g., *4*) with a chevron
   that expands the full risk list. Uses the 9-risk taxonomy from
   `opportunities-table-reference.md` — opportunity-level risks, not
   account-level.
7. **Products** — comma-separated list with an *and N more* affordance
   when the list exceeds the inline budget. Info-icon hover reveals
   the full list.
8. **Last Activity** — the typed activity category (e.g., *Customer
   Engagement*).
9. **Last Activity Date** — formatted date (e.g., *12 Mar 2026*).
10. **Renewal Outcome** — the renewal disposition control (see below).
    Present on every opportunity row; *Unknown* by default.

**Renewal Outcome — the editable disposition control**

Same six-value enum as in the opportunities table, but inside the panel
it shows up *inline on the snapshot* rather than as a popover anchored
to a table cell.

Disposition values (with the chip color convention):
- **Unknown** — gray
- **Full Renewal / Upsell** — green
- **Downsell** — orange
- **Churn** — red
- **Displacement (HW Refresh)** — purple
- **Duplicate** — slate

The control opens an inline mini-form. Two flows:

- **Non-Churn flow** *(Unknown, Full Renewal/Upsell, Downsell,
  Displacement, Duplicate)* — a single optional *Notes* field. *Save*
  is enabled the moment the disposition is chosen; notes are optional
  but typed-as-required visually so reps know they're encouraged.
- **Churn flow** — adds two required dropdowns *before* notes:
  - **Churn / Dismissal Reason** *(required)*
  - **Competitor Replacement** *(required)*
  - **Notes** *(required, in the Churn flow)*

The Figma "Renewal Snapshot" component models this as a stepper
(*Step=00 → Confirmed* across Full Renewal and Churn flows). The
**meaning** of that stepper is: the rep is committing to a disposition
and providing enough structured context for forecasting / churn-cause
analytics to use. The panel renders one step at a time inline; *Save*
commits the chosen step and collapses the form back to the chip.

> **Architect note:** Churn requires structured reason + competitor
> because Churn is the only disposition with downstream reporting
> obligations. All other dispositions are commentary; Churn is data.

---

## 8. Account Health

> A health summary derived from two sub-axes and a per-product
> breakdown.

Defaults to **expanded**.

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

**Sub-axis rows**
Two rows, one per sub-axis, each with its own status tag:

- **Technical Health** — *Healthy / At-Risk / Critical*. Signals: POV
  outcomes, integration completeness, support escalation pattern.
- **Deployment and Adoption Health** — *Healthy / At-Risk / Critical*.
  Signals: feature activation, MAU/DAU, time-to-value.

The two sub-axis tags together are the **source** of the overall tag
in the header. One of them will always match the overall tag; the
other may be healthier.

**Per-product matrix**
A small table with three columns: *Product / Technical / Deployment*.
One row per product the account owns. Each cell is a tag in the same
three-step severity scheme.

This matrix is what an AE uses to answer *"is the account critical
because of one bad product, or because of the whole portfolio?"* —
the most common follow-up question once they've seen the overall tag.

> **Caution, repeated from the table docs:** the overall tag is
> derived. If a UI affordance ever lets a user filter or edit Overall
> Health independently of the sub-axes, that's a logic bug; the only
> way to change Overall is to change one of the sub-axes.

---

## 9. Behaviors That Repeat Across Sections

- **Accordion** — every block from Install Base downward is an
  independent accordion. Collapsing one does not collapse the others.
  Open/closed state is *per-session*, not persisted to the account.
- **Deep links** — each section that has a fuller surface elsewhere
  (Install Base → Customer Estate, Sales Play → Sales Play Console,
  Opportunities → Opportunity detail page, Account Health → Account
  Health detail) exposes a single deep link. The panel never tries to
  *replace* the deep surface; it summarizes and hands off.
- **Mode-aware initial state** — Opportunity mode pre-expands the
  matching opportunity row. No other section's default state changes
  between modes.
- **No editing in the panel except Renewal Outcome.** Everything else
  is read-only. This is intentional: the panel is for *reading the
  customer*, not for managing it. The one exception is Renewal Outcome
  because it's a disposition the AE is uniquely qualified to set, and
  forcing a context switch to do that would kill the workflow.

---

## 10. How an AE Talks About the Panel

> "Open Ironic Arts and Crafts — they're a $7.35M customer, owned by
> Victor, under Daniel in the region."

Maps to: header — LTV, owner, regional manager.

> "Pull up the panel; their SASE play is $38.5K untouched and their
> XSIAM Splunk Takeout is $24.9K untouched. That's where I should
> spend the morning."

Maps to: Sales Play section, expanded per-family rows, status icons.

> "Click into the SentinelOne renewal. $750K closing this quarter,
> Best Case-In, 67 days in forecast, 4 risks — three guesses what's
> wrong."

Maps to: Opportunity mode, snapshot expanded, ARR + forecast tag +
days-in-stage + opportunity risks count.

> "They're Critical overall because Cortex XSOAR is Critical on the
> Technical axis. Everything else is Healthy. That's a one-product
> problem."

Maps to: Account Health overall tag, sub-axis tags, per-product
matrix.

These four sentences are the acceptance test. If the panel can't
answer one of them in a single glance, the layout has a gap.

---

## 11. What This Document Deliberately Doesn't Cover

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

## 12. Cross-references

- `accounts-table-reference.md` — the table whose rows open this panel
  in *Account mode*.
- `opportunities-table-reference.md` — the table whose rows open this
  panel in *Opportunity mode*, and the source of truth for the
  Opportunity Snapshot's fields.
- `sales-play-reference.md` — families, statuses, value rules, and the
  matrix view that mirrors the Sales Play section.
- `sales-play-domain-model.md` — the technical/shape companion to the
  sales-play reference doc.
