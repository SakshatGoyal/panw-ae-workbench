/**
 * Storybook stories for Flyout — anchored panel of items.
 *
 * Four canonical modes: simple list, filterable, tree, multi-select with
 * Select-all + Apply/Cancel.
 */

import React, { useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Folder, Star, Tag } from 'lucide-react';
import { Button } from '@ds/button';
import {
  Flyout,
  FlyoutFilter,
  FlyoutList,
  FlyoutItem,
  FlyoutGroup,
  FlyoutSelectAll,
  FlyoutFooter,
} from './index';

export default {
  title: 'Components/Flyout',
  component: Flyout,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

// Each story owns its own anchor + open-state machinery so stories stay
// independent. Real consumers do the same — Flyout doesn't own its trigger.

function Trigger({ onClick, anchorRef, label = 'Open flyout' }) {
  return (
    <Button
      ref={anchorRef}
      kind="secondary"
      size="default"
      onClick={onClick}>
      {label}
    </Button>
  );
}

// ─── Simple list ──────────────────────────────────────────────────────────────

export const SimpleList = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  return (
    <>
      <Trigger
        anchorRef={anchorRef}
        onClick={() => setOpen((v) => !v)}
        label={selected[0] ?? 'Choose an option'}
      />
      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={anchorRef}
        mode="single"
        selected={selected}
        onSelectionChange={(values) => {
          setSelected(values);
          action('selection')(values);
        }}>
        <FlyoutList>
          <FlyoutItem value="cobalt">Cobalt</FlyoutItem>
          <FlyoutItem value="indigo">Indigo</FlyoutItem>
          <FlyoutItem value="midnight">Midnight</FlyoutItem>
          <FlyoutItem value="navy">Navy</FlyoutItem>
          <FlyoutItem value="periwinkle">Periwinkle</FlyoutItem>
        </FlyoutList>
      </Flyout>
    </>
  );
};

// ─── Filterable ───────────────────────────────────────────────────────────────

const COUNTRIES = [
  'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada',
  'Chile', 'China', 'Colombia', 'Denmark', 'Egypt', 'Finland', 'France',
  'Germany', 'Greece', 'India', 'Indonesia', 'Ireland', 'Italy', 'Japan',
  'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Portugal',
  'Singapore', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Thailand',
  'Turkey', 'United Kingdom', 'United States', 'Vietnam',
];

export const Filterable = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  return (
    <>
      <Trigger
        anchorRef={anchorRef}
        onClick={() => setOpen((v) => !v)}
        label={selected[0] ?? 'Country'}
      />
      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={anchorRef}
        mode="single"
        selected={selected}
        onSelectionChange={(values) => {
          setSelected(values);
          action('selection')(values);
        }}>
        <FlyoutFilter placeholder="Filter countries" />
        <FlyoutList>
          {COUNTRIES.map((c) => (
            <FlyoutItem key={c} value={c}>{c}</FlyoutItem>
          ))}
        </FlyoutList>
      </Flyout>
    </>
  );
};

// ─── Tree ─────────────────────────────────────────────────────────────────────

export const Tree = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  return (
    <>
      <Trigger
        anchorRef={anchorRef}
        onClick={() => setOpen((v) => !v)}
        label={selected[0] ?? 'Pick a category'}
      />
      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={anchorRef}
        mode="single"
        selected={selected}
        onSelectionChange={(values) => {
          setSelected(values);
          action('selection')(values);
        }}>
        <FlyoutList>
          <FlyoutGroup label="Hardware" defaultOpen renderIcon={Folder}>
            <FlyoutGroup label="Laptops" defaultOpen>
              <FlyoutItem value="macbook-pro">MacBook Pro</FlyoutItem>
              <FlyoutItem value="macbook-air">MacBook Air</FlyoutItem>
              <FlyoutItem value="thinkpad">ThinkPad</FlyoutItem>
            </FlyoutGroup>
            <FlyoutGroup label="Phones">
              <FlyoutItem value="iphone-15">iPhone 15</FlyoutItem>
              <FlyoutItem value="pixel-8">Pixel 8</FlyoutItem>
            </FlyoutGroup>
          </FlyoutGroup>
          <FlyoutGroup label="Software" renderIcon={Folder}>
            <FlyoutItem value="figma">Figma</FlyoutItem>
            <FlyoutItem value="notion">Notion</FlyoutItem>
            <FlyoutItem value="linear">Linear</FlyoutItem>
          </FlyoutGroup>
        </FlyoutList>
      </Flyout>
    </>
  );
};

// ─── Multi-select with Select-all + Apply / Cancel ────────────────────────────

const TAGS = [
  { value: 'urgent',     label: 'Urgent' },
  { value: 'review',     label: 'Needs review' },
  { value: 'blocked',    label: 'Blocked' },
  { value: 'inprogress', label: 'In progress' },
  { value: 'done',       label: 'Done' },
];

export const MultiSelectWithActions = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  // Draft holds in-flyout state; committed is what the consumer sees.
  const [committed, setCommitted] = useState([]);
  const [draft, setDraft] = useState([]);

  const openFlyout = () => {
    setDraft(committed);
    setOpen(true);
  };

  const apply = () => {
    setCommitted(draft);
    action('apply')(draft);
    setOpen(false);
  };

  const cancel = () => {
    setDraft(committed);
    action('cancel')();
    setOpen(false);
  };

  return (
    <>
      <Trigger
        anchorRef={anchorRef}
        onClick={openFlyout}
        label={committed.length === 0 ? 'Tags' : `Tags (${committed.length})`}
      />
      <Flyout
        open={open}
        onOpenChange={(next) => {
          // Outside-click / escape: discard draft (cancel-equivalent).
          if (!next) cancel();
        }}
        anchorRef={anchorRef}
        mode="multiple"
        selected={draft}
        onSelectionChange={setDraft}>
        <FlyoutSelectAll />
        <FlyoutList>
          {TAGS.map((t) => (
            <FlyoutItem key={t.value} value={t.value} renderIcon={Tag}>
              {t.label}
            </FlyoutItem>
          ))}
        </FlyoutList>
        <FlyoutFooter>
          <Button kind="ghost" size="small" onClick={cancel}>Cancel</Button>
          <Button kind="primary" size="small" onClick={apply}>Apply</Button>
        </FlyoutFooter>
      </Flyout>
    </>
  );
};
MultiSelectWithActions.storyName = 'Multi-Select with Actions';

// ─── Loaded — combines filter + tree + multi-select + select-all + footer ─────

export const FullyLoaded = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [committed, setCommitted] = useState([]);
  const [draft, setDraft] = useState([]);

  return (
    <>
      <Trigger
        anchorRef={anchorRef}
        onClick={() => {
          setDraft(committed);
          setOpen(true);
        }}
        label={committed.length === 0 ? 'Filters' : `Filters (${committed.length})`}
      />
      <Flyout
        open={open}
        onOpenChange={(next) => {
          if (!next) {
            setDraft(committed);
            setOpen(false);
          }
        }}
        anchorRef={anchorRef}
        mode="multiple"
        selected={draft}
        onSelectionChange={setDraft}>
        <FlyoutFilter placeholder="Filter…" />
        <FlyoutSelectAll />
        <FlyoutList>
          <FlyoutGroup label="Status" defaultOpen renderIcon={Star}>
            <FlyoutItem value="active">Active</FlyoutItem>
            <FlyoutItem value="archived">Archived</FlyoutItem>
            <FlyoutItem value="draft">Draft</FlyoutItem>
          </FlyoutGroup>
          <FlyoutGroup label="Priority">
            <FlyoutItem value="p0">P0</FlyoutItem>
            <FlyoutItem value="p1">P1</FlyoutItem>
            <FlyoutItem value="p2">P2</FlyoutItem>
          </FlyoutGroup>
        </FlyoutList>
        <FlyoutFooter>
          <Button kind="ghost" size="small" onClick={() => { setDraft(committed); setOpen(false); }}>Cancel</Button>
          <Button kind="primary" size="small" onClick={() => { setCommitted(draft); setOpen(false); }}>Apply</Button>
        </FlyoutFooter>
      </Flyout>
    </>
  );
};
FullyLoaded.storyName = 'Fully Loaded';

// ─── Long Labels — exercises the truncation tooltip ──────────────────────────

export const LongLabels = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  return (
    <>
      <Trigger anchorRef={anchorRef} onClick={() => setOpen((v) => !v)} label="Long labels" />
      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={anchorRef}
        mode="single"
        selected={selected}
        onSelectionChange={setSelected}>
        <FlyoutList>
          <FlyoutItem value="a">Short</FlyoutItem>
          <FlyoutItem value="b">A reasonably long option label that fits</FlyoutItem>
          <FlyoutItem value="c">An exceptionally long option label that will definitely truncate at the 320px flyout max-width</FlyoutItem>
          <FlyoutItem value="d">Q3 FY24 enterprise expansion deal — Acme Corp customer success forecast</FlyoutItem>
          <FlyoutItem value="e">Another genuinely lengthy option to test the hover-after-1s tooltip behavior properly</FlyoutItem>
        </FlyoutList>
      </Flyout>
    </>
  );
};
LongLabels.storyName = 'Long Labels (truncation tooltip)';
