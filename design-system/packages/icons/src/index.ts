// Public entry — named icon exports + the dynamic <Icon /> wrapper.
//
// Authored conventions:
// - Functional/system icons paint via `currentColor`. Set `color` on the
//   icon (or any ancestor) to retint.
// - Brand icons (BrandPanw, BrandPrisma, BrandStrata, BrandCortex) and the
//   sales-play status set (ClosedWon, ClosedLost, Deferred, Interested,
//   NotTouched, OpenPipeline, Pitched) carry semantic color in their
//   authored fills. They IGNORE `color` — that is intentional.
// - Names follow the imported source library: directional glyphs whose
//   geometry reads as a chevron are exported as `Chevron*` (the source
//   files were renamed at import time to match how we already speak about
//   them in the codebase).

export { Icon, type DynamicIconProps } from './Icon';
export type { IconProps, IconComponent } from './types';
export type { IconName } from './generated/names';
export { ICON_NAMES } from './generated/names';
export * from './generated';
