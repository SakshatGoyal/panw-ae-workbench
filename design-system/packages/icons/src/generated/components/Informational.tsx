// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/informational.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Informational = React.forwardRef<SVGSVGElement, IconProps>(
  function Informational({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M8.23676 16.6136C8.31794 16.7932 8.19977 17 8.01343 17H5.91663C5.72272 17 5.53931 16.8806 5.45758 16.6924C4.51062 14.5073 4.6748 12.2381 4.6748 12.2381H2.5C2.22388 12.2381 2 11.9983 2 11.7024V6.82131C2 6.52541 2.22388 6.28567 2.5 6.28567H7.23938C7.57568 6.28567 7.80621 6.61209 7.71179 6.93484C6.42944 11.3189 7.39362 14.7471 8.23676 16.6136ZM16 7.00002V3.14968C16 2.72146 15.494 2.49319 15.173 2.77663C12.4071 5.21804 9.59002 6.25344 9.59002 6.25344L9.41998 6.78933C8.84002 8.65359 8.72998 10.3035 8.84997 11.6643C11.6785 11.8931 13.9729 13.8242 15.1472 15.0308C15.4595 15.3516 16 15.1258 16 14.678V11C17.1045 11 18 10.1045 18 9.00003C18 7.89554 17.1046 7.00002 16 7.00002Z" fill="currentColor"/>
      </svg>
    );
  }
);

Informational.displayName = 'Informational';
