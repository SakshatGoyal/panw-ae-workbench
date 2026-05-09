import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import {
  useFlyoutDepth,
  FlyoutDepthProvider,
  FLYOUT_DEPTH_MAX,
} from './Flyout';

export interface GroupProps {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** Optional leading icon for the group header. */
  renderIcon?: React.ElementType;
  className?: string;
}

const INDENT_PX = 16;

/**
 * Collapsible tree node. Header is a clickable row with a leading chevron;
 * children render at +1 depth. Per Stage's restraint principle, depth is
 * capped at FLYOUT_DEPTH_MAX — deeper groups silently render their children
 * at the cap level rather than indenting indefinitely.
 */
export const Group = React.forwardRef<HTMLDivElement, GroupProps>(function Group(
  { label, children, defaultOpen = false, renderIcon: IconElement, className },
  ref
) {
  const prefix = usePrefix();
  const depth = useFlyoutDepth();
  const [open, setOpen] = useState(defaultOpen);

  const childDepth = Math.min(depth + 1, FLYOUT_DEPTH_MAX);

  const Chevron = open ? ChevronDown : ChevronRight;

  return (
    <div ref={ref} className={classNames(`${prefix}--flyout__group`, className)}>
      <div
        className={`${prefix}--flyout__group-header`}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        style={depth > 0 ? { paddingLeft: 12 + depth * INDENT_PX } : undefined}>
        <span className={`${prefix}--flyout__group-chevron`} aria-hidden="true">
          <Chevron size={16} />
        </span>
        {IconElement && (
          <span className={`${prefix}--flyout__group-icon`} aria-hidden="true">
            <IconElement size={16} />
          </span>
        )}
        <span className={`${prefix}--flyout__group-label`}>{label}</span>
      </div>
      {open && (
        <FlyoutDepthProvider value={childDepth}>
          <div className={`${prefix}--flyout__group-children`} role="group">
            {children}
          </div>
        </FlyoutDepthProvider>
      )}
    </div>
  );
});

Group.displayName = 'Flyout.Group';

Group.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  defaultOpen: PropTypes.bool,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  className: PropTypes.string,
};

export default Group;
