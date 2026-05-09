// AUTO-GENERATED — do not edit. Regenerate via `npm run build:icons`.
// Source: svg/comment-add.svg
import * as React from 'react';
import type { IconProps } from '../../types';

export const CommentAdd = React.forwardRef<SVGSVGElement, IconProps>(
  function CommentAdd({ size = 20, className, title, 'aria-label': ariaLabel, ...rest }, ref) {
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
        <path fillRule="evenodd" clipRule="evenodd" d="M16.6287 5.54803L16.623 5.54589C16.1335 4.86773 15.5123 4.27898 14.7891 3.81994L14.7878 3.82025C13.483 2.97095 11.843 2.47998 9.97687 2.47998C5.29565 2.47998 2 5.52863 2 9.73383V10.2261C2 12.0267 2.60834 13.6127 3.66736 14.8409L2.12561 16.6563C1.84985 16.9811 2.08063 17.48 2.50677 17.48H9.97686C14.658 17.48 17.9537 14.4313 17.9537 10.2261V9.73382C17.9537 8.13659 17.4754 6.70812 16.6287 5.54803ZM14 10.25C14 10.5261 13.7761 10.75 13.5 10.75H10.75V13.5C10.75 13.7761 10.5261 14 10.25 14H9.75C9.47388 14 9.25 13.7761 9.25 13.5V10.75H6.5C6.22388 10.75 6 10.5261 6 10.25V9.75C6 9.47382 6.22388 9.25 6.5 9.25H9.25V6.5C9.25 6.22382 9.47388 6 9.75 6H10.25C10.5261 6 10.75 6.22382 10.75 6.5V9.25H13.5C13.7761 9.25 14 9.47382 14 9.75V10.25Z" fill="currentColor"/>
      </svg>
    );
  }
);

CommentAdd.displayName = 'CommentAdd';
