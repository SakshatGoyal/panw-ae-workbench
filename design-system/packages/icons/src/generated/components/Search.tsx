// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/search.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Search = React.forwardRef<SVGSVGElement, IconProps>(
  function Search({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.7263 15.4968L13.9419 12.3953C14.6079 11.4289 15 10.2598 15 9C15 5.69141 12.3086 3 9.00001 3C5.69142 3 3 5.6914 3 8.99999C3 12.3086 5.69141 15 9 15C10.2599 15 11.4289 14.6079 12.3953 13.9419L15.4968 17.7263C15.6843 17.9551 16.0281 17.9719 16.2371 17.7629L17.7629 16.237C17.9719 16.0281 17.955 15.6841 17.7263 15.4968ZM5 8.99999C5 6.79394 6.79395 4.99999 9 4.99999C11.206 4.99999 13 6.79394 13 8.99999C13 11.206 11.206 13 9 13C6.79395 13 5 11.206 5 8.99999Z" fill="currentColor"/>
      </svg>
    );
  }
);

Search.displayName = 'Search';
