// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/wrench.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Wrench = React.forwardRef<SVGSVGElement, IconProps>(
  function Wrench({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.6606 4.57778L14.6936 7.54471C14.4563 7.78202 14.0718 7.78202 13.8344 7.54471L12.4455 6.15572C12.2081 5.91856 12.2081 5.53383 12.4454 5.29652L15.4124 2.32959C14.6761 2.01605 13.8344 1.90214 12.9536 2.06262C11.3811 2.34947 10.0789 3.57427 9.65139 5.11454C9.35565 6.1796 9.50196 7.17199 9.89856 8.02615C10 8.00001 4.50188 11.9534 3.69103 12.8626C2.79772 13.8643 2.74202 15.3503 3.69103 16.2992C4.63996 17.2483 6.12595 17.1925 7.12754 16.2992C8.5941 14.9915 10.2861 12.271 11.9642 10.0916C12.8202 10.4894 13.8158 10.635 14.883 10.3369C16.4216 9.90681 17.6437 8.6037 17.9284 7.03183C18.0877 6.15231 17.9737 5.31254 17.6606 4.57778H17.6606Z" fill="currentColor"/>
      </svg>
    );
  }
);

Wrench.displayName = 'Wrench';
