import { AEAccountTable, type AccountExpandIntent } from '../../../poc-exploration/src/compositions/account-table.stories'
import { AEOpportunityTable, type ExpandIntent } from '../../../poc-exploration/src/compositions/opportunity-table.stories'
import type { SwitcherKey } from '../../../poc-exploration/src/compositions/switcher.stories'
import { ACCOUNTS } from '../../../poc-exploration/src/mock/data/accounts'
import { OPPORTUNITIES as CANONICAL_OPPORTUNITIES } from '../../../poc-exploration/src/mock/data/opportunities'
import { SALES_PLAY_INSTANCES } from '../../../poc-exploration/src/mock/data/sales-play-instances'
import { SALES_PLAYS } from '../../../poc-exploration/src/mock/data/sales-plays'
import { mapOpportunityToRow } from '../../../poc-exploration/src/mock/opportunity-row-mapper'
import { mapAccountToRow } from '../../../poc-exploration/src/mock/account-row-mapper'

const MAPPED_OPP_ROWS = CANONICAL_OPPORTUNITIES.map(o =>
  mapOpportunityToRow(o, ACCOUNTS, SALES_PLAY_INSTANCES, SALES_PLAYS)
)
const MAPPED_ACCOUNT_ROWS = ACCOUNTS.map(a =>
  mapAccountToRow(a, CANONICAL_OPPORTUNITIES, SALES_PLAY_INSTANCES, SALES_PLAYS)
)

interface TableTileProps {
  active: SwitcherKey
  onExpand?: (intent: ExpandIntent | AccountExpandIntent) => void
  onOpenSalesPlay?: (playId: string, sourceOppId?: string) => void
}

export default function TableTile({ active, onExpand, onOpenSalesPlay }: TableTileProps) {
  return active === 'opportunities'
    ? <AEOpportunityTable rows={MAPPED_OPP_ROWS} totalItems={MAPPED_OPP_ROWS.length} onExpand={onExpand as ((intent: ExpandIntent) => void) | undefined} onOpenSalesPlay={onOpenSalesPlay} />
    : <AEAccountTable rows={MAPPED_ACCOUNT_ROWS} onExpand={onExpand as ((intent: AccountExpandIntent) => void) | undefined} onOpenSalesPlay={onOpenSalesPlay} />
}
