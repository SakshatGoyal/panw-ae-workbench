// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/phone.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Phone = React.forwardRef<SVGSVGElement, IconProps>(
  function Phone({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.2914 16.5502L17.9022 13.4903C17.9562 13.2196 17.7806 12.9563 17.5099 12.9021L13.2624 12.0526C13.0985 12.0198 12.929 12.0712 12.8108 12.1894L11.3536 13.6466C11.1583 13.8419 10.8417 13.8419 10.6465 13.6466L6.35355 9.35371C6.15829 9.15845 6.15829 8.84187 6.35355 8.6466L7.81078 7.18937C7.92899 7.07116 7.9803 6.90169 7.94752 6.73776L7.09971 2.49873C7.04491 2.22474 6.7762 2.04883 6.50316 2.10821L3.41787 2.77919C2.60951 2.955 2.00104 3.6585 2 4.48576V4.50016C2 11.9602 8.03999 18.0002 15.5 18.0002L15.5785 17.9999C16.4173 17.9949 17.1273 17.3728 17.2914 16.5502Z" fill="currentColor"/>
      </svg>
    );
  }
);

Phone.displayName = 'Phone';
