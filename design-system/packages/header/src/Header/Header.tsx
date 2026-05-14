import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Plus, Minus, ArrowUp, ArrowDown, Filter } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const HeaderAlignments = ['left', 'right'] as const;
export type HeaderAlignment = (typeof HeaderAlignments)[number];

export const HeaderSizes = ['sm', 'md', 'lg'] as const;
export type HeaderSize = (typeof HeaderSizes)[number];

export const HeaderTypes = ['basic', 'condensed', 'lengthened', 'ascending', 'descending'] as const;
export type HeaderType = (typeof HeaderTypes)[number];

export const HeaderForceStates = ['hover', 'onclick'] as const;
export type HeaderForceState = (typeof HeaderForceStates)[number];

export interface HeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: React.ReactNode;
  alignment?: HeaderAlignment;
  size?: HeaderSize;
  /**
   * Column type. PANW extension — `condensed`/`lengthened` are PANW-specific
   * (not in Carbon). They render an Add / Subtract icon next to the title.
   */
  type?: HeaderType;
  filter?: boolean;
  forceState?: HeaderForceState | null;
  onHeaderClick?: () => void;
  onFilterClick?: () => void;
}

const TYPE_ICON: Record<Exclude<HeaderType, 'basic'>, React.ElementType> = {
  condensed: Plus,
  lengthened: Minus,
  ascending: ArrowUp,
  descending: ArrowDown,
};

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  function Header(
    {
      children,
      alignment = 'left',
      size = 'sm',
      type = 'basic',
      filter = false,
      forceState = null,
      onHeaderClick,
      onFilterClick,
      className,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();

    // Sort indicator only renders when the column is actively sorted.
    // No indicator at rest — the original design does not pre-announce
    // sortability with a muted icon; the directional arrow appears only
    // after the user clicks.
    //
    // condensed/lengthened are PANW-specific column-density indicators (not
    // sort-related). Their glyphs render in the leading slot.
    const isSorted = type === 'ascending' || type === 'descending';
    const isDensityType = type === 'condensed' || type === 'lengthened';
    const TypeIcon = isDensityType ? TYPE_ICON[type] : null;
    const SortIcon =
      type === 'ascending' ? ArrowUp :
      ArrowDown;
    const showSortIndicator = isSorted;

    const rootClass = classNames(
      `${prefix}--header`,
      `${prefix}--header--${alignment}`,
      `${prefix}--header--${size}`,
      {
        [`${prefix}--header--force-hover`]: forceState === 'hover',
        [`${prefix}--header--force-onclick`]: forceState === 'onclick',
        [`${prefix}--header--filter-visible`]: filter,
      },
      className
    );

    return (
      <div
        ref={ref}
        className={rootClass}
        role="columnheader"
        onClick={onHeaderClick}
        {...rest}>
        <div className={`${prefix}--header__container`}>
          {/* Density glyph (condensed/lengthened) — leading slot, like
              before. Not sort-related. */}
          {TypeIcon && (
            <span
              className={`${prefix}--header__type-icon ${prefix}--header__type-icon--${type}`}
              aria-hidden="true">
              <TypeIcon size={16} />
            </span>
          )}
          {/* For right-aligned (numeric) columns, the sort indicator lives
              on the LEFT of the text — at the trailing edge relative to the
              cell content, which for right-aligned columns is the left.
              For left-aligned columns it lives on the RIGHT. Same logical
              slot ("trailing edge"); position flips with alignment. */}
          {showSortIndicator && alignment === 'right' && (
            <span
              className={classNames(
                `${prefix}--header__sort-indicator`,
                {
                  [`${prefix}--header__sort-indicator--active`]: isSorted,
                  [`${prefix}--header__sort-indicator--${type}`]: isSorted,
                }
              )}
              aria-hidden="true">
              <SortIcon size={16} />
            </span>
          )}
          <span className={`${prefix}--header__text`}>{children}</span>
          {showSortIndicator && alignment !== 'right' && (
            <span
              className={classNames(
                `${prefix}--header__sort-indicator`,
                {
                  [`${prefix}--header__sort-indicator--active`]: isSorted,
                  [`${prefix}--header__sort-indicator--${type}`]: isSorted,
                }
              )}
              aria-hidden="true">
              <SortIcon size={16} />
            </span>
          )}
          {filter && (
            <button
              type="button"
              className={`${prefix}--header__filter`}
              aria-label="Filter column"
              onClick={(e) => {
                e.stopPropagation();
                onFilterClick?.();
              }}>
              <Filter size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Header.displayName = 'Header';

Header.propTypes = {
  children: PropTypes.node.isRequired,
  alignment: PropTypes.oneOf(HeaderAlignments),
  size: PropTypes.oneOf(HeaderSizes),
  type: PropTypes.oneOf(HeaderTypes),
  filter: PropTypes.bool,
  forceState: PropTypes.oneOf([...HeaderForceStates, null]),
  onHeaderClick: PropTypes.func,
  onFilterClick: PropTypes.func,
  className: PropTypes.string,
};

export default Header;
