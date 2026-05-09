// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/bolt.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Bolt = React.forwardRef<SVGSVGElement, IconProps>(
  function Bolt({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M5.18124 17.2841L7.83555 12.0439C8.00072 11.7178 7.76378 11.3322 7.39826 11.3322H5.3613C4.92336 11.3322 4.70521 10.8017 5.01647 10.4936L13.4507 2.1456C13.8382 1.76206 14.4683 2.20268 14.2411 2.69829L12.047 7.48412C11.8982 7.80883 12.1354 8.17861 12.4926 8.17861H14.5838C15.0222 8.17861 15.2401 8.71016 14.9279 9.01793L5.96266 17.8547C5.56702 18.2447 4.93022 17.7797 5.18124 17.2841Z" fill="currentColor"/>
      </svg>
    );
  }
);

Bolt.displayName = 'Bolt';
