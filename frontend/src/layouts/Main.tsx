import { CustomHeader } from '@/components/Header'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  const links = [
    { label: 'home', href: '/' },
    { label: 'contacts', href: '/contacts' },
  ]

  return (
    <>
      <CustomHeader links={links} />
      <main className='app_main'>
        <Outlet />
      </main>
    </>
  )
}
