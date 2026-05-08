import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { NumberInput, NumberInputBackgrounds } from './index';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  argTypes: {
    background: { options: NumberInputBackgrounds, control: { type: 'radio' } },
    title: { control: 'text' },
    description: { control: 'text' },
    step: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export const Default = (args) => {
  const [v, setV] = useState(args.value ?? 10);
  return (
    <NumberInput
      {...args}
      value={v}
      onChange={(n) => {
        setV(n);
        action('onChange')(n);
      }}
    />
  );
};
Default.args = { background: 'grey-00', title: 'Quantity', value: 10, step: 1 };

export const WithMinMax = () => {
  const [v, setV] = useState(5);
  return <NumberInput title="0–10" min={0} max={10} value={v} onChange={setV} />;
};

export const Grey10 = () => {
  const [v, setV] = useState(0);
  return <NumberInput title="Grey 10" background="grey-10" value={v} onChange={setV} />;
};

export const Disabled = () => <NumberInput title="Disabled" disabled value={10} />;

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'grid', gridTemplateColumns: 'repeat(2, 240px)', gap: 24 }}>
    <NumberInput title="Default" value={10} />
    <NumberInput title="Grey 10" background="grey-10" value={10} />
    <NumberInput title="Active" forceState="active" value={10} />
    <NumberInput title="Disabled" disabled value={10} />
    <NumberInput title="Min/Max" min={0} max={5} value={3} />
    <NumberInput title="No description" showDescription={false} value={10} />
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
