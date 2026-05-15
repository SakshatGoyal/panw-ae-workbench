import { useState } from 'react'
import AppShell from './shell/AppShell'
import { AEOpportunityTable } from '../../poc-exploration/src/compositions/opportunity-table.stories'
import { AEAccountTable } from '../../poc-exploration/src/compositions/account-table.stories'
import { AccountPanel } from '../../poc-exploration/src/compositions/AE Account Panel.stories'
import { SalesPlayModal } from '../../poc-exploration/src/compositions/sales-play-modal.stories'
import { ACCOUNTS } from '../../poc-exploration/src/mock/data/accounts'

type View = 'Opportunities' | 'Account Workbench'
type ModalState = { type: 'salesPlay'; playId: string; sourceOppId?: string } | null
type PanelSection = 'installBase' | 'salesPlay' | 'opportunities' | 'accountHealth'
type PanelIntent = { accountId: string; section?: PanelSection; oppId?: string } | null

const VIEW_TITLE: Record<View, string> = {
  'Opportunities': 'Opportunity Workbench',
  'Account Workbench': 'Account Workbench',
}

const VALID_VIEWS = new Set<string>(['Opportunities', 'Account Workbench'])

export default function App() {
  const [activeView, setActiveView] = useState<View>('Opportunities')
  const [panelIntent, setPanelIntent] = useState<PanelIntent>(null)
  const [modal, setModal] = useState<ModalState>(null)

  const closeModal = () => setModal(null)

  const selectedAccount = panelIntent ? ACCOUNTS.find(a => a.id === panelIntent.accountId) : null

  const panelKey = panelIntent
    ? `${panelIntent.accountId}:${panelIntent.section ?? ''}:${panelIntent.oppId ?? ''}`
    : undefined

  const rightRailContent = panelIntent
    ? (
      <AccountPanel
        key={panelKey}
        accountId={panelIntent.accountId}
        initialOpenSection={panelIntent.section}
        initialOpenOppId={panelIntent.oppId}
        onSalesPlayRowClick={(playId, sourceOppId) =>
          setModal({ type: 'salesPlay', playId, sourceOppId })
        }
      />
    )
    : undefined

  function handleExpand(intent: { accountId: string; section: PanelSection; oppId?: string }) {
    setPanelIntent(intent)
  }

  function handleOpenSalesPlay(playId: string, sourceOppId?: string) {
    setModal({ type: 'salesPlay', playId, sourceOppId })
  }

  function handleNavClick(label: string) {
    if (!VALID_VIEWS.has(label)) return
    setActiveView(label as View)
    setPanelIntent(null)
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
              <AEOpportunityTable onExpand={handleExpand} onOpenSalesPlay={handleOpenSalesPlay} />
            </main>
          ) : (
            <main className="cd-app__main" aria-label="Account Workbench">
              <AEAccountTable onExpand={handleExpand} onOpenSalesPlay={handleOpenSalesPlay} />
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
