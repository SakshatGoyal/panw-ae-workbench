// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/checkbox-indeterminate.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const CheckboxIndeterminate = React.forwardRef<SVGSVGElement, IconProps>(
  function CheckboxIndeterminate({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 3H3.5C3.22388 3 3 3.22382 3 3.5V16.5C3 16.7761 3.22388 17 3.5 17H16.5C16.7761 17 17 16.7761 17 16.5V3.5C17 3.22382 16.7761 3 16.5 3ZM6.5 10.75C6.22388 10.75 6 10.5261 6 10.25V9.75C6 9.47382 6.22388 9.25 6.5 9.25H13.5C13.7761 9.25 14 9.47382 14 9.75V10.25C14 10.5261 13.7761 10.75 13.5 10.75H6.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

CheckboxIndeterminate.displayName = 'CheckboxIndeterminate';
