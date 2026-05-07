import { createContext, useContext } from 'react';
import type { TabState } from './Tabs';

export interface TabsContextValue {
  selectedIndex: number;
  onChange?: (index: number) => void;
  container: boolean;
  forceState?: TabState;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('Tab must be rendered inside <Tabs>');
  }
  return ctx;
}
