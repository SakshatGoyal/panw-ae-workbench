import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../internal/usePrefix';

// ─── Kind / Size enumerations ────────────────────────────────────────────────

/**
 * Stage's five canonical kinds. Brand-vs-neutral intent is encoded in the kind
 * name (Stage rule: "kind name carries brand intent" for text buttons), so the
 * old PANW -accent / -gray suffixes are gone.
 *
 * Mapping from PANW:
 *   primary           → primary           (brand filled, no change)
 *   danger            → danger            (red filled, no change)
 *   secondary-gray    → secondary         (white bg, neutral text, gray border)
 *   secondary-accent  → tertiary          (white bg, brand text, gray border)
 *   ghost-accent      → tertiary          (folded — both are "soft brand")
 *   ghost-gray        → ghost             (transparent, neutral text)
 */
export const ButtonKinds = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
  'danger',
] as const;

export type ButtonKind = (typeof ButtonKinds)[number];

/** PANW size names map to: small=32px, default=40px, large=48px */
export const ButtonSizes = ['small', 'default', 'large'] as const;

export type ButtonSize = (typeof ButtonSizes)[number];

// ─── Props interface ──────────────────────────────────────────────────────────

export interface ButtonBaseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  /** Visual style variant */
  kind?: ButtonKind;
  /** Button size */
  size?: ButtonSize;
  /** Disabled state */
  disabled?: boolean;
  /**
   * Icon component to render before the label (left slot).
   * Pass an ElementType (e.g. a lucide-react component), not a ReactNode.
   * Carbon convention: renderIcon accepts ElementType, not ReactNode.
   */
  renderIcon?: React.ElementType;
  /**
   * Position of the icon relative to label.
   * 'left' renders before children, 'right' renders after.
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  /**
   * Description of the icon for screen readers, used as aria-label on the icon span.
   * Required when renderIcon is set and no other accessible label is present.
   */
  iconDescription?: string;
  /**
   * Optionally specify an href for your Button to become an <a> element.
   */
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];
  /** Optional rel attribute when rendered as <a>. */
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
  /** Optional target attribute when rendered as <a>. */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
}

/** Polymorphic props type — mirrors Carbon's ButtonProps<T> pattern. */
export type ButtonProps<T extends React.ElementType = 'button'> =
  ButtonBaseProps &
    Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonBaseProps> & {
      /** Render as a different element or component (e.g. 'a', RouterLink). */
      as?: T;
    };

export type ButtonComponent = <T extends React.ElementType = 'button'>(
  props: ButtonProps<T> & { ref?: React.Ref<unknown> }
) => React.ReactElement | null;

// ─── Component ───────────────────────────────────────────────────────────────

const Button: ButtonComponent = React.forwardRef(function Button<
  T extends React.ElementType = 'button',
>(
  {
    as,
    children,
    className,
    disabled = false,
    href,
    iconDescription,
    iconPosition = 'left',
    kind = 'primary',
    rel,
    renderIcon: IconElement,
    size = 'default',
    target,
    type = 'button',
    ...rest
  }: ButtonProps<T>,
  ref: React.Ref<unknown>
) {
  const prefix = usePrefix();

  const buttonClasses = classNames(className, {
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--${kind}`]: kind,
    [`${prefix}--btn--${size}`]: size,
    [`${prefix}--btn--disabled`]: disabled,
  });

  const iconNode = IconElement ? (
    <span className={`${prefix}--btn__icon`} aria-hidden="true">
      <IconElement aria-label={iconDescription} />
    </span>
  ) : null;

  let component: React.ElementType = 'button';
  const anchorProps = href && !disabled ? { href, rel, target } : {};
  const buttonTypeProps = component === 'button' ? { type } : {};

  if (as) {
    component = as;
  } else if (href && !disabled) {
    component = 'a';
  }

  return React.createElement(
    component,
    {
      ...rest,
      ...anchorProps,
      ...buttonTypeProps,
      className: buttonClasses,
      disabled: component === 'button' ? disabled : undefined,
      ref,
    },
    iconPosition === 'left' && iconNode,
    children,
    iconPosition === 'right' && iconNode
  );
}) as ButtonComponent;

Button.displayName = 'Button';

// @ts-expect-error -- forwardRef result is typed as ButtonComponent
Button.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.elementType]),
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  iconDescription: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  kind: PropTypes.oneOf(ButtonKinds),
  rel: PropTypes.string,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  size: PropTypes.oneOf(ButtonSizes),
  target: PropTypes.string,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

export default Button as ButtonComponent;
