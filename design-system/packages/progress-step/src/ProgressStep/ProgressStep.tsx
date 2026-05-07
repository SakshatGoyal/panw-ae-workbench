import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import {
  ProgressSizes,
  type ProgressSize,
} from '../ProgressStepItem/ProgressStepItem';

export interface ProgressStepProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** ProgressStepItem children. */
  children?: React.ReactNode;
  /** Size variant — passed to each child. */
  size?: ProgressSize;
  /** Show description text below each step title. */
  showDescription?: boolean;
}

export const ProgressStep = React.forwardRef<HTMLDivElement, ProgressStepProps>(function ProgressStep(
  { children, size = 'default', showDescription = true, className, ...rest },
  ref
) {
  const prefix = usePrefix();
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div
      ref={ref}
      className={classNames(`${prefix}--ps-stepper`, `${prefix}--ps-stepper--${size}`, className)}
      {...rest}>
      {items.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{
              index?: number;
              size?: ProgressSize;
              showDescription?: boolean;
            }>, { index, size, showDescription, key: index })
          : child
      )}
    </div>
  );
});

ProgressStep.displayName = 'ProgressStep';

ProgressStep.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(ProgressSizes),
  showDescription: PropTypes.bool,
  className: PropTypes.string,
};

export default ProgressStep;
