import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Navbar } from '@/shared/components/layouts/navbar'

const AuthenticatedLayout = () => {
  return (
    <>
      <Navbar />
      {/* Centered container for all content */}
      <div className="flex justify-center bg-red-50">
        <Outlet />
      </div>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/_applayout')({
  component: AuthenticatedLayout,
})
