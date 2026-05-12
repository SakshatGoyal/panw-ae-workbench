import {
  PlanForecastSummary,
  DEFAULT_PLAN_SUMMARY_DATA,
} from '../../../poc-exploration/src/compositions/plan-summary.stories'

export default function PlanSummaryTile() {
  return <PlanForecastSummary data={DEFAULT_PLAN_SUMMARY_DATA} defaultOpen />
}
