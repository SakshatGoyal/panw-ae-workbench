import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronDown, ChevronUp, ArrowUp, ArrowDown } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { Flyout, FlyoutList, FlyoutItem } from '@ds/flyout';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  label: string;
  value: string;
}

export interface SortProps {
  /** Trigger label prefix shown before the current sort key (e.g. "sort"). */
  label?: string;
  /** Available sort keys. */
  options: SortOption[];
  /** Currently-selected sort key (controlled). */
  value: string;
  /** Currently-selected direction (controlled). */
  direction?: SortDirection;
  /** Disabled trigger. */
  disabled?: boolean;
  /** Fired when the user picks a key. Selection commits immediately — no Apply/Cancel. */
  onChange?: (value: string) => void;
  /** Fired when the user toggles direction (clicks the direction glyph). */
  onDirectionChange?: (direction: SortDirection) => void;
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────
//
// Sort is the single-select sibling of Filter. Same trigger chrome, same
// flyout body — but selection commits on click (no Apply/Cancel) and the
// trigger shows the active sort key + direction inline rather than a count
// chip. The direction glyph is part of the trigger; clicking it toggles
// asc/desc without opening the flyout.
//
// Use this anywhere a list or table needs a single-select sort menu. It
// keeps the system to one trigger grammar across Filter + Sort instead of
// the bespoke ghost-text+chevron pattern individual compositions would
// otherwise hand-roll.

export const Sort = React.forwardRef<HTMLDivElement, SortProps>(
  function Sort(
    {
      label = 'sort',
      options,
      value,
      direction = 'desc',
      disabled = false,
      onChange,
      onDirectionChange,
      className,
    },
    ref
  ) {
    const prefix = usePrefix();
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    const currentLabel =
      options.find((o) => o.value === value)?.label ?? value;

    const handleSelect = useCallback(
      (next: string[]) => {
        const picked = next[0];
        if (picked && picked !== value) {
          onChange?.(picked);
        }
        setOpen(false);
      },
      [value, onChange]
    );

    const toggleDirection = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onDirectionChange?.(direction === 'asc' ? 'desc' : 'asc');
      },
      [direction, onDirectionChange]
    );

    const triggerClasses = classNames(
      // Reuse the Filter trigger chrome for visual continuity. Sort and
      // Filter are siblings; they should look like siblings.
      `${prefix}--filter`,
      `${prefix}--sort`,
      {
        [`${prefix}--filter--open`]: open,
        [`${prefix}--filter--disabled`]: disabled,
      },
      className
    );

    const DirectionIcon = direction === 'asc' ? ArrowUp : ArrowDown;

    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} className={`${prefix}--filter__wrapper`}>
        <button
          ref={triggerRef}
          type="button"
          className={triggerClasses}
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
          onClick={() => setOpen((v) => !v)}>
          <span className={`${prefix}--sort__label`}>
            {label}: {currentLabel}
          </span>
          {/* Direction glyph — clickable, toggles asc/desc without opening
              the flyout. Stops propagation so the trigger's onClick (open
              toggle) doesn't also fire. */}
          <span
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label={`Sort ${direction === 'asc' ? 'ascending' : 'descending'}, click to reverse`}
            className={`${prefix}--sort__direction`}
            onClick={toggleDirection}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onDirectionChange?.(direction === 'asc' ? 'desc' : 'asc');
              }
            }}>
            <DirectionIcon size={16} />
          </span>
          <span className={`${prefix}--filter__chevron`} aria-hidden="true">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        <Flyout
          open={open}
          onOpenChange={setOpen}
          anchorRef={triggerRef}
          mode="single"
          selected={[value]}
          onSelectionChange={handleSelect}
          placement="bottom-end">
          <FlyoutList>
            {options.map((opt) => (
              <FlyoutItem key={opt.value} value={opt.value}>
                {opt.label}
              </FlyoutItem>
            ))}
          </FlyoutList>
        </Flyout>
      </span>
    );
  }
);

Sort.displayName = 'Sort';

Sort.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['asc', 'desc'] as const),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onDirectionChange: PropTypes.func,
  className: PropTypes.string,
};

export default Sort;
