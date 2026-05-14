import NavRail from './NavRail'
import ResizableRightRail from './ResizableRightRail'

interface AppShellProps {
  children: React.ReactNode
  rightRailContent?: React.ReactNode
  activeNavItem?: string
  onNavItemClick?: (label: string) => void
}

export default function AppShell({ children, rightRailContent, activeNavItem, onNavItemClick }: AppShellProps) {
  return (
    <div className="cd-app">
      <div className="cd-app__rail-left">
        <NavRail activeItem={activeNavItem} onItemClick={onNavItemClick} />
      </div>
      <div className="cd-app__column">
        {children}
      </div>
      <ResizableRightRail>{rightRailContent}</ResizableRightRail>
    </div>
  )
}
