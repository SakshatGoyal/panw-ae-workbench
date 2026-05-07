import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';

export const ContentSwitcherSizes = ['small', 'default', 'large'] as const;
export type ContentSwitcherSize = (typeof ContentSwitcherSizes)[number];

export const ContentSwitcherBackgrounds = ['gray10', 'gray00'] as const;
export type ContentSwitcherBackground = (typeof ContentSwitcherBackgrounds)[number];

export interface ContentSwitcherItem {
  /** Label text. */
  label: string;
  /** Optional leading icon component (ElementType). */
  renderIcon?: React.ElementType;
  /** Show the icon. Defaults to true when `renderIcon` is provided. */
  showIcon?: boolean;
  /** Show the label text. Defaults to true. */
  showLabel?: boolean;
}

export interface ContentSwitcherProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Items (segments) to render. */
  items: ContentSwitcherItem[];
  /** Index of the currently selected segment. Controlled. */
  selectedIndex: number;
  /** Fired when a segment is clicked. */
  onChange?: (index: number) => void;
  /** Size variant — controls vertical padding. */
  size?: ContentSwitcherSize;
  /** Background context — affects unselected hover/pressed colors. */
  background?: ContentSwitcherBackground;
  /** Disables all segments. */
  disabled?: boolean;
}

export const ContentSwitcher = React.forwardRef<HTMLDivElement, ContentSwitcherProps>(
  function ContentSwitcher(
    {
      items,
      selectedIndex,
      onChange,
      size = 'small',
      background = 'gray10',
      disabled = false,
      className,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();

    const containerClass = classNames(
      `${prefix}--content-switcher`,
      {
        [`${prefix}--content-switcher--bg-gray00`]: background === 'gray00',
      },
      className
    );

    return (
      <div ref={ref} className={containerClass} role="tablist" {...rest}>
        {items.map((item, index) => {
          const isSelected = index === selectedIndex;
          const showLabel = item.showLabel !== false;
          const showIcon = item.showIcon !== false && item.renderIcon != null;
          const IconElement = item.renderIcon;

          const itemClass = classNames(
            `${prefix}--content-switcher__item`,
            `${prefix}--content-switcher__item--${size}`,
            isSelected
              ? `${prefix}--content-switcher__item--selected`
              : `${prefix}--content-switcher__item--unselected`
          );

          return (
            <button
              key={index}
              type="button"
              className={itemClass}
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              disabled={disabled}
              onClick={() => {
                if (!disabled && !isSelected && onChange) onChange(index);
              }}>
              {showLabel && <span>{item.label}</span>}
              {showIcon && IconElement && (
                <span className={`${prefix}--content-switcher__icon`} aria-hidden="true">
                  <IconElement size={16} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

ContentSwitcher.displayName = 'ContentSwitcher';

ContentSwitcher.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      showIcon: PropTypes.bool,
      showLabel: PropTypes.bool,
    })
  ).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(ContentSwitcherSizes),
  background: PropTypes.oneOf(ContentSwitcherBackgrounds),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default ContentSwitcher;
