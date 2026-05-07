import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const TooltipDirections = ['top', 'bottom', 'left', 'right'] as const;
export type TooltipDirection = (typeof TooltipDirections)[number];

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Direction the tooltip sits relative to its anchor — used only for class
   * hooks; the pointer triangle itself was dropped per Stage's "decoration
   * earns its place" rule. Position alone signals the relationship. */
  pointerDirection?: TooltipDirection;
  /** Plain-text label. Tooltips are for glanceable labels; for descriptive
   * content with heading/image/stepper, use `@ds/popover` instead. */
  content?: string;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  {
    pointerDirection = 'top',
    content = "Sample content for a tooltip that shouldn't be more than a couple of lines.",
    className,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const rootClass = classNames(
    `${prefix}--tooltip`,
    `${prefix}--tooltip--direction-${pointerDirection}`,
    className
  );

  return (
    <div ref={ref} className={rootClass} role="tooltip" {...rest}>
      <div className={`${prefix}--tooltip__content-container`}>
        <p className={`${prefix}--tooltip__text`}>{content}</p>
      </div>
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  pointerDirection: PropTypes.oneOf(TooltipDirections),
  content: PropTypes.string,
  className: PropTypes.string,
};

export default Tooltip;
