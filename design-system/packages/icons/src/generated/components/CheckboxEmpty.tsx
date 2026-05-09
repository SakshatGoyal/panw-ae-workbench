// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/checkbox-empty.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const CheckboxEmpty = React.forwardRef<SVGSVGElement, IconProps>(
  function CheckboxEmpty({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path fillRule="evenodd" clipRule="evenodd" d="M5 5V15H15V5H5ZM3.5 3H16.5C16.7761 3 17 3.22386 17 3.5V16.5C17 16.7761 16.7761 17 16.5 17H3.5C3.22386 17 3 16.7761 3 16.5V3.5C3 3.22386 3.22386 3 3.5 3Z" fill="currentColor"/>
      </svg>
    );
  }
);

CheckboxEmpty.displayName = 'CheckboxEmpty';
