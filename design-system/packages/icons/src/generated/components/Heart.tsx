// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/heart.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Heart = React.forwardRef<SVGSVGElement, IconProps>(
  function Heart({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.7 4.14987C15.6261 3.08705 14.1201 2.62454 12.5765 2.9597C11.7319 3.1431 10.9795 3.62106 10.3546 4.21822L9.99999 4.5571L9.64537 4.21822C9.02047 3.62106 8.26812 3.1431 7.42345 2.9597C5.87982 2.62454 4.37384 3.08705 3.29999 4.14987C2.46002 4.98996 2 6.10995 2 7.30002C2 8.47995 2.46002 9.59995 3.29999 10.4399L9.6502 16.6575C9.84457 16.8478 10.1554 16.8478 10.3498 16.6575L16.7 10.4399C17.54 9.59994 18 8.47995 18 7.30002C18 6.10996 17.54 4.98996 16.7 4.14987Z" fill="currentColor"/>
      </svg>
    );
  }
);

Heart.displayName = 'Heart';
