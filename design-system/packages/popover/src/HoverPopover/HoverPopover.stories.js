import React from 'react';
import { action } from '@storybook/addon-actions';
import { HoverPopover, HoverPopoverPlacements } from './index';

export default {
  title: 'Components/HoverPopover',
  component: HoverPopover,
  argTypes: {
    placement: { options: HoverPopoverPlacements, control: { type: 'select' } },
    openDelay: { control: { type: 'number', min: 0, step: 20 } },
    closeDelay: { control: { type: 'number', min: 0, step: 20 } },
    disabled: { control: 'boolean' },
    heading: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Hover-triggered popover. Wraps a trigger element and shows a Popover panel on hover with open/close grace periods that allow the user to hover INTO the panel.',
      },
    },
  },
  tags: ['autodocs'],
};

const Trigger = React.forwardRef(({ children = 'Hover me', ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    style={{
      padding: '6px 12px',
      border: '1px solid var(--ds-border-strong-rest, #8f8f8f)',
      borderRadius: 'var(--ds-radius-tight)',
      background: 'var(--ds-surface-rest, #fff)',
      color: 'var(--ds-text-primary, #262626)',
      font: 'inherit',
      cursor: 'pointer',
    }}>
    {children}
  </button>
));
Trigger.displayName = 'Trigger';

export const Default = (args) => (
  <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
    <HoverPopover
      {...args}
      trigger={<Trigger>Hover for details</Trigger>}
      onOpenChange={action('onOpenChange')}
    />
  </div>
);
Default.args = {
  placement: 'bottom-start',
  openDelay: 80,
  closeDelay: 160,
  heading: 'Account health',
  description: 'Renewal in 42 days. Coverage: 3 products. Trend: stable.',
};

export const CustomContent = () => (
  <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
    <HoverPopover trigger={<Trigger>Hover for custom body</Trigger>} placement="bottom-start">
      <div
        style={{
          background: 'var(--ds-surface-rest, #fff)',
          boxShadow: 'var(--ds-shadow-flyout)',
          borderRadius: 'var(--ds-radius-standard)',
          padding: 16,
          minWidth: 240,
          fontSize: 13,
          lineHeight: '18px',
          color: 'var(--ds-text-primary)',
        }}>
        <strong>Custom body</strong>
        <p style={{ margin: '8px 0 0' }}>
          When `children` is passed, the default Popover panel is replaced wholesale. Heading,
          description, and stepper props are ignored.
        </p>
      </div>
    </HoverPopover>
  </div>
);

export const PlacementMatrix = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, max-content)',
      gap: 32,
      padding: 120,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    {HoverPopoverPlacements.map((p) => (
      <HoverPopover
        key={p}
        trigger={<Trigger>{p}</Trigger>}
        placement={p}
        heading={p}
        description="Renewal in 42 days."
      />
    ))}
  </div>
);
