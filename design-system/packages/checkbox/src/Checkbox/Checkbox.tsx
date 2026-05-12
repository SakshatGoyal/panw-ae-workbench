import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CheckboxFilled, CheckboxIndeterminate, CheckboxEmpty } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const CheckboxStatuses = ['checked', 'unchecked', 'indeterminate'] as const;
export type CheckboxStatus = (typeof CheckboxStatuses)[number];

const STATUS_ICON: Record<CheckboxStatus, React.ElementType> = {
  checked: CheckboxFilled,
  indeterminate: CheckboxIndeterminate,
  unchecked: CheckboxEmpty,
};

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

  const IconElement = STATUS_ICON[status];

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
        <IconElement size={16} aria-hidden="true" />
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
