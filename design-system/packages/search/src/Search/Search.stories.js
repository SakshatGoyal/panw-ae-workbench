import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Search, SearchSizes, SearchBackgrounds, SearchValidations } from './index';

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {
    size: { options: SearchSizes, control: { type: 'radio' } },
    background: { options: SearchBackgrounds, control: { type: 'radio' } },
    validation: { options: [undefined, ...SearchValidations], control: { type: 'select' } },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export const Default = (args) => {
  const [v, setV] = useState('');
  return (
    <Search
      {...args}
      value={v}
      onChange={(e) => {
        setV(e.target.value);
        action('onChange')(e.target.value);
      }}
      onClear={() => {
        setV('');
        action('onClear')();
      }}
    />
  );
};
Default.args = { size: 'md', background: 'grey10', placeholder: 'Search' };

export const Small = () => <Search size="sm" placeholder="Small" />;
export const Large = () => <Search size="lg" placeholder="Large" />;
export const Disabled = () => <Search disabled placeholder="Disabled" />;
export const Error = () => <Search validation="error" placeholder="Error state" />;
export const Success = () => <Search validation="success" placeholder="Success state" />;

export const AllVariants = () => (
  <div style={{ padding: 24, background: 'var(--ds-surface-alt-rest, #f7f7f7)', display: 'grid', gridTemplateColumns: 'repeat(3, 240px)', gap: 24 }}>
    {SearchSizes.map((sz) => (
      <Search key={`grey10-${sz}`} size={sz} placeholder={`grey10 / ${sz}`} />
    ))}
    {SearchSizes.map((sz) => (
      <Search key={`grey0-${sz}`} background="grey0" size={sz} placeholder={`grey0 / ${sz}`} />
    ))}
    <Search validation="error" placeholder="Error" />
    <Search validation="success" placeholder="Success" />
    <Search disabled placeholder="Disabled" />
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
