import type { SVGProps } from 'react';

/**
 * Common props for every icon component in @ds/icons.
 *
 * Sizing: defaults to 20px, matching the imported viewBox (20x20). Pass an
 * explicit `size` to render at any other size — the underlying viewBox
 * scales cleanly because every glyph is authored on the same grid.
 *
 * Color: monochrome icons paint via `fill="currentColor"` — set `color` on
 * the icon or any ancestor to retint. Brand icons (`brand-*`) and
 * sales-play status icons preserve their authored fills and ignore
 * `color`; that's deliberate, not a bug — those glyphs carry meaning in
 * their hue.
 *
 * Accessibility: `aria-hidden="true"` by default. Pass `aria-label` (and
 * the component will drop the hidden attribute) to surface the icon as a
 * labeled element to assistive tech.
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Render width and height in px. Defaults to 20. */
  size?: number | string;
  /** Forwarded to root `<svg>`. */
  className?: string;
  /** Forwarded to root `<svg>`. */
  title?: string;
}

export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;
