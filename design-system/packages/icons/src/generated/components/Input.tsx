// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/input.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Input = React.forwardRef<SVGSVGElement, IconProps>(
  function Input({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.5 4H2.5C2.22388 4 2 4.22388 2 4.5V15.5C2 15.7761 2.22388 16 2.5 16H17.5C17.7761 16 18 15.7761 18 15.5V4.5C18 4.22388 17.7761 4 17.5 4ZM5.75 12.5C5.75 12.7761 5.52612 13 5.25 13H4.75C4.47388 13 4.25 12.7761 4.25 12.5V7.5C4.25 7.22388 4.47388 7 4.75 7H5.25C5.52612 7 5.75 7.22388 5.75 7.5V12.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

Input.displayName = 'Input';
