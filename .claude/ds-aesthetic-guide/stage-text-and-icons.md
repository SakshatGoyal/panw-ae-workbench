# Stage text and icons — usage rules

## Hierarchy

**`text.primary`** — emphasis. Headings, key metrics, large text, long prose, AI responses, button labels (neutral), chip labels, notification text, anything actively edited.

**`text.secondary`** — workhorse default. Table cells, checkbox labels, navigation items, flyout options, field labels, input values at rest, any text inside an interactive element that doesn't qualify for primary.

**`text.tertiary`** — supplementary. Descriptions, footnotes, metadata, helper text below fields.

**Icons mirror text 1:1 across rules and states.** The value offset is per-family, not universal. Neutral, brand, and danger families sit one stop lighter as icons (`text.primary` neutral100 → `icons.primary` neutral90; `text.danger.rest` red60 → `icons.danger.rest` red50). Warning and caution use a two-stop offset (yellow70 → yellow50, orange70 → orange50) for icon-scale visibility. Info and success share hex across text and icons (cobalt70, green70 work at both scales).

## Default by component

```
button (neutral text)   → text.primary
chip                    → text.primary
notification text       → text.primary
heading                 → text.primary
AI prose                → text.primary
metric / key data       → text.primary
table cell              → text.secondary
checkbox label          → text.secondary
nav item                → text.secondary
flyout option           → text.secondary
field label             → text.secondary
input value (rest)      → text.secondary
input value (active)    → text.primary
description / footnote  → text.tertiary
helper text             → text.tertiary
```

## State propagation

Text and icons follow the parent's state across **rest, hover, pressed, and disabled**. When a row using `text.secondary.rest` goes hover, its text becomes `text.secondary.hover`. Same for pressed and disabled.

Selected is handled separately — see the next section. Every "selected" background in the system is brand-tinted, which routes text through the matching-family rule rather than through `text.<family>.selected` (no text family defines selected).

If the matching family lacks a state, fall back to `.rest`. If it lacks `disabled`, fall back to `text.disabled` (neutral50).

## Tinted ground → matching family

When the parent's background uses brand-color or red-color alpha — regardless of state name — text and icons move into the matching family:

- alpha-brand ground → `text.brand`, `icons.brand`
- alpha-red ground → `text.danger`, `icons.danger`

**Alpha-brand grounds in the system:** selected on `surface.rest`/`.alt`/`.accent`/`.n`/`ghost`/`ghost.field`, every state of `ghost.highlight`, every state of `highlight`.

**Alpha-red grounds in the system:** every state of `ghost.danger`.

State names propagate within the matching family. Ground at `ghost.danger.hover` → `text.danger.hover`. Ground at `ghost.highlight.pressed` → `text.brand.pressed`. Ground at `ghost.highlight.selected` → `text.brand.rest` (fallback, since `text.brand` has no selected token).

This rule fires the moment the bg picks up brand or red tint. A neutral surface whose only colored state is `selected` (e.g. `surface.rest.selected` is alpha brand 30) still routes its selected text into `text.brand` even though the rest of its states stay neutral.

## Solid dark fill → inverse

When the parent's background is a solid dark fill, text and icons take `text.inverse` and `icons.inverse` (white).

**Dark solid fills in the system:** `brand`, `surface.danger`, `surface.inverse`, `status.info.strong` (cobalt80), `status.error.strong` (red60), `status.success.strong` (green60).

**Light-luminance exception.** `status.warning.strong` (yellow40) and `status.caution.strong` (orange50) are solid but not dark. Use `text.primary` and `icons.primary` on these grounds, not inverse.

## Notification exception

Text inside a notification or banner is always `text.primary`, regardless of `status.*.subtle` ground. This overrides the matching-family rule and preserves legibility of long messages on tinted backgrounds.

## Status text on subtle grounds (outside notifications)

Status pills, badges, and tags on `status.*.subtle` use `text.status.*` and `icons.status.*`. These sit one stop darker than their interactive counterparts (`text.danger.rest` is red60; `text.status.danger` is red70) — tuned for static labels on tinted ground. Single value per category; no states (pills and badges don't transition). The notification exception still wins for long-form banner text.

## Active or edited content → primary

Anything currently being edited is `text.primary`. The most common case: an input value sits at `text.secondary.rest` until the field is focused or being typed in, at which point it flips to `text.primary`.

This is content-driven, not state-driven. It fires whenever the user is actively writing or editing the text, regardless of the surrounding component's state.

## Brand, link, link-neutral

**`text.brand`** — interactive elements that need brand color but aren't hyperlinks (ghost buttons, secondary buttons, tertiary buttons). No underline.

**`text.link`** — actual hyperlinks. Underlined. Same hex as `text.brand`; the underline is the differentiator.

**`text.link-neutral`** — placement deferred (see below).

`text.ai` and `icons.ai` are reserved (currently null) — don't use.

## Placeholder

`text.placeholder` for empty input fields and search prompts. The hover state exists for fields where the placeholder itself reacts to interaction (rare).

## Disabled

`text.disabled` for standalone disabled labels.

For text inside a disabled component, use the family-aware path: `text.secondary.disabled`, `text.tertiary.disabled`, `text.brand.disabled`. Fall back to `text.disabled` (neutral50) when the family has no disabled token (e.g., `text.danger`).

## Deferred

The following are not yet codified:

**Tertiary contrast on darker grounds.** Tertiary is neutral70; on `surface.accent` (neutral20) the contrast is borderline. Either tertiary holds across all grounds, or it elevates to secondary on accent.

**Helper, error, and empty-state defaults.** Placement of helper text below fields, error text in invalid fields, empty-state text in zero-data lists.

**`text.link-neutral` placement.** Where it applies vs. `text.link` and `text.brand`.
