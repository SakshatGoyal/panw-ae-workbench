import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Action row anchored at the bottom of the flyout. Top-bordered with
 * lines.neutral.rest so it reads as a section break inside the panel.
 * Padding is 8/8 — the footer is a single button group, so 4px between
 * buttons inside; outer 8px keeps it on Stage's 4px grid.
 */
export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(function Footer(
  { children, className },
  ref
) {
  const prefix = usePrefix();
  return (
    <div ref={ref} className={classNames(`${prefix}--flyout__footer`, className)}>
      {children}
    </div>
  );
});

Footer.displayName = 'Flyout.Footer';

Footer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Footer;
