import { AEAccountTable } from '../../../poc-exploration/src/compositions/account-table.stories'
import { AEOpportunityTable } from '../../../poc-exploration/src/compositions/opportunity-table.stories'
import type { SwitcherKey } from '../../../poc-exploration/src/compositions/switcher.stories'

interface TableTileProps {
  active: SwitcherKey
  onExpand?: (id: string) => void
}

export default function TableTile({ active, onExpand }: TableTileProps) {
  return active === 'opportunities'
    ? <AEOpportunityTable onExpand={onExpand} />
    : <AEAccountTable onExpand={onExpand} />
}
