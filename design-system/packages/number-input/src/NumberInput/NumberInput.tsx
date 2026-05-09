import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Plus, Minus } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { IconButton } from '@ds/button';

export const NumberInputBackgrounds = ['grey-00', 'grey-10'] as const;
export type NumberInputBackground = (typeof NumberInputBackgrounds)[number];

export const NumberInputForceStates = ['active', 'error', 'success', 'disabled'] as const;
export type NumberInputForceState = (typeof NumberInputForceStates)[number];

export const NumberInputValidations = ['error', 'success'] as const;
export type NumberInputValidation = (typeof NumberInputValidations)[number];

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'value' | 'defaultValue'
  > {
  background?: NumberInputBackground;
  title?: React.ReactNode;
  showTitle?: boolean;
  description?: React.ReactNode;
  showDescription?: boolean;
  value?: number;
  onChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  forceState?: NumberInputForceState | null;
  /** Validation state — error or success swaps the field border family only. */
  validation?: NumberInputValidation;
  className?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      background = 'grey-00',
      title = 'Title',
      showTitle = true,
      description = 'Optional Description',
      showDescription = true,
      value = 10,
      onChange,
      step = 1,
      min = -Infinity,
      max = Infinity,
      disabled,
      forceState = null,
      validation,
      className,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();
    const isDisabled = disabled || forceState === 'disabled';
    const isActive = forceState === 'active';
    const isError = forceState === 'error' || (validation === 'error' && !isActive && !isDisabled);
    const isSuccess = forceState === 'success' || (validation === 'success' && !isActive && !isDisabled);

    const decrement = useCallback(() => {
      if (isDisabled) return;
      onChange?.(Math.max(min, (value ?? 0) - step));
    }, [isDisabled, min, value, step, onChange]);

    const increment = useCallback(() => {
      if (isDisabled) return;
      onChange?.(Math.min(max, (value ?? 0) + step));
    }, [isDisabled, max, value, step, onChange]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsed = parseFloat(e.target.value);
        if (!isNaN(parsed)) {
          onChange?.(Math.min(max, Math.max(min, parsed)));
        }
      },
      [min, max, onChange]
    );

    const rootClass = classNames(
      `${prefix}--number-input`,
      `${prefix}--number-input--${background}`,
      {
        [`${prefix}--number-input--active`]: isActive,
        [`${prefix}--number-input--error`]: isError,
        [`${prefix}--number-input--success`]: isSuccess,
        [`${prefix}--number-input--disabled`]: isDisabled,
      },
      className
    );

    return (
      <div className={rootClass}>
        {showTitle && (
          <div className={`${prefix}--number-input__title-row`}>
            <label className={`${prefix}--number-input__title`}>{title}</label>
          </div>
        )}

        <div className={`${prefix}--number-input__field`}>
          <input
            ref={ref}
            type="number"
            className={`${prefix}--number-input__value`}
            value={value}
            onChange={handleInputChange}
            disabled={isDisabled}
            step={step}
            min={min === -Infinity ? undefined : min}
            max={max === Infinity ? undefined : max}
            aria-label={typeof title === 'string' ? title : 'Number input'}
            {...rest}
          />
          <IconButton
            kind="ghost"
            size="md"
            iconSize={16}
            renderIcon={Minus}
            aria-label="Decrease value"
            onClick={decrement}
            disabled={isDisabled}
          />
          <IconButton
            kind="ghost"
            size="md"
            iconSize={16}
            renderIcon={Plus}
            aria-label="Increase value"
            onClick={increment}
            disabled={isDisabled}
          />
        </div>

        {showDescription && (
          <div className={`${prefix}--number-input__description-row`}>
            <span className={`${prefix}--number-input__description`}>{description}</span>
          </div>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';

NumberInput.propTypes = {
  background: PropTypes.oneOf(NumberInputBackgrounds),
  title: PropTypes.node,
  showTitle: PropTypes.bool,
  description: PropTypes.node,
  showDescription: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  forceState: PropTypes.oneOf([...NumberInputForceStates, null]),
  validation: PropTypes.oneOf(NumberInputValidations),
  className: PropTypes.string,
};

export default NumberInput;
