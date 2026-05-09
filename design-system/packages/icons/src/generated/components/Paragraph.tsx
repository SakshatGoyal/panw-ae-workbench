// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/paragraph.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Paragraph = React.forwardRef<SVGSVGElement, IconProps>(
  function Paragraph({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17 3.5C17 3.22386 16.7761 3 16.5 3H7.17205C5.083 3 3.21734 4.52713 3.01881 6.60672C2.79106 8.99241 4.66106 11 6.99998 11H8.99998V16.5C8.99998 16.7761 9.22384 17 9.49998 17H10.5C10.7761 17 11 16.7761 11 16.5V5H13V16.5C13 16.7761 13.2238 17 13.5 17H14.5C14.7761 17 15 16.7761 15 16.5V5H16.5C16.7761 5 17 4.77614 17 4.5L17 3.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

Paragraph.displayName = 'Paragraph';
