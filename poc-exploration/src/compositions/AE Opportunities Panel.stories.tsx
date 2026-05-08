import type { Meta, StoryObj } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { Button } from '@ds/button'
import { Tags } from '@ds/tags'
import { Link } from '@ds/link'
import { Flyout, FlyoutList, FlyoutItem } from '@ds/flyout'

const meta: Meta = {
  title: 'compositions/AE Opportunities Panel',
  parameters: { layout: 'fullscreen' },
}
export default meta

// ─── Inline icon SVGs (lucide-react lives in design-system/node_modules only) ─

const IconX: React.ElementType = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconChevronDown = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconChevronDownTag = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconMinusCircle = () => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M3.75 6h4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

const IconAlert = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
    <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconNeutral = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconCheck = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconCaution = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M8 2l6 11H2L8 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    <path d="M8 7v2.5M8 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconAdjust = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

const IconCross = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconSparkle = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <path d="M8 1v14M1 8h14M4.17 4.17l7.66 7.66M11.83 4.17l-7.66 7.66" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────

type DealStatus = 'danger' | 'caution' | 'success' | 'neutral' | 'adjust' | 'cross'

const STATUS_ICONS: Record<DealStatus, React.ElementType> = {
  danger: IconAlert,
  caution: IconCaution,
  success: IconCheck,
  neutral: IconNeutral,
  adjust: IconAdjust,
  cross: IconCross,
}

const RENEWAL_ROWS = [
  { label: 'Subscription End:', value: 'Sept 1, 2025' },
  { label: 'Renewable TCV:',    value: '$22.7M' },
  { label: 'ARR:',              value: '$7.9M' },
] as const

const INSTALL_BASE_ROWS = [
  { label: 'TCV:',             value: '$25.8M' },
  { label: 'Incremental ACV:', value: '$1.0M',  brand: true },
  { label: 'Margin:',          value: '12.50%', brand: true },
  { label: 'RPO',              value: '$3.0M' },
] as const

interface Deal { name: string; status: DealStatus; amount: string }
interface SalesPlay { id: string; title: string; amount: string; deals: Deal[] }

const SALES_PLAYS: SalesPlay[] = [
  {
    id: 'fw', title: 'FW & CDSS', amount: '$123K',
    deals: [
      { name: 'Hardware Refresh',     status: 'danger',  amount: '$2,500' },
      { name: 'Fortinet Displacement', status: 'neutral', amount: '$123,456' },
      { name: 'SWFW Acceleration',     status: 'success', amount: '$123,456' },
    ],
  },
  {
    id: 'cortex', title: 'Cortex Cloud', amount: '$25K',
    deals: [
      { name: 'XSIAM Splunk Takeout', status: 'danger', amount: '$24,900' },
    ],
  },
  {
    id: 'sase', title: 'SASE (Prisma ACCESS, SD-WAN, ZTNA)', amount: '$16K',
    deals: [
      { name: 'GP to Prisma Access',     status: 'danger',  amount: '$38,500' },
      { name: 'PAB Existing PA Upgrade', status: 'adjust',  amount: '$15,780' },
      { name: 'PAB for Partners',        status: 'caution', amount: '$95,800' },
    ],
  },
  {
    id: 'unit42', title: 'Unit 42', amount: '$123K',
    deals: [
      { name: 'Unit 42', status: 'cross', amount: '$123,456' },
    ],
  },
]

type TagColor = 'grey' | 'jade' | 'orange' | 'red' | 'green'
interface Outcome { value: string; label: string; color: TagColor }

const OUTCOMES: Outcome[] = [
  { value: 'unknown',      label: 'Unknown',                  color: 'grey'   },
  { value: 'full',         label: 'Full Renewal / Upsell',    color: 'jade'   },
  { value: 'downsell',     label: 'Downsell',                 color: 'orange' },
  { value: 'churn',        label: 'Churn',                    color: 'red'    },
  { value: 'displacement', label: 'Displacement (HW Refresh)',color: 'grey'   },
  { value: 'duplicate',    label: 'Duplicate',                color: 'grey'   },
]

const HEALTH_ROWS = [
  { label: 'Overall Health',         value: 'Critical', color: 'red'    as TagColor, primary: true },
  { label: 'Technical Health',       value: 'Critical', color: 'red'    as TagColor },
  { label: 'Deployment and Adoption', value: 'At-Risk', color: 'orange' as TagColor },
] as const

interface Product { name: string; technical: { label: string; color: TagColor }; adoption: { label: string; color: TagColor } }
const PRODUCTS: Product[] = [
  { name: 'CDSS',         technical: { label: 'Healthy',  color: 'green' }, adoption: { label: 'Healthy', color: 'green'  } },
  { name: 'Cortex XSOAR', technical: { label: 'Critical', color: 'red'   }, adoption: { label: 'At-Risk', color: 'orange' } },
  { name: 'Prisma Cloud', technical: { label: 'Healthy',  color: 'green' }, adoption: { label: 'Healthy', color: 'green'  } },
]

const SUGGESTIONS = [
  'Show me the next steps documented for this deal.',
  'Give me a RUNN breakdown for this deal.',
  'Create relevant sales documents for this deal.',
  'Show me the product breakdown for this deal.',
] as const

// ─── Sub-components ───────────────────────────────────────────────────────────

function DataRow({ label, value, brand }: { label: string; value: string; brand?: boolean }) {
  return (
    <div className="ops-data-row">
      <span className="ops-data-row__label">{label}</span>
      <span className={`ops-data-row__value${brand ? ' ops-data-row__value--brand' : ''}`}>{value}</span>
    </div>
  )
}

function DealRow({ deal }: { deal: Deal }) {
  const Icon = STATUS_ICONS[deal.status]
  return (
    <div className="ops-deal-row">
      <span className="ops-deal-row__name">{deal.name}</span>
      <span className="ops-deal-status">
        <span className={`ops-deal-icon ops-deal-icon--${deal.status}`}><Icon /></span>
        <span className="ops-deal-amount">{deal.amount}</span>
      </span>
    </div>
  )
}

function SalesPlayAccordion({ play, open, onToggle }: { play: SalesPlay; open: boolean; onToggle: () => void }) {
  return (
    <div className={`ops-accordion-entry${open ? ' is-open' : ''}`}>
      <div
        className="ops-accordion-row"
        onClick={onToggle}
        role="button"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() } }}
      >
        <span className="ops-accordion-chevron"><IconChevronDown /></span>
        <span className="ops-accordion-title">{play.title}</span>
        <Tags
          label={play.amount}
          color="grey"
          contrast="low"
          size="default"
          icon
          renderIcon={IconMinusCircle}
        />
      </div>
      <div className="ops-accordion-content" role="region" aria-label={`${play.title} deals`}>
        {play.deals.map((d) => <DealRow key={d.name} deal={d} />)}
      </div>
    </div>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────

function OpportunityPanel() {
  const [outcomeOpen, setOutcomeOpen]     = useState(false)
  const [outcome, setOutcome]             = useState<string>('unknown')
  const [openPlays, setOpenPlays]         = useState<Record<string, boolean>>({})
  const outcomeRef = useRef<HTMLButtonElement | null>(null)

  const togglePlay = (id: string) => setOpenPlays((p) => ({ ...p, [id]: !p[id] }))
  const currentOutcome = OUTCOMES.find((o) => o.value === outcome) ?? OUTCOMES[0]

  return (
    <div className="stage ops-stage">
      <style>{PANEL_CSS}</style>

      <div className="ops-panel" role="complementary" aria-label="Opportunity Snapshot">

        {/* ── Header ── */}
        <header className="ops-panel__header">
          <div className="ops-panel__title-group">
            <h1 className="ops-panel__account-name">[Account Name]</h1>
            <Link href="#" color="blue" size="14px">[Opportunity Name]</Link>
          </div>
          <Button kind="ghost" size="small" renderIcon={IconX} iconDescription="Close panel" />
        </header>

        {/* ── RENEWALS ── */}
        <section className="ops-section" aria-label="Renewals">
          <div className="ops-section__hd">RENEWALS</div>

          <div className="ops-data-table">
            {RENEWAL_ROWS.map((r) => <DataRow key={r.label} {...r} />)}

            <div className="ops-data-row ops-data-row--outcome">
              <span className="ops-data-row__label">Renewal Outcome:</span>
              <div className="ops-outcome-wrapper">
                <button
                  ref={outcomeRef}
                  className="ops-outcome-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={outcomeOpen}
                  onClick={() => setOutcomeOpen((v) => !v)}
                >
                  {/*
                    DS Tags only renders icons as leading slot. The original
                    panel puts the chevron *after* the label, so render the
                    BEM markup directly to keep the trailing-icon order.
                  */}
                  <span className={`panw--tag panw--tag--size-default panw--tag--low panw--tag--${currentOutcome.color}`} role="presentation">
                    <span className="panw--tag__label">{currentOutcome.label}</span>
                    <span className="panw--tag__icon" aria-hidden="true"><IconChevronDownTag /></span>
                  </span>
                </button>
                <Flyout
                  open={outcomeOpen}
                  onOpenChange={setOutcomeOpen}
                  anchorRef={outcomeRef}
                  mode="single"
                  selected={[outcome]}
                  onSelectionChange={(vals) => { if (vals[0]) setOutcome(vals[0]) }}
                  placement="below"
                >
                  <FlyoutList>
                    {OUTCOMES.map((o) => (
                      <FlyoutItem key={o.value} value={o.value}>{o.label}</FlyoutItem>
                    ))}
                  </FlyoutList>
                </Flyout>
              </div>
            </div>
          </div>

          <div className="ops-section__footer">
            <Button kind="ghost-brand" size="small">Open in Renewal Workspace</Button>
          </div>
        </section>

        <div className="ops-sep" aria-hidden="true" />

        {/* ── INSTALL BASE ── */}
        <section className="ops-section" aria-label="Install Base">
          <div className="ops-section__hd">INSTALL BASE</div>
          <div className="ops-data-table">
            {INSTALL_BASE_ROWS.map((r) => <DataRow key={r.label} {...r} />)}
          </div>
          <div className="ops-section__footer">
            <Button kind="ghost-brand" size="small">Open Customer Estate</Button>
          </div>
        </section>

        <div className="ops-sep" aria-hidden="true" />

        {/* ── SALES PLAY ── */}
        <section className="ops-section" aria-label="Sales Play">
          <div className="ops-section__hd">SALES PLAY</div>
          <div className="ops-salesplay-list">
            {SALES_PLAYS.map((p) => (
              <SalesPlayAccordion
                key={p.id}
                play={p}
                open={!!openPlays[p.id]}
                onToggle={() => togglePlay(p.id)}
              />
            ))}
          </div>
          <div className="ops-section__footer">
            <Button kind="ghost-brand" size="small">Open in Sales Play Console</Button>
          </div>
        </section>

        <div className="ops-sep" aria-hidden="true" />

        {/* ── ACCOUNT HEALTH ── */}
        <section className="ops-section" aria-label="Account Health">
          <div className="ops-section__hd">ACCOUNT HEALTH</div>

          <div className="ops-health-rows">
            {HEALTH_ROWS.map((row) => (
              <div
                key={row.label}
                className={`ops-health-row${row.primary ? ' ops-health-row--primary' : ''}`}
              >
                <span className="ops-health-row__label">{row.label}</span>
                <Tags label={row.value} color={row.color} contrast="low" size="default" />
              </div>
            ))}
          </div>

          <div className="ops-health-subheader">Health of products in this deal:</div>

          <div className="ops-product-table">
            <div className="ops-product-table-header">
              <span className="ops-product-table-hd">Product</span>
              <span className="ops-product-table-hd">Technical</span>
              <span className="ops-product-table-hd">Adoption</span>
            </div>
            {PRODUCTS.map((prod) => (
              <div key={prod.name} className="ops-product-row">
                <span className="ops-product-row__name">{prod.name}</span>
                <span><Tags label={prod.technical.label} color={prod.technical.color} contrast="low" size="default" /></span>
                <span><Tags label={prod.adoption.label}  color={prod.adoption.color}  contrast="low" size="default" /></span>
              </div>
            ))}
          </div>

          <div className="ops-section__footer">
            <Button kind="ghost-brand" size="small">Open Account Health</Button>
          </div>
        </section>

        <div className="ops-sep" aria-hidden="true" />

        {/* ── SUGGESTIONS ── */}
        <section className="ops-section" aria-label="AI Suggestions">
          <div className="ops-section__hd">SUGGESTIONS</div>
          <div className="ops-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="ops-prompt-card" type="button">
                <span className="ops-prompt-icon"><IconSparkle /></span>
                <span className="ops-prompt-text">{s}</span>
              </button>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
// Layout primitives lifted verbatim from .tmp/drafts/opportunity-snapshot.html.
// Every interactive primitive (Button, Tags, Link, Flyout) comes from the DS
// React package — only the panel-specific layout (data rows, deal rows, health
// rows, prompt cards, accordion shell) is defined here.

const PANEL_CSS = `
  /*
   * Workaround for IACVT bug: --panw-button-* tokens in design-system are
   * declared at :root referencing --ds-* semantics that only exist inside
   * .stage. Re-declare them inside .stage so the substitution resolves.
   * Also re-declares Flyout tokens. Track for DS fix.
   */
  .stage {
    --panw-button-primary-bg:               var(--ds-brand-rest);
    --panw-button-primary-bg-hover:         var(--ds-brand-hover);
    --panw-button-primary-bg-active:        var(--ds-brand-pressed);
    --panw-button-primary-bg-disabled:      var(--ds-brand-disabled);
    --panw-button-primary-text:             var(--ds-text-inverse-rest);
    --panw-button-primary-text-disabled:    var(--ds-text-inverse-disabled);
    --panw-button-secondary-bg:             var(--ds-surface-rest);
    --panw-button-secondary-bg-hover:       var(--ds-surface-hover);
    --panw-button-secondary-bg-active:      var(--ds-surface-pressed);
    --panw-button-secondary-border:         var(--ds-lines-neutral-rest);
    --panw-button-secondary-border-hover:   var(--ds-lines-neutral-hover);
    --panw-button-secondary-border-pressed: var(--ds-lines-neutral-pressed);
    --panw-button-secondary-text:           var(--ds-text-primary);
    --panw-button-secondary-text-disabled:  var(--ds-text-secondary-disabled);
    --panw-button-secondary-border-disabled:var(--ds-lines-neutral-disabled);
    --panw-button-ghost-bg-hover:           var(--ds-ghost-hover);
    --panw-button-ghost-bg-active:          var(--ds-ghost-pressed);
    --panw-button-ghost-text:               var(--ds-text-primary);
    --panw-button-ghost-text-disabled:      var(--ds-text-secondary-disabled);
    --panw-button-ghost-icon:               var(--ds-icons-secondary-rest);
    --panw-button-ghost-icon-hover:         var(--ds-icons-secondary-hover);
    --panw-button-ghost-icon-pressed:       var(--ds-icons-secondary-pressed);
    --panw-button-ghost-icon-disabled:      var(--ds-icons-disabled);
    --panw-button-ghost-brand-bg:           var(--ds-ghost-rest);
    --panw-button-ghost-brand-bg-hover:     var(--ds-ghost-highlight-hover);
    --panw-button-ghost-brand-bg-active:    var(--ds-ghost-highlight-pressed);
    --panw-button-ghost-brand-text:         var(--ds-text-brand-rest);
    --panw-button-ghost-brand-text-hover:   var(--ds-text-brand-hover);
    --panw-button-ghost-brand-text-pressed: var(--ds-text-brand-pressed);
    --panw-button-ghost-brand-text-disabled:var(--ds-text-brand-disabled);
  }

  /* ── Page scaffold ───────────────────────────────────────────────────── */
  .ops-stage {
    background-color: var(--ds-surface-alt-rest);
    min-height: 100vh;
    overflow: hidden;
    font-family: var(--ds-type-font-family-sans);
  }

  /* ── Panel shell ─────────────────────────────────────────────────────── */
  .ops-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 480px;
    height: 100vh;
    background-color: var(--ds-surface-rest);
    box-shadow: -4px 0 16px -4px rgb(0 0 0 / 10%);
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-bottom: var(--ds-spacing-07);
    font-family: var(--ds-type-font-family-sans);
    overflow-y: auto;
    box-sizing: border-box;
  }

  /* ── Section separator — full-bleed 1px rule ─────────────────────────── */
  .ops-sep {
    height: 1px;
    background-color: var(--ds-lines-neutral-tile-rest);
    flex-shrink: 0;
    margin: 0;
  }

  /* ── Panel header ────────────────────────────────────────────────────── */
  .ops-panel__header {
    display: flex;
    align-items: flex-start;
    gap: var(--ds-spacing-05);
    padding: var(--ds-spacing-05) var(--ds-spacing-05) var(--ds-spacing-04);
  }
  .ops-panel__title-group {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--ds-spacing-02);
  }
  .ops-panel__account-name {
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0.25px;
    color: var(--ds-text-primary);
    margin: 0;
  }

  /* ── Section ─────────────────────────────────────────────────────────── */
  .ops-section {
    display: flex;
    flex-direction: column;
    gap: var(--ds-spacing-03);
    padding: 0 var(--ds-spacing-05) var(--ds-spacing-04);
  }
  .ops-section__hd {
    display: flex;
    align-items: center;
    padding-top: var(--ds-spacing-05);
    padding-bottom: var(--ds-spacing-03);
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--ds-text-tertiary-rest);
  }
  /* Ghost-brand button has 12px internal left padding — pull it left so its
     label aligns with section content. */
  .ops-section__footer { margin-left: -12px; }

  /* ── Key-value data rows ─────────────────────────────────────────────── */
  .ops-data-table { display: flex; flex-direction: column; }
  .ops-data-row {
    display: flex;
    align-items: center;
    min-height: 32px;
    padding: 0 var(--ds-spacing-02);
    border-bottom: 1px solid var(--ds-lines-neutral-tile-rest);
    border-radius: var(--ds-radius-tight);
  }
  .ops-data-row__label {
    flex: 1;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.25px;
    color: var(--ds-text-secondary-rest);
  }
  .ops-data-row__value {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.25px;
    color: var(--ds-text-primary);
    text-align: right;
  }
  .ops-data-row__value--brand {
    color: var(--ds-text-brand-rest);
    font-weight: 700;
  }
  .ops-data-row--outcome { cursor: default; }

  /* ── Outcome trigger (tag-as-button) ─────────────────────────────────── */
  .ops-outcome-wrapper { position: relative; }
  .ops-outcome-trigger {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    border-radius: var(--ds-radius-pill);
  }
  .ops-outcome-trigger:focus-visible {
    outline: 2px solid var(--ds-lines-brand-rest);
    outline-offset: 2px;
  }
  .ops-outcome-trigger .panw--tag { cursor: pointer; }

  /* ── Sales Play accordion ────────────────────────────────────────────── */
  .ops-salesplay-list { display: flex; flex-direction: column; }
  .ops-accordion-entry { display: flex; flex-direction: column; }

  .ops-accordion-row {
    display: flex;
    align-items: center;
    gap: var(--ds-spacing-03);
    min-height: 36px;
    padding: var(--ds-spacing-03);
    border-bottom: 1px solid var(--ds-lines-neutral-tile-rest);
    border-radius: var(--ds-radius-tight);
    cursor: pointer;
    user-select: none;
    transition: background-color 110ms cubic-bezier(0.2,0,0.38,0.9),
                border-bottom-color 110ms cubic-bezier(0.2,0,0.38,0.9);
  }
  .ops-accordion-row:hover {
    background-color: var(--ds-ghost-hover);
    border-bottom-color: transparent;
  }
  .ops-accordion-entry:has(+ .ops-accordion-entry .ops-accordion-row:hover) .ops-accordion-row {
    border-bottom-color: transparent;
  }
  .ops-accordion-entry.is-open > .ops-accordion-row { border-bottom-color: transparent; }

  .ops-accordion-chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--ds-icons-tertiary-rest);
    transition: transform 110ms cubic-bezier(0.2,0,0.38,0.9), color 110ms;
  }
  .ops-accordion-entry.is-open .ops-accordion-chevron { transform: rotate(180deg); }
  .ops-accordion-row:hover .ops-accordion-chevron { color: var(--ds-icons-tertiary-hover); }

  .ops-accordion-title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.25px;
    color: var(--ds-text-primary);
  }

  .ops-accordion-content {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    padding-left: var(--ds-spacing-05);
    transition: max-height 240ms cubic-bezier(0,0,0.38,0.9),
                opacity    150ms cubic-bezier(0,0,0.38,0.9);
  }
  .ops-accordion-entry.is-open .ops-accordion-content {
    max-height: 800px;
    opacity: 1;
  }

  /* Open state — treat the whole entry as a nested tile */
  .ops-accordion-entry.is-open {
    background-color: var(--ds-surface-alt-rest);
    border-radius: var(--ds-radius-standard);
    box-shadow: var(--ds-shadow-tile-on-tile);
    margin: 4px 0;
    overflow: hidden;
  }
  .ops-accordion-entry.is-open > .ops-accordion-row {
    border-bottom-color: var(--ds-lines-neutral-tile-rest);
  }

  /* ── Deal child rows ─────────────────────────────────────────────────── */
  .ops-deal-row {
    display: flex;
    align-items: center;
    gap: var(--ds-spacing-03);
    min-height: 32px;
    padding: 0 var(--ds-spacing-02);
    border-bottom: 1px solid var(--ds-lines-neutral-tile-rest);
    border-radius: var(--ds-radius-tight);
  }
  .ops-accordion-content .ops-deal-row:last-child { border-bottom: none; }

  .ops-deal-row__name {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.25px;
    color: var(--ds-text-secondary-rest);
  }
  .ops-deal-status {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-spacing-02);
    flex-shrink: 0;
  }
  .ops-deal-icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .ops-deal-icon--danger  { color: var(--ds-icons-danger-rest); }
  .ops-deal-icon--caution { color: var(--ds-icons-caution-rest); }
  .ops-deal-icon--success { color: var(--ds-icons-success-rest); }
  .ops-deal-icon--neutral { color: var(--ds-icons-secondary-rest); }
  .ops-deal-icon--adjust  { color: var(--ds-icons-secondary-rest); }
  .ops-deal-icon--cross   { color: var(--ds-icons-danger-rest); }
  .ops-deal-amount {
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.25px;
    color: var(--ds-text-primary);
  }

  /* ── Account health ──────────────────────────────────────────────────── */
  .ops-health-rows { display: flex; flex-direction: column; }
  .ops-health-row {
    display: flex;
    align-items: center;
    min-height: 40px;
    padding: 0 var(--ds-spacing-02);
    border-bottom: 1px solid var(--ds-lines-neutral-tile-rest);
    border-radius: var(--ds-radius-tight);
  }
  .ops-health-row__label {
    flex: 1;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.25px;
    color: var(--ds-text-secondary-rest);
  }
  .ops-health-row--primary .ops-health-row__label {
    font-weight: 700;
    color: var(--ds-text-primary);
  }
  .ops-health-subheader {
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--ds-text-tertiary-rest);
    padding: var(--ds-spacing-04) var(--ds-spacing-02) var(--ds-spacing-03);
  }

  /* Product health mini-table */
  .ops-product-table { display: flex; flex-direction: column; width: 100%; }
  .ops-product-table-header {
    display: grid;
    grid-template-columns: 1fr 80px 80px;
    padding: var(--ds-spacing-02) var(--ds-spacing-02) var(--ds-spacing-03);
  }
  .ops-product-table-hd {
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0.25px;
    color: var(--ds-text-secondary-rest);
  }
  .ops-product-row {
    display: grid;
    grid-template-columns: 1fr 80px 80px;
    align-items: center;
    min-height: 32px;
    padding: 0 var(--ds-spacing-02);
    border-bottom: 1px solid var(--ds-lines-neutral-tile-rest);
    border-radius: var(--ds-radius-tight);
  }
  .ops-product-row__name {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.25px;
    color: var(--ds-text-secondary-rest);
  }

  /* ── AI Suggestion cards ─────────────────────────────────────────────── */
  .ops-suggestions {
    display: flex;
    flex-direction: column;
    gap: var(--ds-spacing-02);
  }
  .ops-prompt-card {
    display: flex;
    align-items: flex-start;
    gap: var(--ds-spacing-04);
    padding: var(--ds-spacing-04);
    background-color: var(--ds-surface-rest);
    border: 1px solid var(--ds-lines-neutral-rest);
    border-radius: var(--ds-radius-standard);
    box-shadow: var(--ds-shadow-tile-on-tile);
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: background-color 110ms cubic-bezier(0.2,0,0.38,0.9);
  }
  .ops-prompt-card:hover { background-color: var(--ds-ghost-hover); }
  .ops-prompt-card:focus-visible {
    outline: 2px solid var(--ds-lines-brand-rest);
    outline-offset: 2px;
  }
  .ops-prompt-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--ds-icons-brand-rest);
    margin-top: 2px;
  }
  .ops-prompt-text {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: var(--ds-text-primary);
  }
`

export const Default: StoryObj = {
  render: () => <OpportunityPanel />,
}
