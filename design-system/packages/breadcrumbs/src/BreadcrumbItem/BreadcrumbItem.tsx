import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export interface BreadcrumbItemProps {
  /** Display label. */
  children?: React.ReactNode;
  /** Navigation target — omit for the current page. */
  href?: string;
  /** Disables the link visually and removes from interaction. */
  disabled?: boolean;
  /**
   * Internal: marks this item as the current page. Set automatically by
   * `<Breadcrumb>` for the last visible item.
   */
  isCurrent?: boolean;
  /** Click handler. */
  onClick?: (event: React.MouseEvent) => void;
  /** Additional class. */
  className?: string;
}

export const BreadcrumbItem = React.forwardRef<HTMLElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ children, href, disabled, isCurrent, onClick, className }, ref) {
    const prefix = usePrefix();

    if (isCurrent) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={classNames(`${prefix}--breadcrumbs__current`, className)}
          aria-current="page">
          {children}
        </span>
      );
    }

    if (disabled) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classNames(
            `${prefix}--breadcrumbs__link`,
            `${prefix}--breadcrumbs__link--disabled`,
            className
          )}
          aria-disabled="true"
          role="link">
          {children}
        </a>
      );
    }

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href ?? '#'}
        className={classNames(`${prefix}--breadcrumbs__link`, className)}
        onClick={onClick}>
        {children}
      </a>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

BreadcrumbItem.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  isCurrent: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default BreadcrumbItem;
