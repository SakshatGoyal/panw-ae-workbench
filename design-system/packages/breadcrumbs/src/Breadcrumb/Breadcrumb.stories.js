import React from 'react';
import { action } from '@storybook/addon-actions';
import { Breadcrumb, BreadcrumbItem } from '../index';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  subcomponents: { BreadcrumbItem },
  argTypes: { collapsed: { control: 'boolean' } },
  tags: ['autodocs'],
};

export const Default = (args) => (
  <Breadcrumb {...args} onExpand={action('onExpand')}>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/products">Products</BreadcrumbItem>
    <BreadcrumbItem href="/products/laptops">Laptops</BreadcrumbItem>
    <BreadcrumbItem>MacBook Pro</BreadcrumbItem>
  </Breadcrumb>
);
Default.args = { collapsed: false };

export const Two = () => (
  <Breadcrumb>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem>Settings</BreadcrumbItem>
  </Breadcrumb>
);

export const WithDisabled = () => (
  <Breadcrumb>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem disabled>Restricted</BreadcrumbItem>
    <BreadcrumbItem>Current</BreadcrumbItem>
  </Breadcrumb>
);

export const Collapsed = () => (
  <Breadcrumb collapsed onExpand={action('onExpand')}>
    <BreadcrumbItem href="/a">Level 1</BreadcrumbItem>
    <BreadcrumbItem href="/b">Level 2</BreadcrumbItem>
    <BreadcrumbItem href="/c">Level 3</BreadcrumbItem>
    <BreadcrumbItem href="/d">Level 4</BreadcrumbItem>
    <BreadcrumbItem>Current</BreadcrumbItem>
  </Breadcrumb>
);

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', display: 'grid', gap: '16px' }}>
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/p">Products</BreadcrumbItem>
      <BreadcrumbItem>Current</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem disabled>Restricted</BreadcrumbItem>
      <BreadcrumbItem>Current</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb collapsed>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/a">A</BreadcrumbItem>
      <BreadcrumbItem href="/b">B</BreadcrumbItem>
      <BreadcrumbItem>Current</BreadcrumbItem>
    </Breadcrumb>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
