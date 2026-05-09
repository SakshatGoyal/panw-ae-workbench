// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/chevron-left.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ChevronLeft = React.forwardRef<SVGSVGElement, IconProps>(
  function ChevronLeft({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M11.5859 4.64652L6.58601 9.64644C6.39075 9.8417 6.39075 10.1583 6.58601 10.3536L11.5859 15.3535C11.7812 15.5487 12.0978 15.5487 12.293 15.3535L13 14.6465C13.1953 14.4513 13.1953 14.1347 13 13.9394L9.06058 9.99998L13 6.06056C13.1953 5.8653 13.1953 5.54872 13 5.35345L12.293 4.64649C12.0978 4.45123 11.7812 4.45126 11.5859 4.64652Z" fill="currentColor"/>
      </svg>
    );
  }
);

ChevronLeft.displayName = 'ChevronLeft';
