import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronDown, ChevronUp, Close as X } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { Button, IconButton } from '@ds/button';
import { Tags } from '@ds/tags';
import {
  Flyout,
  FlyoutFilter,
  FlyoutList,
  FlyoutItem,
  FlyoutFooter,
} from '@ds/flyout';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterProps {
  /** Trigger label shown when no items are selected. */
  label?: string;
  /** Available options. */
  options: FilterOption[];
  /** Currently-applied selection (controlled). */
  selected?: string[];
  /** Search input placeholder. */
  searchPlaceholder?: string;
  /** Disabled trigger. */
  disabled?: boolean;
  /** Fired with the new committed selection when Apply is clicked. */
  onApply?: (selected: string[]) => void;
  /** Fired when the user backs out (Cancel or outside-click). */
  onCancel?: () => void;
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────
//
// Filter is a flyout-backed selection trigger. It mirrors the MultiSelect
// interaction model but speaks the language of filtering — neutral tags
// inside the trigger announce the current applied set, and selection is
// staged in a draft until the user confirms with Apply.
//
// The flyout body is a composition of the existing flyout primitives:
//   FlyoutFilter   — search input
//   FlyoutList     — checkbox-bearing item list
//   FlyoutFooter   — Cancel / Apply
//
// State lives in two places:
//   `applied`  — the prop-controlled committed value (or last applied).
//   `draft`    — the in-flight selection while the panel is open. Reset
//                from `applied` whenever the panel opens; flushed back into
//                onApply on commit; discarded on Cancel / outside close.

export const Filter = React.forwardRef<HTMLButtonElement, FilterProps>(
  function Filter(
    {
      label = 'Filters',
      options,
      selected,
      searchPlaceholder = 'Filter',
      disabled = false,
      onApply,
      onCancel,
      className,
    },
    ref
  ) {
    const prefix = usePrefix();
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const setTriggerRef = useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref]
    );

    const applied = selected ?? [];
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<string[]>(applied);

    // Chip hover popover — same affordance as MultiSelect. Hovering the chip
    // (only the chip, not the surrounding trigger) opens a flyout-styled
    // panel listing each applied option with a per-item remove. Removal
    // commits immediately because the chip shows the *applied* set, not the
    // draft — the user is editing what they already filtered by.
    const [chipPopoverOpen, setChipPopoverOpen] = useState(false);
    const closeTimerRef = useRef<number | null>(null);
    const cancelChipClose = useCallback(() => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }, []);
    const scheduleChipClose = useCallback(() => {
      cancelChipClose();
      closeTimerRef.current = window.setTimeout(() => setChipPopoverOpen(false), 180);
    }, [cancelChipClose]);
    useEffect(() => () => cancelChipClose(), [cancelChipClose]);

    const removeApplied = useCallback(
      (value: string) => {
        const next = applied.filter((v) => v !== value);
        onApply?.(next);
        if (next.length === 0) setChipPopoverOpen(false);
      },
      [applied, onApply]
    );

    // Whenever the panel opens, reset the draft from the committed set.
    useEffect(() => {
      if (open) setDraft(applied);
      // We intentionally don't depend on `applied` — opening is the trigger.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleOpenChange = useCallback(
      (next: boolean) => {
        if (!next && open) {
          // Closing without explicit Apply = Cancel semantics.
          onCancel?.();
        }
        setOpen(next);
      },
      [open, onCancel]
    );

    const apply = useCallback(() => {
      onApply?.(draft);
      setOpen(false);
    }, [draft, onApply]);

    const cancel = useCallback(() => {
      onCancel?.();
      setOpen(false);
    }, [onCancel]);

    const labelFor = useCallback(
      (value: string) => options.find((o) => o.value === value)?.label ?? value,
      [options]
    );

    const triggerClasses = classNames(
      `${prefix}--filter`,
      {
        [`${prefix}--filter--open`]: open,
        [`${prefix}--filter--disabled`]: disabled,
      },
      className
    );

    return (
      <>
        <span className={`${prefix}--filter__wrapper`}>
          <button
            ref={setTriggerRef}
            type="button"
            className={triggerClasses}
            aria-haspopup="listbox"
            aria-expanded={open}
            disabled={disabled}
            onClick={() => setOpen((v) => !v)}>
            <span className={`${prefix}--filter__label`}>{label}</span>
            {applied.length > 0 && (
              <span
                className={`${prefix}--filter__values`}
                aria-label={`${applied.length} filter${applied.length === 1 ? '' : 's'} applied`}>
                {/* Single chip — label when 1 applied, count when 2+. The
                    trigger refuses to expand with selections; the applied set
                    is enumerated in the flyout body and the chip hover
                    popover, not in the trigger. Hover-target wraps only the
                    chip so the popover doesn't fire when the cursor merely
                    crosses the trigger. */}
                <span
                  className={`${prefix}--filter__chip-target`}
                  onMouseEnter={() => {
                    cancelChipClose();
                    setChipPopoverOpen(true);
                  }}
                  onMouseLeave={scheduleChipClose}>
                  <Tags
                    label={
                      applied.length === 1
                        ? labelFor(applied[0])
                        : String(applied.length)
                    }
                    color="neutral"
                    contrast="high"
                    size="default"
                    shape="rounded"
                  />
                </span>
              </span>
            )}
            <span className={`${prefix}--filter__chevron`} aria-hidden="true">
              {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {/* Chip hover popover — flyout-styled list of applied items with
              per-item remove. Suppressed when the main flyout is open to
              avoid two stacked panels. */}
          {applied.length > 0 && chipPopoverOpen && !open && !disabled && (
            <div
              className={`${prefix}--filter__chip-popover`}
              role="dialog"
              aria-label="Applied filters"
              onMouseEnter={cancelChipClose}
              onMouseLeave={scheduleChipClose}>
              {applied.map((value) => (
                <div key={value} className={`${prefix}--filter__chip-popover-row`}>
                  <span className={`${prefix}--filter__chip-popover-label`}>
                    {labelFor(value)}
                  </span>
                  <IconButton
                    kind="ghost"
                    size="sm"
                    iconSize={16}
                    renderIcon={X}
                    aria-label={`Remove ${labelFor(value)}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeApplied(value);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </span>

        <Flyout
          open={open}
          onOpenChange={handleOpenChange}
          anchorRef={triggerRef}
          mode="multiple"
          selected={draft}
          onSelectionChange={setDraft}
          placement="bottom-start">
          <FlyoutFilter placeholder={searchPlaceholder} />
          <FlyoutList>
            {options.map((opt) => (
              <FlyoutItem key={opt.value} value={opt.value}>
                {opt.label}
              </FlyoutItem>
            ))}
          </FlyoutList>
          <FlyoutFooter>
            <div className={`${prefix}--filter__footer-actions`}>
              <Button kind="ghost" size="small" onClick={cancel}>
                Cancel
              </Button>
              <Button kind="primary" size="small" onClick={apply}>
                Apply
              </Button>
            </div>
          </FlyoutFooter>
        </Flyout>
      </>
    );
  }
);

Filter.displayName = 'Filter';

Filter.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  searchPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string,
};

export default Filter;
