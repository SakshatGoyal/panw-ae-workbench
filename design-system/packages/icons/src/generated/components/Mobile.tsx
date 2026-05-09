// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/mobile.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Mobile = React.forwardRef<SVGSVGElement, IconProps>(
  function Mobile({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M13.8336 2H6.16699C5.33856 2 4.66699 2.67163 4.66699 3.5V16.5C4.66699 17.3284 5.33856 18 6.16699 18H13.8336C14.6621 18 15.3336 17.3284 15.3336 16.5V3.5C15.3336 2.67163 14.6621 2 13.8336 2H13.8336ZM12.0003 15.25C12.0003 15.5261 11.7764 15.75 11.5003 15.75H8.5003C8.22418 15.75 8.0003 15.5261 8.0003 15.25V14.75C8.0003 14.4739 8.22418 14.25 8.5003 14.25H11.5003C11.7764 14.25 12.0003 14.4739 12.0003 14.75V15.25Z" fill="currentColor"/>
      </svg>
    );
  }
);

Mobile.displayName = 'Mobile';
