import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Checkbox, CheckboxStatuses } from './index';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    status: { options: CheckboxStatuses, control: { type: 'radio' } },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  tags: ['autodocs'],
};

export const Default = (args) => {
  const [status, setStatus] = useState(args.status);
  return (
    <Checkbox
      {...args}
      status={status}
      onChange={(next, e) => {
        setStatus(next);
        action('onChange')(next, e);
      }}
    />
  );
};
Default.args = { status: 'unchecked', disabled: false, label: 'Checkbox Label' };

export const Unchecked = () => <Checkbox status="unchecked" label="Unchecked" />;
export const Checked = () => <Checkbox status="checked" label="Checked" />;
export const Indeterminate = () => <Checkbox status="indeterminate" label="Indeterminate" />;
export const Disabled = () => <Checkbox status="unchecked" disabled label="Disabled" />;
export const DisabledChecked = () => <Checkbox status="checked" disabled label="Disabled checked" />;

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', display: 'grid', gap: '12px' }}>
    {CheckboxStatuses.map((s) => (
      <div key={s} style={{ display: 'flex', gap: '12px' }}>
        <Checkbox status={s} label={s} />
        <Checkbox status={s} label={`${s} disabled`} disabled />
      </div>
    ))}
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
