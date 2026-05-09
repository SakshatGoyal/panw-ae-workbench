// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/arrow-square-left.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ArrowSquareLeft = React.forwardRef<SVGSVGElement, IconProps>(
  function ArrowSquareLeft({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17 8.5V3.5C17 3.22386 16.7761 3 16.5 3H3.5C3.22386 3 3 3.22386 3 3.5V16.5C3 16.7761 3.22386 17 3.5 17H16.5C16.7761 17 17 16.7761 17 16.5V11.5C17 11.2239 16.7761 11 16.5 11H10.76V12.9C10.76 13.34 10.23 13.57 9.90997 13.25L7.01001 10.35C6.81751 10.1575 6.81751 9.84247 7.01001 9.64996L9.90997 6.75C10.23 6.42999 10.76 6.65997 10.76 7.09998V9H16.5C16.7761 9 17 8.77614 17 8.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

ArrowSquareLeft.displayName = 'ArrowSquareLeft';
