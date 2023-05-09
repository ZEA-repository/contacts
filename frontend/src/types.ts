export interface User {
  _id: string
  username: string
  login: string
  phone: string
  avatar: string
  contacts: Contact[]
}
export interface Contact {
  _id: string
  userId: string
  firstname: string
  email: string
  phone?: string
  avatar?: { url: string }
}

export interface Login {
  login: string
  password: string
}
export interface Registration {
  login: string
  username: string
  phone: string
  password: string
  passwordConfirm: string
  terms: boolean
}
export type ContactFormType = Omit<Contact, '_id' | 'userId'>

export interface ContactDelete {
  userId: string
  contactId: string
}

export interface ContactUpdate extends ContactFormType {
  userId?: string
  _id?: string
}
