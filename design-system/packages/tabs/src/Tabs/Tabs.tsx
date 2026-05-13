import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import { TabsContext } from './TabsContext';

export const TabStates = ['default', 'hover', 'pressed', 'disabled'] as const;
export type TabState = (typeof TabStates)[number];

export interface TabsProps {
  children: React.ReactNode;
  selectedIndex: number;
  onChange?: (index: number) => void;
  /** When true, tabs render with filled background and top accent border. */
  container?: boolean;
  /** Force a visual state for unselected tabs. */
  forceState?: TabState;
  className?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { children, selectedIndex, onChange, container = true, forceState, className },
  ref
) {
  const prefix = usePrefix();

  const items = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <TabsContext.Provider value={{ selectedIndex, onChange, container, forceState }}>
      <div
        ref={ref}
        className={classNames(`${prefix}--tabs`, !container && `${prefix}--tabs--no-container`, className)}
        role="tablist">
        {items.map((child, index) =>
          React.cloneElement(child as React.ReactElement<{ index?: number }>, { index })
        )}
      </div>
    </TabsContext.Provider>
  );
});

Tabs.displayName = 'Tabs';

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  container: PropTypes.bool,
  forceState: PropTypes.oneOf(TabStates),
  className: PropTypes.string,
};

export default Tabs;
