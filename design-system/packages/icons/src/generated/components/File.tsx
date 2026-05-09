// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/file.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const File = React.forwardRef<SVGSVGElement, IconProps>(
  function File({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 2H3.5C3.21997 2 3 2.21997 3 2.5V17.5C3 17.78 3.21997 18 3.5 18H11C12.1 18 13 17.1 13 16V14.49C13 14.21 13.23 13.98 13.51 13.98H15C16.1 13.98 17 13.08 17 11.98V2.5C17 2.21997 16.78 2 16.5 2Z" fill="currentColor"/>
      </svg>
    );
  }
);

File.displayName = 'File';
