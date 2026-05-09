// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/jobs.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Jobs = React.forwardRef<SVGSVGElement, IconProps>(
  function Jobs({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.5 5H13.658L13.1123 3.3623C13.0527 3.18554 12.9307 3.0371 12.7676 2.94531C11.6904 2.34082 10.5713 2.25 10 2.25C8.67383 2.25 7.69727 2.68555 7.2334 2.94531C7.07031 3.03613 6.94727 3.18554 6.8877 3.3623L6.34205 5H2.5C2.22388 5 2 5.22388 2 5.5V8.30225C2 8.46412 2.07593 8.61866 2.20648 8.71412C4.39062 10.3106 7.08258 11.25 10 11.25C12.9174 11.25 15.6094 10.3106 17.7935 8.71412C17.9241 8.61866 18 8.46412 18 8.30225V5.5C18 5.22388 17.7761 5 17.5 5ZM8.21387 4.12891C8.59961 3.95118 9.21289 3.75 10 3.75C10.3799 3.75 11.083 3.80273 11.7852 4.12695L12.0767 5H7.92328L8.21387 4.12891ZM18 10.9126V16.5C18 16.7761 17.7761 17 17.5 17H2.5C2.22388 17 2 16.7761 2 16.5V10.9126C2 10.6787 2.2511 10.5415 2.45166 10.6616C4.66498 11.9883 7.24933 12.75 10 12.75C12.7507 12.75 15.335 11.9883 17.5483 10.6616C17.7489 10.5415 18 10.6787 18 10.9126Z" fill="currentColor"/>
      </svg>
    );
  }
);

Jobs.displayName = 'Jobs';
