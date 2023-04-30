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

export const createUserRequest = (user: Registration) => {
  return fetch(`${baseUrl}/registration`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: user.email,
      name: user.name,
      phone: user.phone,
      password: user.password,
      terms: user.terms,
    }),
  })
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
export const authentication = async (
  user: Registration | Login,
  type: 'login' | 'logout'
) => {
  return fetch(`${baseUrl}/${type}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
}
