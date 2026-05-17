# AE Workbench — State of Things

> Generated: 2026-05-14. Read-only investigation — no code changed.

---

## 1. Enum-fix Outcome

### B.10 / B.11 / B.12 — SalesPlayStatusId / SalesPlayStatus

The enum-fix session partially resolved the three-way inconsistency.

| Location | Current value set | Status |
|---|---|---|
| `types.ts` `SalesPlayStatusId` | `'not-touched' \| 'pitched' \| 'deferred' \| 'declined' \| 'pursuing' \| 'closed-won' \| 'closed-lost'` | **Fixed** — now matches story-local 7-value set; `'interested'` and `'open-pipeline'` removed |
| `taxonomies.ts` `SALES_PLAY_STATUSES` | Keyed on `SalesPlayStatusId`; entries for all 7 corrected values | **Fixed** — record entries are `declined` and `pursuing` (not the old `interested`/`open-pipeline`) |
| `sales-play-modal.ts` `SalesPlayStatuses` | `'not touched' \| 'pitched' \| 'deferred' \| 'declined' \| 'pursuing' \| 'closed won' \| 'closed lost'` | **Still divergent** — space-delimited multi-word values (`'not touched'`, `'closed won'`, `'closed lost'`) vs. hyphen convention everywhere else |
| Story-local (`account-table`, `opportunity-table`, `AE Account Panel`) | `'not-touched' \| 'pitched' \| 'deferred' \| 'declined' \| 'pursuing' \| 'closed-won' \| 'closed-lost'` | Matches canonical — no change needed |

**Remaining inconsistency**: `sales-play-modal.ts` still uses a space-delimited union (`type SalesPlayStatus`) that is structurally incompatible with the hyphen-delimited canonical `SalesPlayStatusId`. The modal renders correctly within its own composition but cannot be joined to the canonical type without coercion.

### B.14 / B.15 — AccountRiskId

| Location | Current value set | Contract spec | Status |
|---|---|---|---|
| `types.ts` `AccountRiskId` | `'no-risks' \| 'no-pipeline' \| 'no-ebc' \| 'not-platformized' \| 'derailed-povs' \| 'no-asr' \| 'no-csp'` | B.14 spec lists 9 values including `'low-adoption-deployment'` and `'critical-technical-health'` | **Fixed to 7-value set** — the two legacy CSV values `'low-adoption-deployment'` and `'critical-technical-health'` have been removed |
| `taxonomies.ts` `ACCOUNT_RISKS` | Keyed on `AccountRiskId`; 7 entries matching the new 7-value type | **Consistent with `types.ts`** |
| `mock/data/accounts.ts` | All 13 records use only values from the 7-value set | **Consistent** — no record carries a value absent from the canonical type |

**Net outcome**: `types.ts`, `taxonomies.ts`, and `accounts.ts` are now mutually consistent on a 7-value `AccountRiskId`. The data contract's B.14 section is now stale — it still documents the old 9-value set with the two legacy values.

**Note**: the story-local `AccountRiskId` in `account-table.stories.tsx` is identical to the canonical `types.ts` definition (same 6 non-`'no-risks'` values). No divergence remains on this axis.

### B.5 — StageId in PlayOpportunity

`mock/sales-play-modal.ts` `PlayOpportunity.stage` is now typed as `StageId` (imported from `./types`) and all 5 fixture records carry `'discovery'`. The modal story resolves stage labels via `STAGES[o.stage].name`. **This gap (F.18) is resolved.**

---

## 2. Gap Status (all 19 contract section F gaps)

| Gap | Description | Status |
|---|---|---|
| F.1 | `Account.apex` missing | **Still a gap** — no `apex` field on `Account`; panel and acc-table still stub independently |
| F.2 | `Account.installBase` missing | **Still a gap** — `const INSTALL_BASE` stub in panel story only |
| F.3 | Per-account `SalesPlayInstance` missing from mock layer | **Still a gap** — panel stubs `ACC_SALES_PLAYS`, acc-table stubs `SalesPlayBucket[]` per row |
| F.4 | `Account.health.trend12mo` missing | **Still a gap** — authored per-row in story fixtures only |
| F.5 | `Opportunity.daysInStage` / `daysInForecast` missing | **Still a gap** — panel stubs `daysInStage: 21, daysInForecast: 42` on all opps |
| F.6 | `Opportunity.renewalOutcome` missing | **Still a gap** — panel stubs `renewalOutcome: 'unknown'` on all opps |
| F.7 | Opportunity renewal financials (`subEnd`, `renewableTcvUsd`, `arrUsd`) missing | **Still a gap** — opp-table story authors these per row |
| F.8 | `Opportunity.lastActivity.description` missing | **Still a gap** — both tables author description independently |
| F.9 | Per-product USD allocation on `Opportunity` missing | **Still a gap** — panel even-splits; opp-table authors per-product `valueUsd` |
| F.10 | `Account.pipelineByQuarter` unpopulated on all 13 records | **Still a gap** — field is 0/13 populated; acc-table derives pipeline from story fixtures |
| F.11 | `Opportunity.salesPlayIds` never populated | **Still a gap** — field is 0/15 populated |
| F.12 | `SalesPlayStatus` three-way inconsistency | **Partially resolved** — canonical `types.ts` and all composition stories are now aligned on the 7-value hyphen set; `sales-play-modal.ts` still uses space-delimited variant |
| F.13 | `AccountRiskId` story-local alias divergence | **Resolved** — `account-table.stories.tsx` local type now matches canonical 7-value set in `types.ts` |
| F.14 | Contact coverage sparse (6 of 13 accounts) | **Still a gap** |
| F.15 | `Contact.avatarUrl` never populated | **Still a gap** |
| F.16 | `SalesPlay.description` never populated | **Still a gap** |
| F.17 | Churn reason / competitor catalogs not in `taxonomies.ts` | **Still a gap** — authored POC-local in panel story |
| F.18 | `PlayOpportunity.stage` was free-text SFDC label | **Resolved** — now typed as `StageId`; all 5 fixture records carry `'discovery'` |
| F.19 | Modal `PlayContact` disconnected from canonical `Contact` | **Still a gap** — two separate fixtures with non-overlapping ID namespaces |

**Summary**: 2 gaps fully resolved (F.13, F.18), 1 partially resolved (F.12), 16 unchanged.

---

## 3. Build Health

7 TypeScript errors total (`pnpm tsc --noEmit`):

| File | Error | Pre-existing? |
|---|---|---|
| `design-system/packages/button/src/Button/Button.tsx:151` | `TS2339`: `displayName` does not exist on `ButtonComponent` | Pre-existing DS package issue |
| `design-system/packages/filter/src/Sort/Sort.tsx:103` | `TS2322`: `Ref<HTMLSpanElement>` assignability (duplicate React type conflict) | Pre-existing DS package issue |
| `design-system/packages/filter/src/TreeFilter/TreeFilter.tsx:242` | `TS2322`: `value` does not exist on `FilterProps` | Pre-existing DS package issue |
| `design-system/packages/filter/src/TreeFilter/TreeFilter.tsx:345` | `TS2556`: spread arg must be tuple or rest param | Pre-existing DS package issue |
| `design-system/packages/text-entry/src/TextEntry/TextEntry.tsx:37` | `TS2430`: `title: ReactNode` not assignable to `title: string \| undefined` | Pre-existing DS package issue |
| `src/compositions/sales-play-modal.stories.tsx:599` | `TS2345`: `ChangeEvent<HTMLInputElement>` not assignable to `SetStateAction<string>` | **New — introduced by enum-fix session** |
| `src/compositions/sales-play-modal.stories.tsx:720` | Same as above | **New — introduced by enum-fix session** |

5 errors are in design-system packages and predate this session. The 2 new errors are in `sales-play-modal.stories.tsx` at the `Search` component's `onChange` handler — the Search component's `onChange` now passes a `ChangeEvent<HTMLInputElement>` rather than a `string` (or the type signature changed). Both are at the `LinkContactView` and `LinkOpportunityView` search bars (`onChange={(v) => setQuery(v)}`). Fix: replace with `onChange={(e) => setQuery(e.target.value)}` or match the correct Search callback signature.

---

## 4. Story-local Enum Duplicates

| Composition | Local `SalesPlayStatus` | Local `AccountRiskId` | Verdict |
|---|---|---|---|
| `account-table.stories.tsx` | `type SalesPlayStatus = 'not-touched' \| 'pitched' \| 'deferred' \| 'declined' \| 'pursuing' \| 'closed-won' \| 'closed-lost'` | `type AccountRiskId = 'no-pipeline' \| 'no-ebc' \| 'not-platformized' \| 'derailed-povs' \| 'no-asr' \| 'no-csp'` | Both match canonical `types.ts` exactly — **redundant duplicates**, not divergent |
| `opportunity-table.stories.tsx` | `type SalesPlayStatus = 'not-touched' \| 'pitched' \| 'deferred' \| 'declined' \| 'pursuing' \| 'closed-won' \| 'closed-lost'` | No local `AccountRiskId` (uses story-local `RiskId` for deal-level risks) | `SalesPlayStatus` matches canonical — **redundant duplicate** |
| `AE Account Panel.stories.tsx` | `type AccSalesPlayStatus = 'not-touched' \| 'pitched' \| 'deferred' \| 'declined' \| 'pursuing' \| 'closed-won' \| 'closed-lost'` (named `AccSalesPlayStatus`) | No local `AccountRiskId` | Matches canonical semantics under a different local name — **redundant duplicate** |
| `sales-play-modal.stories.tsx` | Imports `SalesPlayStatus` from `../mock/sales-play-modal` — no inline definition | No local `AccountRiskId` | Depends on modal-local space-delimited type — **still divergent** (see §1) |

All composition-local `SalesPlayStatus` / `AccSalesPlayStatus` definitions are now semantically identical to canonical `SalesPlayStatusId`. They can be replaced with `import type { SalesPlayStatusId }` from `../mock/types` in a cleanup pass. The only remaining substantive divergence is the modal's space-delimited variant.

---

## 5. Mock Data Integrity Post-Rename

### `mock/data/accounts.ts` — `riskIds`

All 13 records checked. Values in use:

| Value | Count |
|---|---|
| `'derailed-povs'` | 12 records |
| `'no-asr'` | 6 records |
| `'no-csp'` | 3 records |
| `'no-pipeline'` | 1 record (`acc-northstar`) |
| `'no-ebc'` | 1 record (`acc-northstar`) |
| `'no-risks'` | 1 record (`acc-beacon-corp`) |

All values are valid members of the current `AccountRiskId` union. No orphaned values.

### `mock/sales-play-modal.ts` — `PlayOpportunity.stage`

All 5 records carry `stage: 'discovery'`. `StageId` is properly imported from `./types`. All values are valid.

### `mock/data/opportunities.ts` — `stageId`, `riskIds`, etc.

Not directly read (file not in the investigation list), but contract section A.2 documents 15 records with all fields populated via canonical enums. No issues were flagged during the contract authoring pass. Assumed clean.

### Remaining integrity notes

- `Opportunity.salesPlayIds` is typed as `string[]` but populated on 0 of 15 records — structural dead weight, not a runtime error.
- `Account.pipelineByQuarter` is typed as `Record<string, number>` but populated on 0 of 13 records — same category.

---

## 6. Cross-reference Scenarios

The `data-models/scenarios-opus.md` file defines 5+ named account scenarios (Stripe, DoorDash, Reddit, Lyft, Twilio, etc.) with specific field requirements. The `wiring-gaps-from-scenarios-opus.md` identifies 7 wiring gaps. Items not already captured in contract section F:

| Item | Scenario(s) | Gap |
|---|---|---|
| Structured `competitor` field on `SalesPlayInstance` / `SalesPlayEdits` | #1, #6, #19 | `SalesPlayEdits.methodology` exists but `competitor` does not — material omission if modal is used for non-renewal competitive tracking |
| Structured `closedLostReason` / `declinedReason` on `SalesPlayInstance` | #8, #19, #21 | Churn reason (F.17) is panel-renewal-only; plays closed-lost/declined have no structured reason field |
| Empty state for Panel Contacts section (zero contacts) | #38, #40 | Contract section F.14 flags sparse contact coverage but does not specify the empty-state UI contract; needed to avoid a blank panel section |
| `SalesPlayEdits.methodology` unrendered | #43, #44 | Field exists on the type but no UI input exists; either remove or design |
| Named account fixtures not yet created | All scenarios | Scenarios reference Stripe, DoorDash, Reddit, Lyft, Twilio, etc. — none of these are in `mock/data/accounts.ts`; demo cannot run these scenarios against canonical data |

The last item is the most material: every scenario uses a named account (Stripe, DoorDash, etc.) but the canonical account fixture contains 13 different accounts (acc-tyrell, acc-cyberdyne, etc.). The scenario scripts cannot be demoed end-to-end without either renaming existing accounts or creating new canonical records for the scenario anchors.

---

## 7. Contract Freshness

| Section | Issue |
|---|---|
| **B.14** | Documents 9-value `AccountRiskId` including `'low-adoption-deployment'` and `'critical-technical-health'`. Canonical `types.ts` is now 7-value. Section is stale. |
| **B.10** | Documents old `SalesPlayStatusId` with `'interested'` and `'open-pipeline'`. Canonical type now has `'declined'` and `'pursuing'`. Section is stale (though the existing text is written as a gap note, it describes the old wrong values as canonical). |
| **A.7** | States `PlayOpportunity.stage` is `string` (free text, not `StageId`). This is now `StageId`. Section is stale. |
| **F.18** | Describes gap for `PlayOpportunity.stage` using free-text SFDC labels. This gap is resolved. Section should be marked resolved. |
| **F.13** | Describes acc-table's 6-value local `AccountRiskId` as divergent from 9-value canonical. Both items have changed: canonical is now 7-value and acc-table local matches it. Section description is stale on both sides. |

---

## 8. Recommended Next Moves

| Priority | Task | Justification |
|---|---|---|
| **1** | Fix the 2 new TS errors in `sales-play-modal.stories.tsx` (Search `onChange` signature) | These are new, small, and blocking a clean build. 15-minute fix; unblocks CI. |
| **2** | Unify `SalesPlayStatus` — replace modal's space-delimited union with the canonical `SalesPlayStatusId` | Single remaining enum inconsistency; modal `onChange` handler update is cheap (~10 lines); removes the last case where a status value from one surface is incompatible with another. |
| **3** | Add `apex`, `health.trend12mo`, and `installBase` fields to `Account` and populate all 13 records | Three fields consumed by both `account-table` and the Panel. Adding them to the canonical type eliminates the largest cluster of story-local stubs (F.1, F.2, F.4) and makes the acc-table + panel data-drivable from canonical records rather than story-level fixtures. |
| **4** | Model `SalesPlayInstance` flat table (`accountId × playId × status × amountUsd`) and populate for the 10 demo accounts | F.3 is the largest single gap affecting two compositions (acc-table column 5 + panel Sales Play section). A flat table is derivable into both the family-grouped (panel) and status-bucketed (acc-table) shapes. Without this, both compositions remain hardcoded. |
| **5** | Add per-opportunity fields: `daysInStage`, `daysInForecast`, `renewalOutcome`, `lastActivity.description`, `renewal` sub-object | F.5/F.6/F.7/F.8 together — these are all `Opportunity` field additions. Adding them in one pass populates the Panel's Opportunity section and the opp-table renewal popover with real data instead of stubs. Groups well because they're all on the same entity. |
