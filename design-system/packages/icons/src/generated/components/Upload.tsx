// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/upload.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Upload = React.forwardRef<SVGSVGElement, IconProps>(
  function Upload({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M10.9999 16.9939L10.9999 10.9007H12.8979C13.3433 10.9007 13.5664 10.3622 13.2515 10.0472L10.3535 7.1492C10.1582 6.95394 9.84167 6.95394 9.64641 7.1492L6.74849 10.0471C6.43351 10.3621 6.65659 10.9007 7.10204 10.9007H8.99999V16.9938C8.99999 17.3001 8.72348 17.5467 8.42205 17.4924C4.87742 16.8534 2.5 14.0634 2.5 10.3831V9.89089C2.5 5.68569 5.59869 2.63698 10 2.63698C14.4013 2.63698 17.5 5.68678 17.5 9.89089V10.3831C17.5 14.0644 15.1225 16.8537 11.5778 17.4925C11.2764 17.5468 10.9999 17.3002 10.9999 16.9939Z" fill="currentColor"/>
      </svg>
    );
  }
);

Upload.displayName = 'Upload';
