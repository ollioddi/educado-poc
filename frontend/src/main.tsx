import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'

import './styles.css'
import App from './app.tsx'
import reportWebVitals from './reportWebVitals.ts'
import { routeTree } from './routeTree.gen'

import './i18n/i18n.ts'
import type { AuthContextType } from './shared/hooks/use-auth.ts'

export const queryClient = new QueryClient()
export type AppRouter = typeof router

export interface AppContext {
  queryClient: QueryClient
  auth: AuthContextType | undefined
}

// Query and auth is passed, so they're available in loaders and beforeLoad functions.
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined, // Will be set by AuthProvider
  } as AppContext,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && rootElement.innerHTML === '') {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App queryClient={queryClient} router={router} />)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
