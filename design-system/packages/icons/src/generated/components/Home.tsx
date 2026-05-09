// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/home.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Home = React.forwardRef<SVGSVGElement, IconProps>(
  function Home({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.7906 6.85031L10.2904 2.20749C10.1165 2.08334 9.883 2.08334 9.70917 2.20749L3.20935 6.85031C3.078 6.9443 3 7.09579 3 7.25729V16.5C3 16.7761 3.22388 17 3.5 17H16.5C16.7761 17 17 16.7761 17 16.5V7.25729C17 7.09579 16.922 6.9443 16.7906 6.85031ZM11.6667 14.5832C11.6667 14.8134 11.4801 15 11.25 15H8.75C8.5199 15 8.33331 14.8135 8.33331 14.5832V11.6666C8.33331 10.7461 9.07953 9.99996 10 9.99996C10.9205 9.99996 11.6667 10.7461 11.6667 11.6666V14.5832Z" fill="currentColor"/>
      </svg>
    );
  }
);

Home.displayName = 'Home';
