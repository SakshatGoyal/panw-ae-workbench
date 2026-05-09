// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/drag-handle.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const DragHandle = React.forwardRef<SVGSVGElement, IconProps>(
  function DragHandle({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M11.6333 15.2356L10.1638 16.9325C10.0859 17.0225 9.91412 17.0225 9.8362 16.9325L8.36672 15.2356C8.27951 15.1349 8.37329 15 8.53051 15H11.4695C11.6267 15 11.7205 15.1349 11.6333 15.2356H11.6333ZM8.53052 5.00001H11.4695C11.6267 5.00001 11.7205 4.86511 11.6333 4.76439L10.1638 3.06748C10.0859 2.9775 9.91412 2.9775 9.8362 3.06748L8.36672 4.76439C8.27951 4.86511 8.37329 5.00001 8.53051 5.00001H8.53052ZM16 8.50001V7.50001C16 7.22387 15.7761 7.00001 15.5 7.00001H4.5C4.22386 7.00001 4 7.22387 4 7.50001V8.50001C4 8.77615 4.22386 9.00001 4.5 9.00001H15.5C15.7761 9.00001 16 8.77615 16 8.50001ZM16 12.5V11.5C16 11.2239 15.7761 11 15.5 11H4.5C4.22386 11 4 11.2239 4 11.5V12.5C4 12.7761 4.22386 13 4.5 13H15.5C15.7761 13 16 12.7761 16 12.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

DragHandle.displayName = 'DragHandle';
