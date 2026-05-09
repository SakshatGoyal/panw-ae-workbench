// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/sort-down.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const SortDown = React.forwardRef<SVGSVGElement, IconProps>(
  function SortDown({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M10.5 3H9.5C9.22386 3 9 3.22386 9 3.5V13H6.54309C6.06975 13 5.8614 13.5966 6.23183 13.8913L9.68874 16.6411C9.87094 16.786 10.1291 16.786 10.3113 16.6411L13.7682 13.8913C14.1386 13.5966 13.9303 13 13.4569 13H11V3.5C11 3.22386 10.7761 3 10.5 3Z" fill="currentColor"/>
      </svg>
    );
  }
);

SortDown.displayName = 'SortDown';
