import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export interface ListProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Scrolling region for items. Items render contiguously (no gap between)
 * per Stage's flyout pattern; the parent Flyout owns the 4px container
 * padding so items appear inset.
 */
export const List = React.forwardRef<HTMLDivElement, ListProps>(function List(
  { children, className },
  ref
) {
  const prefix = usePrefix();
  return (
    <div ref={ref} className={classNames(`${prefix}--flyout__list`, className)} role="presentation">
      {children}
    </div>
  );
});

List.displayName = 'Flyout.List';

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default List;
