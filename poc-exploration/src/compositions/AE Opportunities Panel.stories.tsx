import type { Meta, StoryObj } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { Button } from '@ds/button'
import { Tags } from '@ds/tags'
import { Link } from '@ds/link'
import { Flyout, FlyoutList, FlyoutItem } from '@ds/flyout'
import { Dropdown } from '@ds/dropdown'
import { TextEntry } from '@ds/text-entry'
import { Header } from '@ds/header'
import { Accordion } from '@ds/accordion'
import {
  Close,
  ChevronDown,
  NotTouched,
  ClosedLost,
  ClosedWon,
  OpenPipeline,
  Pitched,
  Deferred,
  Stars,
} from '@ds/icons'

const meta: Meta = {
  title: 'compositions/AE Opportunities Panel',
  parameters: { layout: 'fullscreen' },
}
export default meta

// ─── Data ─────────────────────────────────────────────────────────────────────
// Sales-play deal statuses map onto @ds/icons' sales-play status set. Those
// icons carry authored fills (semantic color is part of the glyph) and ignore
// `color` — that's deliberate, per the icons doc.
type DealStatus = 'danger' | 'caution' | 'success' | 'neutral' | 'adjust' | 'cross'

const STATUS_ICONS: Record<DealStatus, React.ElementType> = {
  danger: ClosedLost,    // at-risk / lost deal — authored red
  caution: Pitched,      // pitched, watching — authored yellow
  success: ClosedWon,    // closed-won — authored green
  neutral: OpenPipeline, // in flight, no critical signal
  adjust: Deferred,      // paused / deferred
  cross: ClosedLost,     // hard-lost — authored red
}

// Labels intentionally drop trailing colons — sentence-case, no punctuation.
// Pattern is value-as-data, label-as-quiet-metadata; weight + tone carry the
// hierarchy, not glyphs.
const RENEWAL_ROWS = [
  { label: 'Subscription end', value: 'Sept 1, 2025' },
  { label: 'Renewable TCV',    value: '$22.7M' },
  { label: 'ARR',              value: '$7.9M' },
] as const

const INSTALL_BASE_ROWS = [
  { label: 'TCV',             value: '$25.8M' },
  { label: 'Incremental ACV', value: '$1.0M' },
  { label: 'Margin',          value: '12.50%' },
  { label: 'RPO',             value: '$3.0M' },
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

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ops-data-row">
      <span className="ops-data-row__label">{label}</span>
      <span className="ops-data-row__value">{value}</span>
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

// ─── Panel ────────────────────────────────────────────────────────────────────

function OpportunityPanel() {
  const [outcomeOpen, setOutcomeOpen]     = useState(false)
  const [outcome, setOutcome]             = useState<string>('unknown')
  const [openPlays, setOpenPlays]         = useState<Record<string, boolean>>({})
  const [openSections, setOpenSections]   = useState<Record<string, boolean>>({
    // Renewals starts open — it carries the only primary interactive
    // affordance (the outcome picker). Other sections are reveal-on-demand.
    renewals: true,
    installBase: false,
    salesPlay: false,
    accountHealth: false,
    suggestions: false,
  })
  const [churnReason, setChurnReason]     = useState<string | undefined>(undefined)
  const [competitor, setCompetitor]       = useState<string | undefined>(undefined)
  const [notes, setNotes]                 = useState<string>('')
  const outcomeRef = useRef<HTMLButtonElement | null>(null)

  const togglePlay = (id: string) => setOpenPlays((p) => ({ ...p, [id]: !p[id] }))
  const toggleSection = (id: string) => setOpenSections((p) => ({ ...p, [id]: !p[id] }))
  const currentOutcome = OUTCOMES.find((o) => o.value === outcome) ?? OUTCOMES[0]
  const formVisible   = outcome !== 'unknown'
  const churnVisible  = outcome === 'churn'

  const cancelRenewal = () => {
    setOutcome('unknown')
    setChurnReason(undefined)
    setCompetitor(undefined)
    setNotes('')
  }

  return (
    <div className="stage ops-stage">
      <style>{PANEL_CSS}</style>

      <div className="ops-panel" role="complementary" aria-label="Opportunity Snapshot">

        {/* ── Header ── */}
        {/* Account name is the identity. No avatar — the company name carries
            its own weight. Opportunity link sits beneath as the secondary
            subject. No invented metadata — this surface only renders what
            the data layer actually provides. */}
        <header className="ops-panel__header">
          <div className="ops-panel__title-group">
            <h1 className="ops-panel__account-name">[Account Name]</h1>
            <Link href="#" color="blue" size="14px">[Opportunity Name]</Link>
          </div>
          <Button kind="ghost" size="small" renderIcon={Close} iconDescription="Close panel" />
        </header>

        {/*
          Each section is a panel-level Accordion. Edge to edge. The right-side
          tag carries the section's at-a-glance takeaway:
            Renewals → outcome label
            Install base → headline number (TCV)
            Sales play → total value of untouched plays
            Account health → overall health value
            Suggestions → count
          Open the accordion to reveal the section's tables / nested accordions.
        */}

        {/* ── RENEWALS ── */}
        <Accordion
          size="large"
          theme="gray00"
          orientation="left"
          title="Renewals"
          showIcon={false}
          showTag
          tagLabel={currentOutcome.label}
          tagColor={currentOutcome.color}
          tagContrast="low"
          open={openSections.renewals}
          onToggle={() => toggleSection('renewals')}
        >
          <div className="ops-data-table">
            {RENEWAL_ROWS.map((r, i) => (
              <React.Fragment key={r.label}>
                {i > 0 && <div className="ops-divider" />}
                <DataRow {...r} />
              </React.Fragment>
            ))}
            <div className="ops-divider" />
            <div className="ops-data-row ops-data-row--outcome">
              <span className="ops-data-row__label">Renewal outcome</span>
              <div className="ops-outcome-wrapper">
                <button
                  ref={outcomeRef}
                  className="ops-outcome-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={outcomeOpen}
                  onClick={() => setOutcomeOpen((v) => !v)}
                >
                  {/*
                    DS Tags only renders icons in the leading slot. The
                    original draft puts the chevron *after* the label, so
                    we render BEM markup directly. `panw--tag--shape-pill`
                    is required — the base `.panw--tag` doesn't set a
                    radius.
                  */}
                  <span className={`panw--tag panw--tag--size-large panw--tag--shape-pill panw--tag--low panw--tag--${currentOutcome.color}`} role="presentation">
                    <span className="panw--tag__label">{currentOutcome.label}</span>
                    <span className="panw--tag__icon" aria-hidden="true"><ChevronDown size={14} /></span>
                  </span>
                </button>
                <Flyout
                  open={outcomeOpen}
                  onOpenChange={setOutcomeOpen}
                  anchorRef={outcomeRef}
                  mode="single"
                  selected={[outcome]}
                  onSelectionChange={(vals) => { if (vals[0]) setOutcome(vals[0]) }}
                  placement="bottom-start"
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

          {formVisible && (
            <div className="ops-renewal-form" role="group" aria-label="Renewal details">
              {churnVisible && (
                <>
                  <Dropdown
                    title="Churn / Dismissal Reason"
                    placeholder="Select"
                    showDescription={false}
                    background="grey00"
                    selectedValue={churnReason}
                    onChange={(v) => setChurnReason(v)}
                    options={[
                      { label: 'Customer dissatisfied',     value: 'dissatisfied' },
                      { label: 'Budget cut',                value: 'budget' },
                      { label: 'Competitive displacement',  value: 'competitive' },
                      { label: 'End of life',               value: 'eol' },
                      { label: 'Other',                     value: 'other' },
                    ]}
                  />
                  <Dropdown
                    title="Competitor Replacement"
                    placeholder="Select"
                    showDescription={false}
                    background="grey00"
                    selectedValue={competitor}
                    onChange={(v) => setCompetitor(v)}
                    options={[
                      { label: 'Crowdstrike', value: 'crowdstrike' },
                      { label: 'Fortinet',    value: 'fortinet' },
                      { label: 'SentinelOne', value: 'sentinelone' },
                      { label: 'Cisco',       value: 'cisco' },
                      { label: 'Other',       value: 'other' },
                    ]}
                  />
                </>
              )}

              <TextEntry
                title="Notes"
                inputType="area"
                placeholder="Optional notes."
                showDescription={false}
                background="grey-00"
                value={notes}
                onChange={(v) => setNotes(v)}
              />

              <div className="ops-form-actions">
                <Button kind="secondary" size="small" onClick={cancelRenewal}>Cancel</Button>
                <Button kind="primary"   size="small" onClick={() => { /* save */ }}>Save</Button>
              </div>
            </div>
          )}

          <div className="ops-section-cta">
            <Button kind="ghost-brand" size="default">Open in Renewal Workspace</Button>
          </div>
        </Accordion>

        {/* ── INSTALL BASE ── */}
        <Accordion
          size="large"
          theme="gray00"
          orientation="left"
          title="Install base"
          showIcon={false}
          showTag
          tagLabel="$25.8M"
          tagColor="grey"
          tagContrast="low"
          open={openSections.installBase}
          onToggle={() => toggleSection('installBase')}
        >
          <div className="ops-data-table">
            {INSTALL_BASE_ROWS.map((r, i) => (
              <React.Fragment key={r.label}>
                {i > 0 && <div className="ops-divider" />}
                <DataRow {...r} />
              </React.Fragment>
            ))}
          </div>
          <div className="ops-section-cta">
            <Button kind="ghost-brand" size="default">Open Customer Estate</Button>
          </div>
        </Accordion>

        {/* ── SALES PLAY ── */}
        {/* Tag = total $ value of NotTouched plays. With the demo data all
            four plays are NotTouched; in real data it would be the sum
            of only the untouched ones. */}
        <Accordion
          size="large"
          theme="gray00"
          orientation="left"
          title="Sales play"
          showIcon={false}
          showTag
          tagLabel="$287K"
          tagColor="orange"
          tagContrast="low"
          open={openSections.salesPlay}
          onToggle={() => toggleSection('salesPlay')}
        >
          <div className="ops-salesplay-list">
            {SALES_PLAYS.map((p) => (
              <Accordion
                key={p.id}
                size="default"
                theme="gray10"
                orientation="left"
                title={p.title}
                showIcon={false}
                showTag
                tagLabel={p.amount}
                tagColor="grey"
                tagContrast="low"
                open={!!openPlays[p.id]}
                onToggle={() => togglePlay(p.id)}
              >
                <div className="ops-deal-rows">
                  {p.deals.map((d, i) => (
                    <React.Fragment key={d.name}>
                      {i > 0 && <div className="ops-divider" />}
                      <DealRow deal={d} />
                    </React.Fragment>
                  ))}
                </div>
              </Accordion>
            ))}
          </div>
          <div className="ops-section-cta">
            <Button kind="ghost-brand" size="default">Open in Sales Play Console</Button>
          </div>
        </Accordion>

        {/* ── ACCOUNT HEALTH ── */}
        <Accordion
          size="large"
          theme="gray00"
          orientation="left"
          title="Account health"
          showIcon={false}
          showTag
          tagLabel="Critical"
          tagColor="red"
          tagContrast="low"
          open={openSections.accountHealth}
          onToggle={() => toggleSection('accountHealth')}
        >
          {/* Hierarchy: Overall (parent, bold) → Technical / Deployment-Adoption
              (children, indented) → per-product breakdown (table). */}
          <div className="ops-health-rows">
            <div className="ops-health-row ops-health-row--primary">
              <span className="ops-health-row__label">Overall Health</span>
              <Tags label="Critical" color="red" contrast="low" size="default" shape="pill" />
            </div>
            <div className="ops-divider" />
            <div className="ops-health-row ops-health-row--child">
              <span className="ops-health-row__label">Technical Health</span>
              <Tags label="Critical" color="red" contrast="low" size="default" shape="pill" />
            </div>
            <div className="ops-divider" />
            <div className="ops-health-row ops-health-row--child">
              <span className="ops-health-row__label">Deployment and Adoption</span>
              <Tags label="At-Risk" color="orange" contrast="low" size="default" shape="pill" />
            </div>
          </div>

          <div className="ops-product-table" role="table">
            <div className="ops-product-table-header" role="row">
              <Header type="basic" alignment="left">Product</Header>
              <Header type="basic" alignment="left">Technical</Header>
              <Header type="basic" alignment="left">Adoption</Header>
            </div>
            {PRODUCTS.map((prod, i) => (
              <React.Fragment key={prod.name}>
                {i > 0 && <div className="ops-divider" />}
                <div className="ops-product-row" role="row">
                  <span className="ops-product-row__name">{prod.name}</span>
                  <Tags label={prod.technical.label} color={prod.technical.color} contrast="low" size="default" shape="pill" />
                  <Tags label={prod.adoption.label}  color={prod.adoption.color}  contrast="low" size="default" shape="pill" />
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="ops-section-cta">
            <Button kind="ghost-brand" size="default">Open Account Health</Button>
          </div>
        </Accordion>

        {/* ── SUGGESTIONS ── */}
        <Accordion
          size="large"
          theme="gray00"
          orientation="left"
          title="Suggestions"
          showIcon={false}
          showTag
          tagLabel={String(SUGGESTIONS.length)}
          tagColor="grey"
          tagContrast="low"
          open={openSections.suggestions}
          onToggle={() => toggleSection('suggestions')}
        >
          <div className="ops-suggestions">
            {SUGGESTIONS.map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && <div className="ops-divider" />}
                <button className="ops-prompt-card" type="button">
                  <span className="ops-prompt-icon"><Stars size={16} /></span>
                  <span className="ops-prompt-text">{s}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </Accordion>

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
   * IACVT-bug workaround. --panw-* component tokens in the DS are declared at
   * :root referencing --ds-* semantics that only exist inside .stage. Without
   * a re-declaration inside .stage the :root values resolve to IACVT and
   * propagate down as invalid even on .stage descendants. Lifted verbatim
   * from .tmp/drafts/opportunity-snapshot.html. Track for DS fix.
   */
  .stage {
    /* Button — primary / secondary / ghost / ghost-brand */
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

    /* Link */
    --panw-link-blue-default:  var(--ds-text-link-rest);
    --panw-link-blue-hover:    var(--ds-text-link-hover);
    --panw-link-blue-pressed:  var(--ds-text-link-pressed);
    --panw-link-blue-disabled: var(--ds-text-link-disabled);

    /* Dropdown */
    --panw-dropdown-bg:                var(--ds-field-rest);
    --panw-dropdown-bg-hover:          var(--ds-field-hover);
    --panw-dropdown-bg-pressed:        var(--ds-field-pressed);
    --panw-dropdown-bg-active:         var(--ds-field-selected);
    --panw-dropdown-bg-disabled:       var(--ds-field-disabled);
    --panw-dropdown-bg-alt:            var(--ds-field-alt-rest);
    --panw-dropdown-bg-alt-hover:      var(--ds-field-alt-hover);
    --panw-dropdown-bg-alt-pressed:    var(--ds-field-alt-pressed);
    --panw-dropdown-border:            var(--ds-lines-neutral-rest);
    --panw-dropdown-border-hover:      var(--ds-lines-neutral-hover);
    --panw-dropdown-border-focus:      var(--ds-lines-brand-rest);
    --panw-dropdown-border-error:      var(--ds-lines-danger-rest);
    --panw-dropdown-border-disabled:   var(--ds-lines-neutral-disabled);
    --panw-dropdown-title:             var(--ds-text-secondary-rest);
    --panw-dropdown-title-disabled:    var(--ds-text-secondary-disabled);
    --panw-dropdown-text:              var(--ds-text-primary);
    --panw-dropdown-text-disabled:     var(--ds-text-secondary-disabled);
    --panw-dropdown-placeholder:       var(--ds-text-placeholder-rest);
    --panw-dropdown-description:       var(--ds-text-tertiary-rest);
    --panw-dropdown-chevron:           var(--ds-icons-secondary-rest);
    --panw-dropdown-chevron-disabled:  var(--ds-icons-secondary-disabled);
    --panw-dropdown-icon:              var(--ds-icons-secondary-rest);
    --panw-dropdown-icon-hover:        var(--ds-icons-secondary-hover);
    --panw-dropdown-icon-disabled:     var(--ds-icons-disabled);
    --panw-dropdown-menu-bg:           var(--ds-surface-rest);
    --panw-dropdown-menu-item-hover:   var(--ds-ghost-hover);
    --panw-dropdown-menu-item-pressed: var(--ds-ghost-pressed);
    --panw-dropdown-menu-selected-bg:  var(--ds-highlight-rest);
    --panw-dropdown-menu-selected-fg:  var(--ds-text-brand-rest);
    --panw-dropdown-description-disabled: var(--ds-text-tertiary-disabled);
    --panw-dropdown-helper:            var(--ds-text-tertiary-rest);
    --panw-dropdown-helper-error:      var(--ds-text-danger-rest);
    --panw-dropdown-helper-success:    var(--ds-text-success-rest);
    --panw-dropdown-helper-disabled:   var(--ds-text-tertiary-disabled);

    /* Accordion */
    --panw-accordion-bg-gray00:           var(--ds-surface-rest);
    --panw-accordion-bg-gray10:           var(--ds-surface-alt-rest);
    --panw-accordion-bg-hover-gray00:     var(--ds-ghost-hover);
    --panw-accordion-bg-hover-gray10:     var(--ds-ghost-hover);
    --panw-accordion-bg-pressing-gray00:  var(--ds-ghost-pressed);
    --panw-accordion-bg-pressing-gray10:  var(--ds-ghost-pressed);
    --panw-accordion-icon-color:          var(--ds-icons-tertiary-rest);
    --panw-accordion-icon-color-hover:    var(--ds-icons-tertiary-hover);
    --panw-accordion-icon-color-pressed:  var(--ds-icons-tertiary-pressed);
    --panw-accordion-title-color:         var(--ds-text-primary);
    --panw-accordion-title-color-hover:   var(--ds-text-primary);
    --panw-accordion-title-color-pressed: var(--ds-text-primary);
    --panw-accordion-description-color:   var(--ds-text-tertiary-rest);
    --panw-accordion-icon-disabled:       var(--ds-icons-disabled);
    --panw-accordion-title-disabled:      var(--ds-text-secondary-disabled);
    --panw-accordion-description-disabled: var(--ds-text-tertiary-disabled);

    /* Header (table column header) */
    --panw-header-bg:           var(--ds-surface-accent-rest);
    --panw-header-bg-hover:     var(--ds-surface-accent-hover);
    --panw-header-bg-onclick:   var(--ds-surface-accent-pressed);
    --panw-header-text:         var(--ds-text-primary);
    --panw-header-icon:         var(--ds-icons-tertiary-rest);
    --panw-header-icon-muted:   var(--ds-icons-tertiary-disabled);

    /* Text entry */
    --panw-te-bg:               var(--ds-field-rest);
    --panw-te-bg-hover:         var(--ds-field-hover);
    --panw-te-bg-pressed:       var(--ds-field-pressed);
    --panw-te-bg-active:        var(--ds-field-selected);
    --panw-te-bg-disabled:      var(--ds-field-disabled);
    --panw-te-bg-alt:           var(--ds-field-alt-rest);
    --panw-te-bg-alt-hover:     var(--ds-field-alt-hover);
    --panw-te-bg-alt-pressed:   var(--ds-field-alt-pressed);
    --panw-te-border:           var(--ds-lines-neutral-rest);
    --panw-te-border-focus:     var(--ds-lines-brand-rest);
    --panw-te-border-error:     var(--ds-lines-danger-rest);
    --panw-te-border-disabled:  var(--ds-lines-neutral-disabled);
    --panw-te-title:            var(--ds-text-secondary-rest);
    --panw-te-title-disabled:   var(--ds-text-secondary-disabled);
    --panw-te-text:             var(--ds-text-primary);
    --panw-te-text-disabled:    var(--ds-text-secondary-disabled);
    --panw-te-placeholder:      var(--ds-text-placeholder-rest);
    --panw-te-description:      var(--ds-text-tertiary-rest);
    --panw-te-description-disabled: var(--ds-text-tertiary-disabled);
    --panw-te-counter:          var(--ds-text-tertiary-rest);
    --panw-te-counter-disabled: var(--ds-text-tertiary-disabled);
    --panw-te-icon:             var(--ds-icons-secondary-rest);
    --panw-te-icon-hover:       var(--ds-icons-secondary-hover);
    --panw-te-icon-disabled:    var(--ds-icons-disabled);
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
    width: 400px;
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
  /* Prevent flex-shrink on direct children. Without this, the panel's flex
     column layout compresses closed accordions (which render their natural
     ~48px header height) down to ~20px when total content overflows the
     panel viewport, causing visible overlap with neighbors. */
  .ops-panel > * { flex-shrink: 0; }

  /* ── Panel header ──────────────────────────────────────────────────────
     The account name itself is the identity — no avatar. Opportunity link
     sits beneath as the secondary subject. No invented metadata strip. */
  .ops-panel__header {
    display: flex;
    align-items: flex-start;
    gap: var(--ds-spacing-04);
    padding: var(--ds-spacing-06) var(--ds-spacing-06) var(--ds-spacing-05);
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
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.1px;
    color: var(--ds-text-primary);
    margin: 0;
  }

  /* ── Section as a tile ─────────────────────────────────────────────────
     Each section is its own surface.alt tile sitting on the panel's
     surface.rest ground. The tile boundary contains the section heading
     so it reads as the heading of THIS container, not just another row of
     text in a flow. Tiles are separated by panel-surface visible between
     them — that's the new rhythm. */
  /* Section CTA — right-aligned ghost-brand button at the bottom of an
     accordion's open content. */
  .ops-section-cta {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: var(--ds-spacing-05);
  }

  /* ── Standalone row divider — 1px hairline between rows ───────────────── */
  .ops-divider {
    height: 1px;
    background-color: var(--ds-lines-neutral-tile-rest);
    flex-shrink: 0;
  }

  /* ── Key-value data rows ─────────────────────────────────────────────────
     Hierarchy is carried through weight + tone, not color. Labels are
     quiet (secondary 400). Values are the data — primary text, weight 500,
     tabular numerals so dollar columns align by digit not by character. */
  .ops-data-table {
    display: flex;
    flex-direction: column;
  }
  .ops-data-row {
    display: flex;
    align-items: center;
    min-height: 32px;
  }
  .ops-data-row__label {
    flex: 1;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: var(--ds-text-secondary-rest);
  }
  .ops-data-row__value {
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    color: var(--ds-text-primary);
    text-align: right;
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
  }
  .ops-data-row--outcome { cursor: default; }

  /* ── Renewal edit form ───────────────────────────────────────────────── */
  /* Revealed when outcome ≠ 'unknown'. Churn-only fields surface for 'churn'. */
  .ops-renewal-form {
    display: flex;
    flex-direction: column;
    gap: var(--ds-spacing-05);
    padding-top: var(--ds-spacing-04);
  }
  .ops-renewal-form .panw--dropdown,
  .ops-renewal-form .panw--text-entry { width: 100%; }

  .ops-form-actions {
    display: flex;
    gap: var(--ds-spacing-02);
    justify-content: flex-end;
  }

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

  /* ── Sales Play sub-accordion list — DS Accordion stack inside the parent
     panel-level Sales play accordion. Sub-accordions use theme="gray10"
     (alt-surface tint) so they sit visibly inside the parent's white
     content area. */
  .ops-salesplay-list {
    display: flex;
    flex-direction: column;
  }

  .ops-deal-rows {
    display: flex;
    flex-direction: column;
  }

  /* ── Deal child rows (inside an open sub-accordion) ────────────────────── */
  .ops-deal-row {
    display: flex;
    align-items: center;
    gap: var(--ds-spacing-03);
    min-height: 32px;
    padding: 0 var(--ds-spacing-02);
  }
  .ops-deal-row__name {
    flex: 1;
    min-width: 0;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: var(--ds-text-secondary-rest);
  }
  .ops-deal-status {
    display: inline-flex;
    align-items: center;
    gap: var(--ds-spacing-02);
    flex-shrink: 0;
  }
  /* Sales-play status icons from @ds/icons carry authored fills (color is
     part of the glyph) and ignore CSS color. So this slot is purely a
     dimension container — no color rules needed per status. */
  .ops-deal-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .ops-deal-amount {
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    color: var(--ds-text-primary);
    font-feature-settings: 'tnum' 1, 'lnum' 1;
    font-variant-numeric: tabular-nums;
  }

  /* ── Account health rows ────────────────────────────────────────────────
     Overall Health is bold so it reads as the headline of the three rows.
     Same row height, same label size, same pill size as the other two
     rows — the bold weight alone distinguishes it. Section heading
     ("Account health") above always outweighs Overall Health below. */
  .ops-health-rows {
    display: flex;
    flex-direction: column;
  }
  .ops-health-row {
    display: flex;
    align-items: center;
    min-height: 36px;
  }
  .ops-health-row__label {
    flex: 1;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: var(--ds-text-secondary-rest);
  }
  .ops-health-row--primary .ops-health-row__label {
    font-weight: 600;
    color: var(--ds-text-primary);
  }
  /* Children of Overall Health — indented so the parent-child structure of
     Overall → Technical / Deployment-Adoption is visible without resorting
     to size differentiation (which would compete with the section heading). */
  .ops-health-row--child .ops-health-row__label {
    padding-left: var(--ds-spacing-04);
  }

  /* Product mini-table — proper table with DS Header components for the
     column headers and Tags pills per axis. Row cells get a 16px left
     padding to align with Header's internal padding so column labels and
     row values sit at the same x-position. Tags use justify-self: start
     so they size to content rather than stretching to fill the cell
     width (otherwise adjacent column pills would touch each other). */
  .ops-product-table {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: var(--ds-spacing-05);
  }
  .ops-product-table-header {
    display: grid;
    grid-template-columns: 1fr 120px 120px;
    align-items: center;
  }
  .ops-product-row {
    display: grid;
    grid-template-columns: 1fr 120px 120px;
    align-items: center;
    min-height: 36px;
  }
  .ops-product-row__name {
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: var(--ds-text-secondary-rest);
    padding-left: 16px;
  }
  .ops-product-row > .panw--tag {
    justify-self: start;
    margin-left: 16px;
  }

  /* ── AI Suggestion rows ─────────────────────────────────────────────────
     The Suggestions section is itself a surface.alt tile, so the prompt
     items inside drop their card chrome (no border, no separate background)
     and read as plain rows on the section ground. Hover lifts to ghost. */
  .ops-suggestions {
    display: flex;
    flex-direction: column;
  }
  .ops-prompt-card {
    display: flex;
    align-items: flex-start;
    gap: var(--ds-spacing-04);
    padding: var(--ds-spacing-04) 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: background-color 110ms cubic-bezier(0.2,0,0.38,0.9);
  }
  .ops-prompt-card:hover {
    background-color: var(--ds-ghost-hover);
  }
  .ops-prompt-card:focus-visible {
    outline: 2px solid var(--ds-lines-brand-rest);
    outline-offset: 2px;
  }
  .ops-prompt-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: var(--ds-icons-brand-rest);
    margin-top: 3px;
  }
  .ops-prompt-text {
    flex: 1;
    min-width: 0;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: var(--ds-text-primary);
  }
`

export const Default: StoryObj = {
  render: () => <OpportunityPanel />,
}
