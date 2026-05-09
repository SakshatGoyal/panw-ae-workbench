/**
 * Storybook stories for Filter — chip-style trigger that opens a Flyout of
 * options with Apply / Cancel commit semantics. Composes @ds/flyout for the
 * popover; the trigger itself is hand-rolled for the chip affordance (label,
 * count chip, chevron).
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Filter, type FilterOption } from './index';

export default {
  title: 'Components/Filter',
  component: Filter,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Filter button that opens a multi-select Flyout of options with ' +
          'Apply / Cancel commit semantics. Outside-click, Escape, and ' +
          'Cancel discard pending edits; Apply commits via `onApply`.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object' },
    selected: { control: 'object' },
  },
};

const STAGE_OPTIONS: FilterOption[] = [
  { value: '1', label: 'stage 1' },
  { value: '2', label: 'stage 2' },
  { value: '3', label: 'stage 3' },
  { value: '4', label: 'stage 4' },
  { value: '5', label: 'stage 5' },
];

const FORECAST_OPTIONS: FilterOption[] = [
  { value: 'commit', label: 'commit' },
  { value: 'best-case', label: 'best case' },
  { value: 'pipeline', label: 'pipeline' },
  { value: 'closed', label: 'closed' },
  { value: 'closed-lost', label: 'closed lost' },
];

// Wrapper that owns committed state so the Apply / Cancel commit semantics
// can be observed inside Storybook (the trigger's count chip reflects
// committed selection, not draft).
function StatefulFilter({
  label = 'stage',
  options = STAGE_OPTIONS,
  initial = [],
}: {
  label?: string;
  options?: FilterOption[];
  initial?: string[];
}) {
  const [selected, setSelected] = useState<string[]>(initial);
  return (
    <div className="stage" style={{ padding: 24 }}>
      <Filter
        label={label}
        options={options}
        selected={selected}
        onApply={(values) => {
          action('onApply')(values);
          setSelected(values);
        }}
      />
    </div>
  );
}

export const Default = () => <StatefulFilter />;

export const WithInitialSelection = () => (
  <StatefulFilter
    label="forecast"
    options={FORECAST_OPTIONS}
    initial={['commit']}
  />
);

export const ManyOptions = () => (
  <StatefulFilter
    label="quarter"
    options={[
      { value: 'q1-fy26', label: 'Q1 FY26' },
      { value: 'q2-fy26', label: 'Q2 FY26' },
      { value: 'q3-fy26', label: 'Q3 FY26' },
      { value: 'q4-fy26', label: 'Q4 FY26' },
      { value: 'q1-fy27', label: 'Q1 FY27' },
      { value: 'q2-fy27', label: 'Q2 FY27' },
    ]}
  />
);

export const Group = () => (
  <div className="stage" style={{ padding: 24, display: 'flex', gap: 8 }}>
    <StatefulFilter label="stage" options={STAGE_OPTIONS} />
    <StatefulFilter
      label="forecast"
      options={FORECAST_OPTIONS}
      initial={['commit', 'best-case']}
    />
    <StatefulFilter
      label="health"
      options={[
        { value: 'healthy', label: 'healthy' },
        { value: 'at-risk', label: 'at risk' },
        { value: 'critical', label: 'critical' },
      ]}
      initial={['critical']}
    />
  </div>
);
