// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/map-marker-alt.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const MapMarkerAlt = React.forwardRef<SVGSVGElement, IconProps>(
  function MapMarkerAlt({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M8.74235 2.09141C5.30784 2.64689 3.05815 5.67875 3.40778 9.01414C3.84505 13.1856 7.83679 15.2519 9.41746 17.765C9.62887 18.1012 10.1315 18.0651 10.3453 17.7304C12.0346 15.0857 16.3721 12.9245 16.3721 8.25822C16.3721 4.44609 12.8311 1.43009 8.74235 2.09141ZM9.99961 9.99998C8.89506 9.99998 7.99961 9.10453 7.99961 7.99998C7.99961 6.89537 8.89506 5.99998 9.99961 5.99998C11.1042 5.99998 11.9996 6.89537 11.9996 7.99998C11.9996 9.10453 11.1042 9.99998 9.99961 9.99998Z" fill="currentColor"/>
      </svg>
    );
  }
);

MapMarkerAlt.displayName = 'MapMarkerAlt';
