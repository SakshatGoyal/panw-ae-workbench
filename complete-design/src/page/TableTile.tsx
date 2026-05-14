import { AEAccountTable, type AccountExpandIntent } from '../../../poc-exploration/src/compositions/account-table.stories'
import { AEOpportunityTable, type ExpandIntent } from '../../../poc-exploration/src/compositions/opportunity-table.stories'
import type { SwitcherKey } from '../../../poc-exploration/src/compositions/switcher.stories'

interface TableTileProps {
  active: SwitcherKey
  onExpand?: (intent: ExpandIntent | AccountExpandIntent) => void
  onOpenSalesPlay?: (playId: string, sourceOppId?: string) => void
}

export default function TableTile({ active, onExpand, onOpenSalesPlay }: TableTileProps) {
  return active === 'opportunities'
    ? <AEOpportunityTable onExpand={onExpand as ((intent: ExpandIntent) => void) | undefined} onOpenSalesPlay={onOpenSalesPlay} />
    : <AEAccountTable onExpand={onExpand as ((intent: AccountExpandIntent) => void) | undefined} onOpenSalesPlay={onOpenSalesPlay} />
}
