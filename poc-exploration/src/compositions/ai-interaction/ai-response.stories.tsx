/**
 * ai-interactions/AI Response
 *
 * Three aesthetic directions for the AI response + derivation chip + panel:
 *
 *   Ledger  — Audit-grade. Monochromatic. Sources as plain text.
 *             Trade-off: maximal information density, zero ornamentation.
 *             Earns trust by looking like a primary document.
 *
 *   Trace   — Process-visible. Colored brand pills for sources. Left spine
 *             connecting steps. Chip has shimmer animation during generation.
 *             Trade-off: warmth and legibility. Feels like a tool, not a document.
 *
 *   Ghost   — Zero ceremony. Chip is inline tertiary text with a chevron.
 *             Panel is a left-rule indented block. Sources are logo-only badges
 *             in a right column — no text.
 *             Trade-off: maximum density, requires trust already established.
 *
 * Derivation shape vocabulary
 * ───────────────────────────
 *   Triangulation       — cross-referencing multiple independent sources
 *   Deductive synthesis — working forward from confirmed facts to a conclusion
 *   Comparative analysis — evaluating options against a common rubric
 *   Iterative synthesis  — building a conclusion through successive refinements
 */
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ChevronRight, ProjectDiagram } from '@ds/icons'
import logoSalesforce from './logos/logo-salesforce.jpeg'
import logoClari     from './logos/logo-clari.png'
import logoTableau   from './logos/logo-tableau.jpg'
import logoPeopleai  from './logos/logo-people-ai.jpeg'
import './ai-response.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type DerivationShape =
  | 'Triangulation'
  | 'Deductive synthesis'
  | 'Comparative analysis'
  | 'Iterative synthesis'

type SourceKey = 'salesforce' | 'clari' | 'tableau' | 'peopleai' | null

interface DerivationStep {
  text: string
  source: SourceKey
  subPath: string | null
  lastUpdated?: string
}

interface DerivationData {
  shape: DerivationShape
  steps: DerivationStep[]
}

interface Scenario {
  id: string
  label: string
  response: React.ReactNode
  derivation: DerivationData
}

type Direction = 'ledger' | 'trace' | 'ghost' | 'panel' | 'inline' | 'iterative'

// ─── Logo images (for workbench directions D + E) ────────────────────────────

const WB_LOGOS: Record<Exclude<SourceKey, null>, string> = {
  salesforce: logoSalesforce,
  clari:      logoClari,
  tableau:    logoTableau,
  peopleai:   logoPeopleai,
}

// ─── Source metadata ──────────────────────────────────────────────────────────

const SOURCES: Record<
  Exclude<SourceKey, null>,
  { name: string; abbr: string; badgeClass: string; dotClass: string }
> = {
  salesforce: {
    name:       'Salesforce',
    abbr:       'SF',
    badgeClass: 'air__source-badge--salesforce',
    dotClass:   'air__source-dot--salesforce',
  },
  clari: {
    name:       'Clari',
    abbr:       'CL',
    badgeClass: 'air__source-badge--clari',
    dotClass:   'air__source-dot--clari',
  },
  tableau: {
    name:       'Tableau',
    abbr:       'TB',
    badgeClass: 'air__source-badge--tableau',
    dotClass:   'air__source-dot--tableau',
  },
  peopleai: {
    name:       'people.ai',
    abbr:       'PA',
    badgeClass: 'air__source-badge--peopleai',
    dotClass:   'air__source-dot--peopleai',
  },
}

// ─── Scenario data ────────────────────────────────────────────────────────────

const SCENARIO_A: Scenario = {
  id:    'a',
  label: 'Scenario A — Short response',
  response: (
    'Yes — installed-base gap, three recent meeting mentions of cloud security, ' +
    'and an engaged cloud security director — but not pipeline until the rep ' +
    'confirms a named pain owner and next meeting.'
  ),
  derivation: {
    shape: 'Triangulation',
    steps: [
      {
        text:        'Verified no Prisma Cloud entitlement in Acme\'s product footprint',
        source:      'tableau',
        subPath:     'Account dashboard',
        lastUpdated: '2:14 pm PT',
      },
      {
        text:        'Cross-referenced assets: no current or trial subscription',
        source:      'salesforce',
        subPath:     'Assets / Entitlements',
        lastUpdated: '3:47 pm PT',
      },
      {
        text:        'Located 3 recent meeting mentions of "cloud workload visibility" and "AWS posture"',
        source:      'peopleai',
        subPath:     'Meeting topics, last 60 days',
        lastUpdated: '11:32 am PT',
      },
      {
        text:        'Identified Eric Chen, Director of Cloud Security, as engaged contact (4 meetings in 90 days)',
        source:      'peopleai',
        subPath:     'Contacts',
        lastUpdated: '11:32 am PT',
      },
      {
        text:        'Located closed-lost cloud opportunity from 2022, noted as "paused project" not technical loss',
        source:      'salesforce',
        subPath:     'Closed Lost',
        lastUpdated: '9:05 am PT',
      },
      {
        text:    'Concluded whitespace conditions met — gap + pain + reachable owner — pending rep qualification',
        source:  null,
        subPath: null,
      },
    ],
  },
}

const SCENARIO_B: Scenario = {
  id:    'b',
  label: 'Scenario B — Structured response',
  response: (
    <>
      <span className="air__response-caveat">
        Assuming you want a diagnosis to guide next steps:
      </span>
      <span className="air__response-body">
        The Northbay POC ended at technical validation — SEs confirmed the product
        worked, but no meetings with the Economic Buyer or any VP+ contact have
        occurred in the 45 days since POC close. The deal stalled because the POC
        didn't convert into a business motion.
      </span>
      <span className="air__response-scope">
        In scope: POC artifacts, post-POC engagement, Contact Roles.
        Out of scope: customer-internal politics or budget status.
      </span>
      <span className="air__response-action">
        <span className="air__response-action-label">Suggested next: </span>
        request a Champion-sponsored business review with the Economic Buyer.
      </span>
    </>
  ),
  derivation: {
    shape: 'Deductive synthesis',
    steps: [
      {
        text:        'Located POC close-out date as March 28, with positive SE scorecard',
        source:      'salesforce',
        subPath:     'Opportunity → POC notes',
        lastUpdated: '4:22 pm PT',
      },
      {
        text:        'Confirmed technical validation: all 5 success criteria marked met by SE',
        source:      'salesforce',
        subPath:     'SE updates',
        lastUpdated: '4:22 pm PT',
      },
      {
        text:        'Pulled post-POC meeting list: 2 meetings in 45 days, both with technical team',
        source:      'peopleai',
        subPath:     'Engagement, post March 28',
        lastUpdated: '1:15 pm PT',
      },
      {
        text:        'Found no evidence of Economic Buyer engagement post-POC — zero meetings with VP+ on customer side',
        source:      'peopleai',
        subPath:     'Engagement',
        lastUpdated: '1:15 pm PT',
      },
      {
        text:        'Cross-referenced Contact Roles: Economic Buyer field unpopulated; Champion is Director-level technical lead',
        source:      'salesforce',
        subPath:     'Contact Roles',
        lastUpdated: '10:38 am PT',
      },
      {
        text:    'Inferred POC ended at technical validation — no conversion to buying motion',
        source:  null,
        subPath: null,
      },
    ],
  },
}

const SCENARIOS: Scenario[] = [SCENARIO_A, SCENARIO_B]

// ─── Source tag sub-components ────────────────────────────────────────────────

/** Direction A — plain text: "Tableau · Account dashboard" */
function LedgerSource({ source, subPath }: { source: SourceKey; subPath: string | null }) {
  if (!source) return null
  const meta = SOURCES[source]
  return (
    <span className="air__step-source">
      {meta.name}
      {subPath && (
        <>
          <span className="air__source-sep">·</span>
          {subPath}
        </>
      )}
    </span>
  )
}

/** Direction B — colored pill: [mark] Name \n sub-path */
function TraceBadge({ source, subPath }: { source: SourceKey; subPath: string | null }) {
  if (!source) return null
  const meta = SOURCES[source]
  return (
    <span className="air__step-source">
      <span className={`air__source-badge ${meta.badgeClass}`}>
        <span className="air__source-mark">{meta.abbr}</span>
        <span className="air__source-info">
          <span className="air__source-name">{meta.name}</span>
          {subPath && <span className="air__source-path">{subPath}</span>}
        </span>
      </span>
    </span>
  )
}

/** Direction C — logo circle only, right column */
function GhostDot({ source }: { source: SourceKey }) {
  if (!source) {
    return (
      <span className="air__step-source">
        <span className="air__source-dot air__source-dot--none" />
      </span>
    )
  }
  const meta = SOURCES[source]
  return (
    <span className="air__step-source">
      <span
        className={`air__source-dot ${meta.dotClass}`}
        title={meta.name}
        aria-label={meta.name}
      />
    </span>
  )
}

// ─── Chip sub-components ──────────────────────────────────────────────────────

function LedgerChip({
  chipState,
  open,
  onClick,
  stepCount,
  shape,
}: {
  chipState: 'generating' | 'ready'
  open: boolean
  onClick: () => void
  stepCount: number
  shape: DerivationShape
}) {
  const cls = [
    'air__chip',
    chipState === 'generating' ? 'air__chip--generating' : '',
    open ? 'air__chip--open' : '',
  ].filter(Boolean).join(' ')

  return (
    <button className={cls} onClick={onClick} aria-expanded={open} type="button">
      {chipState === 'generating' ? (
        <span>deriving<span className="air__chip-count">…</span></span>
      ) : (
        <>
          <span>{shape}</span>
          <span className="air__chip-dot">·</span>
          <span className="air__chip-count">{stepCount} steps</span>
        </>
      )}
    </button>
  )
}

function TraceChip({
  chipState,
  open,
  onClick,
  stepCount,
  shape,
}: {
  chipState: 'generating' | 'ready'
  open: boolean
  onClick: () => void
  stepCount: number
  shape: DerivationShape
}) {
  const cls = [
    'air__chip',
    chipState === 'generating' ? 'air__chip--generating' : '',
    open ? 'air__chip--open' : '',
  ].filter(Boolean).join(' ')

  return (
    <button className={cls} onClick={onClick} aria-expanded={open} type="button">
      <span className="air__chip-icon" aria-hidden="true">
        <ProjectDiagram size={14} />
      </span>
      {chipState === 'generating' ? (
        <span>Deriving reasoning…</span>
      ) : (
        <span>
          {shape}
          <span style={{ opacity: 0.5, margin: '0 5px' }}>·</span>
          {stepCount} steps
        </span>
      )}
    </button>
  )
}

function GhostChip({
  chipState,
  open,
  onClick,
}: {
  chipState: 'generating' | 'ready'
  open: boolean
  onClick: () => void
}) {
  const cls = [
    'air__chip',
    chipState === 'generating' ? 'air__chip--generating' : '',
    open ? 'air__chip--open' : '',
  ].filter(Boolean).join(' ')

  return (
    <button className={cls} onClick={onClick} aria-expanded={open} type="button">
      <span className="air__chip-bullet">·</span>
      {chipState === 'generating' ? (
        <span className="air__chip-word">computing…</span>
      ) : (
        <>
          <span>see reasoning</span>
          <span className="air__chip-arrow" aria-hidden="true">
            <ChevronRight size={12} />
          </span>
        </>
      )}
    </button>
  )
}

// ─── Workbench source block (directions D + E) ────────────────────────────────

/**
 * Stacked source block: [18px logo] + tool name (bold primary) + sub-path (tertiary).
 * Returns null for inference steps (source === null) — empty slot, no placeholder.
 * Brand identity lives only in the logo image; no extra colour is introduced.
 */
function WorkbenchSource({ source, subPath }: { source: SourceKey; subPath: string | null }) {
  if (!source) return null
  const meta = SOURCES[source]
  return (
    <div className="air__wb-source">
      <img
        src={WB_LOGOS[source]}
        className="air__wb-logo"
        alt=""
        aria-hidden="true"
      />
      <div className="air__wb-source-text">
        <span className="air__wb-source-name">{meta.name}</span>
        {subPath && <span className="air__wb-source-path">{subPath}</span>}
      </div>
    </div>
  )
}

// ─── Iterative source block (direction F) ────────────────────────────────────

/**
 * Horizontal source row: [logo] [Tool name] [sub-path] [Last updated: ##:## pm PT]
 * All inline, single line. Name is bold primary (fit-content). Path and
 * last-updated share the same tertiary 11px style, separated by spacing.
 * Returns null for inference steps — no glyph, no placeholder.
 */
function IterativeSource({
  source,
  subPath,
  lastUpdated,
}: {
  source: SourceKey
  subPath: string | null
  lastUpdated?: string
}) {
  if (!source) return null
  const meta = SOURCES[source]
  return (
    <div className="air__it-source">
      {/* Tag: logo + name + path only */}
      <span className="air__it-tag">
        <img
          src={WB_LOGOS[source]}
          className="air__wb-logo"
          alt=""
          aria-hidden="true"
        />
        <span className="air__wb-source-name">{meta.name}</span>
        {subPath && <span className="air__it-source-meta">{subPath}</span>}
      </span>
      {/* Last updated sits outside the tag */}
      {lastUpdated && (
        <span className="air__it-last-updated">Last updated: {lastUpdated}</span>
      )}
    </div>
  )
}

// ─── Workbench chip (directions D + E + F) ───────────────────────────────────

/**
 * Neutral-bordered chip. No fill, no brand-blue. Matches the "Tech validation" /
 * "Active POV" chip treatment in the Opportunity Workbench.
 * Generating animation: subtle opacity pulse — no colour flash.
 * Text: "{shape} · {stepCount} steps" (e.g. "Triangulation · 6 steps").
 */
function WorkbenchChip({
  chipState,
  open,
  onClick,
  stepCount,
  shape,
}: {
  chipState: 'generating' | 'ready'
  open: boolean
  onClick: () => void
  stepCount: number
  shape: DerivationShape
}) {
  const cls = [
    'air__chip',
    chipState === 'generating' ? 'air__chip--generating' : '',
    open ? 'air__chip--open' : '',
  ].filter(Boolean).join(' ')

  return (
    <button className={cls} onClick={onClick} aria-expanded={open} type="button">
      <span className="air__chip-icon" aria-hidden="true">
        <ProjectDiagram size={13} />
      </span>
      {chipState === 'generating' ? (
        <span>Deriving reasoning…</span>
      ) : (
        <>
          <span>{shape}</span>
          <span className="air__chip-sep"> · </span>
          <span className="air__chip-count">{stepCount} steps</span>
        </>
      )}
    </button>
  )
}

// ─── AIResponseCard ───────────────────────────────────────────────────────────

function AIResponseCard({
  scenario,
  direction,
}: {
  scenario: Scenario
  direction: Direction
}) {
  const [chipState, setChipState] = React.useState<'generating' | 'ready'>('generating')
  const [panelOpen, setPanelOpen] = React.useState(false)

  // Auto-transition chip from generating → ready
  React.useEffect(() => {
    setChipState('generating')
    setPanelOpen(false)
    const t = setTimeout(() => setChipState('ready'), 2000)
    return () => clearTimeout(t)
  }, [scenario.id, direction])

  const { derivation } = scenario
  const stepCount = derivation.steps.length

  const handleChipClick = () => {
    if (chipState === 'ready') {
      setPanelOpen(o => !o)
    }
  }

  const isWorkbench = direction === 'panel' || direction === 'inline' || direction === 'iterative'

  const chip =
    isWorkbench ? (
      <WorkbenchChip
        chipState={chipState}
        open={panelOpen}
        onClick={handleChipClick}
        stepCount={stepCount}
        shape={derivation.shape}
      />
    ) : direction === 'ledger' ? (
      <LedgerChip
        chipState={chipState}
        open={panelOpen}
        onClick={handleChipClick}
        stepCount={stepCount}
        shape={derivation.shape}
      />
    ) : direction === 'trace' ? (
      <TraceChip
        chipState={chipState}
        open={panelOpen}
        onClick={handleChipClick}
        stepCount={stepCount}
        shape={derivation.shape}
      />
    ) : (
      <GhostChip
        chipState={chipState}
        open={panelOpen}
        onClick={handleChipClick}
      />
    )

  return (
    <div className={`air air--${direction}`}>
      {/* Response */}
      <div className="air__response">
        {scenario.response}
      </div>

      {/* Chip */}
      <div className="air__chip-wrap">{chip}</div>

      {/* Derivation panel */}
      <div className="air__panel" aria-hidden={!panelOpen ? 'true' : undefined}>
        {/* Shape header */}
        <div className="air__panel-head">
          {direction === 'trace' && (
            <span className="air__shape-icon" aria-hidden="true">
              <ProjectDiagram size={12} />
            </span>
          )}
          <span className="air__shape-label">{derivation.shape}</span>
          {(direction === 'ledger' || direction === 'panel' || direction === 'iterative') && (
            <>
              <span className="air__shape-sep">·</span>
              <span className="air__shape-count">{stepCount} steps</span>
            </>
          )}
        </div>

        {/* Steps */}
        <ol className="air__steps">
          {derivation.steps.map((step, i) => {
            const isInference = step.source === null
            const num = String(i + 1).padStart(2, '0')

            // Workbench directions (D — Panel, E — Inline, F — Iterative)
            if (isWorkbench) {
              return (
                <li key={i} className="air__step">
                  <span className="air__step-num">{num}</span>
                  <div className="air__step-body">
                    <span className="air__step-text">{step.text}</span>
                    {direction === 'iterative' ? (
                      <IterativeSource
                        source={step.source}
                        subPath={step.subPath}
                        lastUpdated={step.lastUpdated}
                      />
                    ) : (
                      <WorkbenchSource source={step.source} subPath={step.subPath} />
                    )}
                  </div>
                </li>
              )
            }

            if (direction === 'ledger') {
              return (
                <li key={i} className="air__step">
                  <span className="air__step-num">{num}</span>
                  <div className="air__step-body">
                    <span className="air__step-text">{step.text}</span>
                    <LedgerSource source={step.source} subPath={step.subPath} />
                  </div>
                </li>
              )
            }

            if (direction === 'trace') {
              return (
                <li
                  key={i}
                  className={`air__step ${isInference ? 'air__step--inference' : ''}`}
                >
                  <span className="air__step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="air__step-body">
                    <span className="air__step-text">{step.text}</span>
                    <TraceBadge source={step.source} subPath={step.subPath} />
                  </div>
                </li>
              )
            }

            // ghost
            return (
              <li key={i} className="air__step">
                <div className="air__step-main">
                  <span className="air__step-num" aria-hidden="true">{num}</span>
                  <span className="air__step-text">{step.text}</span>
                </div>
                <GhostDot source={step.source} />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

// ─── Story wrapper ────────────────────────────────────────────────────────────

function DirectionCanvas({ direction }: { direction: Direction }) {
  return (
    <div className="arc-canvas">
      <div className="arc-demo">
        {SCENARIOS.map(scenario => (
          <div key={scenario.id} className="arc-demo__group">
            <p className="arc-demo__label">{scenario.label}</p>
            <AIResponseCard scenario={scenario} direction={direction} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title:     'ai-interactions/Trace Reasoning',
  parameters: {
    layout: 'fullscreen',
    docs:   { story: { height: '100vh' } },
  },
}

export default meta

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Direction A — Ledger
 *
 * Audit-grade. The derivation panel looks like a primary document.
 * Sources are plain text only — no color, no badge. The chip is a bordered
 * rectangle, not a pill. Step numbers are two-digit monospaced indices.
 *
 * What you trade: warmth and recognition for maximum information density
 * and institutional trust signal.
 */
export const Ledger: StoryObj = {
  name:   'A — Ledger',
  render: () => <DirectionCanvas direction="ledger" />,
}

/**
 * Direction B — Trace
 *
 * Process-visible. Colored brand pills make provenance instant without
 * reading the text. The chip animates with a shimmer while the derivation
 * is generated, then settles. Steps share a left spine — the reasoning is
 * a chain, not a list.
 *
 * What you trade: higher visual weight. The source pills compete slightly
 * with the step text. Right choice if trust needs to be built explicitly.
 */
export const Trace: StoryObj = {
  name:   'B — Trace',
  render: () => <DirectionCanvas direction="trace" />,
}

/**
 * Direction C — Ghost
 *
 * Zero ceremony. The chip is inline text — "· see reasoning" — with a
 * chevron. The panel is a left-rule indent block, no surface. Sources are
 * brand-colored dots in a right column with no text label.
 *
 * What you trade: the dots require the user to already know which color
 * belongs to which tool. Correct if operators will use this daily and
 * build that recognition fast.
 */
export const Ghost: StoryObj = {
  name:   'C — Ghost',
  render: () => <DirectionCanvas direction="ghost" />,
}

/**
 * Direction D — Panel
 *
 * Grounded in the Opportunity Workbench vocabulary.
 * Chip: neutral-bordered, no fill — matches "Tech validation" / "Active POV".
 * Opening it reveals a panel below: hairline top border, bold sentence-case
 * header (shape name + step count), then the numbered step list.
 * Source block: real platform logo (18 × 18 px, 4 px radius) with tool name
 * bold-primary above, sub-path tertiary below. No introduced colour.
 * Inference step: empty source slot — no glyph, no placeholder.
 * If a workbench element dropped into this panel, it would look at home.
 */
export const Panel: StoryObj = {
  name:   'D — Panel',
  render: () => <DirectionCanvas direction="panel" />,
}

/**
 * Direction F — Iterative
 *
 * Starting point: identical to D — Panel. Will diverge through iteration.
 */
export const Iterative: StoryObj = {
  name:   'F — Iterative',
  render: () => <DirectionCanvas direction="iterative" />,
}

/**
 * Direction E — Inline
 *
 * Now mirrors F — Iterative exactly.
 */
export const Inline: StoryObj = {
  name:   'E — Inline',
  render: () => <DirectionCanvas direction="iterative" />,
}
