import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Info } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const ToggleLabelPositions = ['left', 'right', 'top'] as const;
export type ToggleLabelPosition = (typeof ToggleLabelPositions)[number];

export const ToggleSizes = ['default', 'small'] as const;
export type ToggleSize = (typeof ToggleSizes)[number];

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'> {
  /** Whether the toggle is on. Controlled. */
  on?: boolean;
  /** Label text. Pass empty string or omit to hide. */
  label?: string;
  /** Show the info icon next to the label. */
  showInfo?: boolean;
  /** Show status text (Yes/No). */
  showStatus?: boolean;
  /** Custom on-status text. */
  onStatusText?: string;
  /** Custom off-status text. */
  offStatusText?: string;
  /** Label position relative to the track. */
  labelPosition?: ToggleLabelPosition;
  /** Toggle size. */
  size?: ToggleSize;
  /** Disabled state. */
  disabled?: boolean;
  /** Change callback. */
  onChange?: (on: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Override the info icon component (ElementType). Defaults to lucide `Info`. */
  renderInfoIcon?: React.ElementType;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    on = true,
    label = 'Toggle Label',
    showInfo = false,
    showStatus = true,
    onStatusText = 'Yes',
    offStatusText = 'No',
    labelPosition = 'left',
    size = 'default',
    disabled = false,
    onChange,
    renderInfoIcon: InfoIconElement = Info,
    className,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const isSmall = size === 'small';
  const isTop = labelPosition === 'top';

  const rootClasses = classNames(
    `${prefix}--toggle-root`,
    {
      [`${prefix}--toggle-root--top`]: isTop,
      [`${prefix}--toggle-root--disabled`]: disabled,
    },
    className
  );

  const trackClasses = classNames(`${prefix}--toggle-track`, {
    [`${prefix}--toggle-track--off`]: !on,
    [`${prefix}--toggle-track--small`]: isSmall,
  });

  const knobClasses = classNames(`${prefix}--toggle-knob`, {
    [`${prefix}--toggle-knob--small`]: isSmall,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !onChange) return;
    onChange(!on, event);
  };

  const labelEl = label ? <span className={`${prefix}--toggle-label`}>{label}</span> : null;
  const infoEl = showInfo ? (
    <span className={`${prefix}--toggle-info-icon`} aria-hidden="true">
      <InfoIconElement size={16} />
    </span>
  ) : null;
  const statusEl = showStatus ? (
    <span className={`${prefix}--toggle-status`}>{on ? onStatusText : offStatusText}</span>
  ) : null;
  const trackEl = (
    <span className={trackClasses}>
      <span className={knobClasses} />
    </span>
  );

  const inputEl = (
    <input
      ref={ref}
      type="checkbox"
      role="switch"
      className={`${prefix}--toggle-input`}
      checked={on}
      disabled={disabled}
      onChange={handleChange}
      {...rest}
    />
  );

  if (isTop) {
    return (
      <label className={rootClasses}>
        {inputEl}
        {(label || showInfo) && (
          <span className={`${prefix}--toggle-label-info-row`}>
            {labelEl}
            {infoEl}
          </span>
        )}
        <span className={`${prefix}--toggle-track-status-row`}>
          {trackEl}
          {statusEl}
        </span>
      </label>
    );
  }

  if (labelPosition === 'left') {
    return (
      <label className={rootClasses}>
        {inputEl}
        {labelEl}
        {infoEl}
        {trackEl}
        {statusEl}
      </label>
    );
  }

  return (
    <label className={rootClasses}>
      {inputEl}
      {statusEl}
      {trackEl}
      {labelEl}
      {infoEl}
    </label>
  );
});

Toggle.displayName = 'Toggle';

Toggle.propTypes = {
  on: PropTypes.bool,
  label: PropTypes.string,
  showInfo: PropTypes.bool,
  showStatus: PropTypes.bool,
  onStatusText: PropTypes.string,
  offStatusText: PropTypes.string,
  labelPosition: PropTypes.oneOf(ToggleLabelPositions),
  size: PropTypes.oneOf(ToggleSizes),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  renderInfoIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  className: PropTypes.string,
};

export default Toggle;
