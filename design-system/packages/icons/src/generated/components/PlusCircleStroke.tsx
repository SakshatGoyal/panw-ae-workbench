// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/plus-circle-stroke.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const PlusCircleStroke = React.forwardRef<SVGSVGElement, IconProps>(
  function PlusCircleStroke({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M14 9.5V10.5C14 10.7761 13.7761 11 13.5 11H11V13.5C11 13.7761 10.7762 14 10.5 14H9.5C9.22388 14 9 13.7761 9 13.5V11H6.5C6.22388 11 6 10.7761 6 10.5V9.5C6 9.22382 6.22388 9 6.5 9H9V6.5C9 6.22388 9.22388 6 9.5 6H10.5C10.7762 6 11 6.22388 11 6.5V9H13.5C13.7761 9 14 9.22382 14 9.5ZM17.5 9.75385V10.2461C17.5 14.4513 14.4014 17.5 10 17.5C5.59863 17.5 2.5 14.4502 2.5 10.2461V9.75384C2.5 5.54865 5.59863 2.5 10 2.5C14.4014 2.5 17.5 5.54974 17.5 9.75385ZM15.625 9.75373C15.625 6.53657 13.3646 4.37501 10 4.37501C6.63544 4.37501 4.375 6.53656 4.375 9.75372V10.2463C4.375 13.4634 6.63544 15.625 10 15.625C13.3646 15.625 15.625 13.4634 15.625 10.2463V9.75373Z" fill="currentColor"/>
      </svg>
    );
  }
);

PlusCircleStroke.displayName = 'PlusCircleStroke';
