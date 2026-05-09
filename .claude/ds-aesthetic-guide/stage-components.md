# Stage components — index

A lookup of every component the design system ships. Read this before authoring anything from scratch — the trigger clauses below map common HTML/training-default patterns onto the system's vocabulary.

## Foundation

**icons** — The PANW glyph library (`@ds/icons`). Functional icons paint via `currentColor` — set `color` on the icon or any ancestor to retint. Brand icons (`BrandPanw`, `BrandPrisma`, `BrandStrata`, `BrandCortex`) and sales-play status icons (`ClosedWon`, `ClosedLost`, `Deferred`, `Interested`, `NotTouched`, `OpenPipeline`, `Pitched`) keep their authored fills and ignore `color` — that's deliberate. Default size 20px. Reach for this any time you'd `import { ... } from 'lucide-react'`. The only lucide imports left in the system are `Sun` and `XCircle` — gaps in the imported set, not stylistic choices.

**button** — Action button with kind variants (primary, secondary, tertiary, ghost, ghost-brand, danger). Reach for this any time you'd write a `<button>` with a text label.

**button → IconButton** — Square icon-only button. Reach for this any time you'd render a `<button>` with no label, only an icon — close X, chevron, kebab.

**checkbox** — Three-state checkbox (unchecked / checked / indeterminate) with a built-in glyph. Reach for this any time you'd write `<input type="checkbox">` or render a square-with-tick.

**radio-button** — Radio button with label. Reach for this any time you'd write `<input type="radio">` or render a single-choice option in a group.

**toggle** — On/off switch. Reach for this any time you'd render a binary state control or `<input type="checkbox" role="switch">`.

**link** — Inline anchor with brand-coded hover. Reach for this any time you'd write `<a>` for navigation or in-text links.

## Selection and input

**dropdown** — Single-select field with a flyout menu. Reach for this any time you'd write `<select>` or a custom single-choice menu.

**multi-select** — Multi-select field with chip-tag values and a flyout menu. Reach for this any time you'd write `<select multiple>` or a multi-choice picker.

**search** — Search input with magnifier glyph and clear affordance. Reach for this any time you'd render a search field.

**number-input** — Numeric input with stepper buttons. Reach for this any time you'd write `<input type="number">`.

**text-entry** — Single-line and multi-line text input. Reach for this any time you'd write `<input type="text">` or `<textarea>`.

**chips** — Interactive selectable pill (rest / hover / active / disabled). Reach for this any time you'd render a filter chip or toggleable pill.

**tags** — Static label pill. Reach for this any time you'd render a category tag, status badge, or color-coded label.

**filter** — Button trigger that opens a flyout of checkbox options with Apply / Cancel commit semantics. Reach for this any time you'd build a column filter or toolbar filter button.

## Container and structure

**accordion** — Collapsible section with a header strip and a drawer. Reach for this any time you'd write `<details>` or a collapsible disclosure.

**tabs** — Horizontal tab strip. Reach for this any time you'd render tabbed views.

**content-switcher** — Segmented control. Reach for this any time you'd render a segmented toggle for view modes.

**breadcrumbs** — Hierarchical path navigation. Reach for this any time you'd render a breadcrumb trail.

**header** — Table column header with sort and filter affordances. Reach for this any time you'd write `<th>`.

**pagination** — Ledger-style pagination strip with range, page indicator, rows-per-page. Reach for this any time you'd render table pagination.

**progress-step** — Multi-step progress indicator. Reach for this any time you'd render a checkout or onboarding stepper.

## Surfaces and feedback

**tooltip** — Hover-anchored short label. Reach for this any time you'd render a hover hint over an element.

**inline-notification** — Banner with status (info, success, warning, error). Reach for this any time you'd render a status alert or inline banner.

**popover** — Anchored descriptive panel with optional pagination. Reach for this any time you'd render a feature callout or rich anchored info card.

**flyout** — Anchored panel of items with optional filter, select-all, and footer. Reach for this any time you'd render a dropdown menu, context menu, or picklist.

## Specialized (table-only)

**cell-contents** — Table cell content renderer (text, numeric, trend, tagged). Reach for this any time you'd render content inside a table cell. Table-only.

**cells-standard** — Table row primitive with checkbox and expand affordances. Reach for this any time you'd render a table row. Table-only.
