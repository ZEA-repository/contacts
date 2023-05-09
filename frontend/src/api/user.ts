import type { Registration } from '@/types'

const baseUrl = import.meta.env.VITE_API_URL

export const createUserRequest = async (user: Registration) => {
  const response = await fetch(`${baseUrl}/registration`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      login: user.login,
      username: user.username,
      phone: user.phone,
      password: user.password,
      terms: user.terms,
    }),
    credentials: 'include',
  })

  return await response.json()
}

export const fetchUserByRefreshToken = async () => {
  const response = await fetch(`${baseUrl}/user`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  })

  return await response.json()
}
