import React from 'react';
import { action } from '@storybook/addon-actions';
import { Header, HeaderAlignments, HeaderSizes, HeaderTypes } from './index';
import mdx from './Header.mdx';

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    alignment: { options: HeaderAlignments, control: { type: 'radio' } },
    size: { options: HeaderSizes, control: { type: 'radio' } },
    type: { options: HeaderTypes, control: { type: 'select' } },
    filter: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => (
  <div style={{ width: 240 }}>
    <Header
      {...args}
      onHeaderClick={action('onHeaderClick')}
      onFilterClick={action('onFilterClick')}
    />
  </div>
);
Default.args = { children: 'Column', alignment: 'left', size: 'sm', type: 'basic', filter: false };

export const WithFilter = () => (
  <div style={{ width: 240 }}>
    <Header filter onFilterClick={action('onFilterClick')}>
      Filterable
    </Header>
  </div>
);

export const Ascending = () => (
  <div style={{ width: 240 }}>
    <Header type="ascending">Ascending</Header>
  </div>
);

export const Descending = () => (
  <div style={{ width: 240 }}>
    <Header type="descending">Descending</Header>
  </div>
);

export const RightAligned = () => (
  <div style={{ width: 240 }}>
    <Header alignment="right">Right-aligned</Header>
  </div>
);

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
    {HeaderTypes.map((t) => (
      <div key={t}>
        <h3 style={{ margin: '4px 0', fontSize: 12, fontWeight: 600 }}>type: {t}</h3>
        {HeaderSizes.map((s) => (
          <Header key={s} type={t} size={s}>{`${t} / ${s}`}</Header>
        ))}
      </div>
    ))}
    <div>
      <h3 style={{ margin: '4px 0', fontSize: 12, fontWeight: 600 }}>filter visible</h3>
      <Header filter>Filterable</Header>
    </div>
    <div>
      <h3 style={{ margin: '4px 0', fontSize: 12, fontWeight: 600 }}>right aligned</h3>
      <Header alignment="right">Right</Header>
    </div>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
