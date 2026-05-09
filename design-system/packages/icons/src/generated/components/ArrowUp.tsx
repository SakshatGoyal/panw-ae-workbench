// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/arrow-up.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ArrowUp = React.forwardRef<SVGSVGElement, IconProps>(
  function ArrowUp({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M5.20704 9.00003H8.99992V16.5C8.99992 16.7762 9.22378 17 9.49992 17H10.4999C10.7761 17 10.9999 16.7762 10.9999 16.5V9.00003H14.7928C15.2382 9.00003 15.4613 8.4615 15.1464 8.14653L10.3535 3.35361C10.1582 3.15833 9.84162 3.15833 9.64635 3.35361L4.8535 8.14651C4.53853 8.46148 4.76161 9.00003 5.20704 9.00003Z" fill="currentColor"/>
      </svg>
    );
  }
);

ArrowUp.displayName = 'ArrowUp';
