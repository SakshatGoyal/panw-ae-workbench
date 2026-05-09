// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/clipboard-check.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ClipboardCheck = React.forwardRef<SVGSVGElement, IconProps>(
  function ClipboardCheck({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17 4.50003V17.5C17 17.7761 16.7761 18 16.5 18H3.5C3.22388 18 3 17.7761 3 17.5V4.50003C3 4.22385 3.22388 4.00003 3.5 4.00003H5.63379L6.20496 5.2236C6.28406 5.39303 6.44568 5.50003 6.6225 5.50003H13.3775C13.5543 5.50003 13.7159 5.39304 13.795 5.2236L14.3662 4.00003H16.5C16.7761 4.00003 17 4.22385 17 4.50003ZM9.20221 14.707L14.1115 9.79818C14.3068 9.60292 14.3068 9.28633 14.1115 9.09106L13.7581 8.73762C13.5628 8.54236 13.2462 8.54236 13.051 8.73761L8.84862 12.9395L7.22779 11.3182C7.03253 11.1229 6.71592 11.1229 6.52065 11.3182L6.16722 11.6716C5.97197 11.8669 5.97196 12.1835 6.1672 12.3787L8.49508 14.707C8.69033 14.9023 9.00694 14.9023 9.20221 14.707ZM7.02527 2.43416L7.53226 3.7236C7.59886 3.89299 7.73501 3.99999 7.88394 3.99999H12.1162C12.2651 3.99999 12.4012 3.89299 12.4678 3.7236L12.9748 2.43416C13.0532 2.23469 12.9392 2 12.7638 2H7.23628C7.0609 2 6.94684 2.23469 7.02527 2.43416Z" fill="currentColor"/>
      </svg>
    );
  }
);

ClipboardCheck.displayName = 'ClipboardCheck';
