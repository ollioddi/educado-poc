import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode, Suspense } from 'react'

import { ErrorBoundary } from './shared/components/error-boundary'
import LoadingPage from './shared/components/layouts/loading-page'
import { AuthProvider } from './shared/context/auth-provider'
import { useAuth } from './shared/hooks/use-auth'

import type { AppRouter } from './main'

// Context and hooks cannot be loaded in main App, because they can only be used as a child of their providers
const InnerApp = ({ router }: { router: AppProperties['router'] }) => {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

interface AppProperties {
  queryClient: QueryClient
  router: AppRouter
}
const App = ({ queryClient, router }: AppProperties) => {
  return (
    <StrictMode>
      <AuthProvider router={router}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Suspense fallback={<LoadingPage />}>
            <ErrorBoundary>
              <InnerApp router={router} />
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  )
}

export default App
