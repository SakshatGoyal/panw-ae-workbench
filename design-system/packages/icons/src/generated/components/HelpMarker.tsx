// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/help-marker.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const HelpMarker = React.forwardRef<SVGSVGElement, IconProps>(
  function HelpMarker({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M8.74233 2.0914C5.30782 2.64694 3.05812 5.67868 3.40779 9.01413C3.84505 13.1855 7.83675 15.2519 9.41743 17.765C9.62886 18.1012 10.1314 18.0651 10.3452 17.7304C12.0346 15.0856 16.372 12.9245 16.372 8.25826C16.372 4.44601 12.8311 1.43015 8.74233 2.0914ZM9.61574 14C9.14125 14 8.75667 13.6153 8.75667 13.1408C8.75667 12.6665 9.14125 12.2819 9.61574 12.2819C10.0902 12.2819 10.4748 12.6665 10.4748 13.1408C10.4748 13.6153 10.0902 14 9.61574 14ZM12.6678 7.32163C12.6678 8.74949 11.9849 9.69468 10.3436 9.83567L10.2562 10.9123C10.2405 11.1064 10.076 11.256 9.87831 11.256H9.28248C9.09156 11.256 8.93043 11.1162 8.90632 10.9297L8.73725 9.61986C8.61774 9.11254 9.00794 8.62743 9.53675 8.62584L9.50526 8.62499C10.8502 8.62499 11.2523 8.11486 11.2523 7.36681V7.34472C11.2523 6.71008 10.7576 6.2683 9.92952 6.2683C9.32381 6.2683 8.80635 6.48974 8.33077 6.89916C8.17141 7.03637 7.93551 7.03856 7.79067 6.88646L7.43624 6.51439C7.29873 6.3701 7.29372 6.13927 7.43764 6.00121C8.06868 5.39525 8.86879 4.99999 9.96419 4.99999C11.5745 4.99999 12.6678 5.88353 12.6678 7.29955V7.32163Z" fill="currentColor"/>
      </svg>
    );
  }
);

HelpMarker.displayName = 'HelpMarker';
