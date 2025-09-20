import { createFileRoute } from '@tanstack/react-router'

import LoginPage from '@/login/pages/login-page'

export const Route = createFileRoute('/_unauthenticated/login')({
  component: LoginPage,
})
