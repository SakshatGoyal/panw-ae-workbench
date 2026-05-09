// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/checkbox-filled.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const CheckboxFilled = React.forwardRef<SVGSVGElement, IconProps>(
  function CheckboxFilled({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 3H3.5C3.22388 3 3 3.22388 3 3.5V16.5C3 16.7761 3.22388 17 3.5 17H16.5C16.7761 17 17 16.7761 17 16.5V3.5C17 3.22388 16.7761 3 16.5 3ZM14.5121 7.51245L8.77703 13.3678C8.61504 13.5488 8.33874 13.5393 8.16723 13.3678L5.46685 10.5435C5.30486 10.3814 5.31445 10.1147 5.48589 9.95264L6.09575 9.39063C6.2672 9.22852 6.52446 9.23804 6.68645 9.40967L8.48168 11.2524L13.2918 6.27978C13.4803 6.08642 13.7914 6.08813 13.9777 6.28356L14.5173 6.8496C14.6947 7.03564 14.6924 7.3291 14.5121 7.51245Z" fill="currentColor"/>
      </svg>
    );
  }
);

CheckboxFilled.displayName = 'CheckboxFilled';
