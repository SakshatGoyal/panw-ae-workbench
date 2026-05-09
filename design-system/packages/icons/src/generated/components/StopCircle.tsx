// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/stop-circle.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const StopCircle = React.forwardRef<SVGSVGElement, IconProps>(
  function StopCircle({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M10 2.5C5.59869 2.5 2.5 5.5498 2.5 9.75391V10.2461C2.5 14.4512 5.59869 17.5 10 17.5C14.4013 17.5 17.5 14.4502 17.5 10.2461V9.75391C17.5 5.54858 14.4014 2.5 10 2.5ZM13 12.5C13 12.7761 12.7761 13 12.5 13H7.5C7.22388 13 7 12.7761 7 12.5V7.5C7 7.22388 7.22388 7 7.5 7H12.5C12.7761 7 13 7.22388 13 7.5V12.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

StopCircle.displayName = 'StopCircle';
