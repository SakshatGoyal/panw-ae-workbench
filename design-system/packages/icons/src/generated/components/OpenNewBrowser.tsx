// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/open-new-browser.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const OpenNewBrowser = React.forwardRef<SVGSVGElement, IconProps>(
  function OpenNewBrowser({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 3H3.5C3.22388 3 3 3.22388 3 3.5V16.5C3 16.7761 3.22388 17 3.5 17H16.5C16.7761 17 17 16.7761 17 16.5V3.5C17 3.22388 16.7761 3 16.5 3ZM15 9.55151C15 9.83203 14.661 9.97241 14.4627 9.77417L12.8594 8.17078L10.1441 10.8927C10.0015 11.0356 9.76996 11.0358 9.6272 10.8931L9.107 10.3728C8.96424 10.23 8.96436 9.99854 9.10731 9.85596L11.8292 7.14063L10.2258 5.53724C10.0276 5.339 10.168 5.00001 10.4484 5.00001H14.6859C14.8594 5.00001 15 5.14063 15 5.31422L15 9.55151Z" fill="currentColor"/>
      </svg>
    );
  }
);

OpenNewBrowser.displayName = 'OpenNewBrowser';
