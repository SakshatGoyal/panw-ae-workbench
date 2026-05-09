import React from 'react';
import { action } from '@storybook/addon-actions';
import { MultiSelect, MultiSelectBackgrounds, MultiSelectSizes } from './index';
import mdx from './MultiSelect.mdx';

const sample = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
  { label: 'Option 4', value: 'option-4' },
];

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  argTypes: {
    background: { options: MultiSelectBackgrounds, control: { type: 'radio' } },
    size: { options: MultiSelectSizes, control: { type: 'radio' } },
    visibleChipCount: { control: { type: 'number', min: 1, max: 5 } },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => (
  <MultiSelect {...args} options={sample} onChange={action('onChange')} />
);
Default.args = {
  title: 'Title',
  placeholder: 'Placeholder',
  description: 'Optional Description',
  background: 'grey10',
  size: 'default',
  visibleChipCount: 2,
  disabled: false,
  readOnly: false,
};

export const WithSelections = () => (
  <MultiSelect
    title="Pre-selected"
    options={sample}
    selectedValues={['option-1', 'option-2', 'option-3']}
  />
);

export const Large = () => (
  <MultiSelect title="Large" size="large" options={sample} />
);

export const Disabled = () => (
  <MultiSelect title="Disabled" disabled options={sample} />
);

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'grid', gridTemplateColumns: 'repeat(2, 320px)', gap: 24 }}>
    <MultiSelect title="Empty" options={sample} />
    <MultiSelect title="Few selected" options={sample} selectedValues={['option-1']} />
    <MultiSelect title="Overflow" options={sample} selectedValues={['option-1', 'option-2', 'option-3', 'option-4']} />
    <MultiSelect title="Large" size="large" options={sample} selectedValues={['option-1', 'option-2']} />
    <MultiSelect title="Grey 00" background="grey00" options={sample} />
    <MultiSelect title="Disabled" disabled options={sample} />
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
