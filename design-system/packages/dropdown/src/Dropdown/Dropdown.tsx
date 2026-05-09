import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const DropdownBackgrounds = ['grey10', 'grey00'] as const;
export type DropdownBackground = (typeof DropdownBackgrounds)[number];

export const DropdownSizes = ['small', 'default', 'large'] as const;
export type DropdownSize = (typeof DropdownSizes)[number];

export const DropdownStates = [
  'default',
  'hover',
  'onclick',
  'active',
  'error',
  'success',
  'disabled',
  'readonly',
] as const;
export type DropdownState = (typeof DropdownStates)[number];

export const DropdownValidations = ['error', 'success'] as const;
export type DropdownValidation = (typeof DropdownValidations)[number];

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  title?: string;
  showTitle?: boolean;
  placeholder?: string;
  description?: string;
  showDescription?: boolean;
  background?: DropdownBackground;
  size?: DropdownSize;
  selectedValue?: string;
  options?: DropdownOption[];
  disabled?: boolean;
  readOnly?: boolean;
  forceState?: DropdownState;
  /** Validation state — error or success swaps the field border family only. */
  validation?: DropdownValidation;
  onChange?: (value: string) => void;
  className?: string;
}

const DEFAULT_OPTIONS: DropdownOption[] = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
];

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  function Dropdown(
    {
      title = 'Title',
      showTitle = true,
      placeholder = 'Placeholder',
      description = 'Optional Description',
      showDescription = true,
      background = 'grey10',
      size = 'default',
      selectedValue,
      options = DEFAULT_OPTIONS,
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
    const [internal, setInternal] = useState<string | undefined>(selectedValue);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => setInternal(selectedValue), [selectedValue]);

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
        setInternal(value);
        setIsOpen(false);
        onChange?.(value);
      },
      [onChange]
    );

    let visualState: DropdownState = 'default';
    if (forceState) visualState = forceState;
    else if (disabled) visualState = 'disabled';
    else if (readOnly) visualState = 'readonly';
    else if (isOpen) visualState = 'active';
    else if (validation === 'error') visualState = 'error';
    else if (validation === 'success') visualState = 'success';

    const selectedLabel = options.find((o) => o.value === internal)?.label;

    const rootClass = classNames(
      `${prefix}--dropdown`,
      `${prefix}--dropdown--state-${visualState}`,
      {
        [`${prefix}--dropdown--bg-grey00`]: background === 'grey00',
        [`${prefix}--dropdown--size-small`]: size === 'small',
        [`${prefix}--dropdown--size-large`]: size === 'large',
      },
      className
    );

    return (
      <div ref={ref} className={rootClass}>
        {showTitle && (
          <div className={`${prefix}--dropdown__title-container`}>
            <span className={`${prefix}--dropdown__title`}>{title}</span>
          </div>
        )}

        <div className={`${prefix}--dropdown__wrapper`} ref={wrapperRef}>
          <div
            className={`${prefix}--dropdown__text-container`}
            onClick={toggle}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-disabled={disabled}
            tabIndex={disabled || readOnly ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
              }
            }}>
            {!selectedLabel ? (
              <span className={`${prefix}--dropdown__placeholder`}>{placeholder}</span>
            ) : (
              <span className={`${prefix}--dropdown__value`}>{selectedLabel}</span>
            )}
            <span className={`${prefix}--dropdown__chevron`} aria-hidden="true">
              {visualState === 'active' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </div>

          {isOpen && !disabled && !readOnly && (
            <div className={`${prefix}--dropdown__menu`} role="listbox">
              {options.map((opt) => {
                const selected = opt.value === internal;
                return (
                  <div
                    key={opt.value}
                    className={classNames(`${prefix}--dropdown__menu-item`, {
                      [`${prefix}--dropdown__menu-item--selected`]: selected,
                    })}
                    role="option"
                    aria-selected={selected}
                    onClick={() => select(opt.value)}>
                    {opt.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {showDescription && (
          <div className={`${prefix}--dropdown__description-container`}>
            <span className={`${prefix}--dropdown__description`}>{description}</span>
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  title: PropTypes.string,
  showTitle: PropTypes.bool,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  showDescription: PropTypes.bool,
  background: PropTypes.oneOf(DropdownBackgrounds),
  size: PropTypes.oneOf(DropdownSizes),
  selectedValue: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  forceState: PropTypes.oneOf(DropdownStates),
  validation: PropTypes.oneOf(DropdownValidations),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Dropdown;
