// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/remove.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Remove = React.forwardRef<SVGSVGElement, IconProps>(
  function Remove({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M10 2.5C5.59869 2.5 2.5 5.5498 2.5 9.75391V10.2461C2.5 14.4513 5.59869 17.5 10 17.5C14.4013 17.5 17.5 14.4502 17.5 10.2461V9.75391C17.5 5.54858 14.4014 2.5 10 2.5ZM13.0052 7.34835C13.2004 7.5436 13.2004 7.86021 13.0052 8.05546L11.0607 10L13.0052 11.9445C13.2004 12.1398 13.2004 12.4564 13.0052 12.6517L12.6517 13.0052C12.4564 13.2004 12.1398 13.2004 11.9445 13.0052L10 11.0607L8.05546 13.0052C7.86021 13.2004 7.5436 13.2004 7.34835 13.0052L6.9948 12.6517C6.79955 12.4564 6.79955 12.1398 6.9948 11.9445L8.93934 10L6.9948 8.05546C6.79955 7.86021 6.79955 7.5436 6.9948 7.34835L7.34835 6.9948C7.5436 6.79955 7.86021 6.79955 8.05546 6.9948L10 8.93934L11.9445 6.9948C12.1398 6.79955 12.4564 6.79955 12.6517 6.9948L13.0052 7.34835Z" fill="currentColor"/>
      </svg>
    );
  }
);

Remove.displayName = 'Remove';
