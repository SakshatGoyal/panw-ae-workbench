// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/file-video.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const FileVideo = React.forwardRef<SVGSVGElement, IconProps>(
  function FileVideo({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 2H3.5C3.22388 2 3 2.22388 3 2.5V17.5C3 17.7761 3.22388 18 3.5 18H11C12.1 18 13 17.1001 13 16V14.49C13 14.2095 13.2295 13.98 13.51 13.98H15C16.1 13.98 17 13.0801 17 11.98V2.5C17 2.22388 16.7761 2 16.5 2ZM12.3216 8.92407L8.76501 11.147C8.43194 11.355 8 11.1157 8 10.7229V6.2771C8 5.88428 8.43195 5.64502 8.76501 5.85303L12.3216 8.07593C12.6349 8.27173 12.6349 8.72803 12.3216 8.92407Z" fill="currentColor"/>
      </svg>
    );
  }
);

FileVideo.displayName = 'FileVideo';
