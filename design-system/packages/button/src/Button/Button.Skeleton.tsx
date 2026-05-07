import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../internal/usePrefix';
import type { ButtonSize } from './Button';

export interface ButtonSkeletonProps {
  className?: string;
  size?: ButtonSize;
  href?: string;
}

const ButtonSkeleton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonSkeletonProps
>(function ButtonSkeleton({ className, href, size = 'default' }, ref) {
  const prefix = usePrefix();

  const skeletonClasses = classNames(
    `${prefix}--btn`,
    `${prefix}--btn--${size}`,
    `${prefix}--skeleton`,
    className
  );

  const component: React.ElementType = href ? 'a' : 'button';

  return React.createElement(component, {
    className: skeletonClasses,
    href,
    ref,
  });
});

ButtonSkeleton.displayName = 'ButtonSkeleton';

export default ButtonSkeleton;
