import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '@ds/button/src/internal/usePrefix';
import {
  Popover,
  PopoverDirections,
  PopoverPositions,
  PopoverDensities,
  type PopoverDirection,
  type PopoverPosition,
  type PopoverDensity,
} from '../Popover/Popover';

// ─── Placement ───────────────────────────────────────────────────────────────
// HoverPopover uses Flyout-style placement vocabulary so consumers don't have
// to learn two anchoring systems. The `pointer*` props on the underlying
// Popover panel are kept for visual continuity and derived from placement when
// not explicitly set.

export const HoverPopoverPlacements = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end',
  'right-start',
  'right-end',
] as const;
export type HoverPopoverPlacement = (typeof HoverPopoverPlacements)[number];

function placementToPointer(p: HoverPopoverPlacement): {
  direction: PopoverDirection;
  position: PopoverPosition;
} {
  // The Popover panel's pointerDirection names the EDGE the trigger sits on.
  // bottom-start = panel is BELOW trigger, so pointer is on panel's TOP edge.
  if (p.startsWith('bottom')) return { direction: 'top', position: p.endsWith('end') ? 'right' : 'left' };
  if (p.startsWith('top')) return { direction: 'bottom', position: p.endsWith('end') ? 'right' : 'left' };
  if (p.startsWith('left')) return { direction: 'right', position: p.endsWith('end') ? 'bottom' : 'top' };
  return { direction: 'left', position: p.endsWith('end') ? 'bottom' : 'top' };
}

// ─── Positioning ─────────────────────────────────────────────────────────────
// Hand-rolled, mirroring the Flyout strategy: getBoundingClientRect on the
// trigger, measure the panel, flip vertically when out of room, clamp inside
// the viewport with 8px page-edge breathing room. Uses position: fixed so the
// containing block is always the viewport.

interface PositionStyle {
  top: number;
  left: number;
  visibility: 'hidden' | 'visible';
}

const OFFSET = 4; // Stage trigger→panel gap (matches Flyout)
const EDGE_PAD = 8;

function computePosition(
  anchor: HTMLElement,
  panel: HTMLElement,
  placement: HoverPopoverPlacement,
): PositionStyle {
  const a = anchor.getBoundingClientRect();
  const pw = panel.offsetWidth;
  const ph = panel.offsetHeight;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const isVertical = placement.startsWith('top') || placement.startsWith('bottom');
  let prefersTop = placement.startsWith('top');
  let prefersLeft = placement.startsWith('left');

  if (isVertical) {
    const spaceBelow = vh - a.bottom - OFFSET - EDGE_PAD;
    const spaceAbove = a.top - OFFSET - EDGE_PAD;
    const wantTop = prefersTop;
    const flip = wantTop ? spaceAbove < ph && spaceBelow > spaceAbove : spaceBelow < ph && spaceAbove > spaceBelow;
    const top = wantTop !== flip
      ? Math.max(EDGE_PAD, a.top - OFFSET - ph)
      : a.bottom + OFFSET;
    const prefersEnd = placement.endsWith('end');
    let left = prefersEnd ? a.right - pw : a.left;
    left = Math.max(EDGE_PAD, Math.min(left, vw - pw - EDGE_PAD));
    return { top, left, visibility: 'visible' };
  }

  // Horizontal placements
  const spaceRight = vw - a.right - OFFSET - EDGE_PAD;
  const spaceLeft = a.left - OFFSET - EDGE_PAD;
  const wantLeft = prefersLeft;
  const flip = wantLeft ? spaceLeft < pw && spaceRight > spaceLeft : spaceRight < pw && spaceLeft > spaceRight;
  const left = wantLeft !== flip
    ? Math.max(EDGE_PAD, a.left - OFFSET - pw)
    : a.right + OFFSET;
  const prefersEnd = placement.endsWith('end');
  let top = prefersEnd ? a.bottom - ph : a.top;
  top = Math.max(EDGE_PAD, Math.min(top, vh - ph - EDGE_PAD));
  return { top, left, visibility: 'visible' };
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface HoverPopoverProps {
  /** The element that opens the popover on hover. Receives merged ref + handlers. */
  trigger: React.ReactElement;
  /** Custom content. When omitted, the standard Popover panel is rendered using the inline props below. */
  children?: React.ReactNode;
  placement?: HoverPopoverPlacement;
  /** Hover-in delay before opening. 80ms is the Stage default — prevents accidental opens during glide. */
  openDelay?: number;
  /** Grace period after hover-out before closing. 160ms keeps the panel open long enough to hover-into. */
  closeDelay?: number;
  /** Controlled open state. Omit to use internal hover state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Disable the hover trigger entirely. */
  disabled?: boolean;

  // ─── Forwarded to the default Popover panel ────────────────────────────────
  density?: PopoverDensity;
  heading?: string;
  showHeading?: boolean;
  description?: string;
  showDescription?: boolean;
  showImage?: boolean;
  image?: React.ReactNode;
  showStepper?: boolean;
  /** Override the auto-derived pointer direction. */
  pointerDirection?: PopoverDirection;
  /** Override the auto-derived pointer position. */
  pointerPosition?: PopoverPosition;

  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function HoverPopover({
  trigger,
  children,
  placement = 'bottom-start',
  openDelay = 80,
  closeDelay = 160,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  density,
  heading,
  showHeading,
  description,
  showDescription,
  showImage,
  image,
  showStepper = false,
  pointerDirection,
  pointerPosition,
  className,
}: HoverPopoverProps) {
  const prefix = usePrefix();
  const anchorRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const isControlled = controlledOpen !== undefined;

  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? !!controlledOpen : internalOpen;

  const [pos, setPos] = useState<PositionStyle>({ top: 0, left: 0, visibility: 'hidden' });

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const clearTimers = useCallback(() => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleOpen = useCallback(() => {
    if (disabled) return;
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), openDelay);
  }, [disabled, clearTimers, openDelay, setOpen]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), closeDelay);
  }, [clearTimers, closeDelay, setOpen]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  // ─── Position the portal panel ────────────────────────────────────────────
  const reposition = useCallback(() => {
    const a = anchorRef.current;
    const p = panelRef.current;
    if (!a || !p) return;
    setPos(computePosition(a, p, placement));
  }, [placement]);

  useLayoutEffect(() => {
    if (!open) {
      setPos((prev) => ({ ...prev, visibility: 'hidden' }));
      return;
    }
    reposition();
  }, [open, reposition]);

  useEffect(() => {
    if (!open) return;
    const handler = () => reposition();
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler, true);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler, true);
    };
  }, [open, reposition]);

  // ─── Trigger props ────────────────────────────────────────────────────────
  if (!isValidElement(trigger)) {
    throw new Error('HoverPopover: `trigger` must be a single React element.');
  }
  const triggerEl = trigger as React.ReactElement<{
    ref?: React.Ref<HTMLElement>;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
  }>;

  const mergedTrigger = cloneElement(triggerEl, {
    ref: (node: HTMLElement | null) => {
      anchorRef.current = node;
      const existingRef = (triggerEl as unknown as { ref?: React.Ref<HTMLElement> }).ref;
      if (typeof existingRef === 'function') existingRef(node);
      else if (existingRef && 'current' in (existingRef as object)) {
        (existingRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    onMouseEnter: (e: React.MouseEvent) => {
      triggerEl.props.onMouseEnter?.(e);
      scheduleOpen();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      triggerEl.props.onMouseLeave?.(e);
      scheduleClose();
    },
    onFocus: (e: React.FocusEvent) => {
      triggerEl.props.onFocus?.(e);
      if (!disabled) setOpen(true);
    },
    onBlur: (e: React.FocusEvent) => {
      triggerEl.props.onBlur?.(e);
      setOpen(false);
    },
  });

  // ─── Panel content ────────────────────────────────────────────────────────
  const pointer = placementToPointer(placement);
  const panelContent = children ?? (
    <Popover
      density={density ?? 'short'}
      heading={heading}
      showHeading={showHeading ?? heading !== undefined}
      description={description}
      showDescription={showDescription ?? description !== undefined}
      showImage={showImage ?? false}
      image={image}
      showStepper={showStepper}
      pointerDirection={pointerDirection ?? pointer.direction}
      pointerPosition={pointerPosition ?? pointer.position}
    />
  );

  // Inline render with position: fixed — same strategy as Flyout. Fixed
  // positioning resolves coordinates against the viewport, so the panel
  // escapes overflow:hidden ancestors without needing a portal.
  const panelNode = open ? (
    <div
      ref={panelRef}
      className={classNames(`${prefix}--hover-popover`, className)}
      data-state={open ? 'open' : 'closed'}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        visibility: pos.visibility,
      }}
      onMouseEnter={() => {
        // Cancel the pending close so the user can hover INTO the panel.
        clearTimers();
        if (!disabled) setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      role="tooltip">
      {panelContent}
    </div>
  ) : null;

  return (
    <>
      {mergedTrigger}
      {panelNode}
    </>
  );
}

HoverPopover.displayName = 'HoverPopover';

HoverPopover.propTypes = {
  trigger: PropTypes.element.isRequired,
  children: PropTypes.node,
  placement: PropTypes.oneOf(HoverPopoverPlacements),
  openDelay: PropTypes.number,
  closeDelay: PropTypes.number,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  disabled: PropTypes.bool,
  density: PropTypes.oneOf(PopoverDensities),
  heading: PropTypes.string,
  showHeading: PropTypes.bool,
  description: PropTypes.string,
  showDescription: PropTypes.bool,
  showImage: PropTypes.bool,
  image: PropTypes.node,
  showStepper: PropTypes.bool,
  pointerDirection: PropTypes.oneOf(PopoverDirections),
  pointerPosition: PropTypes.oneOf(PopoverPositions),
  className: PropTypes.string,
};

export default HoverPopover;
