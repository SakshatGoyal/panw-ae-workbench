import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Sun, Star, Bell } from 'lucide-react';
import { Header } from '@ds/header';
import { CellsStandard } from '@ds/cells-standard';
import {
  Accordion,
  AccordionSizes,
  AccordionThemes,
  AccordionOrientations,
} from './index';
import mdx from './Accordion.mdx';

const iconMap = { Sun, Star, Bell };

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    size: { options: AccordionSizes, control: { type: 'radio' } },
    theme: { options: AccordionThemes, control: { type: 'radio' } },
    orientation: { options: AccordionOrientations, control: { type: 'radio' } },
    open: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    showIcon: { control: 'boolean' },
    showTag: { control: 'boolean' },
    tagLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    renderIcon: { options: ['Sun', 'Star', 'Bell'], control: { type: 'select' } },
  },
  parameters: { docs: { page: mdx } },
  tags: ['autodocs'],
};

// Every story below threads `open` through useState so the chevron actually
// toggles the panel. Earlier stories passed `open` as a static prop, which
// reads correctly in screenshots but is dead on click — exactly the kind of
// "looks right, doesn't work" trap the system is supposed to prevent.
const useToggle = (initial = false) => {
  const [open, setOpen] = useState(initial);
  return [open, () => setOpen((v) => !v)];
};

export const Default = (args) => {
  const [open, setOpen] = useState(args.open);
  React.useEffect(() => setOpen(args.open), [args.open]);
  return (
    <Accordion
      {...args}
      open={open}
      renderIcon={iconMap[args.renderIcon] || Sun}
      onToggle={() => {
        action('onToggle')();
        setOpen((v) => !v);
      }}>
      <p style={{ margin: 0 }}>Accordion content goes here.</p>
    </Accordion>
  );
};

Default.args = {
  size: 'default',
  theme: 'gray00',
  orientation: 'left',
  open: false,
  title: 'Accordion title',
  description: '',
  showIcon: false,
  showTag: false,
  tagLabel: 'New',
  disabled: false,
  renderIcon: 'Sun',
};

export const Open = () => {
  const [open, toggle] = useToggle(true);
  return (
    <Accordion title="Open accordion" open={open} onToggle={toggle}>
      <p style={{ margin: 0 }}>Visible content</p>
    </Accordion>
  );
};

export const WithDescription = () => {
  const [open, toggle] = useToggle(true);
  return (
    <Accordion
      title="With description"
      description="Supplemental copy below the title."
      open={open}
      onToggle={toggle}>
      Content
    </Accordion>
  );
};

export const WithIcon = () => {
  const [open, toggle] = useToggle(false);
  return (
    <Accordion title="With icon" showIcon renderIcon={Star} open={open} onToggle={toggle}>
      Content
    </Accordion>
  );
};

export const WithTag = () => {
  const [open, toggle] = useToggle(false);
  return (
    <Accordion
      title="With tag"
      showTag
      tagLabel="Beta"
      tagColor="green"
      open={open}
      onToggle={toggle}>
      Content
    </Accordion>
  );
};

export const Disabled = () => (
  <Accordion title="Disabled" disabled onToggle={action('onToggle')}>
    Content
  </Accordion>
);

export const RightOrientation = () => {
  const [open, toggle] = useToggle(false);
  return (
    <Accordion title="Right orientation" orientation="right" open={open} onToggle={toggle}>
      Content
    </Accordion>
  );
};

export const Gray10Theme = () => {
  const [open, toggle] = useToggle(false);
  return (
    <Accordion title="Gray 10" theme="gray10" open={open} onToggle={toggle}>
      Content
    </Accordion>
  );
};

// ─── Stress tests ────────────────────────────────────────────────────────────
// Real children inside an open accordion to verify the inset margin holds up
// against dense content. WithTable uses the system's own Header + CellsStandard
// — no raw <table>/<th>/<td>. Mixing systems would be the kind of inconsistency
// that erodes the design system from the inside.

const PIPELINE_ROWS = [
  { account: 'Acme Corp', owner: 'A. Patel', stage: 'Negotiation', amount: '148,000.00', close: '2026-06-12' },
  { account: 'Globex', owner: 'M. Chen', stage: 'Proposal', amount: '92,400.00', close: '2026-05-30' },
  { account: 'Initech', owner: 'R. Garcia', stage: 'Discovery', amount: '26,800.00', close: '2026-07-04' },
  { account: 'Hooli', owner: 'L. Park', stage: 'Negotiation', amount: '210,000.00', close: '2026-06-19' },
  { account: 'Soylent', owner: 'A. Patel', stage: 'Closed-won', amount: '74,500.00', close: '2026-04-21' },
  { account: 'Stark Industries', owner: 'D. Singh', stage: 'Proposal', amount: '185,300.00', close: '2026-08-02' },
];

// Column grid used by both header and body rows so cells line up.
// Account stretches; Owner / Stage / Close are fixed; Amount is fixed and
// numeric so it right-aligns inside its CellsStandard.
const COLUMNS = '1.4fr 0.9fr 0.9fr 0.9fr 0.9fr';

export const WithTable = () => {
  const [open, toggle] = useToggle(true);
  return (
    <Accordion
      title="Pipeline records"
      description="56 active opportunities, sortable by amount."
      open={open}
      onToggle={toggle}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: COLUMNS }}>
          <Header type="basic">Account</Header>
          <Header type="basic">Owner</Header>
          <Header type="basic">Stage</Header>
          <Header type="basic" alignment="right">Amount</Header>
          <Header type="basic">Close date</Header>
        </div>
        {PIPELINE_ROWS.map((r) => (
          <div key={r.account} style={{ display: 'grid', gridTemplateColumns: COLUMNS }}>
            <CellsStandard size="default" content="text" text={r.account} />
            <CellsStandard size="default" content="text" text={r.owner} />
            <CellsStandard size="default" content="text" text={r.stage} />
            <CellsStandard size="default" content="numbers" text={r.amount} />
            <CellsStandard size="default" content="text" text={r.close} />
          </div>
        ))}
      </div>
    </Accordion>
  );
};

export const WithLongProse = () => {
  const [open, toggle] = useToggle(true);
  return (
    <Accordion
      title="Renewal terms"
      description="Effective 2026-05-01. Refer to MSA §4 and §7 for governance."
      open={open}
      onToggle={toggle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, lineHeight: 1.5, color: '#262626' }}>
        <p style={{ margin: 0 }}>
          Annual renewal commitments are evaluated on a rolling 12-month basis. The customer
          retains the right to scale licensed seats up at any quarterly checkpoint, and the
          prorated true-up is applied to the next billing cycle. Downward adjustments require
          90 days written notice and may not exceed 15% of the seat count contracted at the
          start of the current term.
        </p>
        <p style={{ margin: 0 }}>
          Pricing is held flat across the renewal period. The published price increase
          ceiling for any subsequent renewal is CPI plus three percentage points, measured
          against the most recent twelve-month US CPI-U index. The customer's account
          manager will provide the proposed renewal pricing 60 days before term end.
        </p>
        <p style={{ margin: 0 }}>
          Service-level commitments under §7.2 remain unchanged: 99.95% uptime measured
          monthly, with credits applied automatically against the next month's invoice.
          Credits are calculated as 5% of the affected service tier per 0.1% of monthly
          uptime missed, capped at 50% of monthly fees. The customer is not required to
          file a claim — credits are issued by Operations within 14 business days of the
          end-of-month statement.
        </p>
        <p style={{ margin: 0 }}>
          Either party may terminate for material breach with 30 days written notice and
          a cure period. Termination for convenience is not permitted within an active term.
          On expiration, the customer retains read-only access to historical records for
          180 days and a one-time export of all account data in the agreed-upon formats.
        </p>
      </div>
    </Accordion>
  );
};

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, background: '#f9f9f9' }}>
    {AccordionSizes.map((size) => (
      <div key={size}>
        <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Size: {size}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Accordion size={size} title={`${size} closed`} />
          <Accordion size={size} title={`${size} open`} open description="With description" showIcon showTag tagLabel="Tag" />
        </div>
      </div>
    ))}
    <div>
      <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Theme: gray10</h3>
      <Accordion theme="gray10" title="Gray 10 theme" />
    </div>
    <div>
      <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Orientation: right</h3>
      <Accordion orientation="right" title="Right orientation" />
    </div>
    <div>
      <h3 style={{ margin: '8px 0', fontSize: 13, fontWeight: 600 }}>Disabled</h3>
      <Accordion title="Disabled" disabled />
    </div>
  </div>
);
AllVariants.storyName = 'All Variants';
AllVariants.parameters = { controls: { disable: true } };
