import { useState } from 'react'
import AppShell from './shell/AppShell'
import { AEOpportunityTable } from '../../poc-exploration/src/compositions/opportunity-table.stories'
import { AEAccountTable } from '../../poc-exploration/src/compositions/account-table.stories'
import { AccountPanel } from '../../poc-exploration/src/compositions/AE Account Panel.stories'
import { SalesPlayModal } from '../../poc-exploration/src/compositions/sales-play-modal.stories'
import { ACCOUNTS } from '../../poc-exploration/src/mock/data/accounts'
import { CONTACTS as CANONICAL_CONTACTS } from '../../poc-exploration/src/mock/data/contacts'
import { OPPORTUNITIES as CANONICAL_OPPORTUNITIES } from '../../poc-exploration/src/mock/data/opportunities'
import { SALES_PLAY_INSTANCES } from '../../poc-exploration/src/mock/data/sales-play-instances'
import { SALES_PLAYS } from '../../poc-exploration/src/mock/data/sales-plays'
import { mapOpportunityToRow } from '../../poc-exploration/src/mock/opportunity-row-mapper'
import type { PlayContact, PlayOpportunity } from '../../poc-exploration/src/mock/sales-play-modal'

function formatUsdCompact(n: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 1,
  }).format(n)
}

const MAPPED_ROWS = CANONICAL_OPPORTUNITIES.map(o =>
  mapOpportunityToRow(o, ACCOUNTS, SALES_PLAY_INSTANCES, SALES_PLAYS)
)
const TOTAL_OPP_VALUE = MAPPED_ROWS.reduce((s, r) => s + r.valueUsd, 0)
const OPP_SUMMARY_LABEL = `${MAPPED_ROWS.length} deals · ${formatUsdCompact(TOTAL_OPP_VALUE)}`

type View = 'Opportunities' | 'Account Workbench'
type ModalState = { type: 'salesPlay'; playId: string; sourceOppId?: string; accountId?: string } | null
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

  const modalAccountId = modal?.accountId ??
    (modal?.sourceOppId
      ? CANONICAL_OPPORTUNITIES.find(o => o.id === modal.sourceOppId)?.accountId
      : undefined)

  const modalContacts: PlayContact[] | undefined = modalAccountId
    ? CANONICAL_CONTACTS
        .filter(c => c.accountId === modalAccountId)
        .map(c => ({ id: c.id, name: c.name, title: c.title, phone: c.phone ?? '', email: c.email ?? '' }))
    : undefined

  const modalOpportunities: PlayOpportunity[] | undefined = modalAccountId
    ? CANONICAL_OPPORTUNITIES
        .filter(o => o.accountId === modalAccountId)
        .map(o => ({
          id: o.id,
          name: o.name,
          stage: o.stageId,
          amount: o.amount,
          closeDate: new Date(Date.now() + o.daysToClose * 86_400_000).toISOString().slice(0, 10),
        }))
    : undefined

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
          setModal({ type: 'salesPlay', playId, sourceOppId, accountId: panelIntent.accountId })
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
    // Panel is account-centric, not view-centric — both views work with accounts.
    // Preserve intent across nav switches so the AE doesn't lose context.
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
              <AEOpportunityTable
                rows={MAPPED_ROWS}
                totalItems={MAPPED_ROWS.length}
                summaryLabel={OPP_SUMMARY_LABEL}
                onExpand={handleExpand}
                onOpenSalesPlay={handleOpenSalesPlay}
              />
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
          contacts={modalContacts}
          opportunities={modalOpportunities}
          onClose={closeModal}
          onCancel={closeModal}
        />
      )}
    </>
  )
}
