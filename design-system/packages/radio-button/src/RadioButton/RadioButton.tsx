import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

const RING_PATH =
  'M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM16 28C13.6266 28 11.3066 27.2962 9.33316 25.9776C7.35977 24.6591 5.8217 22.7849 4.91345 20.5922C4.0052 18.3995 3.76756 15.9867 4.23058 13.6589C4.69361 11.3311 5.83649 9.19295 7.51472 7.51472C9.19296 5.83649 11.3312 4.6936 13.6589 4.23058C15.9867 3.76755 18.3995 4.00519 20.5922 4.91345C22.7849 5.8217 24.6591 7.35977 25.9776 9.33316C27.2962 11.3065 28 13.6266 28 16C28 19.1826 26.7357 22.2348 24.4853 24.4853C22.2348 26.7357 19.1826 28 16 28Z';

const DOT_PATH =
  'M16 10C14.8133 10 13.6533 10.3519 12.6666 11.0112C11.6799 11.6705 10.9109 12.6075 10.4567 13.7039C10.0026 14.8003 9.88378 16.0067 10.1153 17.1705C10.3468 18.3344 10.9182 19.4035 11.7574 20.2426C12.5965 21.0818 13.6656 21.6532 14.8295 21.8847C15.9933 22.1162 17.1997 21.9974 18.2961 21.5433C19.3925 21.0892 20.3295 20.3201 20.9888 19.3334C21.6481 18.3467 22 17.1867 22 16C22 14.4087 21.3679 12.8826 20.2426 11.7574C19.1174 10.6321 17.5913 10 16 10Z';

export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /** Whether the radio is selected. Controlled. */
  checked?: boolean;
  /** Disables interaction and applies muted colors. */
  disabled?: boolean;
  /** Label text rendered next to the radio. */
  label?: string;
  /** Fired when the user toggles the radio. */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional name attribute for grouping radios into a single field. */
  name?: string;
  /** Optional value attribute for the underlying input. */
  value?: string;
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  function RadioButton(
    {
      checked = false,
      disabled = false,
      label = 'Radio Button Label',
      onChange,
      name,
      value,
      className,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || !onChange) return;
      onChange(!checked, event);
    };

    const showDot = checked || disabled;

    const rootClasses = classNames(
      `${prefix}--radio-button`,
      {
        [`${prefix}--radio-button--disabled`]: disabled,
      },
      className
    );

    return (
      <label className={rootClasses} data-checked={checked}>
        <input
          ref={ref}
          type="radio"
          className={`${prefix}--radio-button__input`}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          name={name}
          value={value}
          {...rest}
        />
        <span className={`${prefix}--radio-button__icon-wrap`}>
          <svg
            className={`${prefix}--rb-icon`}
            width="16"
            height="16"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true">
            <path className={`${prefix}--rb-ring`} d={RING_PATH} />
            {showDot && <path className={`${prefix}--rb-dot`} d={DOT_PATH} />}
          </svg>
        </span>
        {label && <span className={`${prefix}--radio-button__label`}>{label}</span>}
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';

RadioButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default RadioButton;
