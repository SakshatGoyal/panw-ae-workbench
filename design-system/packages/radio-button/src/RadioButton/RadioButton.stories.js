import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { RadioButton } from './index';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  tags: ['autodocs'],
};

export const Default = (args) => {
  const [checked, setChecked] = useState(args.checked);
  return (
    <RadioButton
      {...args}
      checked={checked}
      onChange={(next, e) => {
        setChecked(next);
        action('onChange')(next, e);
      }}
    />
  );
};
Default.args = { checked: false, disabled: false, label: 'Radio Button Label' };

export const Unchecked = () => <RadioButton label="Unchecked" />;
export const Checked = () => <RadioButton label="Checked" checked />;
export const Disabled = () => <RadioButton label="Disabled unchecked" disabled />;
export const DisabledChecked = () => <RadioButton label="Disabled checked" disabled checked />;

export const Group = () => {
  const [value, setValue] = useState('a');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {['a', 'b', 'c'].map((v) => (
        <RadioButton
          key={v}
          name="group"
          value={v}
          checked={value === v}
          onChange={() => setValue(v)}
          label={`Option ${v.toUpperCase()}`}
        />
      ))}
    </div>
  );
};

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', display: 'grid', gap: '12px' }}>
    <RadioButton label="Default unchecked" />
    <RadioButton label="Default checked" checked />
    <RadioButton label="Disabled unchecked" disabled />
    <RadioButton label="Disabled checked" disabled checked />
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
