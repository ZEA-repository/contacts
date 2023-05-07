import type { Login } from '@/types'
import Cookies from 'js-cookie'

const baseUrl = import.meta.env.VITE_API_URL

export const loginRequest = async (user: Login) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  try {
    const data = await response.json()

    if (response.ok) {
      Cookies.set('accessToken', data.accessToken)
      Cookies.set('refreshToken', data.refreshToken)
    }
    return { status: response.status, data: data.user }
  } catch (error) {
    return { status: 400, data: null, error }
  }
}
export const logoutRequest = async () => {
  console.log('logoutRequest')
  const response = await fetch(`${baseUrl}/logout`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: Cookies.get('refreshToken') }),
  })

  const data = await response.json()

  if (data.acknowledged) Cookies.remove('accessToken')
}
