import type { ContactFormType, ContactUpdate } from '@/types'

const baseUrl = import.meta.env.VITE_API_URL

interface ContactCreate extends ContactFormType {
  userId: string
}
export const createContactRequest = async (body: ContactCreate) => {
  try {
    console.log('FROM createContactRequest')
    const { userId, firstname, email, phone, avatar } = body
    const response = await fetch(`${baseUrl}/phone-book/contact/create`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        firstname,
        email,
        phone,
        avatar,
      }),
      credentials: 'include',
    })
    const data = await response.json()

    return { user: data.data, status: response.status }
  } catch (error) {
    return { status: 400, error, user: null }
  }
}

export const updateContactRequest = async (user: ContactUpdate) => {
  try {
    const { _id } = user
    const response = await fetch(`${baseUrl}/phone-book/contact/update`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
        contactId: _id,
      }),
      credentials: 'include',
    })

    return { status: response.status }
  } catch (error) {
    return { status: 400, error }
  }
}

export const deleteContactRequest = async (ids: {
  userId: string
  contactId: string
}) => {
  try {
    const response = await fetch(`${baseUrl}/phone-book/contact/delete`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ids),
      credentials: 'include',
    })

    return { status: response.status }
  } catch (error) {
    return { status: 400, error }
  }
}
