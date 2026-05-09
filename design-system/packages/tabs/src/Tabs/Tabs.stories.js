import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Star } from 'lucide-react';
import { Tabs } from './index';
import { Tab } from '../Tab';
import mdx from './Tabs.mdx';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = () => {
  const [i, setI] = useState(0);
  return (
    <Tabs selectedIndex={i} onChange={(n) => { setI(n); action('onChange')(n); }}>
      <Tab label="Overview" />
      <Tab label="Details" />
      <Tab label="Activity" />
    </Tabs>
  );
};

export const NoContainer = () => {
  const [i, setI] = useState(0);
  return (
    <Tabs selectedIndex={i} onChange={setI} container={false}>
      <Tab label="Overview" />
      <Tab label="Details" />
      <Tab label="Activity" />
    </Tabs>
  );
};

export const WithIconsAndTag = () => {
  const [i, setI] = useState(0);
  return (
    <Tabs selectedIndex={i} onChange={setI}>
      <Tab label="Overview" showIcon renderIcon={Star} />
      <Tab label="New" showTag tagLabel="Beta" />
      <Tab label="Disabled" disabled />
    </Tabs>
  );
};

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <h3 style={{ margin: '4px 0', fontSize: 12, fontWeight: 600 }}>container=true</h3>
      <Tabs selectedIndex={0}>
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
    </div>
    <div>
      <h3 style={{ margin: '4px 0', fontSize: 12, fontWeight: 600 }}>container=false</h3>
      <Tabs selectedIndex={1} container={false}>
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
    </div>
    <div>
      <h3 style={{ margin: '4px 0', fontSize: 12, fontWeight: 600 }}>tags + icons + disabled</h3>
      <Tabs selectedIndex={0}>
        <Tab label="Overview" showIcon renderIcon={Star} />
        <Tab label="Beta" showTag tagLabel="New" />
        <Tab label="Disabled" disabled />
      </Tabs>
    </div>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
