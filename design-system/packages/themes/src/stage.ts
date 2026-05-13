// Hand-authored. The source of truth for this mode's semantic tokens.

import {
  brand20,
  brand30,
  brand40,
  brand50,
  brand60,
  brand70,
  brand80,
  brand90,
  cobalt20,
  cobalt60,
  cobalt70,
  cobalt80,
  cyan20,
  cyan60,
  cyan70,
  gold20,
  gold60,
  gold70,
  green20,
  green60,
  green70,
  lime20,
  lime60,
  lime70,
  mint20,
  mint60,
  mint70,
  neutral0,
  neutral5,
  neutral10,
  neutral20,
  neutral30,
  neutral40,
  neutral50,
  neutral60,
  neutral70,
  neutral80,
  neutral90,
  neutral100,
  olive20,
  olive60,
  olive70,
  orange10,
  orange20,
  orange50,
  orange60,
  orange70,
  pink20,
  pink60,
  pink70,
  purple20,
  purple30,
  purple60,
  purple70,
  purple80,
  red20,
  red30,
  red50,
  red60,
  red70,
  red80,
  slate20,
  slate60,
  slate70,
  violet20,
  violet60,
  violet70,
  yellow10,
  yellow20,
  yellow40,
  yellow50,
  yellow60,
  yellow70,
} from '@ds/colors';

const transparent = 'transparent';

function alpha(hex: string, percentage: number): string {
  const red = Number.parseInt(hex.slice(1, 3), 16);
  const green = Number.parseInt(hex.slice(3, 5), 16);
  const blue = Number.parseInt(hex.slice(5, 7), 16);

  return `rgb(${red} ${green} ${blue} / ${percentage}%)`;
}

export const StageTokens = {
  "base": neutral10,
  "surface": {
    "rest": neutral0,
    "hover": "#ECEFF1",     // alpha(neutral20, 70) over neutral0
    "pressed": "#E2E6E8",   // alpha(neutral30, 50) over neutral0
    "selected": "#CEE9FF",  // alpha(brand30, 40) over neutral0
    "disabled": neutral0,
  },
  "surface.alt": {
    "rest": neutral5,
    "hover": "#EAEDF0",     // alpha(neutral20, 70) over neutral5
    "pressed": "#DEE3E6",   // alpha(neutral30, 50) over neutral5
    "selected": "#C9E6FD",  // alpha(brand30, 40) over neutral5
    "disabled": neutral5,
  },
  "surface.accent": {
    "rest": neutral20,
    "hover": "#D5DADE",     // alpha(neutral30, 50) over neutral20
    "pressed": "#BFC5C9",   // alpha(neutral40, 60) over neutral20
    "selected": "#BEDBF3",  // alpha(brand30, 40) over neutral20
    "disabled": neutral20,
  },
  "surface.n": {
    "rest": neutral0,
    "hover": "#ECEFF1",     // alpha(neutral20, 70) over neutral0
    "pressed": "#E2E6E8",   // alpha(neutral30, 50) over neutral0
    "selected": "#CEE9FF",  // alpha(brand30, 40) over neutral0
    "disabled": neutral0,
  },
  "surface.inverse": {
    "rest": neutral90,
    "hover": neutral80,
    "pressed": neutral70,
  },
  "surface.ai": {
    "rest": null,
    "hover": null,
    "pressed": null,
    "selected": null,
    "disabled": null,
  },
  "surface.danger": {
    "rest": red60,
    "hover": red70,
    "pressed": red80,
    "selected": red80,
    "disabled": red30,
  },
  "status": {
    "info": {
      "subtle": cobalt20,
      "strong": cobalt80,
    },
    "warning": {
      "subtle": yellow10,
      "strong": yellow40,
    },
    "caution": {
      "subtle": orange10,
      "strong": orange50,
    },
    "error": {
      "subtle": red20,
      "strong": red60,
    },
    "success": {
      "subtle": lime20,
      "strong": green60,
    },
  },
  "field": {
    "rest": neutral5,
    "hover": "#EAEDF0",     // alpha(neutral20, 70) over neutral5
    "pressed": "#DEE3E6",   // alpha(neutral30, 50) over neutral5
    "selected": neutral0,
    "disabled": neutral5,
  },
  "field.alt": {
    "rest": neutral0,
    "hover": "#ECEFF1",     // alpha(neutral20, 70) over neutral0
    "pressed": "#E2E6E8",   // alpha(neutral30, 50) over neutral0
    "selected": neutral0,
    "disabled": neutral5,
  },
  "field.ai": {
    "rest": null,
    "hover": null,
    "pressed": null,
    "selected": null,
    "disabled": null,
  },
  "ghost": {
    "rest": transparent,
    "hover": alpha(neutral20, 70),
    "pressed": alpha(neutral30, 50),
    "selected": alpha(brand30, 40),
    "disabled": transparent,
  },
  "ghost.field": {
    "rest": transparent,
    "hover": alpha(neutral20, 70),
    "pressed": alpha(neutral30, 50),
    "selected": alpha(brand30, 40),
    "disabled": transparent,
  },
  "ghost.highlight": {
    "rest": transparent,
    "hover": alpha(brand20, 50),
    "pressed": alpha(brand30, 60),
    "selected": alpha(brand30, 40),
    "disabled": transparent,
  },
  "ghost.danger": {
    "rest": transparent,
    "hover": alpha(red20, 50),
    "pressed": alpha(red30, 60),
    "selected": alpha(red30, 40),
    "disabled": transparent,
  },
  "brand": {
    "rest": brand60,
    "hover": brand70,
    "pressed": brand80,
    "selected": brand80,
    "disabled": brand30,
  },
  "highlight": {
    "rest": alpha(brand30, 40),
    "hover": alpha(brand40, 50),
    "pressed": alpha(brand50, 60),
    "selected": alpha(brand30, 40),
    "disabled": alpha(brand30, 40),
  },
  "text": {
    "primary": neutral100,
    "secondary": {
      "rest": neutral80,
      "hover": neutral90,
      "pressed": neutral100,
      "disabled": neutral50,
    },
    "tertiary": {
      "rest": neutral70,
      "hover": neutral90,
      "pressed": neutral100,
      "disabled": neutral50,
    },
    "disabled": neutral50,
    "placeholder": {
      "rest": neutral50,
      "hover": neutral60,
    },
    "brand": {
      "rest": brand70,
      "hover": brand80,
      "pressed": brand90,
      "disabled": brand30,
    },
    "info": cobalt70,
    "success": green70,
    "danger": {
      "rest": red60,
      "hover": red70,
      "pressed": red80,
    },
    "warning": yellow70,
    "caution": orange70,
    "ai": null,
    "status": {
      "success": green70,
      "danger": red70,
      "warning": yellow70,
      "caution": orange70,
      "ai": null,
      "info": cobalt70,
    },
    "inverse": {
      "rest": "#ffffff",
      "hover": "#ffffff",
      "pressed": "#ffffff",
      "disabled": "#ffffff",
    },
    "link": {
      "rest": brand70,
      "hover": brand80,
      "pressed": brand90,
      "disabled": brand30,
    },
    "link-neutral": {
      "rest": neutral100,
      "hover": brand70,
      "pressed": brand80,
      "disabled": neutral50,
    },
    "link-visited": {
      "rest": purple60,
      "hover": purple70,
      "pressed": purple80,
      "disabled": purple30,
    },
  },
  "icons": {
    "primary": neutral90,
    "secondary": {
      "rest": neutral70,
      "hover": neutral80,
      "pressed": neutral90,
      "disabled": neutral50,
    },
    "tertiary": {
      "rest": neutral60,
      "hover": neutral80,
      "pressed": neutral90,
      "disabled": neutral50,
    },
    "disabled": neutral50,
    "brand": {
      "rest": brand60,
      "hover": brand70,
      "pressed": brand80,
      "disabled": brand30,
    },
    "info": cobalt70,
    "success": green70,
    "danger": {
      "rest": red50,
      "hover": red60,
      "pressed": red70,
    },
    "warning": yellow50,
    "caution": orange50,
    "ai": null,
    "status": {
      "success": green60,
      "danger": red60,
      "warning": yellow50,
      "caution": orange50,
      "ai": null,
      "info": cobalt70,
    },
    "inverse": {
      "rest": "#ffffff",
      "hover": "#ffffff",
      "pressed": "#ffffff",
      "disabled": "#ffffff",
    },
    "link-visited": {
      "rest": purple60,
      "hover": purple70,
      "pressed": purple80,
      "disabled": neutral50,
    },
  },
  "lines": {
    "ai": null,
    "bold": neutral80,
    "neutral": {
      "rest": neutral20,
      "hover": neutral40,
      "pressed": neutral60,
      "disabled": neutral10,
    },
    "neutral-tile": {
      "rest": neutral20,
      "hover": neutral20,
      "pressed": neutral40,
    },
    "brand": {
      "rest": brand60,
      "hover": brand70,
      "pressed": brand80,
      "disabled": brand30,
    },
    "danger": {
      "rest": red60,
      "hover": red70,
      "pressed": red80,
      "disabled": red20,
    },
    "status": {
      "info": cobalt60,
      "warning": yellow50,
      "caution": orange50,
      "success": green60,
      "danger": red70,
    },
  },
  /**
   * Categorical tag palette.
   *
   * Each color is a derived reference into the primitive scales:
   *   low.bg        → primitive-20  (pastel rest)
   *   low.text      → primitive-70  (deep, takes pastel ground)
   *   high.bg       → primitive-70  (saturated rest)
   *   high.bg-hover → primitive-60  (one step softer on hover)
   *   high.text     → "#ffffff"     (inverse white)
   *
   * Low tags do NOT carry a hover bg token — pastel grounds darkened too
   * aggressively when shifted to primitive-30. The component instead pulls
   * in a 1px inset border in currentColor on hover (see _tags.scss), which
   * echoes the family without dimming the chip. High tags soften cleanly
   * via the bg-hover token: same lane, lighter on the eye.
   *
   * If the primitive scale ever shifts, the categorical palette follows.
   *
   * Names map to primitive families directly except where Stage's primitive
   * set has no exact match: lavender → violet, jade → mint, teal → cyan,
   * bronze → gold. The PANW tag color names are preserved at the component
   * API level so consumers don't have to migrate.
   *
   * Status-overlapping colors (red, green, orange, yellow) are kept for
   * backward compatibility with the existing Tags API. Convention: tags are
   * for categorization; for state communication use status.* tokens through
   * components like InlineNotification.
   *
   * Yellow.high.text uses inverse white like every other high-contrast tag.
   * Earlier the categorical block routed it to neutral100 to mirror
   * status.warning.strong, but yellow70 (#a65e00) on white text passes WCAG
   * AA where neutral100 on the same ground was a borderline categorical
   * choice that failed accessibility on certain backgrounds.
   */
  /**
   * Icon tokens follow `stage-text-and-icons.md` — icons mirror text 1:1,
   * with a per-family lightness offset:
   *   - default categorical: icon sits one stop lighter than text
   *     (text=primitive-70 → icon.rest=primitive-60)
   *   - warning/caution-tier (yellow, orange): two-stop offset
   *     (text=primitive-70 → icon.rest=primitive-50)
   *   - info/success-tier (cobalt, green): icon shares the text hex
   *     (primitive-70 at both scales — these primitives read at icon sizes
   *     without a lightening step)
   *
   * Hover/pressed: low icons step deeper toward text on engagement so the
   * icon "pulls in" alongside the inset-currentColor border the chip uses
   * for hover. High icons are white on dark grounds — no further change.
   */
  "tag": {
    // Grey low icons reference the icons.secondary family directly via SCSS
    // (see _tags.scss). The token values below are retained for completeness
    // and for any consumer reading the tag-grey-low-icon-* alias, but the
    // tag's runtime icon color is sourced from --ds-icons-secondary-* so it
    // automatically follows future shifts to the secondary icon family.
    // low.bg-hover = h1,s1,l2 in HSL space:
    //   h1, s1 from primitive-20 (rest) — hue and saturation preserved
    //   l2      from primitive-30        — lightness of the next step down
    //   result: same color family, visibly darker, no hue drift.
    //   HSL chosen over HSB because HSB brightness is clamped by the max
    //   channel and produces no change for pastels where R or B = 0xFF.
    "grey":     { "low": { "bg": neutral20, "bg-hover": "#C3CCD3", "text": neutral80, "icon": { "rest": neutral70, "hover": neutral80, "pressed": neutral90 } }, "high": { "bg": neutral70, "bg-hover": neutral60, "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "accent":   { "low": { "bg": brand20,   "bg-hover": "#8CC8F8", "text": brand70,   "icon": { "rest": brand60,   "hover": brand70,   "pressed": brand80   } }, "high": { "bg": brand70,   "bg-hover": brand60,   "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "red":      { "low": { "bg": red20,     "bg-hover": "#FFB8C2", "text": red70,     "icon": { "rest": red60,     "hover": red70,     "pressed": red80     } }, "high": { "bg": red70,     "bg-hover": red60,     "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "green":    { "low": { "bg": green20,   "bg-hover": "#64E2C0", "text": green70,   "icon": { "rest": green70,   "hover": green70,   "pressed": green70   } }, "high": { "bg": green70,   "bg-hover": green60,   "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "orange":   { "low": { "bg": orange20,  "bg-hover": "#FDBE80", "text": orange70,  "icon": { "rest": orange50,  "hover": orange60,  "pressed": orange70  } }, "high": { "bg": orange70,  "bg-hover": orange60,  "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "slate":    { "low": { "bg": slate20,   "bg-hover": "#C6CEF5", "text": slate70,   "icon": { "rest": slate60,   "hover": slate70,   "pressed": slate70   } }, "high": { "bg": slate70,   "bg-hover": slate60,   "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "lavender": { "low": { "bg": violet20,  "bg-hover": "#E4CCFA", "text": violet70,  "icon": { "rest": violet60,  "hover": violet70,  "pressed": violet70  } }, "high": { "bg": violet70,  "bg-hover": violet60,  "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "purple":   { "low": { "bg": purple20,  "bg-hover": "#F9C4F9", "text": purple70,  "icon": { "rest": purple60,  "hover": purple70,  "pressed": purple80  } }, "high": { "bg": purple70,  "bg-hover": purple60,  "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "pink":     { "low": { "bg": pink20,    "bg-hover": "#FFC7D4", "text": pink70,    "icon": { "rest": pink60,    "hover": pink70,    "pressed": pink70    } }, "high": { "bg": pink70,    "bg-hover": pink60,    "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "yellow":   { "low": { "bg": yellow20,  "bg-hover": "#FFC24F", "text": yellow70,  "icon": { "rest": yellow50,  "hover": yellow60,  "pressed": yellow70  } }, "high": { "bg": yellow70,  "bg-hover": yellow60,  "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "bronze":   { "low": { "bg": gold20,    "bg-hover": "#EEDB5D", "text": gold70,    "icon": { "rest": gold60,    "hover": gold70,    "pressed": gold70    } }, "high": { "bg": gold70,    "bg-hover": gold60,    "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "olive":    { "low": { "bg": olive20,   "bg-hover": "#D2DD79", "text": olive70,   "icon": { "rest": olive60,   "hover": olive70,   "pressed": olive70   } }, "high": { "bg": olive70,   "bg-hover": olive60,   "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "lime":     { "low": { "bg": lime20,    "bg-hover": "#C1E76B", "text": lime70,    "icon": { "rest": lime60,    "hover": lime70,    "pressed": lime70    } }, "high": { "bg": lime70,    "bg-hover": lime60,    "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "jade":     { "low": { "bg": mint20,    "bg-hover": "#72EACE", "text": mint70,    "icon": { "rest": mint60,    "hover": mint70,    "pressed": mint70    } }, "high": { "bg": mint70,    "bg-hover": mint60,    "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "teal":     { "low": { "bg": cyan20,    "bg-hover": "#68E9EF", "text": cyan70,    "icon": { "rest": cyan60,    "hover": cyan70,    "pressed": cyan70    } }, "high": { "bg": cyan70,    "bg-hover": cyan60,    "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
    "cobalt":   { "low": { "bg": cobalt20,  "bg-hover": "#99E0FF", "text": cobalt70,  "icon": { "rest": cobalt70,  "hover": cobalt80,  "pressed": cobalt80  } }, "high": { "bg": cobalt70,  "bg-hover": cobalt60,  "text": "#ffffff", "icon": { "rest": "#ffffff", "hover": "#ffffff", "pressed": "#ffffff" } } },
  },
} as const;

/**
 * Pre-composed hex values for interactive states (PoC)
 *
 * Tokens with alpha overlays (hover/pressed/selected) have been pre-composed
 * against each family's rest color and stored as solid hex values. Components
 * can consume them with `background-color: var(--token)` and get correct
 * visuals with no runtime layering required.
 *
 * The original alpha() recipe and the rest color used for compositing are
 * preserved as inline comments next to each value, so any of these can be
 * recomputed if a primitive changes.
 *
 * Compositing formula (per RGB channel, alpha as 0–1):
 *   result = overlay × alpha + base × (1 − alpha)
 *
 * Excluded from pre-composition:
 *   - ghost.* — rest is transparent, no base to compose against. Components
 *     stack these against whatever sits behind.
 *   - highlight — rest is itself an alpha; same reason.
 *   - surface.danger, brand, text.*, icons.*, lines.* — already solid swaps.
 *
 * Brand coupling: *.selected tokens use alpha(brand30, 40). They're locked
 * to the current brand color — recompute if brand changes.
 */
