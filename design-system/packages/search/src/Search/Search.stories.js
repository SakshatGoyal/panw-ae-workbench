import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Search, SearchSizes, SearchBackgrounds, SearchShapes } from './index';
import mdx from './Search.mdx';

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {
    size: { options: SearchSizes, control: { type: 'radio' } },
    background: { options: SearchBackgrounds, control: { type: 'radio' } },
    shape: { options: SearchShapes, control: { type: 'radio' } },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: { docs: { page: mdx } },
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
Default.args = { size: 'md', background: 'grey10', shape: 'rounded', placeholder: 'Search' };

export const Pill = () => <Search shape="pill" placeholder="Pill search" />;
export const Standard = () => <Search shape="standard" placeholder="Standard" />;
export const Small = () => <Search size="sm" placeholder="Small" />;
export const Large = () => <Search size="lg" placeholder="Large" />;
export const Disabled = () => <Search disabled placeholder="Disabled" />;

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'grid', gridTemplateColumns: 'repeat(3, 240px)', gap: 24 }}>
    {SearchShapes.map((sh) =>
      SearchSizes.map((sz) => (
        <Search key={`${sh}-${sz}`} shape={sh} size={sz} placeholder={`${sh}/${sz}`} />
      ))
    )}
    <Search background="grey0" placeholder="Grey 0 bg" />
    <Search disabled placeholder="Disabled" />
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
