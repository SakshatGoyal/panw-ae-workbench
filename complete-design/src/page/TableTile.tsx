import { AEAccountTable } from '../../../poc-exploration/src/compositions/account-table.stories'
import { AEOpportunityTable } from '../../../poc-exploration/src/compositions/opportunity-table.stories'
import type { ActiveTab } from './ContainerTabs'

interface TableTileProps {
  active: ActiveTab
}

export default function TableTile({ active }: TableTileProps) {
  return (
    <div className="cd-table-tile">
      {active === 'opportunities' ? <AEOpportunityTable /> : <AEAccountTable />}
    </div>
  )
}
