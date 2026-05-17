/**
 * ai-interactions/Trace Reasoning — Icon Exploration
 *
 * Reference table mapping each reasoning operation to 5 candidate icons
 * from the @ds/icons collection. Use this to pick the right glyph when
 * surfacing step-type metadata in the derivation panel.
 *
 * Operations (from the Trace Reasoning verb taxonomy):
 *   Sourcing | Quantifying | Comparing | Pattern detection | Linking
 *   Validating | Falsifying | Methodology choice | Interpretive leap
 */
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  Search,
  Source,
  FileSearch,
  Location,
  Download,
  Abacus,
  ChartBar,
  Analytics,
  Percentage,
  TachometerAlt,
  ChartLine,
  DataDonut,
  FileChartLine,
  DashboardGauge,
  TachometerAltFast,
  Exchange,
  Columns,
  ArrowsDouble,
  Merge,
  ClipboardListCheck,
  Table,
  LayerGroup,
  ChartMixed,
  ToggleOff,
  CheckDouble,
  Eye,
  Scanning,
  Flag,
  Signal,
  Waveform,
  Fingerprint,
  HeartRate,
  MonitorHeartRate,
  BroadcastTower,
  ChartNetwork,
  ProjectDiagram,
  NetworkWired,
  Sitemap,
  Link,
  Check,
  CircleCheck,
  Shield,
  ClipboardCheck,
  Certificate,
  Ban,
  Close,
  MinusCircle,
  DoNotEnter,
  Unlink,
  Settings,
  Sliders,
  Filter,
  Cogs,
  Sort,
  MapSigns,
  Gavel,
  Wrench,
  Function,
  Tasks,
  Lightbulb,
  ChessKnight,
  Analyze,
  Insights,
  AtomAlt,
} from '@ds/icons'
import './icon-exploration.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Operation {
  name: string
  verbs: string
  when: string
  icons: { icon: React.ElementType; name: string }[]
  finalized: { icon: React.ElementType; name: string }
}

const OPERATIONS: Operation[] = [
  {
    name:      'Sourcing',
    verbs:     'Identified, Surfaced, Pulled, Located',
    when:      'First-touch extraction of a specific signal',
    finalized: { icon: FileSearch, name: 'FileSearch' },
    icons: [
      { icon: Search,     name: 'Search' },
      { icon: Source,     name: 'Source' },
      { icon: FileSearch, name: 'FileSearch' },
      { icon: Location,   name: 'Location' },
      { icon: Download,   name: 'Download' },
    ],
  },
  {
    name:      'Quantifying',
    verbs:     'Calculated, Measured, Sized, Quantified',
    when:      'A number was produced',
    finalized: { icon: DataDonut, name: 'DataDonut' },
    icons: [
      { icon: Abacus,            name: 'Abacus' },
      { icon: ChartBar,          name: 'ChartBar' },
      { icon: Analytics,         name: 'Analytics' },
      { icon: Percentage,        name: 'Percentage' },
      { icon: TachometerAlt,     name: 'TachometerAlt' },
      { icon: ChartLine,         name: 'ChartLine' },
      { icon: DataDonut,         name: 'DataDonut' },
      { icon: FileChartLine,     name: 'FileChartLine' },
      { icon: DashboardGauge,    name: 'DashboardGauge' },
      { icon: TachometerAltFast, name: 'TachometerAltFast' },
    ],
  },
  {
    name:      'Comparing',
    verbs:     'Compared, Benchmarked, Cross-referenced, Reconciled',
    when:      'Two or more things placed against each other',
    finalized: { icon: Table, name: 'Table' },
    icons: [
      { icon: Exchange,           name: 'Exchange' },
      { icon: Columns,            name: 'Columns' },
      { icon: ArrowsDouble,       name: 'ArrowsDouble' },
      { icon: Merge,              name: 'Merge' },
      { icon: ClipboardListCheck, name: 'ClipboardListCheck' },
      { icon: Table,              name: 'Table' },
      { icon: LayerGroup,         name: 'LayerGroup' },
      { icon: ChartMixed,         name: 'ChartMixed' },
      { icon: ToggleOff,          name: 'ToggleOff' },
      { icon: CheckDouble,        name: 'CheckDouble' },
    ],
  },
  {
    name:      'Pattern detection',
    verbs:     'Detected, Traced, Flagged',
    when:      'Recurring or anomalous signal found',
    finalized: { icon: Scanning, name: 'Scanning' },
    icons: [
      { icon: Eye,              name: 'Eye' },
      { icon: Scanning,         name: 'Scanning' },
      { icon: Flag,             name: 'Flag' },
      { icon: Signal,           name: 'Signal' },
      { icon: Waveform,         name: 'Waveform' },
      { icon: Fingerprint,      name: 'Fingerprint' },
      { icon: HeartRate,        name: 'HeartRate' },
      { icon: MonitorHeartRate, name: 'MonitorHeartRate' },
      { icon: BroadcastTower,   name: 'BroadcastTower' },
      { icon: ChartLine,        name: 'ChartLine' },
    ],
  },
  {
    name:      'Linking',
    verbs:     'Linked, Attributed, Tied, Connected',
    when:      'Causal or correlational claim',
    finalized: { icon: Sitemap, name: 'Sitemap' },
    icons: [
      { icon: Link,           name: 'Link' },
      { icon: ChartNetwork,   name: 'ChartNetwork' },
      { icon: ProjectDiagram, name: 'ProjectDiagram' },
      { icon: NetworkWired,   name: 'NetworkWired' },
      { icon: Sitemap,        name: 'Sitemap' },
    ],
  },
  {
    name:      'Validating',
    verbs:     'Confirmed, Verified, Corroborated',
    when:      'Hypothesis supported by evidence',
    finalized: { icon: ClipboardCheck, name: 'ClipboardCheck' },
    icons: [
      { icon: Check,          name: 'Check' },
      { icon: CircleCheck,    name: 'CircleCheck' },
      { icon: Shield,         name: 'Shield' },
      { icon: ClipboardCheck, name: 'ClipboardCheck' },
      { icon: Certificate,    name: 'Certificate' },
    ],
  },
  {
    name:      'Falsifying',
    verbs:     'Ruled out, Discounted, Found no evidence of',
    when:      'Hypothesis rejected — the negative-finding move',
    finalized: { icon: DoNotEnter, name: 'DoNotEnter' },
    icons: [
      { icon: Ban,         name: 'Ban' },
      { icon: Close,       name: 'Close' },
      { icon: MinusCircle, name: 'MinusCircle' },
      { icon: DoNotEnter,  name: 'DoNotEnter' },
      { icon: Unlink,      name: 'Unlink' },
    ],
  },
  {
    name:      'Methodology choice',
    verbs:     'Prioritized, Weighted, Excluded',
    when:      'Surfaces a non-obvious analytical decision',
    finalized: { icon: Sliders, name: 'Sliders' },
    icons: [
      { icon: Settings, name: 'Settings' },
      { icon: Sliders,  name: 'Sliders' },
      { icon: Filter,   name: 'Filter' },
      { icon: Cogs,     name: 'Cogs' },
      { icon: Sort,     name: 'Sort' },
      { icon: MapSigns, name: 'MapSigns' },
      { icon: Gavel,    name: 'Gavel' },
      { icon: Wrench,   name: 'Wrench' },
      { icon: Function, name: 'Function' },
      { icon: Tasks,    name: 'Tasks' },
    ],
  },
  {
    name:      'Interpretive leap',
    verbs:     'Inferred, Assessed, Concluded, Estimated',
    when:      'The contestable step where evidence becomes claim',
    finalized: { icon: Lightbulb, name: 'Lightbulb' },
    icons: [
      { icon: Lightbulb,   name: 'Lightbulb' },
      { icon: ChessKnight, name: 'ChessKnight' },
      { icon: Analyze,     name: 'Analyze' },
      { icon: Insights,    name: 'Insights' },
      { icon: AtomAlt,     name: 'AtomAlt' },
    ],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

function IconExploration() {
  return (
    <div className="ie-canvas">
      <table className="ie-table">
        <colgroup>
          <col className="ie-col-op" />
          <col className="ie-col-options" />
          <col className="ie-col-verbs" />
          <col className="ie-col-when" />
          <col className="ie-col-final" />
        </colgroup>
        <thead>
          <tr>
            <th><div className="ie-th-inner">Operation</div></th>
            <th><div className="ie-th-inner">Options</div></th>
            <th><div className="ie-th-inner">Verbs</div></th>
            <th><div className="ie-th-inner">When to use</div></th>
            <th><div className="ie-th-inner">Finalized</div></th>
          </tr>
        </thead>
        <tbody>
          {OPERATIONS.map(op => (
            <tr key={op.name}>
              {/* Operation name */}
              <td className="ie-op">
                <div className="ie-op-name">{op.name}</div>
              </td>

              {/* Icon candidates */}
              <td>
                <div className="ie-icons">
                  {op.icons.map(({ icon: Icon, name }) => (
                    <div key={name} className="ie-icon">
                      <div className="ie-icon__glyph">
                        <Icon size={16} />
                      </div>
                      <span className="ie-icon__name">{name}</span>
                    </div>
                  ))}
                </div>
              </td>

              {/* Verbs */}
              <td className="ie-verbs">{op.verbs}</td>

              {/* When to use */}
              <td className="ie-when">{op.when}</td>

              {/* Finalized pick */}
              <td className="ie-final">
                {(() => {
                  const { icon: Icon, name } = op.finalized
                  return (
                    <div className="ie-icon">
                      <div className="ie-icon__glyph">
                        <Icon size={16} />
                      </div>
                      <span className="ie-icon__name">{name}</span>
                    </div>
                  )
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title:      'ai-interactions/Trace Reasoning',
  parameters: { layout: 'fullscreen' },
}

export default meta

// ─── Story ────────────────────────────────────────────────────────────────────

export const IconExplorationStory: StoryObj = {
  name:   'Icon Exploration',
  render: () => <IconExploration />,
}
