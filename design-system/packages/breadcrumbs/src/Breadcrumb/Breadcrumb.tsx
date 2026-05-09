import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronRight } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export interface BreadcrumbProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** BreadcrumbItem children. */
  children?: React.ReactNode;
  /** When true, collapses middle items into a `…` button between first and last. */
  collapsed?: boolean;
  /** Fired when the collapsed `…` button is clicked. */
  onExpand?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** ARIA label for the wrapping `<nav>`. */
  'aria-label'?: string;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  {
    children,
    collapsed = false,
    onExpand,
    className,
    'aria-label': ariaLabel = 'Breadcrumb',
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const items = React.Children.toArray(children).filter(Boolean);
  const showCollapse = collapsed && items.length > 2;
  const visibleItems = showCollapse ? [items[0], items[items.length - 1]] : items;

  const list = visibleItems.map((child, idx) => {
    const markCurrent = idx === visibleItems.length - 1;
    return (
      <li key={`li-${idx}`} className={`${prefix}--breadcrumbs__item`}>
        {idx > 0 && (
          <span className={`${prefix}--breadcrumbs__separator`} aria-hidden="true">
            <ChevronRight size={16} />
          </span>
        )}
        {React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ isCurrent?: boolean }>, {
              isCurrent: markCurrent,
            })
          : child}
        {showCollapse && idx === 0 && (
          <>
            <span className={`${prefix}--breadcrumbs__separator`} aria-hidden="true">
              <ChevronRight size={16} />
            </span>
            <button
              type="button"
              className={`${prefix}--breadcrumbs__continuation`}
              onClick={onExpand}
              aria-label="Show hidden breadcrumbs">
              . . .
            </button>
          </>
        )}
      </li>
    );
  });

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={classNames(`${prefix}--breadcrumbs`, className)}
      {...rest}>
      <ol className={`${prefix}--breadcrumbs__list`}>{list}</ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

Breadcrumb.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  onExpand: PropTypes.func,
  className: PropTypes.string,
};

export default Breadcrumb;
