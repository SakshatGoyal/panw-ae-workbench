import React, { useEffect, useState } from 'react';

// =============================================================================
// Stage Color Tokens — documentation story
// Reads live CSS custom properties so values always reflect the built theme.
// =============================================================================

interface TokenEntry {
  name: string; // e.g. '--ds-surface-rest'
  role: string; // human description
}

interface TokenSection {
  title: string;
  tokens: TokenEntry[];
}

const SECTIONS: TokenSection[] = [
  {
    title: 'Base',
    tokens: [
      { name: '--ds-base', role: 'Page ground — the floor all tiles rest on' },
    ],
  },
  {
    title: 'Surface',
    tokens: [
      { name: '--ds-surface-rest',           role: 'Default tile/card surface at rest' },
      { name: '--ds-surface-hover',          role: 'Tile surface on pointer hover' },
      { name: '--ds-surface-pressed',        role: 'Tile surface when pressed' },
      { name: '--ds-surface-selected',       role: 'Tile surface in selected state' },
      { name: '--ds-surface-disabled',       role: 'Tile surface when disabled' },
      { name: '--ds-surface-alt-rest',       role: 'Alternate surface (neutral5) — sidebars, alt tiles' },
      { name: '--ds-surface-alt-hover',      role: 'Alternate surface on hover' },
      { name: '--ds-surface-alt-pressed',    role: 'Alternate surface when pressed' },
      { name: '--ds-surface-alt-selected',   role: 'Alternate surface in selected state' },
      { name: '--ds-surface-accent-rest',    role: 'Accented surface (neutral20) — table headers, chip wells' },
      { name: '--ds-surface-accent-hover',   role: 'Accented surface on hover' },
      { name: '--ds-surface-accent-pressed', role: 'Accented surface when pressed' },
      { name: '--ds-surface-accent-selected',role: 'Accented surface in selected state' },
      { name: '--ds-surface-inverse-rest',   role: 'Inverse surface — tooltips, dark overlays' },
      { name: '--ds-surface-inverse-hover',  role: 'Inverse surface on hover' },
      { name: '--ds-surface-inverse-pressed', role: 'Inverse surface when pressed' },
      { name: '--ds-surface-danger-rest',    role: 'Danger fill — destructive button ground' },
      { name: '--ds-surface-danger-hover',   role: 'Danger fill on hover' },
      { name: '--ds-surface-danger-pressed', role: 'Danger fill when pressed' },
      { name: '--ds-surface-danger-disabled',role: 'Danger fill when disabled (dimmed wash)' },
    ],
  },
  {
    title: 'Field',
    tokens: [
      { name: '--ds-field-rest',          role: 'Input field ground at rest' },
      { name: '--ds-field-hover',         role: 'Input field ground on hover' },
      { name: '--ds-field-pressed',       role: 'Input field ground when pressed' },
      { name: '--ds-field-disabled',      role: 'Input field ground when disabled' },
      { name: '--ds-field-alt-rest',      role: 'Alt field ground (white) — for use on neutral5 surfaces' },
      { name: '--ds-field-alt-hover',     role: 'Alt field ground on hover' },
      { name: '--ds-field-alt-pressed',   role: 'Alt field ground when pressed' },
    ],
  },
  {
    title: 'Ghost',
    tokens: [
      { name: '--ds-ghost-rest',                role: 'Transparent at rest — ghost buttons, tree rows' },
      { name: '--ds-ghost-hover',               role: 'Alpha neutral overlay on hover' },
      { name: '--ds-ghost-pressed',             role: 'Alpha neutral overlay when pressed' },
      { name: '--ds-ghost-selected',            role: 'Alpha brand overlay for selected rows' },
      { name: '--ds-ghost-highlight-rest',      role: 'Transparent at rest — brand-coded ghost' },
      { name: '--ds-ghost-highlight-hover',     role: 'Alpha brand overlay on hover (tertiary button preview)' },
      { name: '--ds-ghost-highlight-pressed',   role: 'Alpha brand overlay when pressed' },
      { name: '--ds-ghost-highlight-selected',  role: 'Alpha brand overlay for selected state' },
      { name: '--ds-ghost-danger-rest',         role: 'Transparent at rest — danger-coded ghost' },
      { name: '--ds-ghost-danger-hover',        role: 'Alpha red overlay on hover' },
      { name: '--ds-ghost-danger-pressed',      role: 'Alpha red overlay when pressed' },
    ],
  },
  {
    title: 'Brand',
    tokens: [
      { name: '--ds-brand-rest',     role: 'Primary brand fill — primary button ground' },
      { name: '--ds-brand-hover',    role: 'Brand on hover' },
      { name: '--ds-brand-pressed',  role: 'Brand when pressed' },
      { name: '--ds-brand-selected', role: 'Brand in selected state' },
      { name: '--ds-brand-disabled', role: 'Brand when disabled (light wash)' },
    ],
  },
  {
    title: 'Highlight',
    tokens: [
      { name: '--ds-highlight-rest',     role: 'Alpha-blue fill — selected rows, active chips' },
      { name: '--ds-highlight-hover',    role: 'Highlight on hover' },
      { name: '--ds-highlight-pressed',  role: 'Highlight when pressed' },
      { name: '--ds-highlight-selected', role: 'Highlight in selected state' },
      { name: '--ds-highlight-disabled', role: 'Highlight when disabled' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { name: '--ds-text-primary',              role: 'Primary text — headings, body copy' },
      { name: '--ds-text-secondary-rest',       role: 'Secondary text — labels, captions' },
      { name: '--ds-text-secondary-hover',      role: 'Secondary text on hover' },
      { name: '--ds-text-secondary-pressed',    role: 'Secondary text when pressed' },
      { name: '--ds-text-secondary-disabled',   role: 'Secondary text when disabled' },
      { name: '--ds-text-tertiary-rest',        role: 'Tertiary text — helper text, supplemental copy' },
      { name: '--ds-text-tertiary-hover',       role: 'Tertiary text on hover' },
      { name: '--ds-text-disabled',             role: 'Disabled text (standalone fallback)' },
      { name: '--ds-text-placeholder-rest',     role: 'Placeholder text in empty fields' },
      { name: '--ds-text-placeholder-hover',    role: 'Placeholder text on field hover' },
      { name: '--ds-text-brand-rest',           role: 'Brand text — brand links, brand labels' },
      { name: '--ds-text-brand-hover',          role: 'Brand text on hover' },
      { name: '--ds-text-brand-pressed',        role: 'Brand text when pressed' },
      { name: '--ds-text-brand-disabled',       role: 'Brand text when disabled' },
      { name: '--ds-text-inverse-rest',         role: 'Inverse text — on dark/tooltip surfaces' },
      { name: '--ds-text-inverse-hover',        role: 'Inverse text on hover' },
      { name: '--ds-text-inverse-disabled',     role: 'Inverse text when disabled' },
      { name: '--ds-text-danger-rest',          role: 'Danger text — inline error messages' },
      { name: '--ds-text-danger-hover',         role: 'Danger text on hover' },
      { name: '--ds-text-danger-pressed',       role: 'Danger text when pressed' },
      { name: '--ds-text-link-rest',            role: 'Link text' },
      { name: '--ds-text-link-hover',           role: 'Link text on hover' },
      { name: '--ds-text-link-visited-rest',    role: 'Visited link text' },
      { name: '--ds-text-info',                 role: 'Info status text' },
      { name: '--ds-text-success',              role: 'Success status text' },
      { name: '--ds-text-warning',              role: 'Warning status text' },
      { name: '--ds-text-caution',              role: 'Caution status text' },
    ],
  },
  {
    title: 'Icons',
    tokens: [
      { name: '--ds-icons-primary',             role: 'Primary icon color' },
      { name: '--ds-icons-secondary-rest',      role: 'Secondary icon — toolbar icons, chevrons, expand glyphs' },
      { name: '--ds-icons-secondary-hover',     role: 'Secondary icon on hover' },
      { name: '--ds-icons-secondary-pressed',   role: 'Secondary icon when pressed' },
      { name: '--ds-icons-secondary-disabled',  role: 'Secondary icon when disabled' },
      { name: '--ds-icons-tertiary-rest',       role: 'Tertiary icon — supplemental/decorative glyphs' },
      { name: '--ds-icons-tertiary-hover',      role: 'Tertiary icon on hover' },
      { name: '--ds-icons-disabled',            role: 'Disabled icon (standalone fallback)' },
      { name: '--ds-icons-brand-rest',          role: 'Brand icon' },
      { name: '--ds-icons-brand-hover',         role: 'Brand icon on hover' },
      { name: '--ds-icons-brand-pressed',       role: 'Brand icon when pressed' },
      { name: '--ds-icons-brand-disabled',      role: 'Brand icon when disabled' },
      { name: '--ds-icons-inverse-rest',        role: 'Inverse icon — on dark surfaces' },
      { name: '--ds-icons-inverse-hover',       role: 'Inverse icon on hover' },
      { name: '--ds-icons-danger-rest',         role: 'Danger icon — destructive actions' },
      { name: '--ds-icons-danger-hover',        role: 'Danger icon on hover' },
      { name: '--ds-icons-danger-pressed',      role: 'Danger icon when pressed' },
      { name: '--ds-icons-info',                role: 'Info status icon' },
      { name: '--ds-icons-success',             role: 'Success status icon' },
      { name: '--ds-icons-warning',             role: 'Warning status icon' },
      { name: '--ds-icons-caution',             role: 'Caution status icon' },
    ],
  },
  {
    title: 'Lines',
    tokens: [
      { name: '--ds-lines-bold',               role: 'Bold divider — heavyweight section separator' },
      { name: '--ds-lines-neutral-rest',       role: 'Default border — fields, cards, dropdowns' },
      { name: '--ds-lines-neutral-hover',      role: 'Neutral border on hover' },
      { name: '--ds-lines-neutral-pressed',    role: 'Neutral border when pressed' },
      { name: '--ds-lines-neutral-disabled',   role: 'Neutral border when disabled' },
      { name: '--ds-lines-neutral-tile-rest',  role: 'Tile border — cards, panels ≥48px' },
      { name: '--ds-lines-neutral-tile-hover', role: 'Tile border on hover' },
      { name: '--ds-lines-brand-rest',         role: 'Brand border — focus rings, active fields' },
      { name: '--ds-lines-brand-hover',        role: 'Brand border on hover' },
      { name: '--ds-lines-brand-pressed',      role: 'Brand border when pressed' },
      { name: '--ds-lines-brand-disabled',     role: 'Brand border when disabled' },
      { name: '--ds-lines-danger-rest',        role: 'Danger border — error state fields' },
      { name: '--ds-lines-danger-hover',       role: 'Danger border on hover' },
      { name: '--ds-lines-danger-pressed',     role: 'Danger border when pressed' },
      { name: '--ds-lines-danger-disabled',    role: 'Danger border when disabled' },
      { name: '--ds-lines-status-info',        role: 'Info status border' },
      { name: '--ds-lines-status-success',     role: 'Success status border' },
      { name: '--ds-lines-status-warning',     role: 'Warning status border' },
      { name: '--ds-lines-status-caution',     role: 'Caution status border' },
      { name: '--ds-lines-status-danger',      role: 'Danger status border' },
    ],
  },
  {
    title: 'Status',
    tokens: [
      { name: '--ds-status-info-subtle',    role: 'Info — subtle background (inline notifications)' },
      { name: '--ds-status-info-strong',    role: 'Info — strong background' },
      { name: '--ds-status-warning-subtle', role: 'Warning — subtle background' },
      { name: '--ds-status-warning-strong', role: 'Warning — strong background' },
      { name: '--ds-status-caution-subtle', role: 'Caution — subtle background' },
      { name: '--ds-status-caution-strong', role: 'Caution — strong background' },
      { name: '--ds-status-error-subtle',   role: 'Error — subtle background' },
      { name: '--ds-status-error-strong',   role: 'Error — strong background' },
      { name: '--ds-status-success-subtle', role: 'Success — subtle background' },
      { name: '--ds-status-success-strong', role: 'Success — strong background' },
    ],
  },
];

// ─── Token row ────────────────────────────────────────────────────────────────

function TokenRow({ name, role, isLast }: { name: string; role: string; isLast: boolean }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const stageEl = document.querySelector('.stage') as HTMLElement | null;
    const el = stageEl ?? document.documentElement;
    const raw = getComputedStyle(el).getPropertyValue(name).trim();
    setValue(raw || '—');
  }, [name]);

  const isTransparent = value === 'transparent' || value === '';

  return (
    <tr style={{ borderBottom: isLast ? 'none' : '1px solid #E4E8EB' }}>
      {/* Token name */}
      <td style={{ padding: '14px 16px', verticalAlign: 'middle', width: '35%' }}>
        <code style={{
          display: 'inline-block',
          background: '#F0F4F7',
          color: '#1F272E',
          padding: '3px 7px',
          borderRadius: 4,
          fontSize: 12,
          fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          lineHeight: '1.5',
          whiteSpace: 'nowrap',
        }}>
          {name}
        </code>
      </td>
      {/* Role */}
      <td style={{ padding: '14px 16px', verticalAlign: 'middle', color: '#404A52', fontSize: 14, lineHeight: '1.4' }}>
        {role}
      </td>
      {/* Value */}
      <td style={{ padding: '14px 16px', verticalAlign: 'middle', color: '#656F76', fontSize: 12, fontFamily: 'JetBrains Mono, ui-monospace, monospace', width: '26%' }}>
        {value || '—'}
      </td>
      {/* Swatch */}
      <td style={{ padding: '14px 16px', verticalAlign: 'middle', width: 64 }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          flexShrink: 0,
          // Checkerboard for transparent tokens
          background: isTransparent
            ? 'repeating-conic-gradient(#D5DADE 0% 25%, #F7FAFB 0% 50%) 0 0 / 10px 10px'
            : `var(${name})`,
          border: '1px solid #E4E8EB',
          boxSizing: 'border-box',
        }} />
      </td>
    </tr>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

function TokenSection({ section }: { section: TokenSection }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{
        fontSize: 16,
        fontWeight: 600,
        color: '#1F272E',
        margin: '0 0 12px',
        paddingBottom: 8,
        borderBottom: '2px solid #1F272E',
        fontFamily: 'Lato, ui-sans-serif, system-ui, sans-serif',
      }}>
        {section.title}
      </h2>
      <div style={{ border: '1px solid #E4E8EB', borderRadius: 8, overflow: 'hidden' }}>
        {/* Table header */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F0F4F7', borderBottom: '1px solid #E4E8EB' }}>
              <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#525D66', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Token</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#525D66', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Role</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#525D66', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Value</th>
              <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#525D66', letterSpacing: '0.5px', textTransform: 'uppercase' }}></th>
            </tr>
          </thead>
          <tbody>
            {section.tokens.map((token, i) => (
              <TokenRow
                key={token.name}
                name={token.name}
                role={token.role}
                isLast={i === section.tokens.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ColorTokensPage() {
  return (
    <div className="stage" style={{
      minHeight: '100vh',
      background: 'var(--ds-base, #F0F4F7)',
      padding: '40px',
      fontFamily: 'Lato, ui-sans-serif, system-ui, sans-serif',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: 1100 }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0E1317', margin: '0 0 8px' }}>
            Stage Color Tokens
          </h1>
          <p style={{ fontSize: 14, color: '#525D66', margin: 0, lineHeight: 1.5 }}>
            All semantic color tokens from the Stage theme. Values are resolved live from
            CSS custom properties — what you see here is what the browser computes.
            Grouped by semantic family.
          </p>
        </div>
        {SECTIONS.map((section) => (
          <TokenSection key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
}

// ─── Storybook export ─────────────────────────────────────────────────────────

export default {
  title: 'Design System/Color Tokens',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: { disable: true },
  },
};

export const Stage = () => <ColorTokensPage />;
Stage.storyName = 'Stage';
