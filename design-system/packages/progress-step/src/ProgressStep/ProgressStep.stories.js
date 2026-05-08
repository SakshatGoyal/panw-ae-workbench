import React from 'react';
import { action } from '@storybook/addon-actions';
import { ProgressStep, ProgressStepItem, ProgressSizes } from '../index';

export default {
  title: 'Components/ProgressStep',
  component: ProgressStep,
  subcomponents: { ProgressStepItem },
  argTypes: {
    size: { options: ProgressSizes, control: { type: 'radio' } },
    showDescription: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export const Default = (args) => (
  <ProgressStep {...args}>
    <ProgressStepItem label="Setup" description="Configure account" status="success" />
    <ProgressStepItem label="Details" description="Add details" status="active" />
    <ProgressStepItem label="Review" description="Confirm setup" status="inactive" />
  </ProgressStep>
);
Default.args = { size: 'default', showDescription: true };

export const Compact = () => (
  <ProgressStep size="compact">
    <ProgressStepItem label="Step 1" status="success" />
    <ProgressStepItem label="Step 2" status="active" />
    <ProgressStepItem label="Step 3" status="inactive" />
  </ProgressStep>
);

export const WithStatuses = () => (
  <ProgressStep>
    <ProgressStepItem label="Done" description="Completed" status="success" />
    <ProgressStepItem label="Heads up" description="Warning state" status="warning" />
    <ProgressStepItem label="Failed" description="Error state" status="error" />
    <ProgressStepItem label="Current" description="Active step" status="active" />
    <ProgressStepItem label="Upcoming" description="Inactive step" status="inactive" />
  </ProgressStep>
);

export const Clickable = () => (
  <ProgressStep>
    <ProgressStepItem label="One" status="success" onClick={action('click 1')} />
    <ProgressStepItem label="Two" status="active" onClick={action('click 2')} />
    <ProgressStepItem label="Three" status="inactive" onClick={action('click 3')} />
  </ProgressStep>
);

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', display: 'grid', gap: '16px', minWidth: 800 }}>
    <p style={{ fontSize: 12 }}>Default size</p>
    <ProgressStep>
      <ProgressStepItem label="Success" description="ok" status="success" />
      <ProgressStepItem label="Warning" description="warn" status="warning" />
      <ProgressStepItem label="Error" description="err" status="error" />
      <ProgressStepItem label="Active" description="now" status="active" />
      <ProgressStepItem label="Inactive" description="next" status="inactive" />
    </ProgressStep>
    <p style={{ fontSize: 12 }}>Compact size</p>
    <ProgressStep size="compact">
      <ProgressStepItem label="Success" status="success" />
      <ProgressStepItem label="Warning" status="warning" />
      <ProgressStepItem label="Error" status="error" />
      <ProgressStepItem label="Active" status="active" />
      <ProgressStepItem label="Inactive" status="inactive" />
    </ProgressStep>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
