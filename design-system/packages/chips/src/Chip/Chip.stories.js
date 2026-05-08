import React from 'react';
import { action } from '@storybook/addon-actions';
import { Chip, ChipSizes, ChipThemes, ChipDropdownDirections } from './index';

export default {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    label: { control: 'text' },
    size: { options: ChipSizes, control: { type: 'radio' } },
    theme: { options: ChipThemes, control: { type: 'radio' } },
    icon: { control: 'boolean' },
    image: { control: 'boolean' },
    closeable: { control: 'boolean' },
    dropdown: { control: 'boolean' },
    dropdownDirection: { options: ChipDropdownDirections, control: { type: 'radio' } },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export const Default = (args) => (
  <Chip {...args} onClick={action('onClick')} onClose={action('onClose')} />
);
Default.args = {
  label: 'Chip',
  size: 'default',
  theme: 'light',
  icon: false,
  image: false,
  closeable: true,
  dropdown: false,
  dropdownDirection: 'down',
  active: false,
  disabled: false,
};

export const WithIcon = () => <Chip label="Selected" icon />;
export const WithImage = () => <Chip label="Avatar" image imageAlt="user" />;
export const WithDropdown = () => <Chip label="Filters" dropdown closeable={false} />;
export const Active = () => <Chip label="Active" active />;
export const Disabled = () => <Chip label="Disabled" disabled />;
export const Small = () => <Chip label="Small" size="small" />;
export const DarkTheme = () => (
  <div style={{ background: '#0e1317', padding: '16px' }}>
    <Chip label="Dark" theme="dark" />
  </div>
);

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', display: 'grid', gap: '16px' }}>
    <h3 style={{ fontSize: 13, fontWeight: 600 }}>Light theme</h3>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Chip label="Default" />
      <Chip label="With icon" icon />
      <Chip label="Avatar" image imageAlt="" />
      <Chip label="Dropdown" dropdown closeable={false} />
      <Chip label="Active" active />
      <Chip label="Disabled" disabled />
      <Chip label="Small" size="small" />
    </div>
    <h3 style={{ fontSize: 13, fontWeight: 600 }}>Dark theme</h3>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: '#0e1317', padding: '16px' }}>
      <Chip label="Default" theme="dark" />
      <Chip label="Active" theme="dark" active />
      <Chip label="Disabled" theme="dark" disabled />
    </div>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
