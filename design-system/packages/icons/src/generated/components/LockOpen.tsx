// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/lock-open.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const LockOpen = React.forwardRef<SVGSVGElement, IconProps>(
  function LockOpen({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M11.9221 9.05554V5.98024C11.9221 4.78841 12.7686 3.69984 13.9424 3.57901C15.2915 3.44015 16.4336 4.51104 16.4336 5.84535V6.83372C16.4336 7.11336 16.6581 7.34006 16.9349 7.34006H17.4362C17.713 7.34006 17.9375 7.11336 17.9375 6.83372V5.95415C17.9375 4.14181 16.7246 2.4927 14.9668 2.12944C12.5502 1.63006 10.4182 3.49142 10.4182 5.84535V9.05554H2.61066C2.33381 9.05554 2.10938 9.28224 2.10938 9.56187V16.7859C2.10939 17.0067 2.25405 17.2072 2.46231 17.2742C4.71679 18.0002 6.69023 18.1696 8.12481 18.1696C10.4362 18.1696 12.3755 17.73 13.7997 17.2704C14.0069 17.2035 14.1403 17.008 14.1403 16.7883L14.1403 9.56187C14.1403 9.28224 13.9158 9.05554 13.639 9.05554H11.9221Z" fill="currentColor"/>
      </svg>
    );
  }
);

LockOpen.displayName = 'LockOpen';
