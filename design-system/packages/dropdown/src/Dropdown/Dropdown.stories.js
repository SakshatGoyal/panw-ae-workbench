import React from 'react';
import { action } from '@storybook/addon-actions';
import { Dropdown, DropdownBackgrounds, DropdownSizes } from './index';
import mdx from './Dropdown.mdx';

const sampleOptions = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
];

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    background: { options: DropdownBackgrounds, control: { type: 'radio' } },
    size: { options: DropdownSizes, control: { type: 'radio' } },
    title: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
    showTitle: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => (
  <Dropdown {...args} options={sampleOptions} onChange={action('onChange')} />
);
Default.args = {
  title: 'Title',
  placeholder: 'Placeholder',
  description: 'Optional Description',
  showTitle: true,
  showDescription: true,
  background: 'grey10',
  size: 'default',
  disabled: false,
  readOnly: false,
};

export const Large = () => (
  <Dropdown title="Large" size="large" options={sampleOptions} />
);

export const Disabled = () => (
  <Dropdown title="Disabled" disabled options={sampleOptions} />
);

export const ReadOnly = () => (
  <Dropdown title="Read only" readOnly selectedValue="option-1" options={sampleOptions} />
);

export const PreSelected = () => (
  <Dropdown title="Pre-selected" selectedValue="option-2" options={sampleOptions} />
);

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'grid', gridTemplateColumns: 'repeat(2, 320px)', gap: 24 }}>
    <Dropdown title="Default / grey10" options={sampleOptions} />
    <Dropdown title="Default / grey00" background="grey00" options={sampleOptions} />
    <Dropdown title="Large / grey10" size="large" options={sampleOptions} />
    <Dropdown title="Large / grey00" size="large" background="grey00" options={sampleOptions} />
    <Dropdown title="Disabled" disabled options={sampleOptions} />
    <Dropdown title="Read only" readOnly selectedValue="option-1" options={sampleOptions} />
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
