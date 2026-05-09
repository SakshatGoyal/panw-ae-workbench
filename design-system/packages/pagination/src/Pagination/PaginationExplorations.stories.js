import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown } from 'lucide-react';

// Aesthetic explorations for pagination — these are NOT production components.
// They're visual-language prototypes meant to be evaluated side-by-side so the
// system can pick a direction before promoting one to the real Pagination
// package. Same data + behavior across all four; the only thing that varies
// is the visual idiom.

const SAMPLE = { total: 1247, rowsPerPage: 25, page: 5 };
const totalPages = (t, r) => Math.max(1, Math.ceil(t / r));
const rangeStart = (p, r) => (p - 1) * r + 1;
const rangeEnd = (p, r, t) => Math.min(p * r, t);
const fmt = (n) => n.toLocaleString('en-US');
const pad = (n, w = 2) => String(n).padStart(w, '0');

// ─────────────────────────────────────────────────────────────────────────────
// 1. LEDGER — Bloomberg-terminal / status-bar feel.
// All caps, tracked-out, monospaced numerals, hairline rule above. Buttons
// are underlined text, not chips. Reads like a financial data read-out.

function Ledger({ total, rowsPerPage, page, onPageChange, onRowsChange }) {
  const tp = totalPages(total, rowsPerPage);
  const baseLink = {
    background: 'none',
    border: 'none',
    padding: '4px 0',
    color: '#0e1317',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
  };
  const sep = { color: '#c5ccd1', userSelect: 'none' };
  const lbl = { fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#525252' };
  return (
    <div style={{ borderTop: '1px solid #0e1317', paddingTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif', fontVariantNumeric: 'tabular-nums' }}>
        <span style={lbl}>
          {fmt(rangeStart(page, rowsPerPage))}–{fmt(rangeEnd(page, rowsPerPage, total))} <span style={{ color: '#c5ccd1' }}>OF</span> {fmt(total)} <span style={{ color: '#c5ccd1' }}>RECORDS</span>
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <button style={baseLink} disabled={page === 1} onClick={() => onPageChange(1)}>FIRST</button>
          <span style={sep}>·</span>
          <button style={baseLink} disabled={page === 1} onClick={() => onPageChange(page - 1)}>PREV</button>
          <span style={sep}>·</span>
          <span style={{ ...lbl, color: '#0e1317', fontWeight: 600 }}>
            PAGE {pad(page)} <span style={{ color: '#c5ccd1' }}>/</span> {pad(tp)}
          </span>
          <span style={sep}>·</span>
          <button style={baseLink} disabled={page === tp} onClick={() => onPageChange(page + 1)}>NEXT</button>
          <span style={sep}>·</span>
          <button style={baseLink} disabled={page === tp} onClick={() => onPageChange(tp)}>LAST</button>
          <span style={{ ...lbl, marginLeft: 24 }}>
            ROWS{' '}
            <select
              value={rowsPerPage}
              onChange={(e) => onRowsChange(parseInt(e.target.value, 10))}
              style={{ ...baseLink, fontWeight: 600, color: '#0e1317' }}>
              {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. COMPASS — single composite pill navigator.
// Prev/next chevrons embedded into a rounded shell with the page input
// centered. Reads as ONE object — the navigator. Range floats above; items
// per page sits beside.

function Compass({ total, rowsPerPage, page, onPageChange, onRowsChange }) {
  const tp = totalPages(total, rowsPerPage);
  const [draft, setDraft] = useState(String(page));
  React.useEffect(() => setDraft(String(page)), [page]);
  const commit = () => {
    const n = parseInt(draft, 10);
    if (!isNaN(n) && n >= 1 && n <= tp) onPageChange(n);
    else setDraft(String(page));
  };
  const chevBtn = {
    background: 'none',
    border: 'none',
    padding: '0 12px',
    height: 36,
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#0e1317',
  };
  const divider = { width: 1, alignSelf: 'stretch', background: '#e4e8eb' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'Inter, sans-serif', fontVariantNumeric: 'tabular-nums' }}>
      <span style={{ fontSize: 13, color: '#525252' }}>
        Showing <strong style={{ color: '#0e1317', fontWeight: 600 }}>{fmt(rangeStart(page, rowsPerPage))}–{fmt(rangeEnd(page, rowsPerPage, total))}</strong> of {fmt(total)}
      </span>
      <div style={{ display: 'inline-flex', alignItems: 'stretch', borderRadius: 999, border: '1px solid #e4e8eb', background: '#fff', overflow: 'hidden' }}>
        <button style={chevBtn} disabled={page === 1} onClick={() => onPageChange(page - 1)}><ChevronLeft size={16} /></button>
        <div style={divider} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 36 }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setDraft(String(page)); }}
            onBlur={commit}
            aria-label="Page number"
            style={{
              width: `${Math.max(2, String(tp).length)}ch`,
              border: 'none',
              outline: 'none',
              textAlign: 'center',
              background: 'transparent',
              font: 'inherit',
              fontSize: 14,
              fontWeight: 600,
              color: '#0e1317',
              fontVariantNumeric: 'tabular-nums',
            }}
          />
          <span style={{ fontSize: 14, color: '#525252' }}>of {tp}</span>
        </div>
        <div style={divider} />
        <button style={chevBtn} disabled={page === tp} onClick={() => onPageChange(page + 1)}><ChevronRight size={16} /></button>
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#525252' }}>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsChange(parseInt(e.target.value, 10))}
          style={{ font: 'inherit', fontSize: 13, color: '#0e1317', border: '1px solid #e4e8eb', borderRadius: 4, padding: '4px 8px', background: '#fff' }}>
          {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n} per page</option>)}
        </select>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SCRUBBER — data-vis position bar.
// A horizontal track shows where in the dataset the user is. Reads more as
// a visualization than a control. Better at "how much is left" than at
// "jump to page 47."

function Scrubber({ total, rowsPerPage, page, onPageChange, onRowsChange }) {
  const tp = totalPages(total, rowsPerPage);
  const fillPct = (page / tp) * 100;
  const trackRef = React.useRef(null);
  const onTrackClick = (e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const target = Math.min(tp, Math.max(1, Math.round(pct * tp)));
    onPageChange(target);
  };
  const chevBtn = {
    background: 'none',
    border: 'none',
    padding: 4,
    cursor: 'pointer',
    color: '#0e1317',
    display: 'inline-flex',
    alignItems: 'center',
  };
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', fontVariantNumeric: 'tabular-nums', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 13, color: '#525252' }}>Page <strong style={{ color: '#0e1317', fontWeight: 600 }}>{page}</strong> of {tp}</span>
        <span style={{ fontSize: 13, color: '#525252' }}>
          Showing <strong style={{ color: '#0e1317', fontWeight: 600 }}>{fmt(rangeStart(page, rowsPerPage))}–{fmt(rangeEnd(page, rowsPerPage, total))}</strong> of {fmt(total)}
        </span>
      </div>
      <div
        ref={trackRef}
        onClick={onTrackClick}
        style={{ position: 'relative', height: 6, background: '#ededed', borderRadius: 999, cursor: 'pointer' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fillPct}%`, background: '#004C9D', borderRadius: 999 }} />
        <div style={{
          position: 'absolute',
          top: -3,
          left: `calc(${fillPct}% - 6px)`,
          width: 12,
          height: 12,
          background: '#fff',
          border: '2px solid #004C9D',
          borderRadius: 999,
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <button style={chevBtn} disabled={page === 1} onClick={() => onPageChange(1)}><ChevronsLeft size={16} /></button>
          <button style={chevBtn} disabled={page === 1} onClick={() => onPageChange(page - 1)}><ChevronLeft size={16} /></button>
          <button style={chevBtn} disabled={page === tp} onClick={() => onPageChange(page + 1)}><ChevronRight size={16} /></button>
          <button style={chevBtn} disabled={page === tp} onClick={() => onPageChange(tp)}><ChevronsRight size={16} /></button>
        </div>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsChange(parseInt(e.target.value, 10))}
          style={{ font: 'inherit', fontSize: 13, color: '#0e1317', border: '1px solid #e4e8eb', borderRadius: 4, padding: '4px 8px', background: '#fff' }}>
          {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n} per page</option>)}
        </select>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. HYPERLINK — pure typographic. No chrome.
// All text. Hyperlinks for nav. Mid-dot separators. Reads like editorial
// content. Stripe Atlas / Vercel-quiet vibe — for surfaces where the table
// is the focal object and the pagination shouldn't compete.

function Hyperlink({ total, rowsPerPage, page, onPageChange, onRowsChange }) {
  const tp = totalPages(total, rowsPerPage);
  const link = (label, onClick, disabled) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? '#c5ccd1' : '#004C9D',
        textDecoration: 'underline',
        textUnderlineOffset: 3,
        textDecorationColor: disabled ? '#c5ccd1' : 'rgba(0,76,157,0.3)',
        font: 'inherit',
      }}>
      {label}
    </button>
  );
  const dot = <span style={{ color: '#c5ccd1', margin: '0 12px' }}>·</span>;
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#525252', fontVariantNumeric: 'tabular-nums' }}>
      <span>
        Showing <strong style={{ color: '#0e1317', fontWeight: 500 }}>{fmt(rangeStart(page, rowsPerPage))}–{fmt(rangeEnd(page, rowsPerPage, total))}</strong> of <strong style={{ color: '#0e1317', fontWeight: 500 }}>{fmt(total)}</strong>
      </span>
      {dot}
      {link('← previous', () => onPageChange(page - 1), page === 1)}
      {dot}
      <span>page <strong style={{ color: '#0e1317', fontWeight: 500 }}>{page}</strong> of {tp}</span>
      {dot}
      {link('next →', () => onPageChange(page + 1), page === tp)}
      {dot}
      <span>
        show{' '}
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsChange(parseInt(e.target.value, 10))}
          style={{ font: 'inherit', color: '#0e1317', border: 'none', background: 'transparent', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'rgba(14,19,23,0.3)' }}>
          {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>{' '}
        per page
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Story shell — renders all four with shared state, and labels each so the
// visual differences read clearly.

function Variant({ name, tagline, children }) {
  return (
    <div style={{ borderRadius: 8, background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', padding: '32px 32px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0e1317', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{name}</span>
        <span style={{ fontSize: 13, color: '#525252' }}>{tagline}</span>
      </div>
      {children}
    </div>
  );
}

export default {
  title: 'Components/Pagination/Aesthetic Explorations',
  parameters: { controls: { disable: true }, layout: 'fullscreen' },
};

export const FourDirections = () => {
  const [s1, set1] = useState(SAMPLE);
  const [s2, set2] = useState(SAMPLE);
  const [s3, set3] = useState(SAMPLE);
  const [s4, set4] = useState(SAMPLE);
  const handlers = (s, set) => ({
    page: s.page,
    total: s.total,
    rowsPerPage: s.rowsPerPage,
    onPageChange: (p) => set({ ...s, page: p }),
    onRowsChange: (r) => set({ ...s, rowsPerPage: r, page: 1 }),
  });
  return (
    <div style={{ minHeight: '100vh', background: '#f4f4f4', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Variant name="1 — Ledger" tagline="status-bar / Bloomberg terminal. industrial, dense, all caps tracked, hairline above.">
        <Ledger {...handlers(s1, set1)} />
      </Variant>
      <Variant name="2 — Compass" tagline="single composite pill navigator. tight, modal, one object.">
        <Compass {...handlers(s2, set2)} />
      </Variant>
      <Variant name="3 — Scrubber" tagline="data-vis position bar. shows ‘where am I in the dataset’ at a glance, draggable.">
        <Scrubber {...handlers(s3, set3)} />
      </Variant>
      <Variant name="4 — Hyperlink" tagline="pure text. editorial, quiet, prose-like. no chrome.">
        <Hyperlink {...handlers(s4, set4)} />
      </Variant>
    </div>
  );
};
FourDirections.storyName = 'Four Directions';
