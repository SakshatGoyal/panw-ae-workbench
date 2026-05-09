// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/star.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Star = React.forwardRef<SVGSVGElement, IconProps>(
  function Star({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M10.4258 2.62528L12.5301 6.88904C12.5992 7.02918 12.7329 7.12632 12.8876 7.14879L17.5929 7.83252C17.9824 7.88911 18.1379 8.36772 17.8561 8.64243L14.4513 11.9613C14.3394 12.0704 14.2883 12.2275 14.3147 12.3816L15.1185 17.0679C15.185 17.4558 14.7779 17.7516 14.4295 17.5684L10.221 15.3559C10.0826 15.2831 9.91737 15.2831 9.77904 15.3559L5.57046 17.5684C5.22211 17.7516 4.81498 17.4558 4.88151 17.0679L5.68528 12.3816C5.7117 12.2275 5.66063 12.0704 5.54872 11.9613L2.14391 8.64242C1.86209 8.36772 2.0176 7.8891 2.40706 7.83251L7.1124 7.14878C7.26706 7.12631 7.40075 7.02917 7.46991 6.88903L9.57421 2.62528C9.74838 2.27237 10.2516 2.27237 10.4258 2.62528Z" fill="currentColor"/>
      </svg>
    );
  }
);

Star.displayName = 'Star';
