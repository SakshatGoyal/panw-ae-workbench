// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/exclamation-triangle.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ExclamationTriangle = React.forwardRef<SVGSVGElement, IconProps>(
  function ExclamationTriangle({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.9133 15.1606L10.4153 3.23693C10.2208 2.92754 9.77922 2.92754 9.58464 3.23693L2.08666 15.1606C1.86193 15.518 2.10039 16 2.502 16H17.498C17.8996 16 18.1381 15.5181 17.9133 15.1606ZM9.52428 7.17193H10.4757C10.7322 7.17193 10.934 7.40069 10.9125 7.66729L10.6913 10.4094C10.6722 10.6462 10.4824 10.8281 10.2545 10.8281H9.74548C9.51764 10.8281 9.32782 10.6462 9.30871 10.4094L9.08752 7.66729C9.06604 7.40069 9.26775 7.17193 9.52428 7.17193ZM9.99999 14C9.44768 14 8.99999 13.5523 8.99999 13C8.99999 12.4477 9.44768 12 9.99999 12C10.5523 12 11 12.4477 11 13C11 13.5523 10.5523 14 9.99999 14Z" fill="currentColor"/>
      </svg>
    );
  }
);

ExclamationTriangle.displayName = 'ExclamationTriangle';
