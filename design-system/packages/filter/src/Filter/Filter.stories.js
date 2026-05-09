/**
 * Storybook stories for Filter — flyout-backed selection trigger with
 * Apply/Cancel commit semantics and neutral tags announcing the applied set.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Filter } from './Filter';

const STATUSES = [
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
  { label: 'Draft', value: 'draft' },
  { label: 'In review', value: 'in-review' },
  { label: 'Published', value: 'published' },
  { label: 'Scheduled', value: 'scheduled' },
];

export default {
  title: 'Components/Filter',
  component: Filter,
  parameters: { layout: 'padded' },
};

export const Default = () => {
  const [selected, setSelected] = useState([]);
  return (
    <div style={{ padding: '64px 32px' }}>
      <Filter
        options={STATUSES}
        selected={selected}
        onApply={(next) => {
          setSelected(next);
          action('apply')(next);
        }}
        onCancel={() => action('cancel')()}
      />
    </div>
  );
};

export const WithSelections = () => {
  const [selected, setSelected] = useState(['active', 'draft']);
  return (
    <div style={{ padding: '64px 32px' }}>
      <Filter
        options={STATUSES}
        selected={selected}
        onApply={(next) => {
          setSelected(next);
          action('apply')(next);
        }}
        onCancel={() => action('cancel')()}
      />
    </div>
  );
};

export const Disabled = () => (
  <div style={{ padding: '64px 32px' }}>
    <Filter options={STATUSES} disabled />
  </div>
);
