import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const RequireAuth = ({ children }: Props) => {
  const accessToken = Cookies.get('accessToken')
  return accessToken ? <>{children}</> : <Navigate to='/login' />
}
