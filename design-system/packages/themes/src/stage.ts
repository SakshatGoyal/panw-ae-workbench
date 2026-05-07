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
  green60,
  green70,
  lime20,
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
  orange10,
  orange50,
  orange70,
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
  yellow10,
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
