// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/run.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Run = React.forwardRef<SVGSVGElement, IconProps>(
  function Run({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M17.5 16H2.5C2.22386 16 2 15.7761 2 15.5V4.5C2 4.22386 2.22386 4 2.5 4H17.5C17.7761 4 18 4.22386 18 4.5V15.5C18 15.7761 17.7761 16 17.5 16ZM4.14645 6.32329L3.79301 6.67672C3.59775 6.87198 3.59775 7.18856 3.79301 7.38383L6.40918 10L3.79301 12.6162C3.59775 12.8114 3.59775 13.128 3.79301 13.3233L4.14645 13.6767C4.34171 13.872 4.65829 13.872 4.85356 13.6767L8.17672 10.3536C8.37198 10.1583 8.37198 9.84171 8.17672 9.64644L4.85355 6.32327C4.65829 6.12801 4.34172 6.12803 4.14645 6.32329ZM15 12.25V11.75C15 11.4739 14.7761 11.25 14.5 11.25H10.5C10.2239 11.25 10 11.4739 10 11.75V12.25C10 12.5261 10.2239 12.75 10.5 12.75H14.5C14.7761 12.75 15 12.5261 15 12.25Z" fill="currentColor"/>
      </svg>
    );
  }
);

Run.displayName = 'Run';
