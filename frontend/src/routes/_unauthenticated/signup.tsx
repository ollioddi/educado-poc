import { createFileRoute } from '@tanstack/react-router'

import { SignupPage } from '@/login/pages/signup-page'

export const Route = createFileRoute('/_unauthenticated/signup')({
  component: SignupPage,
})
