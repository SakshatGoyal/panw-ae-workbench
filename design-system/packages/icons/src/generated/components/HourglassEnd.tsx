// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/hourglass-end.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const HourglassEnd = React.forwardRef<SVGSVGElement, IconProps>(
  function HourglassEnd({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M15.25 5.5415V3.43848C15.25 3.19678 15.0541 3.00098 14.8125 3.00098H10L5.18748 3C4.94586 3 4.75 3.1958 4.75 3.4375V5.51611C4.75 7.427 6.51477 9.00708 7.99854 10.0005C6.51484 10.9941 4.75 12.5732 4.75 14.4839V16.5625C4.75 16.8042 4.94586 17 5.18748 17H14.8125C15.0541 17 15.25 16.8042 15.25 16.5625V14.4839C15.25 12.5947 13.5252 11.0315 12.052 10.0359C13.5249 9.03076 15.25 7.44872 15.25 5.5415ZM13.5 5.54126C13.5 6.89648 11.5226 8.39136 10.0912 9.20239C10.0715 9.20166 10.0522 9.19482 10.0325 9.19458C8.57367 8.40381 6.5 6.89648 6.5 5.5166V4.75L13.5 4.75098V5.54126Z" fill="currentColor"/>
      </svg>
    );
  }
);

HourglassEnd.displayName = 'HourglassEnd';
