// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/arrow-right.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ArrowRight = React.forwardRef<SVGSVGElement, IconProps>(
  function ArrowRight({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M11 5.20716V9.00004H3.5C3.22386 9.00004 3 9.2239 3 9.50004V10.5C3 10.7762 3.22386 11 3.5 11H11V14.7929C11 15.2384 11.5385 15.4614 11.8535 15.1465L16.6464 10.3536C16.8417 10.1583 16.8417 9.84174 16.6464 9.64647L11.8535 4.85362C11.5386 4.53865 11 4.76173 11 5.20716Z" fill="currentColor"/>
      </svg>
    );
  }
);

ArrowRight.displayName = 'ArrowRight';
