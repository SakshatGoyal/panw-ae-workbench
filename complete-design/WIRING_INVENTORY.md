# Wiring Inventory — Button Click Handlers

Reconnaissance pass over `poc-exploration/src/compositions/opportunity-table.stories.tsx`
and `account-table.stories.tsx`. Every interactive affordance whose handler is currently
a no-op, placeholder, or fires only local state is listed here, along with what it should
open and whether the destination composition already exists in the repo.

> **Status of Goal 2:** `onExpand → AccountPanel` is wired as of this commit. All
> other rows below are still stubs.

---

## Opportunity Table

| # | Trigger | Location | Handler today | Should open | Destination exists? |
|---|---------|----------|---------------|-------------|---------------------|
| 1 | "Open on right" icon button | Row action pill, col 4 (Maximize icon) | `onExpand(row.id)` → sets `selectedId` in App | Right-rail **AccountPanel** | ✅ `poc-exploration/src/compositions/AE Account Panel.stories.tsx` — **wired in Goal 2** |
| 2 | "Ask question" icon button | Row action pill, col 4 (CommentAdd icon) | No-op click | **AI chat panel** | Partial — ai-interaction compositions exist at `poc-exploration/src/compositions/ai-interaction/` but no assembled chat-panel composition yet |
| 3 | "Update" button | Sales Play hover popover, col 3 | No-op (`/* hook */`) | **Sales play modal** | ✅ `poc-exploration/src/compositions/sales-play-modal.stories.tsx` → `SalesPlayModal` |
| 4 | "Modify" button | Upsell opportunity-type hover popover, col 2 | No-op (`/* hook */`) | **Sales play modal** (upsell flow) | ✅ `SalesPlayModal` — same component, likely `initialView="main"` scoped to the opportunity |
| 5 | "View quote" button | Quote ID hover popover, col 2 | No-op (`/* hook */`) | **Quote detail modal** | ❌ Not built — no quote-detail composition exists |
| 6 | "View account health" button | Account Health hover popover, col 3 | No-op (`/* hook */`) | Right-rail **AccountPanel** scrolled to Account Health section | ✅ AccountPanel exists; needs `initialOpenOppId` or a section-scroll prop (not yet exposed) |
| 7 | Opportunity name `<a>` | Col 1, primary text | `preventDefault` (no-op) | SFDC opportunity record (external navigation) | n/a — external URL; no in-app destination |
| 8 | Account name `<a>` | Col 1, secondary text | `preventDefault` (no-op) | Right-rail **AccountPanel** or SFDC account record | ✅ AccountPanel exists |

---

## Account Table

| # | Trigger | Location | Handler today | Should open | Destination exists? |
|---|---------|----------|---------------|-------------|---------------------|
| 1 | "Open on right" icon button | Row action pill, col 4 (Maximize icon) | `onExpand(row.id)` → sets `selectedId` in App | Right-rail **AccountPanel** | ✅ AccountPanel — **wired in Goal 2** |
| 2 | "Ask question" icon button | Row action pill, col 4 (CommentAdd icon) | No-op click | **AI chat panel** | Partial — ai-interaction compositions exist but no assembled panel |
| 3 | "View account health" button | Account Health hover popover, col 3 | No-op (`/* hook */`) | Right-rail **AccountPanel** at Account Health section | ✅ AccountPanel exists |
| 4 | "View EBC details" button | EBC hover popover, col 3 | No-op (`/* hook */`) | **EBC detail modal** | ❌ Not built |
| 5 | Account name `<a>` | Col 1, primary text | `preventDefault` (no-op) | Right-rail **AccountPanel** or SFDC account record | ✅ AccountPanel exists |
| 6 | Apex name `<a>` | Col 1, secondary text (conditional) | `preventDefault` (no-op) | Apex account's AccountPanel or SFDC | ✅ AccountPanel exists (no apex-specific panel variant yet) |

---

## Destinations that already exist

| Composition | Path | Notes |
|-------------|------|-------|
| AccountPanel | `poc-exploration/src/compositions/AE Account Panel.stories.tsx` | Accepts `data?: AccountPanelData` and `accountId?: string` (added in Goal 2) |
| SalesPlayModal | `poc-exploration/src/compositions/sales-play-modal.stories.tsx` | Three views: `main`, `linkContact`, `linkOpportunity` |
| AI interaction fragments | `poc-exploration/src/compositions/ai-interaction/` | Six story files (prompt entry, suggestions, selectable table, past sessions, chat header, response actions, user message, thought stream) — not assembled into a panel |

## Destinations that do not exist yet

- **Quote detail modal** — no composition
- **EBC detail modal** — no composition
- **Assembled AI chat panel** — fragments exist but no container/panel composition

---

## Mock data gaps noted during Goal 2

The following fields are not present per-account in
`poc-exploration/src/mock/data/accounts.ts` and fall back to the Cyberdyne fixture
defaults inside `buildPanelDataForAccountId`:

| Field | AccountPanelData key | Gap | Fallback used |
|-------|---------------------|-----|---------------|
| Apex account name | `apexName` | No `apexName` on `Account` type | `"—"` |
| Install base financials | `installBase` | No TCV / Incremental ACV / Margin / RPO on `Account` | Cyberdyne fixture values |
| Sales play instances + amounts | `salesPlays` | `Account.scenarios` lists scenario ids but no per-account play statuses or amounts | Cyberdyne fixture values |
| 12-month health trend | `healthTrend12` | No trend array on `Account` | Cyberdyne fixture values (3× healthy → 4× at-risk → 5× critical) |
| Per-product health breakdown | `productHealth` | No per-product `technical`/`adoption` breakdown on `Account` | Cyberdyne fixture values (Prisma Cloud, CDSS, Cortex XSOAR) |

Fields that **do** resolve per-account from the mock:

- `account` → `ACCOUNTS.find(...)` by index mapping (see §Row-id mapping below)
- `techHealth` → `account.health.technical`
- `adoptHealth` → `account.health.deploymentAdoption`
- `opportunities` → `OPPORTUNITIES.filter(o => o.accountId === account.id)`
- `renewalOpp` → first opportunity with `type === 'renewal' | 'renewal-and-upsell'`, else Cyberdyne stub

### Row-id mapping gap

`OpportunityRow.id` and `AccountRow.id` are sequential strings (`'1'`–`'N'`) — local to
the table fixture, not foreign keys into `Account.id`. The current implementation maps
`parseInt(id, 10) - 1` to `ACCOUNTS` by index (cycling with modulo). This shows
different real accounts in the panel per row, but the account name shown in the panel
will differ from the account name on the row. To fix: add `accountId: string` to
`OpportunityRow` / `AccountRow` using the canonical `Account.id` values, and fire that
instead of `row.id` from the Maximize button.
