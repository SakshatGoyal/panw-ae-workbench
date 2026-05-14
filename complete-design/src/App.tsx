import { useState } from 'react'
import AppShell from './shell/AppShell'
import { AEOpportunityTable } from '../../poc-exploration/src/compositions/opportunity-table.stories'
import { AEAccountTable } from '../../poc-exploration/src/compositions/account-table.stories'
import { AccountPanel } from '../../poc-exploration/src/compositions/AE Account Panel.stories'

type View = 'Opportunities' | 'Account Workbench'

const VIEW_TITLE: Record<View, string> = {
  'Opportunities': 'Opportunity Workbench',
  'Account Workbench': 'Account Workbench',
}

export default function App() {
  const [activeView, setActiveView] = useState<View>('Opportunities')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const rightRailContent = selectedId
    ? <AccountPanel key={selectedId} accountId={selectedId} />
    : undefined

  function handleNavClick(label: string) {
    setActiveView(label as View)
    setSelectedId(null)          // clear the right rail when switching views
  }

  return (
    <AppShell
      rightRailContent={rightRailContent}
      activeNavItem={activeView}
      onNavItemClick={handleNavClick}
    >
      {/* ── Fixed topbar: edge-to-edge across the column ── */}
      <div className="cd-page-topbar">
        <h2 className="cd-page-topbar__title">{VIEW_TITLE[activeView]}</h2>
      </div>

      {/* ── Scrollable body ── */}
      <div className="cd-app__body">
        {activeView === 'Opportunities' ? (
          <main className="cd-app__main" aria-label="Opportunity Workbench">
            <AEOpportunityTable onExpand={setSelectedId} />
          </main>
        ) : (
          <main className="cd-app__main" aria-label="Account Workbench">
            <AEAccountTable onExpand={setSelectedId} />
          </main>
        )}
      </div>
    </AppShell>
  )
}
