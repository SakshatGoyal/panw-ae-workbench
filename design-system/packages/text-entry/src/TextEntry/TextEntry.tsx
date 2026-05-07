import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { X } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { IconButton } from '@ds/button';

export const TextEntryStates = [
  'default',
  'hover',
  'onclick',
  'active',
  'error',
  'success',
  'readonly',
  'disabled',
] as const;
export type TextEntryState = (typeof TextEntryStates)[number];

export const TextEntryValidations = ['error', 'success'] as const;
export type TextEntryValidation = (typeof TextEntryValidations)[number];

export const TextEntryBackgrounds = ['grey-00', 'grey-10'] as const;
export type TextEntryBackground = (typeof TextEntryBackgrounds)[number];

export const TextEntrySizes = ['small', 'default', 'large'] as const;
export type TextEntrySize = (typeof TextEntrySizes)[number];

export const TextEntryTypes = ['default', 'area'] as const;
export type TextEntryType = (typeof TextEntryTypes)[number];

type SharedInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'value' | 'defaultValue' | 'onChange'
>;

export interface TextEntryProps extends SharedInputProps {
  /** Visual prominence level — bg routes through field.* / field.alt.* */
  background?: TextEntryBackground;
  /** Size variant */
  size?: TextEntrySize;
  /** Single-line input (`default`) or multi-line textarea (`area`). */
  inputType?: TextEntryType;
  title?: React.ReactNode;
  showTitle?: boolean;
  description?: React.ReactNode;
  showDescription?: boolean;
  value?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClear?: () => void;
  /** Validation state — error or success swaps the field border family only. */
  validation?: TextEntryValidation;
  /** Force a visual state for snapshot/All-Variants stories. */
  forceState?: TextEntryState;
  className?: string;
}

export const TextEntry = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextEntryProps
>(function TextEntry(
  {
    background = 'grey-10',
    size = 'default',
    inputType = 'default',
    title = 'Title',
    showTitle = true,
    description = 'Optional Description',
    showDescription = true,
    value: controlledValue,
    onChange,
    onClear,
    placeholder = 'Placeholder',
    disabled,
    readOnly,
    validation,
    forceState,
    className,
    onFocus,
    onBlur,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const [internal, setInternal] = useState('');
  const [focused, setFocused] = useState(false);
  const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const isControlled = controlledValue !== undefined;
  const current = isControlled ? controlledValue : internal;

  let visualState: TextEntryState = 'default';
  if (forceState) visualState = forceState;
  else if (disabled) visualState = 'disabled';
  else if (readOnly) visualState = 'readonly';
  else if (focused || (current?.length ?? 0) > 0) visualState = 'active';
  else if (validation === 'error') visualState = 'error';
  else if (validation === 'success') visualState = 'success';

  const setRef = useCallback(
    (node: HTMLInputElement | HTMLTextAreaElement | null) => {
      (fieldRef as React.MutableRefObject<typeof node>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<typeof node>).current = node;
    },
    [ref]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isControlled) setInternal(e.target.value);
    onChange?.(e.target.value, e);
  };

  const handleClear = () => {
    if (!isControlled) setInternal('');
    onClear?.();
    fieldRef.current?.focus();
  };

  const rootClass = classNames(
    `${prefix}--text-entry`,
    `${prefix}--text-entry--${background}`,
    `${prefix}--text-entry--${size}`,
    `${prefix}--text-entry--type-${inputType}`,
    `${prefix}--text-entry--state-${visualState}`,
    className
  );

  const isActive = visualState === 'active' || forceState === 'active';

  const fieldCommon = {
    ref: setRef as never,
    className: `${prefix}--text-entry__input`,
    placeholder,
    disabled: disabled || forceState === 'disabled',
    readOnly: readOnly || forceState === 'readonly',
    value: current ?? '',
    onChange: handleChange,
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(true);
      onFocus?.(e as never);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(e as never);
    },
    'aria-label': typeof title === 'string' ? title : 'Text entry',
  };

  return (
    <div className={rootClass}>
      {showTitle && (
        <div className={`${prefix}--text-entry__title-row`}>
          <label className={`${prefix}--text-entry__title`}>{title}</label>
        </div>
      )}

      <div className={`${prefix}--text-entry__field`}>
        {inputType === 'area' ? (
          <textarea {...fieldCommon} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
        ) : (
          <input type="text" {...fieldCommon} {...rest} />
        )}
        {isActive && (current?.length ?? 0) > 0 && (
          <span className={`${prefix}--text-entry__clear`}>
            <IconButton
              kind="ghost"
              size="field"
              iconSize={16}
              renderIcon={X}
              aria-label="Clear text"
              onClick={handleClear}
              tabIndex={-1}
            />
          </span>
        )}
      </div>

      {showDescription && (
        <div className={`${prefix}--text-entry__description-row`}>
          <span className={`${prefix}--text-entry__description`}>{description}</span>
        </div>
      )}
    </div>
  );
});

TextEntry.displayName = 'TextEntry';

TextEntry.propTypes = {
  background: PropTypes.oneOf(TextEntryBackgrounds),
  size: PropTypes.oneOf(TextEntrySizes),
  inputType: PropTypes.oneOf(TextEntryTypes),
  title: PropTypes.node,
  showTitle: PropTypes.bool,
  description: PropTypes.node,
  showDescription: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  validation: PropTypes.oneOf(TextEntryValidations),
  forceState: PropTypes.oneOf(TextEntryStates),
  className: PropTypes.string,
};

export default TextEntry;
