// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/columns.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Columns = React.forwardRef<SVGSVGElement, IconProps>(
  function Columns({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M3 3.5V16.5C3 16.7761 3.22386 17 3.5 17H16.5C16.7761 17 17 16.7761 17 16.5V3.5C17 3.22386 16.7761 3 16.5 3H3.5C3.22386 3 3 3.22386 3 3.5ZM5 7H9V15H5V7ZM11 15V7H15V15H11Z" fill="currentColor"/>
      </svg>
    );
  }
);

Columns.displayName = 'Columns';
