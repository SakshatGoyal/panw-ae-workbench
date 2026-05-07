/**
 * Storybook stories for the PANW Button component.
 * Plain JS with JSDoc — mirrors Carbon's Button.stories.js pattern.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Plus, ChevronRight, Trash2 } from 'lucide-react';
import Button, { ButtonSkeleton } from './index';
import mdx from './Button.mdx';

// Helper: map story control string → icon component
const iconMap = {
  None: undefined,
  Plus: (props) => <Plus size={16} {...props} />,
  ChevronRight: (props) => <ChevronRight size={16} {...props} />,
  Trash: (props) => <Trash2 size={16} {...props} />,
};

const sharedArgTypes = {
  kind: {
    options: [
      'primary',
      'danger',
      'secondary-accent',
      'secondary-gray',
      'ghost-accent',
      'ghost-gray',
    ],
    control: { type: 'select' },
    description:
      'Visual style variant. `primary` and `danger` map to Carbon kinds. ' +
      '`secondary-accent`, `secondary-gray`, `ghost-accent`, `ghost-gray` are PANW extensions.',
    table: { defaultValue: { summary: '"primary"' } },
  },
  size: {
    options: ['small', 'default', 'large'],
    control: { type: 'select' },
    description: 'Button height: small=32px, default=40px, large=48px',
    table: { defaultValue: { summary: '"default"' } },
  },
  shape: {
    options: ['pill', 'standard', 'rounded'],
    control: { type: 'select' },
    description: 'Corner shape. PANW extension — Carbon does not have this axis.',
    table: { defaultValue: { summary: '"pill"' } },
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
    docs: {
      page: mdx,
    },
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
      onClick={action('onClick')}
    >
      Button
    </Button>
  );
};

Default.args = {
  kind: 'primary',
  size: 'default',
  shape: 'pill',
  disabled: false,
  renderIcon: 'None',
  iconPosition: 'left',
};

Default.parameters = {
  controls: {
    include: [
      'kind',
      'size',
      'shape',
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
  <Button kind="primary" onClick={action('onClick')}>
    Primary
  </Button>
);

export const Danger = () => (
  <Button kind="danger" onClick={action('onClick')}>
    Danger
  </Button>
);

export const SecondaryAccent = () => (
  <Button kind="secondary-accent" onClick={action('onClick')}>
    Secondary Accent
  </Button>
);
SecondaryAccent.storyName = 'Secondary Accent (PANW)';

export const SecondaryGray = () => (
  <Button kind="secondary-gray" onClick={action('onClick')}>
    Secondary Gray
  </Button>
);
SecondaryGray.storyName = 'Secondary Gray (PANW)';

export const GhostAccent = () => (
  <Button kind="ghost-accent" onClick={action('onClick')}>
    Ghost Accent
  </Button>
);
GhostAccent.storyName = 'Ghost Accent (PANW)';

export const GhostGray = () => (
  <Button kind="ghost-gray" onClick={action('onClick')}>
    Ghost Gray
  </Button>
);
GhostGray.storyName = 'Ghost Gray (PANW)';

// ─── Size stories ─────────────────────────────────────────────────────────────

export const Small = () => (
  <Button size="small" onClick={action('onClick')}>
    Small Button
  </Button>
);

export const Large = () => (
  <Button size="large" onClick={action('onClick')}>
    Large Button
  </Button>
);

// ─── Shape stories ────────────────────────────────────────────────────────────

export const ShapePill = () => (
  <Button shape="pill" onClick={action('onClick')}>
    Pill Shape
  </Button>
);
ShapePill.storyName = 'Shape: Pill';

export const ShapeStandard = () => (
  <Button shape="standard" onClick={action('onClick')}>
    Standard Shape
  </Button>
);
ShapeStandard.storyName = 'Shape: Standard';

export const ShapeRounded = () => (
  <Button shape="rounded" onClick={action('onClick')}>
    Rounded Shape
  </Button>
);
ShapeRounded.storyName = 'Shape: Rounded';

// ─── Icon stories ─────────────────────────────────────────────────────────────

export const WithLeftIcon = () => (
  <Button
    renderIcon={(props) => <Plus size={16} {...props} />}
    iconPosition="left"
    iconDescription="Add"
    onClick={action('onClick')}
  >
    Add Item
  </Button>
);
WithLeftIcon.storyName = 'With Left Icon';

export const WithRightIcon = () => (
  <Button
    kind="ghost-accent"
    renderIcon={(props) => <ChevronRight size={16} {...props} />}
    iconPosition="right"
    iconDescription="Navigate"
    onClick={action('onClick')}
  >
    Continue
  </Button>
);
WithRightIcon.storyName = 'With Right Icon';

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled = () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Button disabled kind="primary">Primary Disabled</Button>
    <Button disabled kind="danger">Danger Disabled</Button>
    <Button disabled kind="secondary-accent">Secondary Accent Disabled</Button>
    <Button disabled kind="ghost-accent">Ghost Accent Disabled</Button>
  </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export const Skeleton = () => <ButtonSkeleton />;

// ─── All Variants matrix ──────────────────────────────────────────────────────

const KINDS = [
  'primary',
  'danger',
  'secondary-accent',
  'secondary-gray',
  'ghost-accent',
  'ghost-gray',
];

const SIZES = ['small', 'default', 'large'];
const SHAPES = ['pill', 'standard', 'rounded'];

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', background: '#f9f9f9' }}>
    <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
      All Kinds × Sizes (shape: pill)
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${KINDS.length}, auto)`,
        gap: '8px',
        marginBottom: '32px',
      }}
    >
      {SIZES.map((size) =>
        KINDS.map((kind) => (
          <Button key={`${kind}-${size}`} kind={kind} size={size} shape="pill">
            {kind}
          </Button>
        ))
      )}
    </div>

    <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
      All Shapes (kind: primary, size: default)
    </h3>
    <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
      {SHAPES.map((shape) => (
        <Button key={shape} shape={shape} kind="primary">
          {shape}
        </Button>
      ))}
    </div>

    <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
      With Icons
    </h3>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
      <Button
        renderIcon={(props) => <Plus size={16} {...props} />}
        iconPosition="left"
        kind="primary"
      >
        Add Left
      </Button>
      <Button
        renderIcon={(props) => <ChevronRight size={16} {...props} />}
        iconPosition="right"
        kind="ghost-accent"
      >
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
