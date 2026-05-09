// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/chevron-down.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ChevronDown = React.forwardRef<SVGSVGElement, IconProps>(
  function ChevronDown({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M4.64654 8.20712L9.64646 13.207C9.84172 13.4023 10.1583 13.4023 10.3536 13.207L15.3535 8.20712C15.5487 8.01186 15.5487 7.69528 15.3535 7.50001L14.6465 6.79305C14.4513 6.59779 14.1347 6.59779 13.9394 6.79305L10 10.7325L6.06058 6.79305C5.86532 6.59779 5.54874 6.59779 5.35347 6.79305L4.64651 7.50001C4.45125 7.69527 4.45128 8.01185 4.64654 8.20712Z" fill="currentColor"/>
      </svg>
    );
  }
);

ChevronDown.displayName = 'ChevronDown';
