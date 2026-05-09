// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/bookmark.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Bookmark = React.forwardRef<SVGSVGElement, IconProps>(
  function Bookmark({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M14.5 2H5.5C5.22386 2 5 2.22386 5 2.5V18L9.62565 12.7757C9.82463 12.551 10.1754 12.551 10.3743 12.7757L15 18V2.5C15 2.22386 14.7761 2 14.5 2Z" fill="currentColor"/>
      </svg>
    );
  }
);

Bookmark.displayName = 'Bookmark';
