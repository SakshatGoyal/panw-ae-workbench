// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/file-chart-line.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const FileChartLine = React.forwardRef<SVGSVGElement, IconProps>(
  function FileChartLine({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M16.5 2H3.5C3.21997 2 3 2.21997 3 2.5V17.5C3 17.78 3.21997 18 3.5 18H11C12.1 18 13 17.1 13 16V14.49C13 14.21 13.23 13.98 13.51 13.98H15C16.1 13.98 17 13.08 17 11.98V2.5C17 2.21997 16.78 2 16.5 2ZM14.5355 6.23633L10.2882 10.4837C10.093 10.679 9.77631 10.679 9.58106 10.4837L8.34675 9.24903C8.1515 9.05378 7.83491 9.05372 7.63966 9.24897L6.5431 10.3452C6.34779 10.5404 6.03126 10.5404 5.83601 10.3452L5.48256 9.99171C5.28731 9.7964 5.28731 9.47981 5.48256 9.28456L7.63966 7.12788C7.83491 6.93263 8.1515 6.93269 8.34675 7.12794L9.58106 8.36262C9.77631 8.55787 10.0929 8.55793 10.2882 8.36262L13.4825 5.16822C13.6808 4.96998 14.0032 4.97346 14.1972 5.17585L14.543 5.53693C14.7312 5.73328 14.7278 6.04401 14.5355 6.23633Z" fill="currentColor"/>
      </svg>
    );
  }
);

FileChartLine.displayName = 'FileChartLine';
