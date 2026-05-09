// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/browser.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Browser = React.forwardRef<SVGSVGElement, IconProps>(
  function Browser({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 3H3.5C3.22388 3 3 3.22382 3 3.5V16.5C3 16.7761 3.22388 17 3.5 17H16.5C16.7761 17 17 16.7761 17 16.5V3.5C17 3.22382 16.7761 3 16.5 3ZM7 6.25C7 6.66418 6.66418 7 6.25 7H5.75C5.33582 7 5 6.66418 5 6.25V5.75C5 5.33575 5.33582 5 5.75 5H6.25C6.66418 5 7 5.33575 7 5.75V6.25ZM15 6.25C15 6.52612 14.7761 6.75 14.5 6.75H9.5C9.22388 6.75 9 6.52612 9 6.25V5.75C9 5.47382 9.22388 5.25 9.5 5.25H14.5C14.7761 5.25 15 5.47382 15 5.75V6.25Z" fill="currentColor"/>
      </svg>
    );
  }
);

Browser.displayName = 'Browser';
