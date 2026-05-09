// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/stop.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Stop = React.forwardRef<SVGSVGElement, IconProps>(
  function Stop({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M13.7143 6H6.28571C6.12793 6 6 6.1279 6 6.28571V13.7143C6 13.8721 6.12793 14 6.28571 14H13.7143C13.8721 14 14 13.8721 14 13.7143V6.28571C14 6.1279 13.8721 6 13.7143 6Z" fill="currentColor"/>
      </svg>
    );
  }
);

Stop.displayName = 'Stop';
