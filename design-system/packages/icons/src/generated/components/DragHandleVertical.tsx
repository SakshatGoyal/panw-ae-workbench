// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/drag-handle-vertical.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const DragHandleVertical = React.forwardRef<SVGSVGElement, IconProps>(
  function DragHandleVertical({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M11 15.5V4.5C11 4.22386 11.2239 4 11.5 4H12.5C12.7761 4 13 4.22386 13 4.5V15.5C13 15.7761 12.7761 16 12.5 16H11.5C11.2239 16 11 15.7761 11 15.5ZM7.5 16H8.5C8.77614 16 9 15.7761 9 15.5V4.5C9 4.22386 8.77614 4 8.5 4H7.5C7.22386 4 7 4.22386 7 4.5V15.5C7 15.7761 7.22386 16 7.5 16Z" fill="currentColor"/>
      </svg>
    );
  }
);

DragHandleVertical.displayName = 'DragHandleVertical';
