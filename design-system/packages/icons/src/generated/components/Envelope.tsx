// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/envelope.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Envelope = React.forwardRef<SVGSVGElement, IconProps>(
  function Envelope({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M18 4.5V4.82996L10.3069 10.8114C10.1264 10.9518 9.87362 10.9518 9.69309 10.8114L2 4.82996V4.5C2 4.21997 2.21997 4 2.5 4H17.5C17.78 4 18 4.21997 18 4.5ZM9.6931 12.7113L2.8069 7.35734C2.47846 7.10198 2 7.33604 2 7.75207V15.5C2 15.7761 2.22386 16 2.5 16H17.5C17.7761 16 18 15.7761 18 15.5V7.75207C18 7.33604 17.5215 7.10198 17.1931 7.35734L10.3069 12.7113C10.1264 12.8517 9.87363 12.8517 9.6931 12.7113V12.7113Z" fill="currentColor"/>
      </svg>
    );
  }
);

Envelope.displayName = 'Envelope';
