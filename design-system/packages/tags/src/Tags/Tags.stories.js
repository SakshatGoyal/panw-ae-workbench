/**
 * Storybook stories for the PANW Tags component.
 * Plain JS with JSDoc — mirrors Carbon's Tag.stories.js pattern.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Sun, Star, Tag as TagIcon } from 'lucide-react';
import { Tags, TagColors, TagContrasts, TagSizes } from './index';
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
