import React from 'react';
import { action } from '@storybook/addon-actions';
import { Link, LinkSizes, LinkColors, LinkForceStates } from './index';
import mdx from './Link.mdx';

const argTypes = {
  size: { options: LinkSizes, control: { type: 'radio' } },
  color: { options: LinkColors, control: { type: 'radio' } },
  disabled: { control: 'boolean' },
  leftIcon: { control: 'boolean' },
  rightIcon: { control: 'boolean' },
  href: { control: 'text' },
  forceState: { options: ['none', ...LinkForceStates], control: { type: 'select' } },
};

export default {
  title: 'Components/Link',
  component: Link,
  argTypes,
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

export const Default = (args) => {
  const { forceState, ...rest } = args;
  return (
    <Link
      {...rest}
      forceState={forceState === 'none' ? undefined : forceState}
      onClick={action('onClick')}
    >
      Link text
    </Link>
  );
};
Default.args = {
  size: '14px',
  color: 'blue',
  disabled: false,
  leftIcon: false,
  rightIcon: false,
  href: '#',
  forceState: 'none',
};

export const Blue = () => <Link href="#" color="blue">Blue link</Link>;
export const Black = () => <Link href="#" color="black">Black link</Link>;
export const Large = () => <Link href="#" size="18px">Large link</Link>;
export const WithLeftIcon = () => <Link href="#" leftIcon>Back</Link>;
export const WithRightIcon = () => <Link href="#" rightIcon>Continue</Link>;
export const Disabled = () => <Link href="#" disabled>Disabled link</Link>;
export const SpanLink = () => <Link onClick={action('onClick')}>No href, renders as span</Link>;

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', display: 'grid', gap: '12px' }}>
    {LinkColors.map((color) =>
      LinkSizes.map((size) => (
        <div key={`${color}-${size}`} style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <span style={{ width: 90, fontSize: 12 }}>{color} / {size}</span>
          <Link href="#" color={color} size={size}>Default</Link>
          <Link href="#" color={color} size={size} forceState="hover">Hover</Link>
          <Link href="#" color={color} size={size} forceState="pressed">Pressed</Link>
          <Link href="#" color={color} size={size} disabled>Disabled</Link>
          <Link href="#" color={color} size={size} leftIcon>With Left</Link>
          <Link href="#" color={color} size={size} rightIcon>With Right</Link>
        </div>
      ))
    )}
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
