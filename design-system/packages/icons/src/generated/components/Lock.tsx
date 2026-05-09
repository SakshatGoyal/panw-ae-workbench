// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/lock.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Lock = React.forwardRef<SVGSVGElement, IconProps>(
  function Lock({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M15.5 8H13.75V6C13.75 3.93262 12.0679 2.25 10 2.25C7.93213 2.25 6.25 3.93262 6.25 6V8H4.5C4.22388 8 4 8.22388 4 8.5V15.6337C4 15.8518 4.14429 16.0498 4.35205 16.116C6.60071 16.8328 8.56909 17 10 17C12.3055 17 14.2398 16.5659 15.6604 16.1121C15.867 16.0459 16 15.853 16 15.636V8.5C16 8.22388 15.7761 8 15.5 8ZM10.75 13.5C10.75 13.7761 10.5261 14 10.25 14H9.75C9.47388 14 9.25 13.7761 9.25 13.5V11.5C9.25 11.2239 9.47388 11 9.75 11H10.25C10.5261 11 10.75 11.2239 10.75 11.5V13.5ZM12.25 8H7.75V6C7.75 4.75977 8.75928 3.75 10 3.75C11.2407 3.75 12.25 4.75977 12.25 6V8Z" fill="currentColor"/>
      </svg>
    );
  }
);

Lock.displayName = 'Lock';
