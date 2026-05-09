// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/maximize.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const Maximize = React.forwardRef<SVGSVGElement, IconProps>(
  function Maximize({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M3 16.4439V10.5573C3 10.0618 3.599 9.81366 3.94934 10.164L6.18567 12.4003L7.93939 10.6466C8.1347 10.4513 8.45123 10.4513 8.64654 10.6466L9.35345 11.3535C9.54876 11.5488 9.54876 11.8654 9.35345 12.0606L7.59973 13.8144L9.836 16.0507C10.1863 16.401 9.93823 17 9.44281 17H3.5561C3.24897 17 3.00001 16.751 3.00001 16.4439H3ZM10.164 3.94934L12.4004 6.18567L10.6466 7.93945C10.4513 8.1347 10.4513 8.45129 10.6466 8.64654L11.3535 9.35351C11.5488 9.54876 11.8653 9.54876 12.0606 9.35351L13.8144 7.59973L16.0507 9.836C16.401 10.1863 17 9.93823 17 9.44281V3.55609C17 3.24896 16.7511 3 16.4439 3H10.5572C10.0618 3 9.81368 3.599 10.164 3.94934Z" fill="currentColor"/>
      </svg>
    );
  }
);

Maximize.displayName = 'Maximize';
