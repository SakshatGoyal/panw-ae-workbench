# Component Porting Plan

> Generated: 2026-05-05  
> Carbon source: `packages/react/src/components/{Button,TextInput,ComposedModal}`  
> PANW source: `src/components/` (Intelligaia/panw-design-system)

---

## Carbon Component Anatomy

### Reference: three components studied

| Component | Primary file | Sub-files | Test files | Stories |
|-----------|-------------|-----------|------------|---------|
| Button | `Button.tsx`, `ButtonBase.tsx` | `Button.Skeleton.tsx` | `Button-test.js`, `ButtonSkeleton-test.js` | `Button.stories.js` |
| TextInput | `TextInput.tsx`, `util.ts` | `TextInput.Skeleton.tsx`, `ControlledPasswordInput.tsx`, `PasswordInput.tsx` | `TextInput-test.js`, `PasswordInput-test.js`, `ControlledPasswordInput-test.js`, `TextInputSkeleton-test.js` | `TextInput.stories.js`, `PasswordInput.stories.js` |
| ComposedModal | `ComposedModal.tsx`, `ModalHeader.tsx`, `ModalFooter.tsx` | `ComposedModalPresence.tsx`, `useComposedModalState.ts` | `ComposedModal-test.js`, `ModalFooter-test.js`, `ModalHeader-test.js` | `ComposedModal.stories.js`, `ComposedModal.featureflag.stories.js` |

---

### Rule 1 — Folder structure

Each component lives in its own folder under `packages/react/src/components/<ComponentName>/`. The folder contains exactly one primary `.tsx` implementation file per top-level export, a matching `.Skeleton.tsx` when a loading state exists, and an `index.ts` barrel. Test files live inside `__tests__/`. Storybook files (`.stories.js`, `.mdx`) live at the same level as the source files, not inside a dedicated sub-folder (ComposedModal has an exception: a separate `__story__` folder for story-only SCSS). SCSS lives separately at `packages/styles/scss/components/<component-name>/`.

### Rule 2 — Index/barrel pattern

The `index.ts` uses a mix of default and named re-exports. The canonical pattern is:

```ts
import ComponentName from './ComponentName';
export default ComponentName;
export { ComponentName, type ComponentNameProps };
export * from './ComponentName';          // re-export all named exports (enums, const arrays)
export { default as ComponentNameSkeleton } from './ComponentName.Skeleton';
```

Sub-components that make up a composed component (e.g., `ModalHeader`, `ModalFooter`, `ModalBody`) are individually named-exported from the parent's `index.ts/tsx`, not from their own index files.

### Rule 3 — Prop typing

Carbon uses **TypeScript interfaces + runtime PropTypes** on every public component — both always present. The TypeScript interface is the source of truth for shape; PropTypes provides dev-time warnings and serves as documentation for JS consumers. The pattern:

1. Define `export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement>` (or the appropriate element type), using `Omit<...>` to exclude attributes that the component redefines with stricter types (e.g., TextInput omits `'defaultValue' | 'id' | 'size' | 'value'`).
2. Export `const ComponentName: ComponentComponent = React.forwardRef(...)` or `const ComponentName = forwardRef<ElementType, PropsType>(...)`.
3. After the function, set `ComponentName.displayName = 'ComponentName'` and `ComponentName.propTypes = { ... }`.
4. Enum-like values are exported as `as const` arrays (`ButtonKinds`, `ButtonSizes`) alongside their derived union types (`ButtonKind`, `ButtonSize`).

### Rule 4 — Ref forwarding

All three components use `React.forwardRef`. Button uses a polymorphic pattern with a `ButtonComponent` type alias to preserve the `as` prop contract. TextInput and ComposedModal use the standard `forwardRef<DOMElement, Props>` signature. When a component needs to merge refs (e.g., TextInput merges the forwarded ref with an internal `useRef`), Carbon uses a `useMergedRefs` utility, not `useImperativeHandle`.

### Rule 5 — Accessibility patterns

- **Button**: Icon-only buttons delegate to `<IconButton>` which wraps a tooltip; danger variants inject a visually-hidden `<span>` with `id` and link it via `aria-describedby`; the `as` prop supports polymorphic rendering (renders `<a>` when `href` is set).
- **TextInput**: Uses `role="alert" aria-live="assertive"` for a counter-announcement `<span>`; helper text is wired to the input via `aria-describedby`; invalid/warn states are normalized via `useNormalizedInputProps`.
- **ComposedModal**: Uses focus sentinel buttons (visually hidden) to trap focus in a `wrapFocus` loop when the native `<dialog>` element is not in use. The container `div` carries `role="dialog" aria-modal="true"`. Escape key is caught at the document level. `launcherButtonRef` restores focus on close. An outer `Layer` carries `role="presentation" aria-hidden={!open}`.

Shared pattern: all interactive icons are `aria-hidden="true"` with the accessible label coming from a separate text node or prop.

### Rule 6 — SCSS conventions

Carbon SCSS follows a **mixin-per-component** pattern inside a `@use`-based module system.

- Each component folder contains `_index.scss` (forwards tokens and calls the mixin), `_<component>.scss` (the actual styles), `_tokens.scss` (component-local CSS custom properties), `_mixins.scss` (helper mixins), and sometimes `_vars.scss`.
- Classes use the BEM-like `${prefix}--` convention (prefix defaults to `cds`), e.g., `.cds--btn`, `.cds--btn--primary`, `.cds--btn--icon-only`.
- The prefix is injected via the `$prefix` SCSS variable (from `config`), not hardcoded.
- Design tokens (`$text-primary`, `$field`, `$border-strong`) come from Carbon's `@carbon/themes` via `@use '../../theme' as *`.
- Layout sizes use a layout utility (`layout.size('height')`, `layout.density('padding-inline')`) rather than hardcoded pixel values.
- There are no inline styles in component markup; everything goes through SCSS.

### Rule 7 — Testing

Tests use **Jest + `@testing-library/react`**. Files are named `ComponentName-test.js` (not `.test.js`) and live in `__tests__/`. Each test file has a single `describe('ComponentName', ...)` block. Tests focus on:

1. DOM output for default props
2. Each significant boolean prop
3. Event handler callbacks via `userEvent` or fireEvent
4. Accessibility attributes (`aria-*`, `role`, `disabled`)
5. `screen.getByRole`, `screen.getByText`, `toHaveAttribute`, `toHaveClass` as primary assertions

No component-level mocks are set up; Carbon relies on a `jest.config.js` at the package root. Tests import directly from the parent component folder (e.g., `import Button from '../../Button'`), not from `./Button`.

### Rule 8 — Storybook

Stories are `.stories.js` (plain JS with JSDoc types, not TSX). Each story file exports a `default` meta object with `component`, `title`, and `argTypes` (controls), plus named exports for each story variant. Stories use `@storybook/addon-docs` MDX files (`Component.mdx`) for documentation. The `args`/`argTypes` pattern drives the controls panel; event handlers are wired with `action()` from `storybook/actions`.

### Inconsistencies across the three components

- Button uses a custom `ButtonComponent` type alias to support the polymorphic `as` prop; TextInput and ComposedModal do not need this (they target fixed elements). The polymorphic pattern is the most general; adopt it when a ported component needs an `as` prop, otherwise use standard `forwardRef`.
- Test files for Button and TextInput are `.js`; ComposedModal tests are also `.js` but in the same directory as the component (not in `__tests__/`). **Canonical rule**: put tests inside `__tests__/` and name them `Component-test.js`.
- ButtonStandard (PANW) does not use `forwardRef`; ButtonIcon does. Carbon always uses `forwardRef` on button-like elements — treat `forwardRef` as mandatory for all interactive primitives.

---

## PANW Component Inventory

| Component | What it does | Files | Notable patterns |
|-----------|-------------|-------|-----------------|
| **Accordion** | Collapsible disclosure panel with title, optional description, optional leading icon, optional tag, and configurable chevron side (left/right) | `Accordion.tsx`, `Accordion.css`, `Accordion.figma.tsx`, `Accordion.stories.tsx`, `Accordion.allstates.stories.tsx`, `index.ts`, `verify.tsx` | Fully controlled via `open` + `onToggle`; Tab/Enter/Space keyboard support via `role="button"` on a `<div>`; composes `Tags` internally |
| **Breadcrumbs** | Navigation trail with collapsed ellipsis mode (shows first + last items with a ". . ." button to expand) | Same 7-file pattern | Pure prop-driven; no internal state; `aria-label="Breadcrumb"` on `<nav>`, `aria-current="page"` on last item; disabled links use `role="link"` without `href` |
| **ButtonStandard** | Text button with optional left/right icon slots, 6 kinds, 3 sizes, 3 corner shapes | Same 7-file pattern | No `forwardRef`; uses `forceState` prop to simulate hover/pressed/disabled for Storybook; inlines a fallback `AddIcon` SVG |
| **ButtonIcon** | Icon-only button with required `aria-label`, 3 kinds, 3 sizes, 3 corner shapes, 2 icon sizes | Same 7-file pattern | Has `forwardRef`; icon passed as ReactNode (not an element type); `forceState` for story states |
| **CellContents** | Table cell content with text, numeric, or trend (up/down) display and optional status icon | Same 7-file pattern | Pure presentational; no interactivity; composes no other components directly |
| **CellsStandard** | Full table row cell wrapper with optional checkbox and expand icon; handles row selection | Same 7-file pattern | Controlled/uncontrolled hybrid for checkbox state; composes `Checkbox` + `CellContents`; `role="row"` when `onClick` is present |
| **Checkbox** | Checkbox with checked/unchecked/indeterminate states | Same 7-file pattern | Uses a real `<input type="checkbox">`; `indeterminate` set via `useRef` + `useEffect`; custom SVG visual layered over hidden input; controlled via `status` string |
| **Chips** | Dismissable or dropdown filter chip with optional image avatar or checkmark icon | Same 7-file pattern | Uses `role="button"` on a `<div>` (not a `<button>`); close button is a nested `<button>`; active/disabled states via props |
| **ContentSwitcher** | Segmented control (tab bar variant) for switching between mutually-exclusive views | Same 7-file pattern | Controlled via `selectedIndex`; renders `role="tablist"` + `role="tab"` buttons; `tabIndex={isSelected ? 0 : -1}` for roving focus |
| **DropdownRounded** | Single or multi-select dropdown with rounded pill styling, optional title/description, outside-click to close | Same 7-file pattern | Mixed controlled/uncontrolled: syncs `selectedValues` prop into internal state with shallow-compare; `role="combobox"` / `role="listbox"` / `role="option"`; click-outside via `document.addEventListener` on mount |
| **FigmaIconAsset** | Utility wrapper that accepts raw SVG markup strings, normalises fill/stroke to `currentColor`, and injects via `dangerouslySetInnerHTML` | `FigmaIconAsset.tsx`, `index.ts` (no CSS, no stories) | The only component using `dangerouslySetInnerHTML`; not intended for production use — it is a Figma-import helper |
| **Header** | Table column header cell with sort indicators (basic/ascending/descending) and optional inline filter button | Same 7-file pattern | `forwardRef`; uses `ButtonIcon` for filter; `role="columnheader"`; sort icon is always rendered for "basic" type |
| **InlineNotification** | Horizontal status banner (info/alert/error/success) with optional dismiss button | Same 7-file pattern | `forwardRef`; `role="status"`; composes `ButtonIcon` for close; type-icon lookup via a static map |
| **Link** | Text link with optional left/right arrow icons; renders `<a>` when `href` is provided, `<span role="link">` otherwise | Same 7-file pattern | No `forwardRef`; polymorphic via a `Tag` variable (not Carbon's `as` prop); `aria-disabled` for disabled state |
| **NumberInput** | Numeric stepper with increment/decrement `ButtonIcon` controls, label, and description | Same 7-file pattern | `forwardRef` on the underlying `<input>`; controlled via numeric `value`/`onChange`; composes `ButtonIcon` x2; min/max clamping |
| **Pagination** | Full pagination bar with first/prev/next/last nav, page number buttons, and items-per-page dropdown | Same 7-file pattern | Controlled via `currentPage`/`onPageChange`; composes `ButtonIcon`, `ButtonStandard`, `DropdownRounded`; page-range algorithm built in |
| **ProgressStep** | Horizontal step indicator with success/warning/error/active/inactive statuses and optional descriptions | Same 7-file pattern | Internal `useState` for hover on each step; exports both a list `ProgressStep` and a standalone `SingleStepStandalone` for story grids |
| **RadioButton** | Radio button with checked/unchecked state and label | Same 7-file pattern | Real `<input type="radio">` with custom SVG overlay; controlled via `checked`/`onChange`; no `forwardRef` |
| **Search** | Search field with search icon, clear button, controlled/uncontrolled value, 3 sizes/shapes/backgrounds | Same 7-file pattern | `forwardRef`; hybrid controlled/uncontrolled (controlled when `value` is defined); manual ref merge (callback ref pattern); clear button uses `ButtonIcon` |
| **Tabs** | Horizontal tab bar with optional icon, tag badge, and disabled state per tab | Same 7-file pattern | Controlled via `selectedIndex`; `role="tablist"` + `role="tab"`; composes `Tags` for optional badge; `tabIndex` roving focus |
| **Tags** | Colored label badge with 17 color options, low/high contrast, optional icon and close button | Same 7-file pattern | Pure presentational except for `onClose`; no interactivity beyond close; renders as `<span>` |
| **Toggle** | On/Off switch with label, info icon, status text, and 3 label positions (left/right/top) | Same 7-file pattern | Controlled via `on`/`onChange`; real `<input type="checkbox">` underneath; no `forwardRef`; status text reads "Yes"/"No" by default |
| **Tooltip** | Positioned tooltip bubble with configurable pointer direction/position; descriptive variant adds heading, description, image, and page stepper | Same 7-file pattern | `forwardRef`; `role="tooltip"`; descriptive variant is controlled/uncontrolled via `currentPage`; composes `ButtonIcon` for prev/next nav; pointer arrow is rendered as inline SVG |

---

## Proposed Mapping & Porting Order

| Order | PANW Component | Carbon Equivalent | Complexity | Notes |
|-------|---------------|-------------------|------------|-------|
| 1 | **Tags** | `Tag` (`@carbon/react`) | Trivial | Pure display; direct 1:1 mapping. PANW has 17 colors vs Carbon's ~10 built-in; custom colors can be CSS-var mapped. No interactivity beyond close callback. |
| 2 | **Link** | `Link` | Trivial | Same polymorphic `<a>`/`<span>` pattern. PANW adds directional arrow icons; Carbon's Link does not — add as optional slots. |
| 3 | **RadioButton** | `RadioButton` | Trivial | Almost identical; PANW uses a custom SVG visual. Carbon's real input + label pattern is the same. Wire into Carbon's `RadioButtonGroup` for group behaviour at a later phase. |
| 4 | **Toggle** | `Toggle` | Trivial | Carbon's Toggle has `labelA`/`labelB` for status text; PANW has `onStatusText`/`offStatusText` — direct rename. Label position is novel (Carbon does not have "top"); keep as an extension prop. |
| 5 | **ButtonIcon** | `IconButton` (or `Button` with `hasIconOnly`) | Trivial | PANW already mirrors Carbon's icon-button concept. Key diff: PANW accepts `icon: ReactNode`; Carbon accepts `renderIcon: ElementType`. Convert to Carbon's `renderIcon` convention. |
| 6 | **ButtonStandard** | `Button` | Trivial | PANW kind names differ (`secondary-accent`, `ghost-gray`); map to Carbon's `primary`, `secondary`, `ghost`, `tertiary`, `danger`. PANW's `shape` prop (pill/rounded/standard) is novel — Carbon does not have rounded buttons; keep as a PANW extension. |
| 7 | **Checkbox** | `Checkbox` | Low | PANW's `status` string vs Carbon's `checked`+`indeterminate` booleans; straightforward adapter. |
| 8 | **InlineNotification** | `InlineNotification` | Low | Carbon splits into `ActionableNotification`/`InlineNotification`; PANW's `infoType` (page-level/product-level) maps to visual-only styling, not a Carbon prop — keep as extension. |
| 9 | **CellContents** | No direct equivalent (closest: `TableCell` contents) | Moderate | Novel PANW component for table cell data display with trend indicators. Port using Carbon conventions; no existing Carbon component to follow for trend arrows. |
| 10 | **Breadcrumbs** | `Breadcrumb` | Low | Carbon's `Breadcrumb` + `BreadcrumbItem`; PANW's `collapsed` ellipsis mode maps to Carbon's `overflowMenuDescription` / custom overflow button. Structure differs (Carbon uses compound children; PANW uses an `items` array prop). Decide at porting time whether to use Carbon's children pattern or keep array API. |
| 11 | **ContentSwitcher** | `ContentSwitcher` | Low | Carbon's `ContentSwitcher` uses `Switch` compound children; PANW uses an `items` array. Same controlled pattern. Background variant is a PANW extension. |
| 12 | **Search** | `Search` | Low | Near-identical. PANW adds `shape` (pill/rounded/standard) and `background` props not present in Carbon's Search. Hybrid controlled/uncontrolled already matches Carbon's pattern. |
| 13 | **Tabs** | `Tabs` + `Tab` | Moderate | Carbon uses compound children (`<Tabs><Tab>…`); PANW uses an `items` array. PANW's `Tags` badge inside a tab is a PANW extension. Also need to handle `TabPanel` content area (absent in PANW). |
| 14 | **Chips** | `Tag` (dismissable/selectable variant) or `FilterTag` | Moderate | No direct Carbon equivalent at this fidelity. PANW's Chip combines dismiss, dropdown indicator, avatar image, and active state. Carbon's `Tag` handles dismiss; for active/dropdown modes, it is a novel component. Implement using Carbon conventions; use `Tag` as a visual reference only. |
| 15 | **Header** (table column header) | `TableHeader` | Moderate | Carbon's `TableHeader` has `sortDirection` and `onClick` for sort; PANW adds "condensed/lengthened" column-type icons (not in Carbon). Map sort states; keep type icons as PANW extension. |
| 16 | **CellsStandard** | `TableCell` (with `TableSelectCell`) | Moderate | Composes Checkbox + CellContents. Carbon separates checkbox selection into `TableSelectCell`; PANW merges them. Porting requires understanding the parent DataTable context Carbon uses. |
| 17 | **NumberInput** | `NumberInput` | Moderate | Carbon's NumberInput has validation/invalidText/warnText; PANW has `title`/`description`. PANW composes `ButtonIcon`; Carbon uses its own embedded stepper buttons. Behaviour is near-identical but the internal composition differs. |
| 18 | **Accordion** | `Accordion` + `AccordionItem` | Moderate | Carbon uses compound children; PANW uses single-component with direct props. PANW adds tag, leading icon, orientation — all extensions. Controlled `open` matches Carbon's `open` prop on `AccordionItem`. |
| 19 | **DropdownRounded** | `Dropdown` or `MultiSelect` | Complex | PANW merges single and multi-select into one component with a `multiselect` flag. Carbon splits them: `Dropdown` (single) and `MultiSelect`. Additionally, PANW's rounded/pill styling is not in Carbon's base. Must port to two separate Carbon components, or keep as a PANW wrapper over both. |
| 20 | **Tooltip** | `Tooltip` | Complex | PANW has two types: simple (default) and descriptive. The descriptive variant includes a heading, image, and paginated stepper — this is a unique PANW pattern (closest Carbon analog: `Popover` + custom content). Simple type maps cleanly; descriptive type has no Carbon equivalent and needs significant novel work. |
| 21 | **ProgressStep** | `ProgressIndicator` + `ProgressStep` | Moderate | Carbon uses compound children; PANW uses an `steps` array. PANW statuses (success/warning/error/active/inactive) are a superset of Carbon's (complete/current/incomplete/invalid). Map status names and add warning if needed. |
| 22 | **Pagination** | `Pagination` | Complex | Composes `ButtonIcon`, `ButtonStandard`, `DropdownRounded` — all of which must be ported first. PANW builds its own page-range algorithm; Carbon provides a simpler prev/next model. Requires most other components to exist first. |
| 23 | **FigmaIconAsset** | No equivalent | Trivial (to port), Low utility | Development utility only; uses `dangerouslySetInnerHTML`. Should be kept as-is or replaced with a proper `@carbon/icons-react` icon system in the ported design system. Not a user-facing component. |

---

## Surprises & Risks

### 1. No tests whatsoever in PANW
There are zero `.test.ts`, `.spec.ts`, `.test.tsx`, or `.spec.tsx` files in the PANW source tree. The `verify.tsx` files present in each component folder appear to be Storybook-only visual verification stories, not unit tests. Porting to Carbon requires building a full test suite from scratch for every component. This is the single largest porting overhead.

### 2. Inline SVG icons everywhere — no icon library
Every PANW component embeds its own SVG paths as local functions (`ChevronDownIcon`, `AddIcon`, etc.), often duplicated across components (e.g., `ChevronDown` appears in Accordion, DropdownRounded, Chips, and more). Carbon uses `@carbon/icons-react` for all icons (tree-shakeable React components). Porting requires replacing all inline SVGs with the corresponding Carbon icon component. The icon names do not always match (PANW uses Carbon-subset icon paths but with non-standard names).

### 3. PANW uses flat CSS, not SCSS with tokens
PANW components import plain `.css` files with hardcoded color hex values and some `var(--token-name)` references to `design-tokens.css`. Carbon uses SCSS modules with `@carbon/themes` tokens (`$text-primary`, `$field`, etc.). The PANW token file (`design-tokens.css`) has a different token namespace (`--theme-text-primary` vs Carbon's `$text-primary`). A token mapping table will be required during porting.

### 4. PANW uses Lato font; Carbon uses IBM Plex
`ButtonStandard.css` shows `font-family: 'Lato', sans-serif`. Carbon's design language uses IBM Plex Sans. This is a brand-level decision that must be resolved before porting begins — either accept IBM Plex or override Carbon's typography tokens globally.

### 5. PANW has a `forceState` pattern that Carbon does not use
Many PANW components accept a `forceState` prop that overrides CSS pseudo-class states (hover, pressed, disabled) for Storybook "All States" stories. Carbon handles this differently (stories compose multiple instances in different configurations; no special prop). The `forceState` prop should not be ported to the Carbon-structured component; it can be removed or replaced with Storybook story-level composition.

### 6. Compound children vs items-array API mismatch
Carbon's Accordion, Breadcrumb, ContentSwitcher, Tabs, and ProgressIndicator all use compound component children (`<Tabs><Tab label="…">content</Tab></Tabs>`). PANW uses an items array prop on a single component. Porting means either adopting Carbon's compound pattern (preferred for consistency) or wrapping Carbon's compound components in a PANW-compatible adapter that accepts arrays. The adapter approach is faster but adds a wrapper layer.

### 7. DropdownRounded merges two Carbon components
PANW's single `DropdownRounded` with a `multiselect` flag maps to Carbon's separate `Dropdown` (single) and `MultiSelect` (multi). They have different APIs and markup. Porting requires splitting this component or building a thin adapter that selects the correct Carbon component based on the prop.

### 8. Tooltip descriptive variant is a novel PANW pattern
The "descriptive" Tooltip includes a heading, image slot, and a page stepper (previous/next pagination inside the tooltip). There is no equivalent in Carbon's component library. The closest primitives are `Popover` (for positioning) + custom content. This component requires the most design discussion before porting.

### 9. `FigmaIconAsset` uses `dangerouslySetInnerHTML`
This is the only component in the PANW system that injects raw HTML. It is explicitly a Figma-import helper and should not be ported as a user-facing component. It should be removed in favour of `@carbon/icons-react` icons.

### 10. License
Carbon is Apache-2.0. The PANW components do not have license headers. Before open-publishing any ported output that includes Carbon code patterns (utilities, SCSS mixins), confirm the Apache-2.0 license terms are met (attribution, license file).

### 11. Dependency on Storybook `.figma.tsx` files
Each PANW component has a `ComponentName.figma.tsx` file (used with the `@figma/code-connect` or similar Figma Code Connect tooling). These are not React component files; they declare how the Storybook component maps to Figma variants. They do not need to be ported to Carbon but should be regenerated for the ported components if Code Connect is still required.

---

## Recommended Next Step

Start with **ButtonStandard** and **ButtonIcon** in a single porting prompt, porting them together as `Button` and `IconButton` in the Carbon structure. These two components are the most used across the rest of the PANW system — Pagination, NumberInput, Search, Header, InlineNotification, and Tooltip all compose `ButtonIcon` directly, and Pagination composes `ButtonStandard`. Establishing the ported button primitives first means every subsequent component can immediately import from Carbon instead of from the PANW source. The buttons are also trivial in complexity (no portals, no third-party deps, no compound children), making them ideal for establishing the scaffolding conventions: file layout, TypeScript interface + PropTypes dual typing, `React.forwardRef`, `classNames`-based class composition with a `usePrefix`-equivalent, SCSS module with `@use`-based tokens, and a `Button-test.js` test file covering the same categories Carbon's tests cover. Succeeding here produces a reusable template that every subsequent porting prompt can follow.
