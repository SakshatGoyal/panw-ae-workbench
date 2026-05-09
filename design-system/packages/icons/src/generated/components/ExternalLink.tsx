// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/external-link.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ExternalLink = React.forwardRef<SVGSVGElement, IconProps>(
  function ExternalLink({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M11.7699 2H17.5699C17.8099 2 17.9999 2.19 17.9999 2.42999V8.22997C17.9999 8.61999 17.5399 8.80999 17.2699 8.53997L15.0699 6.33996L13.9999 7.41998L12.58 6.00005L8.66357 9.91638C8.46826 10.1116 8.46826 10.4282 8.66351 10.6235L9.3764 11.3364C9.57171 11.5317 9.88831 11.5317 10.0836 11.3364L13.9999 7.41998L14 16.61C14 16.8244 13.8245 17 13.61 17H3.39001C3.17554 17 3 16.8245 3 16.61V6.39001C3 6.17548 3.17553 6 3.39001 6L12.58 6.00005L13.6599 4.92999L11.4599 2.72998C11.1899 2.45996 11.3799 2 11.7699 2Z" fill="currentColor"/>
      </svg>
    );
  }
);

ExternalLink.displayName = 'ExternalLink';
