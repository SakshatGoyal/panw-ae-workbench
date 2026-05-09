// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/file-search.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const FileSearch = React.forwardRef<SVGSVGElement, IconProps>(
  function FileSearch({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M13.25 8C13.25 9.24264 12.2426 10.25 11 10.25C9.75736 10.25 8.75 9.24264 8.75 8C8.75 6.75736 9.75736 5.75 11 5.75C12.2426 5.75 13.25 6.75736 13.25 8Z" fill="currentColor"/>
<path fillRule="evenodd" clipRule="evenodd" d="M3.5 2H16.5C16.78 2 17 2.21997 17 2.5V11.98C17 13.08 16.1 13.98 15 13.98H13.51C13.23 13.98 13 14.21 13 14.49V16C13 17.1 12.1 18 11 18H3.5C3.21997 18 3 17.78 3 17.5V2.5C3 2.21997 3.21997 2 3.5 2ZM8.9353 11.1252C9.5282 11.5182 10.2371 11.75 11 11.75C13.0674 11.75 14.75 10.0679 14.75 8C14.75 5.93213 13.0674 4.25 11 4.25C8.93262 4.25 7.25 5.93213 7.25 8C7.25 8.763 7.48182 9.47181 7.87476 10.0646L5.82331 12.1161C5.628 12.3114 5.628 12.628 5.82331 12.8232L6.1767 13.1767C6.37201 13.3719 6.68854 13.3719 6.88385 13.1767L8.9353 11.1252Z" fill="currentColor"/>
      </svg>
    );
  }
);

FileSearch.displayName = 'FileSearch';
