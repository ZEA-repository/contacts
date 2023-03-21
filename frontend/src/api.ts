import { fetcher } from '@/utils/fetcher'
import { LoaderFunctionArgs } from 'react-router-dom';
import type { User } from '@/types'


const baseUrl = import.meta.env.VITE_API_URL

export const fetchUsers = async () => await fetcher('users')

export const fetchUserById = async ({ params }: LoaderFunctionArgs) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${params.id}`
  return fetcher(url)
};

export const createUserRequest = (user: User) => {
  return fetch(`${baseUrl}/user`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export const deleteUserRequest = (id: string) => {
  return fetch(`${baseUrl}/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const updateUserRequest = async (user: User) => {
  return fetch(`${baseUrl}/user/${user._id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

};