import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ArrowUp, ArrowDown, Info, CircleCheck as CheckCircle, ExclamationTriangle as AlertTriangle } from '@ds/icons';
import { XCircle } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { Tags, type TagColor, type TagContrast } from '@ds/tags';

export const CellContentTypes = ['text', 'numbers', 'numberUp', 'numberDown'] as const;
export type CellContentType = (typeof CellContentTypes)[number];

export const CellStates = ['none', 'info', 'success', 'warning', 'error'] as const;
export type CellState = (typeof CellStates)[number];

export const CellAlignments = ['left', 'right'] as const;
export type CellAlignment = (typeof CellAlignments)[number];

export interface CellContentsProps {
  content?: CellContentType;
  state?: CellState;
  /**
   * Horizontal alignment within the cell. Numeric `content` values
   * (numbers, numberUp, numberDown) default to right; text defaults to
   * left. Pass explicitly to override — e.g. a right-aligned text column
   * for currency codes, or a left-aligned numeric column for IDs.
   */
  alignment?: CellAlignment;
  text?: string;
  tags?: boolean;
  tagLabel?: string;
  tagColor?: TagColor;
  tagContrast?: TagContrast;
  trendValue?: string;
  className?: string;
}

const STATE_ICON: Record<Exclude<CellState, 'none'>, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

export const CellContents = React.forwardRef<HTMLDivElement, CellContentsProps>(
  function CellContents(
    {
      content = 'text',
      state = 'none',
      alignment,
      text,
      tags = false,
      tagLabel = 'Tag',
      tagColor = 'orange',
      tagContrast = 'low',
      trendValue,
      className,
    },
    ref
  ) {
    const prefix = usePrefix();

    const displayText = text ?? (content === 'text' ? 'Cell Content' : '1,234,567.00');
    const displayTrend = trendValue ?? '$123';
    const isNumeric = content !== 'text';
    const showTrend = content === 'numberUp' || content === 'numberDown';
    const StateIcon = state !== 'none' ? STATE_ICON[state] : null;
    // Right-align numeric content by default; explicit alignment prop wins.
    const effectiveAlignment: CellAlignment = alignment ?? (isNumeric ? 'right' : 'left');

    const rootClass = classNames(
      `${prefix}--cell-contents`,
      `${prefix}--cell-contents--align-${effectiveAlignment}`,
      className
    );

    const textClass = classNames(`${prefix}--cell-contents__text`, {
      [`${prefix}--cell-contents__text--right`]: effectiveAlignment === 'right',
    });

    const trendClass = classNames(
      `${prefix}--cell-contents__trend`,
      content === 'numberUp'
        ? `${prefix}--cell-contents__trend--up`
        : content === 'numberDown'
          ? `${prefix}--cell-contents__trend--down`
          : ''
    );

    return (
      <div ref={ref} className={rootClass}>
        <span className={textClass}>{displayText}</span>
        {tags && <Tags label={tagLabel} color={tagColor} contrast={tagContrast} />}
        {showTrend && (
          <span className={trendClass}>
            <span className={`${prefix}--cell-contents__trend-icon`} aria-hidden="true">
              {content === 'numberUp' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </span>
            <span className={`${prefix}--cell-contents__trend-value`}>{displayTrend}</span>
          </span>
        )}
        {StateIcon && (
          <span
            className={`${prefix}--cell-contents__state-icon ${prefix}--cell-contents__state-icon--${state}`}
            aria-hidden="true">
            <StateIcon size={16} />
          </span>
        )}
      </div>
    );
  }
);

CellContents.displayName = 'CellContents';

CellContents.propTypes = {
  content: PropTypes.oneOf(CellContentTypes),
  state: PropTypes.oneOf(CellStates),
  alignment: PropTypes.oneOf(CellAlignments),
  text: PropTypes.string,
  tags: PropTypes.bool,
  tagLabel: PropTypes.string,
  trendValue: PropTypes.string,
  className: PropTypes.string,
};

export default CellContents;
