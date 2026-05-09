// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/eye.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Eye = React.forwardRef<SVGSVGElement, IconProps>(
  function Eye({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.8522 9.66405L14.6305 6.11363C12.0838 3.30717 7.91661 3.30717 5.36992 6.11363L2.14824 9.66405C1.97533 9.85466 1.97533 10.1454 2.14824 10.3361L5.36992 13.8864C7.91661 16.6929 12.0838 16.6929 14.6305 13.8864L17.8522 10.3361C18.0251 10.1454 18.0251 9.85467 17.8522 9.66405ZM10.0002 13.0001C8.34337 13.0001 7.00023 11.6569 7.00023 10.0001C7.00023 8.34319 8.34337 7.00005 10.0002 7.00005C10.7397 7.00005 11.4167 7.26757 11.9397 7.71117C12.5885 8.26146 13.0002 9.08263 13.0002 10.0001C13.0002 11.6569 11.6571 13.0001 10.0002 13.0001ZM11.4175 10.0001C11.4175 10.7828 10.7829 11.4173 10.0002 11.4173C9.21751 11.4173 8.58299 10.7828 8.58299 10.0001C8.58299 9.21733 9.21751 8.58281 10.0002 8.58281C10.7829 8.58281 11.4175 9.21733 11.4175 10.0001Z" fill="currentColor"/>
      </svg>
    );
  }
);

Eye.displayName = 'Eye';
