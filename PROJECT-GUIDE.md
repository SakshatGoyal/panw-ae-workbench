# AE Workbench — Project Guide

> For someone opening this repo for the first time. Last updated: 2026-05-15.

---

## What this project is

The AE Workbench is a high-fidelity interactive mockup of a sales tool for Palo Alto Networks account executives. It shows an AE's opportunity pipeline, account health, renewal tracking, and sales play management in a single interface. The goal is to demonstrate the complete UI experience before any real backend exists — every data point comes from curated TypeScript fixtures, not APIs.

The project has two parallel tracks that feed each other: a **design system** (a library of reusable React components built to PANW's visual language) and the **application compositions** (page-level assemblies that wire those components together with mock data). A third track — the **data layer** — defines the entity model, generates realistic demo fixtures (54 accounts, 235 opportunities, 246 sales play instances), and documents the gap between what the UI needs and what exists.

---

## How the project is organized

```
panw-ae-workbench/
├── design-system/          # @ds/* component packages + Storybook
│   ├── packages/           # 31 individual @ds/* npm packages (accordion, button, …)
│   ├── .storybook/         # Storybook config for the DS
│   ├── tests/              # Vitest unit tests for foundation tokens
│   ├── scripts/            # Build utilities (clean, token utils)
│   └── demo/               # Static HTML demos (spacing, radius, elevation, etc.)
│
├── poc-exploration/        # Storybook compositions — isolated story-per-surface
│   ├── src/compositions/   # 5 main stories: opp-table, acc-table, panel, modal, side-nav
│   ├── src/mock/           # Types, taxonomies, derivations, helpers, data barrel
│   │   └── data/           # Canonical TS fixtures: accounts, opportunities, contacts, plays
│   └── .storybook/         # Storybook config for compositions
│
├── complete-design/        # Assembled Vite app — all compositions wired into one shell
│   ├── src/                # App.tsx (root), shell/, page/ components, styles/
│   ├── tests/              # Playwright behavioral tests
│   └── dist/               # Built output (gitignored)
│
├── data-models/            # Domain analysis, data contracts, mock data CSVs, audit docs
│   ├── mock-data-csv/      # CSV source data (54 accounts, 235 opps, …)
│   └── *.md                # Domain models, reference docs, gap analysis, scenario scripts
│
└── .claude/                # AI agent instructions and session tooling
    ├── agents/             # panw-design-system-engineer agent definition
    ├── commands/           # Slash command definitions (ideate-setup)
    └── ds-aesthetic-guide/ # Visual token reference (spacing, radius, shadows, motion, …)
```

**Key relationships:**
- `poc-exploration` imports `@ds/*` packages from `design-system` and mock data from its own `src/mock/`.
- `complete-design` imports composition components directly from `poc-exploration/src/compositions/` and data from `poc-exploration/src/mock/data/`.
- Mock data flows: CSVs in `data-models/mock-data-csv/` → generator script (`gen-mock-data.mjs`) → TypeScript fixtures in `poc-exploration/src/mock/data/`.

---

## The key files

| File | Purpose | When to read it |
|------|---------|-----------------|
| `CLAUDE.md` | Project rules for AI agents: visual review protocol, pre-cleanup safety, bootstrap instructions | Before any work session |
| `design-system/COMPONENT-PORTING-TEMPLATE.md` | Full engineering spec for porting a new DS component (file structure, props, SCSS, stories, tests, preflight) | Before touching any `@ds/*` package |
| `data-models/mock-data-architecture.md` | Why the mock layer is structured the way it is: taxonomy/records/derivations separation, FK-not-string pattern, scenarios-as-tags | Before adding or modifying mock data |
| `data-models/data-contract.md` | What every entity field is, whether it's populated, and which compositions consume it. The source of truth on data gaps | When wiring a new composition or debugging missing data |
| `data-models/state-of-things.md` | Current build health, gap resolution status (which of the 19 contract gaps are open/fixed), recommended next moves | Current status snapshot |
| `data-models/mock-data-csv/README.md` | All 50 demo scenarios, their anchor accounts, outlier accounts, distribution audit | Understanding what the demo dataset represents |
| `complete-design/WIRING_INVENTORY.md` | Every interactive affordance, its current handler status, and what it should open | When wiring button click handlers |
| `complete-design/src/App.tsx` | The root component — how all compositions are assembled, navigation state, modal state, panel intent | Understanding the live app's state machine |
| `.claude/agents/panw-design-system-engineer.md` | The specialist agent role definition — design philosophy, aesthetic rules, verification workflow | Running AI-assisted DS work |

---

## File types and what they mean

**Source code** — `design-system/packages/*/src/`, `poc-exploration/src/`, `complete-design/src/`. The actual implementations. DS packages use React 19 + TypeScript strict + PropTypes + SCSS. Compositions use TSX stories.

**Mock data (TypeScript)** — `poc-exploration/src/mock/`. Type-safe fixture data imported directly by stories. Three tiers: `types.ts` (interfaces), `taxonomies.ts` (enum registries with icons/colors), `derivations.ts` (pure severity/formatting functions), `data/*.ts` (actual records).

**Mock data (CSV)** — `data-models/mock-data-csv/`. Human-authored source for the 54-account demo dataset. Processed by `gen-mock-data.mjs` to produce the TypeScript fixtures. Accounts, opportunities, contacts, sales plays, EBCs, health trends.

**Domain models** — `data-models/*-domain-model.md`, `data-models/*-reference.md`. Reverse-engineered from Figma. Document what fields each entity has, what UI surfaces them, what the enumerated values are. Read-only reference; not executed.

**Contract and gap docs** — `data-models/data-contract.md`, `data-models/state-of-things.md`, `data-models/wiring-gaps-from-scenarios-opus.md`. Track the delta between what the UI needs and what the canonical mock layer provides. Actively maintained.

**Scenario scripts** — `data-models/scenarios-opus.md`. First-person walk-throughs of 50 named demo scenarios (as AE Anna Novak). Drive what the CSV dataset needed to contain. Read when preparing a demo.

**AI governance** — `CLAUDE.md`, `.claude/agents/`, `.claude/ds-aesthetic-guide/`. Instruction files read by AI coding agents at session start. Not executed by runtime code.

**Playwright tests** — `complete-design/tests/behavior-hunt.spec.ts`. Behavioral tests that run against the live Vite dev server. 24 tests; 2 confirmed bugs as of 2026-05-14.

**Audit artifacts** — `data-models/bug-hunt.md`, `data-models/behavior-hunt.md`. Manual and automated bug-hunt outputs. Gitignored (`.gitignore` excludes them), but present in the working tree as untracked files.

---

## How work flows

**1. Design → DS component**
Figma frame or description → read `COMPONENT-PORTING-TEMPLATE.md` → create `design-system/packages/<name>/` with src, SCSS in `packages/styles/`, stories, Vitest tests → run ESLint + `vitest run` + `build-storybook` preflight checks → visual verification via Playwright screenshot.

**2. DS component → Composition**
Component available in `@ds/*` → author or update a story in `poc-exploration/src/compositions/` → import from `@/mock` barrel for data → run `pnpm storybook` in `poc-exploration/` (port 38274) → screenshot and designer review.

**3. CSV → Mock data**
Edit CSVs in `data-models/mock-data-csv/` → run `node data-models/gen-mock-data.mjs` → TypeScript fixtures regenerated in `poc-exploration/src/mock/data/` → compositions pick up new data on next Storybook reload.

**4. Composition → Assembled app**
Composition exported from story file → imported in `complete-design/src/App.tsx` → wired via `onExpand` / `onOpenSalesPlay` props into the shared panel/modal state machine → run `pnpm dev` in `complete-design/` (port 5173) → run `npx playwright test` to verify behavior.

**Bootstrap (first time or after clean):**
```sh
cd design-system
pnpm install
pnpm run build:packages   # generates gitignored CSS artifacts — required
pnpm run storybook        # DS Storybook on port 6011
```
```sh
cd poc-exploration
# No separate install — uses workspace node_modules
pnpm run storybook        # Composition Storybook on port 38274
```
```sh
cd complete-design
pnpm install
pnpm run dev              # Assembled app on port 5173
```

Use `pnpm`, not `npm`. Homebrew npm rejects `workspace:*` dependencies.

---

## Quality and traceability

**Visual review** — Every screenshot of a rendered surface requires an explicit designer review enumerated in the response (wrapping, spacing, token violations, alignment drift, missing states). Governed by `CLAUDE.md`.

**Vitest unit tests** — `design-system/tests/` has tests for foundation tokens: elevation, spacing, radius, type, and foundation rollup. Run with `pnpm test` from `design-system/`.

**Playwright behavioral tests** — `complete-design/tests/behavior-hunt.spec.ts`. 24 tests covering navigation, table interactions (sort, filter, pagination, row expand, modal open), panel state, and cross-composition wiring. Run `npx playwright test` from `complete-design/`.

**TypeScript strict** — `pnpm tsc --noEmit` from repo root. As of 2026-05-14: 7 total TS errors (5 pre-existing in DS packages, 2 new in `sales-play-modal.stories.tsx` from a Search onChange signature mismatch).

**Error scan** — The `/error-scan` skill runs ESLint, TS type check, and Storybook build checks. Must state tool coverage explicitly — a storybook-build pass does not mean all stories load at runtime.

**Traceability** — Bug IDs start at #1 in `bug-hunt.md` (13 P1–P3 bugs, manual walkthrough). Behavioral issue IDs start at #100 in `behavior-hunt.md` (2 confirmed bugs: #112 raw CSS leak, #121 cross-composition panel wiring). Contract gaps are labeled F.1–F.19.

---

## Where things stand now

**Completed:**
- Design system: all 31 `@ds/*` packages implemented (button, icons, filter, tags, pagination, popover, flyout, tooltip, accordion, tabs, and more). Storybook builds and serves.
- Mock data layer: full taxonomy/records/derivations architecture. 54 accounts, 235 opportunities, 246 sales play instances, 151 contacts, 17 sales plays, 71 EBCs generated from CSVs.
- Compositions: opportunity table (with hover popovers, sort, filter, pagination), account table, account panel, sales play modal, side nav — all authored as Storybook stories.
- Assembled app (`complete-design`): all compositions wired into a shell with left nav, resizable right rail, account panel, and modal. Navigation between Opportunity Workbench and Account Workbench works.

**In progress / known gaps:**
- 16 of 19 data contract gaps (F-series) remain open. Most significant: `apex`, `installBase`, `health.trend12mo` absent from canonical `Account` type; `SalesPlayInstance` not per-account in mock layer; per-opportunity renewal fields (`daysInStage`, `renewalOutcome`, `lastActivity.description`) missing from canonical `Opportunity`.
- 2 new TypeScript errors in `sales-play-modal.stories.tsx` (Search `onChange` signature).
- 13 visual/functional bugs in `bug-hunt.md` (P1: panel ARR always shows $4.38M regardless of account; P1: account panel hardcoded header data not per-account).
- Search, filter toggles, and "tags" chip in opp-table and acc-table do not affect rows in the assembled app (filter state wired story-local, not threaded into `complete-design`).
- AI chat panel fragments exist but no assembled container.
- Quote detail modal and EBC detail modal not built.
- 2 nav items ("Sales Play Workbench" and others) leak raw CSS into `<main>` when clicked.

**Recommended next steps (from `state-of-things.md`):**
1. Fix 2 TS errors in `sales-play-modal.stories.tsx`.
2. Unify `SalesPlayStatus` — replace modal's space-delimited union with canonical `SalesPlayStatusId`.
3. Add `apex`, `health.trend12mo`, `installBase` to canonical `Account` type.
4. Model per-account `SalesPlayInstance` flat table.
5. Add per-opportunity fields: `daysInStage`, `daysInForecast`, `renewalOutcome`, `lastActivity.description`.

---

## Complete file inventory

### Root

| File | Description | Last Modified | Approx Words |
|------|-------------|---------------|--------------|
| `CLAUDE.md` | Project rules for AI agents (visual review, safety, bootstrap) | 2026-05-08 | 440 |
| `.gitignore` | Ignores node_modules, dist, .tmp, playwright artifacts, some audit docs, root PNGs | 2026-05-15 | 53 |
| `acc-row*.png`, `account-workbench.png`, etc. | Session verification screenshots (untracked, gitignored) | varies | — |

### `.claude/`

| File | Description | Last Modified | Approx Words |
|------|-------------|---------------|--------------|
| `agents/panw-design-system-engineer.md` | Full agent persona: design philosophy, workflow, visual verification rules | 2026-05-07 | 1374 |
| `commands/ideate-setup.md` | Slash command for parallel ideation sessions | 2026-05-08 | 225 |
| `ds-aesthetic-guide/stage-background-colors.md` | Token reference — background color usage | 2026-05-07 | — |
| `ds-aesthetic-guide/stage-components.md` | Index of all DS components with trigger clauses | 2026-05-07 | 709 |
| `ds-aesthetic-guide/stage-lines.md` | Border/divider token reference | 2026-05-07 | — |
| `ds-aesthetic-guide/stage-motion.md` | Animation/transition token reference | 2026-05-07 | — |
| `ds-aesthetic-guide/stage-radius.md` | Radius token reference with role-based rules | 2026-05-07 | — |
| `ds-aesthetic-guide/stage-shadows.md` | Elevation/shadow token reference | 2026-05-07 | — |
| `ds-aesthetic-guide/stage-spacing.md` | Spacing scale (4px grid) and page padding rules | 2026-05-07 | — |
| `ds-aesthetic-guide/stage-text-and-icons.md` | Typography and icon usage rules | 2026-05-07 | — |
| `launch.json` | Dev server port definitions for Claude Code | 2026-05-08 | — |
| `settings.local.json` | Local permission allowlist for AI agent tools | 2026-05-12 | — |

### `complete-design/`

| File | Description | Last Modified | Approx Words |
|------|-------------|---------------|--------------|
| `src/App.tsx` | Root component — nav state, panel intent, modal state, composition wiring | 2026-05-14 | 509 |
| `src/shell/AppShell.tsx` | Three-column layout: left nav rail, main column, right rail | 2026-05-13 | 53 |
| `src/shell/NavRail.tsx` | Left navigation rail | 2026-05-13 | 53 |
| `src/shell/ResizableRightRail.tsx` | Drag-to-resize right panel container | 2026-05-12 | 323 |
| `src/shell/Footer.tsx` | App footer | 2026-05-12 | — |
| `src/page/ContainerTabs.tsx` | Tab container for page-level views | 2026-05-12 | 67 |
| `src/page/PageHeader.tsx` | Page header component | 2026-05-13 | 15 |
| `src/page/PlanSummaryTile.tsx` | Plan summary tile placeholder | 2026-05-12 | 18 |
| `src/page/TableTile.tsx` | Table tile wrapper | 2026-05-14 | 82 |
| `src/styles/app.css` | All app-level CSS (shell layout, opp-page, panel, table classes) | 2026-05-14 | 1127 |
| `src/system.scss` | DS token + component CSS import root | 2026-05-12 | — |
| `src/main.tsx` | React entry point | 2026-05-12 | — |
| `WIRING_INVENTORY.md` | Every button/click handler with its stub status and destination | 2026-05-14 | 955 |
| `package.json` | Vite + React 19 + Playwright + SCSS | 2026-05-14 | 45 |
| `vite.config.ts` | Vite config | 2026-05-12 | 98 |
| `playwright.config.ts` | Playwright config targeting localhost:5173 | 2026-05-14 | 56 |
| `tsconfig.json` | TypeScript config | 2026-05-12 | — |
| `tests/behavior-hunt.spec.ts` | 24 Playwright behavioral tests; 2 confirmed bugs | 2026-05-14 | 3336 |
| `index.html` | Vite HTML entry | 2026-05-12 | — |
| `dist/` | Built output (gitignored) | — | — |

### `data-models/`

| File | Description | Last Modified | Approx Words |
|------|-------------|---------------|--------------|
| `data-contract.md` | Full entity field inventory: Account (A.1), Opportunity (A.2), SalesPlay (A.3+), all gap sections (F.1–F.19) | 2026-05-14 | 4714 |
| `state-of-things.md` | Current gap resolution status, TS error count, story-local enum duplicates, recommended next moves | 2026-05-14 | 2050 |
| `mock-data-architecture.md` | Design doc for the taxonomy/records/derivations mock layer pattern | 2026-05-12 | 1620 |
| `scenarios-opus.md` | 50 first-person AE demo scenarios with data requirements and UI surface coverage | 2026-05-14 | 4300 |
| `translation-report.md` | Phase B translator log: CSV→TS record counts, FK decisions, alias mismatches | 2026-05-14 | 1535 |
| `gen-mock-data.mjs` | Generator script: reads CSVs, outputs TS fixtures to `poc-exploration/src/mock/data/` | 2026-05-14 | 1310 |
| `account-opportunity-domain-model.md` | Figma reverse-engineering: Account and Opportunity entity fields and actions | 2026-05-12 | 4031 |
| `sales-play-domain-model.md` | Figma reverse-engineering: SalesPlay entity fields and status machine | 2026-05-12 | 3011 |
| `accounts-table-reference.md` | Column-by-column spec for the Account Workbench table | 2026-05-12 | 3146 |
| `opportunities-table-reference.md` | Column-by-column spec for the Opportunity Workbench table | 2026-05-12 | 4302 |
| `account-panel-reference.md` | Section-by-section spec for the Account Panel right rail | 2026-05-12 | 2934 |
| `sales-play-modal-reference.md` | Field-by-field spec for the Sales Play modal | 2026-05-12 | 1569 |
| `sales-play-reference.md` | Sales play list/card surface spec | 2026-05-10 | 1805 |
| `plan-summary-reference.md` | Plan Summary tile spec | 2026-05-12 | 1876 |
| `filters-and-opportunity-table-domain-model.md` | Filter panel + opp-table interaction model | 2026-05-08 | 2485 |
| `behavior-hunt.md` | Automated behavioral bug hunt results (24 tests, 2 confirmed bugs — untracked, gitignored) | 2026-05-14 | 1205 |
| `bug-hunt.md` | Manual visual bug hunt (13 P1–P3 bugs — untracked, gitignored) | 2026-05-14 | 2229 |
| `coverage-matrix-opus.md` | Scenario-to-contract coverage matrix (untracked, gitignored) | 2026-05-14 | — |
| `wiring-gaps-from-scenarios-opus.md` | 7 affordance gaps surfaced during scenario authoring (untracked, gitignored) | 2026-05-14 | — |
| `mock-data-csv/README.md` | CSV dataset documentation: row counts, scenario-to-account mapping, outlier anchors, distribution audit | 2026-05-14 | 2377 |
| `mock-data-csv/accounts.csv` | 54 account rows | 2026-05-14 | 257 |
| `mock-data-csv/opportunities.csv` | 235 opportunity rows | 2026-05-14 | 1552 |
| `mock-data-csv/contacts.csv` | 151 contact rows | 2026-05-14 | — |
| `mock-data-csv/sales-plays.csv` | 17 sales play definitions | 2026-05-14 | — |
| `mock-data-csv/sales-play-instances.csv` | 246 per-account play instance rows | 2026-05-14 | — |
| `mock-data-csv/ebcs.csv` | 71 EBC (Executive Briefing Center) records | 2026-05-14 | — |
| `mock-data-csv/health-trend.csv` | 648 monthly health snapshots (12 per account) | 2026-05-14 | — |
| `mock-data-csv/opportunity-product-allocations.csv` | 272 per-product value allocation rows (untracked) | 2026-05-14 | — |

### `design-system/`

| File | Description | Last Modified | Approx Words |
|------|-------------|---------------|--------------|
| `README.md` | Where semantic tokens live | 2026-05-08 | 56 |
| `AGENTS.md` | Graphify knowledge graph instructions | 2026-05-08 | 96 |
| `COMPONENT-PORTING-TEMPLATE.md` | Full porting spec: file layout, code patterns, SCSS, stories, MDX, tests, preflight | 2026-05-08 | 1714 |
| `color-tokens.md` | Color token reference | 2026-05-08 | 925 |
| `package.json` | Workspace root: 31 `@ds/*` deps + build/test/storybook scripts | 2026-05-12 | 223 |
| `pnpm-workspace.yaml` | Declares `packages/*` as workspace members | 2026-05-08 | 3 |
| `vitest.config.ts` | Vitest config for foundation token tests | 2026-05-08 | 130 |
| `eslint.config.mjs` | ESLint config | 2026-05-08 | — |
| `.storybook/main.js` | Storybook config (JSX-in-JS plugin, stories glob, Vite dedupe fix) | 2026-05-13 | 233 |
| `.storybook/preview.jsx` | Global DS CSS imports for Storybook | 2026-05-08 | — |
| `scripts/clean.mjs` | Build clean script | 2026-05-08 | — |
| `scripts/token-utils.mjs` | Token generation utilities | 2026-05-08 | — |
| `tests/elevation.test.ts` | Elevation token tests | 2026-05-08 | — |
| `tests/foundation.test.ts` | Foundation token rollup tests | 2026-05-08 | — |
| `tests/radius.test.ts` | Radius token tests | 2026-05-08 | — |
| `tests/spacing.test.ts` | Spacing token tests | 2026-05-08 | — |
| `tests/type.test.ts` | Typography token tests | 2026-05-08 | — |
| `packages/*/` | 31 component packages: accordion, breadcrumbs, button, cell-contents, cells-standard, checkbox, chips, colors, content-switcher, dropdown, filter, flyout, header, icons, inline-notification, link, multi-select, number-input, pagination, popover, progress-step, radio-button, search, styles, tabs, tags, text-entry, themes, toggle, tooltip, type | 2026-05-08 | — |
| `demo/` | Static HTML token demos (elevation, icons, radius, spacing, typography) | 2026-05-08 | — |
| `storybook-static/` | Built Storybook output | 2026-05-08 | — |

### `poc-exploration/`

| File | Description | Last Modified | Approx Words |
|------|-------------|---------------|--------------|
| `package.json` | Storybook 8 + Vite + React 19 + SCSS | 2026-05-08 | 59 |
| `src/compositions/opportunity-table.stories.tsx` | AE Opportunity Table — canonical source; hover popovers, sort, filter, pagination | 2026-05-14 | — |
| `src/compositions/account-table.stories.tsx` | AE Account Table composition | 2026-05-14 | — |
| `src/compositions/AE Account Panel.stories.tsx` | Account Panel right-rail composition | 2026-05-14 | — |
| `src/compositions/sales-play-modal.stories.tsx` | Sales Play modal — three views (main, link-contact, link-opp) | 2026-05-14 | — |
| `src/compositions/side-nav.stories.tsx` | Side navigation composition | 2026-05-08 | — |
| `src/mock/types.ts` | All TypeScript interfaces and closed union types for the domain | 2026-05-14 | 661 |
| `src/mock/taxonomies.ts` | All enum registries with icons, colors, parent refs (products, stages, risks, plays, …) | 2026-05-14 | 1091 |
| `src/mock/derivations.ts` | Pure severity/band/formatting functions with exported THRESHOLDS | 2026-05-08 | 468 |
| `src/mock/helpers.ts` | Lookup helpers: accountById, opportunitiesByAccount, productFamilyOf | 2026-05-08 | 389 |
| `src/mock/index.ts` | Public barrel — single import point for all mock data | 2026-05-14 | 68 |
| `src/mock/opportunity-row-mapper.ts` | Maps canonical Opportunity + Account → OpportunityRow for opp-table | 2026-05-14 | 721 |
| `src/mock/sales-play-modal.ts` | Modal-local PlayContact and PlayOpportunity fixtures | 2026-05-14 | — |
| `src/mock/data/accounts.ts` | 54 canonical Account records (generated) | 2026-05-14 | — |
| `src/mock/data/opportunities.ts` | 235 canonical Opportunity records (generated) | 2026-05-14 | — |
| `src/mock/data/contacts.ts` | 151 canonical Contact records (generated) | 2026-05-14 | — |
| `src/mock/data/sales-plays.ts` | 17 canonical SalesPlay records (generated) | 2026-05-14 | — |
| `src/mock/data/sales-play-instances.ts` | 246 canonical SalesPlayInstance records (generated) | 2026-05-14 | — |
| `src/mock/data/ebcs.ts` | 71 EBC records — local interface, not yet exported from barrel | 2026-05-14 | — |
| `src/system.scss` | DS token + component CSS import root | 2026-05-08 | — |

### `scripts/`

| File | Description | Last Modified | Approx Words |
|------|-------------|---------------|--------------|
| `scripts/screenshot-tier1.mjs` | Playwright screenshot helper for tier-1 DS component verification | 2026-05-08 | — |
| `scripts/storybook-prestart.mjs` | Port-check script run before Storybook starts | 2026-05-08 | — |

### `.codex/`

| File | Description | Last Modified | Approx Words |
|------|-------------|---------------|--------------|
| `.codex/hooks.json` | Codex session hooks configuration | 2026-05-08 | — |
