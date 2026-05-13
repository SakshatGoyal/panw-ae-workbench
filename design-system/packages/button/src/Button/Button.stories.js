/**
 * Storybook stories for the Button component.
 *
 * Stage rebuild: five canonical kinds (primary, secondary, tertiary, ghost,
 * danger), one corner (radius.tight = 4px). Brand-vs-neutral intent encoded
 * in kind name. The shape axis is gone.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Plus, ChevronRight, Trash2 } from 'lucide-react';
import Button, { ButtonSkeleton } from './index';
import mdx from './Button.mdx';

const iconMap = {
  None: undefined,
  Plus: (props) => <Plus size={16} {...props} />,
  ChevronRight: (props) => <ChevronRight size={16} {...props} />,
  Trash: (props) => <Trash2 size={16} {...props} />,
};

const sharedArgTypes = {
  kind: {
    options: ['primary', 'secondary', 'tertiary', 'ghost', 'ghost-brand', 'danger', 'highlight'],
    control: { type: 'select' },
    description:
      'Visual style variant. Five canonical kinds; brand-vs-neutral intent ' +
      'is encoded in the kind name.',
    table: { defaultValue: { summary: '"primary"' } },
  },
  size: {
    options: ['small', 'default', 'large'],
    control: { type: 'select' },
    description: 'Button height: small=32px, default=40px, large=48px',
    table: { defaultValue: { summary: '"default"' } },
  },
  disabled: {
    control: 'boolean',
    table: { defaultValue: { summary: false } },
  },
  renderIcon: {
    options: ['None', 'Plus', 'ChevronRight', 'Trash'],
    control: { type: 'select' },
    description:
      'Icon component to render. Accepts an ElementType (lucide-react component).',
  },
  iconPosition: {
    options: ['left', 'right'],
    control: { type: 'radio' },
    description: 'Position of the icon relative to the label.',
    table: { defaultValue: { summary: '"left"' } },
  },
  iconDescription: {
    control: 'text',
    description: 'Accessible description for the icon (aria-label on icon span).',
  },
  href: {
    control: 'text',
    description: 'When set, renders the button as an <a> element.',
  },
  type: {
    options: ['button', 'submit', 'reset'],
    control: { type: 'select' },
    table: { defaultValue: { summary: '"button"' } },
  },
};

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: { ButtonSkeleton },
  argTypes: sharedArgTypes,
  parameters: {
    docs: { page: mdx },
  },
  tags: ['autodocs'],
};

// ─── Default playground ───────────────────────────────────────────────────────

export const Default = (args) => {
  const { renderIcon, ...rest } = args;
  return (
    <Button
      {...rest}
      renderIcon={iconMap[renderIcon]}
      onClick={action('onClick')}>
      Button
    </Button>
  );
};

Default.args = {
  kind: 'primary',
  size: 'default',
  disabled: false,
  renderIcon: 'None',
  iconPosition: 'left',
};

Default.parameters = {
  controls: {
    include: [
      'kind',
      'size',
      'disabled',
      'renderIcon',
      'iconPosition',
      'iconDescription',
      'href',
      'type',
    ],
  },
};

// ─── Named variant stories ────────────────────────────────────────────────────

export const Primary = () => (
  <Button kind="primary" onClick={action('onClick')}>Primary</Button>
);

export const Secondary = () => (
  <Button kind="secondary" onClick={action('onClick')}>Secondary</Button>
);

export const Tertiary = () => (
  <Button kind="tertiary" onClick={action('onClick')}>Tertiary</Button>
);

export const Ghost = () => (
  <Button kind="ghost" onClick={action('onClick')}>Ghost</Button>
);

export const GhostBrand = () => (
  <Button kind="ghost-brand" onClick={action('onClick')}>Ghost brand</Button>
);
GhostBrand.storyName = 'Ghost Brand';

export const Danger = () => (
  <Button kind="danger" onClick={action('onClick')}>Danger</Button>
);

export const Highlight = () => (
  <Button kind="highlight" onClick={action('onClick')}>Highlight</Button>
);

// ─── Size stories ─────────────────────────────────────────────────────────────

export const Small = () => (
  <Button size="small" onClick={action('onClick')}>Small Button</Button>
);

export const Large = () => (
  <Button size="large" onClick={action('onClick')}>Large Button</Button>
);

// ─── Icon stories ─────────────────────────────────────────────────────────────

export const WithLeftIcon = () => (
  <Button
    renderIcon={(props) => <Plus size={16} {...props} />}
    iconPosition="left"
    iconDescription="Add"
    onClick={action('onClick')}>
    Add Item
  </Button>
);
WithLeftIcon.storyName = 'With Left Icon';

export const WithRightIcon = () => (
  <Button
    kind="tertiary"
    renderIcon={(props) => <ChevronRight size={16} {...props} />}
    iconPosition="right"
    iconDescription="Navigate"
    onClick={action('onClick')}>
    Continue
  </Button>
);
WithRightIcon.storyName = 'With Right Icon';

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled = () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Button disabled kind="primary">Primary Disabled</Button>
    <Button disabled kind="secondary">Secondary Disabled</Button>
    <Button disabled kind="tertiary">Tertiary Disabled</Button>
    <Button disabled kind="ghost">Ghost Disabled</Button>
    <Button disabled kind="ghost-brand">Ghost Brand Disabled</Button>
    <Button disabled kind="danger">Danger Disabled</Button>
    <Button disabled kind="highlight">Highlight Disabled</Button>
  </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export const Skeleton = () => <ButtonSkeleton />;

// ─── All Variants matrix ──────────────────────────────────────────────────────

const KINDS = ['primary', 'secondary', 'tertiary', 'ghost', 'ghost-brand', 'danger', 'highlight'];
const SIZES = ['small', 'default', 'large'];

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', background: 'var(--ds-surface-alt-rest, #f5f5f5)' }}>
    <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
      Kinds × Sizes
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${KINDS.length}, auto)`,
        gap: '8px',
        marginBottom: '32px',
        justifyContent: 'start',
      }}>
      {SIZES.map((size) =>
        KINDS.map((kind) => (
          <Button key={`${kind}-${size}`} kind={kind} size={size}>
            {kind}
          </Button>
        ))
      )}
    </div>

    <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
      With Icons
    </h3>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
      <Button
        renderIcon={(props) => <Plus size={16} {...props} />}
        iconPosition="left"
        kind="primary">
        Add Left
      </Button>
      <Button
        renderIcon={(props) => <ChevronRight size={16} {...props} />}
        iconPosition="right"
        kind="tertiary">
        Continue Right
      </Button>
    </div>

    <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
      Disabled States
    </h3>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {KINDS.map((kind) => (
        <Button key={kind} kind={kind} disabled>
          {kind}
        </Button>
      ))}
    </div>
  </div>
);

AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
