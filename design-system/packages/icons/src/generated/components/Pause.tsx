// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/pause.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Pause = React.forwardRef<SVGSVGElement, IconProps>(
  function Pause({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M6.5 5H8.5C8.77614 5 9 5.22386 9 5.5V14.5C9 14.7761 8.77614 15 8.5 15H6.5C6.22386 15 6 14.7761 6 14.5V5.5C6 5.22386 6.22386 5 6.5 5Z" fill="currentColor"/>
<path d="M11.5 5H13.5C13.7761 5 14 5.22386 14 5.5V14.5C14 14.7761 13.7761 15 13.5 15H11.5C11.2239 15 11 14.7761 11 14.5V5.5C11 5.22386 11.2239 5 11.5 5Z" fill="currentColor"/>
      </svg>
    );
  }
);

Pause.displayName = 'Pause';
