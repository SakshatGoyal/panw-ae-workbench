// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/file-word.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const FileWord = React.forwardRef<SVGSVGElement, IconProps>(
  function FileWord({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 2H3.5C3.22388 2 3 2.22388 3 2.5V17.5C3 17.7761 3.22388 18 3.5 18H11C12.1 18 13 17.1001 13 16V14.49C13 14.2095 13.2295 13.98 13.51 13.98H15C16.1 13.98 17 13.0801 17 11.98V2.5C17 2.22388 16.7761 2 16.5 2ZM12.0654 10.8887H11.0918L10 7.45898H9.98633L8.89356 10.8887H7.95606L6.48633 5.93262H7.67578L8.4668 9.11035H8.48145L9.51661 5.93262H10.5322L11.5605 9.19434H11.5752L12.4082 5.93262H13.5137L12.0654 10.8887Z" fill="currentColor"/>
      </svg>
    );
  }
);

FileWord.displayName = 'FileWord';
