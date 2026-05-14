import { useState } from 'react'
import AppShell from './shell/AppShell'
import { AEOpportunityTable } from '../../poc-exploration/src/compositions/opportunity-table.stories'
import { AEAccountTable } from '../../poc-exploration/src/compositions/account-table.stories'
import { AccountPanel } from '../../poc-exploration/src/compositions/AE Account Panel.stories'
import { SalesPlayModal } from '../../poc-exploration/src/compositions/sales-play-modal.stories'
import { ACCOUNTS } from '../../poc-exploration/src/mock/data/accounts'

type View = 'Opportunities' | 'Account Workbench'
type ModalState = { type: 'salesPlay'; playId: string; sourceOppId?: string } | null

const VIEW_TITLE: Record<View, string> = {
  'Opportunities': 'Opportunity Workbench',
  'Account Workbench': 'Account Workbench',
}

export default function App() {
  const [activeView, setActiveView] = useState<View>('Opportunities')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [modal, setModal] = useState<ModalState>(null)

  const closeModal = () => setModal(null)

  const selectedAccount = selectedId ? ACCOUNTS.find(a => a.id === selectedId) : null

  const rightRailContent = selectedId
    ? (
      <AccountPanel
        key={selectedId}
        accountId={selectedId}
        onSalesPlayRowClick={(playId, sourceOppId) =>
          setModal({ type: 'salesPlay', playId, sourceOppId })
        }
      />
    )
    : undefined

  function handleNavClick(label: string) {
    setActiveView(label as View)
    setSelectedId(null)
  }

  return (
    <>
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

      {modal?.type === 'salesPlay' && (
        <SalesPlayModal
          playId={modal.playId}
          sourceOppId={modal.sourceOppId}
          header={{
            family: 'Sales Play',
            name: modal.playId,
            accountName: selectedAccount?.name ?? '',
          }}
          onClose={closeModal}
          onCancel={closeModal}
        />
      )}
    </>
  )
}
