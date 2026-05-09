// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/user.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const User = React.forwardRef<SVGSVGElement, IconProps>(
  function User({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M7.29604 6.62475V6.37524C7.29604 4.68267 8.40712 3.5 10 3.5C11.5929 3.5 12.704 4.68268 12.704 6.37524V6.62475C12.704 8.31738 11.5929 9.49999 10 9.49999C8.40712 9.49999 7.29604 8.31737 7.29604 6.62475ZM16.3081 13.2885C16.2666 13.1153 16.162 12.9649 15.9965 12.8546C15.2579 12.3622 12.9481 11 10 11C7.0519 11 4.74215 12.3622 4.0035 12.8546C3.83803 12.9649 3.73348 13.1153 3.69198 13.2885L3.01772 16.1031C2.90657 16.5671 3.33236 17 3.89998 17H16.1001C16.6677 17 17.0935 16.5671 16.9823 16.1031L16.3081 13.2885Z" fill="currentColor"/>
      </svg>
    );
  }
);

User.displayName = 'User';
