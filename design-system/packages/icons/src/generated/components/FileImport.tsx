// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/file-import.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const FileImport = React.forwardRef<SVGSVGElement, IconProps>(
  function FileImport({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M8.06024 12.597C8.06024 12.9809 8.46576 13.1773 8.70294 12.9006L10.8911 10.3121C11.0363 10.1403 11.0363 9.85908 10.8911 9.68726L8.70294 7.09876C8.46576 6.82209 8.06024 7.01844 8.06024 7.41114V9.10712H5V3.5C5 3.22382 5.22388 3 5.5 3H16.5C16.7761 3 17 3.22382 17 3.5V11.98C17 13.0845 16.1046 13.98 15 13.98H13.51C13.2295 13.98 13 14.2095 13 14.49V16C13 17.1046 12.1046 18 11 18H5.5C5.22388 18 5 17.7761 5 17.5V10.8923H8.06024V12.597ZM2 9.60999V10.39C2 10.6701 2.21997 10.89 2.5 10.89H5V9.10999H2.5C2.21997 9.10999 2 9.33002 2 9.60999Z" fill="currentColor"/>
      </svg>
    );
  }
);

FileImport.displayName = 'FileImport';
