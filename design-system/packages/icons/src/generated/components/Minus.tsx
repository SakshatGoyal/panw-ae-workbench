// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/minus.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Minus = React.forwardRef<SVGSVGElement, IconProps>(
  function Minus({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 9H3.5C3.22386 9 3 9.22386 3 9.5V10.5C3 10.7761 3.22386 11 3.5 11H16.5C16.7761 11 17 10.7761 17 10.5V9.5C17 9.22386 16.7761 9 16.5 9Z" fill="currentColor"/>
      </svg>
    );
  }
);

Minus.displayName = 'Minus';
