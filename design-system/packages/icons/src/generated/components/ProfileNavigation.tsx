// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/profile-navigation.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ProfileNavigation = React.forwardRef<SVGSVGElement, IconProps>(
  function ProfileNavigation({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M8.28247 7.41541C8.28247 6.26825 8.98822 5.46668 10 5.46668C11.0118 5.46668 11.7175 6.26825 11.7175 7.41541V7.58454C11.7175 8.73176 11.0118 9.53327 10 9.53327C8.98822 9.53327 8.28247 8.73176 8.28247 7.58454V7.41541ZM14.2868 13.6785C13.3135 14.8328 11.8174 15.53 10 15.53C8.18256 15.53 6.68652 14.8328 5.7132 13.6785C5.60321 13.5481 5.57319 13.3657 5.62409 13.2028L5.93738 12.2003C5.97742 12.0722 6.06165 11.9662 6.18152 11.906C6.90643 11.5417 8.24787 11 10 11C11.7521 11 13.0936 11.5417 13.8185 11.906C13.9383 11.9662 14.0226 12.0722 14.0626 12.2003L14.3759 13.2028C14.4268 13.3657 14.3968 13.5481 14.2868 13.6785ZM2.5 9.75384V10.2461C2.5 14.4513 5.59869 17.5 10 17.5C14.4014 17.5 17.5 14.4502 17.5 10.2461V9.75384C17.5 5.54865 14.4014 2.5 10 2.5C5.59869 2.5 2.5 5.54974 2.5 9.75384Z" fill="currentColor"/>
      </svg>
    );
  }
);

ProfileNavigation.displayName = 'ProfileNavigation';
