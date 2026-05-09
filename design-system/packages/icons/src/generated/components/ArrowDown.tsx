// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/arrow-down.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ArrowDown = React.forwardRef<SVGSVGElement, IconProps>(
  function ArrowDown({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M14.7928 11H10.9999V3.5C10.9999 3.22386 10.7761 3 10.4999 3H9.49993C9.22379 3 8.99993 3.22386 8.99993 3.5V11H5.20702C4.7616 11 4.53853 11.5385 4.85349 11.8535L9.64635 16.6464C9.84162 16.8417 10.1582 16.8417 10.3535 16.6464L15.1464 11.8535C15.4613 11.5386 15.2382 11 14.7928 11Z" fill="currentColor"/>
      </svg>
    );
  }
);

ArrowDown.displayName = 'ArrowDown';
