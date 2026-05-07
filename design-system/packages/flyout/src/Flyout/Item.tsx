import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
const TRUNCATION_TOOLTIP_DELAY_MS = 1000;

type TipPlacement = 'right' | 'left';

interface TipState {
  visible: boolean;
  placement: TipPlacement;
  top: number;
  left: number;
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(function Item(
  { value, children, renderIcon: IconElement, disabled = false, className },
  ref
) {
  const prefix = usePrefix();
  const { mode, selected, filter, registerValue, unregisterValue, toggle } =
    useFlyoutContext();
  const depth = useFlyoutDepth();

  const labelRef = useRef<HTMLSpanElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);
  const setItemRef = (node: HTMLDivElement | null) => {
    itemRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  const tipTimerRef = useRef<number | null>(null);
  const [tip, setTip] = useState<TipState>({
    visible: false,
    placement: 'right',
    top: 0,
    left: 0,
  });

  // Register so SelectAll knows the universe of selectable values.
  useEffect(() => {
    if (disabled) return;
    registerValue(value);
    return () => unregisterValue(value);
  }, [value, disabled, registerValue, unregisterValue]);

  // Cleanup any pending tooltip timer on unmount.
  useEffect(() => {
    return () => {
      if (tipTimerRef.current !== null) {
        window.clearTimeout(tipTimerRef.current);
      }
    };
  }, []);

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

  // ─── Truncation tooltip ──────────────────────────────────────────────────
  // Detect overflow on the label span (ellipsis triggered) and after a 1s
  // hover delay reveal a tooltip with the full text. Prefer right-side
  // placement; fall back to left if there's no room in the viewport.

  const showTipNow = () => {
    const labelEl = labelRef.current;
    const itemEl = itemRef.current;
    if (!labelEl || !itemEl) return;
    if (labelEl.scrollWidth <= labelEl.clientWidth) return; // not truncated

    const itemRect = itemEl.getBoundingClientRect();
    const TOOLTIP_GAP = 8;
    // Estimate room: assume tooltip is ~min(label scrollWidth + 24, viewport - 32).
    const estimatedWidth = Math.min(labelEl.scrollWidth + 24, window.innerWidth - 32);
    const roomRight = window.innerWidth - itemRect.right - TOOLTIP_GAP - 8;
    const placement: TipPlacement = roomRight >= estimatedWidth ? 'right' : 'left';

    setTip({
      visible: true,
      placement,
      top: itemRect.top + window.scrollY + itemRect.height / 2,
      left:
        placement === 'right'
          ? itemRect.right + window.scrollX + TOOLTIP_GAP
          : itemRect.left + window.scrollX - TOOLTIP_GAP,
    });
  };

  const handlePointerEnter = () => {
    if (tipTimerRef.current !== null) window.clearTimeout(tipTimerRef.current);
    tipTimerRef.current = window.setTimeout(showTipNow, TRUNCATION_TOOLTIP_DELAY_MS);
  };

  const handlePointerLeave = () => {
    if (tipTimerRef.current !== null) {
      window.clearTimeout(tipTimerRef.current);
      tipTimerRef.current = null;
    }
    if (tip.visible) setTip((s) => ({ ...s, visible: false }));
  };

  const classes = classNames(
    `${prefix}--flyout__item`,
    {
      [`${prefix}--flyout__item--selected`]: isSelected,
      [`${prefix}--flyout__item--disabled`]: disabled,
    },
    className
  );

  const fullLabel = typeof children === 'string' ? children : null;

  return (
    <>
      <div
        ref={setItemRef}
        className={classes}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        onFocus={handlePointerEnter}
        onBlur={handlePointerLeave}
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
        <span ref={labelRef} className={`${prefix}--flyout__item-label`}>
          {children}
        </span>
      </div>
      {tip.visible && fullLabel !== null && typeof document !== 'undefined' &&
        createPortal(
          <div
            role="tooltip"
            className={classNames(
              `${prefix}--flyout__truncation-tip`,
              `${prefix}--flyout__truncation-tip--${tip.placement}`
            )}
            style={{
              position: 'absolute',
              top: tip.top,
              left: tip.left,
            }}>
            {fullLabel}
          </div>,
          document.body
        )}
    </>
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
