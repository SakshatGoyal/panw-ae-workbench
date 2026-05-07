# Stage radius — usage rules

## Tokens

| Token | Value | When to use |
|---|---|---|
| `radius.square` | `0px` | App shell, page-level containers, edges that meet OS chrome. The "no radius decision to make" default. Don't use to create a sharp aesthetic for individual components — that fights the brief. |
| `radius.tight` | `4px` | Small interactive elements the user touches directly: buttons, fields, dropdowns, toggles, icon buttons, segmented controls, kebabs. Test: *does the user touch this to do a thing?* If yes, tight. Tooltips also take tight — they're glanceable labels, not navigated content. |
| `radius.standard` | `8px` | Content containers the user reads or scans: cards, panels, info boxes, table containers, sidebar sections, accordion bodies. Test: *does this hold content and have a defined edge?* If yes, standard. |
| `radius.generous` | `12px` | Overlay surfaces that temporarily dominate or layer above the page: modals, dialogs, sheets, large popovers, full-screen notifications. Test: *does this pull attention from the rest of the page?* If yes, it needs more rounding to soften imposition, not less. |
| `radius.pill` | `9999px` | Pill-tier components only: status pills, severity badges, content tags, filter chips, toggle handles, slider thumbs. The pill shape itself is metadata — "this is a tag" or "this is a knob." Never as a "softer button" or "friendlier card." Restrict to components ≤ ~40px tall. |

## Choosing a tier

Ask three questions, in order:

1. **Does the user touch this to do a thing?** → `radius.tight`
2. **Does this hold content and have a defined edge?** → `radius.standard`
3. **Does this temporarily dominate or layer over the page?** → `radius.generous`

If none apply cleanly, default to `radius.standard`.

Size is a tiebreaker when role is ambiguous: ≤32px tall is almost always tight; 32–200px is almost always standard; >200px is almost always generous. Role beats size in edge cases — a 24px-tall toast is generous-tier despite its size, because it imposes on the page without inviting touch.

## Composition

**Inner radius ≤ outer radius, always.** A 12px container may hold an 8px button. The reverse — a larger radius nested inside a smaller one — reads broken.

When an element sits inside another with internal padding, its radius should approximate `outer-radius − padding` to preserve concentric feeling. A modal at `radius.generous` (12px) containing a `radius.tight` (4px) interior button reads concentric — the principle is inner ≤ outer; the math is a guide, not a rule.

## Pill discipline

`radius.pill` is reserved for components where the pill shape *is* the metadata:

- "This is a tag" — status pills, severity badges, content tags, filter chips
- "This is a physical control" — toggle handles, slider thumbs

Two hard exclusions:

- **Never on primary CTAs.** Buttons should read as buttons, not as marketing pills.
- **Never on elements above ~40px tall.** Large pills become lozenges and read juvenile.

If pill shape isn't communicating one of the two meanings above, use `radius.tight` instead.

## Square

`radius.square` is for page-level surfaces and the app shell — places where the radius decision is "there isn't one." Don't reach for it to make individual components feel sharper or more precise; that fights the design brief.
