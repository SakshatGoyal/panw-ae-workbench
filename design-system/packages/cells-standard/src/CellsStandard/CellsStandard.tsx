import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Plus } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { CellContents, type CellContentType, type CellState as CellContentState } from '@ds/cell-contents';
import { Checkbox, type CheckboxStatus } from '@ds/checkbox';

export const CellInteractionStates = ['static', 'hover', 'onPress', 'active', 'locked'] as const;
export type CellInteractionState = (typeof CellInteractionStates)[number];

export const CellSizes = ['small', 'default', 'large'] as const;
export type CellSize = (typeof CellSizes)[number];

export interface CellsStandardProps {
  state?: CellInteractionState;
  size?: CellSize;
  expandable?: boolean;
  checkbox?: boolean;
  checkboxStatus?: CheckboxStatus;
  onCheckboxChange?: (next: CheckboxStatus) => void;
  onClick?: () => void;
  onExpandClick?: () => void;
  forceState?: CellInteractionState;
  content?: CellContentType;
  contentState?: CellContentState;
  text?: string;
  tags?: boolean;
  tagLabel?: string;
  trendValue?: string;
  className?: string;
}

export const CellsStandard = React.forwardRef<HTMLDivElement, CellsStandardProps>(
  function CellsStandard(
    {
      state = 'static',
      size = 'small',
      expandable = false,
      checkbox = false,
      checkboxStatus,
      onCheckboxChange,
      onClick,
      onExpandClick,
      forceState,
      content = 'text',
      contentState = 'none',
      text,
      tags = false,
      tagLabel,
      trendValue,
      className,
    },
    ref
  ) {
    const prefix = usePrefix();
    const [internalStatus, setInternalStatus] = useState<CheckboxStatus>('unchecked');

    const effectiveState = forceState ?? state;
    const isLocked = effectiveState === 'locked';
    const isActive = effectiveState === 'active';

    const cbStatus = checkboxStatus ?? (isActive ? 'checked' : internalStatus);

    const handleCheckboxChange = (next: CheckboxStatus) => {
      if (isLocked) return;
      if (onCheckboxChange) {
        onCheckboxChange(next);
      } else {
        setInternalStatus(next);
      }
    };

    const handleRowClick = () => {
      if (isLocked) return;
      onClick?.();
    };

    const handleExpandClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation();
      if (isLocked) return;
      onExpandClick?.();
    };

    const rootClass = classNames(
      `${prefix}--cells-std`,
      `${prefix}--cells-std--${size}`,
      `${prefix}--cells-std--${effectiveState}`,
      className
    );

    return (
      <div
        ref={ref}
        className={rootClass}
        onClick={handleRowClick}
        role={onClick ? 'row' : undefined}
        aria-disabled={isLocked || undefined}
        data-state={effectiveState}
        data-size={size}>
        {expandable && (
          <button
            type="button"
            className={`${prefix}--cells-std__expand-icon`}
            onClick={handleExpandClick}
            disabled={isLocked}
            aria-label="Expand row">
            <Plus size={16} aria-hidden="true" />
          </button>
        )}

        {checkbox && (
          <span className={`${prefix}--cells-std__checkbox`}>
            <Checkbox
              status={cbStatus}
              disabled={isLocked}
              label=""
              onChange={handleCheckboxChange}
            />
          </span>
        )}

        <div className={`${prefix}--cells-std__content`}>
          <CellContents
            content={content}
            state={contentState}
            text={text}
            tags={tags}
            tagLabel={tagLabel}
            trendValue={trendValue}
          />
        </div>
      </div>
    );
  }
);

CellsStandard.displayName = 'CellsStandard';

CellsStandard.propTypes = {
  state: PropTypes.oneOf(CellInteractionStates),
  size: PropTypes.oneOf(CellSizes),
  expandable: PropTypes.bool,
  checkbox: PropTypes.bool,
  checkboxStatus: PropTypes.oneOf(['checked', 'unchecked', 'indeterminate']),
  onCheckboxChange: PropTypes.func,
  onClick: PropTypes.func,
  onExpandClick: PropTypes.func,
  forceState: PropTypes.oneOf(CellInteractionStates),
  content: PropTypes.string,
  contentState: PropTypes.string,
  text: PropTypes.string,
  tags: PropTypes.bool,
  tagLabel: PropTypes.string,
  trendValue: PropTypes.string,
  className: PropTypes.string,
};

export default CellsStandard;
