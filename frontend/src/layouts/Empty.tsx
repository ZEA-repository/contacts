import { Outlet } from 'react-router-dom'
import { AppShell } from '@mantine/core'

export default function EmptyLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
