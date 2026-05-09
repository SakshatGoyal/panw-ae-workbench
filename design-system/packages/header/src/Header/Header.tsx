import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Plus, Minus, ArrowUp, ArrowDown, Sort, Filter } from '@ds/icons';
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
    const TypeIcon = type !== 'basic' ? TYPE_ICON[type] : null;
    const showSortIndicator = type === 'basic';

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
          {TypeIcon && (
            <span
              className={`${prefix}--header__type-icon ${prefix}--header__type-icon--${type}`}
              aria-hidden="true">
              <TypeIcon size={16} />
            </span>
          )}
          <span className={`${prefix}--header__text`}>{children}</span>
          {showSortIndicator && (
            <span className={`${prefix}--header__sort-indicator`} aria-hidden="true">
              <Sort size={16} />
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
