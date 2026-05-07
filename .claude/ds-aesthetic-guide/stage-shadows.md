# Stage shadows — usage rules

## Tokens

| Token | Use |
|---|---|
| `--ds-shadow-tile-on-tile` | Nested tiles — a tile sitting on another tile. |
| `--ds-shadow-tiles` | Cards, tiles, panels at default elevation on a page. |
| `--ds-shadow-shell` | Reserved — no assigned use case yet. See note below. |
| `--ds-shadow-flyout` | Any flyout: dropdown menus, popovers, side panels emerging from an edge, context menus, submenu fly-outs. |
| `--ds-shadow-persistent` | Elements that float persistently on the screen across navigation — a docked input bar that remains visible on every route. |
| `--ds-shadow-modals` | Modal dialogs, alert dialogs, confirmation prompts. |

## UI shell carries no shadow

The application shell — left navigation, top bar, page chrome — carries **no shadow**. The shell is the page's frame, not a layered surface; shadows on it make the app feel busy. Lines and surface color carry shell separation.

**Important:** the `--ds-shadow-shell` token name does *not* imply that the shell uses a shadow. The token's name describes a scale position, not a use case. Don't apply it to navigation, headers, or any shell element.

## One shadow per elevation tier

Don't mix shadow tokens within an elevation tier. All cards on a page use `--ds-shadow-tiles`. All flyouts use `--ds-shadow-flyout`, regardless of size or content. Mixing tokens within a tier breaks the page's elevation hierarchy.

## Don't reach up the scale for emphasis

Each token represents a specific elevation. A flyout that wants to "feel important" still uses `--ds-shadow-flyout`, not `--ds-shadow-modals`. Modal-tier shadow is reserved for modal-tier components — using it elsewhere flattens the actual modals' visual priority when they appear.

## Pairing surfaces with shadows

Shadow tracks elevation role; surface choice is mostly independent.

| container role | surface | shadow |
|---|---|---|
| default card or panel | `surface.rest` | `--ds-shadow-tiles` |
| nested card on a card | `surface.alt` | `--ds-shadow-tile-on-tile` |
| persistent floating bar | `surface.n` | `--ds-shadow-persistent` |
| flyout, popover, tooltip (light) | `surface.rest` | `--ds-shadow-flyout` |
| flyout, popover, tooltip (dark) | `surface.inverse` | `--ds-shadow-flyout` |
| modal, dialog | `surface.rest` | `--ds-shadow-modals` |

App shell, `surface.accent`, `surface.danger`, and the status surfaces are not elevated containers — no shadow.

## Open: the shell token

`--ds-shadow-shell` has a defined value but no assigned use. Either reserve it for a future case or deprecate it. Until that's decided, don't apply it.
