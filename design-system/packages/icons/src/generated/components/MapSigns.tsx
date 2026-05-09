// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/map-signs.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const MapSigns = React.forwardRef<SVGSVGElement, IconProps>(
  function MapSigns({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M9.00001 4.99995V9.99995H4.78491C4.65591 9.99995 4.53152 9.95332 4.43624 9.86927L2.16864 7.86927C1.94379 7.67103 1.94379 7.32886 2.16864 7.13056L4.43624 5.13057C4.53152 5.04652 4.65591 4.99995 4.78491 4.99995H9.00001ZM17.8314 7.13057L15.5638 5.13057C15.4685 5.04652 15.3441 4.99995 15.2151 4.99995H11V9.99995H15.2151C15.3441 9.99995 15.4685 9.95332 15.5638 9.86927L17.8314 7.86927C18.0562 7.67103 18.0562 7.32886 17.8314 7.13056V7.13057ZM9.00001 16.5C9.00001 16.7761 9.22389 17 9.50001 17H10.5C10.7761 17 11 16.7761 11 16.5V9.99995H9.00001V16.5ZM10 4.73965C10.6847 4.73965 11.2397 4.18457 11.2397 3.49995C11.2397 2.81525 10.6847 2.26025 10 2.26025C9.31532 2.26025 8.76031 2.81526 8.76031 3.49995C8.76031 4.18457 9.31532 4.73965 10 4.73965Z" fill="currentColor"/>
      </svg>
    );
  }
);

MapSigns.displayName = 'MapSigns';
