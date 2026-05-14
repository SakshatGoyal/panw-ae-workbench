/**
 * ai-interactions/Thought Stream
 *
 * Composable blocks that visualise how an AI agent reasons, fetches data,
 * and draws conclusions — visible to a sales AE before the final answer arrives.
 *
 * Three block types, designed as Lego bricks that stack into a vertical timeline:
 *
 *   ThinkStep   — internal reasoning prose. Neutral dot marker. Quiet text.
 *                 Active state shows brand-pulsing dot + streaming cursor.
 *
 *   ActionStep  — a concrete tool call or data pull. Tool-type icon in track.
 *                 Shows: label · description · skeleton (active) / result + source chips (complete).
 *
 *   FindingStep — key synthesised conclusion. Brand dot (permanent — stays brand
 *                 even after complete). text.primary at weight 500.
 *
 * Platform attribution is agnostic — source chips show data category
 * ("CRM System", "Email History") not platform brand.
 *
 * Token contract:
 *   track dot (think, complete)    var(--ds-icons-tertiary-rest)
 *   track dot (active)             var(--ds-brand-rest) + pulse animation
 *   track dot (finding)            var(--ds-brand-rest) always
 *   track line                     var(--ds-lines-neutral-tile-rest)
 *   think text                     var(--ds-text-secondary-rest)   13px/400
 *   action label                   var(--ds-text-secondary-rest)   13px/500
 *   action description             var(--ds-text-tertiary-rest)    12px/400
 *   action result                  var(--ds-text-secondary-rest)   12px/400
 *   source chips                   var(--ds-surface-alt) bg + neutral-rest border
 *   finding text                   var(--ds-text-primary)          13px/500
 */
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  Analytics,
  Check,
  ChartMixed,
  Data,
  Envelope,
  ExclamationCircle,
  OpenPipeline,
  ProgressCircle,
  Search,
  Server,
} from '@ds/icons'
import './thought-stream.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type StepStatus = 'pending' | 'active' | 'complete' | 'error'

interface SourceChip {
  label: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
}

interface ThinkStepProps {
  status: StepStatus
  text: string
}

interface ActionStepProps {
  status: StepStatus
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  description?: string
  result?: string
  sources?: SourceChip[]
}

interface FindingStepProps {
  status: StepStatus
  text: string
}

// ─── Step track ───────────────────────────────────────────────────────────────

interface TrackProps {
  marker: React.ReactNode
  isLast?: boolean
}

function Track({ marker, isLast }: TrackProps) {
  return (
    <div className="ts__track">
      <div className="ts__track-marker">{marker}</div>
      {!isLast && <div className="ts__track-line" />}
    </div>
  )
}

// ─── ThinkStep ────────────────────────────────────────────────────────────────

function ThinkStep({ status, text }: ThinkStepProps) {
  const dot = (
    <div className={`ts__dot ts__dot--think ts__dot--${status}`} />
  )

  return (
    <div className="ts__step">
      <Track marker={dot} />
      <div className="ts__content">
        <p className={`ts__think-text${status === 'active' ? ' ts__think-text--active' : ''}`}>
          {text}
        </p>
      </div>
    </div>
  )
}

// ─── ActionStep ───────────────────────────────────────────────────────────────

function ActionStep({
  status,
  icon: Icon,
  label,
  description,
  result,
  sources,
}: ActionStepProps) {
  const marker = (
    <Icon size={14} className={`ts__action-icon ts__action-icon--${status}`} />
  )

  const showSkeleton = status === 'active'
  const showResult = status === 'complete' && result
  const showSources = status === 'complete' && sources && sources.length > 0

  return (
    <div className="ts__step">
      <Track marker={marker} />
      <div className="ts__content">
        {/* Header: label + status indicator */}
        <div className="ts__action-header">
          <span className="ts__action-label">{label}</span>
          <div className="ts__action-status">
            {status === 'active' && (
              <ProgressCircle size={12} className="ts__spinner" />
            )}
            {status === 'complete' && (
              <Check size={12} className="ts__check" />
            )}
            {status === 'error' && (
              <ExclamationCircle size={12} className="ts__error-icon" />
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="ts__action-description">{description}</p>
        )}

        {/* Skeleton while fetching */}
        {showSkeleton && (
          <div className="ts__action-skeleton">
            <div className="ts__skeleton-bar ts__skeleton-bar--long" />
            <div className="ts__skeleton-bar ts__skeleton-bar--short" />
          </div>
        )}

        {/* Result when done */}
        {showResult && <p className="ts__action-result">{result}</p>}

        {/* Source attribution chips */}
        {showSources && (
          <div className="ts__sources">
            {sources!.map((chip, i) => (
              <span key={i} className="ts__source-chip">
                {chip.icon && (
                  <span className="ts__source-chip-icon">
                    <chip.icon size={10} />
                  </span>
                )}
                {chip.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── FindingStep ──────────────────────────────────────────────────────────────

function FindingStep({ status, text }: FindingStepProps) {
  const dot = (
    <div className={`ts__dot ts__dot--finding ts__dot--${status}`} />
  )

  return (
    <div className="ts__step">
      <Track marker={dot} />
      <div className="ts__content">
        <p
          className={`ts__finding-text${
            status === 'active' ? ' ts__finding-text--active' : ''
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

// ─── ThoughtStream wrapper ────────────────────────────────────────────────────

function ThoughtStream({ children }: { children: React.ReactNode }) {
  return <div className="ts">{children}</div>
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'ai-interactions/Thought Stream',
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * FullStream — a completed thought sequence for a realistic sales AE request.
 * All steps are in `complete` state; the finding at the bottom is the deliverable.
 *
 * Query: "Find my top Prisma Cloud deals in AMER stalled at technical eval"
 */
export const FullStream: Story = {
  render: () => (
    <div className="ts-canvas">
      <div className="ts-demo">
        <div className="ts-demo__group">
          <div className="ts-demo__label">Completed reasoning chain</div>
          <div className="ts-panel">
            <ThoughtStream>
              <ThinkStep
                status="complete"
                text="I need to find your open Prisma Cloud opportunities in AMER that are stalled at the technical evaluation stage. Let me start by pulling your active pipeline."
              />
              <ActionStep
                status="complete"
                icon={OpenPipeline}
                label="Querying pipeline"
                description="Prisma Cloud · AMER region · Technical eval stage · Open"
                result="Found 14 opportunities matching your criteria"
                sources={[
                  { label: 'CRM System' },
                  { label: '14 Opportunities' },
                  { label: 'Q2 2025' },
                ]}
              />
              <ThinkStep
                status="complete"
                text="Now I need to surface which of these 14 deals have seen recent engagement — emails, calls, or meeting notes in the last 30 days. I'll also flag any that have gone completely dark."
              />
              <ActionStep
                status="complete"
                icon={Envelope}
                label="Analyzing engagement signals"
                description="Email threads · Call recordings · Meeting notes · Last 30 days"
                result="3 deals show strong inbound signals. 4 have had zero contact in 30+ days."
                sources={[
                  { label: 'Email History' },
                  { label: 'Call Recordings' },
                  { label: 'Meeting Notes' },
                ]}
              />
              <ActionStep
                status="complete"
                icon={ChartMixed}
                label="Checking forecast entries"
                description="Commit / most likely / pipeline entries · AE-submitted forecasts"
                result="6 of the 14 deals are forecast as commit or best-case this quarter"
                sources={[
                  { label: 'Forecast Platform' },
                  { label: '6 In Forecast' },
                  { label: 'Q2 Close' },
                ]}
              />
              <FindingStep
                status="complete"
                text="Found 3 high-potential deals above $500K with strong buying signals. Zeta Corp ($1.2M) is furthest along — their VP Engineering requested a POC last week. Meridian Health ($800K) re-engaged after 45 days of silence. Apex Logistics ($620K) is in active technical review with a decision deadline this month."
              />
            </ThoughtStream>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * LiveStream — mid-execution. Earlier steps are complete; the agent is currently
 * pulling engagement data. The FindingStep is not yet visible.
 *
 * This is the state a user sees while the AI is working.
 */
export const LiveStream: Story = {
  render: () => (
    <div className="ts-canvas">
      <div className="ts-demo">
        <div className="ts-demo__group">
          <div className="ts-demo__label">In progress</div>
          <div className="ts-panel">
            <ThoughtStream>
              <ThinkStep
                status="complete"
                text="I need to find your open Prisma Cloud opportunities in AMER that are stalled at the technical evaluation stage. Let me start by pulling your active pipeline."
              />
              <ActionStep
                status="complete"
                icon={OpenPipeline}
                label="Querying pipeline"
                description="Prisma Cloud · AMER region · Technical eval stage · Open"
                result="Found 14 opportunities matching your criteria"
                sources={[
                  { label: 'CRM System' },
                  { label: '14 Opportunities' },
                  { label: 'Q2 2025' },
                ]}
              />
              <ThinkStep
                status="complete"
                text="Good — 14 matches. Now checking engagement signals across email, calls, and meeting notes for each account in the last 30 days."
              />
              <ActionStep
                status="active"
                icon={Envelope}
                label="Analyzing engagement signals"
                description="Email threads · Call recordings · Meeting notes · Last 30 days"
              />
            </ThoughtStream>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * BlockShowcase — all three block types with all status states displayed
 * side by side. For design QA and system documentation.
 */
export const BlockShowcase: Story = {
  render: () => (
    <div className="ts-canvas">
      <div className="ts-demo ts-demo--wide">
        {/* ThinkStep states */}
        <div className="ts-demo__group">
          <div className="ts-demo__label">ThinkStep — all states</div>
          <div className="ts-showcase">
            <div className="ts-showcase__col">
              <div className="ts-showcase__col-label">Pending</div>
              <ThoughtStream>
                <ThinkStep
                  status="pending"
                  text="Checking which accounts had VP-level contacts this quarter."
                />
              </ThoughtStream>
            </div>
            <div className="ts-showcase__col">
              <div className="ts-showcase__col-label">Active</div>
              <ThoughtStream>
                <ThinkStep
                  status="active"
                  text="I need to cross-reference deal size against the latest forecast entries"
                />
              </ThoughtStream>
            </div>
            <div className="ts-showcase__col">
              <div className="ts-showcase__col-label">Complete</div>
              <ThoughtStream>
                <ThinkStep
                  status="complete"
                  text="Identified 14 open Prisma Cloud deals in AMER at technical eval stage."
                />
              </ThoughtStream>
            </div>
          </div>
        </div>

        {/* ActionStep states */}
        <div className="ts-demo__group">
          <div className="ts-demo__label">ActionStep — all states</div>
          <div className="ts-showcase">
            <div className="ts-showcase__col">
              <div className="ts-showcase__col-label">Pending</div>
              <ThoughtStream>
                <ActionStep
                  status="pending"
                  icon={Server}
                  label="Querying CRM data"
                  description="Open deals · AMER · Q2"
                />
              </ThoughtStream>
            </div>
            <div className="ts-showcase__col">
              <div className="ts-showcase__col-label">Active</div>
              <ThoughtStream>
                <ActionStep
                  status="active"
                  icon={Search}
                  label="Searching engagement history"
                  description="Email · Calls · Last 30 days"
                />
              </ThoughtStream>
            </div>
            <div className="ts-showcase__col">
              <div className="ts-showcase__col-label">Complete</div>
              <ThoughtStream>
                <ActionStep
                  status="complete"
                  icon={Analytics}
                  label="Forecast analysis"
                  description="Commit · Best case · Q2 close"
                  result="6 deals in commit or best-case"
                  sources={[
                    { label: 'Forecast Platform' },
                    { label: '6 In Forecast' },
                  ]}
                />
              </ThoughtStream>
            </div>
          </div>
        </div>

        {/* FindingStep states */}
        <div className="ts-demo__group">
          <div className="ts-demo__label">FindingStep — all states</div>
          <div className="ts-showcase">
            <div className="ts-showcase__col">
              <div className="ts-showcase__col-label">Pending</div>
              <ThoughtStream>
                <FindingStep
                  status="pending"
                  text="Synthesizing results across all data sources."
                />
              </ThoughtStream>
            </div>
            <div className="ts-showcase__col">
              <div className="ts-showcase__col-label">Active</div>
              <ThoughtStream>
                <FindingStep
                  status="active"
                  text="Found 3 high-potential deals with strong buying signals"
                />
              </ThoughtStream>
            </div>
            <div className="ts-showcase__col">
              <div className="ts-showcase__col-label">Complete</div>
              <ThoughtStream>
                <FindingStep
                  status="complete"
                  text="Zeta Corp ($1.2M) is furthest along — VP Engineering requested POC last week."
                />
              </ThoughtStream>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

/**
 * ShortReasoning — a tight 3-step chain showing minimal use of the system.
 * Good reference for single-tool lookups with a direct conclusion.
 */
export const ShortReasoning: Story = {
  render: () => (
    <div className="ts-canvas">
      <div className="ts-demo">
        <div className="ts-demo__group">
          <div className="ts-demo__label">Short reasoning chain</div>
          <div className="ts-panel">
            <ThoughtStream>
              <ThinkStep
                status="complete"
                text="Looking up the most recent activity on the Apex Logistics account before your call."
              />
              <ActionStep
                status="complete"
                icon={Data}
                label="Retrieving account activity"
                description="Apex Logistics · Last 90 days · All channels"
                result="Last contact was a call 12 days ago. Previous email thread went 3 weeks without reply."
                sources={[
                  { label: 'CRM System' },
                  { label: 'Email History' },
                  { label: 'Call Log' },
                ]}
              />
              <FindingStep
                status="complete"
                text="Apex last engaged 12 days ago on a technical call. Their side went quiet before that — no response to the architecture proposal sent Feb 14. Worth asking if they've had an internal review."
              />
            </ThoughtStream>
          </div>
        </div>
      </div>
    </div>
  ),
}
