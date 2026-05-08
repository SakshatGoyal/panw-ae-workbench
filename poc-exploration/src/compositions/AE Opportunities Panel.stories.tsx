import type { Meta, StoryObj } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { Accordion } from '@ds/accordion'
import { Button } from '@ds/button'
import { Tags } from '@ds/tags'
import { Link } from '@ds/link'
import { Flyout, FlyoutList, FlyoutItem } from '@ds/flyout'

const meta: Meta = { title: 'compositions/AE Opportunities Panel' }
export default meta

// ─── Inline icon SVGs (lucide-react lives in design-system/node_modules only) ─

const IconX: React.ElementType = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const IconTrendingUp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
)

const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────

const OUTCOMES = [
  { value: 'renew-flat',  label: 'Renew flat' },
  { value: 'upsell-10',   label: 'Upsell ≥10%' },
  { value: 'multi-year',  label: 'Multi-year lock' },
  { value: 'churn-risk',  label: 'Churn risk' },
] as const

const SALES_PLAYS = [
  {
    id: 'fw-cdss',
    title: 'FW & CDSS',
    amount: '$148k',
    tagColor: 'green',
    body: 'CDSS up-attach is at 62% — bundle AIOps for a 14% margin uplift. Champion is A. Patel; exec sponsor confirmed.',
    cta: 'Build quote',
  },
  {
    id: 'cortex',
    title: 'Cortex Cloud',
    amount: '$92k',
    tagColor: 'accent',
    body: 'CWP licences active, zero CIEM adoption. Frame as a single control plane replacing two legacy vendors.',
    cta: 'View play',
  },
  {
    id: 'sase',
    title: 'SASE',
    amount: '$66k',
    tagColor: 'orange',
    body: '800 seats at 52% utilisation. Right-size before quoting — do not let procurement anchor on overage.',
    cta: 'Run assessment',
  },
  {
    id: 'unit42',
    title: 'Unit 42',
    amount: '$38k',
    tagColor: 'lavender',
    body: 'Retainer renewal. New CISO (Jan 2026) has not been briefed. Escalate to SE for an executive briefing.',
    cta: 'Schedule briefing',
  },
] as const

// ─── Panel ────────────────────────────────────────────────────────────────────

function AEPanel() {
  const [openPlays, setOpenPlays] = useState<Record<string, boolean>>({
    'fw-cdss': false,
    cortex: false,
    sase: false,
    unit42: false,
  })
  const [outcomeOpen, setOutcomeOpen] = useState(false)
  const [outcome, setOutcome] = useState<string>('renew-flat')
  const outcomeRef = useRef<HTMLButtonElement | null>(null)

  const selectedLabel =
    OUTCOMES.find(o => o.value === outcome)?.label ?? 'Renew flat'

  const toggle = (id: string) =>
    setOpenPlays(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div
      className="stage"
      style={{
        background: 'var(--ds-background, #f4f4f4)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: 24,
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        /*
         * Workaround: --panw-button-* tokens at :root reference --ds-* semantics
         * that are only defined inside .stage / .shell / .emphasis. The :root
         * declarations become IACVT (guaranteed-invalid) because the DS refs
         * don't resolve there, and IACVT propagates through inheritance. Re-declare
         * the affected tokens inside .stage where the DS refs DO resolve.
         * Track as DS bug: button/_tokens.scss needs .stage / .shell scoping.
         */
        .stage {
          --panw-button-primary-bg:             var(--ds-brand-rest);
          --panw-button-primary-bg-hover:        var(--ds-brand-hover);
          --panw-button-primary-bg-active:       var(--ds-brand-pressed);
          --panw-button-primary-bg-disabled:     var(--ds-brand-disabled);
          --panw-button-primary-text:            var(--ds-text-inverse-rest);
          --panw-button-primary-text-disabled:   var(--ds-text-inverse-disabled);
          --panw-button-ghost-brand-bg:          var(--ds-ghost-rest);
          --panw-button-ghost-brand-bg-hover:    var(--ds-ghost-highlight-hover);
          --panw-button-ghost-brand-bg-active:   var(--ds-ghost-highlight-pressed);
          --panw-button-ghost-brand-text:        var(--ds-text-brand-rest);
          --panw-button-ghost-brand-text-hover:  var(--ds-text-brand-hover);
          --panw-button-ghost-brand-text-pressed:var(--ds-text-brand-pressed);
          --panw-button-ghost-brand-text-disabled:var(--ds-text-brand-disabled);
        }

        .ae-panel {
          width: 380px;
          background: var(--ds-layer-01, #ffffff);
          border: 1px solid var(--ds-border-tile-01, #e0e0e0);
          border-radius: 4px;
          box-shadow: var(--ds-shadow-overlay, 0 8px 24px rgba(0,0,0,.12));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: var(--ds-body-font-family, 'IBM Plex Sans', sans-serif);
        }

        /* ── Header ── */
        .ae-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 12px 16px 12px 16px;
          border-bottom: 1px solid var(--ds-border-tile-01, #e0e0e0);
          gap: 8px;
        }
        .ae-header-left { display: flex; flex-direction: column; gap: 2px; }
        .ae-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: var(--ds-text-tertiary, #525252);
          line-height: 1;
          margin-bottom: 4px;
        }
        .ae-account-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--ds-text-primary, #161616);
          line-height: 1.25;
        }
        .ae-account-segment {
          font-size: 12px;
          color: var(--ds-text-tertiary, #525252);
          margin-top: 2px;
        }

        /* ── Generic section ── */
        .ae-section {
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid var(--ds-border-tile-01, #e0e0e0);
        }
        .ae-section:last-of-type { border-bottom: none; }
        .ae-section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: var(--ds-text-tertiary, #525252);
        }

        /* ── Renewal meta rows ── */
        .ae-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--ds-text-secondary, #393939);
        }
        .ae-meta-row svg { flex-shrink: 0; color: var(--ds-icon-secondary, #525252); }

        /* ── Outcome picker ── */
        .ae-outcome-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 4px;
          position: relative;
        }
        .ae-outcome-label {
          font-size: 12px;
          color: var(--ds-text-tertiary, #525252);
        }
        .ae-outcome-trigger {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ds-link-primary, #0f62fe);
          background: transparent;
          border: 1px solid var(--ds-border-tile-01, #e0e0e0);
          border-radius: 4px;
          padding: 4px 8px;
          cursor: pointer;
          transition: background 120ms ease;
          font-family: inherit;
        }
        .ae-outcome-trigger:hover { background: var(--ds-layer-hover-01, #e8e8e8); }

        /* ── Tags chip row ── */
        .ae-chips { display: flex; flex-wrap: wrap; gap: 4px; }

        /* ── Sales play accordion contents ── */
        .ae-play-body {
          font-size: 13px;
          line-height: 1.5;
          color: var(--ds-text-secondary, #393939);
          padding-bottom: 4px;
        }
        .ae-play-cta { padding-top: 4px; }

        /* ── Health ── */
        .ae-health-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .ae-health-score-block { display: flex; flex-direction: column; gap: 2px; flex-shrink: 0; }
        .ae-health-score {
          font-size: 32px;
          font-weight: 700;
          color: var(--ds-text-primary, #161616);
          line-height: 1;
        }
        .ae-health-label { font-size: 12px; color: var(--ds-text-tertiary, #525252); }

        /* ── Footer ── */
        .ae-footer {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid var(--ds-border-tile-01, #e0e0e0);
          background: var(--ds-layer-01, #ffffff);
        }
      `}</style>

      <div className="ae-panel">

        {/* ── Header ── */}
        <div className="ae-header">
          <div className="ae-header-left">
            <div className="ae-eyebrow">Account Opportunities</div>
            <div className="ae-account-name">
              <Link href="#" color="blue" size="14px">Acme Corp</Link>
            </div>
            <div className="ae-account-segment">Enterprise · East Region · M. Chen (AE)</div>
          </div>
          <Button
            kind="ghost"
            size="small"
            renderIcon={IconX}
            iconDescription="Close panel"
          />
        </div>

        {/* ── Renewal ── */}
        <div className="ae-section">
          <div className="ae-section-label">Current Renewal</div>
          <div className="ae-meta-row">
            <IconCalendar />
            <span>Closes <strong>Jun 30, 2026</strong></span>
            <Tags label="93 days" color="orange" contrast="low" size="default" />
          </div>
          <div className="ae-meta-row">
            <IconTrendingUp />
            <span>ARR <strong>$344k</strong></span>
            <Tags label="+8% YoY" color="green" contrast="low" size="default" />
          </div>
          <div className="ae-outcome-row">
            <span className="ae-outcome-label">Forecast outcome</span>
            <button
              ref={outcomeRef}
              className="ae-outcome-trigger"
              onClick={() => setOutcomeOpen(v => !v)}
              aria-haspopup="listbox"
              aria-expanded={outcomeOpen}
            >
              {selectedLabel}
              <IconChevronDown />
            </button>
            <Flyout
              open={outcomeOpen}
              onOpenChange={setOutcomeOpen}
              anchorRef={outcomeRef}
              mode="single"
              selected={[outcome]}
              onSelectionChange={vals => { if (vals[0]) setOutcome(vals[0]) }}
              placement="below"
            >
              <FlyoutList>
                {OUTCOMES.map(o => (
                  <FlyoutItem key={o.value} value={o.value}>{o.label}</FlyoutItem>
                ))}
              </FlyoutList>
            </Flyout>
          </div>
        </div>

        {/* ── Install Base ── */}
        <div className="ae-section">
          <div className="ae-section-label">Install Base</div>
          <div className="ae-chips">
            <Tags label="NGFW" color="accent" contrast="low" />
            <Tags label="Panorama" color="accent" contrast="low" />
            <Tags label="AIOps" color="accent" contrast="low" />
            <Tags label="Cortex XDR" color="cobalt" contrast="low" />
            <Tags label="Prisma Access" color="cobalt" contrast="low" />
            <Tags label="WildFire" color="slate" contrast="low" />
          </div>
        </div>

        {/* ── Sales Plays ── */}
        <div className="ae-section">
          <div className="ae-section-label">Sales Plays <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>· $344k pipeline</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {SALES_PLAYS.map(play => (
              <Accordion
                key={play.id}
                title={play.title}
                showTag
                tagLabel={play.amount}
                tagColor="neutral"
                tagContrast="low"
                open={openPlays[play.id]}
                onToggle={() => toggle(play.id)}
                size="default"
              >
                <div className="ae-play-body">{play.body}</div>
                <div className="ae-play-cta">
                  <Button
                    kind="ghost-brand"
                    size="small"
                    style={{ marginLeft: -12 }}
                  >
                    {play.cta} →
                  </Button>
                </div>
              </Accordion>
            ))}
          </div>
        </div>

        {/* ── Account Health ── */}
        <div className="ae-section">
          <div className="ae-section-label">Account Health</div>
          <div className="ae-health-row">
            <div className="ae-health-score-block">
              <div className="ae-health-score">84</div>
              <div className="ae-health-label">/ 100</div>
            </div>
            <div className="ae-chips" style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Tags label="Support OK" color="green" contrast="low" />
              <Tags label="NPS 8.2" color="green" contrast="low" />
              <Tags label="Exec gap" color="orange" contrast="low" />
              <Tags label="2 open cases" color="red" contrast="low" />
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="ae-footer">
          <Button kind="secondary" size="default">Add note</Button>
          <Button kind="primary" size="default">Open account</Button>
        </div>

      </div>
    </div>
  )
}

export const Default: StoryObj = {
  render: () => <AEPanel />,
}
