import type { Login } from '@/types'
import Cookies from 'js-cookie'

const baseUrl = import.meta.env.VITE_API_URL

export const loginRequest = async (user: Login) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    })
    const data = await response.json()

    if (response.ok) {
      Cookies.set('accessToken', data.accessToken)
      Cookies.set('refreshToken', data.refreshToken)
    }
    //TODO: убрать юзера из ответа
    return { status: response.status, data: data.user }
  } catch (error) {
    return { status: 401, data: {}, error }
  }
}

export const logoutRequest = async () => {
  const response = await fetch(`${baseUrl}/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  Cookies.remove('accessToken')

  return { status: response.status }
}

export const checkAuthRequest = async () => {
  try {
    const response = await fetch(`${baseUrl}/token/refresh`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        // SameSite: 'Strict',
      },
    })
    const data = await response.json()

    return { status: response.status, data }
  } catch (error) {
    return { status: 401, error }
  }
}
