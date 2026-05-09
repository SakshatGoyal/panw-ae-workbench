// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/more.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const More = React.forwardRef<SVGSVGElement, IconProps>(
  function More({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M9.93437 2H10.0656C11.1867 2 12 2.82632 12 4.00001C12 5.1737 11.187 6 10.0656 6H9.93437C8.81328 6 8 5.1737 8 4.00001C8 2.82632 8.81299 2 9.93437 2Z" fill="currentColor"/>
<path d="M10.0656 8H9.93437C8.81299 8 8 8.82632 8 10C8 11.1737 8.81328 12 9.93437 12H10.0656C11.187 12 12 11.1737 12 10C12 8.82632 11.1867 8 10.0656 8Z" fill="currentColor"/>
<path d="M10.0656 14H9.93437C8.81299 14 8 14.8263 8 16C8 17.1737 8.81328 18 9.93437 18H10.0656C11.187 18 12 17.1737 12 16C12 14.8263 11.1867 14 10.0656 14Z" fill="currentColor"/>
      </svg>
    );
  }
);

More.displayName = 'More';
