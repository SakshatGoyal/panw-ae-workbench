// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/arrows-double.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ArrowsDouble = React.forwardRef<SVGSVGElement, IconProps>(
  function ArrowsDouble({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.7076 9.74514L13.4878 6.07217C13.2914 5.90115 13.0004 6.05331 13.0004 6.32705V9.00002H7.00043V6.32705C7.00043 6.05331 6.70948 5.90115 6.513 6.07217L2.29328 9.74514C2.14313 9.87582 2.14313 10.1242 2.29328 10.2549L6.51301 13.9279C6.70948 14.0988 7.00044 13.9467 7.00044 13.673V11H13.0004V13.673C13.0004 13.9467 13.2914 14.0988 13.4879 13.9279L17.7076 10.2549C17.8577 10.1242 17.8577 9.87582 17.7076 9.74514H17.7076Z" fill="currentColor"/>
      </svg>
    );
  }
);

ArrowsDouble.displayName = 'ArrowsDouble';
