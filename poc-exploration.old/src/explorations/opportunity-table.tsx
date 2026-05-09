/**
 * opportunity-table
 *
 * Sales pipeline opportunity table exploration.
 * Imports real @ds/* components — token compliance enforced by the compiler.
 *
 * Layout: search bar → active filter chips → filter chip row → table → pagination
 */

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@ds/button'
import { Tags } from '@ds/tags'
import './opportunity-table.css'

// ─── Types ───────────────────────────────────────────────────────────────────

type RowTagColor = 'grey' | 'green' | 'orange' | 'red' | 'cobalt' | 'slate'

interface OpportunityRow {
  id: string
  type: 'renewal' | 'net new' | 'upsell'
  quoteId: string
  oppName: string
  account: string
  products: string
  value: string
  forecast: { label: string; color: RowTagColor }
  stage: string
  risks: { label: string; color: RowTagColor }
  health: { label: string; color: RowTagColor }
  closeDate: string
  lastActivity: string
  staleActivity: boolean
}

interface FlyoutOption {
  label: string
  selected: boolean
}

interface FilterChip {
  id: string
  label: string
  options: FlyoutOption[]
  active: boolean
}

// ─── Data ────────────────────────────────────────────────────────────────────

const ROWS: OpportunityRow[] = [
  {
    id: '1', type: 'renewal', quoteId: 'Q-0307',
    oppName: 'Prisma Access annual renewal with global bandwidth upgrade',
    account: 'Titan Energy Solutions', products: 'Prisma Access · GlobalProtect',
    value: '$1.2M',
    forecast: { label: 'commit', color: 'green' }, stage: 'stage 5',
    risks: { label: '0 risks', color: 'grey' }, health: { label: 'healthy', color: 'green' },
    closeDate: 'mar 7', lastActivity: '2 days ago', staleActivity: false,
  },
  {
    id: '2', type: 'net new', quoteId: 'Q-0891',
    oppName: 'Cortex XDR enterprise deployment for distributed workforce',
    account: 'Meridian Capital Group', products: 'Cortex XDR · Cortex XSOAR · +1',
    value: '$2.4M',
    forecast: { label: 'commit', color: 'green' }, stage: 'stage 4',
    risks: { label: '2 risks', color: 'grey' }, health: { label: 'healthy', color: 'green' },
    closeDate: 'mar 14', lastActivity: '1 day ago', staleActivity: false,
  },
  {
    id: '3', type: 'upsell', quoteId: 'Q-0734',
    oppName: 'Strata Cloud Manager upgrade with advanced threat prevention',
    account: 'Nexus Financial Holdings', products: 'Strata Cloud Manager · AIOps for NGFW',
    value: '$890K',
    forecast: { label: 'best case', color: 'cobalt' }, stage: 'stage 3',
    risks: { label: '1 risk', color: 'grey' }, health: { label: 'healthy', color: 'green' },
    closeDate: 'mar 18', lastActivity: '3 days ago', staleActivity: false,
  },
  {
    id: '4', type: 'renewal', quoteId: 'Q-0622',
    oppName: 'Annual Prisma Access license renewal — full global employee base',
    account: 'Vertex Manufacturing Co.', products: 'Prisma Access · Prisma SD-WAN · +2',
    value: '$3.1M',
    forecast: { label: 'commit', color: 'green' }, stage: 'stage 5',
    risks: { label: '4 risks', color: 'orange' }, health: { label: 'critical', color: 'red' },
    closeDate: 'mar 21', lastActivity: '9 days ago', staleActivity: true,
  },
  {
    id: '5', type: 'upsell', quoteId: 'Q-0855',
    oppName: 'Cortex XDR additional endpoint coverage expansion',
    account: 'Pacific Commerce Bank', products: 'Cortex XDR · WildFire',
    value: '$670K',
    forecast: { label: 'best case', color: 'cobalt' }, stage: 'stage 2',
    risks: { label: '6 risks', color: 'orange' }, health: { label: 'critical', color: 'red' },
    closeDate: 'mar 28', lastActivity: '12 days ago', staleActivity: true,
  },
  {
    id: '6', type: 'net new', quoteId: 'Q-0956',
    oppName: 'Cortex XSOAR automation platform initial deployment',
    account: 'Axiom Technology Partners', products: 'Cortex XSOAR · XPANSE',
    value: '$1.7M',
    forecast: { label: 'pipeline', color: 'grey' }, stage: 'stage 2',
    risks: { label: '0 risks', color: 'grey' }, health: { label: 'healthy', color: 'green' },
    closeDate: 'apr 2', lastActivity: 'today', staleActivity: false,
  },
  {
    id: '7', type: 'upsell', quoteId: 'Q-0481',
    oppName: 'WildFire advanced malware protection add-on for all endpoints',
    account: 'Summit Healthcare Systems', products: 'WildFire · Cortex XDR',
    value: '$445K',
    forecast: { label: 'best case', color: 'cobalt' }, stage: 'stage 3',
    risks: { label: '5 risks', color: 'orange' }, health: { label: 'at risk', color: 'orange' },
    closeDate: 'apr 8', lastActivity: '5 days ago', staleActivity: false,
  },
  {
    id: '8', type: 'net new', quoteId: 'Q-1012',
    oppName: 'Prisma Cloud enterprise security platform for cloud migration program',
    account: 'Harbor Logistics Group', products: 'Prisma Cloud · Prisma Access · +3',
    value: '$5.2M',
    forecast: { label: 'pipeline', color: 'grey' }, stage: 'stage 1',
    risks: { label: '3 risks', color: 'grey' }, health: { label: 'at risk', color: 'orange' },
    closeDate: 'apr 15', lastActivity: '7 days ago', staleActivity: true,
  },
]

const typeTagColor: Record<string, RowTagColor> = {
  renewal: 'grey',
  'net new': 'green',
  upsell: 'orange',
}

// ─── Filter chips ─────────────────────────────────────────────────────────────

const INITIAL_FILTERS: FilterChip[] = [
  { id: 'tags', label: 'tags', active: false, options: [
    { label: 'named account', selected: false },
    { label: 'strategic', selected: false },
    { label: 'federal', selected: false },
  ]},
  { id: 'quarter', label: 'quarter', active: true, options: [
    { label: 'Q1 FY26', selected: false },
    { label: 'Q2 FY26', selected: true },
    { label: 'Q3 FY26', selected: false },
    { label: 'Q4 FY26', selected: false },
  ]},
  { id: 'type', label: 'type', active: false, options: [
    { label: 'net new', selected: false },
    { label: 'upsell', selected: false },
    { label: 'renewal', selected: false },
  ]},
  { id: 'forecast', label: 'forecast', active: true, options: [
    { label: 'commit', selected: true },
    { label: 'best case', selected: false },
    { label: 'pipeline', selected: false },
    { label: 'closed', selected: false },
    { label: 'closed lost', selected: false },
  ]},
  { id: 'stage', label: 'stage', active: false, options: [
    { label: 'stage 1', selected: false },
    { label: 'stage 2', selected: false },
    { label: 'stage 3', selected: false },
    { label: 'stage 4', selected: false },
    { label: 'stage 5', selected: false },
  ]},
  { id: 'deal size', label: 'deal size', active: false, options: [
    { label: 'under $100K', selected: false },
    { label: '$100K – $500K', selected: false },
    { label: '$500K – $1M', selected: false },
    { label: 'over $1M', selected: false },
  ]},
  { id: 'risk factors', label: 'risk factors', active: false, options: [
    { label: 'none', selected: false },
    { label: '1–3 risks', selected: false },
    { label: '4 or more', selected: false },
  ]},
  { id: 'health', label: 'health', active: true, options: [
    { label: 'healthy', selected: false },
    { label: 'at risk', selected: true },
    { label: 'critical', selected: true },
  ]},
]

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FlyoutPanelProps {
  filter: FilterChip
  onClose: () => void
  onApply: (filterId: string, options: FlyoutOption[]) => void
}

function FlyoutPanel({ filter, onClose, onApply }: FlyoutPanelProps) {
  const [local, setLocal] = useState<FlyoutOption[]>(
    filter.options.map(o => ({ ...o }))
  )
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const toggle = (idx: number) => {
    setLocal(prev => prev.map((o, i) => i === idx ? { ...o, selected: !o.selected } : o))
  }

  // Divider between pipeline/best case and closed states (forecast filter)
  const hasDividerAfter = filter.id === 'forecast' ? [2] : []

  return (
    <div
      ref={ref}
      className="panw--flyout"
      style={{ display: 'block', top: '100%', left: 0, marginTop: 4, minWidth: 200, maxWidth: 320 }}
    >
      <div className="panw--flyout__list">
        {local.map((opt, idx) => (
          <React.Fragment key={opt.label}>
            <div
              className={`panw--flyout__item${opt.selected ? ' panw--flyout__item--selected' : ''}`}
              onClick={() => toggle(idx)}
              role="checkbox"
              aria-checked={opt.selected}
            >
              <span className="panw--flyout__item-checkbox">
                {opt.selected ? (
                  <svg viewBox="0 0 16 16" fill="none" width={16} height={16}>
                    <rect x="2.5" y="2.5" width="11" height="11" rx="2" fill="currentColor"/>
                    <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none" width={16} height={16}>
                    <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.25"/>
                  </svg>
                )}
              </span>
              <span className="panw--flyout__item-label">{opt.label}</span>
            </div>
            {hasDividerAfter.includes(idx) && (
              <div className="panw--flyout__divider" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="panw--flyout__footer">
        <Button
          kind="ghost"
          size="small"
          onClick={() => setLocal(filter.options.map(o => ({ ...o, selected: false })))}
        >
          reset
        </Button>
        <Button
          kind="primary"
          size="small"
          onClick={() => { onApply(filter.id, local); onClose() }}
        >
          apply
        </Button>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function OpportunityTable() {
  const [filters, setFilters] = useState<FilterChip[]>(INITIAL_FILTERS)
  const [openFlyout, setOpenFlyout] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState('')

  const activeFilterChips = filters
    .filter(f => f.active)
    .map(f => {
      const selected = f.options.filter(o => o.selected).map(o => o.label)
      return { id: f.id, label: selected.length > 0 ? `${f.label}: ${selected.join(', ')}` : f.label }
    })

  const removeFilter = (filterId: string) => {
    setFilters(prev => prev.map(f =>
      f.id === filterId
        ? { ...f, active: false, options: f.options.map(o => ({ ...o, selected: false })) }
        : f
    ))
  }

  const clearAll = () => {
    setFilters(prev => prev.map(f => ({
      ...f, active: false, options: f.options.map(o => ({ ...o, selected: false }))
    })))
  }

  const handleApply = (filterId: string, options: FlyoutOption[]) => {
    setFilters(prev => prev.map(f =>
      f.id === filterId
        ? { ...f, options, active: options.some(o => o.selected) }
        : f
    ))
  }

  const closeFlyout = useCallback(() => setOpenFlyout(null), [])

  return (
    <div className="opp-page">
      {/* ── Search + active chips ─────────────────────────────────────────── */}
      <div className="panw--search panw--search--md opp-search-bar">
        <span className="panw--search__icon">
          <svg viewBox="0 0 16 16" fill="none" width={16} height={16}>
            <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.25"/>
            <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
          </svg>
        </span>
        <input
          className="panw--search__input"
          type="text"
          placeholder="account, quote id, contact, product…"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        {activeFilterChips.length > 0 && (
          <>
            <div className="opp-search-sep" />
            <div className="opp-active-chips">
              {activeFilterChips.map(chip => (
                <button
                  key={chip.id}
                  className="panw--chip panw--chip--active panw--chip--small"
                  onClick={() => removeFilter(chip.id)}
                >
                  <span className="panw--chip__label">{chip.label}</span>
                  <span className="panw--chip__close" aria-label={`remove ${chip.label} filter`}>
                    <svg viewBox="0 0 12 12" fill="none" width={12} height={12}>
                      <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
              ))}
              <button className="opp-clear-all" onClick={clearAll}>clear all</button>
            </div>
          </>
        )}
      </div>

      {/* ── Filter chip row ───────────────────────────────────────────────── */}
      <div className="opp-filter-row">
        <span className="opp-counts">47 deals · $12.4M ARR</span>
        <div className="opp-filter-sep" />

        {filters.map(filter => (
          <div key={filter.id} className="opp-filter-chip-wrapper">
            <button
              className={`panw--chip panw--chip--small${filter.active ? ' panw--chip--active' : ''}`}
              onClick={() => setOpenFlyout(prev => prev === filter.id ? null : filter.id)}
              aria-expanded={openFlyout === filter.id}
            >
              <span className="panw--chip__label">{filter.label}</span>
              <span className="panw--chip__dropdown-icon">
                <svg viewBox="0 0 12 12" fill="none" width={12} height={12}>
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            {openFlyout === filter.id && (
              <FlyoutPanel filter={filter} onClose={closeFlyout} onApply={handleApply} />
            )}
          </div>
        ))}

        <button className="opp-sort-btn" style={{ marginLeft: 'auto' }}>
          sort: close date
          <svg viewBox="0 0 12 12" fill="none" width={12} height={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 4 }}>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className="opp-table-shell">
        <table className="opp-table">
          <colgroup>
            <col className="opp-c-type" />
            <col className="opp-c-quote" />
            <col className="opp-c-opp" />
            <col className="opp-c-value" />
            <col className="opp-c-pipeline" />
            <col className="opp-c-challenges" />
            <col className="opp-c-date" />
            <col className="opp-c-activity" />
            <col className="opp-c-actions" />
          </colgroup>
          <thead>
            <tr>
              <th>type</th>
              <th>quote id</th>
              <th className="opp-sortable">opportunity</th>
              <th className="opp-sortable">value</th>
              <th>pipeline</th>
              <th>challenges</th>
              <th className="opp-sortable opp-sorted">
                close date <span className="opp-sort-indicator">↑</span>
              </th>
              <th className="opp-sortable">last activity</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {ROWS.map(row => (
              <OppRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Footer / pagination ───────────────────────────────────────────── */}
      <div className="opp-table-footer">
        <nav className="panw--pagination">
          <span className="panw--pagination__items-per-page-label">showing 1–8 of 47 deals</span>
          <div className="panw--pagination__page-numbers">
            <Button kind="ghost" size="small" disabled aria-label="previous page">←</Button>
            <Button kind="ghost" size="small" className="opp-pg-current" aria-current="page">1</Button>
            <Button kind="ghost" size="small">2</Button>
            <Button kind="ghost" size="small">3</Button>
            <span className="panw--pagination__ellipsis" aria-hidden="true">…</span>
            <Button kind="ghost" size="small">6</Button>
            <Button kind="ghost" size="small" aria-label="next page">→</Button>
          </div>
        </nav>
      </div>
    </div>
  )
}

// ─── Row sub-component ────────────────────────────────────────────────────────

function OppRow({ row }: { row: OpportunityRow }) {
  const [hovered, setHovered] = useState(false)

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td>
        <Tags color={typeTagColor[row.type]} contrast="low" label={row.type} />
      </td>
      <td>
        <span className="opp-cell-quote">{row.quoteId}</span>
      </td>
      <td className="opp-td-opp">
        <div className="opp-opp-name">{row.oppName}</div>
        <div className="opp-opp-account">{row.account}</div>
        <div className="opp-opp-products">{row.products}</div>
      </td>
      <td>
        <span className="opp-cell-value">{row.value}</span>
      </td>
      <td>
        <div className="opp-tag-pair">
          <Tags color={row.forecast.color} contrast="low" label={row.forecast.label} />
          <Tags color="grey" contrast="low" label={row.stage} />
        </div>
      </td>
      <td>
        <div className="opp-tag-pair">
          <Tags color={row.risks.color} contrast="low" label={row.risks.label} />
          <Tags color={row.health.color} contrast="low" label={row.health.label} />
        </div>
      </td>
      <td>
        <span className="opp-cell-date">{row.closeDate}</span>
      </td>
      <td>
        <span className={`opp-cell-activity${row.staleActivity ? ' opp-cell-activity--stale' : ''}`}>
          {row.lastActivity}
        </span>
      </td>
      <td>
        <div className={`opp-actions-cell${hovered ? ' opp-actions-cell--visible' : ''}`}>
          <Button kind="secondary" size="small">AI</Button>
          <Button kind="secondary" size="small">view</Button>
        </div>
      </td>
    </tr>
  )
}
