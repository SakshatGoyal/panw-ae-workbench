// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/heart-rate.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const HeartRate = React.forwardRef<SVGSVGElement, IconProps>(
  function HeartRate({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M12.0405 15.7014C11.8483 16.1186 11.2425 16.0776 11.1082 15.6384L8.98389 8.69041L8.44488 9.84557C8.11627 10.5498 7.40947 11 6.63233 11H2.5C2.22386 11 2 10.7761 2 10.5V9.49998C2 9.22384 2.22386 8.99998 2.5 8.99998H6.63232L8.82386 4.30551C9.01764 3.89043 9.62116 3.93277 9.75508 4.37084L11.8706 11.291L12.3901 10.1632C12.7167 9.45418 13.4259 8.99998 14.2065 8.99998H17.5C17.7761 8.99998 18 9.22384 18 9.49998V10.5C18 10.7761 17.7761 11 17.5 11H14.2065L12.0405 15.7014Z" fill="currentColor"/>
      </svg>
    );
  }
);

HeartRate.displayName = 'HeartRate';
