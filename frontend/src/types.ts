export interface User {
  _id: string
  name: string
  email: string
  phone: string
  avatar: string
}
export interface Login {
  email: string
  password: string
}
export interface Registration {
  email: string
  name: string
  phone: string
  password: string
  passwordConfirm: string
  terms?: boolean
}
