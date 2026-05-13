/**
 * Switcher — two-tab page-scope picker
 *
 * Traditional Tabs (no container) from @ds/tabs, label-only. The
 * tab the AE selects scopes the page below between an opportunities
 * view and an accounts view.
 *
 * Exposed as both a controlled (`active` + `onChange`) and an
 * uncontrolled (internal state) component so the parent shell can
 * own the scope or leave it local.
 */

import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, Tab } from '@ds/tabs'

export type SwitcherKey = 'opportunities' | 'accounts'

const KEYS: SwitcherKey[] = ['opportunities', 'accounts']
const LABELS: Record<SwitcherKey, string> = {
  opportunities: 'Opportunities',
  accounts:      'Accounts',
}

export interface SwitcherProps {
  active?: SwitcherKey
  onChange?: (next: SwitcherKey) => void
}

export function Switcher({ active, onChange }: SwitcherProps = {}) {
  const [internal, setInternal] = useState<number>(0)
  const controlled = active != null
  const selectedIndex = controlled ? KEYS.indexOf(active) : internal

  const handleChange = (i: number) => {
    if (!controlled) setInternal(i)
    onChange?.(KEYS[i])
  }

  return (
    <div className="swcr-page">
      <style>{COMPOSITION_CSS}</style>
      <Tabs container={false} selectedIndex={selectedIndex} onChange={handleChange}>
        {KEYS.map((k) => (
          <Tab key={k} label={LABELS[k]} />
        ))}
      </Tabs>
    </div>
  )
}

const COMPOSITION_CSS = `
.swcr-page {
  min-height: 100vh;
  padding: var(--ds-spacing-07);
  background-color: var(--ds-stage-base);
  font-family: var(--ds-type-font-family-sans);
}
`

// ── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta<typeof Switcher> = {
  title: 'compositions/Switcher',
  component: Switcher,
}
export default meta

type Story = StoryObj<typeof Switcher>

export const Default: Story = {
  render: () => <Switcher />,
}
