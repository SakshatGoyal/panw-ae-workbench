/**
 * Storybook stories for the PANW IconButton component.
 * Plain JS with JSDoc — mirrors Carbon's Button.stories.js pattern.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  Plus,
  Search,
  Trash2,
  Settings,
  Bell,
  X,
  ChevronRight,
  Download,
} from 'lucide-react';
import { IconButton } from './index';
import mdx from './IconButton.mdx';

const iconMap = {
  Plus: (props) => <Plus size={16} {...props} />,
  Search: (props) => <Search size={16} {...props} />,
  Trash: (props) => <Trash2 size={16} {...props} />,
  Settings: (props) => <Settings size={16} {...props} />,
  Bell: (props) => <Bell size={16} {...props} />,
  Close: (props) => <X size={16} {...props} />,
};

const sharedArgTypes = {
  kind: {
    options: ['ghost', 'primary', 'secondary'],
    control: { type: 'select' },
    table: { defaultValue: { summary: '"ghost"' } },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
    description: 'sm=32px, md=40px, lg=48px (padding-based)',
    table: { defaultValue: { summary: '"sm"' } },
  },
  shape: {
    options: ['square', 'rounded', 'pill'],
    control: { type: 'select' },
    description: 'Corner shape. PANW extension.',
    table: { defaultValue: { summary: '"square"' } },
  },
  iconSize: {
    options: [16, 20],
    control: { type: 'radio' },
    description: 'Icon pixel dimensions. PANW extension.',
    table: { defaultValue: { summary: 16 } },
  },
  disabled: {
    control: 'boolean',
    table: { defaultValue: { summary: false } },
  },
  'aria-label': {
    control: 'text',
    description: 'Required accessible label for screen readers.',
  },
  isSelected: {
    control: 'boolean',
    description: 'Selected state — only applies to ghost kind.',
    table: { defaultValue: { summary: false } },
  },
  renderIcon: {
    options: Object.keys(iconMap),
    control: { type: 'select' },
    description: 'Icon component to render (ElementType).',
  },
};

export default {
  title: 'Components/IconButton',
  component: IconButton,
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
    <IconButton
      {...rest}
      renderIcon={iconMap[renderIcon] ?? iconMap.Plus}
      onClick={action('onClick')}
    />
  );
};

Default.args = {
  'aria-label': 'Add item',
  kind: 'ghost',
  size: 'sm',
  shape: 'square',
  iconSize: 16,
  disabled: false,
  isSelected: false,
  renderIcon: 'Plus',
};

// ─── Named kind stories ───────────────────────────────────────────────────────

export const Ghost = () => (
  <IconButton
    kind="ghost"
    renderIcon={(props) => <Plus size={16} {...props} />}
    aria-label="Add"
    onClick={action('onClick')}
  />
);

export const Primary = () => (
  <IconButton
    kind="primary"
    renderIcon={(props) => <Plus size={16} {...props} />}
    aria-label="Add"
    onClick={action('onClick')}
  />
);

export const Secondary = () => (
  <IconButton
    kind="secondary"
    renderIcon={(props) => <Plus size={16} {...props} />}
    aria-label="Add"
    onClick={action('onClick')}
  />
);

// ─── Size stories ─────────────────────────────────────────────────────────────

export const Sizes = () => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    <IconButton
      size="sm"
      renderIcon={(props) => <Plus size={16} {...props} />}
      aria-label="Add (small)"
      onClick={action('onClick')}
    />
    <IconButton
      size="md"
      renderIcon={(props) => <Plus size={16} {...props} />}
      aria-label="Add (medium)"
      onClick={action('onClick')}
    />
    <IconButton
      size="lg"
      renderIcon={(props) => <Plus size={16} {...props} />}
      aria-label="Add (large)"
      onClick={action('onClick')}
    />
  </div>
);

// ─── Shape stories ────────────────────────────────────────────────────────────

export const ShapeSquare = () => (
  <IconButton
    shape="square"
    renderIcon={(props) => <Settings size={16} {...props} />}
    aria-label="Settings"
    onClick={action('onClick')}
  />
);
ShapeSquare.storyName = 'Shape: Square';

export const ShapeRounded = () => (
  <IconButton
    shape="rounded"
    renderIcon={(props) => <Settings size={16} {...props} />}
    aria-label="Settings"
    onClick={action('onClick')}
  />
);
ShapeRounded.storyName = 'Shape: Rounded';

export const ShapePill = () => (
  <IconButton
    shape="pill"
    renderIcon={(props) => <Settings size={16} {...props} />}
    aria-label="Settings"
    onClick={action('onClick')}
  />
);
ShapePill.storyName = 'Shape: Pill';

// ─── Different icons ──────────────────────────────────────────────────────────

const DEMO_ICONS = [
  { icon: (props) => <Plus size={16} {...props} />, label: 'Add' },
  { icon: (props) => <Search size={16} {...props} />, label: 'Search' },
  { icon: (props) => <Trash2 size={16} {...props} />, label: 'Delete' },
  { icon: (props) => <Settings size={16} {...props} />, label: 'Settings' },
  { icon: (props) => <Bell size={16} {...props} />, label: 'Notifications' },
  { icon: (props) => <X size={16} {...props} />, label: 'Close' },
  { icon: (props) => <ChevronRight size={16} {...props} />, label: 'Next' },
  { icon: (props) => <Download size={16} {...props} />, label: 'Download' },
];

export const WithDifferentIcons = () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    {DEMO_ICONS.map(({ icon, label }) => (
      <IconButton
        key={label}
        renderIcon={icon}
        aria-label={label}
        onClick={action(`onClick:${label}`)}
      />
    ))}
  </div>
);
WithDifferentIcons.storyName = 'With Different Icons';

// ─── Selected state ───────────────────────────────────────────────────────────

export const Selected = () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <IconButton
      kind="ghost"
      isSelected={false}
      renderIcon={(props) => <Bell size={16} {...props} />}
      aria-label="Notifications (unselected)"
      onClick={action('onClick')}
    />
    <IconButton
      kind="ghost"
      isSelected={true}
      renderIcon={(props) => <Bell size={16} {...props} />}
      aria-label="Notifications (selected)"
      onClick={action('onClick')}
    />
  </div>
);
Selected.storyName = 'Selected State (ghost only)';

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled = () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <IconButton
      kind="ghost"
      disabled
      renderIcon={(props) => <Plus size={16} {...props} />}
      aria-label="Add (disabled ghost)"
    />
    <IconButton
      kind="primary"
      disabled
      renderIcon={(props) => <Plus size={16} {...props} />}
      aria-label="Add (disabled primary)"
    />
    <IconButton
      kind="secondary"
      disabled
      renderIcon={(props) => <Plus size={16} {...props} />}
      aria-label="Add (disabled secondary)"
    />
  </div>
);

// ─── All Variants matrix ──────────────────────────────────────────────────────

const IB_KINDS = ['ghost', 'primary', 'secondary'];
const IB_SIZES = ['sm', 'md', 'lg'];
const IB_SHAPES = ['square', 'rounded', 'pill'];

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', background: '#f9f9f9' }}>
    <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
      All Kinds × Sizes (shape: square)
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${IB_KINDS.length}, auto)`,
        gap: '8px',
        justifyContent: 'start',
        marginBottom: '32px',
      }}
    >
      {IB_SIZES.map((size) =>
        IB_KINDS.map((kind) => (
          <IconButton
            key={`${kind}-${size}`}
            kind={kind}
            size={size}
            shape="square"
            renderIcon={(props) => <Plus size={16} {...props} />}
            aria-label={`${kind} ${size}`}
            onClick={action('onClick')}
          />
        ))
      )}
    </div>

    <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
      All Shapes (kind: ghost, size: md)
    </h3>
    <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
      {IB_SHAPES.map((shape) => (
        <IconButton
          key={shape}
          kind="ghost"
          size="md"
          shape={shape}
          renderIcon={(props) => <Settings size={16} {...props} />}
          aria-label={`Settings (${shape})`}
          onClick={action('onClick')}
        />
      ))}
    </div>

    <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
      Disabled States
    </h3>
    <div style={{ display: 'flex', gap: '8px' }}>
      {IB_KINDS.map((kind) => (
        <IconButton
          key={kind}
          kind={kind}
          disabled
          renderIcon={(props) => <Plus size={16} {...props} />}
          aria-label={`${kind} disabled`}
        />
      ))}
    </div>
  </div>
);

AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
