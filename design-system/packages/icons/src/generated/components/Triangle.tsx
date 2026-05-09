// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/triangle.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Triangle = React.forwardRef<SVGSVGElement, IconProps>(
  function Triangle({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M2.28756 15.0511L9.58028 2.33749C9.76632 2.01315 10.2342 2.01315 10.4202 2.33749L17.7129 15.0511C17.8981 15.3738 17.6651 15.7761 17.293 15.7761H2.70752C2.33542 15.7761 2.10241 15.3738 2.28756 15.0511Z" fill="currentColor"/>
      </svg>
    );
  }
);

Triangle.displayName = 'Triangle';
