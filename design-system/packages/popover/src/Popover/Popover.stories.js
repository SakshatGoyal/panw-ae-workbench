import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Popover, PopoverDirections, PopoverPositions, PopoverDensities } from './index';
import mdx from './Popover.mdx';

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    pointerDirection: { options: PopoverDirections, control: { type: 'select' } },
    pointerPosition: { options: PopoverPositions, control: { type: 'select' } },
    density: { options: PopoverDensities, control: { type: 'radio' } },
    heading: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => <Popover {...args} onPageChange={action('onPageChange')} />;
Default.args = {
  density: 'structured',
  pointerDirection: 'top',
  pointerPosition: 'left',
  heading: 'Did you know?',
  description: 'The popover supports a heading, image slot, body text, and a page stepper.',
};

export const Short = () => (
  <Popover
    density="short"
    showImage={false}
    showStepper={false}
    heading="Quick note"
    description="Short density: 12px padding, no image, no stepper."
  />
);

export const Structured = () => (
  <Popover
    density="structured"
    heading="Structured"
    description="Structured density: 16px padding with image and paginated stepper."
    onPageChange={action('onPageChange')}
  />
);

export const PointerBottom = () => (
  <Popover pointerDirection="bottom" heading="From below" description="Pointer aligned to the bottom edge." />
);
export const PointerLeft = () => (
  <Popover pointerDirection="left" heading="From the left" description="Pointer aligned to the left edge." />
);
export const PointerRight = () => (
  <Popover pointerDirection="right" heading="From the right" description="Pointer aligned to the right edge." />
);

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
    <Popover
      density="structured"
      pointerDirection="top"
      heading="Structured / top"
      description="16px padding, image, stepper."
    />
    <Popover
      density="structured"
      pointerDirection="bottom"
      heading="Structured / bottom"
      description="16px padding, image, stepper."
    />
    <Popover
      density="short"
      showImage={false}
      showStepper={false}
      pointerDirection="left"
      heading="Short / left"
      description="12px padding, no image, no stepper."
    />
    <Popover
      density="short"
      showImage={false}
      showStepper={false}
      pointerDirection="right"
      heading="Short / right"
      description="12px padding, no image, no stepper."
    />
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };

// ─── Hover demo ──────────────────────────────────────────────────────────
// Click an anchor to toggle a popover and feel the entrance motion: 8px
// directional slide + opacity fade over 70ms. Direction matches placement
// so the popover settles into position rather than popping into existence.

const ClickAnchor = ({ direction, label, children }) => {
  const [show, setShow] = useState(false);
  const offsets = {
    top:    { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 12 },
    bottom: { top: '100%',    left: '50%', transform: 'translateX(-50%)', marginTop: 12 },
    left:   { right: '100%',  top: '50%',  transform: 'translateY(-50%)', marginRight: 12 },
    right:  { left: '100%',   top: '50%',  transform: 'translateY(-50%)', marginLeft: 12 },
  };
  return (
    <span
      onClick={() => setShow((s) => !s)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        padding: '8px 16px',
        background: 'var(--ds-surface-rest, #fff)',
        border: '1px solid var(--ds-lines-neutral-rest, #dedede)',
        borderRadius: 4,
        fontFamily: 'var(--ds-type-font-family-sans)',
        fontSize: 13,
        color: 'var(--ds-text-primary, #0f0f0f)',
        cursor: 'pointer',
        userSelect: 'none',
      }}>
      {label}
      {show && (
        <span style={{ position: 'absolute', zIndex: 10, ...offsets[direction] }}>
          <Popover
            density="short"
            showImage={false}
            showStepper={false}
            pointerDirection={direction}
            heading={`Popover · ${direction}`}
            description="Slides in 8px from the placement direction."
          />
        </span>
      )}
      {children}
    </span>
  );
};

export const ClickEntranceMotion = () => (
  <div
    style={{
      padding: 120,
      background: 'var(--ds-stage-base, #f5f5f5)',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, auto)',
      gap: 120,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ClickAnchor direction="top" label="Click (top)" />
    <ClickAnchor direction="bottom" label="Click (bottom)" />
    <ClickAnchor direction="left" label="Click (left)" />
    <ClickAnchor direction="right" label="Click (right)" />
  </div>
);
ClickEntranceMotion.storyName = 'Click entrance motion';
ClickEntranceMotion.parameters = { controls: { disable: true } };
