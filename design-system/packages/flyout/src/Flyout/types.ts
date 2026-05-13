import type React from 'react';

export const FlyoutModes = ['single', 'multiple'] as const;
export type FlyoutMode = (typeof FlyoutModes)[number];

export const FlyoutPlacements = ['bottom-start', 'bottom-end', 'top-start', 'top-end'] as const;
export type FlyoutPlacement = (typeof FlyoutPlacements)[number];

/**
 * Maximum nesting depth for tree groups. Per Stage's restraint principle —
 * deeper hierarchies make sales/finance users hunt; cap at three and surface
 * an overflow if more is needed.
 */
export const FLYOUT_MAX_DEPTH = 3;

/**
 * Maximum flyout width. The panel sizes to its content (`width: max-content`
 * in CSS) and is clamped between a 200px floor (so the panel never collapses
 * to icon-button width off a small trigger) and this 320px ceiling (so a
 * long label can't produce a runway-long panel — labels truncate with
 * ellipsis at this width and reveal full text via a delayed hover tooltip
 * on the item). This constant is also used by the positioning hook as the
 * worst-case width for the initial viewport-edge clamp before the panel's
 * real width is measured.
 */
export const FLYOUT_WIDTH = 320;

export interface FlyoutContextValue {
  mode: FlyoutMode;
  /** Set of selected values. Both modes use a Set internally; single mode
   *  enforces size 1 by replacing on select. */
  selected: ReadonlySet<string>;
  /** Filter substring (lowercased), empty when no filter applied. */
  filter: string;
  /** Owner of registered values — used by SelectAll to know what "all" means. */
  registered: ReadonlySet<string>;
  setFilter: (value: string) => void;
  toggle: (value: string) => void;
  selectAll: () => void;
  selectNone: () => void;
  registerValue: (value: string) => void;
  unregisterValue: (value: string) => void;
  /** Close the flyout (used by single-mode item selection and Footer actions). */
  close: () => void;
}

export interface FlyoutProps {
  /** Controls visibility. The Flyout does not own its own open state — the
   *  trigger does, so consumers can place triggers anywhere. */
  open: boolean;
  /** Fired when the flyout requests close (item click in single mode,
   *  outside-click, escape key, footer action). */
  onOpenChange: (open: boolean) => void;
  /** Element to anchor against. The flyout flips above when there's no room
   *  below and clamps to the viewport horizontally. */
  anchorRef: React.RefObject<HTMLElement | null>;
  /** 'single' = one selection at a time; 'multiple' = many, with optional
   *  SelectAll and Footer actions. */
  mode?: FlyoutMode;
  /** Selected values (controlled). */
  selected?: string[];
  /** Fires when selection changes. In single mode, fires once per click. */
  onSelectionChange?: (values: string[]) => void;
  /** Initial preferred placement. Auto-flip overrides if there's no room. */
  placement?: FlyoutPlacement;
  /** Compose: Filter, SelectAll, List (with Items / Groups), Footer. */
  children: React.ReactNode;
  className?: string;
}
