import * as React from 'react';
import { styles, styleNames, type TypeStyleName, type TypeStyle, type ClampTuple } from './styles';

/**
 * Foundations / Typography
 *
 * One row per text token. Left column shows a real sample rendered in the
 * token's actual style; right column is the spec: family, size, line
 * height, weight, letter spacing, type set, and the SCSS variable name.
 *
 * The data here is read directly from `styles.ts` — if a token changes,
 * this page changes with it. No hand-maintained tables.
 */
export default {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
};

// ─── Group the 33 styles by family for readable sectioning ───────────────────

type Group = { title: string; names: TypeStyleName[] };

const GROUPS: Group[] = [
  {
    title: 'Body',
    names: ['body-compact-01', 'body-compact-02', 'body-01', 'body-02', 'body-03'],
  },
  {
    title: 'Heading',
    names: [
      'heading-compact-01',
      'heading-compact-02',
      'heading-01',
      'heading-02',
      'heading-03',
      'heading-04',
      'heading-05',
      'heading-06',
      'heading-07',
    ],
  },
  {
    title: 'Utility (label, helper, legal, code)',
    names: [
      'label-01',
      'label-02',
      'helper-text-01',
      'helper-text-02',
      'legal-01',
      'legal-02',
      'code-01',
      'code-02',
    ],
  },
  {
    title: 'Fluid heading',
    names: ['fluid-heading-03', 'fluid-heading-04', 'fluid-heading-05', 'fluid-heading-06'],
  },
  {
    title: 'Fluid paragraph and quotation',
    names: ['fluid-paragraph-01', 'fluid-quotation-01', 'fluid-quotation-02'],
  },
  {
    title: 'Fluid display',
    names: ['fluid-display-01', 'fluid-display-02', 'fluid-display-03', 'fluid-display-04'],
  },
];

// Sanity: every styleNames entry must land in exactly one group. If new
// tokens are added to styles.ts, fail loud here rather than silently dropping.
const GROUPED = new Set(GROUPS.flatMap((g) => g.names));
const UNGROUPED = (styleNames as readonly TypeStyleName[]).filter((n) => !GROUPED.has(n));

// ─── Sample copy keyed by family ─────────────────────────────────────────────
// The samples are written to actually exercise the style — short for utility,
// longer for body, single phrase for headings. Carbon's reference page uses
// the same approach: the sample should demonstrate the style's intended use.

const SAMPLES: Record<TypeStyleName, string> = {
  'code-01': 'const radius = "var(--ds-radius-tight)";',
  'code-02': 'const radius = "var(--ds-radius-tight)";',
  'label-01': 'Email address',
  'label-02': 'Email address',
  'helper-text-01': 'Use the email tied to your work account.',
  'helper-text-02': 'Use the email tied to your work account.',
  'legal-01': 'By continuing you agree to the terms of service.',
  'legal-02': 'By continuing you agree to the terms of service.',
  'body-compact-01':
    'This is for short paragraphs with no more than four lines and is commonly used in components.',
  'body-compact-02':
    'This is for short paragraphs with no more than four lines. Use in expressive components, such as button and link.',
  'body-01':
    'With a slightly taller line height than body-compact-01, this body style is used in productive layouts for long paragraphs with more than four lines.',
  'body-02':
    'With a slightly taller line height than body-compact-02, this style is commonly used in expressive layouts for long paragraphs with four lines or more.',
  'body-03':
    'A notch larger than the workhorse body. Used wherever paragraph text needs to read more comfortably than the dense 14/16 default — long-form panels, marketing surfaces inside the app.',
  'heading-compact-01': 'Section heading',
  'heading-compact-02': 'Section heading',
  'heading-01': 'Section heading',
  'heading-02': 'Section heading',
  'heading-03': 'Section heading',
  'heading-04': 'Section heading',
  'heading-05': 'Section heading',
  'heading-06': 'Section heading',
  'heading-07': 'Section heading',
  'fluid-heading-03': 'Section heading',
  'fluid-heading-04': 'Section heading',
  'fluid-heading-05': 'Section heading',
  'fluid-heading-06': 'Section heading',
  'fluid-paragraph-01':
    'A fluid paragraph scales with the viewport. Reach for this when the surrounding layout breathes across breakpoints.',
  'fluid-quotation-01': '"A quotation lives between paragraph and heading."',
  'fluid-quotation-02': '"A quotation lives between paragraph and heading."',
  'fluid-display-01': 'Display',
  'fluid-display-02': 'Display',
  'fluid-display-03': 'Display',
  'fluid-display-04': 'Display',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isClampTuple<T>(v: T | ClampTuple<T> | null | undefined): v is ClampTuple<T> {
  return !!v && typeof v === 'object' && 'min' in (v as object) && 'preferred' in (v as object);
}

/** Render a scalar-or-clamp-tuple as a single readable string for the spec column. */
function scalarOrClamp<T>(v: T | ClampTuple<T> | null | undefined): string {
  if (v == null) return '—';
  if (isClampTuple(v)) return `${String(v.min)} → ${String(v.preferred)} → ${String(v.max)}`;
  return String(v);
}

/** Convert a stored fontSize string into a human-readable label.
 * "0.875rem" → "14px / .875rem". Numbers passed through unchanged. */
function fontSizeLabel(v: string | ClampTuple<string> | null | undefined): string {
  if (v == null) return '—';
  if (isClampTuple(v)) return scalarOrClamp(v);
  const rem = parseRem(v);
  if (rem !== null) {
    const px = rem * 16;
    return `${formatPx(px)} / ${v}`;
  }
  return v;
}

function lineHeightLabel(v: string | ClampTuple<string> | null | undefined, fontSizeRaw: string | ClampTuple<string> | null | undefined): string {
  if (v == null) return '—';
  if (isClampTuple(v)) return scalarOrClamp(v);
  // Multiplier (e.g. "1.42857") — combine with fontSize for px equivalent.
  const ratio = parseFloat(v);
  const fontRem = isClampTuple(fontSizeRaw) ? null : parseRem(String(fontSizeRaw ?? ''));
  if (!isNaN(ratio) && fontRem !== null) {
    const px = fontRem * 16 * ratio;
    return `${formatPx(px)} / ${(fontRem * ratio).toFixed(3).replace(/\.?0+$/, '')}rem`;
  }
  return v;
}

function parseRem(s: string): number | null {
  const m = s.match(/^([0-9]*\.?[0-9]+)rem$/);
  return m ? parseFloat(m[1]) : null;
}

function formatPx(px: number): string {
  // Round trailing-zero noise: "18.000px" → "18px", "13.5px" stays "13.5px".
  return `${px.toFixed(3).replace(/\.?0+$/, '')}px`;
}

/** Translate a weight CSS var to a human-readable label. */
function weightLabel(w: string | null | undefined): string {
  if (!w) return '—';
  if (w.includes('font-weight-light')) return '300 / Light';
  if (w.includes('font-weight-regular')) return '400 / Regular';
  if (w.includes('font-weight-semibold')) return '600 / Semibold';
  return w;
}

function familyLabel(f: string | null | undefined): string {
  if (!f) return '—';
  if (f.includes('font-family-sans')) return 'Inter (sans)';
  if (f.includes('font-family-mono')) return 'JetBrains Mono';
  return f;
}

function typeSetLabel(name: TypeStyleName): string {
  if (name.startsWith('fluid-')) return 'Fluid (breakpoint-stepped)';
  if (name.startsWith('code-')) return 'Mono';
  if (name.endsWith('-02') || name.startsWith('fluid-display')) return 'Expressive';
  return 'Productive';
}

// Convert the stored TypeStyle to an inline React style object. We resolve
// CSS-variable references into real var() declarations so the sample renders
// even outside a fully-wrapped Stage scope.
function inlineStyleFor(name: TypeStyleName, t: TypeStyle): React.CSSProperties {
  const out: React.CSSProperties = {};
  if (t.fontFamily) out.fontFamily = t.fontFamily;
  if (t.fontSize) out.fontSize = isClampTuple(t.fontSize) ? String(t.fontSize.preferred) : t.fontSize;
  if (t.lineHeight) out.lineHeight = isClampTuple(t.lineHeight) ? String(t.lineHeight.preferred) : t.lineHeight;
  if (t.fontWeight) out.fontWeight = t.fontWeight as unknown as React.CSSProperties['fontWeight'];
  if (t.letterSpacing) out.letterSpacing = isClampTuple(t.letterSpacing) ? String(t.letterSpacing.preferred) : t.letterSpacing;
  // Body styles read longer; constrain width so the sample wraps where the
  // Carbon reference page does instead of running across the full row.
  if (name.startsWith('body-') || name === 'fluid-paragraph-01') out.maxWidth = '60ch';
  out.color = 'var(--ds-text-primary, #0e1317)';
  out.margin = 0;
  return out;
}

// ─── Layout primitives ───────────────────────────────────────────────────────

const PAGE: React.CSSProperties = {
  padding: '40px 32px 64px',
  fontFamily: 'var(--ds-type-font-family-sans, Inter, system-ui, sans-serif)',
  color: 'var(--ds-text-primary, #0e1317)',
  background: 'var(--ds-stage-base, #f4f4f4)',
};

const SECTION_HEAD: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 400,
  lineHeight: 1.25,
  margin: '0 0 8px',
};

const SECTION_INTRO: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.42857,
  color: 'var(--ds-text-secondary-rest, #525252)',
  maxWidth: '60ch',
  margin: '0 0 24px',
};

const ROW: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, 320px)',
  gap: 24,
  alignItems: 'start',
  padding: '24px 24px',
  background: 'var(--ds-surface-rest, #ffffff)',
  borderTop: '1px solid var(--ds-lines-neutral-rest, #e0e0e0)',
};

const SPEC_LABEL: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  margin: '0 0 8px',
  color: 'var(--ds-text-primary, #0e1317)',
};

const SPEC_ROW: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.42857,
  color: 'var(--ds-text-secondary-rest, #525252)',
};

const TOKEN_PILL: React.CSSProperties = {
  display: 'inline-block',
  marginTop: 12,
  padding: '2px 8px',
  fontFamily: 'var(--ds-type-font-family-mono, ui-monospace, monospace)',
  fontSize: 12,
  background: 'var(--ds-field-alt-rest, #f4f4f4)',
  border: '1px solid var(--ds-lines-neutral-rest, #e0e0e0)',
  borderRadius: 4,
  color: 'var(--ds-text-primary, #0e1317)',
};

// ─── One row per token ───────────────────────────────────────────────────────

function TokenRow({ name }: { name: TypeStyleName }) {
  const t = styles[name];
  const sample = SAMPLES[name] ?? 'Sample text';
  return (
    <div style={ROW}>
      <div>
        <div style={inlineStyleFor(name, t)}>{sample}</div>
      </div>
      <div>
        <div style={SPEC_LABEL}>{name}</div>
        <div style={SPEC_ROW}>Type: {familyLabel(t.fontFamily)}</div>
        <div style={SPEC_ROW}>Size: {fontSizeLabel(t.fontSize)}</div>
        <div style={SPEC_ROW}>
          Line height: {lineHeightLabel(t.lineHeight, t.fontSize)}
        </div>
        <div style={SPEC_ROW}>Weight: {weightLabel(t.fontWeight)}</div>
        <div style={SPEC_ROW}>Letter spacing: {scalarOrClamp(t.letterSpacing)}</div>
        <div style={SPEC_ROW}>Type set: {typeSetLabel(name)}</div>
        <span style={TOKEN_PILL}>${name}</span>
      </div>
    </div>
  );
}

function Section({ group }: { group: Group }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={SECTION_HEAD}>{group.title}</h2>
      {group.title === 'Body' && (
        <p style={SECTION_INTRO}>
          There are two body families for productive and expressive moments.
          Productive styles end in <code>-01</code>; expressive styles end in{' '}
          <code>-02</code>. <code>body-03</code> is a comfortable 18px reading body
          that fills the gap between body-02 and heading-03.
        </p>
      )}
      {group.title === 'Heading' && (
        <p style={SECTION_INTRO}>
          Headings step from 14px <code>heading-01</code> up through 54px{' '}
          <code>heading-07</code>. Compact variants (<code>-compact-01/02</code>)
          tighten line-height for dense surfaces.
        </p>
      )}
      {group.title.startsWith('Utility') && (
        <p style={SECTION_INTRO}>
          Form-level and supporting copy: labels, helper text below fields, legal
          fine print, and inline code. Mono family for <code>code-*</code>.
        </p>
      )}
      {group.title.startsWith('Fluid') && (
        <p style={SECTION_INTRO}>
          Fluid styles step across breakpoints. The displayed sample uses the
          base (small viewport) step; larger breakpoints scale up per the
          definitions in <code>styles.ts</code>.
        </p>
      )}
      <div
        style={{
          background: 'var(--ds-surface-rest, #ffffff)',
          border: '1px solid var(--ds-lines-neutral-rest, #e0e0e0)',
          borderRadius: 8,
          overflow: 'hidden',
        }}>
        {group.names.map((n, i) => (
          <div key={n} style={i === 0 ? { ...ROW, borderTop: 'none' } : ROW}>
            <div>
              <div style={inlineStyleFor(n, styles[n])}>{SAMPLES[n] ?? 'Sample text'}</div>
            </div>
            <div>
              <div style={SPEC_LABEL}>{n}</div>
              <div style={SPEC_ROW}>Type: {familyLabel(styles[n].fontFamily)}</div>
              <div style={SPEC_ROW}>Size: {fontSizeLabel(styles[n].fontSize)}</div>
              <div style={SPEC_ROW}>
                Line height: {lineHeightLabel(styles[n].lineHeight, styles[n].fontSize)}
              </div>
              <div style={SPEC_ROW}>Weight: {weightLabel(styles[n].fontWeight)}</div>
              <div style={SPEC_ROW}>Letter spacing: {scalarOrClamp(styles[n].letterSpacing)}</div>
              <div style={SPEC_ROW}>Type set: {typeSetLabel(n)}</div>
              <span style={TOKEN_PILL}>${n}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── The story ───────────────────────────────────────────────────────────────

export const Tokens = () => (
  <div className="stage" style={PAGE}>
    <header style={{ marginBottom: 32 }}>
      <h1 style={{ fontSize: 42, fontWeight: 300, lineHeight: 1.199, margin: '0 0 8px' }}>
        Typography
      </h1>
      <p style={{ ...SECTION_INTRO, fontSize: 16, lineHeight: 1.5, maxWidth: '64ch' }}>
        Every text token the system ships. The left column is a live sample
        rendered with the token's actual style; the right column is its spec.
        Data is read from <code>styles.ts</code> — when a token changes here,
        the page changes with it.
      </p>
    </header>
    {GROUPS.map((g) => (
      <Section key={g.title} group={g} />
    ))}
    {UNGROUPED.length > 0 && (
      <section style={{ marginBottom: 48, color: 'var(--ds-text-danger-rest, #da1e28)' }}>
        <strong>Warning:</strong> the following tokens are not yet grouped on
        this page — add them to a GROUPS entry in Typography.stories.tsx:{' '}
        {UNGROUPED.join(', ')}
      </section>
    )}
  </div>
);

// Silence the unused-import warning for TokenRow (kept exported for reuse but
// inlined above for layout reasons).
void TokenRow;
