import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const CheckboxStatuses = ['checked', 'unchecked', 'indeterminate'] as const;
export type CheckboxStatus = (typeof CheckboxStatuses)[number];

const CHECKED_PATH =
  'M26 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V6C28 5.46957 27.7893 4.96086 27.4142 4.58579C27.0391 4.21071 26.5304 4 26 4ZM14 21.5L9 16.5427L10.5908 15L14 18.3456L21.4087 11L23.0005 12.5772L14 21.5Z';

const INDETERMINATE_PATH =
  'M26 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V6C28 5.46957 27.7893 4.96086 27.4142 4.58579C27.0391 4.21071 26.5304 4 26 4ZM22 18H10V14H22V18Z';

const UNCHECKED_PATH =
  'M26 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V6C28 5.46957 27.7893 4.96086 27.4142 4.58579C27.0391 4.21071 26.5304 4 26 4ZM6 26V6H26V26H6Z';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'checked'> {
  /** Visual check state. Controlled. */
  status?: CheckboxStatus;
  /** Disabled. */
  disabled?: boolean;
  /** Label text. Pass empty string to render without a visible label. */
  label?: string;
  /** Fired when the user toggles the checkbox. */
  onChange?: (next: CheckboxStatus, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional name. */
  name?: string;
  /** Optional value. */
  value?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    status = 'unchecked',
    disabled = false,
    label = 'Checkbox Label',
    onChange,
    name,
    value,
    className,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const innerRef = useRef<HTMLInputElement>(null);

  // Forward to consumer ref while keeping our local ref for indeterminate sync.
  useEffect(() => {
    if (typeof ref === 'function') ref(innerRef.current);
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = innerRef.current;
  }, [ref]);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = status === 'indeterminate';
    }
  }, [status]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !onChange) return;
    onChange(status === 'unchecked' ? 'checked' : 'unchecked', event);
  };

  const rootClasses = classNames(
    `${prefix}--checkbox-root`,
    { [`${prefix}--checkbox-root--disabled`]: disabled },
    className
  );

  const iconClasses = classNames(
    `${prefix}--checkbox-icon`,
    `${prefix}--checkbox-icon--${status}`,
    { [`${prefix}--checkbox-icon--disabled`]: disabled }
  );

  const path =
    status === 'checked'
      ? CHECKED_PATH
      : status === 'indeterminate'
      ? INDETERMINATE_PATH
      : UNCHECKED_PATH;

  return (
    <label className={rootClasses} data-status={status}>
      <input
        ref={innerRef}
        type="checkbox"
        className={`${prefix}--checkbox-input`}
        checked={status === 'checked'}
        disabled={disabled}
        onChange={handleChange}
        aria-checked={status === 'indeterminate' ? 'mixed' : status === 'checked'}
        name={name}
        value={value}
        {...rest}
      />
      <span className={iconClasses}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true">
          <path d={path} fill="currentColor" />
        </svg>
      </span>
      {label && <span className={`${prefix}--checkbox-label`}>{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  status: PropTypes.oneOf(CheckboxStatuses),
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Checkbox;
