import MainLayout from '@/layouts/Main'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { ContactsPage } from '@/pages/contacts'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/ThemeProvider'
import { fetchUsers } from '@/api'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='contacts' element={<ContactsPage />} loader={fetchUsers} />
    </Route>
  )
)
export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
