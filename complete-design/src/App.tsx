import { useState } from 'react'
import AppShell from './shell/AppShell'
import Footer from './shell/Footer'
import PageHeader from './page/PageHeader'
import PlanSummaryTile from './page/PlanSummaryTile'
import ContainerTabs, { type ActiveTab } from './page/ContainerTabs'
import TableTile from './page/TableTile'

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('opportunities')

  return (
    <AppShell>
      <main className="cd-app__main" aria-label="Account Executive Workbench">
        <PageHeader />
        <PlanSummaryTile />
        <ContainerTabs active={activeTab} onChange={setActiveTab} />
        <TableTile active={activeTab} />
        <Footer />
      </main>
    </AppShell>
  )
}
