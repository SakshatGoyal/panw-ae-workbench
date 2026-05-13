import { useState } from 'react'
import AppShell from './shell/AppShell'
import Footer from './shell/Footer'
import PageHeader from './page/PageHeader'
import TableTile from './page/TableTile'
import { Switcher, type SwitcherKey } from '../../poc-exploration/src/compositions/switcher.stories'
import { AccountPanel } from '../../poc-exploration/src/compositions/AE Account Panel.stories'

export default function App() {
  const [activeTab, setActiveTab] = useState<SwitcherKey>('opportunities')
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)

  const rightRailContent = selectedAccountId
    ? <AccountPanel />
    : undefined

  return (
    <AppShell rightRailContent={rightRailContent}>
      <main className="cd-app__main" aria-label="Account Executive Workbench">
        <section className="cd-top-section">
          <PageHeader />
          <div className="cd-switcher-host">
            <Switcher active={activeTab} onChange={setActiveTab} />
          </div>
        </section>
        <TableTile active={activeTab} onExpand={setSelectedAccountId} />
        <Footer />
      </main>
    </AppShell>
  )
}
