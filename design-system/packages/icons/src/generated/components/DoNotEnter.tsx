// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/do-not-enter.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const DoNotEnter = React.forwardRef<SVGSVGElement, IconProps>(
  function DoNotEnter({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M15 10.5C15 10.7761 14.7761 11 14.5 11H5.5C5.22388 11 5 10.7761 5 10.5V9.5C5 9.22382 5.22388 9 5.5 9H14.5C14.7761 9 15 9.22382 15 9.5V10.5ZM2.5 9.75384V10.2461C2.5 14.4513 5.59869 17.5 10 17.5C14.4014 17.5 17.5 14.4502 17.5 10.2461V9.75384C17.5 5.54865 14.4014 2.5 10 2.5C5.59869 2.5 2.5 5.54974 2.5 9.75384Z" fill="currentColor"/>
      </svg>
    );
  }
);

DoNotEnter.displayName = 'DoNotEnter';
