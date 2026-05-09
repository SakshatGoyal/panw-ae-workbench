// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/check.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Check = React.forwardRef<SVGSVGElement, IconProps>(
  function Check({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M6.71032 15.0605L2.8076 11.1582C2.61232 10.9629 2.61231 10.6463 2.80758 10.451L3.51454 9.74407C3.70979 9.54882 4.02635 9.54881 4.22162 9.74404L7.06387 12.5858L15.9715 3.67771C16.1668 3.48244 16.4834 3.48243 16.6787 3.67771L17.3856 4.38466C17.5809 4.57992 17.5809 4.8965 17.3856 5.09176L7.41741 15.0604C7.22216 15.2557 6.90558 15.2557 6.71031 15.0605H6.71032Z" fill="currentColor"/>
      </svg>
    );
  }
);

Check.displayName = 'Check';
