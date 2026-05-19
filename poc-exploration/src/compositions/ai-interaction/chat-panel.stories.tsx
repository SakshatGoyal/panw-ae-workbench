/**
 * ai-interactions/Chat Panel
 *
 * Composed chat panel surface. Two variants:
 *
 *   Empty  — Zero state. No active session. Shows past sessions and
 *            suggested prompts so the panel is never a blank page.
 *
 *   Active — Live session. One user message + one AI response with a
 *            toggleable Retrace chip and response actions.
 *
 * This story composes all the individual ai-interactions components into a
 * 360 × 640 panel shell, demonstrating the full surface as a product designer
 * would review it — not as isolated component demos.
 *
 * Token contract:
 *   panel bg       var(--ds-surface-rest)
 *   panel border   var(--ds-lines-neutral-tile-rest)
 *   panel shadow   var(--ds-shadow-tiles)
 */
import type { Meta, StoryObj } from '@storybook/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, IconButton } from '@ds/button'
import { CellContents } from '@ds/cell-contents'
import { Flyout, FlyoutList, FlyoutItem } from '@ds/flyout'
import { Header } from '@ds/header'
import {
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  Close,
  CommentAdd,
  Copy,
  Delete,
  Edit,
  ExternalLink,
  GridHorizontal,
  More,
  Plus,
  ThumbsUp,
} from '@ds/icons'
import { Tags } from '@ds/tags'
import logoSalesforce from './logos/logo-salesforce.jpeg'
import logoPeopleai   from './logos/logo-people-ai.jpeg'

// ─── Inline icon ──────────────────────────────────────────────────────────────

/** ai-icon-prompt — paths use fill="currentColor" for CSS token compatibility. */
function AiPromptIcon({ 'aria-label': ariaLabel }: { 'aria-label'?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={ariaLabel}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.7587 4H15.2413C16.0463 3.99999 16.7106 3.99998 17.2518 4.04419C17.8139 4.09012 18.3306 4.18868 18.816 4.43597C19.5686 4.81947 20.1805 5.43139 20.564 6.18404C20.8113 6.66937 20.9099 7.18608 20.9558 7.74818C21 8.28936 21 8.95372 21 9.75868V13.2408C21 14.0457 21 14.7101 20.9558 15.2513C20.9099 15.8134 20.8113 16.3301 20.564 16.8154C20.1805 17.568 19.5686 18.18 18.816 18.5635C18.3306 18.8108 17.8139 18.9093 17.2518 18.9552C16.7106 18.9995 16.0463 18.9995 15.2413 18.9994H15.0314L12.7593 21.6507C12.5693 21.8724 12.292 22 12 22C11.708 22 11.4307 21.8724 11.2407 21.6507L8.96859 18.9994H8.75872C7.95374 18.9995 7.28938 18.9995 6.74817 18.9552C6.18608 18.9093 5.66937 18.8108 5.18404 18.5635C4.43139 18.18 3.81947 17.568 3.43597 16.8154C3.18868 16.3301 3.09012 15.8134 3.04419 15.2513C2.99998 14.7101 2.99999 14.0457 3 13.2407V9.7587C2.99999 8.95373 2.99998 8.28937 3.04419 7.74818C3.09012 7.18608 3.18868 6.66937 3.43597 6.18404C3.81947 5.43139 4.43139 4.81947 5.18404 4.43597C5.66937 4.18868 6.18608 4.09012 6.74817 4.04419C7.28937 3.99998 7.95373 3.99999 8.7587 4ZM6.91104 6.03755C6.47262 6.07337 6.24842 6.1383 6.09202 6.21799C5.7157 6.40973 5.40973 6.7157 5.21799 7.09202C5.1383 7.24842 5.07337 7.47262 5.03755 7.91104C5.00078 8.36113 5 8.94342 5 9.8V13.1994C5 14.056 5.00078 14.6383 5.03755 15.0884C5.07337 15.5268 5.1383 15.751 5.21799 15.9074C5.40973 16.2837 5.7157 16.5897 6.09202 16.7815C6.24842 16.8611 6.47262 16.9261 6.91104 16.9619C7.36113 16.9987 7.94342 16.9994 8.8 16.9994H9.42858C9.72054 16.9994 9.99792 17.127 10.1879 17.3487L12 19.4632L13.8121 17.3487C14.0021 17.127 14.2795 16.9994 14.5714 16.9994H15.2C16.0566 16.9994 16.6389 16.9987 17.089 16.9619C17.5274 16.9261 17.7516 16.8611 17.908 16.7815C18.2843 16.5897 18.5903 16.2837 18.782 15.9074C18.8617 15.751 18.9266 15.5268 18.9624 15.0884C18.9992 14.6383 19 14.056 19 13.1994V9.8C19 8.94342 18.9992 8.36113 18.9624 7.91104C18.9266 7.47262 18.8617 7.24842 18.782 7.09202C18.5903 6.7157 18.2843 6.40973 17.908 6.21799C17.7516 6.1383 17.5274 6.07337 17.089 6.03755C16.6389 6.00078 16.0566 6 15.2 6H8.8C7.94342 6 7.36113 6.00078 6.91104 6.03755Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M8.29291 8.29289C8.68343 7.90236 9.3166 7.90236 9.70712 8.29289L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071 11.7071L9.70712 13.7071C9.3166 14.0976 8.68343 14.0976 8.29291 13.7071C7.90238 13.3166 7.90238 12.6834 8.29291 12.2929L9.5858 11L8.29291 9.7071C7.90238 9.31658 7.90238 8.68341 8.29291 8.29289Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 14C12 13.4477 12.4477 13 13 13H15C15.5523 13 16 13.4477 16 14C16 14.5523 15.5523 15 15 15H13C12.4477 15 12 14.5523 12 14Z" fill="currentColor" />
    </svg>
  )
}
import './chat-window-header.css'
import './past-sessions.css'
import './selectable-table.css'
import './suggestions.css'
import './user-message.css'
import './prompt-entry-field.css'
import './response-actions.css'
import './ai-response.css'
import './chat-panel.css'

// ─── Static data ──────────────────────────────────────────────────────────────

const SESSIONS = [
  { id: '1', label: 'How does Strata Cloud Manager reduce operational overhead?' },
  { id: '2', label: 'Cortex XSOAR playbook for phishing response automation' },
  { id: '3', label: 'Compare Prisma Cloud to our current CSPM solution' },
  { id: '4', label: 'Zero trust network access architecture review' },
  { id: '5', label: 'SASE deployment checklist and enterprise rollout plan' },
]

const SUGGESTIONS = [
  { id: '1', label: "What's the ROI of SASE for enterprise deployments?" },
  { id: '2', label: 'Walk me through a zero-trust network deployment' },
  { id: '3', label: 'How does Prisma Cloud improve compliance posture?' },
  { id: '4', label: 'Which of my pipeline deals are stalled at technical evaluation?' },
  { id: '5', label: 'Summarise the top risk findings from my last Cortex XDR incident' },
]

// Logo map for derivation source tags
const LOGOS: Record<'salesforce' | 'peopleai', string> = {
  salesforce: logoSalesforce,
  peopleai:   logoPeopleai,
}

// Derivation steps for the active state (G — Distinguished)
interface ChatStep {
  text:        string
  source:      'salesforce' | 'peopleai' | null
  subPath:     string | null
  lastUpdated: string | null   // e.g. "2:45 pm PT"
}

const STEPS: ChatStep[] = [
  {
    text:        'Identified 12 active Prisma Cloud opportunities in AMER at Technical Evaluation stage',
    source:      'salesforce',
    subPath:     'Pipeline',
    lastUpdated: '2:45 pm PT',
  },
  {
    text:        'Prioritized by last-activity recency — surfaced 3 deals with no movement in 30+ days',
    source:      'salesforce',
    subPath:     'Activity history',
    lastUpdated: '2:45 pm PT',
  },
  {
    text:        'Confirmed positive SE scorecard on POC close for all three: Northbay, Apex, Meridian',
    source:      'salesforce',
    subPath:     'POC notes',
    lastUpdated: '1:12 pm PT',
  },
  {
    text:        'Linked stall pattern to absent Economic Buyer engagement post-evaluation',
    source:      'peopleai',
    subPath:     'Engagement, post-POC',
    lastUpdated: '11:30 am PT',
  },
  {
    text:        'Inferred each deal requires a champion-sponsored re-introduction to VP+ to convert evaluation to buying motion',
    source:      null,
    subPath:     null,
    lastUpdated: null,
  },
]

// ─── ThumbsDown (ThumbsUp mirrored vertically — no ThumbsDown in @ds/icons) ──

interface LocalIconProps {
  size?: number
  className?: string
  'aria-label'?: string
}

const ThumbsDown = React.forwardRef<SVGSVGElement, LocalIconProps>(
  function ThumbsDown({ size = 20, className, 'aria-label': ariaLabel }, ref) {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        role={ariaLabel ? 'img' : undefined}
        style={{ transform: 'scaleY(-1)' }}
      >
        <path
          d="M3.5 16.9999H2.5C2.22386 16.9999 2 16.7761 2 16.4999V10.4999C2 10.2238 2.22386 9.99992 2.5 9.99992H3.5C3.77614 9.99992 4 10.2238 4 10.4999V16.4999C4 16.7761 3.77614 16.9999 3.5 16.9999ZM5.52618 16.9999H13.6577C15.0343 16.9999 16.2342 16.063 16.5681 14.7276L17.6894 10.2424C17.8471 9.6113 17.3698 8.99992 16.7192 8.99992H11.8658C11.5569 8.99992 11.3218 8.72249 11.3726 8.41772L11.9468 4.9727C12.0329 4.45634 11.8768 3.96306 11.5684 3.59904C11.2589 3.23382 10.7656 3.09114 10.4133 3.03546C10.1774 2.99819 9.95599 3.12624 9.87121 3.34943C9.47197 4.40043 8.88178 5.66715 7.99999 6.99992C7.16375 8.26384 6.28545 9.25431 5.52617 9.99992L5.52618 16.9999Z"
          fill="currentColor"
        />
      </svg>
    )
  }
)
ThumbsDown.displayName = 'ThumbsDown'

// ─── FeedbackTimer ────────────────────────────────────────────────────────────

function FeedbackTimer({ durationMs, onComplete }: { durationMs: number; onComplete: () => void }) {
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const t = setTimeout(() => onCompleteRef.current(), durationMs)
    return () => clearTimeout(t)
  }, [durationMs])

  const r = 5
  const circumference = 2 * Math.PI * r

  return (
    <svg className="raf__timer" width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx={7} cy={7} r={r} stroke="var(--ds-lines-neutral-rest)" strokeWidth={2.5} />
      <circle
        cx={7} cy={7} r={r}
        stroke="var(--ds-lines-brand-rest)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={0}
        className="raf__timer-progress"
      />
    </svg>
  )
}

// ─── ResponseActions ──────────────────────────────────────────────────────────

type FeedbackPhase = 'idle' | 'feedback' | 'thanks'

function ResponseActions() {
  const [liked,        setLiked]        = useState(false)
  const [disliked,     setDisliked]     = useState(false)
  const [phase,        setPhase]        = useState<FeedbackPhase>('idle')
  const [panelExiting, setPanelExiting] = useState(false)
  const [timerKey,     setTimerKey]     = useState(0)

  const dismissPanel = (callback?: () => void) => {
    setPanelExiting(true)
    setTimeout(() => {
      setPhase('idle')
      setDisliked(false)
      setPanelExiting(false)
      callback?.()
    }, 110)
  }

  const handleLike = () => {
    if (disliked) { setDisliked(false); setPhase('idle') }
    setLiked(v => !v)
  }

  const handleDislike = () => {
    if (phase !== 'idle') { dismissPanel(); return }
    if (liked) setLiked(false)
    setDisliked(true)
    setPhase('feedback')
    setTimerKey(k => k + 1)
  }

  const handleTimerComplete = () =>
    setPhase(current => (current === 'feedback' ? 'thanks' : current))

  useEffect(() => {
    if (phase !== 'thanks') return
    const t = setTimeout(() => dismissPanel(), 3000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  return (
    <div className="raf">
      {/* ── Top: icon buttons (left-aligned) ──────────────────────────────── */}
      <div className="raf__buttons">
        <IconButton
          kind="ghost" size="xs" iconSize={16}
          renderIcon={ThumbsDown}
          isSelected={disliked}
          aria-label={disliked ? 'Undo dislike' : 'Dislike response'}
          onClick={handleDislike}
        />
        <IconButton
          kind="ghost" size="xs" iconSize={16}
          renderIcon={ThumbsUp}
          isSelected={liked}
          aria-label={liked ? 'Unlike response' : 'Like response'}
          onClick={handleLike}
        />
        <IconButton
          kind="ghost" size="xs" iconSize={16}
          renderIcon={Copy}
          aria-label="Copy response"
        />
      </div>

      {/* ── Below buttons: feedback panel ─────────────────────────────────── */}
      <div className="raf__panel-slot">
        {phase !== 'idle' && (
          <div
            className={['raf__panel', panelExiting ? 'raf__panel--exiting' : ''].filter(Boolean).join(' ')}
            data-phase={phase}
          >
            <div className="raf__panel-grid">
              <div className="raf__feedback">
                <FeedbackTimer key={timerKey} durationMs={7000} onComplete={handleTimerComplete} />
                <span className="raf__feedback-label">Give Feedback</span>
                <div className="raf__feedback-btns">
                  <Button kind="primary"  size="xs" onClick={() => setPhase('thanks')}>Yes</Button>
                  <Button kind="ghost"    size="xs" onClick={() => dismissPanel()}>No</Button>
                </div>
              </div>
              <div className="raf__thanks">That&rsquo;s alright! We&rsquo;re learning. Carry on&hellip;</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── ChatWindowHeader ─────────────────────────────────────────────────────────

function ChatWindowHeader({ sessionName }: { sessionName?: string }) {
  const optionsRef = useRef<HTMLButtonElement>(null)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const isActive = sessionName !== undefined

  if (!isActive) {
    return (
      <div className="cwh">
        <span className="cwh__placeholder">Hello Again</span>
      </div>
    )
  }

  return (
    <div className="cwh">
      <div className="cwh__back">
        <IconButton kind="ghost" size="sm" iconSize={16} renderIcon={ArrowLeft} aria-label="Back" />
      </div>
      <span className="cwh__title" title={sessionName}>{sessionName}</span>
      <div className="cwh__actions">
        <IconButton
          ref={optionsRef}
          kind="ghost" size="sm" iconSize={16}
          renderIcon={More}
          aria-label="Session options"
          aria-expanded={optionsOpen}
          onClick={() => setOptionsOpen(v => !v)}
        />
        <Flyout
          open={optionsOpen}
          onOpenChange={setOptionsOpen}
          anchorRef={optionsRef}
          mode="single"
          placement="bottom-end"
          onSelectionChange={() => setOptionsOpen(false)}
        >
          <FlyoutList>
            <FlyoutItem value="rename" renderIcon={Edit}>Rename</FlyoutItem>
            <FlyoutItem value="delete" renderIcon={Delete} className="cwh-flyout-item--danger">Delete</FlyoutItem>
          </FlyoutList>
        </Flyout>
        <IconButton kind="ghost" size="sm" iconSize={16} renderIcon={Plus} aria-label="New chat" />
      </div>
    </div>
  )
}

// ─── PastSessionRow ───────────────────────────────────────────────────────────

function PastSessionRow({ id, label }: { id: string; label: string }) {
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const kebabRef = useRef<HTMLButtonElement>(null)

  return (
    <div
      className={['ps-row', flyoutOpen ? 'ps-row--menu-open' : ''].filter(Boolean).join(' ')}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      <span className="ps-row__label">{label}</span>
      <span className="ps-row__actions" onClick={e => e.stopPropagation()}>
        <IconButton
          ref={kebabRef}
          kind="ghost" size="sm" iconSize={16}
          renderIcon={More}
          aria-label={`Options for ${label}`}
          onClick={e => { e.stopPropagation(); setFlyoutOpen(v => !v) }}
        />
      </span>
      <Flyout
        open={flyoutOpen}
        onOpenChange={setFlyoutOpen}
        anchorRef={kebabRef}
        mode="single"
        placement="bottom-end"
        onSelectionChange={() => setFlyoutOpen(false)}
      >
        <FlyoutList>
          <FlyoutItem value="rename" renderIcon={Edit}>Rename</FlyoutItem>
          <FlyoutItem value="delete" renderIcon={Delete} className="ps-flyout-item--danger">Delete</FlyoutItem>
        </FlyoutList>
      </Flyout>
    </div>
  )
}

// ─── TableRef — row reference inserted into the PEF ──────────────────────────

interface TableRef {
  /** Always 'row' for row-level references from the opportunities table. */
  type: 'row' | 'column'
  /** Cell values: first entry is bold anchor, rest are comma-separated. */
  values: string[]
}

/**
 * PEFTableRefBlock — renders the selected row reference inside the PEF.
 * Mirrors the PEFTableRefBlock from prompt-entry-field.stories.tsx.
 * Uses pef__table-ref CSS classes from prompt-entry-field.css (already imported).
 */
function PEFTableRefBlock({
  type,
  values,
  onRemove,
}: TableRef & { onRemove: () => void }) {
  const [first, ...rest] = values
  return (
    <div className="pef__table-ref">
      <div className="pef__table-ref-body">
        <div className="pef__table-ref-header">
          <Tags
            size="default"
            color="cobalt"
            contrast="low"
            shape="rounded"
            icon
            renderIcon={GridHorizontal}
            label={type === 'row' ? 'Row' : 'Column'}
          />
        </div>
        <p className="pef__table-ref-values">
          <span className="pef__table-ref-first">{first}</span>
          {rest.length > 0 && <span>, {rest.join(', ')}</span>}
        </p>
      </div>
      <div className="pef__table-ref-close">
        <IconButton
          kind="ghost"
          size="sm"
          iconSize={16}
          renderIcon={Close}
          aria-label="Remove table reference"
          onClick={onRemove}
        />
      </div>
    </div>
  )
}

// ─── PromptEntryField (simplified interactive) ────────────────────────────────

function ChatPromptField({
  tableRef,
  onRemoveTableRef,
}: {
  tableRef?: TableRef
  onRemoveTableRef?: () => void
}) {
  const [value,   setValue]   = useState('')
  const [focused, setFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const syncHeight = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [])

  useEffect(() => { syncHeight() }, [value, syncHeight])

  // Elevated when focused, has text, OR has a table reference attached
  const isElevated = focused || value.trim().length > 0 || !!tableRef

  return (
    <div
      className={['pef', isElevated ? 'pef--elevated pef--active' : ''].filter(Boolean).join(' ')}
      role="group"
      aria-label="AI prompt input"
    >
      {/* Table reference block — sits above the textarea, dismissable */}
      {tableRef && (
        <PEFTableRefBlock
          {...tableRef}
          onRemove={() => onRemoveTableRef?.()}
        />
      )}

      <textarea
        ref={textareaRef}
        className="pef__textarea"
        placeholder={tableRef ? 'Ask about this row…' : 'Ready when you are…'}
        value={value}
        rows={1}
        aria-label="Prompt"
        onChange={e => { setValue(e.target.value); syncHeight() }}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (value.trim()) setValue('')
          }
        }}
        onFocus={() => setFocused(true)}
        onBlur={()  => setFocused(false)}
      />
      <div className="pef__actions">
        <IconButton kind="ghost"   size="sm" iconSize={16} renderIcon={Plus}    aria-label="Attach" />
        <IconButton kind="primary" size="sm" iconSize={16} renderIcon={ArrowUp} aria-label="Submit"
          onClick={() => { if (value.trim()) setValue('') }}
        />
      </div>
    </div>
  )
}

// ─── IterativeSource — source tag inside derivation step ──────────────────────

function StepSource({
  source,
  subPath,
  lastUpdated,
}: {
  source:      'salesforce' | 'peopleai' | null
  subPath:     string | null
  lastUpdated: string | null
}) {
  if (!source) return null
  const name = source === 'salesforce' ? 'Salesforce' : 'people.ai'
  return (
    <div className="air__it-source">
      <span className="air__it-tag">
        <img src={LOGOS[source]} className="air__wb-logo" alt="" aria-hidden="true" />
        <span className="air__wb-source-name">{name}</span>
        {subPath && <span className="air__it-source-meta">{subPath}</span>}
        <span className="air__it-tag-launch" aria-hidden="true">
          <ExternalLink size={11} />
        </span>
      </span>
      {lastUpdated && (
        <span className="air__it-last-updated">Last updated {lastUpdated}</span>
      )}
    </div>
  )
}

// ─── RetraceChip + DerivationPanel (G — Distinguished) ───────────────────────

function AIResponseBlock({
  showTable = false,
  selectedRowId = null,
  onSelectRow,
}: {
  showTable?: boolean
  selectedRowId?: string | null
  onSelectRow?: (id: string, values: string[]) => void
}) {
  const [open, setOpen] = useState(false)

  // ── ResponseActions state (lifted) ──────────────────────────────────────
  const [liked,        setLiked]        = useState(false)
  const [disliked,     setDisliked]     = useState(false)
  const [phase,        setPhase]        = useState<FeedbackPhase>('idle')
  const [panelExiting, setPanelExiting] = useState(false)
  const [timerKey,     setTimerKey]     = useState(0)

  // Unique sources for the chip logo stack
  const uniqueSources = STEPS.reduce<Array<'salesforce' | 'peopleai'>>((acc, s) => {
    if (s.source && !acc.includes(s.source)) acc.push(s.source)
    return acc
  }, [])

  // Vancouver citation numbers: sequential among steps that have a source
  let _citIdx = 0
  const stepCitNums: (number | null)[] = STEPS.map(s =>
    s.source !== null ? ++_citIdx : null
  )

  // Cited steps for the Sources section at the bottom
  const distSources: Array<{ step: ChatStep; citNum: number }> = []
  STEPS.forEach((step, i) => {
    const citNum = stepCitNums[i]
    if (citNum !== null) distSources.push({ step, citNum })
  })

  // ── Feedback handlers ────────────────────────────────────────────────────
  const dismissPanel = (callback?: () => void) => {
    setPanelExiting(true)
    setTimeout(() => {
      setPhase('idle')
      setDisliked(false)
      setPanelExiting(false)
      callback?.()
    }, 110)
  }

  const handleLike = () => {
    if (disliked) { setDisliked(false); setPhase('idle') }
    setLiked(v => !v)
  }

  const handleDislike = () => {
    if (phase !== 'idle') { dismissPanel(); return }
    if (liked) setLiked(false)
    setDisliked(true)
    setPhase('feedback')
    setTimerKey(k => k + 1)
  }

  const handleTimerComplete = () =>
    setPhase(current => (current === 'feedback' ? 'thanks' : current))

  useEffect(() => {
    if (phase !== 'thanks') return
    const t = setTimeout(() => dismissPanel(), 3000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  return (
    <div className="cp-ai-block">
      <p className="cp-ai-response">
        Three AMER deals are stalled post-evaluation: Northbay Financial ($1.4M),
        Apex Logistics ($820K), and Meridian Health ($2.1M). Each cleared the POC
        but hasn&rsquo;t converted to a buying motion — no Economic Buyer engagement
        in the 45 days since evaluation closed.
      </p>

      {/* ── Opportunities table — shown only in the table variant ─────── */}
      {showTable && (
        <div className="cp-response-table">
          <OpportunitiesTable
            selectedId={selectedRowId}
            onSelectRow={onSelectRow ?? (() => {})}
          />
        </div>
      )}

      {/* ── Trace chip + icon buttons + derivation panel — all inside .air--inline
           so chip CSS selectors (.air--inline .air__chip etc.) resolve correctly ── */}
      <div className="air air--inline air--distinguished cp-air-inline">
        {/* Actions row: chip (left) + icon buttons (right), 16px gap */}
        <div className="cp-actions-row">
          <div className="air__chip-wrap">
            <button
              type="button"
              className={['air__chip', open ? 'air__chip--open' : ''].filter(Boolean).join(' ')}
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
            >
              <span className="air__logo-stack" aria-hidden="true">
                {uniqueSources.map(src => (
                  <img
                    key={src}
                    src={LOGOS[src]}
                    className="air__logo-stack__item"
                    alt={src === 'salesforce' ? 'Salesforce' : 'people.ai'}
                  />
                ))}
              </span>
              <span>Trace</span>
              <span className="air__chip-arrow" aria-hidden="true">
                <ChevronDown size={12} />
              </span>
            </button>
          </div>

          {/* Icon buttons — 8px gap via .cp-actions-row .raf__buttons */}
          <div className="raf__buttons">
            <IconButton
              kind="ghost" size="xs" iconSize={16}
              renderIcon={ThumbsDown}
              isSelected={disliked}
              aria-label={disliked ? 'Undo dislike' : 'Dislike response'}
              onClick={handleDislike}
            />
            <IconButton
              kind="ghost" size="xs" iconSize={16}
              renderIcon={ThumbsUp}
              isSelected={liked}
              aria-label={liked ? 'Unlike response' : 'Like response'}
              onClick={handleLike}
            />
            <IconButton
              kind="ghost" size="xs" iconSize={16}
              renderIcon={Copy}
              aria-label="Copy response"
            />
          </div>
        </div>

        {/* Derivation panel — opens below the actions row */}
        <div className="air__panel" aria-hidden={!open ? 'true' : undefined}>
          <ol className="air__steps">
            {STEPS.map((step, i) => {
              const num    = String(i + 1).padStart(2, '0')
              const citNum = stepCitNums[i]
              return (
                <li key={i} className="air__step">
                  <span className="air__step-num">{num}</span>
                  <div className="air__step-body">
                    <span className="air__step-text">
                      {step.text}
                      {citNum !== null && (
                        <sup className="air__dist-cite">[{citNum}]</sup>
                      )}
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>

          {distSources.length > 0 && (
            <div className="air__dist-sources">
              <h3 className="air__dist-sources-heading">Sources</h3>
              <ol className="air__dist-sources-list">
                {distSources.map(({ step: s, citNum }) => (
                  <li key={citNum} className="air__dist-source-row">
                    <span className="air__dist-cite-num">
                      [{String(citNum).padStart(2, '0')}]
                    </span>
                    <StepSource source={s.source} subPath={s.subPath} lastUpdated={s.lastUpdated} />
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* ── Give Feedback — full width, aligned with text, 12px below row ─ */}
      {phase !== 'idle' && (
        <div className="cp-feedback-slot">
          <div
            className={['raf__panel cp-feedback-panel', panelExiting ? 'raf__panel--exiting' : ''].filter(Boolean).join(' ')}
            data-phase={phase}
          >
            <div className="raf__panel-grid">
              <div className="raf__feedback">
                <FeedbackTimer key={timerKey} durationMs={7000} onComplete={handleTimerComplete} />
                <span className="raf__feedback-label">Give Feedback</span>
                <div className="raf__feedback-btns">
                  <Button kind="primary" size="xs" onClick={() => setPhase('thanks')}>Yes</Button>
                  <Button kind="ghost"   size="xs" onClick={() => dismissPanel()}>No</Button>
                </div>
              </div>
              <div className="raf__thanks">That&rsquo;s alright! We&rsquo;re learning. Carry on&hellip;</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Opportunities table data ─────────────────────────────────────────────────

interface Opportunity {
  id:      string
  opp:     string
  account: string
  value:   string
}

const OPPORTUNITIES: Opportunity[] = [
  { id: '1', opp: 'Prisma Cloud Enterprise',  account: 'Northbay Financial', value: '$1.4M' },
  { id: '2', opp: 'Cortex XDR Rollout',       account: 'Apex Logistics',     value: '$820K' },
  { id: '3', opp: 'SASE Platform Adoption',   account: 'Meridian Health',    value: '$2.1M' },
  { id: '4', opp: 'Strata Cloud Expansion',   account: 'Triton Global',      value: '$650K' },
  { id: '5', opp: 'Zero Trust Pilot Program', account: 'Cascade Systems',    value: '$480K' },
]

// ─── OpportunitiesTable — built on the .dt SelectableTable class system ───────
//
// Uses the same .dt, .dt__head, .dt__header-cell, .dt__body, .dt__row,
// .dt__cell, .dt__divider, .dt__row-btn, .dt__select-btn classes as the
// ai-interactions/Selectable Table component — not a custom implementation.
// --dt-cols is overridden in chat-panel.css to 3 columns for this context.

function OpportunitiesTable({
  selectedId,
  onSelectRow,
}: {
  selectedId: string | null
  onSelectRow: (id: string, values: string[]) => void
}) {
  return (
    <div className="dt" role="grid" aria-label="Opportunities">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="dt__head">
        {[
          { id: 'opp',     label: 'Opportunity Name', align: 'left'  as const },
          { id: 'account', label: 'Account Name',     align: 'left'  as const },
          { id: 'value',   label: 'Value',            align: 'right' as const },
        ].map(col => (
          <div key={col.id} className="dt__header-cell">
            <Header size="sm" alignment={col.align}>{col.label}</Header>
          </div>
        ))}
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="dt__body">
        {OPPORTUNITIES.map((row, i) => (
          <React.Fragment key={row.id}>
            {i > 0 && <div className="dt__divider" />}
            <div
              className={[
                'dt__row',
                selectedId === row.id ? 'dt__row--selected' : '',
              ].filter(Boolean).join(' ')}
              role="row"
              aria-selected={selectedId === row.id}
            >
              <div className="dt__cell">
                <CellContents content="text" text={row.opp} alignment="left" />
              </div>
              <div className="dt__cell">
                <CellContents content="text" text={row.account} alignment="left" />
              </div>
              <div className="dt__cell">
                <CellContents content="numbers" text={row.value} alignment="right" />
              </div>

              {/*
                Row selector button — appears on hover, left side.
                Click → inserts a row reference into the PEF (toggle: click again to deselect).
                Stops propagation so clicking the button doesn't bubble to the row div.
              */}
              <div className="dt__row-btn">
                <IconButton
                  kind="ghost"
                  size="xs"
                  iconSize={16}
                  renderIcon={CommentAdd}
                  aria-label={`Add row to prompt: ${row.opp}`}
                  className="dt__select-btn"
                  onClick={e => {
                    e.stopPropagation()
                    onSelectRow(row.id, [row.opp, row.account, row.value])
                  }}
                />
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

// ─── Drag-to-resize wrapper ───────────────────────────────────────────────────

const PANEL_MIN = 280
const PANEL_MAX = 640
const PANEL_DEFAULT = 400

/**
 * ResizablePanel — wraps any panel child and adds a left-edge drag handle.
 * Dragging left widens the panel; dragging right narrows it.
 * Width is clamped to [PANEL_MIN, PANEL_MAX].
 */
function ResizablePanel({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState(PANEL_DEFAULT)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const startWidth = useRef(PANEL_DEFAULT)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    startX.current = e.clientX
    startWidth.current = width
    setDragging(true)

    const onMove = (ev: MouseEvent) => {
      const delta = startX.current - ev.clientX   // drag left → positive delta → wider
      const next = Math.min(PANEL_MAX, Math.max(PANEL_MIN, startWidth.current + delta))
      setWidth(next)
    }

    const onUp = () => {
      setDragging(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [width])

  return (
    <div
      className="cp-panel-resize-wrapper"
      style={{ width: `${width}px` }}
    >
      <div
        className={['cp-resize-handle', dragging ? 'cp-resize-handle--dragging' : ''].filter(Boolean).join(' ')}
        onMouseDown={onMouseDown}
        role="separator"
        aria-label="Resize panel"
        aria-orientation="vertical"
      />
      {children}
    </div>
  )
}

// ─── Suggestion button inline style ──────────────────────────────────────────

const suggestionStyle: React.CSSProperties = {
  height: 'auto',
  whiteSpace: 'normal',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  textAlign: 'left',
  width: '100%',
}

// ─── Empty panel ──────────────────────────────────────────────────────────────

export function EmptyChatPanel() {
  return (
    <div className="cp-panel">
      <ChatWindowHeader />

      <div className="cp-body">
        <div className="cp-empty">
          {/* Past sessions */}
          <p className="cp-section-label">Recent</p>
          <div className="ps-list">
            {SESSIONS.map(s => (
              <PastSessionRow key={s.id} id={s.id} label={s.label} />
            ))}
          </div>
          <div className="ps-view-more">
            <Button kind="ghost" size="small" renderIcon={ChevronDown} iconPosition="right">
              View more
            </Button>
          </div>

          {/* Spacer maintains vertical rhythm — no visible line */}
          <div className="cp-section-spacer" />

          {/* Suggested prompts */}
          <p className="cp-section-label">Suggestions</p>
          <div className="sg-list">
            {SUGGESTIONS.map(s => (
              <Button
                key={s.id}
                kind="secondary"
                size="small"
                renderIcon={AiPromptIcon}
                iconPosition="right"
                style={suggestionStyle}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="cp-footer">
        <ChatPromptField />
      </div>
    </div>
  )
}

// ─── Active panel ─────────────────────────────────────────────────────────────

function ActiveChatPanel() {
  const sessionName = 'Which of my Prisma Cloud deals in AMER are stalled at technical evaluation?'

  return (
    <div className="cp-panel">
      <ChatWindowHeader sessionName={sessionName} />

      <div className="cp-body">
        <div className="cp-conversation">
          {/* User message */}
          <div className="um-message-group">
            <div className="um">
              <p className="um__text">{sessionName}</p>
            </div>
          </div>

          {/* AI response */}
          <AIResponseBlock />
        </div>
      </div>

      <div className="cp-footer">
        <ChatPromptField />
      </div>
    </div>
  )
}

// ─── Active panel — with table attachment ────────────────────────────────────

function ActiveWithTableChatPanel() {
  const sessionName = 'Which of my Prisma Cloud deals in AMER are stalled at technical evaluation?'

  // Table reference state — lifted here so both the table and the PEF share it.
  // Clicking the CommentAdd button on a row → inserts a row ref into the PEF.
  // Clicking again (toggle) or pressing ✕ in the PEF → clears the ref.
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
  const [tableRef,      setTableRef]      = useState<TableRef | undefined>(undefined)

  const handleSelectRow = (id: string, values: string[]) => {
    if (selectedRowId === id) {
      // Toggle off — deselect
      setSelectedRowId(null)
      setTableRef(undefined)
    } else {
      setSelectedRowId(id)
      setTableRef({ type: 'row', values })
    }
  }

  const handleRemoveTableRef = () => {
    setSelectedRowId(null)
    setTableRef(undefined)
  }

  return (
    <div className="cp-panel">
      <ChatWindowHeader sessionName={sessionName} />

      <div className="cp-body">
        <div className="cp-conversation">
          {/* User message */}
          <div className="um-message-group">
            <div className="um">
              <p className="um__text">{sessionName}</p>
            </div>
          </div>

          {/* AI response — table is part of the response, not the footer */}
          <AIResponseBlock
            showTable
            selectedRowId={selectedRowId}
            onSelectRow={handleSelectRow}
          />
        </div>
      </div>

      <div className="cp-footer">
        <ChatPromptField
          tableRef={tableRef}
          onRemoveTableRef={handleRemoveTableRef}
        />
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title:      'ai-interactions/Chat Panel',
  parameters: { layout: 'fullscreen' },
}

export default meta

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Empty — zero state. No active session. Past sessions and suggested prompts
 * ensure the panel is never a blank page when a user first opens it.
 */
export const Empty: StoryObj = {
  name:   'Empty',
  render: () => (
    <div className="cp-canvas">
      <ResizablePanel>
        <EmptyChatPanel />
      </ResizablePanel>
    </div>
  ),
}

/**
 * Active — live session. One user message followed by one AI response.
 * Click the Retrace chip to expand the five-step derivation panel with
 * icon-node spine and source tags. Response actions (like / dislike / copy)
 * are fully wired, including the dislike feedback flow.
 */
export const Active: StoryObj = {
  name:   'Active',
  render: () => (
    <div className="cp-canvas">
      <ResizablePanel>
        <ActiveChatPanel />
      </ResizablePanel>
    </div>
  ),
}

/**
 * Active — with table. Same conversation as Active, but the footer now has an
 * opportunities table pinned above the prompt entry field. Click any row to
 * select it (click again to deselect). Single-selection; headers are
 * non-interactive.
 */
export const ActiveWithTable: StoryObj = {
  name:   'Active - with table',
  render: () => (
    <div className="cp-canvas">
      <ResizablePanel>
        <ActiveWithTableChatPanel />
      </ResizablePanel>
    </div>
  ),
}
