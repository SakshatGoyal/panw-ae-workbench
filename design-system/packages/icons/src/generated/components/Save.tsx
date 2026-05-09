// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/save.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Save = React.forwardRef<SVGSVGElement, IconProps>(
  function Save({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.8536 6.85351L13.1464 3.14648C13.0527 3.05273 12.9255 3 12.7929 3H3.5C3.22388 3 3 3.22388 3 3.5V16.5C3 16.7761 3.22388 17 3.5 17H16.5C16.7761 17 17 16.7761 17 16.5V7.20702C17 7.07445 16.9473 6.94725 16.8536 6.8535V6.85351ZM11.4999 11.5493C11.4999 12.3901 10.8802 13 9.99994 13C9.11963 13 8.49988 12.3901 8.49988 11.5493V11.4507C8.49988 10.6099 9.11963 10 9.99994 10C10.8802 10 11.4999 10.6099 11.4999 11.4507V11.5493ZM12 6.24999C12 6.52611 11.7761 6.74999 11.5 6.74999H5.5C5.22388 6.74999 5 6.52611 5 6.24999V5.74999C5 5.47387 5.22388 5.24999 5.5 5.24999H11.5C11.7761 5.24999 12 5.47387 12 5.74999V6.24999Z" fill="currentColor"/>
      </svg>
    );
  }
);

Save.displayName = 'Save';
