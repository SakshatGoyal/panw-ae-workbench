// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/waveform.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Waveform = React.forwardRef<SVGSVGElement, IconProps>(
  function Waveform({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M13 15.9004C12.5947 15.9004 12.2383 15.6289 12.1318 15.2363L10 7.4209L7.86816 15.2363C7.76171 15.6289 7.40527 15.9004 7 15.9004H6.99023C6.58105 15.8955 6.22656 15.6152 6.12695 15.2187L4.73828 9.66211L4.39615 10.3855C4.24744 10.6999 3.93081 10.9004 3.58301 10.9004H2.5C2.22386 10.9004 2 10.6765 2 10.4004V9.59961C2 9.32347 2.22386 9.09961 2.5 9.09961H3.0127L4.18653 6.61523C4.34864 6.27246 4.7129 6.06835 5.0879 6.10449C5.46681 6.1416 5.78126 6.41308 5.87306 6.78125L7.0381 11.4404L9.13184 3.76367C9.23829 3.37207 9.59375 3.09961 10 3.09961C10.4062 3.09961 10.7617 3.37207 10.8682 3.76367L12.9619 11.4404L14.127 6.78125C14.2188 6.41309 14.5332 6.1416 14.9121 6.10449C15.2871 6.06836 15.6514 6.27246 15.8135 6.61523L16.9873 9.09961H17.5C17.7761 9.09961 18 9.32347 18 9.59961V10.4004C18 10.6765 17.7761 10.9004 17.5 10.9004H16.4178C16.0695 10.9004 15.7524 10.6996 15.6035 10.3848L15.2617 9.66211L13.873 15.2187C13.7734 15.6152 13.419 15.8955 13.0098 15.9004H13Z" fill="currentColor"/>
      </svg>
    );
  }
);

Waveform.displayName = 'Waveform';
