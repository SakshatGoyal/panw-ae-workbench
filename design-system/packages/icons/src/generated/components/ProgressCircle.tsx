// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/progress-circle.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ProgressCircle = React.forwardRef<SVGSVGElement, IconProps>(
  function ProgressCircle({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path opacity="0.2" d="M10 18C5.58887 18 2 14.4111 2 10C2 5.58887 5.58887 2 10 2C14.4111 2 18 5.58887 18 10C18 14.4111 14.4111 18 10 18ZM10 5C7.24316 5 5 7.24316 5 10C5 12.7568 7.24316 15 10 15C12.7568 15 15 12.7568 15 10C15 7.24316 12.7568 5 10 5Z" fill="currentColor"/>
<path d="M15.2907 15.285L13.8718 13.8681C13.684 13.6806 13.6867 13.3879 13.856 13.1836C14.5969 12.2894 15 11.1757 15 10.0001C15 7.40353 13.01 5.26262 10.4751 5.02253C10.21 4.99742 10 4.79114 10 4.52483V2.52317C10 2.2382 10.2398 1.99864 10.5242 2.01712C14.692 2.288 18 5.76511 18 10.0001C18 11.9598 17.2997 13.8129 16.0177 15.2723C15.8299 15.4862 15.4921 15.4861 15.2907 15.285Z" fill="currentColor"/>
      </svg>
    );
  }
);

ProgressCircle.displayName = 'ProgressCircle';
