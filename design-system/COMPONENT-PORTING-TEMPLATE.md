# Component Porting Template

Read this file before porting any component. It codifies patterns established by the Button + IconButton port. Every subsequent component follows these rules unless the prompt explicitly overrides one.

## Source-of-truth rule

PANW wins on behavior. Carbon wins on code structure.

Behavior = props, variants, accessibility, controlled/uncontrolled handling, keyboard interactions.
Structure = file layout, naming, TypeScript+PropTypes dual typing, forwardRef, barrel shape, SCSS pattern, test naming, story format.

PANW features Carbon doesn't have (e.g., button shape: pill/rounded/standard) → keep as documented PANW extension.
Carbon features PANW doesn't have → include only if PANW has an analog or it adds genuine value.

## Project paths

- Design system root: /Users/sakshatgoyal/Documents/GitHub/panw-ae-workbench/design-system/
- PANW source (read-only): /Users/sakshatgoyal/Documents/Intelligaia/panw-design-system/src/components/<ComponentName>/
- Carbon reference (read-only): /Users/sakshatgoyal/Documents/GitHub/test-ground/carbon-copy/packages/react/src/components/<ComponentName>/
- Carbon SCSS reference: /Users/sakshatgoyal/Documents/GitHub/test-ground/carbon-copy/packages/styles/scss/components/<component-name>/
- Type tokens: design-system/packages/type/src/styles.ts (USE THESE; hardcode with comment if no token matches)
- Reference port: design-system/packages/button/ (Button + IconButton — established pattern)

## Workspace package structure

Each component package at design-system/packages/<component-name>/:

packages/<component-name>/
├── package.json (name: "@ds/<component-name>", workspace member)
├── tsconfig.json (extends design-system root)
├── src/
│   ├── <ComponentName>/
│   │   ├── <ComponentName>.tsx
│   │   ├── <ComponentName>.stories.js
│   │   ├── <ComponentName>.mdx
│   │   ├── index.ts
│   │   └── __tests__/<ComponentName>-test.js
│   ├── internal/ (only if package needs local utilities)
│   └── index.ts (barrel)

Sibling components (e.g., Tabs + Tab, Breadcrumb + BreadcrumbItem) each get their own folder under src/.

Skeleton variants live at <ComponentName>.Skeleton.tsx next to the main file.

SCSS lives at design-system/packages/styles/scss/components/<component-name>/ — NOT inside the component package.

## Component code pattern

Every component uses TypeScript interface + runtime PropTypes + forwardRef + displayName.

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
// (Reuse Button package's usePrefix until a shared internal package exists.
//  When 3+ components need shared utilities, extract to @ds/internal.)

export const ComponentNameKinds = ['primary', 'secondary'] as const;
export type ComponentNameKind = (typeof ComponentNameKinds)[number];

export interface ComponentNameProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'kind'> {
  kind?: ComponentNameKind;
  children?: React.ReactNode;
}

export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  function ComponentName({ kind = 'primary', className, children, ...rest }, ref) {
    const prefix = usePrefix();
    const classes = classNames(
      `${prefix}--component-name`,
      `${prefix}--component-name--${kind}`,
      className
    );
    return <div ref={ref} className={classes} {...rest}>{children}</div>;
  }
);

ComponentName.displayName = 'ComponentName';

ComponentName.propTypes = {
  kind: PropTypes.oneOf(ComponentNameKinds),
  className: PropTypes.string,
  children: PropTypes.node,
};

Rules:
- Enum-like values exported as `as const` arrays + derived union types
- Use Omit<HTMLAttributes<...>, 'redefinedFields'> to avoid type conflicts
- forwardRef mandatory for interactive primitives; optional for pure presentational (Tags, Link, etc. — match what PANW source did)
- displayName mandatory always
- PropTypes mirrors the TypeScript interface (best-effort)

## Index barrel pattern

src/<ComponentName>/index.ts:
  export { ComponentName } from './ComponentName';
  export type { ComponentNameProps, ComponentNameKind } from './ComponentName';
  export { ComponentNameKinds } from './ComponentName';
  // No default export unless component genuinely has one

src/index.ts (package root):
  export * from './ComponentName';

Critical rule: each symbol exported exactly once across the chain. Duplicate exports break Vite/Storybook with "Multiple exports with the same name". Verify before declaring done.

## Class naming and prefix

All classes use the prefix from usePrefix() (returns 'panw'). BEM-like double-dash naming.

.panw--component-name
.panw--component-name--primary
.panw--component-name__inner-element

In SCSS, the prefix comes from a config file (or hardcoded as 'panw' for now — see Button's SCSS for the pattern).

## SCSS structure

design-system/packages/styles/scss/components/<component-name>/:

_index.scss     — entry point, forwards everything, calls the mixin
_<name>.scss    — actual styles
_tokens.scss    — CSS custom properties for hex colors and component-local vars
_mixins.scss    — helper mixins if needed

Pattern:
- Use @use for module imports (NOT @import)
- BEM-like class names with the prefix
- Hex colors copied as-is from PANW source CSS — define as CSS custom properties at the top of _tokens.scss with comment that this is the future token swap point
- Typography: pull from packages/type/src/styles.ts where a token reasonably matches; hardcode with inline comment when no token applies (e.g., /* PANW-specific: 14px, no token equivalent */)
- No inline styles in markup

## Storybook stories

<ComponentName>.stories.js — plain JS with JSDoc types (NOT .tsx).

Required exports:
- default export: meta object with component, title (e.g., 'Components/<ComponentName>'), argTypes wired for controls
- Default: the playground story driven by controls
- Named stories per significant variant (one per kind, size, shape, state)
- AllVariants: matrix story showing every combination in a grid (use a wrapper div with display: grid)

Action handlers wired with action() from '@storybook/addon-actions' (NOT 'storybook/actions').

## MDX docs page

<ComponentName>.mdx — adjacent to the stories file.

Critical: MDX runs in browser ESM context. NO require() calls anywhere. Imports at top of file using ESM import syntax. If the docs page renders an icon, import it: `import { Plus } from 'lucide-react';` then reference {<Plus />}.

Required sections (read Carbon's <ComponentName>.mdx for structural reference and adapt prose):
- Overview
- Live Demo (the playground story)
- Code (snippets in fenced blocks)
- Component API (auto-generated props table from TypeScript)
- Accessibility

For PANW-specific extensions (props/variants Carbon doesn't have), write structurally complete prose with a {/* TODO: replace with PANW design intent */} marker so future docs work knows where to refine.

## Tests

__tests__/<ComponentName>-test.js — Carbon-style naming (-test.js, NOT .test.js).

Smoke test categories per component:
1. Renders without crashing with default props
2. Each significant boolean prop applies the right class
3. Each kind/size/shape variant produces expected DOM
4. Click/change handlers fire correctly
5. Accessibility attributes wired (aria-label, role, etc.)
6. forwardRef forwards correctly (if component uses forwardRef)
7. Disabled state prevents interaction (if applicable)

Use @testing-library/react with screen.getByRole, getByText, toHaveAttribute, toHaveClass.

## Icons

Use lucide-react (already installed at workspace root).
Import only the icons needed: import { ChevronDown, X } from 'lucide-react';
Pass icons as ElementType (renderIcon: ElementType), NOT as ReactNode — match Carbon's pattern.
For components originally using ReactNode in PANW, change the API to renderIcon and document in MDX.

## Colors

Copy hex values directly from PANW's source CSS. Do NOT attempt token mapping.
Define as CSS custom properties in _tokens.scss with comment indicating future token swap.

## Typography

Read /Users/sakshatgoyal/Documents/GitHub/panw-ae-workbench/design-system/packages/type/src/styles.ts.
For each font-family/size/weight/line-height needed:
- If a token reasonably matches, use the token
- If no reasonable match, hardcode with inline SCSS comment explaining why

## Pre-flight checks before declaring a component port done

1. ESLint clean: npx eslint packages/<component-name>/src — zero errors
2. Tests pass: npm test runs the new tests, all pass
3. Storybook builds: npm run build-storybook completes without runtime errors (NOT just dev-serve)
4. Storybook serves: dev server starts, component appears in sidebar with Docs page and stories
5. No duplicate exports: verify each symbol exported once across barrel chain
6. MDX uses ESM imports only: grep for require() in .mdx files — must return zero hits

## What NOT to do

- Don't use git. No commits, no staging, no git command of any kind.
- Don't write a markdown file documenting the port unless explicitly asked.
- Don't add Carbon features that PANW doesn't need (Skeleton, FeatureFlag stories, etc.) unless PANW has an analog.
- Don't fabricate documentation prose — use {/* TODO */} markers.
- Don't drop PANW-specific behavior because Carbon doesn't have it.
- Don't fight tooling configs — if Vitest/Storybook/ESLint config needs updating to support a new pattern, update the config rather than working around it.

## Composing other DS components

When a component nests another DS component (per the dependency tier in `ds-build-order.md`), it MUST import from the workspace package, not redefine.

Example: Pagination uses Button, IconButton, and Dropdown. Pagination's package.json must declare:

```json
"dependencies": {
  "@ds/button": "workspace:*",
  "@ds/dropdown": "workspace:*"
}
```

And Pagination.tsx must import:

```tsx
import { Button } from '@ds/button';
import { IconButton } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
```

NEVER redefine a component locally. If you find yourself writing `function Button(...)` inside any component package other than `@ds/button`, stop — that component should be imported instead.

Pre-flight check: grep the new component's source for any local function or const definition matching a name exported from another `@ds/*` package. Must return zero hits.

```bash
# Run from design-system root before declaring a component done
for pkg in packages/*/package.json; do
  pkg_name=$(node -e "console.log(require('./$pkg').name.replace('@ds/', ''))")
  # Names exported by this package
  exports=$(grep -hE '^export (const|function|class) [A-Z]' packages/$pkg_name/src/**/*.tsx 2>/dev/null | grep -oE '[A-Z][A-Za-z]+' | sort -u)
done
```

If a tier-1 component "couldn't find" a tier-0 component to import: stop and report. Do NOT recreate it. The tier-0 component exists; the import path or workspace config is the actual problem.

## Compound children for grouped components

Components that contain a list of grouped sub-elements (Tabs + Tab, Accordion + AccordionItem, Breadcrumb + BreadcrumbItem, ProgressIndicator + ProgressStep) follow Carbon's compound children pattern, NOT a flat items array.

```tsx
// Yes — compound children
<Tabs>
  <Tab label="Overview">Overview content</Tab>
  <Tab label="Details">Details content</Tab>
</Tabs>

// No — items array (PANW's old API)
<Tabs items={[{ label: 'Overview', content: '...' }]} />
```

For each compound component pair:
- Parent component (Tabs) lives at `packages/<name>/src/<Parent>/`
- Child component (Tab) lives at `packages/<name>/src/<Child>/`
- Both exported from package root barrel
- Parent uses `React.Children.map` or `React.Children.toArray` to walk children
- Parent passes index/state to children via context (`React.createContext` + custom hook)
- Children consume context via the custom hook to know their position, selected state, etc.

This pattern handles Tabs, Breadcrumb (note: PANW name is "Breadcrumbs" plural, but the component shape can still be `<Breadcrumbs><BreadcrumbItem>...</BreadcrumbItem></Breadcrumbs>` — keep the plural package name to match PANW's existing naming, but the inner item is singular), and ProgressStep.

Exception: Accordion stays with PANW's flat structure (size prop, items via props or children depending on PANW source). Do NOT convert Accordion to compound AccordionItem children.

In the MDX docs page for components that changed from items array to compound children, document the API change: "PANW originally accepted an `items` array prop; this port uses compound children to match Carbon's pattern."

## Reference: tier-0 packages

When porting tier-1 or higher components, these `@ds/*` packages are available to import from (built in tier-0). Verify the actual export names by reading each package's `src/index.ts` before importing — do not guess:

- @ds/button
- @ds/tags
- @ds/checkbox
- @ds/radio-button
- @ds/toggle
- @ds/link
- @ds/chips
- @ds/content-switcher
- @ds/breadcrumbs
- @ds/progress-step

Verify the actual export names by reading each package's `src/index.ts` before importing.

## Reference port

design-system/packages/button/ — Button + IconButton, the first port.
Read this package's src/ files when in doubt about any pattern. It's the working template.