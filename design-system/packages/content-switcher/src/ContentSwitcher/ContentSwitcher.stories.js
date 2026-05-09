import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { List, Grid, Calendar } from 'lucide-react';
import { ContentSwitcher, ContentSwitcherSizes, ContentSwitcherBackgrounds } from './index';
import mdx from './ContentSwitcher.mdx';

const baseItems = [{ label: 'First' }, { label: 'Second' }, { label: 'Third' }];

export default {
  title: 'Components/ContentSwitcher',
  component: ContentSwitcher,
  argTypes: {
    size: { options: ContentSwitcherSizes, control: { type: 'radio' } },
    background: { options: ContentSwitcherBackgrounds, control: { type: 'radio' } },
    disabled: { control: 'boolean' },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => {
  const [idx, setIdx] = useState(0);
  return (
    <ContentSwitcher
      {...args}
      items={baseItems}
      selectedIndex={idx}
      onChange={(i) => {
        setIdx(i);
        action('onChange')(i);
      }}
    />
  );
};
Default.args = { size: 'small', background: 'gray10', disabled: false };

export const Small = () => {
  const [idx, setIdx] = useState(0);
  return <ContentSwitcher size="small" items={baseItems} selectedIndex={idx} onChange={setIdx} />;
};

export const DefaultSize = () => {
  const [idx, setIdx] = useState(0);
  return <ContentSwitcher size="default" items={baseItems} selectedIndex={idx} onChange={setIdx} />;
};
DefaultSize.storyName = 'Size: default';

export const Large = () => {
  const [idx, setIdx] = useState(0);
  return <ContentSwitcher size="large" items={baseItems} selectedIndex={idx} onChange={setIdx} />;
};

export const WithIcons = () => {
  const [idx, setIdx] = useState(0);
  return (
    <ContentSwitcher
      items={[
        { label: 'List', renderIcon: List },
        { label: 'Grid', renderIcon: Grid },
        { label: 'Calendar', renderIcon: Calendar },
      ]}
      selectedIndex={idx}
      onChange={setIdx}
    />
  );
};

export const Disabled = () => (
  <ContentSwitcher disabled items={baseItems} selectedIndex={0} />
);

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', display: 'grid', gap: '16px' }}>
    {ContentSwitcherSizes.map((size) => (
      <div key={size}>
        <p style={{ fontSize: 12, marginBottom: 4 }}>size: {size}</p>
        <ContentSwitcher items={baseItems} selectedIndex={0} size={size} />
      </div>
    ))}
    <div>
      <p style={{ fontSize: 12, marginBottom: 4 }}>disabled</p>
      <ContentSwitcher items={baseItems} selectedIndex={1} disabled />
    </div>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
