import React from 'react';
import { Tooltip, TooltipDirections, TooltipPositions } from './index';
import mdx from './Tooltip.mdx';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    pointerDirection: { options: TooltipDirections, control: { type: 'select' } },
    pointerPosition: { options: TooltipPositions, control: { type: 'select' } },
    content: { control: 'text' },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => <Tooltip {...args} />;
Default.args = {
  pointerDirection: 'top',
  pointerPosition: 'left',
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
