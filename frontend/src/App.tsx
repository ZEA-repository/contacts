import MainLayout from '@/layouts/Main'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { ContactsPage } from '@/pages/contacts'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/ThemeProvider'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path=':slug' element={<ContactsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
