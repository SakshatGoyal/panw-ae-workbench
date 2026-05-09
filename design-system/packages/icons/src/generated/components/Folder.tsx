// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/folder.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Folder = React.forwardRef<SVGSVGElement, IconProps>(
  function Folder({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 5.00001H9.02185C8.80774 5.00001 8.61768 4.86305 8.54999 4.65992L8.10999 3.33997C8.0423 3.13697 7.8523 3 7.63831 3H3.5C3.22388 3 3 3.22388 3 3.5V15.5C3 15.7761 3.22388 16 3.5 16H16.5C16.7761 16 17 15.7761 17 15.5V5.50001C17 5.22389 16.7761 5.00001 16.5 5.00001Z" fill="currentColor"/>
      </svg>
    );
  }
);

Folder.displayName = 'Folder';
