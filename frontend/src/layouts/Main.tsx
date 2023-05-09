import { Outlet } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { CustomHeader } from '@/components/Header'

export default function MainLayout() {
  return (
    <AppShell>
      <CustomHeader />
      <Outlet />
    </AppShell>
  )
}
