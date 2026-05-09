import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Toggle, ToggleSizes, ToggleLabelPositions } from './index';
import mdx from './Toggle.mdx';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    on: { control: 'boolean' },
    label: { control: 'text' },
    showInfo: { control: 'boolean' },
    showStatus: { control: 'boolean' },
    onStatusText: { control: 'text' },
    offStatusText: { control: 'text' },
    labelPosition: { options: ToggleLabelPositions, control: { type: 'radio' } },
    size: { options: ToggleSizes, control: { type: 'radio' } },
    disabled: { control: 'boolean' },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => {
  const [on, setOn] = useState(args.on);
  return (
    <Toggle
      {...args}
      on={on}
      onChange={(next, e) => {
        setOn(next);
        action('onChange')(next, e);
      }}
    />
  );
};
Default.args = {
  on: true,
  label: 'Toggle Label',
  showInfo: false,
  showStatus: false,
  labelPosition: 'left',
  size: 'default',
  disabled: false,
};

export const On = () => <Toggle on label="On" />;
export const Off = () => <Toggle on={false} label="Off" />;
export const Small = () => <Toggle on size="small" label="Small" />;
export const LabelRight = () => <Toggle on labelPosition="right" label="Label Right" />;
export const LabelTop = () => <Toggle on labelPosition="top" label="Label Top" />;
export const WithInfo = () => <Toggle on showInfo label="With info icon" />;
export const Disabled = () => <Toggle on disabled label="Disabled" />;

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', display: 'grid', gap: '16px' }}>
    {ToggleLabelPositions.map((labelPosition) =>
      ToggleSizes.map((size) =>
        [true, false].map((on) => (
          <div key={`${labelPosition}-${size}-${on}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ width: 200, fontSize: 12 }}>
              {labelPosition} / {size} / {on ? 'on' : 'off'}
            </span>
            <Toggle on={on} size={size} labelPosition={labelPosition} label="Label" />
          </div>
        ))
      )
    )}
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
