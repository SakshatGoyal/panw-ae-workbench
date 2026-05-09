// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/list.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const List = React.forwardRef<SVGSVGElement, IconProps>(
  function List({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 2H3.5C3.21997 2 3 2.21997 3 2.5V17.5C3 17.78 3.21997 18 3.5 18H12C13.1 18 14 17.1 14 16V15.49C14 15.21 14.23 14.98 14.51 14.98H15C16.1 14.98 17 14.08 17 12.98V2.5C17 2.21997 16.78 2 16.5 2ZM9 5.75C9 5.47382 9.22388 5.25 9.5 5.25H13.5C13.7761 5.25 14 5.47382 14 5.75V6.25C14 6.52612 13.7761 6.75 13.5 6.75H9.5C9.22388 6.75 9 6.52612 9 6.25V5.75ZM6 13C5.44769 13 5 12.5522 5 12C5 11.4477 5.44769 11 6 11C6.55231 11 7 11.4477 7 12C7 12.5522 6.55231 13 6 13ZM6 10C5.44769 10 5 9.55225 5 9C5 8.44769 5.44769 8 6 8C6.55231 8 7 8.44769 7 9C7 9.55225 6.55231 10 6 10ZM6 7C5.44769 7 5 6.55225 5 6C5 5.44769 5.44769 5 6 5C6.55231 5 7 5.44769 7 6C7 6.55225 6.55231 7 6 7ZM13 12.25C13 12.5261 12.7761 12.75 12.5 12.75H9.5C9.22388 12.75 9 12.5261 9 12.25V11.75C9 11.4738 9.22388 11.25 9.5 11.25H12.5C12.7761 11.25 13 11.4738 13 11.75V12.25ZM15 9.25C15 9.52612 14.7761 9.75 14.5 9.75H9.5C9.22388 9.75 9 9.52612 9 9.25V8.75C9 8.47382 9.22388 8.25 9.5 8.25H14.5C14.7761 8.25 15 8.47382 15 8.75V9.25Z" fill="currentColor"/>
      </svg>
    );
  }
);

List.displayName = 'List';
