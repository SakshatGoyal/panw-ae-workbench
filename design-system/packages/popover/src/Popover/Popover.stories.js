import React from 'react';
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
