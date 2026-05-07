import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Sun, X } from 'lucide-react';
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
  'magenta',
  'yellow',
  'bronze',
  'olive',
  'lime',
  'jade',
  'teal',
  'cobalt',
] as const;

export type TagColor = (typeof TagColors)[number];

export const TagContrasts = ['low', 'high'] as const;
export type TagContrast = (typeof TagContrasts)[number];

export const TagSizes = ['default', 'large'] as const;
export type TagSize = (typeof TagSizes)[number];

// ─── Props ───────────────────────────────────────────────────────────────────

export interface TagsProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClose'> {
  /** Tag label text. Mirrors PANW's `label` prop. */
  label?: string;
  /** Color variant — 17 options matching the Figma color property. */
  color?: TagColor;
  /** Contrast level — `low` (pastel bg, dark text) or `high` (saturated bg, light text). */
  contrast?: TagContrast;
  /** Size — `default` (compact) or `large`. */
  size?: TagSize;
  /** Show a leading icon. */
  icon?: boolean;
  /** Show a close/dismiss button. */
  close?: boolean;
  /** Callback fired when the close button is clicked. */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Icon component for the leading slot.
   * Pass an ElementType (e.g. a lucide-react component), not a ReactNode.
   * Carbon convention: renderIcon accepts ElementType.
   * Defaults to lucide-react `Sun` (matches PANW's default "light" SVG).
   */
  renderIcon?: React.ElementType;
  /**
   * Icon component for the close button.
   * Pass an ElementType (lucide-react component). Defaults to `X`.
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
    icon = false,
    close = false,
    onClose,
    renderIcon: IconElement = Sun,
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
  icon: PropTypes.bool,
  close: PropTypes.bool,
  onClose: PropTypes.func,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  renderCloseIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  className: PropTypes.string,
};

export default Tags;
