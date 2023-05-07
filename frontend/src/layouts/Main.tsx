import { Outlet, Navigate } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { CustomHeader } from '@/components/Header'
import Cookies from 'js-cookie'

export default function MainLayout() {
  const accessToken = Cookies.get('accessToken')
  return (
    <AppShell>
      {accessToken ? (
        <>
          <CustomHeader />
          <Outlet />
        </>
      ) : (
        <Navigate replace to={'/login'} />
      )}
    </AppShell>
  )
}
