import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Checkbox } from '@ds/checkbox';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { useFlyoutContext, useFlyoutDepth } from './Flyout';

export interface ItemProps {
  /** Unique value passed to onSelectionChange when this item is chosen. */
  value: string;
  children: React.ReactNode;
  /** Optional leading icon — renders as ElementType (lucide-react component). */
  renderIcon?: React.ElementType;
  disabled?: boolean;
  className?: string;
}

const INDENT_PX = 16; // Stage 4px-grid step that reads as a clear nesting tier.

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(function Item(
  { value, children, renderIcon: IconElement, disabled = false, className },
  ref
) {
  const prefix = usePrefix();
  const { mode, selected, filter, registerValue, unregisterValue, toggle } =
    useFlyoutContext();
  const depth = useFlyoutDepth();

  // Register so SelectAll knows the universe of selectable values.
  useEffect(() => {
    if (disabled) return;
    registerValue(value);
    return () => unregisterValue(value);
  }, [value, disabled, registerValue, unregisterValue]);

  const isSelected = selected.has(value);

  // Substring filter — match against label text only when children is a string.
  if (filter) {
    const label = typeof children === 'string' ? children : '';
    if (!label.toLowerCase().includes(filter.toLowerCase())) return null;
  }

  const handleClick = () => {
    if (disabled) return;
    toggle(value);
  };

  const classes = classNames(
    `${prefix}--flyout__item`,
    {
      [`${prefix}--flyout__item--selected`]: isSelected,
      [`${prefix}--flyout__item--disabled`]: disabled,
    },
    className
  );

  return (
    <div
      ref={ref}
      className={classes}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      style={depth > 0 ? { paddingLeft: 12 + depth * INDENT_PX } : undefined}>
      {mode === 'multiple' && (
        <span className={`${prefix}--flyout__item-checkbox`} aria-hidden="true">
          <Checkbox
            id={`flyout-item-${value}`}
            labelText=""
            status={isSelected ? 'checked' : 'unchecked'}
            disabled={disabled}
            onChange={() => toggle(value)}
            tabIndex={-1}
          />
        </span>
      )}
      {IconElement && (
        <span className={`${prefix}--flyout__item-icon`} aria-hidden="true">
          <IconElement size={16} />
        </span>
      )}
      <span className={`${prefix}--flyout__item-label`}>{children}</span>
    </div>
  );
});

Item.displayName = 'Flyout.Item';

Item.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Item;
