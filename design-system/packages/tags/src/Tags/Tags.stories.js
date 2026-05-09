/**
 * Storybook stories for the PANW Tags component.
 * Plain JS with JSDoc — mirrors Carbon's Tag.stories.js pattern.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Sun, Star, Tag as TagIcon } from 'lucide-react';
import { Tags, TagColors, TagContrasts, TagSizes, TagShapes } from './index';
import mdx from './Tags.mdx';

const iconMap = {
  None: undefined,
  Sun: Sun,
  Star: Star,
  Tag: TagIcon,
};

const sharedArgTypes = {
  label: { control: 'text' },
  color: {
    options: TagColors,
    control: { type: 'select' },
    table: { defaultValue: { summary: '"grey"' } },
  },
  contrast: {
    options: TagContrasts,
    control: { type: 'radio' },
    table: { defaultValue: { summary: '"low"' } },
  },
  size: {
    options: TagSizes,
    control: { type: 'radio' },
    table: { defaultValue: { summary: '"default"' } },
  },
  shape: {
    options: TagShapes,
    control: { type: 'radio' },
    table: { defaultValue: { summary: '"pill"' } },
  },
  icon: { control: 'boolean' },
  close: { control: 'boolean' },
  renderIcon: {
    options: ['None', 'Sun', 'Star', 'Tag'],
    control: { type: 'select' },
    description: 'Leading icon. Defaults to lucide-react `Sun`.',
  },
};

export default {
  title: 'Components/Tags',
  component: Tags,
  argTypes: sharedArgTypes,
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

// ─── Default playground ───────────────────────────────────────────────────────

export const Default = (args) => {
  const { renderIcon, ...rest } = args;
  return (
    <Tags
      {...rest}
      renderIcon={iconMap[renderIcon]}
      onClose={action('onClose')}
    />
  );
};

Default.args = {
  label: 'Placeholder',
  color: 'grey',
  contrast: 'low',
  size: 'default',
  shape: 'pill',
  icon: false,
  close: false,
  renderIcon: 'None',
};

// ─── Named variant stories ────────────────────────────────────────────────────

export const LowContrast = () => (
  <Tags label="Low contrast" color="accent" contrast="low" />
);

export const HighContrast = () => (
  <Tags label="High contrast" color="accent" contrast="high" />
);

export const Large = () => (
  <Tags label="Large" color="green" size="large" />
);

export const WithIcon = () => (
  <Tags label="With icon" color="purple" icon />
);

export const Dismissable = () => (
  <Tags
    label="Dismissable"
    color="red"
    close
    onClose={action('onClose')}
  />
);

export const FullyLoaded = () => (
  <Tags
    label="Everything"
    color="cobalt"
    contrast="high"
    size="large"
    icon
    close
    onClose={action('onClose')}
  />
);

// ─── Neutral ──────────────────────────────────────────────────────────────────
// Structural odd-one-out: low sits on field.alt with a 1px neutral inset
// border, high sits on surface.inverse (the tooltip ground). Both carry
// hover/pressed states sourced from the same families.

export const Neutral = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: 24, background: '#f9f9f9' }}>
    <h3 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600 }}>Low contrast — field.alt + neutral border</h3>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
      <Tags label="Default" color="neutral" contrast="low" />
      <Tags label="Large" color="neutral" contrast="low" size="large" />
      <Tags label="With icon" color="neutral" contrast="low" icon />
      <Tags label="Dismissable" color="neutral" contrast="low" close onClose={action('onClose')} />
    </div>

    <h3 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600 }}>High contrast — surface.inverse</h3>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tags label="Default" color="neutral" contrast="high" />
      <Tags label="Large" color="neutral" contrast="high" size="large" />
      <Tags label="With icon" color="neutral" contrast="high" icon />
      <Tags label="Dismissable" color="neutral" contrast="high" close onClose={action('onClose')} />
    </div>
  </div>
);
Neutral.parameters = { controls: { disable: true } };

// ─── Rounded shape ────────────────────────────────────────────────────────────
// 2px radius on the compact size, 4px on large — chip-tier corners instead of
// the height-matched pill capsule. Shape is orthogonal to color and contrast.

export const Rounded = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: 24, background: '#f9f9f9' }}>
    <h3 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600 }}>Pill vs. rounded — default size (2px)</h3>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
      <Tags label="Pill" color="accent" shape="pill" />
      <Tags label="Rounded" color="accent" shape="rounded" />
      <Tags label="Pill / high" color="accent" contrast="high" shape="pill" />
      <Tags label="Rounded / high" color="accent" contrast="high" shape="rounded" />
    </div>

    <h3 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600 }}>Pill vs. rounded — large size (4px)</h3>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
      <Tags label="Pill" color="green" size="large" shape="pill" />
      <Tags label="Rounded" color="green" size="large" shape="rounded" />
      <Tags label="Pill / high" color="green" size="large" contrast="high" shape="pill" />
      <Tags label="Rounded / high" color="green" size="large" contrast="high" shape="rounded" />
    </div>

    <h3 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600 }}>Rounded × neutral</h3>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tags label="Low" color="neutral" shape="rounded" />
      <Tags label="Low / large" color="neutral" shape="rounded" size="large" />
      <Tags label="High" color="neutral" contrast="high" shape="rounded" />
      <Tags label="High / large" color="neutral" contrast="high" shape="rounded" size="large" />
    </div>
  </div>
);
Rounded.parameters = { controls: { disable: true } };

// ─── All Variants matrix ──────────────────────────────────────────────────────

export const AllVariants = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', padding: '24px', background: '#f9f9f9' }}>
    {TagContrasts.map((contrast) => (
      <React.Fragment key={contrast}>
        <h3 style={{ margin: '16px 0 8px', fontSize: '13px', fontWeight: 600 }}>
          Contrast: {contrast}
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {TagColors.map((color) => (
            <Tags key={`${contrast}-${color}`} label={color} color={color} contrast={contrast} />
          ))}
        </div>
      </React.Fragment>
    ))}

    <h3 style={{ margin: '16px 0 8px', fontSize: '13px', fontWeight: 600 }}>Sizes</h3>
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
      <Tags label="default" size="default" color="accent" />
      <Tags label="large" size="large" color="accent" />
    </div>

    <h3 style={{ margin: '16px 0 8px', fontSize: '13px', fontWeight: 600 }}>With icon / close</h3>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Tags label="icon" color="green" icon />
      <Tags label="close" color="red" close />
      <Tags label="both" color="purple" icon close />
      <Tags label="large both" color="cobalt" contrast="high" size="large" icon close />
    </div>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
