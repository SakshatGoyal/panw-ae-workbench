// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/column-width.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ColumnWidth = React.forwardRef<SVGSVGElement, IconProps>(
  function ColumnWidth({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M6 16H3.5C3.22386 16 3 15.7761 3 15.5V4.5C3 4.22386 3.22386 4 3.5 4H6C6.27614 4 6.5 4.22386 6.5 4.5V15.5C6.5 15.7761 6.27614 16 6 16ZM11.75 15.5V4.5C11.75 4.22386 11.5261 4 11.25 4H8.75C8.47386 4 8.25 4.22386 8.25 4.5V15.5C8.25 15.7761 8.47386 16 8.75 16H11.25C11.5261 16 11.75 15.7761 11.75 15.5ZM17 15.5V4.5C17 4.22386 16.7761 4 16.5 4H14C13.7239 4 13.5 4.22386 13.5 4.5V15.5C13.5 15.7761 13.7239 16 14 16H16.5C16.7761 16 17 15.7761 17 15.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

ColumnWidth.displayName = 'ColumnWidth';
