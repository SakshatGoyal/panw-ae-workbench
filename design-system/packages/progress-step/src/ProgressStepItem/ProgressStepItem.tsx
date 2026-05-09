import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CircleCheck, ExclamationCircle, MinusCircle } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const ProgressStatuses = ['success', 'warning', 'error', 'active', 'inactive'] as const;
export type ProgressStatus = (typeof ProgressStatuses)[number];

export const ProgressSizes = ['default', 'compact'] as const;
export type ProgressSize = (typeof ProgressSizes)[number];

export interface ProgressStepItemProps {
  /** Title text. */
  label: string;
  /** Optional description. */
  description?: string;
  /** Step status. */
  status: ProgressStatus;
  /** Click handler — when set, the step is keyboard-activatable. */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Internal (set by `<ProgressStep>`): zero-based index used for the active /
   * inactive number indicator.
   */
  index?: number;
  /** Internal (set by `<ProgressStep>`): size variant. */
  size?: ProgressSize;
  /** Internal (set by `<ProgressStep>`): show description text. */
  showDescription?: boolean;
  /** Force hover appearance for documentation/snapshot scenarios. */
  forceHover?: boolean;
  /** Additional class. */
  className?: string;
}

const STATUS_ICON: Record<Exclude<ProgressStatus, 'active' | 'inactive'>, React.ElementType> = {
  success: CircleCheck,
  warning: ExclamationCircle,
  error: MinusCircle,
};

export const ProgressStepItem = React.forwardRef<HTMLDivElement, ProgressStepItemProps>(
  function ProgressStepItem(
    {
      label,
      description,
      status,
      onClick,
      index = 0,
      size = 'default',
      showDescription = true,
      forceHover = false,
      className,
    },
    ref
  ) {
    const prefix = usePrefix();
    const iconPx = size === 'compact' ? 16 : 24;

    const rootClass = classNames(
      `${prefix}--ps-step`,
      `${prefix}--ps-step--${status}`,
      `${prefix}--ps-step--${size}`,
      { [`${prefix}--ps-step--hover`]: forceHover },
      className
    );

    let indicator: React.ReactNode;
    if (status === 'active' || status === 'inactive') {
      indicator = (
        <span className={`${prefix}--ps-step__number ${prefix}--ps-step__number--${status}`}>
          {index + 1}
        </span>
      );
    } else {
      const Icon = STATUS_ICON[status];
      indicator = (
        <span className={`${prefix}--ps-step__icon ${prefix}--ps-step__icon--${status}`}>
          <Icon size={iconPx} />
        </span>
      );
    }

    const handleKeyDown = onClick
      ? (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(e);
          }
        }
      : undefined;

    return (
      <div
        ref={ref}
        className={rootClass}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}>
        <div className={`${prefix}--ps-step__indicator-container`}>{indicator}</div>
        <div className={`${prefix}--ps-step__text-container`}>
          <span className={`${prefix}--ps-step__title`}>{label}</span>
          {showDescription && description && (
            <span className={`${prefix}--ps-step__description`}>{description}</span>
          )}
        </div>
      </div>
    );
  }
);

ProgressStepItem.displayName = 'ProgressStepItem';

ProgressStepItem.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  status: PropTypes.oneOf(ProgressStatuses).isRequired,
  onClick: PropTypes.func,
  index: PropTypes.number,
  size: PropTypes.oneOf(ProgressSizes),
  showDescription: PropTypes.bool,
  forceHover: PropTypes.bool,
  className: PropTypes.string,
};

export default ProgressStepItem;
