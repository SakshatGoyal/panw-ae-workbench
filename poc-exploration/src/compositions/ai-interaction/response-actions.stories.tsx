/**
 * ai-interactions/Response Actions
 *
 * Compact feedback controls rendered beneath an AI response.
 *
 * Layout: full-width row, panel on left / buttons on right.
 *   Buttons (DOM left-to-right = visual right-to-left): Dislike | Like | Copy
 *   Panel: feedback or thanks, crossfades in the same grid cell
 *
 * Dislike state machine:
 *   idle     → (click dislike)   → feedback  (7 s timer)
 *   feedback → (timer / Yes)     → thanks    (3 s display)
 *   feedback → (No / re-click)   → idle
 *   thanks   → (3 s display)     → idle
 *
 * Crossfade (feedback → thanks):
 *   CSS data-phase attribute drives simultaneous raf-fade-out on .raf__feedback
 *   and raf-fade-in on .raf__thanks — both at 120ms, Carbon entrance/exit curves.
 *   No JS timing required for the crossfade itself.
 *
 * Token contract:
 *   action buttons  kind="ghost" (+ isSelected for active states)
 *   timer track     var(--ds-lines-neutral-rest)
 *   timer progress  var(--ds-lines-brand-rest)
 *   feedback label  var(--ds-text-tertiary-rest)  12px
 *   thanks text     var(--ds-text-secondary-rest)  12px
 *   Yes button      kind="primary" size="small"
 *   No button       kind="ghost"   size="small"
 */
import type { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useRef, useState } from 'react'
import { Button, IconButton } from '@ds/button'
import { Copy, ThumbsUp } from '@ds/icons'
import './response-actions.css'

// ─── ThumbsDown (ThumbsUp mirrored vertically) ───────────────────────────────

// No ThumbsDown in @ds/icons. scaleY(-1) on the SVG produces a correct
// thumbs-down glyph from the ThumbsUp path.
// Only the props renderIcon actually passes (size, className, aria-label) —
// no index signature to avoid `unknown` spreading onto SVGElement.

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

// ─── Feedback timer donut ─────────────────────────────────────────────────────

// 14×14 SVG circle, r=5, stroke-width=2.5. Circumference ≈ 31.42 px.
// CSS animation drains stroke-dashoffset over durationMs (7000ms).
// Re-keyed from parent to restart the animation on each new dislike click.

interface FeedbackTimerProps {
  durationMs: number
  onComplete: () => void
}

function FeedbackTimer({ durationMs, onComplete }: FeedbackTimerProps) {
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const t = setTimeout(() => onCompleteRef.current(), durationMs)
    return () => clearTimeout(t)
  }, [durationMs])

  const r = 5
  const circumference = 2 * Math.PI * r // ≈ 31.42

  return (
    <svg className="raf__timer" width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx={7} cy={7} r={r} stroke="var(--ds-lines-neutral-rest)" strokeWidth={2.5} />
      <circle
        cx={7}
        cy={7}
        r={r}
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

// ─── Types ────────────────────────────────────────────────────────────────────

type FeedbackPhase = 'idle' | 'feedback' | 'thanks'

interface ResponseActionsProps {
  onCopy?: () => void
  onLike?: () => void
  onDislike?: () => void
  onFeedbackYes?: () => void
  onFeedbackNo?: () => void
}

// ─── Component ───────────────────────────────────────────────────────────────

function ResponseActions({
  onCopy,
  onLike,
  onDislike,
  onFeedbackYes,
  onFeedbackNo,
}: ResponseActionsProps) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [phase, setPhase] = useState<FeedbackPhase>('idle')
  const [panelExiting, setPanelExiting] = useState(false)
  // Incrementing key re-mounts FeedbackTimer on each new dislike click, restarting the drain.
  const [timerKey, setTimerKey] = useState(0)

  // ─ Handlers ─────────────────────────────────────────────────────────────

  const handleCopy = () => onCopy?.()

  const handleLike = () => {
    if (disliked) {
      setDisliked(false)
      setPhase('idle')
    }
    setLiked((v) => !v)
    onLike?.()
  }

  // Fades the panel out, then unmounts it and resets disliked state.
  const dismissPanel = (callback?: () => void) => {
    setPanelExiting(true)
    setTimeout(() => {
      setPhase('idle')
      setDisliked(false)
      setPanelExiting(false)
      callback?.()
    }, 110) // matches raf-panel-exit duration
  }

  const handleDislike = () => {
    // Second click while panel is open: dismiss (undo)
    if (phase !== 'idle') {
      dismissPanel()
      return
    }
    if (liked) setLiked(false)
    setDisliked(true)
    setPhase('feedback')
    setTimerKey((k) => k + 1)
    onDislike?.()
  }

  const handleTimerComplete = () => {
    // Functional update avoids stale closure on `phase`
    setPhase((current) => (current === 'feedback' ? 'thanks' : current))
  }

  const handleFeedbackYes = () => {
    // Jump to thanks immediately, skipping remaining timer
    setPhase('thanks')
    onFeedbackYes?.()
  }

  const handleFeedbackNo = () => {
    dismissPanel(onFeedbackNo)
  }

  // ─ Thanks auto-dismiss after 3 s ────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'thanks') return
    const displayTimer = setTimeout(() => {
      dismissPanel()
    }, 3000)
    return () => clearTimeout(displayTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // ─ Render ────────────────────────────────────────────────────────────────

  return (
    <div className="raf">
      {/* ── Left: feedback panel ──────────────────────────────────────────── */}
      <div className="raf__panel-slot">
        {phase !== 'idle' && (
          <div
            className={[
              'raf__panel',
              panelExiting ? 'raf__panel--exiting' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            data-phase={phase}
          >
            {/*
             * Grid overlay: both content blocks occupy the same cell.
             * data-phase on the parent triggers the crossfade via CSS selectors —
             * no JS timing required for the fade between feedback and thanks.
             */}
            <div className="raf__panel-grid">
              {/* Feedback: timer + label + Yes/No */}
              <div className="raf__feedback">
                <FeedbackTimer
                  key={timerKey}
                  durationMs={7000}
                  onComplete={handleTimerComplete}
                />
                <span className="raf__feedback-label">Give Feedback</span>
                <div className="raf__feedback-btns">
                  <Button kind="primary" size="small" onClick={handleFeedbackYes}>
                    Yes
                  </Button>
                  <Button kind="ghost" size="small" onClick={handleFeedbackNo}>
                    No
                  </Button>
                </div>
              </div>

              {/* Thanks: message fades in when phase becomes 'thanks' */}
              <div className="raf__thanks">
                That&rsquo;s alright! We&rsquo;re learning. Carry on&hellip;
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Right: icon buttons (DOM order: dislike → like → copy) ───────── */}
      {/* Visual reading right-to-left = copy | like | dislike per spec      */}
      <div className="raf__buttons">
        <IconButton
          kind="ghost"
          size="sm"
          iconSize={16}
          renderIcon={ThumbsDown}
          isSelected={disliked}
          aria-label={disliked ? 'Undo dislike' : 'Dislike response'}
          onClick={handleDislike}
        />
        <IconButton
          kind="ghost"
          size="sm"
          iconSize={16}
          renderIcon={ThumbsUp}
          isSelected={liked}
          aria-label={liked ? 'Unlike response' : 'Like response'}
          onClick={handleLike}
        />
        <IconButton
          kind="ghost"
          size="sm"
          iconSize={16}
          renderIcon={Copy}
          aria-label="Copy response"
          onClick={handleCopy}
        />
      </div>
    </div>
  )
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ResponseActions> = {
  title: 'ai-interactions/Response Actions',
  component: ResponseActions,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof ResponseActions>

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Interactive — rendered inside a representative message card.
 * Click Dislike to trigger the full feedback flow.
 * Like and Copy fire events into the log strip below.
 */
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [events, setEvents] = useState<string[]>([])
    const log = (msg: string) => setEvents((prev) => [msg, ...prev].slice(0, 6))

    return (
      <div className="raf-canvas">
        <div className="raf-demo">
          <div className="raf-demo__group">
            <div className="raf-demo__label">AI Response</div>
            <div className="raf-message">
              <p className="raf-message__text">
                Strata Cloud Manager reduces operational overhead by centralising policy
                management across all NGFW deployments — on-premises, virtualized, and
                cloud-delivered. A single pane eliminates per-device configuration drift
                and replaces manual rule audits with automated compliance checks.
              </p>
              <div className="raf-message__actions">
                <ResponseActions
                  onCopy={() => log('Copied response to clipboard')}
                  onLike={() => log('Liked response')}
                  onDislike={() => log('Dislike — feedback panel open')}
                  onFeedbackYes={() => log('Feedback: Yes — acknowledged')}
                  onFeedbackNo={() => log('Feedback: No — dismissed')}
                />
              </div>
            </div>
          </div>

          {events.length > 0 && (
            <div className="raf-demo__group">
              <div className="raf-demo__label">Event log</div>
              <div className="raf-event-log">
                {events.map((e, i) => (
                  <div key={i} className="raf-event-log__entry">
                    {e}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  },
}

/**
 * Rest state — three ghost buttons right-aligned, no panel.
 * Visual token and spacing QA.
 */
export const RestState: Story = {
  render: () => (
    <div className="raf-canvas">
      <div className="raf-demo">
        <div className="raf-demo__group">
          <div className="raf-demo__label">Rest — all outline</div>
          <ResponseActions />
        </div>
      </div>
    </div>
  ),
}

/**
 * Multiple responses — each row carries independent state.
 * Triggering the flow on one row does not affect others.
 */
export const MultipleResponses: Story = {
  render: () => (
    <div className="raf-canvas">
      <div className="raf-demo">
        <div className="raf-demo__group">
          <div className="raf-demo__label">Independent rows</div>
          {[
            'Strata Cloud Manager centralises policy management across all NGFW deployments, eliminating per-device drift.',
            'Cortex XSOAR can automate phishing triage end-to-end — ingest alert, enrich indicators, notify SOC, and close ticket.',
            'Zero trust architecture starts with identity — every access request is authenticated and authorised regardless of network location.',
          ].map((text, i) => (
            <div key={i} className="raf-message" style={{ marginBottom: 8 }}>
              <p className="raf-message__text">{text}</p>
              <div className="raf-message__actions">
                <ResponseActions />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}
