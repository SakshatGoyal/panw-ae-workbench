import * as React from 'react';
import * as Icons from './generated';
import { ICON_NAMES, type IconName } from './generated/names';
import { Icon } from './Icon';

/**
 * Foundations / Icons
 *
 * Browseable index of every glyph in @ds/icons. Search filters by name,
 * size selector retints. Brand icons (`brand-*`) and sales-play status
 * icons render with their authored colors and ignore `color` — by design.
 */
export default {
  title: 'Foundations/Icons',
  parameters: { layout: 'fullscreen' },
};

const ALL = ICON_NAMES;
const BRAND = ALL.filter((n) => n.startsWith('brand-'));
const SALES_PLAY: IconName[] = [
  'closed-lost', 'closed-won', 'deferred', 'interested',
  'not-touched', 'open-pipeline', 'pitched',
];
const FUNCTIONAL = ALL.filter(
  (n) => !BRAND.includes(n) && !(SALES_PLAY as string[]).includes(n)
);

function Tile({ name, size }: { name: IconName; size: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
        padding: 12,
        border: '1px solid #e4e8eb',
        borderRadius: 4,
        background: '#fff',
        minWidth: 120,
      }}>
      <div
        style={{
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#404a52',
        }}>
        <Icon name={name} size={size} />
      </div>
      <code style={{ fontSize: 11, color: '#545454', textAlign: 'center', wordBreak: 'break-all' }}>
        {name}
      </code>
    </div>
  );
}

function Grid({ names, size }: { names: readonly IconName[]; size: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 8,
      }}>
      {names.map((n) => <Tile key={n} name={n} size={size} />)}
    </div>
  );
}

export const Library = () => {
  const [query, setQuery] = React.useState('');
  const [size, setSize] = React.useState(24);
  const filter = (xs: readonly IconName[]) =>
    query ? xs.filter((n) => n.includes(query.toLowerCase())) : xs;

  const fnNames = filter(FUNCTIONAL);
  const brandNames = filter(BRAND);
  const playNames = filter(SALES_PLAY);

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', color: '#0f0f0f' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Icons</h1>
        <span style={{ color: '#545454', fontSize: 13 }}>
          {ICON_NAMES.length} glyphs &middot; default size 20px
        </span>
      </header>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center' }}>
        <input
          type="search"
          value={query}
          placeholder="Search by name (e.g. arrow, chevron, brand)"
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #d1d6da',
            borderRadius: 4,
            fontSize: 13,
          }}
        />
        <label style={{ fontSize: 13, color: '#545454', display: 'flex', gap: 8, alignItems: 'center' }}>
          Size
          <select
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value, 10))}
            style={{ padding: '6px 8px', border: '1px solid #d1d6da', borderRadius: 4 }}>
            <option value={16}>16</option>
            <option value={20}>20</option>
            <option value={24}>24</option>
            <option value={32}>32</option>
            <option value={48}>48</option>
          </select>
        </label>
      </div>

      {fnNames.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 14, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5, color: '#3b3b3b' }}>
            Functional ({fnNames.length})
          </h2>
          <p style={{ fontSize: 12, color: '#545454', marginTop: 0, marginBottom: 12 }}>
            Take color from <code>currentColor</code>. Set <code>color</code> on the icon or any
            ancestor to retint.
          </p>
          <Grid names={fnNames} size={size} />
        </section>
      )}

      {brandNames.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 14, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5, color: '#3b3b3b' }}>
            Brand ({brandNames.length})
          </h2>
          <p style={{ fontSize: 12, color: '#545454', marginTop: 0, marginBottom: 12 }}>
            Authored fills are part of the mark. <code>color</code> has no effect.
          </p>
          <Grid names={brandNames} size={size} />
        </section>
      )}

      {playNames.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 14, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5, color: '#3b3b3b' }}>
            Sales-play ({playNames.length})
          </h2>
          <p style={{ fontSize: 12, color: '#545454', marginTop: 0, marginBottom: 12 }}>
            Status glyphs. Color encodes meaning and is fixed.
          </p>
          <Grid names={playNames} size={size} />
        </section>
      )}
    </div>
  );
};

/**
 * Tinting demo — proves currentColor inheritance through nested colour
 * contexts. Brand and sales-play swatches deliberately ignore the color
 * change, demonstrating their semantic-color guarantee.
 */
export const Tinting = () => {
  const samples: IconName[] = ['arrow-down', 'chevron-down', 'check', 'filter', 'search'];
  const swatches = [
    { label: 'text-primary', color: '#0f0f0f' },
    { label: 'icons-tertiary', color: '#404a52' },
    { label: 'icons-tertiary-disabled', color: '#8f8f8f' },
    { label: 'text-brand-rest', color: '#006FCC' },
  ];
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ margin: '0 0 16px', fontSize: 20 }}>currentColor flow</h1>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8, fontSize: 12 }}>Token</th>
            {samples.map((s) => (
              <th key={s} style={{ padding: 8, fontSize: 12, color: '#545454' }}>
                <code>{s}</code>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {swatches.map((sw) => (
            <tr key={sw.label} style={{ borderTop: '1px solid #e4e8eb' }}>
              <td style={{ padding: 8, fontSize: 12, color: '#3b3b3b' }}>{sw.label}</td>
              {samples.map((s) => (
                <td key={s} style={{ padding: 8, color: sw.color }}>
                  <Icon name={s} size={24} />
                </td>
              ))}
            </tr>
          ))}
          <tr style={{ borderTop: '1px solid #e4e8eb' }}>
            <td style={{ padding: 8, fontSize: 12, color: '#3b3b3b' }}>brand (color: red, ignored)</td>
            {(['brand-panw', 'brand-prisma', 'brand-strata', 'brand-cortex'] as IconName[]).map((s) => (
              <td key={s} style={{ padding: 8, color: 'red' }}>
                <Icon name={s} size={32} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/**
 * Named-import sample — sanity check that the named exports resolve and
 * tree-shake cleanly. If this story renders, the codegen barrel is sound.
 */
export const NamedImports = () => (
  <div style={{ padding: 24, display: 'flex', gap: 24, alignItems: 'center', color: '#404a52' }}>
    <Icons.ArrowDown />
    <Icons.ChevronDown />
    <Icons.Check />
    <Icons.Search />
    <Icons.Filter />
    <Icons.Plus />
    <Icons.Minus />
    <Icons.Close />
    <Icons.AngleDoubleLeft />
    <Icons.AngleDoubleRight />
    <Icons.ExclamationTriangle />
    <Icons.CircleCheck />
    <Icons.BrandPanw size={32} />
  </div>
);
