// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/file-image.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const FileImage = React.forwardRef<SVGSVGElement, IconProps>(
  function FileImage({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 2H3.5C3.21997 2 3 2.21997 3 2.5V17.5C3 17.78 3.21997 18 3.5 18H11C12.1 18 13 17.1 13 16V14.49C13 14.21 13.23 13.98 13.51 13.98H15C16.1 13.98 17 13.08 17 11.98V2.5C17 2.21997 16.78 2 16.5 2ZM12.5 4.15649C13.242 4.15649 13.8435 4.75805 13.8435 5.5C13.8435 6.24195 13.242 6.84351 12.5 6.84351C11.758 6.84351 11.1565 6.24195 11.1565 5.5C11.1565 4.75805 11.758 4.15649 12.5 4.15649ZM11.5041 12H5L7.42786 8.31091C7.6576 7.96191 8.03351 7.96191 8.26319 8.31091L9.92664 10.8384C10.3471 11.4773 11.0399 11.4805 11.4663 10.8456L12.3981 9.45813C12.57 9.20203 12.8874 9.19116 13.0708 9.43506L15 12H11.5041Z" fill="currentColor"/>
      </svg>
    );
  }
);

FileImage.displayName = 'FileImage';
