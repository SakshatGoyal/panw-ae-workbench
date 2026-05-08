import React from 'react';
import { CellContents, CellContentTypes, CellStates } from './index';

export default {
  title: 'Components/CellContents',
  component: CellContents,
  argTypes: {
    content: { options: CellContentTypes, control: { type: 'radio' } },
    state: { options: CellStates, control: { type: 'select' } },
    text: { control: 'text' },
    tags: { control: 'boolean' },
    tagLabel: { control: 'text' },
    trendValue: { control: 'text' },
  },
  tags: ['autodocs'],
};

export const Default = (args) => <CellContents {...args} />;
Default.args = { content: 'text', state: 'none', tags: false };

export const Numbers = () => <CellContents content="numbers" text="1,234,567.00" />;
export const NumberUp = () => <CellContents content="numberUp" text="1,234,567.00" trendValue="$123" />;
export const NumberDown = () => <CellContents content="numberDown" text="1,234,567.00" trendValue="$123" />;
export const WithTag = () => <CellContents content="text" tags tagLabel="New" />;
export const WithStateIcon = () => <CellContents content="text" state="success" />;

export const AllVariants = () => (
  <div style={{ padding: 24, background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: 16 }}>
    {CellContentTypes.map((content) => (
      <div key={content}>
        <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Content: {content}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 320 }}>
          {CellStates.map((state) => (
            <CellContents key={state} content={content} state={state} />
          ))}
        </div>
      </div>
    ))}
    <div>
      <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>With tag</h3>
      <CellContents content="text" tags tagLabel="Beta" />
    </div>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
