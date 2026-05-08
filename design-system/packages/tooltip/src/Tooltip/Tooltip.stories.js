import React, { useState } from 'react';
import { Tooltip, TooltipDirections } from './index';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    pointerDirection: { options: TooltipDirections, control: { type: 'select' } },
    content: { control: 'text' },
  },
  tags: ['autodocs'],
};

export const Default = (args) => <Tooltip {...args} />;
Default.args = {
  pointerDirection: 'top',
  content: 'A helpful hint about a UI element.',
};

export const PointerBottom = () => <Tooltip pointerDirection="bottom" content="From below." />;
export const PointerLeft = () => <Tooltip pointerDirection="left" content="From the left." />;
export const PointerRight = () => <Tooltip pointerDirection="right" content="From the right." />;

export const AllVariants = () => (
  <div
    style={{
      padding: 24,
      background: 'var(--ds-surface-alt-rest, #f4f4f4)',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, auto)',
      gap: 24,
      alignItems: 'start',
    }}
  >
    {TooltipDirections.map((d) => (
      <Tooltip key={d} pointerDirection={d} content={`Tooltip / ${d}`} />
    ))}
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };

// ─── Hover demo ──────────────────────────────────────────────────────────
// Lets you actually feel the entrance motion. Hover the four anchors;
// each tooltip slides 8px in the direction of its placement and fades from
// 0 → 1 over 70ms. Without this story the motion is invisible because the
// other variants render the tooltip directly with no mount/unmount cycle.

const HoverAnchor = ({ direction, children }) => {
  const [show, setShow] = useState(false);
  const offsets = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
  };
  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        padding: '8px 12px',
        background: 'var(--ds-surface-rest, #fff)',
        border: '1px solid var(--ds-lines-neutral-rest, #dedede)',
        borderRadius: 4,
        fontFamily: 'var(--ds-type-font-family-sans)',
        fontSize: 13,
        color: 'var(--ds-text-primary, #0f0f0f)',
        cursor: 'default',
      }}>
      {children}
      {show && (
        <span style={{ position: 'absolute', ...offsets[direction] }}>
          <Tooltip pointerDirection={direction} content={`Tooltip · ${direction}`} />
        </span>
      )}
    </span>
  );
};

export const HoverEntranceMotion = () => (
  <div
    style={{
      padding: 80,
      background: 'var(--ds-stage-base, #f5f5f5)',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, auto)',
      gap: 80,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <HoverAnchor direction="top">Hover (tooltip on top)</HoverAnchor>
    <HoverAnchor direction="bottom">Hover (tooltip on bottom)</HoverAnchor>
    <HoverAnchor direction="left">Hover (tooltip on left)</HoverAnchor>
    <HoverAnchor direction="right">Hover (tooltip on right)</HoverAnchor>
  </div>
);
HoverEntranceMotion.storyName = 'Hover entrance motion';
HoverEntranceMotion.parameters = { controls: { disable: true } };
