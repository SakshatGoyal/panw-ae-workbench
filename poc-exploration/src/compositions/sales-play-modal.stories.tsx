/**
 * Sales Play Modal — detail dialog composition
 *
 * Spec: `data-models/sales-play-modal-reference.md`
 * Reference assets:
 *   data-models/assets/sep-30773-71487-sales-play-modal.png   (main)
 *   data-models/assets/sep-21028-48762.png                    (Link Contact)
 *   data-models/assets/sep-21028-48763.png                    (Link Opportunity)
 *
 * ── Shape ──────────────────────────────────────────────────────────────
 *
 *   ModalShell (radius.generous, shadow.modals, surface.rest)
 *     Header     title + account link + close ×
 *     Body       view ∈ { 'main' | 'linkContact' | 'linkOpportunity' }
 *     Footer     visible on MainView only — Cancel + Update
 *
 * The dialog owns one `pending` edit state plus a `loaded` snapshot.
 * Switching into a sub-view does NOT discard pending edits (spec §5).
 * Cancel and × revert to `loaded`.
 *
 * ── Design system contract ─────────────────────────────────────────────
 *
 *   surface         surface.rest
 *   radius          radius.generous (12px)
 *   shadow          --ds-shadow-modals
 *   header text     text.primary
 *   account link    text.link (uses @ds/link)
 *   row label       text.secondary
 *   dividers        --ds-lines-neutral-rest, standalone 1px elements
 *   close button    IconButton kind="ghost", 8px from top/right
 *   status          ContentSwitcher size="default" bg="gray10"
 *   contact pill    Chip closeable=true, size="default"
 *   opp link        Link color="blue"
 *   + Add Contact   Link color="blue" (leadingIcon-style, with manual "+")
 *   + Add Opp       Button kind="tertiary"
 *   note / method   TextEntry inputType="area"
 *   primary star    Star icon (currentColor), color → bronze tag icon token
 *   star toggle off StarEmpty icon, color → icons.tertiary
 *   sub-view back   Breadcrumb + BreadcrumbItem
 *   sub-view search Search size="md" bg="grey10"
 *   sub-view table  Header + CellsStandard (checkbox) + Link cells
 *   pagination      Pagination component
 *
 * Backdrop scrim: rgba(neutral80, 0.5) — no scrim token exists yet; will
 * flag for design-system addition if this pattern recurs.
 */

import React, { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Button, IconButton } from '@ds/button'
import { Checkbox } from '@ds/checkbox'
import { Header } from '@ds/header'
import {
  ArrowLeft,
  Check,
  ChessKnight,
  Close,
  ClosedWon,
  Copy,
  Delete,
  DoNotEnter,
  HourglassEnd,
  MinusCircleStroke,
  NotTouched,
  Pitched,
  Star,
  StarEmpty,
} from '@ds/icons'
import { Link } from '@ds/link'
import { Pagination } from '@ds/pagination'
import { Search } from '@ds/search'
import { TextEntry } from '@ds/text-entry'

import {
  CONTACTS,
  formatCloseDate,
  formatCurrency,
  INITIAL_EDITS,
  OPPORTUNITIES,
  PLAY_HEADER,
  SalesPlayStatuses,
  type PlayContact,
  type PlayHeader,
  type PlayOpportunity,
  type SalesPlayEdits,
  type SalesPlayStatus,
} from '../mock/sales-play-modal'

// ── View routing ──────────────────────────────────────────────────────

type View = 'main' | 'linkContact' | 'linkOpportunity'

// ── Status segmented-control config ───────────────────────────────────

/**
 * Sentence-case display labels for the 7-status enum. Underlying enum
 * values remain lowercase (data layer).
 */
const STATUS_LABELS: Record<SalesPlayStatus, string> = {
  'not touched': 'Not touched',
  'pitched':     'Pitched',
  'deferred':    'Deferred',
  'declined':    'Declined',
  'pursuing':    'Pursuing',
  'closed won':  'Closed won',
  'closed lost': 'Closed lost',
}

/**
 * Status → icon mapping. Mirrors the alphabet used in AE Account Panel
 * and AE Account Table so the glyph vocabulary stays consistent across
 * every sales-play surface.
 */
const STATUS_ICONS: Record<SalesPlayStatus, React.ElementType> = {
  'not touched': NotTouched,
  'pitched':     Pitched,
  'deferred':    HourglassEnd,
  'declined':    MinusCircleStroke,
  'pursuing':    ChessKnight,
  'closed won':  ClosedWon,
  'closed lost': DoNotEnter,
}


// ── Edit-state helpers ────────────────────────────────────────────────

function editsEqual(a: SalesPlayEdits, b: SalesPlayEdits): boolean {
  if (a.status !== b.status) return false
  if (a.note !== b.note) return false
  if (a.primaryOpportunityId !== b.primaryOpportunityId) return false
  if (a.contactIds.length !== b.contactIds.length) return false
  if (a.opportunityIds.length !== b.opportunityIds.length) return false
  const aContacts = [...a.contactIds].sort()
  const bContacts = [...b.contactIds].sort()
  if (aContacts.some((id, i) => id !== bContacts[i])) return false
  const aOpps = [...a.opportunityIds].sort()
  const bOpps = [...b.opportunityIds].sort()
  if (aOpps.some((id, i) => id !== bOpps[i])) return false
  return true
}

// ── Root composition ──────────────────────────────────────────────────

export interface SalesPlayModalProps {
  /** Optional override of the initial view, for story variants. */
  initialView?: View
  /** Play header — family / play name / account name. Defaults to PLAY_HEADER. */
  header?: PlayHeader
  /** Account-scoped contacts visible in the LinkContact subview. Defaults to CONTACTS. */
  contacts?: PlayContact[]
  /** Account-scoped opportunities visible in the LinkOpportunity subview. Defaults to OPPORTUNITIES. */
  opportunities?: PlayOpportunity[]
  /** Initial edit state. Defaults to INITIAL_EDITS. */
  initialEdits?: SalesPlayEdits
  /**
   * Fired when the AE clicks Update. Receives the pending edits.
   * Default: `console.info` — replace at the consumer level when a real
   * backend exists. (Dormant per Stage 1 plumbing pass.)
   */
  onSave?: (edits: SalesPlayEdits) => void
  /**
   * Fired when the AE clicks Cancel, in addition to the modal's own
   * internal reset (pending → loaded). Default: no-op.
   */
  onCancel?: () => void
  /**
   * Fired when the modal should close (X button, backdrop click, or Cancel).
   * Consumer is responsible for unmounting the modal.
   */
  onClose?: () => void
  /** The play identifier — play name string from the account panel row. */
  playId?: string
  /** Reserved for future data resolution (Goal 3). */
  sourceOppId?: string
}

export function SalesPlayModal({
  initialView = 'main',
  header = PLAY_HEADER,
  contacts = CONTACTS,
  opportunities = OPPORTUNITIES,
  initialEdits = INITIAL_EDITS,
  onSave,
  onCancel: onCancelProp,
  onClose,
  playId,
  sourceOppId: _sourceOppId,
}: SalesPlayModalProps = {}) {
  const effectiveHeader: PlayHeader = playId ? { ...header, name: playId } : header
  const [view, setView] = useState<View>(initialView)
  const [loaded] = useState<SalesPlayEdits>(initialEdits)
  const [pending, setPending] = useState<SalesPlayEdits>(initialEdits)

  const dirty = useMemo(() => !editsEqual(pending, loaded), [pending, loaded])

  // ── Field mutators ──────────────────────────────────────────────────

  const setStatus = (status: SalesPlayStatus) =>
    setPending((p) => ({ ...p, status }))

  const removeContact = (id: string) =>
    setPending((p) => ({
      ...p,
      contactIds: p.contactIds.filter((c) => c !== id),
    }))

  const toggleContact = (id: string) =>
    setPending((p) => ({
      ...p,
      contactIds: p.contactIds.includes(id)
        ? p.contactIds.filter((c) => c !== id)
        : [...p.contactIds, id],
    }))

  const toggleOpportunity = (id: string) =>
    setPending((p) => {
      const has = p.opportunityIds.includes(id)
      const next = has
        ? p.opportunityIds.filter((o) => o !== id)
        : [...p.opportunityIds, id]
      // If we unlinked the primary, clear the marker.
      const primary =
        has && p.primaryOpportunityId === id ? null : p.primaryOpportunityId
      return { ...p, opportunityIds: next, primaryOpportunityId: primary }
    })

  const setPrimaryOpportunity = (id: string) =>
    setPending((p) => ({
      ...p,
      // Star toggle: if already primary, clear it; else set it (exclusive).
      primaryOpportunityId: p.primaryOpportunityId === id ? null : id,
      // Setting primary implicitly links the opp.
      opportunityIds: p.opportunityIds.includes(id)
        ? p.opportunityIds
        : [...p.opportunityIds, id],
    }))

  const setNote = (note: string) => setPending((p) => ({ ...p, note }))

  /** Unlink an opportunity (trash icon on the lateral row). Mirrors the
   *  unlink branch of `toggleOpportunity` so the primary marker clears
   *  alongside it. */
  const unlinkOpportunity = (id: string) =>
    setPending((p) => ({
      ...p,
      opportunityIds: p.opportunityIds.filter((o) => o !== id),
      primaryOpportunityId:
        p.primaryOpportunityId === id ? null : p.primaryOpportunityId,
    }))

  const onCancel = () => {
    setPending(loaded)
    onCancelProp?.()
    onClose?.()
  }
  const onUpdate = () => {
    if (onSave) {
      onSave(pending)
      return
    }
    // Default: persist locally (no backend). Replace by passing `onSave`.
    // eslint-disable-next-line no-console
    console.info('SalesPlayModal — Update', pending)
  }

  // ── Render ──────────────────────────────────────────────────────────

  return (
    <div className="spm-page">
      <style>{COMPOSITION_CSS}</style>
      <div className="spm-scrim" onClick={onClose} aria-hidden="true" />
      <div
        className="spm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="spm-title">
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="spm-header">
          <div className="spm-header__titles">
            <h2 id="spm-title" className="spm-title">
              {effectiveHeader.family} | {effectiveHeader.name}
            </h2>
            <Link href="#" size="14px" color="blue" className="spm-account-link">
              {effectiveHeader.accountName}
            </Link>
          </div>
          <IconButton
            aria-label="Close dialog"
            kind="ghost"
            size="sm"
            renderIcon={Close}
            className="spm-close"
            onClick={onClose}
          />
        </div>

        {/* ── Body ─────────────────────────────────────────────── */}
        <div className="spm-body">
          {view === 'main' && (
            <MainView
              pending={pending}
              contacts={contacts}
              opportunities={opportunities}
              onStatusChange={setStatus}
              onRemoveContact={removeContact}
              onUnlinkOpportunity={unlinkOpportunity}
              onTogglePrimary={setPrimaryOpportunity}
              onNoteChange={setNote}
              onOpenLinkContact={() => setView('linkContact')}
              onOpenLinkOpportunity={() => setView('linkOpportunity')}
            />
          )}
          {view === 'linkContact' && (
            <LinkContactView
              contacts={contacts}
              linkedIds={pending.contactIds}
              onToggle={toggleContact}
              onRemove={removeContact}
              onBack={() => setView('main')}
            />
          )}
          {view === 'linkOpportunity' && (
            <LinkOpportunityView
              opportunities={opportunities}
              linkedIds={pending.opportunityIds}
              primaryId={pending.primaryOpportunityId}
              onToggle={toggleOpportunity}
              onTogglePrimary={setPrimaryOpportunity}
              onBack={() => setView('main')}
            />
          )}
        </div>

        {/* ── Footer (main view only) ──────────────────────────── */}
        {view === 'main' && (
          <div className="spm-footer">
            <Button kind="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button kind="primary" onClick={onUpdate} disabled={!dirty}>
              Update
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── MainView ──────────────────────────────────────────────────────────

interface MainViewProps {
  pending: SalesPlayEdits
  contacts: PlayContact[]
  opportunities: PlayOpportunity[]
  onStatusChange: (status: SalesPlayStatus) => void
  onRemoveContact: (id: string) => void
  onUnlinkOpportunity: (id: string) => void
  onTogglePrimary: (id: string) => void
  onNoteChange: (v: string) => void
  onOpenLinkContact: () => void
  onOpenLinkOpportunity: () => void
}

function MainView({
  pending,
  contacts,
  opportunities,
  onStatusChange,
  onRemoveContact,
  onUnlinkOpportunity,
  onTogglePrimary,
  onNoteChange,
  onOpenLinkContact,
  onOpenLinkOpportunity,
}: MainViewProps) {
  const linkedContacts = pending.contactIds
    .map((id) => contacts.find((c) => c.id === id))
    .filter((c): c is PlayContact => Boolean(c))

  const linkedOpps = pending.opportunityIds
    .map((id) => opportunities.find((o) => o.id === id))
    .filter((o): o is PlayOpportunity => Boolean(o))

  return (
    <div className="spm-sections">
      {/* ── Status ─────────────────────────────────────────────── */}
      <section className="spm-section">
        <div className="spm-section__bar">
          <h3 className="spm-section__heading spm-section__heading--h1">
            Status
          </h3>
        </div>
        <div className="spm-section__content">
          <div className="spm-status-tags" role="radiogroup" aria-label="Status">
            {SalesPlayStatuses.map((status) => {
              const isSelected = pending.status === status
              const StatusIcon = STATUS_ICONS[status]
              return (
                <button
                  key={status}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={
                    'spm-status-tag' +
                    (isSelected ? ' spm-status-tag--selected' : '')
                  }
                  onClick={() => onStatusChange(status)}>
                  {isSelected ? (
                    <Check size={16} className="spm-status-tag__icon" />
                  ) : (
                    <StatusIcon size={16} className="spm-status-tag__icon" />
                  )}
                  <span className="spm-status-tag__label">
                    {STATUS_LABELS[status]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
        <hr className="spm-divider" />
      </section>

      {/* ── Pitch contact ──────────────────────────────────────── */}
      <section className="spm-section">
        <div className="spm-section__bar">
          <h3 className="spm-section__heading spm-section__heading--h1">
            Pitch contact
          </h3>
          <Button kind="ghost" size="small" onClick={onOpenLinkContact}>
            + Add contact
          </Button>
        </div>
        <div className="spm-section__content">
          {linkedContacts.length === 0 && (
            <p className="spm-empty">No contacts pitched yet.</p>
          )}
          <ul className="spm-lateral-list">
            {linkedContacts.map((c) => (
              <li key={c.id}>
                <div className="spl-row" role="group" aria-label={c.name}>
                  <span className="spl-row__label">
                    {c.name} · {c.title} · {c.phone} · {c.email}
                  </span>
                  <span
                    className="spl-row__actions"
                    onClick={(e) => e.stopPropagation()}>
                    <IconButton
                      kind="ghost"
                      size="sm"
                      iconSize={16}
                      renderIcon={Delete}
                      aria-label={`Remove ${c.name}`}
                      onClick={() => onRemoveContact(c.id)}
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <hr className="spm-divider" />
      </section>

      {/* ── Opportunities ──────────────────────────────────────── */}
      <section className="spm-section">
        <div className="spm-section__bar">
          <h3 className="spm-section__heading spm-section__heading--h1">
            Opportunities
          </h3>
          <Button kind="ghost" size="small" onClick={onOpenLinkOpportunity}>
            + Add opportunity
          </Button>
        </div>
        <div className="spm-section__content">
          {linkedOpps.length === 0 && (
            <p className="spm-empty">No opportunities linked yet.</p>
          )}
          <ul className="spm-lateral-list">
            {linkedOpps.map((o) => {
              const isPrimary = pending.primaryOpportunityId === o.id
              const StarGlyph = isPrimary ? Star : StarEmpty
              return (
                <li key={o.id}>
                  <div className="spl-row spl-row--has-lead" role="group" aria-label={o.name}>
                    <button
                      type="button"
                      className={
                        'spl-row__lead' +
                        (isPrimary ? ' spl-row__lead--primary' : '')
                      }
                      aria-label={
                        isPrimary
                          ? 'Unset as primary opportunity'
                          : 'Set as primary opportunity'
                      }
                      aria-pressed={isPrimary}
                      onClick={(e) => {
                        e.stopPropagation()
                        onTogglePrimary(o.id)
                      }}>
                      <StarGlyph size={16} />
                    </button>
                    <span className="spl-row__label">{o.name}</span>
                    <span
                      className="spl-row__actions"
                      onClick={(e) => e.stopPropagation()}>
                      <IconButton
                        kind="ghost"
                        size="sm"
                        iconSize={16}
                        renderIcon={Delete}
                        aria-label={`Unlink ${o.name}`}
                        onClick={() => onUnlinkOpportunity(o.id)}
                      />
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <hr className="spm-divider" />
      </section>

      {/* ── Note ───────────────────────────────────────────────── */}
      <section className="spm-section spm-section--last">
        <h3 className="spm-section__heading">Note</h3>
        <div className="spm-section__content">
          <TextEntry
            inputType="area"
            showTitle={false}
            showDescription={false}
            placeholder="Optional notes"
            value={pending.note}
            onChange={(v) => onNoteChange(v)}
            background="grey-10"
            size="default"
            className="spm-note-input"
          />
        </div>
      </section>
    </div>
  )
}

// ── LinkContactView ───────────────────────────────────────────────────

interface LinkContactViewProps {
  contacts: PlayContact[]
  linkedIds: string[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onBack: () => void
}

function LinkContactView({
  contacts,
  linkedIds,
  onToggle,
  onRemove,
  onBack,
}: LinkContactViewProps) {
  const [query, setQuery] = useState('')

  const linkedSet = new Set(linkedIds)

  const filtered = contacts.filter((c) =>
    [c.name, c.title, c.email].some((field) =>
      field.toLowerCase().includes(query.toLowerCase())
    )
  )

  // onRemove is wired through props for parity with the main view, but the
  // LinkContact view no longer surfaces a chip cloud above the table — the
  // row's checkbox-active state is the single linked indicator.
  void onRemove

  return (
    <div className="spm-subview">
      <div className="spm-subtoolbar">
        <IconButton
          kind="ghost"
          size="sm"
          renderIcon={ArrowLeft}
          aria-label="Back to Sales Play Details"
          onClick={onBack}
        />
        <span className="spm-subtoolbar__divider" aria-hidden />
        <div className="spm-subtoolbar__search">
          <Search
            size="sm"
            background="grey10"
            value={query}
            onChange={(v) => setQuery(v)}
            onClear={() => setQuery('')}
            placeholder="Search contacts"
          />
        </div>
        <Button kind="secondary" size="small">
          New Contact +
        </Button>
      </div>

      <div className="spm-table">
        <div className="spm-table__head">
          <div className="spm-table__th spm-table__th--lead" aria-hidden />
          <div className="spm-table__th spm-table__th--check" aria-hidden />
          <div className="spm-table__th"><Header size="md">Name</Header></div>
          <div className="spm-table__th"><Header size="md">Title</Header></div>
          <div className="spm-table__th"><Header size="md">Phone</Header></div>
          <div className="spm-table__th"><Header size="md">Email</Header></div>
        </div>
        <div className="spm-table__body">
          <div className="spm-table__sep" />
          {filtered.map((c, i) => {
            const checked = linkedSet.has(c.id)
            return (
              <React.Fragment key={c.id}>
                {i > 0 && <div className="spm-table__sep" />}
                <div
                  className={
                    'spm-table__row' +
                    (checked ? ' spm-table__row--active' : '')
                  }>
                <div className="spm-table__td spm-table__td--lead" aria-hidden />
                <div className="spm-table__td spm-table__td--check">
                  <Checkbox
                    label=""
                    status={checked ? 'checked' : 'unchecked'}
                    onChange={() => onToggle(c.id)}
                  />
                </div>
                <div className="spm-table__td spm-table__cell-text">{c.name}</div>
                <div className="spm-table__td spm-table__cell-text">{c.title}</div>
                <div className="spm-table__td">
                  <a href={`tel:${c.phone}`} className="spm-email-link">{c.phone}</a>
                </div>
                <div className="spm-table__td spm-table__td--email">
                  <a
                    href={`mailto:${c.email}`}
                    className="spm-email-link">
                    {c.email}
                  </a>
                  <button
                    type="button"
                    aria-label={`Copy ${c.email}`}
                    className="spm-copy"
                    onClick={() => navigator.clipboard?.writeText(c.email)}>
                    <Copy size={16} />
                  </button>
                </div>
                </div>
              </React.Fragment>
            )
          })}
          <div className="spm-table__sep" />
        </div>
      </div>

      <div className="spm-pagination">
        <Pagination
          totalItems={filtered.length}
          currentPage={1}
          rowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
          recordLabel="contact"
        />
      </div>
    </div>
  )
}

// ── LinkOpportunityView ───────────────────────────────────────────────

interface LinkOpportunityViewProps {
  opportunities: PlayOpportunity[]
  linkedIds: string[]
  primaryId: string | null
  onToggle: (id: string) => void
  onTogglePrimary: (id: string) => void
  onBack: () => void
}

function LinkOpportunityView({
  opportunities,
  linkedIds,
  primaryId,
  onToggle,
  onTogglePrimary,
  onBack,
}: LinkOpportunityViewProps) {
  const [query, setQuery] = useState('')
  const linkedSet = new Set(linkedIds)

  const filtered = opportunities.filter((o) =>
    o.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="spm-subview">
      <div className="spm-subtoolbar">
        <IconButton
          kind="ghost"
          size="sm"
          renderIcon={ArrowLeft}
          aria-label="Back to Sales Play Details"
          onClick={onBack}
        />
        <span className="spm-subtoolbar__divider" aria-hidden />
        <div className="spm-subtoolbar__search">
          <Search
            size="sm"
            background="grey10"
            value={query}
            onChange={(v) => setQuery(v)}
            onClear={() => setQuery('')}
            placeholder="Search opportunities"
          />
        </div>
      </div>

      <div className="spm-table spm-table--opps">
        <div className="spm-table__head">
          <div className="spm-table__th spm-table__th--lead" aria-hidden />
          <div className="spm-table__th spm-table__th--check" aria-hidden />
          <div className="spm-table__th spm-table__th--star" aria-hidden />
          <div className="spm-table__th"><Header size="md">Opportunity Name</Header></div>
          <div className="spm-table__th"><Header size="md">Stage</Header></div>
          <div className="spm-table__th spm-table__th--right">
            <Header size="md" alignment="right">Amount</Header>
          </div>
          <div className="spm-table__th"><Header size="md">Close Date</Header></div>
        </div>
        <div className="spm-table__body">
          <div className="spm-table__sep" />
          {filtered.map((o, i) => {
            const checked = linkedSet.has(o.id)
            const isPrimary = primaryId === o.id
            return (
              <React.Fragment key={o.id}>
                {i > 0 && <div className="spm-table__sep" />}
                <div
                  className={
                    'spm-table__row' +
                    (checked ? ' spm-table__row--active' : '')
                  }>
                <div className="spm-table__td spm-table__td--lead" aria-hidden />
                <div className="spm-table__td spm-table__td--check">
                  <Checkbox
                    label=""
                    status={checked ? 'checked' : 'unchecked'}
                    onChange={() => onToggle(o.id)}
                  />
                </div>
                <div className="spm-table__td spm-table__td--star">
                  <button
                    type="button"
                    className="spm-star"
                    aria-label={
                      isPrimary
                        ? 'Unset as primary opportunity'
                        : 'Set as primary opportunity'
                    }
                    aria-pressed={isPrimary}
                    onClick={() => onTogglePrimary(o.id)}>
                    {isPrimary ? (
                      <Star size={16} className="spm-star__glyph spm-star__glyph--on" />
                    ) : (
                      <StarEmpty
                        size={16}
                        className="spm-star__glyph spm-star__glyph--off"
                      />
                    )}
                  </button>
                </div>
                <div className="spm-table__td spm-table__td--name">
                  <a href="#" className="spm-email-link">{o.name}</a>
                </div>
                <div className="spm-table__td spm-table__cell-text">{o.stage}</div>
                <div className="spm-table__td spm-table__td--right spm-num spm-table__cell-text">
                  {formatCurrency(o.amount)}
                </div>
                <div className="spm-table__td spm-table__cell-text">{formatCloseDate(o.closeDate)}</div>
                </div>
              </React.Fragment>
            )
          })}
          <div className="spm-table__sep" />
        </div>
      </div>

      <div className="spm-pagination">
        <Pagination
          totalItems={filtered.length}
          currentPage={1}
          rowsPerPage={10}
          rowsPerPageOptions={[5, 10, 25]}
          recordLabel="opportunity"
          recordLabelPlural="opportunities"
        />
      </div>
    </div>
  )
}

// ── CSS ───────────────────────────────────────────────────────────────

const COMPOSITION_CSS = `
/* ── Page backdrop + scrim ───────────────────────────────────────── */
/* position: fixed + z-index 1000 ensures the modal layer covers the
   full viewport and sits above the right rail and all other shell
   chrome regardless of where in the React tree it is rendered. The
   stage-base background is removed — the scrim provides the darkening
   wash so the underlying app surface shows through correctly. */
.spm-page {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--ds-spacing-07);          /* 32 */
}
.spm-scrim {
  position: absolute;
  inset: 0;
  /* No defined modal-scrim token yet — using a black 50% wash via
     rgb-notation (no raw hex). Flag for tokenization if this pattern
     recurs across modals, drawers, sheets. */
  background: rgb(0 0 0 / 0.5);
  z-index: 0;
  cursor: default;
}

/* ── Modal shell ─────────────────────────────────────────────────── */
.spm-modal {
  position: relative;
  z-index: 1;
  /* 760px matches the Figma's modal proportions. */
  width: 760px;
  max-width: calc(100vw - var(--ds-spacing-08));
  /* Consistent height across the three views. Sized to the main view's
     content density at the standard fixture (1 contact, 3 opps, Note).
     Body scrolls only when content genuinely exceeds this. */
  height: 700px;
  max-height: calc(100vh - var(--ds-spacing-09));
  background: var(--ds-surface-rest);
  border-radius: var(--ds-radius-generous);
  box-shadow: var(--ds-shadow-modals);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: spm-enter 400ms cubic-bezier(0, 0, 0.3, 1);
}
@keyframes spm-enter {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .spm-modal { animation: none; }
}

/* ── Header ──────────────────────────────────────────────────────── */
.spm-header {
  position: relative;
  /* 16px modal padding on all sides — header content + hairline live
     inside that rectangle. */
  padding: var(--ds-spacing-05) var(--ds-spacing-05) var(--ds-spacing-04);
}
.spm-header::after {
  content: '';
  position: absolute;
  left: var(--ds-spacing-05);             /* 16 — inset divider */
  right: var(--ds-spacing-05);
  bottom: 0;
  height: 1px;
  background: var(--ds-lines-neutral-rest);
}
.spm-header__titles {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-02);              /* 4 */
}
.spm-title {
  margin: 0;
  color: var(--ds-text-primary);
  font-size: 18px;
  line-height: 1.33;
  font-weight: var(--ds-type-font-weight-semibold);
}
.spm-account-link { font-size: 14px; }
.spm-close {
  position: absolute;
  top: var(--ds-spacing-03);              /* 8 — corner-anchored */
  right: var(--ds-spacing-03);
}

/* ── Body ────────────────────────────────────────────────────────── */
.spm-body {
  flex: 1 1 auto;
  overflow-y: auto;
  /* 16px horizontal modal padding lives here so EVERY child — content
     AND dividers — sits within it. */
  padding: 0 var(--ds-spacing-05);
}

/* ── Sections (main view) ────────────────────────────────────────── */
.spm-sections {
  display: flex;
  flex-direction: column;
}
.spm-section {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-03);              /* 8 — proximity between heading/content/CTA */
  padding: var(--ds-spacing-03) 0;        /* 8 top + 8 bottom = 16 cumulative between sections */
}
.spm-section--last { padding-bottom: var(--ds-spacing-05); /* 16 above the footer divider */ }
.spm-section__heading {
  margin: 0;
  /* Default section-heading treatment (Status, Note): plain 14px primary
     regular, matches the TextEntry title style. */
  color: var(--ds-text-primary);
  font-size: 14px;
  line-height: 1.43;
  font-weight: var(--ds-type-font-weight-regular, 400);
}
/* heading-01: 14px / 1.42857 / semibold / 0.16px tracking.
   Values inlined from @ds/type/styles.ts to avoid pulling the
   helper into the exploration. */
.spm-section__heading--h1 {
  font-size: 0.875rem;
  line-height: 1.42857;
  font-weight: var(--ds-type-font-weight-semibold);
  letter-spacing: 0.16px;
}
/* Pitch contact + Opportunities sections: heading and CTA share a
   single row whose height matches the small tertiary button (32px).
   Heading sits left, CTA right-aligned. */
.spm-section__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
}
.spm-section__content { min-width: 0; }
.spm-section__cta {
  display: flex;
  justify-content: flex-end;
}
.spm-divider {
  border: 0;
  height: 1px;
  margin: var(--ds-spacing-02) 0 0;       /* 4 — keep divider close to CTA */
  background: var(--ds-lines-neutral-rest);
}
.spm-empty {
  margin: 0;
  color: var(--ds-text-tertiary-rest);
  font-size: 14px;
  line-height: 1.43;
}

/* ── Status tags ─────────────────────────────────────────────────── */
/* Tag-styled selectable options. Visual matches @ds/tags color="neutral"
   (white ground + 1px neutral inset border) so they sit in the same
   tag-family as Pitch contact / Opportunities rows. Selected option
   takes ghost.highlight.selected ground per stage-background-colors.md
   (alpha-brand wash) and routes text + icon to the matching brand
   family per the tinted-ground rule. */
.spm-status-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-spacing-02);              /* 4 — chip-cloud rhythm */
}
.spm-status-tag {
  /* Sized to match @ds/tags size="large" after its recent update:
     padding 5/10, gap 8, 14px font with 16.8px (120%) line-height,
     16x16 icon slot. Shape is rounded with 4px radius (radius-tight). */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  border: 0;
  border-radius: var(--ds-radius-tight);
  background-color: var(--ds-field-alt-rest);
  box-shadow: inset 0 0 0 1px var(--ds-lines-neutral-rest);
  color: var(--ds-text-primary);
  font-family: inherit;
  font-size: 14px;
  line-height: 16.8px;
  cursor: pointer;
  transition:
    background-color 110ms var(--ds-motion-easing-standard),
    box-shadow       110ms var(--ds-motion-easing-standard),
    color            110ms var(--ds-motion-easing-standard);
}
.spm-status-tag:hover {
  background-color: var(--ds-ghost-highlight-hover);
  color: var(--ds-text-brand-hover);
  box-shadow: inset 0 0 0 1px transparent;
}
.spm-status-tag:hover .spm-status-tag__icon { color: var(--ds-icons-brand-hover); }
.spm-status-tag:focus-visible {
  outline: 2px solid var(--ds-lines-brand-rest);
  outline-offset: 2px;
}
.spm-status-tag__icon { color: var(--ds-icons-secondary-rest); flex: 0 0 auto; }
.spm-status-tag__label { white-space: nowrap; }

/* Selected — ghost.highlight.selected ground + matching brand family
   for text and icon. */
.spm-status-tag.spm-status-tag--selected {
  background-color: var(--ds-ghost-highlight-selected);
  color: var(--ds-text-brand-rest);
  box-shadow: inset 0 0 0 1px transparent;
}
.spm-status-tag.spm-status-tag--selected .spm-status-tag__icon {
  color: var(--ds-icons-brand-rest);
}

/* ── Lateral row (pitch contact / opportunity) ───────────────────── */
/* Pattern matches the Past Sessions row in
   compositions/ai-interaction/past-sessions.css: 32px tall, 4px radius,
   ghost.rest at rest, ghost.hover on hover, ghost.pressed on press,
   with a trailing IconButton for delete. Opportunities additionally
   carry a leading primary-marker star button. The :not(:has(button:*))
   guard keeps the row bg from swapping when an inner button is the
   active hover/press target — child button states win over parent. */
.spm-lateral-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;                               /* matches ps-list flyout row gap */
}
.spl-row {
  display: flex;
  align-items: center;
  height: 32px;
  width: 100%;
  border: none;
  border-radius: var(--ds-radius-tight);
  background: var(--ds-ghost-rest);
  padding: 0 0 0 8px;
  gap: 4px;
  text-align: left;
  outline: none;
  transition: background 70ms var(--ds-motion-easing-standard);
}
.spl-row:hover:not(:has(button:hover)) {
  background: var(--ds-ghost-hover);
}
.spl-row:hover:not(:has(button:hover)) .spl-row__label {
  color: var(--ds-text-secondary-hover);
}
.spl-row:active:not(:has(button:active)) {
  background: var(--ds-ghost-pressed);
}
.spl-row:active:not(:has(button:active)) .spl-row__label {
  color: var(--ds-text-secondary-pressed);
}
.spl-row:focus-visible {
  outline: 2px solid var(--ds-lines-brand-rest);
  outline-offset: -2px;
}
/* Rows with a leading star: drop the 8px label padding since the
   button slot lives there instead, and tighten the gap to 4px so the
   star reads as attached to the label. */
.spl-row--has-lead { padding-left: 4px; }

.spl-row__label {
  flex: 1;
  min-width: 0;
  font-family: var(--ds-type-font-family-sans);
  font-size: 13px;
  line-height: 18px;
  color: var(--ds-text-secondary-rest);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  transition: color 70ms var(--ds-motion-easing-hover);
}
.spl-row__actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
/* Leading star button — 24x24 hit target inside the 32px row, glyph 16. */
.spl-row__lead {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--ds-radius-tight);
  cursor: pointer;
  color: var(--ds-icons-tertiary-rest);
  transition: color 110ms var(--ds-motion-easing-standard);
}
.spl-row__lead:hover  { color: var(--ds-icons-secondary-hover); }
.spl-row__lead:active { color: var(--ds-icons-secondary-pressed); }
.spl-row__lead:focus-visible {
  outline: 2px solid var(--ds-lines-brand-rest);
  outline-offset: 1px;
}
/* Primary opportunity — paint the filled Star glyph gold30. The Star
   icon uses currentColor; routing through the decorative gold-30
   palette token keeps the value tokenised. */
.spl-row__lead--primary { color: var(--ds-color-decorative-gold-30); }
.spl-row__lead--primary:hover,
.spl-row__lead--primary:active { color: var(--ds-color-decorative-gold-30); }

@media (prefers-reduced-motion: reduce) {
  .spl-row { transition: none; }
}

/* ── Note input ──────────────────────────────────────────────────── */
/* TextEntry's outer carries the .spm-note-input class. Force the
   container and the textarea inside to fill width; min-height keeps
   the field visible even if the body is height-constrained.
   Lock the resize handle — the modal is fixed-height, so a
   user-resized textarea would push content under the footer. */
.spm-note-input { width: 100%; }
.spm-note-input .panw--text-entry__input {
  width: 100%;
  min-height: 88px;
  resize: none;
}

/* ── Star toggle (used inside opp lateral row) ───────────────────── */
.spm-star {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: var(--ds-radius-tight);
  flex: 0 0 auto;
}
.spm-star:focus-visible {
  outline: 2px solid var(--ds-text-link-rest);
  outline-offset: 2px;
}
.spm-star__glyph--on  { color: var(--ds-tag-bronze-low-icon-rest); }
.spm-star__glyph--off { color: var(--ds-icons-tertiary-rest); }
.spm-star__placeholder {
  display: inline-block;
  width: 16px;
  height: 16px;
}

/* ── Footer ──────────────────────────────────────────────────────── */
.spm-footer {
  position: relative;
  display: flex;
  justify-content: flex-end;
  gap: var(--ds-spacing-02);              /* 4 — paired action set */
  padding: var(--ds-spacing-05);          /* 16 on all sides */
}
.spm-footer::before {
  content: '';
  position: absolute;
  left: var(--ds-spacing-05);
  right: var(--ds-spacing-05);
  top: 0;
  height: 1px;
  background: var(--ds-lines-neutral-rest);
}

/* ── Sub-view scaffold ───────────────────────────────────────────── */
/* The sub-view fills the body so pagination can pin to the bottom edge
   of the modal regardless of how many rows the table renders. The
   table flexes; pagination is anchored last. */
.spm-subview {
  display: flex;
  flex-direction: column;
  gap: var(--ds-spacing-05);              /* 16 — rhythm between subview blocks */
  padding: var(--ds-spacing-05) 0;        /* 16 top + bottom — sits 16px below the header divider */
  min-height: 100%;
  box-sizing: border-box;
}
.spm-subtoolbar {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-03);              /* 8 */
  height: 32px;                            /* IconButton sm + Search sm + Button small all 32 */
}
/* Search defaults to 240px; override to fill the toolbar so the search
   surface spans the toolbar's flexible space. */
.spm-subtoolbar__search { flex: 1 1 auto; min-width: 0; }
.spm-subtoolbar__search .panw--search { width: 100%; }
/* 1px vertical line between the back IconButton and the search bar. The
   divider is 16px tall — centered in the 32px toolbar row — so it
   reads as a quiet break, not a full-row split. */
.spm-subtoolbar__divider {
  flex-shrink: 0;
  width: 1px;
  height: 16px;
  background: var(--ds-lines-neutral-rest);
}

/* ── Sub-view table ──────────────────────────────────────────────── */
/* Flex grows so pagination, marked with margin-top:auto, anchors to
   the bottom of the modal body. The table sits inside the body's 16px
   horizontal padding — it does NOT escape to edge-to-edge. The 16px
   gutter before the checkbox is carried by the leading grid column,
   so the checkbox itself starts 32px (16 body + 16 gutter) from the
   modal edge. */
.spm-table {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--ds-lines-neutral-rest);
}
.spm-table__head,
.spm-table__row {
  display: grid;
  /* contact table: 16px leading pad | check | Name | Title | Phone | Email.
     The 16px leading column is the table's left gutter — every cell
     starts 16px in from the modal body edge, including the checkbox.
     No column-gap — the head paves as a single continuous ribbon. */
  grid-template-columns: 16px 24px minmax(120px, 1fr) minmax(140px, 1.3fr)
    minmax(120px, 1fr) minmax(180px, 1.6fr);
  align-items: center;
  column-gap: 0;
}
.spm-table--opps .spm-table__head,
.spm-table--opps .spm-table__row {
  /* opp table: lead | check | star | Name | Stage | Amount | Close Date.
     Numeric/short columns sized to fit content + 32px padding budget,
     trimmed to give the name column more room (table no longer
     escapes the body's 16px padding, so the overall content width
     shrank by 32px):
       Stage  112 → fits "1 - Qualify"
       Amount 128 → fits "$5,678,901.00" in tabular-nums
       Close  116 → fits "Sep 25, 2027" */
  grid-template-columns:
    16px 24px 28px minmax(200px, 1fr) 112px 128px 116px;
}
.spm-table__head {
  min-height: 40px;
  /* Headers ground on surface.rest (white) — the colored strip is gone.
     Override the DS Header element's own bg in this scope so each cell
     stays white instead of painting surface-accent. */
  background: var(--ds-surface-rest);
}
.spm-table__head .panw--header {
  background-color: var(--ds-surface-rest);
}
.spm-table__row {
  min-height: 44px;
  color: var(--ds-text-secondary-rest);
  font-size: 14px;
  cursor: pointer;
  border-radius: var(--ds-radius-tight);    /* 4 — each row reads as a tile */
  /* Text color tracks state alongside bg — the row routes through the
     text.secondary family per rule: rest -> hover -> pressed on transient
     state, and the selected (active) row holds at the hover step. */
  transition:
    background-color 110ms var(--ds-motion-easing-standard),
    color            110ms var(--ds-motion-easing-standard);
}
/* Row dividers are real elements between rows, not borders ON rows —
   border-bottom on a radius'd row would crawl into the corner curves
   and read ugly. The separator sits flush in the inter-row gap. */
.spm-table__sep {
  height: 1px;
  background: var(--ds-lines-neutral-rest);
  transition: opacity 110ms var(--ds-motion-easing-standard);
}
/* On row hover, the dividers immediately above and below the row fade
   out — the hovered row reads as a single engaged tile with no lines
   pressing into its top/bottom edge. Opacity (not display) preserves
   the 1px slot so the row doesn't shift on hover.
   - :hover + .spm-table__sep targets the sep after the hovered row.
   - :has(+ .spm-table__row:hover) targets the sep before it. */
.spm-table__row:hover + .spm-table__sep,
.spm-table__sep:has(+ .spm-table__row:hover),
.spm-table__row--active + .spm-table__sep,
.spm-table__sep:has(+ .spm-table__row--active) {
  opacity: 0;
}

/* Row interaction — mirrors CellsStandard. Non-active rows respond to
   hover and press through the ghost family (neutral) so the
   hover-vs-active hierarchy stays legible: ghost on hover/press,
   highlight.rest on selected. The 4px radius is preserved through
   every state. */
.spm-table__row:not(.spm-table__row--active):hover {
  background-color: var(--ds-ghost-hover);
  color: var(--ds-text-secondary-hover);
}
.spm-table__row:not(.spm-table__row--active):active {
  background-color: var(--ds-ghost-pressed);
  color: var(--ds-text-secondary-pressed);
}
/* Selected row — mirrors CellsStandard active state: ground takes
   highlight.rest (alpha-brand wash) and the checkbox routes into the
   brand icon family per the matching-family rule. Text holds at the
   hover step of the secondary family so the row reads engaged. */
.spm-table__row--active {
  background-color: var(--ds-highlight-rest);
  color: var(--ds-text-secondary-hover);
}
.spm-table__row--active .panw--checkbox-icon--checked,
.spm-table__row--active .panw--checkbox-icon--indeterminate {
  color: var(--ds-icons-brand-rest);
}
/* Cell defaults:
   - Headers: padding 0. The DS Header element fills 100% of its th and
     provides its own 16px internal padding-inline. Adding more here
     would double the inset and break alignment with cells.
   - Data cells: padding-inline 16px to match the Header's internal
     inset, so column text starts at the same x in head and body. */
.spm-table__th {
  min-width: 0;
  padding: 0;
}
.spm-table__td {
  min-width: 0;
  padding: 0 var(--ds-spacing-05);        /* 16 — matches Header inline padding */
}
.spm-table__cell-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* Structural columns (no header text, no padded body content):
   leading gutter, checkbox, star. Padding zeroed so the column's grid
   track width is exact — 16px gutter, 24px check, 28px star. */
.spm-table__th--lead,
.spm-table__td--lead,
.spm-table__th--check,
.spm-table__td--check,
.spm-table__th--star,
.spm-table__td--star { padding: 0; }
/* Right-align via text-align so the cell still fills its grid track
   (no justify-self:end, which would shrink the cell and break the
   continuous header ribbon). */
.spm-table__th--right,
.spm-table__td--right { text-align: right; }
.spm-table__td--check { display: flex; align-items: center; justify-content: center; }
.spm-table__td--star  { display: flex; align-items: center; justify-content: center; }
.spm-table__td--email {
  display: flex;
  align-items: center;
  gap: var(--ds-spacing-02);              /* 4 */
  min-width: 0;
  overflow: hidden;
}
/* Email anchor — plain <a> styled like a link. Used here instead of the
   DS Link component because Link is inline-flex, which prevents
   text-overflow: ellipsis on its text child. A plain block-context
   anchor truncates predictably inside the flex cell. */
.spm-email-link {
  display: block;
  min-width: 0;
  flex: 1 1 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--ds-text-link-rest);
  text-decoration: none;
}
.spm-email-link:hover { text-decoration: underline; }
.spm-email-link:focus-visible {
  outline: 2px solid var(--ds-text-link-rest);
  outline-offset: 2px;
  border-radius: var(--ds-radius-tight);
}
.spm-cell-link { white-space: nowrap; }
.spm-num { font-variant-numeric: tabular-nums; }

/* The DS Header component renders a sort indicator on type=basic.
   These tables are static (non-sortable), so the indicator is hidden
   locally. Header styling, padding, and typography stay exactly as the
   design system defines them — no overrides. */
.spm-table__head .panw--header__sort-indicator { display: none; }
/* Header carries a hover state and pointer cursor for sortable columns.
   These tables are static — suppressing the affordance keeps the
   header from reading as interactive. */
.spm-table__head .panw--header {
  cursor: default;
  pointer-events: none;
}

.spm-copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 2px;
  border-radius: var(--ds-radius-tight);
  cursor: pointer;
  color: var(--ds-icons-tertiary-rest);
}
.spm-copy:hover  { color: var(--ds-icons-secondary-hover); }
.spm-copy:focus-visible {
  outline: 2px solid var(--ds-text-link-rest);
  outline-offset: 2px;
}

/* ── Pagination anchored to modal bottom ─────────────────────────── */
.spm-pagination {
  margin-top: auto;                       /* push to bottom of subview */
  padding-top: var(--ds-spacing-04);
}
`

// ── Storybook meta ────────────────────────────────────────────────────

const meta: Meta<typeof SalesPlayModal> = {
  title: 'compositions/Sales Play Modal',
  component: SalesPlayModal,
  parameters: { layout: 'fullscreen' },
  excludeStories: ['SalesPlayModal'],
}
export default meta

type Story = StoryObj<typeof SalesPlayModal>

export const Main: Story = {
  render: () => <SalesPlayModal initialView="main" />,
}

export const LinkContact: Story = {
  render: () => <SalesPlayModal initialView="linkContact" />,
}

export const LinkOpportunity: Story = {
  render: () => <SalesPlayModal initialView="linkOpportunity" />,
}
