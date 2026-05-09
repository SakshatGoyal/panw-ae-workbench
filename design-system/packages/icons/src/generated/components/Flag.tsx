// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/flag.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Flag = React.forwardRef<SVGSVGElement, IconProps>(
  function Flag({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M3.5 3H4.5C4.77614 3 5 3.22386 5 3.5V17.5C5 17.7761 4.77614 18 4.5 18H3.5C3.22386 18 3 17.7761 3 17.5V3.5C3 3.22386 3.22386 3 3.5 3Z" fill="currentColor"/>
<path d="M17.1668 5.62317L7.07793 4.08756C6.77529 4.0415 6.50269 4.27574 6.50269 4.58186V12.4055C6.50269 12.7159 6.78257 12.9513 7.08838 12.8981L17.1893 11.141C17.5588 11.0768 17.7287 10.6437 17.5014 10.3454L16.231 8.67803C16.0946 8.49904 16.0946 8.25099 16.231 8.07199L17.4893 6.4205C17.7194 6.11849 17.5421 5.6803 17.1668 5.62317Z" fill="currentColor"/>
      </svg>
    );
  }
);

Flag.displayName = 'Flag';
