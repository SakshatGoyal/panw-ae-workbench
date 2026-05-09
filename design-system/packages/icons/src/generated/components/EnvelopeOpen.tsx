// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/envelope-open.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const EnvelopeOpen = React.forwardRef<SVGSVGElement, IconProps>(
  function EnvelopeOpen({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path d="M2 8.91141C2 8.75709 2.07126 8.61141 2.1931 8.51668L9.6931 2.68535C9.87363 2.54499 10.1264 2.54499 10.3069 2.68535L17.8069 8.51668C17.9287 8.61141 18 8.75709 18 8.91141V9.74748L18 9.74892V17.4969C18 17.773 17.7761 17.9969 17.5 17.9969H2.5C2.22386 17.9969 2 17.773 2 17.4969V10.9982L2 10.9968V8.91141ZM10.3077 4.60577C10.1269 4.46455 9.87312 4.46455 9.69227 4.60577L3.75468 9.24219C3.49832 9.44238 3.49832 9.83018 3.75468 10.0304L9.69227 14.6668C9.87312 14.808 10.1269 14.808 10.3077 14.6668L16.2453 10.0304C16.5017 9.83018 16.5017 9.44238 16.2453 9.24219L10.3077 4.60577Z" fill="currentColor"/>
      </svg>
    );
  }
);

EnvelopeOpen.displayName = 'EnvelopeOpen';
