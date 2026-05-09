import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Sun } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { Tags } from '@ds/tags';
import { useTabsContext } from '../Tabs/TabsContext';

export interface TabProps {
  label: string;
  showLabel?: boolean;
  showTag?: boolean;
  tagLabel?: string;
  disabled?: boolean;
  /** lucide-style component for the leading icon. */
  renderIcon?: React.ElementType;
  showIcon?: boolean;
  /** Internal: injected by `<Tabs>` — its position in the children list. */
  index?: number;
  className?: string;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(
  {
    label,
    showLabel = true,
    showTag = false,
    tagLabel = 'Tag',
    disabled = false,
    renderIcon: IconElement = Sun,
    showIcon = false,
    index = 0,
    className,
  },
  ref
) {
  const prefix = usePrefix();
  const { selectedIndex, onChange, container, forceState } = useTabsContext();
  const isSelected = index === selectedIndex;

  const forceClass =
    !isSelected && forceState && forceState !== 'default'
      ? `${prefix}--tabs__item--force-${forceState}`
      : '';

  const cls = classNames(
    `${prefix}--tabs__item`,
    container ? `${prefix}--tabs__item--container` : `${prefix}--tabs__item--no-container`,
    isSelected ? `${prefix}--tabs__item--selected` : `${prefix}--tabs__item--unselected`,
    forceClass,
    className
  );

  const isDisabled = disabled || forceState === 'disabled';

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={cls}
      disabled={isDisabled}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => {
        if (!isDisabled) onChange?.(index);
      }}>
      {showLabel && <span className={`${prefix}--tabs__label`}>{label}</span>}
      {showIcon && (
        <span className={`${prefix}--tabs__icon`} aria-hidden="true">
          <IconElement size={16} />
        </span>
      )}
      {showTag && (
        <span className={`${prefix}--tabs__tag`}>
          <Tags label={tagLabel} color="orange" contrast="low" size="default" />
        </span>
      )}
    </button>
  );
});

Tab.displayName = 'Tab';

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  showTag: PropTypes.bool,
  tagLabel: PropTypes.string,
  disabled: PropTypes.bool,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  showIcon: PropTypes.bool,
  index: PropTypes.number,
  className: PropTypes.string,
};

export default Tab;
