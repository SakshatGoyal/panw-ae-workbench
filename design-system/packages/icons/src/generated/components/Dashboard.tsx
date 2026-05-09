// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/dashboard.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Dashboard = React.forwardRef<SVGSVGElement, IconProps>(
  function Dashboard({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M8.5 9H3.5C3.22386 9 3 8.77614 3 8.5V3.5C3 3.22386 3.22386 3 3.5 3H8.5C8.77614 3 9 3.22386 9 3.5V8.5C9 8.77614 8.77614 9 8.5 9ZM17 8.5V3.5C17 3.22386 16.7761 3 16.5 3H11.5C11.2239 3 11 3.22386 11 3.5V8.5C11 8.77614 11.2239 9 11.5 9H16.5C16.7761 9 17 8.77614 17 8.5ZM9 16.5V11.5C9 11.2239 8.77614 11 8.5 11H3.5C3.22386 11 3 11.2239 3 11.5V16.5C3 16.7761 3.22386 17 3.5 17H8.5C8.77614 17 9 16.7761 9 16.5ZM17 16.5V11.5C17 11.2239 16.7761 11 16.5 11H11.5C11.2239 11 11 11.2239 11 11.5V16.5C11 16.7761 11.2239 17 11.5 17H16.5C16.7761 17 17 16.7761 17 16.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

Dashboard.displayName = 'Dashboard';
