import React from 'react';
import { CellsStandard, CellInteractionStates, CellSizes } from './index';

export default {
  title: 'Components/CellsStandard',
  component: CellsStandard,
  argTypes: {
    state: { options: CellInteractionStates, control: { type: 'select' } },
    size: { options: CellSizes, control: { type: 'radio' } },
    expandable: { control: 'boolean' },
    checkbox: { control: 'boolean' },
    tags: { control: 'boolean' },
    text: { control: 'text' },
    tagLabel: { control: 'text' },
    trendValue: { control: 'text' },
    content: {
      options: ['text', 'numbers', 'numberUp', 'numberDown'],
      control: { type: 'radio' },
    },
  },
  tags: ['autodocs'],
};

export const Default = (args) => <CellsStandard {...args} />;
Default.args = {
  state: 'static',
  size: 'small',
  expandable: false,
  checkbox: false,
  text: 'Cell content',
};

export const WithCheckbox = () => (
  <CellsStandard checkbox text="Selectable row" />
);

export const Selected = () => (
  <CellsStandard checkbox forceState="active" text="Selected row" />
);

export const Expandable = () => (
  <CellsStandard expandable text="Expandable row" />
);

export const Locked = () => (
  <CellsStandard checkbox forceState="locked" text="Locked row" />
);

export const NumericTrendUp = () => (
  <CellsStandard content="numberUp" text="1,234,567.00" trendValue="$123" />
);

export const WithTag = () => (
  <CellsStandard text="With tag" tags tagLabel="New" />
);

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: 24 }}>
    {CellSizes.map((size) => (
      <div key={size}>
        <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Size: {size}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 480, background: '#fff', border: '1px solid #e8eaed' }}>
          {CellInteractionStates.map((state) => (
            <CellsStandard
              key={state}
              forceState={state}
              size={size}
              checkbox
              expandable
              text={`State: ${state}`}
            />
          ))}
        </div>
      </div>
    ))}
    <div>
      <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Content variants</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 480, background: '#fff', border: '1px solid #e8eaed' }}>
        <CellsStandard content="text" text="Plain text" />
        <CellsStandard content="numbers" text="1,234,567.00" />
        <CellsStandard content="numberUp" text="1,234,567.00" trendValue="$123" />
        <CellsStandard content="numberDown" text="1,234,567.00" trendValue="$123" />
        <CellsStandard text="With tag" tags tagLabel="Beta" />
      </div>
    </div>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
