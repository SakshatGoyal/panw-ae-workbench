/**
 * Table Popovers — static showcase.
 *
 * A single surface that renders every popover variant used in the
 * exploration table compositions (AE Opportunity Table + AE Account
 * Table) in its REST state — no hover required to see them. Three
 * variants are shown per popover type so the system grammar (heading
 * vs sub, kv rows, hairline dividers, empty states, density of
 * content) is visible at a glance.
 *
 * Implementation seam
 * -------------------
 * The two source files each export a single non-CSF object
 * (`__oppPopoverParts` / `__accPopoverParts`) that re-handles the
 * panel components + the file-local `LAYOUT_CSS`. The showcase
 * injects both stylesheets once at the page root, then renders each
 * panel wrapped in its corresponding chrome class (`.opp-hover-panel`
 * / `.acc-hover-panel`) — that wrapper is what carries the surface
 * (bg + border + radius-generous + shadow-flyout). The panel content
 * class (`.opp-pop` / `.acc-pop`) only owns padding + typography +
 * width budget; without the wrapper it would render as bare content.
 *
 * Aesthetic
 * ---------
 * Page-level chrome stays out of the popovers' way: a near-white
 * surface, generous vertical rhythm, low-contrast section meta,
 * variant captions sized to the same 14px floor the popovers
 * themselves use. The popovers float on the page exactly as they
 * would on the live table — no fake "device frame" or drop-shadow
 * gimmick. Three columns of variants per row; on narrower viewports
 * the grid simply wraps.
 */

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  __oppPopoverParts,
  DEFAULT_ROWS as OPP_ROWS,
  type OpportunityRow,
} from './opportunity-table-exp.stories'
import {
  __accPopoverParts,
  DEFAULT_ROWS as ACC_ROWS,
  type AccountRow,
} from './account-table-exp.stories'

const opp = __oppPopoverParts
const acc = __accPopoverParts

// ─── Showcase chrome ─────────────────────────────────────────────────────────

const PAGE_CSS = `
.tp-page {
  /* Page surface is a touch off-white so the white popover frames
   * read as foreground. Avoids the "everything is the same tile"
   * effect that happens on pure --ds-surface-rest. */
  /* Off-white page so the white popover frames read as foreground.
   * Token fallback covers environments where --ds-surface-shaded
   * hasn't been defined in the active theme. */
  background-color: var(--ds-surface-shaded, #f4f4f5);
  color: var(--ds-text-primary);
  font-family: var(--ds-type-font-family-sans);
  min-height: 100vh;
  padding: 48px 56px 80px;
  box-sizing: border-box;
}
.tp-page * { box-sizing: border-box; }

.tp-page__title {
  font-size: 22px;
  line-height: 28px;
  font-weight: var(--ds-type-font-weight-semibold);
  letter-spacing: -0.01em;
  margin: 0 0 6px;
}
.tp-page__lede {
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-tertiary-rest);
  max-width: 640px;
  margin: 0 0 40px;
}

.tp-section {
  margin-top: 56px;
}
.tp-section:first-of-type { margin-top: 32px; }

.tp-section__kicker {
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ds-text-tertiary-rest);
  font-weight: var(--ds-type-font-weight-semibold);
  margin: 0 0 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.tp-section__tier {
  /* Width-tier badge — shows which of {160, 240, 320} the popovers
   * in this section commit to. Read at scan-distance as a small
   * data chip, not a heading. */
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 7px;
  border-radius: 9px;
  background-color: var(--ds-ghost-field-rest);
  color: var(--ds-text-secondary-rest);
  letter-spacing: 0.02em;
  font-size: 11px;
  font-weight: var(--ds-type-font-weight-semibold);
  font-feature-settings: 'tnum' 1, 'lnum' 1;
  font-variant-numeric: tabular-nums;
}
.tp-section__title {
  font-size: 17px;
  line-height: 24px;
  font-weight: var(--ds-type-font-weight-semibold);
  margin: 0 0 4px;
  color: var(--ds-text-primary);
}
.tp-section__sub {
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-tertiary-rest);
  margin: 0 0 24px;
  max-width: 720px;
}

.tp-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px 28px;
  margin-bottom: 12px;
}
@media (max-width: 1100px) {
  .tp-row { grid-template-columns: 1fr; }
}

.tp-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  /* The popover wrappers carry their own max-width; the cell lets
   * them sit naturally at the top-left with caption beneath. */
}

.tp-cell__stage {
  /* A faint dotted backdrop sized to the popover hints that this
   * is a "popped-out" surface without competing with the popover's
   * own chrome. The dotted ring is one design call, not three —
   * any heavier treatment would fight the popover shadow. */
  position: relative;
  padding: 16px;
  border-radius: var(--ds-radius-generous);
  border: 1px dashed var(--ds-lines-neutral-subtle, var(--ds-lines-neutral-rest));
  background-color: var(--ds-surface-rest);
  display: inline-flex;
}

.tp-cell__label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.tp-cell__chip {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 10px;
  background-color: var(--ds-ghost-field-rest);
  color: var(--ds-text-secondary-rest);
  font-size: 11px;
  line-height: 1;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: var(--ds-type-font-weight-semibold);
}
.tp-cell__chip--opp {
  background-color: color-mix(in srgb, var(--ds-status-warning-bg, #fff4d6) 70%, transparent);
  color: var(--ds-status-warning-text, var(--ds-text-secondary-rest));
}
.tp-cell__chip--acc {
  background-color: color-mix(in srgb, var(--ds-status-info-bg, #e6f0ff) 70%, transparent);
  color: var(--ds-status-info-text, var(--ds-text-secondary-rest));
}
.tp-cell__caption {
  font-size: 14px;
  line-height: 20px;
  color: var(--ds-text-primary);
  font-weight: var(--ds-type-font-weight-semibold);
}
.tp-cell__sub {
  font-size: 13px;
  line-height: 18px;
  color: var(--ds-text-tertiary-rest);
  max-width: 320px;
}

.tp-divider {
  margin: 64px 0 0;
  height: 1px;
  background-color: var(--ds-lines-neutral-rest);
  border: 0;
}
`

interface CellProps {
  origin: 'opp' | 'acc'
  caption: string
  sub?: string
  children: React.ReactNode
}

function Cell({ origin, caption, sub, children }: CellProps) {
  return (
    <div className="tp-cell">
      <div className="tp-cell__stage">{children}</div>
      <div>
        <div className="tp-cell__label">
          <span className={`tp-cell__chip tp-cell__chip--${origin}`}>
            {origin === 'opp' ? 'Opportunity' : 'Account'}
          </span>
          <span className="tp-cell__caption">{caption}</span>
        </div>
        {sub && <div className="tp-cell__sub">{sub}</div>}
      </div>
    </div>
  )
}

interface SectionProps {
  kicker: string
  title: string
  sub?: string
  /** Width tier this section's popovers commit to. */
  tier: 160 | 240 | 320
  children: React.ReactNode
}

function Section({ kicker, title, sub, tier, children }: SectionProps) {
  return (
    <section className="tp-section">
      <div className="tp-section__kicker">
        <span>{kicker}</span>
        <span className="tp-section__tier">{tier}px</span>
      </div>
      <h2 className="tp-section__title">{title}</h2>
      {sub && <p className="tp-section__sub">{sub}</p>}
      <div className="tp-row">{children}</div>
    </section>
  )
}

// Thin wrappers — give the panel content its chrome wrapper so it
// reads as a popover rather than bare div content.
function OppFrame({ panelClass, children }: { panelClass?: string; children: React.ReactNode }) {
  return (
    <div className={`opp-hover-panel${panelClass ? ` ${panelClass}` : ''}`}>
      {children}
    </div>
  )
}
function AccFrame({ children }: { children: React.ReactNode }) {
  return <div className="acc-hover-panel">{children}</div>
}

// Product popovers (both tables) render a bare single-row surface —
// no .acc-pop / .opp-pop list chrome. The hover-panel wrapper alone
// carries the bg + radius + shadow.
function AccProductFrame({ children }: { children: React.ReactNode }) {
  return <div className="acc-hover-panel">{children}</div>
}

// Renewal panel is stateful — outcome is editable inside the popover.
// Wrap each instance with its own local state so all three variants
// independently track their draft.
function RenewalStatic({ row, initialOutcome }: { row: OpportunityRow; initialOutcome: string }) {
  const [outcome, setOutcome] = useState<string>(initialOutcome)
  return (
    <opp.RenewalPanel
      row={row}
      outcome={outcome as never /* type-erased: source enum is module-local */}
      onOutcomeChange={(v) => setOutcome(v as string)}
      onClose={() => { /* showcase-only — no anchor to close to */ }}
    />
  )
}

// ─── Variant data picks ──────────────────────────────────────────────────────
// All picks reference existing rows in the fixtures so the showcase
// stays self-consistent with the live tables — no "synthetic Lorem"
// rows that drift from how the real tables look.

const oppHealthy   = OPP_ROWS[0]  // Titan Energy — healthy
const oppAtRisk    = OPP_ROWS[1]  // Meridian Capital — at-risk
const oppCritical  = OPP_ROWS[3]  // Vertex Manufacturing — critical

const oppNoRisks   = OPP_ROWS[0]  // 0 risks
const oppFewRisks  = OPP_ROWS[1]  // 2 risks
const oppManyRisks = OPP_ROWS[4]  // 6 risks (Pacific Commerce)

const oppRenewalA  = OPP_ROWS[0]  // outcome = 'full' (committed)
const oppRenewalB  = OPP_ROWS[3]  // outcome = 'unknown'
const oppRenewalC: OpportunityRow = {
  ...OPP_ROWS[0],
  account: 'Vertex Manufacturing Co.',
  renewal: { ...OPP_ROWS[0].renewal!, subEnd: 'Apr 30, 2025', renewableTcvUsd: 3_100_000, arrUsd: 1_550_000, outcome: 'churn' },
}

const accHealthy   = ACC_ROWS[0]  // Titan — healthy
const accAtRisk    = ACC_ROWS[2]  // Aperture Robotics — at-risk
const accCritical  = ACC_ROWS[3]  // Vertex Manufacturing — critical

const accNoRisks   = ACC_ROWS[0]
const accFewRisks  = ACC_ROWS[2]  // 1 risk
const accManyRisks = ACC_ROWS[9]  // 4 risks (Harbor Logistics)

const accEbcFull    = ACC_ROWS[3]  // 3 attendees, dated 2025-08-12
const accEbcSparse  = ACC_ROWS[2]  // 1 attendee, dated 2025-11-20
const accEbcAbsent  = ACC_ROWS[1]  // ebc.absent = true (Meridian)

// Sales-play buckets — pull from the row that authors all 7 statuses
// (Summit, index 6) plus a contrasting "not-touched" bucket from
// Meridian (index 1) and a "pursuing" bucket with multiple plays.
const accSpPursuing    = ACC_ROWS[0].salesPlays[0]  // pursuing 1.2M, 2 plays
const accSpNotTouched  = ACC_ROWS[1].salesPlays[0]  // not-touched 950k, 2 plays
const accSpClosedWon   = ACC_ROWS[6].salesPlays.find(b => b.status === 'closed-won')!  // 120k, 1 play

const accProductLarge  = ACC_ROWS[0].products[0]  // Prisma Access $3.6M
const accProductMid    = ACC_ROWS[1].products[0]  // Cortex XDR+ $1.4M
const accProductSmall  = ACC_ROWS[2].products[0]  // PA Series $220k

const accQuarterCurrent  = ACC_ROWS[0].pipeline[0]  // CQ $1.2M — renewal + upsell
const accQuarterMixed    = ACC_ROWS[3].pipeline[1]  // Q1FY27 — upsell + renewal
const accQuarterEmpty    = ACC_ROWS[4].pipeline[1]  // empty Q1FY27 ($0)

// Apex no longer has a popover — it renders as a tertiary-toned
// link beneath the account name in the table itself.

// ─── Showcase ────────────────────────────────────────────────────────────────

function TablePopoversShowcase() {
  return (
    <>
      <style>{opp.LAYOUT_CSS}</style>
      <style>{acc.LAYOUT_CSS}</style>
      <style>{PAGE_CSS}</style>

      <div className="tp-page">
        <h1 className="tp-page__title">Table popovers</h1>
        <p className="tp-page__lede">
          Every hover surface used in the two exploration tables, rendered in rest
          state. Three variants per type cover the range the system has to absorb
          — empty cases, typical cases, and the dense edge that stresses the
          layout. Every popover commits to one of three widths — 160, 240, or 320
          — labeled on each section header. CTA whitespace is a single 8px beat
          across the system; buttons read full-width and center-aligned.
        </p>

        {/* ──────────────────── Opportunity table ───────────────────── */}

        <Section
          tier={320}
          kicker="Opportunity table · column 3"
          title="Account health"
          sub="Anchored on the health tag. 12-month sparkline + technical and adoption sub-scores + a path back to the account-health surface.">
          <Cell origin="opp" caption="Healthy" sub="Flat-line trend, both sub-axes healthy. The bars carry the green-40 hue used in the acc-table's health popover.">
            <OppFrame><opp.AccountHealthPanel row={oppHealthy} /></OppFrame>
          </Cell>
          <Cell origin="opp" caption="At risk" sub="Mixed sub-axes (technical healthy / adoption at-risk). Two yellow spikes in the trend.">
            <OppFrame><opp.AccountHealthPanel row={oppAtRisk} /></OppFrame>
          </Cell>
          <Cell origin="opp" caption="Critical" sub="Trend slides healthy → at-risk → critical across the 12 months; both sub-axes flagged.">
            <OppFrame><opp.AccountHealthPanel row={oppCritical} /></OppFrame>
          </Cell>
        </Section>

        <Section
          tier={320}
          kicker="Opportunity table · column 3"
          title="Risk factors"
          sub="Anchored on the risk-count tag. Tabular row list with hairline dividers; one row per deal-level risk. Empty state collapses to a single line.">
          <Cell origin="opp" caption="No risks" sub="Empty state. Heading + sub, no rows.">
            <OppFrame><opp.RiskFactorsPanel risks={oppNoRisks.risks} /></OppFrame>
          </Cell>
          <Cell origin="opp" caption="Two risks" sub="Typical case. Heading auto-pluralizes.">
            <OppFrame><opp.RiskFactorsPanel risks={oppFewRisks.risks} /></OppFrame>
          </Cell>
          <Cell origin="opp" caption="Six risks" sub="Density edge. Rows extend to the popover frame; hairlines hold the rhythm.">
            <OppFrame><opp.RiskFactorsPanel risks={oppManyRisks.risks} /></OppFrame>
          </Cell>
        </Section>

        <Section
          tier={240}
          kicker="Opportunity table · column 4"
          title="Product (per-tag)"
          sub="Anchored on each individual product tag. Single row — icon · name · value — so the AE sees the absolute dollar without an inferential hop.">
          <Cell origin="opp" caption="Prisma Access · $900K" sub="SASE flagship product on a healthy renewal.">
            <OppFrame><opp.ProductPanel product={OPP_ROWS[0].products[0]} /></OppFrame>
          </Cell>
          <Cell origin="opp" caption="Cortex XDR+ · $1.4M" sub="Mid-deal-anchor on a security platform play.">
            <OppFrame><opp.ProductPanel product={OPP_ROWS[1].products[0]} /></OppFrame>
          </Cell>
          <Cell origin="opp" caption="XSIAM · $300K" sub="Smaller attachment on a multi-product deal.">
            <OppFrame><opp.ProductPanel product={OPP_ROWS[1].products[2]} /></OppFrame>
          </Cell>
        </Section>

        <Section
          tier={320}
          kicker="Opportunity table · column 2"
          title="Renewal"
          sub="Anchored on the renewal tag. Two-column kv table (subscription end · renewable TCV · ARR) over the outcome editor.">
          <Cell origin="opp" caption="Outcome — Full" sub="Committed renewal; outcome locked to Full. Editor reads as decided.">
            <OppFrame panelClass="opp-hover-panel--renewal">
              <RenewalStatic row={oppRenewalA} initialOutcome="full" />
            </OppFrame>
          </Cell>
          <Cell origin="opp" caption="Outcome — Unknown" sub="Default state on a row the AE hasn't qualified yet. Editor sits at rest.">
            <OppFrame panelClass="opp-hover-panel--renewal">
              <RenewalStatic row={oppRenewalB} initialOutcome="unknown" />
            </OppFrame>
          </Cell>
          <Cell origin="opp" caption="Outcome — Churn" sub="Churn expands the structured dropdowns + notes underneath the kv table.">
            <OppFrame panelClass="opp-hover-panel--renewal">
              <RenewalStatic row={oppRenewalC} initialOutcome="churn" />
            </OppFrame>
          </Cell>
        </Section>

        <Section
          tier={160}
          kicker="Opportunity table · column 2"
          title="Action button popover"
          sub="The button-only surface. Anchored on a tag whose only job is to expose a single CTA — modify, view, renew. No copy: the trigger already names the entity.">
          <Cell origin="opp" caption="Modify" sub="Anchored on an Upsell tag — opens the upsell flow.">
            <OppFrame panelClass="opp-hover-panel--button">
              <opp.ActionButtonPanel label="Modify" onClick={() => {}} />
            </OppFrame>
          </Cell>
          <Cell origin="opp" caption="View Quote" sub="Anchored on the Quote ID tag — routes to the quote.">
            <OppFrame panelClass="opp-hover-panel--button">
              <opp.ActionButtonPanel label="View Quote" onClick={() => {}} />
            </OppFrame>
          </Cell>
          <Cell origin="opp" caption="View Play" sub="Anchored on the sales-play tag — opens the play detail.">
            <OppFrame panelClass="opp-hover-panel--button">
              <opp.ActionButtonPanel label="View Play" onClick={() => {}} />
            </OppFrame>
          </Cell>
        </Section>

        <Section
          tier={240}
          kicker="Opportunity table · column 3"
          title="Last activity (text-only)"
          sub="Plain-text popover anchored on the activity tag. One sentence, no structure — the simplest popover in the system.">
          <Cell origin="opp" caption="Today" sub="Recent inbound; reads as healthy momentum.">
            <OppFrame>
              <div className="opp-pop opp-pop--simple">
                {OPP_ROWS[5].activity.description} — today
              </div>
            </OppFrame>
          </Cell>
          <Cell origin="opp" caption="2 days ago" sub="Typical cadence on a live deal.">
            <OppFrame>
              <div className="opp-pop opp-pop--simple">
                {OPP_ROWS[0].activity.description} — 2 days ago
              </div>
            </OppFrame>
          </Cell>
          <Cell origin="opp" caption="12 days ago" sub="Activity bucket has tipped to amber; the popover still keeps its calm voice.">
            <OppFrame>
              <div className="opp-pop opp-pop--simple">
                {OPP_ROWS[4].activity.description} — 12 days ago
              </div>
            </OppFrame>
          </Cell>
        </Section>

        <hr className="tp-divider" />

        {/* ──────────────────── Account table ───────────────────── */}

        <Section
          tier={320}
          kicker="Account table · column 3"
          title="Account health"
          sub="Mirrors the opportunity surface — same grammar, anchored on the same kind of tag but reading off the account-level health record.">
          <Cell origin="acc" caption="Healthy" sub="Flat-line trend; both sub-axes healthy.">
            <AccFrame><acc.AccountHealthPanel row={accHealthy} /></AccFrame>
          </Cell>
          <Cell origin="acc" caption="At risk" sub="Trend tips to at-risk in month 8; technical flagged, adoption healthy.">
            <AccFrame><acc.AccountHealthPanel row={accAtRisk} /></AccFrame>
          </Cell>
          <Cell origin="acc" caption="Critical" sub="Deep slide through both axes; trend ends at the critical band.">
            <AccFrame><acc.AccountHealthPanel row={accCritical} /></AccFrame>
          </Cell>
        </Section>

        <Section
          tier={320}
          kicker="Account table · column 3"
          title="Account-level risk factors"
          sub="Distinct from opp-table's deal-level risks: six-value taxonomy (no EBC, not platformized, derailed POVs, no ASR, no CSP, no pipeline). Heading carries the 'account-level' qualifier so the reader can't conflate it with the deal popover.">
          <Cell origin="acc" caption="No risks" sub="Empty state — same shape as the opp version, different copy.">
            <AccFrame><acc.AccountRiskFactorsPanel risks={accNoRisks.risks} /></AccFrame>
          </Cell>
          <Cell origin="acc" caption="One risk" sub="Single-row case. The list still draws its top and bottom hairlines.">
            <AccFrame><acc.AccountRiskFactorsPanel risks={accFewRisks.risks} /></AccFrame>
          </Cell>
          <Cell origin="acc" caption="Four risks" sub="Density edge — the row hover band reaches the popover frame.">
            <AccFrame><acc.AccountRiskFactorsPanel risks={accManyRisks.risks} /></AccFrame>
          </Cell>
        </Section>

        <Section
          tier={320}
          kicker="Account table · column 3"
          title="EBC"
          sub="Anchored on the EBC tag. Heading carries the date; sub-line carries the topic; attendee list runs as labeled kv rows.">
          <Cell origin="acc" caption="EBC on file (3 attendees)" sub="Full record. Attendee list runs to the popover frame.">
            <AccFrame><acc.EBCPanel ebc={accEbcFull.ebc} /></AccFrame>
          </Cell>
          <Cell origin="acc" caption="EBC on file (1 attendee)" sub="Lighter cadence — single attendee still gets its own row.">
            <AccFrame><acc.EBCPanel ebc={accEbcSparse.ebc} /></AccFrame>
          </Cell>
          <Cell origin="acc" caption="No EBC on record" sub="Empty branch of the discriminated union — heading drops the date, sub line carries the absence.">
            <AccFrame><acc.EBCPanel ebc={accEbcAbsent.ebc} /></AccFrame>
          </Cell>
        </Section>

        <Section
          tier={240}
          kicker="Account table · column 5"
          title="Sales play (per-bucket)"
          sub="Anchored on each lifecycle-status chip in the cluster. Heading carries status + bucket sum; rows enumerate the plays inside the bucket.">
          <Cell origin="acc" caption="Pursuing · $1.2M" sub="In-flight bucket with two plays. The most common variant.">
            <AccFrame><acc.SalesPlayBucketPanel bucket={accSpPursuing} /></AccFrame>
          </Cell>
          <Cell origin="acc" caption="Not Touched · $950K" sub="Action-item bucket. The icon on the trigger is red; the popover stays neutral.">
            <AccFrame><acc.SalesPlayBucketPanel bucket={accSpNotTouched} /></AccFrame>
          </Cell>
          <Cell origin="acc" caption="Closed Won · $120K" sub="Single-play bucket — popover still uses the same kv-list shape so the column reads consistently.">
            <AccFrame><acc.SalesPlayBucketPanel bucket={accSpClosedWon} /></AccFrame>
          </Cell>
        </Section>

        <Section
          tier={240}
          kicker="Account table · column 4"
          title="Product (per-tag, absolute ARR)"
          sub="Distinct from opp-table's product popover: this carries absolute ARR contribution, not share-of-deal-value. A single row — icon · name · ARR.">
          <Cell origin="acc" caption="Prisma Access · $3.6M" sub="Top-end ARR contribution on the SASE flagship.">
            <AccProductFrame><acc.ProductARRPanel product={accProductLarge} /></AccProductFrame>
          </Cell>
          <Cell origin="acc" caption="Cortex XDR+ · $1.4M" sub="Mid-range — the most populous slot in real fixtures.">
            <AccProductFrame><acc.ProductARRPanel product={accProductMid} /></AccProductFrame>
          </Cell>
          <Cell origin="acc" caption="PA Series · $220K" sub="Small-ARR sub-account product on a single-product account.">
            <AccProductFrame><acc.ProductARRPanel product={accProductSmall} /></AccProductFrame>
          </Cell>
        </Section>

        <Section
          tier={240}
          kicker="Account table · column 2"
          title="Quarter pipeline"
          sub="Anchored on each quarter chip in the four-quarter strip. No header — the heading carries the quarter label + the word 'pipeline'. Rows are typed opp lines (no opp names — the surface only commits to type + dollar).">
          <Cell origin="acc" caption="Current quarter · $1.2M" sub="Two-line quarter — renewal + upsell.">
            <AccFrame><acc.QuarterPipelinePanel quarter={accQuarterCurrent} /></AccFrame>
          </Cell>
          <Cell origin="acc" caption="Mixed-type quarter" sub="Two opps of different types in the same quarter — the popover renders them as two rows.">
            <AccFrame><acc.QuarterPipelinePanel quarter={accQuarterMixed} /></AccFrame>
          </Cell>
          <Cell origin="acc" caption="Empty quarter" sub="No pipeline. Heading drops the word 'pipeline' and the sub-line carries the absence.">
            <AccFrame><acc.QuarterPipelinePanel quarter={accQuarterEmpty} /></AccFrame>
          </Cell>
        </Section>

      </div>
    </>
  )
}

// ─── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'explorations/Table Popovers',
  excludeStories: ['TablePopoversShowcase'],
}
export default meta

export { TablePopoversShowcase }

export const Default: StoryObj = {
  render: () => <TablePopoversShowcase />,
}
