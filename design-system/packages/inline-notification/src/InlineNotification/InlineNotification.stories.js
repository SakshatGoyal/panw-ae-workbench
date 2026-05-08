import React from 'react';
import { action } from '@storybook/addon-actions';
import { InlineNotification, InlineNotificationTypes, InlineNotificationInfoTypes } from './index';

export default {
  title: 'Components/InlineNotification',
  component: InlineNotification,
  argTypes: {
    type: { options: InlineNotificationTypes, control: { type: 'select' } },
    infoType: { options: InlineNotificationInfoTypes, control: { type: 'radio' } },
    closeButton: { control: 'boolean' },
    children: { control: 'text' },
  },
  tags: ['autodocs'],
};

export const Default = (args) => (
  <div style={{ width: 480 }}>
    <InlineNotification {...args} onClose={action('onClose')} />
  </div>
);
Default.args = {
  type: 'info',
  infoType: 'page-level',
  children: 'Notification message goes here.',
  closeButton: true,
};

export const Alert = () => (
  <div style={{ width: 480 }}>
    <InlineNotification type="alert">Something needs your attention.</InlineNotification>
  </div>
);
export const Error = () => (
  <div style={{ width: 480 }}>
    <InlineNotification type="error">An error occurred.</InlineNotification>
  </div>
);
export const Success = () => (
  <div style={{ width: 480 }}>
    <InlineNotification type="success">Operation completed.</InlineNotification>
  </div>
);
export const ProductLevel = () => (
  <div style={{ width: 480 }}>
    <InlineNotification type="info" infoType="product-level">High contrast banner.</InlineNotification>
  </div>
);

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: 12, width: 520 }}>
    {InlineNotificationTypes.map((t) =>
      InlineNotificationInfoTypes.map((it) => (
        <InlineNotification key={`${t}-${it}`} type={t} infoType={it}>
          {`${t} / ${it}`}
        </InlineNotification>
      ))
    )}
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
