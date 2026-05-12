import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Check, ChevronDown, ChevronUp, Close } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const ChipSizes = ['default', 'small'] as const;
export type ChipSize = (typeof ChipSizes)[number];

export const ChipThemes = ['light', 'dark'] as const;
export type ChipTheme = (typeof ChipThemes)[number];

export const ChipDropdownDirections = ['down', 'up'] as const;
export type ChipDropdownDirection = (typeof ChipDropdownDirections)[number];

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Text label inside the chip. */
  label?: string;
  /** Size variant. */
  size?: ChipSize;
  /** Theme — `light` (default) or `dark` background context. */
  theme?: ChipTheme;
  /** Show leading checkmark icon. */
  icon?: boolean;
  /** Show leading image avatar. */
  image?: boolean;
  /** Image src when `image=true`. */
  imageSrc?: string;
  /** Image alt text. */
  imageAlt?: string;
  /** Show trailing close/dismiss icon. */
  closeable?: boolean;
  /** Show trailing dropdown chevron icon. */
  dropdown?: boolean;
  /** Direction for the dropdown chevron. */
  dropdownDirection?: ChipDropdownDirection;
  /** Active/selected state — filled background with inverted colors. */
  active?: boolean;
  /** Disabled state — muted colors and no interaction. */
  disabled?: boolean;
  /** Click handler for the chip body. */
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /** Close icon click handler. */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Override the leading icon component (defaults to DS `Check`). */
  renderLeadingIcon?: React.ElementType;
  /** Override the close icon component (defaults to DS `Close`). */
  renderCloseIcon?: React.ElementType;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(function Chip(
  {
    label = 'Chip',
    size = 'default',
    theme = 'light',
    icon = false,
    image = false,
    imageSrc,
    imageAlt = '',
    closeable = true,
    dropdown = false,
    dropdownDirection = 'down',
    active = false,
    disabled = false,
    className,
    onClick,
    onClose,
    renderLeadingIcon: LeadingIconElement = Check,
    renderCloseIcon: CloseIconElement = Close,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const classes = classNames(
    `${prefix}--chip`,
    {
      [`${prefix}--chip--small`]: size === 'small',
      [`${prefix}--chip--dark`]: theme === 'dark',
      [`${prefix}--chip--active`]: active,
      [`${prefix}--chip--disabled`]: disabled,
      [`${prefix}--chip--has-leading-visual`]: icon || image,
    },
    className
  );

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled && onClose) onClose(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e);
    }
  };

  const Chevron = dropdownDirection === 'up' ? ChevronUp : ChevronDown;

  return (
    <div
      ref={ref}
      className={classes}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-pressed={active || undefined}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={handleKeyDown}
      {...rest}>
      {icon && !image && (
        <span className={`${prefix}--chip__icon`} aria-hidden="true">
          <LeadingIconElement size={16} />
        </span>
      )}
      {image && (
        <img
          className={`${prefix}--chip__image`}
          src={imageSrc || 'https://via.placeholder.com/16'}
          alt={imageAlt}
        />
      )}

      <span className={`${prefix}--chip__label`}>{label}</span>

      {closeable && !dropdown && (
        <button
          className={`${prefix}--chip__close`}
          type="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={`Remove ${label}`}
          onClick={handleClose}
          disabled={disabled}>
          <CloseIconElement size={16} />
        </button>
      )}

      {dropdown && (
        <span className={`${prefix}--chip__dropdown-icon`} aria-hidden="true">
          <Chevron size={16} />
        </span>
      )}
    </div>
  );
});

Chip.displayName = 'Chip';

Chip.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(ChipSizes),
  theme: PropTypes.oneOf(ChipThemes),
  icon: PropTypes.bool,
  image: PropTypes.bool,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  closeable: PropTypes.bool,
  dropdown: PropTypes.bool,
  dropdownDirection: PropTypes.oneOf(ChipDropdownDirections),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  renderLeadingIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  renderCloseIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Chip;
