import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronDown, Sun } from 'lucide-react';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import {
  Tags,
  TagColors,
  TagContrasts,
  TagSizes,
  type TagColor,
  type TagContrast,
  type TagSize,
} from '@ds/tags';

export const AccordionSizes = ['small', 'default', 'large'] as const;
export type AccordionSize = (typeof AccordionSizes)[number];

export const AccordionOrientations = ['left', 'right'] as const;
export type AccordionOrientation = (typeof AccordionOrientations)[number];

export const AccordionThemes = ['gray00', 'gray10'] as const;
export type AccordionTheme = (typeof AccordionThemes)[number];

export const AccordionForceStates = ['static', 'hover', 'pressing', 'disabled'] as const;
export type AccordionForceState = (typeof AccordionForceStates)[number];

export interface AccordionProps {
  size?: AccordionSize;
  open?: boolean;
  theme?: AccordionTheme;
  orientation?: AccordionOrientation;
  title?: string;
  description?: string;
  showIcon?: boolean;
  /** lucide-style component for the leading icon. Defaults to `Sun`. */
  renderIcon?: React.ElementType;
  showTag?: boolean;
  tagLabel?: string;
  tagColor?: TagColor;
  tagContrast?: TagContrast;
  tagSize?: TagSize;
  children?: React.ReactNode;
  onToggle?: () => void;
  disabled?: boolean;
  forceState?: AccordionForceState;
  className?: string;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    {
      size = 'default',
      open = false,
      theme = 'gray00',
      orientation = 'right',
      title = 'Accordion',
      description,
      showIcon = false,
      renderIcon: IconElement = Sun,
      showTag = false,
      tagLabel = 'Placeholder',
      tagColor = 'orange',
      tagContrast = 'low',
      tagSize = 'default',
      children,
      onToggle,
      disabled = false,
      forceState,
      className,
    },
    ref
  ) {
    const prefix = usePrefix();
    const isDisabled = disabled || forceState === 'disabled';

    const rootClass = classNames(
      `${prefix}--accordion`,
      `${prefix}--accordion--size-${size}`,
      `${prefix}--accordion--orientation-${orientation}`,
      open ? `${prefix}--accordion--open` : `${prefix}--accordion--closed`,
      {
        [`${prefix}--accordion--theme-gray10`]: theme === 'gray10',
        [`${prefix}--accordion--disabled`]: isDisabled,
        [`${prefix}--accordion--force-hover`]: forceState === 'hover',
        [`${prefix}--accordion--force-pressing`]: forceState === 'pressing',
      },
      className
    );

    const handleClick = () => {
      if (isDisabled) return;
      onToggle?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isDisabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle?.();
      }
    };

    return (
      <div ref={ref} className={rootClass}>
        <div
          className={`${prefix}--accordion__item`}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-expanded={open}
          aria-disabled={isDisabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}>
          <div className={`${prefix}--accordion__expansion`}>
            <span className={`${prefix}--accordion__expansion-icon`} aria-hidden="true">
              <ChevronDown size={16} />
            </span>
          </div>
          <div className={`${prefix}--accordion__container`}>
            <div className={`${prefix}--accordion__inner-container`}>
              {showIcon && (
                <span className={`${prefix}--accordion__icon-container`} aria-hidden="true">
                  <IconElement size={16} />
                </span>
              )}
              <div className={`${prefix}--accordion__text-container`}>
                <div className={`${prefix}--accordion__title-row`}>
                  <span className={`${prefix}--accordion__title`}>{title}</span>
                  {showTag && (
                    <Tags
                      label={tagLabel}
                      color={tagColor}
                      contrast={tagContrast}
                      size={tagSize}
                    />
                  )}
                </div>
                {description && (
                  <div className={`${prefix}--accordion__description`}>{description}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={`${prefix}--accordion__content-area`}>
          <div className={`${prefix}--accordion__content-inner`}>{children}</div>
        </div>
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

Accordion.propTypes = {
  size: PropTypes.oneOf(AccordionSizes),
  open: PropTypes.bool,
  theme: PropTypes.oneOf(AccordionThemes),
  orientation: PropTypes.oneOf(AccordionOrientations),
  title: PropTypes.string,
  description: PropTypes.string,
  showIcon: PropTypes.bool,
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  showTag: PropTypes.bool,
  tagLabel: PropTypes.string,
  tagColor: PropTypes.oneOf(TagColors),
  tagContrast: PropTypes.oneOf(TagContrasts),
  tagSize: PropTypes.oneOf(TagSizes),
  children: PropTypes.node,
  onToggle: PropTypes.func,
  disabled: PropTypes.bool,
  forceState: PropTypes.oneOf(AccordionForceStates),
  className: PropTypes.string,
};

export default Accordion;
