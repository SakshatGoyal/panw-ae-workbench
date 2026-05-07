import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const TooltipDirections = ['top', 'bottom', 'left', 'right'] as const;
export type TooltipDirection = (typeof TooltipDirections)[number];

export const TooltipPositions = ['left', 'middle', 'right', 'top', 'bottom'] as const;
export type TooltipPosition = (typeof TooltipPositions)[number];

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  pointerDirection?: TooltipDirection;
  pointerPosition?: TooltipPosition;
  /** Plain-text label. Tooltips are for glanceable labels; for descriptive
   * content with heading/image/stepper, use `@ds/popover` instead. */
  content?: string;
}

function Arrow({ direction }: { direction: TooltipDirection }) {
  const cls = 'panw--tooltip__arrow';
  if (direction === 'top') {
    return (
      <svg className={cls} viewBox="0 0 9 5" fill="currentColor" aria-hidden="true">
        <path d="M4.5 0L9 5H0L4.5 0Z" />
      </svg>
    );
  }
  if (direction === 'bottom') {
    return (
      <svg className={cls} viewBox="0 0 9 5" fill="currentColor" aria-hidden="true">
        <path d="M4.5 5L0 0H9L4.5 5Z" />
      </svg>
    );
  }
  if (direction === 'left') {
    return (
      <svg className={cls} viewBox="0 0 5 9" fill="currentColor" aria-hidden="true">
        <path d="M0 4.5L5 0V9L0 4.5Z" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 5 9" fill="currentColor" aria-hidden="true">
      <path d="M5 4.5L0 9V0L5 4.5Z" />
    </svg>
  );
}

function normalizePosition(direction: TooltipDirection, position: TooltipPosition): string {
  if (direction === 'top' || direction === 'bottom') {
    if (position === 'top') return 'left';
    if (position === 'bottom') return 'right';
    return position;
  }
  if (position === 'left') return 'top';
  if (position === 'right') return 'bottom';
  return position;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    pointerDirection = 'top',
    pointerPosition = 'left',
    content = "Sample content for a tooltip that shouldn't be more than a couple of lines.",
    className,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const normalized = normalizePosition(pointerDirection, pointerPosition);

  const rootClass = classNames(
    `${prefix}--tooltip`,
    `${prefix}--tooltip--direction-${pointerDirection}`,
    `${prefix}--tooltip--position-${normalized}`,
    className
  );

  return (
    <div ref={ref} className={rootClass} role="tooltip" {...rest}>
      <div className={`${prefix}--tooltip__pointer-container`}>
        <Arrow direction={pointerDirection} />
      </div>
      <div className={`${prefix}--tooltip__content-container`}>
        <p className={`${prefix}--tooltip__text`}>{content}</p>
      </div>
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  pointerDirection: PropTypes.oneOf(TooltipDirections),
  pointerPosition: PropTypes.oneOf(TooltipPositions),
  content: PropTypes.string,
  className: PropTypes.string,
};

export default Tooltip;
