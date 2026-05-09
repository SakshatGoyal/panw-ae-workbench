import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronDown, ChevronUp, Close as X } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { IconButton } from '@ds/button';
import { Tags } from '@ds/tags';
import { Checkbox } from '@ds/checkbox';

export const MultiSelectBackgrounds = ['grey10', 'grey00'] as const;
export type MultiSelectBackground = (typeof MultiSelectBackgrounds)[number];

export const MultiSelectSizes = ['default', 'large'] as const;
export type MultiSelectSize = (typeof MultiSelectSizes)[number];

export const MultiSelectStates = [
  'default',
  'hover',
  'onclick',
  'active',
  'error',
  'success',
  'disabled',
  'readonly',
] as const;
export type MultiSelectState = (typeof MultiSelectStates)[number];

export const MultiSelectValidations = ['error', 'success'] as const;
export type MultiSelectValidation = (typeof MultiSelectValidations)[number];

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  title?: string;
  showTitle?: boolean;
  placeholder?: string;
  description?: string;
  showDescription?: boolean;
  background?: MultiSelectBackground;
  size?: MultiSelectSize;
  selectedValues?: string[];
  options?: MultiSelectOption[];
  /** Number of chip-tags to show inline before collapsing into a +N badge. */
  visibleChipCount?: number;
  disabled?: boolean;
  readOnly?: boolean;
  forceState?: MultiSelectState;
  /** Validation state — error or success swaps the field border family only. */
  validation?: MultiSelectValidation;
  onChange?: (values: string[]) => void;
  className?: string;
}

const DEFAULT_OPTIONS: MultiSelectOption[] = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
];

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  function MultiSelect(
    {
      title = 'Title',
      showTitle = true,
      placeholder = 'Placeholder',
      description = 'Optional Description',
      showDescription = true,
      background = 'grey10',
      size = 'default',
      selectedValues,
      options = DEFAULT_OPTIONS,
      visibleChipCount = 2,
      disabled = false,
      readOnly = false,
      forceState,
      validation,
      onChange,
      className,
    },
    ref
  ) {
    const prefix = usePrefix();
    const [isOpen, setIsOpen] = useState(false);
    const [internal, setInternal] = useState<string[]>(selectedValues ?? []);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Hover popover state for the selection chip. Small close-delay so the
    // user can move from chip → popover without the panel disappearing.
    const [chipPopoverOpen, setChipPopoverOpen] = useState(false);
    const closeTimerRef = useRef<number | null>(null);
    const cancelClose = useCallback(() => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }, []);
    const scheduleClose = useCallback(() => {
      cancelClose();
      closeTimerRef.current = window.setTimeout(() => setChipPopoverOpen(false), 180);
    }, [cancelClose]);
    useEffect(() => () => cancelClose(), [cancelClose]);

    useEffect(() => {
      if (!selectedValues) return;
      setInternal((prev) => {
        if (prev.length !== selectedValues.length) return selectedValues;
        for (let i = 0; i < prev.length; i++) {
          if (prev[i] !== selectedValues[i]) return selectedValues;
        }
        return prev;
      });
    }, [selectedValues]);

    useEffect(() => {
      function onClickOutside(e: MouseEvent) {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      }
      document.addEventListener('mousedown', onClickOutside);
      return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    const toggle = useCallback(() => {
      if (disabled || readOnly) return;
      setIsOpen((v) => !v);
    }, [disabled, readOnly]);

    const select = useCallback(
      (value: string) => {
        const next = internal.includes(value)
          ? internal.filter((v) => v !== value)
          : [...internal, value];
        setInternal(next);
        onChange?.(next);
      },
      [internal, onChange]
    );

    const removeOne = useCallback(
      (value: string) => {
        const next = internal.filter((v) => v !== value);
        setInternal(next);
        onChange?.(next);
        if (next.length === 0) setChipPopoverOpen(false);
      },
      [internal, onChange]
    );

    const clearAll = useCallback(() => {
      setInternal([]);
      onChange?.([]);
      setChipPopoverOpen(false);
    }, [onChange]);

    let visualState: MultiSelectState = 'default';
    if (forceState) visualState = forceState;
    else if (disabled) visualState = 'disabled';
    else if (readOnly) visualState = 'readonly';
    else if (isOpen) visualState = 'active';
    else if (validation === 'error') visualState = 'error';
    else if (validation === 'success') visualState = 'success';

    const selectedLabels = internal.map(
      (v) => options.find((o) => o.value === v)?.label ?? v
    );
    const hasValues = selectedLabels.length > 0;

    const rootClass = classNames(
      `${prefix}--multi-select`,
      `${prefix}--multi-select--state-${visualState}`,
      {
        [`${prefix}--multi-select--bg-grey00`]: background === 'grey00',
        [`${prefix}--multi-select--size-large`]: size === 'large',
      },
      className
    );

    return (
      <div ref={ref} className={rootClass}>
        {showTitle && (
          <div className={`${prefix}--multi-select__title-container`}>
            <span className={`${prefix}--multi-select__title`}>{title}</span>
          </div>
        )}

        <div className={`${prefix}--multi-select__wrapper`} ref={wrapperRef}>
          <div
            className={`${prefix}--multi-select__text-container`}
            onClick={toggle}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-multiselectable="true"
            aria-disabled={disabled}
            tabIndex={disabled || readOnly ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
              }
            }}>
            {!hasValues ? (
              <span className={`${prefix}--multi-select__placeholder`}>{placeholder}</span>
            ) : (
              <div className={`${prefix}--multi-select__values-row`}>
                {/* Hover-target wrapper — ONLY the chip itself opens the
                    selected-items popover. Hovering the surrounding field
                    row must not trigger it. The wrapper hugs the chip via
                    inline-flex so the hover region matches the visible
                    pixels. The chip owns its own X (which clears one or
                    all via stopPropagation) so the field-row click that
                    opens the main menu still works elsewhere. */}
                <span
                  className={`${prefix}--multi-select__chip-target`}
                  onMouseEnter={() => {
                    cancelClose();
                    setChipPopoverOpen(true);
                  }}
                  onMouseLeave={scheduleClose}>
                  <Tags
                    label={
                      selectedLabels.length === 1
                        ? selectedLabels[0]
                        : `${selectedLabels.length} selected`
                    }
                    color="neutral"
                    contrast="high"
                    size="default"
                    close
                    onClose={(e) => {
                      e.stopPropagation();
                      if (selectedLabels.length === 1) {
                        removeOne(internal[0]);
                      } else {
                        clearAll();
                      }
                    }}
                  />
                </span>
              </div>
            )}
            <span className={`${prefix}--multi-select__chevron`} aria-hidden="true">
              {visualState === 'active' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </div>

          {/* Hover popover — flyout-styled list of currently-selected items,
              each with a per-item remove. Shown when the chip is hovered and
              there is at least one selection. Suppressed when the main menu
              is already open to avoid two stacked panels. */}
          {hasValues && chipPopoverOpen && !isOpen && !disabled && !readOnly && (
            <div
              className={`${prefix}--multi-select__chip-popover`}
              role="dialog"
              aria-label="Selected items"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}>
              {internal.map((value) => {
                const label = options.find((o) => o.value === value)?.label ?? value;
                return (
                  <div key={value} className={`${prefix}--multi-select__chip-popover-row`}>
                    <span className={`${prefix}--multi-select__chip-popover-label`}>
                      {label}
                    </span>
                    <IconButton
                      kind="ghost"
                      size="sm"
                      iconSize={16}
                      renderIcon={X}
                      aria-label={`Remove ${label}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeOne(value);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {isOpen && !disabled && !readOnly && (
            <div className={`${prefix}--multi-select__menu`} role="listbox">
              {options.map((opt) => {
                const selected = internal.includes(opt.value);
                return (
                  <div
                    key={opt.value}
                    className={classNames(`${prefix}--multi-select__menu-item`, {
                      [`${prefix}--multi-select__menu-item--selected`]: selected,
                    })}
                    role="option"
                    aria-selected={selected}
                    onClick={() => select(opt.value)}>
                    {/* Presentational checkbox — the row owns the click.
                        pointer-events:none keeps the input from firing a
                        second change event; aria-hidden hands a11y to the
                        row's aria-selected. */}
                    <span
                      aria-hidden="true"
                      style={{ pointerEvents: 'none', display: 'inline-flex' }}>
                      <Checkbox
                        status={selected ? 'checked' : 'unchecked'}
                        label=""
                        tabIndex={-1}
                      />
                    </span>
                    {opt.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {showDescription && (
          <div className={`${prefix}--multi-select__description-container`}>
            <span className={`${prefix}--multi-select__description`}>{description}</span>
          </div>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

MultiSelect.propTypes = {
  title: PropTypes.string,
  showTitle: PropTypes.bool,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  showDescription: PropTypes.bool,
  background: PropTypes.oneOf(MultiSelectBackgrounds),
  size: PropTypes.oneOf(MultiSelectSizes),
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.array,
  visibleChipCount: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  forceState: PropTypes.oneOf(MultiSelectStates),
  validation: PropTypes.oneOf(MultiSelectValidations),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default MultiSelect;
