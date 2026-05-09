// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/duplicate.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Duplicate = React.forwardRef<SVGSVGElement, IconProps>(
  function Duplicate({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.5 7H7.5C7.22386 7 7 7.22386 7 7.5V17.5C7 17.7761 7.22386 18 7.5 18H13.5C14.325 18 15 17.325 15 16.5V15.49C15 15.2095 15.2295 14.98 15.51 14.98H16.5C17.325 14.98 18 14.305 18 13.48V7.5C18 7.22386 17.7761 7 17.5 7ZM13.5 3H3.5C3.21997 3 3 3.21997 3 3.5V13.5C3 13.78 3.21997 14 3.5 14H5.5V6.5C5.5 5.94995 5.95001 5.5 6.5 5.5H14V3.5C14 3.21997 13.78 3 13.5 3Z" fill="currentColor"/>
      </svg>
    );
  }
);

Duplicate.displayName = 'Duplicate';
