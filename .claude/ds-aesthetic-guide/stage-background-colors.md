# Stage background colors — usage rules

## Mental model

```
stage.base                    // page itself
  ├── surface.rest            // tiles on the page
  │     └── surface.alt       // tile on tile
  ├── surface.n               // persistent floating layer (chat input, command palette)
  ├── surface.accent          // ground for non-tile elements (toggle track, unselected tab, default tag)
  ├── surface.inverse         // intentionally-dark surfaces (tooltips, popovers, dark callouts)
  └── surface.danger          // button fill, terminal destructive CTAs only

status fills (parallel family — semantic categories, not elevation)
  ├── status.<x>.subtle       // tinted ground for banners, notifications, status pills
  └── status.<x>.strong       // solid fill for severity badges
                              // x ∈ {info, warning, caution, error, success}
```

## Surface

**Surface vs surface.accent.** Surface wraps content. Surface.accent *is* the element. If it holds children, surface; if it's standalone, accent.

**Surface.rest and surface.alt rarely interact.** Hover/pressed/selected states exist only for whole-tile click targets. Don't reach for them by default.

**Surface.n is reserved.** Identical to surface.rest in value today; the separation exists so a distinct shadow can attach later without a token migration. Use only for persistent floating elements.

**Surface.inverse** is for intentionally-dark surfaces — tooltips, popovers, dark callouts, dark sheets. Rest=neutral90, hover=neutral80, pressed=neutral70. No disabled state. The "rarely interact" caveat applies; tooltips and most popovers don't invite hover-on-themselves.

**Surface.danger is a button fill, not a container.** Use for irreversible actions only (delete, revoke). Softer destructive actions use red text and red lines on a neutral surface. `surface.danger.selected` exists in tokens but is reserved — don't reach for it.

## Field

**Placement inverts against ground:**

```
ground neutral0 (base, surface.rest, surface.n)  → field.rest (grey)
ground grey     (surface.alt, surface.accent)    → field.alt  (white)
```

**Selected = focused on field tokens.** Read it that way every time.

`field.alt.selected` equals `field.alt.rest`. Focus signal lives in the border — `field.alt` always carries a line, and that line moves to brand on focus.

## Ghost

**Selection — scope first, size second:**

```
ghost.field      // when surrounding area is too dense for another grey field rest fill
ghost.highlight  // ≤ 48px tall (rows, flyout items, chips, kebabs, small icon buttons)
ghost            // > 48px tall (large interactive cards)
```

**Ghost.field** replaces a field when adding another grey layer would over-crowd the parent. Transparent at rest; hover and pressed carry the input affordance.

**Ghost.danger** for destructive items in lists, menus, flyouts. Surface.danger performs the destruction; ghost.danger leads to it.

`ghost` and `ghost.field` are visually identical today. The split exists so a future field-affordance divergence can land without a token migration — same logic as `surface.rest` / `surface.n`. Choose by the use-case rule above, not by appearance.

## Nested interactive scopes

Parent and child interactive areas never both hover at once. Cursor on child → parent returns to rest, child hovers. Component-authoring contract; the token system does not enforce it.

CSS hint: `:hover:not(:has(:hover))` on the parent.

## Brand and highlight

**Brand** = *do this*. Primary CTA, solid fill, used sparingly — ideally one per major surface.

**Highlight** = *this is engaged*. Project attached, mode on, special-status item. Brand-tinted, soft, no solid fill.

Different verbs. They never compete.

Highlight has no meaningful disabled state — the token equals rest because engagement is binary. If a highlighted item becomes inert, drop the highlight rather than disabling it in place.

## Status fills

Parallel family for semantic-category content. Two tiers, five categories (info, warning, caution, error, success).

**`status.*.subtle`** — light tinted ground (cobalt20, yellow10, orange10, red20, lime20). For banners, notifications, status pills, callouts. Quiet enough to carry body text, loud enough to communicate category.

**`status.*.strong`** — solid bold fill (cobalt80, yellow40, orange50, red60, green60). For severity badges, status indicators, single-glance markers. Most are dark and take inverse text; the exceptions are `status.warning.strong` (yellow40) and `status.caution.strong` (orange50), which are too bright — these take primary text instead. See the text and icons doc for the full rule.

Status fills are not surfaces in the elevation sense. They communicate semantic category, not stacking. Don't treat them as containers in the elevation diagram.

## Overloaded names

- `stage.highlight` — engaged-state fill (the pill itself).
- `ghost.highlight` — interaction feedback for small elements.
- *selected* on most tokens — chosen from a set.
- *selected* on field tokens — focused.

## Disabled is content-led

Many `disabled` values equal `rest`. Disabled-ness comes from `text.disabled` and `icons.disabled`, not a dimmed surface.

Exception: `surface.danger.disabled` (red30) does dim the surface — destructive button text is already inverse white, so the surface carries the disabled signal.

## Reserved

`surface.ai` and `field.ai` are reserved (currently null) — don't use.
