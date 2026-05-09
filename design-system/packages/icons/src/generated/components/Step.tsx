// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/step.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Step = React.forwardRef<SVGSVGElement, IconProps>(
  function Step({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M13.085 5.0001H11.9144C11.5911 5.0001 11.329 5.22398 11.329 5.5001V9.18589L5.82465 5.1002C5.47217 4.83848 5 5.11998 5 5.59166V14.4085C5 14.8802 5.47217 15.1615 5.82465 14.9L11.329 10.8141V14.5001C11.329 14.7762 11.5911 15.0001 11.9144 15.0001H13.085C13.4083 15.0001 13.6704 14.7762 13.6704 14.5001V5.5001C13.6704 5.22398 13.4083 5.0001 13.085 5.0001Z" fill="currentColor"/>
      </svg>
    );
  }
);

Step.displayName = 'Step';
