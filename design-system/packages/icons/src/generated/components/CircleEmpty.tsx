// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/circle-empty.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const CircleEmpty = React.forwardRef<SVGSVGElement, IconProps>(
  function CircleEmpty({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M10 2.5C5.59866 2.5 2.5 5.54865 2.5 9.75384V10.2461C2.5 14.4502 5.59866 17.5 10 17.5C14.4013 17.5 17.5 14.4513 17.5 10.2461V9.75384C17.5 5.54974 14.4013 2.5 10 2.5ZM15.625 10.2463C15.625 13.4634 13.3646 15.625 10 15.625C6.63544 15.625 4.375 13.4634 4.375 10.2463V9.75373C4.375 6.53657 6.63544 4.37501 10 4.37501C13.3646 4.37501 15.625 6.53657 15.625 9.75373V10.2463Z" fill="currentColor"/>
      </svg>
    );
  }
);

CircleEmpty.displayName = 'CircleEmpty';
