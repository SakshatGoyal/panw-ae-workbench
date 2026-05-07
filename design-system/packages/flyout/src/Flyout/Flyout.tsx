import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import {
  FLYOUT_WIDTH,
  FlyoutModes,
  FlyoutPlacements,
  FLYOUT_MAX_DEPTH,
  type FlyoutContextValue,
  type FlyoutPlacement,
  type FlyoutProps,
} from './types';

// ─── Context ─────────────────────────────────────────────────────────────────

const FlyoutContext = createContext<FlyoutContextValue | null>(null);

export function useFlyoutContext(): FlyoutContextValue {
  const ctx = useContext(FlyoutContext);
  if (!ctx) {
    throw new Error('Flyout subcomponents must be rendered inside <Flyout>.');
  }
  return ctx;
}

const FlyoutDepthContext = createContext<number>(0);

export function useFlyoutDepth(): number {
  return useContext(FlyoutDepthContext);
}

export const FlyoutDepthProvider = FlyoutDepthContext.Provider;
export const FLYOUT_DEPTH_MAX = FLYOUT_MAX_DEPTH;

// ─── Anchored positioning ────────────────────────────────────────────────────
// Hand-rolled instead of pulling Floating UI as a dependency. Covers
// below-vs-above flip and horizontal viewport clamping — the cases that
// matter for sales/finance flyouts inside tables, modals, and scroll panels.
// If we ever need transform-stack handling or virtual elements, swap in
// Floating UI then.

interface PositionStyle {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
  visibility: 'hidden' | 'visible';
}

function usePosition(
  anchorRef: React.RefObject<HTMLElement | null>,
  flyoutRef: React.RefObject<HTMLDivElement | null>,
  placement: FlyoutPlacement,
  open: boolean
): PositionStyle {
  const [style, setStyle] = useState<PositionStyle>({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: 0,
    visibility: 'hidden',
  });

  const compute = useCallback(() => {
    const anchor = anchorRef.current;
    const flyout = flyoutRef.current;
    if (!anchor || !flyout) return;

    const anchorRect = anchor.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const offset = 4; // Stage's trigger-to-flyout gap

    // Fixed 320px width per Stage flyout convention — width does not track
    // the anchor. Long item labels truncate and reveal on hover (Item.tsx).
    const flyoutHeight = flyout.scrollHeight;
    const flyoutWidth = FLYOUT_WIDTH;

    const spaceBelow = viewportHeight - anchorRect.bottom - offset - 8;
    const spaceAbove = anchorRect.top - offset - 8;

    const prefersTop = placement.startsWith('top');
    const flipToTop = prefersTop ? spaceAbove >= 120 || spaceAbove > spaceBelow : spaceBelow < flyoutHeight && spaceAbove > spaceBelow;

    const top = flipToTop
      ? Math.max(8, anchorRect.top - offset - flyoutHeight)
      : anchorRect.bottom + offset;
    const maxHeight = flipToTop ? spaceAbove : spaceBelow;

    const prefersEnd = placement.endsWith('end');
    let left = prefersEnd ? anchorRect.right - flyoutWidth : anchorRect.left;
    // Clamp horizontally inside the viewport (8px page-edge breathing room).
    left = Math.max(8, Math.min(left, viewportWidth - flyoutWidth - 8));

    setStyle({
      top: top + window.scrollY,
      left: left + window.scrollX,
      width: flyoutWidth,
      maxHeight: Math.max(120, maxHeight),
      visibility: 'visible',
    });
  }, [anchorRef, flyoutRef, placement]);

  useLayoutEffect(() => {
    if (!open) return;
    compute();
  }, [open, compute]);

  useEffect(() => {
    if (!open) return;
    const handler = () => compute();
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler, true);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler, true);
    };
  }, [open, compute]);

  return style;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Flyout = React.forwardRef<HTMLDivElement, FlyoutProps>(function Flyout(
  {
    open,
    onOpenChange,
    anchorRef,
    mode = 'single',
    selected,
    onSelectionChange,
    placement = 'bottom-start',
    children,
    className,
  },
  ref
) {
  const prefix = usePrefix();
  const flyoutRef = useRef<HTMLDivElement | null>(null);
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      flyoutRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref]
  );

  const [registered, setRegistered] = useState<Set<string>>(() => new Set());
  const [filter, setFilter] = useState('');

  const selectedSet = useMemo<ReadonlySet<string>>(
    () => new Set(selected ?? []),
    [selected]
  );

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const toggle = useCallback(
    (value: string) => {
      const next = new Set(selectedSet);
      if (mode === 'single') {
        next.clear();
        next.add(value);
      } else {
        if (next.has(value)) next.delete(value);
        else next.add(value);
      }
      onSelectionChange?.(Array.from(next));
      if (mode === 'single') close();
    },
    [mode, selectedSet, onSelectionChange, close]
  );

  const selectAll = useCallback(() => {
    onSelectionChange?.(Array.from(registered));
  }, [registered, onSelectionChange]);

  const selectNone = useCallback(() => {
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  const registerValue = useCallback((value: string) => {
    setRegistered((prev) => {
      if (prev.has(value)) return prev;
      const next = new Set(prev);
      next.add(value);
      return next;
    });
  }, []);

  const unregisterValue = useCallback((value: string) => {
    setRegistered((prev) => {
      if (!prev.has(value)) return prev;
      const next = new Set(prev);
      next.delete(value);
      return next;
    });
  }, []);

  // Outside-click + Escape close.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      const node = flyoutRef.current;
      const anchor = anchorRef.current;
      if (!node) return;
      if (node.contains(e.target as Node)) return;
      if (anchor && anchor.contains(e.target as Node)) return;
      close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, anchorRef, close]);

  const position = usePosition(anchorRef, flyoutRef, placement, open);

  const ctx = useMemo<FlyoutContextValue>(
    () => ({
      mode,
      selected: selectedSet,
      filter,
      registered,
      setFilter,
      toggle,
      selectAll,
      selectNone,
      registerValue,
      unregisterValue,
      close,
    }),
    [
      mode,
      selectedSet,
      filter,
      registered,
      toggle,
      selectAll,
      selectNone,
      registerValue,
      unregisterValue,
      close,
    ]
  );

  if (!open) return null;

  return (
    <FlyoutContext.Provider value={ctx}>
      <FlyoutDepthProvider value={0}>
        <div
          ref={setRef}
          className={classNames(`${prefix}--flyout`, className)}
          role="listbox"
          aria-multiselectable={mode === 'multiple'}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            width: position.width,
            maxHeight: position.maxHeight,
            visibility: position.visibility,
          }}>
          {children}
        </div>
      </FlyoutDepthProvider>
    </FlyoutContext.Provider>
  );
});

Flyout.displayName = 'Flyout';

Flyout.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  // anchorRef is a ref object — PropTypes.shape with current works but is
  // overkill; rely on TS at the boundary.
  anchorRef: PropTypes.any,
  mode: PropTypes.oneOf(FlyoutModes),
  selected: PropTypes.arrayOf(PropTypes.string),
  onSelectionChange: PropTypes.func,
  placement: PropTypes.oneOf(FlyoutPlacements),
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Flyout;
