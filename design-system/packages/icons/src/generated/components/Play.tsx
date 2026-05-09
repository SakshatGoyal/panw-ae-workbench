// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/play.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Play = React.forwardRef<SVGSVGElement, IconProps>(
  function Play({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M7 5.59156V14.4084C7 14.8801 7.57224 15.1615 7.99945 14.8998L15.3038 10.4264C15.6223 10.2313 15.6223 9.76866 15.3038 9.57361L7.99945 5.10018C7.57224 4.83854 7 5.11988 7 5.59156Z" fill="currentColor"/>
      </svg>
    );
  }
);

Play.displayName = 'Play';
