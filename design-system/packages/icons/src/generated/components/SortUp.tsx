// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/sort-up.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const SortUp = React.forwardRef<SVGSVGElement, IconProps>(
  function SortUp({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M10.4999 17H9.49989C9.22375 17 8.99989 16.7761 8.99989 16.5V7H6.54298C6.06964 7 5.86129 6.40336 6.23172 6.1087L9.68863 3.35892C9.87083 3.21399 10.1289 3.21399 10.3111 3.35892L13.7681 6.1087C14.1385 6.40336 13.9301 7 13.4568 7H10.9999V16.5C10.9999 16.7761 10.776 17 10.4999 17Z" fill="currentColor"/>
      </svg>
    );
  }
);

SortUp.displayName = 'SortUp';
