import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Close as X, Star } from '@ds/icons';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

// ─── Color / contrast / size enumerations ────────────────────────────────────

export const TagColors = [
  'grey',
  'accent',
  'red',
  'green',
  'orange',
  'slate',
  'lavender',
  'purple',
  'pink',
  'yellow',
  'bronze',
  'olive',
  'lime',
  'jade',
  'teal',
  'cobalt',
  // Neutral is the structural odd-one-out — instead of a categorical
  // primitive-20/70 pair, it sits on field.alt (low) or surface.inverse
  // (high) and carries hover/pressed states + a 1px neutral border on the
  // low variant. See _tags.scss for the dedicated rule block.
  'neutral',
] as const;

export type TagColor = (typeof TagColors)[number];

export const TagContrasts = ['low', 'high'] as const;
export type TagContrast = (typeof TagContrasts)[number];

export const TagSizes = ['default', 'large'] as const;
export type TagSize = (typeof TagSizes)[number];

// Pill = current behavior (height-matched radius reads as a fully rounded
// capsule). Rounded = 2px (default) / 4px (large), the same chip-tier radii
// used elsewhere in the system for square-ish controls.
export const TagShapes = ['pill', 'rounded'] as const;
export type TagShape = (typeof TagShapes)[number];

// ─── Props ───────────────────────────────────────────────────────────────────

export interface TagsProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClose'> {
  /** Tag label text. Mirrors PANW's `label` prop. */
  label?: string;
  /** Color variant — 16 categorical options plus `neutral`. */
  color?: TagColor;
  /** Contrast level — `low` (pastel bg, dark text) or `high` (saturated bg, light text). */
  contrast?: TagContrast;
  /** Size — `default` (compact) or `large`. */
  size?: TagSize;
  /** Shape — `pill` (default, fully rounded) or `rounded` (2px / 4px chip radii). */
  shape?: TagShape;
  /** Show a leading icon. */
  icon?: boolean;
  /** Show a close/dismiss button. */
  close?: boolean;
  /** Callback fired when the close button is clicked. */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Icon component for the leading slot.
   * Pass an ElementType, not a ReactNode. Carbon convention: renderIcon
   * accepts ElementType. Defaults to `Star` from `@ds/icons` as a neutral
   * placeholder when `icon` is true but no override is provided.
   */
  renderIcon?: React.ElementType;
  /**
   * Icon component for the close button. Pass an ElementType. Defaults to
   * `Close` from `@ds/icons`.
   */
  renderCloseIcon?: React.ElementType;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Tags = React.forwardRef<HTMLSpanElement, TagsProps>(function Tags(
  {
    label = 'Placeholder',
    color = 'grey',
    contrast = 'low',
    size = 'default',
    shape = 'pill',
    icon = false,
    close = false,
    onClose,
    renderIcon: IconElement = Star,
    renderCloseIcon: CloseIconElement = X,
    className,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const classes = classNames(
    `${prefix}--tag`,
    `${prefix}--tag--size-${size}`,
    `${prefix}--tag--shape-${shape}`,
    `${prefix}--tag--${contrast}`,
    `${prefix}--tag--${color}`,
    className
  );

  const iconPx = size === 'large' ? 16 : 12;

  return (
    <span ref={ref} className={classes} {...rest}>
      {icon && (
        <span className={`${prefix}--tag__icon`} aria-hidden="true">
          <IconElement size={iconPx} />
        </span>
      )}
      <span className={`${prefix}--tag__label`}>{label}</span>
      {close && (
        <button
          type="button"
          className={`${prefix}--tag__close-btn`}
          onClick={onClose}
          aria-label={`Remove ${label}`}>
          <CloseIconElement size={iconPx} />
        </button>
      )}
    </span>
  );
});

Tags.displayName = 'Tags';

Tags.propTypes = {
  label: PropTypes.string,
  color: PropTypes.oneOf(TagColors),
  contrast: PropTypes.oneOf(TagContrasts),
  size: PropTypes.oneOf(TagSizes),
  shape: PropTypes.oneOf(TagShapes),
  icon: PropTypes.bool,
  close: PropTypes.bool,
  onClose: PropTypes.func,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  renderCloseIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  className: PropTypes.string,
};

export default Tags;
