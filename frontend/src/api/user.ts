import { fetcher } from '@/utils/fetcher'
import { LoaderFunctionArgs } from 'react-router-dom'
import type { User, Registration, Login } from '@/types'

const baseUrl = import.meta.env.VITE_API_URL

// export const fetchUsers = async () => await fetcher('users')
export const fetchUsers = (token: User) => {
  return (
    fetch(`${baseUrl}/user`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        Authorization: token,
      }),
    }) || []
  )
}

export const fetchUserById = async ({ params }: LoaderFunctionArgs) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${params.id}`
  return fetcher(url)
}

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
  })
  try {
    const data = await response.json()
    console.log('🚀 ~ file: user.ts:43 ~ createUserRequest ~ data:', data)

    return { status: response.status }
  } catch (error) {
    return { status: 400, error }
  }
}

export const deleteUserRequest = (id: string) => {
  return fetch(`${baseUrl}/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  })
}

export const updateUserRequest = async (user: User) => {
  return fetch(`${baseUrl}/user/${user._id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
}
