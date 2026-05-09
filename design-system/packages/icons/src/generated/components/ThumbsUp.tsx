// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/thumbs-up.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ThumbsUp = React.forwardRef<SVGSVGElement, IconProps>(
  function ThumbsUp({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M3.5 16.9999H2.5C2.22386 16.9999 2 16.7761 2 16.4999V10.4999C2 10.2238 2.22386 9.99992 2.5 9.99992H3.5C3.77614 9.99992 4 10.2238 4 10.4999V16.4999C4 16.7761 3.77614 16.9999 3.5 16.9999ZM5.52618 16.9999H13.6577C15.0343 16.9999 16.2342 16.063 16.5681 14.7276L17.6894 10.2424C17.8471 9.6113 17.3698 8.99992 16.7192 8.99992H11.8658C11.5569 8.99992 11.3218 8.72249 11.3726 8.41772L11.9468 4.9727C12.0329 4.45634 11.8768 3.96306 11.5684 3.59904C11.2589 3.23382 10.7656 3.09114 10.4133 3.03546C10.1774 2.99819 9.95599 3.12624 9.87121 3.34943C9.47197 4.40043 8.88178 5.66715 7.99999 6.99992C7.16375 8.26384 6.28545 9.25431 5.52617 9.99992L5.52618 16.9999Z" fill="currentColor"/>
      </svg>
    );
  }
);

ThumbsUp.displayName = 'ThumbsUp';
