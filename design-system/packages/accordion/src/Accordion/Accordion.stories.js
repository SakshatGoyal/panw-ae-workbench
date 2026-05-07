import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Sun, Star, Bell } from 'lucide-react';
import {
  Accordion,
  AccordionSizes,
  AccordionThemes,
  AccordionOrientations,
} from './index';
import mdx from './Accordion.mdx';

const iconMap = { Sun, Star, Bell };

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    size: { options: AccordionSizes, control: { type: 'radio' } },
    theme: { options: AccordionThemes, control: { type: 'radio' } },
    orientation: { options: AccordionOrientations, control: { type: 'radio' } },
    open: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    showIcon: { control: 'boolean' },
    showTag: { control: 'boolean' },
    tagLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    renderIcon: { options: ['Sun', 'Star', 'Bell'], control: { type: 'select' } },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => {
  const [open, setOpen] = useState(args.open);
  React.useEffect(() => setOpen(args.open), [args.open]);
  return (
    <Accordion
      {...args}
      open={open}
      renderIcon={iconMap[args.renderIcon] || Sun}
      onToggle={() => {
        action('onToggle')();
        setOpen((v) => !v);
      }}>
      <p style={{ margin: 0 }}>Accordion content goes here.</p>
    </Accordion>
  );
};

Default.args = {
  size: 'default',
  theme: 'gray00',
  orientation: 'left',
  open: false,
  title: 'Accordion title',
  description: '',
  showIcon: false,
  showTag: false,
  tagLabel: 'New',
  disabled: false,
  renderIcon: 'Sun',
};

export const Open = () => (
  <Accordion title="Open accordion" open onToggle={action('onToggle')}>
    <p style={{ margin: 0 }}>Visible content</p>
  </Accordion>
);

export const WithDescription = () => (
  <Accordion
    title="With description"
    description="Supplemental copy below the title."
    open
    onToggle={action('onToggle')}>
    Content
  </Accordion>
);

export const WithIcon = () => (
  <Accordion title="With icon" showIcon renderIcon={Star} onToggle={action('onToggle')}>
    Content
  </Accordion>
);

export const WithTag = () => (
  <Accordion title="With tag" showTag tagLabel="Beta" tagColor="green" onToggle={action('onToggle')}>
    Content
  </Accordion>
);

export const Disabled = () => (
  <Accordion title="Disabled" disabled onToggle={action('onToggle')}>
    Content
  </Accordion>
);

export const RightOrientation = () => (
  <Accordion title="Right orientation" orientation="right" onToggle={action('onToggle')}>
    Content
  </Accordion>
);

export const Gray10Theme = () => (
  <Accordion title="Gray 10" theme="gray10" onToggle={action('onToggle')}>
    Content
  </Accordion>
);

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, background: '#f9f9f9' }}>
    {AccordionSizes.map((size) => (
      <div key={size}>
        <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Size: {size}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Accordion size={size} title={`${size} closed`} />
          <Accordion size={size} title={`${size} open`} open description="With description" showIcon showTag tagLabel="Tag" />
        </div>
      </div>
    ))}
    <div>
      <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Theme: gray10</h3>
      <Accordion theme="gray10" title="Gray 10 theme" />
    </div>
    <div>
      <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Orientation: right</h3>
      <Accordion orientation="right" title="Right orientation" />
    </div>
    <div>
      <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Disabled</h3>
      <Accordion title="Disabled" disabled />
    </div>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
