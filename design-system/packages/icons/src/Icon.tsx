import * as React from 'react';
import { ICON_MANIFEST } from './generated/manifest';
import type { IconName } from './generated/names';
import type { IconProps } from './types';

export interface DynamicIconProps extends IconProps {
  /**
   * Icon name in kebab-case — matches the source filename. Use the named
   * exports (`<ArrowDown />`) when the icon is known at build time; reach
   * for `<Icon name="..." />` only when the choice is data-driven.
   */
  name: IconName;
}

/**
 * Dynamic-lookup wrapper. Trades tree-shaking for the ability to pick an
 * icon by string at runtime. Every icon ships with the manifest, so this
 * pulls in the whole set — prefer the named exports for static usage.
 */
export const Icon = React.forwardRef<SVGSVGElement, DynamicIconProps>(
  function Icon({ name, ...rest }, ref) {
    const Cmp = ICON_MANIFEST[name];
    if (!Cmp) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(`[@ds/icons] unknown icon name: "${name}"`);
      }
      return null;
    }
    return <Cmp ref={ref} {...rest} />;
  }
);

Icon.displayName = 'Icon';
