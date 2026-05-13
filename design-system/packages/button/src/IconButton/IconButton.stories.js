/**
 * Storybook stories for IconButton.
 *
 * Stage rebuild: five kinds (ghost, ghost-accent, primary, secondary, danger),
 * single radius.tight corner. Brand-vs-neutral split preserved at icon size
 * because the glyph (not the kind name) carries color intent.
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
    options: ['ghost', 'ghost-accent', 'primary', 'secondary', 'danger', 'highlight'],
    control: { type: 'select' },
    table: { defaultValue: { summary: '"ghost"' } },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
    description: 'sm=32/36, md=40/44, lg=48/52 (locked width = height per size × iconSize)',
    table: { defaultValue: { summary: '"sm"' } },
  },
  iconSize: {
    options: [16, 20],
    control: { type: 'radio' },
    description: 'Icon pixel dimensions.',
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
    description: 'Selected state — applies to ghost and ghost-accent kinds.',
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
    docs: { page: mdx },
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
  iconSize: 16,
  disabled: false,
  isSelected: false,
  renderIcon: 'Plus',
};

// ─── Named kind stories ───────────────────────────────────────────────────────

export const Ghost = () => (
  <IconButton kind="ghost" renderIcon={(p) => <Plus size={16} {...p} />} aria-label="Add" onClick={action('onClick')} />
);

export const GhostAccent = () => (
  <IconButton kind="ghost-accent" renderIcon={(p) => <Plus size={16} {...p} />} aria-label="Add" onClick={action('onClick')} />
);

export const Primary = () => (
  <IconButton kind="primary" renderIcon={(p) => <Plus size={16} {...p} />} aria-label="Add" onClick={action('onClick')} />
);

export const Secondary = () => (
  <IconButton kind="secondary" renderIcon={(p) => <Plus size={16} {...p} />} aria-label="Add" onClick={action('onClick')} />
);

export const Danger = () => (
  <IconButton kind="danger" renderIcon={(p) => <Trash2 size={16} {...p} />} aria-label="Delete" onClick={action('onClick')} />
);

export const Highlight = () => (
  <IconButton kind="highlight" renderIcon={(p) => <Plus size={16} {...p} />} aria-label="Add" onClick={action('onClick')} />
);

// ─── Size stories ─────────────────────────────────────────────────────────────

export const Sizes = () => (
  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
    <IconButton size="sm" renderIcon={(p) => <Plus size={16} {...p} />} aria-label="Add (small)" onClick={action('onClick')} />
    <IconButton size="md" renderIcon={(p) => <Plus size={16} {...p} />} aria-label="Add (medium)" onClick={action('onClick')} />
    <IconButton size="lg" renderIcon={(p) => <Plus size={16} {...p} />} aria-label="Add (large)" onClick={action('onClick')} />
  </div>
);

// ─── Different icons ──────────────────────────────────────────────────────────

const DEMO_ICONS = [
  { icon: (p) => <Plus size={16} {...p} />, label: 'Add' },
  { icon: (p) => <Search size={16} {...p} />, label: 'Search' },
  { icon: (p) => <Trash2 size={16} {...p} />, label: 'Delete' },
  { icon: (p) => <Settings size={16} {...p} />, label: 'Settings' },
  { icon: (p) => <Bell size={16} {...p} />, label: 'Notifications' },
  { icon: (p) => <X size={16} {...p} />, label: 'Close' },
  { icon: (p) => <ChevronRight size={16} {...p} />, label: 'Next' },
  { icon: (p) => <Download size={16} {...p} />, label: 'Download' },
];

export const WithDifferentIcons = () => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    {DEMO_ICONS.map(({ icon, label }) => (
      <IconButton key={label} renderIcon={icon} aria-label={label} onClick={action(`onClick:${label}`)} />
    ))}
  </div>
);
WithDifferentIcons.storyName = 'With Different Icons';

// ─── Selected state ───────────────────────────────────────────────────────────

export const Selected = () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <IconButton kind="ghost" isSelected={false} renderIcon={(p) => <Bell size={16} {...p} />} aria-label="Notifications (unselected)" onClick={action('onClick')} />
    <IconButton kind="ghost" isSelected={true} renderIcon={(p) => <Bell size={16} {...p} />} aria-label="Notifications (selected)" onClick={action('onClick')} />
    <IconButton kind="ghost-accent" isSelected={true} renderIcon={(p) => <Bell size={16} {...p} />} aria-label="Notifications (ghost-accent selected)" onClick={action('onClick')} />
  </div>
);
Selected.storyName = 'Selected State (ghost / ghost-accent)';

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled = () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    {['ghost', 'ghost-accent', 'primary', 'secondary', 'danger', 'highlight'].map((kind) => (
      <IconButton key={kind} kind={kind} disabled renderIcon={(p) => <Plus size={16} {...p} />} aria-label={`${kind} disabled`} />
    ))}
  </div>
);

// ─── All Variants matrix ──────────────────────────────────────────────────────

const IB_KINDS = ['ghost', 'ghost-accent', 'primary', 'secondary', 'danger', 'highlight'];
const IB_SIZES = ['sm', 'md', 'lg'];

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', background: 'var(--ds-surface-alt-rest, #f5f5f5)' }}>
    <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
      Kinds × Sizes
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${IB_KINDS.length}, auto)`,
        gap: '8px',
        justifyContent: 'start',
        marginBottom: '32px',
      }}>
      {IB_SIZES.map((size) =>
        IB_KINDS.map((kind) => (
          <IconButton
            key={`${kind}-${size}`}
            kind={kind}
            size={size}
            renderIcon={(p) => <Plus size={16} {...p} />}
            aria-label={`${kind} ${size}`}
            onClick={action('onClick')}
          />
        ))
      )}
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
          renderIcon={(p) => <Plus size={16} {...p} />}
          aria-label={`${kind} disabled`}
        />
      ))}
    </div>
  </div>
);

AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
