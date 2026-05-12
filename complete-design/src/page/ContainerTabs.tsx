import { Tabs, Tab } from '@ds/tabs'

export type ActiveTab = 'opportunities' | 'accounts'

const ORDER: ActiveTab[] = ['opportunities', 'accounts']

interface ContainerTabsProps {
  active: ActiveTab
  onChange: (next: ActiveTab) => void
}

export default function ContainerTabs({ active, onChange }: ContainerTabsProps) {
  const selectedIndex = ORDER.indexOf(active)
  return (
    <div className="cd-tabs-host">
      <Tabs
        selectedIndex={selectedIndex}
        onChange={i => onChange(ORDER[i] ?? 'opportunities')}
        container
      >
        <Tab label="Opportunities" />
        <Tab label="Accounts" />
      </Tabs>
    </div>
  )
}
