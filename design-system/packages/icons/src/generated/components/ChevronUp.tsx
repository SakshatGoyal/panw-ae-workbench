// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/chevron-up.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ChevronUp = React.forwardRef<SVGSVGElement, IconProps>(
  function ChevronUp({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M15.3535 11.7929L10.3535 6.79302C10.1583 6.59776 9.8417 6.59776 9.64643 6.79302L4.64651 11.7929C4.45125 11.9882 4.45125 12.3048 4.64651 12.5L5.35347 13.207C5.54873 13.4023 5.86531 13.4023 6.06058 13.207L10 9.26759L13.9394 13.207C14.1347 13.4023 14.4513 13.4023 14.6465 13.207L15.3535 12.5C15.5487 12.3048 15.5487 11.9882 15.3535 11.7929Z" fill="currentColor"/>
      </svg>
    );
  }
);

ChevronUp.displayName = 'ChevronUp';
