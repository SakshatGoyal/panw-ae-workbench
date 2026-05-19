# Graph Report - .  (2026-05-18)

## Corpus Check
- 272 files · ~629,300 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 862 nodes · 848 edges · 26 communities detected
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.86)
- Token cost: 9,700 input · 4,150 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Account Table & Domain Docs|Account Table & Domain Docs]]
- [[_COMMUNITY_Design System Components|Design System Components]]
- [[_COMMUNITY_Account Panel & Bug Reports|Account Panel & Bug Reports]]
- [[_COMMUNITY_Icon Build Pipeline|Icon Build Pipeline]]
- [[_COMMUNITY_Account Table Compositions|Account Table Compositions]]
- [[_COMMUNITY_Account Panel Stories|Account Panel Stories]]
- [[_COMMUNITY_AI Interaction Demo|AI Interaction Demo]]
- [[_COMMUNITY_Accordion Component Stories|Accordion Component Stories]]
- [[_COMMUNITY_Pagination Component Stories|Pagination Component Stories]]
- [[_COMMUNITY_Typography Component Stories|Typography Component Stories]]
- [[_COMMUNITY_AI Chat Panel Stories|AI Chat Panel Stories]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 212|Community 212]]
- [[_COMMUNITY_Community 213|Community 213]]
- [[_COMMUNITY_Community 214|Community 214]]
- [[_COMMUNITY_Community 215|Community 215]]

## God Nodes (most connected - your core abstractions)
1. `Coverage Matrix — Scenarios × Contract` - 19 edges
2. `@storybook/addon-docs` - 17 edges
3. `AE Workbench — State of Things` - 17 edges
4. `Account & Opportunity Domain Model` - 14 edges
5. `lucide-react (icon library)` - 13 edges
6. `Account Entity (mock data contract)` - 11 edges
7. `AI Trigger Scenarios — Personal-Performance Prompts` - 11 edges
8. `Opportunity Entity (mock data contract)` - 10 edges
9. `Opportunities Table Reference` - 10 edges
10. `useToggle()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Account & Opportunity Domain Model` --references--> `opportunity-table.stories.tsx (poc-exploration)`  [EXTRACTED]
  data-models/account-opportunity-domain-model.md → poc-exploration/src/compositions/opportunity-table.stories.tsx
- `AE Workbench — State of Things` --references--> `types.ts (mock types)`  [EXTRACTED]
  data-models/state-of-things.md → src/mock/types.ts
- `AE Workbench — State of Things` --references--> `taxonomies.ts (SALES_PLAY_STATUSES, ACCOUNT_RISKS, etc.)`  [EXTRACTED]
  data-models/state-of-things.md → src/mock/taxonomies.ts
- `AE Workbench — State of Things` --references--> `mock/data/accounts.ts`  [EXTRACTED]
  data-models/state-of-things.md → src/mock/data/accounts.ts
- `AE Workbench — State of Things` --references--> `mock/sales-play-modal.ts`  [EXTRACTED]
  data-models/state-of-things.md → src/mock/sales-play-modal.ts

## Communities

### Community 0 - "Account Table & Domain Docs"
Cohesion: 0.03
Nodes (104): Account Panel Reference, Accounts Table Columns (7 columns), Accounts Table Controls (Search, Sort, Filters), Accounts Table Data Concepts (ARR, LTV, EBC, Pipeline by Quarter), Accounts Table Default State, Accounts Table Purpose — Book of Business View, Account Entity, Account Health Assessment Entity (+96 more)

### Community 1 - "Design System Components"
Cohesion: 0.06
Nodes (41): Accordion Component, Rationale: Accordion customIcon → renderIcon (Carbon convention), Carbon Design System (IBM), CellContents Component, Checkbox Component, Rationale: Checkbox onChange signature change (Carbon convention), Chip Component, Rationale: Chip renderLeadingIcon/renderCloseIcon (Carbon convention over fixed SVG) (+33 more)

### Community 2 - "Account Panel & Bug Reports"
Cohesion: 0.07
Nodes (44): Panel Anatomy (Header/InstallBase/SalesPlay/Opps4Q/AccountHealth), Account Panel Reference Document, Rationale: Not-Touched-First View in Sales Play Section, Renewal Outcome Editor (panel only editable section), Bug Pattern: Filter/Search State Not Wired, Bug #1 P1: Panel ARR hardcoded $4.38M, Bug #8 P1: Install Base badge hardcoded $25.8M, Bug Hunt Report (complete-design app) (+36 more)

### Community 3 - "Icon Build Pipeline"
Cohesion: 0.1
Nodes (12): clean(), emitComponent(), ensureDir(), main(), parseSvg(), svgAttrsToJsx(), toPascal(), dismissPanel() (+4 more)

### Community 4 - "Account Table Compositions"
Cohesion: 0.09
Nodes (4): daysBetween(), formatUsdCompact(), matchesEbcBucket(), SalesPlayTag()

### Community 6 - "Account Panel Stories"
Cohesion: 0.1
Nodes (4): fmtInstallBase(), fmtMoneyShort(), toggle(), handleClick()

### Community 8 - "AI Interaction Demo"
Cohesion: 0.24
Nodes (14): AI Reasoning Trace (Numbered Steps), Champion-Sponsored Business Review Recommendation, Champion — Director-level Technical Lead, Cloud Security Meeting Mentions Signal, Economic Buyer Contact Role, Installed-Base Gap Signal, Northbay POC Deal, People.ai Data Source (+6 more)

### Community 9 - "Accordion Component Stories"
Cohesion: 0.26
Nodes (9): Gray10Theme(), LeftOrientation(), Open(), useToggle(), WithDescription(), WithIcon(), WithLongProse(), WithTable() (+1 more)

### Community 11 - "Pagination Component Stories"
Cohesion: 0.42
Nodes (9): Compass(), fmt(), Hyperlink(), Ledger(), pad(), rangeEnd(), rangeStart(), Scrubber() (+1 more)

### Community 12 - "Typography Component Stories"
Cohesion: 0.33
Nodes (8): fontSizeLabel(), formatPx(), inlineStyleFor(), isClampTuple(), lineHeightLabel(), parseRem(), scalarOrClamp(), TokenRow()

### Community 16 - "AI Chat Panel Stories"
Cohesion: 0.22
Nodes (2): dismissPanel(), handleDislike()

### Community 21 - "Community 21"
Cohesion: 0.2
Nodes (10): Button Component, Button Kinds (primary/secondary/tertiary/ghost/danger), Button Sizes (small/default/large), CellsStandard Component, Header (Column Header) Component, IconButton Component, IconButton Shapes (square/rounded/pill), PANW IconButton Extensions (+2 more)

### Community 39 - "Community 39"
Cohesion: 0.53
Nodes (4): fluidFontSize(), nextBreakpoint(), subtract(), toSassStyleMap()

### Community 41 - "Community 41"
Cohesion: 0.4
Nodes (6): complete-design/src/App.tsx, Behavior Hunt — AE Workbench, Behavior Hunt — 22 Confirmed Working Behaviors, complete-design/tests/behavior-hunt.spec.ts, Bug #112 — Nav Shell Raw CSS Leak, Bug #121 — Panel Closes on Nav Switch (P1)

### Community 48 - "Community 48"
Cohesion: 0.67
Nodes (2): resolveSegments(), resolveTokenPath()

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (2): toExportName(), toScalarName()

### Community 77 - "Community 77"
Cohesion: 1.0
Nodes (2): Storybook Static iframe (poc-exploration), Storybook Static Index (poc-exploration)

### Community 78 - "Community 78"
Cohesion: 1.0
Nodes (2): FK Mapping Decisions (translation), Generated Mock Data Files

### Community 79 - "Community 79"
Cohesion: 1.0
Nodes (2): People.ai Logo (src), People.ai Logo (storybook-static)

### Community 80 - "Community 80"
Cohesion: 1.0
Nodes (2): Tableau Logo (src), Tableau Logo (storybook-static)

### Community 81 - "Community 81"
Cohesion: 1.0
Nodes (2): Salesforce Logo (src), Salesforce Logo (storybook-static)

### Community 82 - "Community 82"
Cohesion: 1.0
Nodes (2): Clari Logo (src), Clari Logo (storybook-static)

### Community 212 - "Community 212"
Cohesion: 1.0
Nodes (1): Link Component

### Community 213 - "Community 213"
Cohesion: 1.0
Nodes (1): ContentSwitcher Component

### Community 214 - "Community 214"
Cohesion: 1.0
Nodes (1): Breadcrumb Component

### Community 215 - "Community 215"
Cohesion: 1.0
Nodes (1): SalesPlayEdits (modal edit state)

## Knowledge Gaps
- **75 isolated node(s):** `opportunity-table.stories.tsx (poc-exploration)`, `Storybook Static Index (poc-exploration)`, `Storybook Static iframe (poc-exploration)`, `Tab (child of Tabs)`, `ProgressStepItem Component` (+70 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `AI Chat Panel Stories`** (10 nodes): `AiPromptIcon()`, `dismissPanel()`, `FeedbackTimer()`, `handleDislike()`, `handleLike()`, `handleRemoveTableRef()`, `handleSelectRow()`, `handleTimerComplete()`, `ResponseActions()`, `chat-panel.stories.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (4 nodes): `tools.ts`, `formatTokenName()`, `resolveSegments()`, `resolveTokenPath()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (3 nodes): `toExportName()`, `toScalarName()`, `build.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (2 nodes): `Storybook Static iframe (poc-exploration)`, `Storybook Static Index (poc-exploration)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (2 nodes): `FK Mapping Decisions (translation)`, `Generated Mock Data Files`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (2 nodes): `People.ai Logo (src)`, `People.ai Logo (storybook-static)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (2 nodes): `Tableau Logo (src)`, `Tableau Logo (storybook-static)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (2 nodes): `Salesforce Logo (src)`, `Salesforce Logo (storybook-static)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (2 nodes): `Clari Logo (src)`, `Clari Logo (storybook-static)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 212`** (1 nodes): `Link Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 213`** (1 nodes): `ContentSwitcher Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 214`** (1 nodes): `Breadcrumb Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 215`** (1 nodes): `SalesPlayEdits (modal edit state)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lucide-react (icon library)` connect `Design System Components` to `Button Component Stories`, `Accordion Component Stories`, `IconButton Component Stories`, `Pagination Component Stories`, `Tags Component Stories`, `Community 28`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `opportunity-table.stories.tsx (poc-exploration)`, `Storybook Static Index (poc-exploration)`, `Storybook Static iframe (poc-exploration)` to the rest of the system?**
  _75 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Account Table & Domain Docs` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._
- **Should `Design System Components` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Account Panel & Bug Reports` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Icon Build Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Account Table Compositions` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._