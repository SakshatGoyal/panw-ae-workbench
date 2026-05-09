// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/chart-line.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const ChartLine = React.forwardRef<SVGSVGElement, IconProps>(
  function ChartLine({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M2 16.5V3.5C2 3.22386 2.22386 3 2.5 3H17.5C17.7761 3 18 3.22386 18 3.5V5.78841L13.4166 10.3383C13.3394 10.4151 13.2376 10.4572 13.1298 10.4572C13.022 10.4572 12.9202 10.4151 12.843 10.3383L9.55501 7.04367C9.4403 6.92875 9.28801 6.86534 9.12584 6.86534C8.96367 6.86534 8.81138 6.92875 8.69667 7.04367L4.68677 11.0606C4.44944 11.2979 4.44944 11.6842 4.68677 11.9215L5.04474 12.2802C5.15945 12.3951 5.31174 12.4585 5.47391 12.4585C5.63608 12.4585 5.78837 12.3951 5.90308 12.2802L8.83905 9.33918C8.91618 9.2624 9.01804 9.22029 9.12582 9.22029C9.2336 9.22029 9.33546 9.2624 9.41259 9.33918L12.7006 12.6339C12.8153 12.7488 12.9676 12.8122 13.1298 12.8122C13.2919 12.8122 13.4442 12.7488 13.5589 12.6339L18 8.18498V16.5C18 16.7761 17.7761 17 17.5 17H2.5C2.22386 17 2 16.7761 2 16.5Z" fill="currentColor"/>
      </svg>
    );
  }
);

ChartLine.displayName = 'ChartLine';
