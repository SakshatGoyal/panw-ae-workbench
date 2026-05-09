// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/tag.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Tag = React.forwardRef<SVGSVGElement, IconProps>(
  function Tag({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.2143 4.39206C16.1747 4.11508 15.9572 3.89755 15.6803 3.858L10.2291 3.07931C10.033 3.05136 9.83516 3.11727 9.69508 3.25729L2.46266 10.4897C2.21687 10.7354 2.21687 11.1339 2.46266 11.3797L8.69258 17.6097C8.93837 17.8554 9.33681 17.8554 9.58259 17.6097L16.815 10.3773C16.9551 10.2371 17.021 10.0394 16.993 9.84322L16.2143 4.39206ZM13.4658 7.5759C12.889 7.5759 12.4214 7.10825 12.4214 6.53134C12.4214 5.95443 12.889 5.48691 13.4658 5.48691C14.0427 5.48691 14.5104 5.95444 14.5104 6.53134C14.5104 7.10824 14.0428 7.5759 13.4658 7.5759Z" fill="currentColor"/>
      </svg>
    );
  }
);

Tag.displayName = 'Tag';
