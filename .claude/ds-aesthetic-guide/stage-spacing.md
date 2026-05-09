# Stage spacing — starting guidelines

## Scale

All spacing values come from this scale: **2, 4, 8, 12, 16, 24, 32, 40, 48, 64**. No off-scale numbers. (Inherited from Carbon.)

| px | token | px | token |
|---|---|---|---|
| 2 | `spacing-01` | 24 | `spacing-06` |
| 4 | `spacing-02` | 32 | `spacing-07` |
| 8 | `spacing-03` | 40 | `spacing-08` |
| 12 | `spacing-04` | 48 | `spacing-09` |
| 16 | `spacing-05` | 64 | `spacing-10` |

Steps 11–13 (`spacing-11` 80px, `spacing-12` 96px, `spacing-13` 160px) exist in tokens but cover hero/marketing-tier rhythm the product hasn't needed yet — don't reach for them until a pattern warrants it.

## Page padding

```
top:    32px
right:  32px
bottom: 64px
left:   32px
```

The asymmetric bottom (64) gives breathing room before the scroll edge or any docked footer. Narrower contexts (sidebar panels, embedded views) can reduce edges to 24px or 16px, but keep the bottom-larger pattern.

## Element-to-element spacing

The principle: **4px** = elements that read as one control surface. **8px** = elements that sit near each other but stay distinct.

```
button group, single set        →  4px between buttons
button groups in same row       →  4px within / 8px between groups
form fields stacked vertically  →  16px between fields
form fields side-by-side        →  8px between fields
chips in a chip cloud           →  4px
toolbar controls in a row       →  4px within group / 8px between groups
cards / tiles / panels grouped  →  16px between
```

Examples:

- A `Save | Cancel` button pair: 4px gap.
- A toolbar with `[bold|italic|underline]   [align-left|align-center|align-right]`: 4px within each group, 8px between the two groups.
- A KPI row of 3 metric cards: 16px between cards.
- A login form with stacked `Email` and `Password` fields: 16px between fields. `First name | Last name` side-by-side: 8px between.

## Section spacing

**24px** between sections within a page. Sections are content groups inside the same major region — e.g., a metrics row above a chart, a chart above a data table.

For larger separations between major page regions, **48px** is the next step up.

## Container internal padding

```
card / panel / info box (standard radius)
  content-light   →  16px on all sides
  content-heavy   →  24px on all sides

modal / dialog (generous radius)
  body padding             →  24px on all sides
  bottom action row        →  24px from bottom, left, right
  top-right close button   →  8px from top, 8px from right (absolute)

popover / small flyout (standard radius)
  short content       →  12px
  structured content  →  16px

tooltip
  padding   →  8px vertical, 12px horizontal
```

## Corner-anchored controls

Some controls live in the corner of a container, independent of body padding: modal close button, banner dismiss, card kebab, tooltip controls.

**The rule: 8px from the top edge, 8px from the corner edge. Absolutely positioned, overlapping any title row.**

These don't subtract from the body padding rectangle — they sit on top. A 24px-padded modal still has its close button at 8px/8px because the close button is corner-anchored, not part of the flow.

## Flyout pattern

Applies to dropdowns, popovers, context menus, and submenus — any pattern where a trigger opens a panel of items.

| Property | Value |
|---|---|
| Trigger-to-flyout offset | 4px |
| Flyout internal padding | 8px on all four sides |
| Item padding | 8px vertical, 12px horizontal |
| Gap between items | 2px |
| Divider clearance | 4px above and 4px below the line |
| Nested flyout offset | 4px |

The trigger is anything that opens the flyout — field, button, kebab, a parent menu item that opens a submenu. The 4px offset is constant.

**Dividers are standalone elements.** A divider is a 1px horizontal line with 4px breathing room above and below — it does not live as a `border-bottom` on an interactive row. Rows have `radius.tight` corners; placing a line directly on a rounded row creates a visible "uplift" gap at each end where the radius peels away from the line. Render dividers as their own element (an `<hr>`-equivalent or a 1px-tall `<div>`) sitting between the row above and the row below.

**Why 2px between rows, not 0.** When a user hovers a row immediately above or below the selected one, distance matters. With 0px, the hover ground sits flush against the selected ground and the eye reads the two as one combined block instead of as a hover preview *next to* a committed selection. 2px is the minimum gap that gives each row its own footprint without breaking the dense-list feel. More than 2px and the list starts to feel like cards.

Tooltips break this pattern — they're labels, not item lists. Use 8px vertical / 12px horizontal padding only.

## Not yet defined

Spacing is component-driven. The rules above cover patterns shared across components; component-specific rules — form-layout details (label-to-field gap, helper-text offset), table cell padding and row height, list item structure beyond flyouts, chart padding, button-size variants — will be defined as those components are built.

When in doubt, anchor to the principle: 4px for unit-cohesion, 8px for proximity, 16px for grouped objects, 24px for sections, 32px for page edges, 64px for page bottom.
