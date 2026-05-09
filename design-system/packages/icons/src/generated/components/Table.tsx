// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/table.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Table = React.forwardRef<SVGSVGElement, IconProps>(
  function Table({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 3H3.5C3.22388 3 3 3.22388 3 3.5V16.5C3 16.7761 3.22388 17 3.5 17H16.5C16.7761 17 17 16.7761 17 16.5V3.5C17 3.22388 16.7761 3 16.5 3ZM15 7V10H11V7H15ZM9 7V10H5V7H9ZM5 15V12H9V15H5ZM11 15V12H15V15H11Z" fill="currentColor"/>
      </svg>
    );
  }
);

Table.displayName = 'Table';
