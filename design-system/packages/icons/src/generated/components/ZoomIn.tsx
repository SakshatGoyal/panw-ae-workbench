// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/zoom-in.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ZoomIn = React.forwardRef<SVGSVGElement, IconProps>(
  function ZoomIn({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.7263 15.4968L13.9419 12.3953C14.6079 11.4289 15 10.2598 15 9C15 5.69141 12.3086 3 9.00001 3C5.69142 3 3 5.6914 3 8.99999C3 12.3086 5.69141 15 9 15C10.2599 15 11.4289 14.6079 12.3953 13.9419L15.4968 17.7263C15.6843 17.9551 16.0281 17.9719 16.2371 17.7629L17.7629 16.237C17.9719 16.0281 17.955 15.6841 17.7263 15.4968V15.4968ZM12 9.24999C12 9.52611 11.7761 9.74999 11.5 9.74999H9.75V11.5C9.75 11.7761 9.52612 12 9.25 12H8.75C8.47388 12 8.25 11.7761 8.25 11.5V9.74999H6.5C6.22388 9.74999 6 9.52611 6 9.24999V8.74999C6 8.47387 6.22388 8.24999 6.5 8.24999H8.25V6.49999C8.25 6.22387 8.47388 5.99999 8.75 5.99999H9.25C9.52612 5.99999 9.75 6.22387 9.75 6.49999V8.24999H11.5C11.7761 8.24999 12 8.47387 12 8.74999V9.24999Z" fill="currentColor"/>
      </svg>
    );
  }
);

ZoomIn.displayName = 'ZoomIn';
