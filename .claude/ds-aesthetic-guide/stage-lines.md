# Stage lines — usage rules

## When to use a line

Lines are a designer decision, not a default. Apply them only when the component needs one.

**Always have a line:** text input fields, chips.

**Every other component:** case-by-case judgment by the designer. Lines are not automatic.

## Choosing the family

```
lines.neutral       // ≤48px (buttons, chips, inputs, small interactive elements)
lines.neutral-tile  // >48px (cards, large tiles, content blocks)
```

Both rest at neutral20. The difference is in state behavior.

## State propagation

Lines follow the parent's state only when the parent is interactive. Static tiles don't transition; their border stays at rest.

**`lines.neutral`** (when interactive): rest = neutral20, hover = neutral40, pressed = neutral60, disabled = neutral10.

**`lines.neutral-tile`** (when interactive): rest = neutral20, hover = neutral20 (unchanged), pressed = neutral40.

`lines.neutral-tile` doesn't move on hover. Tiles signal hover through their surface state; the border doesn't compound it. Intentional, not a token bug.

## Tinted grounds — rare

When a line is present *and* the parent's background takes brand or red tint, the line follows the matching family — `lines.brand` for brand-tinted, `lines.danger` for red-tinted. Same propagation logic as text and icons.

In practice, most tinted states (selected on surfaces, every state of `ghost.highlight` and `ghost.danger`, every state of `highlight`) don't carry a line at all. This rule covers the rare case where a line and a tinted ground coexist.

## Status lines

`lines.status.<x>` for info, warning, caution, success, and danger — borders on status banners, status pills, and severity badges. One value per category; no state variants, since these elements don't transition.

Status lines sit one stop darker than their interactive counterparts (`lines.danger.rest` is red60; `lines.status.danger` is red70), mirroring the offset used by status text and icons.

`lines.danger` is the interactive destructive line (error fields, destructive button borders). It carries rest, hover, pressed, and disabled. Distinct from `lines.status.danger` despite the visual overlap — different role, different shape.

## Disabled

When a parent is disabled, the line moves to `lines.<family>.disabled`. Falls back to `lines.neutral.disabled` (neutral10) when the family has no disabled token (e.g., `lines.neutral-tile`).

## `lines.bold`

Never use `lines.bold` without explicit designer review. It's defined for rare emphasis cases that haven't been pinned down; reaching for it on a hunch will produce off-spec results.

`lines.ai` is reserved (currently null) — don't use.
