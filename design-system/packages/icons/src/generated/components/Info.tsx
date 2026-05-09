// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/info.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Info = React.forwardRef<SVGSVGElement, IconProps>(
  function Info({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M10 2.5C5.59869 2.5 2.5 5.5498 2.5 9.75391V10.2461C2.5 14.4513 5.59869 17.5 10 17.5C14.4013 17.5 17.5 14.4502 17.5 10.2461V9.75391C17.5 5.54858 14.4014 2.5 10 2.5ZM9 5.96716C9 5.40661 9.41315 5 10 5C10.5869 5 11 5.40649 11 5.96716V6.03271C11 6.59326 10.5869 7 10 7C9.41315 7 9 6.59351 9 6.03271V5.96716ZM12.0022 13.2545C11.9998 13.5288 11.7766 13.75 11.5023 13.75H8.49774C8.22156 13.75 7.99774 13.5261 7.99774 13.25V12.75C7.99774 12.4739 8.22156 12.25 8.49774 12.25H9.24774V9.74999H8.49774C8.22156 9.74999 7.99774 9.52611 7.99774 9.24999V8.74999C7.99774 8.47387 8.22156 8.24999 8.49774 8.24999H10.2477C10.5239 8.24999 10.7477 8.47387 10.7477 8.74999V12.227L11.516 12.241C11.7903 12.246 12.0093 12.4711 12.0069 12.7455L12.0022 13.2545Z" fill="currentColor"/>
      </svg>
    );
  }
);

Info.displayName = 'Info';
