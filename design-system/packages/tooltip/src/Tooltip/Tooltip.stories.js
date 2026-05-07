import React from 'react';
import { action } from '@storybook/addon-actions';
import { Tooltip, DescriptiveTooltip, TooltipKinds, TooltipDirections, TooltipPositions } from './index';
import mdx from './Tooltip.mdx';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    kind: { options: TooltipKinds, control: { type: 'radio' } },
    pointerDirection: { options: TooltipDirections, control: { type: 'select' } },
    pointerPosition: { options: TooltipPositions, control: { type: 'select' } },
    content: { control: 'text' },
    heading: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => <Tooltip {...args} onPageChange={action('onPageChange')} />;
Default.args = {
  kind: 'default',
  pointerDirection: 'top',
  pointerPosition: 'left',
  content: 'A helpful hint about a UI element.',
};

export const Descriptive = () => (
  <DescriptiveTooltip
    heading="Did you know?"
    description="The descriptive variant supports a heading, image slot, body text, and a page stepper."
    onPageChange={action('onPageChange')}
  />
);

export const PointerBottom = () => <Tooltip pointerDirection="bottom" content="From below." />;
export const PointerLeft = () => <Tooltip pointerDirection="left" content="From the left." />;
export const PointerRight = () => <Tooltip pointerDirection="right" content="From the right." />;

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 24 }}>
    {TooltipDirections.map((d) => (
      <Tooltip key={`def-${d}`} kind="default" pointerDirection={d} content={`default / ${d}`} />
    ))}
    <DescriptiveTooltip
      heading="Heading"
      description="Descriptive variant with image + stepper."
      pointerDirection="top"
    />
    <DescriptiveTooltip
      heading="Heading"
      description="Descriptive variant with image + stepper."
      pointerDirection="bottom"
    />
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
