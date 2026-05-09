// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/rectangle-wide.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const RectangleWide = React.forwardRef<SVGSVGElement, IconProps>(
  function RectangleWide({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        role={ariaLabel ? 'img' : undefined}
        {...rest}>
        {title ? <title>{title}</title> : null}
        <path d="M17.5 14H2.5C2.22386 14 2 13.8508 2 13.6667V6.33333C2 6.14924 2.22386 6 2.5 6H17.5C17.7761 6 18 6.14924 18 6.33333V13.6667C18 13.8508 17.7761 14 17.5 14Z" fill="currentColor"/>
      </svg>
    );
  }
);

RectangleWide.displayName = 'RectangleWide';
