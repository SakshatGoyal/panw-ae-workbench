import NavRail from './NavRail'
import ResizableRightRail from './ResizableRightRail'

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="cd-app">
      <div className="cd-app__rail-left">
        <NavRail />
      </div>
      <div className="cd-app__column">
        {children}
      </div>
      <ResizableRightRail />
    </div>
  )
}
