// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/help.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Help = React.forwardRef<SVGSVGElement, IconProps>(
  function Help({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M9.55949 9.51521C8.73686 9.51782 8.12994 10.2723 8.31575 11.0614L8.57881 13.0991C8.61626 13.3891 8.86692 13.6066 9.16391 13.6066H10.0907C10.3982 13.6066 10.6542 13.3739 10.6786 13.0721L10.8145 11.3973C13.3677 11.1779 14.4299 9.70757 14.4299 7.48647V7.45203C14.4299 5.24956 12.7293 3.875 10.2243 3.875C8.52035 3.875 7.27575 4.49 6.29413 5.43234C6.07026 5.64726 6.07812 6.00619 6.29202 6.23075L6.84334 6.80955C7.0686 7.04603 7.43561 7.04273 7.68348 6.82932C8.42332 6.19231 9.22824 5.84788 10.1704 5.84788C11.4586 5.84788 12.2281 6.53517 12.2281 7.52232V7.55676C12.2281 8.72041 11.6026 9.51387 9.51046 9.51387L9.55949 9.51521Z" fill="currentColor"/>
<path d="M10.8755 15.6875C10.8755 16.4124 10.2879 17 9.56299 17C8.83811 17 8.25049 16.4124 8.25049 15.6875C8.25049 14.9626 8.83811 14.375 9.56299 14.375C10.2879 14.375 10.8755 14.9626 10.8755 15.6875Z" fill="currentColor"/>
      </svg>
    );
  }
);

Help.displayName = 'Help';
