// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/minus-circle.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const MinusCircle = React.forwardRef<SVGSVGElement, IconProps>(
  function MinusCircle({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M2.5 9.75384V10.2461C2.5 14.4513 5.59869 17.5 10 17.5C14.4014 17.5 17.5 14.4502 17.5 10.2461V9.75384C17.5 5.54865 14.4014 2.5 10 2.5C5.59869 2.5 2.5 5.54974 2.5 9.75384ZM14 10.25C14 10.5261 13.7761 10.75 13.5 10.75H6.5C6.22388 10.75 6 10.5261 6 10.25V9.75C6 9.47382 6.22388 9.25 6.5 9.25H13.5C13.7761 9.25 14 9.47382 14 9.75V10.25Z" fill="currentColor"/>
      </svg>
    );
  }
);

MinusCircle.displayName = 'MinusCircle';
