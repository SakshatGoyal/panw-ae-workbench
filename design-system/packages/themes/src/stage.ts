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
  cyan70,
  gold20,
  gold70,
  green20,
  green60,
  green70,
  lime20,
  lime70,
  mint20,
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
  olive70,
  orange10,
  orange20,
  orange50,
  orange70,
  pink20,
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
  slate70,
  violet20,
  violet70,
  yellow10,
  yellow20,
  yellow40,
  yellow50,
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
  "base": neutral0,
  "surface": {
    "rest": neutral0,
    "hover": "#f2f2f2",     // alpha(neutral20, 40) over neutral0
    "pressed": "#e4e4e4",   // alpha(neutral30, 50) over neutral0
    "selected": "#cee9ff",  // alpha(brand30, 40) over neutral0
    "disabled": neutral0,
  },
  "surface.alt": {
    "rest": neutral5,
    "hover": "#ededed",     // alpha(neutral20, 40) over neutral5
    "pressed": "#e0e0e0",   // alpha(neutral30, 50) over neutral5
    "selected": "#c9e4fa",  // alpha(brand30, 40) over neutral5
    "disabled": neutral5,
  },
  "surface.accent": {
    "rest": neutral20,
    "hover": "#d4d4d4",     // alpha(neutral30, 50) over neutral20
    "pressed": "#c1c1c1",   // alpha(neutral40, 60) over neutral20
    "selected": "#bad5eb",  // alpha(brand30, 40) over neutral20
    "disabled": neutral20,
  },
  "surface.n": {
    "rest": neutral0,
    "hover": "#f2f2f2",     // alpha(neutral20, 40) over neutral0
    "pressed": "#e4e4e4",   // alpha(neutral30, 50) over neutral0
    "selected": "#cee9ff",  // alpha(brand30, 40) over neutral0
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
    "rest": neutral10,
    "hover": "#e7e7e7",     // alpha(neutral20, 40) over neutral10
    "pressed": "#dbdbdb",   // alpha(neutral30, 50) over neutral10
    "selected": neutral0,
    "disabled": neutral5,
  },
  "field.alt": {
    "rest": neutral0,
    "hover": "#f2f2f2",     // alpha(neutral20, 40) over neutral0
    "pressed": "#e4e4e4",   // alpha(neutral30, 50) over neutral0
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
    "hover": alpha(neutral20, 40),
    "pressed": alpha(neutral30, 50),
    "selected": alpha(brand30, 40),
    "disabled": transparent,
  },
  "ghost.field": {
    "rest": transparent,
    "hover": alpha(neutral20, 40),
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
   *   low.bg    → primitive-20  (pastel)
   *   low.text  → primitive-70  (deep, takes pastel ground)
   *   high.bg   → primitive-70  (saturated)
   *   high.text → "#ffffff"     (inverse white)
   *
   * If the primitive scale ever shifts, the categorical palette follows.
   *
   * Names map to primitive families directly except where Stage's primitive
   * set has no exact match: lavender → violet, magenta → pink (closest hue),
   * jade → mint, teal → cyan, bronze → gold. The PANW tag color names are
   * preserved at the component API level so consumers don't have to migrate.
   *
   * Status-overlapping colors (red, green, orange, yellow) are kept for
   * backward compatibility with the existing Tags API. Convention: tags are
   * for categorization; for state communication use status.* tokens through
   * components like InlineNotification.
   *
   * High-contrast brightness exception: yellow at the 70 level can read
   * cleanly on inverse white in this palette, but the convention follows
   * Stage's status.warning.strong treatment — primary text on the bright
   * ground — so that any future shift to a brighter yellow-700 stays
   * legible. yellow.high.text therefore points at neutral100, not white.
   */
  "tag": {
    "grey":     { "low": { "bg": neutral20,  "text": neutral80 }, "high": { "bg": neutral70, "text": "#ffffff" } },
    "accent":   { "low": { "bg": brand20,    "text": brand70   }, "high": { "bg": brand70,   "text": "#ffffff" } },
    "red":      { "low": { "bg": red20,      "text": red70     }, "high": { "bg": red70,     "text": "#ffffff" } },
    "green":    { "low": { "bg": green20,    "text": green70   }, "high": { "bg": green70,   "text": "#ffffff" } },
    "orange":   { "low": { "bg": orange20,   "text": orange70  }, "high": { "bg": orange70,  "text": "#ffffff" } },
    "slate":    { "low": { "bg": slate20,    "text": slate70   }, "high": { "bg": slate70,   "text": "#ffffff" } },
    "lavender": { "low": { "bg": violet20,   "text": violet70  }, "high": { "bg": violet70,  "text": "#ffffff" } },
    "purple":   { "low": { "bg": purple20,   "text": purple70  }, "high": { "bg": purple70,  "text": "#ffffff" } },
    "pink":     { "low": { "bg": pink20,     "text": pink70    }, "high": { "bg": pink70,    "text": "#ffffff" } },
    "magenta":  { "low": { "bg": pink20,     "text": pink70    }, "high": { "bg": pink70,    "text": "#ffffff" } },
    "yellow":   { "low": { "bg": yellow20,   "text": yellow70  }, "high": { "bg": yellow70,  "text": neutral100 } },
    "bronze":   { "low": { "bg": gold20,     "text": gold70    }, "high": { "bg": gold70,    "text": "#ffffff" } },
    "olive":    { "low": { "bg": olive20,    "text": olive70   }, "high": { "bg": olive70,   "text": "#ffffff" } },
    "lime":     { "low": { "bg": lime20,     "text": lime70    }, "high": { "bg": lime70,    "text": "#ffffff" } },
    "jade":     { "low": { "bg": mint20,     "text": mint70    }, "high": { "bg": mint70,    "text": "#ffffff" } },
    "teal":     { "low": { "bg": cyan20,     "text": cyan70    }, "high": { "bg": cyan70,    "text": "#ffffff" } },
    "cobalt":   { "low": { "bg": cobalt20,   "text": cobalt70  }, "high": { "bg": cobalt70,  "text": "#ffffff" } },
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
