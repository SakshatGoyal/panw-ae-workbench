import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const LinkSizes = ['14px', '18px'] as const;
export type LinkSize = (typeof LinkSizes)[number];

export const LinkColors = ['blue', 'black'] as const;
export type LinkColor = (typeof LinkColors)[number];

export const LinkForceStates = ['hover', 'pressed'] as const;
export type LinkForceState = (typeof LinkForceStates)[number];

export interface LinkProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Font size variant. */
  size?: LinkSize;
  /** Color palette — `blue` for primary actions, `black` for neutral. */
  color?: LinkColor;
  /** Disables interaction and applies muted color. */
  disabled?: boolean;
  /** Show a leading left-arrow icon. */
  leftIcon?: boolean;
  /** Show a trailing right-arrow icon. */
  rightIcon?: boolean;
  /** Navigation href — when set, renders as `<a>`; otherwise renders as `<span>`. */
  href?: string;
  /** Optional rel attribute when rendered as `<a>`. */
  rel?: string;
  /** Optional target attribute when rendered as `<a>`. */
  target?: string;
  /**
   * Forces a visual state for documentation/snapshot scenarios.
   * Mirrors PANW's `forceState` prop.
   */
  forceState?: LinkForceState;
  /**
   * Override the leading icon component. Defaults to lucide `ArrowLeft`.
   * Pass an ElementType (Carbon convention).
   */
  renderLeftIcon?: React.ElementType;
  /**
   * Override the trailing icon component. Defaults to lucide `ArrowRight`.
   */
  renderRightIcon?: React.ElementType;
}

export const Link = React.forwardRef<HTMLElement, LinkProps>(function Link(
  {
    size = '14px',
    color = 'blue',
    disabled = false,
    leftIcon = false,
    rightIcon = false,
    children = 'Link text',
    href,
    onClick,
    forceState,
    renderLeftIcon: LeftIconElement = ArrowLeft,
    renderRightIcon: RightIconElement = ArrowRight,
    className,
    rel,
    target,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const iconPx = size === '18px' ? 24 : 16;

  const classes = classNames(
    `${prefix}--link`,
    `${prefix}--link--${size.replace('px', '')}px`,
    `${prefix}--link--${color}`,
    {
      [`${prefix}--link--disabled`]: disabled,
      [`${prefix}--link--${forceState}`]: forceState,
    },
    className
  );

  const Tag: React.ElementType = href ? 'a' : 'span';
  const tagProps: Record<string, unknown> = href
    ? { href: disabled ? undefined : href, rel, target }
    : { role: 'link' };

  return React.createElement(
    Tag,
    {
      ...rest,
      ...tagProps,
      className: classes,
      onClick: disabled ? undefined : onClick,
      'aria-disabled': disabled ? true : undefined,
      tabIndex: disabled ? -1 : 0,
      ref,
    },
    leftIcon &&
      React.createElement(
        'span',
        {
          className: `${prefix}--link__icon-wrap`,
          'aria-hidden': true,
          key: 'left',
        },
        React.createElement(LeftIconElement, { size: iconPx })
      ),
    children,
    rightIcon &&
      React.createElement(
        'span',
        {
          className: `${prefix}--link__icon-wrap`,
          'aria-hidden': true,
          key: 'right',
        },
        React.createElement(RightIconElement, { size: iconPx })
      )
  );
});

Link.displayName = 'Link';

Link.propTypes = {
  size: PropTypes.oneOf(LinkSizes),
  color: PropTypes.oneOf(LinkColors),
  disabled: PropTypes.bool,
  leftIcon: PropTypes.bool,
  rightIcon: PropTypes.bool,
  href: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
  forceState: PropTypes.oneOf(LinkForceStates),
  renderLeftIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  renderRightIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Link;
