// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/play-circle.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const PlayCircle = React.forwardRef<SVGSVGElement, IconProps>(
  function PlayCircle({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M10 2.5C5.59869 2.5 2.5 5.5498 2.5 9.75391V10.2461C2.5 14.4512 5.59869 17.5 10 17.5C14.4013 17.5 17.5 14.4502 17.5 10.2461V9.75391C17.5 5.54858 14.4014 2.5 10 2.5ZM13.8322 10.2993L8.70196 13.4414C8.40191 13.6252 7.99999 13.4275 7.99999 13.0962V6.90381C7.99999 6.57227 8.40191 6.37476 8.70196 6.5586L13.8322 9.70045C14.0559 9.83741 14.0559 10.1626 13.8322 10.2993Z" fill="currentColor"/>
      </svg>
    );
  }
);

PlayCircle.displayName = 'PlayCircle';
