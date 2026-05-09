// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/image.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Image = React.forwardRef<SVGSVGElement, IconProps>(
  function Image({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 3H3.5C3.22388 3 3 3.22382 3 3.5V16.5C3 16.7761 3.22388 17 3.5 17H16.5C16.7761 17 17 16.7761 17 16.5V3.5C17 3.22382 16.7761 3 16.5 3ZM12.5 6.15643C13.242 6.15643 13.8435 6.75799 13.8435 7.5C13.8435 8.24201 13.242 8.84351 12.5 8.84351C11.758 8.84351 11.1565 8.24201 11.1565 7.5C11.1565 6.75799 11.758 6.15643 12.5 6.15643ZM11.5041 14H5L7.42786 10.3109C7.6576 9.96185 8.03351 9.96185 8.26319 10.3109L9.92664 12.8384C10.3471 13.4773 11.0399 13.4805 11.4663 12.8456L12.3981 11.4581C12.57 11.202 12.8874 11.1912 13.0708 11.4351L15 14H11.5041Z" fill="currentColor"/>
      </svg>
    );
  }
);

Image.displayName = 'Image';
