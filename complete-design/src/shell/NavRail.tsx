import { SideNav } from '../../../poc-exploration/src/compositions/side-nav.stories'

/**
 * Thin wrapper around poc's SideNav composition. SideNav already renders the
 * 64px column with brand + primary + global rows. No collapse behavior in
 * Stage 1 — Stage 2 follow-up.
 */
export default function NavRail() {
  return <SideNav />
}
