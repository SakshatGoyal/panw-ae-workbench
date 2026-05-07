import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../internal/usePrefix';

// ─── Kind / Size / Shape / IconSize enumerations ─────────────────────────────

export const IconButtonKinds = ['ghost', 'primary', 'secondary'] as const;

export type IconButtonKind = (typeof IconButtonKinds)[number];

/** sm=32px, md=40px, lg=48px (padding-based; icon dimensions controlled by iconSize) */
export const IconButtonSizes = ['sm', 'md', 'lg'] as const;

export type IconButtonSize = (typeof IconButtonSizes)[number];

/** Icon pixel dimensions. PANW extension — Carbon does not have this axis. */
export const IconButtonIconSizes = [16, 20] as const;

export type IconButtonIconSize = (typeof IconButtonIconSizes)[number];

/** Square=no radius, Rounded=4px, Pill=full circle. PANW extension. */
export const IconButtonShapes = ['square', 'rounded', 'pill'] as const;

export type IconButtonShape = (typeof IconButtonShapes)[number];

// ─── Props interface ──────────────────────────────────────────────────────────

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Icon component to render inside the button.
   * Carbon convention: accepts ElementType, not ReactNode.
   *
   * API change from PANW ButtonIcon: PANW accepted `icon: ReactNode`.
   * This is deliberately changed to `renderIcon: ElementType` to align
   * with Carbon's renderIcon convention and enable proper aria-hidden
   * wrapping at the component level.
   */
  renderIcon: React.ElementType;
  /** Accessible label — required since there is no visible text. */
  'aria-label': string;
  /** Visual style variant */
  kind?: IconButtonKind;
  /** Button size */
  size?: IconButtonSize;
  /** Icon dimensions in pixels. PANW extension. */
  iconSize?: IconButtonIconSize;
  /**
   * Corner shape. PANW extension — Carbon does not have this axis.
   */
  shape?: IconButtonShape;
  /** Whether the button is in a selected state (ghost kind only). */
  isSelected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /*
   * TODO(tooltip): When the Tooltip component is ported, add:
   *   align?: TooltipAlignment
   *   tooltipLabel?: ReactNode
   *   enterDelayMs?: number
   *   leaveDelayMs?: number
   * The aria-label prop currently serves as the accessible name directly.
   * Once Tooltip is wired in, aria-label will feed the tooltip label, and
   * aria-labelledby will be used instead.
   */
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
      shape = 'square',
      size = 'sm',
      type = 'button',
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();

    const buttonClasses = classNames(className, {
      [`${prefix}--btn-icon`]: true,
      [`${prefix}--btn-icon--${kind}`]: kind,
      [`${prefix}--btn-icon--${size}`]: size,
      [`${prefix}--btn-icon--${shape}`]: shape,
      [`${prefix}--btn-icon--selected`]: isSelected && kind === 'ghost',
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
        aria-pressed={isSelected && kind === 'ghost' ? isSelected : undefined}
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
  shape: PropTypes.oneOf(IconButtonShapes),
  size: PropTypes.oneOf(IconButtonSizes),
  type: PropTypes.oneOf(['button', 'reset', 'submit'] as const),
};

export { IconButton };
export default IconButton;
