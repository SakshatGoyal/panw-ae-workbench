# Sales Play — Plain-English Reference

A companion to `sales-play-domain-model.md`. That document is the technical
spec — fields, enums, Figma variants. This one is for understanding the
domain the way an AE understands it, so designers and data architects can
make confident decisions without having to translate from schema first.

If something in here contradicts the technical doc, this document is the
source of truth for *meaning*; the technical doc is the source of truth for
*shape*.

---

## What is a Sales Play

A **sales play** is a sales motion built around a small, intentional bundle
of Palo Alto products. It exists because Marketing and the GTM team have
already done the work of figuring out: *if a customer looks like X, this
specific combination of products will land well with them.*

So a sales play is two things at once:

1. **A reusable pitch.** "Hardware Refresh" means roughly the same thing
   whether you're pitching it to Exxon Mobil or a regional bank — same
   product bundle, same value proposition, same objections to expect.
2. **A targeting filter.** Customers automatically qualify for a sales play
   when they meet certain conditions (install base age, existing
   competitor's gear, lack of a specific capability, etc.). Those
   conditions are pre-computed for the AE. The AE doesn't see the
   conditions in the matrix — they just see *which plays apply to which
   accounts.*

The conditions themselves are out of scope for the UI. We don't expose them
to the AE, and we don't ask the AE to manage them. Treat them as an oracle
that quietly populates the matrix.

> **Designer takeaway:** when you see a sales play appearing on an account,
> something upstream decided the account qualifies. The AE's job isn't to
> qualify — it's to *act* on the qualification.

---

## Sales Play Family

The 19 sales plays don't live as a flat list — they're grouped into **4
families**, and the family is meaningful, not cosmetic.

- **FW & CDSS** — the firewall and cloud-delivered security business.
- **SASE** — Prisma Access, SD-WAN, ZTNA. The secure-access business.
- **Cortex Cloud** — specialist-led advanced security (XDR, XSIAM, cloud).
- **Unit 42** — the incident response / services business.

Each family carries its own brand color and lives under one of PANW's
platform brands. This is why the family is more than a folder: it's the
*P&L line* a play rolls up into, and it's the *specialist team* the AE
brings in when the play turns serious.

In the matrix view, a family acts as a collapsible group of columns:

- **Collapsed:** the family shows a single "Summary" cell per account —
  the totaled dollar value of all plays in that family for that account.
- **Expanded:** the family fans out into one column per individual play.

The AE flips between these to zoom out (territory-level family rollup) and
zoom in (which specific play is stuck on which specific account).

---

## The 19 Sales Plays

Grouped by family. The play's name is what the AE sees and what they say
out loud when describing their pipeline.

- **FW & CDSS**
  - Hardware Refresh
  - Fortinet Displacement
  - SWFW Acceleration
  - SWFW Acceleration (NSDC)

- **SASE (Prisma Access, SD-WAN, ZTNA)**
  - GP to Prisma Access
  - PAB Existing PA Upgrade
  - PAB Standalone
  - Upsell SD-WAN Customers
  - PAB for Partners
  - Cortex (EDR, SIEM, SOAR)
  - XDR Acceleration

- **Cortex Cloud (Specialist-led advanced security GTM)**
  - XSIAM Splunk Takeout
  - DR Acceleration
  - Cortex Cloud Land & Attach
  - Radar to Cortex Upgrades

- **Unit 42**
  - Unit 42
  - Unit 42 No Cost Retainer

These names are not internal codes — they're the actual labels AEs use in
conversation. "I've got a *Splunk Takeout* on Exxon" is a complete
sentence at PANW.

> **Note on identity:** a sales play is identified by the **family + name**
> pair. The same play name does not appear across families.

---

## Sales Play Status

Status is the single most important field on a sales play for an account.
It's how the AE answers "what's the state of this motion?" without needing
any other context.

There are **7 statuses**, and they form a soft state machine: most plays
start at Not Touched and walk forward through Pitched into either a
Pursuing branch or a Deferred/Declined branch. Closed Won and Closed Lost
are terminal.

**Not Touched**
The play exists for this account (the conditions matched), but the AE
hasn't done anything with it yet. This is the default starting state, and
the matrix's main job is to surface these — *opportunities the AE hasn't
acted on*.

**Pitched**
The AE has raised the play with the customer. The customer hasn't said no,
but also hasn't said yes. This is a "ball is in their court" status.

**Deferred**
The customer is interested but not now. Maybe budget arrives next
quarter, maybe a migration has to happen first. The play is parked, with
intent to revisit. *Deferred plays still count as pipeline-adjacent — they
shouldn't be hidden, just deprioritized.*

**Declined**
The customer was pitched and explicitly passed. This isn't "lost a deal" —
no opportunity ever opened. The play is shelved.

**Pursuing**
The customer is engaged enough that the play has become a real **sales
opportunity**. From this status onward, the play is linked to one or more
opportunity records, and forecasting / pipeline conversations start using
the opportunity, not the play.

**Closed Won**
The opportunity tied to this play closed successfully.

**Closed Lost**
The opportunity tied to this play closed unsuccessfully.

**Status transitions, informally:**

```
Not Touched ──► Pitched ──► Pursuing ──► Closed Won / Closed Lost
                  │
                  ├──► Deferred (re-enters Pitched later)
                  └──► Declined (terminal)
```

> **Designer takeaway:** when treating statuses visually, the meaningful
> grouping isn't 7 colors of dot. It's roughly four buckets:
> *Inactive* (Not Touched, Declined), *In flight* (Pitched, Deferred),
> *Real opportunity* (Pursuing), and *Closed* (Won, Lost). Use that to
> drive emphasis and filtering, not the raw enum.

---

## Value / Dollar Amount

Every sales play that exists on an account has a **value** — an estimated
dollar amount for the deal that play would represent. This is what powers
sentences like "$24,000 DR Acceleration play with Exxon."

A few things to keep in mind:

- **Pre-pursuit value is an estimate.** Until the play becomes Pursuing
  and an opportunity is created, the dollar value is a model-generated
  guess based on the customer's install base and the play's typical deal
  size. It's directionally useful, not committed pipeline.
- **Post-pursuit value comes from the opportunity.** Once the play moves
  to Pursuing, the linked opportunity carries the authoritative dollar
  figure. The play's display value should mirror the opportunity's
  amount, not the original estimate.
- **Family summary value** is the sum of all play values for an account
  within that family — what shows in the collapsed family column.

---

## Relationship to Opportunities

A sales play and an opportunity are **not** the same thing.

- A **sales play** is a recommendation/motion: "this bundle, for this
  account, because of these conditions."
- An **opportunity** is a real record in Salesforce: a specific deal, with
  a quote, a stage, a forecast category, and a close date.

The bridge is the **Pursuing** status. When a play moves to Pursuing, an
opportunity gets created (or an existing opportunity gets linked), and
from that point forward the two records travel together. One sales play
can be linked to **one or more opportunities** — for example, the same
"SASE" pitch on a large account might spawn separate opportunities for
the access piece and the SD-WAN piece.

After the link is established, almost all the interesting *deal* data
lives on the opportunity: which products, stage, forecast category, last
activity, risks, etc. The play remains as the origin story — "this deal
exists because we ran this motion."

> **Architect takeaway:** model the play → opportunity relationship as
> one-to-many, by foreign key from opportunity to play. Don't denormalize
> opportunity fields onto the play; let the play stay thin.

---

## The Matrix View

The canonical visualization of all this is a **2D matrix**:

- **Rows = Accounts** (the AE's book of business, or a filtered slice).
- **Columns = Sales Plays**, grouped under their families.
- **Cells = Status + Value** for that (account, play) pair.

Accounts can be analyzed by Region, Territory, or Rep — those are
*pivots*, not different views. The matrix doesn't change shape; the
sorting/grouping of rows does.

A cell is *empty* if the account doesn't qualify for that play (the
conditions oracle didn't light it up). An empty cell is meaningfully
different from a Not Touched cell — empty means "not applicable," Not
Touched means "applicable but no action yet."

---

## How an AE Talks About Sales Plays

The fastest way to know the data model is right is to read AE sentences
out loud and check that every noun and number has a home in the data.

> "I have a **DR Acceleration** sales play with **Exxon Mobil** worth
> **$24,000** that has currently **not been pitched**."

Maps to: play (name + family) × account × value × status.

> "I have **$750,000 worth of SASE plays** with **Lucid Motors** —
> $100,000 not touched, $500,000 pursuing, and $150,000 deferred."

Maps to: family-level rollup for one account, broken down by status. This
is the *collapsed family cell* expanded into a tooltip or detail panel.

> "Show me every account in the **Bay Area** with a **Splunk Takeout** in
> Pitched, sorted by **value descending**."

Maps to: matrix filtered by territory pivot + play column + status,
sorted by cell value.

> "Which **Unit 42** plays have been sitting in Deferred for more than
> 60 days?"

Maps to: family filter + status filter + a *time-in-status* dimension.
(Time-in-status is not in the current spec — flag for future modeling.)

These sentences are the acceptance test. If the interface can't answer
one of them in a few clicks, the data model or the layout has a gap.

---

## What This Document Deliberately Doesn't Cover

- **The qualification conditions** that decide whether a play applies to
  an account. These exist upstream and are not exposed in the UI.
- **The matrix interaction model** — sorting, filtering, pivoting,
  selection. That belongs in the interface spec.
- **The opportunity domain** — stages, forecast categories, risks,
  contacts. See `account-opportunity-domain-model.md`.
- **Time-in-status, SLAs, and aging.** Not currently modeled; called out
  in the AE-sentence section as a likely future addition.

---

## Cross-references

- `sales-play-domain-model.md` — fields, enums, Figma variants. The
  shape-of-data version of everything above.
- `account-opportunity-domain-model.md` — what an opportunity is, once a
  play has been Pursuing'd into one.
- `filters-and-opportunity-table-domain-model.md` — the filter and sort
  vocabulary used to slice the matrix and the linked opportunity tables.
