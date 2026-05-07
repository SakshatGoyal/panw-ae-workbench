import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import {
  TextEntryRounded,
  TextEntryBackgrounds,
  TextEntrySizes,
  TextEntryTypes,
  TextEntryStates,
} from './index';
import mdx from './TextEntryRounded.mdx';

export default {
  title: 'Components/TextEntryRounded',
  component: TextEntryRounded,
  argTypes: {
    background: { options: TextEntryBackgrounds, control: { type: 'radio' } },
    size: { options: TextEntrySizes, control: { type: 'radio' } },
    inputType: { options: TextEntryTypes, control: { type: 'radio' } },
    forceState: { options: [undefined, ...TextEntryStates], control: { type: 'select' } },
    title: { control: 'text' },
    description: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => {
  const [v, setV] = useState('');
  return (
    <TextEntryRounded
      {...args}
      value={v}
      onChange={(val) => {
        setV(val);
        action('onChange')(val);
      }}
      onClear={() => {
        setV('');
        action('onClear')();
      }}
    />
  );
};
Default.args = {
  background: 'grey-10',
  size: 'default',
  inputType: 'default',
  title: 'Title',
  description: 'Optional Description',
  placeholder: 'Placeholder',
};

export const Area = () => <TextEntryRounded title="Notes" inputType="area" placeholder="Type a note" />;
export const Small = () => <TextEntryRounded title="Small" size="small" />;
export const Large = () => <TextEntryRounded title="Large" size="large" />;
export const Disabled = () => <TextEntryRounded title="Disabled" disabled />;
export const ReadOnly = () => <TextEntryRounded title="Read only" readOnly value="Read-only value" />;
export const Error = () => <TextEntryRounded title="Error" forceState="error" />;
export const Success = () => <TextEntryRounded title="Success" forceState="success" />;

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'grid', gridTemplateColumns: 'repeat(2, 200px)', gap: 24 }}>
    {TextEntryStates.map((s) => (
      <TextEntryRounded
        key={s}
        title={`State: ${s}`}
        forceState={s}
        value={s === 'active' || s === 'readonly' ? 'Sample text' : ''}
      />
    ))}
    <TextEntryRounded title="Type: area" inputType="area" />
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
