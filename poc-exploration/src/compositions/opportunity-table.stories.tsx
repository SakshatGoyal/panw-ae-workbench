/**
 * AE Opportunity Table — sales pipeline composition
 *
 * Column structure (left → right):
 *   opportunity (name + account)
 *   products (neutral tags, one per product)
 *   logistics (quote id + type + stage + forecast + closes-date + last-activity)
 *   challenges (risks + health)
 *   value (rightmost, 18px semibold — no Stage token at 18px; documented gap)
 *   actions (icon buttons, reveal on hover)
 *
 * Sort: opportunity + value sortable on column header click. Sort button in
 * the search row opens a single-select Flyout with a wider sort vocabulary
 * (value, opportunity name, close date, last active, deal stage, opportunity
 * type, stage, account health, risk factor count).
 *
 * Tags filter: parent categories of every tag rendered in the table.
 * Product filter: tree-with-checkboxes — every node has a checkbox, parent
 *   state is derived from children (checked / unchecked / indeterminate),
 *   toggling a parent cascades to its leaves. Hand-rolled because @ds/filter
 *   is flat-only.
 *
 * Tag conventions:
 *   shape="rounded", size="large" (= 4px chip-tier radius)
 *   color="neutral", contrast="low"
 *
 * Row interaction matches @ds/cells-standard:
 *   rest      — alternate surface.rest / surface.alt.rest (zebra)
 *   hover     — ghost.hover (alpha-tint, composites over rest fill)
 *   pressed   — ghost.pressed
 *
 * Icons: imported from @ds/icons per stage-components.md ("reach for this
 * any time you'd import from lucide-react").
 *
 * Shell: no border, no background — composition lives inside a parent card.
 *
 * IACVT workaround for flyout tokens at the bottom of LAYOUT_CSS.
 *
 * System gaps surfaced (not patched in composition):
 *   • No 18px body/heading token — value cell uses inline 18px.
 *   • No tree variant of Filter — product filter built from primitives.
 *   • Pagination/Dropdown has no placement="top" prop — CSS workaround.
 *   • No Toolbar primitive for the search/filter rows.
 */

import type { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useRef, useState } from 'react'
import {
  Calendar, Stars, Eye, ChevronDown, ChevronUp, ChevronRight, Folder,
} from '@ds/icons'
import { Search } from '@ds/search'
import { Filter, type FilterOption } from '@ds/filter'
import { Header } from '@ds/header'
import { CellContents } from '@ds/cell-contents'
import { Pagination } from '@ds/pagination'
import { Button, IconButton } from '@ds/button'
import { Tags } from '@ds/tags'
import { Checkbox } from '@ds/checkbox'
import {
  Flyout,
  FlyoutFilter,
  FlyoutList,
  FlyoutItem,
  FlyoutFooter,
} from '@ds/flyout'

// ─── Types ───────────────────────────────────────────────────────────────────

interface OpportunityRow {
  id: string
  type: 'renewal' | 'net new' | 'upsell'
  quoteId: string
  oppName: string
  account: string
  products: string[]
  value: string
  forecast: string
  stage: string
  risks: string
  health: string
  closeDate: string
  lastActivity: string
}

interface FacetDef {
  id: string
  label: string
  options: FilterOption[]
}

type SortKey =
  | 'value' | 'oppName' | 'closeDate' | 'lastActive' | 'dealStage'
  | 'oppType' | 'stage' | 'health' | 'riskCount'
type SortDir = 'asc' | 'desc'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'value', label: 'value' },
  { key: 'oppName', label: 'opportunity name' },
  { key: 'closeDate', label: 'close date' },
  { key: 'lastActive', label: 'last active' },
  { key: 'dealStage', label: 'deal stage' },
  { key: 'oppType', label: 'opportunity type' },
  { key: 'stage', label: 'stage' },
  { key: 'health', label: 'account health' },
  { key: 'riskCount', label: 'risk factor count' },
]

// ─── Data ────────────────────────────────────────────────────────────────────

const ROWS: OpportunityRow[] = [
  { id: '1', type: 'renewal', quoteId: 'Q-0307',
    oppName: 'Prisma Access annual renewal with global bandwidth upgrade',
    account: 'Titan Energy Solutions',
    products: ['Prisma Access', 'GlobalProtect'],
    value: '$1.2M', forecast: 'commit', stage: 'stage 5',
    risks: '0 risks', health: 'healthy',
    closeDate: 'mar 7', lastActivity: '2 days ago' },
  { id: '2', type: 'net new', quoteId: 'Q-0891',
    oppName: 'Cortex XDR enterprise deployment for distributed workforce',
    account: 'Meridian Capital Group',
    products: ['Cortex XDR', 'Cortex XSOAR', '+1'],
    value: '$2.4M', forecast: 'commit', stage: 'stage 4',
    risks: '2 risks', health: 'healthy',
    closeDate: 'mar 14', lastActivity: '1 day ago' },
  { id: '3', type: 'upsell', quoteId: 'Q-0734',
    oppName: 'Strata Cloud Manager upgrade with advanced threat prevention',
    account: 'Nexus Financial Holdings',
    products: ['Strata Cloud Manager', 'AIOps for NGFW'],
    value: '$890K', forecast: 'best case', stage: 'stage 3',
    risks: '1 risk', health: 'healthy',
    closeDate: 'mar 18', lastActivity: '3 days ago' },
  { id: '4', type: 'renewal', quoteId: 'Q-0622',
    oppName: 'Annual Prisma Access license renewal — full global employee base',
    account: 'Vertex Manufacturing Co.',
    products: ['Prisma Access', 'Prisma SD-WAN', '+2'],
    value: '$3.1M', forecast: 'commit', stage: 'stage 5',
    risks: '4 risks', health: 'critical',
    closeDate: 'mar 21', lastActivity: '9 days ago' },
  { id: '5', type: 'upsell', quoteId: 'Q-0855',
    oppName: 'Cortex XDR additional endpoint coverage expansion',
    account: 'Pacific Commerce Bank',
    products: ['Cortex XDR', 'WildFire'],
    value: '$670K', forecast: 'best case', stage: 'stage 2',
    risks: '6 risks', health: 'critical',
    closeDate: 'mar 28', lastActivity: '12 days ago' },
  { id: '6', type: 'net new', quoteId: 'Q-0956',
    oppName: 'Cortex XSOAR automation platform initial deployment',
    account: 'Axiom Technology Partners',
    products: ['Cortex XSOAR', 'XPANSE'],
    value: '$1.7M', forecast: 'pipeline', stage: 'stage 2',
    risks: '0 risks', health: 'healthy',
    closeDate: 'apr 2', lastActivity: 'today' },
  { id: '7', type: 'upsell', quoteId: 'Q-0481',
    oppName: 'WildFire advanced malware protection add-on for all endpoints',
    account: 'Summit Healthcare Systems',
    products: ['WildFire', 'Cortex XDR'],
    value: '$445K', forecast: 'best case', stage: 'stage 3',
    risks: '5 risks', health: 'at risk',
    closeDate: 'apr 8', lastActivity: '5 days ago' },
  { id: '8', type: 'net new', quoteId: 'Q-1012',
    oppName: 'Prisma Cloud enterprise security platform for cloud migration program',
    account: 'Harbor Logistics Group',
    products: ['Prisma Cloud', 'Prisma Access', '+3'],
    value: '$5.2M', forecast: 'pipeline', stage: 'stage 1',
    risks: '3 risks', health: 'at risk',
    closeDate: 'apr 15', lastActivity: '7 days ago' },
]

// ─── Facet definitions ───────────────────────────────────────────────────────

const FACETS: FacetDef[] = [
  { id: 'tags', label: 'tags', options: [
    { value: 'opp-type', label: 'opportunity type' },
    { value: 'opp-stage', label: 'opportunity stage' },
    { value: 'forecast', label: 'forecast' },
    { value: 'last-activity', label: 'last activity' },
    { value: 'close-date', label: 'close date' },
    { value: 'risk-factors', label: 'risk factors' },
    { value: 'account-health', label: 'account health' },
  ]},
  { id: 'quarter', label: 'quarter', options: [
    { value: 'q1', label: 'Q1 FY26' }, { value: 'q2', label: 'Q2 FY26' },
    { value: 'q3', label: 'Q3 FY26' }, { value: 'q4', label: 'Q4 FY26' },
  ]},
  { id: 'type', label: 'type', options: [
    { value: 'net-new', label: 'net new' }, { value: 'upsell', label: 'upsell' },
    { value: 'renewal', label: 'renewal' },
  ]},
  { id: 'forecast', label: 'forecast', options: [
    { value: 'commit', label: 'commit' }, { value: 'best-case', label: 'best case' },
    { value: 'pipeline', label: 'pipeline' }, { value: 'closed', label: 'closed' },
    { value: 'closed-lost', label: 'closed lost' },
  ]},
  { id: 'stage', label: 'stage', options: [
    { value: '1', label: 'stage 1' }, { value: '2', label: 'stage 2' },
    { value: '3', label: 'stage 3' }, { value: '4', label: 'stage 4' },
    { value: '5', label: 'stage 5' },
  ]},
  { id: 'deal-size', label: 'deal size', options: [
    { value: 'lt-100', label: 'under $100K' },
    { value: '100-500', label: '$100K – $500K' },
    { value: '500-1m', label: '$500K – $1M' },
    { value: 'gt-1m', label: 'over $1M' },
  ]},
  { id: 'risk', label: 'risk factors', options: [
    { value: 'none', label: 'none' },
    { value: '1-3', label: '1–3 risks' },
    { value: '4-plus', label: '4 or more' },
  ]},
  { id: 'health', label: 'health', options: [
    { value: 'healthy', label: 'healthy' },
    { value: 'at-risk', label: 'at risk' },
    { value: 'critical', label: 'critical' },
  ]},
]

const INITIAL_APPLIED: Record<string, string[]> = {
  quarter: ['q2'],
  forecast: ['commit'],
  health: ['at-risk', 'critical'],
}

// ─── Product taxonomy (tree filter) ──────────────────────────────────────────

interface ProductNode {
  label: string
  value: string
  children?: ProductNode[]
}

const PRODUCT_TREE: ProductNode[] = [
  { label: 'Firewall', value: 'firewall', children: [
    { label: 'PA Series', value: 'pa-series' },
    { label: 'VM Series', value: 'vm-series' },
  ]},
  { label: 'CDSS', value: 'cdss', children: [
    { label: 'PA Series Attached', value: 'pa-series-attached' },
    { label: 'PA Series Support', value: 'pa-series-support' },
    { label: 'FW Data Lake', value: 'fw-data-lake' },
  ]},
  { label: 'SASE', value: 'sase', children: [
    { label: 'Prisma Access', value: 'prisma-access' },
    { label: 'Prisma SD-WAN', value: 'prisma-sd-wan' },
  ]},
  { label: 'Cortex & Cloud', value: 'cortex-cloud', children: [
    { label: 'Cortex XDR+', value: 'cortex-xdr' },
    { label: 'Cortex XSOAR', value: 'cortex-xsoar' },
    { label: 'Xpanse', value: 'xpanse' },
    { label: 'XSIAM', value: 'xsiam' },
    { label: 'Qradar', value: 'qradar' },
    { label: 'Cortex & Cloud', value: 'cortex-cloud-leaf' },
  ]},
  { label: 'Unit 42', value: 'unit-42', children: [
    { label: 'Reactive', value: 'unit-42-reactive' },
    { label: 'Proactive', value: 'unit-42-proactive' },
  ]},
]

const ALL_PRODUCT_LEAVES = PRODUCT_TREE.flatMap(g => g.children?.map(c => c.value) ?? [])

// ─── Tag presets ─────────────────────────────────────────────────────────────

const TAG_BASE = {
  color: 'neutral' as const,
  contrast: 'low' as const,
  shape: 'rounded' as const,
  size: 'large' as const, // large = 4px radius (per design call)
}

// ─── Sort flyout (single-select) ─────────────────────────────────────────────

interface SortFlyoutProps {
  sortKey: SortKey
  sortDir: SortDir
  onChange: (key: SortKey) => void
}

function SortFlyout({ sortKey, sortDir, onChange }: SortFlyoutProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const currentLabel = SORT_OPTIONS.find(o => o.key === sortKey)?.label ?? 'value'

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="opp-sort-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}>
        <span>sort: {currentLabel} {sortDir === 'asc' ? '↑' : '↓'}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={triggerRef}
        mode="single"
        selected={[sortKey]}
        onSelectionChange={(values) => {
          if (values[0]) onChange(values[0] as SortKey)
          setOpen(false)
        }}
        placement="bottom-end">
        <FlyoutList>
          {SORT_OPTIONS.map(opt => (
            <FlyoutItem key={opt.key} value={opt.key}>{opt.label}</FlyoutItem>
          ))}
        </FlyoutList>
      </Flyout>
    </>
  )
}

// ─── Product filter (tree with checkboxes on every node) ─────────────────────

interface ProductFilterProps {
  selected: string[]
  onApply: (selected: string[]) => void
}

function ProductFilter({ selected, onApply }: ProductFilterProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<string[]>(selected)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(PRODUCT_TREE.map(g => g.value))
  )
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      setDraft(selected)
      setSearch('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const allSelected = ALL_PRODUCT_LEAVES.every(v => draft.includes(v))
  const someSelected = draft.length > 0 && !allSelected
  const allStatus =
    allSelected ? 'checked' : someSelected ? 'indeterminate' : 'unchecked'

  const toggleAll = () => setDraft(allSelected ? [] : [...ALL_PRODUCT_LEAVES])

  const groupLeaves = (g: ProductNode) => g.children?.map(c => c.value) ?? []

  const groupStatus = (g: ProductNode) => {
    const leaves = groupLeaves(g)
    const sel = leaves.filter(v => draft.includes(v)).length
    if (sel === 0) return 'unchecked'
    if (sel === leaves.length) return 'checked'
    return 'indeterminate'
  }

  const toggleGroup = (g: ProductNode) => {
    const leaves = groupLeaves(g)
    const allOn = leaves.every(v => draft.includes(v))
    setDraft(d =>
      allOn ? d.filter(v => !leaves.includes(v))
            : Array.from(new Set([...d, ...leaves]))
    )
  }

  const toggleLeaf = (val: string) =>
    setDraft(d => d.includes(val) ? d.filter(v => v !== val) : [...d, val])

  const toggleExpand = (val: string) =>
    setExpanded(s => {
      const n = new Set(s)
      if (n.has(val)) n.delete(val); else n.add(val)
      return n
    })

  const matches = (label: string) =>
    !search.trim() || label.toLowerCase().includes(search.trim().toLowerCase())

  const apply = () => { onApply(draft); setOpen(false) }
  const cancel = () => setOpen(false)

  // Trigger displays a chip-tag with count when any applied (matches Filter component pattern).
  const triggerLabel = 'product'

  return (
    <span className="panw--filter__wrapper">
      <button
        ref={triggerRef}
        type="button"
        className={`panw--filter${open ? ' panw--filter--open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}>
        <span className="panw--filter__label">{triggerLabel}</span>
        {selected.length > 0 && (
          <span className="panw--filter__values">
            <span className="panw--filter__chip-target">
              <Tags
                label={
                  selected.length === 1
                    ? PRODUCT_TREE.flatMap(g => g.children ?? []).find(c => c.value === selected[0])?.label ?? '1'
                    : String(selected.length)
                }
                color="neutral"
                contrast="high"
                size="default"
              />
            </span>
          </span>
        )}
        <span className="panw--filter__chevron" aria-hidden="true">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      <Flyout
        open={open}
        onOpenChange={setOpen}
        anchorRef={triggerRef}
        placement="bottom-end">
        <FlyoutFilter
          placeholder="Filter"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
        <div className="opp-tree" role="tree">
          {/* All Products (select-all). Diverges from FlyoutSelectAll's
              icon-only convention per user reference showing a labeled row. */}
          <div className="opp-tree__row opp-tree__row--root" onClick={toggleAll} role="treeitem" aria-checked={allStatus === 'checked'}>
            <span className="opp-tree__chev-spacer" />
            <Checkbox status={allStatus} label="" tabIndex={-1} />
            <span className="opp-tree__label opp-tree__label--bold">All Products</span>
          </div>
          {PRODUCT_TREE.map(group => {
            const visibleChildren = (group.children ?? []).filter(c => matches(c.label))
            const groupVisible = matches(group.label) || visibleChildren.length > 0
            if (!groupVisible) return null
            const isOpen = expanded.has(group.value)
            return (
              <div key={group.value} className="opp-tree__group" role="group">
                <div className="opp-tree__row opp-tree__row--group" role="treeitem" aria-expanded={isOpen}>
                  <button
                    type="button"
                    className="opp-tree__chev"
                    aria-label={isOpen ? `Collapse ${group.label}` : `Expand ${group.label}`}
                    onClick={(e) => { e.stopPropagation(); toggleExpand(group.value) }}>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <span
                    className="opp-tree__row-action"
                    onClick={() => toggleGroup(group)}>
                    <Checkbox
                      status={groupStatus(group)}
                      label=""
                      tabIndex={-1}
                    />
                    <span className="opp-tree__icon" aria-hidden="true"><Folder size={16} /></span>
                    <span className="opp-tree__label opp-tree__label--bold">{group.label}</span>
                  </span>
                </div>
                {isOpen && (
                  <div className="opp-tree__children">
                    {visibleChildren.map(leaf => (
                      <div
                        key={leaf.value}
                        className="opp-tree__row opp-tree__row--leaf"
                        role="treeitem"
                        aria-checked={draft.includes(leaf.value)}
                        onClick={() => toggleLeaf(leaf.value)}>
                        <span className="opp-tree__chev-spacer" />
                        <Checkbox
                          status={draft.includes(leaf.value) ? 'checked' : 'unchecked'}
                          label=""
                          tabIndex={-1}
                        />
                        <span className="opp-tree__label">{leaf.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <FlyoutFooter>
          <div className="panw--filter__footer-actions">
            <Button kind="ghost" size="small" onClick={cancel}>Cancel</Button>
            <Button kind="primary" size="small" onClick={apply}>Apply</Button>
          </div>
        </FlyoutFooter>
      </Flyout>
    </span>
  )
}

// ─── Row sub-component ───────────────────────────────────────────────────────

function OppRow({ row }: { row: OpportunityRow }) {
  return (
    <tr className="opp-row">
      <td>
        <div className="opp-multiline">
          <span className="opp-multiline__name">{row.oppName}</span>
          <span className="opp-multiline__sub">{row.account}</span>
        </div>
      </td>
      <td>
        <div className="opp-tag-cluster">
          {row.products.map(p => (
            <Tags key={p} {...TAG_BASE} label={p} />
          ))}
        </div>
      </td>
      <td>
        <div className="opp-tag-cluster">
          <Tags {...TAG_BASE} label={row.quoteId} />
          <Tags {...TAG_BASE} label={row.type} />
          <Tags {...TAG_BASE} label={row.stage} />
          <Tags {...TAG_BASE} label={row.forecast} />
          <Tags {...TAG_BASE} icon renderIcon={Calendar} label={`closes ${row.closeDate}`} />
          <Tags {...TAG_BASE} label={row.lastActivity} />
        </div>
      </td>
      <td>
        <div className="opp-tag-cluster">
          <Tags {...TAG_BASE} label={row.risks} />
          <Tags {...TAG_BASE} label={row.health} />
        </div>
      </td>
      <td className="opp-c-value">
        <CellContents content="numbers" text={row.value} />
      </td>
      <td className="opp-c-actions">
        <div className="opp-actions">
          <IconButton kind="ghost" size="sm" iconSize={16} renderIcon={Stars} aria-label="AI" />
          <IconButton kind="ghost" size="sm" iconSize={16} renderIcon={Eye} aria-label="View" />
        </div>
      </td>
    </tr>
  )
}

// ─── Main composition ────────────────────────────────────────────────────────

function AEOpportunityTable() {
  const [search, setSearch] = useState('')
  const [applied, setApplied] = useState<Record<string, string[]>>(INITIAL_APPLIED)
  const [products, setProducts] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortKey, setSortKey] = useState<SortKey>('value')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const setFacet = (id: string, values: string[]) => {
    setApplied(prev => {
      const next = { ...prev }
      if (values.length === 0) delete next[id]
      else next[id] = values
      return next
    })
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  // Header columns are restricted to the two we expose for sort via the column UI.
  type HeaderSortKey = Extract<SortKey, 'oppName' | 'value'>
  const headerType = (key: HeaderSortKey) =>
    sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'basic'

  return (
    <>
      <style>{LAYOUT_CSS}</style>
      <div className="opp-page">
        <div className="opp-page__shell">
          {/* ── Search row: search grows full width, sort right-aligned ── */}
          <div className="opp-search-row">
            <div className="opp-search-row__search">
              <Search
                size="md"
                placeholder="account, quote id, contact, product…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onClear={() => setSearch('')}
              />
            </div>
            <SortFlyout
              sortKey={sortKey}
              sortDir={sortDir}
              onChange={setSortKey}
            />
          </div>

          {/* ── Filter row: filters left, counts right (top-aligned) ───── */}
          <div className="opp-filter-row">
            <div className="opp-filter-group">
              {FACETS.map(facet => (
                <Filter
                  key={facet.id}
                  label={facet.label}
                  options={facet.options}
                  selected={applied[facet.id] ?? []}
                  onApply={(values: string[]) => setFacet(facet.id, values)}
                />
              ))}
              <ProductFilter selected={products} onApply={setProducts} />
            </div>
            <span className="opp-counts">47 deals · $12.4M ARR</span>
          </div>

          {/* ── Table ─────────────────────────────────────────────────── */}
          <div className="opp-table-shell">
            <table className="opp-table">
              <thead>
                <tr>
                  <th><Header size="md" type={headerType('oppName')} onHeaderClick={() => toggleSort('oppName')}>opportunity</Header></th>
                  <th className="opp-no-sort"><Header size="md" type="basic">products</Header></th>
                  <th className="opp-no-sort"><Header size="md" type="basic">logistics</Header></th>
                  <th className="opp-no-sort"><Header size="md" type="basic">challenges</Header></th>
                  <th className="opp-c-value"><Header size="md" type={headerType('value')} alignment="right" onHeaderClick={() => toggleSort('value')}>value</Header></th>
                  <th className="opp-c-actions opp-no-sort" />
                </tr>
              </thead>
              <tbody>
                {ROWS.map(row => <OppRow key={row.id} row={row} />)}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ──────────────────────────────────────────── */}
          <div className="opp-table-footer">
            <Pagination
              totalItems={47}
              currentPage={page}
              rowsPerPage={rowsPerPage}
              recordLabel="deal"
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Layout-only CSS ─────────────────────────────────────────────────────────

const LAYOUT_CSS = `
/* ── IACVT workaround (system bug; fix-at-source needed in component _tokens.scss) */
.stage {
  --panw-flyout-bg: var(--ds-surface-rest);
  --panw-flyout-border: var(--ds-lines-neutral-rest);
  --panw-flyout-text: var(--ds-text-primary);
  --panw-flyout-text-disabled: var(--ds-text-secondary-disabled);
  --panw-flyout-icon: var(--ds-icons-secondary-rest);
  --panw-flyout-item-hover: var(--ds-ghost-hover);
  --panw-flyout-item-pressed: var(--ds-ghost-pressed);
  --panw-flyout-selected-bg: var(--ds-highlight-rest);
  --panw-flyout-selected-fg: var(--ds-text-brand-rest);
  --panw-flyout-divider: var(--ds-lines-neutral-rest);
  --panw-flyout-filter-bg: var(--ds-field-rest);
  --panw-flyout-filter-text: var(--ds-text-primary);
  --panw-flyout-filter-placeholder: var(--ds-text-placeholder-rest);
  --panw-flyout-filter-border: var(--ds-lines-neutral-rest);
}

.opp-page {
  min-height: 100vh;
  background-color: var(--ds-surface-alt-rest);
  font-family: var(--ds-type-font-family-sans);
  padding: var(--ds-spacing-07) var(--ds-spacing-07) var(--ds-spacing-10);
}

/* Shell sits inside a parent card/tile. No own border or background. */
.opp-page__shell {
  background-color: transparent;
  border: 0;
}

/* ── Search row ─────────────────────────────────────────────────────────── *
 * Search grows to fill 100% of available space; sort sits to the right.
 * Override @ds/search's hardcoded width: 240px so it actually fills. */
.opp-search-row {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-03); /* 8 — proximity between distinct controls */
  padding: var(--ds-spacing-04) var(--ds-spacing-04) var(--ds-spacing-02); /* 12 12 4 — tighter bottom to reduce gap to filter row */
}
.opp-search-row__search {
  flex: 1;
  min-width: 0;
}
.opp-search-row__search .panw--search {
  width: 100%;
}

/* Sort trigger — ghost-button shape, opens a single-select Flyout */
.opp-sort-trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-spacing-02); /* 4 */
  padding: var(--ds-spacing-02) var(--ds-spacing-03); /* 4 8 */
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  color: var(--ds-text-secondary-rest);
  border-radius: var(--ds-radius-tight);
  white-space: nowrap;
  transition: background-color 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.opp-sort-trigger:hover {
  background-color: var(--ds-ghost-hover);
  color: var(--ds-text-primary);
}
.opp-sort-trigger[aria-expanded="true"] {
  background-color: var(--ds-ghost-pressed);
  color: var(--ds-text-primary);
}

/* ── Filter row ─────────────────────────────────────────────────────────── *
 * Counts top-aligned with 8px from row top per design call.
 * Filters wrap (no horizontal scroll — that pushed triggers off-screen). */
.opp-filter-row {
  display: flex;
  align-items: flex-start;
  gap: var(--ds-spacing-03);
  padding: var(--ds-spacing-02) var(--ds-spacing-04) var(--ds-spacing-03); /* 4 12 8 — tight to search row */
  flex-wrap: wrap;
}
.opp-filter-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ds-spacing-02);
  row-gap: var(--ds-spacing-02);
  flex: 1;
  min-width: 0;
}
/* Filter trigger height normalization. The DS Filter button grows from 28px
   to 30px when a count chip (Tags) is rendered inside it because the chip
   carries its own intrinsic height that the trigger doesn't absorb. Pin a
   uniform min-height so all 9 triggers align to the same baseline whether
   or not a count chip is present. */
.opp-filter-group .panw--filter { min-height: 30px; }

/* Flyout containing-block fix.
   @ds/flyout's usePosition writes viewport-relative left/top into the
   flyout inline style and relies on the flyout containing block being the
   initial one (the viewport). But @ds/filter — and the custom ProductFilter
   that mirrors its markup — wraps the flyout inside .panw--filter__wrapper
   declared position: relative, which becomes the containing block. The
   inline left: 564px then resolves INSIDE the wrapper, throwing the flyout
   ~800px to the right and overflowing the viewport for any trigger that
   is not anchored at x=0. Neutralize the wrapper positioning so the
   absolute flyout falls back to the viewport. Root-cause fix belongs in
   @ds/filter. */
.opp-filter-group .panw--filter__wrapper { position: static; }
.opp-counts {
  margin-left: auto;
  padding-top: var(--ds-spacing-03); /* 8 — top-aligned with first row of filter chips */
  color: var(--ds-text-secondary-rest);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Table ──────────────────────────────────────────────────────────────── */
.opp-table-shell { overflow-x: auto; }
.opp-table { width: 100%; border-collapse: collapse; }
.opp-table thead tr {
  border-bottom: 1px solid var(--ds-lines-neutral-rest);
}
.opp-table th {
  text-align: left;
  padding: 0; /* Header owns its own padding */
}
.opp-table th.opp-no-sort .panw--header__sort-indicator { display: none; }

/* Numeric column right-alignment */
.opp-table th.opp-c-value,
.opp-table td.opp-c-value { text-align: right; }

/* Value cell — 18px semibold. Stage has no body/heading token at 18px
   (sizes jump from 16 / heading-02 to 20 / heading-03), so this stays
   inline. Flagged in file header as a system gap. */
.opp-table td.opp-c-value .panw--cell-contents__text {
  font-size: 18px;
  /* Pair the inline 18px font-size with a 24px line-height so descenders
     don't clip. Stage has no body/heading token at 18px (sizes jump from
     heading-02 / 16 to heading-03 / 20), so the line-height is also
     hand-set to match the missing token's natural rhythm. */
  line-height: 24px;
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
}

.opp-table th.opp-c-actions,
.opp-table td.opp-c-actions {
  text-align: right;
  width: 1%;
  white-space: nowrap;
}

/* Row interaction (matches @ds/cells-standard) */
.opp-table tbody tr:nth-child(odd)  { background-color: var(--ds-surface-rest); }
.opp-table tbody tr:nth-child(even) { background-color: var(--ds-surface-alt-rest); }
.opp-table tbody tr:hover           { background-color: var(--ds-ghost-hover); }
.opp-table tbody tr:active          { background-color: var(--ds-ghost-pressed); }

.opp-table td {
  padding: var(--ds-spacing-04); /* 12 */
  vertical-align: middle;
  color: var(--ds-text-secondary-rest);
}

/* Multi-line opp cell (system gap — no primitive) */
.opp-multiline {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-01); /* 2 */
  align-items: flex-start;
}
.opp-multiline__name {
  font-weight: var(--ds-type-font-weight-semibold);
  color: var(--ds-text-primary);
}
.opp-multiline__sub {
  font-weight: var(--ds-type-font-weight-regular);
  color: var(--ds-text-secondary-rest);
}

.opp-tag-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-spacing-02);
  align-items: center;
}

/* Hover-only row actions */
.opp-actions {
  display: inline-flex;
  gap: var(--ds-spacing-02);
  opacity: 0;
  transition: opacity 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.opp-table tbody tr:hover .opp-actions,
.opp-table tbody tr:focus-within .opp-actions { opacity: 1; }

/* ── Pagination ─────────────────────────────────────────────────────────── */
.opp-table-footer {
  border-top: 1px solid var(--ds-lines-neutral-rest);
  position: relative;
}

/* Rows-per-page dropdown opens upward (system gap: no placement prop on
   Pagination/Dropdown). Targets internal class names — fragile. */
.opp-table-footer .panw--pagination__dropdown-wrapper .panw--dropdown__menu,
.opp-table-footer .panw--pagination__dropdown-wrapper .panw--flyout {
  bottom: 100%;
  top: auto !important;
  margin-bottom: var(--ds-spacing-02);
}

/* ── Product tree (custom — every node has a checkbox) ──────────────────── */
.opp-tree {
  display: flex;
  flex-direction: column;
  padding: var(--ds-spacing-02) 0;
}
.opp-tree__row {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-02); /* 4 */
  padding: var(--ds-spacing-02) var(--ds-spacing-03); /* 4 8 — flyout item rhythm */
  cursor: pointer;
  border-radius: var(--ds-radius-tight);
}
.opp-tree__row:hover { background-color: var(--ds-ghost-hover); }
.opp-tree__row--root { font-weight: var(--ds-type-font-weight-semibold); }
.opp-tree__row--group { padding-left: var(--ds-spacing-03); }
.opp-tree__row--leaf { padding-left: var(--ds-spacing-06); /* 24 — indent level */ }
.opp-tree__row-action {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-spacing-02);
  flex: 1;
}
.opp-tree__chev {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: var(--ds-icons-secondary-rest);
  padding: 0;
  border-radius: var(--ds-radius-tight);
}
.opp-tree__chev:hover { background-color: var(--ds-ghost-hover); }
.opp-tree__chev-spacer { display: inline-block; width: 16px; height: 16px; }
.opp-tree__icon { color: var(--ds-icons-secondary-rest); display: inline-flex; }
.opp-tree__label { color: var(--ds-text-primary); }
.opp-tree__label--bold { font-weight: var(--ds-type-font-weight-semibold); }
`

// ─── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta = { title: 'compositions/AE Opportunity Table' }
export default meta

export const Default: StoryObj = {
  render: () => <AEOpportunityTable />
}
