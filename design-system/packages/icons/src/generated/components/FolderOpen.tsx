// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/folder-open.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const FolderOpen = React.forwardRef<SVGSVGElement, IconProps>(
  function FolderOpen({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M5.00049 7.00001V9.25001H3.50049C3.22435 9.25001 3.00049 9.02615 3.00049 8.75001V3.5C3.00049 3.22386 3.22435 3 3.50049 3H7.6388C7.8528 3 8.0428 3.13695 8.11048 3.33997L8.55048 4.65992C8.61818 4.86302 8.80825 5.00001 9.02233 5.00001H16.5005C16.7766 5.00001 17.0005 5.22387 17.0005 5.50001V8.75001C17.0005 9.02615 16.7766 9.25001 16.5005 9.25001H15.0005V7.00001H5.00049Z" fill="currentColor"/>
<path d="M2.94107 17.5683L2.079 11.3183C2.03756 11.0179 2.27101 10.75 2.57431 10.75H17.4269C17.7302 10.75 17.9637 11.0179 17.9222 11.3183L17.0601 17.5683C17.026 17.8157 16.8146 18 16.5648 18H3.43638C3.18664 18 2.97519 17.8157 2.94107 17.5683Z" fill="currentColor"/>
      </svg>
    );
  }
);

FolderOpen.displayName = 'FolderOpen';
