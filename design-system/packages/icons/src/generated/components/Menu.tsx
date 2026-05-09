// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/menu.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Menu = React.forwardRef<SVGSVGElement, IconProps>(
  function Menu({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M15.5 11H4.5C4.22386 11 4 10.7761 4 10.5V9.5C4 9.22386 4.22386 9 4.5 9H15.5C15.7761 9 16 9.22386 16 9.5V10.5C16 10.7761 15.7761 11 15.5 11ZM16 6.5V5.5C16 5.22386 15.7761 5 15.5 5H4.5C4.22386 5 4 5.22386 4 5.5V6.5C4 6.77614 4.22386 7 4.5 7H15.5C15.7761 7 16 6.77614 16 6.5ZM16 14.5V13.5C16 13.2239 15.7761 13 15.5 13H4.5C4.22386 13 4 13.2239 4 13.5V14.5C4 14.7761 4.22386 15 4.5 15H15.5C15.7761 15 16 14.7761 16 14.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

Menu.displayName = 'Menu';
