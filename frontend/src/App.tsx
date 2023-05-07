import MainLayout from '@/layouts/Main'
import EmptyLayout from '@/layouts/Empty'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { LoginPage } from '@/pages/login'
import { RegistrationPage } from '@/pages/registration'
import { ContactsPage } from '@/pages/contacts'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/ThemeProvider'

// import { fetchUsers } from '@/api'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />}>
        <Route
          index
          element={<ContactsPage />}
          // loader={fetchUsers}
        />
      </Route>
      <Route path='/' element={<EmptyLayout />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='registration' element={<RegistrationPage />} />
      </Route>
    </>
  )
)

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
