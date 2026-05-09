// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/delete.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Delete = React.forwardRef<SVGSVGElement, IconProps>(
  function Delete({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M15.9479 8.04736L15.0431 17.5474C15.0187 17.804 14.8032 18 14.5454 18H5.45465C5.19684 18 4.98132 17.804 4.95691 17.5474L4.05212 8.04736C4.02417 7.75384 4.255 7.5 4.54986 7.5H7.27856L9.62207 9.84344C9.83081 10.0522 10.1692 10.0522 10.3779 9.84344L12.7214 7.5H15.4501C15.745 7.5 15.9758 7.75385 15.9479 8.04736ZM16.5 4H13C12.4477 4 12 3.55225 12 3V2.5C12 2.22382 11.7761 2 11.5 2H8.5C8.22388 2 8 2.22382 8 2.5V3C8 3.55225 7.55231 4 7 4H3.5C3.22388 4 3 4.22382 3 4.5V5.5C3 5.77612 3.22388 6 3.5 6H16.5C16.7761 6 17 5.77612 17 5.5V4.5C17 4.22382 16.7761 4 16.5 4Z" fill="currentColor"/>
      </svg>
    );
  }
);

Delete.displayName = 'Delete';
