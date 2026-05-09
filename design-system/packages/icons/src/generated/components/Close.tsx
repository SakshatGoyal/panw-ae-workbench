// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/close.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Close = React.forwardRef<SVGSVGElement, IconProps>(
  function Close({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M14.5957 4.69674L15.3029 5.40385C15.4981 5.5991 15.4981 5.91571 15.3029 6.11096L11.4138 10L15.3029 13.8891C15.4981 14.0844 15.4981 14.4009 15.3029 14.5962L14.5957 15.3033C14.4005 15.4986 14.0839 15.4986 13.8886 15.3033L9.99956 11.4143L6.11047 15.3033C5.91522 15.4986 5.59861 15.4986 5.40336 15.3033L4.69626 14.5962C4.50097 14.4009 4.50101 14.0844 4.69626 13.8891L8.58534 10L4.69626 6.11096C4.50101 5.91571 4.50101 5.5991 4.69626 5.40385L5.40336 4.69674C5.59865 4.50146 5.91522 4.5015 6.11047 4.69674L9.99956 8.58583L13.8886 4.69674C14.0839 4.5015 14.4005 4.50146 14.5957 4.69674Z" fill="currentColor"/>
      </svg>
    );
  }
);

Close.displayName = 'Close';
