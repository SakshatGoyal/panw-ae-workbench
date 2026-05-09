// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/signal.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Signal = React.forwardRef<SVGSVGElement, IconProps>(
  function Signal({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M4.5 16H3.5C3.22386 16 3 15.7761 3 15.5V12.5C3 12.2239 3.22386 12 3.5 12H4.5C4.77614 12 5 12.2239 5 12.5V15.5C5 15.7761 4.77614 16 4.5 16ZM9 15.5V9.5C9 9.22386 8.77614 9 8.5 9H7.5C7.22386 9 7 9.22386 7 9.5V15.5C7 15.7761 7.22386 16 7.5 16H8.5C8.77614 16 9 15.7761 9 15.5ZM13 15.5V6.5C13 6.22386 12.7761 6 12.5 6H11.5C11.2239 6 11 6.22386 11 6.5V15.5C11 15.7761 11.2239 16 11.5 16H12.5C12.7761 16 13 15.7761 13 15.5ZM17 15.5V3.5C17 3.22386 16.7761 3 16.5 3H15.5C15.2239 3 15 3.22386 15 3.5V15.5C15 15.7761 15.2239 16 15.5 16H16.5C16.7761 16 17 15.7761 17 15.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

Signal.displayName = 'Signal';
