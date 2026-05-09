// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/siren.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Siren = React.forwardRef<SVGSVGElement, IconProps>(
  function Siren({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M13.7059 6.52441L14.7054 11.2749C14.7701 11.6473 14.5331 11.997 14.2159 11.997H5.78407C5.46687 11.997 5.22987 11.6473 5.29457 11.2749L6.29414 6.52441C6.86726 3.76769 7.95674 4.00629 10 4.00629C12.0433 4.00629 13.1875 3.74907 13.7059 6.52441ZM9.6399 5.3827C9.6399 5.3827 9.03223 5.3543 8.41688 5.79596C7.86408 6.19254 7.42909 6.92925 7.22029 7.99545L6.86726 9.89536C6.73439 10.4791 7.03712 10.6753 7.42909 10.7574C7.4792 10.7678 7.52925 10.7728 7.57826 10.7728C7.91359 10.7728 8.20313 10.5915 8.28706 10.1922L8.87501 7.15415C9.10938 6.29204 9.26563 5.79596 9.6399 5.3827ZM15.5 16H4.50001C4.22387 16 4.00001 15.7315 4.00001 15.4003L4 14.1132C4 13.782 4.22386 13.5135 4.5 13.5135H15.5C15.7761 13.5135 16 13.782 16 14.1132L16 15.4003C16 15.7315 15.7761 16 15.5 16Z" fill="currentColor"/>
      </svg>
    );
  }
);

Siren.displayName = 'Siren';
