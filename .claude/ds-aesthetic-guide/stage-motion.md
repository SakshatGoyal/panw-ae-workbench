# Stage motion — usage rules

Motion follows Carbon's calculations until Stage defines its own. When Stage publishes motion tokens, the local definition wins.

## Durations

Productive — utility transitions, hover, micro-feedback. Default scale.

| Token | Value | Use |
|---|---|---|
| `fast-01` | 70ms | Micro-interactions: button and toggle state changes |
| `fast-02` | 110ms | Micro-interactions, simple transitions |
| `moderate-01` | 150ms | Fade transitions |
| `moderate-02` | 240ms | Small expansions, short distances |
| `slow-01` | 400ms | Large expansions, longer distances |
| `slow-02` | 700ms | Important system notifications |

## Easing curves

Productive — the default. Use unless the moment earns expressive treatment.

| Role | Curve |
|---|---|
| Standard | `cubic-bezier(0.2, 0, 0.38, 0.9)` |
| Entrance | `cubic-bezier(0, 0, 0.38, 0.9)` |
| Exit | `cubic-bezier(0.2, 0, 1, 0.9)` |

Expressive — for moments that earn attention. Content reveals, large-scale page transitions, anything narrative.

| Role | Curve |
|---|---|
| Standard | `cubic-bezier(0.4, 0.14, 0.3, 1)` |
| Entrance | `cubic-bezier(0, 0, 0.3, 1)` |
| Exit | `cubic-bezier(0.4, 0.14, 1, 1)` |

## Choosing

Default is productive. Reach for expressive only when the transition is itself the content — a value the user is meant to watch, not a side effect of an action they took.

Match easing to role: entrance for things appearing, exit for things leaving, standard for things changing in place.

## Component entrances

Different surfaces earn different volumes of motion. The rule of thumb: motion volume scales with how much the surface narrates versus how much it serves a task.

| Surface | Motion |
|---|---|
| Tooltip | opacity fade + 8px directional slide, 70ms (`fast-01`), entrance easing |
| Popover | opacity fade + 8px directional slide, 70ms (`fast-01`), entrance easing |
| Flyout | opacity fade + 2px settle, 90ms, entrance easing |

A flyout holds interactive items the user is about to act on, not narrative content they're being shown — so the entrance is quieter than a popover's. The 2px settle reads as the panel arriving in place, not flying in from somewhere. Tooltips and popovers explain; their motion can be more present because the user's attention is already drawn there.

Respect `prefers-reduced-motion: reduce` on every component entrance — drop the slide, drop the fade, render in final position.

## When no named scale fits

Calculate from the same logic. Duration scaled to distance traveled — a 200px slide takes longer than a 20px nudge. Easing matched to whether the element is entering view, leaving view, or transitioning in place. Author values that would feel native to Carbon's system; do not invent a parallel one.