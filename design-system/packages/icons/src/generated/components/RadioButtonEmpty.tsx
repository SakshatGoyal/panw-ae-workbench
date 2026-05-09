// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/radio-button-empty.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const RadioButtonEmpty = React.forwardRef<SVGSVGElement, IconProps>(
  function RadioButtonEmpty({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M10 2.5C5.59869 2.5 2.5 5.5498 2.5 9.75391V10.2461C2.5 14.4512 5.59869 17.5 10 17.5C14.4013 17.5 17.5 14.4502 17.5 10.2461V9.75391C17.5 5.54858 14.4014 2.5 10 2.5ZM15.5 10.2461C15.5 13.3887 13.29 15.5 10 15.5C6.70996 15.5 4.5 13.3887 4.5 10.2461V9.7539C4.5 6.61132 6.70996 4.49999 10 4.49999C13.29 4.49999 15.5 6.61132 15.5 9.7539V10.2461Z" fill="currentColor"/>
      </svg>
    );
  }
);

RadioButtonEmpty.displayName = 'RadioButtonEmpty';
