import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../internal/usePrefix';

// ─── Kind / Size / IconSize enumerations ─────────────────────────────────────

/**
 * IconButton preserves a brand-vs-neutral split — at icon size, the kind
 * name doesn't carry color intent (the glyph does), so explicit ghost vs
 * ghost-accent stays. Five kinds total, mirroring text Button minus
 * `tertiary` (a bordered chip doesn't fit a ~32px square) and minus
 * `secondary` text-button (the neutral-filled IconButton is named to match
 * how it's used).
 */
export const IconButtonKinds = [
  'ghost',
  'ghost-accent',
  'primary',
  'secondary',
  'danger',
] as const;

export type IconButtonKind = (typeof IconButtonKinds)[number];

/**
 * sm=32px, md=40px, lg=48px (padding-based; icon dimensions controlled by iconSize).
 * `field` is a tighter 24px variant intended for in-field affordances — search
 * clear, text-entry clear, number-input steppers. It pairs with ghost.field
 * ground per Stage's "ghost.field replaces a field when adding another grey
 * layer would over-crowd the parent" rule. The 4px padding around a 16px glyph
 * keeps geometry stable inside 32–48px field rows.
 */
export const IconButtonSizes = ['field', 'sm', 'md', 'lg'] as const;

export type IconButtonSize = (typeof IconButtonSizes)[number];

/** Icon pixel dimensions. PANW extension — Carbon does not have this axis. */
export const IconButtonIconSizes = [16, 20] as const;

export type IconButtonIconSize = (typeof IconButtonIconSizes)[number];

// ─── Props interface ──────────────────────────────────────────────────────────

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon component to render. Carbon convention: ElementType, not ReactNode. */
  renderIcon: React.ElementType;
  /** Accessible label — required since there is no visible text. */
  'aria-label': string;
  /** Visual style variant */
  kind?: IconButtonKind;
  /** Button size */
  size?: IconButtonSize;
  /** Icon dimensions in pixels. */
  iconSize?: IconButtonIconSize;
  /** Whether the button is in a selected state (ghost / ghost-accent only). */
  isSelected?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      'aria-label': ariaLabel,
      className,
      disabled = false,
      iconSize = 16,
      isSelected = false,
      kind = 'ghost',
      renderIcon: IconElement,
      size = 'sm',
      type = 'button',
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();

    const supportsSelected = kind === 'ghost' || kind === 'ghost-accent';

    const buttonClasses = classNames(className, {
      [`${prefix}--btn-icon`]: true,
      [`${prefix}--btn-icon--${kind}`]: kind,
      [`${prefix}--btn-icon--${size}`]: size,
      [`${prefix}--btn-icon--selected`]: isSelected && supportsSelected,
      [`${prefix}--btn-icon--disabled`]: disabled,
    });

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-pressed={isSelected && supportsSelected ? isSelected : undefined}
      >
        <span
          className={`${prefix}--btn-icon__icon ${prefix}--btn-icon__icon--${iconSize}`}
          aria-hidden="true"
        >
          <IconElement />
        </span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  iconSize: PropTypes.oneOf([16, 20] as const),
  isSelected: PropTypes.bool,
  kind: PropTypes.oneOf(IconButtonKinds),
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  size: PropTypes.oneOf(IconButtonSizes),
  type: PropTypes.oneOf(['button', 'reset', 'submit'] as const),
};

export { IconButton };
export default IconButton;
