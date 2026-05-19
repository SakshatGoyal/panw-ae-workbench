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
  'highlight',
] as const;

export type IconButtonKind = (typeof IconButtonKinds)[number];

/**
 * Locked square dimensions per size × iconSize:
 *   xs + 16 → 28×28   (icon-20 not offered — only 4px clearance)
 *   sm + 16 → 32×32   md + 16 → 40×40   lg + 16 → 48×48
 *   sm + 20 → 36×36   md + 20 → 44×44   lg + 20 → 52×52
 *
 * The button refuses to flex-grow or grid-stretch — the chip is square
 * by contract, not by intrinsic content sizing.
 *
 * In-field affordance pattern: pair the IconButton size with the field's
 * own size so the button fills the field row height — number-input is the
 * source of truth (md steppers inside a 40px field). Search and text-entry
 * follow the same pattern: clear button size = field size.
 */
export const IconButtonSizes = ['xs', 'sm', 'md', 'lg'] as const;

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

    // Both size AND iconSize land on the outer button. The CSS combines
    // them to lock explicit width/height — square is a contract, not a
    // calculation, so a parent flex/grid layout can't stretch the button
    // into a rectangle. The inner span keeps its own --icon-NN class for
    // glyph dimensions.
    const buttonClasses = classNames(className, {
      [`${prefix}--btn-icon`]: true,
      [`${prefix}--btn-icon--${kind}`]: kind,
      [`${prefix}--btn-icon--${size}`]: size,
      [`${prefix}--btn-icon--icon-${iconSize}`]: iconSize,
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
