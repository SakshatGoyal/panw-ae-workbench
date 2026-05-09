// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/octagon.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Octagon = React.forwardRef<SVGSVGElement, IconProps>(
  function Octagon({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M12.8847 2.5H7.1153C6.97322 2.5 6.83696 2.55644 6.73649 2.65691L2.65691 6.73649C2.55644 6.83696 2.5 6.97322 2.5 7.1153V12.8847C2.5 13.0268 2.55644 13.163 2.65691 13.2635L6.73649 17.3431C6.83696 17.4436 6.97322 17.5 7.1153 17.5H12.8847C13.0268 17.5 13.163 17.4436 13.2635 17.3431L17.3431 13.2635C17.4436 13.163 17.5 13.0268 17.5 12.8847V7.1153C17.5 6.97322 17.4436 6.83696 17.3431 6.73649L13.2635 2.65691C13.163 2.55644 13.0268 2.5 12.8847 2.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

Octagon.displayName = 'Octagon';
