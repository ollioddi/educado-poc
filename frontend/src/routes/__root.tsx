import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import type { AppContext } from 'src/main'

const RootComponent = () => (
  <div className="flex flex-col h-screen bg-background">
    <Outlet />
    <TanStackRouterDevtools />
  </div>
)

export const Route = createRootRouteWithContext<AppContext>()({
  component: RootComponent,
})
